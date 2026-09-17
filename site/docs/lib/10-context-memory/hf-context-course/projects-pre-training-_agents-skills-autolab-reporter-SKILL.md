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
entryUrl: "https://github.com/huggingface/context-course/blob/0448a7ca721a63a81531e1ba94f46f897c70645b/projects/pre-training/.agents/skills/autolab-reporter/SKILL.md"
sourceRel: "projects/pre-training/.agents/skills/autolab-reporter/SKILL.md"
rawUrl: "/raw/10-context-memory/hf-context-course/projects/pre-training/.agents/skills/autolab-reporter/SKILL.md"
sourceSha256: "7f972ec659c9f8b55042b01c7eff87f3777d69b0c6817fdd947d9c34f7556539"
pageSha256: "7f972ec659c9f8b55042b01c7eff87f3777d69b0c6817fdd947d9c34f7556539"
contentMode: "local-full"
zh: ""
---

# The Context Course

Use this for the control-plane view of the experiment fleet.

## Workflow

1. Load the local operator env:
   - `. ~/.autolab/credentials`
2. Sync the latest HF Jobs into Trackio:
   - `uv run scripts/trackio_reporter.py sync --project autolab`
3. Review the human-readable summary:
   - `uv run scripts/trackio_reporter.py summary --max-jobs 25`
4. Keep the live dashboard open when monitoring parallel runs:
   - `uv run scripts/trackio_reporter.py dashboard --project autolab --mcp-server --no-footer`
5. For continuous reporting:
   - `uv run scripts/trackio_reporter.py sync --project autolab --watch --interval 300`

## What To Watch

- active experiment jobs versus non-experiment jobs
- duplicate active jobs for the same experiment or hypothesis
- `prepare` jobs that still carry experiment labels, which usually indicate
  wasted bootstrap work
- leaderboard entries that actually beat the current local promoted master

## Guardrails

- Treat the reporter as the source of truth for fleet status, not stale shell
  output from one worker.
- If the reporter shows anomalies, fix those before launching more work into
  the same queue.
- Use the reporter to decide whether parallel capacity is real. A slot occupied
  by a duplicate or bootstrap job is not useful parallelism.
