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
entryUrl: "https://github.com/huggingface/context-course/blob/0448a7ca721a63a81531e1ba94f46f897c70645b/projects/pre-training/research/experiments/scalar-lr-06.md"
sourceRel: "projects/pre-training/research/experiments/scalar-lr-06.md"
rawUrl: "/raw/10-context-memory/hf-context-course/projects/pre-training/research/experiments/scalar-lr-06.md"
sourceSha256: "8481077c4c8a7a7a3274fd393d470bc7e30c9ca4e0bc4eceafd7df4696dd367d"
pageSha256: "8481077c4c8a7a7a3274fd393d470bc7e30c9ca4e0bc4eceafd7df4696dd367d"
contentMode: "local-full"
zh: ""
---

# Experiment: Lower SCALAR_LR from 0.7 to 0.6 to test whether slower learning of per-layer residual and initial scaling parameters improves validation bpb.

## Campaign

- Campaign: `optimizer-tuning`

## Hypothesis

Lower SCALAR_LR from 0.7 to 0.6 to test whether slower learning of per-layer residual and initial scaling parameters improves validation bpb.

## Parent Context

- Parent master hash: `935fdbf9f4ae8a5ef5bcb76552acea2bc5801965`
- Master val_bpb at dispatch: `0.962777`
- Worker id: `worker-0`
- Worktree: `/Users/ben/code/open-autolab/.runtime/worktrees/scalar-lr-06`

## Single Variable

## Expected Upside

## Duplicate Check

## Runtime

- Log path: `/Users/ben/code/open-autolab/research/live/scalar-lr-06.log`
- Launcher: `uv run scripts/opencode_worker.py run scalar-lr-06`

## Allowed Edit Scope

- `train.py` only

## Run Plan

- Refresh master with `uv run scripts/refresh_master.py --fetch-dag`
- Run `uv run scripts/hf_job.py preflight`
- Run `uv run scripts/hf_job.py launch --mode experiment`
- Stream logs to the reserved path
- Parse `uv run scripts/parse_metric.py /Users/ben/code/open-autolab/research/live/scalar-lr-06.log`

## Result

- Local val_bpb: `<value>`
- Submitted: `yes|no`
- Interpretation: `<one or two sentences>`
- Failure mode, if any: `<brief note>`

## Memory-Keeper Handoff

- One short note for `research/notes.md`: ``
- Any do-not-repeat update: ``
