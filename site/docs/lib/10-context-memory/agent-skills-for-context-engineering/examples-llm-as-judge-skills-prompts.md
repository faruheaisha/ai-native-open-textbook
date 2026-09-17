---
title: "Prompts Index"
sourceId: "10-context-memory/agent-skills-for-context-engineering"
sourceTitle: "Agent Skills for Context Engineering"
sourceKind: "技能与配置库"
licenseLabel: "可转载"
lang: "英文"
tier: 3
volume: "10-context-memory"
sourceUrl: "https://github.com/muratcankoylan/Agent-Skills-for-Context-Engineering"
entryUrl: "https://github.com/muratcankoylan/Agent-Skills-for-Context-Engineering/blob/6dbe1a1d868eab51a3bc9011b0f55e2891513e40/examples/llm-as-judge-skills/prompts/index.md"
sourceRel: "examples/llm-as-judge-skills/prompts/index.md"
rawUrl: "/raw/10-context-memory/agent-skills-for-context-engineering/examples/llm-as-judge-skills/prompts/index.md"
sourceSha256: "dc92be35549a38490ed5bae267bfb162b1da1c38b5a3fb34c6b3040d2a3a826e"
pageSha256: "dc92be35549a38490ed5bae267bfb162b1da1c38b5a3fb34c6b3040d2a3a826e"
contentMode: "local-full"
zh: ""
---

# Prompts Index

Prompts are reusable templates that define how agents and tools interact with LLMs.

## Prompt Categories

### Evaluation Prompts
**Path**: `prompts/evaluation/`

Templates for quality assessment tasks.

| Prompt | Purpose | Used By |
|--------|---------|---------|
| `direct-scoring-prompt` | Evaluate single response | Evaluator Agent, directScore tool |
| `pairwise-comparison-prompt` | Compare two responses | Evaluator Agent, pairwiseCompare tool |

---

### Research Prompts
**Path**: `prompts/research/`

Templates for information gathering and synthesis.

| Prompt | Purpose | Used By |
|--------|---------|---------|
| `research-synthesis-prompt` | Synthesize findings | Research Agent |

---

### Agent System Prompts
**Path**: `prompts/agent-system/`

System prompts for agent definitions.

| Prompt | Purpose | Used By |
|--------|---------|---------|
| `orchestrator-prompt` | Multi-agent coordination | Orchestrator Agent |

## Prompt Template Format

### Standard Structure

```markdown
# Prompt Name

## Purpose
Brief description of what this prompt accomplishes.

## Prompt Template
```markdown
[The actual prompt with {{variables}}]
```

## Variables
| Variable | Description | Required |
|----------|-------------|----------|
| var_name | What it contains | Yes/No |

## Example Usage
Concrete example showing inputs and expected outputs.

## Best Practices
Guidelines for using this prompt effectively.
```

### Variable Syntax

Use Handlebars-style templating:

```markdown
{{variable}}                 # Simple substitution
{{#if condition}}...{{/if}} # Conditional section
{{#each array}}...{{/each}} # Iteration
```

## Prompt Design Principles

### 1. Clear Role Definition
Tell the model exactly what it is and what it's doing.

```markdown
You are an expert evaluator assessing the quality of AI-generated responses.
```

### 2. Explicit Instructions
Don't assume the model will infer requirements.

```markdown
For each criterion:
1. First, identify specific evidence from the response
2. Then, determine the appropriate score based on the rubric
3. Finally, provide actionable feedback
```

### 3. Structured Output
Specify the exact format you need.

```markdown
Format your response as structured JSON:
```json
{
  "scores": [...],
  "summary": {...}
}
```
```

### 4. Guard Rails
Include constraints and warnings.

```markdown
Important Guidelines:
- Do NOT prefer responses simply because they are longer
- Do NOT prefer responses based on their position (A vs B)
- Focus on the specified criteria
```

## Adding New Prompts

1. Determine category or create new: `prompts/<category>/`
