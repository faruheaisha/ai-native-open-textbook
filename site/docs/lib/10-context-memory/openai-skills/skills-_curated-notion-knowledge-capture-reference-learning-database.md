---
title: "Learning/Post-Mortem Database"
sourceId: "10-context-memory/openai-skills"
sourceTitle: "Agent Skills"
sourceKind: "技能与配置库"
licenseLabel: "仅引用"
lang: "英文"
tier: 3
volume: "10-context-memory"
sourceUrl: "https://github.com/openai/skills"
entryUrl: "https://github.com/openai/skills/blob/49f948faa9258a0c61caceaf225e179651397431/skills/.curated/notion-knowledge-capture/reference/learning-database.md"
sourceRel: "skills/.curated/notion-knowledge-capture/reference/learning-database.md"
rawUrl: "/raw/10-context-memory/openai-skills/skills/.curated/notion-knowledge-capture/reference/learning-database.md"
sourceSha256: "8ceaa72bc7ab944ce1084df6233001c05b65d06ee5913a23caf760f248236e83"
pageSha256: "8ceaa72bc7ab944ce1084df6233001c05b65d06ee5913a23caf760f248236e83"
contentMode: "local-full"
zh: ""
---

# Learning/Post-Mortem Database

**Purpose**: Capture learnings from incidents, projects, or experiences.

## Schema

| Property | Type | Options | Purpose |
|----------|------|---------|---------|
| **Title** | title | - | Event or project name |
| **Date** | date | - | When it happened |
| **Type** | select | Incident, Project, Experiment, Retrospective | Learning type |
| **Severity** | select | Critical, Major, Minor | Impact level (for incidents) |
| **Team** | people | - | Who was involved |
| **Key Learnings** | number | - | Count of learnings |
| **Action Items** | relation | Links to tasks | Follow-up actions |

## Content Template

Each learning page should include:
- **What Happened**: Situation description
- **What Went Well**: Success factors
- **What Didn't Go Well**: Problems encountered
- **Root Causes**: Why things happened
- **Learnings**: Key takeaways
- **Action Items**: Improvements to implement

## Best Practices

1. **Blameless approach**: Focus on systems and processes, not individuals
2. **Document quickly**: Capture while memory is fresh
3. **Identify root causes**: Go beyond surface-level problems
4. **Create action items**: Turn learnings into improvements
5. **Follow up**: Track that action items are completed
6. **Share widely**: Make learnings accessible to entire team
