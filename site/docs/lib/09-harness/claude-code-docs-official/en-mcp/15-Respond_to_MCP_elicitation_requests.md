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
sourceRel: "en/mcp.md"
rawUrl: "/raw/09-harness/claude-code-docs-official/en/mcp.md"
sourceSha256: "10c37e3b840932b59cb7c7ab34e81595c598b0213bd2f1bb15c8effa1d7bc22b"
pageSha256: "356b35ac14e24b159e1ad1ad58d8af5a090e5ba44abc1667cba2e1668a855c0e"
contentMode: "local-full"
zh: ""
---

## Respond to MCP elicitation requests

MCP servers can request structured input from you mid-task using elicitation. When a server needs information it can't get on its own, Claude Code displays an interactive dialog and passes your response back to the server. No configuration is required on your side: elicitation dialogs appear automatically when a server requests them.

Servers can request input in two ways:

* **Form mode**: Claude Code shows a dialog with form fields defined by the server (for example, a username and password prompt). Fill in the fields and submit.
* **URL mode**: Claude Code opens a browser URL for authentication or approval. Complete the flow in the browser, then confirm in the CLI.

In URL mode, Claude Code passes the URL as a command-line argument to your system's URL handler, and caps how long that argument can be. When the URL, once escaped for the command line, is over that cap, you can only decline the request. Every character that needs escaping, such as `%` or `&`, counts four times toward the cap: its own character plus three escape characters. A URL with none of them reaches the cap at about 8,000 characters. A URL built largely of percent-escapes, where every third character is a `%`, reaches it at roughly 4,000.

To auto-respond to elicitation requests without showing a dialog, use the [`Elicitation` hook](https://code.claude.com/docs/en/hooks#elicitation).

If you're building an MCP server that uses elicitation, see the [MCP elicitation specification](https://modelcontextprotocol.io/docs/learn/client-concepts#elicitation) for protocol details and schema examples.
