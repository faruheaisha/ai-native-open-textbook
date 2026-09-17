---
title: "TypeScript/JavaScript Security"
sourceId: "09-harness/ecc"
sourceTitle: "ECC —— Harness 性能优化系统"
sourceKind: "其他材料"
licenseLabel: "可转载"
lang: "英文"
tier: 3
volume: "09-harness"
sourceUrl: "https://github.com/affaan-m/ECC"
entryUrl: "https://github.com/affaan-m/ECC/blob/928c1dea72f5c330442fc1f595563398b8f389f7/.cursor/rules/typescript-security.md"
sourceRel: ".cursor/rules/typescript-security.md"
rawUrl: "/raw/09-harness/ecc/.cursor/rules/typescript-security.md"
sourceSha256: "d70261d33cd2a233c9f07284167b38557bddb9793d560b6b12b9fa876c01d8e7"
pageSha256: "d70261d33cd2a233c9f07284167b38557bddb9793d560b6b12b9fa876c01d8e7"
contentMode: "local-full"
zh: ""
---

# TypeScript/JavaScript Security

> This file extends the common security rule with TypeScript/JavaScript specific content.

## Secret Management

```typescript
// NEVER: Hardcoded secrets
const apiKey = "sk-proj-xxxxx"

// ALWAYS: Environment variables
const apiKey = process.env.OPENAI_API_KEY

if (!apiKey) {
  throw new Error('OPENAI_API_KEY not configured')
}
```

## Agent Support

- Use **security-reviewer** skill for comprehensive security audits
