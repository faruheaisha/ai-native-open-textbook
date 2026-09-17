---
title: "Code Quality Review Criteria"
sourceId: "09-harness/claude-code-ultimate-guide"
sourceTitle: "Claude Code Ultimate Guide"
sourceKind: "工程手册"
licenseLabel: "可转载"
lang: "英文"
tier: 3
volume: "09-harness"
sourceUrl: "https://github.com/FlorianBruniaux/claude-code-ultimate-guide"
entryUrl: "https://github.com/FlorianBruniaux/claude-code-ultimate-guide/blob/af05b84fb6e32432dae2114ee2a72c44ef3d29b1/examples/rules/code-quality-review.md"
sourceRel: "examples/rules/code-quality-review.md"
rawUrl: "/raw/09-harness/claude-code-ultimate-guide/examples/rules/code-quality-review.md"
sourceSha256: "1f8175e4fccc9ca82bbb759c61a97cc2af8cba06a00b9ef111e8f7dc0c69ad2f"
pageSha256: "1f8175e4fccc9ca82bbb759c61a97cc2af8cba06a00b9ef111e8f7dc0c69ad2f"
contentMode: "local-full"
zh: ""
---

# Code Quality Review Criteria

When reviewing code quality, evaluate these dimensions:

## Organization
- Is the module structure logical and consistent?
- Are files in the right directories?
- Is the naming convention consistent across the codebase?

## DRY Violations
- Flag any duplicated logic (be aggressive)
- Identify copy-paste patterns that should be abstracted
- Check for repeated configuration or magic values

## Error Handling
- Are errors handled at the right level (not swallowed, not over-caught)?
- Are edge cases explicitly handled or documented as out-of-scope?
- Do error messages provide enough context for debugging?
- Are there silent failures (empty catch blocks, ignored return values)?

## Technical Debt
- Which areas have the highest maintenance burden?
- Are there TODO/FIXME comments that should be addressed now?
- Is there dead code that should be removed?

## Engineering Balance
- Are there areas that are over-engineered (premature abstraction, unnecessary complexity)?
- Are there areas that are under-engineered (fragile, hacky, missing validation)?
- Does the complexity match the actual requirements?
