---
title: "claude-code-docs-official"
sourceId: "09-harness/claude-code-docs-official"
sourceTitle: "claude-code-docs-official"
sourceKind: "官方文档"
licenseLabel: "仅引用"
lang: "英文"
tier: 3
volume: "09-harness"
sourceUrl: "https://code.claude.com/docs"
entryUrl: "https://code.claude.com/docs"
sourceRel: "en/agent-sdk/typescript.md"
rawUrl: "/raw/09-harness/claude-code-docs-official/en/agent-sdk/typescript.md"
sourceSha256: "305f751e4d47db29303c15a79aa95777deff6625785b12533072bc0548010547"
pageSha256: "27960e7f0ca158023095c5aa4316cbba35d67db7c8c6833eae86a843571568b0"
contentMode: "local-full"
zh: ""
---

#### Handle slow or stalled API responses

The CLI subprocess reads several environment variables that control API timeouts and stall detection. Pass them through the `env` option:

```typescript theme={null}
import { query } from "@anthropic-ai/claude-agent-sdk";

const result = query({
  prompt: "Analyze this code",
  options: {
    env: {
      ...process.env,
      API_TIMEOUT_MS: "120000",
      CLAUDE_CODE_MAX_RETRIES: "2",
      CLAUDE_ASYNC_AGENT_STALL_TIMEOUT_MS: "120000",
    },
  },
});
```

* `API_TIMEOUT_MS`: per-request timeout on the Anthropic client, in milliseconds. Default `600000`. Applies to the main loop and all subagents.
* `CLAUDE_CODE_MAX_RETRIES`: maximum API retries. Default `10`, capped at `15`. Each retry gets its own `API_TIMEOUT_MS` window, so worst-case wall time is roughly `API_TIMEOUT_MS × (CLAUDE_CODE_MAX_RETRIES + 1)` plus backoff. For unattended runs that need to wait through longer outages, set [`CLAUDE_CODE_RETRY_WATCHDOG=1`](https://code.claude.com/docs/en/errors#tune-retry-behavior): it retries transient capacity errors indefinitely and, on Claude Code v2.1.199 or later, raises the default for other transient errors to `300` and removes the cap on this variable.
* `CLAUDE_ASYNC_AGENT_STALL_TIMEOUT_MS`: stall watchdog for subagents. While the stream watchdog is on, the default is `CLAUDE_STREAM_IDLE_TIMEOUT_MS` plus 5 minutes, which comes to `600000` unless you raise that variable. With the stream watchdog off, the default is `600000`. Before v2.1.257, the default was always `600000`.

  The timer resets on each stream event. On a stall, Claude Code aborts the subagent and reports the stall to the parent. For a background subagent, it also marks the task failed and attaches any partial result.
* `CLAUDE_ENABLE_STREAM_WATCHDOG` with `CLAUDE_STREAM_IDLE_TIMEOUT_MS`: stream watchdog that aborts the request when headers have arrived but the response body stops streaming. The watchdog is on by default for all providers; set `CLAUDE_ENABLE_STREAM_WATCHDOG=0` to disable it. `CLAUDE_STREAM_IDLE_TIMEOUT_MS` defaults to `300000` and is clamped to that minimum. After the abort, [Automatic retries](https://code.claude.com/docs/en/errors#automatic-retries) covers what Claude Code does, based on how far the response had progressed.

  While the watchdog waits out a response that a gateway behind `ANTHROPIC_BASE_URL` holds open with keep-alive pings, a host that sets `includePartialMessages` keeps receiving `ping` [stream events](#sdkpartialassistantmessage), so read those frames as liveness rather than timing the session out on silence. Before v2.1.257, the frames stopped 5 minutes after the last real stream event.

### `Query` object

Interface returned by the `query()` function.

```typescript theme={null}
interface Query extends AsyncGenerator<SDKMessage, void> {
  interrupt(): Promise<SDKControlInterruptResponse | undefined>;
  rewindFiles(
    userMessageId: string,
    options?: { dryRun?: boolean }
  ): Promise<RewindFilesResult>;
  setPermissionMode(mode: PermissionMode): Promise<void>;
  setModel(model?: string): Promise<void>;
  setMaxThinkingTokens(maxThinkingTokens: number | null): Promise<void>;
  applyFlagSettings(settings: {
    [K in keyof Settings]?: K extends 'effortLevel'
      ? 'low' | 'medium' | 'high' | 'xhigh' | 'max' | null
      : Settings[K] | null;
  }): Promise<void>;
  updateSettings(
    source: 'localSettings',
    settings: Record<string, unknown>,
  ): Promise<void>;
  initializationResult(): Promise<SDKControlInitializeResponse>;
  reinitialize(): Promise<SDKControlInitializeResponse>;
  supportedCommands(): Promise<SlashCommand[]>;
  supportedModels(): Promise<ModelInfo[]>;
  supportedAgents(): Promise<AgentInfo[]>;
  mcpServerStatus(): Promise<McpServerStatus[]>;
  getContextUsage(opts?: {
    detail?: 'summary' | 'full';
  }): Promise<SDKControlGetContextUsageResponse>;
  readFile(
    path: string,
    options?: { maxBytes?: number; encoding?: 'utf-8' | 'base64' }
  ): Promise<SDKControlReadFileResponse | null>;
  reloadSkills(): Promise<SDKControlReloadSkillsResponse>;
  accountInfo(): Promise<AccountInfo>;
  reconnectMcpServer(serverName: string): Promise<void>;
  toggleMcpServer(serverName: string, enabled: boolean): Promise<void>;
  setMcpServers(servers: Record<string, McpServerConfig>): Promise<McpSetServersResult>;
  streamInput(stream: AsyncIterable<SDKUserMessage>): Promise<void>;
  stopTask(taskId: string): Promise<void>;
  close(): void;
}
```
