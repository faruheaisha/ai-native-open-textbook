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
pageSha256: "702764c573a91eef546f086453ccc759101b3cf6191adf89d3f43cbf3d23bdce"
contentMode: "local-full"
zh: ""
---

#### File References with `@`

Reference specific files in your prompts for targeted operations:

```bash
# Single file
Review @src/auth/login.tsx for security issues

# Multiple files
Refactor @src/utils/validation.ts and @src/utils/helpers.ts to remove duplication

# With wildcards (in some contexts)
Analyze all test files @src/**/*.test.ts

# Relative paths work
Check @./CLAUDE.md for project conventions
```

**Why use `@`**:
- **Precision**: Target exact files instead of letting Claude search
- **Speed**: Skip file discovery phase
- **Context**: Signals Claude to read these files on-demand via tools
- **Clarity**: Makes your intent explicit

**Example**:
```
# Without @
You: Fix the authentication bug
Claude: Which file contains the authentication logic? [Wastes time searching]

# With @
You: Fix the authentication bug in @src/auth/middleware.ts
Claude: [Reads file on-demand and proposes fix]
```
