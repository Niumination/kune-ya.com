import { NextResponse } from "next/server";
import { trackPageView, getAllStats } from "@/lib/analytics";

// POST /api/analytics/track — track a page view
export async function POST(req: Request) {
  try {
    const { path } = await req.json();
    if (!path) {
      return NextResponse.json({ error: "Path is required" }, { status: 400 });
    }
    const views = await trackPageView(path);
    return NextResponse.json({ path, views });
  } catch {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }
}

// GET /api/analytics — get stats (admin only for full stats)
export async function GET() {
  const stats = await getAllStats();
  return NextResponse.json(stats);
}
