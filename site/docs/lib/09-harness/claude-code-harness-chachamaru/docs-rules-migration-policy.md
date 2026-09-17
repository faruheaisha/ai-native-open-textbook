---
title: "Migration Residue Policy"
sourceId: "09-harness/claude-code-harness-chachamaru"
sourceTitle: "Claude Code Harness"
sourceKind: "工程手册"
licenseLabel: "可转载"
lang: "中英混排"
tier: 3
volume: "09-harness"
sourceUrl: "https://github.com/Chachamaru127/claude-code-harness"
entryUrl: "https://github.com/Chachamaru127/claude-code-harness/blob/2b2b74805321089bd9b660a1064fa97556299703/docs/rules/migration-policy.md"
sourceRel: "docs/rules/migration-policy.md"
rawUrl: "/raw/09-harness/claude-code-harness-chachamaru/docs/rules/migration-policy.md"
sourceSha256: "6a9972140befee994dd95227ab83ead9855c18c853e78dec58f17235bea9bc68"
pageSha256: "6a9972140befee994dd95227ab83ead9855c18c853e78dec58f17235bea9bc68"
contentMode: "local-full"
zh: ""
---

# Migration Residue Policy

Harness の **exclusion-based verification（削除済み概念の残骸チェック）** を運用するためのポリシー。
Phase 40 (v4.1.0) で導入された `deleted-concepts.yaml` + `check-residue.sh` の
運用ルールを定義する。

## なぜこのルールが必要か

v4.0.0 "Hokage" リリース直後、TypeScript から Go への全面移行は「完了」のはずだった。
ところが、リリース後 2 日間で 13 件もの「旧時代の残骸」が次々と見つかった。
テストスクリプトの中に消えたはずのファイルパス、ドキュメントに残る旧バージョン名、
Node.js が必要と書かれた README — これらはいずれも個別のレビューや「X が含まれているか」という
確認では見つけられないものだった。

「大きな移行をした後、本当に古いものが残っていないか」を確かめるには、
「削除したものが残っていないか」という逆方向の確認（exclusion-based verification）が必要になる。
このルールを守れば、次回以降の major migration で同じ失敗は再発しない。

## 5 つのルール

### ルール 1: major version migration 時は必ず deleted-concepts.yaml を更新する

「X を削除する PR」と「X を deleted-concepts.yaml に追加する PR」は同時に
出す。遅延は禁止。

**なぜ**: 削除してから yaml 更新を後回しにすると、その間に別の PR で X への
参照が混入し、気づかないまま merge されてしまう。yaml 更新を削除 PR に
同梱することで「削除 = スキャン対象化」を不可分な 1 トランザクションにする。

### ルール 2: 更新タイミングは「削除 PR と同時」

ルール 1 の強い形。例: TypeScript guardrail engine を削除する PR を出すなら、
同じ PR で `deleted_concepts` に `"TypeScript guardrail engine"` を追加する。

「削除した」と「スキャン対象にした」は必ずセットで完了する。どちらか片方だけでは半分しか終わっていない。

### ルール 3: allowlist は 3 つの原則で運用する

deleted-concepts.yaml の `allowlist` フィールドには以下を含めてよい:

- **歴史記述**: CHANGELOG.md、`.claude/memory/archive/` は常に allowlist。
  「過去にこういうものがあった」と記録することは正当な言及であり、残骸ではない。
- **移行ガイド**: `docs/MIGRATION-*.md` のように旧 → 新の対比を書く文書。
  比較表の中で旧名称を挙げることは意図的な記述。
- **個別文脈**: ある特定の文書で旧概念への言及が**意図的に正当**な場合。
  例: `.claude/memory/archive/v3-architecture.md` は v3 アーキテクチャの歴史記録なので
  `"Harness v3"` を含んでいて当然。

allowlist は prefix match で適用される。エントリの**粒度は最小に保つ**こと。
`CHANGELOG.md` 全体を allowlist に入れるのは正当だが、
`docs/` ディレクトリ全体を入れるのは過剰であり、scanner を無意味化する。

### ルール 4: retroactive validation（過去コミットへの遡及検証）を必ず実施する

新しい deleted-concepts.yaml エントリを追加したら、**過去のコミットに遡って
scanner を走らせ、想定通りに残骸が検出されるか**を確認する:

```bash
