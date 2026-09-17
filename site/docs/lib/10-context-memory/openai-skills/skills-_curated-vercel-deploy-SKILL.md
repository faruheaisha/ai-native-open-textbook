---
title: "Vercel Deploy"
sourceId: "10-context-memory/openai-skills"
sourceTitle: "Agent Skills"
sourceKind: "技能与配置库"
licenseLabel: "仅引用"
lang: "英文"
tier: 3
volume: "10-context-memory"
sourceUrl: "https://github.com/openai/skills"
entryUrl: "https://github.com/openai/skills/blob/49f948faa9258a0c61caceaf225e179651397431/skills/.curated/vercel-deploy/SKILL.md"
sourceRel: "skills/.curated/vercel-deploy/SKILL.md"
rawUrl: "/raw/10-context-memory/openai-skills/skills/.curated/vercel-deploy/SKILL.md"
sourceSha256: "f4a6cbfbb378a320fae179a79f727a881d19677e9b3db96ed49d2dc02a74fa46"
pageSha256: "f4a6cbfbb378a320fae179a79f727a881d19677e9b3db96ed49d2dc02a74fa46"
contentMode: "local-full"
zh: ""
---

# Vercel Deploy

Deploy any project to Vercel instantly. **Always deploy as preview** (not production) unless the user explicitly asks for production.

## Prerequisites

- Check whether the Vercel CLI is installed **without** escalated permissions (for example, `command -v vercel`).
- Only escalate the actual deploy command if sandboxing blocks the deployment network calls (`sandbox_permissions=require_escalated`).
- The deployment might take a few minutes. Use appropriate timeout values.

## Quick Start

1. Check whether the Vercel CLI is installed (no escalation for this check):

```bash
command -v vercel
```

2. If `vercel` is installed, run this (with a 10 minute timeout):
```bash
vercel deploy [path] -y
```

**Important:** Use a 10 minute (600000ms) timeout for the deploy command since builds can take a while.

3. If `vercel` is not installed, or if the CLI fails with "No existing credentials found", use the fallback method below.

## Fallback (No Auth)

If CLI fails with auth error, use the deploy script:

```bash
