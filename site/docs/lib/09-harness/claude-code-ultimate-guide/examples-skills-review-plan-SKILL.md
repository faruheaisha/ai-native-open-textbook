---
title: "Review Plan Before Implementation"
sourceId: "09-harness/claude-code-ultimate-guide"
sourceTitle: "Claude Code Ultimate Guide"
sourceKind: "工程手册"
licenseLabel: "可转载"
lang: "英文"
tier: 3
volume: "09-harness"
sourceUrl: "https://github.com/FlorianBruniaux/claude-code-ultimate-guide"
entryUrl: "https://github.com/FlorianBruniaux/claude-code-ultimate-guide/blob/af05b84fb6e32432dae2114ee2a72c44ef3d29b1/examples/skills/review-plan/SKILL.md"
sourceRel: "examples/skills/review-plan/SKILL.md"
rawUrl: "/raw/09-harness/claude-code-ultimate-guide/examples/skills/review-plan/SKILL.md"
sourceSha256: "1904c3f83a7c6e1988468bef1c277fa2ff4eadaad6b93d30d14566f2bf4bfdbe"
pageSha256: "1904c3f83a7c6e1988468bef1c277fa2ff4eadaad6b93d30d14566f2bf4bfdbe"
contentMode: "local-full"
zh: ""
---

# Review Plan Before Implementation

Review the current plan thoroughly before making any code changes. For every issue or recommendation, explain the concrete tradeoffs, give an opinionated recommendation, and ask for user input before assuming a direction.

## Engineering Preferences

Use these to guide your recommendations (override with project-specific CLAUDE.md preferences if they exist):

- DRY is important: flag repetition aggressively
- Well-tested code is non-negotiable: prefer too many tests over too few
- Code should be "engineered enough": not under-engineered (fragile, hacky) and not over-engineered (premature abstraction, unnecessary complexity)
- Err on the side of handling more edge cases, not fewer
- Bias toward explicit over clever; thoughtfulness over speed

## Review Pipeline

Work through each section sequentially. After each section, pause and ask for feedback before moving on.

### 1. Architecture Review

Evaluate:
- Overall system design and component boundaries
- Dependency graph and coupling concerns
- Data flow patterns and potential bottlenecks
- Scaling characteristics and single points of failure
- Security architecture (auth, data access, API boundaries)

### 2. Code Quality Review

Evaluate:
- Code organization and module structure
- DRY violations (be aggressive here)
- Error handling patterns and missing edge cases (call these out explicitly)
- Technical debt hotspots
- Areas that are over-engineered or under-engineered relative to engineering preferences

### 3. Test Review

Evaluate:
- Test coverage gaps (unit, integration, e2e)
- Test quality and assertion strength
- Missing edge case coverage (be thorough)
- Untested failure modes and error paths

### 4. Performance Review

Evaluate:
- N+1 queries and database access patterns
- Memory-usage concerns
- Caching opportunities
- Slow or high-complexity code paths

## Issue Reporting Format

For every specific issue found (bug, smell, design concern, or risk):

1. Describe the problem concretely, with file and line references
2. Present 2-3 options, including "do nothing" where that's reasonable
3. For each option, specify: implementation effort, risk, impact on other code, and maintenance burden
4. Give your recommended option and why, mapped to engineering preferences above
5. Ask explicitly whether the user agrees or wants to choose a different direction before proceeding

## Workflow

- Do not assume priorities on timeline or scale
- After each section, pause and ask for feedback before moving on
- Use AskUserQuestion for structured option selection

## Before Starting

Ask if the user wants one of two options:

1. **BIG CHANGE**: Work through this interactively, one section at a time (Architecture → Code Quality → Tests → Performance) with at most 4 top issues in each section
2. **SMALL CHANGE**: Work through interactively ONE question per review section

## Tips

- Combine with `.claude/rules/` files for project-specific review criteria
- Engineering preferences above can be overridden by your project's CLAUDE.md
- For deeper analysis, use this command with Opus model

## Sources

- Inspired by [Garry Tan's Plan Mode prompt](https://garrytan.com/) (Feb 2026)
- Adapted for Claude Code's native config system

$ARGUMENTS
