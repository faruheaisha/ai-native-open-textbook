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
pageSha256: "215749da6727cc4482d88a16aa9dfe0a2d2ae5f9259081548df523fa806f7647"
contentMode: "local-full"
zh: ""
---

## Tools with invalid input schemas

The Claude API checks every tool's input schema in a request and rejects the whole request when any one schema fails, so a single MCP tool with a malformed schema would make every request that includes it fail with a 400 error. Claude Code runs two of the API's checks itself when it loads a server's tools and excludes each tool that would fail them, so the server's other tools keep working:

* Top-level property names must be 1 to 64 characters long and use only ASCII letters and digits, `_`, `.`, and `-`
* The schema must be valid against the JSON Schema draft 2020-12 meta-schema. Claude Code applies this check to schemas that declare no `$schema` and schemas that declare draft 2020-12. A schema that declares any other dialect skips this check, though the property-name check above still applies

Claude Code runs the checks after the [root-level combinator rewrite](#tool-input-schemas-with-a-root-level-combinator), on the schema it would actually send.

When Claude Code excludes a tool, it records the reason in the server's log and tells Claude which tools it excluded and why, so you can ask Claude why a tool is missing. If you fix the schema on the server, the tool comes back the next time Claude Code loads the server's tools.

Claude Code turns the exclusion on through a feature flag it fetches from Anthropic. On a [deployment where flag fetching is off](https://code.claude.com/docs/en/env-vars#features-that-need-feature-flag-fetching), or on a machine whose flags have never arrived, such as an air-gapped machine, Claude Code still runs the checks and records in the server's log which tool would be rejected, but sends the tool's schema to the API anyway. The API rejects a request that includes that schema with [a 400 error naming the tool by its position](https://code.claude.com/docs/en/errors#tool-input-schema-is-invalid). Before v2.1.216, no deployment ran these checks.

The [root-level combinator handling](#tool-input-schemas-with-a-root-level-combinator) is separate and keeps its own behavior when flag fetching is off or the flags have never arrived.
