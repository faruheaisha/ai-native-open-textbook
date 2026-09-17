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
pageSha256: "4a09353b188711bac5c42793462484781e3702ee016838a2f56765f82082848a"
contentMode: "local-full"
zh: ""
---

## Limits and constraints

### Request limits

* **Maximum Skills per request:** 20

* **Maximum Skill upload size:** 30 MB (all files combined, uncompressed)

* **YAML frontmatter requirements:**

  * `name`: Maximum 64 characters, lowercase letters/numbers/hyphens only, no XML tags, no reserved words ("anthropic", "claude")
  * `description`: Maximum 1024 characters, non-empty, no XML tags

### Environment constraints

Skills run in the code execution container with these limitations:

* **No network access:** Cannot make external API calls
* **No runtime package installation:** Only pre-installed packages available
* **Isolated environment:** A fresh container is created unless you specify an existing container ID

See [Code execution tool](https://platform.claude.com/docs/en/agents-and-tools/tool-use/code-execution-tool) for available packages.

***
