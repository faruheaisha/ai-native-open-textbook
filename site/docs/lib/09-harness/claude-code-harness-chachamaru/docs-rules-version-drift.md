---
title: "Version Drift Detection"
sourceId: "09-harness/claude-code-harness-chachamaru"
sourceTitle: "Claude Code Harness"
sourceKind: "工程手册"
licenseLabel: "可转载"
lang: "中英混排"
tier: 3
volume: "09-harness"
sourceUrl: "https://github.com/Chachamaru127/claude-code-harness"
entryUrl: "https://github.com/Chachamaru127/claude-code-harness/blob/2b2b74805321089bd9b660a1064fa97556299703/docs/rules/version-drift.md"
sourceRel: "docs/rules/version-drift.md"
rawUrl: "/raw/09-harness/claude-code-harness-chachamaru/docs/rules/version-drift.md"
sourceSha256: "06d6a0289b1cb743d7f5bed327476852cae3cf09cc918c18114636db44c5551f"
pageSha256: "06d6a0289b1cb743d7f5bed327476852cae3cf09cc918c18114636db44c5551f"
contentMode: "local-full"
zh: ""
---

# Version Drift Detection

## チェック対象

VERSION と .claude-plugin/plugin.json の version は常に一致必須。
不一致検出時は `./scripts/sync-version.sh` の実行を提案（自動実行はしない）。

## Feature Table 鮮度

docs/CLAUDE-feature-table.md 内の「計画中（未実装）」「実装予定」項目は
6ヶ月経過で削除を提案。

## なぜこのルールが必要か

D2（不正確情報）は一度修正しても再発する。
バージョン不一致と Feature Table の腐敗は最も一般的なドリフトパターン。
