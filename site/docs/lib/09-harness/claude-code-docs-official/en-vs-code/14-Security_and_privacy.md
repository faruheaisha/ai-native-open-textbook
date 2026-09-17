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
pageSha256: "468af4f67098a46f89231f163b366b3d8c17aec9a62bed21a389d22baebaf30f"
contentMode: "local-full"
zh: ""
---

## Security and privacy

Your code stays private. Claude Code processes your code to provide assistance but does not use it to train models. For details on data handling and how to opt out of logging, see [Data and privacy](https://code.claude.com/docs/en/data-usage).

With auto-edit permissions enabled, Claude Code can modify VS Code configuration files (like `settings.json` or `tasks.json`) that VS Code may execute automatically. To reduce risk when working with untrusted code:

* Enable [VS Code Restricted Mode](https://code.visualstudio.com/docs/editor/workspace-trust#_restricted-mode) for untrusted workspaces
* Use Manual mode instead of Edit automatically or Auto for edits
* Review changes carefully before accepting them

### The built-in IDE MCP server

When the extension is active, it runs a local MCP server that the CLI connects to automatically. This is how the CLI opens diffs in VS Code's native diff viewer, reads your current selection for `@`-mentions, and — when you're working in a Jupyter notebook — asks VS Code to execute cells.

The server is named `ide` and is hidden from `/mcp` because there's nothing to configure. If your organization uses a `PreToolUse` hook to allowlist MCP tools, though, you'll need to know it exists.

**Selection and open-file context.** While connected, the CLI includes your current editor selection and the path of the active file as context on each prompt you send. The transcript shows a `⧉ Selected N lines from <file>` line when this happens. To exclude a sensitive file such as `.env`, add a [`Read` deny rule](https://code.claude.com/docs/en/permissions#read-and-edit) for its path. A matching deny rule prevents both the selected text and the open-file notice for that file from reaching Claude.

**Transport and authentication.** The server binds to `127.0.0.1` on a random port in the range 10000–65535, and the port is not configurable. The transport is unencrypted `ws://`; because the socket is loopback-only, any process that could capture the traffic can also read the token from the lock file, so TLS would not add protection. Each extension activation generates a fresh random auth token, writes it to a lock file at `~/.claude/ide/<port>.lock`, and the CLI must present it as the `X-Claude-Code-Ide-Authorization` header to connect. The lock file has `0600` permissions in a `0700` directory, so only the user running VS Code can read it. If `CLAUDE_CONFIG_DIR` is set, the lock file is written to `$CLAUDE_CONFIG_DIR/ide/` instead.

**Tools exposed to the model.** The server hosts a dozen tools, but only two are visible to the model. The rest are internal RPC the CLI uses for its own UI — opening diffs, reading selections, saving files — and are filtered out before the tool list reaches Claude.

| Tool name (as seen by hooks) | What it does                                                                                                              | Read-only |
| ---------------------------- | ------------------------------------------------------------------------------------------------------------------------- | --------- |
| `mcp__ide__getDiagnostics`   | Returns language-server diagnostics — the errors and warnings in VS Code's Problems panel. Optionally scoped to one file. | Yes       |
| `mcp__ide__executeCode`      | Runs Python code in the active Jupyter notebook's kernel. See confirmation flow below.                                    | No        |

**Jupyter execution always asks first.** `mcp__ide__executeCode` can't run anything silently. On each call, the code is inserted as a new cell at the end of the active notebook, VS Code scrolls it into view, and a native Quick Pick asks you to **Execute** or **Cancel**. Cancelling — or dismissing the picker with `Esc` — returns an error to Claude and nothing runs. The tool also refuses outright when there's no active notebook, when the Jupyter extension (`ms-toolsai.jupyter`) isn't installed, or when the kernel isn't Python.

  The Quick Pick confirmation is separate from `PreToolUse` hooks. An allowlist entry for `mcp__ide__executeCode` lets Claude *propose* running a cell; the Quick Pick inside VS Code is what lets it *actually* run.

&lt;a id="troubleshooting" />
