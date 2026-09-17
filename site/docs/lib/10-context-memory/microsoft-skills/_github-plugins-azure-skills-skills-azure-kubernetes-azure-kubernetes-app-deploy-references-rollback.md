---
title: "Rollback Guidance"
sourceId: "10-context-memory/microsoft-skills"
sourceTitle: "Microsoft Agent Skills"
sourceKind: "技能与配置库"
licenseLabel: "可转载"
lang: "英文"
tier: 3
volume: "10-context-memory"
sourceUrl: "https://github.com/microsoft/skills"
entryUrl: "https://github.com/microsoft/skills/blob/cf77b1efbf3117501f4727c476894751311ee885/.github/plugins/azure-skills/skills/azure-kubernetes/azure-kubernetes-app-deploy/references/rollback.md"
sourceRel: ".github/plugins/azure-skills/skills/azure-kubernetes/azure-kubernetes-app-deploy/references/rollback.md"
rawUrl: "/raw/10-context-memory/microsoft-skills/.github/plugins/azure-skills/skills/azure-kubernetes/azure-kubernetes-app-deploy/references/rollback.md"
sourceSha256: "be48bb7ed21568fe4b11cfccda269fc7b0c305647acedcbfb23a7468edfa8162"
pageSha256: "be48bb7ed21568fe4b11cfccda269fc7b0c305647acedcbfb23a7468edfa8162"
contentMode: "local-full"
zh: ""
---

# Rollback Guidance

Recovery procedures for deployment failures. Referenced from Section 4 (Deploy).

---

## Image Build Failed

```bash
# No cloud resources were persisted — nothing to roll back.
# Fix the issue and retry:

# Common fixes:
# - Dockerfile syntax error       → edit Dockerfile
# - Missing file in build context → check .dockerignore
# - Dependency install failure    → fix package.json / requirements.txt / go.mod

# Retry:
