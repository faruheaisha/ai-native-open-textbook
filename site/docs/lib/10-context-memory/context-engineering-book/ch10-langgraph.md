---
title: "LangGraph examples"
sourceId: "10-context-memory/context-engineering-book"
sourceTitle: "Context Engineering（Bonigarcia 教程）"
sourceKind: "工程手册"
licenseLabel: "可转载"
lang: "英文"
tier: 2
volume: "10-context-memory"
sourceUrl: "https://github.com/bonigarcia/context-engineering"
entryUrl: "https://github.com/bonigarcia/context-engineering/blob/46719154489e410b509db4fb69ab1c29fb3362a0/ch10/langgraph/README.md"
sourceRel: "ch10/langgraph/README.md"
rawUrl: "/raw/10-context-memory/context-engineering-book/ch10/langgraph/README.md"
sourceSha256: "2adf1f16aed03ebddbb0b9fb1780f23ffcf1c9ba7d0c406c032366dc379b0468"
pageSha256: "2adf1f16aed03ebddbb0b9fb1780f23ffcf1c9ba7d0c406c032366dc379b0468"
contentMode: "local-full"
zh: ""
---

# LangGraph examples

This folder contains examples demonstrating stateful workflows and agent routing with LangGraph.

## Requirements

- [Python](https://www.python.org/) 3.10+
- An [OpenAI API key](https://platform.openai.com/api-keys) set as an environment variable (`OPENAI_API_KEY`)

## Examples

- `basic_agent/`: Basic single-node stateful graph agent.
- `review_workflow/`: Graph workflow with explicit review states.
- `checkpointed_resume/`: Resuming graph runs from saved checkpoints.
- `human_in_the_loop/`: Pausing graph execution for human approval.
- `multi_agent_router/`: Routing execution across multiple specialized agents.

## Running the examples

Each example is in its own folder and contains a `README.md` with instructions on how to run it.
