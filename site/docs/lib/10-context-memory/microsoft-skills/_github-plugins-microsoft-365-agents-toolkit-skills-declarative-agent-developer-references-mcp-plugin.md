---
title: "MCP Server Plugin Integration"
sourceId: "10-context-memory/microsoft-skills"
sourceTitle: "Microsoft Agent Skills"
sourceKind: "技能与配置库"
licenseLabel: "可转载"
lang: "英文"
tier: 3
volume: "10-context-memory"
sourceUrl: "https://github.com/microsoft/skills"
entryUrl: "https://github.com/microsoft/skills/blob/cf77b1efbf3117501f4727c476894751311ee885/.github/plugins/microsoft-365-agents-toolkit/skills/declarative-agent-developer/references/mcp-plugin.md"
sourceRel: ".github/plugins/microsoft-365-agents-toolkit/skills/declarative-agent-developer/references/mcp-plugin.md"
rawUrl: "/raw/10-context-memory/microsoft-skills/.github/plugins/microsoft-365-agents-toolkit/skills/declarative-agent-developer/references/mcp-plugin.md"
sourceSha256: "dd89c4f2dc257c89097ecccf87bbe0f6e65a5b0e9573b68d86790a115dea488a"
pageSha256: "dd89c4f2dc257c89097ecccf87bbe0f6e65a5b0e9573b68d86790a115dea488a"
contentMode: "local-full"
zh: ""
---

# MCP Server Plugin Integration

This guide explains how to integrate Model Context Protocol (MCP) servers as actions in your Microsoft 365 Copilot agent using JSON manifests. It covers both unauthenticated and OAuth-authenticated MCP servers.

> **⛔ SINGLE FILE ONLY:** MCP plugins require exactly **ONE file** — the plugin manifest (`\{name\}-plugin.json`). Tool descriptions are inlined directly in the manifest's `mcp_tool_description.tools` array. **Do NOT create a separate `\{name\}-mcp-tools.json` file.** There is no `"file"` property — only `"tools": [...]`.

## Overview

MCP servers expose tools that can be consumed by your agent. Unlike OpenAPI-based plugins, MCP plugins use a `RemoteMCPServer` runtime type and embed the tool descriptions directly in the plugin manifest.

> **⚠️ IMPORTANT:** `npx -y --package @microsoft/m365agentstoolkit-cli atk add action` does NOT support MCP servers — it only supports `--api-plugin-type api-spec` for OpenAPI plugins. MCP plugins MUST be created manually following the steps below. This is NOT a violation of the "Always Use `npx -y --package @microsoft/m365agentstoolkit-cli atk add action`" rule — that rule applies only to OpenAPI/REST API plugins.

## Prerequisites

- MCP server URL (must be accessible via HTTP/HTTPS)
- Node.js installed (for `mcp-remote` authentication helper)
- Logo images for the agent (color.png 192×192 and outline.png 32×32) — optional, see [Step 5: Logo Images](#step-5-logo-images-optional)

---

## Scaffold the Agent Project First

Before adding an MCP plugin, you **must** have a scaffolded agent project. Run `npx -y --package @microsoft/m365agentstoolkit-cli atk new` if you haven't already:

```bash
npx -y --package @microsoft/m365agentstoolkit-cli atk new \
  -n my-agent \
  -c declarative-agent \
  -i false
```

This creates `m365agents.yml` (and `m365agents.local.yml`) with the **5 required lifecycle steps**:

| Step | Lifecycle Action | What it does |
|------|-----------------|--------------|
| 1 | `teamsApp/create` | Registers the Teams app |
| 2 | `teamsApp/zipAppPackage` | Packages manifest + icons into a zip |
| 3 | `teamsApp/validateAppPackage` | Validates the package (icons, schema, etc.) |
| 4 | `teamsApp/update` | Uploads the package to Teams |
| 5 | `teamsApp/extendToM365` | **Extends the app to M365 Copilot** — generates `M365_TITLE_ID` |

**What breaks without `extendToM365`:** If this step is missing, `npx -y --package @microsoft/m365agentstoolkit-cli atk provision` will register the Teams app and generate `TEAMS_APP_ID`, but the agent will **never appear in Copilot Chat** because no `M365_TITLE_ID` is generated. This is the most common reason for "provision succeeded but agent not found" failures.

> **If you already have a project** but are missing `teamsApp/extendToM365`, add it to the `provision` lifecycle in `m365agents.yml` after `teamsApp/update`. See [deployment.md](/lib/10-context-memory/microsoft-skills/_github-plugins-microsoft-365-agents-toolkit-skills-declarative-agent-developer-references-deployment) for the full provisioning reference.

---

## Step-by-Step Integration

### Step 1: Get MCP Server URL

Ask the user for the MCP server URL. Example: `https://learn.microsoft.com/api/mcp`

Derive the **server root** (scheme + host only): e.g., `https://learn.microsoft.com`

### Step 2: Detect Authentication Requirements

Before discovering tools, determine if the MCP server requires OAuth authentication.

**Probe both well-known endpoints in parallel:**

```bash
curl -s <SERVER_ROOT>/.well-known/oauth-authorization-server
curl -s <SERVER_ROOT>/.well-known/openid-configuration
```

**Decision:**
- **OAuth metadata found** (either endpoint returns valid JSON with `authorization_endpoint`) → the server requires authentication. Follow [authentication.md](/lib/10-context-memory/microsoft-skills/_github-plugins-microsoft-365-agents-toolkit-skills-declarative-agent-developer-references-authentication) Steps 1-3 to discover endpoints, obtain credentials, and configure `oauth/register` in both `m365agents.yml` and `m365agents.local.yml`. Then continue to [Step 3](#step-3-discover-mcp-tools-mandatory) below for authenticated tool discovery.
- **No OAuth metadata** (both return 404 or non-JSON) → the server is unauthenticated. Skip directly to [Step 3](#step-3-discover-mcp-tools-mandatory) for unauthenticated tool discovery.

### Step 3: Discover MCP Tools (MANDATORY)

🚨 **THIS STEP IS MANDATORY — DO NOT SKIP**

You MUST discover tools via the MCP protocol directly. Tool discovery uses HTTP POST requests to the MCP server URL.

#### 3a. Authenticate (OAuth servers only)

If the server requires OAuth (detected in Step 2), perform a one-time authentication:

Tell the user:
> "I need to authenticate with [name]'s MCP server. A browser window will open — please sign in."

Run the command **interactively** (NOT backgrounded — do NOT append `&` or redirect to files):

```bash
npx -p mcp-remote@latest mcp-remote-client <MCP_SERVER_URL> --port 3334
```

Wait for it to complete. The command will open a browser for OAuth sign-in and then exit once authentication succeeds.

> **WSL / headless environments:** `mcp-remote` starts a local HTTP server for the OAuth callback and tries to open a browser. In WSL, the browser opens on the Windows host but the `http://127.0.0.1:3334/...` callback URL may not route back to WSL. If the browser opens but authentication seems stuck:
> 1. After signing in, copy the full callback URL from the browser (it will show an error or blank page)
