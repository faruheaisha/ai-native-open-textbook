---
title: "Direct Score Tool"
sourceId: "10-context-memory/agent-skills-for-context-engineering"
sourceTitle: "Agent Skills for Context Engineering"
sourceKind: "技能与配置库"
licenseLabel: "可转载"
lang: "英文"
tier: 3
volume: "10-context-memory"
sourceUrl: "https://github.com/muratcankoylan/Agent-Skills-for-Context-Engineering"
entryUrl: "https://github.com/muratcankoylan/Agent-Skills-for-Context-Engineering/blob/6dbe1a1d868eab51a3bc9011b0f55e2891513e40/examples/llm-as-judge-skills/tools/evaluation/direct-score.md"
sourceRel: "examples/llm-as-judge-skills/tools/evaluation/direct-score.md"
rawUrl: "/raw/10-context-memory/agent-skills-for-context-engineering/examples/llm-as-judge-skills/tools/evaluation/direct-score.md"
sourceSha256: "84b7840e3f430c3f3f48045c3af1110f7da839bcac6d70f45bee48537fcab8fe"
pageSha256: "84b7840e3f430c3f3f48045c3af1110f7da839bcac6d70f45bee48537fcab8fe"
contentMode: "local-full"
zh: ""
---

# Direct Score Tool

## Purpose

Evaluate a single LLM response against defined criteria using a scoring rubric.

## Tool Definition

```typescript
import { tool } from "ai";
import { z } from "zod";

export const directScore = tool({
  description: `Evaluate a response by scoring it against specific criteria.
Use this for objective evaluations where you need to assess quality 
dimensions like accuracy, completeness, clarity, or task adherence.
Returns structured scores with justifications.`,

  parameters: z.object({
    response: z.string()
      .describe("The LLM response to evaluate"),
    
    prompt: z.string()
      .describe("The original prompt/instruction that generated the response"),
    
    context: z.string().optional()
      .describe("Additional context like retrieved documents or conversation history"),
    
    criteria: z.array(z.object({
      name: z.string().describe("Name of the criterion (e.g., 'Accuracy')"),
      description: z.string().describe("What this criterion measures"),
      weight: z.number().min(0).max(1).default(1)
        .describe("Relative importance, weights should sum to 1")
    })).min(1).describe("Evaluation criteria to score against"),
    
    rubric: z.object({
      scale: z.enum(["1-3", "1-5", "1-10"]).default("1-5"),
      levelDescriptions: z.record(z.string(), z.string()).optional()
        .describe("Optional descriptions for each score level")
    }).optional().describe("Scoring rubric configuration")
  }),

  execute: async (input) => {
    // Implementation delegates to evaluator LLM
    return evaluateWithLLM(input);
  }
});
```

## Input Schema

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| response | string | Yes | The response being evaluated |
| prompt | string | Yes | Original prompt that generated the response |
| context | string | No | Additional context (RAG docs, history) |
| criteria | Criterion[] | Yes | List of evaluation criteria |
| rubric | Rubric | No | Scoring scale and level descriptions |

### Criterion Object
```typescript
{
  name: string;        // e.g., "Factual Accuracy"
  description: string; // e.g., "Response contains no factual errors"
  weight: number;      // 0-1, relative importance
}
```

### Rubric Object
```typescript
{
  scale: "1-3" | "1-5" | "1-10";
  levelDescriptions?: {
    "1": "Poor - Major issues",
    "2": "Below Average - Several issues",
    "3": "Average - Some issues",
    "4": "Good - Minor issues",
    "5": "Excellent - No issues"
  }
}
```

## Output Schema

```typescript
interface DirectScoreResult {
  success: boolean;
  
  scores: {
    criterion: string;
    score: number;
    maxScore: number;
    justification: string;
    examples: string[];  // Specific examples from response
  }[];
  
  overallScore: number;
  weightedScore: number;
  
  summary: {
    strengths: string[];
    weaknesses: string[];
    suggestions: string[];
  };
  
  metadata: {
    evaluationTimeMs: number;
    criteriaCount: number;
    rubricScale: string;
  };
}
```

## Usage Example

```typescript
const result = await directScore.execute({
  response: "Machine learning is a subset of AI that enables systems to learn from data...",
  
  prompt: "Explain machine learning to a beginner",
  
  criteria: [
    {
      name: "Accuracy",
      description: "Technical correctness of explanations",
      weight: 0.4
    },
    {
      name: "Clarity",
      description: "Understandable for a beginner",
      weight: 0.3
    },
    {
      name: "Completeness",
      description: "Covers key concepts adequately",
      weight: 0.3
    }
  ],
  
  rubric: {
    scale: "1-5",
    levelDescriptions: {
      "1": "Completely fails criterion",
      "2": "Major deficiencies",
      "3": "Acceptable but improvable",
      "4": "Good with minor issues",
      "5": "Excellent, no issues"
    }
  }
});
```

## Implementation Notes

1. **Chain-of-Thought**: Implementation should use CoT prompting for more reliable scoring
2. **Calibration**: Include few-shot examples of scores at each level
3. **Justification First**: Ask for justification before score to reduce bias
4. **Length Normalization**: Consider response length when appropriate
