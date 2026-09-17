---
title: "Agent Note: Multi-select custom answer composition"
sourceId: "09-harness/deepseek-harness"
sourceTitle: "DeepSeek Harness"
sourceKind: "工程手册"
licenseLabel: "可转载"
lang: "中英混排"
tier: 2
volume: "09-harness"
sourceUrl: "https://github.com/deepseek-ai/deepseek-harness"
entryUrl: "https://github.com/deepseek-ai/deepseek-harness/blob/c291e7961a515f6d7af9304e7fd1d257929aef26/.agents/notes/archived/bug-fix/2026-07-30-multi-select-custom-answer-composition.md"
sourceRel: ".agents/notes/archived/bug-fix/2026-07-30-multi-select-custom-answer-composition.md"
rawUrl: "/raw/09-harness/deepseek-harness/.agents/notes/archived/bug-fix/2026-07-30-multi-select-custom-answer-composition.md"
sourceSha256: "53608255289abc55fd0857baf7a0b8a91897a270522e75e657c35f413d17fefc"
pageSha256: "53608255289abc55fd0857baf7a0b8a91897a270522e75e657c35f413d17fefc"
contentMode: "local-full"
zh: ""
---

# Agent Note: Multi-select custom answer composition

Status: implemented
Archived: 2026-09-04

English | [中文](/lib/09-harness/deepseek-harness/_agents-notes-archived-bug-fix-2026-07-30-multi-select-custom-answer-composition.zh)

## Problem

The user-questions result vocabulary carries selected option labels and optional custom text in separate fields, but its original semantics made them mutually exclusive for every question. On a multi-select question, opening or typing the custom answer discarded labels the user had already selected. The TUI returned only the custom text, and the Web host rejected a client response that preserved both fields.

## Decision

For a question with `multiSelect: true`, one answer item may contain both a non-empty `selected` array and non-empty `custom` text. Web drafts preserve both values regardless of whether the user selects an option or types custom text first; the TUI retains pending custom text across option/custom mode switches and projects it with checked labels from either submit mode; and the Web host accepts the combined response after applying its existing id, label, uniqueness, batch, and non-empty-text validation.

Single-select and optionless questions keep exclusive semantics: custom text overrides any selected option. The result shape remains `\{ id, selected, custom? \}`, so no wire or tool-output schema changes.

## Alternatives considered

**Encode custom text as another `selected` label.** Rejected because it would erase the distinction between caller-provided option labels and human-authored text, weakening validation and forcing consumers to infer which value was custom.

**Allow `selected` and `custom` together for every question.** Rejected because a single-select question represents one answer; permitting a selected option plus custom text would make its cardinality ambiguous. The combined form is limited to questions that explicitly opt into multiple answers.

## Consequences

Multi-select UIs can represent the user's complete answer without discarding either source. Providers and consumers retain the existing DTO, while request-aware validators interpret the allowed combination from `multiSelect`. Web component and assembled-browser coverage, TUI coverage, host-response coverage, and tool-projection coverage pin the combined result. Web, TUI, and tool-projection coverage also retain labels-only answers; assembled keyless TUI coverage pins the combined terminal flow, and single-select host coverage pins the remaining exclusivity rule.
