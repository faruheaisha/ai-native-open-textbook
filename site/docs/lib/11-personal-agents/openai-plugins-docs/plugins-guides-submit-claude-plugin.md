---
title: "Submit your Claude Code plugin to OpenAI"
sourceId: "11-personal-agents/openai-plugins-docs"
sourceTitle: "openai-plugins-docs"
sourceKind: "官方文档"
licenseLabel: "仅引用"
lang: "英文"
tier: 3
volume: "11-personal-agents"
sourceUrl: "https://developers.openai.com/plugins"
entryUrl: "https://developers.openai.com/plugins"
sourceRel: "plugins/guides/submit-claude-plugin.md"
rawUrl: "/raw/11-personal-agents/openai-plugins-docs/plugins/guides/submit-claude-plugin.md"
sourceSha256: "f191c10e6d42c034a48780f52bf87cb970bc1f55cf3487dd9326b5d81302eb3a"
pageSha256: "f191c10e6d42c034a48780f52bf87cb970bc1f55cf3487dd9326b5d81302eb3a"
contentMode: "local-full"
zh: ""
---

# Submit your Claude Code plugin to OpenAI

> For the complete documentation index, see [llms.txt](https://developers.openai.com/llms.txt). Markdown versions of documentation pages are available by appending `.md` to the page URL.

If you already publish a Claude Code plugin or connector, choose the submission
path based on whether it includes skills, an MCP server, or both.

| What you have               | What to submit                                                                                                     |
| --------------------------- | ------------------------------------------------------------------------------------------------------------------ |
| Skills and no MCP server    | Upload a [skills-only plugin](#submit-a-skills-only-plugin).                                                       |
| A public HTTPS MCP endpoint | Create a [remote MCP submission](#submit-a-plugin-with-a-remote-mcp-server). Include any skills in the same draft. |
| A local MCP server          | Deploy it to a public HTTPS URL. If you can't, reach out to your OpenAI contact for local MCP support.             |

Claude uses separate submission processes for Claude Code plugins and MCP
connectors. OpenAI uses one plugin package that can contain skills, MCP servers,
or both. Claude marketplace listings and approvals don't transfer.

If your plugin includes skills, review their instructions using the
[instruction-following guidance](https://developers.openai.com/plugins/build/skills#review-instruction-following)
before submitting them through either path.

## Submit a skills-only plugin

Choose this path when the plugin doesn't need an MCP server.

### Review what OpenAI supports

| What your Claude plugin has                                                                                 | What to do                                                                                                                                                                                                                                                                                                                                                                 |
| ----------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
