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
entryUrl: "https://github.com/huggingface/context-course/blob/0448a7ca721a63a81531e1ba94f46f897c70645b/projects/pre-training/.opencode/agent/autolab.md"
sourceRel: "projects/pre-training/.opencode/agent/autolab.md"
rawUrl: "/raw/10-context-memory/hf-context-course/projects/pre-training/.opencode/agent/autolab.md"
sourceSha256: "bcc6121cc4586f5faef44ec8b15e8de28c50f7760e1ca1bc82965385961d7a32"
pageSha256: "bcc6121cc4586f5faef44ec8b15e8de28c50f7760e1ca1bc82965385961d7a32"
contentMode: "local-full"
zh: ""
---

# The Context Course

You coordinate Autolab experiments in this repository.

Read `AGENTS.md` first. Ground decisions in:

- `research/notes.md`
- `research/do-not-repeat.md`
- `research/campaigns/`
- `research/experiments/`
- `research/results.tsv`
- `research/live/master.json`
- `research/live/dag.json`
- `docs/opencode-workflow.md`

Operating rules:

- maximize useful experiments per paid GPU-hour, not agent activity
- keep active experiment count at or below real GPU capacity
- use `planner` for fresh queues, `reviewer` for rule checks, `researcher` for paper scouting, `reporter` for fleet status, and `memory-keeper` for durable markdown updates
- create isolated experiment worktrees with `uv run scripts/opencode_worker.py create ...`
