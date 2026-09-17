---
title: "Researcher Queue"
sourceId: "10-context-memory/agent-skills-for-context-engineering"
sourceTitle: "Agent Skills for Context Engineering"
sourceKind: "技能与配置库"
licenseLabel: "可转载"
lang: "英文"
tier: 3
volume: "10-context-memory"
sourceUrl: "https://github.com/muratcankoylan/Agent-Skills-for-Context-Engineering"
entryUrl: "https://github.com/muratcankoylan/Agent-Skills-for-Context-Engineering/blob/6dbe1a1d868eab51a3bc9011b0f55e2891513e40/researcher/queue/README.md"
sourceRel: "researcher/queue/README.md"
rawUrl: "/raw/10-context-memory/agent-skills-for-context-engineering/researcher/queue/README.md"
sourceSha256: "53d0410c04c75ea1ad17701b9f2611061c934e385dc470dc4a44ffaa8c3d5016"
pageSha256: "53d0410c04c75ea1ad17701b9f2611061c934e385dc470dc4a44ffaa8c3d5016"
contentMode: "local-full"
zh: ""
---

# Researcher Queue

The queue files are the persistent ledger that lets the autonomous loop run for days without losing state. Every change is append-only or replaces the entire file with a new sorted snapshot.

## Files

- `inbox.jsonl` - candidate sources discovered but not yet initialized as runs.
- `parked.jsonl` - run IDs that hit a human-review gate and are waiting for a reviewer.
- `done.jsonl` - run IDs that have been closed (accepted, rejected, reference-only, abandoned).
- `quarantine.jsonl` - sources removed from rotation because retrieval failed or the source registry rejects them.

## Source Record Shape

Each line in `inbox.jsonl` and `quarantine.jsonl` is a JSON object:

```json
{
  "source_id": "deterministic-hash",
  "url": "https://example.com/post",
  "title": "Short title",
  "author_or_org": "Org",
  "source_type": "paper | engineering_blog | documentation | benchmark | code | talk | other",
  "candidate_reason": "Why this source matters",
  "feed": "manual-seed | parallel-research | rss | other",
  "discovered_at": "ISO-8601",
  "attempts": 0,
  "last_status": "queued | initialized | failed"
}
```
