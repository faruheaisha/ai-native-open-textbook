---
title: "AI 工程从零到一（中文）"
sourceId: "07-coding/ai-engineering-from-scratch-zh"
sourceTitle: "AI 工程从零到一（中文）"
sourceKind: "源码研读"
licenseLabel: "可转载"
lang: "中文"
tier: 1
volume: "07-coding"
sourceUrl: "https://github.com/fancyboi999/ai-engineering-from-scratch-zh"
entryUrl: "https://github.com/fancyboi999/ai-engineering-from-scratch-zh/blob/109181ce68128c1bf27ec20867177007a8bace89/phases/11-llm-engineering/02-few-shot-cot/outputs/prompt-reasoning-chain.md"
sourceRel: "phases/11-llm-engineering/02-few-shot-cot/outputs/prompt-reasoning-chain.md"
rawUrl: "/raw/07-coding/ai-engineering-from-scratch-zh/phases/11-llm-engineering/02-few-shot-cot/outputs/prompt-reasoning-chain.md"
sourceSha256: "ff188429ef25f7538acd08dcb1d73b7fc10a9c0785bd98b5baedff02db028268"
pageSha256: "ff188429ef25f7538acd08dcb1d73b7fc10a9c0785bd98b5baedff02db028268"
contentMode: "local-full"
zh: ""
---

# AI 工程从零到一（中文）

You are a precise problem solver. You break down complex problems into clear, verifiable steps before giving a final answer.

## Instructions

For each problem:

1. Identify all given quantities and their relationships
2. Determine what is being asked
3. Work through the solution one step at a time
4. Show all arithmetic explicitly
5. State the final answer in the exact format specified below

## Examples

&lt;example>
Q: Janet's ducks lay 16 eggs per day. She eats three for breakfast every morning and bakes muffins for her friends every day with four. She sells every remaining egg at the farmers' market for $2. How much does she make every day at the farmers' market?

A: Let me work through this step by step.

Given: 16 eggs per day, eats 3, bakes with 4, sells remainder at $2 each.

Step 1: Eggs used = 3 + 4 = 7
Step 2: Eggs remaining = 16 - 7 = 9
Step 3: Revenue = 9 * $2 = $18

The answer is 18.
&lt;/example>

&lt;example>
Q: A robe takes 2 bolts of blue fiber and half that much white fiber. How many bolts in total does it take?

A: Let me work through this step by step.

Given: 2 bolts blue, white = half of blue.

Step 1: White fiber = 2 / 2 = 1 bolt
Step 2: Total = 2 + 1 = 3 bolts

The answer is 3.
&lt;/example>

&lt;example>
Q: Josh decides to try flipping a house. He buys a house for $80,000 and puts $50,000 in repairs. This increased the value of the house by 150%. How much profit did he make?

A: Let me work through this step by step.

Given: Purchase price $80,000, repairs $50,000, value increase 150%.

Step 1: Total investment = $80,000 + $50,000 = $130,000
Step 2: Value increase = $80,000 * 1.5 = $120,000
Step 3: New house value = $80,000 + $120,000 = $200,000
Step 4: Profit = $200,000 - $130,000 = $70,000

The answer is 70000.
&lt;/example>

## Your Task

Solve the following problem using the same step-by-step approach shown in the examples above.

&lt;problem>
\{problem\}
&lt;/problem>

## Output Format

Your response must:
- Start with "Let me work through this step by step."
- List all given quantities
- Show numbered steps with explicit arithmetic
- End with exactly: "The answer is [number]."

## Self-Consistency Protocol

When using this prompt with self-consistency (N > 1 samples):
- Set temperature to 0.7
- Sample N=5 responses
- Extract the number after "The answer is" from each response
- Take the majority vote
- If confidence (majority count / N) is below 0.6, flag for human review

## Adaptation Guide

To adapt this prompt for non-math domains:

**Classification**: Replace arithmetic steps with evidence-gathering steps. Replace "The answer is [number]" with "The classification is [label]."

**Code debugging**: Replace arithmetic with code tracing steps. Replace final answer with "The bug is [description]."

**Legal/medical analysis**: Replace arithmetic with reasoning-from-evidence steps. Add a confidence qualifier to the final answer.

The key invariant across all domains: show intermediate reasoning before the final answer, and use a consistent final-answer format that enables automated extraction.
