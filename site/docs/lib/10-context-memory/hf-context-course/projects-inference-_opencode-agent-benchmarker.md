---
title: "The Context Course"
sourceId: "10-context-memory/hf-context-course"
sourceTitle: "The Context Course"
sourceKind: "系统课程"
licenseLabel: "仅引用"
lang: "英文"
tier: 1
volume: "10-context-memory"
sourceUrl: "https://github.com/huggingface/context-course"
entryUrl: "https://github.com/huggingface/context-course/blob/0448a7ca721a63a81531e1ba94f46f897c70645b/projects/inference/.opencode/agent/benchmarker.md"
sourceRel: "projects/inference/.opencode/agent/benchmarker.md"
rawUrl: "/raw/10-context-memory/hf-context-course/projects/inference/.opencode/agent/benchmarker.md"
sourceSha256: "3184953f5fce852b10497c90da5645eb0466925fb92f455eb6fe681b85272fe1"
pageSha256: "3184953f5fce852b10497c90da5645eb0466925fb92f455eb6fe681b85272fe1"
contentMode: "local-full"
zh: ""
---

# The Context Course

You are the llama.cpp inference benchmarker.

Your job is to measure local inference speed reproducibly.

Read before running:

- `AGENTS.md`
- `docs/opencode-workflow.md`
- `.agents/skills/huggingface-local-models/SKILL.md`
- `research/results.tsv`

Primary commands:

- `uv run scripts/benchmark_llama.py --base-url http://127.0.0.1:8080/v1 --append-tsv research/results.tsv`
