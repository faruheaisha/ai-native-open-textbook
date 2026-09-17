---
title: "Available skills ({{SKILLCOUNT}})"
sourceId: "10-context-memory/agent-skills-for-context-engineering"
sourceTitle: "Agent Skills for Context Engineering"
sourceKind: "技能与配置库"
licenseLabel: "可转载"
lang: "英文"
tier: 3
volume: "10-context-memory"
sourceUrl: "https://github.com/muratcankoylan/Agent-Skills-for-Context-Engineering"
entryUrl: "https://github.com/muratcankoylan/Agent-Skills-for-Context-Engineering/blob/6dbe1a1d868eab51a3bc9011b0f55e2891513e40/researcher/benchmarks/router/routing-prompt.md"
sourceRel: "researcher/benchmarks/router/routing-prompt.md"
rawUrl: "/raw/10-context-memory/agent-skills-for-context-engineering/researcher/benchmarks/router/routing-prompt.md"
sourceSha256: "433bbec9242cc3e5c7f8e562c06c84018af141ce77e5a7eb668166efdd5901eb"
pageSha256: "433bbec9242cc3e5c7f8e562c06c84018af141ce77e5a7eb668166efdd5901eb"
contentMode: "local-full"
zh: ""
---

# Available skills (&#123;&#123;SKILL_COUNT&#125;&#125;)

Each item is `<name>` followed by the skill's activation description.

&#123;&#123;SKILL_BLOCK&#125;&#125;

# Task

The user has the following task. Read it carefully and identify which skill (if any) most directly applies.

```
{{USER_PROMPT}}
```

# Output

Return ONLY a single JSON object. No prose, no markdown, no code fence.

The JSON object must have exactly these keys:

- `ranking`: an array of skill names, ordered most-to-least relevant. Include only skills you genuinely consider relevant. At least one skill must appear.
- `confidence`: a number between 0.0 and 1.0 describing your confidence in the top choice.
- `rationale`: a single sentence explaining why the top choice is the best match.

Example:

```
{"ranking":["skill-a","skill-b"],"confidence":0.82,"rationale":"The task is about X, which is the core scope of skill-a."}
```
