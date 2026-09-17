---
title: "Claude Code Ultimate Guide"
sourceId: "09-harness/claude-code-ultimate-guide"
sourceTitle: "Claude Code Ultimate Guide"
sourceKind: "工程手册"
licenseLabel: "可转载"
lang: "英文"
tier: 3
volume: "09-harness"
sourceUrl: "https://github.com/FlorianBruniaux/claude-code-ultimate-guide"
entryUrl: "https://github.com/FlorianBruniaux/claude-code-ultimate-guide/blob/af05b84fb6e32432dae2114ee2a72c44ef3d29b1/guide/ultimate-guide.md"
sourceRel: "guide/ultimate-guide.md"
rawUrl: "/raw/09-harness/claude-code-ultimate-guide/guide/ultimate-guide.md"
sourceSha256: "4d290b0171bbaaffd149d5d2e4da964392cb212d7357408df40d8f346f952dbc"
pageSha256: "18ec6570ee5e01bb9abd454efc9be7b14f68514951d6edd5735279652439e8b5"
contentMode: "local-full"
zh: ""
---

#### Task Lists as Diagnostic Tool

**The Diagnostic Principle**: When Claude's task list doesn't match your intent, the problem sits in your instructions, not in Claude.

Task lists act as a **mirror** for instruction clarity. If you ask Claude to plan a feature and the resulting tasks surprise you, that divergence is diagnostic information:

```
Your instruction: "Refactor the auth system"

Claude's task list:
- [ ] Read all auth-related files
- [ ] Identify code duplication
- [ ] Extract shared utilities
- [ ] Update imports
- [ ] Run tests

Your reaction: "That's not what I meant—I wanted to switch from session to JWT"

Diagnosis: Your instruction was ambiguous. "Refactor" ≠ "replace".
```

**Divergence patterns and what they reveal:**

| Divergence Type | What It Means | Fix |
|-----------------|---------------|-----|
| Tasks too broad | Instructions lack specificity | Add WHAT, WHERE, HOW, VERIFY |
| Tasks too narrow | Instructions too detailed, missing big picture | State the goal, not just the steps |
| Wrong priorities | Context missing about what matters | Add constraints and priorities |
| Missing tasks | Implicit knowledge not shared | Make assumptions explicit in prompt |
| Extra tasks | Claude inferred requirements you didn't intend | Add explicit scope boundaries |

**Using task divergence as a workflow:**

```markdown
## Step 1: Seed with loose instruction
User: "Improve the checkout flow"

## Step 2: Review Claude's task list (don't execute yet)
Claude generates: [task list]

## Step 3: Compare against your mental model
- Missing: payment retry logic? → Add to instructions
- Unexpected: UI redesign? → Clarify scope (backend only)
- Wrong order: tests last? → Specify TDD approach

## Step 4: Refine and re-plan
User: "Actually, here's what I need: [refined instruction with specifics]"
```

**Pro tip**: Run `TaskList` after initial planning as a **sanity check** before execution. If more than 30% of tasks surprise you, your prompt needs work. Iterate on the prompt, not the tasks.
