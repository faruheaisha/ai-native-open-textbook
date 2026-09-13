---
title: "Agent View (claude agents) Policy"
sourceId: "09-harness/claude-code-harness-chachamaru"
sourceTitle: "Claude Code Harness"
sourceKind: "工程手册"
licenseLabel: "可转载"
lang: "中英混排"
tier: 3
volume: "09-harness"
sourceUrl: "https://github.com/Chachamaru127/claude-code-harness"
entryUrl: "https://github.com/Chachamaru127/claude-code-harness/blob/2b2b74805321089bd9b660a1064fa97556299703/README.md"
zh: ""
---

# Agent View (`claude agents`) Policy

CC `2.1.139`+ で `claude agents` (agent view, Research Preview) が単一 entrypoint として導入され、
`2.1.141` で `--cwd <path>` flag、`2.1.142` で `--add-dir` / `--settings` / `--mcp-config` /
`--plugin-dir` / `--permission-mode` / `--model` / `--effort` / `--dangerously-skip-permissions`
flag が追加された。

Harness はこれを **Lead (operator) が複数の Worker / Reviewer / Scaffolder 系 session を一覧監視する
独立 entrypoint** として扱い、Harness 内部の teammate spawn workflow とは分離する。

## 適用範囲

| 対象 | 利用方法 |
|------|----------|
| Lead (operator, 人間) | `claude agents` で複数 project の状態を 1 画面で確認 |
| Harness teammate spawn (Worker / Reviewer / Scaffolder) | `claude agents` ではなく Agent tool / breezing skill 経由 |
| Codex teammate | `bash scripts/codex-companion.sh task` (raw `codex exec` も `claude agents` も使わない) |

## 動作前提 (2.1.139-2.1.142)

- `claude agents --json` で live session 一覧を JSON 出力できる (2.1.145)。tmux-resurrect、status bar、session picker 等の **diagnostic / scripting** 用途に限定する。Harness teammate spawn の代替にしない。
- agent view は session ごとに **running / blocked on you / done** を表示する。
- `claude agents --cwd <path>` で session list を directory scope できる (2.1.141)。
- `claude agents` 起動時に `--add-dir`, `--settings`, `--mcp-config`, `--plugin-dir`,
  `--permission-mode`, `--model`, `--effort`, `--dangerously-skip-permissions` で dispatched
  background session を構成できる (2.1.142)。
- Background session で起動した teammate は permission mode を保持する (2.1.141)。default に戻らない。

## Harness 安全運用ポリシー

### A. 利用許可

| 利用ケース | 推奨 |
|-----------|------|
