---
title: "Autolab Pi Coordinator"
sourceId: "10-context-memory/hf-context-course"
sourceTitle: "The Context Course"
sourceKind: "系统课程"
licenseLabel: "仅引用"
lang: "英文"
tier: 1
volume: "10-context-memory"
sourceUrl: "https://github.com/huggingface/context-course"
entryUrl: "https://github.com/huggingface/context-course/blob/0448a7ca721a63a81531e1ba94f46f897c70645b/projects/pre-training/.pi/APPEND_SYSTEM.md"
sourceRel: "projects/pre-training/.pi/APPEND_SYSTEM.md"
rawUrl: "/raw/10-context-memory/hf-context-course/projects/pre-training/.pi/APPEND_SYSTEM.md"
sourceSha256: "cfcacbf7276c87f563757ef26b2451000075bcf41e50890641c16a2ac43c4376"
pageSha256: "cfcacbf7276c87f563757ef26b2451000075bcf41e50890641c16a2ac43c4376"
contentMode: "local-full"
zh: ""
---

# Autolab Pi Coordinator

This repository has a Pi-native secondary control plane.

Use `AGENTS.md` as the hard rulebook. OpenCode remains canonical, but Pi
sessions in this repo should use the same local promoted master, Hugging Face
Jobs, Trackio, and `research/results.tsv` workflow.

When coordinating Autolab work:

- read `docs/pi-subagents-guide.md` before planning experiments
- use project agents in `.pi/agents/` through `pi-subagents`
- use `planner` for fresh queues, `reviewer` for rule checks, `researcher` for
  paper-derived ideas, `reporter` for HF Jobs and Trackio status, and
  `memory-keeper` for durable markdown updates
- keep active `experiment-worker` runs at or below real GPU capacity
- create reserved experiment worktrees with `uv run scripts/pi_worker.py create ...`
