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
pageSha256: "c9bbc9f0aa54dcbd28674f4af2da0d824e04f233430bc05015f2970a74bd105b"
contentMode: "local-full"
zh: ""
---

## Common setups

Permission modes decide whether Claude asks before an action, and the [Bash sandbox](https://code.claude.com/docs/en/sandboxing) and outer [isolation boundaries](https://code.claude.com/docs/en/sandbox-environments) decide what an action can reach once it runs. Each row below pairs a goal with the flags or settings that get you there and the isolation it needs, as a starting point. [Available modes](#available-modes) lists what runs without a prompt in each mode.

| You want to                                              | Start with                                                                                                                                                          | Isolation needed                                                                                                                                                                             | Notes                                                                                                                                                                                                                               |
| :------------------------------------------------------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------ | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | :---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Review every action yourself                             | Manual mode: `claude --permission-mode default`                                                                                                                     | None                                                                                                                                                                                         | Sensitive work, unfamiliar code                                                                                                                                                                                                     |
| Iterate locally with fewer prompts, without a classifier | Manual mode plus the Bash sandbox in [auto-allow mode](https://code.claude.com/docs/en/sandboxing#sandbox-modes): `claude --permission-mode default`, then run `/sandbox` and select auto-allow | The built-in Bash sandbox, on macOS, Linux, and WSL2                                                                                                                                         | Deny rules still apply, and ask rules that name a command, such as `Bash(git push *)`, still prompt. To turn the sandbox on from a settings file instead, set [`sandbox.enabled`](https://code.claude.com/docs/en/settings-reference#sandbox-enabled) to `true` |
| Explore before changing anything                         | `claude --permission-mode plan`                                                                                                                                     | None                                                                                                                                                                                         | Claude Code blocks edits until you [approve a plan](#review-and-approve-a-plan)                                                                                                                                                     |
| Work hands-off in auto mode                              | `claude --permission-mode auto`, the [built-in starting permission mode](#which-mode-a-session-starts-in) on Pro, Max, and Team                                     | None; a sandbox or container adds defense in depth                                                                                                                                           | Requires a [supported model](#eliminate-prompts-with-auto-mode), and your organization can [turn auto mode off](#eliminate-prompts-with-auto-mode)                                                                                  |
| Run in CI with an exact allowlist                        | `claude -p "run the test suite" --permission-mode dontAsk --allowedTools "Bash(npm test)" "Read"`                                                                   | None beyond what your CI runner provides                                                                                                                                                     | [Claude Code on the web](https://code.claude.com/docs/en/claude-code-on-the-web) ignores `dontAsk` from settings files                                                                                                                                          |
| Run fully unattended inside a container                  | `claude -p "<prompt>" --dangerously-skip-permissions`                                                                                                               | Required: a container, VM, or the [sandbox runtime](https://code.claude.com/docs/en/sandbox-environments#sandbox-runtime); on Linux and macOS, run it as a [non-root user](#skip-all-checks-with-bypasspermissions-mode) | Claude Code on the web ignores this mode from settings files. In this `-p` run, the [few calls that would still prompt](#skip-all-checks-with-bypasspermissions-mode) are denied instead                                            |

The Bash sandbox and auto mode work independently and combine, except in plan mode, where [auto-allow doesn't widen approvals](https://code.claude.com/docs/en/sandboxing#sandbox-modes). For the full interaction, see [How sandboxing relates to permissions and permission modes](https://code.claude.com/docs/en/sandboxing#how-sandboxing-relates-to-permissions-and-permission-modes) and [How isolation relates to permission modes](https://code.claude.com/docs/en/sandbox-environments#how-isolation-relates-to-permission-modes).

<h2 id="which-mode-a-session-starts-in">
  Which mode a session starts in
</h2>

When you start a new session in a terminal, Claude Code takes the permission mode from the first of these that applies:

1. The `--permission-mode` flag, or `--dangerously-skip-permissions`

2. `permissions.defaultMode` in a [settings file](https://code.claude.com/docs/en/settings#where-settings-live)

   If you set `"auto"` in `.claude/settings.json` or `.claude/settings.local.json`, the value doesn't take effect, and Claude Code then uses the built-in default rather than a `defaultMode` from `~/.claude/settings.json`. If you set `"bypassPermissions"` in those two files, it doesn't take effect either, and the session starts in Manual mode. The other values apply from any settings file.

3. The built-in default

Conversations the VS Code extension starts follow the extension's own list in [Switch permission modes](#switch-permission-modes). For the permission mode Claude Code starts a resumed session in, see [permission mode on resume](https://code.claude.com/docs/en/sessions#permission-mode-on-resume).

The built-in `auto` default requires Claude Code v2.1.228 or later on macOS, Linux, and WSL, and v2.1.233 or later on native Windows. On earlier versions, the built-in default is Manual.

The built-in default depends on how you run Claude Code, on your plan, and on whether Claude Code could fetch its feature flags. The first row that matches your session applies. The table covers sessions you start in a terminal or through the VS Code extension; for the desktop app and claude.ai, see the Desktop and Web tabs in [Switch permission modes](#switch-permission-modes).

| How you run Claude Code                                                                                                                                                                                                         | Built-in starting permission mode |
| :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | :-------------------------------- |
| Any settings file sets `disableAutoMode` to `"disable"`                                                                                                                                                                         | `default`                         |
| [Feature-flag fetching](https://code.claude.com/docs/en/env-vars#features-that-need-feature-flag-fetching) is off                                                                                                                                           | `default`                         |
| Your [first session after you install Claude Code or upgrade](https://code.claude.com/docs/en/env-vars#first-session-after-an-install-or-upgrade) to a version that adds this default, unless, after a fresh install, Claude Code fetches the flags in time | `default`                         |
| `claude -p` or the [Agent SDK](https://code.claude.com/docs/en/agent-sdk/permissions)                                                                                                                                                                       | `default`                         |
| Amazon Bedrock, Google Cloud's Agent Platform, Microsoft Foundry, [Claude Platform on AWS](https://code.claude.com/docs/en/claude-platform-on-aws), or a signed-in [Claude apps gateway](https://code.claude.com/docs/en/claude-apps-gateway) session                                   | `default`                         |
| A Pro, Max, or Team plan, in a terminal or through the [VS Code extension](https://code.claude.com/docs/en/vs-code)                                                                                                                                         | `auto`                            |
| An Enterprise plan or a Claude Console API key                                                                                                                                                                                  | `default`                         |

When feature-flag fetching is off, or in a [first session after an install or upgrade](https://code.claude.com/docs/en/env-vars#first-session-after-an-install-or-upgrade) where the flags haven't arrived yet, the VS Code extension ignores every settings file when choosing the starting permission mode.

When the flag, a settings file, or the built-in default selects `auto` but auto mode isn't available to the session, Claude Code starts the session in Manual instead. Auto mode is unavailable when the session doesn't meet the [availability requirements](#eliminate-prompts-with-auto-mode), such as a settings file turning it off or a model that doesn't support it, or when Anthropic has temporarily turned it off server-side.

The first time the built-in default starts one of your sessions in auto mode, Claude Code shows a notice that links to this page:

* In a terminal, once, at the top of the session
* In the VS Code extension, as a card on the new-conversation screen that stays until you dismiss it

On Pro, Max, and Team plans, if your `~/.claude/settings.json` sets a `defaultMode` other than `auto` and no other settings file sets one, your sessions keep starting in that mode. Claude Code asks once, in the terminal or in the VS Code extension, whether to change the setting to auto mode. If you decline, your setting stays as it is.

<h3 id="start-in-a-different-mode">
  Start in a different permission mode
</h3>

You can set the starting permission mode for one session, or as a default for every session on a machine, in a project, or in an organization. When more than one settings file sets `permissions.defaultMode`, [settings precedence](https://code.claude.com/docs/en/settings#settings-precedence) decides, so a project or managed value outranks `~/.claude/settings.json`. To change the permission mode of a session that's already running, see [Switch permission modes](#switch-permission-modes).

| To set the starting permission mode for          | Do this                                                                                                                                                                                                                                                                                                                                                        |
| :----------------------------------------------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| One session you're about to start                | Pass the permission mode as a flag, for example `claude --permission-mode default`                                                                                                                                                                                                                                                                             |
| Every terminal session you start on this machine | Set `permissions.defaultMode` in `~/.claude/settings.json`. For what the VS Code extension reads, see [Switch permission modes](#switch-permission-modes)                                                                                                                                                                                                      |
| Every terminal session you start in one project  | Set `permissions.defaultMode` in the project's `.claude/settings.json`. Sessions you start in a terminal honor every value except `auto` and `bypassPermissions`; sessions the VS Code extension starts don't read project settings for the starting permission mode                                                                                           |
| Every terminal session in your organization      | Set `permissions.defaultMode` in [managed settings](https://code.claude.com/docs/en/managed-settings). Terminal sessions start in that mode and people can still switch to auto mode; for what the VS Code extension reads, see [Switch permission modes](#switch-permission-modes). To remove auto mode so nobody can select it, set `permissions.disableAutoMode` to `"disable"` instead |

This example makes every terminal session on your machine start in Manual mode, whose config value is `default`. Save it in `~/.claude/settings.json`:

```json theme={null}
{
  "permissions": {
    "defaultMode": "default"
  }
}
```

The next session you start shows `⏸ manual mode on` in the status bar.
