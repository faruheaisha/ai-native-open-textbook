---
title: "Agent Note: Consolidated TUI presentation and navigation"
sourceId: "09-harness/deepseek-harness"
sourceTitle: "DeepSeek Harness"
sourceKind: "工程手册"
licenseLabel: "可转载"
lang: "中英混排"
tier: 2
volume: "09-harness"
sourceUrl: "https://github.com/deepseek-ai/deepseek-harness"
entryUrl: "https://github.com/deepseek-ai/deepseek-harness/blob/c291e7961a515f6d7af9304e7fd1d257929aef26/.agents/notes/archived/architecture/2026-07-28-consolidated-tui-presentation.md"
sourceRel: ".agents/notes/archived/architecture/2026-07-28-consolidated-tui-presentation.md"
rawUrl: "/raw/09-harness/deepseek-harness/.agents/notes/archived/architecture/2026-07-28-consolidated-tui-presentation.md"
sourceSha256: "e6fa4ea0c9d1d94942ab98de47c554f4e8aa3b639a1cce52113107b1dbb0f4b0"
pageSha256: "e6fa4ea0c9d1d94942ab98de47c554f4e8aa3b639a1cce52113107b1dbb0f4b0"
contentMode: "local-full"
zh: ""
---

# Agent Note: Consolidated TUI presentation and navigation

Status: implemented
Archived: 2026-08-04

English | [中文](/lib/09-harness/deepseek-harness/_agents-notes-archived-architecture-2026-07-28-consolidated-tui-presentation.zh)

## Problem

The terminal UI accumulated independent presentation rules that interacted poorly: palette roles aliased one another or inverted emphasis on light terminals; tool-card framing, output, and exit markers repeated or competed; injected context was parsed as XML and could not fold reliably; and `/resume` excluded sessions outside the current workspace even when the launcher could reach them. Each symptom appeared local, but the durable decision is one terminal-reading model: a small inspectable palette, status-led cards with recessed bodies, content-independent transcript folding, and workspace-aware navigation.

## Decision

### Palette

`paletteSpec(scheme)` is the single table of SGR codes, close codes, and purposes. `createPalette` derives every wrapper from it and `/palette` prints the same table in the running terminal. Components do not emit their own SGR sequences except for the fixed startup brand gradient. Every close resets every SGR group its open sets.

Duplicate roles are merged: `muted` into `dim`, `added` into `success`, `removed` into `error`, and the unused second accent is removed. `dim` uses `2;39` and closes with `22;39` on both schemes so recessed text stays relative to the terminal foreground rather than becoming a fixed heavy gray on light backgrounds. Colors and attributes are branded separately in TypeScript, allowing attribute/color composition while rejecting nested colors whose reset would discard the outer color.

### Tool cards

A tool card has one colored `Tool / <name>` status header over one dim body. Presenter titles, terminal commands and cwd rows, output, XML text, and fold markers use that body tone. Diff colors remain because red and green carry meaning, and signal markers remain errors.

`renderUnknownXml` receives an explicit body styler for unknown tool results. Terminal presenters parse and remove the model-facing final exit or signal marker before returning `TerminalResultView.output`; the TUI renders the structured status once as its own pill. Truncation, timeout, and sandbox lines remain in the body because the pill does not represent them.

### Injected context and folding
