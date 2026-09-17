---
title: "CLI Conventions"
sourceId: "10-context-memory/context-engineering-intro"
sourceTitle: "Context Engineering Intro"
sourceKind: "工程手册"
licenseLabel: "可转载"
lang: "英文"
tier: 1
volume: "10-context-memory"
sourceUrl: "https://github.com/coleam00/context-engineering-intro"
entryUrl: "https://github.com/coleam00/context-engineering-intro/blob/a2d84b021cee1e2f4e77ba854bba0be8cb319035/use-cases/ai-coding-wisc-framework/.claude/rules-example/cli.md"
sourceRel: "use-cases/ai-coding-wisc-framework/.claude/rules-example/cli.md"
rawUrl: "/raw/10-context-memory/context-engineering-intro/use-cases/ai-coding-wisc-framework/.claude/rules-example/cli.md"
sourceSha256: "c7d317dae135ad4dcfb0aa996360de8d67d695139ebdd9a035044fbc32d9d731"
pageSha256: "c7d317dae135ad4dcfb0aa996360de8d67d695139ebdd9a035044fbc32d9d731"
contentMode: "local-full"
zh: ""
---

# CLI Conventions

## Commands

```bash
# Workflow commands (require git repo)
bun run cli workflow list [--json]
bun run cli workflow run <name> [message] [--branch <branch>] [--from-branch <base>] [--no-worktree] [--resume]
bun run cli workflow status [runId]

# Isolation commands
bun run cli isolation list
bun run cli isolation cleanup [days]           # default: 7 days
bun run cli isolation cleanup --merged         # removes merged branches + remote refs
