---
title: "Regression Strategy Guide"
sourceId: "07-coding/ai-engineering-from-scratch"
sourceTitle: "AI Engineering from Scratch（英文原版）"
sourceKind: "源码研读"
licenseLabel: "可转载"
lang: "英文"
tier: 2
volume: "07-coding"
sourceUrl: "https://github.com/rohitg00/ai-engineering-from-scratch"
entryUrl: "https://github.com/rohitg00/ai-engineering-from-scratch/blob/d18b8fe5a913c46011a3b06cb6ebd6a924414fd3/phases/02-ml-fundamentals/02-linear-regression/outputs/skill-regression.md"
sourceRel: "phases/02-ml-fundamentals/02-linear-regression/outputs/skill-regression.md"
rawUrl: "/raw/07-coding/ai-engineering-from-scratch/phases/02-ml-fundamentals/02-linear-regression/outputs/skill-regression.md"
sourceSha256: "da4c7c99052e23a2642a4b38d355918ac270c464350baf82651c6a8e4b93d378"
pageSha256: "da4c7c99052e23a2642a4b38d355918ac270c464350baf82651c6a8e4b93d378"
contentMode: "local-full"
zh: ""
---

# Regression Strategy Guide

Regression predicts continuous values. The right approach depends on the relationship between features and target, the number of features, and the risk of overfitting.

## Decision Checklist

1. Is the relationship between features and target approximately linear?
   - Yes: start with ordinary linear regression
   - No: try polynomial features or a nonlinear model

2. How many features do you have relative to samples?
   - Few features, many samples: ordinary linear regression works fine
   - Many features, few samples: use regularization (Ridge or Lasso)
   - More features than samples: Lasso (L1) to select features, or Ridge (L2) to shrink all weights

3. Do you need interpretability?
   - Yes: linear regression with few features, or Lasso for automatic feature selection
   - No: polynomial features, or move to tree-based models or neural networks

4. Is your dataset small (under 10,000 rows)?
   - Use the normal equation (closed-form solution) for speed
   - Cross-validation is essential for reliable evaluation

5. Is your dataset large (millions of rows)?
   - Use stochastic gradient descent (SGD) or mini-batch gradient descent
   - The normal equation is too slow due to O(n^3) matrix inversion

## When to use each approach

**Ordinary Linear Regression**: baseline for any regression task. Start here. If R-squared is acceptable and the model is simple, stop here.

**Polynomial Regression**: the scatter plot shows a curve, not a line. Start with degree 2. Increase only if justified by validation performance. Degree > 5 almost always overfits.

**Ridge Regression (L2)**: many correlated features. All weights shrink toward zero but none become exactly zero. Good when you believe all features contribute.

**Lasso Regression (L1)**: many features and you suspect only a few matter. Lasso drives irrelevant feature weights to exactly zero, performing automatic feature selection.

**Elastic Net**: combines L1 and L2 penalties. Use when you have many correlated features and want some feature selection.

## Common mistakes

- Skipping feature scaling before gradient descent (convergence becomes extremely slow)
- Using test set performance to tune hyperparameters (use validation set or cross-validation)
- Fitting high-degree polynomials without checking validation error (training R^2 always increases with degree)
- Ignoring residual plots (R^2 can be misleading if residuals show patterns)
- Treating R^2 as the only metric (check residual distribution, MAE, and domain-specific thresholds)

## Quick reference

| Method | When to use | Regularization | Feature selection |
|--------|------------|---------------|-------------------|
| OLS | Baseline, few features | None | Manual |
| Ridge | Many features, all relevant | L2 (shrink) | No |
| Lasso | Many features, few relevant | L1 (zero out) | Automatic |
| Elastic Net | Many correlated features | L1 + L2 | Partial |
| Polynomial | Nonlinear relationship | Add Ridge/Lasso on top | Manual degree choice |
