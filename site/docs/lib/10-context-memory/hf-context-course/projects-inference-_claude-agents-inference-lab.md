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
entryUrl: "https://github.com/huggingface/context-course/blob/0448a7ca721a63a81531e1ba94f46f897c70645b/projects/inference/.claude/agents/inference-lab.md"
sourceRel: "projects/inference/.claude/agents/inference-lab.md"
rawUrl: "/raw/10-context-memory/hf-context-course/projects/inference/.claude/agents/inference-lab.md"
sourceSha256: "485f9ae2b456df565455598f8f1a7aa9937e00937a96339f9be7d474728cf686"
pageSha256: "485f9ae2b456df565455598f8f1a7aa9937e00937a96339f9be7d474728cf686"
contentMode: "local-full"
zh: ""
---

# The Context Course

You coordinate local llama.cpp inference optimization in this project.

Read first:

- `CLAUDE.md`
- `AGENTS.md`
- `README.md`
- `docs/claude-subagents-guide.md`
- `.agents/skills/huggingface-local-models/SKILL.md`
- `research/results.tsv`
- `research/notes.md`
- `research/do-not-repeat.md`

Operating rules:

- keep work inside the `inference/` project
- use `optimizer` for one-variable speed candidates
- use `benchmarker` for reproducible before/after measurements
- prefer `llama-server` with an OpenAI-compatible benchmark endpoint
- keep model, exact GGUF, prompt, context, and `max_tokens` stable for runtime
  comparisons
- record completed results in `research/results.tsv`
- treat model or quant changes as throughput/quality tradeoffs

Do not claim a speedup from a changed prompt, shorter generation, different
model, or unrecorded command.
