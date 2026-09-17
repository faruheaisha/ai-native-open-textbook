---
title: "Experiment: Lower FINALLRFRAC from 0.025 to 0.018 to continue the winning direction of lower final LR floor."
sourceId: "10-context-memory/hf-context-course"
sourceTitle: "The Context Course"
sourceKind: "系统课程"
licenseLabel: "仅引用"
lang: "英文"
tier: 1
volume: "10-context-memory"
sourceUrl: "https://github.com/huggingface/context-course"
entryUrl: "https://github.com/huggingface/context-course/blob/0448a7ca721a63a81531e1ba94f46f897c70645b/projects/pre-training/research/experiments/final-lr-018.md"
sourceRel: "projects/pre-training/research/experiments/final-lr-018.md"
rawUrl: "/raw/10-context-memory/hf-context-course/projects/pre-training/research/experiments/final-lr-018.md"
sourceSha256: "034a23bfe50d831870e483f63d00abdb955a23c3940fc56deeb6cf21361df2e6"
pageSha256: "034a23bfe50d831870e483f63d00abdb955a23c3940fc56deeb6cf21361df2e6"
contentMode: "local-full"
zh: ""
---

# Experiment: Lower FINAL_LR_FRAC from 0.025 to 0.018 to continue the winning direction of lower final LR floor.

## Campaign

- Campaign: `schedule-tuning`

## Hypothesis

Lower FINAL_LR_FRAC from 0.025 to 0.018 to continue the winning direction of lower final LR floor.

## Parent Context

- Parent master hash: `935fdbf9f4ae8a5ef5bcb76552acea2bc5801965`
- Master val_bpb at dispatch: `0.962777`
- Worker id: `worker-1`
- Worktree: `/Users/ben/code/open-autolab/.runtime/worktrees/final-lr-018`

## Single Variable

## Expected Upside

## Duplicate Check

## Runtime

- Log path: `/Users/ben/code/open-autolab/research/live/final-lr-018.log`
- Launcher: `uv run scripts/opencode_worker.py run final-lr-018`

## Allowed Edit Scope

- `train.py` only

## Run Plan

- Refresh master with `uv run scripts/refresh_master.py --fetch-dag`
- Run `uv run scripts/hf_job.py preflight`
- Run `uv run scripts/hf_job.py launch --mode experiment`
- Stream logs to the reserved path
- Parse `uv run scripts/parse_metric.py /Users/ben/code/open-autolab/research/live/final-lr-018.log`

## Result

- Local val_bpb: `<value>`
- Submitted: `yes|no`
- Interpretation: `<one or two sentences>`
- Failure mode, if any: `<brief note>`

## Memory-Keeper Handoff

- One short note for `research/notes.md`: ``
- Any do-not-repeat update: ``
