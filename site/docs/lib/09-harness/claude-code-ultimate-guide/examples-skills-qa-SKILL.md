---
title: "QA: Web Application Testing"
sourceId: "09-harness/claude-code-ultimate-guide"
sourceTitle: "Claude Code Ultimate Guide"
sourceKind: "工程手册"
licenseLabel: "可转载"
lang: "英文"
tier: 3
volume: "09-harness"
sourceUrl: "https://github.com/FlorianBruniaux/claude-code-ultimate-guide"
entryUrl: "https://github.com/FlorianBruniaux/claude-code-ultimate-guide/blob/af05b84fb6e32432dae2114ee2a72c44ef3d29b1/examples/skills/qa/SKILL.md"
sourceRel: "examples/skills/qa/SKILL.md"
rawUrl: "/raw/09-harness/claude-code-ultimate-guide/examples/skills/qa/SKILL.md"
sourceSha256: "41769703251cd0c575bd0f7c38a17a6f39975b088ca7259fc24c76f10083cb30"
pageSha256: "41769703251cd0c575bd0f7c38a17a6f39975b088ca7259fc24c76f10083cb30"
contentMode: "local-full"
zh: ""
---

# QA: Web Application Testing

Systematically test a web application for bugs, then fix and verify each issue found.

Three tiers of thoroughness. Diff-aware scoping tests what actually changed.

## Instructions

### Step 1: Scope Detection

Determine which pages and features to test.

**Diff-aware mode (default):** Identify affected routes from the current branch changes.

```bash
# Files changed in this branch
git diff --name-only origin/main...HEAD 2>/dev/null || git diff --name-only HEAD~5

# Identify affected routes from changed files
# e.g., changes in src/pages/dashboard/ → test /dashboard
# changes in api/payments/ → test payment flows
```

**Full mode** (`/qa --full`): Test the entire application, starting with critical paths.

**Explicit scope** (`/qa /dashboard /settings`): Test specified pages only.

---

### Step 2: Tier Selection

| Tier | Flag | Scope | Use when |
|------|------|-------|----------|
| Quick | `--quick` | Critical + High severity only | Pre-commit fast check |
| Standard | *(default)* | + Medium severity | Pre-PR review |
| Exhaustive | `--exhaustive` | + Low + cosmetic | Release candidate |

---

### Step 3: Clean Working Tree

Before testing, ensure you can commit fixes atomically.

```bash
git status --short
```

If there are uncommitted changes: stash them first (`git stash`), or commit them. Testing on a dirty tree makes it impossible to isolate fix commits.

---

### Step 4: Testing

For each page in scope, systematically check all categories relevant to the selected tier.

#### How to test

Use whatever browser tooling is available:
- **MCP browser tools** (if configured): automated navigation and screenshots
- **Playwright/Puppeteer** (if in the project): scripted test runs
- **Manual testing**: navigate to the URL, document findings systematically

For each page, cover:

```
1. Load the page: does it render without errors?
2. Check console: any uncaught errors, failed requests, warnings?
3. Test primary user action: the core thing this page is for
4. Test empty state: what shows when there's no data?
5. Test error state: what happens when an action fails?
6. Test on narrow viewport: does it break below 375px?
```

#### Issue taxonomy

**Visual** (layout, spacing, typography, colors, responsiveness)
**Functional** (broken interactions, missing features, wrong behavior)
**UX** (confusing flows, missing feedback, poor error messages)
**Content** (typos, wrong copy, placeholder text in production)
**Performance** (slow page loads, layout shifts, unoptimized images)
**Console** (JavaScript errors, failed network requests, deprecation warnings)
**Accessibility** (missing alt text, keyboard traps, missing labels, contrast)

#### Severity levels

| Severity | Criteria | Examples |
|----------|----------|---------|
| **Critical** | Feature completely broken or data loss risk | 500 error, blank page, form that loses data |
| **High** | Major feature degraded, significant UX harm | Wrong data shown, broken primary CTA, mobile layout broken |
| **Medium** | Minor feature issue, noticeable but workaround exists | Visual glitch, confusing empty state, slow load |
| **Low** | Cosmetic, barely noticeable | Minor spacing, minor copy issue, low-severity console warning |

**Quick tier**: Critical + High only
**Standard tier**: Critical + High + Medium
**Exhaustive tier**: All severities

---

### Step 5: Document Findings

Track each issue with a unique ID.

```
ISSUE-001
  Severity:  [Critical / High / Medium / Low]
  Category:  [Visual / Functional / UX / Content / Performance / Console / Accessibility]
  Page:      [URL or route]
  Finding:   [What is wrong, specific not vague]
  Steps:     [How to reproduce]
  Expected:  [What should happen]
  Evidence:  [Screenshot path or console output]
```

---

### Step 6: Fix and Verify Loop

For each Critical and High issue (and Medium/Low in Standard/Exhaustive tiers):

1. **Fix the issue** in source code
2. **Commit atomically**: one commit per fix

```bash
