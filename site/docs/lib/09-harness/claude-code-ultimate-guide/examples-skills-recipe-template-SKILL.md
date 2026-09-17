---
title: "Recipe Command Template"
sourceId: "09-harness/claude-code-ultimate-guide"
sourceTitle: "Claude Code Ultimate Guide"
sourceKind: "工程手册"
licenseLabel: "可转载"
lang: "英文"
tier: 3
volume: "09-harness"
sourceUrl: "https://github.com/FlorianBruniaux/claude-code-ultimate-guide"
entryUrl: "https://github.com/FlorianBruniaux/claude-code-ultimate-guide/blob/af05b84fb6e32432dae2114ee2a72c44ef3d29b1/examples/skills/recipe-template/SKILL.md"
sourceRel: "examples/skills/recipe-template/SKILL.md"
rawUrl: "/raw/09-harness/claude-code-ultimate-guide/examples/skills/recipe-template/SKILL.md"
sourceSha256: "087e1cec3f488b7a7003e41c50364af2fad52892b70f931375dc98de3309dedf"
pageSha256: "087e1cec3f488b7a7003e41c50364af2fad52892b70f931375dc98de3309dedf"
contentMode: "local-full"
zh: ""
---

# Recipe Command Template

> This is a template. Replace all `[placeholder]` content with your specifics.

## When to Use

- [Describe the exact situation where this command applies]
- [Describe when NOT to use it, with a common misuse case]

## Context Validation Checkpoints

Before executing any step, verify all of these are true. If any checkpoint fails, stop and explain why to the user.

* [ ] [Precondition 1: e.g., "The target branch exists and is up to date with main"]
* [ ] [Precondition 2: e.g., "No uncommitted changes in the affected files"]
* [ ] [Precondition 3: e.g., "Required config file exists at path X"]
* [ ] [Precondition 4: e.g., "Necessary permissions or credentials are available"]

## Recipe Steps

### Step 1: [Action name]

[Clear instructions for this step. Be specific about what to read, what to check, what to write.]

Validation: [How Claude verifies this step completed correctly before moving to Step 2]

---

### Step 2: [Action name]

[Instructions]

Validation: [How to verify]

---

### Step 3: [Action name]

[Instructions]

Validation: [How to verify]

---

### Step 4: Confirm Completion

Summarize what was done:
- [Item 1 completed]
- [Item 2 completed]
- Files modified: [list]
- Next action for the user (if any): [instruction]

## Error Handling

| Situation | Response |
|-----------|----------|
| [Error condition 1] | [What to do: retry / stop / ask user] |
| [Error condition 2] | [What to do] |
| Precondition checkpoint fails | Stop. Explain which checkpoint failed and what the user needs to fix before re-running |

## Arguments

If `$ARGUMENTS[0]` was provided: [how to use it]
If no argument was provided: [default behavior]

---

> The "Context Validation Checkpoints" section is the key pattern from this template.
> It forces Claude to verify preconditions explicitly rather than discovering failures mid-execution.
> Inspired by recurring patterns in [Packmind commands](https://github.com/packmind/packmind) (Apache 2.0).
