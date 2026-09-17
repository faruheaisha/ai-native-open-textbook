---
title: "Agent Teams Workflow"
sourceId: "09-harness/claude-code-ultimate-guide"
sourceTitle: "Claude Code Ultimate Guide"
sourceKind: "工程手册"
licenseLabel: "可转载"
lang: "英文"
tier: 3
volume: "09-harness"
sourceUrl: "https://github.com/FlorianBruniaux/claude-code-ultimate-guide"
entryUrl: "https://github.com/FlorianBruniaux/claude-code-ultimate-guide/blob/af05b84fb6e32432dae2114ee2a72c44ef3d29b1/guide/workflows/agent-teams.md"
sourceRel: "guide/workflows/agent-teams.md"
rawUrl: "/raw/09-harness/claude-code-ultimate-guide/guide/workflows/agent-teams.md"
sourceSha256: "a31f6529fd0d6c7f53e64323461842508bad29795405d8d1b81c69cbfb2ca812"
pageSha256: "dceb4090837f55288f31669cd38c2f182e2d397f7b6a50a2e3fe96f38deba0cb"
contentMode: "local-full"
zh: ""
---

# Agent Teams Workflow

> **Multi-agent parallel coordination for complex tasks**
> **Status**: Experimental (v2.1.32+) | **Model**: Opus 5 required (Opus 4.6+ compatible) | **Flag**: `CLAUDE_CODE_EXPERIMENTAL_AGENT_TEAMS=1`

**What**: Multiple Claude instances work in parallel on a shared codebase, coordinating autonomously without active human intervention. One session acts as team lead to break down tasks and synthesize findings from teammates.

**When introduced**: v2.1.32 (2026-02-05) as research preview
**Reading time**: ~30 min
**Prerequisites**: Opus 5 model (Opus 4.6+ compatible), understanding of [Sub-Agents](#split-role-sub-agents), familiarity with Task Tool

**🚀 Want to get started fast?** See **[Agent Teams Quick Start Guide](/lib/09-harness/claude-code-ultimate-guide/guide-workflows-agent-teams-quick-start)** (8-10 min, copy-paste patterns for your projects)

---

## 本篇目录

- [Team Coordination Is Not the Runtime Loop](https://github.com/FlorianBruniaux/claude-code-ultimate-guide/blob/af05b84fb6e32432dae2114ee2a72c44ef3d29b1/guide/workflows/01-Team_Coordination_Is_Not_the_Runtime_Loo.md)
- [Table of Contents](https://github.com/FlorianBruniaux/claude-code-ultimate-guide/blob/af05b84fb6e32432dae2114ee2a72c44ef3d29b1/guide/workflows/02-Table_of_Contents.md)
- [1. Overview](https://github.com/FlorianBruniaux/claude-code-ultimate-guide/blob/af05b84fb6e32432dae2114ee2a72c44ef3d29b1/guide/workflows/03-1._Overview.md)
- [📊 Industry Adoption Data (Anthropic 2026)](https://github.com/FlorianBruniaux/claude-code-ultimate-guide/blob/af05b84fb6e32432dae2114ee2a72c44ef3d29b1/guide/workflows/04-Industry_Adoption_Data_Anthropic_2026.md)
- [2. Architecture Deep-Dive](https://github.com/FlorianBruniaux/claude-code-ultimate-guide/blob/af05b84fb6e32432dae2114ee2a72c44ef3d29b1/guide/workflows/05-2._Architecture_Deep-Dive.md)
- [3. Setup & Configuration](https://github.com/FlorianBruniaux/claude-code-ultimate-guide/blob/af05b84fb6e32432dae2114ee2a72c44ef3d29b1/guide/workflows/06-3._Setup_Configuration.md)
- [4. Production Use Cases](https://github.com/FlorianBruniaux/claude-code-ultimate-guide/blob/af05b84fb6e32432dae2114ee2a72c44ef3d29b1/guide/workflows/07-4._Production_Use_Cases.md)
- [5. Workflow Impact Analysis](https://github.com/FlorianBruniaux/claude-code-ultimate-guide/blob/af05b84fb6e32432dae2114ee2a72c44ef3d29b1/guide/workflows/08-5._Workflow_Impact_Analysis.md)
- [6. Limitations & Gotchas](https://github.com/FlorianBruniaux/claude-code-ultimate-guide/blob/af05b84fb6e32432dae2114ee2a72c44ef3d29b1/guide/workflows/09-6._Limitations_Gotchas.md)
- [7. Decision Framework](https://github.com/FlorianBruniaux/claude-code-ultimate-guide/blob/af05b84fb6e32432dae2114ee2a72c44ef3d29b1/guide/workflows/10-7._Decision_Framework.md)
- [8. Best Practices](https://github.com/FlorianBruniaux/claude-code-ultimate-guide/blob/af05b84fb6e32432dae2114ee2a72c44ef3d29b1/guide/workflows/11-8._Best_Practices.md)
- [9. Troubleshooting](https://github.com/FlorianBruniaux/claude-code-ultimate-guide/blob/af05b84fb6e32432dae2114ee2a72c44ef3d29b1/guide/workflows/12-9._Troubleshooting.md)
- [9. Iterative Retrieval for Sub-Agents](https://github.com/FlorianBruniaux/claude-code-ultimate-guide/blob/af05b84fb6e32432dae2114ee2a72c44ef3d29b1/guide/workflows/13-9._Iterative_Retrieval_for_Sub-Agents.md)
- [10. Sources](https://github.com/FlorianBruniaux/claude-code-ultimate-guide/blob/af05b84fb6e32432dae2114ee2a72c44ef3d29b1/guide/workflows/14-10._Sources.md)
- [Feedback & Contributions](https://github.com/FlorianBruniaux/claude-code-ultimate-guide/blob/af05b84fb6e32432dae2114ee2a72c44ef3d29b1/guide/workflows/15-Feedback_Contributions.md)
- [Advanced Orchestration Patterns](https://github.com/FlorianBruniaux/claude-code-ultimate-guide/blob/af05b84fb6e32432dae2114ee2a72c44ef3d29b1/guide/workflows/16-Advanced_Orchestration_Patterns.md)
