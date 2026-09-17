---
title: "llama.cpp Inference Autoresearch"
sourceId: "10-context-memory/hf-context-course"
sourceTitle: "The Context Course"
sourceKind: "系统课程"
licenseLabel: "仅引用"
lang: "英文"
tier: 1
volume: "10-context-memory"
sourceUrl: "https://github.com/huggingface/context-course"
entryUrl: "https://github.com/huggingface/context-course/blob/0448a7ca721a63a81531e1ba94f46f897c70645b/projects/inference/README.md"
sourceRel: "projects/inference/README.md"
rawUrl: "/raw/10-context-memory/hf-context-course/projects/inference/README.md"
sourceSha256: "8c3788c1b2b653e4ae0d9f57b24a99bf962d19d83a9d2309905f8cab4b01f189"
pageSha256: "8c3788c1b2b653e4ae0d9f57b24a99bf962d19d83a9d2309905f8cab4b01f189"
contentMode: "local-full"
zh: ""
---

# llama.cpp Inference Autoresearch

This project is a small multi-agent setup for optimizing local llama.cpp
inference speed. It is intentionally simpler than the pre-training Autolab
control plane and separate from the post-training benchmark.

## Shape

- `.opencode/agent/inference-lab.md`
  Primary coordinator.
- `.opencode/agent/optimizer.md`
  Read-only speed optimizer that proposes one narrow next change.
- `.opencode/agent/benchmarker.md`
  Local benchmark runner for `llama-server` endpoints.
- `.agents/skills/huggingface-local-models/`
  Local copy of the Hugging Face local-models skill for GGUF discovery,
  quant choice, and llama.cpp command construction.
- `scripts/resolve_hf_gguf.py`
  Resolves exact GGUF filenames from the Hugging Face model tree API.
- `scripts/benchmark_llama.py`
  Benchmarks a running or launched OpenAI-compatible `llama-server` endpoint.
- `research/results.tsv`
  Append-only speed benchmark ledger.

## Quick Start

From this directory:

```bash
uv sync
uv run scripts/inspect_llama_toolchain.py
```

Resolve a GGUF file:

```bash
uv run scripts/resolve_hf_gguf.py --repo <owner/repo> --quant Q4_K_M
```

Benchmark an already-running server:

```bash
uv run scripts/benchmark_llama.py \
  --base-url http://127.0.0.1:8080/v1 \
  --runs 3 \
  --append-tsv research/results.tsv
```

Or let the benchmark helper launch and stop the server for one run:

```bash
uv run scripts/benchmark_llama.py \
  --server-cmd "llama-server --hf-repo <owner/repo> --hf-file <file.gguf> -c 4096 --port 8080" \
  --base-url http://127.0.0.1:8080/v1 \
  --runs 3 \
  --append-tsv research/results.tsv
```

## OpenCode

Start OpenCode from `inference/`:

```bash
opencode
```

Use the `inference-lab` primary agent. The normal loop is:

1. `benchmarker` measures a baseline.
2. `optimizer` proposes one narrow speed change.
3. `benchmarker` repeats the same benchmark.
4. Keep the fastest reproducible command in the result ledger.

For a longer kickoff prompt:

```bash
uv run scripts/print_opencode_kickoff.py
```

## Secondary Agents

Native examples are also checked in for Claude Code, Codex, and Pi:

- Claude Code: `claude --agent inference-lab`
- Codex: `codex`
- Pi: `pi`, then `/inference-lab "<owner/repo> or local endpoint on :8080" 3`

Guide files:

- `docs/claude-subagents-guide.md`
- `docs/codex-subagents-guide.md`
- `docs/pi-subagents-guide.md`

## Metrics

The default benchmark records wall-clock completion tokens per second from the
OpenAI-compatible chat endpoint. Treat the numbers as comparable only when the
prompt, `max_tokens`, model, quant, context, and server command are controlled.

For raw kernel-level performance, run llama.cpp's own `llama-bench` separately
and record the command and result in the notes column.
