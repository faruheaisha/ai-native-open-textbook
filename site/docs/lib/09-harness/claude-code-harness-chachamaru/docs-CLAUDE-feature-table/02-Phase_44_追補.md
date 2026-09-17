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
pageSha256: "c8f4a65663996cb14b6cdd653259a3b910dc3c2a89e2dbde950bd35e0659d61f"
contentMode: "local-full"
zh: ""
---

## Phase 44 追補テーブル

この追補セクションでは、`2.1.99-2.1.111` と Opus 4.7 だけをまとめて見られるようにしています。

| 機能 | 活用スキル / 領域 | 用途 | 付加価値 |
|------|-------------------|------|----------|
| **公開 changelog なしの版 (`2.1.99`, `2.1.100`, `2.1.102`, `2.1.103`, `2.1.104`, `2.1.106`)** | all skills | 明示追従項目なし。ベースライン確認のみ | `C: CC 自動継承` |
| **`/team-onboarding` と `2.1.101` 系の安定化** | setup, session | onboarding / resume UX 向上 | `C: CC 自動継承` |
| **`PreCompact` hook (v2.1.105)** | hooks, breezing | 長時間 Worker 実行中の compaction を block する設計の土台 | `A: 明示追従対象` |
| **plugin `monitors` manifest (v2.1.105)** | hooks, setup, breezing | monitor を session start / skill invoke で auto-arm する | `A: 明示追従対象` |
| **thinking hint 改善 (v2.1.107, v2.1.109)** | all skills | 長考中の UI ヒント改善 | `C: CC 自動継承` |
| **`ENABLE_PROMPT_CACHING_1H` (v2.1.108)** | session, work, breezing | 1 時間 prompt cache TTL を opt-in で運用可能にする | `A: 明示追従対象` |
| **recap / built-in slash command discovery (v2.1.108)** | session, all skills | 再開品質と slash command 利用の向上 | `C: CC 自動継承` |
| **permission deny 再評価 fix (v2.1.110)** | hooks, guardrails | `updatedInput` と mode 更新後も deny を再評価する前提を docs とテスト観点に反映 | `A: 明示追従対象` |
| **`/tui`, focus, recap まわりの UX 改善 (v2.1.110)** | session | 画面表示と remote client 体験の改善 | `C: CC 自動継承` |
| **`xhigh` effort (v2.1.111)** | harness-review, advisor, docs | `high` と `max` の中間強度を正式対象として採用する | `A: 明示追従対象` |
| **`/ultrareview` (v2.1.111)** | harness-review, docs | cloud 多エージェント review と `/harness-review` の役割を整理する | `A: 明示追従対象` |
| **Auto mode no longer requires `--enable-auto-mode` (v2.1.111)** | docs, guardrails | Auto Mode の前提文言を古い enable flag 依存から更新する | `A: 明示追従対象` |
| **`/effort` slider と model picker 連携 (v2.1.111)** | harness-review, docs | effort を会話中に調整しやすくする | `A: 明示追従対象` |
| **read-only bash permission prompt 緩和 (v2.1.111)** | guardrails, docs | 安全な read-only コマンドの prompt 発火が減る前提を更新 | `C: CC 自動継承` |

### Opus 4.7 セクション

| 機能 | 活用スキル / 領域 | 用途 | 付加価値 |
|------|-------------------|------|----------|
| **literal instruction following** | agents, skills, docs | 曖昧表現を減らし、指示と停止条件を具体化する | `A: 明示追従対象` |
| **`xhigh` effort** | harness-review, advisor, docs | 重い review / advisory だけ thinking を一段引き上げる | `A: 明示追従対象` |
| **task budgets** | docs, future work | 既存 `max_consults` / cost 制御との競合を先に整理する | `A: 明示追従対象` |
| **tokenizer 改善** | all skills | token 効率改善の恩恵を受ける | `C: CC 自動継承` |
| **vision 2576px** | harness-review, docs | 高解像度レビューの運用上限を更新する | `A: 明示追従対象` |
| **memory 改善** | session-memory, docs | 長時間実行と resume の説明を新前提に合わせる | `A: 明示追従対象` |
| **`/ultrareview`** | harness-review, docs | `/harness-review` との役割分担を明文化する | `A: 明示追従対象` |
| **Auto Mode 拡大** | docs, guardrails | enable flag 前提を落とし、常設機能として扱う | `A: 明示追従対象` |

| **`context: fork` host CLAUDE.md 継承仕様と auto-start 回避パターン (Phase 46)** | harness-review | `context: fork` スキルは isolated context で動作し、host CLAUDE.md の session-start rules に override されて停止する事象を解消。host CLAUDE.md 継承仕様と auto-start 回避パターンを `skill-editing.md` に明文化（Issue #84）。A: 実装あり（SKILL.md Step 0 硬化 + `REVIEW_AUTOSTART` marker 契約） | `A: 実装あり` |

**注記**:
この追補では `A` / `C` / `P` を使い、`B` は `0` 件です。
`A` は「Harness 側で明示追従する責務がある項目」、`C` は「Claude Code / Codex 本体の更新をそのまま継承する項目」、`P` は「今回直接実装せず Plans 化する項目」を意味します。
