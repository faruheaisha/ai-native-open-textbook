---
title: "Optional Briefs and Skill Manifest"
sourceId: "09-harness/claude-code-harness-chachamaru"
sourceTitle: "Claude Code Harness"
sourceKind: "工程手册"
licenseLabel: "可转载"
lang: "中英混排"
tier: 3
volume: "09-harness"
sourceUrl: "https://github.com/Chachamaru127/claude-code-harness"
entryUrl: "https://github.com/Chachamaru127/claude-code-harness/blob/2b2b74805321089bd9b660a1064fa97556299703/docs/plans/briefs-manifest.md"
sourceRel: "docs/plans/briefs-manifest.md"
rawUrl: "/raw/09-harness/claude-code-harness-chachamaru/docs/plans/briefs-manifest.md"
sourceSha256: "7a60c8d757bd7e1d404fdfc7c3ac86a48cbe358dd0173f0ed46ac19bb9679162"
pageSha256: "7a60c8d757bd7e1d404fdfc7c3ac86a48cbe358dd0173f0ed46ac19bb9679162"
contentMode: "local-full"
zh: ""
---

# Optional Briefs and Skill Manifest

`harness-plan create` は、必要なときだけ brief を付ける。brief は Plans.md を置き換えず、実装の前提を短く固定する補助資料。

project spec SSOT は brief より上位の正本として扱う。brief は画面や API など個別タスクの短い前提を固定し、spec SSOT は project 全体の正解条件を固定する。

詳細: `docs/plans/spec-ssot.md`

## Design Brief

UI を含むタスクでは `design brief` を作る。

最低限入れる内容:

- 何を達成したいか
- 誰が使うか
- 重要な画面状態
- 見た目や操作感の制約
- 完了条件

## Contract Brief

API を含むタスクでは `contract brief` を作る。

最低限入れる内容:

- 何を受け取るか / 返すか
- 入力検証の条件
- 失敗時の振る舞い
- 外部依存
- 完了条件

## Skill Manifest

`scripts/generate-skill-manifest.sh` は、repo 内の `SKILL.md` frontmatter を stable JSON にする。

使いどころ:

- skill surface の監査
- mirror 間の比較
- 自動 docs 生成の入力

出力には次を含める。

- `name`
- `description`
- `do_not_use_for`
- `allowed_tools`
- `argument_hint`
- `effort`
- `user_invocable`
- `surface`
- `related_surfaces`

`related_surfaces` には `skills`, `codex/.codex/skills`, `opencode/skills` のような mirror 情報も含まれる。

## 実行例

```bash
scripts/generate-skill-manifest.sh --output .claude/state/skill-manifest.json
```
