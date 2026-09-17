---
title: "Performance Optimization"
sourceId: "09-harness/ecc"
sourceTitle: "ECC —— Harness 性能优化系统"
sourceKind: "其他材料"
licenseLabel: "可转载"
lang: "英文"
tier: 3
volume: "09-harness"
sourceUrl: "https://github.com/affaan-m/ECC"
entryUrl: "https://github.com/affaan-m/ECC/blob/928c1dea72f5c330442fc1f595563398b8f389f7/.kiro/steering/performance.md"
sourceRel: ".kiro/steering/performance.md"
rawUrl: "/raw/09-harness/ecc/.kiro/steering/performance.md"
sourceSha256: "27ecb5426503d383d2dce48267c3974c95182ef322da3ab48599f2e650be1020"
pageSha256: "27ecb5426503d383d2dce48267c3974c95182ef322da3ab48599f2e650be1020"
contentMode: "local-full"
zh: ""
---

# Performance Optimization

## Model Selection Strategy

**Claude Haiku 4.5** (90% of Sonnet capability, 3x cost savings):
- Lightweight agents with frequent invocation
- Pair programming and code generation
- Worker agents in multi-agent systems

**Claude Sonnet 5** (Best coding model):
- Main development work
- Orchestrating multi-agent workflows
- Complex coding tasks

**Claude Opus 5** (Deepest reasoning):
- Complex architectural decisions
- Maximum reasoning requirements
- Research and analysis tasks

## Context Window Management

Avoid last 20% of context window for:
- Large-scale refactoring
- Feature implementation spanning multiple files
- Debugging complex interactions

Lower context sensitivity tasks:
- Single-file edits
- Independent utility creation
- Documentation updates
- Simple bug fixes

## Extended Thinking

Extended thinking is enabled by default in Kiro, reserving tokens for internal reasoning.

For complex tasks requiring deep reasoning:
1. Ensure extended thinking is enabled
2. Use structured approach for planning
3. Use multiple critique rounds for thorough analysis
4. Use sub-agents for diverse perspectives

## Build Troubleshooting

If build fails:
1. Use build-error-resolver agent
2. Analyze error messages
3. Fix incrementally
4. Verify after each fix
