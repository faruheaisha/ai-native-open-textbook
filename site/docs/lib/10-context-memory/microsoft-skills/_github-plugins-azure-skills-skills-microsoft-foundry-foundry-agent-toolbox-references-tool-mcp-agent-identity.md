---
title: "Tool — Remote MCP server, agent identity / project MI (type: mcp)"
sourceId: "10-context-memory/microsoft-skills"
sourceTitle: "Microsoft Agent Skills"
sourceKind: "技能与配置库"
licenseLabel: "可转载"
lang: "英文"
tier: 3
volume: "10-context-memory"
sourceUrl: "https://github.com/microsoft/skills"
entryUrl: "https://github.com/microsoft/skills/blob/cf77b1efbf3117501f4727c476894751311ee885/.github/plugins/azure-skills/skills/microsoft-foundry/foundry-agent/toolbox/references/tool-mcp-agent-identity.md"
sourceRel: ".github/plugins/azure-skills/skills/microsoft-foundry/foundry-agent/toolbox/references/tool-mcp-agent-identity.md"
rawUrl: "/raw/10-context-memory/microsoft-skills/.github/plugins/azure-skills/skills/microsoft-foundry/foundry-agent/toolbox/references/tool-mcp-agent-identity.md"
sourceSha256: "b02dd2707219eeab2c9bd82e2b4fa0f79cc62573d3d161c31f0ddfc4d1412237"
pageSha256: "b02dd2707219eeab2c9bd82e2b4fa0f79cc62573d3d161c31f0ddfc4d1412237"
contentMode: "local-full"
zh: ""
---

# Tool — Remote MCP server, agent identity / project MI (`type: mcp`)

Attach a remote MCP server that accepts an **Entra ID token minted for a Foundry-managed identity** — no user in the loop, no stored secret. Foundry acquires the token and presents it to the server; you authorize the identity on the target server before the agent invokes it. Needs a **connection** (`--kind remote-tool --auth-type agentic-identity` or `project-managed-identity`) scoped to the upstream resource via `--audience`; the toolbox references it by name and the created tool carries a populated `project_connection_id`.

Use this when the MCP server accepts an **app-only** service-principal token (not a user's) — e.g. the Microsoft-hosted Azure Language MCP, or your own Azure Functions MCP behind Easy Auth. For per-user identity instead, see [tool-mcp-user-entra-token.md](/lib/10-context-memory/microsoft-skills/_github-plugins-azure-skills-skills-microsoft-foundry-foundry-agent-toolbox-references-tool-mcp-user-entra-token).

> 🚦 Before creating a toolbox/connection either way, read [create-hosted.md → Toolbox creation boundary](/lib/10-context-memory/microsoft-skills/_github-plugins-azure-skills-skills-microsoft-foundry-foundry-agent-create-create-hosted#toolbox-creation-boundary).

## Pick the sub-type

| Sub-type | `--auth-type` | Stored `authType` | Identity used |
|---|---|---|---|
| **Agent Identity** | `agentic-identity` | `AgenticIdentityToken` | the **agent's own** managed identity (unique per published agent) |
| **Project Managed Identity** | `project-managed-identity` | `ProjectManagedIdentity` | the **shared project** managed identity (all agents share it) |

> **Agent identity resolves only inside a published agent.** A standalone `tools/list` against the toolbox returns `AgenticIdentityToken ... requires AgentInstanceClientId` — the token is minted only when a **deployed, published agent** invokes the toolbox. Project managed identity resolves without an agent, so use it to test the wiring first.

The **audience** is the Entra resource the target server validates the token against (`aud` must match). Where it comes from depends on the server:

- **Microsoft-hosted** (e.g. Azure Language MCP) → a well-known value from the server's docs, e.g. `https://cognitiveservices.azure.com/`. Authorize by granting the identity an **RBAC role** on the target resource.
