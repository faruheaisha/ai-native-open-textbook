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
pageSha256: "99bee5f953dfad8360aeb0c4d12e099c48e93769bbe4dc31a501a5d586ee8cc9"
contentMode: "local-full"
zh: ""
---

## Phase 53 追補テーブル

この追補セクションでは、Claude Code `2.1.117-2.1.118` と Codex `0.123.0` の一次情報から、Harness に直接実装するべきか、自動継承 / Plans 化に留めるべきかを分類します。詳細は `docs/upstream-update-snapshot-2026-04-23.md` に記録しています。

| 機能 | 活用スキル / 領域 | 用途 | 付加価値 |
|------|-------------------|------|----------|
| **Claude Code `type: "mcp_tool"` hooks** | hooks, MCP diagnostics, tests | shell script を増やさず、読み取り専用の MCP health / resource 診断 hook を小さく検証する | `A: 実装あり`。53.1.2 では manifest 追加を no-op とし、常設 read-only diagnostic tool と安定 field 仕様が揃うまで配布 hooks へ入れない判断を snapshot に記録。書き込み系 MCP tool を呼ばないことは `tests/test-claude-upstream-integration.sh` で固定 |
| **Claude Code `claude plugin tag`** | harness-release, plugin release | `VERSION` と `.claude-plugin/plugin.json` の同期確認後に plugin version validation 付き tag を作る | `A: 実装予定`。53.1.3 で release flow / dry-run / test guidance に追加 |
| **Auto Mode `"$defaults"` extension** | permissions, sandbox, settings docs | built-in default を置き換えず、Harness 独自ルールを追加する形へ guidance を更新する | `A: 実装あり`。53.1.4 で `"$defaults"` を additive baseline として記録し、R05 / `deniedDomains` と二重責務にならない理由を snapshot・template・upstream integration test で固定 |
| **Plugin themes / managed settings / dependency auto-resolve** | setup, plugin policy, enterprise docs | `themes/`, `DISABLE_UPDATES`, `blockedMarketplaces`, `strictKnownMarketplaces`, dependency hints を管理環境向けに整理する | `A: docs 化済み`。53.1.5 で `docs/plugin-managed-settings-policy.md` を新設し、Harness 独自 resolver を重ねない方針を明記。theme 同梱判断は snapshot 側で `P` として残す |
| **Claude Code UX / runtime fixes** | session, agents, MCP, search, effort | `/usage` 統合、`/resume` `/add-dir` 対応、`--agent` + `mcpServers`、stale session summary、native `bfs` / `ugrep`、高 effort default を整理する | `C/P: 自動継承 + Plans 化`。53.1.6 で wrapper を追加しない理由を snapshot に記録し、`--agent` + `mcpServers` と external forked subagent flag は agent audit 候補として `P` に残す |
| **Codex 0.123.0 provider / model metadata** | Codex setup, provider policy | built-in `amazon-bedrock` provider、AWS profile support、current `gpt-5.4` default metadata を Codex setup guidance に反映する | `A: docs 化済み`。53.2.1 で `docs/codex-provider-setup-policy.md` を新設し、Harness 配布 config では `model` / `model_provider` を固定せず、Bedrock 利用者だけが user / project config に追加する方針を固定 |
| **Codex 0.123.0 MCP diagnostics / plugin loading** | troubleshoot, setup, Codex plugin docs | `/mcp verbose`、diagnostics / resources / resource templates、`.mcp.json` の `mcpServers` 形式と top-level server map 形式を setup guidance に反映する | `A: docs 化済み`。53.2.2 で `docs/codex-mcp-diagnostics.md` を新設し、普段は `/mcp`、困った時だけ `/mcp verbose` を使う手順と、Claude Code 側 MCP guidance と混ぜない方針を固定 |
| **Codex 0.123.0 realtime handoff silence** | harness-loop, breezing, long-running | background agents が transcript delta を受け取り、必要ない時は明示的に沈黙できる前提で途中報告の頻度を整理する | `A: docs 化済み`。53.2.3 で `harness-loop` は 1 cycle につき最終報告 1 回、`breezing` は task 完了ごとに progress feed 1 回を基本にし、advisor / reviewer drift は silence 対象外として固定 |
| **Codex 0.123.0 sandbox / exec changes** | sandbox, execution policy | `remote_sandbox_config`、`codex exec` shared flags を追従する | `A: docs 化済み`。53.2.4 で `docs/codex-sandbox-execution-policy.md` を追加し、remote environment ごとの sandbox 要件比較と wrapper flag 重複削減可否を固定 |
| **Codex 0.123.0 automatic bug fixes** | Codex long-running UX, session shell, review privacy | `/copy` rollback、manual shell follow-up queue、Unicode / dead-key、stale proxy env、VS Code WSL keyboard、review prompt leak を記録する | `C: Codex 自動継承`。53.2.5 で workaround を追加しない理由を明記 |

**注記**:
Phase 53 でも `B: 書いただけ` は `0` 件です。Feature Table は入口に留め、公式 URL と version-by-version の判断根拠は `docs/upstream-update-snapshot-2026-04-23.md` に集約しました。`A` は Phase 53 の具体 task に接続し、`C` は本体修正の自動継承、`P` は推測実装しない将来判断として扱います。

Phase 53 closeout では、Codex mirror / path drift の広い棚卸しを Phase 51.2 の Codex-native skill audit TODO に残します。Phase 53 は upstream `0.123.0` 差分の具体反映だけを閉じ、Phase 51.2.1-51.2.4 の tool model / memory path / mirror path / media metadata 整理を先取りしません。
