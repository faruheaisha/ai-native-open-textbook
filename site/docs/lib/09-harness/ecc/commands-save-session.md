---
title: "Save Session Command"
sourceId: "09-harness/ecc"
sourceTitle: "ECC —— Harness 性能优化系统"
sourceKind: "其他材料"
licenseLabel: "可转载"
lang: "英文"
tier: 3
volume: "09-harness"
sourceUrl: "https://github.com/affaan-m/ECC"
entryUrl: "https://github.com/affaan-m/ECC/blob/928c1dea72f5c330442fc1f595563398b8f389f7/commands/save-session.md"
sourceRel: "commands/save-session.md"
rawUrl: "/raw/09-harness/ecc/commands/save-session.md"
sourceSha256: "a9488a8819d6c65fe4777f07ea72de6b0c4ee94f90c6bb33b3b8841916222db4"
pageSha256: "a9488a8819d6c65fe4777f07ea72de6b0c4ee94f90c6bb33b3b8841916222db4"
contentMode: "local-full"
zh: ""
---

# Save Session Command

Capture everything that happened in this session — what was built, what worked, what failed, what's left — and write it to a dated file so the next session can pick up exactly where this one left off.

## When to Use

- End of a work session before closing Claude Code
- Before hitting context limits (run this first, then start a fresh session)
- After solving a complex problem you want to remember
- Any time you need to hand off context to a future session

## Process

### Step 1: Gather context

Before writing the file, collect:

- Read all files modified during this session (use git diff or recall from conversation)
- Review what was discussed, attempted, and decided
- Note any errors encountered and how they were resolved (or not)
- Check current test/build status if relevant

### Step 2: Create the sessions folder if it doesn't exist

Create the canonical sessions folder in the user's Claude home directory:

```bash
mkdir -p ~/.claude/session-data
```

### Step 3: Write the session file
