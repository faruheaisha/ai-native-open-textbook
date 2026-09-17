---
title: "Code Review Command"
sourceId: "09-harness/ecc"
sourceTitle: "ECC —— Harness 性能优化系统"
sourceKind: "其他材料"
licenseLabel: "可转载"
lang: "英文"
tier: 3
volume: "09-harness"
sourceUrl: "https://github.com/affaan-m/ECC"
entryUrl: "https://github.com/affaan-m/ECC/blob/928c1dea72f5c330442fc1f595563398b8f389f7/.opencode/commands/code-review.md"
sourceRel: ".opencode/commands/code-review.md"
rawUrl: "/raw/09-harness/ecc/.opencode/commands/code-review.md"
sourceSha256: "0a4687d21a13b848621ca4aeda4c6fd54f7308d12adbf7ceea432a4b7471807f"
pageSha256: "0a4687d21a13b848621ca4aeda4c6fd54f7308d12adbf7ceea432a4b7471807f"
contentMode: "local-full"
zh: ""
---

# Code Review Command

Review code changes for quality, security, and maintainability: $ARGUMENTS

## Your Task

1. **Get changed files**: Run `git diff --name-only HEAD`
2. **Analyze each file** for issues
3. **Generate structured report**
4. **Provide actionable recommendations**

## Check Categories

### Security Issues (CRITICAL)
- [ ] Hardcoded credentials, API keys, tokens
- [ ] SQL injection vulnerabilities
- [ ] XSS vulnerabilities
- [ ] Missing input validation
- [ ] Insecure dependencies
- [ ] Path traversal risks
- [ ] Authentication/authorization flaws

### Code Quality (HIGH)
- [ ] Functions > 50 lines
- [ ] Files > 800 lines
- [ ] Nesting depth > 4 levels
- [ ] Missing error handling
- [ ] console.log statements
- [ ] TODO/FIXME comments
- [ ] Missing JSDoc for public APIs

### Best Practices (MEDIUM)
- [ ] Mutation patterns (use immutable instead)
- [ ] Unnecessary complexity
- [ ] Missing tests for new code
- [ ] Accessibility issues (a11y)
- [ ] Performance concerns

### Style (LOW)
- [ ] Inconsistent naming
- [ ] Missing type annotations
- [ ] Formatting issues

## Report Format

For each issue found:

```
**[SEVERITY]** file.ts:123
Issue: [Description]
Fix: [How to fix]
```

## Decision

- **CRITICAL or HIGH issues**: Block commit, require fixes
- **MEDIUM issues**: Recommend fixes before merge
- **LOW issues**: Optional improvements

---

**IMPORTANT**: Never approve code with security vulnerabilities!
