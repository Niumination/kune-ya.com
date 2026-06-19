import { prisma } from "./db";

export async function trackPageView(path: string): Promise<number> {
  try {
    const record = await prisma.pageView.upsert({
      where: { path },
      update: { count: { increment: 1 } },
      create: { path, count: 1 },
    });
    return record.count;
  } catch (error) {
    console.error("Analytics track error:", error);
    return 0;
  }
}

export async function getPageViews(path: string): Promise<number> {
  try {
    const record = await prisma.pageView.findUnique({ where: { path } });
    return record?.count || 0;
  } catch {
    return 0;
  }
}

export async function getAllStats() {
  try {
    const rows = await prisma.pageView.findMany({
      orderBy: { count: "desc" },
      take: 10,
    });
    const total = rows.reduce((a, b) => a + b.count, 0);
    return {
      totalViews: total,
      totalPages: rows.length,
      topPages: rows.map((r) => ({ path: r.path, count: r.count })),
    };
  } catch {
    return { totalViews: 0, totalPages: 0, topPages: [] };
  }
}
