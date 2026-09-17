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
sourceRel: "en/vs-code.md"
rawUrl: "/raw/09-harness/claude-code-docs-official/en/vs-code.md"
sourceSha256: "6c14f8a02079b0d1ee1142ff770bcda731b181565c57a600c9377c899fbc9801"
pageSha256: "f02a36ad0ee2bb710004d7881bc8940e08de9547f0080d054adc31a5c74fe9b3"
contentMode: "local-full"
zh: ""
---

## VS Code extension vs. Claude Code CLI

Claude Code is available as both a VS Code extension (graphical panel) and a CLI (command-line interface in the terminal). Some features are only available in the CLI. If you need a CLI-only feature, run `claude` in VS Code's integrated terminal. This requires the [standalone CLI install](https://code.claude.com/docs/en/setup): the extension does not add `claude` to your PATH. See [Run CLI in VS Code](#run-cli-in-vs-code).

| Feature             | CLI                 | VS Code Extension                                                                                 |
| ------------------- | ------------------- | ------------------------------------------------------------------------------------------------- |
| Commands and skills | [All](https://code.claude.com/docs/en/commands) | Subset (type `/` to see available)                                                                |
| MCP server config   | Yes                 | Yes ([add and manage servers](#connect-to-external-tools-with-mcp) with `/mcp` in the chat panel) |
| Checkpoints         | Yes                 | Yes                                                                                               |
| `!` bash shortcut   | Yes                 | No                                                                                                |
| Tab completion      | Yes                 | No                                                                                                |

### Rewind with checkpoints

The VS Code extension supports checkpoints, which track Claude's file edits and let you rewind to a previous state. Hover over any message to reveal the rewind button, then choose from three options:

* **Fork conversation from here**: start a new conversation branch from this message while keeping all code changes intact
* **Rewind code to here**: revert file changes back to this point in the conversation while keeping the full conversation history
* **Fork conversation and rewind code**: start a new conversation branch and revert file changes to this point

For full details on how checkpoints work and their limitations, see [Checkpointing](https://code.claude.com/docs/en/checkpointing).

### Run CLI in VS Code

To use the CLI while staying in VS Code, open the integrated terminal (`` Ctrl+` `` on Windows/Linux or `` Cmd+` `` on Mac) and run `claude`. The CLI automatically integrates with your IDE for features like diff viewing and diagnostic sharing.

Installing the extension does not put `claude` on your shell PATH. The extension bundles a private copy of the CLI for its chat panel, but typing `claude` in a terminal requires the [standalone CLI install](https://code.claude.com/docs/en/setup). Run the install once and the commands on this page, including `claude mcp add` and `claude --resume`, work in any terminal. If `claude` is still not found after installing, [verify your PATH](https://code.claude.com/docs/en/troubleshoot-install#verify-your-path).

If using an external terminal, run `/ide` inside Claude Code to connect it to VS Code.

### Switch between extension and CLI

The extension and CLI share the same conversation history. To continue an extension conversation in the CLI, run `claude --resume` in the terminal. This opens an interactive picker where you can search for and select your conversation.

### Include terminal output in prompts

Reference terminal output in your prompts using `@terminal:name` where `name` is the terminal's title. This lets Claude see command output, error messages, or logs without copy-pasting.

### Monitor background processes

Visibility for background tasks in the extension is limited compared to the CLI. For better visibility, have Claude output the command so you can run it in VS Code's integrated terminal.

### Connect to external tools with MCP

MCP (Model Context Protocol) servers give Claude access to external tools, databases, and APIs.

To manage MCP servers without leaving VS Code, type `/mcp` in the chat panel. From the dialog that opens, you can add servers, remove servers saved at the local, user, or project [scope](https://code.claude.com/docs/en/mcp#mcp-installation-scopes), enable or disable servers, reconnect to a server, and manage OAuth authentication. Adding and removing servers in the dialog requires Claude Code v2.1.261 or later.

You can also run `claude mcp add` in VS Code's integrated terminal (`` Ctrl+` `` or `` Cmd+` ``). The dialog and the terminal command save to the same MCP configuration, and changes from either take effect in conversations you start afterwards. The example below adds GitHub's remote MCP server, which authenticates with a [personal access token](https://github.com/settings/personal-access-tokens) passed as a header:

```bash theme={null}
claude mcp add --transport http github https://api.githubcopilot.com/mcp/ \
  --header "Authorization: Bearer YOUR_GITHUB_PAT"
```

Replace `YOUR_GITHUB_PAT` with your personal access token. The `claude mcp add` command saves the configuration without validating credentials, so a placeholder value is accepted here but the server fails to connect later. To verify the connection, start a new conversation, type `/mcp`, and check that the server shows **Connected**. A server with bad credentials shows **Failed**.

Once configured, ask Claude to use the tools (e.g., "Review PR #456").

To find servers to connect, see [Find and build MCP servers](https://code.claude.com/docs/en/mcp#find-and-build-mcp-servers).
