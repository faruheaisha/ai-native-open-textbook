---
title: "Database Branch Setup with Worktrees"
sourceId: "09-harness/claude-code-ultimate-guide"
sourceTitle: "Claude Code Ultimate Guide"
sourceKind: "工程手册"
licenseLabel: "可转载"
lang: "英文"
tier: 3
volume: "09-harness"
sourceUrl: "https://github.com/FlorianBruniaux/claude-code-ultimate-guide"
entryUrl: "https://github.com/FlorianBruniaux/claude-code-ultimate-guide/blob/af05b84fb6e32432dae2114ee2a72c44ef3d29b1/examples/workflows/database-branch-setup.md"
sourceRel: "examples/workflows/database-branch-setup.md"
rawUrl: "/raw/09-harness/claude-code-ultimate-guide/examples/workflows/database-branch-setup.md"
sourceSha256: "c1741da3c2cea3e04d8f92f64ca959ce566eefb9045f929ac1ded82de7f661fb"
pageSha256: "c1741da3c2cea3e04d8f92f64ca959ce566eefb9045f929ac1ded82de7f661fb"
contentMode: "local-full"
zh: ""
---

# Database Branch Setup with Worktrees

Complete guide for isolated feature development with database branches.

**Source**: Inspired by [Neon database branching](https://neon.com/docs/introduction/branching) and [PlanetScale branching workflows](https://planetscale.com/docs/concepts/branching).

---

## TL;DR (90% Use Case)

**Using Neon:**
```bash
/git-worktree feature/auth
cd .worktrees/feature-auth
neonctl branches create --name feature-auth --parent main
# Copy DATABASE_URL from output to .env
pnpm prisma migrate dev
```

Done. Skip to [workflow examples](#workflow-examples).

---

## Provider Setup

### Neon (Recommended)

**Install CLI:**
```bash
npm install -g neonctl
neonctl auth
```

**Create branch:**
```bash
