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
sourceRel: "en/errors.md"
rawUrl: "/raw/09-harness/claude-code-docs-official/en/errors.md"
sourceSha256: "b8944f28bfea74456c2960ba67f375c1d39afd34fb474e956bea3d64744e6604"
pageSha256: "8f71e00409e6d8e15155e6c0314724b647f31ac054cde2450df488661cb0093c"
contentMode: "local-full"
zh: ""
---

## Wrapper and IDE errors

These errors come from the program that launched Claude Code for you, such as an IDE extension or an [Agent SDK](https://code.claude.com/docs/en/agent-sdk/overview) application, rather than from Claude Code itself.

### Claude Code process exited with code N

The underlying `claude` process exited with a non-zero code. The exit code alone doesn't say what failed: the real error is in the process's own output, which the wrapper appends when it captured any and otherwise keeps in its logs.

```text theme={null}
Error: Claude Code process exited with code 1
```

**What to do:**

* In VS Code, follow the **View output logs** link shown with the error to see the underlying failure
* In an Agent SDK application, catch the error around your message loop. The entries under [CLI process exit](https://code.claude.com/docs/en/agent-sdk/troubleshooting#cli-process-exit) cover what your code receives in each SDK language.
* Run `claude` in a terminal in the same project. The failure usually reproduces there with its real error message, which you can then look up on this page.
* Run `claude doctor` in a terminal to check the installation and configuration

<h3 id="could-not-locate-the-claude-cli-on-path">
  Could not locate the Claude CLI on PATH
</h3>

The [VS Code extension](https://code.claude.com/docs/en/vs-code) shows this error on Windows when you open Claude Code in the integrated terminal, the terminal's shell is PowerShell, and the extension can't find the installed `claude` executable on PATH. The extension refuses to launch Claude Code until it finds the installed `claude` on PATH.

```text theme={null}
Failed to run Claude Code: Error: Could not locate the Claude CLI on PATH. Launching by name in a PowerShell terminal would run a 'claude' from the open folder instead of the installed CLI, so the launch was blocked. Make sure the Claude CLI's install directory is on your system PATH (not only your PowerShell profile), then restart VS Code and try again. VS Code reads PATH when it starts, so PATH changes take effect only after a restart.
```

**What to do:**

* Open a new PowerShell window outside VS Code and run `where.exe claude`. If it doesn't print a path, the CLI isn't on your PATH: add its install directory by following [Verify your PATH](https://code.claude.com/docs/en/troubleshoot-install#verify-your-path). If it prints a path, the entry comes from your PowerShell profile or from a PATH change VS Code hasn't picked up yet; the next two steps cover those cases.
* Set the PATH entry as a user or system environment variable, not in your PowerShell profile. The extension doesn't run your profile, so a PATH edit that lives only there never reaches it.
* Restart VS Code after changing PATH. The extension checks the PATH that VS Code captured at startup, so a PATH change takes effect only after a restart.
