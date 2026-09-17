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
pageSha256: "89ece3c259f7d0e00a0c0d457a56a5210ebdbd45fcbaa995fce5fc0b45c9503e"
contentMode: "local-full"
zh: ""
---

## Opus 4.7 詳細セクション（Phase 44.11.1）

> このセクションでは Opus 4.7 固有機能の Harness への統合状況を詳述する。
> 付加価値分類: A = 実装あり、C = CC 自動継承。B 分類は 0 件。

### 1. Literal Instruction Following

**付加価値**: `A: 実装あり`（`.claude/rules/opus-4-7-prompt-audit.md`、Phase 44.4.1 + 44.4.2 で実装済み）

Opus 4.7 は「指示を文字通り実行する」能力が大幅に向上した。曖昧な表現を補完して意図を推測するのではなく、指示された内容だけを実行する。

**Harness での活用**:
- `.claude/rules/opus-4-7-prompt-audit.md` を新設。エージェントプロンプトの品質基準を定義
  - 行動指示には実行コマンド名 / ファイルパス / JSON schema 名 / 数値閾値のいずれかを必須化
  - 回数制御は `最大 3 回` のように数字で記述
  - `必要に応じて` / `適宜` 等の曖昧語には直後に条件補足を必須化
- `agents/worker.md`, `agents/reviewer.md`, `agents/advisor.md` のプロンプトを監査基準に適合

**ユーザー体験の改善**:
- 今まで: エージェントプロンプトの曖昧表現がモデルの誤解釈を招き、意図しない動作が発生した
- 今後: 監査基準に合格したプロンプトはモデルが文字通りに解釈し、一貫した動作が保証される

### 2. xhigh Effort

**付加価値**: `A: 実装あり`（`agents/reviewer.md`, `agents/advisor.md`, `docs/effort-level-policy.md`、Phase 44.5.1 で実装済み）

Opus 4.7 では `xhigh` effort レベルが追加された（CC v2.1.111 frontmatter として受け付け可能）。
`high` より thinking 強度が高く、複雑なレビューや設計判断に適する。

**Harness での活用**:
- `agents/reviewer.md`: `effort: medium` → `effort: xhigh` に変更（レビューの深度向上）
- `agents/advisor.md`: `effort: high` → `effort: xhigh` に変更（判断の正確性向上）
- `docs/effort-level-policy.md`: CC frontmatter effort と Anthropic API effort の対応マトリクスを整備
- `harness-work` スキルの多要素スコアリングで `ultrathink` を Worker に注入する仕組みは維持

**ユーザー体験の改善**:
- 今まで: Reviewer は medium effort で動作し、複雑なアーキテクチャ変更のレビューが浅くなるケースがあった
- 今後: xhigh effort で Reviewer の thinking 品質が向上し、critical/major 指摘の検出率が上がる

### 3. Task Budgets（採用見送り）

**付加価値**: `C: 採用見送り`（`docs/task-budgets-research.md`、Phase 44.10.1 で調査済み）

Anthropic Task Budgets (public beta) はタスク単位でトークン・ツール呼び出し数を制限する機能。

**Harness での活用**:
- `docs/task-budgets-research.md` に仕様要約・Harness 既存機構との競合関係分析を記録
- 既存の `maxTurns` (Worker: 100, Reviewer: 50) および `MAX_REVIEWS` と機能が重複するため本 Phase では採用見送り
- GA 昇格時の再評価トリガー条件（Harness 独自制御との統合設計が確定した時点）を明記

**採用見送り理由**:
- Harness は既に `maxTurns` と `MAX_REVIEWS` で Worker の実行制限を管理
- Task Budgets との二重管理は設定の複雑性を増やすリスクがある
- Public beta 段階での採用より GA 後の安定 API を待つ判断

### 4. Tokenizer 改善

**付加価値**: `C: CC 自動継承`（Harness 側変更不要）

Opus 4.7 の新 tokenizer により、同一プロンプトのトークン数が削減される。特に日本語・コード混在コンテンツで効果が大きい。

**Harness への影響**:
- CLAUDE.md、スキルファイル、エージェントプロンプトのトークン消費が自動的に削減
- スキルバジェット（コンテキスト窓の 2%）の実効文字数が増加
- Harness 側の変更は不要。モデル更新で自動的に恩恵を受ける

### 5. Vision 2576px 対応

**付加価値**: `A: 実装あり`（`docs/opus-4-7-vision-usage.md`, `skills/harness-review/references/vision-high-res-flow.md`、Phase 44.9.1 で実装済み）

Opus 4.7 では画像の短辺上限が 2576px まで拡大された。PDF・設計図・UI スクリーンショットのレビュー品質が向上。

**Harness での活用**:
- `docs/opus-4-7-vision-usage.md`: 高解像度レビューの運用ガイドを新設（3 種のシナリオ: PDF レビュー / 設計図解析 / UI スクリーンショット）
- `skills/harness-review/references/vision-high-res-flow.md`: 2576px 上限の運用フロー（リサイズ判定・多ページ PDF の分割戦略）を整備
- `/harness-review` で画像添付時の自動上限チェックを組み込み

**ユーザー体験の改善**:
- 今まで: 高解像度スクリーンショットは自動リサイズで品質が低下し、細部の UI 問題を見落とすケースがあった
- 今後: 2576px まで原寸でレビュー可能。UI のピクセルレベルの問題や設計図の微細なラベルも検出できる

### 6. Memory 機能拡張

**付加価値**: `C: CC 自動継承`（auto-memory システムが既存。Harness 側変更不要）

Opus 4.7 の Memory 機能拡張（自動メモリ記録の精度向上・長期記憶の圧縮品質改善）は Harness の既存 Agent Memory 基盤と自動的に統合される。

**Harness での活用**:
- `memory: project` frontmatter によるエージェント固有メモリは引き続き機能
- CC の自動メモリ精度向上により、Worker / Reviewer / Scaffolder の学習品質が自動的に向上
- `.claude/agent-memory/` の既存エントリとの互換性は維持

### 7. /ultrareview（並立維持方針）

**付加価値**: `A: 実装あり`（`docs/ultrareview-policy.md`, `skills/harness-review/SKILL.md`、Phase 44.8.1 で実装済み）

CC v2.1.111 で `/ultrareview` が built-in operator entrypoint として追加された。cloud 多エージェントレビューを実行する。

**Harness での活用（方針 B: 並立維持）**:
- `docs/ultrareview-policy.md`: `/ultrareview` は ad-hoc レビューに限定、Harness automation flow には組み込まない方針を確立
- Harness の review automation は `review-result.v1` 契約ベースの `codex-companion.sh review`（優先）+ reviewer agent（フォールバック）を維持
- `skills/harness-review/SKILL.md` に役割分担セクションを追加

**ユーザー体験の改善**:
- 今まで: `/ultrareview` の登場で Harness の `/harness-review` との役割が曖昧になっていた
- 今後: `/ultrareview` = 人間の ad-hoc レビュー向け / `/harness-review` = 自動化フロー向け と明確に分離

### 8. Auto Mode 拡大

**付加価値**: `C: opt-in 扱い`（`skills/breezing/SKILL.md` の `--auto-mode` フラグ説明）

CC v2.1.111 で Auto Mode が `--enable-auto-mode` フラグなしでも利用可能になった。

**Harness での活用**:
- `skills/breezing/SKILL.md` の `--auto-mode` オプションは「Harness 側の Auto Mode rollout を明示」する opt-in フラグとして説明を維持
- CC 本体での Auto Mode 拡大は自動的に継承されるが、Harness の `bypassPermissions` ベースの実装と混在しないよう注意
- operator entrypoint としての `--auto-mode` は呼び出し側が選ぶ設計を維持。agent 定義側に `autoMode` 値は書かない

**ユーザー体験の改善**:
- 今まで: Auto Mode には `--enable-auto-mode` フラグが必要で、Breezing との組み合わせが複雑だった
- 今後: CC 本体で Auto Mode が常設化されたが、Harness では `--auto-mode` を明示 opt-in として扱い続けることで予測可能な挙動を維持
