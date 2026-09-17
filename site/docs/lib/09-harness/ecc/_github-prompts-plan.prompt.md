---
title: "Implementation Planner"
sourceId: "09-harness/ecc"
sourceTitle: "ECC —— Harness 性能优化系统"
sourceKind: "其他材料"
licenseLabel: "可转载"
lang: "英文"
tier: 3
volume: "09-harness"
sourceUrl: "https://github.com/affaan-m/ECC"
entryUrl: "https://github.com/affaan-m/ECC/blob/928c1dea72f5c330442fc1f595563398b8f389f7/.github/prompts/plan.prompt.md"
sourceRel: ".github/prompts/plan.prompt.md"
rawUrl: "/raw/09-harness/ecc/.github/prompts/plan.prompt.md"
sourceSha256: "af82b05cc68e600fe1d8af6d320523073e2e5e2c7911ef84c5eb6628b602c3ef"
pageSha256: "af82b05cc68e600fe1d8af6d320523073e2e5e2c7911ef84c5eb6628b602c3ef"
contentMode: "local-full"
zh: ""
---

# Implementation Planner

Before writing any code for this feature/task, produce a structured plan.

## Steps

1. **Clarify the goal** — restate the requirement in one sentence; flag any ambiguities.
2. **Research first** — identify existing utilities, libraries, or patterns in the codebase that can be reused. Do not reinvent what already exists.
3. **Identify dependencies** — list external packages, APIs, environment variables, or database changes needed.
4. **Break into phases** — structure work as ordered phases, each independently shippable:
   - Phase 1: Core data model / schema changes
   - Phase 2: Business logic + unit tests
   - Phase 3: API / integration layer + integration tests
   - Phase 4: UI / consumer layer + E2E tests
5. **Identify risks** — note anything that could block progress or cause regressions.
6. **Define done** — list the exact acceptance criteria (tests passing, coverage ≥ 80%, no lint errors, docs updated).

## Output Format

```
## Goal
[One-sentence summary]

## Reuse Opportunities
- [Existing utility/pattern]

## Dependencies
- [Package / API / env var]

## Phases
### Phase 1 — [Name]
- [ ] Task A
- [ ] Task B

### Phase 2 — [Name]
...

## Risks
- [Risk and mitigation]

## Definition of Done
- [ ] All tests pass (≥80% coverage)
- [ ] No new lint errors
- [ ] Docs updated if public API changed
```

Apply ECC coding standards throughout: immutable patterns, small focused files, explicit error handling.
