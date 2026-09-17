---
title: "ECC —— Harness 性能优化系统"
sourceId: "09-harness/ecc"
sourceTitle: "ECC —— Harness 性能优化系统"
sourceKind: "其他材料"
licenseLabel: "可转载"
lang: "英文"
tier: 3
volume: "09-harness"
sourceUrl: "https://github.com/affaan-m/ECC"
entryUrl: "https://github.com/affaan-m/ECC/blob/928c1dea72f5c330442fc1f595563398b8f389f7/commands/hookify.md"
sourceRel: "commands/hookify.md"
rawUrl: "/raw/09-harness/ecc/commands/hookify.md"
sourceSha256: "2fd94b585a1267717ed88276054e320251ceb47f95e6b53bfc31d9527193e8b5"
pageSha256: "2fd94b585a1267717ed88276054e320251ceb47f95e6b53bfc31d9527193e8b5"
contentMode: "local-full"
zh: ""
---

# ECC —— Harness 性能优化系统

Create hook rules to prevent unwanted Claude Code behaviors by analyzing conversation patterns or explicit user instructions.

## Usage

`/hookify [description of behavior to prevent]`

If no arguments are provided, analyze the current conversation to find behaviors worth preventing.

## Workflow

### Step 1: Gather Behavior Info

- With arguments: parse the user's description of the unwanted behavior
- Without arguments: use the `conversation-analyzer` agent to find:
  - explicit corrections
  - frustrated reactions to repeated mistakes
  - reverted changes
  - repeated similar issues

### Step 2: Present Findings

Show the user:

- behavior description
- proposed event type
- proposed pattern or matcher
- proposed action

### Step 3: Generate Rule Files

For each approved rule, create a file at `.claude/hookify.\{name\}.local.md`:

```yaml
---
name: rule-name
enabled: true
event: bash|file|stop|prompt|all
action: block|warn
pattern: "regex pattern"
---
Message shown when rule triggers.
```

### Step 4: Confirm

Report created rules and how to manage them with `/hookify-list` and `/hookify-configure`.
