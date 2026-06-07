import { auth } from "@/lib/auth";
import { getOpenAI, getPersona } from "@/lib/ai";
import { prisma } from "@/lib/db";
import { generateTitle } from "@/lib/chat";
import { generateEmbedding, cosineSimilarity, buildContextMessage } from "@/lib/rag";
import { NextResponse } from "next/server";

export const runtime = "nodejs";

export async function POST(req: Request) {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { message, conversationId, personaId } = await req.json();

    if (!message || typeof message !== "string") {
      return NextResponse.json(
        { error: "Message is required" },
        { status: 400 }
      );
    }

    const userId = session.user.id;
    const pid = personaId || "asn-umum";
    const persona = getPersona(pid);
    let convId = conversationId;

    // === GET OR CREATE CONVERSATION ===
    if (convId) {
      const existing = await prisma.conversation.findFirst({
        where: { id: convId, userId },
      });
      if (!existing) {
        return NextResponse.json(
          { error: "Conversation not found" },
          { status: 404 }
        );
      }
    } else {
      const title = generateTitle(message);
      const newConv = await prisma.conversation.create({
        data: { title, personaId: pid, userId },
      });
      convId = newConv.id;
    }

    // === SAVE USER MESSAGE ===
    await prisma.message.create({
      data: {
        role: "user",
        content: message,
        conversationId: convId,
      },
    });

    // === LOAD CHAT HISTORY ===
    const history = await prisma.message.findMany({
      where: { conversationId: convId },
      orderBy: { createdAt: "asc" },
      take: 50, // limit context
    });

    // === RAG: Find relevant documents ===
    let ragContext = "";
    try {
      const userDocs = await prisma.document.findMany({
        where: { userId, embedding: { not: null } },
        select: { id: true, name: true, content: true, embedding: true },
      });

      if (userDocs.length > 0) {
        const queryEmbedding = await generateEmbedding(message);
        const scored = userDocs
          .map((doc) => ({
            name: doc.name,
            content: doc.content || "",
            similarity: doc.embedding
              ? cosineSimilarity(queryEmbedding, JSON.parse(doc.embedding))
              : 0,
          }))
          .filter((d) => d.similarity > 0.3)
          .sort((a, b) => b.similarity - a.similarity)
          .slice(0, 3);

        if (scored.length > 0) {
          ragContext = buildContextMessage(scored);
        }
      }
    } catch (err) {
      console.error("RAG error (non-fatal):", err);
    }

    // === BUILD MESSAGES ===
    const systemContent = persona.systemPrompt + ragContext;
    const messages: { role: "system" | "user" | "assistant"; content: string }[] = [
      { role: "system", content: systemContent },
      ...history.map((m) => ({
        role: m.role as "user" | "assistant" | "system",
        content: m.content,
      })),
    ];

    // === STREAMING RESPONSE ===
    const openai = getOpenAI();
    const stream = await openai.chat.completions.create({
      model: process.env.OPENAI_MODEL || "gpt-4o-mini",
      messages,
      stream: true,
      temperature: 0.7,
      max_tokens: 2048,
    });

    // Create a ReadableStream that sends chunks and saves on completion
    const encoder = new TextEncoder();
    let fullContent = "";

    const readable = new ReadableStream({
      async start(controller) {
        try {
          for await (const chunk of stream) {
            const delta = chunk.choices[0]?.delta?.content || "";
            if (delta) {
              fullContent += delta;
              controller.enqueue(
                encoder.encode(`data: ${JSON.stringify({ content: delta })}\n\n`)
              );
            }
          }

          // Save assistant message to DB
          if (fullContent) {
            await prisma.message.create({
              data: {
                role: "assistant",
                content: fullContent,
                conversationId: convId!,
              },
            });
          }

          controller.enqueue(
            encoder.encode(
              `data: ${JSON.stringify({ done: true, conversationId: convId })}\n\n`
            )
          );
          controller.close();
        } catch (err) {
          console.error("Stream error:", err);
          controller.enqueue(
            encoder.encode(
              `data: ${JSON.stringify({ error: "Stream error occurred" })}\n\n`
            )
          );
          controller.close();
        }
      },
    });

    return new Response(readable, {
      headers: {
        "Content-Type": "text/event-stream",
        "Cache-Control": "no-cache",
        Connection: "keep-alive",
      },
    });
  } catch (error) {
    console.error("Chat API error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
