---
title: "Agent Note: The running status line shows the turn phase and elapsed time"
sourceId: "09-harness/deepseek-harness"
sourceTitle: "DeepSeek Harness"
sourceKind: "工程手册"
licenseLabel: "可转载"
lang: "中英混排"
tier: 2
volume: "09-harness"
sourceUrl: "https://github.com/deepseek-ai/deepseek-harness"
entryUrl: "https://github.com/deepseek-ai/deepseek-harness/blob/c291e7961a515f6d7af9304e7fd1d257929aef26/.agents/notes/archived/feature/2026-07-21-tui-verbose-status-line.md"
sourceRel: ".agents/notes/archived/feature/2026-07-21-tui-verbose-status-line.md"
rawUrl: "/raw/09-harness/deepseek-harness/.agents/notes/archived/feature/2026-07-21-tui-verbose-status-line.md"
sourceSha256: "9dcba19ee725b1593e9413a1da5398c205a258aff2e384acd406bb618e86c7f0"
pageSha256: "9dcba19ee725b1593e9413a1da5398c205a258aff2e384acd406bb618e86c7f0"
contentMode: "local-full"
zh: ""
---

# Agent Note: The running status line shows the turn phase and elapsed time

Status: implemented
Archived: 2026-07-26

English | [中文](/lib/09-harness/deepseek-harness/_agents-notes-archived-feature-2026-07-21-tui-verbose-status-line.zh)

## Problem

While a turn ran, the [full-screen TUI](/lib/09-harness/deepseek-harness/_agents-notes-archived-feature-2026-07-17-dedicated-full-screen-tui-front-door) showed a single static "Working" spinner. It conveyed neither how long the current step had taken nor what the agent was doing — waiting on the model, thinking, streaming a response, or running tools — so a slow or stalled turn was indistinguishable from a fast one.

## Decision

- While a turn runs, the status line above the editor shows a derived phase label with elapsed time, keeping the trailing `— Enter sends steering, Esc cancels` hint. The four phases and their labels are `waiting` → "Waiting for the first token", `thinking` → "Thinking", `responding` → "Responding", and `executing` → "Executing tools".
- The phase is presentation state the TUI derives from live session events, not a session event or agent status of its own. `step/start` enters `waiting`; an `assistant/chunk` reasoning delta or reasoning block-start enters `thinking`; a text delta or text block-start enters `responding`; a `tool/call` enters `executing`. The event map is merge-extensible, so every other event kind falls through a default and leaves the phase unchanged.
