---
title: "Mission - Initialization Scripts for Agents"
sourceId: "07-coding/ai-engineering-from-scratch"
sourceTitle: "AI Engineering from Scratch（英文原版）"
sourceKind: "源码研读"
licenseLabel: "可转载"
lang: "英文"
tier: 2
volume: "07-coding"
sourceUrl: "https://github.com/rohitg00/ai-engineering-from-scratch"
entryUrl: "https://github.com/rohitg00/ai-engineering-from-scratch/blob/d18b8fe5a913c46011a3b06cb6ebd6a924414fd3/phases/14-agent-engineering/35-initialization-scripts/mission.md"
sourceRel: "phases/14-agent-engineering/35-initialization-scripts/mission.md"
rawUrl: "/raw/07-coding/ai-engineering-from-scratch/phases/14-agent-engineering/35-initialization-scripts/mission.md"
sourceSha256: "ebc09ef9c99fa405de9326353476c0082a3a4e0f7be202df98ba44400faa2470"
pageSha256: "ebc09ef9c99fa405de9326353476c0082a3a4e0f7be202df98ba44400faa2470"
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
- `docs/en.md` - full lesson
- `code/main.py` - reference implementation
- `outputs/skill-init-script.md` - extracted skill
