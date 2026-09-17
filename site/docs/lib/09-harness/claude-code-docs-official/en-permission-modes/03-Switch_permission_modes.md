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
pageSha256: "97ccd10ea3e9ca8a84d4fe83b832897ccb9d9ebfca46d81f1add3112366cb65a"
contentMode: "local-full"
zh: ""
---

## Switch permission modes

Each interface has its own control for switching permission modes during a session and its own way of choosing the permission mode new sessions start in. Select your interface to see its controls.

    **During a session**: press `Shift+Tab` to cycle permission modes. From `auto`, the first press switches to `default`, and the cycle then runs `default` → `acceptEdits` → `plan` → back to `default`. Optional modes, described below, slot in after `plan`. The status bar shows the active mode as a gray `⏸ manual mode on` for `default`, or as `⏵⏵ accept edits on`, `⏸ plan mode on`, `⏵⏵ auto mode on`, `⏵⏵ don't ask on`, or `⏵⏵ bypass permissions on`.

    Not every mode is in the default cycle:

    * `auto`: appears when [auto mode is available](#eliminate-prompts-with-auto-mode); cycling to it switches permission modes without a confirmation prompt
    * `bypassPermissions`: appears after you start with `--permission-mode bypassPermissions`, `--dangerously-skip-permissions`, `--allow-dangerously-skip-permissions`, or `permissions.defaultMode: "bypassPermissions"` in [user, `--settings`, or managed settings](https://code.claude.com/docs/en/settings-reference#permissions-defaultmode). The `--allow-` variant adds the permission mode to the cycle without activating it
    * `dontAsk`: never appears in the cycle; set it with `--permission-mode dontAsk`

    Enabled optional modes slot in after `plan`, with `bypassPermissions` first and `auto` last. If you have both enabled, you will cycle through `bypassPermissions` on the way to `auto`.

    **From a Bash permission prompt**: in the Manual and `acceptEdits` permission modes, when [auto mode](#eliminate-prompts-with-auto-mode) is available, Claude Code adds **Yes, and switch to auto mode** to a Bash command's permission prompt. Select it to approve the command and switch the session to auto mode. [PowerShell tool](https://code.claude.com/docs/en/tools-reference#powershell-tool) prompts don't offer the option. Requires Claude Code v2.1.247 or later.

    Claude Code doesn't add the option to prompts forced by one of your [`ask` rules](https://code.claude.com/docs/en/permissions#manage-permissions) or by a [hook](https://code.claude.com/docs/en/hooks#pretooluse-decision-control), because auto mode still shows you those prompts, so switching wouldn't remove them.

    **At startup**: pass the permission mode as a flag.

    ```bash theme=\{null\}
    claude --permission-mode plan
    ```

    **As a default**: set `permissions.defaultMode` at the scope you want, as described in [Start in a different permission mode](#start-in-a-different-mode).

    The same `--permission-mode` flag works with `-p` for [non-interactive runs](https://code.claude.com/docs/en/headless).

    **During a session**: click the mode indicator at the bottom of the prompt box. It uses these labels for the modes on this page:

    | UI label           | Mode                |
    | :----------------- | :------------------ |
    | Manual             | `default`           |
    | Edit automatically | `acceptEdits`       |
    | Plan               | `plan`              |
    | Auto               | `auto`              |
    | Bypass permissions | `bypassPermissions` |

    **As a default**: to pin the permission mode conversations start in, set `claudeCode.initialPermissionMode` in your VS Code user settings to `default`, `manual`, `acceptEdits`, `plan`, or `bypassPermissions`. The setting doesn't accept `auto`; to start in Auto, leave it unset and pick **Auto** from the mode indicator once, as item 2 below describes. The extension starts each new conversation in the first of these that applies:

    1. `claudeCode.initialPermissionMode`
    2. The mode you last picked from the mode indicator, if it was Manual, Edit automatically, or Auto. Picking Plan or Bypass permissions applies to that conversation only
    3. `permissions.defaultMode` from [managed settings](https://code.claude.com/docs/en/managed-settings) or `~/.claude/settings.json`, on Pro, Max, and Team plans with [feature-flag fetching](#which-mode-a-session-starts-in) available
    4. The [built-in default](#which-mode-a-session-starts-in) for your plan, provider, and organization settings

    The extension never reads a project's `.claude/settings.json` or `.claude/settings.local.json` for the starting permission mode, and in conversations that don't meet item 3's conditions it reads no settings file at all. When `claudeCode.claudeProcessWrapper` is set, items 3 and 4 don't apply either: those conversations start in Manual unless item 1 or item 2 sets a permission mode.

    Auto appears in the mode indicator when [auto mode is available](#eliminate-prompts-with-auto-mode).

    Bypass permissions requires the **Allow dangerously skip permissions** toggle in the extension settings. Without it, the permission mode doesn't appear in the indicator, and a `bypassPermissions` value from item 1 or item 3 starts the conversation in Manual instead. Auto from any item likewise starts the conversation in Manual when auto mode isn't available.

    See the [VS Code guide](https://code.claude.com/docs/en/vs-code) for extension-specific details.

    The JetBrains plugin runs Claude Code in the IDE terminal, so switching permission modes works the same as in the CLI: press `Shift+Tab` to cycle, or pass `--permission-mode` when launching.

    **During a session**: in the Code tab, use the mode selector next to the send button. Not every mode appears in the selector:

    * **Auto**: appears when [auto mode is available](#eliminate-prompts-with-auto-mode)
    * **Bypass permissions**: requires the **Allow bypass permissions mode** toggle in Desktop settings on Pro and Max plans; on Team and Enterprise plans, organization policy controls it instead

    The Cowork tab doesn't use these modes. Cowork has its own permission modes, enabled separately, and the Cowork tab shows no mode selector at all until a mode beyond its default is enabled for your account. See the [Cowork docs](https://claude.com/docs/cowork/overview).

    For desktop-specific details, see [Choose a permission mode](https://code.claude.com/docs/en/desktop#choose-a-permission-mode) in the Desktop guide.

    **As a default**: set `defaultMode` in [settings](https://code.claude.com/docs/en/settings#where-settings-live). The desktop app reads the same settings files as the CLI and applies the permission mode to new local sessions.

    A mode you pick in the mode selector is remembered per folder and takes precedence over `defaultMode` for that folder. Plan is the exception: picking it applies to the current session only.

    For where `defaultMode` goes in a settings file, see the example under [Start in a different permission mode](#start-in-a-different-mode).

    Use the mode dropdown next to the prompt box on [claude.ai/code](https://claude.ai/code) or in the mobile app. Permission prompts appear in claude.ai for approval. Which modes appear depends on where the session runs:

    * **Cloud sessions** on [Claude Code on the web](https://code.claude.com/docs/en/claude-code-on-the-web): Accept edits, Plan, and Auto. Accept edits corresponds to `default` mode: cloud sessions pre-approve file edits regardless of mode, so the dropdown shows Accept edits instead of Manual. Cloud sessions still honor `defaultMode: "acceptEdits"` from settings. Auto mode appears only when your organization allows it and the selected model supports it. Bypass permissions isn't available.
    * **[Remote Control](https://code.claude.com/docs/en/remote-control) sessions** on your local machine: Manual, Accept edits, and Plan. You can't select Auto or Bypass permissions from the app.
      * Except for Bypass permissions, the dropdown shows the permission mode the local session is in, including one set from the terminal. It updates when the permission mode changes in the app or in the terminal. The session never reports Bypass permissions to claude.ai, so switching into it from the terminal doesn't change what the dropdown shows.
      * Sessions hosted by the [desktop app](https://code.claude.com/docs/en/desktop) or the [VS Code extension](https://code.claude.com/docs/en/vs-code) report permission mode changes to claude.ai as they happen, the same as sessions hosted in a terminal.
      * Before v2.1.202, sessions connected with `/remote-control` or `claude --remote-control` didn't report their permission mode at all, so claude.ai and the mobile app could show a permission mode the session wasn't in. The mismatch affected only the label. Claude Code generated permission prompts from the session's actual permission mode, and they still appeared in the app for approval.

    For Remote Control, the local machine running the session must be signed in with your claude.ai account; API keys aren't supported. You can also set the starting permission mode when launching that local session:

    ```bash theme=\{null\}
    claude remote-control --permission-mode acceptEdits
    ```
