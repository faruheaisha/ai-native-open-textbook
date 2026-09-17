---
title: "Tool — Remote MCP server, no auth (type: mcp)"
sourceId: "10-context-memory/microsoft-skills"
sourceTitle: "Microsoft Agent Skills"
sourceKind: "技能与配置库"
licenseLabel: "可转载"
lang: "英文"
tier: 3
volume: "10-context-memory"
sourceUrl: "https://github.com/microsoft/skills"
entryUrl: "https://github.com/microsoft/skills/blob/cf77b1efbf3117501f4727c476894751311ee885/.github/plugins/azure-skills/skills/microsoft-foundry/foundry-agent/toolbox/references/tool-mcp-noauth.md"
sourceRel: ".github/plugins/azure-skills/skills/microsoft-foundry/foundry-agent/toolbox/references/tool-mcp-noauth.md"
rawUrl: "/raw/10-context-memory/microsoft-skills/.github/plugins/azure-skills/skills/microsoft-foundry/foundry-agent/toolbox/references/tool-mcp-noauth.md"
sourceSha256: "e5dea83b3da28330e94bd2144960e83f2a88d653d27300901580f4bf5d93a2fd"
pageSha256: "e5dea83b3da28330e94bd2144960e83f2a88d653d27300901580f4bf5d93a2fd"
contentMode: "local-full"
zh: ""
---

# Tool — Remote MCP server, no auth (`type: mcp`)

Attach a **public** remote MCP server (no credentials) to a toolbox. A no-auth server still needs a **connection** (`--kind remote-tool --auth-type none`) — the toolbox references it by name and the created toolbox tool carries a populated `project_connection_id`.

> 🚦 Before creating a toolbox/connection either way, read [create-hosted.md → Toolbox creation boundary](/lib/10-context-memory/microsoft-skills/_github-plugins-azure-skills-skills-microsoft-foundry-foundry-agent-create-create-hosted#toolbox-creation-boundary).

---

# A. Imperative CLI

Steps 1–3 of [toolbox.md § The flow](/lib/10-context-memory/microsoft-skills/_github-plugins-azure-skills-skills-microsoft-foundry-foundry-agent-toolbox-toolbox#the-flow). Write the toolbox spec to a **file** — `azd ai toolbox create --from-file` takes a **path** (stdin `-` is not supported).

```bash
# 0. Install the CLI extension (once)
azd extension install azure.ai.toolboxes

# 1. Create the no-auth connection
azd ai connection create learn-mcp-conn \
  --kind remote-tool --target https://learn.microsoft.com/api/mcp \
  --auth-type none --project-endpoint "$FOUNDRY_PROJECT_ENDPOINT"

# Write the toolbox spec to a file
cat > learn-mcp.yaml <<'EOF'
description: learn-mcp toolbox
connections:
  - name: learn-mcp-conn
EOF
```

**Create a new toolbox** (first version auto-promoted):

```bash
azd ai toolbox create learn-tools --from-file learn-mcp.yaml --project-endpoint "$FOUNDRY_PROJECT_ENDPOINT"
```

> `azd ai toolbox create` / `delete` require an **azd environment** (run inside an `azd init`'d directory), unlike `connection create` / `toolbox show` which work with just `--project-endpoint`.

**Add to an existing toolbox** (new version — then promote):

```bash
azd ai toolbox connection add learn-tools learn-mcp-conn --project-endpoint "$FOUNDRY_PROJECT_ENDPOINT"
