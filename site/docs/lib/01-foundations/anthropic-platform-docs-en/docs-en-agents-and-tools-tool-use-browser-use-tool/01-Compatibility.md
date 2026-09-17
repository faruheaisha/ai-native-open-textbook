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
pageSha256: "e38dc3ce6b3a8ed5529a956b1065291fcfee683ec0dba5fcfdbeec7de7ad75d8"
contentMode: "local-full"
zh: ""
---

## Compatibility
- [ZDR](https://platform.claude.com/docs/en/manage-claude/api-and-data-retention): eligible (excludes [Covered Models](https://platform.claude.com/docs/en/manage-claude/api-and-data-retention#model-specific-data-retention-requirements))
- Supported models: `claude-fable-5-1`, `claude-mythos-5-1`, `claude-fable-5`, `claude-mythos-5`, `claude-opus-5`, `claude-sonnet-5`, `claude-opus-4-8`
- Platforms: Claude API, Google Cloud; not available on Claude Platform on AWS, Amazon Bedrock, Microsoft Foundry

The browser use tool lets Claude navigate, read, and interact with webpages in a browser that your application runs. Claude works with the page both through its structure (the accessibility tree, elements, forms, and tabs) and through screenshots and viewport coordinates.

The tool is an Anthropic-defined [client toolset](https://platform.claude.com/docs/en/agents-and-tools/tool-use/tool-reference#client-toolsets): one `browser_toolset_20260801` entry in `tools` gives Claude 27 member tools by default, such as `navigate`, `read_page`, `left_click`, and `screenshot`, plus four more when you [enable them](https://platform.claude.com/docs/en/agents-and-tools/tool-use/browser-use-tool#enable-optional-member-tools). Your application runs every call against its own browser automation; nothing runs on Anthropic's side. The tool isn't currently available in [Claude Managed Agents](https://platform.claude.com/docs/en/managed-agents/tools).

Choose browser use when the task stays inside webpages and means acting on them, or when pages build their content with JavaScript. When a task needs a whole desktop, use the [computer use tool](https://platform.claude.com/docs/en/agents-and-tools/tool-use/computer-use-tool), which works through screenshots and coordinates alone. For reading pages you can point Claude to, or finding sources on the web, the [web fetch tool](https://platform.claude.com/docs/en/agents-and-tools/tool-use/web-fetch-tool) and [web search tool](https://platform.claude.com/docs/en/agents-and-tools/tool-use/web-search-tool) are lighter. They're [server tools](https://platform.claude.com/docs/en/agents-and-tools/tool-use/server-tools) that the API runs for you, with no browser to operate.

With browser use, Claude reads and acts on live webpages, so everything a page supplies is untrusted input and the actions Claude takes can have real effects. See [Security considerations](https://platform.claude.com/docs/en/agents-and-tools/tool-use/browser-use-tool#security-considerations) before you deploy.
