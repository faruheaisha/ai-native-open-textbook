---
title: "Mission - Multi-Session Handoff"
sourceId: "07-coding/ai-engineering-from-scratch-zh"
sourceTitle: "AI 工程从零到一（中文）"
sourceKind: "源码研读"
licenseLabel: "可转载"
lang: "中文"
tier: 1
volume: "07-coding"
sourceUrl: "https://github.com/fancyboi999/ai-engineering-from-scratch-zh"
entryUrl: "https://github.com/fancyboi999/ai-engineering-from-scratch-zh/blob/109181ce68128c1bf27ec20867177007a8bace89/phases/14-agent-engineering/40-multi-session-handoff/mission.md"
sourceRel: "phases/14-agent-engineering/40-multi-session-handoff/mission.md"
rawUrl: "/raw/07-coding/ai-engineering-from-scratch-zh/phases/14-agent-engineering/40-multi-session-handoff/mission.md"
sourceSha256: "9f9bb289842fc2375345ea0e2c49ef0d6058c73bfc5185a75945487f9b641244"
pageSha256: "9f9bb289842fc2375345ea0e2c49ef0d6058c73bfc5185a75945487f9b641244"
contentMode: "local-full"
zh: ""
---

# Mission - Multi-Session Handoff

## Goal
Generate `handoff.md` and `handoff.json` from workbench artifacts at session end so the next session is productive in the first minute. Both forms carry the same seven fields; the JSON wins on disagreement.

## Inputs
- `agent_state.json`, `verification_report.json`, `review_report.json`, `feedback_record.jsonl` from earlier lessons
- The seven fields: summary, changed_files, commands_run, failed_attempts, open_risks, next_action, verdict_pointer

## Deliverables
- A `WorkbenchSnapshot` loader bundling the four artifacts
- `generate_handoff(snapshot) -> (markdown, payload)`
- A feedback filter that picks the last K records plus every non-zero exit
- `handoff.md` and `handoff.json` written next to the script

## Acceptance
- `python3 code/main.py` exits zero
- Both files carry all seven fields and a non-empty `next_action`
- Re-running the script with the same inputs produces an identical packet

## Out of scope
- Compaction strategies (Codex compact endpoint, Claude Code five-stage). Handoff closes a session; compaction extends one.
- PR templating. The markdown is reusable as a PR body but the lesson stops at the file.

## References
- `docs/zh.md` - full lesson
- `code/main.py` - reference implementation
- `outputs/skill-handoff-generator.md` - extracted skill
