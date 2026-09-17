---
title: "Claude Code Guide（zebbern）"
sourceId: "09-harness/claude-code-guide-zebbern"
sourceTitle: "Claude Code Guide（zebbern）"
sourceKind: "工程手册"
licenseLabel: "可转载"
lang: "英文"
tier: 3
volume: "09-harness"
sourceUrl: "https://github.com/zebbern/claude-code-guide"
entryUrl: "https://github.com/zebbern/claude-code-guide/blob/64c890fe74c3ccfad673dc9c71dc85b8dd2f4817/README.md"
sourceRel: "README.md"
rawUrl: "/raw/09-harness/claude-code-guide-zebbern/README.md"
sourceSha256: "9dbd9232d21737b4649272b11a869e7b4d58a0b56f019daf886f1648cf672988"
pageSha256: "9dbd9232d21737b4649272b11a869e7b4d58a0b56f019daf886f1648cf672988"
contentMode: "local-full"
zh: ""
---

# Claude Code Guide（zebbern）

<h2 id="claude-code-community-guide">Claude Code Guide</h2>

_For reference and contributions, visit the [official Claude Code documentation](https://code.claude.com/docs/en/overview)_

_Commands and provider model mappings change quickly; the linked official references remain authoritative._

&lt;kbd>

| Section                               | Status | Other Resources                                                                                         |
| ------------------------------------- | ------ | ------------------------------------------------------------------------------------------------------- |
| Getting Started                       | ✅   | **Claude-Code** [Docs](https://code.claude.com/docs/en/overview)                                    |
| Configuration & Environment Variables | ✅   | **Claude-Code via** [**Discord**](https://github.com/zebbern/claude-code-discord)                       |
| Commands & Usage                      | ✅   | Security Agents [SKILL.md](https://github.com/zebbern/claude-code-guide/tree/main/skills)               |
| Interface & Input                     | ✅   | Let Agent Create [SKILL.md](https://github.com/zebbern/agent-skills-authoring)                          |
| Advanced Features                     | ✅   | 954+ Agent [Skills](https://github.com/zebbern/antigravity-awesome-skills)                              |
| Automation & Integration              | ✅   | No cost ai [resources](https://github.com/zebbern/no-cost-ai)                                           |
| Help & Troubleshooting                | ✅   | 250+ Mermaid [templates](https://github.com/zebbern/mermaid-templates)                                  |
| Third-Party Integrations              | ✅   | Discord Communication [MCP](https://github.com/zebbern/discord-mcp-agent)                               |

&lt;/kbd>

---

<h3 id="content">Contents</h3>

**Fast paths:** [Install](#quick-start) · [Commands](#claude-commands) · [Config](#configuration--environment) · [MCP](#mcp-integration) · [Agents](#sub-agents) · [Troubleshoot](#help--troubleshooting)

| Area | Start here | Also useful |
| --- | --- | --- |
| [Getting Started](#getting-started) | [Quick Start](#quick-start) | [Initial Setup](#initial-setup), [System Requirements](#system-requirements) |
| [Configuration](#configuration--environment) | [Environment Variables](#environment-variables) | [Configuration Files](#configuration-files) |
| [Commands](#commands--usage) | [Slash Commands](#claude-commands) | [CLI Quick Reference](#cheat-sheet) |
| [Interface](#interface--input) | [Keyboard Shortcuts](#keyboard-shortcuts) | [Vim Mode](#vim-mode) |
| [Advanced Features](#advanced-features) | [Plan Mode](#plan-mode), [Auto Mode](#auto-mode), [MCP](#mcp-integration) | [Sub Agents](#sub-agents), [Skills](#skills), [Hooks](#hooks-system) |
| [Security](#security--permissions) | [Security & Permissions](#security--permissions) | [Dangerous Mode](#dangerous-mode), [Best Practices](#security-best-practices-main) |
| [Automation](#automation--integration) | [Automation & Scripting](#automation--scripting-with-claude-code) | [PR Review](#auto-pr-review-inline-comments), [Issue Triage](#issue-triage-suggest-labels--severity) |
| [Help](#help--troubleshooting) | [Troubleshooting](#help--troubleshooting) | [Best Practices](#best-practices), [Monitoring](#monitoring--alerting) |
| [Third-Party Integrations](#third-party-integrations) | [DeepSeek Integration](#deepseek-integration) | [Provider Setup Examples](#provider-setup-examples) |

<details>
<summary>Full content map</summary>

- **[Getting Started](#getting-started)**
  - [Quick Start](#quick-start)
  - [System Requirements](#system-requirements)
  - [Initial Setup](#initial-setup)

- **[Configuration & Environment](#configuration--environment)**
  - [Environment Variables](#environment-variables)
  - [Configuration Files](#configuration-files)

- **[Commands & Usage](#commands--usage)**
  - [Slash Command Reference](#claude-commands)
  - [CLI Quick Reference](#cheat-sheet)

- **[Interface & Input](#interface--input)**
  - [Keyboard Shortcuts](#keyboard-shortcuts)
  - [Vim Mode](#vim-mode)

- **[Advanced Features](#advanced-features)**
  - [Thinking Mode](#thinking-keywords)
  - [Effort Levels](#effort-levels)
  - [Advisor Tool](#advisor-tool)
  - [Fast Mode](#fast-mode)
  - [Auto Mode](#auto-mode)
  - [Plan Mode](#plan-mode)
  - [Background Tasks](#background-tasks)
  - [Workflows & Scheduling](#workflows--scheduling)
  - [Remote Sessions](#remote-sessions)
  - [Claude in Chrome](#claude-in-chrome)
  - [Desktop and IDEs](#desktop-and-ides)
  - [Sandbox Mode](#sandbox-mode)
  - [LSP Tool](#lsp-tool)
  - [Sub Agents](#sub-agents)
  - [Agent Teams](#agent-teams)
  - [Skills](#skills)
  - [Plugin System](#plugin-system)
  - [Worktree Isolation](#worktree-isolation)
  - [Native Installer](#native-installer)
  - [Authentication CLI](#claude-auth)
  - [Agent Management CLI](#claude-agents-cli)
  - [Remote Control](#remote-control)
  - [Managed Settings](#managed-settings)
  - [Model Updates](#model-updates)
  - [Theming & Customization](#theming--customization)
  - [Code Review](#code-review)
  - [Insights](#insights)
  - [MCP Integration](#mcp-integration)
  - [Hooks System](#hooks-system)

- **[Security & Permissions](#security--permissions)**
  - [Dangerous Mode](#dangerous-mode)
  - [Security Best Practices](#security-best-practices-main)

- **[Automation & Integration](#automation--integration)**
  - [Automation & Scripting](#automation--scripting-with-claude-code)
  - [Auto PR Review](#auto-pr-review-inline-comments)
  - [Issue Triage](#issue-triage-suggest-labels--severity)

- **[Help & Troubleshooting](#help--troubleshooting)**
  - [Installation Issues](#installation--nodejs-issues)
  - [MCP Issues](#mcp-model-context-protocol-issues)
  - [Best Practices](#best-practices)
  - [Monitoring & Alerting](#monitoring--alerting)

- **[Third-Party Integrations](#third-party-integrations)**
  - [Provider Setup Examples](#provider-setup-examples)
  - [DeepSeek Integration](#deepseek-integration)

</details>

---

<h1 id="getting-started">Getting Started</h1>

**Enable completion alerts:** run `/config` inside Claude Code and choose a notification channel such as **Terminal bell**.

<h2 id="quick-start">Quick Start</h2>

> [!TIP]
> **Run <mark>claude</mark> in a project directory to start the interface.**
>
> **Go to [Help & Troubleshooting](#help--troubleshooting) to fix issues...**

**Native installer (recommended; no Node.js required)**

macOS, Linux, or WSL:

```bash
curl -fsSL https://claude.ai/install.sh | bash
```

Windows PowerShell:

```powershell
irm https://claude.ai/install.ps1 | iex
```

Windows CMD:

```bat
curl -fsSL https://claude.ai/install.cmd -o install.cmd && install.cmd && del install.cmd
```

Supported package managers (manual updates by default):

```bash
brew install --cask claude-code
winget install Anthropic.ClaudeCode
```

npm distribution (supported; Node.js 22+ is required to install):

```bash
npm install -g @anthropic-ai/claude-code
```

Verify the installation, then start Claude Code:

```bash
claude --version
claude doctor
claude
```

Native installs update themselves. Homebrew, WinGet, and the signed `apt`, `dnf`, and `apk` repositories follow their package manager's update flow. See the [official setup guide](https://code.claude.com/docs/en/setup) for channels, version pinning, Linux repository setup, and signature verification. For an npm install, upgrade with `npm install -g @anthropic-ai/claude-code@latest`; do not use `sudo npm install -g`.

---

> [!Tip]
> <ins>**Open Project Via Terminal Into VS Code / Cursor**</ins>
>
> ### $ - <kbd>cd /path/to/project</kbd>
>
> ### $ - <kbd>code .</kbd>
>
> **Make sure you have the <mark>(Claude Code extension)</mark> installed in your VS Code / Cursor**

---

<h2 id="system-requirements">System Requirements</h2>

> - OS: macOS 13+, Windows 10 1809+/Windows Server 2019+, Ubuntu 20.04+, Debian 10+, or Alpine Linux 3.19+. Native Windows, WSL 1, and WSL 2 are supported.

> - Hardware: 4 GB+ RAM and an x64 or ARM64 processor

> - Software: Git is optional on native Windows; without Git for Windows, Claude uses the PowerShell tool instead of Bash. Node.js 22+ is required only to install through npm; the installed CLI is a native binary.

> - Internet: Connection for API calls

---

<h2 id="initial-setup">Initial Setup</h2>

Claude Code requires a Pro, Max, Team, Enterprise, or Console account; the free Claude.ai plan does not include Claude Code. The normal first-party flow is browser sign-in:

```bash
claude auth login             # Claude subscription
claude auth login --console   # Anthropic Console/API billing
claude auth status            # Verify the active login
```

For API automation or a provider/gateway deployment, inject credentials from an OS key store or secret manager instead of committing them:

```bash
export ANTHROPIC_API_KEY="$SECRET_FROM_YOUR_STORE" # bash/zsh: current process only
```

```powershell
$env:ANTHROPIC_API_KEY = $secretFromYourStore # PowerShell: current process only
```

> [!Important]
> A persistent `ANTHROPIC_API_KEY`, `ANTHROPIC_AUTH_TOKEN`, or credential helper selects API/provider authentication even if you are logged in. Subscription-only features such as Remote Control, cloud sessions, claude.ai MCP connectors, and notification preferences then remain unavailable. Do not commit credentials; use your platform's secret storage.

---

<h1 id="configuration--environment">Configuration & Environment</h1>

<h2 id="environment-variables">Environment Variables</h2>

> **Environment values can also be stored as strings under the `env` key in a `settings.json` file. The [official environment-variable reference](https://code.claude.com/docs/en/env-vars) is the exhaustive source.**

> [!Important]
> **On PowerShell, use `$env:NAME = "value"` for the current process. Persist secrets through an OS key store or secret manager, not a checked-in settings file.**

```bash
# Authentication and routing: set only when API/provider billing is intentional
export ANTHROPIC_API_KEY="$SECRET_FROM_YOUR_STORE"
export ANTHROPIC_AUTH_TOKEN="$TOKEN_FROM_YOUR_STORE"
export ANTHROPIC_BASE_URL="https://gateway.example.com"
export ANTHROPIC_CUSTOM_HEADERS="X-Trace-Id: 12345"

# Model selection and provider alias overrides
export ANTHROPIC_MODEL="sonnet"
