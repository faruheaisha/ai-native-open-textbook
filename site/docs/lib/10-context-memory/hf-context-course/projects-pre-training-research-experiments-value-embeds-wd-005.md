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
entryUrl: "https://github.com/huggingface/context-course/blob/0448a7ca721a63a81531e1ba94f46f897c70645b/projects/pre-training/research/experiments/value-embeds-wd-005.md"
sourceRel: "projects/pre-training/research/experiments/value-embeds-wd-005.md"
rawUrl: "/raw/10-context-memory/hf-context-course/projects/pre-training/research/experiments/value-embeds-wd-005.md"
sourceSha256: "f8c24156f41b852e2def0635528e4e12643b89ac329820d2a3143b4bf1fdb4ff"
pageSha256: "f8c24156f41b852e2def0635528e4e12643b89ac329820d2a3143b4bf1fdb4ff"
contentMode: "local-full"
zh: ""
---

# Experiment: Increase value_embeds weight_decay from 0.004 to 0.005 to test whether stronger regularization on value embeddings improves validation bpb.

## Campaign

- Campaign: `regularization-tuning`

## Hypothesis

Increase value_embeds weight_decay from 0.004 to 0.005 to test whether stronger regularization on value embeddings improves validation bpb.

## Parent Context

- Parent master hash: `935fdbf9f4ae8a5ef5bcb76552acea2bc5801965`
- Master val_bpb at dispatch: `0.962777`
- Worker id: `worker-3`
- Worktree: `/Users/ben/code/open-autolab/.runtime/worktrees/value-embeds-wd-005`

## Single Variable

## Expected Upside

## Duplicate Check

## Runtime

- Log path: `/Users/ben/code/open-autolab/research/live/value-embeds-wd-005.log`
- Launcher: `uv run scripts/opencode_worker.py run value-embeds-wd-005`

## Allowed Edit Scope

- `train.py` only

## Run Plan

- Refresh master with `uv run scripts/refresh_master.py --fetch-dag`
- Run `uv run scripts/hf_job.py preflight`
- Run `uv run scripts/hf_job.py launch --mode experiment`
- Stream logs to the reserved path
- Parse `uv run scripts/parse_metric.py /Users/ben/code/open-autolab/research/live/value-embeds-wd-005.log`

## Result

- Local val_bpb: `<value>`
- Submitted: `yes|no`
- Interpretation: `<one or two sentences>`
- Failure mode, if any: `<brief note>`

## Memory-Keeper Handoff

- One short note for `research/notes.md`: ``
- Any do-not-repeat update: ``
