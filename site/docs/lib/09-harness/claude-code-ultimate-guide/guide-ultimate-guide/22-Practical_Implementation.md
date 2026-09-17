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
pageSha256: "ccac32d113e6c29361236cc1741c01a980505edc280ec16e54eab5368bb7abc1"
contentMode: "local-full"
zh: ""
---

#### Practical Implementation

**Option 1: Manual loop**

```bash
# Simple fresh-context loop
for i in {1..10}; do
    echo "=== Iteration $i ==="
    claude -p "$(cat TASK.md PROGRESS.md)"
    git diff --stat  # Check progress
    read -p "Continue? (y/n) " -n 1 -r
    [[ ! $REPLY =~ ^[Yy]$ ]] && break
done
```

**Option 2: Script** (see `examples/scripts/fresh-context-loop.sh`)

```bash
./fresh-context-loop.sh 10 TASK.md PROGRESS.md
```

**Option 3: External orchestrators**

- [AFK CLI](https://github.com/m0nkmaster/afk): Zero-config orchestration across task sources
