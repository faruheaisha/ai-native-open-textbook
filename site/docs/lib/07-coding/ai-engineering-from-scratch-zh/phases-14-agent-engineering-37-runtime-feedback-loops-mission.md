---
title: "Mission - Runtime Feedback Loops"
sourceId: "07-coding/ai-engineering-from-scratch-zh"
sourceTitle: "AI 工程从零到一（中文）"
sourceKind: "源码研读"
licenseLabel: "可转载"
lang: "中文"
tier: 1
volume: "07-coding"
sourceUrl: "https://github.com/fancyboi999/ai-engineering-from-scratch-zh"
entryUrl: "https://github.com/fancyboi999/ai-engineering-from-scratch-zh/blob/109181ce68128c1bf27ec20867177007a8bace89/phases/14-agent-engineering/37-runtime-feedback-loops/mission.md"
sourceRel: "phases/14-agent-engineering/37-runtime-feedback-loops/mission.md"
rawUrl: "/raw/07-coding/ai-engineering-from-scratch-zh/phases/14-agent-engineering/37-runtime-feedback-loops/mission.md"
sourceSha256: "e3856f9b4f62b56dc7e2c37643fb637911a67b3b884eb47475ad3147d220ab73"
pageSha256: "e3856f9b4f62b56dc7e2c37643fb637911a67b3b884eb47475ad3147d220ab73"
contentMode: "local-full"
zh: ""
---

# Mission - Runtime Feedback Loops

## Goal
Build `run_with_feedback` that wraps `subprocess.run`, captures stdout, stderr, exit code, and duration, truncates output deterministically, and appends a JSONL record the next turn and the verification gate both read.

## Inputs
- Three demo commands to exercise the runner: one success, one failure, one slow
- Token budget: deterministic head plus tail with a `...truncated N lines...` marker

## Deliverables
- `run_with_feedback(command, agent_note)` writing to `feedback_record.jsonl`
- A loader that streams the JSONL into a Python list
- A printer that shows the last record per command

## Acceptance
- `python3 code/main.py` exits zero
- `feedback_record.jsonl` accumulates one record per command across re-runs
- A command with `exit_code: null` cannot be marked successful by the loop

## Out of scope
- Telemetry pipelines (OTel, Langfuse). Feedback is for the next turn; telemetry is for the operator.
- Redaction passes and rotation policy. Lesson exercise prompts cover those.

## References
- `docs/zh.md` - full lesson
- `code/main.py` - reference implementation
- `outputs/skill-feedback-runner.md` - extracted skill
