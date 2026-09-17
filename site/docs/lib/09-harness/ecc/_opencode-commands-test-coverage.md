---
title: "Test Coverage Command"
sourceId: "09-harness/ecc"
sourceTitle: "ECC —— Harness 性能优化系统"
sourceKind: "其他材料"
licenseLabel: "可转载"
lang: "英文"
tier: 3
volume: "09-harness"
sourceUrl: "https://github.com/affaan-m/ECC"
entryUrl: "https://github.com/affaan-m/ECC/blob/928c1dea72f5c330442fc1f595563398b8f389f7/.opencode/commands/test-coverage.md"
sourceRel: ".opencode/commands/test-coverage.md"
rawUrl: "/raw/09-harness/ecc/.opencode/commands/test-coverage.md"
sourceSha256: "bb3542aeec9d19f080a7ee1b0c1664c925ff991171f8972a8be2c139b6240a85"
pageSha256: "bb3542aeec9d19f080a7ee1b0c1664c925ff991171f8972a8be2c139b6240a85"
contentMode: "local-full"
zh: ""
---

# Test Coverage Command

Analyze test coverage and identify gaps: $ARGUMENTS

## Your Task

1. **Run coverage report**: `npm test -- --coverage`
2. **Analyze results** - Identify low coverage areas
3. **Prioritize gaps** - Critical code first
4. **Generate missing tests** - For uncovered code

## Coverage Targets

| Code Type | Target |
|-----------|--------|
| Standard code | 80% |
| Financial logic | 100% |
| Auth/security | 100% |
| Utilities | 90% |
| UI components | 70% |

## Coverage Report Analysis

### Summary
```
File           | % Stmts | % Branch | % Funcs | % Lines
---------------|---------|----------|---------|--------
All files      |   XX    |    XX    |   XX    |   XX
```

### Low Coverage Files
[Files below target, prioritized by criticality]

### Uncovered Lines
[Specific lines that need tests]

## Test Generation

For each uncovered area:

### [Function/Component Name]

**Location**: `src/path/file.ts:123`

**Coverage Gap**: [description]

**Suggested Tests**:
```typescript
describe('functionName', () => {
  it('should [expected behavior]', () => {
    // Test code
  })

  it('should handle [edge case]', () => {
    // Edge case test
  })
})
```

## Coverage Improvement Plan

1. **Critical** (add immediately)
   - [ ] file1.ts - Auth logic
   - [ ] file2.ts - Payment handling

2. **High** (add this sprint)
   - [ ] file3.ts - Core business logic

3. **Medium** (add when touching file)
   - [ ] file4.ts - Utilities

---

**IMPORTANT**: Coverage is a metric, not a goal. Focus on meaningful tests, not just hitting numbers.
