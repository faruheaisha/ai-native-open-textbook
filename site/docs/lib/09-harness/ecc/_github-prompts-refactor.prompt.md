---
title: "Refactor & Cleanup"
sourceId: "09-harness/ecc"
sourceTitle: "ECC —— Harness 性能优化系统"
sourceKind: "其他材料"
licenseLabel: "可转载"
lang: "英文"
tier: 3
volume: "09-harness"
sourceUrl: "https://github.com/affaan-m/ECC"
entryUrl: "https://github.com/affaan-m/ECC/blob/928c1dea72f5c330442fc1f595563398b8f389f7/.github/prompts/refactor.prompt.md"
sourceRel: ".github/prompts/refactor.prompt.md"
rawUrl: "/raw/09-harness/ecc/.github/prompts/refactor.prompt.md"
sourceSha256: "1fe05960dc200f773afd46388f46aed3c45446aa5b64b058837c1a807108aba8"
pageSha256: "1fe05960dc200f773afd46388f46aed3c45446aa5b64b058837c1a807108aba8"
contentMode: "local-full"
zh: ""
---

# Refactor & Cleanup

Improve the internal structure of the selected code without changing its observable behavior. All tests must pass before and after.

## Before Starting
- [ ] Confirm the test suite is passing.
- [ ] Note the current coverage baseline.
- [ ] Identify the scope: single function, file, or module?

## Refactoring Targets

### Dead Code Removal
- Unused variables, imports, functions, and exports
- Commented-out code blocks (delete, don't leave as comments)
- Feature flags that are permanently enabled/disabled
- Unreachable branches

### Duplication Reduction
- Repeated logic that can be extracted into a shared utility
- Copy-pasted blocks differing only in a parameter (extract with that parameter)
- Inline constants that appear in multiple places (extract to named constants)

### Structure Improvements
- Functions over 50 lines → break into smaller, named steps
- Files over 800 lines → extract cohesive sub-modules
- Nesting deeper than 4 levels → extract early-return guards or helper functions
- Mixed concerns in one function → split into focused single-responsibility functions

### Naming
- Rename variables/functions whose names don't match their behavior
- Replace magic numbers and strings with named constants
- Align naming with the domain language used elsewhere in the codebase

## Constraints
- **No behavior changes** — refactoring is purely structural.
- **One concern at a time** — do not mix refactoring with feature work or bug fixes.
- **Keep tests green** — run the suite after each meaningful change.
- **Don't add abstractions preemptively** — extract only what has already proven to be duplicated (rule of three).

## Output
After refactoring, summarize:
- What was removed (dead code, duplication)
- What was extracted (new utilities, constants)
- What was renamed and why
- Coverage before / after (should not decrease)
