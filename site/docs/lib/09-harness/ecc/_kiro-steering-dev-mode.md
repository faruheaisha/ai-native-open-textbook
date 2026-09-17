---
title: "Development Mode"
sourceId: "09-harness/ecc"
sourceTitle: "ECC —— Harness 性能优化系统"
sourceKind: "其他材料"
licenseLabel: "可转载"
lang: "英文"
tier: 3
volume: "09-harness"
sourceUrl: "https://github.com/affaan-m/ECC"
entryUrl: "https://github.com/affaan-m/ECC/blob/928c1dea72f5c330442fc1f595563398b8f389f7/.kiro/steering/dev-mode.md"
sourceRel: ".kiro/steering/dev-mode.md"
rawUrl: "/raw/09-harness/ecc/.kiro/steering/dev-mode.md"
sourceSha256: "0bec51fd2cc6edda7ab8f02e7a9f013088cb37b177c1007eb9621cca872aef1c"
pageSha256: "0bec51fd2cc6edda7ab8f02e7a9f013088cb37b177c1007eb9621cca872aef1c"
contentMode: "local-full"
zh: ""
---

# Development Mode

Use this context when actively implementing features or writing code.

## Focus Areas

- Write clean, maintainable code
- Follow TDD workflow when appropriate
- Implement incrementally with frequent testing
- Consider edge cases and error handling
- Document complex logic inline

## Workflow

1. Understand requirements thoroughly
2. Plan implementation approach
3. Write tests first (when using TDD)
4. Implement minimal working solution
5. Refactor for clarity and maintainability
6. Verify all tests pass

## Code Quality

- Prioritize readability over cleverness
- Keep functions small and focused
- Use meaningful variable and function names
- Add comments for non-obvious logic
- Follow project coding standards

## Testing

- Write unit tests for business logic
- Test edge cases and error conditions
- Ensure tests are fast and reliable
- Use descriptive test names

## Invocation

Use `#dev-mode` to activate this context when starting development work.
