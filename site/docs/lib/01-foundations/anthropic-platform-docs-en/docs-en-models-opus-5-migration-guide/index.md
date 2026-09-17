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
sourceRel: "docs/en/models/opus-5/migration-guide.md"
rawUrl: "/raw/01-foundations/anthropic-platform-docs-en/docs/en/models/opus-5/migration-guide.md"
sourceSha256: "2c90776b634505f2d6035e2f08ffac4bf934f8e5be4f77391f159416c7bd5cc5"
pageSha256: "bdf25e3ca1167c5cafeb8c3ee39703392e59eb0697864d8ea85d7db03cf985db"
contentMode: "local-full"
zh: ""
---

This guide covers migrating [Messages API](https://platform.claude.com/docs/en/build-with-claude/working-with-messages) code. If you use [Claude Managed Agents](https://platform.claude.com/docs/en/managed-agents/overview), no changes beyond updating the model name are required.

  **Automate your migration with the Claude API skill.** In Claude Code, run `/claude-api migrate` to invoke the bundled [Claude API skill](https://platform.claude.com/docs/en/agents-and-tools/agent-skills/claude-api-skill#migrating-to-a-newer-claude-model). It works for any current Claude model as the target:

  ```text wrap
  /claude-api migrate this project to claude-opus-5
  ```

  The skill applies the model ID swap and, as needed, breaking parameter changes, prefill replacement, and effort calibration for your target model across your code base, then produces a checklist of items to verify manually. It asks you to confirm the migration scope (entire working directory, a subdirectory, or a specific file list) before editing any files. The skill also detects Amazon Bedrock and Claude Platform on AWS clients and adjusts model ID formats and feature changes for those platforms.

Claude Opus 5 is a step-change improvement over Claude Opus 4.8, strong on deep reasoning, agentic and long-horizon tasks, and test-time compute scaling. For behavioral differences and model-specific prompting patterns, see [Prompting Claude Opus 5](https://platform.claude.com/docs/en/build-with-claude/prompt-engineering/prompting-claude-opus-5).

Claude Opus 5 is a drop-in upgrade for Claude Opus 4.8 at the same pricing of $5 USD per million input tokens and $25 USD per million output tokens; see [Claude pricing](https://platform.claude.com/docs/en/about-claude/pricing). There are two breaking changes for code already running on Claude Opus 4.8, covered under [Breaking changes](https://platform.claude.com/docs/en/models/opus-5/migration-guide#breaking-changes). Claude Opus 5 supports the same set of features as Claude Opus 4.8, including the [1M token context window](https://platform.claude.com/docs/en/build-with-claude/context-windows) (the default, with no beta header), [128k max output tokens](https://platform.claude.com/docs/en/models/overview), [adaptive thinking](https://platform.claude.com/docs/en/build-with-claude/thinking), [prompt caching](https://platform.claude.com/docs/en/build-with-claude/prompt-caching), [batch processing](https://platform.claude.com/docs/en/build-with-claude/batch-processing), the [Files API](https://platform.claude.com/docs/en/build-with-claude/files), [PDF support](https://platform.claude.com/docs/en/build-with-claude/pdf-support), [vision](https://platform.claude.com/docs/en/build-with-claude/vision), and server-side and client-side [tools](https://platform.claude.com/docs/en/agents-and-tools/tool-use/overview), with two exceptions: [web fetch](https://platform.claude.com/docs/en/agents-and-tools/tool-use/web-fetch-tool) is not available on Claude Opus 5, and [Priority Tier](https://platform.claude.com/docs/en/api/service-tiers#supported-models) is not supported on Claude Opus 5. See each tool page for model availability.

## 本篇目录

- [Migrating to Claude Opus 5 from Claude Opus 4.8](https://platform.claude.com/docs)
- [Migrating to Claude Opus 5 from Claude Opus 4.7](https://platform.claude.com/docs)
- [Migrating to Claude Opus 5 from Claude Opus 4.6 and earlier Opus models](https://platform.claude.com/docs)
- [Migrating to Claude Opus 5 from Claude Sonnet 5](https://platform.claude.com/docs)
