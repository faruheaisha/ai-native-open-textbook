---
title: "RPI Workflow"
sourceId: "09-harness/claude-code-best-practice"
sourceTitle: "Claude Code Best Practice"
sourceKind: "工程手册"
licenseLabel: "可转载"
lang: "英文"
tier: 1
volume: "09-harness"
sourceUrl: "https://github.com/shanraisshan/claude-code-best-practice"
entryUrl: "https://github.com/shanraisshan/claude-code-best-practice/blob/2d6ea151c0d7189c3eaf364809c5574bd210e545/README.md"
zh: ""
---

# RPI Workflow

**RPI** = **R**esearch → **P**lan → **I**mplement

A systematic development workflow with validation gates at each phase. Prevents wasted effort on non-viable features and ensures comprehensive documentation.

<table width="100%">
<tr>
<td><a href="/lib/09-harness/claude-code-best-practice/overview">← Back to Claude Code Best Practice</a></td>
<td align="right"><img src="/mirror/08/083732f2d17cc173d2ce8cdf174e11bd1ccf34d9.svg" alt="Claude" width="60" /></td>
</tr>
</table>

---

## Overview

![RPI Workflow](/mirror/e4/e4af0515d78127b5aedc949cf5d4fcd4e57a4145.svg)

---

## Installation

Copy the `.claude` folder (containing `agents/` and `commands/rpi/`) to your repository root, then create the `rpi/plans` directory.

---

## Example Workflow

### Feature: User Authentication

**Step 1: Describe**
```
User: "Add OAuth2 authentication with Google and GitHub providers"

1. Claude generates plan
   → Output: rpi/plans/oauth2-authentication.md
2. Create feature folder: rpi/oauth2-authentication/
3. Copy the plan into the feature folder
4. Rename the plan to REQUEST.md
   → Final: rpi/oauth2-authentication/REQUEST.md
```

**Step 2: Research**
```bash
/rpi:research rpi/oauth2-authentication/REQUEST.md
```
Output:
- `research/RESEARCH.md` with analysis
- Verdict: **GO** (feasible, aligned with strategy)

**Step 3: Plan**
```bash
/rpi:plan oauth2-authentication
```
Output:
- `plan/pm.md` - User stories and acceptance criteria
- `plan/ux.md` - Login UI flows
- `plan/eng.md` - Technical architecture
- `plan/PLAN.md` - 3 phases, 15 tasks

**Step 4: Implement**
```bash
/rpi:implement oauth2-authentication
```
Progress:
- Phase 1: Backend Foundation → PASS
- Phase 2: Frontend Integration → PASS
- Phase 3: Testing & Polish → PASS

Result: Feature complete, ready for PR.

---

## Feature Folder Structure

All feature work lives in `rpi/{feature-slug}/`:

```
rpi/{feature-slug}/
├── REQUEST.md              # Step 1: Initial feature description
├── research/
│   └── RESEARCH.md         # Step 2: GO/NO-GO analysis
├── plan/
│   ├── PLAN.md             # Step 3: Implementation roadmap
│   ├── pm.md               # Product requirements
│   ├── ux.md               # UX design
│   └── eng.md              # Technical specification
└── implement/
    └── IMPLEMENT.md        # Step 4: Implementation record
```

---

## Agents and Commands

| Command | Agents Used |
|---------|-------------|
| `/rpi:research` | requirement-parser, product-manager, Explore, senior-software-engineer, technical-cto-advisor, documentation-analyst-writer |
| `/rpi:plan` | senior-software-engineer, product-manager, ux-designer, documentation-analyst-writer |
| `/rpi:implement` | Explore, senior-software-engineer, code-reviewer |
