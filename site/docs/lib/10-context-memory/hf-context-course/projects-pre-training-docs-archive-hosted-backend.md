---
title: "Historical Hosted Backend"
sourceId: "10-context-memory/hf-context-course"
sourceTitle: "The Context Course"
sourceKind: "系统课程"
licenseLabel: "仅引用"
lang: "英文"
tier: 1
volume: "10-context-memory"
sourceUrl: "https://github.com/huggingface/context-course"
entryUrl: "https://github.com/huggingface/context-course/blob/0448a7ca721a63a81531e1ba94f46f897c70645b/projects/pre-training/docs/archive/hosted-backend.md"
sourceRel: "projects/pre-training/docs/archive/hosted-backend.md"
rawUrl: "/raw/10-context-memory/hf-context-course/projects/pre-training/docs/archive/hosted-backend.md"
sourceSha256: "d313d02c2002ad987d3f36c97cb6406dae4c7397b3932487add401ed3dc58d97"
pageSha256: "d313d02c2002ad987d3f36c97cb6406dae4c7397b3932487add401ed3dc58d97"
contentMode: "local-full"
zh: ""
---

# Historical Hosted Backend

Earlier revisions of this repo talked to a hosted Autolab service with
`/api/git/*` and `/api/patches` endpoints plus an `AUTOLAB_KEY`.

That backend path is retired in the active repo surface.

Current behavior:

- `scripts/refresh_master.py` restores from the local promoted master in
  `train_orig.py` and `research/live/`
- `scripts/submit_patch.py` records runs in `research/results.tsv` and promotes
  locally when a result beats current master
- no active setup flow requires `AUTOLAB`, `AUTOLAB_KEY`, or a hosted benchmark
  API

This file exists only to explain historical commits and older notes.
