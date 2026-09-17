---
title: "Decision Log Database (ADR - Architecture Decision Records)"
sourceId: "10-context-memory/openai-skills"
sourceTitle: "Agent Skills"
sourceKind: "技能与配置库"
licenseLabel: "仅引用"
lang: "英文"
tier: 3
volume: "10-context-memory"
sourceUrl: "https://github.com/openai/skills"
entryUrl: "https://github.com/openai/skills/blob/49f948faa9258a0c61caceaf225e179651397431/skills/.curated/notion-knowledge-capture/reference/decision-log-database.md"
sourceRel: "skills/.curated/notion-knowledge-capture/reference/decision-log-database.md"
rawUrl: "/raw/10-context-memory/openai-skills/skills/.curated/notion-knowledge-capture/reference/decision-log-database.md"
sourceSha256: "77d23a69b94cecaad520cb84f18b214994fa2c7873b88928f8d13da8b301c773"
pageSha256: "77d23a69b94cecaad520cb84f18b214994fa2c7873b88928f8d13da8b301c773"
contentMode: "local-full"
zh: ""
---

# Decision Log Database (ADR - Architecture Decision Records)

**Purpose**: Track important decisions with context and rationale.

## Schema

| Property | Type | Options | Purpose |
|----------|------|---------|---------|
| **Decision** | title | - | What was decided |
| **Date** | date | - | When decision was made |
| **Status** | select | Proposed, Accepted, Superseded, Deprecated | Current decision status |
| **Domain** | select | Architecture, Product, Business, Design, Operations | Decision category |
| **Impact** | select | High, Medium, Low | Expected impact level |
| **Deciders** | people | - | Who made the decision |
| **Stakeholders** | people | - | Who's affected by decision |
| **Related Decisions** | relation | Links to other decisions | Context and dependencies |

## Usage

```
Create decision records with properties:
{
  "Decision": "Use PostgreSQL for Primary Database",
  "Date": "2025-10-15",
  "Status": "Accepted",
  "Domain": "Architecture",
  "Impact": "High",
  "Deciders": [tech_lead, architect],
  "Stakeholders": [eng_team]
}
```

## Content Template

Each decision page should include:
- **Context**: Why this decision was needed
- **Decision**: What was decided
- **Rationale**: Why this option was chosen
- **Options Considered**: Alternatives and trade-offs
- **Consequences**: Expected outcomes (positive and negative)
- **Implementation**: How decision will be executed

## Views

**Recent Decisions**: Sort by Date descending
**Active Decisions**: Filter where Status = "Accepted"
**By Domain**: Group by Domain
**High Impact**: Filter where Impact = "High"
**Pending**: Filter where Status = "Proposed"

## Best Practices

1. **Document immediately**: Record decisions when made, while context is fresh
2. **Include alternatives**: Show what was considered and why it wasn't chosen
3. **Track superseded decisions**: Update status when decisions change
4. **Link related decisions**: Use relations to show dependencies
5. **Review periodically**: Check if old decisions are still valid
