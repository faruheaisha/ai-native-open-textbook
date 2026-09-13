---
title: "Commands Best Practice"
sourceId: "09-harness/claude-code-best-practice"
sourceTitle: "Claude Code Best Practice"
sourceKind: "工程手册"
licenseLabel: "可转载"
lang: "英文"
tier: 1
volume: "09-harness"
sourceUrl: "https://github.com/shanraisshan/claude-code-best-practice"
entryUrl: "https://github.com/shanraisshan/claude-code-best-practice/blob/2d6ea151c0d7189c3eaf364809c5574bd210e545/README.md"
zh: ""
---

# Commands Best Practice

 <br>

Claude Code commands — frontmatter fields and official built-in slash commands.

<table width="100%">
<tr>
<td><a href="/lib/09-harness/claude-code-best-practice/overview">← Back to Claude Code Best Practice</a></td>
<td align="right"><img src="/mirror/08/083732f2d17cc173d2ce8cdf174e11bd1ccf34d9.svg" alt="Claude" width="60" /></td>
</tr>
</table>

---

## Frontmatter Fields (20)

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `name` | string | No | Display name and `/slash-command` identifier. Defaults to the directory name if omitted |
| `description` | string | Recommended | What the command does. Shown in autocomplete and used by Claude for auto-discovery |
| `when_to_use` | string | No | Additional context for when Claude should invoke the skill — trigger phrases or example requests. Appended to `description` in the listing and counts toward the 1,536-character cap |
| `argument-hint` | string | No | Hint shown during autocomplete (e.g., `[issue-number]`, `[filename]`) |
| `arguments` | string/list | No | Named positional arguments for `$name` substitution in command content. Accepts a space-separated string or YAML list — names map to argument positions in order |
| `disable-model-invocation` | boolean | No | Set `true` to prevent Claude from automatically invoking this command |
| `user-invocable` | boolean | No | Set `false` to hide from the `/` menu — command becomes background knowledge only |
| `paths` | string/list | No | Glob patterns that limit when this skill is activated. Accepts a comma-separated string or a YAML list. When set, Claude loads the skill automatically only when working with files matching the patterns |
| `allowed-tools` | string | No | Tools allowed without permission prompts when this command is active |
| `disallowed-tools` | string/list | No | Tools removed from Claude's available pool while this command is active. Clears when you send your next message. The inverse of `allowed-tools` |
| `model` | string | No | Model to use when this command runs (e.g., `haiku`, `sonnet`, `opus`) |
| `effort` | string | No | Override the model effort level when invoked (`low`, `medium`, `high`, `xhigh`, `max`) |
| `context` | string | No | Set to `fork` to run the command in an isolated subagent context |
| `agent` | string | No | Subagent type when `context: fork` is set (default: `general-purpose`) |
| `background` | boolean | No | Only applies with `context: fork`. Set to `false` to wait for the forked subagent's result in the turn that invoked the skill, instead of running it in the background. Default: `true`. Requires v2.1.218+ |
| `shell` | string | No | Shell for `` !`command` `` blocks — accepts `bash` (default) or `powershell`. Requires `CLAUDE_CODE_USE_POWERSHELL_TOOL=1` |
| `metadata` | object | No | Free-form YAML map for your own key-value data. Claude Code ignores the content (which must be a map); useful for catalog or entitlement fields read by your own tooling. Do not reuse reserved field names such as `paths` as keys |
| `license` | string | No | License covering the skill per the [Agent Skills](https://agentskills.io) spec. Claude Code accepts the field but does not act on it |
| `compatibility` | string | No | Environment requirements for the skill per the [Agent Skills](https://agentskills.io) spec, such as intended products or system prerequisites. Accepts up to 500 characters. Claude Code accepts the field but does not act on it |
| `hooks` | object | No | Lifecycle hooks scoped to this command |

---

## ![Official](/mirror/5d/5dc02d05a93f03f9dbc3b6ede8ad03e64a65f789.svg) **(93)**

| # | Command | Tag | Description |
|---|---------|-----|-------------|
| 1 | `/design-login` |  | Authorize design-system access for `/design-sync` with your claude.ai account |
| 2 | `/login` |  | Sign in to your Anthropic account |
| 3 | `/logout` |  | Sign out from your Anthropic account |
| 4 | `/setup-bedrock` |  | Configure Amazon Bedrock authentication, region, and model pins through an interactive wizard. Only visible when `CLAUDE_CODE_USE_BEDROCK=1` is set. First-time Bedrock users can also access this wizard from the login screen |
| 5 | `/setup-vertex` |  | Configure Google Cloud's Agent Platform authentication, project, region, and model pins through an interactive wizard. Only visible when `CLAUDE_CODE_USE_VERTEX=1` is set. First-time users can also access this wizard from the login screen |
| 6 | `/upgrade` |  | Open the upgrade page to switch to a higher plan tier |
| 7 | `/auto-mode-setup` |  | Draft `autoMode.environment` entries from your project and recent sessions, then review the draft and save it to your user settings. Requires a Pro, Max, or Team plan and Claude Code v2.1.228 or later. On native Windows, requires v2.1.233 or later |
| 8 | `/color [color\|default]` |  | Set the prompt bar color for the current session. Available colors: `red`, `blue`, `green`, `yellow`, `purple`, `orange`, `pink`, `cyan`. Use `default` to reset. Run without an argument to pick a random color |
| 9 | `/config [key=value ...]` |  | Open the Settings interface to adjust theme, model, output style, and other preferences. From v2.1.181, pass one or more `key=value` pairs to set a setting directly without opening the interface, for example `/config thinking=false`. The `key=value` form also works in non-interactive (`-p`) and Remote Control modes. Run `/config help` to list the keys you can set. Alias: `/settings` |
| 10 | `/focus` |  | Toggle the focus view, which shows only your last prompt, a one-line tool-call summary with edit diffstats, and the final response. The selection persists across sessions; set `viewMode` in settings to override it. Only available in fullscreen rendering |
| 11 | `/import [codex\|gemini\|cursor] [--dry-run] [--yes]` |  | Bring configuration from other coding agents on your machine (currently OpenAI Codex, Google Gemini CLI, or Cursor) into Claude Code, including instruction files, MCP servers, commands, subagents, and skills. In non-interactive mode (`-p`), lists what it found and gives you the command that confirms the import. `--dry-run` previews without writing; `--yes` skips the interactive picker. Importing from Cursor requires v2.1.265 or later |
| 12 | `/keybindings` |  | Open or create your keybindings configuration file |
| 13 | `/permissions` |  | Manage allow, ask, and deny rules for tool permissions. Opens an interactive dialog where you can view rules by scope, add or remove rules, manage working directories, and use the Auto mode tab to view or edit classifier rules and review recent auto mode denials. Alias: `/allowed-tools` |
| 14 | `/powerup` |  | Discover Claude Code features through quick interactive lessons with animated demos |
| 15 | `/privacy-settings` |  | View and update your privacy settings. Only available for Pro and Max plan subscribers |
| 16 | `/radio` |  | Open Claude FM lo-fi radio in your browser. Prints the stream URL when no browser is available |
| 17 | `/sandbox` |  | Toggle sandbox mode. Available on supported platforms only |
| 18 | `/scroll-speed` |  | Adjust mouse wheel scroll speed interactively. Only available in fullscreen rendering. Not available in JetBrains terminals |
| 19 | `/statusline` |  | Configure Claude Code's status line. Describe what you want, or run without arguments to auto-configure from your shell prompt |
| 20 | `/stickers` |  | Order Claude Code stickers |
| 21 | `/terminal-setup` |  | Configure terminal keybindings for Shift+Enter and other shortcuts. Only visible in terminals that need it, like VS Code, Cursor, Devin Desktop, Alacritty, or Zed |
| 22 | `/theme` |  | Change the color theme. Includes light and dark variants, colorblind-accessible (daltonized) themes, ANSI themes that use your terminal's color palette, an "Auto (match terminal)" option that follows your terminal's light/dark mode, and custom themes loaded from `~/.claude/themes/` or plugins. Select "New custom theme…" to create your own |
| 23 | `/tui [default\|fullscreen]` |  | Set the terminal UI renderer and relaunch into it with your conversation intact. `fullscreen` enables the flicker-free alt-screen renderer. With no argument, prints the active renderer |
| 24 | `/voice [hold\|tap\|off]` |  | Toggle voice dictation, or enable it in a specific mode. Requires a Claude.ai account |
| 25 | `/autocompact [auto\|<tokens>]` |  | Set the auto-compact window: how full the context window gets before Claude Code compacts automatically. Pass a token count such as `500k`, or `auto` to return to the default tuned for your model. Claude Code saves the value to your settings and applies it immediately. Without an argument, opens a dialog showing the current window. Requires v2.1.221+ |
| 26 | `/context [all]` |  | Visualize current context usage as a colored grid. Shows optimization suggestions for context-heavy tools, memory bloat, and capacity warnings. Pass `all` to expand the full breakdown |
| 27 | `/cost` |  | Alias for `/usage` |
| 28 | `/insights` |  | Generate an HTML report analyzing Claude Code sessions on this machine, including project areas, interaction patterns, and friction points. Not available in cloud sessions |
| 29 | `/rate-limit-options` |  | Show ways to keep working when a claude.ai usage limit blocks a request: wait and continue automatically when the limit resets, add usage credits, or upgrade your plan. Claude Code can also open this menu on its own when you hit a limit at your own terminal. Requires a claude.ai subscription. Doesn't appear in the command menu; type it in full. The wait-and-continue rows require Claude Code v2.1.234 or later |
| 30 | `/stats` |  | Alias for `/usage`. Opens on the Stats tab |
| 31 | `/status` |  | Open the Settings interface (Status tab) showing version, model, account, and connectivity. Includes a Session kind row showing whether the session is running as a background job (attached or unattended) or interactively. Works while Claude is responding, without waiting for the current response to finish |
| 32 | `/usage` |  | Show session cost, plan usage limits, and activity stats. On a Pro, Max, Team, or Enterprise plan, includes a breakdown of what counts against your plan limits. `/cost` and `/stats` are aliases |
| 33 | `/usage-credits` |  | Configure usage credits to keep working when you hit a limit. On Team and Enterprise plans, members without billing access send a credits request to their admin from the CLI instead of opening the browser (v2.1.248+). Previously `/extra-usage` |
| 34 | `/bug [report]` |  | Report a bug or share your conversation. You choose how much session history to include and confirm on a consent screen before anything is sent. Alias: `/share` |
| 35 | `/feedback [report]` |  | Send product feedback about Claude Code. Opens the same dialog as `/bug` |
| 36 | `/heapdump` |  | Write a JavaScript heap snapshot and memory breakdown to `~/Desktop` for diagnosing high memory usage. Useful when filing bug reports about memory growth |
| 37 | `/help` |  | Show help and available commands |
| 38 | `/release-notes` |  | View the changelog in an interactive version picker. Select a specific version to see its release notes, or choose to show all versions |
| 39 | `/tasks` |  | View and manage background work in the current session, including subagents that have finished. Also available as `/bashes` |
| 40 | `/copy [N]` |  | Copy the last assistant response to clipboard. Pass a number `N` to copy the Nth-latest response: `/copy 2` copies the second-to-last. When code blocks are present, shows an interactive picker to select individual blocks or the full response. Press `w` in the picker to write the selection to a file instead of the clipboard, which is useful over SSH |
| 41 | `/export [filename]` |  | Export the current conversation as plain text. With a filename, writes directly to that file. Without, opens a dialog to copy to clipboard or save to a file |
| 42 | `/agents` |  | Print guidance for managing agent configurations — ask Claude to create or manage subagents, or edit `.claude/agents/` or `~/.claude/agents/` directly |
| 43 | `/chrome` |  | Configure Claude in Chrome settings |
| 44 | `/hooks` |  | View hook configurations for tool events |
| 45 | `/ide` |  | Manage IDE integrations and show status |
| 46 | `/mcp [reconnect <server>\|enable\|disable [<server>\|all]]` |  | Manage MCP server connections and OAuth authentication. Run with no argument to open the interactive list, pass `reconnect <server>` to reconnect one disconnected server, or pass `enable`/`disable` with a server name or `all` to change connection state without opening the dialog |
| 47 | `/plugin [subcommand]` |  | Manage Claude Code plugins. Run with no argument to open the plugin menu, or pass a subcommand such as `list`, `install`, `enable`, or `disable` to act directly |
| 48 | `/reload-plugins [--force]` |  | Reload all active plugins to apply pending changes without restarting. Reports counts for each reloaded component and flags any load errors. When the reload would change which MCP tools are loaded and invalidate the prompt cache, the command warns and skips unless you pass `--force` |
| 49 | `/reload-skills` |  | Re-scan skill and command directories so skills added or changed on disk during the session become available without restarting. Reports how many skills are available and how many were added or removed |
| 50 | `/skill-doctor` |  | Show which loaded skills go unused and what each costs in context, so you can prune them. Requires Claude Code v2.1.252 or later and feature-flag fetching |
| 51 | `/skills` |  | List available skills. Type to filter by name, description, or source. Press `t` to sort by token count. Press `Space` or `Enter` to cycle a skill's visibility; `Esc` saves and closes. Plugin skills, skills with `disable-model-invocation: true`, and skills with a managed `skillOverrides` entry cannot be cycled |
| 52 | `/memory` |  | Edit `CLAUDE.md` memory files, enable or disable auto-memory, and view auto-memory entries |
| 53 | `/advisor [model\|off]` |  | Enable or disable the advisor tool, which consults a second model for guidance at key moments during a task. Accepts a model name (`fable`, `opus`, `sonnet`) or a full model ID (`fable` requires Fable 5 access); without an argument opens a picker. In non-interactive (`-p`) and Remote Control modes, with no argument it prints the current advisor as text instead of opening the picker; requires v2.1.260. Use `off` to disable |
| 54 | `/effort [level\|auto\|status]` |  | Set the model effort level. Available levels depend on the model and include `low`, `medium`, `high`, `xhigh`, `max` (session-only), and `ultracode` (combines `xhigh` reasoning with automatic workflow orchestration; session-only). Pass `status` to print the current level without opening the picker. Without an argument, opens an interactive slider to pick the level. `auto` resets to the model default. Takes effect immediately without waiting for the current response to finish. Also works in `-p` mode outside the effort hold |
| 55 | `/fast [on\|off]` |  | Toggle fast mode on or off |
| 56 | `/model [model]` |  | Switch the AI model and save it as your default for new sessions. Press `s` on a row to switch for the current session only. For models that support it, use left/right arrows to adjust effort level. When switching mid-conversation after prior output, Claude warns before applying the change |
| 57 | `/passes` |  | Share a free week of Claude Code with friends. Only visible if your account is eligible |
| 58 | `/plan [description]` |  | Enter plan mode directly from the prompt. Pass an optional description to enter plan mode and immediately start with that task, for example `/plan fix the auth bug` |
| 59 | `/add-dir <path>` |  | Add a working directory for file access during the current session. Supports Tab-completion on partial paths. From v2.1.234, Claude Code asks you to confirm the directory right away, mid-turn; before v2.1.234 it queued the command until the turn finished. Most `.claude/` configuration is not discovered from the added directory. A successful add runs your `DirectoryAdded` hooks |
| 60 | `/diff` |  | Review the changes in your working tree, including the edits Claude has made so far |
| 61 | `/init` |  | Initialize project with a `CLAUDE.md` guide. Set `CLAUDE_CODE_NEW_INIT=1` for an interactive flow that also walks through skills, hooks, and personal memory files |
| 62 | `/review [low\|medium\|high\|xhigh\|max\|ultra] [--fix] [--comment] [pr#\|branch\|path]` |  | Alias of `/code-review`. Reviews the current diff, or a PR number, branch, or path you pass. Accepts the same effort levels and flags. With no level given, reuses the last `low`–`max` level you typed. For a deep cloud review, use `/code-review ultra` |
| 63 | `/security-review` |  | Analyze pending changes on the current branch for security vulnerabilities. Reviews the diff between your branch and origin's default branch and identifies risks like injection, auth issues, and data exposure. Needs an `origin` remote |
| 64 | `/team-onboarding` |  | Generate a team onboarding guide from your Claude Code usage history. Claude analyzes your sessions, commands, and MCP server usage from the past 30 days and produces a markdown guide. For claude.ai subscribers on Pro, Max, Team, and Enterprise plans, also returns a share link teammates can open directly in Claude Code |
| 65 | `/ultrareview [PR or branch]` |  | Run a deep, multi-agent code review in a cloud sandbox. The preferred invocation is `/code-review ultra`; `/ultrareview` remains as an alias. Pass a PR reference to review that pull request, or a branch name to change the comparison base. Includes 3 free runs on Pro and Max, then requires usage credits |
| 66 | `/autofix-pr [prompt]` |  | Spawn a Claude Code on the web session that watches the current branch's PR and pushes fixes when CI fails or reviewers leave comments. Detects the open PR from your checked-out branch with `gh pr view`; to watch a different PR, check out its branch first. Requires the `gh` CLI and access to Claude Code on the web |
| 67 | `/desktop` |  | Continue the current session in the Claude Code Desktop app. Requires macOS or x64 Windows and a Claude subscription. Alias: `/app` |
| 68 | `/install-github-app` |  | Install the Claude GitHub App for a repository, with an optional step to set up GitHub Actions workflows and secrets |
| 69 | `/install-slack-app` |  | Install the Claude Slack app. Opens a browser to complete the OAuth flow |
| 70 | `/mobile` |  | Show QR code to download the Claude mobile app. Aliases: `/ios`, `/android` |
| 71 | `/remote-control` |  | Make this session available for remote control from claude.ai. Alias: `/rc` |
| 72 | `/remote-env` |  | Choose the default environment for cloud agents |
| 73 | `/schedule [description]` |  | Create, update, list, or run routines. Claude walks you through the setup conversationally. Alias: `/routines` |
| 74 | `/teleport` |  | Pull a Claude Code on the web session into this terminal: opens a picker, then fetches the branch and conversation. Also available as `/tp`. Requires a claude.ai subscription |
| 75 | `/web-setup` |  | Connect your GitHub account to Claude Code on the web using your local `gh` CLI credentials. `/schedule` prompts for this automatically if GitHub is not connected |
| 76 | `/artifacts` |  | List the artifacts you own or that are shared with you, then attach one to the session, open it in your browser, or copy its link. Available where artifacts are. Requires Claude Code v2.1.208 or later; attaching with `Enter` requires v2.1.216 |
| 77 | `/background [prompt]` |  | Detach the current session to run as a background agent and free this terminal. Pass a prompt to send one more instruction before detaching. Monitor the session with `claude agents`. Alias: `/bg` |
| 78 | `/branch [name]` |  | Create a branch of the current conversation at this point |
| 79 | `/btw [question]` |  | Ask a quick side question without adding to the conversation. Without an argument, reopens the overlay on your most recent side question |
| 80 | `/cd <path>` |  | Move the session to a new working directory without breaking the prompt cache |
| 81 | `/clear [name]` |  | Start a new conversation with empty context. Pass an optional `name` to label the previous conversation for easy retrieval via `/resume`. To free up context while continuing the same conversation, use `/compact` instead. Aliases: `/reset`, `/new` |
| 82 | `/compact [instructions]` |  | Compact conversation with optional focus instructions |
| 83 | `/exit` |  | Exit the CLI. In an attached background session, this detaches and the session keeps running. Alias: `/quit` |
| 84 | `/fork [prompt]` |  | Copy the current conversation into a new background session and keep working here |
| 85 | `/goal [condition\|clear]` |  | Set a goal — Claude keeps working across turns until the condition is met. With no argument, shows the current or most recently achieved goal. `clear`, `stop`, `off`, `reset`, `none`, or `cancel` removes an active goal early |
| 86 | `/list-agents` |  | List the subagents, agent team teammates, and other Claude Code sessions Claude can message, with the name to use for each. Teammate rows and the first line showing this session's own name require v2.1.239 or later. Also available as `/peers`. Only available where cross-session messaging is enabled |
| 87 | `/recap` |  | Generate a one-line summary of the current session on demand, without affecting the ongoing conversation |
| 88 | `/rename [name]` |  | Rename the current session and show the name on the prompt bar. Without a name, auto-generates one from conversation history |
| 89 | `/resume [session]` |  | Resume a conversation by ID or name, or open the session picker. As of v2.1.144, background sessions appear in the picker marked with `bg`. A still-running background session cannot be resumed from the picker — attach via `claude agents` or stop it first. Alias: `/continue` |
| 90 | `/rewind` |  | Rewind the conversation and/or code to a previous point, or summarize from a selected message. See checkpointing. Alias: `/checkpoint`, `/undo` |
| 91 | `/stop` |  | Stop the current background session. Only available while attached to a background session; the transcript and any worktree are kept. To detach without stopping, use `/exit` or press `←` |
| 92 | `/subtask <task>` |  | Spawn a forked subagent: a background subagent that inherits the full conversation and works on the task while you keep working. Its result returns to this conversation when it finishes. Requires v2.1.212+. Not available when agent view is off |
| 93 | `/workflows` |  | Open the workflow progress view to watch, pause, resume, or save running and completed workflows |

Bundled skills such as `/debug` can also appear in the slash-command menu, but they are not built-in commands.

---

## Sources

- [Claude Code Commands](https://code.claude.com/docs/en/commands)
- [Claude Code Interactive Mode](https://code.claude.com/docs/en/interactive-mode)
- [Claude Code CHANGELOG](https://github.com/anthropics/claude-code/blob/main/CHANGELOG.md)
