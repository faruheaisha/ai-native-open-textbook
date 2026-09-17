---
title: "Park Session"
sourceId: "09-harness/claude-code-ultimate-guide"
sourceTitle: "Claude Code Ultimate Guide"
sourceKind: "工程手册"
licenseLabel: "可转载"
lang: "英文"
tier: 3
volume: "09-harness"
sourceUrl: "https://github.com/FlorianBruniaux/claude-code-ultimate-guide"
entryUrl: "https://github.com/FlorianBruniaux/claude-code-ultimate-guide/blob/af05b84fb6e32432dae2114ee2a72c44ef3d29b1/.claude/commands/park.md"
sourceRel: ".claude/commands/park.md"
rawUrl: "/raw/09-harness/claude-code-ultimate-guide/.claude/commands/park.md"
sourceSha256: "ed0dfc08f3772d828315050252775bfdbbd14b568fc10d96ae9754ec55808d2c"
pageSha256: "ed0dfc08f3772d828315050252775bfdbbd14b568fc10d96ae9754ec55808d2c"
contentMode: "local-full"
zh: ""
---

# Park Session

Save the current session info so you can resume it after a reboot.

## Usage

```
/park fix du bug auth JWT     # description inline
/park                          # will ask for description
```

## Step 1: Get Description

If `$ARGUMENTS` is non-empty → use it as the session description.
Otherwise → ask:

> "Comment décrire cette session ? (ex: fix bug auth JWT, refacto pricing page, migration DB)"

## Step 2: Choose Destination File

Ask the user where to save:

> "Fichier destination ?"

Options:
1. `~/Desktop/parked-sessions.md` (default, recommended)
2. `~/.claude/parked-sessions.md` (hidden, always available)
3. Other (free text input)

If the user just presses Enter → use option 1.

## Step 3: Detect Session ID

Run these commands to find the current session:

```bash
# Get current directory encoded path (/ → -, prefixed with -)
PWD_ENCODED=$(pwd | sed 's|/|-|g' | sed 's|^|projects-|' | sed 's|^projects-||')
SESSIONS_FILE="$HOME/.claude/projects/-$(echo "$PWD" | sed 's|/|-|g' | sed 's|^-||')/sessions-index.json"
```

More precisely, the Claude sessions index path is:
```
