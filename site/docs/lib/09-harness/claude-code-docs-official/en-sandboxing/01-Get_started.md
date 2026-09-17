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
sourceRel: "en/sandboxing.md"
rawUrl: "/raw/09-harness/claude-code-docs-official/en/sandboxing.md"
sourceSha256: "9173fa7bfc40900080b167be86897899912ce55ff61ad1072f71a5eab69e80ce"
pageSha256: "1cc614861cca9ac40819f8eb1100ef9498fb57ce281e5328cb16d971ed52357d"
contentMode: "local-full"
zh: ""
---

## Get started

The sandbox is built into Claude Code and runs on macOS, Linux, and WSL2. Native Windows is not supported. On Windows, run Claude Code inside a WSL2 distribution.

On macOS, there is nothing to install: sandboxing uses the built-in Seatbelt framework. On Linux and WSL2, the sandbox relies on two packages, covered in [Set up Linux and WSL2](#set-up-linux-and-wsl2). Even if you haven't installed them yet, you can start with `/sandbox`, because its panel shows whether anything is missing.

    Start a Claude Code session and run the `/sandbox` command:

    ```text theme=\{null\}
    /sandbox
    ```

    This opens the sandbox panel with three tabs, plus a Dependencies tab on Linux when the optional seccomp filter is missing:

    * **Mode**: choose how sandboxed commands are approved, covered in the next step
    * **Overrides**: choose whether commands that fail under the sandbox can fall back to running unsandboxed. This is the [`allowUnsandboxedCommands`](https://code.claude.com/docs/en/settings-reference#sandbox-allowunsandboxedcommands) setting
    * **Config**: view the resolved sandbox settings

    If the panel shows only a Dependencies tab, a required package is missing. Install it as described in [Set up Linux and WSL2](#set-up-linux-and-wsl2), restart Claude Code, and run `/sandbox` again.

    On the Mode tab, select auto-allow or regular permissions. Auto-allow runs sandboxed commands without prompting, and regular permissions keeps the regular permission prompts even when commands are sandboxed. See [Sandbox modes](#sandbox-modes) for which commands still prompt in auto-allow mode.

    Ask Claude to run a command, such as a build or a test suite. By default, commands inside the sandbox can write to the working directory, the session temp directory, and any [directories you've added](https://code.claude.com/docs/en/permissions#additional-directories-grant-file-access-not-configuration) with `--add-dir`, `/add-dir`, or `permissions.additionalDirectories`. The first time a command needs a new network domain, Claude Code prompts for approval, or in [auto mode](https://code.claude.com/docs/en/permission-modes#eliminate-prompts-with-auto-mode) sends the request to the classifier.

    Commands that can't run sandboxed fall back to the regular permission flow. Claude Code titles their permission prompt "Bash command (unsandboxed)" instead of "Bash command", so you can tell which commands ran outside the sandbox. To widen or narrow what the sandbox allows, see [Configure sandboxing](#configure-sandboxing).

    If sandboxed commands fail with `Operation not permitted` inside a container, see the Bubblewrap entry under [Troubleshooting](#troubleshooting).

When you select a mode in the panel, Claude Code saves it to your project's local settings at `.claude/settings.local.json`, which apply to the current project. Claude Code adds that file to your global gitignore when it saves a setting there. To enable the sandbox across all of your projects, set [`sandbox.enabled`](https://code.claude.com/docs/en/settings-reference#sandbox-enabled) to `true` in your user settings at `~/.claude/settings.json`. To enforce sandboxing for every developer in an organization, use [managed settings](#enforce-sandboxing-with-managed-settings).

  By default, if the sandbox cannot start because dependencies are missing or the platform is unsupported, Claude Code shows a warning and runs commands without sandboxing. To make this a hard failure instead, set [`sandbox.failIfUnavailable`](https://code.claude.com/docs/en/settings-reference#sandbox-failifunavailable) to `true`. This is intended for managed deployments that require sandboxing as a security gate.

### Set up Linux and WSL2

On Linux and WSL2, the sandbox relies on two packages:

* [`bubblewrap`](https://github.com/containers/bubblewrap): the unprivileged sandboxing tool that enforces filesystem isolation
* [`socat`](http://www.dest-unreach.org/socat/): the relay used to route network traffic through the sandbox proxy

Install them with your distribution's package manager:

    ```bash theme=\{null\}
    sudo apt-get install bubblewrap socat
    ```

    ```bash theme=\{null\}
    sudo dnf install bubblewrap socat
    ```

When a dependency is missing, the Dependencies tab in `/sandbox` lists which of `ripgrep`, `bubblewrap`, `socat`, and the seccomp filter your platform lacks. If you don't see the tab after installing and restarting Claude Code, all dependencies are present.

Ripgrep is bundled with the native Claude Code binary. The seccomp filter is optional and adds Unix domain socket blocking. Install it with `npm install -g @anthropic-ai/sandbox-runtime` if it is missing.

When a required dependency is missing, the Dependencies tab is the only tab shown until you install it. When only the optional seccomp filter is missing, the Dependencies tab appears alongside the other tabs. The dependency check runs at startup, so restart Claude Code after installing packages for `/sandbox` to detect them.

    On Ubuntu 24.04 and later, the default AppArmor policy prevents bubblewrap from creating the user namespaces it needs for isolation.

    To check whether your environment enforces this restriction, including inside WSL2, run `sysctl kernel.apparmor_restrict_unprivileged_userns`. If the command returns `0`, skip this step. If it prints a `No such file or directory` error, the key doesn't exist and you can skip this step. If it returns `1`, add an AppArmor profile that grants `bwrap` this capability:

    ```bash theme=\{null\}
    sudo tee /etc/apparmor.d/bwrap > /dev/null <<'EOF'
    abi &lt;abi/4.0>,
    include &lt;tunables/global>

    profile bwrap /usr/bin/bwrap flags=(unconfined) \{
      userns,
      include if exists &lt;local/bwrap>
    \}
    EOF
    ```

    The profile applies only to `bwrap` itself, not to the commands it runs inside the sandbox. Reload AppArmor to apply it:

    ```bash theme=\{null\}
    sudo systemctl reload apparmor
    ```

    Check your WSL version with `wsl -l -v` from PowerShell. If you see `Sandboxing requires WSL2`, your distribution is running WSL1. Upgrade it to WSL2 or run Claude Code without sandboxing.

    On WSL2, WSL hands a launch of a Windows binary such as `cmd.exe`, `powershell.exe`, or anything under `/mnt/c/` to the Windows host over a Unix socket, so whether a sandboxed command can launch one follows the sandbox's [Unix-socket settings](https://code.claude.com/docs/en/settings-reference#sandbox-network-allowunixsockets): the optional seccomp filter has to be installed to block the socket in the first place. To allow these launches, set `allowAllUnixSockets`; to keep them out of the sandbox entirely, add the command to [`excludedCommands`](https://code.claude.com/docs/en/settings-reference#sandbox-excludedcommands).

### Sandbox modes

Claude Code offers two sandbox modes. In both, the sandbox enforces the same filesystem and network restrictions; the difference is only in whether sandboxed commands are auto-approved or require explicit permission.

#### Auto-allow mode

When a command can be sandboxed, Claude Code runs it inside the sandbox and approves it automatically, without asking your permission. Commands that cannot be sandboxed, such as those needing network access to non-allowed hosts, fall back to the regular permission flow, where Claude Code checks your [permission rules](https://code.claude.com/docs/en/permissions) and gates any command those rules do not already allow, with a prompt in Manual mode.

Even in auto-allow mode, the following still apply:

* Explicit [deny rules](https://code.claude.com/docs/en/permissions) are always respected
* `rm` or `rmdir` commands that target a [critical path](https://code.claude.com/docs/en/permission-modes#critical-paths) still go through the regular permission flow
* Content-scoped [ask rules](https://code.claude.com/docs/en/permissions) like `Bash(git push *)` still force a prompt even for sandboxed commands
* A bare `Bash` ask rule, or the equivalent `Bash(*)` form, is skipped for commands that run sandboxed; it still applies to commands that fall back to the regular permission flow. In [plan mode](https://code.claude.com/docs/en/permission-modes#analyze-before-you-edit-with-plan-mode), the rule isn't skipped: it prompts for sandboxed commands too, including read-only ones. Before v2.1.212, the skip applied in plan mode as well

  Auto-allow mode works independently of your permission mode setting, with one exception: [plan mode](https://code.claude.com/docs/en/permission-modes#analyze-before-you-edit-with-plan-mode). Even if you're not in "accept edits" mode, sandboxed Bash commands run automatically when auto-allow is enabled. This means Bash commands that modify files within the sandbox boundaries execute without prompting, even in Manual mode, where the file edit tools would prompt.

  In plan mode, auto-allow doesn't widen approvals; see [plan mode](https://code.claude.com/docs/en/permission-modes#analyze-before-you-edit-with-plan-mode) for how Claude Code gates commands while you plan. Before v2.1.212, auto-allow ran sandboxed commands without a prompt in plan mode too.

#### Regular permissions mode

All Bash commands go through the regular permission flow, even when sandboxed. This provides more control but requires more approvals.

#### The unsandboxed retry escape hatch

Some commands can't run inside the sandbox at all, such as tools that are incompatible with it or that need a host you haven't allowed. Claude Code reports sandbox violations in the blocked command's result, naming the path or host the sandbox denied, so Claude sees what the sandbox blocked. Rather than failing the task or requiring you to turn sandboxing off, Claude Code includes an escape hatch: Claude analyzes the violation and may retry the command with the `dangerouslyDisableSandbox` parameter.

The retried command runs outside the sandbox, so it goes through the regular permission flow. In Manual mode you get a confirmation prompt. In [auto mode](https://code.claude.com/docs/en/permission-modes#eliminate-prompts-with-auto-mode), the classifier evaluates the underlying command. While [`permissions.blockReadsOutsideWorkingDirectories`](https://code.claude.com/docs/en/settings-reference#permissions-blockreadsoutsideworkingdirectories) is on, a retry that needs approval to run outside the sandbox prompts you instead. To be prompted on every unsandboxed retry even in auto mode, add an [ask rule](https://code.claude.com/docs/en/permissions#match-by-input-parameter) for `Bash(dangerouslyDisableSandbox:true)`.

You can disable this escape hatch by setting `"allowUnsandboxedCommands": false` in your [sandbox settings](https://code.claude.com/docs/en/settings-reference#sandbox-settings). With the escape hatch disabled, Claude Code ignores the `dangerouslyDisableSandbox` parameter, and every command Claude runs must run sandboxed unless you've listed it in `excludedCommands`. The `/sandbox` **Overrides** tab shows this setting as **Strict sandbox mode**.

Strict sandbox mode applies to the commands Claude runs. Commands you type yourself at the [`!` shell-mode prompt](https://code.claude.com/docs/en/interactive-mode#shell-mode-with-prefix) run outside the sandbox unless the session is one of these:

* **A [background session](https://code.claude.com/docs/en/agent-view)**: strict sandbox mode covers shell-mode commands too
* **A Linux session with [`CLAUDE_CODE_SUBPROCESS_ENV_SCRUB`](https://code.claude.com/docs/en/env-vars#variables) set**: every command runs sandboxed, shell-mode commands included

Before v2.1.260, strict sandbox mode sandboxed shell-mode commands in every session.

#### Temporary directories

The session temp directory is writable inside the sandbox by default, alongside the working directory. Unless you [disable filesystem isolation](#disable-filesystem-isolation), Claude Code sets `$TMPDIR` to this directory for sandboxed commands, so tools that write temporary files work without extra configuration. Unsandboxed commands inherit your shell's `$TMPDIR` unchanged, so while filesystem isolation is on, sandboxed and unsandboxed commands resolve `$TMPDIR` to different directories. To pass temporary files between the two, write them under the working directory instead.
