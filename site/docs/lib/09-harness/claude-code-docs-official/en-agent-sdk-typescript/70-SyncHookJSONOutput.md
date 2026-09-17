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
pageSha256: "7ed2b6345bd8dc581d8224987d476cc628bb1c99d403f9f62f6a081dbb152182"
contentMode: "local-full"
zh: ""
---

#### `SyncHookJSONOutput`

```typescript theme={null}
type SyncHookJSONOutput = {
  continue?: boolean;
  suppressOutput?: boolean;
  stopReason?: string;
  decision?: "approve" | "block";
  systemMessage?: string;
  /**
   * A terminal escape sequence (e.g. OSC 9 / OSC 777 desktop-notification)
   * for Claude Code to emit on your behalf. Only notification/title OSCs
   * (0, 1, 2, 9, 99, 777) and BEL are permitted; a value containing
   * anything else is ignored as a whole. Only the interactive CLI emits
   * it; the SDK ignores the field.
   */
  terminalSequence?: string;
  reason?: string;
  hookSpecificOutput?:
    | {
        hookEventName: "PreToolUse";
        permissionDecision?: "allow" | "deny" | "ask" | "defer";
        permissionDecisionReason?: string;
        updatedInput?: Record<string, unknown>;
        additionalContext?: string;
      }
    | {
        hookEventName: "UserPromptSubmit";
        additionalContext?: string;
        sessionTitle?: string;
        /** When decision is "block", omit the original prompt from the block message. */
        suppressOriginalPrompt?: boolean;
      }
    | {
        hookEventName: "UserPromptExpansion";
        additionalContext?: string;
      }
    | {
        hookEventName: "SessionStart";
        additionalContext?: string;
        initialUserMessage?: string;
        sessionTitle?: string;
        watchPaths?: string[];
        /**
         * Re-scan skill and command directories after SessionStart hooks
         * complete, so skills installed by the hook are available in the
         * same session.
         */
        reloadSkills?: boolean;
      }
    | {
        hookEventName: "Setup";
        additionalContext?: string;
      }
    | {
        hookEventName: "PreModelSwitch";
        /**
         * Same contract as PreToolUse: "allow" proceeds, "deny" cancels
         * the switch, "ask" asks the user to confirm. Only /model in an
         * interactive session shows that prompt; every other surface,
         * set_model requests included, treats "ask" as a refusal.
         */
        permissionDecision?: "allow" | "deny" | "ask";
        permissionDecisionReason?: string;
      }
    | {
        hookEventName: "PostModelSwitch";
        /** Reaches the model with the next request the new model serves. */
        additionalContext?: string;
      }
    | {
        hookEventName: "SubagentStart";
        additionalContext?: string;
      }
    | {
        hookEventName: "PostToolUse";
        additionalContext?: string;
        /**
         * Short note about this tool call's result for the auto mode
         * permission classifier. Capped at 2000 characters, shared across
         * all hooks that respond to the same call; honored on synchronous
         * hook responses only. Don't copy untrusted tool output into it.
         */
        classifierContext?: string;
        updatedToolOutput?: unknown;
        /** @deprecated Use `updatedToolOutput`, which works for all tools. */
        updatedMCPToolOutput?: unknown;
      }
    | {
        hookEventName: "PostToolUseFailure";
        additionalContext?: string;
      }
    | {
        hookEventName: "PostToolBatch";
        additionalContext?: string;
      }
    | {
        hookEventName: "Stop";
        additionalContext?: string;
      }
    | {
        hookEventName: "SubagentStop";
        additionalContext?: string;
      }
    | {
        hookEventName: "PermissionDenied";
        retry?: boolean;
      }
    | {
        hookEventName: "Notification";
        additionalContext?: string;
      }
    | {
        hookEventName: "PermissionRequest";
        decision:
          | {
              behavior: "allow";
              updatedInput?: Record<string, unknown>;
              updatedPermissions?: PermissionUpdate[];
            }
          | {
              behavior: "deny";
              message?: string;
              interrupt?: boolean;
            };
      }
    | {
        hookEventName: "Elicitation";
        action?: "accept" | "decline" | "cancel";
        content?: Record<string, unknown>;
      }
    | {
        hookEventName: "ElicitationResult";
        action?: "accept" | "decline" | "cancel";
        content?: Record<string, unknown>;
      }
    | {
        hookEventName: "CwdChanged";
        watchPaths?: string[];
      }
    | {
        hookEventName: "FileChanged";
        watchPaths?: string[];
      }
    | {
        hookEventName: "WorktreeCreate";
        worktreePath: string;
      }
    | {
        hookEventName: "MessageDisplay";
        /** Text displayed in place of the delta. Omit (or return the delta unchanged) to display the original. */
        displayContent?: string;
      };
};
```

## Tool Input Types

Documentation of input schemas for all built-in Claude Code tools. These types are exported from `@anthropic-ai/claude-agent-sdk` and can be used for type-safe tool interactions.

### `ToolInputSchemas`

Union of tool input types exported from `@anthropic-ai/claude-agent-sdk`; members include:

```typescript theme={null}
type ToolInputSchemas =
  | AgentInput
  | ArtifactInput
  | AskUserQuestionInput
  | BashInput
  | CronCreateInput
  | CronDeleteInput
  | CronListInput
  | EnterPlanModeInput
  | EnterWorktreeInput
  | ExitPlanModeInput
  | ExitWorktreeInput
  | FileEditInput
  | FileReadInput
  | FileWriteInput
  | GlobInput
  | GrepInput
  | ListMcpResourcesInput
  | McpInput
  | MonitorInput
  | NotebookEditInput
  | ProjectsInput
  | PushNotificationInput
  | ReadMcpResourceDirInput
  | ReadMcpResourceInput
  | RefreshMcpToolsInput
  | RemoteTriggerInput
  | REPLInput
  | ReportFindingsInput
  | ScheduleWakeupInput
  | ShowOnboardingRolePickerInput
  | TaskCreateInput
  | TaskGetInput
  | TaskListInput
  | TaskOutputInput
  | TaskStopInput
  | TaskUpdateInput
  | TodoWriteInput
  | WebFetchInput
  | WebSearchInput
  | WorkflowInput;
```

### Agent

**Tool name:** `Agent`. The previous name `Task` is still accepted as an alias, and the `tools` array in the [`SDKSystemMessage`](#sdksystemmessage) init message currently lists this tool as `Task` for backward compatibility.

  The `mode` field is deprecated and ignored on Claude Code v2.1.212 or later. A subagent runs in either the parent session's permission mode or its definition's [`permissionMode`](#agentdefinition), and the [subagent inheritance rules](https://code.claude.com/docs/en/agent-sdk/permissions#available-modes) decide which.

```typescript theme={null}
type AgentInput = {
  description: string;
  prompt: string;
  subagent_type?: string;
  model?: "sonnet" | "opus" | "haiku" | "fable";
  run_in_background?: boolean;
  name?: string;
  team_name?: string; // Deprecated; ignored
  mode?: "acceptEdits" | "auto" | "bypassPermissions" | "default" | "dontAsk" | "plan"; // Deprecated; ignored. The subagent inheritance rules decide a subagent's permission mode
  isolation?: "worktree" | "remote";
};
```

Launches a new agent to handle complex, multi-step tasks autonomously.

### AskUserQuestion

**Tool name:** `AskUserQuestion`

```typescript theme={null}
type AskUserQuestionInput = {
  questions: Array<{
    question: string;
    header: string;
    options: Array<{ label: string; description: string; preview?: string }>;
    multiSelect: boolean;
  }>;
  answers?: Record<string, string>;
  annotations?: Record<string, { preview?: string; notes?: string }>;
  metadata?: { source?: string };
};
```

Asks the user clarifying questions during execution. See [Handle approvals and user input](https://code.claude.com/docs/en/agent-sdk/user-input#handle-clarifying-questions) for usage details.

### Bash

**Tool name:** `Bash`

```typescript theme={null}
type BashInput = {
  command: string;
  timeout?: number; // milliseconds, max 600000; higher values are clamped to the max
  description?: string;
  run_in_background?: boolean;
  dangerouslyDisableSandbox?: boolean;
};
```

Executes Bash commands with optional timeout and background execution. The working directory persists between commands, including commands run in later turns of a multi-turn session; shell state such as exported environment variables doesn't. For the limits on which directory changes carry over, see [What persists between commands](https://code.claude.com/docs/en/tools-reference#what-persists-between-commands).

### Monitor

**Tool name:** `Monitor`

```typescript theme={null}
type MonitorInput = {
  command?: string;
  ws?: {
    url: string;
    protocols?: string[];
  };
  description: string;
  timeout_ms: number;
  persistent: boolean;
};
```

Runs a background source and delivers each event to Claude so it can react without polling: `command` runs a script and emits one event per stdout line, and `ws` opens a WebSocket and emits one event per text frame. Provide exactly one of `command` or `ws`. The `ws` source requires Claude Code v2.1.195 or later.

Set `persistent: true` for session-length watches such as log tails. When Monitor runs a command, it follows the same permission rules as Bash; a WebSocket watch prompts for approval separately. See the [Monitor tool reference](https://code.claude.com/docs/en/tools-reference#monitor-tool) for behavior and provider availability. The exported type marks `timeout_ms` and `persistent` as required because the schema fills in their defaults, 300000 and `false`; a call that omits them validates.

### TaskOutput

**Tool name:** `TaskOutput`

&lt;Note>`TaskOutput` is deprecated; prefer `Read` on the task's output file path. The schemas below remain valid for hooks and permission handlers that encounter the tool.&lt;/Note>

```typescript theme={null}
type TaskOutputInput = {
  task_id: string;
  block: boolean;
  timeout: number;
};
```

Retrieves output from a running or completed background task.

### Edit

**Tool name:** `Edit`

```typescript theme={null}
type FileEditInput = {
  file_path: string;
  old_string: string;
  new_string: string;
  replace_all?: boolean;
};
```

Performs exact string replacements in files.

### Read

**Tool name:** `Read`

```typescript theme={null}
type FileReadInput = {
  file_path: string;
  offset?: number;
  limit?: number;
  pages?: string;
};
```

Reads files from the local filesystem, including text, images, PDFs, and Jupyter notebooks. Use `pages` for PDF page ranges (for example, `"1-5"`).

For a PDF, Claude receives the file's contents inside the Read call's `tool_result` content. A read that returns the `pdf` [output](#tool-output-types) carries a summary `text` block followed by a `document` block. One that returns the `parts` output carries the summary `text` block followed by one block per extracted page: an `image` block, or a `text` block naming the page when Claude Code couldn't render it as an image. Before Agent SDK v0.3.242, Claude Code delivered the file's contents as a separate `user` message after the tool result.

### Write

**Tool name:** `Write`

```typescript theme={null}
type FileWriteInput = {
  file_path: string;
  content: string;
};
```

Writes a file to the local filesystem, overwriting if it exists.

### Glob

**Tool name:** `Glob`

```typescript theme={null}
type GlobInput = {
  pattern: string;
  path?: string;
};
```

Fast file pattern matching that works with any codebase size.

### Grep

**Tool name:** `Grep`

```typescript theme={null}
type GrepInput = {
  pattern: string;
  path?: string;
  glob?: string;
  type?: string;
  output_mode?: "content" | "files_with_matches" | "count";
  "-i"?: boolean;
  "-o"?: boolean; // print only the matched parts of each line; requires output_mode: "content"
  "-n"?: boolean;
  "-B"?: number;
  "-A"?: number;
  "-C"?: number;
  context?: number;
  head_limit?: number;
  offset?: number;
  multiline?: boolean;
};
```

Powerful search tool built on ripgrep with regex support.

### TaskStop

**Tool name:** `TaskStop`

```typescript theme={null}
type TaskStopInput = {
  task_id?: string;
  shell_id?: string; // Deprecated: use task_id
};
```

Stops a running background task or shell by ID. As of v2.1.198, `task_id` also accepts an agent-team teammate or a named background agent by agent ID or name.

### NotebookEdit

**Tool name:** `NotebookEdit`

```typescript theme={null}
type NotebookEditInput = {
  notebook_path: string;
  cell_id?: string;
  new_source: string;
  cell_type?: "code" | "markdown";
  edit_mode?: "replace" | "insert" | "delete";
};
```

Edits cells in Jupyter notebook files.

### WebFetch

**Tool name:** `WebFetch`

```typescript theme={null}
type WebFetchInput = {
  url: string;
  prompt: string;
};
```

Fetches content from a URL and processes it with an AI model.

### WebSearch

**Tool name:** `WebSearch`

```typescript theme={null}
type WebSearchInput = {
  query: string;
  allowed_domains?: string[];
  blocked_domains?: string[];
};
```

Searches the web and returns formatted results.

### Workflow

**Tool name:** `Workflow`

```typescript theme={null}
type WorkflowInput = {
  script?: string;
  name?: string;
  scriptPath?: string;
  args?: unknown; // any JSON value; the published typings render this as an object map
  resumeFromRunId?: string;
  title?: string; // ignored; the script's meta block sets the title
  description?: string; // ignored; the script's meta block sets the description
};
```

Runs a [dynamic workflow](https://code.claude.com/docs/en/workflows): a script that orchestrates many subagents in the background and returns one consolidated result. The `Workflow` tool is available in Agent SDK v0.3.149 and later. At least one of `script`, `name`, or `scriptPath` is required.

| Field             | Type      | Description                                                                                                                                                                                                                                                                          |
| ----------------- | --------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `script`          | `string`  | Inline workflow script. Must begin with `export const meta = \{ name, description \}` as a literal, followed by the script body using `agent()`, `parallel()`, `pipeline()`, and `phase()`. An optional `phases` array in `meta` groups agents under named stages in the progress view |
| `name`            | `string`  | Name of a built-in workflow or one saved in `.claude/workflows/`. Resolved to a script                                                                                                                                                                                               |
| `scriptPath`      | `string`  | Path to a workflow script file on disk. Takes precedence over `script` and `name`. Claude Code persists every invocation's script and returns the path in the result, so you can edit that file and re-invoke with the same `scriptPath` to iterate                                  |
| `args`            | `unknown` | Input value exposed to the script as the global `args`, for parameterized named workflows such as a research question or a list of file paths. Pass arrays and objects as actual JSON values, not as a JSON-encoded string                                                           |
| `resumeFromRunId` | `string`  | Run ID of a prior `Workflow` invocation to resume. Completed `agent()` calls with unchanged inputs usually return cached results; the rest run live. [Resume after a pause](https://code.claude.com/docs/en/workflows#resume-after-a-pause) covers which completed calls re-run. Same session only               |
| `title`           | `string`  | Ignored; the script's `meta` block sets the title                                                                                                                                                                                                                                    |
| `description`     | `string`  | Ignored; the script's `meta` block sets the description                                                                                                                                                                                                                              |

### TodoWrite

**Tool name:** `TodoWrite`

```typescript theme={null}
type TodoWriteInput = {
  todos: Array<{
    content: string;
    status: "pending" | "in_progress" | "completed";
    activeForm: string;
  }>;
};
```

Creates and manages a structured task list for tracking progress.

  The following tools are available by default only on Claude 3.x models, Opus 4 through 4.7, Sonnet 4 through 4.6, and Haiku 4.5. On every other model, including model IDs Claude Code doesn't recognize, they aren't available unless you opt in:

  * `TodoWrite`
  * `TaskCreate`
  * `TaskGet`
  * `TaskUpdate`
  * `TaskList`

  Wherever the tools are available, Claude Code provides the four Task tools, or `TodoWrite` instead when you set `CLAUDE_CODE_ENABLE_TASKS=0`.

  This default set applies in Claude Code v2.1.268 and later, which the TypeScript Agent SDK bundles from v0.3.268.

  See [Model availability](https://code.claude.com/docs/en/agent-sdk/todo-tracking#model-availability) to opt in.

### TaskCreate

**Tool name:** `TaskCreate`

```typescript theme={null}
type TaskCreateInput = {
  subject: string;
  description: string;
  activeForm?: string;
  metadata?: Record<string, unknown>;
};
```

Creates a single task and returns its assigned ID.

### TaskUpdate

**Tool name:** `TaskUpdate`

```typescript theme={null}
type TaskUpdateInput = {
  taskId: string;
  status?: "pending" | "in_progress" | "completed" | "deleted";
  subject?: string;
  description?: string;
  activeForm?: string;
  addBlocks?: string[];
  addBlockedBy?: string[];
  owner?: string;
  metadata?: Record<string, unknown>;
};
```

Patches one task by ID. Set `status` to `"deleted"` to remove it.

### TaskGet

**Tool name:** `TaskGet`

```typescript theme={null}
type TaskGetInput = {
  taskId: string;
};
```

Returns full details for one task, or `null` when the ID is not found.

### TaskList

**Tool name:** `TaskList`

```typescript theme={null}
type TaskListInput = {};
```

Returns a snapshot of all tasks in the current list.

### ExitPlanMode

**Tool name:** `ExitPlanMode`

```typescript theme={null}
type ExitPlanModeInput = {
  /** Deprecated: no longer used. */
  allowedPrompts?: Array<{
    tool: "Bash";
    prompt: string;
  }>;
  [k: string]: unknown;
};
```

Exits plan mode. The `allowedPrompts` field is deprecated and ignored; Claude Code still accepts it so existing callers and transcripts validate. Before v2.1.205, it requested prompt-based Bash permissions for implementing the plan.

### ListMcpResources

**Tool name:** `ListMcpResourcesTool`

```typescript theme={null}
type ListMcpResourcesInput = {
  server?: string;
};
```

Lists available MCP resources from connected servers.

### ReadMcpResource

**Tool name:** `ReadMcpResourceTool`

```typescript theme={null}
type ReadMcpResourceInput = {
  server: string;
  uri: string;
};
```

Reads a specific MCP resource from a server.

### EnterWorktree

**Tool name:** `EnterWorktree`

```typescript theme={null}
type EnterWorktreeInput = {
  name?: string;
  path?: string;
};
```

Creates and enters a temporary git worktree for isolated work. Pass `path` to switch into an existing worktree instead of creating a new one. On first entry the target must be a registered worktree of the current repository or, in a multi-repo workspace, of a repository nested inside it; from within a worktree session it must be under `.claude/worktrees/` of the session's repository. `name` and `path` are mutually exclusive.

### ExitWorktree

**Tool name:** `ExitWorktree`

```typescript theme={null}
type ExitWorktreeInput = {
  action: "keep" | "remove";
  discard_changes?: boolean;
};
```

Exits the current git worktree and returns to the original working directory. The `keep` action leaves the worktree and branch on disk, while `remove` deletes both. `discard_changes` must be `true` when removing a worktree that has uncommitted files or unmerged commits.

### EnterPlanMode

**Tool name:** `EnterPlanMode`

```typescript theme={null}
type EnterPlanModeInput = {};
```

Enters plan mode, where Claude researches and presents a plan before making changes.

### CronCreate

**Tool name:** `CronCreate`

```typescript theme={null}
type CronCreateInput = {
  cron: string;
  prompt: string;
  recurring?: boolean;
  durable?: boolean;
};
```

Schedules a prompt to run on a 5-field cron schedule in local time. Set `recurring` to `false` to fire once at the next match. Jobs are session-scoped by default: starting a fresh conversation clears them, and resuming with `--resume` or `--continue` restores jobs that haven't expired. See [Scheduled tasks](https://code.claude.com/docs/en/scheduled-tasks).

Setting `durable` to `true` requests persistence to `.claude/scheduled_tasks.json` so the job survives restarts. Durable scheduling isn't available in every session: when it isn't, Claude Code accepts `durable: true` but creates the job session-only. Read the output's `durable` field to see whether the job persisted.

### CronDelete

**Tool name:** `CronDelete`

```typescript theme={null}
type CronDeleteInput = {
  id: string;
};
```

Deletes a scheduled cron job by the ID returned from `CronCreate`.

### CronList

**Tool name:** `CronList`

```typescript theme={null}
type CronListInput = {};
```

Lists the scheduled cron jobs: durable jobs from `.claude/scheduled_tasks.json` and session-only jobs from the current session.

### ScheduleWakeup

**Tool name:** `ScheduleWakeup`

```typescript theme={null}
type ScheduleWakeupInput = {
  delaySeconds?: number;
  reason?: string;
  prompt?: string;
  noop?: boolean;
  stop?: boolean;
};
```

Schedules a one-shot wake-up that fires the given prompt after a delay. This tool backs the self-paced `/loop` command. The runtime clamps `delaySeconds` to between 60 and 3600 seconds. The `delaySeconds`, `reason`, `prompt`, and `noop` fields are required unless `stop` is true. `noop: true` reports a wake-up where nothing changed. Setting `stop: true` cancels the pending wakeup and ends the self-paced `/loop`. The `stop` field requires Claude Code v2.1.202 or later. See the [ScheduleWakeup row in the tools reference](https://code.claude.com/docs/en/tools-reference).

### RemoteTrigger

**Tool name:** `RemoteTrigger`

```typescript theme={null}
type RemoteTriggerInput = {
  action:
    | "list"
    | "get"
    | "create"
    | "update"
    | "run"
    | "create_webhook_trigger"
    | "list_runs"
    | "get_run_log";
  trigger_id?: string;
  session_id?: string;
  cursor?: string;
  body?: {
    [k: string]: unknown;
  };
};
```

Manages [Routines](https://code.claude.com/docs/en/routines), the scheduled and triggered Claude Code runs hosted in the cloud. This tool backs the `/schedule` command. `trigger_id` is required for the `get`, `update`, `run`, and `list_runs` actions. `body` is required for `create`, `update`, and `create_webhook_trigger`, and optional for `run`.

`create_webhook_trigger` attaches an event source to an existing routine, such as a [GitHub event](https://code.claude.com/docs/en/routines#add-a-github-trigger) that fires it. The `body` names the source, the events, and the routine to fire. Requires Claude Code v2.1.225 or later.

`list_runs` lists a routine's recent runs, and `get_run_log` reads one run's log. `session_id` names the run to read, from a `list_runs` result, and `cursor` pages through either action's results. Both actions require Claude Code v2.1.227 or later.

This tool is available only when the session is authenticated with a claude.ai account on a plan with Routines enabled, and is absent when your organization's policy disables [Claude Code on the web](https://code.claude.com/docs/en/claude-code-on-the-web). On Claude Code v2.1.227 or later, the tool is also absent when an Owner has [turned off routines for the organization](https://code.claude.com/docs/en/routines#routines-are-disabled-by-your-organizations-policy). Before v2.1.227, a session with only the routines toggle turned off still showed the tool, and the server denied its calls.

### PushNotification

**Tool name:** `PushNotification`

```typescript theme={null}
type PushNotificationInput = {
  message: string;
  status: "proactive";
};
```

Sends a proactive push notification to the user. Keep `message` under 200 characters because mobile operating systems truncate longer text. See the [PushNotification row in the tools reference](https://code.claude.com/docs/en/tools-reference) for provider availability; push delivery runs through Anthropic-hosted infrastructure that isn't accessible from Amazon Bedrock, Claude Platform on AWS, Google Cloud's Agent Platform, or Microsoft Foundry.

### REPL

**Tool name:** `REPL`

```typescript theme={null}
type REPLInput = {
  code: string;
  description?: string;
  timeout?: number;
};
```

Executes JavaScript code in a persistent REPL. State persists across calls and top-level await is supported. `timeout` is in milliseconds, with a default of 30000 and a maximum of 600000.

The types are exported, but the tool is off in SDK sessions unless you set `CLAUDE_CODE_REPL=1` in the [`env` option](#options). It also requires the Bun-based `claude` executable that the native installer provides.

### ReportFindings

**Tool name:** `ReportFindings`

```typescript theme={null}
type ReportFindingsInput = {
  level?: "low" | "medium" | "high" | "xhigh" | "max";
  findings: Array<{
    file: string;
    line?: number;
    summary: string;
    failure_scenario: string;
    short_summary?: string;
    category?: string;
    verdict?: "CONFIRMED" | "PLAUSIBLE";
    outcome?: "fixed" | "skipped" | "no_change_needed";
  }>;
};
```

Reports code-review findings as a structured list so Claude Code can render them instead of printing them as text. `level` is the effort level the review ran at. Findings are ordered most-severe first, with at most 32 per call, and the array is empty when none survived. Requires Claude Code v2.1.196 or later.

Each finding carries these fields:

* `file`: repo-relative path the finding is in. The optional `line` is the 1-indexed line it anchors to.
* `summary`: one-sentence statement of the defect. `failure_scenario` describes the concrete inputs and state that lead to the wrong output or crash.
* `short_summary`: optional compressed label of at most 60 characters for compact display. Requires Claude Code v2.1.212 or later.
* `category`: optional short kebab-case slug of the finding type, such as `correctness` or `test-coverage`. Requires Claude Code v2.1.199 or later.
* `verdict`: set when a verify pass ran; absent on inline-only reviews.
* `outcome`: set only when re-reporting after applying fixes.

### Artifact

**Tool name:** `Artifact`

```typescript theme={null}
type ArtifactInput = {
  action?: "publish" | "list";
  file_path?: string;
  favicon?: string;
  limit?: number;
  scope?: "mine" | "shared" | "all";
  title?: string;
  description?: string;
  label?: string;
  url?: string;
  force?: boolean;
  capabilities?: Record<string, unknown>;
  contract?: "latest" | string;
};
```

Publishes a local `.html` or `.md` file as a hosted artifact page, or lists the user's published artifacts. Omit `action` or pass `"publish"` to publish `file_path`, which is required for the publish action along with `favicon`, one or two emoji that mark the artifact in the user's gallery. `title` names the published page in the browser tab and gallery when the HTML file has no `<title>` tag. `url` targets an existing artifact to update in place instead of minting a new one.

`force` is a last-resort overwrite that discards a newer version another session published. On a conflict, the failed publish returns the newer content; Claude merges its changes onto that content, or re-reads the artifact, and publishes again. Pass `force` only when the user explicitly asks to discard that version.

Pass `"list"` to enumerate the user's published artifacts; only `limit` and `scope` may accompany it. `scope` defaults to `"mine"`, which lists artifacts the user owns; `"shared"` lists artifacts other people shared with the user, and `"all"` lists both.

* `capabilities`: the runtime capabilities the published page uses, keyed by capability name, such as the [connectors the page may call](https://code.claude.com/docs/en/artifacts#pull-live-data-with-mcp-connectors). The artifact service validates the declaration and rejects a publish that names a capability the account can't use or gives one an invalid config. Pass `\{\}` to clear a stored declaration, and omit the field on a redeploy to keep it. Requires Agent SDK v0.3.235 or later.
* `contract`: the runtime version the published page runs against. Omit it to keep the artifact's current version, pass `"latest"` to upgrade, or pass a specific version to pin or roll back. Requires Agent SDK v0.3.235 or later.

The types are exported, but the tool is off by default in Agent SDK sessions. Publishing also requires every condition in the [artifacts availability table](https://code.claude.com/docs/en/artifacts#availability), which sessions authenticated with an API key don't meet.

### Projects

**Tool name:** `Projects`

```typescript theme={null}
type ProjectsInput = {
  method:
    | "project_info"
    | "project_read"
    | "project_search"
    | "project_write"
    | "project_delete";
  path?: string;
  content?: string;
  local_path?: string;
  present_to_user?: boolean;
  query?: string;
  n?: number;
};
```

Reads and writes the claude.ai Project attached to the session. Dispatches on `method`:

* `project_info`: returns project metadata and the doc list.
* `project_read`: reads one doc by `path`.
* `project_search`: queries the project's knowledge base with `query`. `n` caps the hits and defaults to 5.
* `project_write`: creates or replaces a doc at `path` from exactly one of `content`, which carries inline text, or `local_path`, which names a file inside the working directory. `present_to_user: true` marks the written doc as the deliverable the user needs to see.
* `project_delete`: deletes a doc by `path`.

### ReadMcpResourceDir

**Tool name:** `ReadMcpResourceDirTool`

```typescript theme={null}
type ReadMcpResourceDirInput = {
  server: string;
  uri: string;
};
```

Lists the direct children of a directory resource on an MCP server. Only usable against a server that has declared support for directory listing; the listing isn't recursive. Directory listing isn't enabled in every session: when it's off, the call returns an empty `resources` list and the `error` field reports that directory listing isn't enabled.

### RefreshMcpTools

**Tool name:** `RefreshMcpTools`

```typescript theme={null}
type RefreshMcpToolsInput = {
  server?: string; // refresh only this server; omit to refresh all connected servers
};
```

Re-queries the tool list of connected MCP servers and applies any changes. The types are exported, but Claude Code registers the tool only when you set `CLAUDE_CODE_ENABLE_REFRESH_MCP_TOOLS=1` in the [`env` option](#options), and only in sessions with at least one MCP server. Requires Claude Code v2.1.211 or later.

### ShowOnboardingRolePicker

**Tool name:** `ShowOnboardingRolePicker`

```typescript theme={null}
type ShowOnboardingRolePickerInput = {};
```

Renders a clickable role-picker chip row during Cowork onboarding so the user can pick their role and get a matching plugin installed. Takes no arguments; the role list is defined by the client. The call blocks until the user responds.

### McpInput

**Tool name:** dynamic MCP tool names of the form `mcp__<server>__<tool>`

```typescript theme={null}
type McpInput = {
  [k: string]: unknown;
};
```

MCP tool arguments are an open object: each server defines its own parameters, so the type places no constraints on field names or values. Consult the server's own tool schema for the fields a specific tool accepts.

## Tool Output Types

Documentation of output schemas for all built-in Claude Code tools. These types are exported from `@anthropic-ai/claude-agent-sdk` and represent the actual response data returned by each tool.

### `ToolOutputSchemas`

Union of tool output types exported from `@anthropic-ai/claude-agent-sdk`; members include:

```typescript theme={null}
type ToolOutputSchemas =
  | AgentOutput
  | ArtifactOutput
  | AskUserQuestionOutput
  | BashOutput
  | CronCreateOutput
  | CronDeleteOutput
  | CronListOutput
  | EnterPlanModeOutput
  | EnterWorktreeOutput
  | ExitPlanModeOutput
  | ExitWorktreeOutput
  | FileEditOutput
  | FileReadOutput
  | FileWriteOutput
  | GlobOutput
  | GrepOutput
  | ListMcpResourcesOutput
  | McpOutput
  | MonitorOutput
  | NotebookEditOutput
  | ProjectsOutput
  | PushNotificationOutput
  | ReadMcpResourceDirOutput
  | ReadMcpResourceOutput
  | RefreshMcpToolsOutput
  | RemoteTriggerOutput
  | REPLOutput
  | ReportFindingsOutput
  | ScheduleWakeupOutput
  | ShowOnboardingRolePickerOutput
  | TaskCreateOutput
  | TaskGetOutput
  | TaskListOutput
  | TaskStopOutput
  | TaskUpdateOutput
  | TodoWriteOutput
  | WebFetchOutput
  | WebSearchOutput
  | WorkflowOutput;
```

### Agent

**Tool name:** `Agent`. The previous name `Task` is still accepted as an alias, and the `tools` array in the [`SDKSystemMessage`](#sdksystemmessage) init message currently lists this tool as `Task` for backward compatibility.

```typescript theme={null}
type AgentOutput =
  | {
      status: "completed";
      agentId: string;
      agentType?: string;
      content: Array<{ type: "text"; text: string; citations?: unknown[] | null }>;
      resolvedModel?: string;
      modelsUsed?: string[];
      totalToolUseCount: number;
      totalDurationMs: number;
      totalTokens: number;
      usage: {
        input_tokens: number;
        output_tokens: number;
        cache_creation_input_tokens: number | null;
        cache_read_input_tokens: number | null;
        server_tool_use: {
          web_search_requests: number;
          web_fetch_requests: number;
        } | null;
        service_tier: string | null;
        cache_creation: {
          ephemeral_1h_input_tokens: number;
          ephemeral_5m_input_tokens: number;
        } | null;
        inference_geo?: string | null;
        speed?: string | null;
        iterations?: unknown;
        output_tokens_details?: {
          thinking_tokens?: number | null;
        } | null;
      };
      toolStats?: {
        readCount: number;
        searchCount: number;
        bashCount: number;
        editFileCount: number;
        linesAdded: number;
        linesRemoved: number;
        otherToolCount: number;
        frameCount?: number;
      };
      prompt: string;
      worktreePath?: string;
      worktreeBranch?: string;
    }
  | {
      status: "async_launched";
      isAsync?: true;
      agentId: string;
      description: string;
      resolvedModel?: string;
      modelsUsed?: string[];
      prompt: string;
      outputFile: string;
      canReadOutputFile?: boolean;
    }
  | {
      status: "remote_launched";
      taskId: string;
      sessionUrl: string;
      description: string;
      prompt: string;
      outputFile: string;
    };
```

Returns the result from the subagent. Discriminated on the `status` field: `"completed"` for finished tasks, `"async_launched"` for background tasks, and `"remote_launched"` for tasks Claude Code dispatched to a remote cloud session, where `sessionUrl` links to that session and `taskId` identifies it.

On the `completed` variant, `resolvedModel` names the model the subagent started on, which can differ from the requested `model` input when [`availableModels`](https://code.claude.com/docs/en/model-config#restrict-model-selection) or another override applies. This field requires Claude Code v2.1.174 or later. On `async_launched`, it names the model in use when the task moved to the background.

`modelsUsed` lists the models the subagent used, in order. The field is present only when a mid-run swap happened, and a model appears again when the run swapped back to it. On `async_launched`, the list covers the models used before backgrounding. Both `modelsUsed` and the backgrounding behavior of `resolvedModel` require Claude Code v2.1.212 or later.

If Claude Code [kept the subagent's isolated worktree](https://code.claude.com/docs/en/worktrees#isolate-subagents-with-worktrees), `worktreePath` on the `completed` result is where to find it. `worktreeBranch` is its branch, present when Claude Code created the worktree with git.

Claude Code fills `usage` and `totalTokens` from the subagent's final API request, not from the whole run, so `usage.service_tier` is the service tier string the API reported on that request. When present, `usage.output_tokens_details.thinking_tokens` is the number of that request's output tokens that were thinking tokens. The `output_tokens_details` field requires TypeScript SDK v0.3.228 or later, which bundles Claude Code v2.1.228.

`usage.output_tokens_details` matches [`Usage.output_tokens_details`](#usage) in meaning, scoped to that final request, but every level of it is optional here. Guard both the object and the field, for example `usage.output_tokens_details?.thinking_tokens ?? 0`, rather than reading it directly.

Before v2.1.207, the published type was narrower. It omitted `worktreePath`, `worktreeBranch`, `citations`, `toolStats.frameCount`, and the `inference_geo`, `speed`, and `iterations` usage fields, and it typed `service_tier` as `"standard" | "priority" | "batch"`. Fields the type marks optional can be absent on results recorded by earlier versions.

### AskUserQuestion

**Tool name:** `AskUserQuestion`

```typescript theme={null}
type AskUserQuestionOutput = {
  questions: Array<{
    question: string;
    header: string;
    options: Array<{ label: string; description: string; preview?: string }>;
    multiSelect: boolean;
  }>;
  answers: Record<string, string>;
  response?: string;
  annotations?: Record<string, { preview?: string; notes?: string }>;
  afkTimeoutMs?: number;
};
```

Returns the questions asked and the user's answers. `response` is set when the user typed a freeform reply instead of answering the structured questions; when present, Claude receives "The user responded: …" instead of the per-question answer list.

### Bash

**Tool name:** `Bash`

```typescript theme={null}
type BashOutput = {
  stdout: string;
  stderr: string;
  rawOutputPath?: string;
  interrupted: boolean;
  isImage?: boolean;
  backgroundTaskId?: string;
  backgroundedByUser?: boolean;
  timedOutAfterMs?: number;
  backgroundCwdHint?: string;
  backgroundEndsWithFinalResponse?: true;
  dangerouslyDisableSandbox?: boolean;
  returnCodeInterpretation?: string;
  noOutputExpected?: boolean;
  structuredContent?: unknown[];
  persistedOutputPath?: string;
  persistedOutputSize?: number;
  staleReadFileStateHint?: string;
  ghRateLimitHint?: string;
  gitOperation?: {
    commit?: { sha: string; kind: "committed" | "amended" | "cherry-picked"; branch?: string };
    push?: { branch: string };
    branch?: { ref: string; action: "merged" | "rebased" };
    pr?: {
      number: number;
      url?: string;
      action: "created" | "edited" | "merged" | "commented" | "closed" | "reopened" | "ready" | "draft" | "auto-merge-enabled" | "auto-merge-disabled";
    };
  };
};
```

The `stdout`, `stderr`, and `backgroundTaskId` fields carry:

| Field              | What it carries                                                                                 |
| ------------------ | ----------------------------------------------------------------------------------------------- |
| `stdout`           | The command's stdout and stderr, merged into one interleaved stream                             |
| `stderr`           | Notices the tool itself adds, such as a shell working-directory reset, not the command's stderr |
| `backgroundTaskId` | Present for background commands                                                                 |

`timedOutAfterMs` is the timeout in milliseconds, set when the command reached its timeout and moved to the background rather than starting there explicitly. `backgroundCwdHint` is set when the backgrounded command contained a directory-change builtin such as `cd`, `pushd`, `popd`, or `chdir`, and notes that the session working directory didn't change. Both fields require Claude Code v2.1.210 or later.

When a subagent running in the foreground owns a backgrounded command, Claude Code terminates the command when that subagent gives its final response. Claude Code sets `backgroundEndsWithFinalResponse` to `true` on such commands, and omits the field when the command survives the turn, as commands started by the main conversation or by background subagents do. The field requires Claude Code v2.1.227 or later.

Claude Code sets `gitOperation.commit.branch` to the branch named in git's commit summary line, and omits it for a commit made on a detached HEAD. The field requires Agent SDK v0.3.227 or later. Claude Code reports a `gh pr reopen` command as the `reopened` PR action, which requires Agent SDK v0.3.234 or later.

### Monitor

**Tool name:** `Monitor`

```typescript theme={null}
type MonitorOutput = {
  taskId: string;
  timeoutMs: number;
  persistent?: boolean;
};
```

Returns the background task ID for the running monitor. Use this ID with `TaskStop` to cancel the watch early.

### Edit

**Tool name:** `Edit`

```typescript theme={null}
type FileEditOutput = {
  filePath: string;
  oldString: string;
  newString: string;
  originalFile: string | null;
  structuredPatch: Array<{
    oldStart: number;
    oldLines: number;
    newStart: number;
    newLines: number;
    lines: string[];
  }>;
  userModified: boolean;
  replaceAll: boolean;
  gitDiff?: {
    filename: string;
    status: "modified" | "added";
    additions: number;
    deletions: number;
    changes: number;
    patch: string;
    repository?: string | null;
  };
};
```

Returns the structured diff of the edit operation.

### Read

**Tool name:** `Read`

```typescript theme={null}
type FileReadOutput =
  | {
      type: "text";
      file: {
        filePath: string;
        content: string;
        numLines: number;
        startLine: number;
        totalLines: number;
        /** True when a whole-file read was auto-paginated because it exceeded the token cap (the content is a partial first page). */
        truncatedByTokenCap?: boolean;
      };
    }
  | {
      type: "image";
      file: {
        base64: string;
        type: "image/jpeg" | "image/png" | "image/gif" | "image/webp";
        originalSize: number;
        dimensions?: {
          originalWidth?: number;
          originalHeight?: number;
          displayWidth?: number;
          displayHeight?: number;
        };
      };
    }
  | {
      type: "notebook";
      file: {
        filePath: string;
        cells: unknown[];
      };
    }
  | {
      type: "pdf";
      file: {
        filePath: string;
        base64: string;
        originalSize: number;
      };
    }
  | {
      type: "parts";
      file: {
        filePath: string;
        originalSize: number;
        count: number;
        outputDir: string;
      };
      /** Document page number of the first extracted page; labels the page images in the tool_result content. */
      firstPage?: number;
      /** In-process only: the page-image bytes are delivered as image blocks in the tool_result content and aren't retained on the emitted tool_use_result, so this key is absent there. */
      pages?: {
        base64: string;
        mediaType: "image/jpeg" | "image/png" | "image/gif" | "image/webp";
        error?: string;
      }[];
    }
  | {
      type: "file_unchanged";
      file: {
        filePath: string;
      };
      /** Set when the dedup matched a startup-seeded entry (CLAUDE.md / nested memory) rather than a prior Read tool_result. */
      source?: "seeded";
    };
```

Returns file contents in a format appropriate to the file type. Discriminated on the `type` field.

### Write

**Tool name:** `Write`

```typescript theme={null}
type FileWriteOutput = {
  type: "create" | "update";
  filePath: string;
  content: string;
  structuredPatch: Array<{
    oldStart: number;
    oldLines: number;
    newStart: number;
    newLines: number;
    lines: string[];
  }>;
  originalFile: string | null;
  gitDiff?: {
    filename: string;
    status: "modified" | "added";
    additions: number;
    deletions: number;
    changes: number;
    patch: string;
    repository?: string | null;
  };
  userModified?: boolean;
};
```

Returns the write result with structured diff information. What `originalFile` and `structuredPatch` hold depends on the write:

* For a newly created file, `originalFile` is null and `structuredPatch` is empty
* On an overwrite, `originalFile` carries the previous content, except when that content is larger than about 10 MB: Claude Code then skips the diff and returns `originalFile` null and `structuredPatch` empty
* `structuredPatch` is also empty when the write changed nothing or the diff timed out

### Glob

**Tool name:** `Glob`

```typescript theme={null}
type GlobOutput = {
  durationMs: number;
  numFiles: number;
  filenames: string[];
  truncated: boolean;
  totalMatches?: number;
  countIsComplete?: boolean;
};
```

Returns file paths matching the glob pattern, sorted by modification time.

`totalMatches` and `countIsComplete` require Claude Code v2.1.191 or later. `totalMatches` reports the number of matching files before truncation. When `countIsComplete` is false, `totalMatches` is a lower bound because the underlying search truncated its own output.

### Grep

**Tool name:** `Grep`

```typescript theme={null}
type GrepOutput = {
  mode?: "content" | "files_with_matches" | "count";
  numFiles: number;
  filenames: string[];
  content?: string;
  numLines?: number;
  numMatches?: number;
  totalFiles?: number;
  totalLines?: number;
  appliedLimit?: number;
  appliedOffset?: number;
};
```

Returns search results. The shape varies by `mode`: file list, content with matches, or match counts. In `count` mode, `numFiles` and `numMatches` are totals over the full result set, not the paginated slice. Before v2.1.208, a `head_limit` or `offset` that truncated the listed entries also truncated those totals.

`totalFiles` requires Claude Code v2.1.208 or later and reports the total number of results before `head_limit` and `offset` pagination in `files_with_matches` mode. `totalLines` requires Claude Code v2.1.210 or later and reports the total number of lines before pagination in `content` mode.

### TaskStop

**Tool name:** `TaskStop`

```typescript theme={null}
type TaskStopOutput = {
  message: string;
  task_id: string;
  task_type: string;
  command?: string;
};
```

Returns confirmation after stopping the background task.

### NotebookEdit

**Tool name:** `NotebookEdit`

```typescript theme={null}
type NotebookEditOutput = {
  new_source: string;
  old_source?: string;
  cell_id?: string;
  cell_type: "code" | "markdown";
  language: string;
  edit_mode: string;
  error?: string;
  notebook_path: string;
  original_file: string;
  updated_file: string;
};
```

Returns the result of the notebook edit with original and updated file contents.

### WebFetch

**Tool name:** `WebFetch`

```typescript theme={null}
type WebFetchOutput = {
  bytes: number;
  code: number;
  codeText: string;
  result: string;
  durationMs: number;
  url: string;
  artifactRead?: {
    slug: string;
    ver?: string;
    seeded?: false;
  };
};
```

Returns the fetched content with HTTP status and metadata.

`artifactRead` is present only when Claude fetched an artifact the session can publish to, and it always carries that artifact's `slug`.

`seeded` is `false` on a read that didn't deliver the page's full source, and that entry carries no `ver`. The field requires Agent SDK v0.3.239 or later.

### WebSearch

**Tool name:** `WebSearch`

```typescript theme={null}
type WebSearchOutput = {
  query: string;
  results: Array<
    | {
        tool_use_id: string;
        content: Array<{ title: string; url: string }>;
      }
    | string
  >;
  durationSeconds: number;
  searchCount?: number;
};
```

Returns search results from the web.

### Workflow

**Tool name:** `Workflow`

```typescript theme={null}
type WorkflowOutput = {
  status: "async_launched" | "remote_launched";
  taskId: string;
  taskType?: "local_workflow" | "remote_agent";
  workflowName?: string;
  runId?: string;
  summary?: string;
  transcriptDir?: string;
  scriptPath?: string;
  sessionUrl?: string; // set when the workflow launched as a remote session
  warning?: string;
  error?: string;
};
```

Returns immediately after the tool accepts the invocation. The final result arrives later as a task completion. Check `error` before treating the run as started: a script that fails its syntax check returns `status: "async_launched"` with `error` set, and never runs.

| Field           | Type                                    | Description                                                                                                                                                         |
| --------------- | --------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `status`        | `"async_launched" \| "remote_launched"` | The tool accepted the invocation. `"async_launched"` for in-process runs, `"remote_launched"` for runs dispatched to a remote session instead of running in-process |
| `taskId`        | `string`                                | Background task identifier for the run                                                                                                                              |
| `taskType`      | `"local_workflow" \| "remote_agent"`    | Task type of the registered background task, matching the `status` arm                                                                                              |
| `workflowName`  | `string`                                | The `meta.name` from the workflow script                                                                                                                            |
| `runId`         | `string`                                | Workflow run identifier to pass as `resumeFromRunId` on a later invocation. Absent for `remote_launched` runs, where the cloud session URL is the resume handle     |
| `summary`       | `string`                                | One-line description of what the workflow does                                                                                                                      |
| `transcriptDir` | `string`                                | Directory where subagent transcripts are written during execution                                                                                                   |
| `scriptPath`    | `string`                                | Path to the persisted workflow script for this run. Edit it and pass back as `scriptPath` to rerun without resending the script                                     |
| `sessionUrl`    | `string`                                | Cloud session URL, set when `status` is `"remote_launched"`                                                                                                         |
| `warning`       | `string`                                | Non-blocking heads-up, such as local git state diverging from the pushed branch a cloud session will clone                                                          |
| `error`         | `string`                                | Set when the script fails its syntax check. When present, the run did not start despite the launched status                                                         |

### TodoWrite

**Tool name:** `TodoWrite`

```typescript theme={null}
type TodoWriteOutput = {
  oldTodos: Array<{
    content: string;
    status: "pending" | "in_progress" | "completed";
    activeForm: string;
  }>;
  newTodos: Array<{
    content: string;
    status: "pending" | "in_progress" | "completed";
    activeForm: string;
  }>;
};
```

Returns the previous and updated task lists.

  The following tools are available by default only on Claude 3.x models, Opus 4 through 4.7, Sonnet 4 through 4.6, and Haiku 4.5. On every other model, including model IDs Claude Code doesn't recognize, they aren't available unless you opt in:

  * `TodoWrite`
  * `TaskCreate`
  * `TaskGet`
  * `TaskUpdate`
  * `TaskList`

  Wherever the tools are available, Claude Code provides the four Task tools, or `TodoWrite` instead when you set `CLAUDE_CODE_ENABLE_TASKS=0`.

  This default set applies in Claude Code v2.1.268 and later, which the TypeScript Agent SDK bundles from v0.3.268.

  See [Model availability](https://code.claude.com/docs/en/agent-sdk/todo-tracking#model-availability) to opt in.

### TaskCreate

**Tool name:** `TaskCreate`

```typescript theme={null}
type TaskCreateOutput = {
  task: {
    id: string;
    subject: string;
  };
};
```

Returns the created task with its assigned ID.

### TaskUpdate

**Tool name:** `TaskUpdate`

```typescript theme={null}
type TaskUpdateOutput = {
  success: boolean;
  taskId: string;
  updatedFields: string[];
  error?: string;
  statusChange?: {
    from: string;
    to: string;
  };
};
```

Returns the update result, including which fields changed.

### TaskGet

**Tool name:** `TaskGet`

```typescript theme={null}
type TaskGetOutput = {
  task: {
    id: string;
    subject: string;
    description: string;
    status: "pending" | "in_progress" | "completed";
    blocks: string[];
    blockedBy: string[];
  } | null;
};
```

Returns the full task record, or `null` when the ID is not found.

### TaskList

**Tool name:** `TaskList`

```typescript theme={null}
type TaskListOutput = {
  tasks: Array<{
    id: string;
    subject: string;
    status: "pending" | "in_progress" | "completed";
    owner?: string;
    blockedBy: string[];
  }>;
};
```

Returns a snapshot of all tasks in the current list.

### ExitPlanMode

**Tool name:** `ExitPlanMode`

```typescript theme={null}
type ExitPlanModeOutput = {
  plan: string | null;
  isAgent: boolean;
  filePath?: string;
  hasTaskTool?: boolean;
  planWasEdited?: boolean;
  awaitingLeaderApproval?: boolean;
  requestId?: string;
};
```

Returns the plan state after exiting plan mode.

### ListMcpResources

**Tool name:** `ListMcpResourcesTool`

```typescript theme={null}
type ListMcpResourcesOutput = Array<{
  uri: string;
  name: string;
  mimeType?: string;
  description?: string;
  server: string;
}>;
```

Returns an array of available MCP resources.

### ReadMcpResource

**Tool name:** `ReadMcpResourceTool`

```typescript theme={null}
type ReadMcpResourceOutput = {
  contents: Array<{
    uri: string;
    mimeType?: string;
    text?: string;
    blobSavedTo?: string;
  }>;
  error?: string;
};
```

Returns the contents of the requested MCP resource.

### EnterWorktree

**Tool name:** `EnterWorktree`

```typescript theme={null}
type EnterWorktreeOutput = {
  worktreePath: string;
  worktreeBranch?: string;
  message: string;
};
```

Returns information about the git worktree.

### ExitWorktree

**Tool name:** `ExitWorktree`

```typescript theme={null}
type ExitWorktreeOutput = {
  action: "keep" | "remove";
  originalCwd: string;
  worktreePath: string;
  worktreeBranch?: string;
  tmuxSessionName?: string;
  discardedFiles?: number;
  discardedCommits?: number;
  message: string;
};
```

Returns the action taken and details about the worktree that was exited.

### EnterPlanMode

**Tool name:** `EnterPlanMode`

```typescript theme={null}
type EnterPlanModeOutput = {
  message: string;
};
```

Returns a confirmation that plan mode was entered.

### CronCreate

**Tool name:** `CronCreate`

```typescript theme={null}
type CronCreateOutput = {
  id: string;
  humanSchedule: string;
  recurring: boolean;
  durable?: boolean; // true when persisted to .claude/scheduled_tasks.json; false when session-only
};
```

Returns the job ID and a human-readable description of the schedule.

### CronDelete

**Tool name:** `CronDelete`

```typescript theme={null}
type CronDeleteOutput = {
  id: string;
};
```

Returns the ID of the deleted job.

### CronList

**Tool name:** `CronList`

```typescript theme={null}
type CronListOutput = {
  jobs: {
    id: string;
    cron: string;
    humanSchedule: string;
    prompt: string;
    recurring?: boolean;
    durable?: boolean;
  }[];
};
```

Returns the scheduled cron jobs: durable jobs from `.claude/scheduled_tasks.json` and session-only jobs from the current session. A session-only job carries `durable: false`; jobs read from disk omit the field.

### ScheduleWakeup

**Tool name:** `ScheduleWakeup`

```typescript theme={null}
type ScheduleWakeupOutput = {
  scheduledFor: number;
  clampedDelaySeconds: number;
  wasClamped: boolean;
  stopped?: boolean;
  cancelledWakeups?: number;
};
```

Returns when the wake-up will fire as an epoch millisecond timestamp, the delay actually used, and whether the requested delay was clamped. The `stopped` field is `true` when the call ended the loop with `stop: true`. It requires Claude Code v2.1.202 or later. The `cancelledWakeups` field counts how many pending wakeups a `stop: true` call cancelled. A value of 0 means nothing was pending, and a recurring `/loop` cron isn't cancelled by `stop: true`. It requires Claude Code v2.1.206 or later.

### RemoteTrigger

**Tool name:** `RemoteTrigger`

```typescript theme={null}
type RemoteTriggerOutput = {
  status: number;
  json: string;
  summary?: string;
};
```

Returns the API response status and body for the trigger operation.

### PushNotification

**Tool name:** `PushNotification`

```typescript theme={null}
type PushNotificationOutput = {
  message: string;
  pushSent?: boolean;
  localSent?: boolean;
  disabledReason?: "config_off" | "user_present" | "no_transport";
  sentAt?: string;
};
```

Returns delivery details, including whether a push or local notification was sent and why delivery was skipped.

### REPL

**Tool name:** `REPL`

```typescript theme={null}
type REPLOutput = {
  code: string;
  result: {
    [k: string]: unknown;
  };
  stdout: string;
  stderr: string;
  error?: string;
  registeredTools?: string[];
  images?: {
    base64: string;
    mediaType: string;
  }[];
  documents?: {
    base64: string;
  }[];
};
```

Returns the execution result, captured console output, and any images or documents surfaced by inner `Read` calls.

### ReportFindings

**Tool name:** `ReportFindings`

```typescript theme={null}
type ReportFindingsOutput = {
  count: number;
  level?: "low" | "medium" | "high" | "xhigh" | "max";
  findings: Array<{
    file: string;
    line?: number;
    summary: string;
    failure_scenario: string;
    short_summary?: string;
    category?: string;
    verdict?: "CONFIRMED" | "PLAUSIBLE";
    outcome?: "fixed" | "skipped" | "no_change_needed";
  }>;
};
```

Returns the number of findings reported, the effort level the review ran at, and the findings echoed back for the result body. Requires Claude Code v2.1.196 or later. The echoed `short_summary` field requires Claude Code v2.1.212 or later.

### Artifact

**Tool name:** `Artifact`

```typescript theme={null}
type ArtifactOutput =
  | {
      url: string;
      path: string;
      title?: string;
      version?: string;
      capabilities?: unknown;
      stored?: {
        contract: string;
        capabilities?: Record<string, unknown>;
      };
      warnings?: string[];
      contract?: string;
      updated?: boolean;
      liveSubscription?: string;
    }
  | {
      artifacts: Array<{
        title: string;
        url: string;
        updatedAt?: string;
        rel?: "mine" | "shared";
      }>;
      truncated?: boolean;
      scope?: "shared" | "all";
    };
```

Returns the published page's `url` and the local `path` that was published for the publish action, with `updated` set to true when the publish redeployed an existing artifact, and `warnings` carrying any publish-time advisories. The list action returns the `artifacts` rows instead, with `truncated` set when more artifacts exist than the requested limit. On listings whose scope isn't `"mine"`, each row carries `rel` marking whether the user owns the artifact or it was shared with them, and the output's `scope` records which non-default scope produced the listing; both are absent on default listings.

### Projects

**Tool name:** `Projects`

```typescript theme={null}
type ProjectsOutput =
  | {
      method: "project_info";
      notice?: string;
      name: string;
      description: string;
      instructions: string;
      docs: Array<{ path: string; created_at: string | null }>;
      files?: Array<{
        path: string;
        file_kind: string;
        created_at: string | null;
      }>;
      sync_sources?: Array<{
        type: string | null;
        config: Record<string, unknown>;
      }>;
      knowledge: {
        knowledge_size: number;
        max_knowledge_size: number;
      };
    }
  | {
      method: "project_read";
      notice?: string;
      path: string;
      file_kind?: string;
      content?: string;
      local_file?: string;
      created_at: string | null;
    }
  | {
      method: "project_search";
      notice?: string;
      rag: boolean;
      hits?: Array<{ name?: string; doc_uuid?: string; text?: string }>;
      docs?: string[];
    }
  | {
      method: "project_write";
      notice?: string;
      path: string;
      doc_uuid: string;
      replaced: boolean;
      present_to_user?: boolean;
      local_path?: string;
    }
  | {
      method: "project_delete";
      notice?: string;
      path: string;
      deleted: boolean;
    };
```

Discriminated on the `method` field, mirroring the input. `project_read` returns small text docs inline in `content` and writes larger docs to a `local_file` path instead; `project_search` returns RAG `hits` with `rag: true` when the project's index is available and falls back to a `docs` path list otherwise.

### ReadMcpResourceDir

**Tool name:** `ReadMcpResourceDirTool`

```typescript theme={null}
type ReadMcpResourceDirOutput = {
  resources: Array<{
    uri: string;
    name: string;
    mimeType?: string;
  }>;
  error?: string;
};
```

Returns the direct children of the directory resource. Subdirectories appear with mimeType `"inode/directory"`; `error` carries a human-readable message when the server couldn't list the directory.

### RefreshMcpTools

**Tool name:** `RefreshMcpTools`

```typescript theme={null}
type RefreshMcpToolsOutput = Array<{
  server: string;
  status: "refreshed" | "error" | "not_connected";
  toolCount?: number; // tools now available from this server
  added?: string[]; // tool names this refresh added
  removed?: string[]; // tool names this refresh removed
  error?: string; // why the refresh failed or the server was unavailable
}>;
```

Returns one entry per server: `refreshed` means the re-queried tool list was applied, `error` means the re-query failed and the previous tool set was kept, and `not_connected` means the server has no live connection to query.

### ShowOnboardingRolePicker

**Tool name:** `ShowOnboardingRolePicker`

```typescript theme={null}
type ShowOnboardingRolePickerOutput = {
  role?: string;
  dismissed?: boolean;
};
```

Returns the user's selection: `role` when they picked a role chip or typed one, and `dismissed: true` when they closed the picker. An empty object means the user approved the call without picking a role.

### McpOutput

**Tool name:** dynamic MCP tool names of the form `mcp__<server>__<tool>`

```typescript theme={null}
type McpOutput =
  | string
  | {
      type: string;
      [k: string]: unknown;
    }[]
  | {
      [k: string]: unknown;
    };
```

MCP tool results are returned as a string or an array of content blocks, depending on the server. The trailing plain-object branch in the exported type is a schema-generation artifact: the SDK doesn't return a bare object, because a server's structured output is serialized to a JSON string before being returned. At runtime the value may also be `undefined`, although the exported type doesn't model this.

## Permission Types

### `PermissionUpdate`

Operations for updating permissions.

```typescript theme={null}
type PermissionUpdate =
  | {
      type: "addRules";
      rules: PermissionRuleValue[];
      behavior: PermissionBehavior;
      destination: PermissionUpdateDestination;
    }
  | {
      type: "replaceRules";
      rules: PermissionRuleValue[];
      behavior: PermissionBehavior;
      destination: PermissionUpdateDestination;
    }
  | {
      type: "removeRules";
      rules: PermissionRuleValue[];
      behavior: PermissionBehavior;
      destination: PermissionUpdateDestination;
    }
  | {
      type: "setMode";
      mode: PermissionMode;
      destination: PermissionUpdateDestination;
    }
  | {
      type: "addDirectories";
      directories: string[];
      destination: PermissionUpdateDestination;
    }
  | {
      type: "removeDirectories";
      directories: string[];
      destination: PermissionUpdateDestination;
    };
```

### `PermissionBehavior`

```typescript theme={null}
type PermissionBehavior = "allow" | "deny" | "ask";
```

### `PermissionUpdateDestination`

```typescript theme={null}
type PermissionUpdateDestination =
  | "userSettings" // Global user settings
  | "projectSettings" // Per-directory project settings
  | "localSettings" // Local project settings
  | "session" // Current session only
  | "cliArg"; // CLI argument
```

### `PermissionRuleValue`

```typescript theme={null}
type PermissionRuleValue = {
  toolName: string;
  ruleContent?: string;
};
```

## Other Types

### `ApiKeySource`

Where the API key for the session's requests came from, reported as `apiKeySource` on the [`SDKSystemMessage`](#sdksystemmessage) init message.

```typescript theme={null}
type ApiKeySource =
  | "ANTHROPIC_API_KEY"
  | "apiKeyHelper"
  | "/login managed key"
  | "none"
  | "user"
  | "project"
  | "org"
  | "temporary"
  | "oauth";
```

Claude Code reports one of four values:

| Value                | Key in use                                                                                                                      |
| -------------------- | ------------------------------------------------------------------------------------------------------------------------------- |
| `ANTHROPIC_API_KEY`  | The key in the `ANTHROPIC_API_KEY` environment variable                                                                         |
| `apiKeyHelper`       | The key returned by your [`apiKeyHelper`](https://code.claude.com/docs/en/settings-reference#apikeyhelper) command                                          |
| `/login managed key` | The key Claude Code stored when you logged in with a [Claude Console account](https://code.claude.com/docs/en/authentication#claude-console-authentication) |
| `none`               | No API key. The session authenticates another way, such as a claude.ai login, a bearer token, or a cloud provider               |

Agent SDK v0.3.234 and later list these four values in the type. The type also keeps `user`, `project`, `org`, `temporary`, and `oauth` so older code still compiles, and Claude Code doesn't report them.

### `SdkBeta`

Available beta features that can be enabled via the `betas` option. See [Beta headers](https://platform.claude.com/docs/en/api/beta-headers) for more information.

```typescript theme={null}
type SdkBeta = "context-1m-2025-08-07";
```

  The `context-1m-2025-08-07` beta is retired as of April 30, 2026. Passing this value with Claude Sonnet 4.5 or Sonnet 4 has no effect, and requests that exceed the standard 200k-token context window return an error. To use a 1M-token context window, migrate to [Claude Opus 5, Claude Sonnet 5, Claude Sonnet 4.6, Claude Opus 4.6, Claude Opus 4.7, or Claude Opus 4.8](https://platform.claude.com/docs/en/about-claude/models/overview), which include 1M context at standard pricing with no beta header required.

### `SlashCommand`

Information about an available command.

```typescript theme={null}
type SlashCommand = {
  name: string;
  description: string;
  argumentHint: string;
  aliases?: string[];
};
```

### `ModelInfo`

Information about an available model.

```typescript theme={null}
type ModelInfo = {
  value: string;
  resolvedModel?: string;
  displayName: string;
  description: string;
  supportsEffort?: boolean;
  supportedEffortLevels?: ("low" | "medium" | "high" | "xhigh" | "max")[];
  supportsAdaptiveThinking?: boolean;
  supportsFastMode?: boolean;
  supportsAutoMode?: boolean;
};
```

| Field                      | Type                                                               | Description                                                                                                                                                                                                                                                                               |
| :------------------------- | :----------------------------------------------------------------- | :---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `value`                    | `string`                                                           | Model identifier to pass in API calls                                                                                                                                                                                                                                                     |
| `resolvedModel`            | `string \| undefined`                                              | Canonical wire model ID that this entry's `value` resolves to. An alias entry such as `sonnet` resolves to an explicit model ID such as `claude-sonnet-5`, so a host can match a stored explicit model ID against the alias entry that covers it. Requires Claude Code v2.1.197 or later. |
| `displayName`              | `string`                                                           | Human-readable display name                                                                                                                                                                                                                                                               |
| `description`              | `string`                                                           | Description of the model's capabilities                                                                                                                                                                                                                                                   |
| `supportsEffort`           | `boolean \| undefined`                                             | Whether this model supports effort levels                                                                                                                                                                                                                                                 |
| `supportedEffortLevels`    | `("low" \| "medium" \| "high" \| "xhigh" \| "max")[] \| undefined` | Effort levels this model accepts                                                                                                                                                                                                                                                          |
| `supportsAdaptiveThinking` | `boolean \| undefined`                                             | Whether this model supports adaptive thinking, where Claude decides when and how much to think                                                                                                                                                                                            |
| `supportsFastMode`         | `boolean \| undefined`                                             | Whether this model supports fast mode                                                                                                                                                                                                                                                     |
| `supportsAutoMode`         | `boolean \| undefined`                                             | Whether this model supports auto mode                                                                                                                                                                                                                                                     |

### `AgentInfo`

Information about an available subagent that can be invoked via the Agent tool.

```typescript theme={null}
type AgentInfo = {
  name: string;
  description: string;
  model?: string;
};
```

| Field         | Type                  | Description                                                                                                                                                                                         |
| :------------ | :-------------------- | :-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `name`        | `string`              | Agent type identifier (e.g., `"Explore"`, `"general-purpose"`)                                                                                                                                      |
| `description` | `string`              | Description of when to use this agent                                                                                                                                                               |
| `model`       | `string \| undefined` | Model this agent uses: an alias or model ID, or `'inherit'` for the parent's model. When it's `undefined`, Claude Code picks the model in the [subagent model order](https://code.claude.com/docs/en/sub-agents#choose-a-model) |

### `McpServerStatus`

Status of a connected MCP server.

```typescript theme={null}
type McpServerStatus = {
  name: string;
  status: "connected" | "failed" | "needs-auth" | "pending" | "disabled";
  serverInfo?: {
    name: string;
    version: string;
  };
  error?: string;
  config?: McpServerStatusConfig;
  scope?: string;
  tools?: {
    name: string;
    description?: string;
    annotations?: {
      readOnly?: boolean;
      destructive?: boolean;
      openWorld?: boolean;
    };
  }[];
};
```

### `McpServerStatusConfig`

The configuration of an MCP server as reported by `mcpServerStatus()`. This is the union of all MCP server transport types.

```typescript theme={null}
type McpServerStatusConfig =
  | McpStdioServerConfig
  | McpSSEServerConfig
  | McpHttpServerConfig
  | McpSdkServerConfig
  | McpClaudeAIProxyServerConfig;
```

See [`McpServerConfig`](#mcpserverconfig) for details on each transport type.

### `AccountInfo`

Account information for the authenticated user.

```typescript theme={null}
type AccountInfo = {
  email?: string;
  organization?: string;
  subscriptionType?: string;
  tokenSource?: string;
  apiKeySource?: string;
};
```

### `ModelUsage`

Per-model usage statistics returned in result messages. The `costUSD` value is a client-side estimate. See [Track cost and usage](https://code.claude.com/docs/en/agent-sdk/cost-tracking) for billing caveats.

```typescript theme={null}
type ModelUsage = {
  inputTokens: number;
  outputTokens: number;
  thinkingTokens?: number;
  cacheReadInputTokens: number;
  cacheCreationInputTokens: number;
  webSearchRequests: number;
  costUSD: number;
  contextWindow: number;
  maxOutputTokens: number;
  canonicalModel?: string;
  provider?: string;
  costBasis?: 'list' | 'managed' | 'unknown';
};
```

`thinkingTokens` counts the thinking tokens this model generated. `outputTokens` already includes them, so don't add the two together. The field is absent until a turn runs on a Claude Code version that records it, so a resumed session that began on an earlier version reports a partial count. `thinkingTokens` requires Agent SDK v0.3.257 or later.

The `canonicalModel` and `provider` fields require Claude Code v2.1.218 or later. `canonicalModel` is the canonical model ID that the pricing lookup uses; it can differ from the raw model string that keys the entry, for example when that string is a provider-specific ID or an alias.

`provider` names the API backend that served the model, such as `firstParty`, `bedrock`, `vertex`, `foundry`, `anthropicAws`, `mantle`, or `gateway`.

`costBasis` names the price table that priced the model's latest request: `list` for list price, `managed` for a [`modelPricing`](https://code.claude.com/docs/en/settings-reference#modelpricing) table, or `unknown` when neither matched the model ID. The field requires Claude Code v2.1.246 or later.

### `ConfigScope`

```typescript theme={null}
type ConfigScope = "local" | "user" | "project";
```

### `NonNullableUsage`

A version of [`Usage`](#usage) with all nullable fields made non-nullable.

```typescript theme={null}
type NonNullableUsage = {
  [K in keyof Usage]: NonNullable<Usage[K]>;
};
```

### `Usage`

Token usage statistics. This is the `BetaUsage` type from `@anthropic-ai/sdk`.

```typescript theme={null}
type Usage = {
  input_tokens: number;
  output_tokens: number;
  cache_creation_input_tokens: number | null;
  cache_read_input_tokens: number | null;
  cache_creation: {
    ephemeral_5m_input_tokens: number;
    ephemeral_1h_input_tokens: number;
  } | null;
  server_tool_use: BetaServerToolUsage | null;
  service_tier: "standard" | "priority" | "batch" | null;
  speed: "standard" | "fast" | null;
  inference_geo: string | null;
  iterations: BetaIterationsUsage | null;
  output_tokens_details: BetaOutputTokensDetails | null;
};
```

`BetaServerToolUsage`, `BetaIterationsUsage`, and `BetaOutputTokensDetails` are defined in `@anthropic-ai/sdk`.

`output_tokens_details` breaks the billed output down by category. It currently carries one field, `thinking_tokens: number`, counting the output tokens the model generated as internal reasoning, including the thinking-block delimiters. The `output_tokens_details` field requires TypeScript SDK v0.3.228 or later, which bundles Claude Code v2.1.228.

* **Billing**: read the breakdown for observability, not for billing. `output_tokens` stays the authoritative total, and `output_tokens - thinking_tokens` approximates the non-reasoning output.
* **What the count covers**: the raw reasoning the model produced, which can be longer than the thinking text returned in the response body. The API computes it by re-tokenizing that raw text, so it can differ from the model's exact generation count by a few tokens.
* **Streaming**: on streamed assistant messages this breakdown, like `output_tokens`, is a `message_start` placeholder and carries no real count, so read it from the result message's `usage` as [Read output tokens from the result message](https://code.claude.com/docs/en/agent-sdk/cost-tracking#read-output-tokens-from-the-result-message) describes. On the result message, `thinking_tokens` reads `0` when the model or provider reports no breakdown.
* **`null` cases**: `output_tokens_details` itself is `null` on assistant messages Claude Code synthesizes, such as API-error messages.

### `CallToolResult`

MCP tool result type (from `@modelcontextprotocol/sdk/types.js`). `structuredContent` is a JSON object that can be returned alongside `content`, including image blocks. See [Return structured data](https://code.claude.com/docs/en/agent-sdk/custom-tools#return-structured-data).

```typescript theme={null}
type CallToolResult = {
  content: Array<{
    type: "text" | "image" | "audio" | "resource" | "resource_link";
    // Additional fields vary by type
  }>;
  structuredContent?: Record<string, unknown>;
  isError?: boolean;
};
```

### `SDKMcpResourceLink`

One file an MCP tool returned by reference. Claude Code builds each entry from a `resource_link` block in the tool's result and delivers the list as `resourceLinks` on [`SDKUserMessage.tool_use_result`](#sdkusermessage), or as `resource_links` on [`SDKTaskNotificationMessage`](#sdktasknotificationmessage) when the call finished in the background. Requires Agent SDK v0.3.257 or later.

```typescript theme={null}
type SDKMcpResourceLink = {
  uri: string;
  name: string;
  title?: string;
  description?: string;
  mimeType?: string;
  size?: number;
  annotations?: Record<string, unknown>;
};
```

Claude Code drops a block whose `uri` or `name` isn't a string, and leaves out an optional field whose value isn't of the listed type.

| Field         | Type                                   | Description                                                 |
| :------------ | :------------------------------------- | :---------------------------------------------------------- |
| `uri`         | `string`                               | URI of the resource, as the server returned it              |
| `name`        | `string`                               | Name the server gave the resource                           |
| `title`       | `string \| undefined`                  | Display title, when the server set one                      |
| `description` | `string \| undefined`                  | Description, when the server set one                        |
| `mimeType`    | `string \| undefined`                  | MIME type, when the server set one                          |
| `size`        | `number \| undefined`                  | Size in bytes, when the server set one                      |
| `annotations` | `Record<string, unknown> \| undefined` | The block's MCP annotations object, when the server set one |

### `ThinkingConfig`

Controls Claude's thinking/reasoning behavior. Takes precedence over the deprecated `maxThinkingTokens`.

```typescript theme={null}
type ThinkingDisplay = "summarized" | "omitted";

type ThinkingConfig =
  | { type: "adaptive"; display?: ThinkingDisplay } // The model determines when and how much to reason (Opus 4.6+)
  | { type: "enabled"; budgetTokens?: number; display?: ThinkingDisplay } // Fixed thinking token budget
  | { type: "disabled" }; // No extended thinking
```

The optional `display` field controls whether thinking text is returned `"summarized"` or `"omitted"`. On Claude Opus 4.7 and later, the API default is `"omitted"`, so set `"summarized"` to receive thinking content in `thinking` blocks. Claude Code doesn't send `display` to Amazon Bedrock or Google Cloud's Agent Platform, so on those providers Opus 4.7 and later return empty `thinking` blocks even when you set `display` to `"summarized"`.

### `SpawnedProcess`

Interface for custom process spawning (used with `spawnClaudeCodeProcess` option). `ChildProcess` already satisfies this interface.

```typescript theme={null}
interface SpawnedProcess {
  stdin: Writable;
  stdout: Readable;
  readonly killed: boolean;
  readonly exitCode: number | null;
  kill(signal: NodeJS.Signals): boolean;
  on(
    event: "exit",
    listener: (code: number | null, signal: NodeJS.Signals | null) => void
  ): void;
  on(event: "error", listener: (error: Error) => void): void;
  once(
    event: "exit",
    listener: (code: number | null, signal: NodeJS.Signals | null) => void
  ): void;
  once(event: "error", listener: (error: Error) => void): void;
  off(
    event: "exit",
    listener: (code: number | null, signal: NodeJS.Signals | null) => void
  ): void;
  off(event: "error", listener: (error: Error) => void): void;
}
```

### `SpawnOptions`

Options passed to the custom spawn function.

```typescript theme={null}
interface SpawnOptions {
  command: string;
  args: string[];
  cwd?: string;
  env: Record<string, string | undefined>;
  signal: AbortSignal;
}
```

  The `signal` field tells your spawn function when to tear down the process. Pass it as the `signal` option to Node's `spawn()`, or pass it to your VM or container teardown handler.

  This signal does not fire the instant [`Options.abortController`](#options) aborts. The SDK first closes the process's stdin and waits about two seconds so the CLI can shut down cleanly, then aborts this signal. To react the moment the caller aborts instead, listen on your own `Options.abortController.signal`, which your spawn function can reference from its enclosing scope.

### `McpSetServersResult`

Result of a `setMcpServers()` operation.

```typescript theme={null}
type McpSetServersResult = {
  added: string[];
  removed: string[];
  errors: Record<string, string>;
};
```

When you call `setMcpServers()`, Claude Code applies these rules:

* **Servers the call doesn't name**: Claude Code keeps plugin-provided servers running. Requires Agent SDK v0.3.210 or later.
* **Servers the call names**: except for built-in servers the CLI started at startup, Claude Code replaces a running server only when its config differs from the one you passed.
* **Built-in servers the CLI started at startup**: if the call names one, Claude Code drops that entry and reports it in `errors`.

The promise resolves after newly added stdio, HTTP, and SSE servers connect or fail, so tools from servers that connected are available on the next turn.

`added` lists the servers Claude Code added or replaced, whether or not they connected. A server that failed to connect appears in both `added` and `errors`, with the failure text under `errors` and a `failed` row in [`mcpServerStatus()`](#methods). Before Claude Code v2.1.257, a server whose connection attempt threw was reported only under `errors`.

### `RewindFilesResult`

Result of a `rewindFiles()` operation.

```typescript theme={null}
type RewindFilesResult = {
  canRewind: boolean;
  error?: string;
  filesChanged?: string[];
  insertions?: number;
  deletions?: number;
  skippedLinks?: number;
};
```

`skippedLinks` counts the tracked paths the rewind refused to restore or delete for link safety: a symlink, hard link, or other non-regular file at the tracked path, a parent directory that no longer resolves to where it pointed when the checkpoint was taken, or a backup that couldn't be read safely. The field requires Claude Code v2.1.216 or later. A preview call with `rewindFiles(userMessageId, \{ dryRun: true \})` never sets it.

### `SDKStatusMessage`

Status update message (e.g., compacting).

```typescript theme={null}
type SDKStatusMessage = {
  type: "system";
  subtype: "status";
  status: "compacting" | null;
  permissionMode?: PermissionMode;
  uuid: UUID;
  session_id: string;
};
```

### `SDKTaskNotificationMessage`

Notification when a background task completes, fails, or is stopped. Background tasks include `run_in_background` Bash commands, [Monitor](#monitor) watches, and background subagents. For the `ambient` field, see [`SDKTaskStartedMessage`](#sdktaskstartedmessage), which defines it and its version requirement.

```typescript theme={null}
type SDKTaskNotificationMessage = {
  type: "system";
  subtype: "task_notification";
  task_id: string;
  tool_use_id?: string;
  status: "completed" | "failed" | "stopped";
  output_file: string;
  summary: string;
  ambient?: boolean;
  usage?: {
    total_tokens: number;
    tool_uses: number;
    duration_ms: number;
  };
  resource_links?: SDKMcpResourceLink[];
  uuid: UUID;
  session_id: string;
};
```

When Claude Code [moves a long MCP tool call to the background](https://code.claude.com/docs/en/mcp#automatic-backgrounding-of-long-tool-calls), the `tool_result` block for that call holds only a placeholder and the call's real result arrives in this notification. Match the notification to the call with `tool_use_id`. On a `completed` notification, `resource_links` lists the files the tool returned by reference as [`SDKMcpResourceLink`](#sdkmcpresourcelink) entries, with the same 50-link and 64 KiB limits as [`tool_use_result.resourceLinks`](#sdkusermessage). Claude Code omits `resource_links` when the result had no links and on notifications for tasks that aren't MCP tool calls. `resource_links` requires Agent SDK v0.3.257 or later.

Claude Code prepends a notice to every task notification it sends to the model, except deliveries stamped with the [`scheduled-trigger` subkind](#task-notification-subkinds), which carry an assigned-task framing instead. The notice states that no human input has occurred, so the model doesn't treat the notification as a user instruction or approval.

To detect a task-notification turn, check `origin.kind === "task-notification"` on the [`SDKUserMessage`](#sdkusermessage) or [`SDKResultMessage`](#sdkresultmessage) rather than matching on the notice text. Read `subkind` from the same field if you need to know what raised it. Before v2.1.205, Claude Code left the notice off notifications that arrived while the session was idle.

### `SDKToolUseSummaryMessage`

Summary of tool usage in a conversation.

```typescript theme={null}
type SDKToolUseSummaryMessage = {
  type: "tool_use_summary";
  summary: string;
  preceding_tool_use_ids: string[];
  uuid: UUID;
  session_id: string;
};
```

### `SDKHookStartedMessage`

Emitted when a hook begins executing.

Claude Code delivers this message, [`SDKHookProgressMessage`](#sdkhookprogressmessage), and [`SDKHookResponseMessage`](#sdkhookresponsemessage) to the message stream immediately, including while a `SessionStart` or `Setup` hook is still running during session startup. Claude Code v2.1.169 through v2.1.203 delivered these messages in one batch after a `SessionStart` or `Setup` hook completed; v2.1.204 restored live delivery.

```typescript theme={null}
type SDKHookStartedMessage = {
  type: "system";
  subtype: "hook_started";
  hook_id: string;
  hook_name: string;
  hook_event: string;
  uuid: UUID;
  session_id: string;
};
```

### `SDKHookProgressMessage`

Emitted while a hook is running, with stdout/stderr output.

```typescript theme={null}
type SDKHookProgressMessage = {
  type: "system";
  subtype: "hook_progress";
  hook_id: string;
  hook_name: string;
  hook_event: string;
  stdout: string;
  stderr: string;
  output: string;
  uuid: UUID;
  session_id: string;
};
```

### `SDKHookResponseMessage`

Emitted when a hook finishes executing.

```typescript theme={null}
type SDKHookResponseMessage = {
  type: "system";
  subtype: "hook_response";
  hook_id: string;
  hook_name: string;
  hook_event: string;
  output: string;
  stdout: string;
  stderr: string;
  exit_code?: number;
  outcome: "success" | "error" | "cancelled";
  uuid: UUID;
  session_id: string;
};
```

### `SDKToolProgressMessage`

Emitted periodically while a tool is executing to indicate progress.

```typescript theme={null}
type SDKToolProgressMessage = {
  type: "tool_progress";
  tool_use_id: string;
  tool_name: string;
  parent_tool_use_id: string | null;
  elapsed_time_seconds: number;
  task_id?: string;
  heartbeat?: boolean;
  subagent_type?: string;
  subagent_retry?: {
    agent_id: string;
    attempt: number;
    max_retries: number;
    retry_delay_ms: number;
    error_status: number | null;
    error_category: string;
  };
  uuid: UUID;
  session_id: string;
};
```

While a tool call runs in the main conversation, Claude Code emits a `tool_progress` message every 30 seconds with `heartbeat: true`. Each heartbeat carries the tool name and elapsed seconds, so you can distinguish a long-running call from a stalled session. Claude Code doesn't emit heartbeats for tool calls inside a subagent. The `heartbeat` field requires Agent SDK v0.3.214 or later. Before v2.1.257, Claude Code didn't emit heartbeats for a foreground Agent tool call either.

On `tool_progress` messages for the Agent tool other than heartbeats, `subagent_type` names the running subagent type, such as `general-purpose`. `subagent_retry` is present while that subagent waits out an API error backoff, such as a rate limit or overload, with one message per retry attempt. Both fields require Agent SDK v0.3.214 or later.

To render a retry indicator from `subagent_retry`:

* Track the indicator by `parent_tool_use_id`, which is unique per subagent. `tool_use_id` is shared by parallel subagents from one assistant turn, so tracking by it would let one subagent's update clear another's indicator.
* Clear the indicator when a later `tool_progress` for the same `parent_tool_use_id` arrives with neither `subagent_retry` nor `heartbeat: true`, or when the tool's result message arrives. Frames with `heartbeat: true` report liveness only, so keep the indicator when one arrives. `attempt` can exceed `max_retries` under persistent retry, so don't derive clearing from the counters.
* Treat `error_category` as a token for choosing your own message text, not as display text. The values are `rate_limit`, `overloaded`, `authentication_failed`, `server_error`, `cloud_credential_error`, and `unknown`. Handle a value you don't recognize the way you handle `unknown`, because later releases can add values.

### `SDKAuthStatusMessage`

Emitted during authentication flows.

```typescript theme={null}
type SDKAuthStatusMessage = {
  type: "auth_status";
  isAuthenticating: boolean;
  output: string[];
  error?: string;
  uuid: UUID;
  session_id: string;
};
```

### `SDKTaskStartedMessage`

Emitted when a task begins. The `task_type` field is `"local_bash"` for Bash commands and [Monitor](#monitor) watches, `"local_agent"` for subagents, or `"remote_agent"`.

```typescript theme={null}
type SDKTaskStartedMessage = {
  type: "system";
  subtype: "task_started";
  task_id: string;
  tool_use_id?: string;
  description: string;
  task_type?: string;
  is_backgrounded?: boolean;
  spawn_depth?: number;
  ambient?: boolean;
  uuid: UUID;
  session_id: string;
};
```

`ambient` is `true` for tasks that aren't part of the session's work, such as tasks Claude Code runs for its own operation. Live-update watchers are also ambient, including watchers the user asked for. Exclude ambient tasks from activity indicators. The field requires Agent SDK v0.3.247 or later.

`ambient` also appears on [`SDKTaskNotificationMessage`](#sdktasknotificationmessage) and on [`SDKBackgroundTasksChangedMessage`](#sdkbackgroundtaskschangedmessage) entries.

`is_backgrounded` and `spawn_depth` describe how Claude Code started the task. Both fields require Agent SDK v0.3.238 or later.

* `is_backgrounded`: Claude Code sets it on `"local_agent"` and `"local_bash"` tasks. `true` means the task runs in the background. `false` means the task runs in the foreground, and the tool call that started it stays blocked until the task finishes or moves to the background.
* `spawn_depth`: Claude Code sets it on `"local_agent"` tasks only. A subagent that the main thread spawned has depth `1`. A subagent that a depth `1` subagent spawned has depth `2`, and so on.

A [resumed subagent](https://code.claude.com/docs/en/agent-sdk/subagents#resume-subagents) always reports `is_backgrounded: true`, because Claude Code runs every resumed subagent in the background. When a foreground task moves to the background later, Claude Code reports the new `is_backgrounded` value in a [`task_updated`](#sdktaskupdatedmessage) message rather than sending a second `task_started`.

### `SDKTaskProgressMessage`

Emitted periodically while a subagent or background task is running. The `summary` field is populated only when [`agentProgressSummaries`](#options) is enabled.

```typescript theme={null}
type SDKTaskProgressMessage = {
  type: "system";
  subtype: "task_progress";
  task_id: string;
  tool_use_id?: string;
  description: string;
  subagent_type?: string;
  usage: {
    total_tokens: number;
    tool_uses: number;
    duration_ms: number;
  };
  last_tool_name?: string;
  summary?: string;
  uuid: UUID;
  session_id: string;
};
```

### `SDKTaskUpdatedMessage`

Emitted when a background task's state changes, such as when it transitions from `running` to `completed`. Merge `patch` into your local task map keyed by `task_id`. The `end_time` field is a Unix epoch timestamp in milliseconds, comparable with `Date.now()`.

```typescript theme={null}
type SDKTaskUpdatedMessage = {
  type: "system";
  subtype: "task_updated";
  task_id: string;
  patch: {
    status?: "pending" | "running" | "completed" | "failed" | "killed";
    description?: string;
    end_time?: number;
    total_paused_ms?: number;
    error?: string;
    is_backgrounded?: boolean;
  };
  uuid: UUID;
  session_id: string;
};
```

### `SDKBackgroundTasksChangedMessage`

Emitted whenever the set of live background tasks changes: a task starts, completes, is killed, a foreground agent is backgrounded, or a task's `description` or `ambient` field changes.

The `tasks` array is the full live set. Replace any cached set with each payload instead of pairing `task_started` and `task_notification` events, so the next membership change corrects any event you missed.

Ordering relative to those per-task events is unspecified, so don't correlate the two streams.

Nothing is emitted at startup. Reset to an empty set whenever the session's CLI process starts or restarts and let the next membership change repopulate it.

When you send a repeated `initialize` control request to a running session, such as with [`reinitialize()`](#query-object) after a transport gap, Claude Code follows the response with a snapshot of the current live set, even when it is empty. A reconnecting host therefore learns what is running without waiting for the next membership change. Before Agent SDK v0.3.239, Claude Code sent no snapshot after a repeated `initialize`.

Requires Claude Code v2.1.203 or later.

```typescript theme={null}
type SDKBackgroundTasksChangedMessage = {
  type: "system";
  subtype: "background_tasks_changed";
  tasks: {
    task_id: string;
    task_type: string;
    description: string;
    ambient?: boolean;
  }[];
  uuid: UUID;
  session_id: string;
};
```

### `SDKThinkingTokensMessage`

Emitted while Claude is producing a thinking block, including a redacted one. `estimated_tokens` is a running estimate of the thinking tokens generated so far in the current block, and `estimated_tokens_delta` is the increment carried by this frame. Use these estimates for progress display.

When the model or provider reports a breakdown, the final count for the top-level agent loop is the result message's [`usage.output_tokens_details.thinking_tokens`](#usage), which [doesn't include subagent tokens](https://code.claude.com/docs/en/agent-sdk/cost-tracking#get-the-total-cost-of-a-query).

Requires Claude Code v2.1.153 or later.

```typescript theme={null}
type SDKThinkingTokensMessage = {
  type: "system";
  subtype: "thinking_tokens";
  estimated_tokens: number;
  estimated_tokens_delta: number;
  user_message_uuid?: string;
  uuid: UUID;
  session_id: string;
};
```

### `SDKFilesPersistedEvent`

Emitted when file checkpoints are persisted to disk.

```typescript theme={null}
type SDKFilesPersistedEvent = {
  type: "system";
  subtype: "files_persisted";
  files: { filename: string; file_id: string }[];
  failed: { filename: string; error: string }[];
  processed_at: string;
  uuid: UUID;
  session_id: string;
};
```

### `SDKRateLimitEvent`

Emitted when the session encounters a rate limit.

```typescript theme={null}
type SDKRateLimitEvent = {
  type: "rate_limit_event";
  rate_limit_info: {
    status: "allowed" | "allowed_warning" | "rejected";
    resetsAt?: number;
    utilization?: number;
    errorCode?: "credits_required";
    canUserPurchaseCredits?: boolean;
    hasChargeableSavedPaymentMethod?: boolean;
  };
  uuid: UUID;
  session_id: string;
};
```

When `errorCode` is `"credits_required"`, the rejection is from a claude.ai subscription whose included usage is exhausted, and the session cannot continue until the user buys usage credits. `canUserPurchaseCredits` indicates whether the authenticated user can buy credits for the account, and `hasChargeableSavedPaymentMethod` indicates whether a saved payment method is on file. All three fields are absent on rate-limit events that are not credits-required rejections. Requires Claude Code v2.1.181 or later.

### `SDKLocalCommandOutputMessage`

Output from a local command such as `/voice` or `/usage`. Displayed as assistant-style text in the transcript.

```typescript theme={null}
type SDKLocalCommandOutputMessage = {
  type: "system";
  subtype: "local_command_output";
  content: string;
  uuid: UUID;
  session_id: string;
};
```

### `SDKCommandsChangedMessage`

Emitted when the set of available commands changes mid-session, such as when Claude Code discovers skills as the agent enters a subdirectory. The `commands` array is the full updated list, so replace any cached command list with this payload. Calling [`supportedCommands()`](#query-object) after this message returns the same updated list, because the method tracks the latest push; this requires Agent SDK v0.3.216 or later. In earlier SDK versions, `supportedCommands()` returns the snapshot captured at initialization and never reflects mid-session changes.

```typescript theme={null}
type SDKCommandsChangedMessage = {
  type: "system";
  subtype: "commands_changed";
  commands: SlashCommand[];
  uuid: UUID;
  session_id: string;
};
```

### `SDKPromptSuggestionMessage`

Emitted after a turn when [`promptSuggestions`](#options) is enabled and Claude Code generated a suggestion for that turn. Contains the predicted next user prompt. For the turns that get none, see [When Claude Code skips suggestions](https://code.claude.com/docs/en/interactive-mode#when-claude-code-skips-suggestions).

```typescript theme={null}
type SDKPromptSuggestionMessage = {
  type: "prompt_suggestion";
  suggestion: string;
  uuid: UUID;
  session_id: string;
};
```

### `SDKConversationResetMessage`

Emitted when the session's conversation is replaced without ending the session. In a `query()` call, only `/clear` and its aliases produce this message. Mount an empty transcript under `new_conversation_id` and discard any cached session title.

```typescript theme={null}
type SDKConversationResetMessage = {
  type: "conversation_reset";
  new_conversation_id: UUID;
  uuid: UUID;
  session_id: string;
};
```

The SDK's published typings declare `SDKConversationResetMessage` in Claude Code v2.1.203 and later. Before v2.1.203, `SDKMessage` referenced the type without declaring it, so narrowing on `type === "conversation_reset"` failed to typecheck when `skipLibCheck` was disabled.

### `AbortError`

Custom error class for abort operations.

```typescript theme={null}
class AbortError extends Error {}
```

`AbortError` is the only error class in the SDK's typed API. Other failures, such as the Claude Code process exiting or failing to launch, reject the message iteration with errors that carry no SDK class to match on. [Troubleshooting](https://code.claude.com/docs/en/agent-sdk/troubleshooting) keys those errors by message, with the cause and fix for each.

## Sandbox Configuration

### `SandboxSettings`

Configuration for sandbox behavior. Use this to enable command sandboxing and configure network restrictions programmatically.

```typescript theme={null}
type SandboxSettings = {
  enabled?: boolean;
  failIfUnavailable?: boolean;
  autoAllowBashIfSandboxed?: boolean;
  excludedCommands?: string[];
  allowUnsandboxedCommands?: boolean;
  network?: SandboxNetworkConfig;
  filesystem?: SandboxFilesystemConfig;
  ignoreViolations?: Record<string, string[]>;
  enableWeakerNestedSandbox?: boolean;
  ripgrep?: { command: string; args?: string[] };
};
```

| Property                    | Type                                                  | Default     | Description                                                                                                                                                                                                                             |
| :-------------------------- | :---------------------------------------------------- | :---------- | :-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `enabled`                   | `boolean`                                             | `false`     | Enable sandbox mode for command execution                                                                                                                                                                                               |
| `failIfUnavailable`         | `boolean`                                             | `true`      | Stop at startup if `enabled` is `true` but the sandbox can't start. Set `false` to fall back to unsandboxed execution with a warning on stderr                                                                                          |
| `autoAllowBashIfSandboxed`  | `boolean`                                             | `true`      | Auto-approve bash commands when sandbox is enabled                                                                                                                                                                                      |
| `excludedCommands`          | `string[]`                                            | `[]`        | Commands that always bypass sandbox restrictions (e.g., `['docker']`). These run unsandboxed automatically without model involvement                                                                                                    |
| `allowUnsandboxedCommands`  | `boolean`                                             | `true`      | Allow the model to request running commands outside the sandbox. When `true`, the model can set `dangerouslyDisableSandbox` in tool input, which falls back to the [permissions system](#permissions-fallback-for-unsandboxed-commands) |
| `network`                   | [`SandboxNetworkConfig`](#sandboxnetworkconfig)       | `undefined` | Network-specific sandbox configuration                                                                                                                                                                                                  |
| `filesystem`                | [`SandboxFilesystemConfig`](#sandboxfilesystemconfig) | `undefined` | Filesystem-specific sandbox configuration for read/write restrictions                                                                                                                                                                   |
| `ignoreViolations`          | `Record<string, string[]>`                            | `undefined` | Map of command substrings, or `*` for every command, to substrings of the violation text to ignore, such as `\{ "*": ['/etc/hosts'] \}`; see [`sandbox.ignoreViolations`](https://code.claude.com/docs/en/settings-reference#sandbox-ignoreviolations)                |
| `enableWeakerNestedSandbox` | `boolean`                                             | `false`     | Enable a weaker nested sandbox for compatibility                                                                                                                                                                                        |
| `ripgrep`                   | `\{ command: string; args?: string[] \}`                | `undefined` | Custom ripgrep binary configuration for sandbox environments                                                                                                                                                                            |

  The sandbox depends on platform support and, on Linux, tools like `bubblewrap` and `socat`. When `enabled` is `true` and the sandbox can't start, `query()` reports a `result` message with `subtype: "error_during_execution"` and the reason in `errors`. For a single message `query()` call, the SDK throws after yielding that error result, so wrap the loop in a try block to continue past it. See [Handle the result](https://code.claude.com/docs/en/agent-sdk/agent-loop#handle-the-result) for the error contract.

  To run unsandboxed instead, set `failIfUnavailable: false`.
