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
pageSha256: "189724aee0f9b90496a96797cb72d254a0b265943477c6dd4c4d32b0834d5fdd"
contentMode: "local-full"
zh: ""
---

## Phase 69 追補テーブル (Claude Code 2.1.133-2.1.142)

この追補セクションでは、Claude Code `2.1.133-2.1.142` の 10 バージョン分を Harness の実装/自動継承/保留にどう分類したかを記載します。一次情報と version-by-version の判断根拠は `docs/upstream-update-snapshot-2026-05-15.md` を参照してください。

| 機能 | 活用スキル / 領域 | 用途 | 付加価値 |
|------|-------------------|------|----------|
| **Claude Code `worktree.baseRef` (2.1.133)** | settings, breezing, worker isolation | `--worktree` / `EnterWorktree` / agent-isolation worktree の起点を `origin/<default>` (`fresh`) or local `HEAD` (`head`) で明示する | `A: 実装あり` (`templates/claude/settings.security.json.template`)。Phase 69.1.1 で template に baseline `fresh` を明示し、unpushed commits を持ち込みたい team は project-level で `head` を opt-in できる。Plugin 本体 `.claude-plugin/settings.json` は self-write deny のため release operator が手動マージ |
| **Claude Code hook `$CLAUDE_EFFORT` env + `effort.level` JSON (2.1.133)** | hooks, observability | hook handler / Bash subprocess から現在の effort を観測できる | `A: 実装あり` (`.claude/rules/hooks-2.1.139-plus.md`)。Phase 69.1.2 で「観測のみ可、guard rail の effort 緩和は禁止」を明文化 |
| **Claude Code `settings.autoMode.hard_deny` (2.1.136)** | settings, guardrails, auto mode | Auto Mode classifier が「許可意図に関わらず必ず deny」を扱える | `A: 実装あり` (`templates/claude/settings.security.json.template`)。Phase 69.1.3 で template baseline 7 件 (`Bash(sudo:*)` / `Bash(rm -rf:*)` / `Bash(rm -fr:*)` / `Bash(git push -f:*)` / `Bash(git push --force:*)` / `Bash(git reset --hard:*)` / `mcp__codex__*`) を Harness deny と整合。Plugin 本体 `.claude-plugin/settings.json` は self-write deny のため release operator が手動マージ |
| **Claude Code `claude agents` agent view (2.1.139-2.1.142)** | agents, breezing, operator workflow | 全 CC session を 1 画面で監視できる operator entrypoint。`--cwd`, `--add-dir`, `--settings`, `--mcp-config`, `--plugin-dir`, `--permission-mode`, `--model`, `--effort`, `--dangerously-skip-permissions` の 9 flag が dispatched background session を構成する | `A: 実装あり` (`docs/agent-view-policy.md`, `docs/team-composition.md`, `agents/worker.md`)。Phase 69.2.2 で teammate spawn workflow (breezing skill) との分離と各 flag 利用条件を明文化 |
| **Claude Code native `/goal` command (2.1.139)** | harness-plan, harness-work, Codex `/goal` 補完 | 完了条件を turn 超えで保持できる | `A: 実装あり` (`docs/codex-plugin-workflows-policy.md`)。Phase 69.2.1 で「session continuation memo 限定」「Plans.md SSOT を奪わない」「acceptance criteria を `/goal` だけに置かない」3 規則を Codex `/goal` と統合 |
| **Claude Code `claude plugin details <name>` (2.1.139)** | plugin observability, CI 補助 | plugin の component 内訳と projected per-session token cost が見える | `A: 実装あり` (`docs/agent-view-policy.md`, `docs/upstream-update-snapshot-2026-05-15.md`)。Phase 69.2.4 で CI / doctor の補助情報として位置付け、plugin が session 予算閾値を越えた時の対応 step を docs 化 |
| **Claude Code hook `args: string[]` (exec form, 2.1.139)** | hooks, security, future-proof | shell を介さず command を直接 spawn できる | `A: 実装あり` (`.claude/rules/hooks-2.1.139-plus.md`)。Phase 69.1.4 で「path placeholder のみは exec form 優先、shell 制御が必要な場合は既存 `command` を維持」を rules 化 |
| **Claude Code hook `PostToolUse.continueOnBlock` (2.1.139)** | hooks, guardrails | hook の rejection reason を Claude に feedback し turn 継続できる | `A: 実装あり` (`.claude/rules/hooks-2.1.139-plus.md`)。Phase 69.1.4 で「diagnostic feedback のみ true、R01-R13 / secret / protected config では `false` 必須」を rule 化 |
| **Claude Code hook `terminalSequence` (2.1.141)** | hooks, local notification | controlling terminal なしで desktop 通知 / window title / bell を発火 | `A: 実装あり` (`scripts/lib/terminal-notify.sh`, `scripts/hook-handlers/webhook-notify.sh`, `scripts/hook-handlers/notification-handler.sh`)。Phase 69.1.5 で `HARNESS_TERMINAL_NOTIFY` (`0` / `bell` / `title` / `osc9` / `notify`) opt-in 実装。既存 `HARNESS_WEBHOOK_URL` と独立 |
| **Claude Code background permission mode 保持 (2.1.141)** | agents, breezing | `/bg` / `←←` / `claude agents` で起動した teammate が起動時 mode を保持する | `A: 実装あり` (`agents/worker.md`, `docs/team-composition.md`)。Phase 69.2.3 で「Worker は permission mode 再注入不要、`bypassPermissions` でも settings.json deny は override しない」期待値を明文化 |
| **Claude Code hook config error (SessionStart/Setup/SubagentStart は command-only, 2.1.142)** | hooks, validation | bootstrap 段階の hook で LLM 型 hook が拒絶される | `A: 実装あり` (`.claude/rules/hooks-2.1.139-plus.md`)。Phase 69.1.4 と同 rule 内で「SessionStart/Setup/SubagentStart は `type: "command"` 限定」を grep-able に明示 |
| **CC 2.1.142 fast mode Opus 4.7 default + `CLAUDE_CODE_OPUS_4_6_FAST_MODE_OVERRIDE`** | model defaults | fast mode が常に Opus 4.7 で動く | `C: CC 自動継承`。Harness は既に Opus 4.7 を default として扱うため変更不要 |
| **CC 2.1.139 MCP stdio receives `CLAUDE_PROJECT_DIR`** | MCP setup | MCP server が project dir を解決できる | `C: CC 自動継承` |
| **CC 2.1.139 `x-claude-code-agent-id` / `parent-agent-id` headers + OTEL attrs** | OTel | subagent 監視性が上がる | `C: CC 自動継承` |
| **CC 2.1.141 `claude agents --cwd`** | operator UX | session list を directory scope できる | `A: 実装あり` (`docs/agent-view-policy.md`)。Phase 69.2.2 で project ごとの分離運用を docs 化 |
| **CC 2.1.141 Rewind "Summarize up to here"** | session | context compression 中間状態保持 | `C: CC 自動継承`。`.claude/rules/commit-safety.md` の `/undo` policy と整合 |
| **CC 2.1.133/2.1.136-2.1.142 runtime bug fixes (parallel session credential race / MCP `/clear` persistence / OAuth refresh / extended thinking redaction / `--resume` underscore / WSL2 image paste / agent color palette / settings hot-reload symlink / spinner amber / 多数の plugin/MCP/UX 修正)** | runtime | safety / stability | `C: CC 自動継承`。Harness 側に wrapper を追加しない |

**注記**:
Phase 69 でも `B: 書いただけ` は `0` 件です。Feature Table は入口に留め、公式 URL と version-by-version の判断根拠は `docs/upstream-update-snapshot-2026-05-15.md` に集約しました。`A` は実 file 変更 (settings / hooks / rules / docs / scripts) と紐付き、`C` は本体修正の自動継承、`P` は推測実装しない将来判断として扱います。
