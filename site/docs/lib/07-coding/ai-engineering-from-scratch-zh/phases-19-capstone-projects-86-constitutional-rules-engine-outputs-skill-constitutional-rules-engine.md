---
title: "Constitutional Rules Engine"
sourceId: "07-coding/ai-engineering-from-scratch-zh"
sourceTitle: "AI 工程从零到一（中文）"
sourceKind: "源码研读"
licenseLabel: "可转载"
lang: "中文"
tier: 1
volume: "07-coding"
sourceUrl: "https://github.com/fancyboi999/ai-engineering-from-scratch-zh"
entryUrl: "https://github.com/fancyboi999/ai-engineering-from-scratch-zh/blob/109181ce68128c1bf27ec20867177007a8bace89/phases/19-capstone-projects/86-constitutional-rules-engine/outputs/skill-constitutional-rules-engine.md"
sourceRel: "phases/19-capstone-projects/86-constitutional-rules-engine/outputs/skill-constitutional-rules-engine.md"
rawUrl: "/raw/07-coding/ai-engineering-from-scratch-zh/phases/19-capstone-projects/86-constitutional-rules-engine/outputs/skill-constitutional-rules-engine.md"
sourceSha256: "4d4ac6b329a4c70f2b1bf31535d02bf1b4555a70107def8e4e9a99a3a9257893"
pageSha256: "4d4ac6b329a4c70f2b1bf31535d02bf1b4555a70107def8e4e9a99a3a9257893"
contentMode: "local-full"
zh: ""
---

# Constitutional Rules Engine

A constitution is a YAML file. Each rule has `name`, `severity` (low | medium | high), `applies_when` (predicate), `must` (predicate), `explanation`, and optional `fix`.

## Predicates

Atomic:

- `contains_regex` / `not_contains_regex`
- `starts_with_regex` / `ends_with_regex`
- `max_words` / `min_words`

Compositional:

- `all_of: [...predicates]`
- `any_of: [...predicates]`
- `not_: predicate`

## Fix operations

- `append_if_missing: <suffix>`
- `prepend_if_missing: <prefix>`
- `replace_regex: \{ pattern: <regex>, replacement: <text> \}`

## Engine output

`Engine.evaluate(text) -> EngineReport` returns one `RuleResult` per rule with `status` in `pass`, `violation`, `not_applicable`. `report.violations()` filters to violations and `report.max_severity()` returns the worst severity present.

## Artifact

`outputs/rules_report.json` carries draft, revised, and structured diff per case.
