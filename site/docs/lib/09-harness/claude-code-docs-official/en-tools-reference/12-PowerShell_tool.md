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
sourceRel: "en/tools-reference.md"
rawUrl: "/raw/09-harness/claude-code-docs-official/en/tools-reference.md"
sourceSha256: "f928a98a3f2e69421eeadeb064439c827340f4b19a28c7ad920c2a0e60b142f9"
pageSha256: "80fbfcc7e5ccb074361917ce68cbfcf82839b9b754227c041b91b9af9b491bf0"
contentMode: "local-full"
zh: ""
---

## PowerShell tool

The PowerShell tool lets Claude run PowerShell commands natively. On Windows, this means commands run in PowerShell instead of routing through Git Bash. How the tool becomes available depends on your platform:

* **Windows without Git Bash**: the tool is enabled automatically.
* **Windows with Git Bash installed**: the tool is on by default for claude.ai and Console accounts; set `CLAUDE_CODE_USE_POWERSHELL_TOOL=1` to enable it in Amazon Bedrock, Google Cloud's Agent Platform, and Microsoft Foundry sessions, or `0` to turn it off.
* **Linux, macOS, and WSL**: the tool is opt-in.

Your [PreToolUse hooks](https://code.claude.com/docs/en/hooks#powershell) receive the tool's command string in `tool_input.command`, with the same fields as the Bash tool.

Match `Bash|PowerShell` in hooks that inspect shell commands; the [PowerShell hook input section](https://code.claude.com/docs/en/hooks#powershell) explains why matching `Bash` alone is not enough.

### Enable the PowerShell tool

Set `CLAUDE_CODE_USE_POWERSHELL_TOOL=1` in your environment or in `settings.json`:

```json theme={null}
{
  "env": {
    "CLAUDE_CODE_USE_POWERSHELL_TOOL": "1"
  }
}
```

On Windows, set the variable to `0` to turn the tool off. On Linux, macOS, and WSL, the tool requires PowerShell 7 or later: install `pwsh` and ensure it is on your `PATH`.

On Windows, Claude Code auto-detects `pwsh.exe` for PowerShell 7+ with a fallback to `powershell.exe` for PowerShell 5.1. When the tool is enabled, Claude treats PowerShell as the primary shell. The Bash tool remains available for POSIX scripts when Git Bash is installed.

Claude Code spawns PowerShell with `-ExecutionPolicy Bypass` at process scope only, so `.ps1` scripts and module imports work on default Windows installs without changing the machine's policy. Process-scope bypass doesn't override Group Policy `MachinePolicy` or `UserPolicy`, so enterprise policies still apply. To respect the machine's effective execution policy instead, set `CLAUDE_CODE_POWERSHELL_RESPECT_EXECUTION_POLICY=1`.

### Shell selection in settings, hooks, and skills

Three additional settings control where PowerShell is used:

* `"defaultShell": "powershell"` in [`settings.json`](https://code.claude.com/docs/en/settings-reference#all-settings): routes interactive `!` commands through PowerShell. Requires the PowerShell tool to be enabled.
* `"shell": "powershell"` on individual [command hooks](https://code.claude.com/docs/en/hooks#command-hook-fields): runs that hook in PowerShell. Hooks spawn PowerShell directly, so this works regardless of `CLAUDE_CODE_USE_POWERSHELL_TOOL`.
* `shell: powershell` in [skill frontmatter](https://code.claude.com/docs/en/skills#frontmatter-reference): runs `` !`command` `` blocks in PowerShell. Requires the PowerShell tool to be enabled.

The same main-session working-directory reset behavior described under the Bash tool section applies to PowerShell commands, including the `CLAUDE_BASH_MAINTAIN_PROJECT_WORKING_DIR` environment variable.

As of v2.1.196, exit code 1 from `grep`, `rg`, `egrep`, `fgrep`, `findstr`, and `git grep` means no matches. Exit code 1 from `git diff` means differences exist. Neither result is reported to Claude as a command failure. For `robocopy`, exit codes 0 through 7 are informational results, such as files copied or extra files detected. Exit codes of 8 or higher count as failures.

### Windows encoding and exit codes

On Windows, the following PowerShell encoding and exit-code behaviors require Claude Code v2.1.214 or later:

* Redirection with `>` and `>>` writes UTF-8 files on PowerShell 5.1
* Claude Code encodes text piped to a native command's standard input as UTF-8
* Claude Code captures error output without ANSI escape sequences
* A command whose child process waits on standard input receives end-of-file instead of hanging
* Exit code 1 from `where.exe` means no match, and from `fc.exe` and `diff.exe` it means the files differ, so when the command produces output, Claude Code treats that exit code as a valid negative answer rather than a command error. Claude Code still reports a silenced form, such as `where.exe /Q` or a redirect to `$null`, as a failure on exit code 1

Before v2.1.214, `>` on PowerShell 5.1 wrote UTF-16LE files, non-ASCII piped input arrived as `?`, and Python scripts could crash with a `UnicodeEncodeError` when printing non-ASCII characters.

### Preview limitations

The PowerShell tool has the following known limitations during the preview:

* PowerShell profiles are not loaded
* On Windows, sandboxing is not supported
