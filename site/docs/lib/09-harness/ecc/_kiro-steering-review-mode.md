---
title: "Review Mode"
sourceId: "09-harness/ecc"
sourceTitle: "ECC —— Harness 性能优化系统"
sourceKind: "其他材料"
licenseLabel: "可转载"
lang: "英文"
tier: 3
volume: "09-harness"
sourceUrl: "https://github.com/affaan-m/ECC"
entryUrl: "https://github.com/affaan-m/ECC/blob/928c1dea72f5c330442fc1f595563398b8f389f7/.kiro/steering/review-mode.md"
sourceRel: ".kiro/steering/review-mode.md"
rawUrl: "/raw/09-harness/ecc/.kiro/steering/review-mode.md"
sourceSha256: "7112bd7597d05a68f3da33db5846be0cc8337d076de588d5e3b2499401da1672"
pageSha256: "7112bd7597d05a68f3da33db5846be0cc8337d076de588d5e3b2499401da1672"
contentMode: "local-full"
zh: ""
---

# Review Mode

Use this context when conducting code reviews or quality assessments.

## Review Process

1. Gather context — Check git diff to see all changes
2. Understand scope — Identify which files changed and why
3. Read surrounding code — Don't review in isolation
4. Apply review checklist — Work through each category
5. Report findings — Use severity levels

## Review Checklist

### Correctness
- Does the code do what it's supposed to do?
- Are edge cases handled properly?
- Is error handling appropriate?

### Security
- Are inputs validated and sanitized?
- Are secrets properly managed?
- Are there any injection vulnerabilities?
- Is authentication/authorization correct?

### Performance
- Are there obvious performance issues?
- Are database queries optimized?
- Is caching used appropriately?

### Maintainability
- Is the code readable and well-organized?
- Are functions and classes appropriately sized?
- Is there adequate documentation?
- Are naming conventions followed?

### Testing
- Are there sufficient tests?
- Do tests cover edge cases?
- Are tests clear and maintainable?

## Severity Levels

- **Critical**: Security vulnerabilities, data loss risks
- **High**: Bugs that break functionality, major performance issues
- **Medium**: Code quality issues, maintainability concerns
- **Low**: Style inconsistencies, minor improvements

## Invocation

Use `#review-mode` to activate this context when reviewing code.
