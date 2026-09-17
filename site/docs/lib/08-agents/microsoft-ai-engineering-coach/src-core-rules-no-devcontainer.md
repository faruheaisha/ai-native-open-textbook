---
title: "Description"
sourceId: "08-agents/microsoft-ai-engineering-coach"
sourceTitle: "AI Engineering Coach（微软）"
sourceKind: "系统课程"
licenseLabel: "可转载"
lang: "英文"
tier: 3
volume: "08-agents"
sourceUrl: "https://github.com/microsoft/AI-Engineering-Coach"
entryUrl: "https://github.com/microsoft/AI-Engineering-Coach/blob/18b1a3d16b586c171426c6a407cc5c2dc073556e/src/core/rules/no-devcontainer.md"
sourceRel: "src/core/rules/no-devcontainer.md"
rawUrl: "/raw/08-agents/microsoft-ai-engineering-coach/src/core/rules/no-devcontainer.md"
sourceSha256: "cf5ada805caee0204bfa312e921f8b431f7a6ea27fc588b81f56a9fc3b3a1fa8"
pageSha256: "cf5ada805caee0204bfa312e921f8b431f7a6ea27fc588b81f56a9fc3b3a1fa8"
contentMode: "local-full"
zh: ""
---

# Description
Detects terminal commands that ran on the host machine instead of inside a devcontainer. Per-session detection: a session is considered sandboxed when its runtime data shows `/workspaces/...` paths (the Codespaces / Remote-Containers convention). Sessions without that evidence are treated as host-execution and counted here.

# When Triggered
&#123;&#123;count&#125;&#125; terminal commands (&#123;&#123;pct&#125;&#125; of VS Code requests) ran directly on your host machine without a devcontainer. Agent-driven terminal commands can modify system state, install packages, or delete files outside the project.

# How to Improve
Set up a .devcontainer/devcontainer.json (or use a Codespace) to sandbox AI-driven terminal execution. Devcontainers isolate builds, installs, and destructive commands from your host OS — especially important when using agent mode with auto-approved terminal access.

# Examples
$ &#123;&#123;extra.command&#125;&#125;

# Detection Logic
```detect
scan: sessions
match: true
aggregate: count
dc: devcontainerStats(allSessions, allReqs)
emitCount: dc.terminalReqs
emitTotal: dc.vscodeReqs
check: dc.terminalReqs >= thresholds.minTerminalReqs AND dc.terminalRate >= thresholds.terminalRate
```
