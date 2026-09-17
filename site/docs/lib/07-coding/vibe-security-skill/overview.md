---
title: "Vibe Security（AI 编码安全技能）"
sourceId: "07-coding/vibe-security-skill"
sourceTitle: "Vibe Security（AI 编码安全技能）"
sourceKind: "技能与配置库"
licenseLabel: "可转载"
lang: "英文"
tier: 3
volume: "07-coding"
sourceUrl: "https://github.com/raroque/vibe-security-skill"
entryUrl: "https://github.com/raroque/vibe-security-skill/blob/850938f20f6915e7c3688d85c0a838f7909c87bb/README.md"
sourceRel: "README.md"
rawUrl: "/raw/07-coding/vibe-security-skill/README.md"
sourceSha256: "78ddbc3ad6ce405ee42f023f7d3e73a171da0d3e6c6ba6c4fe828632289e52ef"
pageSha256: "78ddbc3ad6ce405ee42f023f7d3e73a171da0d3e6c6ba6c4fe828632289e52ef"
contentMode: "local-full"
zh: ""
---

# Vibe Security（AI 编码安全技能）

<h1 align="center">Vibe Security - Agent Skill for AI Coding Assistants</h1>

An agent skill that helps secure vibe-coded apps - or honestly any app - from common security vulnerability patterns. Built by [Chris Raroque](https://www.youtube.com/@raroque) ([@raroque](https://twitter.com/raroque)) in collaboration with my colleagues at [Aloa](https://aloa.co).

AI assistants are great at building features fast but consistently get security wrong: hardcoding secrets, skipping row-level security, trusting client-submitted prices, storing tokens in localStorage. This skill catches those patterns before they ship.

**Need help building AI apps, custom agents, or implementing AI at your company?** Work with Chris and the team at [Aloa](https://aloa.co).

## Background

This skill was built specifically to address the security issues that keep showing up in vibe-coded applications. When you're building fast with AI, security fundamentals get skipped - and the AI assistants themselves are often the ones introducing the vulnerabilities. This skill gives your agent the knowledge to catch and prevent those patterns.

It uses the [Agent Skills](https://agentskills.io/home) format, so it works with Claude Code, OpenAI Codex, and other compatible agents.

The security rules are organized as reference files that the agent loads based on what technologies your project uses. If you're using Supabase, it checks RLS policies. If you're using Stripe, it checks payment flows. If you're using React Native, it checks for secrets in the JS bundle. No wasted context on irrelevant checks.

## Installing Vibe Security

### Claude Code

```bash
npx skills add https://github.com/raroque/vibe-security-skill --skill vibe-security
```

If `npx` isn't available, install Node.js first: `brew install node` (macOS) or download from [nodejs.org](https://nodejs.org).

### OpenAI Codex

```bash
npx skills add https://github.com/raroque/vibe-security-skill --skill vibe-security
```

Select "Codex" when prompted for the agent platform.

### Manual Installation (Claude Code)

Clone this repo and copy the `vibe-security/` folder to your project or global skills directory:

```bash
# Project-level (applies to one project)
cp -r vibe-security/ .claude/skills/vibe-security/

# Global (applies to all projects)
cp -r vibe-security/ ~/.claude/skills/vibe-security/
```

## Using Vibe Security

**Claude Code:** Use `/vibe-security` to trigger a full security audit, or just ask naturally - "check my code for security issues", "is this safe?", "audit this project".

**Codex:** Use `$vibe-security` or describe what you need - "review this for vulnerabilities", "check my Supabase RLS".

The skill also activates automatically when you're writing or reviewing code that handles authentication, payments, database access, API keys, or user data.

## What It Checks

| Category | What It Catches |
|----------|----------------|
| **Secrets & Env Vars** | Hardcoded API keys, secrets in `NEXT_PUBLIC_`/`VITE_`/`EXPO_PUBLIC_` vars, missing `.gitignore` |
| **Database Security** | Disabled Supabase RLS, `USING (true)` policies, missing `WITH CHECK`, exposed sensitive fields, Firebase `allow: if true` rules, Convex missing auth |
| **Auth & Authorization** | `jwt.decode()` without verify, middleware-only auth, unprotected Server Actions, tokens in localStorage |
| **Rate Limiting** | Missing limits on auth/AI/email endpoints, client-tamperable rate counters, no billing caps |
| **Payments** | Client-submitted prices, missing webhook signature verification, stale subscription checks |
| **Mobile** | API keys in JS bundle, `AsyncStorage` for tokens, unsafe deep links, weak biometric auth |
| **AI / LLM** | Exposed AI API keys, no usage caps, prompt injection, unsafe output rendering |
| **Deployment** | Debug mode in production, exposed source maps, missing security headers, `.git` accessible |
| **Data Access** | SQL injection, Prisma operator injection, `$queryRawUnsafe`, mass assignment |
