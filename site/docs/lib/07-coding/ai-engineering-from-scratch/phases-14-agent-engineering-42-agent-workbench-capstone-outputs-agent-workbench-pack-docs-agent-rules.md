---
title: "Agent Rules"
sourceId: "07-coding/ai-engineering-from-scratch"
sourceTitle: "AI Engineering from Scratch（英文原版）"
sourceKind: "源码研读"
licenseLabel: "可转载"
lang: "英文"
tier: 2
volume: "07-coding"
sourceUrl: "https://github.com/rohitg00/ai-engineering-from-scratch"
entryUrl: "https://github.com/rohitg00/ai-engineering-from-scratch/blob/d18b8fe5a913c46011a3b06cb6ebd6a924414fd3/phases/14-agent-engineering/42-agent-workbench-capstone/outputs/agent-workbench-pack/docs/agent-rules.md"
sourceRel: "phases/14-agent-engineering/42-agent-workbench-capstone/outputs/agent-workbench-pack/docs/agent-rules.md"
rawUrl: "/raw/07-coding/ai-engineering-from-scratch/phases/14-agent-engineering/42-agent-workbench-capstone/outputs/agent-workbench-pack/docs/agent-rules.md"
sourceSha256: "864d3c7843b327520c726e7b4c9b15550f5e56f7625f9a06eff4e266aeec69ee"
pageSha256: "864d3c7843b327520c726e7b4c9b15550f5e56f7625f9a06eff4e266aeec69ee"
contentMode: "local-full"
zh: ""
---

# Agent Rules

## startup/state-file-fresh
- category: startup
- check: state_file_fresh
Agent must read agent_state.json before any tool call.

## forbidden/no-out-of-scope-writes
- category: forbidden
- check: no_out_of_scope_writes
Never edit a file outside the active task's scope contract.

## done/tests-pass
- category: definition_of_done
- check: tests_pass
A task is done only when every acceptance command exits zero.

## uncertainty/open-question-note
- category: uncertainty
- check: opened_question_when_unsure
When confidence is below threshold, open a question note instead of guessing.

## approval/new-dependency
- category: approval
- check: new_dependency_approved
Adding a runtime dependency requires explicit human approval.
