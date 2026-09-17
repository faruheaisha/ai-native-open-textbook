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
pageSha256: "f6a4364c7484019d9d3278f7dec18dae5ce2fd2fdadfb9ef633ac5d0db2bdfbe"
contentMode: "local-full"
zh: ""
---

## How sandboxing works

### Filesystem isolation

The sandboxed Bash tool restricts file system access to specific directories:

* **Default write behavior**: read and write access to the current working directory and its subdirectories, any directories you've added with `--add-dir`, `/add-dir`, or [`permissions.additionalDirectories`](https://code.claude.com/docs/en/settings-reference#permissions-additionaldirectories), plus the session temp directory that `$TMPDIR` points to
* **Default read behavior**: read access to the entire computer, except certain denied directories. Note that this default still allows reading credential files such as `~/.aws/credentials` and `~/.ssh/`. Use [`sandbox.credentials`](#protect-credentials) to block reads of these files and unset secret environment variables, or add the paths to `denyRead`.
* **Blocked access**: cannot modify files outside the working directory, added directories, and session temp directory without explicit permission, including shell configuration files such as `~/.bashrc` and system binaries in `/bin/`
* **Git worktrees**: when the working directory is a [linked git worktree](https://code.claude.com/docs/en/worktrees), the sandbox also allows writes to the main repository's shared `.git` directory so commands such as `git commit` can update refs and the index. Writes to `hooks/` and `config` inside that directory remain denied.
* **Configurable**: define custom allowed and denied paths through settings

To skip filesystem isolation entirely while keeping network isolation, set [`sandbox.filesystem.disabled`](#disable-filesystem-isolation).

### Protected paths

Inside the directories that sandboxed commands can write to, the sandbox still denies writes to the files Claude Code loads configuration and code from. A command that could edit those files could grant itself permissions, or add a hook or MCP server that Claude Code runs outside the sandbox. The permission system has its own [protected paths](https://code.claude.com/docs/en/permission-modes#protected-paths), which control what Claude Code approves before a tool runs; the sandbox's list applies to a command that is already running. It covers four groups of paths:

* **In your working directory and the directories above it**: the `.claude` settings files, the `.claude/skills`, `.claude/agents`, `.claude/commands`, and `.claude/hooks` directories, `.mcp.json`, and the files Claude Code runs on its own, such as `.claude/workflows` and `.claude/scheduled_tasks.json`
* **In your working directory only**: shell startup files such as `.bashrc` and `.zshrc`, `.gitconfig`, the `.vscode` and `.idea` directories, and `hooks` and `config` inside `.git`
* **Files that would turn your working directory into a bare git repository**: `HEAD`, `objects`, and `refs` at the top level, plus `config` and `hooks` there when they already exist, even when the `config` directory belongs to your project rather than to git. On Linux and WSL2, the sandbox deletes a top-level `HEAD` file or `objects` or `refs` directory that appears while a sandboxed command is running
* **In `~/.claude`, or the directory `CLAUDE_CONFIG_DIR` points to**: most of its contents, plus `~/.claude.json` and the `.credentials.json` credential store

If a symlink appears at a protected settings file's path during the session, the sandbox also denies writes to the file it points to, starting with the next command.

There is no way to exempt one of these paths: an `allowWrite` entry or an `Edit` allow rule that covers the path doesn't lift the protection. The only way to turn the protection off is [`filesystem.disabled`](#disable-filesystem-isolation), which turns off filesystem isolation for every path. To see most of these paths resolved for your machine, run `/sandbox` and open the **Config** tab, which lists them under **Denied within allowed**, mixed in with your own `denyWrite` entries.

If `git merge` or `git checkout` fails with `unable to unlink old` on one of these paths, see [Troubleshooting](#troubleshooting).

### Network isolation

Network access is controlled through a proxy server running outside the sandbox:

* **Domain restrictions**: Claude Code pre-allows no domains by default. The first time a command needs a new domain, Claude Code prompts for approval, or in [auto mode](https://code.claude.com/docs/en/permission-modes#eliminate-prompts-with-auto-mode) sends the request to the classifier. If you choose Yes when prompted, Claude Code allows the host for the rest of the current session and doesn't prompt again for later connections to the same host. If you choose "Yes, and don't ask again", Claude Code saves a `WebFetch(domain:...)` allow rule to your [local settings](https://code.claude.com/docs/en/permissions#permission-system), so the host stays allowed in future sessions. Pre-allow domains with [`allowedDomains`](https://code.claude.com/docs/en/settings-reference#sandbox-network-alloweddomains) to avoid the prompt entirely. Claude Code also pre-allows domains from `WebFetch(domain:...)` allow rules, as described in [Permission rules](#permission-rules).
* **Strict allowlist**: if you set [`strictAllowlist`](https://code.claude.com/docs/en/settings-reference#sandbox-network-strictallowlist) to `true` in user, managed, or CLI `--settings` settings, Claude Code denies sandboxed commands access to any host outside the allowlist instead of prompting. The allowlist is the same one the sandbox otherwise prompts against: `allowedDomains` plus domains from `WebFetch(domain:...)` allow rules, or only the managed settings entries when `allowManagedDomainsOnly` is set. Claude Code enforces this for sandboxed commands only; in-process tools such as `WebFetch` still follow their [permission rules](#permission-rules). Setting it in a repository's `.claude/settings.json` or `.claude/settings.local.json` has no effect. Requires Claude Code v2.1.219 or later.
* **Managed lockdown**: if [`allowManagedDomainsOnly`](https://code.claude.com/docs/en/settings-reference#sandbox-network-allowmanageddomainsonly) is set in managed settings, non-allowed domains are blocked automatically instead of prompting, and only `allowedDomains` and `WebFetch(domain:...)` allow rules from managed settings are honored.
* **Corporate proxy**: when your network requires outbound traffic to go through a corporate proxy, set `HTTPS_PROXY`, `HTTP_PROXY`, and `NO_PROXY` as [proxy configuration](https://code.claude.com/docs/en/network-config#proxy-configuration) describes, in the `env` block of your settings so that [background agents](https://code.claude.com/docs/en/network-config#set-network-variables-in-settings-not-the-shell) get them too, or in the environment you launch Claude Code from. Claude Code enforces the domain allowlist and then tunnels allowed connections through that upstream proxy.
* **Custom proxy support**: advanced users can implement custom rules on outgoing traffic
* **Comprehensive coverage**: restrictions apply to all scripts, programs, and subprocesses spawned by commands

In a `WebFetch(domain:...)` rule, the sandbox honors two wildcard forms: a leading `*.`, such as `*.example.com`, and a bare `*`. The bare `*` form requires Claude Code v2.1.186 or later. A wildcard in any other position, such as `WebFetch(domain:example.*)`, still matches fetches but has no effect on sandboxed commands.

  The built-in proxy enforces the allowlist based on the requested hostname and, by default, does not terminate or inspect TLS traffic. The experimental [`network.tlsTerminate`](https://code.claude.com/docs/en/settings-reference#sandbox-network-tlsterminate) setting, available in Claude Code v2.1.199 and later, makes the built-in proxy terminate TLS itself, which [`mask` credential entries](#mask-credentials) require. See [Security limitations](#security-limitations) for the implications of the default, and [Custom proxy configuration](#custom-proxy-configuration) if your threat model requires TLS inspection.

#### IPv6 addresses in domain lists

The sandbox's domain lists are `allowedDomains`, `deniedDomains`, and the `WebFetch(domain:...)` rules that feed them. To match an IPv6 address in any of them, write the literal in brackets: `"[::1]"` matches that address on every port, and `"[::1]:443"` matches it on port 443 only. Write the port as a number from 1 to 65535 with no leading zeros. The bracketed form requires Claude Code v2.1.229 or later. Before v2.1.229, when the text after an unbracketed entry's last colon was a port number, Claude Code read it as one, so `::1:443` named the address `::1` on port 443.

When you choose "Yes, and don't ask again" at the network approval prompt for an IPv6 address, Claude Code saves the `WebFetch(domain:...)` rule with the address bracketed, so the rule keeps matching the address in future sessions.

An unbracketed entry with two or more colons is ambiguous: `::1:443` is both a complete IPv6 address and an address followed by a port. Claude Code enforces ambiguous spellings conservatively instead of guessing which reading you meant:

* **Deny lists**: Claude Code denies every reading the entry parses as, so whichever reading you meant is blocked. For an entry with no parseable reading, Claude Code blocks nothing.
* **Allow lists**: Claude Code never allows more than you wrote. It rewrites an ambiguous entry to its host-and-port reading when that reading parses cleanly, and may drop the entry entirely rather than widen the allowlist.

Run `claude doctor` in your terminal to find the affected entries: the `Sandbox network domain entries have unreliable spellings` warning names up to three of them and counts the rest. Rewrite each one in the bracketed form to clear the warning. The warning also names entries whose spelling is unreliable for other reasons, such as `@`, path or query characters, or wildcards inside brackets.

### OS-level enforcement

The sandboxed Bash tool uses operating system security primitives:

* **macOS**: uses Seatbelt for sandbox enforcement
* **Linux**: uses [bubblewrap](https://github.com/containers/bubblewrap) for isolation
* **WSL2**: uses bubblewrap, same as Linux

WSL1 is not supported because bubblewrap requires kernel features only available in WSL2.

These same primitives are available as the standalone [`@anthropic-ai/sandbox-runtime`](https://github.com/anthropic-experimental/sandbox-runtime) package, which the [Sandbox environments](https://code.claude.com/docs/en/sandbox-environments#sandbox-runtime) page covers as a separate approach for wrapping the entire Claude Code process.
