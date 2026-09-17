---
title: "Agent Note: The banner returns, borderless"
sourceId: "09-harness/deepseek-harness"
sourceTitle: "DeepSeek Harness"
sourceKind: "工程手册"
licenseLabel: "可转载"
lang: "中英混排"
tier: 2
volume: "09-harness"
sourceUrl: "https://github.com/deepseek-ai/deepseek-harness"
entryUrl: "https://github.com/deepseek-ai/deepseek-harness/blob/c291e7961a515f6d7af9304e7fd1d257929aef26/.agents/notes/archived/feature/2026-07-21-tui-borderless-banner.md"
sourceRel: ".agents/notes/archived/feature/2026-07-21-tui-borderless-banner.md"
rawUrl: "/raw/09-harness/deepseek-harness/.agents/notes/archived/feature/2026-07-21-tui-borderless-banner.md"
sourceSha256: "e3237b4de432cd97262a4baf1f64fee6bea48c3180a2e773575f603ed008d44c"
pageSha256: "e3237b4de432cd97262a4baf1f64fee6bea48c3180a2e773575f603ed008d44c"
contentMode: "local-full"
zh: ""
---

# Agent Note: The banner returns, borderless

Status: implemented
Archived: 2026-07-26

English | [中文](/lib/09-harness/deepseek-harness/_agents-notes-archived-feature-2026-07-21-tui-borderless-banner.zh)

## Problem

An intermediate no-banner design removed the boxed startup banner: it deleted `HeaderComponent` and its sweep, moved the model into the footer, dropped the session id, and rendered `welcome` as the transcript's first line. The user's verdict reversed that: bring the banner back — "just remove the border". The four-row box frame was the objectionable chrome, not the identifying facts it carried (model, session id) nor the sweep-in motion.

## Decision

- `HeaderComponent` and its left-to-right sweep return, but render **borderless**: no `╭─╮`/`╰─╯` corners and no `│` side bars. Each line is a single leading space plus `truncateToWidth`-clipped content, so the sweep's width clip can never tear an escape sequence and no fixed frame is drawn. The reveal advances through about 24 frames at 15 ms each.
