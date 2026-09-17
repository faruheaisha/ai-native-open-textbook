---
title: "Agent Skills（Addy Osmani）"
sourceId: "10-context-memory/agent-skills-addyosmani"
sourceTitle: "Agent Skills（Addy Osmani）"
sourceKind: "技能与配置库"
licenseLabel: "可转载"
lang: "英文"
tier: 2
volume: "10-context-memory"
sourceUrl: "https://github.com/addyosmani/agent-skills"
entryUrl: "https://github.com/addyosmani/agent-skills/blob/6ca0cd7db39b41b1c37e26d335c507ee92382c6d/.claude/commands/code-simplify.md"
sourceRel: ".claude/commands/code-simplify.md"
rawUrl: "/raw/10-context-memory/agent-skills-addyosmani/.claude/commands/code-simplify.md"
sourceSha256: "71e9e8d38c5cbab5b7ecff324ed4ea0f1aaa4fd053ea6c2b717f2fbadfb65a91"
pageSha256: "71e9e8d38c5cbab5b7ecff324ed4ea0f1aaa4fd053ea6c2b717f2fbadfb65a91"
contentMode: "local-full"
zh: ""
---

# Agent Skills（Addy Osmani）

Invoke the agent-skills:code-simplification skill.

Simplify recently changed code (or the specified scope) while preserving exact behavior:

1. Read CLAUDE.md and study project conventions
2. Identify the target code — recent changes unless a broader scope is specified
3. Understand the code's purpose, callers, edge cases, and test coverage before touching it
4. Scan for simplification opportunities:
   - Deep nesting → guard clauses or extracted helpers
   - Long functions → split by responsibility
   - Nested ternaries → if/else or switch
   - Generic names → descriptive names
   - Duplicated logic → shared functions
   - Dead code → remove after confirming
5. Apply each simplification incrementally — run tests after each change
6. Verify all tests pass, the build succeeds, and the diff is clean

If tests fail after a simplification, revert that change and reconsider. Use `code-review-and-quality` to review the result.
