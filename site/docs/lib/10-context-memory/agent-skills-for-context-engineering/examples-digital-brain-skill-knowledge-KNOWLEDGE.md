---
title: "Knowledge Base"
sourceId: "10-context-memory/agent-skills-for-context-engineering"
sourceTitle: "Agent Skills for Context Engineering"
sourceKind: "技能与配置库"
licenseLabel: "可转载"
lang: "英文"
tier: 3
volume: "10-context-memory"
sourceUrl: "https://github.com/muratcankoylan/Agent-Skills-for-Context-Engineering"
entryUrl: "https://github.com/muratcankoylan/Agent-Skills-for-Context-Engineering/blob/6dbe1a1d868eab51a3bc9011b0f55e2891513e40/examples/digital-brain-skill/knowledge/KNOWLEDGE.md"
sourceRel: "examples/digital-brain-skill/knowledge/KNOWLEDGE.md"
rawUrl: "/raw/10-context-memory/agent-skills-for-context-engineering/examples/digital-brain-skill/knowledge/KNOWLEDGE.md"
sourceSha256: "7817234f145496203690c5a5119515b6019938931d949dd3c3533bf09bba2718"
pageSha256: "7817234f145496203690c5a5119515b6019938931d949dd3c3533bf09bba2718"
contentMode: "local-full"
zh: ""
---

# Knowledge Base

Your second brain for research, learning, and information organization.

## Files in This Module

| File | Format | Purpose |
|------|--------|---------|
| `bookmarks.jsonl` | JSONL | Saved links and resources |
| `learning.yaml` | YAML | Skills and learning goals |
| `competitors.md` | Markdown | Competitive landscape |
| `research/` | Folder | Deep-dive research notes |
| `notes/` | Folder | Quick capture notes |

## Data Schemas

### Bookmark Entry
```json
{
  "id": "bm_YYYYMMDD_HHMMSS",
  "saved_at": "ISO8601",
  "url": "https://...",
  "title": "Page title",
  "source": "article|video|podcast|tool|tweet|paper",
  "category": "category_name",
  "summary": "1-2 sentence summary",
  "key_insights": ["insight1", "insight2"],
  "status": "unread|read|reviewed|archived",
  "rating": 1-5,
  "tags": ["tag1", "tag2"]
}
```

## Workflows

### Saving a Resource
1. Append to `bookmarks.jsonl` with status "unread"
2. Add category and initial tags
3. Later: read, summarize, update status

### Research Projects
1. Create `research/[topic].md` for deep dives
2. Link relevant bookmarks
3. Synthesize insights
4. Extract content ideas

### Learning Tracking
1. Define skills in `learning.yaml`
2. Link resources to skills
3. Track progress and milestones
4. Review quarterly

## Agent Instructions

&lt;instructions>
When managing knowledge:

1. **Saving links**: Always capture URL, title, and initial category
2. **Organizing**: Use consistent categories and tags
3. **Retrieving**: Search bookmarks.jsonl by category, tags, or keywords
4. **Synthesizing**: When asked about a topic, check research/ folder first
5. **Learning updates**: Update learning.yaml when completing resources

Categories to use:
- ai_agents: AI, agents, automation
- building: Startups, product, engineering
- growth: Marketing, audience, content
- productivity: Systems, tools, workflows
- leadership: Management, teams, culture
- industry: Market trends, competitors
- personal: Health, relationships, life
&lt;/instructions>

## Knowledge Graph Hints

When retrieving information, consider connections:
- Bookmarks → Content ideas
- Research → Authority pieces
- Learning → Skills to highlight in brand
- Competitors → Differentiation angles
