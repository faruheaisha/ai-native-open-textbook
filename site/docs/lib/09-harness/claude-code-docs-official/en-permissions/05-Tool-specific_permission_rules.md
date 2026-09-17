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
sourceRel: "en/permissions.md"
rawUrl: "/raw/09-harness/claude-code-docs-official/en/permissions.md"
sourceSha256: "6cc02236c28e33b38f1977f95d5c1b3c8805c0ad97cb377866cd1de1c5cb8cbc"
pageSha256: "2e522cbfd3ceb6df43f1a4f4d1384eb7fbedf97bcf9c558db7f7560104d210b0"
contentMode: "local-full"
zh: ""
---

## Tool-specific permission rules

### Bash

Bash rules match the whole command text, with `*` standing in for any text. [Wildcard patterns](#wildcard-patterns) shows which commands each rule shape matches and where to put the `*`. The rest of this section covers how Claude Code matches compound commands and wrappers, what a rule doesn't match, read-only commands, and redirections.

#### Compound commands

  Claude Code is aware of shell operators, so a rule like `Bash(safe-cmd *)` won't give it permission to run the command `safe-cmd && other-cmd`. The recognized command separators are `&&`, `||`, `;`, `|`, `|&`, `&`, and newlines. A rule must match each subcommand independently.

Deny and ask rules apply when any subcommand matches them, including a command nested inside a subshell, a command substitution, or a control-flow body such as a `for` loop. An ask rule like `Bash(git clean *)` still prompts you for `cd /tmp && git clean -f` or `echo "$(git clean -f)"`, even in [auto mode](https://code.claude.com/docs/en/permission-modes#eliminate-prompts-with-auto-mode).

When `&&` or `||` has nothing after it, such as in `npm test &&`, Claude Code treats the command as unparseable and doesn't split it into subcommands for allow-rule matching, so a rule such as `Bash(npm *)` doesn't approve it.

When you approve a compound command with "Yes, and don't ask again", Claude Code saves a separate rule for each subcommand that requires approval, rather than a single rule for the full compound string. For example, approving `git status && npm test` saves a rule for `npm test`, so future `npm test` invocations are recognized regardless of what precedes the `&&`. Subcommands like `cd` into a subdirectory generate their own Read rule for that path. Up to 5 rules may be saved for a single compound command.

<h4 id="process-wrappers">
  Wrappers
</h4>

Before matching Bash rules, Claude Code strips a fixed set of wrappers, so a rule like `Bash(npm test *)` also matches `timeout 30 npm test`. The stripped wrappers are `timeout`, `time`, `nice`, `nohup`, and `stdbuf`, plus the shell builtins `command` and `builtin`, and zsh's `noglob`. Each runs its argument as the actual command. Two related forms aren't stripped: the query form `command -v`, which looks up a command rather than running one, and zsh's `nocorrect`.

Claude Code also strips a leading assignment of certain known-safe environment variables, so `Bash(npm test *)` matches `NODE_ENV=test npm test`. An allow rule won't match past an assignment of any other variable. A deny or ask rule matches past any leading assignment, so `Bash(rm *)` in deny still matches `FOO=bar rm -rf tmp/`.

Bare `xargs` is also stripped, so `Bash(grep *)` matches `xargs grep pattern`. Stripping applies only when `xargs` has no flags: an invocation like `xargs -n1 grep pattern` is matched as an `xargs` command, so rules written for the inner command do not cover it.

This wrapper list is built in and is not configurable. Development environment runners such as `direnv exec`, `devbox run`, `mise exec`, `npx`, and `docker exec` are not in the list. Because these tools execute their arguments as a command, a rule like `Bash(devbox run *)` matches whatever comes after `run`, including `devbox run rm -rf .`. To approve work inside an environment runner, write a specific rule that includes both the runner and the inner command, such as `Bash(devbox run npm test)`. Add one rule per inner command you want to allow.

Exec wrappers such as `watch`, `setsid`, `ionice`, and `flock` can't be auto-approved by a prefix rule like `Bash(watch *)`, so in Manual mode they always prompt. The same applies to `find` with `-exec` or `-delete`: a `Bash(find *)` rule doesn't cover these forms. To approve a specific invocation, write an exact-match rule for the full command string.

<h4 id="bash-rule-limits">
  What a Bash rule doesn't match
</h4>

A Bash rule matches the command text Claude writes, after Claude Code splits [compound commands](#compound-commands) and strips [wrappers](#process-wrappers). It doesn't match the same program invoked in a different form, so a deny or ask rule covers the invocation Claude usually produces and isn't a security boundary around the program. These rules in `deny` or `ask` stop the first form and not the others:

| Rule               | Stops                      | Doesn't stop                                                                                          |
| :----------------- | :------------------------- | :---------------------------------------------------------------------------------------------------- |
| `Bash(curl *)`     | `curl https://example.com` | `/usr/bin/curl https://example.com`, `sh -c 'curl https://example.com'`                               |
| `Bash(rm *)`       | `rm -rf build/`            | `/bin/rm -rf build/`, `bash -c 'rm -rf build/'`                                                       |
| `Bash(git push *)` | `git push origin main`     | `git -C . push origin main`, `git -c push.default=current push origin main`, `git 'push' origin main` |

Your other rules and the permission mode decide the commands in the last column.

For filesystem and network enforcement that doesn't depend on the command text, use [sandboxing](https://code.claude.com/docs/en/sandboxing). To inspect the full command text with your own logic before it runs, use a [PreToolUse hook](#extend-permissions-with-hooks).

#### Read-only commands

Claude Code recognizes a built-in set of Bash commands as read-only and runs them without a permission prompt in every mode, except for a path that [`permissions.blockReadsOutsideWorkingDirectories`](https://code.claude.com/docs/en/settings-reference#permissions-blockreadsoutsideworkingdirectories) fences. The set includes `ls`, `cat`, `echo`, `pwd`, `head`, `tail`, `grep`, `find`, `wc`, `which`, `diff`, `stat`, `du`, `cd`, and read-only forms of `git`. The set is not configurable; to require a prompt for one of these commands, add an `ask` or `deny` rule for it.

A redirect such as `ls > out.txt` adds a check on the target. See [Redirections](#redirections).

Unquoted glob patterns are permitted for commands whose every flag is read-only, so `ls *.ts` and `wc -l src/*.py` run without a prompt.

In Manual mode, commands from this set still prompt in these cases:

* **Unquoted globs for commands with write-capable flags**: commands with write-capable or exec-capable flags, such as `find`, `sort`, `sed`, and `git`, prompt when an unquoted glob is present, because the glob could expand to a flag like `-delete`.
* **`docker` pointed at another daemon**: read-only forms of `docker` prompt when the command carries a flag that selects a different daemon, such as `-H`, `--context`, or Podman's `--url` and `--connection`.
* **`file` with path-opening flags**: `file` prompts when it passes `-m`/`--magic-file` or `-f`/`--files-from`, because those flags make `file` open the paths named in the flag's value.
* **Network paths on Windows**: a command whose arguments include a network (UNC) path, such as `\\server\share\file`, prompts because accessing a network path can send your Windows credentials to the host it names. The same check applies to [PowerShell tool](https://code.claude.com/docs/en/tools-reference#powershell-tool) commands.
* **Commands the analysis can't parse**: when Claude Code can't fully parse a command, it asks for approval instead of treating the command as read-only. Commands longer than 10,000 characters always prompt because they exceed what the analysis parses.

A `cd` into a path inside your working directory or an [additional directory](#working-directories) is also read-only, and a compound command like `cd packages/api && ls` runs without a prompt when each part qualifies on its own. These combinations prompt even when each part is read-only:

* **`cd` with `git`**: prompts when the `cd` changes into a different directory, since running `git` in a new directory can execute that directory's hooks. A `cd` whose target resolves to the current working directory is a no-op and doesn't trigger the prompt.
* **`cd` with a redirect**: prompts when Claude Code can't determine which directory the redirect target resolves against after the `cd` runs. A command whose only redirect target is `/dev/null`, such as `cd app; grep -r pattern . 2>/dev/null`, doesn't prompt, because `/dev/null` doesn't depend on the working directory.

  Bash permission patterns that try to constrain command arguments are fragile. For example, `Bash(curl http://github.com/ *)` intends to restrict curl to GitHub URLs, but won't match variations like:

  * Options before URL: `curl -X GET http://github.com/...`
  * Different protocol: `curl https://github.com/...`
  * Redirects: `curl -L http://short.example.com/xyz`, which redirects to GitHub
  * Variables: `URL=http://github.com && curl $URL`

  For more reliable URL filtering, consider:

  * **Restrict Bash network tools**: use deny rules to stop `curl`, `wget`, and similar commands, then use the WebFetch tool with `WebFetch(domain:github.com)` permission for allowed domains. A deny rule doesn't match the same program by path or inside `sh -c`, so pair it with the [sandbox network allowlist](https://code.claude.com/docs/en/sandboxing#network-isolation) when the restriction must hold; see [what a Bash rule doesn't match](#bash-rule-limits)
  * **Use PreToolUse hooks**: implement a hook that validates URLs in Bash commands and blocks disallowed domains
  * **Add CLAUDE.md guidance**: describe your allowed curl patterns in `CLAUDE.md`. This shapes what Claude tries but doesn't enforce a boundary, so pair it with one of the options above

  Note that using WebFetch alone doesn't prevent network access. If Bash is allowed, Claude can still use `curl`, `wget`, or other tools to reach any URL.

#### Redirections

When a command redirects output or input, Claude Code checks the redirect target against your file rules as if Claude wrote or read that file directly:

* **Output redirects**: for `> file`, `>> file`, or `2> file`, the check covers your `Edit` allow and deny rules, [protected paths](https://code.claude.com/docs/en/permission-modes#protected-paths), and the [working directories](#working-directories). A rule such as `Bash(git commit *)` allows the command, not the target. A target that starts with `~` or contains a glob character needs your approval.
* **Input redirects**: for `< file`, the check covers your `Read` allow and deny rules and the working directories. A target outside the working directories needs your approval unless an allow rule covers it. A target that contains a glob pattern, or a relative path that follows a `cd` in the same command, needs your approval even when an allow rule covers it. Claude Code checks input targets in v2.1.257 and later.

Targets with no file behind them aren't checked: `/dev/null`, file-descriptor forms such as `2>&1` and `<&3`, and here-docs and here-strings.

### PowerShell

PowerShell permission rules use the same shape as Bash rules. Wildcards with `*` match at any position, the `:*` suffix is equivalent to a trailing ` *`, and a bare `PowerShell` or `PowerShell(*)` matches every command. This configuration allows `Get-ChildItem` and `git commit` commands while blocking `Remove-Item`:

```json theme={null}
{
  "permissions": {
    "allow": [
      "PowerShell(Get-ChildItem *)",
      "PowerShell(git commit *)"
    ],
    "deny": [
      "PowerShell(Remove-Item *)"
    ]
  }
}
```

Common aliases are canonicalized before matching. A rule written for the cmdlet name also matches its aliases, so `PowerShell(Get-ChildItem *)` matches `gci`, `ls`, and `dir` as well. Matching is case-insensitive.

Claude Code parses the PowerShell AST and checks each command in a compound command independently. Pipeline operators `|`, statement separators `;`, and on PowerShell 7+ the chain operators `&&` and `||` split a compound command into subcommands. A rule must match every subcommand for the compound command to be allowed.

### Read and Edit

To block Claude's file tools from reading a file or directory, add a `Read` deny rule for its path, such as `Read(./.env)` or `Read(./secrets/**)`; [Exclude sensitive files](https://code.claude.com/docs/en/settings-reference#exclude-sensitive-files) has a paste-ready example.

`Edit` rules apply to all built-in tools that edit files. Claude makes a best-effort attempt to apply `Read` rules to all built-in tools that read files like Grep and Glob, to `@file` mentions in your prompts, and to the selection and open-file context that a connected [IDE](https://code.claude.com/docs/en/vs-code#the-built-in-ide-mcp-server) shares with Claude.

A `Read` deny rule also blocks the [Edit and Write tools](https://code.claude.com/docs/en/errors#file-is-covered-by-a-read-deny-rule) on the same path, including creating a new file there. NotebookEdit isn't covered, so add an `Edit` deny rule for paths no tool may change. The check requires Claude Code v2.1.208 or later on edits, and v2.1.228 or later on writes.

Claude Code checks file permissions against `Edit(path)` and `Read(path)` rules only. If you write a path rule for `Write`, `NotebookEdit`, `Glob`, or the legacy `MultiEdit` tool instead, Claude Code accepts the rule but never consults it, and [warns at startup](https://code.claude.com/docs/en/errors#is-not-matched-by-file-permission-checks), except for a `Glob` rule passed in `--allowedTools`. Use `Edit(docs/**)` in place of `Write(docs/**)`, `NotebookEdit(docs/**)`, or `MultiEdit(docs/**)`, and `Read(docs/**)` in place of `Glob(docs/**)`. Claude Code doesn't warn about a tool-name rule with no path, such as a deny rule for `Write`; it matches that rule at the tool level everywhere. Requires Claude Code v2.1.210 or later.

  Read and Edit deny rules apply to Claude's built-in file tools, to file commands Claude Code recognizes in Bash, such as `cat`, `head`, `tail`, and `sed`, and to the targets of Bash [redirections](#redirections) such as `> file` and `< file`. They don't apply to a command that reads files without naming them, such as `grep -r pattern .` run from the directory that holds the file, or to arbitrary subprocesses that read or write files indirectly, like a Python or Node script that opens files itself. For OS-level enforcement that blocks all processes from accessing a path, [enable the sandbox](https://code.claude.com/docs/en/sandboxing).

Read and Edit rules both use [gitignore](https://git-scm.com/docs/gitignore) pattern syntax with four distinct pattern types; for single-segment directory patterns, the matching depth also depends on the rule type, described later in this section:

| Pattern            | Meaning                              | Example                          | Matches                                                       |
| ------------------ | ------------------------------------ | -------------------------------- | ------------------------------------------------------------- |
| `//path`           | Absolute path from filesystem root   | `Read(//Users/alice/secrets/**)` | `/Users/alice/secrets/**`                                     |
| `~/path`           | Path from home directory             | `Read(~/Documents/*.pdf)`        | `/Users/alice/Documents/*.pdf`                                |
| `/path`            | Path relative to the settings source | `Edit(/src/**/*.ts)`             | `<primary working directory>/src/**/*.ts` in project settings |
| `path` or `./path` | Path relative to current directory   | `Read(*.env)`                    | `<cwd>/*.env`                                                 |

  A pattern like `/Users/alice/file` isn't an absolute path. The single leading slash anchors at the settings source, not the filesystem root. Use `//Users/alice/file` for absolute paths.

A `/path` pattern anchors at a directory associated with the settings source that defines it, so the same rule matches different locations depending on where you put it:

| Rule defined in                                 | `/path` resolves to                |
| :---------------------------------------------- | :--------------------------------- |
| Project settings at `.claude/settings.json`     | `<primary working directory>/path` |
| Local settings at `.claude/settings.local.json` | `<primary working directory>/path` |
| User settings at `~/.claude/settings.json`      | `~/.claude/path`                   |
| A file passed with `--settings <file>`          | `<directory of file>/path`         |
| CLI flags or session rules                      | `<primary working directory>/path` |

A rule you add through `/permissions` follows the row for the settings file you save it to.

Local settings rules anchor at the session's [primary working directory](#working-directories), not at the repository root where Claude Code [stores the file](#permission-system) in v2.1.211 and later. In a session started at the repository root, the two directories are the same; in a [worktree](https://code.claude.com/docs/en/worktrees) session, a shared rule such as `Edit(/src/**)` matches that worktree's own `src/` directory.

A deny rule such as `Read(/secrets/**)` in user settings blocks `~/.claude/secrets/**`, not a `secrets` directory in your project. To write a rule in user settings that applies inside every project, use a `//` absolute path or a `~/` home-relative path instead.

On Windows, paths are normalized to POSIX form before matching. `C:\Users\alice` becomes `/c/Users/alice`, so use `//c/**/.env` to match `.env` files anywhere on that drive. To match across all drives, use `//**/.env`.

Examples:

* `Edit(/docs/**)`: edits in `<primary working directory>/docs/`, not `/docs/` or `<primary working directory>/.claude/docs/`
* `Read(~/.zshrc)`: reads your home directory's `.zshrc`
* `Edit(//tmp/scratch.txt)`: edits the absolute path `/tmp/scratch.txt`
