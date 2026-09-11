---
title: "OpenClaw examples"
sourceId: "10-context-memory/context-engineering-book"
sourceTitle: "Context Engineering（Bonigarcia 教程）"
sourceKind: "工程手册"
licenseLabel: "可转载"
lang: "英文"
tier: 2
volume: "10-context-memory"
sourceUrl: "https://github.com/bonigarcia/context-engineering"
entryUrl: "https://github.com/bonigarcia/context-engineering/blob/46719154489e410b509db4fb69ab1c29fb3362a0/README.md"
zh: ""
---

# OpenClaw examples

These examples show OpenClaw as an assistant gateway: it routes messages, coordinates specialized agents, and keeps longer-running work recoverable.
Each folder is self-contained so you can inspect the config, read the supporting notes, and run one scenario without pulling in the others.

## Requirements

- An OpenClaw installation that can load a local folder containing `openclaw.json5`
- The API key required by the example you want to run; each example README lists its provider

## Examples

- [`personal_assistant_gateway/`](https://github.com/bonigarcia/context-engineering/blob/46719154489e410b509db4fb69ab1c29fb3362a0/ch10/openclaw/personal_assistant_gateway/README.md): Channel routing, local tool access, and approval gates.
- [`specialized_agent_team/`](https://github.com/bonigarcia/context-engineering/blob/46719154489e410b509db4fb69ab1c29fb3362a0/ch10/openclaw/specialized_agent_team/README.md): Lead plus specialist agents with shared project memory.
- [`durable_ops_assistant/`](/lib/10-context-memory/context-engineering-book/ch10-openclaw-durable_ops_assistant-README): Scheduling, retries, and resume-after-interruption behavior.

## How to use these examples

1. Open the example folder you want to explore.
2. Read its `README.md` first.
3. Inspect the config and support files referenced in that README.
4. In OpenClaw, open the folder as a workspace and load the `openclaw.json5` file from the folder root.
