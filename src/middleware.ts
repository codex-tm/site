import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

const APEX_HOST = 'ensinamentosdavida.com.br'

/**
 * Edge Middleware — runs on Cloudflare Workers edge before routes render.
 *
 * NOTE: Next.js 16 renamed middleware → proxy, but proxy forces Node runtime
 * which @opennextjs/cloudflare does not support yet. Keep using `middleware.ts`
 * with edge runtime until OpenNext adds Node middleware support.
 *
 * 1. Redirect www → apex with 301 (permanent)
 * 2. Apply security headers to all responses
 */
export function middleware(request: NextRequest) {
  const url = request.nextUrl.clone()

  // 1. www → apex redirect (preserve path, query, fragment)
  if (url.hostname === `www.${APEX_HOST}`) {
    url.hostname = APEX_HOST
    return NextResponse.redirect(url, 301)
  }

  // 2. Continue to the route and attach security headers
  const response = NextResponse.next()

  // Prevent MIME-type sniffing
  response.headers.set('X-Content-Type-Options', 'nosniff')
  // Clickjacking protection
  response.headers.set('X-Frame-Options', 'DENY')
  // Referrer policy — send origin only on cross-origin, full on same-origin
  response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin')
  // Permissions Policy — disable unused powerful features
  response.headers.set(
    'Permissions-Policy',
    'camera=(), microphone=(), geolocation=()'
  )
  // XSS filter (legacy browsers)
  response.headers.set('X-XSS-Protection', '1; mode=block')

  return response
}

export const config = {
  matcher: [
    /*
     * Match all paths except:
     * - _next/static (static files)
     * - _next/image (image optimization)
     * - favicon.ico, sitemap.xml, robots.txt
     * - public assets with extensions (.png, .jpg, .svg, .webp, .gif, .ico, .woff2)
     */
    '/((?!_next/static|_next/image|favicon\\.ico|sitemap\\.xml|robots\\.txt|.*\\..*).*)',
  ],
}
