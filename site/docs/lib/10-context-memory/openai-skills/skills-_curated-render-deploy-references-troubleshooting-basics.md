---
title: "Basic troubleshooting (deploy-time and startup)"
sourceId: "10-context-memory/openai-skills"
sourceTitle: "Agent Skills"
sourceKind: "技能与配置库"
licenseLabel: "仅引用"
lang: "英文"
tier: 3
volume: "10-context-memory"
sourceUrl: "https://github.com/openai/skills"
entryUrl: "https://github.com/openai/skills/blob/49f948faa9258a0c61caceaf225e179651397431/skills/.curated/render-deploy/references/troubleshooting-basics.md"
sourceRel: "skills/.curated/render-deploy/references/troubleshooting-basics.md"
rawUrl: "/raw/10-context-memory/openai-skills/skills/.curated/render-deploy/references/troubleshooting-basics.md"
sourceSha256: "f999b13fc56ff62ccf6eec593d0e4cee94e52dec27a815e40d68532bf558a4ca"
pageSha256: "f999b13fc56ff62ccf6eec593d0e4cee94e52dec27a815e40d68532bf558a4ca"
contentMode: "local-full"
zh: ""
---

# Basic troubleshooting (deploy-time and startup)

Use this when a deploy fails, the service crashes on start, or health checks time out.
Keep fixes minimal and redeploy after each change.

## 1) Classify the failure

- **Build failure**: errors in build logs, missing dependencies, build command issues.
- **Startup failure**: app exits quickly, crashes, or cannot bind to `$PORT`.
- **Runtime/health failure**: service is live but health checks fail or 5xx errors.

## 2) Quick checks by class

**Build failure**
- Confirm the build command is correct for the runtime.
- Ensure required dependencies are present in `package.json`, `requirements.txt`, etc.
- Check for missing build-time env vars.

**Startup failure**
- Confirm the start command and working directory.
- Ensure port binding is `0.0.0.0:$PORT`.
- Check for missing runtime env vars (secrets, DB URLs).

**Runtime/health failure**
- Verify the health endpoint path and response.
- Confirm the app is actually listening on `$PORT`.
- Check database connectivity and migrations.

## 3) Map error signatures to fixes

Use [error-patterns.md](/lib/10-context-memory/openai-skills/skills-_curated-render-deploy-references-error-patterns) for a compact catalog of common log messages.

## 4) If still blocked

Gather the latest build logs and runtime error logs, then consider the optional
`render-debug` skill for deeper diagnostics (metrics, DB checks, expanded patterns).
