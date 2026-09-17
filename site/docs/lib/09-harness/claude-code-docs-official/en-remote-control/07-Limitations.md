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
pageSha256: "7f8585f5b60aaa2003d0f13d9147a85d7045f0125fce06d91fd4f13f9cb8dc29"
contentMode: "local-full"
zh: ""
---

## Limitations

* **One remote session per interactive process**: outside of server mode, each Claude Code instance supports one remote session at a time. Use [server mode](#start-a-remote-control-session) to run multiple concurrent sessions from a single process.
* **Local process must keep running**: Remote Control runs as a local process. If you close the terminal, quit VS Code, or otherwise stop the `claude` process, the session goes offline until you [bring it back](#resume-sessions-after-stopping-the-server). Unless Claude is in the middle of a task, claude.ai and the Claude app show the session as offline within seconds after the process exits. To keep a session running on a remote machine after you disconnect from SSH, start it inside `tmux` or `screen`.
* **Crashed sessions in server mode**: if a session served by `claude remote-control` crashes, send it a message from a connected device. Claude Code serves it again. You don't have to restart the server. Requires Claude Code v2.1.238 or later.
* **HTTP 403 refusals on a connected session**: once an interactive session is connected, Claude Code keeps retrying for up to three minutes when something between your machine and Anthropic's servers answers with HTTP 403, as can happen after a VPN or network change. If the refusals last longer, Claude Code disconnects, and the reason names what refused: a network edge, or a proxy, VPN, or firewall on your own network.
* **Extended network outage**: if your machine is awake but can't reach the network, what you do next depends on the mode:
  * **Server mode**: Claude Code gives up after roughly 10 minutes and the `claude remote-control` process exits. Run `claude remote-control` again to start a new session.
  * **Interactive session**: keep working locally. Claude Code retries for as long as the outage lasts and reconnects on its own when the network returns.
* **Presence heartbeats failing**: if an interactive session disconnects with `could not reach the Remote Control server for about 30 minutes`, run `/remote-control` to reconnect. Claude Code shows this message only when the session's presence heartbeats have been failing while the rest of the connection stayed up; it re-registers the session for about 30 minutes before disconnecting.
* **Forwarded dialogs expire**: Claude Code keeps permission prompts and `AskUserQuestion` questions open until you answer them. When Claude Code forwards another kind of dialog to the remote session, such as the model-choice prompt shown after a safety refusal, it waits five minutes by default, then closes the dialog and continues with the dialog's no-action default. Set [`dialogExpiry`](https://code.claude.com/docs/en/settings-reference#dialogexpiry) to adjust or disable the deadline. Requires Claude Code v2.1.224 or later.
* **The Fable usage-credits consent prompt isn't forwarded**: Claude Code shows the mid-session [Fable usage-credits consent prompt](https://code.claude.com/docs/en/model-config#fable-and-usage-credits) only where the session runs, not on your device. When the session runs in a terminal and nobody there answers before Claude Code closes the prompt, the turn ends without sending the request; see [The prompt to confirm went unanswered](https://code.claude.com/docs/en/errors#the-prompt-to-confirm-went-unanswered).
* **Some commands are local-only**: commands that only run in the terminal interface, such as `/plugin` or `/resume`, work only from the local CLI, whether or not you pass an argument. The following work from mobile and web:
  * Text-output commands: `/compact`, `/clear`, `/context`, `/usage`, `/exit`, `/usage-credits`, `/recap`, and `/reload-plugins`. `/usage-credits` prints the billing URL instead of opening a browser. `/reload-plugins` works only when the session runs in an interactive terminal; a session without one declines it.
  * `/model`, `/effort`, `/fast`, `/color`, and `/rename`: pass the value as an argument, for example `/model sonnet` or `/effort high`. From mobile and web, `/model` and `/effort` take the argument in place of the terminal picker or slider.
  * `/mcp`: from the mobile app, returns a text summary of server status instead of opening the picker. On the web, `/mcp` on its own opens a directory of [claude.ai connectors](https://code.claude.com/docs/en/mcp#use-mcp-servers-from-claude-ai) instead of returning the summary. The `reconnect`, `enable`, and `disable` [subcommands](https://code.claude.com/docs/en/commands#all-commands) work from both. Unlike the local CLI, `/mcp reconnect` without a server name reconnects every server that has failed or needs authentication.
  * `/config`, from v2.1.181: from the mobile app, pass `key=value` to set a setting, or run it with no argument to list the keys you can set. On the web, `/config` opens the Claude Code section of your settings instead, and ignores text after the command.
  * On Team and Enterprise, `/usage-credits` from mobile or web doesn't send a [usage-credits request to your admin](https://code.claude.com/docs/en/costs#add-usage-credits-to-your-subscription). Sending requires a confirmation that appears only in the interactive CLI, so the command tells you to run it there instead. Before v2.1.211, the text form sent the request without confirmation.
  * `/autocompact`, from v2.1.221: pass the window size as an argument, for example `/autocompact 500k`. With no argument, it prints the current window size as text instead of opening the dialog the command shows in a terminal session.
  * `/advisor`, from v2.1.260: pass the model as an argument, for example `/advisor opus`, or pass `off` to turn the advisor off. Both forms apply to the current session only and leave your saved default unchanged. With no argument, it prints the current advisor as text instead of opening the picker.
