---
title: "OAuth Authentication for M365 Agent Plugins"
sourceId: "10-context-memory/microsoft-skills"
sourceTitle: "Microsoft Agent Skills"
sourceKind: "技能与配置库"
licenseLabel: "可转载"
lang: "英文"
tier: 3
volume: "10-context-memory"
sourceUrl: "https://github.com/microsoft/skills"
entryUrl: "https://github.com/microsoft/skills/blob/cf77b1efbf3117501f4727c476894751311ee885/.github/plugins/microsoft-365-agents-toolkit/skills/declarative-agent-developer/references/authentication.md"
sourceRel: ".github/plugins/microsoft-365-agents-toolkit/skills/declarative-agent-developer/references/authentication.md"
rawUrl: "/raw/10-context-memory/microsoft-skills/.github/plugins/microsoft-365-agents-toolkit/skills/declarative-agent-developer/references/authentication.md"
sourceSha256: "53a9a03b6a89344b4b42d1eadc13358569efdcd14189872d59d6ace47e869228"
pageSha256: "53a9a03b6a89344b4b42d1eadc13358569efdcd14189872d59d6ace47e869228"
contentMode: "local-full"
zh: ""
---

# OAuth Authentication for M365 Agent Plugins

This guide explains how to configure OAuth authentication for MCP server plugins and API plugins in your M365 Copilot agent. It covers endpoint discovery, credential acquisition, PKCE, and the `oauth/register` lifecycle step in `m365agents.yml`.

> **When to use this guide:**
> - Your MCP server requires OAuth authentication (most third-party MCP servers do)
> - Your API plugin requires OAuth (not just API key auth)
> - You need to register OAuth credentials in the Teams Developer Portal via ATK

> **When NOT to use this guide:**
> - The MCP server or API is unauthenticated → use `"auth": \{"type": "None"\}` directly
> - You're using API key authentication → handle via environment variables in the OpenAPI spec

---

## Overview

Authenticated plugins use a three-part setup:

1. **Discover** OAuth endpoints from the server's well-known metadata
2. **Obtain** client credentials (via Dynamic Client Registration or manual entry)
3. **Register** the OAuth configuration in `m365agents.yml` so ATK provisions it in the Teams Developer Portal

The result is a `<PREFIX>_MCP_AUTH_ID` environment variable that the plugin manifest references via `OAuthPluginVault`.

---

## Step 1: OAuth Endpoint Discovery

Attempt to auto-discover OAuth endpoints from the server's well-known metadata. Try **both** URLs in parallel:

```
GET <SERVER_ROOT>/.well-known/oauth-authorization-server
GET <SERVER_ROOT>/.well-known/openid-configuration
```

Where `<SERVER_ROOT>` is the scheme + host of the server URL (e.g., `https://mcp.example.com`).

### Field Mapping

| Plugin field | Well-known field |
|---|---|
| `authorizationUrl` | `authorization_endpoint` |
| `tokenUrl` | `token_endpoint` |
| `refreshUrl` | `token_endpoint` (same endpoint handles refresh grants) |
| `scope` | `scopes_supported` → join with comma (e.g., `"openid,email,profile"`). If no scopes are discovered or provided, default to `"openid"`. **If `scope` has no value, it MUST be quoted as `""`** — a bare `scope:` with no value is YAML null, not an empty string, and will fail schema validation. |

### If discovered

Show the values to the user and confirm:

> "I found the following OAuth endpoints for [name]. Shall I use these?
> - Authorization URL: ...
> - Token URL: ...
> - Refresh URL: ...
> - Scopes: ..."

### If not discovered

Ask the user to provide the four values. If the user doesn't have them, offer:

> "I can search for these values online — shall I proceed?"

Only search if the user confirms. Show results and confirm before using.

---

## Step 2: Client Credentials

### Dynamic Client Registration (DCR)

First, check if `registration_endpoint` is present in the well-known metadata from Step 1.

**If `registration_endpoint` is present → attempt DCR automatically:**

```bash
curl -s -X POST <registration_endpoint> \
  -H "Content-Type: application/json" \
  -d '{
    "client_name": "<display name> M365 Connector",
    "redirect_uris": ["https://teams.microsoft.com/api/platform/v1.0/oAuthRedirect"],
    "grant_types": ["authorization_code", "refresh_token"],
    "response_types": ["code"],
    "token_endpoint_auth_method": "client_secret_basic",
    "scope": "<discovered scopes>"
  }'
```

- If the response contains `client_id` and `client_secret` → use them directly. Tell the user credentials were obtained via dynamic registration. **Do NOT ask the user for credentials.**
- If DCR returns an error or no `client_secret` → fall through to manual entry below.

### Manual Credential Entry

**If `registration_endpoint` is absent OR DCR fails → ask the user:**

> "Please provide your OAuth client credentials for [name]:
> - Client ID:
> - Client Secret:"

### PKCE

After obtaining credentials (whether via DCR or manual entry), ask the user:

> "Would you like to enable PKCE (Proof Key for Code Exchange) for this connector? (yes/no)"

- If the user says yes → `isPKCEEnabled: true`
- If the user says no, or asks you to decide → `isPKCEEnabled: false`

### ⛔ Security Rules

- **NEVER** print, display, or reveal access tokens, bearer tokens, or client secrets in your output
- **NEVER** write secrets to any file — they are passed as OS environment variables at provision time only
- Treat `client_secret` as sensitive — store it only in `.env.*.user` files (which are gitignored)

---

## Step 3: Register in `m365agents.yml` and `m365agents.local.yml`

**⛔ CRITICAL:** You MUST add the `oauth/register` step to BOTH `m365agents.yml` AND `m365agents.local.yml`. Both files need identical `oauth/register` blocks — if you only update one, authentication will fail in that environment.

Add the `oauth/register` step to the `provision` lifecycle in both files, after `teamsApp/create` and before `teamsApp/zipAppPackage`:

```yaml
provision:
  - uses: teamsApp/create
    with:
