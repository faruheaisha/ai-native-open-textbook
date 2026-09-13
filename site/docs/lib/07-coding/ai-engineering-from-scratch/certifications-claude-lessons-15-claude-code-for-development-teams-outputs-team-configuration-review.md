---
title: "Team Configuration Review: Support Router"
sourceId: "07-coding/ai-engineering-from-scratch"
sourceTitle: "AI Engineering from Scratch（英文原版）"
sourceKind: "源码研读"
licenseLabel: "可转载"
lang: "英文"
tier: 2
volume: "07-coding"
sourceUrl: "https://github.com/rohitg00/ai-engineering-from-scratch"
entryUrl: "https://github.com/rohitg00/ai-engineering-from-scratch/blob/d18b8fe5a913c46011a3b06cb6ebd6a924414fd3/README.md"
zh: ""
---

# Team Configuration Review: Support Router

Status: ready for team review

## Scope

Owner: developer-platform. The reviewed job proposes patches from pull-request
diffs. It cannot merge, deploy, post comments, or read unrelated repositories.

## Capability Inventory

Read is limited to the isolated checkout. Edit is limited to the patch workspace.
The job may run `python3 -m unittest`; network and production credentials are
absent. A human owns merge and any external communication.

## Permission Modes

Interactive work begins in `default`. `acceptEdits` may pre-approve file edits,
but it does not authorize a push, deploy, network call, or external message.
Headless review uses `dontAsk` with narrow allow rules, while a deny rule blocks
credentials and publishing in every ordinary mode. `bypassPermissions` is not
allowed in this job.

## Context Recovery

The operator uses `/context` to inspect consumption and `/compact` with explicit
focus to continue the same task. `/clear` starts unrelated work with empty
conversation context. `/rewind` may restore tracked edits or conversation, but
Git and authoritative external state remain the recovery record.

## Autonomous Boundary

`/goal` is allowed only with a measurable acceptance condition, a turn budget
visible to the evaluator, and an externally enforced turn bound. `/loop` may
poll CI while the session stays open, but it cannot invent new work or widen
publishing authority. Both retain the current permission boundary.

## Worktree Ownership
