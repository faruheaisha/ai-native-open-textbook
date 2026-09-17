---
title: "Content Hub"
sourceId: "10-context-memory/agent-skills-for-context-engineering"
sourceTitle: "Agent Skills for Context Engineering"
sourceKind: "技能与配置库"
licenseLabel: "可转载"
lang: "英文"
tier: 3
volume: "10-context-memory"
sourceUrl: "https://github.com/muratcankoylan/Agent-Skills-for-Context-Engineering"
entryUrl: "https://github.com/muratcankoylan/Agent-Skills-for-Context-Engineering/blob/6dbe1a1d868eab51a3bc9011b0f55e2891513e40/examples/digital-brain-skill/content/CONTENT.md"
sourceRel: "examples/digital-brain-skill/content/CONTENT.md"
rawUrl: "/raw/10-context-memory/agent-skills-for-context-engineering/examples/digital-brain-skill/content/CONTENT.md"
sourceSha256: "c5ca5f3a20182369c795867f556a228b01b64fbe2e969a6d56a8ded9653ce222"
pageSha256: "c5ca5f3a20182369c795867f556a228b01b64fbe2e969a6d56a8ded9653ce222"
contentMode: "local-full"
zh: ""
---

# Content Hub

Your content creation and management system.

## Files in This Module

| File | Format | Purpose |
|------|--------|---------|
| `ideas.jsonl` | JSONL | Raw content ideas (append-only) |
| `posts.jsonl` | JSONL | Published content log |
| `calendar.md` | Markdown | Content schedule |
| `drafts/` | Folder | Work-in-progress content |
| `templates/` | Folder | Reusable content formats |
| `engagement.jsonl` | JSONL | Saved posts/threads for inspiration |

## Workflows

### Capture an Idea
```bash
# Append to ideas.jsonl with timestamp
{
  "id": "idea_YYYYMMDD_HHMMSS",
  "created": "ISO8601",
  "idea": "content",
  "source": "where it came from",
  "pillar": "content pillar",
  "status": "raw|developing|ready",
  "priority": "high|medium|low"
}
```

### Content Creation Pipeline
```
1. ideas.jsonl (capture)
      ↓
2. drafts/draft_[topic].md (develop)
      ↓
3. Review against voice.md
      ↓
4. Publish
      ↓
5. posts.jsonl (archive with metrics)
```

### Weekly Content Review
1. Review `ideas.jsonl` - promote or archive stale ideas
2. Check `calendar.md` - plan next week
3. Review `posts.jsonl` - analyze what worked
4. Update `engagement.jsonl` - save inspiring content

## Agent Instructions

&lt;instructions>
When working with content:

1. **Capturing ideas**: Always append to ideas.jsonl, never overwrite
2. **Creating drafts**: Use templates from templates/ as starting points
3. **Writing content**: MUST read identity/voice.md first
4. **Publishing**: Log to posts.jsonl with all metadata
5. **Analysis**: Reference posts.jsonl for performance patterns

Priority scoring:
- High: Timely, high-value, aligns with current goals
- Medium: Good idea, no urgency
- Low: Worth capturing, develop later
&lt;/instructions>

## Content Metrics to Track

```yaml
engagement_metrics:
  - impressions
  - likes
  - comments
  - reposts
  - saves
  - link_clicks

quality_indicators:
  - comment_quality: "meaningful discussions vs. emoji reactions"
  - share_context: "what people say when sharing"
  - follower_conversion: "followers gained from post"
```
