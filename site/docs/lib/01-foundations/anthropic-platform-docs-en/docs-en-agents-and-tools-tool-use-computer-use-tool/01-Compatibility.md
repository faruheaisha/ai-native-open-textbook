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
sourceRel: "docs/en/agents-and-tools/tool-use/computer-use-tool.md"
rawUrl: "/raw/01-foundations/anthropic-platform-docs-en/docs/en/agents-and-tools/tool-use/computer-use-tool.md"
sourceSha256: "4de659db5a454a438de8f37a25742b665254c305624f55cfcc5b76491ae62d46"
pageSha256: "94b14ac1ee023da9760731627c11a5e2a458a702a6e38a30d5859ccf6cc1caa6"
contentMode: "local-full"
zh: ""
---

## Compatibility
- [ZDR](https://platform.claude.com/docs/en/manage-claude/api-and-data-retention): eligible (excludes [Covered Models](https://platform.claude.com/docs/en/manage-claude/api-and-data-retention#model-specific-data-retention-requirements))
- Supported models: `claude-fable-5-1`, `claude-mythos-5-1`, `claude-fable-5`, `claude-mythos-5`, `claude-opus-5`, `claude-sonnet-5`, `claude-opus-4-8`
- Platforms: Claude API, Claude Platform on AWS (beta), Amazon Bedrock (beta), Google Cloud, Microsoft Foundry (beta)
- Claude Opus 4.7, Claude Opus 4.6, Claude Sonnet 4.6, and Claude Opus 4.5 support computer use only through the earlier `computer_20251124` tool version, which requires a beta header; see [Earlier tool versions](https://platform.claude.com/docs/en/agents-and-tools/tool-use/computer-use-tool#earlier-tool-versions).
- Platforms other than the Claude API and Google Cloud currently offer only the [earlier beta tool versions](https://platform.claude.com/docs/en/agents-and-tools/tool-use/computer-use-tool#earlier-tool-versions).

Claude can interact with computer environments through the computer use tool, which provides screenshot capabilities and mouse/keyboard control for autonomous desktop interaction.

The computer use tool is an Anthropic-defined [client toolset](https://platform.claude.com/docs/en/agents-and-tools/tool-use/tool-reference#client-toolsets): one `\{"type": "computer_toolset_20260801"\}` entry in `tools` gives Claude 17 member tools such as `screenshot`, `left_click`, `type`, and `zoom`, and your application runs every call in an environment you control. It isn't currently available in [Claude Managed Agents](https://platform.claude.com/docs/en/managed-agents/tools). Claude's calls are `tool_use` blocks whose `name` is the member and which carry `"toolset_name": "computer"`, often several per turn (a [batch action](https://platform.claude.com/docs/en/agents-and-tools/tool-use/computer-use-tool#batch-actions)).

For tasks that stay inside webpages, the [browser use tool](https://platform.claude.com/docs/en/agents-and-tools/tool-use/browser-use-tool) is the closer fit: its member tools read and act on the page itself, and it doesn't need a full desktop environment.

  Computer use is available on the Claude API and [Google Cloud](https://platform.claude.com/docs/en/build-with-claude/claude-on-vertex-ai) as the `computer_toolset_20260801` toolset; see [Compatibility](https://platform.claude.com/docs/en/agents-and-tools/tool-use/computer-use-tool#compatibility) for the supported models.

  Existing `computer_20251124` integrations keep working, and earlier tool versions remain available in beta for models and platforms that don't support the toolset. See [Migrate from `computer_20251124`](https://platform.claude.com/docs/en/agents-and-tools/tool-use/computer-use-tool#migrate-from-computer-20251124) to upgrade, or [Earlier tool versions](https://platform.claude.com/docs/en/agents-and-tools/tool-use/computer-use-tool#earlier-tool-versions) for the beta headers.
