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
pageSha256: "311649dedf39d44e1068b9a991876df48b26cdd9660202b0488bdbac3c019af0"
contentMode: "local-full"
zh: ""
---

## How Skills are loaded

When you specify Skills in a container:

1. **Metadata discovery:** Claude sees metadata for each Skill (name, description) in the system prompt.
2. **File loading:** Skill files are copied into the container at `/skills/\{skill-name\}/`. The directory is the Skill's name (`pptx` for an Anthropic Skill, the `SKILL.md` `name` for a custom Skill), not its `skill_01...` ID.
3. **Automatic use:** Claude automatically loads and uses Skills when relevant to your request.
4. **Composition:** Multiple Skills compose together for complex workflows.

Claude loads full Skill instructions only when needed.

***
