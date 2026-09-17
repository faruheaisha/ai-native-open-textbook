---
title: "Tool — Work IQ (type: mcp, preview) — Microsoft 365 work context"
sourceId: "10-context-memory/microsoft-skills"
sourceTitle: "Microsoft Agent Skills"
sourceKind: "技能与配置库"
licenseLabel: "可转载"
lang: "英文"
tier: 3
volume: "10-context-memory"
sourceUrl: "https://github.com/microsoft/skills"
entryUrl: "https://github.com/microsoft/skills/blob/cf77b1efbf3117501f4727c476894751311ee885/.github/plugins/azure-skills/skills/microsoft-foundry/foundry-agent/toolbox/references/tool-work-iq.md"
sourceRel: ".github/plugins/azure-skills/skills/microsoft-foundry/foundry-agent/toolbox/references/tool-work-iq.md"
rawUrl: "/raw/10-context-memory/microsoft-skills/.github/plugins/azure-skills/skills/microsoft-foundry/foundry-agent/toolbox/references/tool-work-iq.md"
sourceSha256: "d7b4d47ca67c6fc76ee9df2f5b4949681a22fb3fa7fb73beb082cebd354e7ae1"
pageSha256: "d7b4d47ca67c6fc76ee9df2f5b4949681a22fb3fa7fb73beb082cebd354e7ae1"
contentMode: "local-full"
zh: ""
---

# Tool — Work IQ (`type: mcp`, preview) — Microsoft 365 work context

Give the agent Microsoft 365 work context (mail, meetings, files, chats, and M365 agents) via the **Work IQ MCP server** at `https://workiq.svc.cloud.microsoft/mcp`. It attaches as a **remote MCP connection** and calls Work IQ as the **signed-in user**, so each user needs an **M365 Copilot license**. For the toolbox concept, versions, and endpoint, see [toolbox.md](/lib/10-context-memory/microsoft-skills/_github-plugins-azure-skills-skills-microsoft-foundry-foundry-agent-toolbox-toolbox).

- **Server URL:** `https://workiq.svc.cloud.microsoft/mcp`
- **Work IQ API app** (audience / scopes source): `fdcc1f02-fc51-4226-8753-f668596af7f7` ("Work IQ"), delegated scopes `WorkIQAgent.Ask`, `WorkIQAgent.Ask.Selected`, `WorkIQSettings.Read.All`, `WorkIQSettings.ReadWrite.All`.

> 🚦 Before creating a toolbox/connection either way, read [create-hosted.md → Toolbox creation boundary](/lib/10-context-memory/microsoft-skills/_github-plugins-azure-skills-skills-microsoft-foundry-foundry-agent-create-create-hosted#toolbox-creation-boundary).

## Two auth paths

Both preserve the caller's M365 identity; pick based on whether you can use Microsoft's managed audience or must bring your own Entra app.

| Path | `--auth-type` | Consent prompt? | When to use |
|---|---|---|---|
| **A. Entra passthrough** | `user-entra-token` + `--audience fdcc1f02-…` | No (for an already-trusted first-party identity) | Simplest — no app registration, no secret. The default. |
| **B. Custom OAuth (BYO app)** | `oauth2` + BYO `client-id`/`secret` | Yes — one-time per user | When your tenant requires you to own the app registration / control the granted scopes. |

Both were verified to return the same **10 Work IQ tools** (`ask`, `search_paths`, `get_schema`, `list_agents`, `fetch`, `call_function`, `do_action`, `create_entity`, `update_entity`, `delete_entity`) and a live `list_agents` result via the caller's identity.

---

# A. Entra passthrough (`user-entra-token`)

The connection carries the Work IQ audience; Foundry passes the caller's Entra identity through. No BYO app, no secret, no consent step.

```bash
# 0. Install the CLI extension (once)
azd extension install azure.ai.toolboxes

# 1. Create the connection (Entra passthrough + Work IQ audience)
azd ai connection create workiq-mcp-conn \
  --kind remote-tool --target https://workiq.svc.cloud.microsoft/mcp \
  --auth-type user-entra-token \
  --audience fdcc1f02-fc51-4226-8753-f668596af7f7 \
  --project-endpoint "$FOUNDRY_PROJECT_ENDPOINT"

# 2. Write the toolbox spec to a file, then create the toolbox
cat > workiq.yaml <<'EOF'
description: workiq toolbox
connections:
  - name: workiq-mcp-conn
EOF
azd ai toolbox create agent-tools --from-file workiq.yaml --project-endpoint "$FOUNDRY_PROJECT_ENDPOINT"
```

> `azd ai toolbox create` / `delete` require an **azd environment** (run inside an `azd init`'d directory), unlike `connection create` / `toolbox show` which work with just `--project-endpoint`.

**Add to an existing toolbox** (new version — then promote):

```bash
azd ai toolbox connection add agent-tools workiq-mcp-conn --project-endpoint "$FOUNDRY_PROJECT_ENDPOINT"
