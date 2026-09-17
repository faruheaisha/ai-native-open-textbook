---
title: "Plans.md Archive Pattern"
sourceId: "09-harness/claude-code-harness-chachamaru"
sourceTitle: "Claude Code Harness"
sourceKind: "工程手册"
licenseLabel: "可转载"
lang: "中英混排"
tier: 3
volume: "09-harness"
sourceUrl: "https://github.com/Chachamaru127/claude-code-harness"
entryUrl: "https://github.com/Chachamaru127/claude-code-harness/blob/2b2b74805321089bd9b660a1064fa97556299703/docs/plans-archive-pattern.md"
sourceRel: "docs/plans-archive-pattern.md"
rawUrl: "/raw/09-harness/claude-code-harness-chachamaru/docs/plans-archive-pattern.md"
sourceSha256: "d485ff70e7668b8ae17ee3e102e31280466ea7fdd30749b6da6b1b166d09a5a2"
pageSha256: "d485ff70e7668b8ae17ee3e102e31280466ea7fdd30749b6da6b1b166d09a5a2"
contentMode: "local-full"
zh: ""
---

# Plans.md Archive Pattern

Plans.md (project root) の完了 Phase を `.claude/memory/archive/Plans-*.md` へ切り出す archive 運用パターンと、test 整合性を維持する仕組みの SSOT。Phase 64 (v4.8.0 のあと) で導入された。

## なぜこのパターンが必要か

Plans.md は project の作業計画書として、完了 Phase が積み上がると行数が肥大化する。
auto-cleanup hook は 200 行超で archive を促すが、過去の archive 試行で 2 つの問題が判明した:

1. **test 非互換**: `tests/test-claude-upstream-integration.sh` が Phase 51-58 系の詳細タスク行を Plans.md 内に永続要求 (10 箇所超のハードコード grep) しており、archive すると test が失敗する
2. **archive ファイルの commit 漏れ**: `.claude/memory/archive/` は gitignore 配下で、Plans.md の archive list link は GitHub 上では dead link だった

このパターンは、両方を一括解決して archive 機能を機能させるためのもの。

## アーカイブ命名規則

```
.claude/memory/archive/Plans-YYYY-MM-DD-phaseNN-MM.md
```

- `YYYY-MM-DD`: archive 実施日
- `phaseNN-MM`: 切り出した Phase 範囲 (例: `phase47-61`)

例: `Plans-2026-05-08-phase47-61.md`

## アーカイブファイルの形式

```markdown
# Plans Archive — Phase 47 / 48 / ... / 61

Archived on YYYY-MM-DD from Plans.md (lines XX-YY).

- Phase 47: 短い説明
- Phase 48: 短い説明
- ...

---

## Phase 47: ...
[元の Plans.md からそのままコピー]
```

冒頭の archive メタ情報 (Archived on, line range, Phase summary list) は必須。各 Phase の中身は元の Plans.md からそのまま転記する。

## Plans.md 側の更新

archive 実行時、Plans.md の冒頭セクションを 3 点更新する:

1. **最終アーカイブ / 前回アーカイブ**: 日付と link を 1 段階繰り上げる

   ```markdown
   最終アーカイブ: 2026-05-08（Phase 47-61 → `.claude/memory/archive/Plans-2026-05-08-phase47-61.md`）
   前回アーカイブ: 2026-04-19（Phase 44 + 45 + 46 → `.claude/memory/archive/Plans-2026-04-19-phase44-46.md`）
   ```

2. **`## 📦 アーカイブ` セクションの archive list 先頭に新エントリ追加**: archive ファイルへの link + 1 行サマリ

3. **archive 範囲の Phase 全削除**: 該当 line range をファイルから削除

## test 整合性: grep_plans_or_archive helper

Phase 64.1.1 で導入された helper。`tests/lib/grep_plans_or_archive.sh` に library として配置し、`tests/test-claude-upstream-integration.sh` がこれを source する。

```bash
grep_plans_or_archive 'PATTERN' || {
  echo "Plans.md (or archive) is missing the expected PATTERN reference"
  exit 1
}
```

### 動作仕様 (4 状態)

| 状況 | helper return code | 意味 |
|------|--------------------|------|
| Plans.md だけに pattern が一致 | `0` (success) | archive 前の通常状態 |
| archive にだけ pattern が一致 | `0` (success) | archive 後の状態。Plans.md からは消えたが archive に残存 |
| 両方に一致 | `0` (success) | 移行期の混在状態 |
| どちらにもない | `1` (failure) | 真に消失。test が exit 1 で失敗報告 |

`tests/test-grep-plans-or-archive.sh` がこの 4 状態を unit test で固定する。

### test override (unit test 用)

helper は環境変数で対象パスを上書き可能:

```bash
export GPOA_PLANS_FILE="${TMPDIR}/Plans.md"
export GPOA_ARCHIVE_DIR="${TMPDIR}/archive"
```

production code (= test-claude-upstream-integration.sh) では override せず、ROOT_DIR から自動解決する。

## git track 設定 (.gitignore exception)

archive を CI でも見られるよう、`.claude/memory/` は条件付きで track する:

```gitignore
.claude/*
!.claude/rules/
!.claude/output-styles/
!.claude/memory/
.claude/memory/*
!.claude/memory/archive/
.claude/memory/archive/*
!.claude/memory/archive/Plans-*.md
```

この exception により:

- ✅ `Plans-2026-05-08-phase47-61.md` のような Plans archive は track される
- ❌ session-log や codex-learnings 等の他 archive は引き続き ignored
- ❌ `.claude/state/` 等は引き続き ignored

## 標準手順 (operator checklist)

### 前提
- Plans.md が 200 行超 で auto-cleanup hook が archive を促している
- 切り出す Phase 範囲が明確 (例: 7 日以上前に完了した連続する Phase 群)
- `tests/lib/grep_plans_or_archive.sh` が repo に存在 (Phase 64.1.1 以降)

### 実行
1. `cp Plans.md Plans.md.bak.$(date +%s)` でバックアップ
2. archive ファイルを `.claude/memory/archive/Plans-YYYY-MM-DD-phaseNN-MM.md` に作成 (上記形式)
3. Plans.md から該当 Phase 範囲を削除
4. Plans.md header の archive list を更新
5. `bash tests/test-claude-upstream-integration.sh` で archive-aware grep の動作確認
6. `./tests/validate-plugin.sh` で 48/48 PASS 確認
7. `bash scripts/ci/check-consistency.sh` で全合格確認
8. `bash scripts/check-residue.sh` で 0 件確認
9. backup 削除 (`rm Plans.md.bak.*`)
10. `git add Plans.md .claude/memory/archive/Plans-YYYY-MM-DD-*.md` で stage
11. commit + push

### retroactive validation (`.claude/rules/migration-policy.md` ルール 4 準拠)

archive 直前の commit と archive 後 HEAD の双方で test が PASS することを確認:

```bash
# 現 HEAD で test
bash tests/test-claude-upstream-integration.sh

# archive 直前 commit で test
git stash push -u
