---
title: "GSD（Get Shit Done）工作流文档"
sourceId: "10-context-memory/get-shit-done"
sourceTitle: "GSD（Get Shit Done）工作流文档"
sourceKind: "其他材料"
licenseLabel: "可转载"
lang: "英文"
tier: 3
volume: "10-context-memory"
sourceUrl: "https://github.com/gsd-build/get-shit-done"
entryUrl: "https://github.com/gsd-build/get-shit-done/blob/bdcaab2c752d9a33a1a1ca9acf3a3c81fb991815/docs/CONFIGURATION.md"
sourceRel: "docs/CONFIGURATION.md"
rawUrl: "/raw/10-context-memory/get-shit-done/docs/CONFIGURATION.md"
sourceSha256: "3e67baa72c7b00dab65464616eb7f7f38b2c72cad311f0d2b8c6e7ba8e914eb1"
pageSha256: "5675001850e99b75b0b15b08b63e17208c5e437b390ab300131e7480b748ca62"
contentMode: "local-full"
zh: ""
---

## Git Branching

| Setting | Type | Default | Description |
|---------|------|---------|-------------|
| `git.branching_strategy` | enum | `none` | `none`, `phase`, or `milestone` |
| `git.base_branch` | string | `main` | The integration branch that phase/milestone branches are created from and merged back into. Override when your repo uses `master` or a release branch |
| `git.create_tag` | boolean | `true` | Create a git tag (`v[X.Y]`) on milestone completion. Set to `false` for projects with their own release flow |
| `git.phase_branch_template` | string | `gsd/phase-\{phase\}-\{slug\}` | Branch name template for phase strategy |
| `git.milestone_branch_template` | string | `gsd/\{milestone\}-\{slug\}` | Branch name template for milestone strategy |
| `git.quick_branch_template` | string or null | `null` | Optional branch name template for `/gsd-quick` tasks |

### Strategy Comparison

| Strategy | Creates Branch | Scope | Merge Point | Best For |
|----------|---------------|-------|-------------|----------|
| `none` | Never | N/A | N/A | Solo development, simple projects |
| `phase` | At `execute-phase` start | One phase | User merges after phase | Code review per phase, granular rollback |
| `milestone` | At first `execute-phase` | All phases in milestone | At `complete-milestone` | Release branches, PR per version |

### Template Variables

| Variable | Available In | Example |
|----------|-------------|---------|
| `\{phase\}` | `phase_branch_template` | `03` (zero-padded) |
| `\{slug\}` | Both templates | `user-authentication` (lowercase, hyphenated) |
| `\{milestone\}` | `milestone_branch_template` | `v1.0` |
| `\{num\}` / `\{quick\}` | `quick_branch_template` | `260317-abc` (quick task ID) |

Example quick-task branching:

```json
"git": {
  "quick_branch_template": "gsd/quick-{num}-{slug}"
}
```

### Merge Options at Milestone Completion

| Option | Git Command | Result |
|--------|-------------|--------|
| Squash merge (recommended) | `git merge --squash` | Single clean commit per branch |
| Merge with history | `git merge --no-ff` | Preserves all individual commits |
| Delete without merging | `git branch -D` | Discard branch work |
| Keep branches | (none) | Manual handling later |
