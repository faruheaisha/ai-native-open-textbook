---
title: "Agno examples"
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

# Agno examples

This folder contains examples demonstrating how to build stateful agents using Agno.

## Requirements

- [Python](https://www.python.org/) 3.10+
- An [OpenAI API key](https://platform.openai.com/api-keys) set as an environment variable (`OPENAI_API_KEY`)

## Examples

- `sorting_hat/`: Workspace-scoped agent that inventories files.
- `session_memory/`: Persistence of session memory across runs.
- `knowledge_store/`: Using external knowledge sources as explicit context.
- `agent_os_service/`: Deploying the agent as a service.
- `audit_traces/`: Inspecting trace logs for agent inputs and actions.

## Running the examples

Each example is in its own folder and contains a `README.md` with instructions on how to run it.
