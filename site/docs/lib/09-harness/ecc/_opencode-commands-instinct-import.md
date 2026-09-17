---
title: "Instinct Import Command"
sourceId: "09-harness/ecc"
sourceTitle: "ECC —— Harness 性能优化系统"
sourceKind: "其他材料"
licenseLabel: "可转载"
lang: "英文"
tier: 3
volume: "09-harness"
sourceUrl: "https://github.com/affaan-m/ECC"
entryUrl: "https://github.com/affaan-m/ECC/blob/928c1dea72f5c330442fc1f595563398b8f389f7/.opencode/commands/instinct-import.md"
sourceRel: ".opencode/commands/instinct-import.md"
rawUrl: "/raw/09-harness/ecc/.opencode/commands/instinct-import.md"
sourceSha256: "94f72edbf6b347e99cb0d63adce7573ad0ab5b5913684aada2bc765d82c90458"
pageSha256: "94f72edbf6b347e99cb0d63adce7573ad0ab5b5913684aada2bc765d82c90458"
contentMode: "local-full"
zh: ""
---

# Instinct Import Command

Import instincts from a file or URL: $ARGUMENTS

## Your Task

Import instincts into the continuous-learning-v2 system.

## Import Sources

### File Import
```
/instinct-import path/to/instincts.json
```

### URL Import
```
/instinct-import https://example.com/instincts.json
```

### Team Share Import
```
/instinct-import @teammate/instincts
```

## Import Format

Expected JSON structure:

```json
{
  "instincts": [
    {
      "trigger": "[situation description]",
      "action": "[recommended action]",
      "confidence": 0.7,
      "category": "coding",
      "source": "imported"
    }
  ],
  "metadata": {
    "version": "1.0",
    "exported": "2025-01-15T10:00:00Z",
    "author": "username"
  }
}
```

## Import Process

1. **Validate format** - Check JSON structure
2. **Deduplicate** - Skip existing instincts
3. **Adjust confidence** - Reduce confidence for imports (×0.8)
4. **Merge** - Add to local instinct store
5. **Report** - Show import summary

## Import Report

```
Import Summary
==============
Source: [path or URL]
Total in file: X
Imported: Y
Skipped (duplicates): Z
Errors: W

Imported Instincts:
- [trigger] (confidence: 0.XX)
- [trigger] (confidence: 0.XX)
...
```

## Conflict Resolution

When importing duplicates:
- Keep higher confidence version
- Merge application counts
- Update timestamp

---

**TIP**: Review imported instincts with `/instinct-status` after import.
