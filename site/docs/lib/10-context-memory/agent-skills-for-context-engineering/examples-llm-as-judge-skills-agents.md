---
title: "Agents Index"
sourceId: "10-context-memory/agent-skills-for-context-engineering"
sourceTitle: "Agent Skills for Context Engineering"
sourceKind: "技能与配置库"
licenseLabel: "可转载"
lang: "英文"
tier: 3
volume: "10-context-memory"
sourceUrl: "https://github.com/muratcankoylan/Agent-Skills-for-Context-Engineering"
entryUrl: "https://github.com/muratcankoylan/Agent-Skills-for-Context-Engineering/blob/6dbe1a1d868eab51a3bc9011b0f55e2891513e40/examples/llm-as-judge-skills/agents/index.md"
sourceRel: "examples/llm-as-judge-skills/agents/index.md"
rawUrl: "/raw/10-context-memory/agent-skills-for-context-engineering/examples/llm-as-judge-skills/agents/index.md"
sourceSha256: "8c85022761a077ebfa6b726d7de2a89d1af16a2ac95a091f7d9ec1b53d2f7ea7"
pageSha256: "8c85022761a077ebfa6b726d7de2a89d1af16a2ac95a091f7d9ec1b53d2f7ea7"
contentMode: "local-full"
zh: ""
---

# Agents Index

Agents are reusable AI components with defined capabilities, tools, and instructions.

## Available Agents

### Evaluator Agent
**Path**: `agents/evaluator-agent/evaluator-agent.md`
**Purpose**: Assess the quality of LLM-generated responses

**Capabilities**:
- Direct scoring against rubrics
- Pairwise comparison of responses
- Criteria extraction from task descriptions
- Rubric generation for evaluation

**Tools Used**:
- `directScore`
- `pairwiseCompare`
- `extractCriteria`
- `generateRubric`

**Best For**:
- Quality gates in content pipelines
- Model comparison studies
- RLHF preference data generation
- Output validation before delivery

---

### Research Agent
**Path**: `agents/research-agent/research-agent.md`
**Purpose**: Gather, verify, and synthesize information from multiple sources

**Capabilities**:
- Web search and result analysis
- URL content extraction
- Claim extraction and verification
- Research synthesis

**Tools Used**:
- `webSearch`
- `readUrl`
- `extractClaims`
- `verifyClaim`
- `synthesize`

**Best For**:
- Knowledge base building
- Fact checking
- Market research
- Technical documentation

---

### Orchestrator Agent
**Path**: `agents/orchestrator-agent/orchestrator-agent.md`
**Purpose**: Coordinate multi-agent workflows for complex tasks

**Capabilities**:
- Task decomposition and assignment
- Parallel task execution
- Result synthesis
- Error handling and recovery

**Tools Used**:
- `delegateToAgent`
- `parallelExecution`
- `waitForCompletion`
- `synthesizeResults`
- `handleError`

**Best For**:
- Complex multi-step tasks
- Cross-capability workflows
- Quality-assured pipelines
- Long-running operations

## Agent Interaction Patterns

### Sequential Pipeline
```
Input → Agent A → Agent B → Agent C → Output
```
Use when each step depends on the previous.

### Parallel Fan-Out
```
        ┌→ Agent A ─┐
Input ──┼→ Agent B ──┼→ Synthesis → Output
        └→ Agent C ─┘
```
Use for independent subtasks that can run concurrently.

### Iterative Refinement
```
Input → Agent → Evaluator ─┬→ Output (if pass)
                           └→ Agent (if fail, with feedback)
```
Use for quality-critical outputs.

## Adding New Agents
