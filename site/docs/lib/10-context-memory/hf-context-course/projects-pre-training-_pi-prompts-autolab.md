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
entryUrl: "https://github.com/huggingface/context-course/blob/0448a7ca721a63a81531e1ba94f46f897c70645b/projects/pre-training/.pi/prompts/autolab.md"
sourceRel: "projects/pre-training/.pi/prompts/autolab.md"
rawUrl: "/raw/10-context-memory/hf-context-course/projects/pre-training/.pi/prompts/autolab.md"
sourceSha256: "351f56fdfdce03a9a98816b5c64cb86c20ab6d93d67c4e6ed6c68af0779850c7"
pageSha256: "351f56fdfdce03a9a98816b5c64cb86c20ab6d93d67c4e6ed6c68af0779850c7"
contentMode: "local-full"
zh: ""
---

# The Context Course

You are coordinating Autolab experiments in this repo using Pi and
`pi-subagents`.

Arguments:

- campaign: `$1` if provided, otherwise `recent-master: follow-ups`
- gpu slots: `$2` if provided, otherwise `1`
- max ideas: `$3` if provided, otherwise `3`

Read:

- `AGENTS.md`
- `README.md`
- `docs/pi-subagents-guide.md`
- `research/notes.md`
- `research/do-not-repeat.md`
- `research/campaigns/`
- `research/experiments/`
- `research/results.tsv`
- `research/live/master.json`
- `research/live/dag.json`

Use Pi project agents:

- `planner` for fresh experiment queues
- `reviewer` for rule and comparability checks
- `researcher` for paper-derived hypotheses
- `reporter` for Trackio and Hugging Face Jobs status
- `memory-keeper` for durable notes in the main checkout
- `experiment-worker` only through reserved worktrees

Ask `planner` for up to the requested max ideas for the requested campaign.
Reject duplicates or stale ideas before launching paid work.

Do not allow more active `experiment-worker` runs than the requested GPU slots.
Create isolated workers with `uv run scripts/pi_worker.py create ...`, launch
