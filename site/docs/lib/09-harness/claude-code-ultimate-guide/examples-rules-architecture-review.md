---
title: "Architecture Review Criteria"
sourceId: "09-harness/claude-code-ultimate-guide"
sourceTitle: "Claude Code Ultimate Guide"
sourceKind: "工程手册"
licenseLabel: "可转载"
lang: "英文"
tier: 3
volume: "09-harness"
sourceUrl: "https://github.com/FlorianBruniaux/claude-code-ultimate-guide"
entryUrl: "https://github.com/FlorianBruniaux/claude-code-ultimate-guide/blob/af05b84fb6e32432dae2114ee2a72c44ef3d29b1/examples/rules/architecture-review.md"
sourceRel: "examples/rules/architecture-review.md"
rawUrl: "/raw/09-harness/claude-code-ultimate-guide/examples/rules/architecture-review.md"
sourceSha256: "d675d5303a541cb20f40ae232b9156217a4674d65d525cc6a4af70dd40aa9f26"
pageSha256: "d675d5303a541cb20f40ae232b9156217a4674d65d525cc6a4af70dd40aa9f26"
contentMode: "local-full"
zh: ""
---

# Architecture Review Criteria

When reviewing architecture (plans or code), evaluate these dimensions:

## System Design
- Are component boundaries clear and well-defined?
- Does each component have a single, well-understood responsibility?
- Are interfaces between components minimal and well-documented?

## Dependencies
- Is the dependency graph acyclic and manageable?
- Are there circular dependencies that need breaking?
- Are external dependencies justified and up-to-date?

## Data Flow
- Is data ownership clear (which component is source of truth)?
- Are there potential bottlenecks in the data pipeline?
- Is data transformation happening at the right layer?

## Scaling
- What are the single points of failure?
- Where will the system break under 10x load?
- Are stateless and stateful components properly separated?

## Security
- Are authentication and authorization properly layered?
- Is data access controlled at the right boundaries?
- Are API boundaries validated (input sanitization, rate limiting)?
- Are secrets properly managed (no hardcoded values)?
