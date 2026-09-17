---
title: "How-To Guide Database"
sourceId: "10-context-memory/openai-skills"
sourceTitle: "Agent Skills"
sourceKind: "技能与配置库"
licenseLabel: "仅引用"
lang: "英文"
tier: 3
volume: "10-context-memory"
sourceUrl: "https://github.com/openai/skills"
entryUrl: "https://github.com/openai/skills/blob/49f948faa9258a0c61caceaf225e179651397431/skills/.curated/notion-knowledge-capture/reference/how-to-guide-database.md"
sourceRel: "skills/.curated/notion-knowledge-capture/reference/how-to-guide-database.md"
rawUrl: "/raw/10-context-memory/openai-skills/skills/.curated/notion-knowledge-capture/reference/how-to-guide-database.md"
sourceSha256: "a6002d032b0563e0234a4c225226ea6a207b120e69b0c839315c8402813b30e5"
pageSha256: "a6002d032b0563e0234a4c225226ea6a207b120e69b0c839315c8402813b30e5"
contentMode: "local-full"
zh: ""
---

# How-To Guide Database

**Purpose**: Procedural documentation for common tasks.

## Schema

| Property | Type | Options | Purpose |
|----------|------|---------|---------|
| **Title** | title | - | "How to [Task]" |
| **Complexity** | select | Beginner, Intermediate, Advanced | Skill level required |
| **Time Required** | number | - | Estimated minutes to complete |
| **Prerequisites** | relation | Links to other guides | Required knowledge |
| **Category** | select | Development, Deployment, Testing, Tools | Task category |
| **Last Tested** | date | - | When procedure was verified |
| **Tags** | multi_select | - | Technology/tool tags |

## Usage

```
Create how-to guides with properties:
{
  "Title": "How to Set Up Local Development Environment",
  "Complexity": "Beginner",
  "Time Required": 30,
  "Category": "Development",
  "Last Tested": "2025-10-01",
  "Tags": "setup, environment, docker"
}
```

## Best Practices

1. **Use consistent naming**: Always start with "How to..."
2. **Test procedures**: Verify steps work before publishing
3. **Include time estimates**: Help users plan their time
4. **Link prerequisites**: Make dependencies clear
5. **Update regularly**: Re-test procedures when tools/systems change
