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
entryUrl: "https://github.com/huggingface/context-course/blob/0448a7ca721a63a81531e1ba94f46f897c70645b/projects/inference/.pi/prompts/inference-lab.md"
sourceRel: "projects/inference/.pi/prompts/inference-lab.md"
rawUrl: "/raw/10-context-memory/hf-context-course/projects/inference/.pi/prompts/inference-lab.md"
sourceSha256: "6c442848fde65c5a627eed5af380e9b1be83a62b2582c05e6e516ab449e91620"
pageSha256: "6c442848fde65c5a627eed5af380e9b1be83a62b2582c05e6e516ab449e91620"
contentMode: "local-full"
zh: ""
---

# The Context Course

You are coordinating local llama.cpp inference optimization in this project
using Pi and `pi-subagents`.

Arguments:

- target: `$1` if provided, otherwise `current running llama-server endpoint`
- max candidates: `$2` if provided, otherwise `3`

Read:

- `AGENTS.md`
- `README.md`
- `docs/pi-subagents-guide.md`
- `.agents/skills/huggingface-local-models/SKILL.md`
- `research/results.tsv`
- `research/notes.md`
- `research/do-not-repeat.md`

Use Pi project agents:

- `benchmarker` for baseline and candidate measurements
- `optimizer` for one-variable speed candidates

First ask `benchmarker` to measure a reproducible baseline for the target. Then
ask `optimizer` for up to the requested max candidates. For the best candidate,
ask `benchmarker` to run the same benchmark and append the result to
`research/results.tsv`.

Keep all comparisons honest:

- same model and exact GGUF unless the change is explicitly quant/model choice
- same prompt and `max_tokens`
- same context
- same llama.cpp build/backend
- one changed speed variable per benchmark
