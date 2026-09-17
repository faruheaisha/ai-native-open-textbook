---
title: "Harness Review Checklist"
sourceId: "09-harness/awesome-harness-engineering-aiboost"
sourceTitle: "Awesome Harness Engineering（ai-boost）"
sourceKind: "工程手册"
licenseLabel: "可转载"
lang: "英文"
tier: 3
volume: "09-harness"
sourceUrl: "https://github.com/ai-boost/awesome-harness-engineering"
entryUrl: "https://github.com/ai-boost/awesome-harness-engineering/blob/6015473ad287575fc06d0ddd7835306250a66b9f/templates/HARNESS_CHECKLIST.md"
sourceRel: "templates/HARNESS_CHECKLIST.md"
rawUrl: "/raw/09-harness/awesome-harness-engineering-aiboost/templates/HARNESS_CHECKLIST.md"
sourceSha256: "78de553a7e4a4fe23ee24c39444e7aaf4213fea23fb91c8a3e83c5f8de04c734"
pageSha256: "78de553a7e4a4fe23ee24c39444e7aaf4213fea23fb91c8a3e83c5f8de04c734"
contentMode: "local-full"
zh: ""
---

# Harness Review Checklist

> Run through this before shipping a harness to production or handing it off.
> A failing item is a blocker; a skipped item needs a written justification.

## Agent instructions (AGENTS.md)

- [ ] Project overview is accurate and up to date
- [ ] Repository structure reflects the current layout
- [ ] Tool permissions are explicit — allowed, restricted, and not-allowed are all specified
- [ ] Verification gates are defined and commands are correct
- [ ] No ambiguous instructions that could be interpreted multiple ways

## Tool design

- [ ] Each tool has a clear, unambiguous name
- [ ] Tool schemas are minimal — no optional fields that the agent won't use
- [ ] Error messages tell the agent what to do next, not just what went wrong
- [ ] Tool return values are consistent (same shape on success and failure)
- [ ] No tool does more than one conceptual thing

## Context delivery

- [ ] Context is scoped to what the agent needs for this task — not the entire codebase
- [ ] Long-lived state (plans, decisions, progress) is in files, not in the prompt
- [ ] Context compaction strategy is defined for multi-session tasks
- [ ] No sensitive data (secrets, credentials) in agent-accessible context

## Planning artifacts

- [ ] PLAN.md exists for non-trivial tasks
- [ ] Milestones have explicit verification commands
- [ ] Scope boundaries (in-scope / out-of-scope) are written down
- [ ] IMPLEMENT.md captures decisions and deviations as they happen

## Permissions & sandbox

- [ ] Agent runs with the minimum permissions needed for the task
- [ ] Destructive operations require explicit confirmation
- [ ] Network access is scoped if possible
- [ ] File system access is scoped to project directories

## Verification loop

- [ ] Tests exist for the agent's outputs
- [ ] The agent can run the verification command itself (not just "human review")
- [ ] Verification runs automatically on task completion, not just on PR
- [ ] Eval criteria are written down before the task starts, not after

## When this harness component should be removed

> Every harness component exists because the model can't do something yet.
> Document what capability improvement would make this component unnecessary.

| Component | Exists because | Can be removed when |
|---|---|---|
| | | |

---

*Reviewed: YYYY-MM-DD*
*Reviewer:*
