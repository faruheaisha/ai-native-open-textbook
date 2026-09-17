---
title: "Plan Canvas Command"
sourceId: "09-harness/ecc"
sourceTitle: "ECC —— Harness 性能优化系统"
sourceKind: "其他材料"
licenseLabel: "可转载"
lang: "英文"
tier: 3
volume: "09-harness"
sourceUrl: "https://github.com/affaan-m/ECC"
entryUrl: "https://github.com/affaan-m/ECC/blob/928c1dea72f5c330442fc1f595563398b8f389f7/commands/plan-canvas.md"
sourceRel: "commands/plan-canvas.md"
rawUrl: "/raw/09-harness/ecc/commands/plan-canvas.md"
sourceSha256: "8afc9d0bf73f79088ada2109310e988c7e961c0fb049b2b35ecc4b3706d253f9"
pageSha256: "8afc9d0bf73f79088ada2109310e988c7e961c0fb049b2b35ecc4b3706d253f9"
contentMode: "local-full"
zh: ""
---

# Plan Canvas Command

Opens a local artifact in the Plan Canvas — ECC's browser review surface —
where the user annotates elements, chats with you, and approves the plan or
requests changes without leaving the page.

This command is a thin entry point over the `plan-canvas` skill. Follow that
skill for the full workflow and rules.

## What This Command Does

1. Resolve the artifact: the given path, else the most recently modified
   `.claude/plans/*.plan.md`, else ask what to review.
2. `ecc-plan-canvas open <artifact>` — opens the user's browser.
3. `ecc-plan-canvas await <artifact>` — block until feedback,
   verdict, or session end; leave it running.
4. Apply feedback to the artifact file (the canvas live-reloads), answer with
   `await <artifact> --reply "..."`, and repeat until the user approves or
   ends the session.

An `approve` verdict counts as plan confirmation for `/plan`-style gates:
stop polling, `end` the session, and begin implementation.

## Example

```
User: /plan-canvas .claude/plans/notifications.plan.md

Assistant: (runs open + await, browser opens)
...user clicks "Request changes" with two annotations...
Assistant: (edits the plan, replies in-canvas, awaits again)
...user clicks "Approve plan"...
Assistant: Plan approved in the canvas — starting implementation.
```

## Related

- `plan-canvas` skill — full workflow, feedback JSON shapes, rules
- `/plan` — produces the plan artifacts this reviews
- Source: `scripts/plan-canvas.js`, `scripts/lib/plan-canvas/`
