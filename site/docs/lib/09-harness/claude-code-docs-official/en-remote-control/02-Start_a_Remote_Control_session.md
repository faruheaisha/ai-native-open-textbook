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
sourceRel: "en/remote-control.md"
rawUrl: "/raw/09-harness/claude-code-docs-official/en/remote-control.md"
sourceSha256: "24ef9e60eeae3360065480ea2b2ba103f3bef9e6e470ada18c41fcd2be67bbbe"
pageSha256: "3779c3787296b0fbcaea2ab97ba4c8b95d4712efb25f1fef3b7bdfae63b14338"
contentMode: "local-full"
zh: ""
---

## Start a Remote Control session

You can start a Remote Control session from the CLI or the VS Code extension. The CLI offers three invocation modes; VS Code uses the `/remote-control` command.

    Navigate to your project directory and run:

    ```bash theme=\{null\}
    claude remote-control
    ```

    Until you accept Remote Control's one-time confirmation, `claude remote-control` explains what it does and asks `Enable Remote Control? (y/n)` before starting the server. Answer `y` to accept and start the server. If you decline, Claude Code exits without starting the server and asks again the next time you run the command.

    The process stays running in your terminal in server mode, waiting for remote connections. It displays a session URL you can use to [connect from another device](#connect-from-another-device), and you can press spacebar to show a QR code for quick access from your phone. While a remote session is active, the terminal shows connection status and tool activity.

    Available flags:

    | Flag                                            | Description                                                                                                                                                                                                                                                                                                                                                                                                                                                                        |
    | ----------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
    | `--name "My Project"`                           | Set a custom session title visible in the session list at claude.ai/code.                                                                                                                                                                                                                                                                                                                                                                                                          |
    | `--remote-control-session-name-prefix <prefix>` | Prefix for auto-generated session names when no explicit name is set. Defaults to your machine's hostname, producing names like `myhost-graceful-unicorn`. Set `CLAUDE_REMOTE_CONTROL_SESSION_NAME_PREFIX` for the same effect.                                                                                                                                                                                                                                                    |
    | `-c`, `--continue`                              | Bring back the session that the last server in this directory started with, instead of creating a new one. See [Resume sessions after stopping the server](#resume-sessions-after-stopping-the-server). Can't be combined with `--session-id`, `--spawn`, `--capacity`, or `--create-session-in-dir`. Requires Claude Code v2.1.200 or later; earlier versions reject the flag as an unknown argument.                                                                             |
    | `--session-id <id>`                             | Bring back one session by its ID. See [Resume sessions after stopping the server](#resume-sessions-after-stopping-the-server). Can't be combined with `--continue`, `--spawn`, `--capacity`, or `--create-session-in-dir`. Requires Claude Code v2.1.200 or later; earlier versions reject the flag as an unknown argument.                                                                                                                                                        |
    | `--spawn <mode>`                                | How the server creates sessions.<br />• `same-dir` (default): all sessions share the current working directory, so they can conflict if editing the same files.<br />• `worktree`: each on-demand session gets its own [git worktree](https://code.claude.com/docs/en/worktrees). Requires a git repository.<br />• `session`: single-session mode. Serves exactly one session and rejects additional connections. Set at startup only.<br />Press `w` at runtime to toggle between `same-dir` and `worktree`. |
    | `--capacity <N>`                                | Maximum number of concurrent sessions. Default is 32. Cannot be used with `--spawn=session`.                                                                                                                                                                                                                                                                                                                                                                                       |
    | `--[no-]create-session-in-dir`                  | Pre-create one session in the current directory when the server starts, so you have somewhere to type immediately. In `worktree` mode this session stays in the current directory while on-demand sessions get isolated worktrees. On by default. If you pass `--no-create-session-in-dir` to start with none, Claude Code archives the server's sessions when you stop it, so there's nothing to [resume](#resume-sessions-after-stopping-the-server).                            |
    | `--permission-mode <mode>`                      | Set the starting [permission mode](https://code.claude.com/docs/en/permission-modes) for the server's sessions, such as `acceptEdits`. Accepts `manual` as an alias for `default`; an unrecognized mode stops the server at startup and lists the valid modes.                                                                                                                                                                                                                                                 |
    | `--debug-file <path>`                           | Write debug logs to the given file.                                                                                                                                                                                                                                                                                                                                                                                                                                                |
    | `--verbose`                                     | Show detailed connection and session logs.                                                                                                                                                                                                                                                                                                                                                                                                                                         |
    | `--sandbox` / `--no-sandbox`                    | Enable or disable [sandboxing](https://code.claude.com/docs/en/sandboxing) for filesystem and network isolation. Off by default.                                                                                                                                                                                                                                                                                                                                                                               |

    Give these flags after `remote-control`.

    If you pass a global `claude` flag before `remote-control`, or a wrapper script adds one, Claude Code doesn't carry the flag over to the sessions the server creates. Claude Code lets the flag through only when dropping it is known not to change what those sessions can do, such as `--verbose` or `--model`. For any other flag, such as `--settings`, Claude Code [refuses to start](https://code.claude.com/docs/en/errors#not-carried-over-to-the-sessions-remote-control-starts) and names the flag to remove. Before v2.1.248, any option before `remote-control` made Claude Code reject the flags after it with an `unknown option` error.

    Claude Code checks Remote Control eligibility before printing help, so `claude remote-control --help` returns an error instead of this flag list when you aren't signed in with an eligible account.

    To start a normal interactive Claude Code session with Remote Control enabled, use the `--remote-control` flag (or `--rc`):

    ```bash theme=\{null\}
    claude --remote-control
    ```

    Optionally pass a name for the session:

    ```bash theme=\{null\}
    claude --remote-control "My Project"
    ```

    This gives you a full interactive session in your terminal that you can also control from claude.ai or the Claude app. Unlike `claude remote-control` (server mode), you can type messages locally while the session is also available remotely.

    If you're already in a Claude Code session and want to continue it remotely, use the `/remote-control` (or `/rc`) command:

    ```text theme=\{null\}
    /remote-control
    ```

    Pass a name as an argument to set a custom session title:

    ```text theme=\{null\}
    /remote-control My Project
    ```

    This starts a Remote Control session that carries over your current conversation history.

    Until you accept Remote Control's one-time confirmation, a dialog appears before `/remote-control` connects. Select **Enable Remote Control** to accept and connect. If you select **Never mind** or press Esc, Claude Code doesn't connect and asks again the next time you run `/remote-control`.

    The `--verbose`, `--sandbox`, and `--no-sandbox` flags are not available with this command.

    In the [Claude Code VS Code extension](https://code.claude.com/docs/en/vs-code), type `/remote-control` or `/rc` in the prompt box.

    ```text theme=\{null\}
    /remote-control
    ```

    While Remote Control is on, Claude Code shows a **Remote Control** indicator in the prompt box footer. Once the session connects, click the indicator to go directly to the session, or find it in the session list at [claude.ai/code](https://claude.ai/code). Claude Code also posts the session URL in the conversation. To disconnect, run `/remote-control` again.

    Unlike the CLI, the VS Code command does not accept a name argument or display a QR code. The session title is derived from your conversation history or first prompt.

### Check connection status

In an interactive terminal session, a `/rc active` indicator shows while the connection is up, and is hidden if the terminal is too narrow to fit it. With [fullscreen rendering](https://code.claude.com/docs/en/fullscreen) it sits at the end of the working-directory line in the startup header, and without it, in the footer below the input box.

The indicator text is a link to the session on claude.ai. Run `/remote-control` again to open a status panel with the session URL and a QR code for [connecting from another device](#connect-from-another-device). When the indicator is in the footer, you can also open the panel by selecting the indicator with the down arrow key and pressing Enter. The panel also offers a disconnect option, which turns Remote Control off while your local session keeps running in the terminal.

If the connection fails, Claude Code shows a notification with the failure reason, adds a warning line with the reason to the conversation, and switches the indicator to a failure state that stays in place. To reconnect, run `/remote-control`, unless the [reason says the session was taken over or ended elsewhere, or that the server can't find it](#session-ended-elsewhere).

&lt;span id="session-ended-elsewhere" />Read the reason before you reconnect. When the session was taken over or ended from another device, app, or Claude Code session, or the server can't find it, the reason says which, and Claude Code leaves out its usual advice to run `/remote-control`:

* **Another device or Claude Code session took the session over**: run `/remote-control` only if you want to take it back from that device.
* **You ended or archived the session from another device or app**: run `/remote-control` only if you want it back; Claude Code reopens an archived session.
* **The server can't find the session**: it may have been deleted from another device or app.

### Session URL reminders

While Remote Control is connected, Claude Code reminds you of the session URL when switching to your phone or browser helps most, so you don't have to find the link in `/remote-control`. A reminder appears above the prompt box at either of these moments:

* **Long turn**: when a turn runs longer than a server-tuned threshold, Claude Code shows a **Still working** notification with a **Check in from your phone** link, so you can follow the turn from your phone or browser instead of waiting at the terminal. Claude Code removes it when the turn ends.
* **Repeated permission prompts**: after you answer several [permission prompts](https://code.claude.com/docs/en/permissions) in a session, an **Approve tool calls from your phone** notification shows the session URL. Claude Code removes it when your next turn starts.

The reminders can appear in any connected session, including ones where Remote Control [connects automatically](#enable-remote-control-for-all-sessions). They don't appear every time these conditions occur, and each one appears only a few times in total across sessions. You can't configure or turn them off; each clears on its own.

### Connect from another device

Once a Remote Control session is active, you have a few ways to connect from another device:

* **Open the session URL** in any browser to go directly to the session on [claude.ai/code](https://claude.ai/code).
* **Scan the QR code** shown alongside the session URL to open it directly in the Claude app. With `claude remote-control`, press spacebar to toggle the QR code display.
* **Open [claude.ai/code](https://claude.ai/code) or the Claude app** and find the session by name in the session list. In the Claude mobile app, tap **Code** in the navigation to reach the session list. Remote Control sessions show a computer icon with a green status dot when online.

When you connect, the device shows any subagents and workflows the session already has running in the background. Stop one of them from the device, and Claude Code stops that task on your machine.

The remote session title is chosen in this order:

1. The name you passed to `--name`, `--remote-control`, or `/remote-control`
2. The title you set with `/rename`
3. The last meaningful message in existing conversation history
4. An auto-generated name like `myhost-graceful-unicorn`, where `myhost` is your machine's hostname or the prefix you set with `--remote-control-session-name-prefix`

If you didn't set an explicit name, Claude Code updates the title to reflect your prompt once you send one. Claude Code matches auto-generated titles to the language of your conversation, or to the [`language`](https://code.claude.com/docs/en/settings-reference#language) setting if one is configured; the language matching requires Claude Code v2.1.176 or later.

When you rename a session from claude.ai or the Claude app, Claude Code also updates the local title shown in `claude --resume`. Claude Code applies the same rename to the session name shown on the prompt bar, and in the `claude agents` listing when the session [runs in the background](https://code.claude.com/docs/en/agent-view). Before v2.1.221, renaming from the session list at claude.ai or in the Claude app updated only the title, and the CLI kept its previous session name; `/rename`, which runs in the CLI itself, set the name on any version.

If you don't have the Claude app yet, use the `/mobile` command inside Claude Code to display a download QR code for [iOS](https://apps.apple.com/us/app/claude-by-anthropic/id6473753684) or [Android](https://play.google.com/store/apps/details?id=com.anthropic.claude).

### What connected devices see

A connected device shows the conversation in your terminal as it happens. These cases go beyond ordinary messages:

* **Compaction and `/clear`**: while Claude Code [compacts the conversation](https://code.claude.com/docs/en/context-window#what-survives-compaction), connected devices show the progress and then where the conversation was compacted. When you run `/clear`, the conversation resets on connected devices too.
* **Switching conversations with `/resume`**: the connected device doesn't receive the switched-to conversation's title or earlier history, but new messages in both directions go to and from whichever conversation is open in your terminal. To work on the original conversation from the device again, run `/resume` in your terminal and switch back to it.
* **Pulling a session with `/teleport`**: when you pull a [Claude Code on the web session](https://code.claude.com/docs/en/claude-code-on-the-web#from-web-to-terminal) into your terminal with `/teleport`, the connected device doesn't receive the pulled conversation's earlier history. New messages in both directions go to and from the pulled conversation, which is now the one open in your terminal.
* **Messages from your other sessions**: with [cross-session messaging](https://code.claude.com/docs/en/cross-session-messaging), the same connection carries messages between your own sessions on different machines and from your [Claude Code on the web](https://code.claude.com/docs/en/claude-code-on-the-web) sessions, through Anthropic servers like the rest of Remote Control traffic. [Message sessions on other machines](https://code.claude.com/docs/en/cross-session-messaging#message-sessions-on-other-machines) covers the delivery rules and [Control inbound messages](https://code.claude.com/docs/en/cross-session-messaging#control-inbound-messages) covers the inbound controls. Requires Claude Code v2.1.224 or later.
* **Prompts you send mid-turn**: when you send a prompt from a connected device before the current turn ends, Claude Code queues it and keeps it in the device's transcript after that turn finishes.
* **Diff of your changes**: when the session's directory is in a git repository, a connected device's diff pane shows the diff of your uncommitted changes. The device requests the diff over the connection, and Claude Code computes it on your machine. When your working tree is clean, Claude Code instead serves your branch's changes since it diverged from the default branch. Before v2.1.247, Claude Code reported the diff to connected devices only in sessions served by `claude remote-control`.
* **Model**: when you pick a [model](https://code.claude.com/docs/en/model-config) from a connected device, Claude Code runs the session on that model. The terminal's `/model` picker, `/status`, and `/config` show that model. Requires Claude Code v2.1.238 or later.
  * A model you pick from the device's model control applies to the current session only. When you send `/model <name>` from the device to an interactive session, Claude Code also sets your default for new sessions.
  * If you send a name Claude Code doesn't recognize, such as a display name where a model ID is expected, Claude Code [refuses the pick](https://code.claude.com/docs/en/errors#model-is-not-a-recognized-model-id) and the session keeps its current model. Before v2.1.260, Claude Code saved an unrecognized pick from the device's model control, and your next message failed.
* **Effort level**: when you set the [effort level](https://code.claude.com/docs/en/model-config#adjust-effort-level) from a connected device, with `/effort` or the device's effort control, Claude Code applies it to the session on your machine, and claude.ai/code shows the level the session is using. If you pinned a level with `CLAUDE_CODE_EFFORT_LEVEL`, the session keeps that level, and Claude Code refuses a different pick from the effort control. Picking a level from the effort control requires Claude Code v2.1.234 or later on your machine.
* **Reconnecting after a connection failure**: run `/remote-control` to reconnect. If compaction rewrote the conversation or you switched conversations with `/resume` in the meantime, Claude Code archives the server session it was using instead of leaving it in the session list. You can still find it by [filtering for archived sessions](https://code.claude.com/docs/en/claude-code-on-the-web#archive-sessions). Switching conversations while a device is still connected doesn't archive the session.

### Enable Remote Control for all sessions

Remote Control only activates when you explicitly run `claude remote-control`, `claude --remote-control`, or `/remote-control`, unless auto-connect is turned on. To turn auto-connect on for every interactive session, run `/config` inside Claude Code and set **Enable Remote Control for all sessions**. The toggle takes three values:

* **`true`**: connect automatically when an interactive session starts.
* **`false`**: turn auto-connect off, though a `true` from [managed settings](https://code.claude.com/docs/en/managed-settings) outranks it, because Claude Code saves the choice to your user settings. A `false` in project or local settings (`.claude/settings.json`, `.claude/settings.local.json`) turns auto-connect off even over a managed `true`.
* **`default`**: clear your choice and follow your organization's admin default if one is set, otherwise Claude Code's current default.

The same toggle appears outside the CLI:

* **Desktop app**: **Settings > Claude Code > Enable remote control by default**.
* **VS Code extension**: **Enable Remote Control for all sessions** in the [command menu's](https://code.claude.com/docs/en/vs-code#use-the-prompt-box) Settings section. Requires Claude Code v2.1.203 or later.

To turn auto-connect on from a settings file instead, set [`remoteControlAtStartup`](https://code.claude.com/docs/en/settings-reference#remotecontrolatstartup) to `true` in your user `~/.claude/settings.json` or in [managed settings](https://code.claude.com/docs/en/managed-settings). In project or local settings (`.claude/settings.json`, `.claude/settings.local.json`), Claude Code honors a `false` and turns auto-connect off for that repository, but ignores a `true`, so a checked-in file can't turn on Remote Control for everyone who opens the repository.

Auto-connect signs in with your own claude.ai account, so a session it starts appears only in your own account's Claude apps and grants no one else access.

With this setting on, each interactive Claude Code process registers one remote session. If you run multiple instances, each one gets its own remote session. To run multiple concurrent sessions from a single process, use [server mode](#start-a-remote-control-session) instead.

### Resume sessions after stopping the server

When you stop `claude remote-control` with Ctrl+C, the sessions it was serving stop responding from your phone or browser. As long as you weren't running another `claude remote-control` in the same directory and didn't start this one with `--no-create-session-in-dir`, Claude Code doesn't archive them. To bring them back, run one of these commands in the same directory:

* **`claude remote-control`**: brings back every session the server was serving.
* **`claude remote-control --continue`**: brings back only the session the server started with, and exits when that session ends. If this directory has no record, Claude Code uses the newest one from this repository's other git worktrees.
* **`claude remote-control --session-id <id>`**: brings back only the session whose ID you pass, and exits when that session ends. The ID is the part of the session's URL at claude.ai/code between `/code/` and any `?`.

These commands work for about four hours after the server stopped. After that, run `claude remote-control` to start a new session. If you archived a session in the meantime, `--continue` and `--session-id` unarchive it on Claude Code v2.1.228 or later.

To bring back a session you started with `claude --remote-control` or `/remote-control`, resume the conversation with `claude --continue` or `claude --resume`. Whether Claude Code reconnects, and to which session, depends on the conversation's [reconnection record](#resume-outcomes).

If you resume the conversation in a second terminal while the first one still has Remote Control on, Claude Code prints a notice in the second terminal and leaves Remote Control off there instead of taking the session away from the first. While Remote Control stays off there, Claude in that terminal doesn't see [your sessions on other machines](https://code.claude.com/docs/en/cross-session-messaging#see-which-sessions-claude-can-reach), and they can't reach it. Run `/remote-control` in the second terminal to move Remote Control to it.

When you resume a conversation in Claude Desktop or an IDE extension that had Remote Control on, Claude Code reattaches it to the existing claude.ai session instead of adding a new one to the session list.
