---
title: "Development Workflow"
sourceId: "09-harness/ecc"
sourceTitle: "ECC —— Harness 性能优化系统"
sourceKind: "其他材料"
licenseLabel: "可转载"
lang: "英文"
tier: 3
volume: "09-harness"
sourceUrl: "https://github.com/affaan-m/ECC"
entryUrl: "https://github.com/affaan-m/ECC/blob/928c1dea72f5c330442fc1f595563398b8f389f7/.kiro/steering/development-workflow.md"
sourceRel: ".kiro/steering/development-workflow.md"
rawUrl: "/raw/09-harness/ecc/.kiro/steering/development-workflow.md"
sourceSha256: "31c74c87bbc0cda3273bd52260921631ea4bda6815d3afb1d5d2daf2a5829d57"
pageSha256: "31c74c87bbc0cda3273bd52260921631ea4bda6815d3afb1d5d2daf2a5829d57"
contentMode: "local-full"
zh: ""
---

# Development Workflow

> This rule extends the git workflow rule with the full feature development process that happens before git operations.

The Feature Implementation Workflow describes the development pipeline: planning, TDD, code review, and then committing to git.

## Feature Implementation Workflow

1. **Plan First**
   - Use **planner** agent to create implementation plan
   - Identify dependencies and risks
   - Break down into phases

2. **TDD Approach**
   - Use **tdd-guide** agent
   - Write tests first (RED)
   - Implement to pass tests (GREEN)
   - Refactor (IMPROVE)
   - Verify 80%+ coverage

3. **Code Review**
   - Use **code-reviewer** agent immediately after writing code
   - Address CRITICAL and HIGH issues
   - Fix MEDIUM issues when possible

4. **Commit & Push**
   - Detailed commit messages
   - Follow conventional commits format
   - See the git workflow rule for commit message format and PR process
