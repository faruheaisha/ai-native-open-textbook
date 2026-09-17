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
pageSha256: "07e5d43c1828d73bb20d11dfffa0dc6fb8d71bbde80e0fd87d54f6000acef343"
contentMode: "local-full"
zh: ""
---

## Troubleshooting

**Status line not appearing**

* Verify your script is executable: `chmod +x ~/.claude/statusline.sh`
* Check that your script outputs to stdout, not stderr
* Run your script manually to verify it produces output
* On Windows with Git Bash installed, backslashes in the `command` path are likely being consumed as escape characters before the script runs. Use forward slashes in the path. See [Windows configuration](#windows-configuration).
* If `disableAllHooks` is `true` outside managed settings after [settings precedence](https://code.claude.com/docs/en/hooks#disable-or-remove-hooks) applies, Claude Code runs only a `statusLine` from managed settings, and with no managed `statusLine` the status line is disabled. Remove the setting, or set it to `false` in the file that sets it, to re-enable. See [`disableAllHooks`](https://code.claude.com/docs/en/settings-reference#disableallhooks).
* If your organization sets `allowManagedHooksOnly` in managed settings, your custom status line disappears without warning: you can only get a status line from a `statusLine` value in those managed settings. See [what runs under `allowManagedHooksOnly`](https://code.claude.com/docs/en/settings-reference#what-runs-under-allowmanagedhooksonly) for the full behavior, and ask your administrator whether this setting applies to you.
* Run `claude --debug` to log the exit code and stderr from the first status line invocation in a session
* Ask Claude to read your settings file and execute the `statusLine` command directly to surface errors

**Status line shows `--` or empty values**

* Fields may be `null` before the first API response completes
* Handle null values in your script with fallbacks such as `// 0` in jq
* Restart Claude Code if values remain empty after multiple messages

**Context percentage shows unexpected values**

* Use `used_percentage` for the simplest accurate context state
* Context percentage may differ from `/context` output due to when each is calculated

**OSC 8 links not clickable**

* Verify your terminal supports OSC 8 hyperlinks (iTerm2, Kitty, WezTerm)

* Terminal.app does not support clickable links

* If link text appears but isn't clickable, Claude Code may not have detected hyperlink support in your terminal. Set the `FORCE_HYPERLINK` environment variable to override detection before launching Claude Code:

  ```bash theme={null}
  FORCE_HYPERLINK=1 claude
  ```

  In PowerShell, set the variable in the current session first:

  ```powershell theme={null}
  $env:FORCE_HYPERLINK = "1"; claude
  ```

* SSH and tmux sessions may strip OSC sequences depending on configuration

* If escape sequences appear as literal text like `\e]8;;`, use `printf '%b'` instead of `echo -e` for more reliable escape handling

**Display glitches with escape sequences**

* Complex escape sequences (ANSI colors, OSC 8 links) can occasionally cause garbled output if they overlap with other UI updates
* If you see corrupted text, try simplifying your script to plain text output
* Multi-line status lines with escape codes are more prone to rendering issues than single-line plain text

**Workspace trust required**

* Because `statusLine` executes a shell command, Claude Code runs it under the same [workspace trust rule as hooks in settings files](https://code.claude.com/docs/en/permissions#what-runs-before-you-trust-a-folder). Accepting the dialog for the folder, or for a parent directory whose trust extends to it, is enough.
* Until then, the status line stays blank, and `claude --debug` logs `Status line command skipped: workspace trust not accepted`. Restart Claude Code and accept the trust dialog to enable it.

**Script errors or hangs**

* Scripts that exit with non-zero codes or produce no output cause the status line to go blank
* Slow scripts block the status line from updating until they complete. Keep scripts fast to avoid stale output.
* If a new update triggers while a slow script is running, the in-flight script is cancelled
* Test your script independently with mock input before configuring it

**Notifications share the status line row**

Outside [fullscreen rendering](https://code.claude.com/docs/en/fullscreen), Claude Code shows notifications on the same row as your status line. In fullscreen rendering, Claude Code gives notifications a row of their own.

* System notifications like MCP server errors and auto-updates display on the right side of the row. Transient notifications such as the context-low warning also cycle through this area.
* Enabling verbose mode adds a token counter to this area
* On narrow terminals, these notifications may truncate your status line output
