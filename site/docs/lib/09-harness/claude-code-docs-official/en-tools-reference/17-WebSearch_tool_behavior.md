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
sourceRel: "en/tools-reference.md"
rawUrl: "/raw/09-harness/claude-code-docs-official/en/tools-reference.md"
sourceSha256: "f928a98a3f2e69421eeadeb064439c827340f4b19a28c7ad920c2a0e60b142f9"
pageSha256: "23d93382d871544ecb7e35f8d0cf15d3428bf4dae8cbf7acd8ca939e55e59311"
contentMode: "local-full"
zh: ""
---

## WebSearch tool behavior

WebSearch runs a query against Anthropic's [web search](https://platform.claude.com/docs/en/agents-and-tools/tool-use/web-search-tool) backend and returns result titles and URLs. It doesn't fetch the result pages. To read a page Claude finds in search results, it follows up with [WebFetch](#webfetch-tool-behavior).

The tool may issue up to eight backend searches per call, refining the search internally before returning results. Claude can scope results with `allowed_domains` to include only certain hosts, or `blocked_domains` to exclude them. The two lists can't be combined in a single call.

When the search request hits an overloaded API, Claude Code retries it with backoff; a call that still fails returns an error result. Before v2.1.212, the API error text could reach Claude as if it were search results.

WebSearch permission rules take no specifier. A bare `WebSearch` entry in `allow` or `deny` is the only form.

The search backend is not configurable. To search with a different provider, add an [MCP server](https://code.claude.com/docs/en/mcp) that exposes a search tool.

  WebSearch is available on the Claude API and [Claude Platform on AWS](https://code.claude.com/docs/en/claude-platform-on-aws). On Microsoft Foundry it requires a [deployment hosted on Anthropic](https://platform.claude.com/docs/en/build-with-claude/claude-in-microsoft-foundry#hosting-options): deployments hosted on Azure don't support server-side tools, so the WebSearch call fails. On Google Cloud's Agent Platform it works with Claude 4 and later models, including Opus, Sonnet, and Haiku. Amazon Bedrock doesn't expose the server-side web search tool.

### Session search limit

A session can make at most 200 WebSearch calls, counted across the main conversation and every [subagent](https://code.claude.com/docs/en/sub-agents) it spawns, so searches made by parallel research fan-outs count against the same limit. The limit requires Claude Code v2.1.212 or later. When Claude reaches the limit, further calls return a notice telling Claude to continue with the information it already gathered, rather than an error that would invite a retry. You don't see the notice: a capped call appears in the conversation as a search that did nothing, and if Claude needs more searches, the notice tells it to ask you to raise the limit.

Set the [`CLAUDE_CODE_MAX_WEB_SEARCHES_PER_SESSION`](https://code.claude.com/docs/en/env-vars) environment variable to change the cap; it accepts a positive whole number, so the cap can be raised but not turned off. Running [`/clear`](https://code.claude.com/docs/en/commands#all-commands) resets the count. If work that can still spawn [subagents](https://code.claude.com/docs/en/sub-agents) survives the clear, such as a running workflow, the count carries over instead.
