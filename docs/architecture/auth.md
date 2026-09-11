# Authentication & Authorization

## AuthN vs AuthZ

- **Authentication** = who you are (login).
- **Authorization** = what you can do (roles/permissions).

## Protocols

- **OAuth 2.0** — delegated authorization (access to resources).
- **OpenID Connect (OIDC)** — identity layer on top of OAuth 2.0; adds the **ID
  token** (a JWT with user identity).
- **Authorization Code flow + PKCE** — the correct flow for SPAs and mobile.
  Implicit flow is deprecated. PKCE prevents code interception.

## Tokens

- **Access token** — short-lived (mins), sent to APIs (`Authorization: Bearer`).
- **Refresh token** — long-lived, exchanged for new access tokens.
- **ID token** — identity claims (OIDC), not for API auth.
- **Refresh token rotation** — each refresh issues a new refresh token and
  invalidates the old; detects theft (reuse of an old token = revoke the family).

## Token storage (the classic interview trap)

| Storage | XSS risk | CSRF risk | Verdict |
|---|---|---|---|
| `localStorage` | **High** (any JS reads it) | low | Avoid for tokens |
| JS-readable cookie | high | high | Avoid |
| **httpOnly + Secure + SameSite cookie** | low (JS can't read) | mitigated by SameSite/CSRF token | **Preferred** |
| In-memory (JS variable) | low (lost on reload) | low | Good for access token; refresh via httpOnly cookie |

Best practice: **access token in memory**, **refresh token in an httpOnly Secure
SameSite cookie**; silently refresh on load. Never put tokens in `localStorage` if
avoidable, and never in the URL.

## Frontend enforcement (defense in depth — UI only)

- **Route guards**: wrapper/loader that redirects unauthenticated users
  (`loader` throws `redirect('/login')` in React Router data routers).
- **RBAC/ABAC**: render/hide by role; but the **server is the source of truth** —
  the client check is UX, not security. Always enforce on the API.
- Handle **401** (re-auth) vs **403** (forbidden) distinctly.

## Interview signals

- Auth Code + PKCE for SPAs; never store long-lived secrets in the browser.
- httpOnly cookies beat localStorage for tokens; explain the XSS/CSRF tradeoff.
- Client authorization is cosmetic — enforce on the backend (NestJS guards next phase).
