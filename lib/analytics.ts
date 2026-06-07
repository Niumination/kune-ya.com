// Simple in-memory page view counter
// In production, replace with proper analytics (PostHog, Plausible, etc.)

const views = new Map<string, number>();

export function trackPageView(path: string): number {
  const current = views.get(path) || 0;
  views.set(path, current + 1);
  return current + 1;
}

export function getPageViews(path: string): number {
  return views.get(path) || 0;
}

export function getAllStats() {
  const total = Array.from(views.values()).reduce((a, b) => a + b, 0);
  return {
    totalViews: total,
    totalPages: views.size,
    topPages: Array.from(views.entries())
      .sort((a, b) => b[1] - a[1])
      .slice(0, 10)
      .map(([path, count]) => ({ path, count })),
  };
}
