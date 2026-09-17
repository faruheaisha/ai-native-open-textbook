---
title: "Agent Note: TUI presents a reason for every turn-end kind"
sourceId: "09-harness/deepseek-harness"
sourceTitle: "DeepSeek Harness"
sourceKind: "工程手册"
licenseLabel: "可转载"
lang: "中英混排"
tier: 2
volume: "09-harness"
sourceUrl: "https://github.com/deepseek-ai/deepseek-harness"
entryUrl: "https://github.com/deepseek-ai/deepseek-harness/blob/c291e7961a515f6d7af9304e7fd1d257929aef26/.agents/notes/archived/bug-fix/2026-07-24-tui-turn-end-stop-reason-notices.md"
sourceRel: ".agents/notes/archived/bug-fix/2026-07-24-tui-turn-end-stop-reason-notices.md"
rawUrl: "/raw/09-harness/deepseek-harness/.agents/notes/archived/bug-fix/2026-07-24-tui-turn-end-stop-reason-notices.md"
sourceSha256: "5a1f6ba4baf25ad412eda3601ee074aeb607388da0375979797797a81eeba9da"
pageSha256: "5a1f6ba4baf25ad412eda3601ee074aeb607388da0375979797797a81eeba9da"
contentMode: "local-full"
zh: ""
---

# Agent Note: TUI presents a reason for every turn-end kind

Status: implemented
Archived: 2026-08-04

English | [中文](/lib/09-harness/deepseek-harness/_agents-notes-archived-bug-fix-2026-07-24-tui-turn-end-stop-reason-notices.zh)

## Problem

The TUI rendered transcript notices for `error`, `aborted`, `max-tokens`, `rejected`, and `interrupted` turn ends, but a `disposed` turn end and any plugin-added `TurnEndReasonMap` kind rendered nothing. When such a turn ended — live or replayed from a persisted log — the agent stopped working with no visible reason, breaking the product expectation that every stop is explained to the user.

## Decision

The `turn/end` case in `packages/ui/tui/src/index.ts` switches on the reason's discriminant and covers every kind: `completed` stays silent because the settled assistant message and its `Completed` timing header already present that outcome; `disposed` appends `Turn stopped: the agent was disposed.`; and the merge-extensible default appends `Turn ended: <kind>.` so an unknown plugin-added outcome still names why the agent stopped. All other kinds keep their existing notices.

## Alternatives considered

**A notice for `completed` turns too.** Rejected as noise: every ordinary response would gain a redundant line, and the assistant message plus its frozen timing header already mark the completion.

**Suppressing the `disposed` turn-end notice live because `agent/disposed` also appends `Agent "<id>" was disposed.`** Rejected: the two notices state different facts (this turn was cut short vs. the agent is gone), and the turn-end notice is the only one that survives replay of a persisted log, where the live `agent/disposed` emission does not recur.

**Keeping the default branch silent (the prior behavior).** Rejected: a merge-extensible kind unknown to the TUI is exactly the case where the user has no other way to learn why the agent stopped.

## Consequences

- A turn never ends without a user-visible reason in the TUI: every non-`completed` `turn/end` kind appends a transcript notice, including unknown plugin-added kinds by name.
- Live disposal during a running turn shows two notices (the turn-end notice plus `agent/disposed`); a replayed log shows the turn-end notice alone.
- The `errors-and-help` snapshot pins the `disposed` and unknown-kind notices alongside the existing failure and interruption notices.
