---
title: "Claude Code / Codex Feature Table（upstream snapshot 完全版）"
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

# Claude Code / Codex Feature Table（upstream snapshot 完全版）

> **概要**: Harness が活用・追跡する Claude Code / Codex の主要機能と upstream snapshot の一覧。
> CLAUDE.md の Feature Table の完全版（詳細説明付き）。

## 機能一覧

| 機能 | 活用スキル | 用途 |
|------|-----------|------|
| **Phase 89 セッション協調 (file lease + register + broadcast 復活)** | hooks, breezing, harness-work | `A: 実装あり`。同一 PC・同一 repo の複数 CC セッションで `.go`/`.md`/`.sh` 編集衝突を `continueOnBlock` 経由でモデルにフィードバック。`go/internal/hookhandler/session_lease.go` (`git --git-common-dir` 配下に sha256 hex 命名の lock + `os.Link` create-only + (TTL AND active.json) stale 判定 + 24h auto-prune + worktree shared store)、`session_register.go` (SessionStart/Stop で active.json 記名解除 + tri-state)、`file_lease_hook.go` (PreToolUse silent acquire + PostToolUse `permissionDecision:"deny"` + `continueOnBlock:true` + 8-char holder prefix + sanitized path)、`inbox_check.go` (structured fields only + 4096B cap + ANSI/NUL 除去 + `userprompt-inject-policy` disclaimer)、`session_auto_broadcast.go` (`.go`/`.md`/`.sh` extension match via `filepath.Ext` で 2026-02 死骸復活、`*<ext>` label で debug 可視化)。`hooks/hooks.json` + `.claude-plugin/hooks.json` dual-sync で PreToolUse/PostToolUse/SessionStart/Stop に配線。`continueOnBlock` は diagnostic feedback (R01-R13 guard rail でない、`hooks-2.1.139-plus.md` §3 整合)。Phase 120: `session_presence.go` が git-common-dir 親の `live-sessions/` presence (session-owned, 0600/0700, 24h prune) を追加し、lease staleness の生存判定を「共有 presence ∪ ローカル active.json」の worktree 横断 union に修正 (名簿 active.json と broadcast/inbox は従来どおり worktree ローカル)。harness-mem 非依存 = 同一 PC 限定、別 clone 間は非共有。Phase 121 (HOTL session messaging): livemsg directed message の配送路に信頼契約 (sanitize + 非命令 disclaimer + 4096B/768B cap)、人間送信 CLI `inbox send` / 既読可視化 `inbox sent`、Claude Stop 境界配線 (`hooks/hooks.json` dual-sync、未読 0 は silent)、生成 hook identity の runtime 解決 (`--from-env`、<code v-pre>{{TEAM}}</code> placeholder 撤去)、presence card `{label, task, since}` + `harness session declare/list` (task 番号→セッション逆引き、liveness は filename+mtime のまま)。 Phase 141 (セッション協調パイプライン): 名簿の寿命を修理し、`unregister` を Stop から SessionEnd へ移動 + Stop に `register` を追加 (Stop はターン境界であってセッション終了ではないため、従来は最初の 1 ターンで自分の presence を消していた)。refresh は mtime のみ更新し `session declare` の task/label を保持。`session_register_identity.go` が `CLAUDE_ENV_FILE` へ `export HARNESS_LIVEMSG_TEAM` / `..._AGENT` を **export 形式**で書き出す (素の `KEY=VALUE` は子プロセス env に届かない)。`deliveryidentity.Resolve()` の優先順位 (env → breezing) は不変で、env を埋める側だけを追加。`session_auto_broadcast.go` の broadcast を worktree ローカルから git-common-dir 親の共有 scope へ統一 (presence は共有なのに broadcast だけローカルで、姿は見えるのに通知が届かない不整合を解消)。`active.json` を `map[string]json.RawMessage` で読み書きし、自スキーマ以外のエントリを 24h prune から除外 (harness-mem 同居時の破壊を防止)。`skills/session-send/SKILL.md` がエージェント主導の送信口 (`harness inbox send`) を提供。`[livemsg] verification = "off"|"on"` (既定 off、`destructiveDelete` と同じ 5 段解決) と `templates/schemas/livemsg-gate.v1.json` + `agents/livemsg-gate.md` で検証の関所を opt-in 化。off の間は送信経路が gate を**呼ばない**ため検証コストがゼロ。`hosts.toml` に `[hermes]` を追加し delivery のみ配線 (5 ツール目)。配線検証は `scripts/ci/check-session-pipeline-wiring.sh` (7 点) が担当。 |
| **Phase 80 Claude Code 2.1.143-2.1.152 + Codex 0.131-0.134 upstream refresh** | upstream-update, hooks, skill-editing, setup, codex, harness-plan | `A: 実装あり / C: 自動継承 / P: Plans 化 / Reject: 未確認 claim (B: 0 件)`。`docs/upstream-update-snapshot-2026-05-27.md` + `docs/upstream-adoption-plan-2026-05-27.md` を Plans `80.1.1`-`80.1.6` に接続。Claude: `disallowed-tools`, `/reload-skills`, `SessionStart.reloadSkills`, `MessageDisplay` opt-in policy, `/code-review` rename, `claude agents --json`, Auto mode consent 廃止 (Harness default 維持)。Codex: `--profile` primary, curl/PowerShell installer docs, MCP environment/OAuth (defer), read-only MCP parallelism (inherit). |
| **Phase 69 Claude Code 2.1.133-2.1.142 後続活用** | upstream-update, hooks, guardrails, agents, harness-plan, harness-work | `A: 実装あり / C: 自動継承 / P: Plans 化 (B: 0 件)`。`docs/upstream-update-snapshot-2026-05-15.md` を Tier 1 5 件 (`worktree.baseRef` template 明示 / hooks `$CLAUDE_EFFORT` rule / `autoMode.hard_deny` baseline 7 件 / hook `args` exec form + `continueOnBlock` + SessionStart command-only rules / hook `terminalSequence` opt-in 実装) + Tier 2 5 件 (CC native `/goal` も Plans.md SSOT に従う policy / `claude agents` agent-view policy + 9 flag 利用条件 / background permission mode 保持の Worker 期待値 / `claude plugin details` の CI 補助情報化 / Phase 69 rule SSOT) に分解。`.claude/rules/hooks-2.1.139-plus.md` と `docs/agent-view-policy.md` を新設、`templates/claude/settings.security.json.template` に `worktree.baseRef: "fresh"` / `autoMode.hard_deny` を baseline 追加 (`.claude-plugin/settings.json` への手動マージは self-write guardrail のため release operator 作業)、`scripts/lib/terminal-notify.sh` 経由で `webhook-notify.sh` と `notification-handler.sh` が `HARNESS_TERMINAL_NOTIFY` opt-in で `terminalSequence` を emit する。 |
| **Phase 67 Codex 0.130.0 stable snapshot** | upstream-update, setup, codex, harness-review | `A: 検証強化 / C: 自動継承 / P: Plans 化 (B: 0 件)`。`docs/upstream-update-snapshot-2026-05-10.md` を Plans `67.1.1`-`67.1.4` に接続し、`rust-v0.130.0` stable の `codex remote-control`, plugin-bundled hooks, plugin sharing metadata, app-server Thread pagination APIs, Bedrock `aws login`, selected-environment `view_image`, live threads from latest config snapshot, `apply_patch` 後の turn diffs, ThreadStore summaries/resume/fork, `response.processed`, Windows sandbox runtime bin cache, `cargo install --locked`, OTel trace metadata, built-in MCPs, `CODEX_HOME` environments TOML provider を A/C/P 分類した。 |
| **Phase 62 Claude Code 2.1.112-2.1.132 後続活用 + Opus 4.7 follow-up** | upstream-update, harness-loop, breezing, harness-review, guardrails, hooks | `A: 検証強化 / C: 自動継承 (B: 0 件)`。`docs/upstream-update-snapshot-2026-05-07.md` を Plans `62.1.1`-`62.3.1` に接続。Tier 1: subagent stall 2 層防御 (CC 600s + elicitation-handler)、`ENABLE_PROMPT_CACHING_1H` 1h cache opt-in for long-running、hooks `type: "mcp_tool"` 採用判断 (= 保留)、`sandbox.network.deniedDomains` baseline 拡張 (template canonical 9 件)、R06/R11/R12 wrapper bypass test (env/sudo/watch × 3 = 9 ケース)。Tier 2: `PostToolUse.updatedToolOutput` opt-in handler + audit、agent permissionMode reaffirmation (Phase 59.2.3 方針 gate)、`skill_activated.invocation_trigger` privacy-first telemetry、`CLAUDE_CODE_SESSION_ID` env policy 4 経路、`skillOverrides` 3 mode governance。 |
| **Phase 61 Sandbagging-Aware Weak-Supervision Harness** | harness-review, harness-loop, harness-mem | `docs/sandbagging-aware-weak-supervision.md` と `docs/weak-supervision-elicitation-snapshot-2026-05-06.md` に接続。`weak-supervision-report.v1` / `elicitation-event.v1` / `.claude/state/elicitation/events.jsonl` で、見せかけの成功・弱い採点・反例を記録し、Advisor cue と Reviewer 検出に使う。Advisor は `PLAN/CORRECTION/STOP`、Reviewer は最終判定のまま。 |
| **Issue #105 English default + Japanese opt-in CI gate** | setup, harness-work, CI | New distribution surfaces default to English while Japanese opt-in UX, bilingual skill metadata, setup rendering, and mirror consistency are locked by the i18n regression suite. |
| **Phase 58 Claude Code 2.1.120-2.1.126 / Codex 0.125.0-0.128.0 snapshot** | upstream-update, harness-review, setup, codex | `A: 検証強化 / P: Plans 化`。`docs/upstream-update-snapshot-2026-05-03.md` と `docs/upstream-followups-phase58-2026-05-03.md` を Plans `58.1.1`-`58.3.2` に接続し、Claude Code `--dangerously-skip-permissions`, `PostToolUse.updatedToolOutput`, MCP `alwaysLoad`, `claude plugin prune`, `claude project purge`, Codex permission profiles, `codex exec --json` reasoning tokens, plugin-bundled hooks, `/goal`, MultiAgentV2, and `0.129.0-alpha.2` watch status を A/C/P 分類した上で、runtime 実装は protected path taxonomy / output governance / Codex profile migration の後続 task に切った。 |
| **Phase 56 Claude Code 2.1.119 / Codex 0.124.0 snapshot** | upstream-update, harness-review, setup | `A: 検証強化`。`docs/upstream-update-snapshot-2026-04-25.md` と `docs/upstream-followups-phase56-2026-04-25.md` を Plans `56.1.1`-`56.2.4` に接続し、`--print` frontmatter parity, `PostToolUse.duration_ms`, status line effort/thinking, `prUrlTemplate`, Codex stable hooks, multi-environment app-server, and `0.125.0-alpha.2` watch status を A/C/P 分類した上で、statusline 追従と docs-only safe default を tests で固定。 |
| **Task tool メトリクス** | parallel-workflows | サブエージェントのトークン/ツール/時間を集計 |
| **`/debug` コマンド** | troubleshoot | 複雑なセッション問題の診断 |
| **PDF ページ範囲** | notebookLM, harness-review | 大型ドキュメントの効率的な処理 |
| **Git log フラグ** | harness-review, CI, harness-release | 構造化されたコミット分析 |
| **OAuth 認証** | codex-review | DCR 非対応 MCP サーバーの設定 |
| **68% メモリ最適化** | session-memory, session | `--resume` の積極的活用 |
| **サブエージェント MCP** | task-worker | 並列実行時の MCP ツール共有 |
| **Reduced Motion** | harness-ui | アクセシビリティ設定 |
| **TeammateIdle/TaskCompleted Hook** | breezing | チーム監視の自動化 |
| **Agent Memory (memory frontmatter)** | task-worker, code-reviewer | 永続的学習 |
| **Fast mode (Opus 4.6)** | 全スキル | 高速出力モード |
| **自動メモリ記録** | session-memory | セッション間知識の自動永続化 |
| **スキルバジェットスケーリング** | 全スキル | コンテキスト窓の 2% に自動調整 |
| **Task(agent_type) 制限** | agents/ | サブエージェント種類制限 |
| **Plugin settings.json** | setup | init トークン削減・即時セキュリティ保護 |
| **Worktree isolation** | breezing, parallel-workflows | 同一ファイル並列書き込み安全化 |
| **Background agents** | generate-video | 非同期シーン生成 |
| **ConfigChange hook** | hooks | 設定変更監査 |
| **last_assistant_message** | session-memory | セッション品質評価 |
| **Sonnet 4.6 (1M context)** | 全スキル | 大規模コンテキスト処理 |
| **メモリリーク修正 (v2.1.50〜v2.1.63)** | breezing, work | 長時間チームセッションの安定性向上 |
| **`claude agents` CLI (v2.1.50)** | troubleshoot | エージェント定義の診断・確認 |
| **WorktreeCreate/Remove hook (v2.1.50)** | breezing | Worktree ライフサイクル自動セットアップ・クリーンアップ（実装済み） |
| **`claude remote-control` (v2.1.51)** | 調査済み・将来対応 | 外部ビルドとローカル環境サービング |
| **`/simplify` (v2.1.63)** | work | Phase 3.5 Auto-Refinement: 実装後の自動コード洗練 |
| **`/batch` (v2.1.63)** | breezing | 横展開タスクの並列マイグレーション委任 |
| **`code-simplifier` プラグイン** | work | `--deep-simplify` 時の深いリファクタリング |
| **HTTP hooks (v2.1.63)** | hooks | JSON POST テンプレート提供。`HARNESS_WEBHOOK_URL` 設定時に TaskCompleted 通知が有効化 |
| **Auto-memory worktree 共有 (v2.1.63)** | breezing | worktree エージェント間のメモリ共有 |
| **`/clear` スキルキャッシュリセット (v2.1.63)** | troubleshoot | スキル開発時のキャッシュ問題診断 |
| **`ENABLE_CLAUDEAI_MCP_SERVERS` (v2.1.63)** | setup | claude.ai MCP サーバーの無効化オプション |
| **Effort levels + ultrathink (v2.1.68)** | harness-work | 多要素スコアリングで複雑タスクに ultrathink 自動注入 |
| **Agent hooks (v2.1.68)** | hooks | type: "agent" による LLM エージェントコード品質ガード |
| **Opus 4/4.1 削除（v2.1.68）** | — | first-party API から削除。Opus 4.6 へ自動移行 |
| **`${CLAUDE_SKILL_DIR}` 変数 (v2.1.69)** | 全スキル | スキル内の参照パスを実行環境非依存で解決 |
| **InstructionsLoaded hook (v2.1.69)** | hooks | セッション前の instructions 読み込みイベントを追跡 |
| **`agent_id` / `agent_type` 追加 (v2.1.69)** | hooks, breezing | teammate の識別・ロール判定を安定化 |
| **`{"continue": false}` teammate 応答 (v2.1.69)** | breezing | 全タスク完了時の自動停止を実現 |
| **`/reload-plugins` (v2.1.69)** | 全スキル | スキル・フック編集後の即時反映 |
| **`includeGitInstructions: false` (v2.1.69)** | work, breezing | git 指示が不要な場面のトークン削減 |
| **`git-subdir` plugin source (v2.1.69)** | setup, release | サブディレクトリ管理された plugin source に対応 |
| **Auto Mode (RP Phase 1)** | breezing, work | CC native 機能。Harness 側は PermissionDenied 追跡のみ。判断ロジック未実装。現行 default は `bypassPermissions` |
| **Per-agent hooks (v2.1.69+)** | agents/ | エージェント定義の frontmatter に `hooks` フィールドを追加。Worker に PreToolUse ガード、Reviewer に Stop ログを設定 |
| **Agent `isolation: worktree` (v2.1.50+)** | agents/worker | Worker エージェント定義に `isolation: worktree` を追加。並列書き込み時の自動 worktree 分離 |
| **Compaction 画像保持 (v2.1.70)** | notebookLM, harness-review | サマリーリクエストで画像を保持。プロンプトキャッシュ再利用改善 |
| **サブエージェント最終レポート簡潔化 (v2.1.70)** | breezing, harness-work | サブエージェント完了レポートのトークン消費削減 |
| **`--resume` スキルリスト再注入廃止 (v2.1.70)** | session | セッション再開時に ~600 tokens 節約 |
| **Plugin hooks 修正 (v2.1.70)** | hooks | Stop/SessionEnd が /plugin 後に発火、テンプレート衝突解消、WorktreeCreate/Remove 正常動作 |
| **Teammate ネスト防止追加修正 (v2.1.70)** | breezing | v2.1.69 対応に加え、追加のネスト防止修正 |
| **PostToolUseFailure hook (v2.1.70)** | hooks | ツール呼び出し失敗時に発火する新フックイベント |
| **`/loop` + Cron スケジューリング (v2.1.71)** | breezing, harness-work | `/loop 5m <prompt>` で定期実行。タスク進捗の自動監視に活用 |
| **Background Agent 出力パス修正 (v2.1.71)** | breezing, parallel-workflows | 完了通知に出力ファイルパスを含む。圧縮後も結果回収可能 |
| **`--print` チームエージェント hang 修正 (v2.1.71)** | CI 連携 | `--print` モードでのチームエージェント hang を修正 |
| **Plugin インストール並列実行修正 (v2.1.71)** | breezing | 複数インスタンス時のプラグイン状態安定化 |
| **Marketplace 改善 (v2.1.71)** | setup | @ref パーサー修正、update merge conflict 修正、MCP server 重複排除、/plugin uninstall が settings.local.json 使用 |
| **Subagent `background` フィールド (v2.1.71+)** | breezing, parallel-workflows | エージェント定義に `background: true` を追加。常にバックグラウンドタスクとして実行 |
| **Subagent `local` メモリスコープ (v2.1.71+)** | agents/ | `memory: local` で `.claude/agent-memory-local/` に保存。VCS にコミットしない機密性の高い学習を分離 |
| **Agent Teams 実験フラグ (v2.1.71+)** | breezing | `CLAUDE_CODE_EXPERIMENTAL_AGENT_TEAMS` 環境変数で Agent Teams を有効化。公式ドキュメント化済み |
| **`/agents` コマンド (v2.1.71+)** | troubleshoot, setup | エージェントの対話的管理UI。作成・編集・削除・一覧を GUI で操作 |
| **Desktop Scheduled Tasks (v2.1.71+)** | harness-work | CC native 機能。Harness 側のデフォルト設定なし（CronCreate ツールは利用可） |
| **`CronCreate/CronList/CronDelete` ツール (v2.1.71+)** | breezing, harness-work | `/loop` の内部ツール。セッション内での定期タスク作成・管理 |
| **`CLAUDE_CODE_DISABLE_CRON` 環境変数 (v2.1.71+)** | setup | `=1` で Cron スケジューラを無効化。セキュリティポリシーで定期実行を制限する環境向け |
| **`--agents` CLI フラグ (v2.1.71+)** | breezing, CI | JSON でセッションレベルのエージェント定義を渡す。ディスクに保存されない一時的なエージェント構成 |
| **`ExitWorktree` ツール (v2.1.72)** | breezing, harness-work | プログラム的に worktree セッションを離脱するツール |
| **Effort levels 簡素化 (v2.1.72)** | harness-work | `max` 廃止、`low/medium/high` の3段階 + `○ ◐ ●` シンボル。`/effort auto` でデフォルトリセット |
| **Agent tool `model` パラメータ復活 (v2.1.72)** | breezing | per-invocation model override が再度利用可能に |
| **`/plan` description 引数 (v2.1.72)** | harness-plan | `/plan fix the auth bug` のように説明付きでプランモードに入れる |
| **並列ツール呼び出し修正 (v2.1.72)** | breezing, harness-work | Read/WebFetch/Glob 失敗が sibling 呼び出しをキャンセルしなくなった（Bash エラーのみカスケード） |
| **Worktree isolation 修正 (v2.1.72)** | breezing | Task resume 時の cwd 復元、background 通知に worktreePath を含む |
| **`/clear` バックグラウンドエージェント保持 (v2.1.72)** | breezing | `/clear` はフォアグラウンドタスクのみ停止。バックグラウンドエージェントは存続 |
| **Hooks 修正群 (v2.1.72)** | hooks | transcript_path 修正、PostToolUse ダブル表示修正、async hooks stdin 修正、skill hooks 二重発火修正 |
| **HTML コメント非表示 (v2.1.72)** | 全スキル | CLAUDE.md の `` が自動注入時に非表示。Read ツールでは引き続き可視 |
| **Bash auto-approval 追加 (v2.1.72)** | guardrails | `lsof`, `pgrep`, `tput`, `ss`, `fd`, `fdfind` が許可リストに追加 |
| **プロンプトキャッシュ修正 (v2.1.72)** | 全スキル | SDK `query()` のキャッシュ無効化修正。入力トークンコスト最大 12 倍削減 |
| **Output Styles (v2.1.72+)** | 全スキル | `.claude/output-styles/` にカスタム出力スタイルを定義。`harness-ops` で Plan/Work/Review の構造化出力を提供 |
| **`permissionMode` in agent frontmatter (v2.1.72+)** | agents/ | エージェント定義 YAML に `permissionMode` を明示宣言。spawn 時の `mode` 指定が不要に |
| **Agent Teams 公式ベストプラクティス (v2.1.72+)** | breezing | 5-6 tasks/teammate ガイドライン、`teammateMode` 設定、plan approval パターンを team-composition に反映 |
| **Sandboxing (`/sandbox`)** | breezing, harness-work | OS レベルのファイルシステム/ネットワーク隔離。`bypassPermissions` の補完レイヤー |
| **`opusplan` モデルエイリアス** | breezing | Plan 時は Opus、実行時は Sonnet に自動切替。Lead の Plan → Execute フローに最適 |
| **`CLAUDE_CODE_SUBAGENT_MODEL` 環境変数** | breezing, harness-work | サブエージェントのモデルを一括指定。Worker/Reviewer のモデル制御を集約 |
| **`availableModels` 設定** | setup | 利用可能モデルの制限リスト。エンタープライズ運用でのモデルガバナンス |
| **Checkpointing (`/rewind`)** | harness-work | セッション状態の追跡・巻き戻し・要約。安全な探索と実験をサポート |
| **Code Review (managed service)** | harness-review | マルチエージェント PR レビュー + `REVIEW.md`。Teams/Enterprise 向け Research Preview |
| **Status Line (`/statusline`)** | 全スキル | カスタムシェルスクリプトで状態表示バー。コンテキスト使用量・コスト・git 状態を常時モニタリング |
| **1M Context Window (`sonnet[1m]`)** | harness-review, breezing | 大規模コードベース分析に 100 万トークンコンテキスト窓を活用 |
| **Per-model Prompt Caching Control** | 全スキル | `DISABLE_PROMPT_CACHING_*` でモデル別にキャッシュ制御。デバッグ・コスト最適化 |
| **`CLAUDE_CODE_DISABLE_ADAPTIVE_THINKING`** | harness-work | Adaptive Reasoning 無効化で固定 thinking budget に復帰。予測可能なコスト制御 |
| **Chrome Integration (`--chrome`, beta)** | harness-work, harness-review | ブラウザ自動化でUI テスト・フォーム入力・コンソールデバッグ。`/chrome` でセッション内切替 |
| **LSP サーバー統合 (`.lsp.json`)** | setup | CC native 機能。Harness 側の `.lsp.json` デフォルト設定なし（`/setup lsp` で個別設定可） |
| **`SubagentStart`/`SubagentStop` matcher (v2.1.72+)** | breezing, hooks | settings.json レベルで agent type 別にサブエージェントライフサイクルを監視。Worker/Reviewer/Scaffolder/Video Generator を個別トラッキング |
| **Agent Teams: Task Dependencies** | breezing | タスク間依存の自動管理。依存完了で blocked タスクが自動 unblock。ファイルロックで claiming 競合防止 |
| **`--teammate-mode` CLI フラグ (v2.1.72+)** | breezing | セッション単位で `in-process`/`tmux` 表示モードを切替。`claude --teammate-mode in-process` |
| **`CLAUDE_CODE_DISABLE_BACKGROUND_TASKS` (v2.1.72+)** | setup | `=1` で全バックグラウンドタスク機能を無効化。セキュリティポリシーでバックグラウンド実行を制限する環境向け |
| **`CLAUDE_AUTOCOMPACT_PCT_OVERRIDE` (v2.1.72+)** | breezing, harness-work | サブエージェントの auto-compaction しきい値を調整（デフォルト 95%）。`50` で早期圧縮、長時間 Worker の安定性向上 |
| **`cleanupPeriodDays` 設定 (v2.1.72+)** | setup | サブエージェント transcript の自動クリーンアップ期間（デフォルト 30 日） |
| **`/btw` サイドクエスチョン (v2.1.72+)** | 全スキル | 現在のコンテキストを保持したまま短い質問。ツールアクセスなし、履歴に残らない。サブエージェント起動の軽量代替 |
| **Plugin CLI コマンド群 (v2.1.72+)** | setup | `claude plugin install/uninstall/enable/disable/update` + `--scope` フラグ。スクリプトによる自動化対応 |
| **Remote Control 強化 (v2.1.72+)** | 調査済み・将来対応 | `/remote-control` (`/rc`) でセッション内から有効化。`--name`, `--sandbox`, `--verbose` フラグ。`/mobile` で QR コード表示。自動再接続対応 |
| **`skills` フィールド in agent frontmatter (v2.1.72+)** | agents/ | サブエージェントにスキルをプリロード。Worker に `harness-work`+`harness-review`、Reviewer に `harness-review`、Scaffolder に `harness-setup`+`harness-plan` を注入（実装済み） |
| **`modelOverrides` 設定 (v2.1.73)** | setup, breezing | モデルピッカーのエントリを Bedrock ARN 等のカスタムプロバイダモデル ID にマッピング |
| **`/output-style` 非推奨化 (v2.1.73)** | 全スキル | `/config` に移行。出力スタイル選択はコンフィグメニューに統合 |
| **Bedrock/Vertex Opus 4.6 デフォルト化 (v2.1.73)** | breezing | クラウドプロバイダのデフォルト Opus が 4.1 → 4.6 に更新 |
| **`autoMemoryDirectory` 設定 (v2.1.74)** | session-memory, setup | 自動メモリの保存パスをカスタマイズ。プロジェクト固有のメモリ分離に対応 |
| **`CLAUDE_CODE_SESSIONEND_HOOKS_TIMEOUT_MS` (v2.1.74)** | hooks | SessionEnd フックのタイムアウトを設定可能に（従来は 1.5 秒固定で kill） |
| **Full model ID 修正 (v2.1.74)** | agents/, breezing | `claude-opus-4-6` 等の完全モデル ID がエージェント frontmatter・JSON config で認識されるように |
| **Streaming API メモリリーク修正 (v2.1.74)** | breezing, harness-work | ストリーミングレスポンスバッファの無制限 RSS 増大を修正 |
| **`--remote` / Cloud Sessions** | breezing, harness-work | `--remote` でターミナルからクラウドセッションを起動。非同期タスク実行 |
| **`/teleport` (`/tp`)** | session | クラウドセッションをローカルターミナルに取り込み |
| **`CLAUDE_CODE_REMOTE` 環境変数** | hooks, session-env-setup | クラウド vs ローカル実行の検出。フックの条件分岐に活用 |
| **`CLAUDE_ENV_FILE` SessionStart 永続化** | hooks, session-env-setup | SessionStart フックから後続 Bash コマンドへ環境変数を永続化 |
| **Slack Integration (`@Claude`)** | — | 将来対応（Teams/Enterprise 前提）。Harness 側の実装なし |
| **Server-managed settings (public beta)** | setup | サーバー配信による一括設定管理。Teams/Enterprise 向け |
| **Microsoft Foundry** | setup, breezing | 新クラウドプロバイダとして追加 |
| **`PreCompact` hook** | hooks | compact 前に Plans.md 未保存なら pathspec 限定 auto-checkpoint コミット後に続行（失敗時または `precompactAutoCommit: false` のみ block） |
| **`Notification` hook event** | hooks | 通知発火時のカスタムハンドラ（実装済み） |
| **`/context` コマンド (v2.1.74)** | all skills | コンテキスト消費の可視化と最適化提案 |
| **`maxTurns` エージェント安全制限** | agents/ | ターン上限による暴走防止。Worker: 100, Reviewer: 50, Scaffolder: 75 |
| **Output token limits 64k/128k (v2.1.77)** | all skills | Opus 4.6 / Sonnet 4.6 デフォルト 64k、上限 128k トークン |
| **`allowRead` sandbox 設定 (v2.1.77)** | harness-review | `denyRead` 内で特定パスの読み取りを再許可 |
| **PreToolUse `allow` が `deny` を尊重 (v2.1.77)** | guardrails | フック `allow` が settings.json `deny` を上書きしない |
| **Agent `resume` → `SendMessage` (v2.1.77)** | breezing | Agent tool `resume` 廃止、`SendMessage({to: agentId})` に移行 |
| **`/branch` (旧 `/fork`) (v2.1.77)** | session | `/fork` → `/branch` リネーム。エイリアス存続 |
| **`claude plugin validate` 強化 (v2.1.77)** | setup | frontmatter + hooks.json 構文検証追加 |
| **`--resume` 45% 高速化 (v2.1.77)** | session | fork-heavy セッション再開の高速化・メモリ削減 |
| **Stale worktree 競合修正 (v2.1.77)** | breezing | アクティブ worktree 誤削除の防止 |
| **`StopFailure` hook event (v2.1.78)** | hooks | API エラーでのセッション停止失敗をキャプチャ |
| **`${CLAUDE_PLUGIN_DATA}` 変数 (v2.1.78)** | hooks, setup | プラグイン更新でも永続するステートディレクトリ |
| **Agent `effort`/`maxTurns`/`disallowedTools` frontmatter (v2.1.78)** | agents/ | プラグインエージェントの宣言的制御 |
| **`deny: ["mcp__*"]` 修正 (v2.1.78)** | setup | settings.json deny で MCP ツールを正しくブロック |
| **`ANTHROPIC_CUSTOM_MODEL_OPTION` (v2.1.78)** | setup | カスタムモデルピッカーエントリ |
| **`--worktree` skills/hooks 読込修正 (v2.1.78)** | breezing | worktree フラグ時のスキル・フック正常ロード |
| **Skill `effort` frontmatter (v2.1.80)** | harness-work, harness-review, harness-plan, harness-release | 5動詞スキル自体に思考量を持たせ、重いフローの初動品質を引き上げる |
| **Agent `initialPrompt` frontmatter (v2.1.83)** | agents/ | Worker / Reviewer / Scaffolder の最初の1ターンを役割ごとに安定化 |
| **`sandbox.failIfUnavailable` (v2.1.83)** | setup, guardrails | sandbox 起動失敗時に unsandboxed へ silently fallback しない |
| **`CLAUDE_CODE_SUBPROCESS_ENV_SCRUB=1` (v2.1.83)** | hooks, setup | hook / Bash / MCP stdio subprocess への資格情報流出面を縮小 |
| **`TaskCreated` / `CwdChanged` / `FileChanged` hooks (v2.1.83-2.1.84)** | hooks, session | reactive state tracking と Plans / ルール再読リマインドを追加 |
| **Rules / skills `paths:` YAML list (v2.1.84)** | setup, localize-rules | 複数 glob を構造化して保持し、ルールの適用範囲を読みやすく壊れにくくする |
| **Hooks conditional `if` field (v2.1.85)** | hooks, guardrails | `PermissionRequest` を安全な Bash と編集系だけに絞り、不要な hook 起動と誤警告を減らす |
| **Large session truncation 修正 (v2.1.78)** | session | 5MB 超セッションの切り詰め修正 |
| **`--console` auth フラグ (v2.1.79)** | setup | Anthropic Console API 課金認証 |
| **Turn duration 表示 (v2.1.79)** | all skills | `/config` でターン実行時間の表示切替 |
| **`CLAUDE_CODE_PLUGIN_SEED_DIR` 複数対応 (v2.1.79)** | setup | 複数シードディレクトリ指定 |
| **SessionEnd hooks `/resume` 修正 (v2.1.79)** | hooks | 対話的セッション切替時の SessionEnd 正常発火 |
| **18MB startup memory 削減 (v2.1.79)** | all skills | 起動時メモリ使用量削減 |
| **MCP tool description cap 2KB (v2.1.84)** | all skills | OpenAPI 由来の巨大 MCP スキーマによるコンテキスト肥大化を防止。CC 自動継承 |
| **`TaskCreated` hook blocking (v2.1.84)** | hooks | TaskCreate 時にフックが同期ブロックで発火。runtime-reactive で state tracking に活用 |
| **Idle-return prompt 75min (v2.1.84)** | session | 75 分以上離席後に `/clear` を提案。stale セッションのトークン浪費防止。CC 自動継承 |
| **`X-Claude-Code-Session-Id` header (v2.1.86)** | setup | API リクエストにセッション ID ヘッダ追加。プロキシ側の集計に利用可能。CC 自動継承 |
| **Cowork Dispatch 修正 (v2.1.87)** | breezing | Cowork Dispatch のメッセージ配信修正。CC 自動継承 |
| **`PermissionDenied` hook event (v2.1.89)** | hooks, breezing | auto mode classifier 拒否時に発火。`{retry:true}` でリトライ誘導。Breezing Worker の拒否追跡・Lead 通知に実装 |
| **`"defer"` permission decision (v2.1.89)** | hooks, breezing | PreToolUse から `"defer"` を返すとヘッドレスセッションを一時停止→resume で再評価。Breezing の安全弁 |
| **`updatedInput` + `AskUserQuestion` (v2.1.89+)** | hooks | ヘッドレス環境で外部 UI / 明示 answer source が質問回答を収集し、既知同義語だけ canonical option label に寄せて `updatedInput.answers` を返す。A: 実装あり (`ask-user-question-normalize`) |
| **Hook output >50K disk save (v2.1.89)** | hooks | 大出力フックをディスク保存＋プレビュー。コンテキスト肥大化防止 |
| **Hooks `if` compound command fix (v2.1.89)** | hooks | `ls && git push` や `FOO=bar git push` のような複合コマンドが `if` 条件にマッチするよう修正。CC 自動継承 |
| **Autocompact thrash loop fix (v2.1.89)** | all skills | 3 回連続 compact→即再充填で actionable error を出して停止。CC 自動継承 |
| **Nested CLAUDE.md re-injection fix (v2.1.89)** | all skills | 長セッションで CLAUDE.md が数十回再注入されるバグを修正。CC 自動継承 |
| **Thinking summaries default off (v2.1.89)** | all skills | thinking summaries のデフォルト生成を停止。`showThinkingSummaries:true` で復元。CC 自動継承 |
| **PreToolUse exit 2 JSON fix (v2.1.90)** | hooks, guardrails | JSON stdout + exit 2 でのブロック動作を修正。pre-tool.sh の deny がより確実に動作 |
| **PostToolUse format-on-save fix (v2.1.90)** | hooks | PostToolUse フックがファイルを書き換えた後の Edit/Write 失敗を修正。CC 自動継承 |
| **`--resume` prompt-cache miss fix (v2.1.90)** | session | v2.1.69 以降の回帰バグ修正。deferred tools/MCP/agents 使用時の resume キャッシュミス。CC 自動継承 |
| **SSE/transcript performance (v2.1.90)** | all skills | SSE フレーム O(n²)→O(n)、transcript writes 二次関数→線形。CC 自動継承 |
| **`/powerup` interactive lessons (v2.1.90)** | — | Claude Code 機能学習のアニメーションデモ。CC 自動継承 |
| **MCP `maxResultSizeChars` 500K (v2.1.91)** | hooks, setup | MCP ツール結果の最大サイズを `_meta["anthropic/maxResultSizeChars"]` で 500K まで拡張。大きな harness-mem 結果等で活用可能 |
| **`disableSkillShellExecution` setting (v2.1.91)** | setup, guardrails | スキル内の shell 実行を無効化。セキュリティ要件が高い環境向け設定 |
| **Plugin `bin/` directory (v2.1.91)** | setup | プラグインが `bin/` ディレクトリにコンパイル済みバイナリを同梱可能。将来の配布形態拡張候補 |
| **Transcript chain breaks fix (v2.1.91)** | session | `--resume` 時の transcript 途切れを修正。CC 自動継承 |
| **Subagent spawning fix (v2.1.92)** | breezing | 「Could not determine pane count」修正。Breezing 安定性向上。CC 自動継承 |
| **`forceRemoteSettingsRefresh` (v2.1.92)** | — | Teams/Enterprise 向け fail-closed remote settings。CC 自動継承 |
| **`/usage` usage / cost / stats view (v2.1.92, v2.1.118 refresh)** | all skills | `/usage` を利用量・コスト・統計の入口として扱う。旧 `/cost` / `/stats` は関連 tab を開く shortcut として CC 自動継承 |
| **Linux `apply-seccomp` helper (v2.1.92)** | setup | sandbox unix-socket ブロッキング強化。CC 自動継承 |
| **Plugin `skills` フィールド明示化 (v2.1.94)** | setup | plugin.json に `"skills": ["./"]` を明示宣言。CC 2.1.94 でスキル呼び出し名が frontmatter `name` 基準に。A: 実装あり (plugin.json 更新) |
| **Monitor ツール (v2.1.98)** | breezing/harness-work/ci/deploy/harness-review | 長時間プロセスの stdout ストリーミング監視。polling より低レイテンシ・低トークン消費で CI/デプロイ進捗を追跡。A: 実装あり (allowed-tools + 運用ガイド + Feature Table) |

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

## Phase 51 追補テーブル

この追補セクションでは、Claude Code `2.1.112-2.1.114` と Codex `0.121.0` の一次情報から、Harness に載せる項目だけを分類します。

| 機能 | 活用スキル / 領域 | 用途 | 付加価値 |
|------|-------------------|------|----------|
| **AskUserQuestion `updatedInput.answers` bridge** | hooks, harness-plan, harness-release | `PreToolUse` で明示的に渡された answers を読み、`solo/team` や `scripted/exploratory` など既知同義語だけを option label に正規化して headless 対話を継続 | `A: 実装あり` (`go/internal/hookhandler/ask_user_question_normalizer.go`, `hooks/hooks.json`, `tests/test-claude-upstream-integration.sh`) |
| **Claude Code 2.1.113 permission / sandbox hardening** | settings, guardrails | `sandbox.network.deniedDomains` を設定し、`find -exec` / `-delete` と macOS dangerous rm paths を Harness guardrail でも検出 | `A: 実装あり` (`.claude-plugin/settings.json`, `go/internal/guardrail/helpers.go`, `tests/test-claude-upstream-integration.sh`) |
| **Claude Code 2.1.114 permission dialog crash fix** | hooks, team execution | Agent Teams teammate の permission dialog crash 修正 | `C: CC 自動継承` |
| **Claude/Codex upstream update Skills gate** | skills, review | upstream update 実施前に version-by-version 分解表を必須化し、PR 対象の `skills/` / `codex/.codex/skills/` と local-only `.agents/skills/` の判定を同期 | `A: 実装あり` (`claude-codex-upstream-update`, `cc-update-review`) |
| **Codex 0.121.0 marketplace / MCP Apps / memory controls** | setup, future Codex workflow | plugin marketplace、MCP Apps tool calls、memory reset / cleanup、sandbox metadata を Harness の Codex 比較軸へ残す | `P: Plans 化`。今回は Claude hardening 実装を優先し Plans に切り出し |
| **Codex 0.121.0 secure devcontainer / bubblewrap** | setup, guardrails | secure devcontainer profile と macOS Unix socket allowlist を将来の sandbox policy 比較対象にする | `C: Codex 側調査済み / Harness 変更なし` |
| **Skills mirror 総点検** | skills, setup | `.agents/skills` の Claude/Codex 置換 drift、Codex native tool model、memory/session path、media generation metadata を棚卸し | `P: Plans 化` (`docs/skills-audit-2026-04-20.md`) |

**注記**:
Phase 51 でも `B: 書いただけ` は `0` 件です。Codex 0.121.0 の大きい項目は、今回の直接実装ではなく「Codex 比較軸」として Plans に残し、Claude Code 側の `AskUserQuestion.updatedInput` と 2.1.113 hardening は settings / Go / tests まで実装して `A` としました。

## Phase 52 追補テーブル

この追補セクションでは、Claude Code `2.1.116` と Codex `0.122.0` / `0.123.0-alpha.2` の一次情報から、Harness に直接実装するべきか、自動継承 / Plans 化に留めるべきかを分類します。詳細は `docs/upstream-update-snapshot-2026-04-21.md` に記録しています。

| 機能 | 活用スキル / 領域 | 用途 | 付加価値 |
|------|-------------------|------|----------|
| **Claude Code 2.1.116 resume / MCP / plugin updater UX refresh** | session, setup, MCP | `/resume` 高速化、MCP startup deferred loading、plugin dependency auto-install を Harness の session / setup guidance と照合 | `C/P: 自動継承 + Plans 化`。Harness wrapper は追加せず、plugin dependency policy と MCP health watch の後続候補に残す |
| **Claude Code 2.1.116 dangerous-path safety / agent hooks refresh** | guardrails, agents | sandbox auto-allow dangerous-path safety と main-thread `--agent` hooks 発火を既存 guardrail / agent policy と照合 | `C/P: 自動継承 + Plans 化`。R05 guardrail は維持し、agent frontmatter policy audit に残す |
| **Codex 0.122.0 plugin / Plan Mode / permission model** | codex workflow, setup, sandbox | `/side`、fresh-context Plan Mode、plugin workflow、deny-read glob、tool discovery default-on を Codex mirror 改善候補に分類 | `P: Plans 化`。Phase 51.2 の Codex-native skill audit と一緒に扱う |
| **Codex 0.123.0-alpha.2 pre-release** | future compare | release body が薄い alpha を推測実装せず、stable 化後の再確認対象にする | `P: Plans 化`。compare から推測実装しない |
| **Upstream update Skills merge hardening** | skills, review, tests | `cc-update-review` を diff-aware 化し、`claude-codex-upstream-update` を no-op adaptation 対応にして mirror drift test を追加 | `A: 実装あり` (`skills/cc-update-review`, `skills/claude-codex-upstream-update`, `tests/test-claude-upstream-integration.sh`) |

**注記**:
Phase 52 でも `B: 書いただけ` は `0` 件です。Claude / Codex 本体が自然に改善する UX は `C` とし、Harness に重ねると二重責務になるものは `P` として後続の Codex-native skill audit / plugin policy に接続しました。直接実装は review findings の再発防止に絞り、skill mirror drift と no-op adaptation を test で固定しています。

## Phase 53 追補テーブル

この追補セクションでは、Claude Code `2.1.117-2.1.118` と Codex `0.123.0` の一次情報から、Harness に直接実装するべきか、自動継承 / Plans 化に留めるべきかを分類します。詳細は `docs/upstream-update-snapshot-2026-04-23.md` に記録しています。

| 機能 | 活用スキル / 領域 | 用途 | 付加価値 |
|------|-------------------|------|----------|
| **Claude Code `type: "mcp_tool"` hooks** | hooks, MCP diagnostics, tests | shell script を増やさず、読み取り専用の MCP health / resource 診断 hook を小さく検証する | `A: 実装あり`。53.1.2 では manifest 追加を no-op とし、常設 read-only diagnostic tool と安定 field 仕様が揃うまで配布 hooks へ入れない判断を snapshot に記録。書き込み系 MCP tool を呼ばないことは `tests/test-claude-upstream-integration.sh` で固定 |
| **Claude Code `claude plugin tag`** | harness-release, plugin release | `VERSION` と `.claude-plugin/plugin.json` の同期確認後に plugin version validation 付き tag を作る | `A: 実装予定`。53.1.3 で release flow / dry-run / test guidance に追加 |
| **Auto Mode `"$defaults"` extension** | permissions, sandbox, settings docs | built-in default を置き換えず、Harness 独自ルールを追加する形へ guidance を更新する | `A: 実装あり`。53.1.4 で `"$defaults"` を additive baseline として記録し、R05 / `deniedDomains` と二重責務にならない理由を snapshot・template・upstream integration test で固定 |
| **Plugin themes / managed settings / dependency auto-resolve** | setup, plugin policy, enterprise docs | `themes/`, `DISABLE_UPDATES`, `blockedMarketplaces`, `strictKnownMarketplaces`, dependency hints を管理環境向けに整理する | `A: docs 化済み`。53.1.5 で `docs/plugin-managed-settings-policy.md` を新設し、Harness 独自 resolver を重ねない方針を明記。theme 同梱判断は snapshot 側で `P` として残す |
| **Claude Code UX / runtime fixes** | session, agents, MCP, search, effort | `/usage` 統合、`/resume` `/add-dir` 対応、`--agent` + `mcpServers`、stale session summary、native `bfs` / `ugrep`、高 effort default を整理する | `C/P: 自動継承 + Plans 化`。53.1.6 で wrapper を追加しない理由を snapshot に記録し、`--agent` + `mcpServers` と external forked subagent flag は agent audit 候補として `P` に残す |
| **Codex 0.123.0 provider / model metadata** | Codex setup, provider policy | built-in `amazon-bedrock` provider、AWS profile support、current `gpt-5.4` default metadata を Codex setup guidance に反映する | `A: docs 化済み`。53.2.1 で `docs/codex-provider-setup-policy.md` を新設し、Harness 配布 config では `model` / `model_provider` を固定せず、Bedrock 利用者だけが user / project config に追加する方針を固定 |
| **Codex 0.123.0 MCP diagnostics / plugin loading** | troubleshoot, setup, Codex plugin docs | `/mcp verbose`、diagnostics / resources / resource templates、`.mcp.json` の `mcpServers` 形式と top-level server map 形式を setup guidance に反映する | `A: docs 化済み`。53.2.2 で `docs/codex-mcp-diagnostics.md` を新設し、普段は `/mcp`、困った時だけ `/mcp verbose` を使う手順と、Claude Code 側 MCP guidance と混ぜない方針を固定 |
| **Codex 0.123.0 realtime handoff silence** | harness-loop, breezing, long-running | background agents が transcript delta を受け取り、必要ない時は明示的に沈黙できる前提で途中報告の頻度を整理する | `A: docs 化済み`。53.2.3 で `harness-loop` は 1 cycle につき最終報告 1 回、`breezing` は task 完了ごとに progress feed 1 回を基本にし、advisor / reviewer drift は silence 対象外として固定 |
| **Codex 0.123.0 sandbox / exec changes** | sandbox, execution policy | `remote_sandbox_config`、`codex exec` shared flags を追従する | `A: docs 化済み`。53.2.4 で `docs/codex-sandbox-execution-policy.md` を追加し、remote environment ごとの sandbox 要件比較と wrapper flag 重複削減可否を固定 |
| **Codex 0.123.0 automatic bug fixes** | Codex long-running UX, session shell, review privacy | `/copy` rollback、manual shell follow-up queue、Unicode / dead-key、stale proxy env、VS Code WSL keyboard、review prompt leak を記録する | `C: Codex 自動継承`。53.2.5 で workaround を追加しない理由を明記 |

**注記**:
Phase 53 でも `B: 書いただけ` は `0` 件です。Feature Table は入口に留め、公式 URL と version-by-version の判断根拠は `docs/upstream-update-snapshot-2026-04-23.md` に集約しました。`A` は Phase 53 の具体 task に接続し、`C` は本体修正の自動継承、`P` は推測実装しない将来判断として扱います。

Phase 53 closeout では、Codex mirror / path drift の広い棚卸しを Phase 51.2 の Codex-native skill audit TODO に残します。Phase 53 は upstream `0.123.0` 差分の具体反映だけを閉じ、Phase 51.2.1-51.2.4 の tool model / memory path / mirror path / media metadata 整理を先取りしません。

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

## Phase 133.6 追補テーブル (subagent depth/concurrency + sandbox credential-masking claim 検証)

このセクションは、先行 research agent が報告した 2 クラスタの claim を一次情報 (raw
`CHANGELOG.md`) で個別検証した結果のみを反映する。フルバージョン同期ではない
(`2.1.153`-`2.1.216` は未確認)。検証記録・引用元: `docs/research/133-6-cc-cli-claim-verification.md`。

| 機能 | 活用スキル / 領域 | 用途 | 付加価値 |
|------|-------------------|------|----------|
| **Subagent nested-spawn depth limit + 同時実行数上限 (`CLAUDE_CODE_MAX_SUBAGENT_SPAWN_DEPTH` / `CLAUDE_CODE_MAX_CONCURRENT_SUBAGENTS`, 2.1.217/2.1.219)** | breezing, harness-work, harness-review | `confirmed`。2.1.217 でネスト spawn を既定 OFF に + 同時実行数上限を既定 20 に設定可能化、2.1.219 で既定 depth を 1→3 に緩和 (原文 "was 1")。`CLAUDE_CODE_MAX_CONCURRENT_SUBAGENTS` は breezing の並列 worker 数と、`CLAUDE_CODE_MAX_SUBAGENT_SPAWN_DEPTH` は sub-agent が further sub-agent を呼ぶ設計 (worker → 内部 delegation 等) と相互作用しうる | `A: 採用済 (docs 反映)`。133.9 で反映。`--parallel N` は希望値で実同時実行数は CC が決める旨を `skills/breezing/SKILL.md` と `skills/harness-work/SKILL.md` に明記した (20 超は待ち行列に入るだけでエラーにならない)。spawn 深さ 3 に対して Lead(0) → Worker(1) → advisor(2) と Mode 1 の Producer → Sub-Lead → Composer はいずれも収まることを確認。**env は Harness 側で明示設定せず CC 既定に従う** (既定を上書きすると CC 側の更新に追随できなくなるため) |
| **Sandbox credential-masking (`mode: "mask"`, `extract`/`onExtractNoMatch`, JWT/AWS SigV4) + `sandbox.network.strictAllowlist` (2.1.219/2.1.221/2.1.224)** | guardrails, setup | `confirmed`。`denyRead` のディレクトリ単位 deny と異なり、値単位で credential を mask できる機構。macOS はファイル masking が `deny` にフォールバックする点に注意 (raw changelog 原文) | `P: Plans 化 (実測待ち)`。`docs/sandbox-allowlist-recipe.md` と `.claude/rules/defense-layer-blast-radius.md` に 採用検討の PROPOSAL セクションを追記済み (実装・live 設定変更なし)。133.9 時点で **`not_observed`** — raw changelog が macOS ではファイル masking が `deny` にフォールバックすると明記しており、本 repo の実行環境は macOS (`uname -s` = Darwin) のため実効性を測れない。**`absent` ではない**: Linux/WSL では動く可能性が残っている。手元に docker はあるが、CC CLI を Linux コンテナ内で sandbox 有効にして動かす経路は未確立。測るならそこが起点 |

## 機能詳細

### Task tool メトリクス

サブエージェントが消費したトークン数・ツール呼び出し数・実行時間を集計できる。
`parallel-workflows` スキルでは複数サブエージェントのメトリクスを集約し、コスト分析に使用。

```
metrics: {tokens: 40000, tools: 7, duration: 67s}
```

### `/debug` コマンド

セッション診断用コマンド。複雑なエラーや予期しない挙動の原因調査に使用。
`troubleshoot` スキルが自動的に起動し、問題を体系的に診断。

### PDF ページ範囲指定

大型 PDF を読み込む際にページ範囲を指定可能（例: `pages: "1-5"`）。
`notebookLM` スキルでのドキュメント処理、`harness-review` での大型仕様書参照に活用。

### Git log フラグ

`git log` の構造化オプション（`--format`, `--stat`, `--since` 等）を活用。
リリースノート生成、コミット分析、変更追跡を効率化。

### OAuth 認証

DCR（Dynamic Client Registration）非対応 MCP サーバーへの OAuth 認証設定。
`codex-review` スキルでの Codex CLI 接続に使用。

### 68% メモリ最適化

`--resume` フラグによるセッション再開時のメモリ使用量削減。
長時間作業セッションでのコンテキスト継続に有効。

### サブエージェント MCP

Task tool で起動したサブエージェントが親セッションの MCP ツールを共有できる。
`task-worker` での並列実装時に、各エージェントが同じ MCP ツールセットを使用可能。

### Reduced Motion

アクセシビリティ設定。モーション/アニメーションを削減するオプション。
`harness-ui` スキルで UI 生成時に考慮。

### TeammateIdle/TaskCompleted Hook

Breezing チームのメンバーがアイドル状態になった時、またはタスク完了時に発火するフック。
`scripts/hook-handlers/teammate-idle.sh` と `task-completed.sh` で処理。

```json
"TeammateIdle": [{"hooks": [{"type": "command", "command": "...teammate-idle", "timeout": 10}]}],
"TaskCompleted": [{"hooks": [{"type": "command", "command": "...task-completed", "timeout": 10}]}]
```

### Agent Memory (memory frontmatter)

エージェント定義 YAML の `memory: project` フィールドで永続メモリを有効化。
`task-worker`, `code-reviewer` が過去の実装パターン・失敗と解決策を跨ぎセッションで学習。

### Fast mode (Opus 4.6)

`/fast` コマンドで切り替える高速出力モード。同じ Opus 4.6 モデルを使用。
全スキルで利用可能。長い実装タスクでの待ち時間短縮に有効。

### 自動メモリ記録

セッション終了時に学習内容を自動的にメモリファイルへ永続化。
`session-memory` スキルが管理。次のセッションで前回の文脈を自動復元。

### スキルバジェットスケーリング

SKILL.md の文字数予算がコンテキスト窓の 2% に自動調整される。
推奨 500 行は目安値。実効上限はモデルのコンテキスト窓サイズに依存。

### Task(agent_type) 制限

Task tool 呼び出し時に `subagent_type` を指定し、サブエージェントの種類を制限。
`agents/` 定義と組み合わせて、意図したエージェントのみを起動することを保証。

### Plugin settings.json

プラグインの `settings.json` で初期化時の設定を事前定義。
init トークン消費を削減し、セキュリティポリシーをセッション開始直後から適用。

### Worktree isolation

`git worktree` を使って同一ファイルへの並列書き込みを安全化。
`breezing` と `parallel-workflows` での複数エージェント並列実装時のコンフリクト防止。

### Background agents

非同期でバックグラウンドエージェントを起動。完了を待たずに他の処理を継続可能。
`generate-video` スキルでの複数シーン並列生成に使用。

### ConfigChange hook

設定ファイル（`settings.json` 等）が変更された時に発火するフック。
`scripts/hook-handlers/config-change.sh` で変更を記録・監査。

### last_assistant_message

セッション終了時の最後のアシスタントメッセージを参照できる機能。
`session-memory` スキルがセッション品質の自己評価に使用。

### Sonnet 4.6 (1M context)

最大 1M トークンのコンテキスト窓を持つ Sonnet 4.6 モデル。
大規模コードベースの分析、長大なドキュメント処理に対応。全スキルで利用可能。

> 補足: 2.1.69 系では旧 Sonnet 4.5 参照は Sonnet 4.6 へ自動マイグレーションされる前提で運用する。

### メモリリーク修正 (v2.1.50〜v2.1.63)

CC 2.1.50 で LSP 診断データ、大型ツール出力、ファイル履歴、シェル実行に関するメモリリークが修正された。
完了タスクのガベージコレクションも実装され、`/breezing` 等の長時間チームセッションの安定性が大幅に改善。
v2.1.63 ではさらに MCP 再接続時のリーク、git root キャッシュ、JSON パースキャッシュ、Teammate メッセージ保持、シェルコマンドプレフィックスキャッシュのリークが追加修正された。
Harness 側は JSONL ローテーション（500→400 行）やアトミック更新で既に独自対策を実施済み。

### `claude agents` CLI (v2.1.50)

`claude agents list` で登録済みエージェントの一覧を表示。
`troubleshoot` スキルでエージェント spawn 失敗時の診断に活用。

```bash
claude agents list   # 登録済みエージェントの一覧
```

### WorktreeCreate/WorktreeRemove hook (v2.1.50)

Worktree の作成・削除時に発火するライフサイクルフック。
`/breezing` 並列ワークフローでの自動セットアップ・クリーンアップに活用。
`scripts/hook-handlers/worktree-create.sh` と `worktree-remove.sh` で実装済み。

### `claude remote-control` (v2.1.51)

外部ビルドシステムとローカル環境のサービングを可能にするサブコマンド。
将来的に Breezing のクロスセッション制御や CI 連携に活用の余地あり。

### `/simplify` (v2.1.63)

CC 2.1.63 で追加された実装後の自動コード洗練コマンド。
`/work` の Phase 3.5 Auto-Refinement として統合され、実装完了後に自動でコードを簡潔化・整理する。
`code-simplifier` プラグインと組み合わせて `--deep-simplify` オプションで深いリファクタリングも可能。

### `/batch` (v2.1.63)

横展開タスク（同じ変更を複数ファイルに適用するマイグレーション等）を並列委任するコマンド。
`/breezing` と組み合わせて、Breezing チームに一括マイグレーションを並列実行させる際に使用。
繰り返し作業の効率化と、人為的ミスの削減に有効。

### `code-simplifier` プラグイン

`/simplify` の深いリファクタリングモードを担う外部プラグイン。
`--deep-simplify` 指定時に起動し、複雑なロジックの分解・不要な抽象化の除去・命名の改善を自動実行。
通常の `/simplify` は軽量、`--deep-simplify` はより踏み込んだリファクタリングを実施。

### HTTP hooks (v2.1.63)

CC 2.1.63 で追加された新しいフック形式。既存の `command` / `prompt` タイプに加え `http` タイプが利用可能になった。
JSON を指定 URL に POST し、外部サービス（Slack、ダッシュボード、メトリクス収集等）と連携できる。
詳細は [.claude/rules/hooks-editing.md](https://github.com/Chachamaru127/claude-code-harness/blob/2b2b74805321089bd9b660a1064fa97556299703/.claude/rules/hooks-editing.md) の「http Type」セクションを参照。

### Auto-memory worktree 共有 (v2.1.63)

CC 2.1.63 で `isolation: "worktree"` 使用時に Agent Memory が worktree 間で共有されるようになった。
`/breezing` の並列 Implementer が各自 worktree 分離で作業しながら、同一の MEMORY.md を参照・更新可能。
Implementer 間の知識共有と、同一バグへの重複対応を防止する。

### `/clear` スキルキャッシュリセット (v2.1.63)

CC 2.1.63 で追加されたスキルキャッシュのリセットコマンド。
スキルファイルを編集後に古いキャッシュで動作する問題（スキル開発時に頻発）を `/clear` で解消できる。
`troubleshoot` スキルのキャッシュ問題診断ステップに組み込み済み。

### `ENABLE_CLAUDEAI_MCP_SERVERS` (v2.1.63)

CC 2.1.63 で追加された環境変数。`false` を設定すると claude.ai が提供する MCP サーバーを無効化できる。
セキュリティポリシー上、外部 MCP サーバーへの接続を制限したい環境での利用を想定。
`setup` スキルの環境初期化チェックリストに追加済み。

### Agent hooks (v2.1.68)

CC 2.1.68 で追加された `type: "agent"` フック。LLM エージェントがフック判断を行うことで、正規表現では検出困難なコード品質問題を動的に判断できる。
Harness では3箇所に限定採用し、コスト管理のため `model: "haiku"` と `matcher` で対象を絞る:

- **PreToolUse Write|Edit**: シークレット埋め込み・TODO スタブ・セキュリティ脆弱性のガード
- **PreCompact**: dirty Plans.md は pathspec 限定 auto-checkpoint（`chore(plans): auto-checkpoint before compaction`）後に compact 続行。commit 失敗または `precompactAutoCommit: false` のみ block（harness-loop 所有セッションは別途 block）
- **PostToolUse Write|Edit**: コードレビュー（品質・命名・単一責任）

効果不足時は `command` 型にロールバック可能な設計。

これら3件は Claude 専用。Codex manifest は inline の空 hook object で
plugin-root fallback を止め、Codex / Orca が未対応 agent hook を読み飛ばす警告を
防ぐ。Codex の command hook は `harness gen hooks` の project-local 生成物として
別経路で配線する。

### Effort levels + ultrathink (v2.1.68)

CC 2.1.68 で Opus 4.6 が **medium effort** をデフォルトに変更。`ultrathink` キーワードで1ターンのみ high effort（extended thinking）を有効化できる。
`harness-work` スキルが多要素スコアリング（変更ファイル数・対象ディレクトリ・キーワード・失敗履歴・PM 明示指定）でスコアを算出し、閾値 3 以上で Worker spawn prompt 冒頭に `ultrathink` を自動注入する。
詳細は `skills/harness-work/SKILL.md` の「Effort レベル制御」セクション参照。

### Opus 4/4.1 削除（v2.1.68）

CC 2.1.68 で Opus 4 と Opus 4.1 が first-party API から削除された。Harness が対象エージェントで `model: opus` 相当を指定している場合、Opus 4.6 へ自動移行される。
Worker/Reviewer エージェントは `model: sonnet` のため影響なし。Lead（Opus 使用時）のみ medium effort がデフォルトになる変更を受ける。

### `${CLAUDE_SKILL_DIR}` 変数 (v2.1.69)

CC 2.1.69 でスキル実行時の基準パス変数 `${CLAUDE_SKILL_DIR}` が導入された。
Harness では `SKILL.md` から `references/*.md` を参照するリンクを `${CLAUDE_SKILL_DIR}/references/...` へ統一し、ミラー構成（codex/opencode）でも同じ参照を維持する。

### InstructionsLoaded hook (v2.1.69)

CC 2.1.69 で `InstructionsLoaded` イベントが追加された。Harness では
`scripts/hook-handlers/instructions-loaded.sh` を新設し、instructions 読み込み完了時の軽量トラッキングと事前検証に利用する。

### `agent_id` / `agent_type` 追加 (v2.1.69)

Teammate 系イベントに `agent_id` / `agent_type` が追加された。
Harness の guardrail は `session_id` 前提から `agent_id` 優先（fallback: `session_id`）へ拡張し、role ガードを安定化した。

### `{"continue": false}` teammate 応答 (v2.1.69)

`TeammateIdle` / `TaskCompleted` で `{"continue": false, "stopReason": "..."}` を返せるようになった。
Harness では stop リクエスト受信時と全タスク完了時に同レスポンスを返し、breezing の停止判定を明示化した。

### `/reload-plugins` (v2.1.69)

スキル・フック編集後にセッション再起動なしで反映するため、開発フローに `/reload-plugins` を追加。
編集 → `/reload-plugins` → 再実行、を標準手順とする。

### `includeGitInstructions: false` (v2.1.69)

git 指示を常時埋め込む必要がないタスクでは `includeGitInstructions: false` を適用し、トークン消費を抑制できる。
Harness では breezing/work の軽量タスク（ドキュメント更新など）での活用を推奨する。

### `git-subdir` plugin source (v2.1.69)

plugin source を monorepo のサブディレクトリで管理する `git-subdir` 方式がサポートされた。
Harness では現状 `.claude-plugin/plugin.json` に追加フィールドを強制せず、リリース時に `plugin source` を明示して運用する（互換性優先）。

### Compaction 画像保持 (v2.1.70)

CC 2.1.70 でコンテキスト圧縮（Compaction）時にサマリーリクエストが画像を保持するようになった。
これにより、スクリーンショットや図表を含むセッションで Compaction 後も画像コンテキストが維持される。
プロンプトキャッシュの再利用率も改善され、画像を扱うスキル全般で効率が向上。

### サブエージェント最終レポート簡潔化 (v2.1.70)

サブエージェント完了時の最終レポートが簡潔化され、トークン消費が削減された。
`breezing` や `harness-work` で多数のサブエージェントを起動する場合、累積的なトークン節約効果が大きい。

### `--resume` スキルリスト再注入廃止 (v2.1.70)

`--resume` でセッション再開する際、スキルリストの再注入が廃止された。
これにより約 600 tokens が節約され、`session` スキルでの再開フローが軽量化。

### Plugin hooks 修正 (v2.1.70)

v2.1.70 で複数の Plugin hooks 関連バグが修正された:
- `Stop` / `SessionEnd` フックが `/plugin` コマンド実行後にも正常に発火
- 同一テンプレートを持つフック間の衝突が解消
- `WorktreeCreate` / `WorktreeRemove` フックの正常動作が確認

### Teammate ネスト防止追加修正 (v2.1.70)

v2.1.69 で対応済みの Teammate ネスト防止に追加修正が入った。
エージェントが別のエージェントを無限に spawn するカスケード問題の防止が強化された。

### PostToolUseFailure hook (v2.1.70)

CC 2.1.70 で `PostToolUseFailure` イベントが追加された。ツール呼び出しが失敗した時に発火する新しいフックイベント。
Harness では `hooks` スキルと `error-recovery` で活用し、連続失敗時の自動エスカレーション（3回連続失敗で停止）に使用。

```json
"PostToolUseFailure": [{
  "hooks": [{
    "type": "command",
    "command": "...post-tool-failure.sh",
    "timeout": 10
  }]
}]
```

### `/loop` + Cron スケジューリング (v2.1.71)

CC 2.1.71 で `/loop` コマンドが追加された。`/loop 5m <prompt>` のように間隔とプロンプトを指定すると、定期的にコマンドを実行する Cron 風スケジューリングが可能。
`breezing` では `/loop 5m /sync-status` でタスク進捗の定期チェックに活用。
既存の `TeammateIdle`（受動的・イベント駆動）と異なり、能動的に定期監視を行える。

### Background Agent 出力パス修正 (v2.1.71)

CC 2.1.71 で Background Agent の完了通知に出力ファイルパスが含まれるようになった。
これにより、圧縮後でもバックグラウンドエージェントの結果を安全に回収可能。
`breezing` や `parallel-workflows` での `run_in_background: true` が実用的に。

### `--print` チームエージェント hang 修正 (v2.1.71)

`--print` モードでチームエージェントが hang する問題が修正された。
CI パイプラインでの `claude --print` 実行時のチームエージェント安定性が向上。

### Plugin インストール並列実行修正 (v2.1.71)

複数の Claude Code インスタンスが同時にプラグインをインストールする際の状態競合が修正された。
`breezing` で複数 Teammate が同時に起動する際のプラグイン読み込み安定性が向上。

### Marketplace 改善 (v2.1.71)

CC 2.1.71 で Marketplace 周りに複数の改善が入った:
- `@ref` パーサー修正: `owner/repo@vX.X.X` 形式の参照解決が正確に
- update 時の merge conflict 修正: プラグイン更新がより安定に
- MCP server 重複排除: 同一 MCP サーバーの多重登録を防止
- `/plugin uninstall` が `settings.local.json` を使用: ユーザーローカル設定への正確な反映

### Per-agent hooks (v2.1.69+)

CC 2.1.69 でエージェント定義の frontmatter に `hooks` フィールドが追加された。
グローバル hooks.json とは別に、エージェント固有のフックを定義できる。

Harness での活用:
- **Worker**: `PreToolUse` で Write/Edit 時の `pre-tool.sh` ガードレールを適用
- **Reviewer**: `Stop` でレビューセッション完了をログ出力

エージェント定義内フックはそのエージェントのライフサイクル中のみ有効で、終了時に自動クリーンアップされる。

### Agent `isolation: worktree` (v2.1.50+)

エージェント定義の frontmatter に `isolation: worktree` を追加すると、
そのエージェントが起動時に自動で git worktree を作成し、独立したリポジトリコピーで作業する。
変更がない場合は worktree が自動クリーンアップされる。

Harness では Worker エージェントに `isolation: worktree` を追加。
`memory: project` と組み合わせることで、worktree 間で Agent Memory（MEMORY.md）が共有され、
並列 Worker が同一の学習内容を参照・更新可能。

### Auto Mode rollout ポリシー

Auto Mode は Claude Code の team execution をより安全側に寄せるための移行候補として整理している。
ただし shipped default はまだ `bypassPermissions` であり、project template や frontmatter には公式 docs に載っている permission mode のみを残す。

| レイヤー | 採用値 | 理由 |
|---------|--------|------|
| project template (`permissions.defaultMode`) | `bypassPermissions` | documented permission modes に `autoMode` が含まれないため |
| agent frontmatter (`permissionMode`) | `bypassPermissions` | 宣言的設定は documented 値のみを使うため |
| teammate 実行経路 | `bypassPermissions`（現行） | shipped default と実際の permission 継承を一致させるため |
| `--auto-mode` | opt-in marker | 親セッションが互換な permission mode の場合のみ rollout を試すため |

既定コマンド例:

```bash
/breezing all
/execute --breezing all
```

### Subagent `background` フィールド

エージェント定義の frontmatter に `background: true` を追加すると、そのエージェントは常にバックグラウンドタスクとして実行される。
明示的に `run_in_background: true` を指定しなくても、Agent tool 経由で起動するたびにバックグラウンド実行となる。

```yaml
---
name: long-running-analyzer
background: true
---
```

Harness では `breezing` の Worker spawn 時に検討可能だが、現状は Lead が明示的に `run_in_background` を制御しているため、追加適用は Phase 2 以降で検討する。

### Subagent `local` メモリスコープ

`memory: local` は `.claude/agent-memory-local/<name>/` に保存され、`.gitignore` に追加すべきパス。
`project` との違い:

| スコープ | パス | VCS コミット | ユースケース |
|---------|------|-------------|------------|
| `user` | `~/.claude/agent-memory/<name>/` | 対象外 | 全プロジェクト共通の学習 |
| `project` | `.claude/agent-memory/<name>/` | 共有可能 | チーム共有のプロジェクト知識 |
| `local` | `.claude/agent-memory-local/<name>/` | 非推奨 | 個人固有・機密性の高い学習 |

Harness では Worker/Reviewer ともに `memory: project` を使用中。`local` は個人的なデバッグパターンの記録に適するが、チーム共有を優先するため現行設定を維持。

### Agent Teams 実験フラグ

Agent Teams は実験的機能として `CLAUDE_CODE_EXPERIMENTAL_AGENT_TEAMS` 環境変数で有効化される。
settings.json 経由でも設定可能:

```json
{
  "env": {
    "CLAUDE_CODE_EXPERIMENTAL_AGENT_TEAMS": "1"
  }
}
```

Harness の `breezing` スキルは Agent Teams 機能を前提としているため、
セットアップ時にこの環境変数が設定されていることを確認する検証ステップを追加。

### Desktop Scheduled Tasks
