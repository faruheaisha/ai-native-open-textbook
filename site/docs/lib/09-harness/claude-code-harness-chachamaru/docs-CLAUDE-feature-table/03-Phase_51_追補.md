---
title: "Claude Code Harness"
sourceId: "09-harness/claude-code-harness-chachamaru"
sourceTitle: "Claude Code Harness"
sourceKind: "工程手册"
licenseLabel: "可转载"
lang: "中英混排"
tier: 3
volume: "09-harness"
sourceUrl: "https://github.com/Chachamaru127/claude-code-harness"
entryUrl: "https://github.com/Chachamaru127/claude-code-harness/blob/2b2b74805321089bd9b660a1064fa97556299703/docs/CLAUDE-feature-table.md"
sourceRel: "docs/CLAUDE-feature-table.md"
rawUrl: "/raw/09-harness/claude-code-harness-chachamaru/docs/CLAUDE-feature-table.md"
sourceSha256: "acca52d5db42c13b7102c9fc9ec9844df193bbf13008d9c51e82f1bfa2a7a9fa"
pageSha256: "84c94913605e7350b19e200e3a86ecc5fbbe357f0b025f292ec4c975174a6c54"
contentMode: "local-full"
zh: ""
---

## Phase 51 追補テーブル

この追補セクションでは、Claude Code `2.1.112-2.1.114` と Codex `0.121.0` の一次情報から、Harness に載せる項目だけを分類します。

| 機能 | 活用スキル / 領域 | 用途 | 付加価値 |
|------|-------------------|------|----------|
| **AskUserQuestion `updatedInput.answers` bridge** | hooks, harness-plan, harness-release | `PreToolUse` で明示的に渡された answers を読み、`solo/team` や `scripted/exploratory` など既知同義語だけを option label に正規化して headless 対話を継続 | `A: 実装あり` (`go/internal/hookhandler/ask_user_question_normalizer.go`, `hooks/hooks.json`, `tests/test-claude-upstream-integration.sh`) |
| **Claude Code 2.1.113 permission / sandbox hardening** | settings, guardrails | `sandbox.network.deniedDomains` を設定し、`find -exec` / `-delete` と macOS dangerous rm paths を Harness guardrail でも検出 | `A: 実装あり` (`.claude-plugin/settings.json`, `go/internal/guardrail/helpers.go`, `tests/test-claude-upstream-integration.sh`) |
| **Claude Code 2.1.114 permission dialog crash fix** | hooks, team execution | Agent Teams teammate の permission dialog crash 修正 | `C: CC 自動継承` |
| **Claude/Codex upstream update Skills gate** | skills, review | upstream update 実施前に version-by-version 分解表を必須化し、PR 対象の `skills/` / `codex/.codex/skills/` と local-only `.agents/skills/` の判定を同期 | `A: 実装あり` (`claude-codex-upstream-update`, `cc-update-review`) |
| **Codex 0.121.0 marketplace / MCP Apps / memory controls** | setup, future Codex workflow | plugin marketplace、MCP Apps tool calls、memory reset / cleanup、sandbox metadata を Harness の Codex 比較軸へ残す | `P: Plans 化`。今回は Claude hardening 実装を優先し Plans に切り出し |
| **Codex 0.121.0 secure devcontainer / bubblewrap** | setup, guardrails | secure devcontainer profile と macOS Unix socket allowlist を将来の sandbox policy 比較対象にする | `C: Codex 側調査済み / Harness 変更なし` |
| **Skills mirror 総点検** | skills, setup | `.agents/skills` の Claude/Codex 置換 drift、Codex native tool model、memory/session path、media generation metadata を棚卸し | `P: Plans 化` (`docs/skills-audit-2026-04-20.md`) |

**注記**:
Phase 51 でも `B: 書いただけ` は `0` 件です。Codex 0.121.0 の大きい項目は、今回の直接実装ではなく「Codex 比較軸」として Plans に残し、Claude Code 側の `AskUserQuestion.updatedInput` と 2.1.113 hardening は settings / Go / tests まで実装して `A` としました。
