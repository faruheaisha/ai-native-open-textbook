---
title: "CI/CD Pipeline Patterns"
sourceId: "10-context-memory/microsoft-skills"
sourceTitle: "Microsoft Agent Skills"
sourceKind: "技能与配置库"
licenseLabel: "可转载"
lang: "英文"
tier: 3
volume: "10-context-memory"
sourceUrl: "https://github.com/microsoft/skills"
entryUrl: "https://github.com/microsoft/skills/blob/cf77b1efbf3117501f4727c476894751311ee885/.github/plugins/azure-skills/skills/azure-app-onboard/scaffold/references/cicd-pipelines.md"
sourceRel: ".github/plugins/azure-skills/skills/azure-app-onboard/scaffold/references/cicd-pipelines.md"
rawUrl: "/raw/10-context-memory/microsoft-skills/.github/plugins/azure-skills/skills/azure-app-onboard/scaffold/references/cicd-pipelines.md"
sourceSha256: "89a3efa48c3084deab93955a052a879de7c2021a69c3874432e8babcc7b5cb81"
pageSha256: "89a3efa48c3084deab93955a052a879de7c2021a69c3874432e8babcc7b5cb81"
contentMode: "local-full"
zh: ""
---

# CI/CD Pipeline Patterns

CI/CD is deferred to v2. Do NOT auto-generate workflow files.

If the user requests CI/CD guidance, call `mcp_azure_mcp_deploy` → `deploy_pipeline_guidance_get` with `is-azd-project: false`, `pipeline-platform: 'github-actions'`, `deploy-option: 'provision-and-deploy'` and present the guidance.
