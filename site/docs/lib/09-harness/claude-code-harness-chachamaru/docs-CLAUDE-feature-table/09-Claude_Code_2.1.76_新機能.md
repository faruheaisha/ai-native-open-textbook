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
pageSha256: "a7735ba7adfae9f1759836043d6465f79d1d5ee5e351a2189d1f878caf669ac8"
contentMode: "local-full"
zh: ""
---

## Claude Code 2.1.76 新機能

### MCP Elicitation サポート

**動作概要**: MCP サーバーがタスク実行中にユーザーへ構造化された入力を要求できるプロトコル。フォームフィールドまたはブラウザ URL を通じてインタラクティブなダイアログを表示する。

**Harness での活用**:
- Breezing のバックグラウンド Worker/Reviewer は UI 対話不能なため、`Elicitation` フックで自動スキップを実装
- 通常セッションではそのまま通過（ユーザーが対話で応答）
- Go hookhandler が旧互換ログ `.claude/state/elicitation-events.jsonl` に加えて、`elicitation-event.v1` を `.claude/state/elicitation/events.jsonl` に append-only 記録
- harness-mem が healthy な時だけ `/v1/events/record` へ `event_type: "elicitation_event"` として best-effort 転送し、不達時は local ledger に silent fallback

**制約事項**:
- バックグラウンドエージェントでは elicitation に応答不能（フックによる自動処理が必須）
- MCP サーバー側が elicitation をサポートしている必要がある
- Claude-harness は harness-mem DB を直接読まない

### `Elicitation`/`ElicitationResult` フック

**動作概要**: MCP Elicitation の前後でインターセプト可能な2つの新フックイベント。`Elicitation` はレスポンスが MCP サーバーに返される前に、`ElicitationResult` は返された後に発火する。

**Harness での活用**:
- `Elicitation`: Breezing セッション中の自動スキップ判定 + ログ記録 + `capability_probe` event 記録
- `ElicitationResult`: 結果のログ記録（`.claude/state/elicitation-events.jsonl`）+ `eval_result` event 記録
- hooks.json に両イベントのハンドラを登録

**制約事項**:
- `Elicitation` フックでブロック（deny）するとMCPサーバーへの入力が届かない
- 推奨 timeout: Elicitation 10s / ElicitationResult 5s

### `PostCompact` フック

**動作概要**: コンテキストコンパクション完了後に発火する新フックイベント。`PreCompact` フック（既存）と対になる。

**Harness での活用**:
- コンパクション後のコンテキスト再注入（WIP タスク状態の復元）
- `.claude/state/compaction-events.jsonl` にイベント記録
- 長時間セッションでの状態継続性向上
- PreCompact（状態保存）→ PostCompact（状態復元）の対称構造

**制約事項**:
- 推奨 timeout: 15s
- コンパクション失敗時（circuit breaker 発動時）は PostCompact が発火しない可能性あり

### `-n`/`--name` CLI フラグ

**動作概要**: セッション起動時に表示名を設定する CLI フラグ。`claude -n "auth-refactor"` のように使用し、セッション一覧での識別に活用する。

**Harness での活用**:
- Breezing セッションに `breezing-\{timestamp\}` 形式の名前を自動設定
- セッション一覧でのフィルタリング・追跡に活用
- ログ分析時のセッション特定が容易に

**コード例**:
```bash
claude -n "breezing-$(date +%Y%m%d-%H%M%S)"
```

### `worktree.sparsePaths` 設定

**動作概要**: 大規模モノレポで `claude --worktree` 使用時に、git sparse-checkout を通じて必要なディレクトリのみをチェックアウトする設定。ワークツリー作成のパフォーマンスを大幅に改善する。

**Harness での活用**:
- Breezing の並列 Worker 起動時間を短縮（大規模リポジトリ）
- `.claude/settings.json` で設定:
```json
{
  "worktree": {
    "sparsePaths": ["src/", "tests/", "package.json"]
  }
}
```

**制約事項**:
- sparse-checkout されていないパスのファイルは Worker からアクセス不可
- 依存関係のあるディレクトリはすべて sparsePaths に含める必要がある

### `/effort` スラッシュコマンド

**動作概要**: セッション中に effort レベル（low/medium/high）を切り替えるスラッシュコマンド。`/effort auto` でデフォルトにリセット。

**Harness での活用**:
- harness-work の多要素スコアリングと連携し、タスク複雑度に応じた effort 制御が可能
- 複雑なタスクでは `/effort high`（ultrathink 有効化）を手動で設定可能
- 簡易タスクでは `/effort low` でトークン消費を抑制

### `--worktree` 起動高速化

**動作概要**: git refs の直接読み取りと、リモートブランチが利用可能な場合の冗長な `git fetch` スキップにより、`--worktree` の起動時間を短縮。

**Harness での活用**:
- Breezing の Worker 起動オーバーヘッドが自動的に削減
- 特に多数の Worker を同時起動する場合に恩恵が大きい

### バックグラウンドエージェント部分結果保持

**動作概要**: バックグラウンドエージェントが kill された場合にも、部分的な結果が会話コンテキストに保存される。

**Harness での活用**:
- Breezing の Worker がタイムアウトや手動停止で中断された場合、作業の一部が Lead に伝達される
- Worker の途中成果物を活用した再割り当てが可能に
- 「やり直し」の無駄が削減

### stale worktree 自動クリーンアップ

**動作概要**: 中断された並列実行で残った stale ワークツリーが自動的にクリーンアップされる。

**Harness での活用**:
- `worktree-remove.sh` による手動クリーンアップの補完
- Breezing セッションのクラッシュ後も自動回復
- ディスク容量の無駄な消費を防止

### 自動コンパクション circuit breaker

**動作概要**: 自動コンパクションが連続して失敗した場合、3回で停止するサーキットブレーカーが導入された。無限リトライによるトークン浪費を防止する。

**Harness での活用**:
- Harness の「3回ルール」（CI失敗時の3回制限）と一致する設計思想
- 長時間 Breezing セッションでの予期せぬコスト増加を防止
- circuit breaker 発動時は PostToolUseFailure フックと連携してエスカレーション

### Deferred Tools スキーマ修正

**動作概要**: `ToolSearch` で読み込んだツールがコンパクション後に入力スキーマを失い、配列・数値パラメータが型エラーで拒否される問題を修正。

**Harness での活用**:
- 長時間セッションでの ToolSearch 経由ツールの安定性が向上
- Breezing のコンパクション後もMCPツールが正常に動作

### `/context` コマンド (v2.1.74)

**動作概要**: コンテキスト窓の消費状況を分析し、コンテキストを圧迫しているツールやメモリを特定する。アクション可能な最適化提案（不要な MCP サーバーの切断、肥大化したメモリの整理等）を表示する。

**Harness での活用**:
- 長時間 Breezing セッションでの「なぜコンパクションが頻繁に起きるのか」の原因特定
- 大量の hooks や MCP サーバーが接続された環境でのコンテキスト最適化
- セッション中に `/context` を実行するだけで即座に分析結果が得られる

**制約事項**:
- セッション中のみ利用可能（バッチモードでは非対応）
- サブエージェント内では利用不可

### `maxTurns` エージェント安全制限

**動作概要**: サブエージェントの最大ターン数を制限する frontmatter フィールド。設定ターン数に到達すると、エージェントは自動的に停止して結果を返す。CC 公式ドキュメントで推奨されている安全機構。

**Harness での活用**:
- Worker: `maxTurns: 100` — 複雑な実装タスク向け。十分な余裕を持ちつつ暴走を防止
- Reviewer: `maxTurns: 50` — Read-only 分析に特化。50 ターンで完了しない場合は問題あり
- Scaffolder: `maxTurns: 75` — 足場構築と状態更新の中間的な複雑度

**設計判断**:
- 上限に達した場合、Lead が途中結果を回収して判断可能
- `bypassPermissions` と組み合わせることで、暴走時の安全弁として機能

### `Notification` フック実装

**動作概要**: Claude Code が通知を発行する際に発火するフックイベント。`permission_prompt`（権限確認）、`idle_prompt`（アイドル通知）、`auth_success`（認証成功）等のイベントをインターセプトする。

**Harness での活用**:
- `notification-handler.sh` で全通知イベントを `.claude/state/notification-events.jsonl` にログ記録
- Breezing のバックグラウンド Worker で発生した `permission_prompt` を追跡（事後分析用）
- hooks-editing.md では v3.10.3 からドキュメント化済みだったが、hooks.json への実装が今回完了

**ログ形式**:
```json
{"event":"notification","notification_type":"permission_prompt","session_id":"...","agent_type":"worker","timestamp":"2026-03-15T..."}
```

### Output token limits 64k/128k (v2.1.77)

CC 2.1.77 で Opus 4.6 と Sonnet 4.6 のデフォルト最大出力トークンが 64k に引き上げられ、上限が 128k トークンまで拡張された。

**Harness への影響**:
- 長い実装コードや大規模リファクタリングの出力がトランケートされにくくなった
- Worker エージェントが大量のファイル変更を一度に出力する場合の信頼性が向上
- 128k 出力はコスト増大につながるため、コスト管理にも留意が必要

### `allowRead` sandbox 設定 (v2.1.77)

`sandbox.filesystem.denyRead` で広範囲をブロックしつつ、`allowRead` で特定パスの読み取りを再許可できるようになった。

**Harness での活用**:
- Reviewer エージェントのサンドボックスで `/etc/` を denyRead しつつ、特定の設定ファイルだけ allowRead する
- セキュリティレビュー時に機密ディレクトリの制限付き読み取りアクセスを提供

### PreToolUse `allow` が `deny` を尊重 (v2.1.77)

CC 2.1.77 で PreToolUse フックが `"allow"` を返しても、settings.json の `deny` パーミッションルールが引き続き適用されるようになった。以前はフックの `allow` がグローバル `deny` を上書きしていた。

**Harness への影響**:
- guardrails のセキュリティモデルが強化された
- `deny: ["mcp__codex__*"]` を settings.json に設定すれば、PreToolUse フックの判断に関わらず確実にブロック
- `.claude/rules/codex-cli-only.md` のフックベース MCP ブロックに加え、settings.json deny が推奨パターンに

### Agent `resume` → `SendMessage` (v2.1.77)

CC 2.1.77 で Agent tool の `resume` パラメータが廃止された。停止中のエージェントを再開するには `SendMessage(\{to: agentId\})` を使用する。`SendMessage` は停止中のエージェントを自動でバックグラウンド再開する。

**Harness での影響**:
- `breezing` スキルの Lead が Worker/Reviewer と通信する際は `SendMessage` を使用
- `team-composition.md` の Lead Phase B で `SendMessage` が正式なコミュニケーション手段として記載

### `/branch` (旧 `/fork`) (v2.1.77)

CC 2.1.77 で `/fork` コマンドが `/branch` にリネームされた。`/fork` はエイリアスとして引き続き機能する。

### `claude plugin validate` 強化 (v2.1.77)

CC 2.1.77 で `claude plugin validate` がスキル・エージェント・コマンドの YAML frontmatter と hooks.json の構文を検証するようになった。

**Harness での活用**:
- CI パイプラインに `claude plugin validate` を追加し、frontmatter エラーを早期検出
- `tests/validate-plugin.sh` の補完として活用可能

### `StopFailure` hook event (v2.1.78)

CC 2.1.78 で `StopFailure` イベントが追加された。API エラー（レート制限 429、認証失敗 401 等）でセッション停止が失敗した際に発火する。

**Harness での活用**:
- `stop-failure.sh` ハンドラーでエラー情報を `.claude/state/stop-failures.jsonl` にログ記録
- Breezing の Worker がレート制限で停止失敗した場合の事後分析に使用
- 10 秒タイムアウトの軽量ハンドラーとして実装（復旧処理は不要）

### Hooks conditional `if` field (v2.1.85)

CC 2.1.85 で、hooks 定義に `if` 条件を付けて「どんな入力のときだけ hook を走らせるか」を細かく絞れるようになった。Permission rule syntax を使うので、`Bash(git status*)` のようにツール名と入力パターンをまとめて指定できる。

**Harness での活用**:
- `PermissionRequest` を 2 系統に分割し、`Edit|Write|MultiEdit` は常時評価、`Bash` は安全コマンド候補だけを `if` で事前フィルタする
- `hooks/permission.sh` 自体の安全判定は残しつつ、そもそも不要な Bash permission hook の起動数を減らす
- `MultiEdit` も matcher に含め、core guardrail では対応済みだった自動承認の取りこぼしを hooks 側でもなくした

**ユーザー体験の改善**:
- 今まで: Bash の権限確認は広く hook が走り、最終的にスルーされるケースでも起動コストがかかっていた
- 今後: safe-read / test 系の Bash だけに hook が走るため、応答ノイズと無駄な評価を減らしつつ、自動承認の精度は維持できる

### `${CLAUDE_PLUGIN_DATA}` 変数 (v2.1.78)

CC 2.1.78 で `${CLAUDE_PLUGIN_DATA\}` ディレクトリ変数が追加された。プラグイン更新でも永続するステートストレージとして使用できる。

**Harness での活用余地**:
- 現在は `${CLAUDE_PLUGIN_ROOT}/.claude/state/` を使用しているが、プラグイン更新で消える可能性
- 長期的にはメトリクス・通知ログ等の永続データを `${CLAUDE_PLUGIN_DATA\}` に移行を検討
- 移行パターン: `STATE_DIR="${CLAUDE_PLUGIN_DATA:-${CLAUDE_PLUGIN_ROOT\}/.claude/state\}"`

### Agent frontmatter: `effort`/`maxTurns`/`disallowedTools` (v2.1.78)

CC 2.1.78 でプラグインエージェント定義の frontmatter に `effort`, `maxTurns`, `disallowedTools` が公式サポートされた。

**Harness での現状**:
- `maxTurns`: v3.10.4 で既に実装済み（Worker: 100, Reviewer: 50, Scaffolder: 75）
- `disallowedTools`: Worker は `[Agent]`、Reviewer は `[Write, Edit, Bash, Agent]` で実装済み
- `effort`: 未使用。Worker/Reviewer 定義に `effort` フィールドを追加して、デフォルト thinking レベルを宣言的に制御可能

### `deny: ["mcp__*"]` 修正 (v2.1.78)

CC 2.1.78 で settings.json の `deny` パーミッションルールが MCP サーバーツールに対して正しく機能するように修正された。

**Harness での活用**:
- `.claude/rules/codex-cli-only.md` で推奨している Codex MCP ブロックを、フックベースから settings.json `deny` に移行可能
- `"permissions": \{ "deny": ["mcp__codex__*"] \}` がクリーンなパターン

### `--console` auth フラグ (v2.1.79)

CC 2.1.79 で `claude auth login --console` フラグが追加され、Anthropic Console API 課金での認証に対応。

### SessionEnd hooks `/resume` 修正 (v2.1.79)

CC 2.1.79 で対話的 `/resume` セッション切替時に `SessionEnd` フックが正常に発火するようになった。以前はセッション切替時に SessionEnd が発火しなかったため、cleanup 処理が実行されないケースがあった。

### `PermissionDenied` hook event (v2.1.89)

CC 2.1.89 で auto mode classifier がコマンドを拒否した際に `PermissionDenied` フックが発火するようになった。`\{retry: true\}` を返すとモデルにリトライ可能であることを伝えられる。拒否されたコマンドは `/permissions` → Recent タブにも表示される。

**Harness での活用**:
- `permission-denied-handler.sh` を新規実装し、拒否イベントを `permission-denied.jsonl` に telemetry 記録
- Breezing Worker が拒否された場合、Lead に `systemMessage` で通知し代替アプローチの検討を促す
- `agent_id` / `agent_type` フィールドを活用して、どのエージェントが何を拒否されたかを追跡

**ユーザー体験の改善**:
- 今まで: auto mode の拒否は通知だけで記録に残らず、同じ拒否が繰り返されやすかった
- 今後: 拒否パターンが蓄積され、Breezing では Lead が即座に認知して対応できる

### `"defer"` permission decision (v2.1.89)

CC 2.1.89 で PreToolUse フックから `"defer"` permission decision を返せるようになった。ヘッドレスセッション（`-p` モード）でフックが defer を返すとセッションが一時停止し、`claude -p --resume` で再開時にフックが再評価される。

**Harness での活用余地**:
- Breezing Worker が本番環境への書き込みや外部サービスへのリクエストなど、判断困難な操作に遭遇した際の安全弁
- `pre-tool.sh` の guardrail に「defer 条件」を追加し、特定パターンで Worker を一時停止→Lead が判断
- 現時点では機能の文書化のみ。具体的な defer ルールは運用パターンの蓄積後に設計

### Hook output >50K disk save (v2.1.89)

CC 2.1.89 でフック出力が 50K 文字を超える場合、コンテキストへの直接注入ではなくディスクに保存され、ファイルパス＋プレビューとして参照される。

**Harness への影響**:
- 大量の出力を返す可能性のあるフック（quality-pack, ci-status-checker 等）はこの挙動を前提に設計
- 現状の Harness フックは出力が軽量のため直接影響は小さいが、将来の拡張時の設計制約として文書化

### PreToolUse exit 2 JSON fix (v2.1.90)

CC 2.1.90 で PreToolUse フックが JSON を stdout に出力して exit code 2 で終了する際のブロック動作が修正された。以前はこのパターンでブロックが正しく機能しないバグがあった。

**Harness への影響**:
- `pre-tool.sh` は deny 時に JSON + exit 2 パターンを使用しており、v2.1.90 以降で guardrail の deny がより確実に動作
- 既存のガードレールが「deny を出したのにツールが実行された」ケースがあった場合、このバグが原因だった可能性

### Built-in slash commands を Skill tool から呼ぶ際の Harness 影響 (v2.1.108)

CC 2.1.108 以降、モデルが `Skill` tool を通じて `/init`、`/review`、`/security-review` などの
built-in slash commands を呼び出せるようになった。これにより Harness スキルが CC の組み込み機能を
内部から呼び出す構成が可能になるが、Harness 独自の `/harness-review` との役割重複に注意が必要。
具体的には、`Skill` tool 経由で `/review` を呼び出した場合、Harness の guardrails（R01-R13）が
適用されない CC ネイティブのレビューが実行される。Harness のレビューフローでは
`/harness-review` または `codex-companion.sh review` を経由させることで guardrails の保護と
`review-result.v1` 形式への正規化が維持される。built-in slash command の Skill tool 呼び出しは
軽量な inline レビューや初期化処理に限定し、品質ゲートを要するレビューには使用しない。
