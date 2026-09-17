---
title: "Agent SDK reference - TypeScript"
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
pageSha256: "b645a302561bbc81ad47f296b191849d4a00dfb7b1206632fbe54a917468c7c3"
contentMode: "local-full"
zh: ""
---

# Agent SDK reference - TypeScript

> Complete API reference for the TypeScript Agent SDK, including all functions, types, and interfaces.

&lt;script defer />

## Installation

```bash theme={null}
npm install @anthropic-ai/claude-agent-sdk
```

  The SDK bundles a native Claude Code binary for your platform as an optional dependency such as `@anthropic-ai/claude-agent-sdk-darwin-arm64`. Most installs need no separate Claude Code install. The SDK version tracks the bundled Claude Code version. SDK v0.3.191 bundles Claude Code v2.1.191, so a feature on this page that requires a Claude Code version needs the SDK release with the same patch number or later. If your package manager skips optional dependencies, the SDK throws `Native CLI binary for <platform>-<arch> not found`; set [`pathToClaudeCodeExecutable`](#options) to a separately installed `claude` binary instead.

  If your package manager doesn't apply npm's `libc` field, as Yarn 1.x doesn't, you get both the glibc and musl platform packages on Linux, roughly doubling the install size. On Agent SDK v0.2.141 or later, the SDK still launches the correct variant. To reclaim the space in a container image, delete the platform package that doesn't match the libc where your app runs; for a glibc runtime on x64, that's `rm -rf node_modules/@anthropic-ai/claude-agent-sdk-linux-x64-musl`. On a development machine the deletion is temporary, since Yarn reinstalls the package on the next dependency change.

### Compile to a single executable

When you compile your application into a single-file executable with `bun build --compile`, the SDK cannot resolve the bundled CLI binary at runtime. `require.resolve` does not work inside the compiled executable's `$bunfs` virtual filesystem, so the SDK throws `Native CLI binary for <platform>-<arch> not found`.

To work around this, embed the platform binary as a file asset, extract it to a real path at startup with `extractFromBunfs()`, and pass that path to [`pathToClaudeCodeExecutable`](#options).

The `extractFromBunfs()` helper requires `@anthropic-ai/claude-agent-sdk` v0.3.144 or later. The example below builds for macOS on Apple Silicon:

```typescript theme={null}
import binPath from "@anthropic-ai/claude-agent-sdk-darwin-arm64/claude" with { type: "file" };
import { extractFromBunfs } from "@anthropic-ai/claude-agent-sdk/extract";
import { query } from "@anthropic-ai/claude-agent-sdk";

const cliPath = extractFromBunfs(binPath);

for await (const message of query({
  prompt: "Hello",
  options: { pathToClaudeCodeExecutable: cliPath },
})) {
  console.log(message);
}
```

`extractFromBunfs()` copies the embedded binary out of the compiled executable's virtual filesystem to a per-user temp directory and returns the real path. Outside a compiled executable it returns the input path unchanged, so the same code runs in development without modification.

Each compiled executable embeds a single platform's binary. Match the platform package in the import to your `--target`:

* To cross-compile, install the non-matching platform package, for example `npm install @anthropic-ai/claude-agent-sdk-linux-x64 --force`.
* On Windows, the binary subpath is `claude.exe`, for example `@anthropic-ai/claude-agent-sdk-win32-x64/claude.exe`.

## Functions

### `query()`

The primary function for interacting with Claude Code. Creates an async generator that streams messages as they arrive.

```typescript theme={null}
function query({
  prompt,
  options
}: {
  prompt: string | AsyncIterable<SDKUserMessage>;
  options?: Options;
}): Query;
```

## 本篇目录

- [Parameters](https://code.claude.com/docs)
- [Returns](https://code.claude.com/docs)
- [Parameters](https://code.claude.com/docs)
- [Returns](https://code.claude.com/docs)
- [Example](https://code.claude.com/docs)
- [Parameters](https://code.claude.com/docs)
- [ToolAnnotations](https://code.claude.com/docs)
- [Parameters](https://code.claude.com/docs)
- [Parameters](https://code.claude.com/docs)
- [Return type: SDKSessionInfo](https://code.claude.com/docs)
- [Example](https://code.claude.com/docs)
- [Parameters](https://code.claude.com/docs)
- [Return type: SessionMessage](https://code.claude.com/docs)
- [Example](https://code.claude.com/docs)
- [Parameters](https://code.claude.com/docs)
- [Parameters](https://code.claude.com/docs)
- [Parameters](https://code.claude.com/docs)
- [Parameters](https://code.claude.com/docs)
- [Return type: ResolvedSettings](https://code.claude.com/docs)
- [Example](https://code.claude.com/docs)
- [Handle slow or stalled API responses](https://code.claude.com/docs)
- [Methods](https://code.claude.com/docs)
- [applyFlagSettings()](https://code.claude.com/docs)
- [Methods](https://code.claude.com/docs)
- [Default behavior](https://code.claude.com/docs)
- [Why use settingSources](https://code.claude.com/docs)
- [Settings precedence](https://code.claude.com/docs)
- [McpStdioServerConfig](https://code.claude.com/docs)
- [McpSSEServerConfig](https://code.claude.com/docs)
- [McpHttpServerConfig](https://code.claude.com/docs)
- [McpSdkServerConfigWithInstance](https://code.claude.com/docs)
- [McpClaudeAIProxyServerConfig](https://code.claude.com/docs)
- [usermessageuuid](https://code.claude.com/docs)
- [usermessageuuids](https://code.claude.com/docs)
- [queuedturncount](https://code.claude.com/docs)
- [PreToolUseHookInput](https://code.claude.com/docs)
- [PostToolUseHookInput](https://code.claude.com/docs)
- [PostToolUseFailureHookInput](https://code.claude.com/docs)
- [PostToolBatchHookInput](https://code.claude.com/docs)
- [PermissionDeniedHookInput](https://code.claude.com/docs)
- [NotificationHookInput](https://code.claude.com/docs)
- [UserPromptSubmitHookInput](https://code.claude.com/docs)
- [UserPromptExpansionHookInput](https://code.claude.com/docs)
- [SessionStartHookInput](https://code.claude.com/docs)
- [SessionEndHookInput](https://code.claude.com/docs)
- [StopHookInput](https://code.claude.com/docs)
- [StopFailureHookInput](https://code.claude.com/docs)
- [SubagentStartHookInput](https://code.claude.com/docs)
- [SubagentStopHookInput](https://code.claude.com/docs)
- [PreCompactHookInput](https://code.claude.com/docs)
- [PostCompactHookInput](https://code.claude.com/docs)
- [PreModelSwitchHookInput](https://code.claude.com/docs)
- [PostModelSwitchHookInput](https://code.claude.com/docs)
- [PermissionRequestHookInput](https://code.claude.com/docs)
- [SetupHookInput](https://code.claude.com/docs)
- [TeammateIdleHookInput](https://code.claude.com/docs)
- [TaskCreatedHookInput](https://code.claude.com/docs)
- [TaskCompletedHookInput](https://code.claude.com/docs)
- [ElicitationHookInput](https://code.claude.com/docs)
- [ElicitationResultHookInput](https://code.claude.com/docs)
- [ConfigChangeHookInput](https://code.claude.com/docs)
- [InstructionsLoadedHookInput](https://code.claude.com/docs)
- [DirectoryAddedHookInput](https://code.claude.com/docs)
- [WorktreeCreateHookInput](https://code.claude.com/docs)
- [WorktreeRemoveHookInput](https://code.claude.com/docs)
- [CwdChangedHookInput](https://code.claude.com/docs)
- [FileChangedHookInput](https://code.claude.com/docs)
- [MessageDisplayHookInput](https://code.claude.com/docs)
- [AsyncHookJSONOutput](https://code.claude.com/docs)
- [SyncHookJSONOutput](https://code.claude.com/docs)
- [Example usage](https://code.claude.com/docs)
