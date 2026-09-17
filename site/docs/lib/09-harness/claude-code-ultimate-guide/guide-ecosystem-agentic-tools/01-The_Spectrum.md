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
entryUrl: "https://github.com/FlorianBruniaux/claude-code-ultimate-guide/blob/af05b84fb6e32432dae2114ee2a72c44ef3d29b1/guide/ecosystem/agentic-tools.md"
sourceRel: "guide/ecosystem/agentic-tools.md"
rawUrl: "/raw/09-harness/claude-code-ultimate-guide/guide/ecosystem/agentic-tools.md"
sourceSha256: "b8f74a0aa5f41faad7912a23e33e7953aba0d889eef308ce73eed6f3f3c04368"
pageSha256: "34a40489e5ad149d0377ad79d3866477488705b8f2e8e18b036f228092a7d393"
contentMode: "local-full"
zh: ""
---

## The Spectrum

Agent tools fall on a spectrum from interactive to autonomous:

```
Interactive pair programmer
  Claude Code, Codex CLI, Aider, Goose, opencode, Gemini CLI, crush
        |
  Hermes Agent (interactive + scheduled + messaging gateways)
        |
Autonomous issue fixer
  SWE-agent, Devin, claude -p in CI
        |
Multi-agent framework (build your own)
  CrewAI, LangGraph, AutoGen/MAF, MetaGPT
        |
Agent orchestrator (manage a fleet)
  Symphony (issue → run), Paperclip (goal → org chart)
```

**Interactive agents**: you stay in the loop, approve actions, redirect the agent. Best for daily coding, debugging, and exploratory work where requirements shift.

**Autonomous agents**: you assign a task and come back to a result. Best for well-specified, bounded tasks: fix this bug, implement this spec, review this PR. The quality of the task description determines the quality of the output more than the agent choice.

**Multi-agent frameworks**: libraries for building custom agent systems. Not coding tools themselves. You use LangGraph to build an agent, not to write code.

**Harness optimizers and meta-harnesses**: systems that modify a target harness and compare candidate versions. They are not another terminal coding-agent category. [ADAS](https://proceedings.iclr.cc/paper_files/paper/2025/hash/36b7acf6f6010652b3f2a433774a66fe-Abstract-Conference.html), [AFlow](https://arxiv.org/abs/2410.10762), [Meta-Harness](https://arxiv.org/abs/2603.28052), and [Agentic Harness Engineering](https://arxiv.org/abs/2604.25850) operate at this outer loop. Compare them through the [Landscape research layer](/lib/09-harness/claude-code-ultimate-guide/guide-ecosystem-agent-harness-landscape/index#harness-optimizers-and-meta-harnesses), not by placing them beside Claude Code or Codex in a runtime feature table.
