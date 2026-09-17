---
title: "Post-deploy checks"
sourceId: "10-context-memory/openai-skills"
sourceTitle: "Agent Skills"
sourceKind: "技能与配置库"
licenseLabel: "仅引用"
lang: "英文"
tier: 3
volume: "10-context-memory"
sourceUrl: "https://github.com/openai/skills"
entryUrl: "https://github.com/openai/skills/blob/49f948faa9258a0c61caceaf225e179651397431/skills/.curated/render-deploy/references/post-deploy-checks.md"
sourceRel: "skills/.curated/render-deploy/references/post-deploy-checks.md"
rawUrl: "/raw/10-context-memory/openai-skills/skills/.curated/render-deploy/references/post-deploy-checks.md"
sourceSha256: "bd1e3e24abe6c9eb63164ac8ada9b285ceaffbd1722f58bbc1d3d94af4c59911"
pageSha256: "bd1e3e24abe6c9eb63164ac8ada9b285ceaffbd1722f58bbc1d3d94af4c59911"
contentMode: "local-full"
zh: ""
---

# Post-deploy checks

Use this after any deploy or service creation. Keep it short; stop when a check fails.

## 1) Confirm deploy status

```
