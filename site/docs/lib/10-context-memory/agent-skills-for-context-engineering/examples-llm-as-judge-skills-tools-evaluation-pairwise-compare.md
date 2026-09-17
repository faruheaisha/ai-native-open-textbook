---
title: "Pairwise Compare Tool"
sourceId: "10-context-memory/agent-skills-for-context-engineering"
sourceTitle: "Agent Skills for Context Engineering"
sourceKind: "技能与配置库"
licenseLabel: "可转载"
lang: "英文"
tier: 3
volume: "10-context-memory"
sourceUrl: "https://github.com/muratcankoylan/Agent-Skills-for-Context-Engineering"
entryUrl: "https://github.com/muratcankoylan/Agent-Skills-for-Context-Engineering/blob/6dbe1a1d868eab51a3bc9011b0f55e2891513e40/examples/llm-as-judge-skills/tools/evaluation/pairwise-compare.md"
sourceRel: "examples/llm-as-judge-skills/tools/evaluation/pairwise-compare.md"
rawUrl: "/raw/10-context-memory/agent-skills-for-context-engineering/examples/llm-as-judge-skills/tools/evaluation/pairwise-compare.md"
sourceSha256: "f4db2d962de3065474b944927de5d5550d03613e6ee3273a2234b367eb6659e1"
pageSha256: "f4db2d962de3065474b944927de5d5550d03613e6ee3273a2234b367eb6659e1"
contentMode: "local-full"
zh: ""
---

# Pairwise Compare Tool

## Purpose

Compare two LLM responses and determine which one better satisfies the given criteria. More reliable for subjective evaluations than direct scoring.

## Tool Definition

```typescript
import { tool } from "ai";
import { z } from "zod";

export const pairwiseCompare = tool({
  description: `Compare two responses and select the better one.
Use for subjective evaluations like tone, persuasiveness, or writing style.
More reliable than direct scoring for preferences.
Returns winner selection with detailed comparison.`,

  parameters: z.object({
    responseA: z.string()
      .describe("First response to compare"),
    
    responseB: z.string()
      .describe("Second response to compare"),
    
    prompt: z.string()
      .describe("The original prompt both responses address"),
    
    context: z.string().optional()
      .describe("Additional context if relevant"),
    
    criteria: z.array(z.string())
      .describe("Aspects to compare on, e.g., ['clarity', 'engagement', 'accuracy']"),
    
    allowTie: z.boolean().default(true)
      .describe("Whether to allow a tie verdict"),
    
    swapPositions: z.boolean().default(true)
      .describe("Evaluate twice with positions swapped to reduce position bias")
  }),

  execute: async (input) => {
    if (input.swapPositions) {
      return evaluateWithPositionSwap(input);
    }
    return evaluatePairwise(input);
  }
});
```

## Input Schema

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| responseA | string | Yes | First response |
| responseB | string | Yes | Second response |
| prompt | string | Yes | Original prompt |
| context | string | No | Additional context |
| criteria | string[] | Yes | Comparison dimensions |
| allowTie | boolean | No | Allow tie verdict (default: true) |
| swapPositions | boolean | No | Swap positions to reduce bias (default: true) |

## Output Schema

```typescript
interface PairwiseCompareResult {
  success: boolean;
  
  winner: "A" | "B" | "TIE";
  confidence: number; // 0-1
  
  comparison: {
    criterion: string;
    winner: "A" | "B" | "TIE";
    reasoning: string;
    aStrength: string;
    bStrength: string;
  }[];
  
  overallReasoning: string;
  
  differentiators: {
    aAdvantages: string[];
    bAdvantages: string[];
  };
  
  // If swapPositions was true
  positionConsistency?: {
    firstPassWinner: "A" | "B" | "TIE";
    secondPassWinner: "A" | "B" | "TIE";
    consistent: boolean;
  };
  
  metadata: {
    evaluationTimeMs: number;
    positionsSwapped: boolean;
  };
}
```

## Usage Example

```typescript
const result = await pairwiseCompare.execute({
  responseA: "Exercise improves cardiovascular health, builds muscle, and boosts mental wellbeing...",
  
  responseB: "Working out regularly has many benefits. You'll feel better and look better...",
  
  prompt: "Explain the benefits of regular exercise",
  
  criteria: ["accuracy", "specificity", "engagement", "completeness"],
  
  allowTie: true,
  swapPositions: true
});

// Result:
// {
//   winner: "A",
//   confidence: 0.85,
//   comparison: [
//     {
//       criterion: "accuracy",
//       winner: "A",
//       reasoning: "Response A uses specific medical terminology...",
//       aStrength: "Mentions cardiovascular, muscle, mental health",
//       bStrength: "General but not incorrect"
//     },
//     ...
//   ],
//   ...
// }
```

## Position Swap Algorithm

To mitigate position bias:

```typescript
async function evaluateWithPositionSwap(input) {
  // First pass: Original order
  const pass1 = await evaluate({
    first: input.responseA,
    second: input.responseB,
    ...input
  });
  
  // Second pass: Swapped order
  const pass2 = await evaluate({
    first: input.responseB,
    second: input.responseA,
    ...input
  });
  
  // Reconcile results
  const pass2Adjusted = pass2.winner === "A" ? "B" : pass2.winner === "B" ? "A" : "TIE";
  
  if (pass1.winner === pass2Adjusted) {
    return {
      ...pass1,
      positionConsistency: { consistent: true, ... }
    };
  } else {
    // Inconsistent - return tie or lower confidence
    return {
      winner: "TIE",
      confidence: 0.5,
      positionConsistency: { consistent: false, ... },
      ...
    };
  }
}
```

## Implementation Notes

1. **Position Bias Mitigation**: Always use `swapPositions: true` for production
2. **Criteria Order**: Order criteria by importance for better focus
3. **Tie Handling**: Consider domain - some tasks should rarely tie
4. **Confidence Calibration**: Lower confidence when evaluations are close
5. **Length Considerations**: Note if one response is significantly longer
