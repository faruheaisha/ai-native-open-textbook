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
pageSha256: "ba224a6bc489a1a8833a38504fcf9ace7b26115b7f782bb244d19dd2fbdd1291"
contentMode: "local-full"
zh: ""
---

## Phase 65 (cognitive-load 3 surface) — 2026-05-09 〜 2026-05-10

| Feature | Skill / Component | Purpose | 付加価値 |
|---------|-------------------|---------|---------|
| Plan Brief HTML (1st surface) | `harness-plan-brief` | 着工前の Claude 理解・選択肢・リスク・受け入れ条件・確信度を 1 枚 HTML で施主に承認確認 | A: 実装あり (Phase 65.1) |
| Acceptance Demo HTML (2nd surface) | `harness-accept` | 引き渡し時の ship/wait/reject 判定 + 受け入れ条件検証 + 過去問題パターン表示 | A: 実装あり (Phase 65.2) |
| Progress Tracker HTML (3rd surface) | `harness-progress` | 進捗 % + WIP/TODO/完了一覧 + 5 種 drift alert + PostToolUse 自動再生成 (60s rate limit) | A: 実装あり (Phase 65.4) |
| 3-Layer Redaction | `redact-by-\{dictionary,ner\}.sh` + `final-scan-redaction.py` + `render-html.sh --with-redaction` | Layer 2a 辞書 + 2b NER (fugashi) + 3 final scan で固有名詞 leakage を 3 層防御 | A: 実装あり (Phase 65.3) |
| Cross-Project Group | `cross-project-groups.yaml` + `load-cross-project-groups.sh` | 横断検索の opt-in グループ定義 (default OFF) | A: 実装あり (Phase 65.3.1) |
| Cross-Project Audit Log | `cross-project-audit-log.sh` | 横断検索 1 回ごとに 1 行 JSON Lines (privacy: query_hash のみ) | A: 実装あり (Phase 65.3.6) |
| Audit-trail UI | 3 HTML templates 共通追加 | 各 surface 末尾「🔍 この artifact の根拠」セクション (検索範囲 / 参照 ID / redact 件数 / log link) | A: 実装あり (Phase 65.5.2) |
| user_request_hash join | `personal-preference.v1` + `acceptance-decision.v1` の sha256 fields | Plan Brief ↔ Acceptance を同 hash で graph join 可能に | A: 実装あり (Phase 65.1.4 / 65.2.3) |

**ユーザー体験の改善**:
- 今まで: Plans.md (200 行) + git log を読まないと進捗・判断根拠が見えなかった。エンジニアじゃない発注者は完全にブラックボックス
- 今後: ブラウザで 1 枚 HTML を開けば 3 秒で「何を作る予定か (Plan Brief) / 今どこか (Progress) / 受け取れるか (Acceptance)」が判断できる
- 横断検索を有効化しても 3 層 redaction で他プロジェクトの固有名詞は漏れない (fail-safe)
- 詳細: [cognitive-load-surfaces.md](/lib/09-harness/claude-code-harness-chachamaru/docs-cognitive-load-surfaces) / [cross-project-safety.md](/lib/09-harness/claude-code-harness-chachamaru/docs-cross-project-safety)

### Orchestration Visibility (Phase 90)

| 機能 | 活用スキル / 領域 | 用途 | 付加価値 |
|------|-----------------|------|---------|
| Delegation Ledger | `orchestration-ledger.sh` + `codex/cursor-companion.sh` | 委譲ごとに backend / counts 等 8 項目を `orchestration-ledger.jsonl` へ記録（prompt/秘密なし、status は計上除外） | A: 実装あり (Phase 90.1.1) |
| Lifetime Accumulator | `orchestration-rollup.sh` + `go/internal/orchestration` | 完了時 + SessionEnd の 2 経路で累計へ冪等 roll up（`orchestration-totals.json`、record-only） | A: 実装あり (Phase 90.1.2) |
| Scorecard Aggregator | `orchestration-scorecard.sh` | session mix + lifetime をマージし tri-state (used/available/not-configured) で集計。claude=ホスト | A: 実装あり (Phase 90.1.3) |
| HTML Scorecard | `templates/html/orchestration.html.template` + `render-html.sh` | 累計主役の共有可能 1 枚 HTML（JS 不要 standalone） | A: 実装あり (Phase 90.1.4) |
| Completion Summary + Skill | `harness-orchestration` + `task_completed.go` | 全完了時に 1 回ターミナルサマリ（Go all-done）+ on-demand HTML スキル | A: 実装あり (Phase 90.1.5) |

**ユーザー体験の改善**:
- 今まで: 委譲は実行時に不可視で「本当に Codex/Cursor を使ったか、全部 Claude に落ちたか」が分からなかった
- 今後: 記録 → 累計 → スコアカードで「このセッション/プロジェクトでどれだけオーケストレーションを活用したか」を見せられる（累計が主役の数字）
