---
title: "Agent Rules"
sourceId: "07-coding/ai-engineering-from-scratch-zh"
sourceTitle: "AI 工程从零到一（中文）"
sourceKind: "源码研读"
licenseLabel: "可转载"
lang: "中文"
tier: 1
volume: "07-coding"
sourceUrl: "https://github.com/fancyboi999/ai-engineering-from-scratch-zh"
entryUrl: "https://github.com/fancyboi999/ai-engineering-from-scratch-zh/blob/109181ce68128c1bf27ec20867177007a8bace89/phases/14-agent-engineering/42-agent-workbench-capstone/outputs/agent-workbench-pack/docs/agent-rules.md"
sourceRel: "phases/14-agent-engineering/42-agent-workbench-capstone/outputs/agent-workbench-pack/docs/agent-rules.md"
rawUrl: "/raw/07-coding/ai-engineering-from-scratch-zh/phases/14-agent-engineering/42-agent-workbench-capstone/outputs/agent-workbench-pack/docs/agent-rules.md"
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
