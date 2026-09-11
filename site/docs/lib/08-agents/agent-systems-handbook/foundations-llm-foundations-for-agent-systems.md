---
title: "Agent Systems Handbook（智能体系统手册）"
sourceId: "08-agents/agent-systems-handbook"
sourceTitle: "Agent Systems Handbook（智能体系统手册）"
sourceKind: "工程手册"
licenseLabel: "限非商用"
lang: "英文"
tier: 1
volume: "08-agents"
sourceUrl: "https://github.com/Prompthon-IO/agent-systems-handbook"
entryUrl: "https://github.com/Prompthon-IO/agent-systems-handbook/blob/5b71cfa598701a34834f33b42be5f8a422138a3c/README.md"
zh: ""
---

import SupportCTA from "/snippets/support-cta.mdx";

## Summary

Modern agent systems rely on large language models as flexible decision
engines. To understand how those systems work, you do not need every detail of
model training. You need the small set of ideas that explain why LLMs are good
at instructions, planning, tool selection, and synthesis.

## Why It Matters

LLMs are often treated like magic at the product layer. That leads to poor
design decisions.

- some teams assume the model remembers more than it does
- some assume it reasons symbolically when it is really pattern-driven
- some treat context as free even though it is the main operating budget

Basic model literacy helps you design better prompts, retrieval systems, tool
interfaces, and evaluation loops.

## Mental Model

Four ideas are enough for most agent work.

- `next-token prediction`: the model is trained to continue sequences, not to
  execute a symbolic proof system.
- `tokenization and embeddings`: the model operates on tokenized inputs mapped
  into vector space rather than on raw human-readable text.
- `transformer attention`: the model decides what parts of the input matter
  when generating the next step.
- `pretraining plus adaptation`: broad capabilities come from large-scale
  pretraining, while task performance depends heavily on prompts, context,
  tools, and any later alignment or tuning.

For agent systems, the key implication is that the model is strong at pattern
compression and flexible language control, but weak at guaranteed correctness
without external structure.

## Architecture Diagram

```mermaid
flowchart LR
  Text["Prompt, tools, history, evidence"] --> Tokens["Tokens"]
  Tokens --> Attention["Transformer attention"]
  Attention --> Hidden["Hidden representation"]
  Hidden --> Output["Next-token decisions"]
  Output --> Actions["Answer, plan, or tool call"]
```

## Tool Landscape

The model properties that matter most for agents are practical ones:

- instruction following
- long-context handling
- structured output reliability
- tool-call formatting
- summarization and synthesis quality

Those capabilities are shaped as much by system design as by base model quality.
Good agents do not ask the model to do everything internally. They pair the
model with tools, memory, retrieval, and control logic that compensate for its
weak spots.

## Tradeoffs

- Larger models may reason better, but they raise cost and latency.
- Longer context windows reduce some retrieval pressure, but they do not remove
  the need for context engineering.
- Stronger instruction following helps tool use, but it does not guarantee
  factual correctness.
- Pretrained priors are broad, but they are not the same thing as current,
  source-backed knowledge.

Useful defaults:

- treat the model as a flexible planner and language engine
- use external tools for exact data, computation, and system action
- design around context limits instead of pretending they do not matter

## Reading Extensions

- [Context Engineering](https://github.com/Prompthon-IO/agent-systems-handbook/blob/5b71cfa598701a34834f33b42be5f8a422138a3c/systems/context-engineering/README.md)
- [Evaluation And Observability](https://github.com/Prompthon-IO/agent-systems-handbook/blob/5b71cfa598701a34834f33b42be5f8a422138a3c/systems/evaluation-and-observability/README.md)
- [Foundations Overview](/lib/08-agents/agent-systems-handbook/foundations-README)

## Update Log

- 2026-04-21: Initial repo-native draft based on imported reference material and lab rewrite rules.
