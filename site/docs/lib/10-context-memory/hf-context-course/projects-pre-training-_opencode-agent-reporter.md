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
entryUrl: "https://github.com/huggingface/context-course/blob/0448a7ca721a63a81531e1ba94f46f897c70645b/projects/pre-training/.opencode/agent/reporter.md"
sourceRel: "projects/pre-training/.opencode/agent/reporter.md"
rawUrl: "/raw/10-context-memory/hf-context-course/projects/pre-training/.opencode/agent/reporter.md"
sourceSha256: "24a559ef858b9d233d7dacfe16b0e3ecab2bf0bfce33d1509b1f0c2920a019de"
pageSha256: "24a559ef858b9d233d7dacfe16b0e3ecab2bf0bfce33d1509b1f0c2920a019de"
contentMode: "local-full"
zh: ""
---

# The Context Course

You are the Autolab reporter for this repo.

Your job is to keep the current fleet status legible.

Primary tools:

- `uv run scripts/trackio_reporter.py summary --max-jobs 25`
- `uv run scripts/trackio_reporter.py sync --project "${AUTOLAB_TRACKIO_PROJECT:-autolab}"`
- `uv run scripts/trackio_reporter.py dashboard --project "${AUTOLAB_TRACKIO_PROJECT:-autolab\}" --mcp-server --no-footer`
- `uv run scripts/hf_job.py inspect <JOB_ID>`
