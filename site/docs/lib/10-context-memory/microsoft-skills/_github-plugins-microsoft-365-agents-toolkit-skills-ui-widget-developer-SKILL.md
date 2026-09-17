---
title: "Copilot MCP Server Development"
sourceId: "10-context-memory/microsoft-skills"
sourceTitle: "Microsoft Agent Skills"
sourceKind: "技能与配置库"
licenseLabel: "可转载"
lang: "英文"
tier: 3
volume: "10-context-memory"
sourceUrl: "https://github.com/microsoft/skills"
entryUrl: "https://github.com/microsoft/skills/blob/cf77b1efbf3117501f4727c476894751311ee885/.github/plugins/microsoft-365-agents-toolkit/skills/ui-widget-developer/SKILL.md"
sourceRel: ".github/plugins/microsoft-365-agents-toolkit/skills/ui-widget-developer/SKILL.md"
rawUrl: "/raw/10-context-memory/microsoft-skills/.github/plugins/microsoft-365-agents-toolkit/skills/ui-widget-developer/SKILL.md"
sourceSha256: "b24d0babae9e85054d30765abca0043a2c310ba7dc980d1da258c39b87f8cd12"
pageSha256: "b24d0babae9e85054d30765abca0043a2c310ba7dc980d1da258c39b87f8cd12"
contentMode: "local-full"
zh: ""
---

# Copilot MCP Server Development

## Telemetry Tagging

Before running any `atk` CLI commands, set the session environment variable so all CLI invocations are tagged as skill-initiated:
```bash
export ATK_CLI_SKILL=true
```
Run this once at the start of the session. All subsequent `atk` commands in the same terminal will inherit it.

## 🔀 PATH SELECTION

**Before proceeding, ask the user which path they want to take using AskUserQuestion.** Both are supported for M365 Copilot widget rendering. Present the tradeoffs and let them choose:

| | **OAI Apps** (this skill) | **MCP Apps Extension** (`modelcontextprotocol/ext-apps`) |
|---|---|---|
| **Standard** | OpenAI-specific | Official MCP standard |
| **Works in** | ChatGPT + M365 Copilot | M365 Copilot, ChatGPT, VSCode, and more |
| **Maturity** | Battle-tested, production-ready | New official standard, growing ecosystem |
| **Design** | OpenAI Apps SDK | MCP Apps protocol (cross-platform) |
| **When to choose** | Existing OAI app investment | Prefer the open standard, want broadest client support |

**Ask:** _"Would you like to build an OAI app (OpenAI Apps SDK — battle-tested, works in ChatGPT and M365 Copilot) or an MCP app (new official standard — works in M365 Copilot, ChatGPT, VSCode, and more)?"_

- **OAI apps** → Continue below. This skill covers everything you need.
- **MCP apps** → Install the `modelcontextprotocol/ext-apps` plugin (see below), then use the appropriate skill from that plugin.

### MCP Apps: Install ext-apps Plugin

If the user chooses MCP Apps, do this automatically (do not stop at explanation-only):

1. Run `/plugin marketplace add modelcontextprotocol/ext-apps`
2. Run `/plugin install mcp-apps@mcp-apps`
3. Confirm the plugin is available, then invoke the correct ext-apps skill based on user intent

If plugin commands are unavailable in the current environment, provide the exact commands below and ask the user to run them once, then continue by invoking the selected ext-apps skill.

Reference commands:

```
To build an MCP App, install the ext-apps plugin from the marketplace:

1. /plugin marketplace add modelcontextprotocol/ext-apps
2. /plugin install mcp-apps@mcp-apps

Then use one of these skills from that plugin:
- create-mcp-app      — Scaffold a new MCP App with interactive UI from scratch
- add-app-to-server   — Add interactive UI to an existing MCP server's tools
- migrate-oai-app     — Convert an existing OAI app to use MCP Apps
- convert-web-app     — Turn a web app into a hybrid web + MCP App

After installing, invoke the relevant skill to continue.
```

> **Note:** The ext-apps plugin lives in the external `modelcontextprotocol/ext-apps` marketplace — it is not part of this plugin collection.

**Handoff mapping after install:**
- New MCP app from scratch → `create-mcp-app`
- Add app UI to existing MCP server → `add-app-to-server`
- Migrate existing OAI app → `migrate-oai-app`
- Convert an existing web app → `convert-web-app`

---

## 📛 PROJECT DETECTION 📛

This skill triggers when building MCP servers with OAI app or widget rendering for Microsoft 365 Copilot Chat. The MCP server can be written in any language that supports the MCP protocol (TypeScript, Python, C#, etc.). The agent project and MCP server may live in the same repo, separate folders, or entirely different projects.

## Scenario Routing

| Starting Point | What You Need | Path |
|---------------|---------------|------|
| **Prefer MCP Apps standard** | Cross-platform widget support (M365 Copilot, ChatGPT, VSCode, and more) | Install `modelcontextprotocol/ext-apps`, then use `create-mcp-app` or `add-app-to-server` — see [Path Selection](#-path-selection) above |
| **From scratch** (no agent, no MCP server) | Full OAI app setup | Delegate agent scaffolding to `declarative-agent-developer` first, then return here for MCP server + widgets |
| **Existing M365 agent, new MCP server** | MCP server + widgets + mcpPlugin.json | Start at [Implementation](#implementation) |
| **Existing MCP server, add Copilot widgets** | Widget support added to existing server | Start at [Copilot Widget Protocol](/lib/10-context-memory/microsoft-skills/_github-plugins-microsoft-365-agents-toolkit-skills-ui-widget-developer-references-copilot-widget-protocol#adaptation-checklist-existing-mcp-server) |
| **Language choice** (non-TypeScript) | Protocol requirements | See [Copilot Widget Protocol](/lib/10-context-memory/microsoft-skills/_github-plugins-microsoft-365-agents-toolkit-skills-ui-widget-developer-references-copilot-widget-protocol) for what to implement, [MCP Server Pattern (TypeScript)](/lib/10-context-memory/microsoft-skills/_github-plugins-microsoft-365-agents-toolkit-skills-ui-widget-developer-references-mcp-server-pattern) as a reference |

---

## 🚨 CRITICAL EXECUTION RULES 🚨

**FLUENT UI ENFORCEMENT (REQUIRED):** Widget implementations MUST use React + Fluent UI components. Before writing any widget code, the agent MUST read and follow:
- `references/widget-patterns.md`
- `references/best-practices.md`
**FLUENT UI PACKAGE REQUIREMENT (REQUIRED):** The widget project MUST include Fluent UI dependencies before implementation. At minimum, install and keep these in the widget package dependencies:
- `@fluentui/react-components`
- `react`
- `react-dom`

If any of these packages are missing, install them automatically before continuing with widget code generation.
