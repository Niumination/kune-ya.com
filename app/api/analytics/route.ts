import { NextResponse } from "next/server";
import { trackPageView, getAllStats } from "@/lib/analytics";
import { auth } from "@/lib/auth";

// POST /api/analytics/track — track a page view (public)
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

// GET /api/analytics — get stats (admin only)
export async function GET() {
  try {
    // Require authentication
    const session = await auth();
    if (!session?.user?.email) {
      return NextResponse.json(
        { error: "Unauthorized — admin access required" },
        { status: 401 }
      );
    }

    const stats = await getAllStats();
    return NextResponse.json(stats);
  } catch {
    return NextResponse.json(
      { error: "Unauthorized" },
      { status: 401 }
    );
  }
}
