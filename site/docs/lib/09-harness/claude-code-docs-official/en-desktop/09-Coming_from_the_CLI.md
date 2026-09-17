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
sourceRel: "en/desktop.md"
rawUrl: "/raw/09-harness/claude-code-docs-official/en/desktop.md"
sourceSha256: "3c585962a30144144f6f07cddbab26d1e8ab8f6272e881441abe0a1401514a09"
pageSha256: "24fd9f2770d27032e8d031eaf31c3596432c7ccf5f1f98a48b522e2e8432c20e"
contentMode: "local-full"
zh: ""
---

## Coming from the CLI?

If you already use the Claude Code CLI, Desktop runs the same underlying engine with a graphical interface. You can run both simultaneously on the same machine, even on the same project. Each maintains separate session history, but they share configuration and project memory via CLAUDE.md files.

To move a CLI session into Desktop, run `/desktop` in the terminal. Claude saves your session and opens it in the desktop app, then exits the CLI. This command is available on macOS and x64 Windows when you are signed in with a Claude subscription. It is not available with API key authentication or on Amazon Bedrock, Google Cloud's Agent Platform, or Microsoft Foundry.

  When to use Desktop vs CLI: use Desktop when you want to manage parallel sessions in one window, arrange panes side by side, or review changes visually. Use the CLI when you need scripting, automation, or prefer a terminal workflow.

### CLI flag equivalents

This table shows the desktop app equivalent for common CLI flags. Flags not listed have no desktop equivalent because they are designed for scripting or automation.

| CLI                                   | Desktop equivalent                                                                                                                                                                  |
| ------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `--model sonnet`                      | Model dropdown next to the send button                                                                                                                                              |
| `--resume`, `--continue`              | Click a session in the sidebar                                                                                                                                                      |
| `--permission-mode`                   | Mode selector next to the send button                                                                                                                                               |
| `--dangerously-skip-permissions`      | Bypass permissions mode. On Pro and Max plans, enable it in Settings → Claude Code → "Allow bypass permissions mode"; on Team and Enterprise plans, organization policy controls it |
| `--add-dir`                           | Add multiple repos with the **+** button in cloud sessions                                                                                                                          |
| `--allowedTools`, `--disallowedTools` | No per-session equivalent. Permission rules in [settings files](https://code.claude.com/docs/en/settings) still apply.                                                                                          |
| `--verbose`                           | [Verbose view mode](#switch-view-modes) in the Transcript view dropdown                                                                                                             |
| `--print`, `--output-format`          | Not available. Desktop is interactive only.                                                                                                                                         |
| `ANTHROPIC_MODEL` env var             | Model dropdown next to the send button                                                                                                                                              |
| `MAX_THINKING_TOKENS` env var         | Set in the local environment editor. See [environment configuration](#environment-configuration).                                                                                   |

### Shared configuration

Desktop and CLI read the same configuration files, so your setup carries over:

* **[CLAUDE.md](https://code.claude.com/docs/en/memory)** and `CLAUDE.local.md` files in your project are used by both
* **[MCP servers](https://code.claude.com/docs/en/mcp)** configured in `~/.claude.json` or `.mcp.json` work in both
* **[Hooks](https://code.claude.com/docs/en/hooks)** and **[skills](https://code.claude.com/docs/en/skills)** defined in settings apply to both
* **[Settings](https://code.claude.com/docs/en/settings)** in `~/.claude.json` and `~/.claude/settings.json` are shared. Permission rules, allowed tools, and other settings in `settings.json` apply to Desktop sessions.
* **Models**: the same [models](https://code.claude.com/docs/en/model-config#available-models) are available in both. In Desktop, select the model from the dropdown next to the send button. You can change the model mid-session from the same dropdown.

#### MCP servers from the Claude Desktop chat app

The Desktop app loads MCP servers from `claude_desktop_config.json` into local Code tab sessions, alongside servers from `~/.claude.json` and `.mcp.json`. A server you define in `claude_desktop_config.json` is available in both the Desktop chat surface and local Code tab sessions.

If you define the same server name in `claude_desktop_config.json` and in `~/.claude.json` or `.mcp.json`, the Code tab in local sessions connects once and uses the `claude_desktop_config.json` definition.

The app also re-delivers stdio servers from `~/.claude.json` to the embedded CLI in local sessions. When the top level of `~/.claude.json` (user scope) and `.mcp.json` define the same stdio server name, the Code tab uses the `~/.claude.json` definition, departing from the CLI [scope hierarchy](https://code.claude.com/docs/en/mcp#scope-hierarchy-and-precedence).

  The standalone CLI does not read `claude_desktop_config.json`. On macOS and WSL, run `claude mcp add-from-claude-desktop` to copy those servers into `~/.claude.json`. See [Import MCP servers from Claude Desktop](https://code.claude.com/docs/en/mcp#import-mcp-servers-from-claude-desktop) for the import flow and scope options.

### Feature comparison

This table compares core capabilities between the CLI and Desktop. For a full list of CLI flags, see the [CLI reference](https://code.claude.com/docs/en/cli-reference).

| Feature                                               | CLI                                                                            | Desktop                                                                                                                                                                                                                                                                                                                                           |
| ----------------------------------------------------- | ------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Permission modes                                      | All modes including `dontAsk`                                                  | Manual, Accept edits, Plan, and Auto. Bypass permissions appears in the mode selector once enabled: through the Settings toggle on Pro and Max plans, or through organization policy on Team and Enterprise plans                                                                                                                                 |
| [Third-party providers](https://code.claude.com/docs/en/third-party-integrations) | Amazon Bedrock, Google Cloud's Agent Platform, Microsoft Foundry               | Anthropic's API by default. For gateway routing, see [connect the desktop app to a gateway](https://code.claude.com/docs/en/llm-gateway-connect#desktop-app). To run the Code tab on Amazon Bedrock, Google Cloud's Agent Platform, Microsoft Foundry, or a self-hosted LLM gateway, see [Claude Desktop on 3P](https://claude.com/docs/third-party/claude-desktop/overview). |
| [MCP servers](https://code.claude.com/docs/en/mcp)                                | Configure in settings files                                                    | Connectors UI for local and SSH sessions, or settings files                                                                                                                                                                                                                                                                                       |
| [Plugins](https://code.claude.com/docs/en/plugins)                                | `/plugin` command                                                              | Plugin manager UI                                                                                                                                                                                                                                                                                                                                 |
| @mention files                                        | Text-based                                                                     | With autocomplete; local and SSH sessions only                                                                                                                                                                                                                                                                                                    |
| File attachments                                      | Not available                                                                  | Images, PDFs                                                                                                                                                                                                                                                                                                                                      |
| Session isolation                                     | [`--worktree`](https://code.claude.com/docs/en/cli-reference) flag                                         | Automatic worktrees                                                                                                                                                                                                                                                                                                                               |
| Multiple sessions                                     | Separate terminals                                                             | Sidebar tabs                                                                                                                                                                                                                                                                                                                                      |
| Recurring tasks                                       | Cron jobs, CI pipelines                                                        | [Scheduled tasks](https://code.claude.com/docs/en/desktop-scheduled-tasks)                                                                                                                                                                                                                                                                                                    |
| Computer use                                          | [Enable via `/mcp`](https://code.claude.com/docs/en/computer-use) on macOS                                 | [App and screen control](#let-claude-use-your-computer) on macOS and Windows                                                                                                                                                                                                                                                                      |
| iOS simulator                                         | Drive the simulator via [computer use](https://code.claude.com/docs/en/computer-use#test-a-simulator-flow) | [iOS Simulator pane](https://code.claude.com/docs/en/desktop-ios-simulator) opens automatically                                                                                                                                                                                                                                                                               |
| Dispatch integration                                  | Not available                                                                  | [Dispatch sessions](#sessions-from-dispatch) in the sidebar                                                                                                                                                                                                                                                                                       |
| Scripting and automation                              | [`--print`](https://code.claude.com/docs/en/cli-reference), [Agent SDK](https://code.claude.com/docs/en/headless)                      | Not available                                                                                                                                                                                                                                                                                                                                     |

### What's not available in Desktop

The following features aren't available in Desktop, except where noted:

* **Third-party providers**: Desktop connects to Anthropic's API by default. To route Desktop through a gateway, or to run the Code tab on Amazon Bedrock, Google Cloud's Agent Platform, Microsoft Foundry, or a self-hosted LLM gateway, follow the links in the [Third-party providers row](#feature-comparison).
* **Linux (beta)**: Computer Use isn't yet available in the Linux desktop app. See [Claude Desktop on Linux](https://code.claude.com/docs/en/desktop-linux).
* **Inline code suggestions**: Desktop does not provide autocomplete-style suggestions. It works through conversational prompts and explicit code changes.
* **Agent teams**: coordinated teams, where Claude as the team lead assigns tasks to teammates from a shared task list, are available in the [CLI](https://code.claude.com/docs/en/agent-teams), not in Desktop. For multi-agent work inside one session, use [dynamic workflows](https://code.claude.com/docs/en/workflows), which run in Desktop; Claude can also [message and manage your other sessions](#work-across-sessions) directly.
* **Terminal-dialog commands**: built-in commands that open an interactive panel in the terminal behave differently in the Code tab. Edit [settings files](https://code.claude.com/docs/en/settings) directly to manage permission rules and configuration, or run the commands from the standalone CLI.
  * Commands with no argument form, such as `/permissions`, reply with `isn't available in this environment`.
  * `/config` opens Settings → Claude Code. Text after the command is ignored, so `/config theme=dark` doesn't set the theme.
