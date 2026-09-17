---
title: "Mission - Initialization Scripts for Agents"
sourceId: "07-coding/ai-engineering-from-scratch-zh"
sourceTitle: "AI 工程从零到一（中文）"
sourceKind: "源码研读"
licenseLabel: "可转载"
lang: "中文"
tier: 1
volume: "07-coding"
sourceUrl: "https://github.com/fancyboi999/ai-engineering-from-scratch-zh"
entryUrl: "https://github.com/fancyboi999/ai-engineering-from-scratch-zh/blob/109181ce68128c1bf27ec20867177007a8bace89/phases/14-agent-engineering/35-initialization-scripts/mission.md"
sourceRel: "phases/14-agent-engineering/35-initialization-scripts/mission.md"
rawUrl: "/raw/07-coding/ai-engineering-from-scratch-zh/phases/14-agent-engineering/35-initialization-scripts/mission.md"
sourceSha256: "e06e3ecaea35405f014913ae17a692af53c74d0883c9f2384c4c536ead7ff8f8"
pageSha256: "e06e3ecaea35405f014913ae17a692af53c74d0883c9f2384c4c536ead7ff8f8"
contentMode: "local-full"
zh: ""
---

# Mission - Initialization Scripts for Agents

## Goal
Build `init_agent.py` that probes runtime, dependencies, test command, env vars, and state freshness, then writes `init_report.json` and halts the session loud when a block-severity probe fails.

## Inputs
- A repo with a `requirements.txt` (or equivalent), a test command, and the workbench state file from lesson 34
- The probe table from the lesson (runtime, deps, paths, env, state freshness, last-known-good commit)

## Deliverables
- `init_agent.py` with one function per probe returning `(name, status, detail)`
- `init_report.json` carrying the full probe set and a timestamp
- Non-zero exit on any block-severity probe failure

## Acceptance
- `python3 code/main.py` exits zero on the happy path
- Running it twice in a row is a no-op except for the timestamp
- A simulated missing env var probe surfaces in the report and flips the exit code

## Out of scope
- Auto-installing missing dependencies. The script halts and surfaces; the human fixes.
- Calling an LLM from a probe. Probes stay deterministic plumbing.

## References
- `docs/zh.md` - full lesson
- `code/main.py` - reference implementation
- `outputs/skill-init-script.md` - extracted skill
