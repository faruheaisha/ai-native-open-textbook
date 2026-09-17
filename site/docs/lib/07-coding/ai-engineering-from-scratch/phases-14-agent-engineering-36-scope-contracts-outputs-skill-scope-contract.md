---
title: "AI Engineering from Scratch（英文原版）"
sourceId: "07-coding/ai-engineering-from-scratch"
sourceTitle: "AI Engineering from Scratch（英文原版）"
sourceKind: "源码研读"
licenseLabel: "可转载"
lang: "英文"
tier: 2
volume: "07-coding"
sourceUrl: "https://github.com/rohitg00/ai-engineering-from-scratch"
entryUrl: "https://github.com/rohitg00/ai-engineering-from-scratch/blob/d18b8fe5a913c46011a3b06cb6ebd6a924414fd3/phases/14-agent-engineering/36-scope-contracts/outputs/skill-scope-contract.md"
sourceRel: "phases/14-agent-engineering/36-scope-contracts/outputs/skill-scope-contract.md"
rawUrl: "/raw/07-coding/ai-engineering-from-scratch/phases/14-agent-engineering/36-scope-contracts/outputs/skill-scope-contract.md"
sourceSha256: "df474da091857cac1f4dd1823cccd9130724cc52224dcb9bac65a2ab251f2e38"
pageSha256: "df474da091857cac1f4dd1823cccd9130724cc52224dcb9bac65a2ab251f2e38"
contentMode: "local-full"
zh: ""
---

# AI Engineering from Scratch（英文原版）

Given a task description and a repo layout, produce a scope contract and a diff-aware checker.

Produce:

1. `scope_contract.json` for the task with fields: `task_id`, `goal`, `allowed_files` (globs), `forbidden_files` (globs), `acceptance_criteria`, `rollback_plan`, `approvals_required`.
2. `tools/scope_check.py` that takes a contract path and a list of touched files and returns a `ScopeReport` plus a non-zero exit on any violation.
3. CI step (`.github/workflows/scope-check.yml` or equivalent) that runs the checker against the merge diff.
4. `outputs/scope/closed/<task_id>.json` archival convention so contracts ship with the change history.

Hard rejects:

- A contract without `forbidden_files`. Negative space is part of the contract.
- A contract that lists raw paths instead of globs for code directories. Refactors invalidate raw paths overnight.
- A `rollback_plan` field that is empty or "see runbook." Spell it out.
- Approvals listed as "case by case." Approval boundaries must be enumerable.

Refusal rules:

- If the task description does not constrain a region of the repo, refuse to author `allowed_files` from the description alone. Ask for the directory the task lives in.
- If the repo has no test command, refuse to add `acceptance_criteria` until one is supplied or stubbed. A contract that cannot be verified is a wish.
- If the agent runtime cannot honor approval boundaries (no human-in-the-loop), surface the gap before shipping; scope creep into approval-required actions will be the dominant failure.

Output structure:

```
<repo>/
├── scope_contract.json
├── outputs/scope/closed/
│   └── T-XXX.json
├── tools/
│   └── scope_check.py
└── .github/
    └── workflows/
        └── scope-check.yml
```

End with "what to read next" pointing to:

- Lesson 37 for runtime feedback that links commands run back to the contract.
- Lesson 38 for the verification gate that consumes the scope report.
- Lesson 39 for the reviewer agent that audits the closed contract archive.
