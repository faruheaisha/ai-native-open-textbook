---
title: "claude-code-docs-official"
sourceId: "09-harness/claude-code-docs-official"
sourceTitle: "claude-code-docs-official"
sourceKind: "官方文档"
licenseLabel: "仅引用"
lang: "英文"
tier: 3
volume: "09-harness"
sourceUrl: "https://code.claude.com/docs"
entryUrl: "https://code.claude.com/docs"
sourceRel: "en/claude-apps-gateway-deploy.md"
rawUrl: "/raw/09-harness/claude-code-docs-official/en/claude-apps-gateway-deploy.md"
sourceSha256: "09270d8f4e207724e6aae6f48b9a970996cef9e8db5702abe212c1240143bdb0"
pageSha256: "d54f3a74a63c2efba91b2a77396ff97ab9db5c2e095e281137aeede4eb9359ed"
contentMode: "local-full"
zh: ""
---

## Identity provider setup

Register a confidential OAuth/OpenID Connect (OIDC) web application with a single redirect URI, `https://<gateway>/oauth/callback`, and assign it to the users or groups who should have gateway access.

Any OIDC-compliant IdP works: Okta, Microsoft Entra ID, Google Workspace, Keycloak, Dex, PingFederate, and others. The IdP must meet three requirements:

* Serves `/.well-known/openid-configuration`, over HTTPS in production; the gateway accepts an [`http://` issuer](https://code.claude.com/docs/en/claude-apps-gateway-config#oidc), and a loopback issuer additionally requires `CLAUDE_GATEWAY_ALLOW_LOOPBACK=1`
* Supports the authorization-code flow. PKCE (Proof Key for Code Exchange) is on by default; disable it with `oidc.use_pkce: false` for IdPs that don't support it
* Returns `email` and optionally `groups` in the id\_token, or serves them from the userinfo endpoint with `oidc.userinfo_fallback: true`

For private PKI, set `oidc.ca_cert_pem`.

A few providers handle email and group claims differently:

* **Okta**: the org authorization server at `https://example.okta.com` returns a thin id\_token that omits `email` and `groups`, so set `oidc.userinfo_fallback: true` whenever you use it as `issuer`. A custom authorization server such as `https://example.okta.com/oauth2/default` that includes `email` and optionally `groups` in the id\_token emits them directly and needs no fallback. Okta emits `groups` only when the `groups` scope is requested in `oidc.scopes` and the app's groups claim filter allows it; `userinfo_fallback` can't fill a claim the IdP wasn't asked for.
