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
entryUrl: "https://github.com/affaan-m/ECC/blob/928c1dea72f5c330442fc1f595563398b8f389f7/.kiro/steering/typescript-security.md"
sourceRel: ".kiro/steering/typescript-security.md"
rawUrl: "/raw/09-harness/ecc/.kiro/steering/typescript-security.md"
sourceSha256: "20ee10bdc5356b7d410f2b4d90ad3ddddcf6e43b691642ed3b3305077fa233fb"
pageSha256: "20ee10bdc5356b7d410f2b4d90ad3ddddcf6e43b691642ed3b3305077fa233fb"
contentMode: "local-full"
zh: ""
---

# TypeScript/JavaScript Security

> This file extends the common security rule with TypeScript/JavaScript specific content.

## Secret Management

```typescript
// NEVER: Hardcoded secrets
const apiKey = "sk-proj-xxxxx"
const dbPassword = "mypassword123"

// ALWAYS: Environment variables
const apiKey = process.env.OPENAI_API_KEY
const dbPassword = process.env.DATABASE_PASSWORD

if (!apiKey) {
  throw new Error('OPENAI_API_KEY not configured')
}
```

## XSS Prevention

```typescript
// NEVER: Direct HTML injection
element.innerHTML = userInput

// ALWAYS: Sanitize or use textContent
import DOMPurify from 'dompurify'
element.innerHTML = DOMPurify.sanitize(userInput)
// OR
element.textContent = userInput
```

## Prototype Pollution

```typescript
// NEVER: Unsafe object merging
function merge(target: any, source: any) {
  for (const key in source) {
    target[key] = source[key]  // Dangerous!
  }
}

// ALWAYS: Validate keys
function merge(target: any, source: any) {
  for (const key in source) {
    if (key === '__proto__' || key === 'constructor' || key === 'prototype') {
      continue
    }
    target[key] = source[key]
  }
}
```

## SQL Injection (Node.js)

```typescript
// NEVER: String concatenation
const query = `SELECT * FROM users WHERE id = ${userId}`

// ALWAYS: Parameterized queries
const query = 'SELECT * FROM users WHERE id = ?'
db.query(query, [userId])
```

## Path Traversal

```typescript
// NEVER: Direct path construction
const filePath = `./uploads/${req.params.filename}`

// ALWAYS: Validate and sanitize
import path from 'path'
const filename = path.basename(req.params.filename)
const filePath = path.join('./uploads', filename)
```

## Dependency Security

```bash
# Regular security audits
npm audit
npm audit fix

# Use lock files
npm ci  # Instead of npm install in CI/CD
```

## Agent Support

- Use **security-reviewer** agent for comprehensive security audits
- Invoke via `/agent swap security-reviewer` or use the security-review skill
