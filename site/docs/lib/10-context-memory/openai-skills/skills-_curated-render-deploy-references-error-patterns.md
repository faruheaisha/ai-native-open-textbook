---
title: "Error patterns (compact)"
sourceId: "10-context-memory/openai-skills"
sourceTitle: "Agent Skills"
sourceKind: "技能与配置库"
licenseLabel: "仅引用"
lang: "英文"
tier: 3
volume: "10-context-memory"
sourceUrl: "https://github.com/openai/skills"
entryUrl: "https://github.com/openai/skills/blob/49f948faa9258a0c61caceaf225e179651397431/skills/.curated/render-deploy/references/error-patterns.md"
sourceRel: "skills/.curated/render-deploy/references/error-patterns.md"
rawUrl: "/raw/10-context-memory/openai-skills/skills/.curated/render-deploy/references/error-patterns.md"
sourceSha256: "b5556cdd3ba832e8f33602cf207cd80872df9c89ed17fe92129a56903176675b"
pageSha256: "b5556cdd3ba832e8f33602cf207cd80872df9c89ed17fe92129a56903176675b"
contentMode: "local-full"
zh: ""
---

# Error patterns (compact)

Use this to quickly map log signatures to likely causes and fixes.

| Log pattern | Likely cause | Quick fix |
| --- | --- | --- |
| `KeyError`, `not defined`, `missing environment` | Missing env var | Add env var in render.yaml or via MCP, then redeploy |
| `EADDRINUSE`, `listen EADDRINUSE` | Port binding conflict | Bind to `0.0.0.0:$PORT` |
| `Cannot find module`, `ModuleNotFoundError` | Missing dependency | Add dependency to manifest and rebuild |
| `ECONNREFUSED`, `connection refused` | DB not reachable | Verify DATABASE_URL and DB status |
| `Health check timeout` | No healthy response | Add/verify health endpoint and port |
| `exit 137`, `out of memory` | OOM | Reduce memory use or upgrade plan |
| `Command failed`, `build failed` | Bad build command | Fix build command or dependencies |
