---
title: "OpenCode Workflow"
sourceId: "10-context-memory/hf-context-course"
sourceTitle: "The Context Course"
sourceKind: "系统课程"
licenseLabel: "仅引用"
lang: "英文"
tier: 1
volume: "10-context-memory"
sourceUrl: "https://github.com/huggingface/context-course"
entryUrl: "https://github.com/huggingface/context-course/blob/0448a7ca721a63a81531e1ba94f46f897c70645b/projects/inference/docs/opencode-workflow.md"
sourceRel: "projects/inference/docs/opencode-workflow.md"
rawUrl: "/raw/10-context-memory/hf-context-course/projects/inference/docs/opencode-workflow.md"
sourceSha256: "826d691de4edbf3e1591d3664653e4ba1a0cc54d0f12746f06e7044f1c85988d"
pageSha256: "826d691de4edbf3e1591d3664653e4ba1a0cc54d0f12746f06e7044f1c85988d"
contentMode: "local-full"
zh: ""
---

# OpenCode Workflow

OpenCode is the lightweight control plane for this inference project.

The target surface is local llama.cpp inference:

- `llama-server` is the preferred runtime.
- The benchmark endpoint is OpenAI-compatible chat completions.
- `.agents/skills/huggingface-local-models/` defines the GGUF discovery and
  launch workflow.
- `research/results.tsv` is the append-only local benchmark ledger.

## Setup

Install project tooling:

```bash
uv sync
```

Install or confirm llama.cpp:

```bash
llama-server --version
llama-cli --version
```

On macOS, Homebrew is the simplest path:

```bash
brew install llama.cpp
```

Authenticate if the target model is gated:

```bash
hf auth login
```

## Parent Session Workflow

1. Inspect local hardware and tools:

```bash
uv run scripts/inspect_llama_toolchain.py
```

2. Resolve a target GGUF:

```bash
uv run scripts/resolve_hf_gguf.py --repo <owner/repo> --quant Q4_K_M
```

3. Start OpenCode in `inference/`:

```bash
opencode
```

4. Use the `inference-lab` primary agent.

Delegate to:

- `optimizer` for the next one-variable speed candidate
- `benchmarker` for baseline and candidate measurements

## Benchmarking

Benchmark an existing endpoint:

```bash
uv run scripts/benchmark_llama.py \
  --base-url http://127.0.0.1:8080/v1 \
  --runs 3 \
  --append-tsv research/results.tsv
```

Launch a server for one benchmark and stop it afterward:

```bash
uv run scripts/benchmark_llama.py \
  --server-cmd "llama-server --hf-repo <owner/repo> --hf-file <file.gguf> -c 4096 --port 8080" \
  --base-url http://127.0.0.1:8080/v1 \
  --runs 3 \
  --append-tsv research/results.tsv
```
