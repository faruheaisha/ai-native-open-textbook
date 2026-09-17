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
pageSha256: "b201a781f93cd8b5c3d49e7fd0d2e05f44e7ab22f7ad2443bd1555f88ade31c9"
contentMode: "local-full"
zh: ""
---

## Tool input schemas with a root-level combinator

Some MCP servers declare a tool's input schema as a JSON Schema union, with `anyOf`, `oneOf`, or `allOf` at the top level of the schema. The Claude API doesn't accept those keywords at the schema root. It does accept combinators nested inside `properties`, which Claude Code sends unchanged.

Tools with a root-level combinator stay available. Before sending the tool to the API, Claude Code flattens the schema into a single object and prepends a sentence to the tool's description that tells Claude which parameter groups belong together:

* `allOf`: properties from every branch are merged, and each branch's `required` list still applies
* `anyOf` and `oneOf`: properties from every branch are merged, and each branch's `required` list is described in the tool description instead of enforced by the schema

Your server receives whichever arguments Claude chose, so keep validating the combination server-side.

When Claude Code can't produce a schema the API accepts, or on a deployment that doesn't receive the remote configuration that enables the rewrite, it skips that one tool, records the reason in the server's log, and leaves the server's other tools available. Versions earlier than v2.1.195 skip every tool whose input schema has a root-level `anyOf`, `oneOf`, or `allOf`.
