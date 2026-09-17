---
title: "Skeleton Projects Workflow"
sourceId: "09-harness/claude-code-ultimate-guide"
sourceTitle: "Claude Code Ultimate Guide"
sourceKind: "工程手册"
licenseLabel: "可转载"
lang: "英文"
tier: 3
volume: "09-harness"
sourceUrl: "https://github.com/FlorianBruniaux/claude-code-ultimate-guide"
entryUrl: "https://github.com/FlorianBruniaux/claude-code-ultimate-guide/blob/af05b84fb6e32432dae2114ee2a72c44ef3d29b1/guide/workflows/skeleton-projects.md"
sourceRel: "guide/workflows/skeleton-projects.md"
rawUrl: "/raw/09-harness/claude-code-ultimate-guide/guide/workflows/skeleton-projects.md"
sourceSha256: "bcad44c663616aa8e3581332b9b780ee12ab7bcf67b885d00672227b4fffd0a3"
pageSha256: "bcad44c663616aa8e3581332b9b780ee12ab7bcf67b885d00672227b4fffd0a3"
contentMode: "local-full"
zh: ""
---

# Skeleton Projects Workflow

Use existing, battle-tested repositories as scaffolding for new projects instead of starting from scratch.

---

## When to Use

- **Starting a new project** with known technology stack
- **Standardizing team patterns** across multiple services
- **Rapid prototyping** where architecture decisions are already made
- **Onboarding** new team members via a working reference

**Don't use when**: Exploring unknown tech (use [Vibe Coding](#98-vibe-coding-skeleton-projects) instead), or when requirements are too unique for existing templates.

---

## Prerequisites

- Claude Code installed and configured
- Git access to reference repositories
- Clear understanding of target project requirements

---

## Step-by-Step Guide

### Phase 1: Find and Evaluate a Skeleton

Don't build from zero. Find an existing repo that matches your target architecture.

**Step 1: Search for candidates**

```bash
# Ask Claude to help find reference repos
claude -p "I need a skeleton for a Next.js 15 app with:
- App Router
- Prisma ORM with PostgreSQL
- tRPC for type-safe API
- Tailwind CSS
- Jest + Playwright testing

Search GitHub for well-maintained starter templates.
Evaluate the top 3 by: last commit date, stars, dependency freshness, test coverage."
```

**Step 2: Clone and audit**

```bash
