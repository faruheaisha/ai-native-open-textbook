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
sourceRel: "en/statusline.md"
rawUrl: "/raw/09-harness/claude-code-docs-official/en/statusline.md"
sourceSha256: "25714ae87efd73e8e4306f76fde76471ba55cb1a50ce48d4126baa0731d1cbd1"
pageSha256: "b89a34e217c00a08ef2ec8b8abcfd07d3edcb617c0c7641210a5c94004357d7b"
contentMode: "local-full"
zh: ""
---

## How status lines work

Claude Code runs your script with [JSON session data](#available-data) on stdin and displays whatever the script prints to stdout.

**When it updates**

Your script runs once when a session starts, including when you resume one. After that, it runs again when:

* A new assistant message arrives
* `/compact` finishes
* The permission mode changes
* Vim mode toggles
* You change the `command` in your `statusLine` settings
* A [`refreshInterval`](#manually-configure-a-status-line) timer elapses, if you set one
* A [rate-limit window](#rate-limit-usage) in the data your script last received reaches its `resets_at` time
* A warm [prompt cache](#prompt-cache-fields) in the data your script last received reaches its `expires_at` time

Claude Code debounces updates at 300ms, so rapid changes batch together and your script runs once after the changes stop. A change to the `command` itself skips the debounce: Claude Code runs the new command right away. If a new update triggers while your script is still running, Claude Code cancels the in-flight script. If you edit your script, the changes appear the next time an update trigger re-runs it.

The event-driven triggers can go quiet when the main session is idle, for example while a coordinator waits on background subagents. To keep time-based or externally-sourced segments current during idle periods, set [`refreshInterval`](#manually-configure-a-status-line) to also re-run the command on a fixed timer.

**What your script can output**

* **Multiple lines**: each `echo` or `print` statement displays as a separate row. See the [multi-line example](#display-multiple-lines).
* **Colors**: use [ANSI escape codes](https://en.wikipedia.org/wiki/ANSI_escape_code#Colors) like `\033[32m` for green (terminal must support them). See the [git status example](#git-status-with-colors).
* **Links**: use [OSC 8 escape sequences](https://en.wikipedia.org/wiki/ANSI_escape_code#OSC) to make text clickable (Cmd+click on macOS, Ctrl+click on Windows/Linux). Requires a terminal that supports hyperlinks like iTerm2, Kitty, or WezTerm. See the [clickable links example](#clickable-links).

**Sizing output to the terminal**

Claude Code captures your script's output instead of connecting it directly to the terminal, so `tput cols` and language-level width detection cannot read the terminal size from inside the script. Read the `COLUMNS` and `LINES` environment variables instead. Claude Code sets these to the current terminal dimensions before running your script.

&lt;Note>The status line runs locally and does not consume API tokens. It temporarily hides during certain UI interactions, including autocomplete suggestions, the help menu, and permission prompts.&lt;/Note>
