---
title: "The Perceptron Pattern"
sourceId: "07-coding/ai-engineering-from-scratch"
sourceTitle: "AI Engineering from Scratch（英文原版）"
sourceKind: "源码研读"
licenseLabel: "可转载"
lang: "英文"
tier: 2
volume: "07-coding"
sourceUrl: "https://github.com/rohitg00/ai-engineering-from-scratch"
entryUrl: "https://github.com/rohitg00/ai-engineering-from-scratch/blob/d18b8fe5a913c46011a3b06cb6ebd6a924414fd3/phases/03-deep-learning-core/01-the-perceptron/outputs/skill-perceptron.md"
sourceRel: "phases/03-deep-learning-core/01-the-perceptron/outputs/skill-perceptron.md"
rawUrl: "/raw/07-coding/ai-engineering-from-scratch/phases/03-deep-learning-core/01-the-perceptron/outputs/skill-perceptron.md"
sourceSha256: "10373fa02d09ae916b90634499c357614aa152dd6d0c39a33d2916215c081eda"
pageSha256: "10373fa02d09ae916b90634499c357614aa152dd6d0c39a33d2916215c081eda"
contentMode: "local-full"
zh: ""
---

# The Perceptron Pattern

A perceptron computes a weighted sum of inputs plus a bias, then applies a step function to produce a binary output. It is the fundamental unit of neural networks.

```
output = step(w1*x1 + w2*x2 + ... + wn*xn + bias)
```

## When a single perceptron is enough

- The problem is linearly separable: a straight line (or hyperplane) can divide the two classes
- Logic gates: AND, OR, NOT, NAND
- Simple threshold decisions: "is the score above X?"
- Binary classifiers on data that clusters into two non-overlapping regions

## When you need multiple layers

- The problem is not linearly separable: no single line can separate the classes
- XOR and parity problems
- Any task requiring "this but not that" reasoning (combinations of conditions)
- Real-world classification: images, text, audio - almost always non-linear

## Decision checklist

1. Plot or inspect your data. Can you draw a single straight boundary between classes?
   - Yes: single perceptron works
   - No: you need at least two layers
2. Can the problem be decomposed into AND/OR of simpler linear decisions?
   - This decomposition tells you the minimum network structure
   - XOR = (A OR B) AND (NOT (A AND B)) = 3 perceptrons in 2 layers
3. For problems with more than two classes, you need one output node per class

## The training rule

```
error = expected - predicted
weight_new = weight_old + learning_rate * error * input
bias_new = bias_old + learning_rate * error
```

If the prediction is correct, nothing changes. If wrong, weights shift to reduce the error. This only works for single-layer perceptrons. Multi-layer networks require backpropagation.

## Common mistakes

- Trying to learn non-linear patterns with a single perceptron (it will never converge)
- Setting the learning rate too high (weights oscillate) or too low (training takes forever)
- Forgetting the bias term (without it, the decision boundary must pass through the origin)
- Confusing perceptron convergence (guaranteed for linearly separable data) with general neural network convergence (not guaranteed)
