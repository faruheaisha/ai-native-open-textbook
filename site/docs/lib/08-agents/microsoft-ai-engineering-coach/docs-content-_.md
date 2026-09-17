---
title: "AI Engineering Coach（微软）"
sourceId: "08-agents/microsoft-ai-engineering-coach"
sourceTitle: "AI Engineering Coach（微软）"
sourceKind: "系统课程"
licenseLabel: "可转载"
lang: "英文"
tier: 3
volume: "08-agents"
sourceUrl: "https://github.com/microsoft/AI-Engineering-Coach"
entryUrl: "https://github.com/microsoft/AI-Engineering-Coach/blob/18b1a3d16b586c171426c6a407cc5c2dc073556e/docs/content/_index.md"
sourceRel: "docs/content/_index.md"
rawUrl: "/raw/08-agents/microsoft-ai-engineering-coach/docs/content/_index.md"
sourceSha256: "ef42c655c23b238cfa1e0ac42d821dea6baca4bebe0a9184958822d7c66497b9"
pageSha256: "ef42c655c23b238cfa1e0ac42d821dea6baca4bebe0a9184958822d7c66497b9"
contentMode: "local-full"
zh: ""
---

# AI Engineering Coach（微软）

## Privacy First

AI Engineer Coach is entirely **read-only** and ships with **zero telemetry**. It parses log files that already exist on your machine and never sends data anywhere. Your usage data stays local.

## Multi-Harness Support

AI Engineer Coach reads logs from multiple AI coding tools:

| Harness | Source |
|---|---|
| **Local Agent / Local Agent (Insiders)** | Chat panel logs in the extension host directory (VS Code / VS Code Insiders) |
| **Local Agent (Server) / Local Agent (Server Insiders)** | Remote host chat panel logs under `~/.vscode-server/data/User/workspaceStorage/` or `~/.vscode-server-insiders/data/User/workspaceStorage/` |
| **GitHub Copilot for Xcode** | Copilot Chat conversations from Apple's Xcode IDE |
| **Claude** | Session files from Anthropic's CLI-based coding assistant |
| **Codex** | Session history from OpenAI's terminal agent |
| **OpenCode** | Session logs from the open-source terminal coding tool |
| **GitHub Copilot CLI** | Session state and history from the Copilot CLI terminal agent |

## How It Works

AI Engineer Coach runs as a VS Code extension. On activation, it scans your local log directories for supported tools, parses every session into structured data, and renders an interactive webview panel with dashboards, charts, and actionable findings. The analysis pipeline is organized around three areas: **Observe**, **Measure**, and **Improve**, plus a **Level Up** section that turns your data into a progression system.

## Editable Rule Engine

Anti-pattern detection is driven by an editable rule engine. Each detector is a markdown file with YAML frontmatter and a small DSL that you can inspect, tune, and extend. The [Rule Editor](https://github.com/microsoft/AI-Engineering-Coach/blob/18b1a3d16b586c171426c6a407cc5c2dc073556e/improve/rule-editor/README.md) lets you live-test changes against your own data, and an AI builder can scaffold new rules from a natural-language description. The [Rule Playground](https://github.com/microsoft/AI-Engineering-Coach/blob/18b1a3d16b586c171426c6a407cc5c2dc073556e/improve/rule-playground/README.md) is an interactive REPL for the DSL, and the [Data Explorer](https://github.com/microsoft/AI-Engineering-Coach/blob/18b1a3d16b586c171426c6a407cc5c2dc073556e/improve/data-explorer/README.md) shows every field and distribution the rules can key off.
