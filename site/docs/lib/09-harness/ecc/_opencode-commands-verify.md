---
title: "Verify Command"
sourceId: "09-harness/ecc"
sourceTitle: "ECC —— Harness 性能优化系统"
sourceKind: "其他材料"
licenseLabel: "可转载"
lang: "英文"
tier: 3
volume: "09-harness"
sourceUrl: "https://github.com/affaan-m/ECC"
entryUrl: "https://github.com/affaan-m/ECC/blob/928c1dea72f5c330442fc1f595563398b8f389f7/.opencode/commands/verify.md"
sourceRel: ".opencode/commands/verify.md"
rawUrl: "/raw/09-harness/ecc/.opencode/commands/verify.md"
sourceSha256: "ce51914ed79fed933630b1cbe2cc3564c42847ece1c5852008683bf1226a893e"
pageSha256: "ce51914ed79fed933630b1cbe2cc3564c42847ece1c5852008683bf1226a893e"
contentMode: "local-full"
zh: ""
---

# Verify Command

Run verification loop to validate the implementation: $ARGUMENTS

## Your Task

Execute comprehensive verification:

1. **Type Check**: `npx tsc --noEmit`
2. **Lint**: `npm run lint`
3. **Unit Tests**: `npm test`
4. **Integration Tests**: `npm run test:integration` (if available)
5. **Build**: `npm run build`
6. **Coverage Check**: Verify 80%+ coverage

## Verification Checklist

### Code Quality
- [ ] No TypeScript errors
- [ ] No lint warnings
- [ ] No console.log statements
- [ ] Functions < 50 lines
- [ ] Files < 800 lines

### Tests
- [ ] All tests passing
- [ ] Coverage >= 80%
- [ ] Edge cases covered
- [ ] Error conditions tested

### Security
- [ ] No hardcoded secrets
- [ ] Input validation present
- [ ] No SQL injection risks
- [ ] No XSS vulnerabilities

### Build
- [ ] Build succeeds
- [ ] No warnings
- [ ] Bundle size acceptable

## Verification Report

### Summary
- Status: PASS: PASS / FAIL: FAIL
- Score: X/Y checks passed

### Details
| Check | Status | Notes |
|-------|--------|-------|
| TypeScript | PASS:/FAIL: | [details] |
| Lint | PASS:/FAIL: | [details] |
| Tests | PASS:/FAIL: | [details] |
| Coverage | PASS:/FAIL: | XX% (target: 80%) |
| Build | PASS:/FAIL: | [details] |

### Action Items
[If FAIL, list what needs to be fixed]

---

**NOTE**: Verification loop should be run before every commit and PR.
