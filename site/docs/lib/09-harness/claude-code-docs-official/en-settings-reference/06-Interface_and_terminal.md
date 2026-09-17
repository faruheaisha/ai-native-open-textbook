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
sourceRel: "en/settings-reference.md"
rawUrl: "/raw/09-harness/claude-code-docs-official/en/settings-reference.md"
sourceSha256: "811cfad7d21b8ebbbd64aeb288e903c6720594286d2a21d2b787639b7ab0ac1b"
pageSha256: "aa5f933de86e5edb306a1f2f4245b6ff5c993b2d6374c4d808659d8636b06e6e"
contentMode: "local-full"
zh: ""
---

## Interface and terminal

Change how Claude Code looks and behaves in your terminal: theme, editor mode, status line, spinner, notifications inside the session, and accessibility. See [Terminal configuration](https://code.claude.com/docs/en/terminal-config).

### `askUserQuestionTimeout`

Let an unanswered [`AskUserQuestion`](https://code.claude.com/docs/en/tools-reference) dialog auto-continue after a period of idle time, submitting whatever options you had already selected. Set it when you step away and want Claude to continue without you. With the default, questions wait until you answer them. Requires Claude Code v2.1.200 or later.

* **Scope**: [`User or managed`](#scopes)
* **Type**: string, one of `"60s"`, `"5m"`, `"10m"`, or `"never"`
* **Default**: `"never"`
* **Per-session overrides**: [`CLAUDE_AFK_TIMEOUT_MS`](https://code.claude.com/docs/en/env-vars) takes precedence over this key for one session

```json settings.json theme={null}
{
  "askUserQuestionTimeout": "5m"
}
```

Appears in `/config` as **Question auto-continue timeout**, which writes this key to user settings; Claude Code hides the row while managed settings or the `--settings` flag set the key. Requires Claude Code v2.1.200 or later.

### `autoContinueAtUsageLimit`

After a claude.ai usage limit stops your session, wait in the open session and continue the task automatically after the reset. See [Turn automatic continue off](https://code.claude.com/docs/en/interactive-mode#turn-automatic-continue-off). Requires Claude Code v2.1.234 or later.

* **Scope**: [`User or managed`](#scopes). Read from user settings, `--settings`, and managed settings only. When none of those sets the key, a project or local settings file that sets it turns the feature off rather than being ignored.
* **Type**: Boolean
  * `true`: after a claude.ai usage limit stops your session, Claude Code waits in the open session and continues the task automatically after the reset
  * `false`: Claude Code doesn't start the wait on its own. You can still [start a wait yourself](https://code.claude.com/docs/en/interactive-mode#start-a-wait-yourself) from the usage-limit options menu
* **Default**: `true`

```json settings.json theme={null}
{
  "autoContinueAtUsageLimit": false
}
```

Appears in `/config` as **Continue automatically at usage limit**, which writes this key to user settings; Claude Code hides the row while managed settings or the `--settings` flag set the key.

### `autoScrollEnabled`

Follow new output to the bottom of the conversation in [fullscreen rendering](https://code.claude.com/docs/en/fullscreen). Turn it off to stay where you scrolled while Claude keeps working; permission prompts still scroll into view.

* **Scope**: [`Any file`](#scopes)
* **Type**: Boolean
  * `true`: the conversation follows new output to the bottom
  * `false`: you stay where you scrolled while Claude keeps working; permission prompts still appear below the transcript
* **Default**: `true`

```json settings.json theme={null}
{
  "autoScrollEnabled": false
}
```

Appears in `/config` as **Auto-scroll** when fullscreen rendering is on, which writes this key to user settings.

### `axScreenReader`

Render screen-reader friendly output: flat text without decorative borders or animations. Screen-reader mode uses the classic renderer, so the `tui` setting has no effect while it is active; attached [background sessions](https://code.claude.com/docs/en/agent-view) still render fullscreen. Requires Claude Code v2.1.181 or later.

* **Scope**: [`Any file`](#scopes)
* **Type**: Boolean
  * `true`: Claude Code renders flat text without decorative borders or animations, using the classic renderer
  * `false`: Claude Code renders normally
* **Default**: unset, so screen-reader mode is off
* **Per-session overrides**: [`--ax-screen-reader`](https://code.claude.com/docs/en/cli-reference#cli-flags) takes precedence over [`CLAUDE_AX_SCREEN_READER`](https://code.claude.com/docs/en/env-vars), and both take precedence over this key for one session

```json settings.json theme={null}
{
  "axScreenReader": true
}
```

Requires Claude Code v2.1.181 or later.

### `companyAnnouncements`

Show your organization's announcements to users at startup. When you list more than one, Claude Code picks one at random for each session; on a person's very first launch it shows the first entry.

* **Scope**: [`Any file`](#scopes)
* **Type**: array of strings
* **Default**: unset, so no announcement shows

```json settings.json theme={null}
{
  "companyAnnouncements": [
    "Welcome to Acme Corp! Review our code guidelines at docs.example.com"
  ]
}
```

### `defaultShell`

Choose whether Bash or PowerShell runs the shell commands you type with the [`!` prefix](https://code.claude.com/docs/en/interactive-mode#shell-mode-with-prefix) in the input box, the ones Claude Code runs directly and adds to the session.

`"powershell"` works only while the [PowerShell tool](https://code.claude.com/docs/en/tools-reference#powershell-tool) is on. The tool is on by default on Windows without Git Bash, and on Windows with Git Bash for claude.ai and Console accounts. In Amazon Bedrock, Google Cloud's Agent Platform, and Microsoft Foundry sessions, and on macOS, Linux, and WSL, set `CLAUDE_CODE_USE_POWERSHELL_TOOL=1` to turn the tool on. Set that variable to `0` to turn the tool off.

* **Scope**: [`Any file`](#scopes)
* **Type**: string, one of:
  * `"bash"`: Claude Code runs your `!` commands in Bash
  * `"powershell"`: Claude Code runs your `!` commands in PowerShell
* **Default**: `"bash"`, or `"powershell"` on Windows when Bash isn't available

```json settings.json theme={null}
{
  "defaultShell": "powershell"
}
```

If the shell you name isn't available, Claude Code uses the other one: `"powershell"` falls back to Bash when the PowerShell tool is off, and `"bash"` falls back to PowerShell when Bash isn't installed.

### `dialogExpiry`

Set the deadline for dialogs Claude Code [forwards to a remote client](https://code.claude.com/docs/en/remote-control#limitations), such as a Remote Control or SDK host, and for the approval dialog for a [held cross-session message](https://code.claude.com/docs/en/cross-session-messaging#control-inbound-messages). On Claude Code v2.1.236 or later, the same deadline bounds the mid-session [Fable usage-credits consent prompt](https://code.claude.com/docs/en/model-config#fable-and-usage-credits) in a session that may have nobody at the terminal. When no answer arrives before the deadline, Claude Code cancels the dialog and continues with its no-action default. Requires Claude Code v2.1.224 or later.

* **Scope**: [`User or managed`](#scopes)
* **Type**: string, one of `"60s"`, `"5m"`, `"10m"`, or `"never"`, which disables the deadline
* **Default**: `"5m"`
* **Per-session overrides**: [`CLAUDE_CODE_USER_DIALOG_TIMEOUT_MS`](https://code.claude.com/docs/en/env-vars) takes precedence over this key for one session

```json settings.json theme={null}
{
  "dialogExpiry": "10m"
}
```

Permission prompts and [`AskUserQuestion`](https://code.claude.com/docs/en/tools-reference#askuserquestion-tool-behavior) questions use their own flows and aren't governed by this deadline. Appears in `/config` as **Dialog expiry**, which writes this key to user settings; the row requires Claude Code v2.1.232 or later, and Claude Code hides it while managed settings or the `--settings` flag set the key.

### `editorMode`

Choose the key binding mode for the input prompt.

* **Scope**: [`Any file`](#scopes)
* **Type**: string, one of:
  * `"normal"`: standard key bindings in the prompt input
  * `"vim"`: vim-style editing with NORMAL, INSERT, and VISUAL modes
* **Default**: `"normal"`

```json settings.json theme={null}
{
  "editorMode": "vim"
}
```

Appears in `/config` as **Editor mode**, which writes this key to user settings.

### `emojiCompletionEnabled`

Show emoji suggestions when you type `:` plus a shortcode in the prompt input, and replace a completed shortcode such as `:heart:` with its emoji. Set it to `false` to turn off both.

* **Scope**: [`Any file`](#scopes)
* **Type**: Boolean
  * `true`: Claude Code shows emoji suggestions after `:` and replaces a completed shortcode with its emoji
  * `false`: Claude Code neither suggests emoji nor replaces shortcodes
* **Default**: `true`

```json settings.json theme={null}
{
  "emojiCompletionEnabled": false
}
```

See [Emoji shortcodes](https://code.claude.com/docs/en/interactive-mode#emoji-shortcodes). Requires Claude Code v2.1.217 or later.

&lt;span id="file-suggestion-settings" />

### `fileSuggestion`

Run your own command to supply `@` file path autocomplete instead of the built-in file suggestion. The built-in suggestion uses fast filesystem traversal; a large monorepo may do better with project-specific indexing such as a pre-built file index.

* **Scope**: [`Any file`](#scopes). Under the [status line and file suggestion gates](#status-line-and-file-suggestion-gates), Claude Code turns the command off or runs only a managed value, and skips yours without warning.
* **Type**: object with `type`, always `"command"`, and `command`, the shell command to run
* **Default**: unset, so Claude Code uses the built-in file suggestion

```json settings.json theme={null}
{
  "fileSuggestion": {
    "type": "command",
    "command": "~/.claude/file-suggestion.sh"
  }
}
```

After you save this, type `@` followed by part of a path in the prompt: the suggestions come from your command's output.

#### Command input and output

Claude Code runs the command with the same environment variables as [hooks](https://code.claude.com/docs/en/hooks), including `CLAUDE_PROJECT_DIR`, and stops waiting after five seconds. The command receives JSON on stdin with a `query` field holding what you've typed so far:

```json theme={null}
{"query": "src/comp"}
```

Print newline-separated file paths to stdout. Claude Code shows at most 15:

```text theme={null}
src/components/Button.tsx
src/components/Modal.tsx
src/components/Form.tsx
```

The following script reads the query and hands it to a repository file index:

```bash theme={null}
#!/bin/bash
query=$(cat | jq -r '.query')
# Replace your-repo-file-index with your own file search command
your-repo-file-index --query "$query" | head -20
```

&lt;span id="footer-link-badges" />

### `footerLinksRegexes`

Render extra clickable badges in the footer below the input box when a regex matches turn output: tool results, including file contents and fetched pages, and Claude's own responses. Use it to turn IDs printed by project CLIs, such as review tools and issue trackers, into session links. Requires Claude Code v2.1.176 or later.

* **Scope**: [`User or managed`](#scopes)
* **Type**: array of objects, each with `type` set to `"regex"`, a `pattern` regex, a `url` template, and an optional `label`; `\{name\}` placeholders in `url` and `label` are filled from named capture groups in `pattern`
* **Default**: unset, so no badges render

This example matches issue keys such as `PROJ-1234` and builds each link from the captured key:

```json settings.json theme={null}
{
  "footerLinksRegexes": [
    {
      "type": "regex",
      "pattern": "\\b(?<key>PROJ-\\d+)\\b",
      "url": "https://issues.example.com/browse/{key}",
      "label": "{key}"
    }
  ]
}
```

With this configured, when `PROJ-1234` appears in a tool result or in Claude's reply, a `PROJ-1234` badge appears in the footer linking to `https://issues.example.com/browse/PROJ-1234`. Requires Claude Code v2.1.176 or later.

#### Badge constraints

Each entry's URL, label, and badge count are bounded as follows:

| Constraint  | Behavior                                                                                                                                                                                           |
| :---------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| URL origin  | Captured values are URL-encoded and the constructed URL must share the template's literal origin. A capture can fill a path segment or query value but can't change where the link points          |
| URL length  | Constructed URLs longer than 2048 characters are dropped                                                                                                                                           |
| URL scheme  | Must be `https`, `http`, or a recognized editor or workspace deep-link scheme: `vscode`, `vscode-insiders`, `cursor`, `windsurf`, `zed`, `jetbrains`, `idea`, `slack`, `linear`, `notion`, `figma` |
| Label       | Defaults to the matched text and is truncated to 28 display columns                                                                                                                                |
| Badge count | At most 5 badges render. The oldest is displaced by newer matches and `/clear` removes them                                                                                                        |

When a turn completes, Claude Code matches each entry's `pattern` regex against the turn output on the main thread, so a slow regex blocks the UI until it finishes. Nested quantifiers such as `(a+)+$` can take exponentially long against certain inputs and freeze the session, so keep each `pattern` linear and avoid nesting `+` or `*`.

Footer badges render alongside a [custom status line](https://code.claude.com/docs/en/statusline) when one is configured; neither replaces the other. Use a status line for a script-driven row that computes its own content from session data, and footer badges to turn IDs from the conversation into links without a script.

### `keybindingFlavor`

  Deprecated since v2.1.261 and has no effect. The prompt's word-editing keys always [follow readline conventions](https://code.claude.com/docs/en/interactive-mode#make-ctrl-w-delete-back-to-whitespace), as in Bash. Claude Code still accepts `keybindingFlavor`, so a settings file that sets it stays valid.

In v2.1.238 through v2.1.260, setting it to `"readline"` made `Ctrl+W` delete back to the previous whitespace instead of only the previous word.

* **Scope**: [`Any file`](#scopes)
* **Type**: string, `"classic"` or `"readline"`
* **Default**: unset

### `prefersReducedMotion`

Reduce or turn off interface animations such as the spinner, shimmer, and flash effects. Appears in `/config` as **Reduce motion**.

* **Scope**: [`Any file`](#scopes)
* **Type**: Boolean
  * `true`: Claude Code reduces or turns off interface animations such as the spinner, shimmer, and flash effects
  * `false`: the same as unset; Claude Code shows its animations
* **Default**: `false`

```json settings.json theme={null}
{
  "prefersReducedMotion": true
}
```

### `promptSuggestionEnabled`

Show or hide [prompt suggestions](https://code.claude.com/docs/en/interactive-mode#prompt-suggestions), the grayed-out predictions that appear in your prompt input. Set it to `false`, or turn off **Prompt suggestions** in `/config`, to hide them.

* **Scope**: [`Any file`](#scopes)
* **Type**: Boolean
  * `true`: you see prompt suggestions in your prompt input
  * `false`: Claude Code hides prompt suggestions
* **Default**: `true`
* **Per-session overrides**: [`CLAUDE_CODE_ENABLE_PROMPT_SUGGESTION`](https://code.claude.com/docs/en/env-vars) takes precedence over this key for one session

```json settings.json theme={null}
{
  "promptSuggestionEnabled": false
}
```

Prompt suggestions need a claude.ai or Console account with telemetry on. On Amazon Bedrock, Google Cloud's Agent Platform, and Microsoft Foundry, or with telemetry turned off, such as by [`DISABLE_TELEMETRY`](https://code.claude.com/docs/en/env-vars), this key has no effect and only `CLAUDE_CODE_ENABLE_PROMPT_SUGGESTION=1` turns them on.

### `respectGitignore`

Control whether the `@` file picker leaves out files that match `.gitignore` patterns. Appears in `/config` as **Respect .gitignore in file picker**.

* **Scope**: [`Any file`](#scopes). When no settings file sets it, Claude Code falls back to `respectGitignore` in `~/.claude.json`, which the `/config` toggle writes.
* **Type**: Boolean
  * `true`: the `@` file picker leaves out files that match `.gitignore` patterns
  * `false`: the `@` file picker includes files that match `.gitignore` patterns
* **Default**: `true`

```json settings.json theme={null}
{
  "respectGitignore": false
}
```

### `respondToBashCommands`

Choose whether Claude responds after you run a shell command with the [`!` prefix](https://code.claude.com/docs/en/interactive-mode#shell-mode-with-prefix) in the input box. By default, Claude Code adds the command's output to the conversation and Claude replies to it. Set this key to `false` to add the output to context without a reply, so you can run several commands and ask about them together. Requires Claude Code v2.1.186 or later.

* **Scope**: [`Any file`](#scopes)
* **Type**: Boolean
  * `true`: Claude Code adds the command's output to the conversation and Claude replies to it
  * `false`: Claude Code adds the output to context without a reply
* **Default**: `true`

```json settings.json theme={null}
{
  "respondToBashCommands": false
}
```

See [Shell mode with `!` prefix](https://code.claude.com/docs/en/interactive-mode#shell-mode-with-prefix). Requires Claude Code v2.1.186 or later.

### `showClearContextOnPlanAccept`

When Claude finishes a plan in [plan mode](https://code.claude.com/docs/en/permission-modes#review-and-approve-a-plan), it shows an approval menu. Planning can use a lot of context, so this key adds a first option to that menu, **Yes, clear context and …**, that approves the plan, clears the conversation context, and starts implementing from the plan alone. The rest of the label names the permission mode the session continues in, and shows how much of your context the planning used.

* **Scope**: [`Any file`](#scopes)
* **Type**: Boolean
  * `true`: the plan approval menu gets a first option, **Yes, clear context and …**, that approves the plan and clears the conversation context
  * `false`: the plan approval menu shows no clear-context option
* **Default**: `false`

```json settings.json theme={null}
{
  "showClearContextOnPlanAccept": true
}
```

### `showTurnDuration`

Show or hide the turn duration message after each response, such as "Cooked for 1m 6s · done 6:05 PM". The clock after "done" shows when the turn finished; [`timeFormat`](#timeformat) and [`timeZone`](#timezone) control its format and zone. Appears in `/config` as **Show turn duration**.

* **Scope**: [`Any file`](#scopes). A value in `~/.claude.json` from an older version applies when no settings file sets it.
* **Type**: Boolean
  * `true`: you see the turn duration message after each response
  * `false`: Claude Code hides the turn duration message
* **Default**: `true`

```json settings.json theme={null}
{
  "showTurnDuration": false
}
```

### `spellcheck`

Underline misspelled words in the prompt input as you type, using a spell checker you install. Claude Code checks only the text in the input box. [Check spelling as you type](https://code.claude.com/docs/en/interactive-mode#check-spelling-as-you-type) covers installing aspell, hunspell, or ispell and what the checker covers. Requires Claude Code v2.1.235 or later.

* **Scope**: [`User or managed`](#scopes). The block from the highest tier that sets it applies as a whole.
* **Type**: object with `enabled` (Boolean), `checker` (`"aspell"`, `"hunspell"`, `"ispell"`, or `"auto"`), `language` (string, passed to the checker as its dictionary name), and `color` (string, a terminal color name, `#rrggbb`, `rgb(r,g,b)`, `ansi256(n)`, or `ansi:<name>`)
* **Default**: unset, so spell checking is off; `checker` defaults to `"auto"`, the first of the three found on `PATH`; `language` defaults to the checker's own dictionary; `color` defaults to the theme's error color

```json settings.json theme={null}
{
  "spellcheck": { "enabled": true, "language": "en_GB" }
}
```

### `spinnerTipsEnabled`

While Claude works, the spinner line rotates through short tips about Claude Code features, such as "Use Plan Mode to prepare for a complex request before making changes. Press Shift+Tab twice to enable." Set this key to `false` to hide them. Appears in `/config` as **Show tips**.

* **Scope**: [`Any file`](#scopes)
* **Type**: Boolean
  * `true`: you see tips in the spinner while Claude is working
  * `false`: Claude Code hides spinner tips
* **Default**: `true`

```json settings.json theme={null}
{
  "spinnerTipsEnabled": false
}
```

### `spinnerTipsOverride`

Add your own tips to the [spinner tips](#spinnertipsenabled) that Claude Code shows while Claude works, or replace the built-in tips with yours. Claude Code puts your tips in the same rotation as the built-in ones: it picks the tip that has gone unshown the longest, skips tips still in their cooldown, and breaks ties by priority.

If you set [`spinnerTipsEnabled`](#spinnertipsenabled) to `false`, Claude Code hides all tips, yours included.

* **Scope**: [`Any file`](#scopes). Claude Code honors tip objects, `tipsFile`, `label`, and `excludeDefault` from user settings, the `--settings` flag, and managed settings; from project and local settings it reads plain string tips only.
* **Type**: object with `tips`, `tipsFile`, `label`, and `excludeDefault` fields, each optional
* **Default**: unset, so Claude Code shows only the built-in tips

Tip objects, `tipsFile`, `label`, and the Scope line's rule that project and local settings contribute plain strings only require Claude Code v2.1.247 or later. On earlier versions, a project or local file's `excludeDefault` applies too.

Each `tips` entry is a plain string or an object with these fields:

| Field              | Required | Description                                                                                                                                                                                                |
| :----------------- | :------- | :--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `id`               | Yes      | Up to 64 letters, digits, `.`, `_`, or `-`. Claude Code keys the tip's show history on it, so the tip's cooldown survives reordering the list. Of two entries with the same id, Claude Code uses the first |
| `text`             | Yes      | The tip, one line of up to 500 characters. Claude Code strips ANSI escapes and control characters and collapses whitespace                                                                                 |
| `cooldownSessions` | No       | Sessions Claude Code waits before showing the tip again, `0` to `1000`, default `0`                                                                                                                        |
| `priority`         | No       | Order among tips that have gone unshown equally long, higher first, `-10` to `10`, default `0`                                                                                                             |

Claude Code reads a plain string as a tip with those defaults and a position-based id, so its show history resets when you reorder the list. Give a tip an `id` to keep its history across edits.

Claude Code reads at most 200 tips across `tips` and `tipsFile`, and drops an invalid entry with a debug warning instead of rejecting the settings file.

Use the remaining fields to name a tips file, set the prefix, and hide the built-in tips:

* `tipsFile`: an absolute or `~/` path to a local JSON file holding an array of the same entries, or an object with a `tips` array, up to 256 KB. Claude Code reads the file once per process, so it loads your edits at the next start. You can't set it through [server-managed settings](https://code.claude.com/docs/en/server-managed-settings); deploy inline `tips` there, or deploy the path in an on-disk `managed-settings.json`.
* `label`: the prefix Claude Code shows before tips from user, `--settings`, and managed settings, up to 40 characters. The default is `Tip`, the same prefix as the built-in tips, and tips from project and local settings always use it.
* `excludeDefault`: set it to `true` to hide the built-in tips and show only yours. When Claude Code can't load any of your tips, for example because `tipsFile` doesn't exist or every entry is invalid, it keeps the built-in rotation instead of an empty spinner.

When more than one settings file sets the key, Claude Code shows tips from all of them and takes `tipsFile`, `label`, and `excludeDefault` from whichever of managed settings, the `--settings` flag, and user settings is the highest-precedence one that sets each.

This example, in your user settings, adds a plain string tip and an object tip to the rotation under the `Acme tip` prefix:

```json settings.json theme={null}
{
  "spinnerTipsOverride": {
    "label": "Acme tip",
    "tips": [
      "Run /review before opening a PR",
      {
        "id": "gateway-errors",
        "text": "Seeing 5xx errors? Check the gateway status page first",
        "cooldownSessions": 5,
        "priority": 2
      }
    ]
  }
}
```

Each field in the example changes one thing about how Claude Code shows the tips:

* `label`: Claude Code shows both tips as `Acme tip: ...` instead of `Tip: ...`.
* The plain string: Claude Code gives it the defaults, so it can come up again in the very next session.
* `id`: Claude Code keys the second tip's show history on `gateway-errors`, so its cooldown still applies after you add or reorder tips.
* `cooldownSessions`: after Claude Code shows the `gateway-errors` tip, it doesn't show that tip again until five sessions later.
* `priority`: when the `gateway-errors` tip and another tip have gone unshown for the same number of sessions, for example when neither has been shown yet, Claude Code shows `gateway-errors` first. The plain string has the default priority, `0`.

While Claude works, Claude Code shows your tips in the spinner with your prefix, such as `Acme tip: Run /review before opening a PR`.

### `spinnerVerbs`

While a turn is in progress, the spinner shows a rotating verb such as "Accomplishing", "Architecting", or "Baking". Use this key to add your own verbs to that rotation or replace the built-in list with yours.

* **Scope**: [`Any file`](#scopes)
* **Type**: object with a `verbs` array of strings and `mode`, one of:
  * `"append"`: Claude Code adds your verbs to the built-in set
  * `"replace"`: Claude Code shows only your verbs
* **Default**: unset, so Claude Code uses the built-in verbs

This example adds two verbs to the built-in set:

```json settings.json theme={null}
{
  "spinnerVerbs": {
    "mode": "append",
    "verbs": ["Pondering", "Crafting"]
  }
}
```

In `"replace"` mode with an empty `verbs` array, Claude Code keeps the built-in verbs.

### `statusLine`

Run your own command to render a [status line](https://code.claude.com/docs/en/statusline) below the prompt with context such as the model, cost, or git branch. Optional fields adjust spacing, add periodic re-runs, and hide the built-in vim mode indicator when your script renders `vim.mode` itself.

* **Scope**: [`Any file`](#scopes). When [`allowManagedHooksOnly`](#allowmanagedhooksonly) is on, or [`disableAllHooks`](#disableallhooks) is set outside managed settings, only the managed settings value runs.
* **Type**: object with `type` set to `"command"` and a `command` string, plus optional `padding` as a number of characters, `refreshInterval` as a number of seconds, minimum `1`, and `hideVimModeIndicator` as a Boolean
* **Default**: unset, so no status line

This example prints the model name and context usage, and adds two characters of horizontal spacing:

```json settings.json theme={null}
{
  "statusLine": {
    "type": "command",
    "command": "jq -r '\"[\\(.model.display_name)] \\(.context_window.used_percentage // 0)% context\"'",
    "padding": 2
  }
}
```

The example needs [`jq`](https://jqlang.org/) installed and runs in a shell. For PowerShell and Git Bash equivalents, see [Windows configuration](https://code.claude.com/docs/en/statusline#windows-configuration); for the full setup, see [Manually configure a status line](https://code.claude.com/docs/en/statusline#manually-configure-a-status-line).

### `subagentStatusLine`

When Claude runs [subagents](https://code.claude.com/docs/en/sub-agents), Claude Code lists them in a task display below the prompt, one row per subagent showing `name · description · token count`. This key lets you run your own command to rewrite those rows, for example to show each subagent's context usage as a percentage. On each refresh, Claude Code sends the visible rows as one JSON object on stdin, with a `tasks` array carrying each subagent's `id`, `name`, `status`, `model`, `tokenCount`, and more, and replaces the row for each `id` you write back as a `\{"id", "content"\}` line. Rows you don't write back keep the default rendering.

* **Scope**: [`Any file`](#scopes). When [`allowManagedHooksOnly`](#allowmanagedhooksonly) is on, or [`disableAllHooks`](#disableallhooks) is set outside managed settings, only the managed settings value runs.
* **Type**: object with `type` set to `"command"` and a `command` string
* **Default**: unset, so Claude Code renders the default rows

```json settings.json theme={null}
{
  "subagentStatusLine": {
    "type": "command",
    "command": "jq -c '.tasks[] | {id, content: \"\\(.name): \\(.tokenCount) tokens\"}'"
  }
}
```

See [Subagent status lines](https://code.claude.com/docs/en/statusline#subagent-status-lines).

### `syntaxHighlightingDisabled`

Claude Code colors code by language in the diffs, code blocks, and file previews it shows in the terminal, with its built-in highlighter; no plugin or language server is involved. Set this key to `true` to show them as plain text instead, for example if the colors clash with your terminal theme or slow a screen reader.

* **Scope**: [`Any file`](#scopes)
* **Type**: Boolean
  * `true`: Claude Code turns off syntax highlighting in diffs, code blocks, and file previews
  * `false`: Claude Code highlights syntax
* **Default**: `false`

```json settings.json theme={null}
{
  "syntaxHighlightingDisabled": true
}
```

### `terminalProgressBarEnabled`

Some terminals can show a progress indicator on the tab or in the taskbar for the program running in them. While Claude is working, Claude Code reports an in-progress state to the terminal, so you can see from another tab or window whether the session is still busy. The indicator stays visible after the turn ends while [background subagents](https://code.claude.com/docs/en/sub-agents#run-subagents-in-foreground-or-background) or [dynamic workflows](https://code.claude.com/docs/en/workflows) are still running, and clears once the session is idle.

Claude Code reports it only in terminals that support the indicator: ConEmu, Ghostty 1.2.0 or later, and iTerm2 3.6.6 or later. Set this key to `false` to stop Claude Code from reporting it. Appears in `/config` as **Terminal progress bar**.

* **Scope**: [`Any file`](#scopes). A value in `~/.claude.json` from an older version applies when no settings file sets it.
* **Type**: Boolean
  * `true`: you see the terminal progress bar in terminals that support it
  * `false`: Claude Code hides the terminal progress bar
* **Default**: `true`

```json settings.json theme={null}
{
  "terminalProgressBarEnabled": false
}
```

### `terminalTitleFromRename`

Claude Code sets your terminal tab's title. By default it uses a title it generates from the conversation, and once you give the session a [name](https://code.claude.com/docs/en/sessions#name-your-sessions) with `/rename` or `--name`, the tab shows that name instead. Set this key to `false` to keep the generated title on the tab even after you name the session. The name itself still applies, so `/resume <name>` and the session picker find it.

* **Scope**: [`Any file`](#scopes)
* **Type**: Boolean
  * `true`: the terminal tab title shows the session name you set
  * `false`: the tab keeps the title Claude Code generates from your conversation
* **Default**: `true`

```json settings.json theme={null}
{
  "terminalTitleFromRename": false
}
```

To stop Claude Code from updating the terminal title at all, set [`CLAUDE_CODE_DISABLE_TERMINAL_TITLE`](https://code.claude.com/docs/en/env-vars) to `1` instead.

### `theme`

Pick the color theme for the interface. Appears in `/config` as **Theme**.

* **Scope**: [`Any file`](#scopes). A value in `~/.claude.json` from an older version applies when no settings file sets it.
* **Type**: string, one of:
  * `"auto"`: matches your terminal's light or dark background
  * `"dark"`: the dark theme
  * `"light"`: the light theme
  * `"dark-daltonized"`: the dark theme with colorblind-friendly colors
  * `"light-daltonized"`: the light theme with colorblind-friendly colors
  * `"dark-ansi"`: the dark theme using only your terminal's ANSI color palette
  * `"light-ansi"`: the light theme using only your terminal's ANSI color palette
