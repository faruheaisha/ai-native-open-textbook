---
title: "Network Module"
sourceId: "10-context-memory/agent-skills-for-context-engineering"
sourceTitle: "Agent Skills for Context Engineering"
sourceKind: "技能与配置库"
licenseLabel: "可转载"
lang: "英文"
tier: 3
volume: "10-context-memory"
sourceUrl: "https://github.com/muratcankoylan/Agent-Skills-for-Context-Engineering"
entryUrl: "https://github.com/muratcankoylan/Agent-Skills-for-Context-Engineering/blob/6dbe1a1d868eab51a3bc9011b0f55e2891513e40/examples/digital-brain-skill/network/NETWORK.md"
sourceRel: "examples/digital-brain-skill/network/NETWORK.md"
rawUrl: "/raw/10-context-memory/agent-skills-for-context-engineering/examples/digital-brain-skill/network/NETWORK.md"
sourceSha256: "eb04cbc1789edc6bb92639d77154e200ecafad4fdd3bb19d6bf7d671090e376a"
pageSha256: "eb04cbc1789edc6bb92639d77154e200ecafad4fdd3bb19d6bf7d671090e376a"
contentMode: "local-full"
zh: ""
---

# Network Module

Your personal CRM for meaningful relationships.

## Files in This Module

| File | Format | Purpose |
|------|--------|---------|
| `contacts.jsonl` | JSONL | People database |
| `interactions.jsonl` | JSONL | Meeting/conversation log |
| `circles.yaml` | YAML | Relationship tiers and groups |
| `intros.md` | Markdown | Pending/made introductions |

## Data Schemas

### Contact Entry
```json
{
  "id": "contact_[unique]",
  "created": "ISO8601",
  "updated": "ISO8601",
  "name": "Full Name",
  "handle": "@twitter_handle",
  "email": "email@domain.com",
  "company": "Company Name",
  "role": "Their Role",
  "location": "City, Country",
  "circle": "inner|active|network|dormant",
  "how_met": "How you met",
  "relationship": "friend|mentor|peer|collaborator|investor|customer",
  "topics": ["topic1", "topic2"],
  "can_help_with": ["what they can help you with"],
  "you_can_help_with": ["how you can help them"],
  "notes": "Personal notes",
  "last_contact": "ISO8601",
  "links": {
    "twitter": "url",
    "linkedin": "url",
    "website": "url"
  }
}
```

### Interaction Entry
```json
{
  "id": "int_YYYYMMDD_HHMMSS",
  "date": "ISO8601",
  "contact_id": "contact_[id]",
  "type": "call|coffee|dm|email|event|collab",
  "context": "What you discussed",
  "key_points": ["point1", "point2"],
  "follow_ups": ["action1", "action2"],
  "sentiment": "positive|neutral|needs_attention"
}
```

## Workflows

### Before a Meeting
1. Look up contact in `contacts.jsonl`
2. Review recent interactions in `interactions.jsonl`
3. Check `circles.yaml` for relationship context
4. Note any pending follow-ups or intros

### After a Meeting
1. Log interaction in `interactions.jsonl`
2. Update `last_contact` in contacts.jsonl
3. Add any follow-ups to operations/todos.md
4. Update relationship notes if needed

### Making Introductions
1. Check both contacts in `contacts.jsonl`
2. Ensure mutual value (check can_help_with fields)
3. Log in `intros.md`
4. Track follow-through

## Agent Instructions

&lt;instructions>
When managing relationships:

1. **Looking up contacts**: Search by name, handle, company, or topics
2. **Pre-meeting prep**: Compile contact info + recent interactions + shared interests
3. **Logging interactions**: Always include date, type, context, and follow-ups
4. **Intro matching**: Cross-reference can_help_with fields
5. **Relationship maintenance**: Flag contacts with stale last_contact dates

Circle definitions:
- inner: Close relationships, regular contact
- active: Current collaborators, frequent interaction
- network: Known contacts, periodic touchpoints
- dormant: Historical connections, may reactivate
&lt;/instructions>

## Relationship Principles

```yaml
networking_philosophy:
  - "Give before you ask"
  - "Quality over quantity"
  - "Follow up is everything"
  - "Be genuinely helpful"
  - "Make warm intros, not cold"
```
