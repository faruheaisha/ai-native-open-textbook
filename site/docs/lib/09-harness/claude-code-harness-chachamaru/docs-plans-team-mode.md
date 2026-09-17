---
title: "Team Mode and Issue Bridge"
sourceId: "09-harness/claude-code-harness-chachamaru"
sourceTitle: "Claude Code Harness"
sourceKind: "工程手册"
licenseLabel: "可转载"
lang: "中英混排"
tier: 3
volume: "09-harness"
sourceUrl: "https://github.com/Chachamaru127/claude-code-harness"
entryUrl: "https://github.com/Chachamaru127/claude-code-harness/blob/2b2b74805321089bd9b660a1064fa97556299703/docs/plans/team-mode.md"
sourceRel: "docs/plans/team-mode.md"
rawUrl: "/raw/09-harness/claude-code-harness-chachamaru/docs/plans/team-mode.md"
sourceSha256: "d38ea2339f12bc50e1faff8313c764146995681527942d6e1831ff1e6b640de0"
pageSha256: "d38ea2339f12bc50e1faff8313c764146995681527942d6e1831ff1e6b640de0"
contentMode: "local-full"
zh: ""
---

# Team Mode and Issue Bridge

`Plans.md` は正本のまま維持し、GitHub Issue 連携は opt-in の team mode だけで使う。

## 使い分け

- solo 開発では issue bridge を使わない
- team mode では tracking issue を 1 つ作り、その配下に task ごとの sub-issue payload を dry-run で生成する
- issue bridge は Plans.md を更新しない
- dry-run だけで完結し、GitHub への実更新はしない

## 変換ルール

`scripts/plans-issue-bridge.sh` は Plans.md の各 task を次の形に展開する。

- tracking issue
  - まとめ用の親 issue
  - phase の一覧と task の一覧を body に入れる
- sub-issue
  - task ごとの個別 payload
  - `task id`, `DoD`, `Depends`, `Status` を body に残す

## 実行例

```bash
scripts/plans-issue-bridge.sh --team-mode --plans Plans.md
```

`--format markdown` を指定すると、人が読みやすい dry-run に切り替えられる。

## 何がうれしいか

- Plans.md をそのまま正本に保てる
- チーム作業だけ issue ベースの見通しを作れる
- solo 開発では余計な重さを増やさない
