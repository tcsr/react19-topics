# Frontend Security

## XSS (Cross-Site Scripting) — the top React risk

- React **escapes** interpolated values by default → `{userInput}` is safe.
- **`dangerouslySetInnerHTML`** bypasses escaping → sanitize first (e.g. DOMPurify).
  The name is a deliberate warning.
- Other injection vectors: `href={userInput}` with `javascript:` URLs, injecting
  into `<script>`/`<style>`, `eval`, setting unsanitized SVG.
- **CSP** (Content-Security-Policy) header limits script sources — strong defense
  in depth even if XSS slips through. Prefer nonces/hashes over `unsafe-inline`.

## CSRF (Cross-Site Request Forgery)

- Attacker tricks the browser into sending an authenticated request using the
  user's cookies.
- Mitigations: **SameSite=Lax/Strict** cookies, anti-CSRF tokens (double-submit /
  synchronizer), and checking Origin/Referer. Token-in-header auth (not cookies)
  is inherently less CSRF-prone but more XSS-prone (see auth.md tradeoff).

## Other must-knows

- **Secrets**: never ship API secrets in the client bundle — anything in the SPA is
  public. Use a **BFF** to hold secrets server-side.
- **Dependency / supply-chain**: `npm audit`, lockfiles, pin versions, review
  transitive deps, Subresource Integrity (SRI) for CDN scripts.
- **Clickjacking**: `X-Frame-Options` / CSP `frame-ancestors`.
- **CORS**: a **server** policy (who may call the API), not client security.
- **Sensitive data**: don't log tokens/PII; scrub before sending to observability.
- **HTTPS everywhere**; `Strict-Transport-Security` (HSTS).

## Interview signals

- Know exactly what `dangerouslySetInnerHTML` does and how to make it safe.
- Explain the XSS ↔ CSRF tradeoff of token-in-cookie vs token-in-JS.
- "The client is untrusted" — validate/authorize on the server; the SPA bundle is
  fully visible to attackers.
