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
entryUrl: "https://github.com/fancyboi999/ai-engineering-from-scratch-zh/blob/109181ce68128c1bf27ec20867177007a8bace89/phases/14-agent-engineering/33-instructions-as-executable-constraints/code/agent-rules.md"
sourceRel: "phases/14-agent-engineering/33-instructions-as-executable-constraints/code/agent-rules.md"
rawUrl: "/raw/07-coding/ai-engineering-from-scratch-zh/phases/14-agent-engineering/33-instructions-as-executable-constraints/code/agent-rules.md"
sourceSha256: "1708c58cc89529f38aa7d5bad7b85679e11bed08084bc2fa6e12e281e6e1805c"
pageSha256: "1708c58cc89529f38aa7d5bad7b85679e11bed08084bc2fa6e12e281e6e1805c"
contentMode: "local-full"
zh: ""
---

# Agent Rules

## startup/state-file-fresh
- category: startup
- check: state_file_fresh
Agent must read agent_state.json before any tool call.

## forbidden/no-release-script-edits
- category: forbidden
- check: no_release_script_edits
Never edit scripts/release.sh outside an approved release task.

## done/tests-pass
- category: definition_of_done
- check: tests_pass
A task is done only when its acceptance command exits zero.

## uncertainty/open-question-note
- category: uncertainty
- check: opened_question_when_unsure
When confidence is below threshold, write a question note instead of guessing.

## approval/new-dependency
- category: approval
- check: new_dependency_approved
Adding a runtime dependency requires explicit human approval.
