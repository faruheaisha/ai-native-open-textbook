---
title: "Code Review Skill"
sourceId: "09-harness/claude-howto"
sourceTitle: "Claude How-To"
sourceKind: "工程手册"
licenseLabel: "可转载"
lang: "英文"
tier: 2
volume: "09-harness"
sourceUrl: "https://github.com/luongnv89/claude-howto"
entryUrl: "https://github.com/luongnv89/claude-howto/blob/97bfb0685e03112ad39845889061d02cef6e534c/03-skills/code-review-specialist/SKILL.md"
sourceRel: "03-skills/code-review-specialist/SKILL.md"
rawUrl: "/raw/09-harness/claude-howto/03-skills/code-review-specialist/SKILL.md"
sourceSha256: "e0ebeb9f8cbc89c55a98d86ee1887e3de83d5abd9d134eaad7037984c60d894f"
pageSha256: "e0ebeb9f8cbc89c55a98d86ee1887e3de83d5abd9d134eaad7037984c60d894f"
contentMode: "local-full"
zh: ""
---

# Code Review Skill

This skill provides comprehensive code review capabilities focusing on:

1. **Security Analysis**
   - Authentication/authorization issues
   - Data exposure risks
   - Injection vulnerabilities
   - Cryptographic weaknesses
   - Sensitive data logging

2. **Performance Review**
   - Algorithm efficiency (Big O analysis)
   - Memory optimization
   - Database query optimization
   - Caching opportunities
   - Concurrency issues

3. **Code Quality**
   - SOLID principles
   - Design patterns
   - Naming conventions
   - Documentation
   - Test coverage

4. **Maintainability**
   - Code readability
   - Function size (should be < 50 lines)
   - Cyclomatic complexity
   - Dependency management
   - Type safety

## Reference Files

This skill includes supporting files that you should read when performing reviews:

- **`templates/review-checklist.md`** — Structured checklist covering security, performance, quality, and testing. Read this file and use it as a guide to ensure no category is missed during review.
- **`templates/finding-template.md`** — Standard template for documenting individual findings with severity, location, code examples, and impact analysis. Read this file and use its format when reporting issues.
- **`scripts/analyze-metrics.py`** — Python script that calculates code metrics (function count, class count, average line length, complexity score). Run this on the file under review to gather quantitative data.
- **`scripts/compare-complexity.py`** — Python script that compares cyclomatic and cognitive complexity between two versions of a file. Run this with the before and after versions when reviewing refactoring changes.

## Review Template

For each piece of code reviewed, provide:

### Summary
- Overall quality assessment (1-5)
- Key findings count
- Recommended priority areas

### Critical Issues (if any)
- **Issue**: Clear description
- **Location**: File and line number
- **Impact**: Why this matters
- **Severity**: Critical/High/Medium
- **Fix**: Code example

### Findings by Category

#### Security (if issues found)
List security vulnerabilities with examples

#### Performance (if issues found)
List performance problems with complexity analysis

#### Quality (if issues found)
List code quality issues with refactoring suggestions

#### Maintainability (if issues found)
List maintainability problems with improvements

## Version History

- v1.0.0 (2024-12-10): Initial release with security, performance, quality, and maintainability analysis

---

**Last Updated**: August 4, 2026
**Claude Code Version**: 2.1.220
**Sources**:
- https://code.claude.com/docs/en/skills
**Compatible Models**: Claude Fable 5, Claude Opus 5, Claude Sonnet 5, Claude Sonnet 4.6, Claude Opus 4.8, Claude Haiku 4.5
