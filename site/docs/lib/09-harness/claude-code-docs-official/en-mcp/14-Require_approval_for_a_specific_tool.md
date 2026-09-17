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
pageSha256: "50377d2a9d537e6d28a3f1aa3ebdf3f1c1d2d093af8e6ce5e6d17de36a9a66df"
contentMode: "local-full"
zh: ""
---

## Require approval for a specific tool

If you're building an MCP server, you can mark a tool as requiring explicit approval on every call by setting `_meta["anthropic/requiresUserInteraction"]` to `true` in the tool's `tools/list` response entry. The value must be the JSON boolean `true`; any other value is ignored.

Claude Code shows that tool's permission prompt on every call, even in `acceptEdits`, `auto`, and `bypassPermissions` [permission modes](https://code.claude.com/docs/en/permissions#permission-modes), and doesn't offer a "don't ask again" option for it. [Allow rules](https://code.claude.com/docs/en/permissions#permission-rule-syntax) that match the tool don't skip the prompt either. In `dontAsk` mode, which never prompts, Claude Code denies the call instead.

The prompt has to reach a person. In non-interactive mode with [`--permission-prompt-tool`](https://code.claude.com/docs/en/cli-reference#cli-flags), an `allow` result from the prompt tool for a flagged tool is converted to a deny with the message `MCP tool requires user interaction; not supported via --permission-prompt-tool`. The Agent SDK's [`canUseTool` callback](https://code.claude.com/docs/en/agent-sdk/permissions) does receive these calls and can approve them, because your SDK application is expected to show them to a user.

Use this for tools whose permission prompt is itself the point, such as a consent or access-grant step where auto-approval would mean no human ever agreed. Other tools from the same server keep their normal permission behavior.

The following `tools/list` entry marks one tool as always requiring approval.

```json theme={null}
{
  "name": "grant_access",
  "description": "Requests access to a protected resource",
  "_meta": {
    "anthropic/requiresUserInteraction": true
  }
}
```

The `anthropic/requiresUserInteraction` annotation requires Claude Code v2.1.199 or later. Earlier versions ignore it and apply the standard permission flow.

Some surfaces, such as [Remote Control](https://code.claude.com/docs/en/remote-control) and applications built on the [Agent SDK](https://code.claude.com/docs/en/agent-sdk/overview), normally let you approve tool calls with one tap. For a tool marked with this annotation, Claude Code withholds the one-tap action and shows the tool's full permission prompt instead, so approval still comes from a person answering the prompt rather than a tap.

Claude Code withholds one-tap approval the same way for any permission request that only the terminal dialog can render in full, such as one that carries a safety warning or an always-allow option the remote surface can't show. You answer that request in the terminal dialog rather than from Remote Control. Requires Claude Code v2.1.214 or later.
