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
pageSha256: "54dd7dcc98c78609350c38032e234573726a71b39c3d29c8bddb00080383e44e"
contentMode: "local-full"
zh: ""
---

## Troubleshooting

Some commands fail inside the sandbox even though they work outside it. The fixes below cover the most common cases.

* **Commands fail with a host-not-allowed error**: many CLI tools need to reach specific hosts. Granting permission when prompted adds the host to your allowed list so the tool runs inside the sandbox in future.
* **`jest` hangs or fails**: `watchman` is incompatible with the sandbox. Run `jest --no-watchman` instead.
* **Go-based CLIs fail TLS verification on macOS**: tools such as `gh`, `gcloud`, and `terraform` may fail TLS verification under Seatbelt. List these tools in `excludedCommands` to run them outside the sandbox. If you are using `httpProxyPort` with a MITM proxy and custom CA, set [`enableWeakerNetworkIsolation`](https://code.claude.com/docs/en/settings-reference#sandbox-enableweakernetworkisolation) to `true` instead.
* **`open`, `osascript`, or browser-based auth flows fail with error `-600` on macOS**: the sandbox blocks Apple Events by default. Set [`allowAppleEvents`](https://code.claude.com/docs/en/settings-reference#sandbox-allowappleevents) to `true` in your user, managed, or CLI settings to allow them. Project settings are ignored for this key. Enabling it removes code-execution isolation, since sandboxed commands can then launch other applications unsandboxed with no user prompt and send AppleScript commands to running applications, subject to the macOS automation-consent prompt (TCC). Alternatively, add the command to `excludedCommands` to run it outside the sandbox.
* **`docker` commands fail**: `docker` is incompatible with the sandbox. Add `docker *` to `excludedCommands` to run it outside the sandbox.
* **`pbcopy`, `xclip`, or `wl-copy` doesn't update the clipboard**: these clipboard utilities can fail to reach the system clipboard from inside the sandbox, in which case the text piped to them doesn't arrive. To put Claude's output on your clipboard, ask Claude to print it in its response, then run [`/copy`](https://code.claude.com/docs/en/commands), which writes to the clipboard from the Claude Code process rather than from a sandboxed command. Alternatively, add `pbcopy *`, `wl-copy *`, or `xclip *` to `excludedCommands` to run the command outside the sandbox.
* **A git command fails with `unable to unlink old`**: `git merge`, `git checkout`, and similar commands fail this way when they need to replace a file the sandbox denies writes to, whether that file is under a [protected path](#protected-paths) such as `.claude/skills`, under one of your `denyWrite` entries, or outside the directories the sandbox lets commands write to at all. On Linux and WSL2 the error ends with `Read-only file system`.

  After the failure, Claude may [offer to rerun the command outside the sandbox](#the-unsandboxed-retry-escape-hatch); approve that retry, or run the git command yourself in another terminal. If you've set `allowUnsandboxedCommands` to `false`, Claude can't offer the retry, so run the command yourself. If the same git command fails often, add it to [`excludedCommands`](https://code.claude.com/docs/en/settings-reference#sandbox-excludedcommands).
* **Bubblewrap fails to start inside a container**: in an unprivileged container, bubblewrap can't mount a fresh `/proc` filesystem, so sandboxed commands fail with a `bwrap` error such as `Can't mount proc on /newroot/proc: Operation not permitted`. Set [`enableWeakerNestedSandbox`](https://code.claude.com/docs/en/settings-reference#sandbox-enableweakernestedsandbox) to `true` so the inner sandbox bind-mounts the container's existing `/proc` instead. Only use this setting when the outer container already provides the isolation boundary you need, since it exposes process information to sandboxed commands that a fresh `/proc` mount would hide.
* **0-byte read-only files appear at `.claude` settings paths, and "Yes, and don't ask again" doesn't save**: on Linux and WSL2, the sandbox holds a write denial on a file that doesn't exist yet by creating a 0-byte read-only placeholder there while a sandboxed command runs. The sandbox removes the placeholder afterward. If a session is killed before that cleanup runs, for example by SIGKILL, the placeholders stay behind. Later sessions bind them read-only again on every start, so a settings write such as saving a permission choice fails where one sits.

  Run `claude doctor` to list the leftover placeholder files. The [`Stale sandbox mask files left by a killed session`](https://code.claude.com/docs/en/errors#stale-sandbox-mask-files-left-by-a-killed-session) warning names up to three of them and counts the rest. Delete each file with `rm` while no other Claude Code session is running in that project. Before v2.1.257, Claude Code left the same placeholders behind without flagging them.
* **`--dangerously-skip-permissions` fails as root**: this flag is blocked when running as root or via sudo on Linux and macOS, because root access combined with no permission prompts can modify any file or service on the system. The check is skipped automatically inside a recognized sandbox. To run autonomously in a container, use the [dev container](https://code.claude.com/docs/en/devcontainer) configuration, which runs Claude Code as a non-root user.
