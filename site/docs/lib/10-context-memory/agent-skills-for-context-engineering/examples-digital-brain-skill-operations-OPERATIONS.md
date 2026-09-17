---
title: "Operations Module"
sourceId: "10-context-memory/agent-skills-for-context-engineering"
sourceTitle: "Agent Skills for Context Engineering"
sourceKind: "技能与配置库"
licenseLabel: "可转载"
lang: "英文"
tier: 3
volume: "10-context-memory"
sourceUrl: "https://github.com/muratcankoylan/Agent-Skills-for-Context-Engineering"
entryUrl: "https://github.com/muratcankoylan/Agent-Skills-for-Context-Engineering/blob/6dbe1a1d868eab51a3bc9011b0f55e2891513e40/examples/digital-brain-skill/operations/OPERATIONS.md"
sourceRel: "examples/digital-brain-skill/operations/OPERATIONS.md"
rawUrl: "/raw/10-context-memory/agent-skills-for-context-engineering/examples/digital-brain-skill/operations/OPERATIONS.md"
sourceSha256: "c4eade6f2a3c8417a36024d814aa928cfe03c09b6c7d0ee8a156d40ce45929d5"
pageSha256: "c4eade6f2a3c8417a36024d814aa928cfe03c09b6c7d0ee8a156d40ce45929d5"
contentMode: "local-full"
zh: ""
---

# Operations Module

Your personal productivity operating system.

## Files in This Module

| File | Format | Purpose |
|------|--------|---------|
| `todos.md` | Markdown | Active task list |
| `goals.yaml` | YAML | OKRs and goal tracking |
| `meetings.jsonl` | JSONL | Meeting log and notes |
| `metrics.jsonl` | JSONL | Key metrics tracking |
| `reviews/` | Folder | Weekly/monthly reviews |

## Workflows

### Daily Flow
```
1. Morning: Review todos.md, prioritize
2. Throughout: Check off completed, add new
3. Evening: Log any meetings, update metrics
```

### Weekly Review (Run every Sunday)
1. Run `agents/scripts/weekly_review.py`
2. Review completed vs. planned
3. Check metrics in metrics.jsonl
4. Plan next week's priorities
5. Update goals.yaml progress

### Goal Setting (Quarterly)
1. Review previous quarter goals
2. Update goals.yaml with new OKRs
3. Break down into monthly targets
4. Align content calendar with goals

## Agent Instructions

&lt;instructions>
When managing operations:

1. **Todos**: Use priority levels (P0-P3), keep list current
2. **Goals**: Reference before major decisions or planning
3. **Meetings**: Log immediately after with key takeaways
4. **Metrics**: Update at least weekly
5. **Reviews**: Generate insights, not just summaries

Priority levels:
- P0: Do today, blocking other work
- P1: Do this week, important
- P2: Do this month, valuable
- P3: Backlog, nice to have

When asked to help plan or prioritize:
1. Check current goals.yaml for alignment
2. Review existing todos.md capacity
3. Consider time-sensitivity and dependencies
4. Suggest realistic timelines
&lt;/instructions>

## Productivity Principles

```yaml
principles:
  - "Ruthless prioritization over busy work"
  - "Completion > perfection for P1-P3"
  - "Batch similar tasks together"
  - "Protect deep work time"
  - "Weekly reviews are non-negotiable"
```
