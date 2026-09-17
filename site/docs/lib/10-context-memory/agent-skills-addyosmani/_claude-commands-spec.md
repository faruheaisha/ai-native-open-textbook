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
entryUrl: "https://github.com/addyosmani/agent-skills/blob/6ca0cd7db39b41b1c37e26d335c507ee92382c6d/.claude/commands/spec.md"
sourceRel: ".claude/commands/spec.md"
rawUrl: "/raw/10-context-memory/agent-skills-addyosmani/.claude/commands/spec.md"
sourceSha256: "82325b4cc75ae2413c7bf4b6f84804eb662935d9df98edab50eef2b39ff904b0"
pageSha256: "82325b4cc75ae2413c7bf4b6f84804eb662935d9df98edab50eef2b39ff904b0"
contentMode: "local-full"
zh: ""
---

# Agent Skills（Addy Osmani）

Invoke the agent-skills:spec-driven-development skill.

Begin by understanding what the user wants to build. Ask clarifying questions about:
1. The objective and target users
2. Core features and acceptance criteria
3. Tech stack preferences and constraints
4. Known boundaries (what to always do, ask first about, and never do)

Then generate a structured spec covering all six core areas: objective, commands, project structure, code style, testing strategy, and boundaries.

If the request bundles several independently testable capabilities, first propose a capability map (module ids, dependency direction, build order) per the skill's Phase 0 and get it approved, then spec each module in dependency order.

Save the spec as SPEC.md in the project root and confirm with the user before proceeding.
