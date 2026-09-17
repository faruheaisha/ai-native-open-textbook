---
title: "Build Fix Command"
sourceId: "09-harness/ecc"
sourceTitle: "ECC —— Harness 性能优化系统"
sourceKind: "其他材料"
licenseLabel: "可转载"
lang: "英文"
tier: 3
volume: "09-harness"
sourceUrl: "https://github.com/affaan-m/ECC"
entryUrl: "https://github.com/affaan-m/ECC/blob/928c1dea72f5c330442fc1f595563398b8f389f7/.opencode/commands/build-fix.md"
sourceRel: ".opencode/commands/build-fix.md"
rawUrl: "/raw/09-harness/ecc/.opencode/commands/build-fix.md"
sourceSha256: "0e66ac1a68fd560dcfa0a9011ab70cc759f54ca1b3395fe09bb7a24caa13082e"
pageSha256: "0e66ac1a68fd560dcfa0a9011ab70cc759f54ca1b3395fe09bb7a24caa13082e"
contentMode: "local-full"
zh: ""
---

# Build Fix Command

Fix build and TypeScript errors with minimal changes: $ARGUMENTS

## Your Task

1. **Run type check**: `npx tsc --noEmit`
2. **Collect all errors**
3. **Fix errors one by one** with minimal changes
4. **Verify each fix** doesn't introduce new errors
5. **Run final check** to confirm all errors resolved

## Approach

### DO:
- PASS: Fix type errors with correct types
- PASS: Add missing imports
- PASS: Fix syntax errors
- PASS: Make minimal changes
- PASS: Preserve existing behavior
- PASS: Run `tsc --noEmit` after each change

### DON'T:
- FAIL: Refactor code
- FAIL: Add new features
- FAIL: Change architecture
- FAIL: Use `any` type (unless absolutely necessary)
- FAIL: Add `@ts-ignore` comments
- FAIL: Change business logic

## Common Error Fixes

| Error | Fix |
|-------|-----|
| Type 'X' is not assignable to type 'Y' | Add correct type annotation |
| Property 'X' does not exist | Add property to interface or fix property name |
| Cannot find module 'X' | Install package or fix import path |
| Argument of type 'X' is not assignable | Cast or fix function signature |
| Object is possibly 'undefined' | Add null check or optional chaining |

## Verification Steps

After fixes:
1. `npx tsc --noEmit` - should show 0 errors
2. `npm run build` - should succeed
3. `npm test` - tests should still pass

---

**IMPORTANT**: Focus on fixing errors only. No refactoring, no improvements, no architectural changes. Get the build green with minimal diff.
