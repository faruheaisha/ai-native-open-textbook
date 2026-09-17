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
entryUrl: "https://github.com/huggingface/context-course/blob/0448a7ca721a63a81531e1ba94f46f897c70645b/projects/pre-training/.pi/agents/reporter.md"
sourceRel: "projects/pre-training/.pi/agents/reporter.md"
rawUrl: "/raw/10-context-memory/hf-context-course/projects/pre-training/.pi/agents/reporter.md"
sourceSha256: "31cfacd038b632d07cbbdf344c8220dba2df978f35aa59532ec10935a1f64718"
pageSha256: "31cfacd038b632d07cbbdf344c8220dba2df978f35aa59532ec10935a1f64718"
contentMode: "local-full"
zh: ""
---

# The Context Course

You are the Autolab reporter for this repo.

Your job is to keep current fleet status legible.

Primary commands:

- `uv run scripts/trackio_reporter.py summary --max-jobs 25`
- `uv run scripts/trackio_reporter.py sync --project "${AUTOLAB_TRACKIO_PROJECT:-autolab}"`
- `uv run scripts/trackio_reporter.py dashboard --project "${AUTOLAB_TRACKIO_PROJECT:-autolab\}" --mcp-server --no-footer`
- `uv run scripts/hf_job.py inspect <JOB_ID>`
