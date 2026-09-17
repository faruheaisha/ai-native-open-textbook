---
title: "Test-Driven Development Workflow"
sourceId: "09-harness/ecc"
sourceTitle: "ECC —— Harness 性能优化系统"
sourceKind: "其他材料"
licenseLabel: "可转载"
lang: "英文"
tier: 3
volume: "09-harness"
sourceUrl: "https://github.com/affaan-m/ECC"
entryUrl: "https://github.com/affaan-m/ECC/blob/928c1dea72f5c330442fc1f595563398b8f389f7/.agents/skills/tdd-workflow/SKILL.md"
sourceRel: ".agents/skills/tdd-workflow/SKILL.md"
rawUrl: "/raw/09-harness/ecc/.agents/skills/tdd-workflow/SKILL.md"
sourceSha256: "5a88684181704575d8958fbcd6f506ea39d56d921d22edb40a6bbccb408336e6"
pageSha256: "5a88684181704575d8958fbcd6f506ea39d56d921d22edb40a6bbccb408336e6"
contentMode: "local-full"
zh: ""
---

# Test-Driven Development Workflow

This skill ensures all code development follows TDD principles with comprehensive test coverage.

## When to Activate

- Writing new features or functionality
- Fixing bugs or issues
- Refactoring existing code
- Adding API endpoints
- Creating new components

## Core Principles

### 1. Tests BEFORE Code
ALWAYS write tests first, then implement code to make tests pass.

### 2. Coverage Requirements
- Minimum 80% coverage (unit + integration + E2E)
- All edge cases covered
- Error scenarios tested
- Boundary conditions verified

### 3. Test Types

#### Unit Tests
- Individual functions and utilities
- Component logic
- Pure functions
- Helpers and utilities

#### Integration Tests
- API endpoints
- Database operations
- Service interactions
- External API calls

#### E2E Tests (Playwright)
- Critical user flows
- Complete workflows
- Browser automation
- UI interactions

## TDD Workflow Steps

### Step 0: Detect the Test Runner
