---
title: "Tool — Remote MCP server, custom OAuth2 app (BYO) (type: mcp)"
sourceId: "10-context-memory/microsoft-skills"
sourceTitle: "Microsoft Agent Skills"
sourceKind: "技能与配置库"
licenseLabel: "可转载"
lang: "英文"
tier: 3
volume: "10-context-memory"
sourceUrl: "https://github.com/microsoft/skills"
entryUrl: "https://github.com/microsoft/skills/blob/cf77b1efbf3117501f4727c476894751311ee885/.github/plugins/azure-skills/skills/microsoft-foundry/foundry-agent/toolbox/references/tool-mcp-custom-oauth.md"
sourceRel: ".github/plugins/azure-skills/skills/microsoft-foundry/foundry-agent/toolbox/references/tool-mcp-custom-oauth.md"
rawUrl: "/raw/10-context-memory/microsoft-skills/.github/plugins/azure-skills/skills/microsoft-foundry/foundry-agent/toolbox/references/tool-mcp-custom-oauth.md"
sourceSha256: "37c3da1bd4338a28653f8eef4f4d867aea1bb98c486c30a10b57079cde1d387b"
pageSha256: "37c3da1bd4338a28653f8eef4f4d867aea1bb98c486c30a10b57079cde1d387b"
contentMode: "local-full"
zh: ""
---

# Tool — Remote MCP server, custom OAuth2 app (BYO) (`type: mcp`)

Attach a remote MCP server that authenticates with **your own OAuth2 app** (bring-your-own `client_id` / `client_secret`) — when you own the OAuth app and control the client, scopes, and secret. Either a **third-party / non-Azure MCP** whose OAuth app you register, or a **private MCP on Azure** ([custom MCP on Azure Functions](https://learn.microsoft.com/en-us/azure/foundry/mcp/build-your-own-mcp-server?view=foundry)).

> 🚦 Before creating a toolbox/connection, read [create-hosted.md → Toolbox creation boundary](/lib/10-context-memory/microsoft-skills/_github-plugins-azure-skills-skills-microsoft-foundry-foundry-agent-create-create-hosted#toolbox-creation-boundary).

**Flow at a glance** (the redirect URI is chicken-and-egg — OAuth app and connection each need something from the other):
1. **Create the OAuth app** and collect the five inputs — [Getting the OAuth2 inputs](#getting-the-oauth2-inputs). Leave the callback URL as a placeholder.
2. **Create connection + toolbox** — [A. Imperative CLI](#a-imperative-cli) (or [B. Declarative](#b-declarative-azureyaml)).
3. **Register the connection's reply URL** on the OAuth app — [Set the connector redirect URI](#set-the-connector-redirect-uri-after-the-connection-exists).
4. **Verify** — the first `tools/list` returns a one-time consent URL — [Verify](#verify).

---

# Getting the OAuth2 inputs

BYO OAuth2 needs five inputs — `client-id`, `client-secret`, `authorization-url`, `token-url`, `scopes` — feeding the connection in section A. Their source depends on the MCP origin.

## Origin 1 — Third-party / non-Azure MCP (you register the OAuth app)

Hosted elsewhere (SaaS, partner, or your own non-Azure host). Register an OAuth app with **that provider's** identity system and supply all five inputs. Example: a **GitHub OAuth App**.
1. Create the app at **[github.com/settings/applications/new](https://github.com/settings/applications/new)**. Use any name/homepage URL; set **Authorization callback URL** to a placeholder — replace it after the connection exists ([Set the connector redirect URI](#set-the-connector-redirect-uri-after-the-connection-exists)).
2. Copy the **Client ID** and **Generate a new client secret**.
3. Map to connection inputs:

   | Connection input | GitHub OAuth App value |
   |---|---|
   | `--client-id` | **Client ID** |
   | `--client-secret` | the generated **client secret** |
   | `--authorization-url` | `https://github.com/login/oauth/authorize` |
   | `--token-url` | `https://github.com/login/oauth/access_token` |
   | `--scopes` | space-delimited scope(s) your MCP needs — e.g. `read:user` |

Now create the connection (section A), then [Set the connector redirect URI](#set-the-connector-redirect-uri-after-the-connection-exists). Any OAuth2 provider works the same — swap GitHub's endpoint URLs for yours.

## Origin 2 — Azure-hosted MCP you build (starter)

Building your own MCP on Azure Functions? The sample template's `azd up` emits four inputs plus the target; you add a client secret. Recipe: [tool-mcp-custom-oauth-azure-starter.md](/lib/10-context-memory/microsoft-skills/_github-plugins-azure-skills-skills-microsoft-foundry-foundry-agent-toolbox-references-tool-mcp-custom-oauth-azure-starter).

---

# A. Imperative CLI

Steps 1–3 of [toolbox.md § The flow](/lib/10-context-memory/microsoft-skills/_github-plugins-azure-skills-skills-microsoft-foundry-foundry-agent-toolbox-toolbox#the-flow). Write the toolbox spec to a **file** — `--from-file` takes a **path** (no stdin `-`). Fill the five inputs from your MCP origin.

```bash
# 0. Install the CLI extension (once)
azd extension install azure.ai.toolboxes

# 1. Create the BYO OAuth2 connection (client secret comes from your MCP's origin, above)
azd ai connection create private-mcp-oauth \
