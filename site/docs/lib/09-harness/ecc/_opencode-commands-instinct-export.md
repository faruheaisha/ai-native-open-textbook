---
title: "Instinct Export Command"
sourceId: "09-harness/ecc"
sourceTitle: "ECC —— Harness 性能优化系统"
sourceKind: "其他材料"
licenseLabel: "可转载"
lang: "英文"
tier: 3
volume: "09-harness"
sourceUrl: "https://github.com/affaan-m/ECC"
entryUrl: "https://github.com/affaan-m/ECC/blob/928c1dea72f5c330442fc1f595563398b8f389f7/.opencode/commands/instinct-export.md"
sourceRel: ".opencode/commands/instinct-export.md"
rawUrl: "/raw/09-harness/ecc/.opencode/commands/instinct-export.md"
sourceSha256: "49cb34d47c21ffd3e52bba5d614932ae46512d37c623d4d186c5b313c7a51a14"
pageSha256: "49cb34d47c21ffd3e52bba5d614932ae46512d37c623d4d186c5b313c7a51a14"
contentMode: "local-full"
zh: ""
---

# Instinct Export Command

Export instincts for sharing with others: $ARGUMENTS

## Your Task

Export instincts from the continuous-learning-v2 system.

## Export Options

### Export All
```
/instinct-export
```

### Export High Confidence Only
```
/instinct-export --min-confidence 0.8
```

### Export by Category
```
/instinct-export --category coding
```

### Export to Specific Path
```
/instinct-export --output ./my-instincts.json
```

## Export Format

```json
{
  "instincts": [
    {
      "id": "instinct-123",
      "trigger": "[situation description]",
      "action": "[recommended action]",
      "confidence": 0.85,
      "category": "coding",
      "applications": 10,
      "successes": 9,
      "source": "session-observation"
    }
  ],
  "metadata": {
    "version": "1.0",
    "exported": "2025-01-15T10:00:00Z",
    "author": "username",
    "total": 25,
    "filter": "confidence >= 0.8"
  }
}
```

## Export Report

```
Export Summary
==============
Output: ./instincts-export.json
Total instincts: X
Filtered: Y
Exported: Z

Categories:
- coding: N
- testing: N
- security: N
- git: N

Top Instincts (by confidence):
1. [trigger] (0.XX)
2. [trigger] (0.XX)
3. [trigger] (0.XX)
```

## Sharing

After export:
- Share JSON file directly
- Upload to team repository
- Publish to instinct registry

---

**TIP**: Export high-confidence instincts (>0.8) for better quality shares.
