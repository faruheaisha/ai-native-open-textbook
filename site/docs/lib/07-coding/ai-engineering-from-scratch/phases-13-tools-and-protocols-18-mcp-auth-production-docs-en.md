---
title: "MCP Auth in Production: Issuer-Bound Enrollment and Tokens"
sourceId: "07-coding/ai-engineering-from-scratch"
sourceTitle: "AI Engineering from Scratch（英文原版）"
sourceKind: "源码研读"
licenseLabel: "可转载"
lang: "英文"
tier: 2
volume: "07-coding"
sourceUrl: "https://github.com/rohitg00/ai-engineering-from-scratch"
entryUrl: "https://github.com/rohitg00/ai-engineering-from-scratch/blob/d18b8fe5a913c46011a3b06cb6ebd6a924414fd3/phases/13-tools-and-protocols/18-mcp-auth-production/docs/en.md"
sourceRel: "phases/13-tools-and-protocols/18-mcp-auth-production/docs/en.md"
rawUrl: "/raw/07-coding/ai-engineering-from-scratch/phases/13-tools-and-protocols/18-mcp-auth-production/docs/en.md"
sourceSha256: "da053b84576ba4daba8561f51966376185fd250bcb8792830a9ca043845d5f4b"
pageSha256: "da053b84576ba4daba8561f51966376185fd250bcb8792830a9ca043845d5f4b"
contentMode: "local-full"
zh: ""
---

# MCP Auth in Production: Issuer-Bound Enrollment and Tokens

> Lesson 16 built the OAuth 2.1 state machine. This lesson hardens its production boundaries for MCP 2026-07-28: Client ID Metadata Documents first, deprecated dynamic registration only for compatibility, authorization-response issuer validation, issuer-keyed client credentials, JWKS refresh, and audience-pinned tokens on every stateless request.
>
> **Spec note (2026-07-28):** Dynamic Client Registration is deprecated in favor of Client ID Metadata Documents. DCR remains a compatibility mechanism. When it is used, the client declares the correct `application_type`. A client validates a present RFC 9207 `iss` value and never reuses credentials across authorization-server issuers.

**Type:** Build
**Languages:** Python (stdlib)
**Prerequisites:** Phase 13 · 16 (OAuth 2.1 state machine), Phase 13 · 17 (gateways)
**Time:** ~90 minutes

## Learning Objectives

- Discover an authorization server through RFC 8414 metadata and verify the contract.
- Enroll through a Client ID Metadata Document and isolate deprecated DCR as a fallback.
- Validate RFC 9207 `iss`, key registrations by authorization-server issuer, and key resource-bound tokens by issuer plus resource.
- Cache and refresh JWKS keys on a schedule so signature verification survives key roll-over.
- Pin tokens to a single MCP resource using RFC 8707 resource indicators and refuse confused-deputy reuse.
- Choose JWT validation or token introspection, define revocation freshness, and fail safely when identity dependencies are unavailable.
- Separate the authorization server, resource server, and client so each enforces only its own checks.
- Audit an authorization server against a deployment checklist and refuse unsafe enrollment or token reuse.

## The Problem

The Lesson 16 simulator runs OAuth 2.1 in memory. Production has three operational gaps that a memory-only simulator does not see.

The first gap is enrollment and credential isolation. A real org may run hundreds of MCP servers and thousands of MCP clients. The 2026-07-28 revision prefers a **Client ID Metadata Document**: the client uses an HTTPS URL with a path that it controls as its identifier, and the authorization server pulls the metadata. RFC 7591 dynamic registration remains only as a deprecated compatibility path. When DCR is unavoidable, the request declares the correct `application_type`. The client stores registrations under the authorization-server issuer and access tokens under the `(issuer, resource)` pair. A changed issuer means a new enrollment, and a different resource means a separately audience-bound token.

The second gap is key rotation. JWT validation depends on the authorization server's signing keys, published as a JSON Web Key Set (JWKS). The authorization server rotates these on a schedule (often hourly, sometimes faster under incident response). An MCP server that fetches JWKS once at boot validates fine until the rotation window — then every request fails until restart. Production wires JWKS as a cached value with a refresh job that overwrites the cache before the previous keys expire, plus a fall-back fetch on cache miss for the case where a token signed by a key newer than the cache arrives.

The third gap is audience binding. Lesson 16 introduced RFC 8707 resource indicators. In production, that indicator becomes a hard claim check on every request. The MCP server compares `token.aud` against its own canonical resource URL and rejects mismatches with HTTP 401. This is the only defense against an upstream MCP server (or a malicious client holding a token meant for one server) replaying that token against another server in the same trust mesh.

This lesson maps each gap onto a concrete piece of the surface. The metadata document is an HTTP endpoint. JWKS cache refresh is a scheduled job plus a key-value cache. JWT validation is a routine the resource server runs before dispatching any tool. Keep the three roles separate and each one enforces only the checks it owns: the authorization server issues and rotates keys, the resource server caches and validates, the client discovers and enrolls.

## Scope: Production Enforcement After Lesson 16

[Lesson 16: MCP Security with OAuth 2.1](/lib/07-coding/ai-engineering-from-scratch/phases-13-tools-and-protocols-16-mcp-security-oauth-2-1-docs-en) owns the authorization-code state machine, PKCE, protected-resource discovery, resource indicators, and scope decisions. This lesson does not define a second OAuth flow. It starts after those contracts exist and asks how a deployed resource server keeps enforcing them during key rotation, opaque-token validation, revocation, dependency failure, rollout, and incident response.

The production boundary is narrower and more operational:

- A JWT path verifies a pinned issuer, algorithm, signature key, audience, time claims, and scopes on every request while refreshing JWKS safely.
- An opaque-token path calls the issuer's authenticated introspection endpoint and validates the returned active state, audience or resource, expiry, subject, and scopes.
- Revocation policy defines how quickly a credential must stop working and which cache can delay that fact.
- Failure policy decides what happens when discovery, JWKS, introspection, or revocation infrastructure is unavailable.
- Evidence records which issuer metadata, key set or introspection response, token claims, policy version, and refusal reason drove the result without storing the token.

This distinction keeps the lessons composable. Lesson 16 proves the flow. Lesson 18 proves that a token remains trustworthy, or is refused, after it reaches a real MCP request path.

## The Concept

### RFC 8414 — OAuth Authorization Server Metadata

A document at `/.well-known/oauth-authorization-server` describes everything a client needs:

```json
{
  "issuer": "https://auth.example.com",
  "authorization_endpoint": "https://auth.example.com/authorize",
  "token_endpoint": "https://auth.example.com/token",
  "jwks_uri": "https://auth.example.com/.well-known/jwks.json",
  "client_id_metadata_document_supported": true,
  "registration_endpoint": "https://auth.example.com/register",
  "authorization_response_iss_parameter_supported": true,
  "response_types_supported": ["code"],
  "grant_types_supported": ["authorization_code", "refresh_token"],
  "code_challenge_methods_supported": ["S256"],
  "scopes_supported": ["mcp:tools.read", "mcp:tools.invoke"],
  "token_endpoint_auth_methods_supported": ["none", "private_key_jwt"]
}
```

A client given an MCP resource URL chains discovery: `oauth-protected-resource` from RFC 9728 (the resource server's document) names the issuer, then `oauth-authorization-server` (this RFC) names every endpoint. The client never hard-codes an authorization URL.

For a resource identifier with a path, insert the well-known segment before that path. For example, `https://mcp.example.com/team/server` resolves protected-resource metadata at `https://mcp.example.com/.well-known/oauth-protected-resource/team/server`. Appending `/.well-known/...` after the resource path is incorrect.

The contract you verify before trusting an IdP for MCP:

- `code_challenge_methods_supported` includes `S256` (PKCE per RFC 7636). The spec is explicit: if this field is **absent**, the authorization server does not support PKCE and the client **MUST** refuse to proceed.
- `grant_types_supported` includes `authorization_code` and rejects `password` and `implicit`.
- At least one enrollment path is available: `client_id_metadata_document_supported: true` (CIMD, preferred), a pre-registered client, or `registration_endpoint` (deprecated RFC 7591 compatibility).
- If `authorization_response_iss_parameter_supported` is true, the client requires the returned RFC 9207 `iss` and compares it exactly with the issuer recorded before redirecting.
- `response_types_supported` is exactly `["code"]` for OAuth 2.1.

If `S256` is missing, the MCP server refuses to deploy against this IdP — there is no degraded mode for PKCE. If *neither* enrollment path is advertised and you have no pre-registered `client_id`, you also cannot enroll; the deployment manifest is wrong, not the code.

### RFC 9728 (recap) — Protected Resource Metadata

Lesson 16 covered RFC 9728. The delta in production: this document is the only place a client looks to find the authorization servers trusted by *this* MCP server. A single MCP server may accept tokens from multiple IdPs (one for staff, one for partners). RFC 9728 declares that set; RFC 8414 documents what each IdP supports.

```json
{
  "resource": "https://notes.example.com",
  "authorization_servers": ["https://auth.example.com", "https://partners.example.com"],
  "scopes_supported": ["mcp:tools.invoke"],
  "bearer_methods_supported": ["header"],
  "resource_documentation": "https://notes.example.com/docs"
}
```

### Client ID Metadata Documents (the recommended default)

CIMD inverts registration from *push* to *pull*. Instead of asking the authorization server to mint a `client_id`, the client uses an HTTPS URL it controls **as** its `client_id`. The URL resolves to a JSON metadata document; the authorization server fetches it on demand during the OAuth flow. Trust is rooted in DNS: if the server operator trusts `app.example.com`, it trusts the client served from `https://app.example.com/client.json`. No registration round-trip, no `client_id` namespace to exhaust, no per-server state to keep in sync.

The metadata document the client hosts:

```json
{
  "client_id": "https://app.example.com/oauth/client.json",
  "client_name": "Example MCP Client",
  "client_uri": "https://app.example.com",
  "application_type": "native",
  "redirect_uris": ["http://127.0.0.1:7333/callback", "http://localhost:7333/callback"],
  "grant_types": ["authorization_code", "refresh_token"],
  "response_types": ["code"],
  "token_endpoint_auth_method": "none"
}
```

The `client_id` value in the document **MUST** equal the URL it is served from (the authorization server verifies this; mismatches are rejected). The authorization server advertises support with `client_id_metadata_document_supported: true` in its RFC 8414 metadata.

For the current CIMD contract, `client_id`, `client_name`, and a non-empty `redirect_uris` array are required. The client identifier is an absolute HTTPS URL with a path. `application_type` may be included, but it is not a mandatory CIMD field. Do not copy the DCR requirement for `application_type` into the preferred CIMD path.

Two security facts the spec is blunt about:

- **SSRF.** The authorization server fetches an attacker-supplied URL. It must defend against server-side request forgery (no fetches to internal/admin endpoints).
- **localhost impersonation.** CIMD alone cannot stop a local attacker from claiming a legitimate client's metadata URL and binding any `localhost` redirect. The authorization server **MUST** clearly display the redirect URI hostname during consent and **SHOULD** warn on `localhost`-only redirects.

Because CIMD needs no server-side state, there is no registrar to stand up the way DCR requires. The client side is read-only: serve your metadata document from a static HTTPS endpoint and let the authorization server pull it.

If the authorization server operator has already provisioned a client identifier, use that issuer-scoped registration before trying automatic enrollment. Otherwise prefer CIMD. Use deprecated DCR only when the issuer cannot use either pre-registration or CIMD.

### RFC 7591: deprecated compatibility enrollment

DCR is deprecated in the 2026-07-28 revision. Keep it only for authorization servers that cannot consume CIMD and where pre-registration is impractical. A compatibility client posts:

```json
POST /register
Content-Type: application/json

{
  "application_type": "native",
  "redirect_uris": ["http://127.0.0.1:7333/callback"],
  "grant_types": ["authorization_code", "refresh_token"],
  "response_types": ["code"],
  "token_endpoint_auth_method": "none",
  "scope": "mcp:tools.invoke",
  "client_name": "Cursor",
  "software_id": "com.cursor.cursor",
  "software_version": "0.42.0"
}
```

The server responds with `client_id` and a `registration_access_token` for later updates:

```json
{
  "client_id": "c_3e7f1a",
  "client_id_issued_at": 1769472000,
  "redirect_uris": ["http://127.0.0.1:7333/callback"],
  "grant_types": ["authorization_code", "refresh_token"],
  "registration_access_token": "regt_b2...",
  "registration_client_uri": "https://auth.example.com/register/c_3e7f1a"
}
```

`application_type` is not decorative. A loopback desktop client declares `native`; a server-hosted client declares `web` and uses HTTPS redirect URIs. `token_endpoint_auth_method: none` is the right default for a public native client. It gets a `client_id` only, with PKCE providing the proof-of-possession.

Three production pitfalls:

- The registration endpoint must rate-limit by source IP. Without that, a hostile actor scripts millions of fake registrations and exhausts the `client_id` namespace. Run a rate-limit check before the registrar handles the request.
- `software_statement` (a signed JWT vouching for the client) is required by some enterprise IdPs. The lesson's mock skips it; production wires a verification step that rejects unsigned registrations from anything other than localhost redirect URIs.
- The `registration_access_token` must be stored as a hash, not plaintext. Theft of this token means the attacker can rewrite the client's redirect URIs.

### RFC 8707 (recap) — Resource Indicators
