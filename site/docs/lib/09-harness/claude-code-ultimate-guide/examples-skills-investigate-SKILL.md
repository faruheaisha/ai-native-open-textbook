---
title: "Investigate: Root-Cause Debugging"
sourceId: "09-harness/claude-code-ultimate-guide"
sourceTitle: "Claude Code Ultimate Guide"
sourceKind: "工程手册"
licenseLabel: "可转载"
lang: "英文"
tier: 3
volume: "09-harness"
sourceUrl: "https://github.com/FlorianBruniaux/claude-code-ultimate-guide"
entryUrl: "https://github.com/FlorianBruniaux/claude-code-ultimate-guide/blob/af05b84fb6e32432dae2114ee2a72c44ef3d29b1/examples/skills/investigate/SKILL.md"
sourceRel: "examples/skills/investigate/SKILL.md"
rawUrl: "/raw/09-harness/claude-code-ultimate-guide/examples/skills/investigate/SKILL.md"
sourceSha256: "24113e0ebe7d061ac80fa3cf825344b2d8ce919ef02d281781ef227d71e59abd"
pageSha256: "24113e0ebe7d061ac80fa3cf825344b2d8ce919ef02d281781ef227d71e59abd"
contentMode: "local-full"
zh: ""
---

# Investigate: Root-Cause Debugging

Systematic debugging with mandatory root cause investigation before any code changes.

**Iron Law: NO FIXES WITHOUT ROOT CAUSE INVESTIGATION FIRST.**

Fixing symptoms creates whack-a-mole debugging. Every fix that doesn't address root cause makes the next bug harder to find.

## Instructions

### Phase 1: Collect Symptoms

Gather all available context before forming any hypothesis.

1. Read the error messages, stack traces, and reproduction steps in full
2. Ask ONE targeted question if the user hasn't provided enough context:
   - "What exact error message do you see?"
   - "Can you reproduce this consistently?"
   - "When did this start happening?"
3. Identify the affected component and its boundaries

**Output**: A precise symptom statement: what fails, when, with what error.

---

### Phase 2: Read the Code

Trace the code path from symptom back to potential causes. Do not guess.

```bash
# Find all references to the failing component
grep -rn "ComponentName\|function_name\|error_string" src/ --include="*.{ts,js,py,rb,go}" | head -30

# Check recent changes to affected files
