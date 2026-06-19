import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { checkRateLimit, getClientIp } from "@/lib/rate-limit";

const CSP = [
  "default-src 'self'",
  "script-src 'self' 'unsafe-inline' 'unsafe-eval'",
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data: blob:",
  "font-src 'self'",
  "connect-src 'self' https://opencode.ai https://api.openai.com",
  "frame-src 'none'",
  "object-src 'none'",
  "base-uri 'self'",
  "form-action 'self'",
].join("; ");

export default function middleware(req: NextRequest) {
  const response = NextResponse.next();

  // ========== RATE LIMITING ==========
  // Apply to all API routes
  const { pathname } = req.nextUrl;
  if (pathname.startsWith("/api/")) {
    const ip = getClientIp(req);

    // Stricter limit for auth endpoints
    const isAuthRoute =
      pathname.startsWith("/api/auth/login") ||
      pathname.startsWith("/api/auth/register");

    const result = checkRateLimit(ip, {
      maxRequests: isAuthRoute ? 10 : 60, // 10/min for auth, 60/min for others
      windowMs: 60_000, // 1-minute window
    });

    if (!result.allowed) {
      const resetSeconds = Math.ceil((result.resetAt - Date.now()) / 1000);
      return NextResponse.json(
        {
          error: "Terlalu banyak permintaan. Silakan coba lagi.",
          retryAfter: resetSeconds,
        },
        {
          status: 429,
          headers: {
            "Retry-After": String(resetSeconds),
            "X-RateLimit-Remaining": "0",
          },
        }
      );
    }

    response.headers.set("X-RateLimit-Remaining", String(result.remaining));
  }

  // ========== SECURITY HEADERS ==========
  response.headers.set("X-Content-Type-Options", "nosniff");
  response.headers.set("X-Frame-Options", "DENY");
  response.headers.set("X-XSS-Protection", "1; mode=block");
  response.headers.set("Referrer-Policy", "strict-origin-when-cross-origin");
  response.headers.set(
    "Permissions-Policy",
    "camera=(), microphone=(), geolocation=()"
  );

  if (process.env.NODE_ENV === "production") {
    response.headers.set("Content-Security-Policy", CSP);
  }

  return response;
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|icon.svg|robots.txt|manifest.json|sitemap.xml|login|register).*)",
  ],
};
