---
title: "Visual Regression Testing"
sourceId: "09-harness/claude-code-guide-zebbern"
sourceTitle: "Claude Code Guide（zebbern）"
sourceKind: "工程手册"
licenseLabel: "可转载"
lang: "英文"
tier: 3
volume: "09-harness"
sourceUrl: "https://github.com/zebbern/claude-code-guide"
entryUrl: "https://github.com/zebbern/claude-code-guide/blob/64c890fe74c3ccfad673dc9c71dc85b8dd2f4817/skills/playwright/core/visual-regression.md"
sourceRel: "skills/playwright/core/visual-regression.md"
rawUrl: "/raw/09-harness/claude-code-guide-zebbern/skills/playwright/core/visual-regression.md"
sourceSha256: "820d87161c59d4bf2283a8402d79c6420516faf5ff5ad482670301e492828600"
pageSha256: "820d87161c59d4bf2283a8402d79c6420516faf5ff5ad482670301e492828600"
contentMode: "local-full"
zh: ""
---

# Visual Regression Testing

> **When to use**: Catching unintended visual changes -- layout shifts, style regressions, broken responsive designs, theme corruption -- that functional assertions miss. Visual tests answer "does it still look right?" after code changes.
> **Prerequisites**: [core/configuration.md](/lib/09-harness/claude-code-guide-zebbern/skills-playwright-core-configuration) for project setup, [core/assertions-and-waiting.md](/lib/09-harness/claude-code-guide-zebbern/skills-playwright-core-assertions-and-waiting) for assertion basics.

## Quick Reference

```typescript
// Page screenshot -- compare entire viewport
await expect(page).toHaveScreenshot();

// Element screenshot -- compare a specific component
await expect(page.getByTestId('pricing-card')).toHaveScreenshot();

// Named snapshot -- explicit file name
await expect(page).toHaveScreenshot('homepage-hero.png');

// With threshold -- allow minor pixel differences
await expect(page).toHaveScreenshot({ maxDiffPixelRatio: 0.01 });

// Mask dynamic content -- hide timestamps, avatars, ads
await expect(page).toHaveScreenshot({
  mask: [page.getByTestId('timestamp'), page.getByRole('img', { name: 'Avatar' })],
});

// Disable animations -- prevent flaky diffs from CSS transitions
await expect(page).toHaveScreenshot({ animations: 'disabled' });

// Update baselines (CLI)
npx playwright test --update-snapshots
```

## Patterns

### 1. Screenshot Comparison Basics

**Use when**: Verifying that a page or component renders correctly after code changes. Best for pages with stable layouts -- landing pages, dashboards, settings panels.
**Avoid when**: The page is highly dynamic with real-time data, live feeds, or content that changes on every load. Use functional assertions instead.

Playwright compares a screenshot taken during the test against a stored baseline (golden) image. On first run, the baseline is created. On subsequent runs, differences cause the test to fail with a visual diff report.

**TypeScript**

```typescript
import { test, expect } from "@playwright/test"

test("homepage renders correctly", async ({ page }) => {
  await page.goto("/")

  // Full page screenshot comparison
  await expect(page).toHaveScreenshot("homepage.png")
})

test("pricing card matches design", async ({ page }) => {
  await page.goto("/pricing")

  // Element-level screenshot -- scoped to a single component
  const card = page.getByTestId("pro-plan-card")
  await expect(card).toHaveScreenshot("pro-plan-card.png")
})
```

**JavaScript**

```javascript
const { test, expect } = require("@playwright/test")

test("homepage renders correctly", async ({ page }) => {
  await page.goto("/")

  await expect(page).toHaveScreenshot("homepage.png")
})

test("pricing card matches design", async ({ page }) => {
  await page.goto("/pricing")

  const card = page.getByTestId("pro-plan-card")
  await expect(card).toHaveScreenshot("pro-plan-card.png")
})
```
