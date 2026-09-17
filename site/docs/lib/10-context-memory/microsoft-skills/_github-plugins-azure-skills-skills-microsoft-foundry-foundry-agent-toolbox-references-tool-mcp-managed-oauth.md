---
title: "Tool — Remote MCP server, OAuth (Foundry-managed connector) (type: mcp)"
sourceId: "10-context-memory/microsoft-skills"
sourceTitle: "Microsoft Agent Skills"
sourceKind: "技能与配置库"
licenseLabel: "可转载"
lang: "英文"
tier: 3
volume: "10-context-memory"
sourceUrl: "https://github.com/microsoft/skills"
entryUrl: "https://github.com/microsoft/skills/blob/cf77b1efbf3117501f4727c476894751311ee885/.github/plugins/azure-skills/skills/microsoft-foundry/foundry-agent/toolbox/references/tool-mcp-managed-oauth.md"
sourceRel: ".github/plugins/azure-skills/skills/microsoft-foundry/foundry-agent/toolbox/references/tool-mcp-managed-oauth.md"
rawUrl: "/raw/10-context-memory/microsoft-skills/.github/plugins/azure-skills/skills/microsoft-foundry/foundry-agent/toolbox/references/tool-mcp-managed-oauth.md"
sourceSha256: "ced9ba2ccc0cf526b7cd38a585b1220a3d9c198e9a0a23e49932994187182d54"
pageSha256: "ced9ba2ccc0cf526b7cd38a585b1220a3d9c198e9a0a23e49932994187182d54"
contentMode: "local-full"
zh: ""
---

# Tool — Remote MCP server, OAuth (Foundry-managed connector) (`type: mcp`)

Attach a remote MCP server whose OAuth is **brokered by Foundry** — you do **not** supply `client_id` / `client_secret`. Use when the MCP server appears as a **catalog tile** ("Custom · Preview" / a connector-namespace connector) and you accept Microsoft's managed OAuth app. Foundry owns the app registration, token storage, and refresh; the first `tools/list` triggers a one-time per-user consent.

For the variant where you own the OAuth app (BYO `client_id` / `client_secret`), see [tool-mcp-custom-oauth.md](/lib/10-context-memory/microsoft-skills/_github-plugins-azure-skills-skills-microsoft-foundry-foundry-agent-toolbox-references-tool-mcp-custom-oauth). For the connector-namespace `gateway_connector` variant, see [foundry-tool-catalog.md → Gateway connector full flow](/lib/10-context-memory/microsoft-skills/_github-plugins-azure-skills-skills-microsoft-foundry-foundry-agent-create-references-foundry-tool-catalog#gateway-connector-full-flow).

> 🚦 Before creating a toolbox/connection, read [create-hosted.md → Toolbox creation boundary](/lib/10-context-memory/microsoft-skills/_github-plugins-azure-skills-skills-microsoft-foundry-foundry-agent-create-create-hosted#toolbox-creation-boundary).

There is **no redirect-URI round-trip** and **no `client_secret`** to manage — the two things the managed flow removes versus [tool-mcp-custom-oauth.md](/lib/10-context-memory/microsoft-skills/_github-plugins-azure-skills-skills-microsoft-foundry-foundry-agent-toolbox-references-tool-mcp-custom-oauth).

---

# Getting the catalog inputs

**Only the MCP tiles this query returns support managed OAuth.** Run the discovery script with `--managed-oauth` — it lists exactly the tiles you can attach with this reference:

```bash
../scripts/get-catalog-inputs.sh --managed-oauth      # bash
pwsh ../scripts/get-catalog-inputs.ps1 -ManagedOAuth  # PowerShell
```

Find the user's tile in the output and take the `connectorName`, `toolEntityId`, and `serverUrl` it prints for the CLI below. **If the tile is not in this list, managed OAuth does not apply to it** — it uses a different auth mode.

---

# A. Imperative CLI

Steps 1–3 of [toolbox.md § The flow](/lib/10-context-memory/microsoft-skills/_github-plugins-azure-skills-skills-microsoft-foundry-foundry-agent-toolbox-toolbox#the-flow). Managed OAuth maps to `azd ai connection create --auth-type oauth2` **with `--connector-name` and `--metadata`, but NO `--client-id` / `--client-secret`** — omitting the client credentials selects the Foundry-managed app (sends empty `credentials: \{\}`).

```bash
# 0. Install the CLI extension (once)
azd extension install azure.ai.toolboxes

# 1. Create the managed-OAuth (catalog_MCP) connection — no client id/secret
azd ai connection create github-mcp-managed \
  --kind remote-tool \
  --target https://api.githubcopilot.com/mcp \
  --auth-type oauth2 \
  --connector-name foundrygithubmcp \
  --metadata type=catalog_MCP \
  --metadata toolEntityId=azureml://location/eastus/apiCenter/registry-prod-bl/type/tools/objectId/github-mcp-server/version/1 \
  --project-endpoint "$FOUNDRY_PROJECT_ENDPOINT"

# Write the toolbox spec to a file (create takes a --from-file PATH; stdin '-' not supported)
cat > github-mcp.yaml <<'EOF'
description: github-mcp toolbox (managed OAuth)
connections:
  - name: github-mcp-managed
EOF
```

**Create a new toolbox** (first version auto-promoted):

```bash
azd ai toolbox create github-tools --from-file github-mcp.yaml --project-endpoint "$FOUNDRY_PROJECT_ENDPOINT"
```

> `toolbox create` / `delete` require an **azd environment** (run inside an `azd init`'d dir). `connection create` and `toolbox create` print a benign `no active azd environment` line even on success — check for the `... created` line, not the warning.

**Add to an existing toolbox** (new version — then promote):

```bash
azd ai toolbox connection add github-tools github-mcp-managed --project-endpoint "$FOUNDRY_PROJECT_ENDPOINT"
