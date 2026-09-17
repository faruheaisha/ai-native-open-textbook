---
title: "Test Review Criteria"
sourceId: "09-harness/claude-code-ultimate-guide"
sourceTitle: "Claude Code Ultimate Guide"
sourceKind: "工程手册"
licenseLabel: "可转载"
lang: "英文"
tier: 3
volume: "09-harness"
sourceUrl: "https://github.com/FlorianBruniaux/claude-code-ultimate-guide"
entryUrl: "https://github.com/FlorianBruniaux/claude-code-ultimate-guide/blob/af05b84fb6e32432dae2114ee2a72c44ef3d29b1/examples/rules/test-review.md"
sourceRel: "examples/rules/test-review.md"
rawUrl: "/raw/09-harness/claude-code-ultimate-guide/examples/rules/test-review.md"
sourceSha256: "83c07b506497e72697d45f1f1befcfa8262ee487415d64fe473983111a469d67"
pageSha256: "83c07b506497e72697d45f1f1befcfa8262ee487415d64fe473983111a469d67"
contentMode: "local-full"
zh: ""
---

# Test Review Criteria

When reviewing tests, evaluate these dimensions:

## Coverage Gaps
- Are there untested public functions or API endpoints?
- Is there unit, integration, AND e2e coverage where appropriate?
- Are critical paths (auth, payments, data mutations) fully tested?

## Test Quality
- Do assertions test behavior, not implementation details?
- Are test descriptions clear about what they verify?
- Do tests fail for the right reasons (not brittle/flaky)?
- Is each test independent (no shared mutable state)?

## Edge Cases
- Are boundary values tested (empty, null, max, negative)?
- Are error paths tested (network failures, invalid input, timeouts)?
- Are race conditions and concurrent access scenarios covered?

## Failure Modes
- What happens when external services are unavailable?
- Are retry and fallback mechanisms tested?
- Do tests verify graceful degradation?
- Are error messages and status codes correct for each failure?
