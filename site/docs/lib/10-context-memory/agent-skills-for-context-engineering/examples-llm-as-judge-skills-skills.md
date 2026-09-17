---
title: "Skills Index"
sourceId: "10-context-memory/agent-skills-for-context-engineering"
sourceTitle: "Agent Skills for Context Engineering"
sourceKind: "技能与配置库"
licenseLabel: "可转载"
lang: "英文"
tier: 3
volume: "10-context-memory"
sourceUrl: "https://github.com/muratcankoylan/Agent-Skills-for-Context-Engineering"
entryUrl: "https://github.com/muratcankoylan/Agent-Skills-for-Context-Engineering/blob/6dbe1a1d868eab51a3bc9011b0f55e2891513e40/examples/llm-as-judge-skills/skills/index.md"
sourceRel: "examples/llm-as-judge-skills/skills/index.md"
rawUrl: "/raw/10-context-memory/agent-skills-for-context-engineering/examples/llm-as-judge-skills/skills/index.md"
sourceSha256: "e1c92e5f75ef6bfd3d5cf969ff97197f7d0c07a42dd8c6907b964e93ae1af719"
pageSha256: "e1c92e5f75ef6bfd3d5cf969ff97197f7d0c07a42dd8c6907b964e93ae1af719"
contentMode: "local-full"
zh: ""
---

# Skills Index

Skills are foundational knowledge modules that inform the design and implementation of agents, tools, and prompts.

## Available Skills

### LLM Evaluator
**Path**: `skills/llm-evaluator/llm-evaluator.md`

Covers LLM-as-a-Judge evaluation methodology including:
- Scoring approaches (direct, pairwise, reference-based)
- Evaluation metrics (classification, correlation)
- Known biases and mitigation strategies
- Implementation patterns

**Key Takeaways**:
- Use direct scoring for objective evaluations
- Use pairwise comparison for subjective preferences
- Always mitigate position bias
- Prefer classification metrics for interpretability

### Context Fundamentals
**Path**: `skills/context-fundamentals/context-fundamentals.md`

Covers context engineering principles including:
- Context window management
- Information hierarchy
- Context types (static, dynamic, ephemeral)
- Relevance filtering

**Key Takeaways**:
- Structure context by priority
- Be explicit over implicit
- Remove redundancy
- Signal freshness of information

### Tool Design
**Path**: `skills/tool-design/tool-design.md`

Covers agent tool design best practices including:
- Single responsibility principle
- Input/output schemas
- Error handling patterns
- AI SDK 6 features (approval, strict mode, examples)

**Key Takeaways**:
- Clear, validated schemas
- Predictable output structure
- Graceful error handling
- Consider approval for dangerous tools

## Skill Application Matrix

| Skill | Agents | Tools | Prompts |
|-------|--------|-------|---------|
| LLM Evaluator | Evaluator | directScore, pairwiseCompare | evaluation/* |
| Context Fundamentals | All | All (context params) | All (context handling) |
| Tool Design | All (tool selection) | All | orchestrator-prompt |

## Adding New Skills
