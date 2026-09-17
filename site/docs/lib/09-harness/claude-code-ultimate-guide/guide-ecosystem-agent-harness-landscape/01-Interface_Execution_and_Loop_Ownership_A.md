---
title: "Claude Code Ultimate Guide"
sourceId: "09-harness/claude-code-ultimate-guide"
sourceTitle: "Claude Code Ultimate Guide"
sourceKind: "工程手册"
licenseLabel: "可转载"
lang: "英文"
tier: 3
volume: "09-harness"
sourceUrl: "https://github.com/FlorianBruniaux/claude-code-ultimate-guide"
entryUrl: "https://github.com/FlorianBruniaux/claude-code-ultimate-guide/blob/af05b84fb6e32432dae2114ee2a72c44ef3d29b1/guide/ecosystem/agent-harness-landscape.md"
sourceRel: "guide/ecosystem/agent-harness-landscape.md"
rawUrl: "/raw/09-harness/claude-code-ultimate-guide/guide/ecosystem/agent-harness-landscape.md"
sourceSha256: "ac957939ce9efa9622de77b893de044c67ec7891fba95a63115acdad64fa6d55"
pageSha256: "8e4151cb4adf9787ff1b55362fd5203b4a732b1519a903e8e11c6b305f7f5bdc"
contentMode: "local-full"
zh: ""
---

## Interface, Execution, and Loop Ownership Are Separate

`IDE`, `ADE`, `CLI`, and `web agent` describe how a person reaches a product. They do not establish where the code runs or which component owns the agent loop. `ADE`, short for agentic development environment, is useful vendor language but not a stable comparison category: one product can expose an editor, a terminal agent, a desktop application, and a cloud control surface at the same time.

This catalog therefore uses a controlled interface vocabulary:

| Interface | Meaning in this map |
|---|---|
| `cli` | A command-line entry point suitable for terminal use or scripting |
| `tui` | An interactive terminal interface, including full-screen terminal applications |
| `ide` | An editor or IDE integration where the agent works beside source code |
| `desktop` | A dedicated native desktop application |
| `web` | A browser interface or remote run-monitoring surface |
| `chat` | A chat or issue-driven entry point such as Slack, Discord, or a tracker |

Treat these as multi-value labels, not mutually exclusive product classes. Then evaluate two independent axes: execution location (`local`, `remote`, or `hybrid`) and loop ownership (`runtime`, `orchestrator`, or `no loop`). For example, [Warp Agent](/lib/09-harness/claude-code-ultimate-guide/guide-ecosystem-agentic-tools/index#19-warp-agent-cli) is reachable as a standalone CLI with an interactive terminal UI and optional cloud handoff. Its interface does not by itself prove locality, autonomy, sandboxing, or provider independence.
