---
title: "Anthropic 平台文档（英文全量）"
sourceId: "01-foundations/anthropic-platform-docs-en"
sourceTitle: "Anthropic 平台文档（英文全量）"
sourceKind: "官方文档"
licenseLabel: "仅引用"
lang: "英文"
tier: 3
volume: "01-foundations"
sourceUrl: "https://platform.claude.com/docs"
entryUrl: "https://platform.claude.com/docs"
sourceRel: "docs/en/agents-and-tools/tool-use/browser-use-tool.md"
rawUrl: "/raw/01-foundations/anthropic-platform-docs-en/docs/en/agents-and-tools/tool-use/browser-use-tool.md"
sourceSha256: "d43f412bbfd1e7c341a24d092ded1e9b9fa70b226fe41111f02453c9a4d81255"
pageSha256: "686e46d78a19c85ca7b60514f276ccf290686a653afafa6b2a984adfea2f508d"
contentMode: "local-full"
zh: ""
---

## Pricing and data retention

Browser use follows the standard [tool use pricing](https://platform.claude.com/docs/en/agents-and-tools/tool-use/overview#pricing). When using the browser use tool:

**Toolset definition overhead:** Declaring `browser_toolset_20260801` with its default members adds about 6,600 input tokens to a request (about 6,610 on Claude Fable 5, Claude Mythos 5, Claude Opus 5, and Claude Opus 4.8, and about 6,670 on Claude Sonnet 5), which covers the member tool definitions and the tool use system prompt. Enabling all four optional members adds about 880 tokens, and disabling members with `configs` reduces the count. The exact count for a request is reported in the response `usage`, and you can estimate it in advance with the [token counting endpoint](https://platform.claude.com/docs/en/build-with-claude/token-counting).

**Additional token consumption:**

* Screenshot and zoom images returned in tool results, billed as image input (see [Vision pricing](https://platform.claude.com/docs/en/build-with-claude/vision#evaluate-image-size))
* Text tool results returned to Claude, such as accessibility trees, page text, and console or network entries

  If you also use the computer use tool, bash tool, text editor tool, or your own tools alongside browser use, those tools have their own token costs as documented on their respective pages.

The browser session, downloads, and uploaded files stay in your environment; the screenshots, page text, and tab state you return are part of your API request content and follow the standard retention policy, or your ZDR arrangement if you have one. The browser use tool is ZDR eligible; see [API and data retention](https://platform.claude.com/docs/en/manage-claude/api-and-data-retention) for retention periods and eligibility across features.
