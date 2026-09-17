---
title: "Digital Brain - Claude Instructions"
sourceId: "10-context-memory/agent-skills-for-context-engineering"
sourceTitle: "Agent Skills for Context Engineering"
sourceKind: "技能与配置库"
licenseLabel: "可转载"
lang: "英文"
tier: 3
volume: "10-context-memory"
sourceUrl: "https://github.com/muratcankoylan/Agent-Skills-for-Context-Engineering"
entryUrl: "https://github.com/muratcankoylan/Agent-Skills-for-Context-Engineering/blob/6dbe1a1d868eab51a3bc9011b0f55e2891513e40/examples/digital-brain-skill/AGENT.md"
sourceRel: "examples/digital-brain-skill/AGENT.md"
rawUrl: "/raw/10-context-memory/agent-skills-for-context-engineering/examples/digital-brain-skill/AGENT.md"
sourceSha256: "37ad38c95de37e17575cda15a7b43e3e04a9a24fc4abfae9812e3cc6cd6ca280"
pageSha256: "37ad38c95de37e17575cda15a7b43e3e04a9a24fc4abfae9812e3cc6cd6ca280"
contentMode: "local-full"
zh: ""
---

# Digital Brain - Claude Instructions

This is a Digital Brain personal operating system. When working in this project:

## Core Rules

1. **Always read identity/voice.md before writing any content** - Match the user's authentic voice
2. **Append to JSONL files, never overwrite** - Preserve history
3. **Update timestamps** when modifying tracked data
4. **Cross-reference modules** - Knowledge informs content, network informs operations

## Quick Reference

- **Writing content**: Read `identity/voice.md` first, then use templates in `content/templates/`
- **Looking up contacts**: Search `network/contacts.jsonl`, check `interactions.jsonl` for history
- **Content ideas**: Check `content/ideas.jsonl`, run `agents/scripts/content_ideas.py`
- **Task management**: Use `operations/todos.md`, align with `operations/goals.yaml`
- **Weekly review**: Run `agents/scripts/weekly_review.py`

## File Conventions

- `.jsonl` files: One JSON object per line, append-only
- `.md` files: Human-readable, freely editable
- `.yaml` files: Configuration and structured data
- `_template.md` or `_schema` entries: Reference formats, don't modify

## When User Asks To...

| Request | Action |
|---------|--------|
| "Write a post about X" | Read voice.md → Draft → Match voice patterns |
| "Prepare for meeting with Y" | Look up contact → Get interactions → Summarize |
| "What should I create?" | Run content_ideas.py → Check calendar |
| "Add contact Z" | Append to contacts.jsonl with full schema |
| "Weekly review" | Run weekly_review.py → Present insights |
