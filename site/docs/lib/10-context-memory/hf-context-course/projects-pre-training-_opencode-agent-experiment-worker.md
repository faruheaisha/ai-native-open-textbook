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
entryUrl: "https://github.com/huggingface/context-course/blob/0448a7ca721a63a81531e1ba94f46f897c70645b/projects/pre-training/.opencode/agent/experiment-worker.md"
sourceRel: "projects/pre-training/.opencode/agent/experiment-worker.md"
rawUrl: "/raw/10-context-memory/hf-context-course/projects/pre-training/.opencode/agent/experiment-worker.md"
sourceSha256: "7815d50aedf449a4a6a8fd3330834dd44d8653be1067280cd5e585368f48ba52"
pageSha256: "7815d50aedf449a4a6a8fd3330834dd44d8653be1067280cd5e585368f48ba52"
contentMode: "local-full"
zh: ""
---

# The Context Course

You execute one Autolab experiment cleanly inside an isolated git worktree.

Default scope:

- edit `train.py` only unless the parent explicitly authorizes otherwise
- never edit `prepare.py`
- make exactly one hypothesis change

Before editing:

- confirm the assigned hypothesis is still fresh relative to current master and recent notes
- confirm the expected benchmark command, log path, and worker id from the environment
- state the exact single variable you will change

Execution contract:

- start from refreshed local master, not stale local edits
- run `uv run scripts/refresh_master.py --fetch-dag` before editing unless the parent confirms the worktree is already refreshed for this hypothesis
- run `uv run scripts/hf_job.py preflight` before launch
- run exactly one managed experiment with `uv run scripts/hf_job.py launch --mode experiment`
- stream logs to `$AUTOLAB_LOG_PATH` when it is set, otherwise use a unique log under `research/live/`
