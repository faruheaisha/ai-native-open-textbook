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
sourceRel: "docs/en/build-with-claude/skills-guide.md"
rawUrl: "/raw/01-foundations/anthropic-platform-docs-en/docs/en/build-with-claude/skills-guide.md"
sourceSha256: "920c3ac1bb9cf546c0c32c24f1318aa13e58fb4ebadca36bc8b51ea6bd1fb78f"
pageSha256: "8df4255b3dead0d26c84b1c9f378170499f2f1a918a08c4bdf970ef1cf67d44c"
contentMode: "local-full"
zh: ""
---

## Overview

  For a detailed look at the architecture and real-world applications of Agent Skills, read the engineering blog post: [Equipping agents for the real world with Agent Skills](https://www.anthropic.com/engineering/equipping-agents-for-the-real-world-with-agent-skills).

Skills integrate with the Messages API through the [code execution tool](https://platform.claude.com/docs/en/agents-and-tools/tool-use/code-execution-tool). Whether using pre-built Skills managed by Anthropic or custom Skills you've uploaded, the integration shape is identical: both require code execution and use the same `container` structure.

### Using Skills

Skills integrate identically in the Messages API regardless of source. You specify Skills in the `container` parameter with a `skill_id`, `type`, and optional `version`, and they run in the code execution environment.

You can use Skills from two sources:

| Aspect             | Anthropic Skills                           | Custom Skills                                                                                     |
| ------------------ | ------------------------------------------ | ------------------------------------------------------------------------------------------------- |
| **Type value**     | `anthropic`                                | `custom`                                                                                          |
| **Skill IDs**      | Short names: `pptx`, `xlsx`, `docx`, `pdf` | Generated: `skill_01AbCdEfGhIjKlMnOpQrStUv`                                                       |
| **Version format** | Date-based: `20251013` or `latest`         | Version ID: `skver_01AbCdEfGhIjKlMnOpQrStUv` or `latest`                                          |
| **Management**     | Pre-built and maintained by Anthropic      | Upload and manage through the [Skills API](https://platform.claude.com/docs/en/api/skills/create) |
| **Availability**   | Available to all users                     | Private to your workspace                                                                         |

Both skill sources are returned by the [List Skills endpoint](https://platform.claude.com/docs/en/api/skills/list) (use the `source` parameter to filter). The integration shape and execution environment are identical. The only difference is where the Skills come from and how they're managed.

### Prerequisites

To use Skills, you need:

1. **Claude API key** from the [Claude Console](https://platform.claude.com/settings/keys)
2. **[Code execution tool](https://platform.claude.com/docs/en/agents-and-tools/tool-use/code-execution-tool)** enabled in your requests

Skills require the code execution tool, so use a model from its [model compatibility list](https://platform.claude.com/docs/en/agents-and-tools/tool-use/code-execution-tool#compatibility).

***
