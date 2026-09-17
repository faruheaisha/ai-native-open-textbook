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
entryUrl: "https://github.com/FlorianBruniaux/claude-code-ultimate-guide/blob/af05b84fb6e32432dae2114ee2a72c44ef3d29b1/guide/roles/learning-with-ai.md"
sourceRel: "guide/roles/learning-with-ai.md"
rawUrl: "/raw/09-harness/claude-code-ultimate-guide/guide/roles/learning-with-ai.md"
sourceSha256: "f144ce919ab10175ad88e2e4af32f82ce38d56016db54ccd80218ed6a8a073df"
pageSha256: "c54c1f5dbcf7c299428d90f5ef0241283084324e51be91908e06e4b90d031c4b"
contentMode: "local-full"
zh: ""
---

## The UVAL Protocol

A systematic approach to using AI without losing your edge.

### Overview

| Step | Action | Why It Matters |
|------|--------|----------------|
| **U** | Understand First | Ask better questions, catch wrong answers |
| **V** | Verify | Ensure you actually learned, not just copied |
| **A** | Apply | Transform knowledge into skill through modification |
| **L** | Learn | Capture insights for long-term retention |

For the reasoning behind naming this a protocol rather than a habit, see [the UVAL protocol and the comprehension debt it prevents](https://www.florian.bruniaux.com/blog/articles/uval-protocol-comprehension-debt/).

---

### U: Understand First (The 15-Minute Rule)

**Not just "think for 15 minutes"**, a specific protocol:

#### Step 1: State the Problem (2 min)

Write the problem in ONE sentence. If you can't, you don't understand it yet.

```
❌ "The code doesn't work"
✅ "The login form doesn't show validation errors when email is empty"
```

#### Step 2: Brainstorm Approaches (5 min)

List 3 possible approaches, even if you're not sure they'll work:

```
1. Add client-side validation with JavaScript
2. Use HTML5 required attribute
3. Add server-side validation and return errors
```

This forces you to think before asking AI.

#### Step 2.5: Recognize Fatigue Signals (30 sec)

Before moving forward, pause and assess your cognitive state:

- **Session duration**: Been working >30 min? → Take a 5-min break, consider `/clear` to reset context
- **Retry count**: Tried the same prompt 3+ times with inconsistent results? → Switch to manual implementation
- **Frustration level**: Feeling anxious about unpredictable AI responses? → This is "AI fatigue" (nondeterminism stress), not your fault: it's the tool's inherent variability

This checkpoint prevents compounding exhaustion from extended sessions with diminishing returns.

#### Step 3: Identify Knowledge Gaps (3 min)

What specifically do you NOT know?

```
- I know I need validation, but I don't know how to display inline errors in React
- I've never used Zod before but it keeps coming up
```

#### Step 4: THEN Ask AI (5 min)

Now your question is 10x better:

```
❌ "How do I add validation?"
✅ "I'm building a React login form. I want to:
   1. Validate email format client-side
   2. Show inline error messages below the input
   3. Use Zod for schema validation

   I've tried using the HTML required attribute but need custom error messages.
   What's the idiomatic React approach?"
```

Better questions → Better answers → Faster learning.

#### Claude Code Implementation

Add to your `CLAUDE.md`:

```markdown
## Learning Mode
Before generating code for me, ask:
1. What approaches have I already considered?
2. What specifically am I stuck on?
3. What do I expect the solution to look like?

If I skip these, remind me to think first.
```

---

### V: Verify (Explain It Back)

**The rule**: If you can't explain the code to a colleague, you haven't learned it.

#### The Rubber Duck Protocol

After AI generates code:

1. Read every line out loud
2. Explain what each part does
3. Explain WHY it's done this way (not just what)
4. Identify parts you don't understand
5. Ask AI to explain those specific parts

#### Example

AI generates:
```typescript
const schema = z.object({
  email: z.string().email(),
  password: z.string().min(8)
}).refine(data => data.password !== data.email, {
  message: "Password cannot be email",
  path: ["password"]
});
```

Your explanation:
- Line 1: Creates a Zod schema object
- Lines 2-3: Validates email format and password length
- Lines 4-6: Adds custom validation... **wait, what does `refine` do?**

→ Now ask AI specifically about `refine` instead of just copying the whole thing.

#### Claude Code Implementation

Create a custom slash command `/explain-back`:

```markdown
# Explain Back

After I accept generated code, help me verify understanding.

## Instructions

1. Show the code I just accepted
2. Ask me to explain what each major section does
3. Correct any misunderstandings
4. If I can't explain it, break it down further

## Example Prompt

"You just accepted this code. Can you explain:
1. What problem does it solve?
2. Why was this approach chosen?
3. What would break if we removed line X?"
```

See [/learn:quiz command](/lib/09-harness/claude-code-ultimate-guide/examples-commands-learn-quiz) for a more comprehensive version.

---

### A: Apply (Transform, Don't Copy)

**The rule**: Never copy-paste AI code directly. Always modify something.

#### Why This Works

Modification forces engagement. Even small changes require understanding:

| Action | Cognitive Load | Learning |
|--------|---------------|----------|
| Copy-paste | Zero | Zero |
| Rename variables | Low | Some |
| Add edge case | Medium | Good |
| Refactor structure | High | Excellent |

#### Minimum Viable Modifications

Always do at least ONE:

1. **Rename**: Change variable names to match your project conventions
2. **Restructure**: Extract a helper function, change iteration method
3. **Extend**: Add an edge case, validation, or error handling
4. **Simplify**: Remove features you don't need

#### Example

AI gives you:
```javascript
function calculateTotal(items) {
  return items.reduce((sum, item) => sum + item.price * item.quantity, 0);
}
```

You transform it:
```javascript
// Added: explicit type checking, edge case handling
function calculateCartTotal(cartItems) {
  if (!Array.isArray(cartItems) || cartItems.length === 0) {
    return 0;
  }
  return cartItems.reduce((total, item) => {
    const itemPrice = Number(item.price) || 0;
    const itemQty = Number(item.quantity) || 0;
    return total + itemPrice * itemQty;
  }, 0);
}
```

Now you've engaged with the code, added your own thinking, and learned something.

---

### L: Learn (Capture the Insight)

**Not a daily journal**: nobody maintains those. Instead: automated capture.

#### The One-Thing Rule

At the end of each coding session, capture ONE thing you learned. Not ten. One.

```markdown
## 2026-01-17
**Learned**: Zod's `refine()` method for cross-field validation
**Context**: Login form needed password ≠ email check
**Future me**: Use refine() when validation involves multiple fields
```

#### Claude Code Implementation

Create a session-end hook:

```bash
# .claude/hooks/bash/learning-capture.sh
# Prompts for one learning at session end
```

See [examples/hooks/bash/learning-capture.sh](https://github.com/FlorianBruniaux/claude-code-ultimate-guide/blob/af05b84fb6e32432dae2114ee2a72c44ef3d29b1/examples/hooks/bash/learning-capture.sh) for implementation.

The hook asks: "What's ONE thing you learned this session?" and logs it automatically.
