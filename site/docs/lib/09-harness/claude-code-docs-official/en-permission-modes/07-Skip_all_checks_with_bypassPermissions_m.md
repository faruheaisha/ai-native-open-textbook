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
sourceRel: "en/permission-modes.md"
rawUrl: "/raw/09-harness/claude-code-docs-official/en/permission-modes.md"
sourceSha256: "6b8fc8344f52131aab75fcba4eafee2853287d6d2cc3398dde09f46b4d52a2ff"
pageSha256: "e225336d7bf537b1f28b35648fa28841fbcb313575b33817a2974e94c261c816"
contentMode: "local-full"
zh: ""
---

## Skip all checks with bypassPermissions mode

`bypassPermissions` mode disables permission prompts and safety checks so tool calls execute immediately, including writes to [protected paths](#protected-paths).

The [actions no mode auto-approves](#actions-no-mode-auto-approves) still prompt in this mode.

Two [cross-session messaging](https://code.claude.com/docs/en/cross-session-messaging) safeguards still apply in this mode, and in plan-mode sessions where bypass permissions are available:

* The [`isolatePeerMachines`](https://code.claude.com/docs/en/settings-reference#isolatepeermachines) approval prompt for messages to your sessions beyond this machine still appears.
* When no [`crossSessionInbound`](https://code.claude.com/docs/en/cross-session-messaging#control-inbound-messages) value applies, Claude Code holds an inbound message from another of your sessions for your approval, and delivers without asking only when the sending session identifies itself as also bypassing permission prompts. If you leave the permission mode while messages are held, Claude Code re-applies the inbound rules and delivers any held message they now accept.

In sessions with bypass permissions available, Claude Code also doesn't enforce [plan mode's](#analyze-before-you-edit-with-plan-mode) blocks. Claude is still instructed to plan without editing, but a file edit or shell command it attempts during planning runs without prompting. Explicit [ask rules](https://code.claude.com/docs/en/permissions#manage-permissions) and `rm` and `rmdir` removals targeting a [critical path](#critical-paths) still prompt.

  Only use this mode in isolated environments like containers, VMs, or dev containers without internet access, where Claude Code cannot damage your host system.

You can't enter `bypassPermissions` from a session you started without it enabled. Enable it at launch with [`permissions.defaultMode: "bypassPermissions"`](https://code.claude.com/docs/en/settings-reference#permissions-defaultmode) or with an enabling flag:

```bash theme={null}
claude --permission-mode bypassPermissions
```

The `--dangerously-skip-permissions` flag is equivalent.

Claude Code refuses `bypassPermissions` in a session you start with [`--restricted`](https://code.claude.com/docs/en/cli-reference#cli-flags). `--restricted` requires Claude Code v2.1.248 or later.

The first time you start an interactive session with this mode enabled, Claude Code shows a warning dialog asking you to accept responsibility for actions taken without permission checks. Claude Code saves your acceptance to user settings, so the dialog appears only once. If you decline, Claude Code exits. In [non-interactive mode](https://code.claude.com/docs/en/headless) no dialog is shown, and a [background session](https://code.claude.com/docs/en/agent-view) started with `--bg` is refused until you've accepted the dialog in an interactive session.

On Linux and macOS, Claude Code refuses to start in this mode when running as root or under `sudo`:

```text theme={null}
--dangerously-skip-permissions cannot be used with root/sudo privileges for security reasons
```

The check is skipped automatically inside a recognized sandbox. To run autonomously in a container, use the [dev container](https://code.claude.com/docs/en/devcontainer) configuration, which runs Claude Code as a non-root user.

[Claude Code on the web](https://code.claude.com/docs/en/claude-code-on-the-web) does not honor `defaultMode: "bypassPermissions"` or `"dontAsk"` from your settings files, so a repository's checked-in settings cannot start a cloud session in bypass-permissions mode. The setting is ignored silently and the session starts in the permission mode shown in the mode dropdown instead. See [Switch permission modes](#switch-permission-modes) for which modes cloud sessions offer.

  `bypassPermissions` offers no protection against prompt injection or unintended actions. For background safety checks with far fewer permission prompts, use [auto mode](#eliminate-prompts-with-auto-mode) instead. Administrators can block this mode by setting `permissions.disableBypassPermissionsMode` to `"disable"` in [managed settings](https://code.claude.com/docs/en/managed-settings).
