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
pageSha256: "951a71ce431c48c2003c9a71a2482a3d0a95eb5ab77ef6572230e08db78de427"
contentMode: "local-full"
zh: ""
---

#### Shell Commands with `!`

Execute commands immediately without asking Claude to do it:

```bash
# Quick status checks
!git status
!npm run test
!docker ps

# View logs
!tail -f logs/app.log
!cat package.json

# Quick searches
!grep -r "TODO" src/
!find . -name "*.test.ts"
```

**When to use `!` vs asking Claude**:

| Use `!` for... | Ask Claude for... |
|----------------|-------------------|
| Quick status checks (`!git status`) | Git operations requiring decisions |
| View commands (`!cat`, `!ls`) | File analysis and understanding |
| Already-known commands | Complex command construction |
| Fast iteration in terminal | Commands you're unsure about |

**Example workflow**:
```
You: !git status
Output: Shows 5 modified files

You: Create a commit with these changes, following conventional commits
Claude: [Analyzes files, suggests commit message]
```
