---
title: "Dataroom Q&A"
sourceId: "08-agents/openai-agents-python"
sourceTitle: "OpenAI Agents SDK（Python）"
sourceKind: "产品仓库"
licenseLabel: "可转载"
lang: "英文"
tier: 3
volume: "08-agents"
sourceUrl: "https://github.com/openai/openai-agents-python"
entryUrl: "https://github.com/openai/openai-agents-python/blob/83c737fd0b8d9a53bd39fa2a0856070417bb0bd3/examples/sandbox/tutorials/dataroom_qa/README.md"
sourceRel: "examples/sandbox/tutorials/dataroom_qa/README.md"
rawUrl: "/raw/08-agents/openai-agents-python/examples/sandbox/tutorials/dataroom_qa/README.md"
sourceSha256: "46778404b96e5c648119754f39d9acabb037c59b9ac66c31a5602273f7570363"
pageSha256: "46778404b96e5c648119754f39d9acabb037c59b9ac66c31a5602273f7570363"
contentMode: "local-full"
zh: ""
---

# Dataroom Q&A

## Goal

Answer grounded financial questions over a synthetic 10-K packet.

The packet uses synthetic company data, but the documents are shaped like annual report excerpts: MD&A text uses 10-K `Part II, Item 7`, while statement PDFs and footnote text use `Part II, Item 8`.

## Why this is valuable

This demo shows a retrieval-first agent pattern over a bounded financial corpus where each metric and explanation should stay tied to source files.

## Setup

Run the fixture generator and then the Unix-local example from the repository root. Set `OPENAI_API_KEY` in your shell environment before running the example.

```bash
uv run python examples/sandbox/tutorials/data/dataroom/setup.py
uv run python examples/sandbox/tutorials/dataroom_qa/main.py
```

After the initial answer, the demo keeps the sandbox session open for Rich-rendered follow-up prompts. Pass `--no-interactive` for a one-shot run.

To run the same manifest in Docker, build the shared tutorial image once and pass
`--docker`:

```bash
docker build --tag sandbox-tutorials:latest examples/sandbox/tutorials
uv run python examples/sandbox/tutorials/dataroom_qa/main.py --docker
```

## Expected artifacts

- A direct cited answer in the streamed agent response.
- Citations use `[n](https://github.com/openai/openai-agents-python/blob/83c737fd0b8d9a53bd39fa2a0856070417bb0bd3/examples/sandbox/tutorials/dataroom_qa/data/source-file.txt:line:14)` for text excerpts and `[n](https://github.com/openai/openai-agents-python/blob/83c737fd0b8d9a53bd39fa2a0856070417bb0bd3/examples/sandbox/tutorials/dataroom_qa/data/source-file.pdf:page:1)` for the one-page synthetic PDFs.

## Demo shape

- Inputs: 5 synthetic filing text docs and 3 simple filing PDFs from `examples/sandbox/tutorials/data/dataroom/`.
- Runtime primitives: sandbox-local bash/file search.

## How instructions are loaded

At startup, the wrapper loads this folder's `AGENTS.md` into the agent instructions and builds a hard-coded manifest that maps the shared SEC packet from `examples/sandbox/tutorials/data/dataroom/` into the sandbox as `data/...`.
