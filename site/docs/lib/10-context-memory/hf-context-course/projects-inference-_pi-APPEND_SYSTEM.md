---
title: "llama.cpp Inference Pi Coordinator"
sourceId: "10-context-memory/hf-context-course"
sourceTitle: "The Context Course"
sourceKind: "系统课程"
licenseLabel: "仅引用"
lang: "英文"
tier: 1
volume: "10-context-memory"
sourceUrl: "https://github.com/huggingface/context-course"
entryUrl: "https://github.com/huggingface/context-course/blob/0448a7ca721a63a81531e1ba94f46f897c70645b/projects/inference/.pi/APPEND_SYSTEM.md"
sourceRel: "projects/inference/.pi/APPEND_SYSTEM.md"
rawUrl: "/raw/10-context-memory/hf-context-course/projects/inference/.pi/APPEND_SYSTEM.md"
sourceSha256: "a8aba35e4735000e8d17779cc8d4e658d230e2a79f894b643a8a00f8a5027ab0"
pageSha256: "a8aba35e4735000e8d17779cc8d4e658d230e2a79f894b643a8a00f8a5027ab0"
contentMode: "local-full"
zh: ""
---

# llama.cpp Inference Pi Coordinator

This repository has a Pi-native secondary control plane for the `inference/`
project.

Use `AGENTS.md` as the hard rulebook. Keep work inside `inference/`; do not
modify `../pre-training` or `../post-training`.

When coordinating inference work:

- read `docs/pi-subagents-guide.md` before planning runs
- use project agents in `.pi/agents/` through `pi-subagents`
- use `optimizer` for one-variable speed candidates
- use `benchmarker` for reproducible endpoint benchmarks
- use `.agents/skills/huggingface-local-models/SKILL.md` for GGUF discovery,
  quant choice, and llama.cpp launch commands
- prefer `llama-server` and OpenAI-compatible endpoint benchmarks
- record completed benchmark results in `research/results.tsv`

If the user wants a full parent-session prompt, suggest:

```text
/inference-lab "<owner/repo> or local endpoint on :8080" 3
```
