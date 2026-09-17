---
title: "Eval Command"
sourceId: "09-harness/ecc"
sourceTitle: "ECC —— Harness 性能优化系统"
sourceKind: "其他材料"
licenseLabel: "可转载"
lang: "英文"
tier: 3
volume: "09-harness"
sourceUrl: "https://github.com/affaan-m/ECC"
entryUrl: "https://github.com/affaan-m/ECC/blob/928c1dea72f5c330442fc1f595563398b8f389f7/.opencode/commands/eval.md"
sourceRel: ".opencode/commands/eval.md"
rawUrl: "/raw/09-harness/ecc/.opencode/commands/eval.md"
sourceSha256: "b090a6524c94bf3555e86896539675db23107fc790b87a654a646bd1289182ae"
pageSha256: "b090a6524c94bf3555e86896539675db23107fc790b87a654a646bd1289182ae"
contentMode: "local-full"
zh: ""
---

# Eval Command

Evaluate implementation against acceptance criteria: $ARGUMENTS

## Your Task

Run structured evaluation to verify the implementation meets requirements.

## Evaluation Framework

### Grader Types

1. **Binary Grader** - Pass/Fail
   - Does it work? Yes/No
   - Good for: feature completion, bug fixes

2. **Scalar Grader** - Score 0-100
   - How well does it work?
   - Good for: performance, quality metrics

3. **Rubric Grader** - Category scores
   - Multiple dimensions evaluated
   - Good for: comprehensive review

## Evaluation Process

### Step 1: Define Criteria

```
Acceptance Criteria:
1. [Criterion 1] - [weight]
2. [Criterion 2] - [weight]
3. [Criterion 3] - [weight]
```

### Step 2: Run Tests

For each criterion:
- Execute relevant test
- Collect evidence
- Score result

### Step 3: Calculate Score

```
Final Score = Σ (criterion_score × weight) / total_weight
```

### Step 4: Report

## Evaluation Report

### Overall: [PASS/FAIL] (Score: X/100)

### Criterion Breakdown

| Criterion | Score | Weight | Weighted |
|-----------|-------|--------|----------|
| [Criterion 1] | X/10 | 30% | X |
| [Criterion 2] | X/10 | 40% | X |
| [Criterion 3] | X/10 | 30% | X |

### Evidence

**Criterion 1: [Name]**
- Test: [what was tested]
- Result: [outcome]
- Evidence: [screenshot, log, output]

### Recommendations

[If not passing, what needs to change]

## Pass@K Metrics

For non-deterministic evaluations:
- Run K times
- Calculate pass rate
- Report: "Pass@K = X/K"

---

**TIP**: Use eval for acceptance testing before marking features complete.
