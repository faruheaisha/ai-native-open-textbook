---
title: "TypeScript/JavaScript Coding Style"
sourceId: "09-harness/ecc"
sourceTitle: "ECC —— Harness 性能优化系统"
sourceKind: "其他材料"
licenseLabel: "可转载"
lang: "英文"
tier: 3
volume: "09-harness"
sourceUrl: "https://github.com/affaan-m/ECC"
entryUrl: "https://github.com/affaan-m/ECC/blob/928c1dea72f5c330442fc1f595563398b8f389f7/.cursor/rules/typescript-coding-style.md"
sourceRel: ".cursor/rules/typescript-coding-style.md"
rawUrl: "/raw/09-harness/ecc/.cursor/rules/typescript-coding-style.md"
sourceSha256: "44eab0454dfa2a97049d40d18b39a32f19fa5d84e05998e5fa0fef0be4e5ef78"
pageSha256: "44eab0454dfa2a97049d40d18b39a32f19fa5d84e05998e5fa0fef0be4e5ef78"
contentMode: "local-full"
zh: ""
---

# TypeScript/JavaScript Coding Style

> This file extends the common coding style rule with TypeScript/JavaScript specific content.

## Immutability

Use spread operator for immutable updates:

```typescript
// WRONG: Mutation
function updateUser(user, name) {
  user.name = name  // MUTATION!
  return user
}

// CORRECT: Immutability
function updateUser(user, name) {
  return {
    ...user,
    name
  }
}
```

## Error Handling

Use async/await with try-catch:

```typescript
try {
  const result = await riskyOperation()
  return result
} catch (error) {
  console.error('Operation failed:', error)
  throw new Error('Detailed user-friendly message')
}
```

## Input Validation

Use Zod for schema-based validation:

```typescript
import { z } from 'zod'

const schema = z.object({
  email: z.string().email(),
  age: z.number().int().min(0).max(150)
})

const validated = schema.parse(input)
```

## Console.log

- No `console.log` statements in production code
- Use proper logging libraries instead
- See hooks for automatic detection
