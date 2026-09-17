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
entryUrl: "https://github.com/huggingface/context-course/blob/0448a7ca721a63a81531e1ba94f46f897c70645b/projects/pre-training/research/experiments/lm-head-wd-004.md"
sourceRel: "projects/pre-training/research/experiments/lm-head-wd-004.md"
rawUrl: "/raw/10-context-memory/hf-context-course/projects/pre-training/research/experiments/lm-head-wd-004.md"
sourceSha256: "cee2c8ac2f495a9240f2bfd6a867aa6debc9e5681fe7a7443632ae8e85306a2c"
pageSha256: "cee2c8ac2f495a9240f2bfd6a867aa6debc9e5681fe7a7443632ae8e85306a2c"
contentMode: "local-full"
zh: ""
---

# Experiment: Increase lm_head weight_decay from 0.003 to 0.004 to continue the winning direction of stronger output layer regularization.

## Campaign

- Campaign: `regularization-tuning`

## Hypothesis

Increase lm_head weight_decay from 0.003 to 0.004 to continue the winning direction of stronger output layer regularization.

## Parent Context

- Parent master hash: `935fdbf9f4ae8a5ef5bcb76552acea2bc5801965`
- Master val_bpb at dispatch: `0.962777`
- Worker id: `worker-2`
- Worktree: `/Users/ben/code/open-autolab/.runtime/worktrees/lm-head-wd-004`

## Single Variable

## Expected Upside

## Duplicate Check

## Runtime

- Log path: `/Users/ben/code/open-autolab/research/live/lm-head-wd-004.log`
- Launcher: `uv run scripts/opencode_worker.py run lm-head-wd-004`

## Allowed Edit Scope

- `train.py` only

## Run Plan

- Refresh master with `uv run scripts/refresh_master.py --fetch-dag`
- Run `uv run scripts/hf_job.py preflight`
- Run `uv run scripts/hf_job.py launch --mode experiment`
- Stream logs to the reserved path
- Parse `uv run scripts/parse_metric.py /Users/ben/code/open-autolab/research/live/lm-head-wd-004.log`

## Result

- Local val_bpb: `<value>`
- Submitted: `yes|no`
- Interpretation: `<one or two sentences>`
- Failure mode, if any: `<brief note>`

## Memory-Keeper Handoff

- One short note for `research/notes.md`: ``
- Any do-not-repeat update: ``
