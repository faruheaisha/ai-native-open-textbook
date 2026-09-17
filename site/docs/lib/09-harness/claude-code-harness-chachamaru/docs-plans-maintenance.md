---
title: "Plans Maintenance"
sourceId: "09-harness/claude-code-harness-chachamaru"
sourceTitle: "Claude Code Harness"
sourceKind: "工程手册"
licenseLabel: "可转载"
lang: "中英混排"
tier: 3
volume: "09-harness"
sourceUrl: "https://github.com/Chachamaru127/claude-code-harness"
entryUrl: "https://github.com/Chachamaru127/claude-code-harness/blob/2b2b74805321089bd9b660a1064fa97556299703/docs/plans-maintenance.md"
sourceRel: "docs/plans-maintenance.md"
rawUrl: "/raw/09-harness/claude-code-harness-chachamaru/docs/plans-maintenance.md"
sourceSha256: "616ce2e8e1a0609f714f052c30784afdb8170ee3a4f2214d9100e635704c9cbe"
pageSha256: "616ce2e8e1a0609f714f052c30784afdb8170ee3a4f2214d9100e635704c9cbe"
contentMode: "local-full"
zh: ""
---

# Plans Maintenance

最終更新: 2026-03-06

`Plans.md` は正本ですが、長期間そのまま伸ばし続けると「過去の完了表現」と「現在の repo 状態」がずれやすくなります。
この文書は drift を減らすための最小運用ルールです。

## Lightweight Rule

1. 新しい大きな改善フェーズを始める前に、直近 1〜2 phase だけを active zone として扱う
2. それより古い完了フェーズは、必要なら `docs/plans-history/` などの履歴置き場へ退避する
3. 「削除」「移行完了」など current tree と衝突しやすい文言は、後続フェーズで状態が変わった時点で補正文を入れる
4. README / docs / `.gitignore` / build scripts の扱いを変えたときは、同じ commit で `Plans.md` の表現も直す

## When to Archive

次のどれかを満たしたら、古い完了フェーズのアーカイブを検討する。

- `Plans.md` の主要作業対象が 3 phase 以上前まで見に行かないと分からない
- 「削除済み」「統合済み」などの語が current repo と誤解を生む
- sync-status のたびに過去履歴の読み込みコストが気になる

## Recommended Shape

- `Plans.md`: 現在の active phase と、直近の完了 phase のみ
- `docs/plans-history/`: 過去 phase の固定スナップショット
- `docs/distribution-scope.md`: 残置物や配布境界の current truth

## Phase 21 Decision

- 今回は archive までは実施せず、まずは **誤解を生む完了表現の補正** を優先した
- 次の大きな phase 追加前に、Phase 17 以前の完了履歴を `docs/plans-history/` へ退避するのが推奨
