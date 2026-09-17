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
sourceRel: "en/hooks.md"
rawUrl: "/raw/09-harness/claude-code-docs-official/en/hooks.md"
sourceSha256: "a6f4f82aca2e63d64ba787c2dc8d735ff95ae86fd3a53471b87eb089133cbdca"
pageSha256: "49cb2ba860e9709120b936216a0ca243bdc5d8ecc26c546460588ab1bca51769"
contentMode: "local-full"
zh: ""
---

### Hook handler fields

Each object in the inner `hooks` array is a hook handler: the shell command, HTTP endpoint, MCP tool, LLM prompt, or agent that runs when the matcher matches. There are five types:

* **[Command hooks](#command-hook-fields)** (`type: "command"`): run a shell command. Your script receives the event's [JSON input](#hook-input-and-output) on stdin and communicates results back through exit codes and stdout.
* **[HTTP hooks](#http-hook-fields)** (`type: "http"`): send the event's JSON input as an HTTP POST request to a URL. The endpoint communicates results back through the response body using the same [JSON output format](#json-output) as command hooks.
* **[MCP tool hooks](#mcp-tool-hook-fields)** (`type: "mcp_tool"`): call a tool on an already-connected [MCP server](https://code.claude.com/docs/en/mcp). The tool's text output is treated like command-hook stdout.
* **[Prompt hooks](#prompt-and-agent-hook-fields)** (`type: "prompt"`): send a prompt to a Claude model for single-turn evaluation. The model returns its decision as JSON. See [Prompt-based hooks](#prompt-based-hooks).
* **[Agent hooks](#prompt-and-agent-hook-fields)** (`type: "agent"`): spawn a subagent that can use tools like Read, Grep, and Glob to verify conditions before returning a decision. Agent hooks are experimental and may change. See [Agent-based hooks](#agent-based-hooks).

All matching hooks run in parallel. If you define the same handler in more than one settings file, it runs once. A plugin's or skill's copy of the same handler stays separate.

Handlers run in the current directory with Claude Code's environment. If the current directory no longer exists, for example a worktree or temp directory that another shell deleted mid-session, Claude Code runs command hooks from the first of these that still exists: the directory the session started in, the project root, your home directory, or the system temp directory. Claude Code records a warning naming the fallback directory in the [debug log](#debug-hooks).

The `$CLAUDE_CODE_REMOTE` environment variable is `"true"` in remote web environments and not set in the local CLI. Claude Code v2.1.199 and later sets [`$CLAUDE_CODE_BRIDGE_SESSION_ID`](https://code.claude.com/docs/en/env-vars) to the [Remote Control](https://code.claude.com/docs/en/remote-control) session ID while the local session has an active Remote Control connection.

#### Common fields

These fields apply to all hook types:

| Field           | Required | Description                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               |
| :-------------- | :------- | :-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `type`          | yes      | `"command"`, `"http"`, `"mcp_tool"`, `"prompt"`, or `"agent"`                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             |
| `if`            | no       | Permission rule syntax to filter when this hook runs, such as `"Bash(git *)"` or `"Edit(*.ts)"`. The hook command only runs if the tool call matches the pattern. See the [Bash matching table](#bash-if-matching) below for how Bash patterns evaluate against subcommands, `$()`, and backticks. Only evaluated on tool events: `PreToolUse`, `PostToolUse`, `PostToolUseFailure`, `PermissionRequest`, and `PermissionDenied`. On other events, a hook with `if` set never runs. Uses the same syntax as [permission rules](https://code.claude.com/docs/en/permissions)                                                                                                           |
| `timeout`       | no       | Seconds before canceling. Claude Code doesn't enforce it on a command hook you run with [`async: true`](#run-hooks-in-the-background). Defaults: 600 for `command`, `http`, and `mcp_tool`; 30 for `prompt`; 60 for `agent`. Claude Code lowers the `command`, `http`, and `mcp_tool` default to 30 on [`UserPromptSubmit`](#userpromptsubmit), [`PreModelSwitch`](#premodelswitch), and [`PostModelSwitch`](#postmodelswitch), and to 10 on [`MessageDisplay`](#messagedisplay). [`SessionEnd`](#sessionend) hooks share a 1.5-second budget; if your settings set a longer per-hook `timeout`, Claude Code raises the budget to match, up to 60 seconds |
| `statusMessage` | no       | Custom spinner message displayed while the hook runs                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      |
| `once`          | no       | If `true`, Claude Code removes the hook after its first successful run. A run that fails, blocks with exit code 2, or times out leaves the hook in place, so it runs again on the next matching event. Only honored for hooks declared in [skill frontmatter](#hooks-in-skills-and-agents); ignored in settings files and agent frontmatter                                                                                                                                                                                                                                                                                                               |

The `if` field holds exactly one permission rule. There is no `&&`, `||`, or list syntax for combining rules; to apply multiple conditions, define a separate hook handler for each.

In an `if` condition for a file tool, a single-segment directory pattern like `"Edit(src/**)"` matches only the `src` directory in the working directory and the files under it. To match a directory named `src` at any depth, write `"Edit(**/src/**)"`. Before v2.1.214, `"Edit(src/**)"` matched a directory named `src` at any depth under the working directory.

&lt;span id="bash-if-matching" />For Bash patterns, whether your hook command runs depends on the shape of the pattern and the Bash command Claude is invoking. Leading `VAR=value` assignments are stripped before matching.

| `if` pattern       | Bash command                | Hook runs? | Why                                                                                                                       |
| :----------------- | :-------------------------- | :--------- | :------------------------------------------------------------------------------------------------------------------------ |
| `Bash(git *)`      | `FOO=bar git push`          | yes        | leading assignments are stripped; `git push` matches                                                                      |
| `Bash(git *)`      | `npm test && git push`      | yes        | each subcommand is checked; `git push` matches                                                                            |
| `Bash(rm *)`       | `echo $(rm -rf /)`          | yes        | commands inside `$()` and backticks are checked; `rm -rf /` matches                                                       |
| `Bash(rm *)`       | `echo $(date)`              | no         | no subcommand matches `rm *`                                                                                              |
| `Bash(cat *)`      | `echo before $(date) after` | no         | a substitution can sit at any argument position, so the full command and `date` are both checked; neither matches `cat *` |
| `Bash(git *)`      | `$TOOL git push`            | yes        | Claude Code can't tell what the command name expands to, so it runs the hook                                              |
| `Bash(git push *)` | `echo $(date)`              | yes        | patterns that specify more than the command name run the hook anyway on `$()`, backticks, or `$VAR`                       |

When Claude Code can't determine which commands the Bash input runs, it runs your hook regardless of the pattern. Because the `if` filter is best-effort, use the [permission system](https://code.claude.com/docs/en/permissions) rather than a hook to enforce a hard allow or deny.

#### Command hook fields

In addition to the [common fields](#common-fields), command hooks accept these fields:

| Field         | Required | Description                                                                                                                                                                                                                                                                                                                                  |
| :------------ | :------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `command`     | yes      | Shell command to execute. With `args`, the executable to spawn directly. See [Exec form and shell form](#exec-form-and-shell-form)                                                                                                                                                                                                           |
| `args`        | no       | Argument list. When present, `command` is resolved as an executable and spawned directly with `args` as the argument vector, with no shell involved. See [Exec form and shell form](#exec-form-and-shell-form)                                                                                                                               |
| `async`       | no       | If `true`, runs in the background without blocking. See [Run hooks in the background](#run-hooks-in-the-background)                                                                                                                                                                                                                          |
| `asyncRewake` | no       | If `true`, runs in the background and wakes Claude on exit code 2. The hook's stderr, or stdout if stderr is empty, is shown to Claude as a system reminder so it can react to a long-running background failure                                                                                                                             |
| `shell`       | no       | Shell to use for this hook. Accepts `"bash"` or `"powershell"`. Defaults to `"bash"`, or to `"powershell"` on Windows when Git Bash isn't installed. Setting `"powershell"` runs the command via PowerShell on Windows. Does not require `CLAUDE_CODE_USE_POWERSHELL_TOOL` since hooks spawn PowerShell directly. Ignored when `args` is set |

&lt;a id="exec-form-and-shell-form" />

##### Exec form and shell form

A command hook runs as exec form when `args` is set, and shell form when `args` is omitted. Set `args` whenever the hook references a [path placeholder](#reference-scripts-by-path), since each element is passed as one argument with no quoting. Omit `args` when you need shell features like pipes or `&&`, or when neither concern applies.

**Exec form** runs when `args` is present. Claude Code resolves `command` as an executable on `PATH` and spawns it directly with `args` as the argument vector. There is no shell, so each `args` element is one argument exactly as written, and path placeholders like `${CLAUDE_PLUGIN_ROOT\}` are substituted into `command` and into each `args` element as plain strings. Special characters such as apostrophes, `$`, and backticks pass through verbatim because there is no shell to interpret them. No shell tokenization happens on any platform.

**Shell form** runs when `args` is absent. The `command` string is passed to a shell: `sh -c` on macOS and Linux, Git Bash on Windows, or PowerShell when Git Bash isn't installed. Set the `shell` field to choose explicitly. The shell tokenizes the string, expands variables, and interprets pipes, `&&`, redirects, and globs.

  On Windows, exec form requires `command` to resolve to a real executable such as a `.exe`. The `.cmd` and `.bat` shims that npm, npx, eslint, and other tools install in `node_modules/.bin` are not executables and can't be spawned without a shell. To run them in exec form, invoke the underlying script with `node` directly, for example `"command": "node", "args": ["${CLAUDE_PLUGIN_ROOT\}/node_modules/eslint/bin/eslint.js"]`. The `node` plus script-path pattern works on every platform because `node.exe` is a real binary. To run a `.cmd` or `.bat` shim by name, use shell form.

This example runs a Node script bundled with a plugin. Exec form passes the resolved script path as one argument with no quoting:

```json theme={null}
{
  "type": "command",
  "command": "node",
  "args": ["${CLAUDE_PLUGIN_ROOT}/scripts/format.js", "--fix"]
}
```

The equivalent shell form needs quoting to handle paths with spaces or special characters:

```json theme={null}
{
  "type": "command",
  "command": "node \"${CLAUDE_PLUGIN_ROOT}\"/scripts/format.js --fix"
}
```

Both forms support the same [path placeholders](#reference-scripts-by-path), and both export them as the environment variables `CLAUDE_PROJECT_DIR`, `CLAUDE_PLUGIN_ROOT`, and `CLAUDE_PLUGIN_DATA` on the spawned process, so a script can read `process.env.CLAUDE_PLUGIN_ROOT` regardless of how it was launched.

Plugin hooks additionally substitute [`${user_config.*}`](https://code.claude.com/docs/en/plugins-reference#user-configuration) values, in exec form only: the value is substituted into `command` and into each `args` element as a plain string, so no shell re-parses it.

A shell-form plugin hook whose `command` references `${user_config.*\}` fails with an [error](https://code.claude.com/docs/en/errors#plugin-command-references-user-config) instead of running. To use an option value from a shell-form hook, read the `$CLAUDE_PLUGIN_OPTION_<KEY>` environment variable, such as `$CLAUDE_PLUGIN_OPTION_WEBHOOK_URL` for a `webhook_url` option, or set `args` to switch the hook to exec form. Before v2.1.207, shell-form plugin hook commands also substituted `${user_config.*}`.

  In exec form, `command` is the executable name or path only. If `command` is a bare name with no path separator and contains whitespace alongside `args`, Claude Code logs a warning because the spawn will fail: there is no executable named `node script.js`. Move the extra tokens into `args`. Absolute paths with spaces, such as `C:\Program Files\nodejs\node.exe`, are a single valid executable and don't trigger the warning.

#### HTTP hook fields

In addition to the [common fields](#common-fields), HTTP hooks accept these fields:

| Field            | Required | Description                                                                                                                                                                                      |
| :--------------- | :------- | :----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `url`            | yes      | URL to send the POST request to                                                                                                                                                                  |
| `headers`        | no       | Additional HTTP headers as key-value pairs. Values support environment variable interpolation using `$VAR_NAME` or `$\{VAR_NAME\}` syntax. Only variables listed in `allowedEnvVars` are resolved  |
| `allowedEnvVars` | no       | List of environment variable names that may be interpolated into header values. References to unlisted variables are replaced with empty strings. Required for any env var interpolation to work |

Claude Code sends the hook's [JSON input](#hook-input-and-output) as the POST request body with `Content-Type: application/json`. The response body uses the same [JSON output format](#json-output) as command hooks.

Error handling differs from command hooks; see [HTTP response handling](#http-response-handling).

This example sends `PreToolUse` events to a local validation service, authenticating with a token from the `MY_TOKEN` environment variable:

```json theme={null}
{
  "hooks": {
    "PreToolUse": [
      {
        "matcher": "Bash",
        "hooks": [
          {
            "type": "http",
            "url": "http://localhost:8080/hooks/pre-tool-use",
            "timeout": 30,
            "headers": {
              "Authorization": "Bearer $MY_TOKEN"
            },
            "allowedEnvVars": ["MY_TOKEN"]
          }
        ]
      }
    ]
  }
}
```

#### MCP tool hook fields

In addition to the [common fields](#common-fields), MCP tool hooks accept these fields:

| Field    | Required | Description                                                                                                                                                                                                                                                                                                          |
| :------- | :------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
