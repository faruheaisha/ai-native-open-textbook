---
title: "Claude Code Guide（zebbern）"
sourceId: "09-harness/claude-code-guide-zebbern"
sourceTitle: "Claude Code Guide（zebbern）"
sourceKind: "工程手册"
licenseLabel: "可转载"
lang: "英文"
tier: 3
volume: "09-harness"
sourceUrl: "https://github.com/zebbern/claude-code-guide"
entryUrl: "https://github.com/zebbern/claude-code-guide/blob/64c890fe74c3ccfad673dc9c71dc85b8dd2f4817/skills/react-best-practices/rules/js-cache-property-access.md"
sourceRel: "skills/react-best-practices/rules/js-cache-property-access.md"
rawUrl: "/raw/09-harness/claude-code-guide-zebbern/skills/react-best-practices/rules/js-cache-property-access.md"
sourceSha256: "73e47431e74878a927061bf0ddc7cd91a7556cb35d2573f3421e82300d9ae311"
pageSha256: "73e47431e74878a927061bf0ddc7cd91a7556cb35d2573f3421e82300d9ae311"
contentMode: "local-full"
zh: ""
---

# Claude Code Guide（zebbern）

## Cache Property Access in Loops

Cache object property lookups in hot paths.

**Incorrect (3 lookups × N iterations):**

```typescript
for (let i = 0; i < arr.length; i++) {
  process(obj.config.settings.value)
}
```

**Correct (1 lookup total):**

```typescript
const value = obj.config.settings.value
const len = arr.length
for (let i = 0; i < len; i++) {
  process(value)
}
```
