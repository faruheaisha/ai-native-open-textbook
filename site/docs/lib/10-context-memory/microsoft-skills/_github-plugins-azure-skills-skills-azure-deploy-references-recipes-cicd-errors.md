---
title: "CI/CD Errors"
sourceId: "10-context-memory/microsoft-skills"
sourceTitle: "Microsoft Agent Skills"
sourceKind: "技能与配置库"
licenseLabel: "可转载"
lang: "英文"
tier: 3
volume: "10-context-memory"
sourceUrl: "https://github.com/microsoft/skills"
entryUrl: "https://github.com/microsoft/skills/blob/cf77b1efbf3117501f4727c476894751311ee885/.github/plugins/azure-skills/skills/azure-deploy/references/recipes/cicd/errors.md"
sourceRel: ".github/plugins/azure-skills/skills/azure-deploy/references/recipes/cicd/errors.md"
rawUrl: "/raw/10-context-memory/microsoft-skills/.github/plugins/azure-skills/skills/azure-deploy/references/recipes/cicd/errors.md"
sourceSha256: "82108c1c6a95bf331e11cf40b854c6da91ba484624a7498f5bd894e2dcaca158"
pageSha256: "82108c1c6a95bf331e11cf40b854c6da91ba484624a7498f5bd894e2dcaca158"
contentMode: "local-full"
zh: ""
---

# CI/CD Errors

| Error | Resolution |
|-------|------------|
| Authentication failed | Check service principal/federated credentials |
| Missing secrets | Add required secrets to repository |
| Missing variables | Add required variables |
| Pipeline timeout | Increase timeout or optimize deployment |
| Approval pending | Request approval in environment settings |

## GitHub Actions Debugging

Check workflow logs in Actions tab for detailed error messages.

## Azure DevOps Debugging

Check pipeline run logs for detailed error messages.
