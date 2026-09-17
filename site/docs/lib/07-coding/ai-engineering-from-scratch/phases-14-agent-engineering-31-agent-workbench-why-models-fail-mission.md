---
title: "Mission - Agent Workbench: Why Capable Models Still Fail"
sourceId: "07-coding/ai-engineering-from-scratch"
sourceTitle: "AI Engineering from Scratch（英文原版）"
sourceKind: "源码研读"
licenseLabel: "可转载"
lang: "英文"
tier: 2
volume: "07-coding"
sourceUrl: "https://github.com/rohitg00/ai-engineering-from-scratch"
entryUrl: "https://github.com/rohitg00/ai-engineering-from-scratch/blob/d18b8fe5a913c46011a3b06cb6ebd6a924414fd3/phases/14-agent-engineering/31-agent-workbench-why-models-fail/mission.md"
sourceRel: "phases/14-agent-engineering/31-agent-workbench-why-models-fail/mission.md"
rawUrl: "/raw/07-coding/ai-engineering-from-scratch/phases/14-agent-engineering/31-agent-workbench-why-models-fail/mission.md"
sourceSha256: "96a082fbdb09d326ee6b5ceed8528e8b1029a127bcb41d7e343d980d27e7ebcc"
pageSha256: "96a082fbdb09d326ee6b5ceed8528e8b1029a127bcb41d7e343d980d27e7ebcc"
contentMode: "local-full"
zh: ""
---

# Mission - Agent Workbench: Why Capable Models Still Fail

## Goal
Run the same small repo task twice, once prompt-only and once with the seven workbench surfaces wired in, and emit a failure-mode report that maps each missed surface to the symptom it caused.

## Inputs
- A stub agent and a tiny FastAPI-style handler to validate
- The seven-surface list (instructions, state, scope, feedback, verification, review, handoff)

## Deliverables
- `code/main.py` that runs both pipelines back to back
- `failure_modes.json` summarizing the prompt-only run
- One-line verdict for the workbench run

## Acceptance
- `python3 code/main.py` exits zero
- Output shows a side-by-side log of the two runs
- `failure_modes.json` lists every missed surface with the matching symptom

## Out of scope
- Calling a real model. The stub is rule-based on purpose.
- Building any one surface in depth. That is what the next eleven lessons are for.

## References
- `docs/en.md` - full lesson
- `code/main.py` - reference implementation
- `outputs/skill-workbench-audit.md` - extracted skill
