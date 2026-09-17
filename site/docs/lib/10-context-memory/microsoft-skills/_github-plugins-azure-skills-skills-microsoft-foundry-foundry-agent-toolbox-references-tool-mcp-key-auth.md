---
title: "Tool — Remote MCP server, static key (type: mcp)"
sourceId: "10-context-memory/microsoft-skills"
sourceTitle: "Microsoft Agent Skills"
sourceKind: "技能与配置库"
licenseLabel: "可转载"
lang: "英文"
tier: 3
volume: "10-context-memory"
sourceUrl: "https://github.com/microsoft/skills"
entryUrl: "https://github.com/microsoft/skills/blob/cf77b1efbf3117501f4727c476894751311ee885/.github/plugins/azure-skills/skills/microsoft-foundry/foundry-agent/toolbox/references/tool-mcp-key-auth.md"
sourceRel: ".github/plugins/azure-skills/skills/microsoft-foundry/foundry-agent/toolbox/references/tool-mcp-key-auth.md"
rawUrl: "/raw/10-context-memory/microsoft-skills/.github/plugins/azure-skills/skills/microsoft-foundry/foundry-agent/toolbox/references/tool-mcp-key-auth.md"
sourceSha256: "e7250b9b5b6b9384690381511323c4df1e89528cce41d2c47a9fd15f0ba3d1d9"
pageSha256: "e7250b9b5b6b9384690381511323c4df1e89528cce41d2c47a9fd15f0ba3d1d9"
contentMode: "local-full"
zh: ""
---

# Tool — Remote MCP server, static key (`type: mcp`)

Attach a remote MCP server that authenticates with a **static key** (e.g. a GitHub PAT passed as a Bearer token) to a toolbox. This needs a **connection** (`--kind remote-tool --auth-type custom-keys`) — the toolbox references it by name and the created toolbox tool carries a populated `project_connection_id`. The key is stored on the connection, never in the toolbox spec.

> 🚦 Before creating a toolbox/connection either way, read [create-hosted.md → Toolbox creation boundary](/lib/10-context-memory/microsoft-skills/_github-plugins-azure-skills-skills-microsoft-foundry-foundry-agent-create-create-hosted#toolbox-creation-boundary).

---

# A. Imperative CLI

Steps 1–3 of [toolbox.md § The flow](/lib/10-context-memory/microsoft-skills/_github-plugins-azure-skills-skills-microsoft-foundry-foundry-agent-toolbox-toolbox#the-flow). Write the toolbox spec to a **file** — `azd ai toolbox create --from-file` takes a **path** (stdin `-` is not supported).

```bash
# 0. Install the CLI extension (once)
azd extension install azure.ai.toolboxes

# 1. Create the static-key connection (the key lives on the connection)
azd ai connection create github-mcp-conn \
  --kind remote-tool --target https://api.githubcopilot.com/mcp \
  --auth-type custom-keys --custom-key Authorization="Bearer $GITHUB_PAT" \
  --project-endpoint "$FOUNDRY_PROJECT_ENDPOINT"

# Write the toolbox spec to a file
cat > github-mcp.yaml <<'EOF'
description: github-mcp toolbox
connections:
  - name: github-mcp-conn
EOF
```

**Create a new toolbox** (first version auto-promoted):

```bash
azd ai toolbox create github-tools --from-file github-mcp.yaml --project-endpoint "$FOUNDRY_PROJECT_ENDPOINT"
```

> `azd ai toolbox create` / `delete` require an **azd environment** (run inside an `azd init`'d directory), unlike `connection create` / `toolbox show` which work with just `--project-endpoint`.

**Add to an existing toolbox** (new version — then promote):

```bash
azd ai toolbox connection add github-tools github-mcp-conn --project-endpoint "$FOUNDRY_PROJECT_ENDPOINT"
