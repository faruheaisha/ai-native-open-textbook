---
title: "Vercel CLI"
sourceId: "07-coding/fufan-vibe-coding-course"
sourceTitle: "Vibe Coding：AI 编程实战课"
sourceKind: "系统课程"
licenseLabel: "可转载"
lang: "中英混排"
tier: 1
volume: "07-coding"
sourceUrl: "https://github.com/fufankeji/FuFan-VibeCodingCourse"
entryUrl: "https://github.com/fufankeji/FuFan-VibeCodingCourse/blob/5336ede159a7ac2ce0ee136324fe5bffd56970ca/Stage7_Superpowers_Applied/Lesson12_Superpowers_Getting_Started/nanoclaw-v2-backend/.claude/skills/add-vercel/container-skills/vercel-cli/SKILL.md"
sourceRel: "Stage7_Superpowers_Applied/Lesson12_Superpowers_Getting_Started/nanoclaw-v2-backend/.claude/skills/add-vercel/container-skills/vercel-cli/SKILL.md"
rawUrl: "/raw/07-coding/fufan-vibe-coding-course/Stage7_Superpowers_Applied/Lesson12_Superpowers_Getting_Started/nanoclaw-v2-backend/.claude/skills/add-vercel/container-skills/vercel-cli/SKILL.md"
sourceSha256: "279262bba7245dd4f6d1cc49b2626b2c5fcf4433ce3709af5edc67f0ff94f912"
pageSha256: "279262bba7245dd4f6d1cc49b2626b2c5fcf4433ce3709af5edc67f0ff94f912"
contentMode: "local-full"
zh: ""
---

# Vercel CLI

You can deploy web applications to Vercel using the `vercel` CLI.

## Auth

Auth is handled by OneCLI — the HTTPS_PROXY injects the real token into API requests automatically. The Vercel CLI requires a token to be present to skip its local credential check, so **always pass `--token placeholder`** on every command. OneCLI replaces this with the real token at the proxy level.

Before any Vercel operation, verify auth:

```bash
vercel whoami --token placeholder
```

If this fails with an auth error, ask the user to add a Vercel token to OneCLI. They can create one at https://vercel.com/account/tokens and register it via `onecli secrets create` on the host. Once added, retry `vercel whoami`.

## Deploying

Always use `--yes` to skip interactive prompts and `--token placeholder` for auth (OneCLI replaces with real token).

```bash
# Deploy to production
vercel deploy --yes --prod --token placeholder

# Deploy from a specific directory
vercel deploy --yes --prod --token placeholder --cwd /path/to/project

# Preview deployment (not production)
vercel deploy --yes --token placeholder
```

After deploying, verify the live URL:

```bash
# Check deployment status
