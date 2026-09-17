---
title: "openai-cookbook-docs"
sourceId: "08-agents/openai-cookbook-docs"
sourceTitle: "openai-cookbook-docs"
sourceKind: "官方文档"
licenseLabel: "仅引用"
lang: "英文"
tier: 3
volume: "08-agents"
sourceUrl: "https://developers.openai.com/cookbook"
entryUrl: "https://developers.openai.com/cookbook"
sourceRel: "cookbook/examples/agents_sdk/agent_improvement_loop.md"
rawUrl: "/raw/08-agents/openai-cookbook-docs/cookbook/examples/agents_sdk/agent_improvement_loop.md"
sourceSha256: "e4974f3b65d46cea41ba7561497e8602ad0731cfc5d1ab4d976c4f0246ea610a"
pageSha256: "f2fdb46858cc04a0ebca3f0a2c1c9e5b4ac117501ff008611c0752afc1e4ebd8"
contentMode: "local-full"
zh: ""
---

## What you will build

![Agent improvement loop flywheel](https://developers.openai.com/cookbook/assets/images/agent-improvement-loop-flywheel.svg)

By the end, you will have:

1. An OpenAI Agents SDK-backed financial analyst that reviews a fictional company's diligence materials across five traced runs
2. Human and LLM-generated feedback over those same traces
3. An automatically generated Promptfoo eval suite
4. A Promptfoo validation gate over the current agent behavior
5. A HALO optimization pass over the traces, feedback, and eval results
6. A developer-facing handoff to Codex so it can implement the recommended harness changes

The agent supports acquisition diligence for a fictional company. It reviews financial exports, customer data, contracts, security notes, board materials, and management narratives, then answers diligence questions with citations and reviewable artifacts.

The loop writes one file that carries the work forward: the generated `codex_handoff.md` file under `ARTIFACT_DIR`. It contains the full HALO diagnosis, the ranked recommendations, the evidence behind them, and the implementation guidance Codex needs for the next harness update.

The degree of automation is up to the developer. You can use the loop to propose a reviewed change set, or connect it to a workflow that opens, merges, and deploys pull requests automatically. A common starting point is a reviewed loop, where the system proposes the change set and a developer approves the diff before merge. As the eval gate becomes more trusted, the same handoff can support deeper automation. The core workflow is the same in either case: traces plus human and model feedback become concrete harness changes instead of remaining disconnected comments.

Compared with examples that stop at traces or evals, this notebook keeps traces, reviewer judgment, generated evals, optimization, and implementation handoff inside one runnable improvement loop.
