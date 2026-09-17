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
entryUrl: "https://github.com/addyosmani/agent-skills/blob/6ca0cd7db39b41b1c37e26d335c507ee92382c6d/.claude/commands/test.md"
sourceRel: ".claude/commands/test.md"
rawUrl: "/raw/10-context-memory/agent-skills-addyosmani/.claude/commands/test.md"
sourceSha256: "62f72b64cfac6db984db072fdc987a23e6049876191297da5f37367def986ff2"
pageSha256: "62f72b64cfac6db984db072fdc987a23e6049876191297da5f37367def986ff2"
contentMode: "local-full"
zh: ""
---

# Agent Skills（Addy Osmani）

Invoke the agent-skills:test-driven-development skill.

For new features:
1. Write tests that describe the expected behavior (they should FAIL)
2. Implement the code to make them pass
3. Refactor while keeping tests green

For bug fixes (Prove-It pattern):
1. Write a test that reproduces the bug (must FAIL)
2. Confirm the test fails
3. Implement the fix
4. Confirm the test passes
5. Run the full test suite for regressions

For browser-related issues, also invoke agent-skills:browser-testing-with-devtools to verify with Chrome DevTools MCP.
