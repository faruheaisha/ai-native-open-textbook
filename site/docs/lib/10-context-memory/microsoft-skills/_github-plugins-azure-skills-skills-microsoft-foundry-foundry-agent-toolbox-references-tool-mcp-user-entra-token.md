---
title: "Tool — Remote MCP server, user Entra token (type: mcp, auth UserEntraToken)"
sourceId: "10-context-memory/microsoft-skills"
sourceTitle: "Microsoft Agent Skills"
sourceKind: "技能与配置库"
licenseLabel: "可转载"
lang: "英文"
tier: 3
volume: "10-context-memory"
sourceUrl: "https://github.com/microsoft/skills"
entryUrl: "https://github.com/microsoft/skills/blob/cf77b1efbf3117501f4727c476894751311ee885/.github/plugins/azure-skills/skills/microsoft-foundry/foundry-agent/toolbox/references/tool-mcp-user-entra-token.md"
sourceRel: ".github/plugins/azure-skills/skills/microsoft-foundry/foundry-agent/toolbox/references/tool-mcp-user-entra-token.md"
rawUrl: "/raw/10-context-memory/microsoft-skills/.github/plugins/azure-skills/skills/microsoft-foundry/foundry-agent/toolbox/references/tool-mcp-user-entra-token.md"
sourceSha256: "d53140a022575770bcead37ad2631bd3453730233628813819c8d089726a9a27"
pageSha256: "d53140a022575770bcead37ad2631bd3453730233628813819c8d089726a9a27"
contentMode: "local-full"
zh: ""
---

# Tool — Remote MCP server, user Entra token (`type: mcp`, auth `UserEntraToken`)

Attach a remote MCP server that authenticates with the **caller's own Entra identity** — the platform forwards the signed-in user's Entra token to the MCP server (auth type `UserEntraToken`), so the server sees the **end user**, not a shared credential. No BYO app registration, client secret, or OAuth consent flow. Needs a **connection** (`--kind remote-tool --auth-type user-entra-token`) scoped to the upstream resource via `--audience`; the toolbox references it by name and the created tool carries a populated `project_connection_id`.

Use this when the MCP server enforces per-user permissions off the caller's Entra identity (e.g. Microsoft 365 / Graph-backed services). [Work IQ](/lib/10-context-memory/microsoft-skills/_github-plugins-azure-skills-skills-microsoft-foundry-foundry-agent-toolbox-references-tool-work-iq) is a concrete, preview instance of this pattern.

> 🚦 Before creating a toolbox/connection either way, read [create-hosted.md → Toolbox creation boundary](/lib/10-context-memory/microsoft-skills/_github-plugins-azure-skills-skills-microsoft-foundry-foundry-agent-create-create-hosted#toolbox-creation-boundary).

---

# Getting the catalog inputs

**Only the MCP tiles this query returns support user-entra-token.** Run the discovery script with `--user-entra-token` — it lists exactly the tiles you can attach with this reference, each with the **`audience`** its connection needs:

```bash
../scripts/get-catalog-inputs.sh --user-entra-token      # bash
pwsh ../scripts/get-catalog-inputs.ps1 -UserEntraToken   # PowerShell
```

**If the tile is not in this list, user-entra-token does not apply to it** — it uses a different auth mode.

---

# A. Imperative CLI

Steps 1–3 of [toolbox.md § The flow](/lib/10-context-memory/microsoft-skills/_github-plugins-azure-skills-skills-microsoft-foundry-foundry-agent-toolbox-toolbox#the-flow). Write the toolbox spec to a **file** — `azd ai toolbox create --from-file` takes a **path** (stdin `-` is not supported).

```bash
# 0. Install the CLI extension (once)
azd extension install azure.ai.toolboxes

# 1. Create the user-entra-token MCP connection (no secret; audience scopes the forwarded token)
azd ai connection create entra-mcp-conn \
