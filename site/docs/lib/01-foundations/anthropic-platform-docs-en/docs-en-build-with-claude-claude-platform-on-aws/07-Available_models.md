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
sourceRel: "docs/en/build-with-claude/claude-platform-on-aws.md"
rawUrl: "/raw/01-foundations/anthropic-platform-docs-en/docs/en/build-with-claude/claude-platform-on-aws.md"
sourceSha256: "0ff935251ef5bee607ae9d604d1c665269af87e8eda7c66c98362c1d5906779c"
pageSha256: "7c8860e75ab8e3d342e024ba1526b9feead39abe1bc24591cf26c404366fb7cc"
contentMode: "local-full"
zh: ""
---

## Available models

The following models are available on Claude Platform on AWS:

| Model             | Model ID          |
| ----------------- | ----------------- |
| Claude Fable 5.1  | claude-fable-5-1  |
| Claude Fable 5    | claude-fable-5    |
| Claude Opus 5     | claude-opus-5     |
| Claude Opus 4.8   | claude-opus-4-8   |
| Claude Opus 4.7   | claude-opus-4-7   |
| Claude Opus 4.6   | claude-opus-4-6   |
| Claude Sonnet 5   | claude-sonnet-5   |
| Claude Sonnet 4.6 | claude-sonnet-4-6 |
| Claude Opus 4.5   | claude-opus-4-5   |
| Claude Sonnet 4.5 | claude-sonnet-4-5 |
| Claude Haiku 4.5  | claude-haiku-4-5  |

Model IDs are identical to the first-party Claude API. There are no Bedrock-style ARNs or `anthropic.` prefixes.

New models typically launch on Claude Platform on AWS the same day as the first-party Claude API.

  Upgrading to a newer Claude model? In Claude Code, run `/claude-api migrate` to apply model ID swaps and breaking parameter changes across your codebase. The skill detects which cloud platform your code targets and adjusts model ID formats and feature changes for that platform. See [Migrating to a newer Claude model](https://platform.claude.com/docs/en/agents-and-tools/agent-skills/claude-api-skill#migrating-to-a-newer-claude-model).
