// Simple in-memory rate limiter for Vercel Edge / Node.js
// Uses a sliding window per IP address.
// Note: In-memory means each Vercel instance tracks independently.
// For production with many instances, use Upstash/Vercel KV or PostHog.
// This is still far better than no rate limiting at all.

interface RateLimitEntry {
  count: number;
  resetAt: number;
}

const store = new Map<string, RateLimitEntry>();

// Cleanup stale entries every 5 minutes
setInterval(() => {
  const now = Date.now();
  for (const [key, entry] of store.entries()) {
    if (now > entry.resetAt) store.delete(key);
  }
}, 5 * 60 * 1000);

// Allow overriding via DI for testing
export function _resetStore() {
  store.clear();
}

export interface RateLimitConfig {
  maxRequests: number;
  windowMs: number;
}

const DEFAULTS: RateLimitConfig = {
  maxRequests: 60,
  windowMs: 60_000, // 1 minute
};

export function checkRateLimit(
  ip: string,
  config: Partial<RateLimitConfig> = {}
): { allowed: boolean; remaining: number; resetAt: number } {
  const { maxRequests, windowMs } = { ...DEFAULTS, ...config };
  const now = Date.now();
  const key = `${ip}:${Math.floor(now / windowMs) * windowMs}`;

  const entry = store.get(key);

  if (!entry || now > entry.resetAt) {
    store.set(key, { count: 1, resetAt: now + windowMs });
    return { allowed: true, remaining: maxRequests - 1, resetAt: now + windowMs };
  }

  if (entry.count >= maxRequests) {
    return { allowed: false, remaining: 0, resetAt: entry.resetAt };
  }

  entry.count++;
  return { allowed: true, remaining: maxRequests - entry.count, resetAt: entry.resetAt };
}

export function getClientIp(request: Request): string {
  const forwarded = request.headers.get("x-forwarded-for");
  if (forwarded) {
    return forwarded.split(",")[0].trim();
  }
  const realIp = request.headers.get("x-real-ip");
  if (realIp) return realIp;
  return "127.0.0.1";
}
