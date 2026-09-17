---
title: "Expand Unit Tests"
sourceId: "09-harness/claude-howto"
sourceTitle: "Claude How-To"
sourceKind: "工程手册"
licenseLabel: "可转载"
lang: "英文"
tier: 2
volume: "09-harness"
sourceUrl: "https://github.com/luongnv89/claude-howto"
entryUrl: "https://github.com/luongnv89/claude-howto/blob/97bfb0685e03112ad39845889061d02cef6e534c/01-slash-commands/unit-test-expand.md"
sourceRel: "01-slash-commands/unit-test-expand.md"
rawUrl: "/raw/09-harness/claude-howto/01-slash-commands/unit-test-expand.md"
sourceSha256: "bb5809f29469fc919da84aed6349948938943703188518ebe3f4c82e94ac8a73"
pageSha256: "bb5809f29469fc919da84aed6349948938943703188518ebe3f4c82e94ac8a73"
contentMode: "local-full"
zh: ""
---

# Expand Unit Tests

Expand existing unit tests adapted to project's testing framework:

1. **Analyze coverage**: Run coverage report to identify untested branches, edge cases, and low-coverage areas
2. **Identify gaps**: Review code for logical branches, error paths, boundary conditions, null/empty inputs
3. **Write tests** using project's framework:
   - Jest/Vitest/Mocha (JavaScript/TypeScript)
   - pytest/unittest (Python)
   - Go testing/testify (Go)
   - Rust test framework (Rust)
4. **Target specific scenarios**:
   - Error handling and exceptions
   - Boundary values (min/max, empty, null)
   - Edge cases and corner cases
   - State transitions and side effects
5. **Verify improvement**: Run coverage again, confirm measurable increase

Present new test code blocks only. Follow existing test patterns and naming conventions.

---
**Last Updated**: August 4, 2026
**Claude Code Version**: 2.1.220
**Sources**:
- https://code.claude.com/docs/en/commands
**Compatible Models**: Claude Fable 5, Claude Opus 5, Claude Sonnet 5, Claude Sonnet 4.6, Claude Opus 4.8, Claude Haiku 4.5
