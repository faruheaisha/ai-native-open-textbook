---
title: "CI/CD Verification"
sourceId: "10-context-memory/microsoft-skills"
sourceTitle: "Microsoft Agent Skills"
sourceKind: "技能与配置库"
licenseLabel: "可转载"
lang: "英文"
tier: 3
volume: "10-context-memory"
sourceUrl: "https://github.com/microsoft/skills"
entryUrl: "https://github.com/microsoft/skills/blob/cf77b1efbf3117501f4727c476894751311ee885/.github/plugins/azure-skills/skills/azure-deploy/references/recipes/cicd/verify.md"
sourceRel: ".github/plugins/azure-skills/skills/azure-deploy/references/recipes/cicd/verify.md"
rawUrl: "/raw/10-context-memory/microsoft-skills/.github/plugins/azure-skills/skills/azure-deploy/references/recipes/cicd/verify.md"
sourceSha256: "9fb3e6818b2d030b953968d358ff881cf3861bf104cb4b2531cd78c77e88e273"
pageSha256: "9fb3e6818b2d030b953968d358ff881cf3861bf104cb4b2531cd78c77e88e273"
contentMode: "local-full"
zh: ""
---

# CI/CD Verification

Check pipeline run status:
- **GitHub**: Actions tab → workflow run
- **Azure DevOps**: Pipelines → pipeline run

## Verify Deployed Resources

```bash
