---
title: "Autoresearch: Autonomous Improvement Loop"
sourceId: "09-harness/claude-code-ultimate-guide"
sourceTitle: "Claude Code Ultimate Guide"
sourceKind: "工程手册"
licenseLabel: "可转载"
lang: "英文"
tier: 3
volume: "09-harness"
sourceUrl: "https://github.com/FlorianBruniaux/claude-code-ultimate-guide"
entryUrl: "https://github.com/FlorianBruniaux/claude-code-ultimate-guide/blob/af05b84fb6e32432dae2114ee2a72c44ef3d29b1/examples/skills/autoresearch/SKILL.md"
sourceRel: "examples/skills/autoresearch/SKILL.md"
rawUrl: "/raw/09-harness/claude-code-ultimate-guide/examples/skills/autoresearch/SKILL.md"
sourceSha256: "32ab5e35696fd19bbfeac6e8856f4b1b82308f07211d9e7ceab05acd7e59550b"
pageSha256: "32ab5e35696fd19bbfeac6e8856f4b1b82308f07211d9e7ceab05acd7e59550b"
contentMode: "local-full"
zh: ""
---

# Autoresearch: Autonomous Improvement Loop

Scan codebase quality metrics, propose improvement loops, and run autonomous agent iterations. Inspired by [karpathy/autoresearch](https://github.com/karpathy/autoresearch), adapted from ML research to code quality.

**Concept**: The agent proposes a code change, runs the measurement, keeps the change if the metric improved, reverts via `git reset` if not, and repeats until manually stopped.

**Time**: Scan ~30s | Per iteration: depends on scope | Loop: runs indefinitely until you stop it

---

## Mode 1: Scan (default)

Measure current state, detect existing loops, propose next actions.

### Instructions

Run the following metrics and display a prioritized proposal table.

**Step 1: Measure codebase metrics**

Adapt grep patterns to your project's conventions. These are TypeScript defaults, adjust for your stack.

```bash
# M1: Function declarations (prefer arrow functions)
M1=$(grep -r "export function " src/ --include="*.ts" --include="*.tsx" -l 2>/dev/null | wc -l | tr -d ' ')

# M2: Interface declarations (prefer type aliases)
M2=$(grep -r "export interface " src/ --include="*.ts" --include="*.tsx" -l 2>/dev/null | wc -l | tr -d ' ')

# M3: ESLint disables
M3=$(grep -r "eslint-disable" src/ --include="*.ts" --include="*.tsx" -l 2>/dev/null | wc -l | tr -d ' ')

# M4: Type casts to any
M4=$(grep -r " as any" src/ --include="*.ts" --include="*.tsx" -l 2>/dev/null | wc -l | tr -d ' ')

# M5: TODO comments
M5=$(grep -r "// TODO" src/ --include="*.ts" --include="*.tsx" -l 2>/dev/null | wc -l | tr -d ' ')
```

**Step 2: Detect existing loops**

```bash
for dir in scripts/autoresearch/loop-*/; do
  [ -d "$dir" ] || continue
  LOOP_NAME=$(basename "$dir")
  # Check if loop has results
  if [[ -f "$dir/results.tsv" ]]; then
    ITERS=$(wc -l < "$dir/results.tsv" | tr -d ' ')
    BEST=$(sort -t$'\t' -k2 -n "$dir/results.tsv" | head -1 | cut -f2)
    echo "ACTIVE:$LOOP_NAME:iterations=$ITERS:best=$BEST"
  else
    echo "SCAFFOLDED:$LOOP_NAME"
  fi
done
```

**Step 3: Display**

```
Autoresearch Scan: {date}

Codebase metrics:

| # | Loop              | Metric            | Current | Target | Priority | Risk |
|---|-------------------|-------------------|---------|--------|----------|------|
| A | loop-remove-as-any| `as any` casts    | {M4}    | 0      | P1       | LOW  |
| B | loop-eslint-disable| eslint-disable   | {M3}    | 0      | P2       | MED  |
| C | loop-export-fn    | export function   | {M1}    | 0      | P1       | LOW  |
| D | loop-interface-type| export interface | {M2}    | 0      | P1       | LOW  |
| E | loop-todo-comments| TODO comments     | {M5}    | 0      | P3       | LOW  |

Existing loops: {detected loops or "none yet"}

Recommended next step (P1, LOW risk):
  /autoresearch --scaffold loop-remove-as-any
  Then write program.md, create a worktree, and run the loop.
```
