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
entryUrl: "https://github.com/zebbern/claude-code-guide/blob/64c890fe74c3ccfad673dc9c71dc85b8dd2f4817/skills/react-best-practices/rules/js-early-exit.md"
sourceRel: "skills/react-best-practices/rules/js-early-exit.md"
rawUrl: "/raw/09-harness/claude-code-guide-zebbern/skills/react-best-practices/rules/js-early-exit.md"
sourceSha256: "722519cf622eea8ccc0cd8ac9b3b951ca21962e2ec917a9c97ba5e859684f471"
pageSha256: "722519cf622eea8ccc0cd8ac9b3b951ca21962e2ec917a9c97ba5e859684f471"
contentMode: "local-full"
zh: ""
---

# Claude Code Guide（zebbern）

## Early Return from Functions

Return early when result is determined to skip unnecessary processing.

**Incorrect (processes all items even after finding answer):**

```typescript
function validateUsers(users: User[]) {
  let hasError = false
  let errorMessage = ""

  for (const user of users) {
    if (!user.email) {
      hasError = true
      errorMessage = "Email required"
    }
    if (!user.name) {
      hasError = true
      errorMessage = "Name required"
    }
    // Continues checking all users even after error found
  }

  return hasError ? { valid: false, error: errorMessage } : { valid: true }
}
```

**Correct (returns immediately on first error):**

```typescript
function validateUsers(users: User[]) {
  for (const user of users) {
    if (!user.email) {
      return { valid: false, error: "Email required" }
    }
    if (!user.name) {
      return { valid: false, error: "Name required" }
    }
  }

  return { valid: true }
}
```
