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
entryUrl: "https://github.com/huggingface/context-course/blob/0448a7ca721a63a81531e1ba94f46f897c70645b/projects/pre-training/.agents/skills/autolab-managed-experiment/SKILL.md"
sourceRel: "projects/pre-training/.agents/skills/autolab-managed-experiment/SKILL.md"
rawUrl: "/raw/10-context-memory/hf-context-course/projects/pre-training/.agents/skills/autolab-managed-experiment/SKILL.md"
sourceSha256: "064f258302eaa63996f389074917600d8c9941ff5ab11123a007f4d059cf450c"
pageSha256: "064f258302eaa63996f389074917600d8c9941ff5ab11123a007f4d059cf450c"
contentMode: "local-full"
zh: ""
---

# The Context Course

Use this for any single Autolab experiment that should result in exactly one
managed benchmark run.

## Workflow

1. Load the local operator env and refresh from local master:
   - `. ~/.autolab/credentials`
   - `uv run scripts/refresh_master.py --fetch-dag`
2. Edit only `train.py` for the single intended hypothesis.
3. Run preflight before launch:
   - `uv run scripts/hf_job.py preflight`
4. Launch exactly one managed experiment:
   - `uv run scripts/hf_job.py launch --mode experiment`
5. Stream logs and parse the final metric:
   - `uv run scripts/hf_job.py logs <JOB_ID> --follow --output /tmp/autolab-run.log`
   - `uv run scripts/parse_metric.py /tmp/autolab-run.log`
6. Record the run locally:
   - `uv run scripts/submit_patch.py --comment "..."`
7. Promotion is local and only happens if `val_bpb` beats current master.

## Guardrails

- Treat `train_orig.py` as the refreshed local-master base. If preflight reports
  multiple known hypothesis categories, stop and inspect the diff before
  launching.
- Ignore repo git `main` and `origin/main` when judging freshness. In this rig
  repo those refs describe control-plane history, not the benchmark master. The
  comparable base is whatever `refresh_master.py` just wrote into
  `train_orig.py`, `research/live/master.json`, and `research/results.tsv`.
- Never run `uv run scripts/hf_job.py launch --mode prepare` from an
  experiment-scoped worktree. `prepare` is shared bootstrap work, not
  per-experiment work.
- Do not launch a second experiment job for the same experiment unless you have a
  specific reason and intentionally override the duplicate check.
- If the workspace looks stale against the current local master, stop and rewrite
  the experiment rather than rationalizing the mismatch.

## Fast Checks

- `uv run scripts/hf_job.py preflight --json`
  Use this when you need to inspect the diff preview, active conflicts, or
  detected change categories programmatically.
- `uv run scripts/trackio_reporter.py summary --max-jobs 25`
  Use this to confirm the experiment id or hypothesis is not already active.
