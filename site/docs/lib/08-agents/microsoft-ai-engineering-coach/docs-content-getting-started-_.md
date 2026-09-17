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
entryUrl: "https://github.com/microsoft/AI-Engineering-Coach/blob/18b1a3d16b586c171426c6a407cc5c2dc073556e/docs/content/getting-started/_index.md"
sourceRel: "docs/content/getting-started/_index.md"
rawUrl: "/raw/08-agents/microsoft-ai-engineering-coach/docs/content/getting-started/_index.md"
sourceSha256: "27dfe1a31128f6044af89a75ffd92e4249351871e9eb03d9c848e6c7727e6fda"
pageSha256: "27dfe1a31128f6044af89a75ffd92e4249351871e9eb03d9c848e6c7727e6fda"
contentMode: "local-full"
zh: ""
---

# AI Engineering Coach（微软）

AI Engineer Coach is a VS Code extension that analyzes your AI-assisted coding sessions. It reads local log files from VS Code, GitHub Copilot for Xcode, Claude, Codex, OpenCode, and GitHub Copilot CLI, then presents detailed analytics in an interactive webview panel.

## Requirements

- **VS Code** 1.85 or later (or VS Code Insiders) — harness shown as "Local Agent"
- At least one supported AI coding tool with existing session logs

No API keys, accounts, or external services required. Everything runs locally.

## Quick Start

1. [Install AI Engineer Coach](&#123;&#123;< ref "getting-started/installation" >&#125;&#125;) by building the `.vsix` from source
2. Open the Command Palette (`Cmd+Shift+P` / `Ctrl+Shift+P`)
3. Run **AI Engineer Coach: Open Dashboard**
4. The extension scans your local log directories and displays your analytics

The dashboard opens as a webview panel inside VS Code. Use the sidebar to navigate between views.
