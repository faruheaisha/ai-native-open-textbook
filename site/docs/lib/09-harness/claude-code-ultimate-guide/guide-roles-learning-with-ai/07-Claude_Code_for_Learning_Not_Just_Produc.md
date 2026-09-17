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
pageSha256: "2e0f8c30083991395961ad8a4597f76167d2e83681e99bd7e6b65c44981fa3d2"
contentMode: "local-full"
zh: ""
---

## Claude Code for Learning (Not Just Producing)

Claude Code has specific features that support learning. Here's how to configure them.

### Start Here: /powerup

Before configuring anything, run `/powerup`. It's a built-in command that walks you through Claude Code's core features via interactive animated lessons, each one short, hands-on, and designed to show rather than tell. Start here if you've never done a structured onboarding of the tool.

### CLAUDE.md Configuration for Learning Mode

Create this in your `CLAUDE.md`:

```markdown
# Learning-First Configuration

## My Learning Goals
- I'm learning: [React hooks, TypeScript, system design, etc.]
- My level: [beginner/intermediate] on these topics
- I learn best when: [examples are shown first, concepts are explained, etc.]

## Response Style
- Always explain WHY, not just WHAT
- After code blocks, ask "What questions do you have about this?"
- Highlight concepts I should understand deeper
- Point out common mistakes beginners make

## Challenges
- Suggest exercises to reinforce concepts after implementing
- Point out edge cases I should consider
- Ask me to predict output before showing it

## When I Ask for Help
1. First ask what I've already tried
2. Guide me toward the answer before giving it
3. Explain the underlying concept, not just the fix
```

Full template: [examples/claude-md/learning-mode.md](/lib/09-harness/claude-code-ultimate-guide/examples-claude-md-learning-mode)

---

### Slash Commands for Learning

| Command | Purpose | When to Use |
|---------|---------|-------------|
| `/explain` | Explain existing code | Built-in: use on any confusing code |
| `/learn:quiz` | Test your understanding | After implementing a new concept |
| `/learn:alternatives` | Show other approaches | When you want to understand trade-offs |
| `/learn:teach <concept>` | Step-by-step explanation | When learning something new |

> **Note**: Commands use the `/learn:` namespace. Place files in `.claude/commands/learn/`.

#### Creating /learn:quiz

Create `.claude/commands/learn/quiz.md`:

```markdown
# Quiz Me

Test my understanding of the code I just wrote or accepted.

## Instructions

1. Look at the last code I worked with
2. Generate 3-5 questions testing:
   - What does this code do?
   - Why was this approach chosen?
   - What would happen if X changed?
   - How would you extend this?
3. Wait for my answers
4. Provide feedback with explanations

$ARGUMENTS (optional: focus area like "error handling" or "performance")
```

Full template: [examples/commands/learn/quiz.md](/lib/09-harness/claude-code-ultimate-guide/examples-commands-learn-quiz)

---

### Hooks That Build Habits

#### Learning Capture Hook (Session End)

Automatically prompts for daily learning capture:

```json
{
  "hooks": {
    "Stop": [{
      "hooks": [{
        "type": "command",
        "command": "$CLAUDE_PROJECT_DIR/.claude/hooks/bash/learning-capture.sh"
      }]
    }]
  }
}
```

---

### The 70/30 Weekly Split

Balance learning and producing:

| Activity | Time | AI Usage | Why |
|----------|------|----------|-----|
| **Core learning** (new concepts) | 70% | 30% AI | Struggle builds understanding |
| **Practice/projects** (applying known skills) | 30% | 70% AI | Apply what you already know |

> **Research basis**: This ratio aligns with [productivity research](#the-reality-of-ai-productivity) showing AI delivers highest gains on well-defined tasks (practice/projects) while learning new concepts requires cognitive struggle that AI can't shortcut.

#### Week Structure Example

```
Monday:    Learn new React pattern     (minimal AI)
Tuesday:   Learn new React pattern     (minimal AI)
Wednesday: Apply to project            (full AI assistance)
Thursday:  Learn testing approach      (minimal AI)
Friday:    Apply + ship                (full AI assistance)
```

Don't use AI heavily when learning NEW concepts. Use it heavily when applying concepts you already understand.
