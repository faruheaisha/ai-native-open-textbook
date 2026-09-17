---
title: "Multi-Agent Autoresearch"
sourceId: "10-context-memory/hf-context-course"
sourceTitle: "The Context Course"
sourceKind: "系统课程"
licenseLabel: "仅引用"
lang: "英文"
tier: 1
volume: "10-context-memory"
sourceUrl: "https://github.com/huggingface/context-course"
entryUrl: "https://github.com/huggingface/context-course/blob/0448a7ca721a63a81531e1ba94f46f897c70645b/projects/pre-training/README.md"
sourceRel: "projects/pre-training/README.md"
rawUrl: "/raw/10-context-memory/hf-context-course/projects/pre-training/README.md"
sourceSha256: "1787cec0436ba5407b9c9a68ad6daf9372e93fa4213e770ae536fefbd14b1292"
pageSha256: "1787cec0436ba5407b9c9a68ad6daf9372e93fa4213e770ae536fefbd14b1292"
contentMode: "local-full"
zh: ""
---

# Multi-Agent Autoresearch

This repo is a self-contained Open Source AI Lab that researches papers, manages experiments, runs GPUs, and repeats. It is based on [autoresearch](https://github.com/karpathy/autoresearch) by Andrej Karpathy.

<img width="2468" height="985" alt="gastown_wave2_running_jobs" src="https://github.com/user-attachments/assets/e1ae62ed-7a7a-4ba3-9e68-6fa97a4d86c8" />

OpenCode is the primary way to use this repo. The checked-in agents and [`AGENTS.md`](https://github.com/huggingface/context-course/blob/0448a7ca721a63a81531e1ba94f46f897c70645b/projects/pre-training/AGENTS.md) tell the agent which scripts to run and how to use them safely. There are also Hermes and Pi Agent adapters, plus older Codex and Claude Code material.

## What This Repo Contains

- `train.py`
  The working experiment surface.
- `prepare.py`
  Read-only benchmark setup and evaluation logic.
- `research/results.tsv`
  Append-only local run ledger.
- `research/live/`
  The current promoted local master snapshot and DAG.
- `research/`
  Notes, campaign state, experiment records, and templates.
- `.opencode/agent/`
  The checked-in OpenCode agents: `autolab`, `planner`, `experiment-worker`,
  `reviewer`, `memory-keeper`, `researcher`, and `reporter`.
- `.pi/`
  Optional Pi Agent project settings, role agents, and the `/autolab` prompt.
- `.agents/skills/`
  Shared repo-local skills.

## Local Setup

Install the repo and create your local operator env:

```bash
uv sync
hf auth login
hf auth whoami
opencode auth login
# optional for Hermes:
hermes setup
# optional for Pi Agent:
npm install -g @mariozechner/pi-coding-agent
```

If you have not warmed the shared Hugging Face cache yet, you can ask OpenCode
to do that as part of the first session. The exact script path is already in
[`AGENTS.md`](https://github.com/huggingface/context-course/blob/0448a7ca721a63a81531e1ba94f46f897c70645b/projects/pre-training/AGENTS.md).

## Start Hermes

From the pre-training project root:

```bash
uv run scripts/setup_hermes_profile.py --profile autolab
uv run scripts/print_hermes_kickoff.py --gpu-slots 1
autolab chat --toolsets "terminal,file,web,skills,delegation,clarify"
```

Hermes loads [`AGENTS.md`](https://github.com/huggingface/context-course/blob/0448a7ca721a63a81531e1ba94f46f897c70645b/projects/pre-training/AGENTS.md)
automatically, so the repo intentionally does not ship `.hermes.md`.

Use the parent Hermes session to delegate planner, reviewer, researcher,
reporter, experiment-worker, and memory-keeper roles. Keep Hermes child
concurrency at 3 or fewer per parent session. Use
`uv run scripts/hermes_worker.py create ...` plus
