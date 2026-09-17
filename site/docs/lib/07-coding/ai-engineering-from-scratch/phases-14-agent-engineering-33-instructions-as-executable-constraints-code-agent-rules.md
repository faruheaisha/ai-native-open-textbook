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
entryUrl: "https://github.com/rohitg00/ai-engineering-from-scratch/blob/d18b8fe5a913c46011a3b06cb6ebd6a924414fd3/phases/14-agent-engineering/33-instructions-as-executable-constraints/code/agent-rules.md"
sourceRel: "phases/14-agent-engineering/33-instructions-as-executable-constraints/code/agent-rules.md"
rawUrl: "/raw/07-coding/ai-engineering-from-scratch/phases/14-agent-engineering/33-instructions-as-executable-constraints/code/agent-rules.md"
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
