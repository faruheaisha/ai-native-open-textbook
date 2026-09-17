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
pageSha256: "a9b641c84218424b20a334a3f5bf7b270b06c61db150de8835ae4e3730025c2d"
contentMode: "local-full"
zh: ""
---

## Phase 52 追補テーブル

この追補セクションでは、Claude Code `2.1.116` と Codex `0.122.0` / `0.123.0-alpha.2` の一次情報から、Harness に直接実装するべきか、自動継承 / Plans 化に留めるべきかを分類します。詳細は `docs/upstream-update-snapshot-2026-04-21.md` に記録しています。

| 機能 | 活用スキル / 領域 | 用途 | 付加価値 |
|------|-------------------|------|----------|
| **Claude Code 2.1.116 resume / MCP / plugin updater UX refresh** | session, setup, MCP | `/resume` 高速化、MCP startup deferred loading、plugin dependency auto-install を Harness の session / setup guidance と照合 | `C/P: 自動継承 + Plans 化`。Harness wrapper は追加せず、plugin dependency policy と MCP health watch の後続候補に残す |
| **Claude Code 2.1.116 dangerous-path safety / agent hooks refresh** | guardrails, agents | sandbox auto-allow dangerous-path safety と main-thread `--agent` hooks 発火を既存 guardrail / agent policy と照合 | `C/P: 自動継承 + Plans 化`。R05 guardrail は維持し、agent frontmatter policy audit に残す |
| **Codex 0.122.0 plugin / Plan Mode / permission model** | codex workflow, setup, sandbox | `/side`、fresh-context Plan Mode、plugin workflow、deny-read glob、tool discovery default-on を Codex mirror 改善候補に分類 | `P: Plans 化`。Phase 51.2 の Codex-native skill audit と一緒に扱う |
| **Codex 0.123.0-alpha.2 pre-release** | future compare | release body が薄い alpha を推測実装せず、stable 化後の再確認対象にする | `P: Plans 化`。compare から推測実装しない |
| **Upstream update Skills merge hardening** | skills, review, tests | `cc-update-review` を diff-aware 化し、`claude-codex-upstream-update` を no-op adaptation 対応にして mirror drift test を追加 | `A: 実装あり` (`skills/cc-update-review`, `skills/claude-codex-upstream-update`, `tests/test-claude-upstream-integration.sh`) |

**注記**:
Phase 52 でも `B: 書いただけ` は `0` 件です。Claude / Codex 本体が自然に改善する UX は `C` とし、Harness に重ねると二重責務になるものは `P` として後続の Codex-native skill audit / plugin policy に接続しました。直接実装は review findings の再発防止に絞り、skill mirror drift と no-op adaptation を test で固定しています。
