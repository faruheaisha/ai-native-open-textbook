---
title: "主要コマンド一覧"
sourceId: "09-harness/claude-code-harness-chachamaru"
sourceTitle: "Claude Code Harness"
sourceKind: "工程手册"
licenseLabel: "可转载"
lang: "中英混排"
tier: 3
volume: "09-harness"
sourceUrl: "https://github.com/Chachamaru127/claude-code-harness"
entryUrl: "https://github.com/Chachamaru127/claude-code-harness/blob/2b2b74805321089bd9b660a1064fa97556299703/docs/CLAUDE-commands.md"
sourceRel: "docs/CLAUDE-commands.md"
rawUrl: "/raw/09-harness/claude-code-harness-chachamaru/docs/CLAUDE-commands.md"
sourceSha256: "19038b3c02f831a1e9dfed5d1dd67bdb0bf5525768eb568e778de72505bddb08"
pageSha256: "19038b3c02f831a1e9dfed5d1dd67bdb0bf5525768eb568e778de72505bddb08"
contentMode: "local-full"
zh: ""
---

# 主要コマンド一覧

Claude harness 開発時に使用するコマンドとハンドオフの一覧です。

## 主要コマンド（開発時に使用）

| コマンド | 用途 |
|---------|------|
| `/plan-with-agent` | 改善タスクを Plans.md に追加 |
| `/work` | タスクを実装（スコープ自動判断、--codex 対応） |
| `/breezing` | Agent Teams でチーム並列完走（--codex 対応） |
| `/reload-plugins` | スキル/フック編集後の即時反映（再起動不要） |
| `/harness-review` | 変更内容をレビュー |
| `/validate` | プラグイン検証 |
| `/remember` | 学習事項を記録 |

## ハンドオフ

| コマンド | 用途 |
|---------|------|
| `/handoff-to-cursor` | Cursor 運用時の完了報告 |

**スキル（会話で自動起動）**:
- `handoff-to-impl` - 「実装役に渡して」→ PM → Impl への依頼
- `handoff-to-pm` - 「PMに完了報告」→ Impl → PM への完了報告

## 関連ドキュメント

- [CLAUDE.md](https://github.com/Chachamaru127/claude-code-harness/blob/2b2b74805321089bd9b660a1064fa97556299703/CLAUDE.md) - プロジェクト開発ガイド
- [docs/CLAUDE-skill-catalog.md](/lib/09-harness/claude-code-harness-chachamaru/docs-CLAUDE-skill-catalog) - スキルカタログ
- [docs/CLAUDE-feature-table.md](/lib/09-harness/claude-code-harness-chachamaru/docs-CLAUDE-feature-table/index) - 新機能活用テーブル
