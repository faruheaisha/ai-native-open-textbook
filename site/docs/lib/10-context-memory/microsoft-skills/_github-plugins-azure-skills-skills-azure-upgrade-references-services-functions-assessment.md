---
title: "Assessment: Functions Plan Upgrade"
sourceId: "10-context-memory/microsoft-skills"
sourceTitle: "Microsoft Agent Skills"
sourceKind: "技能与配置库"
licenseLabel: "可转载"
lang: "英文"
tier: 3
volume: "10-context-memory"
sourceUrl: "https://github.com/microsoft/skills"
entryUrl: "https://github.com/microsoft/skills/blob/cf77b1efbf3117501f4727c476894751311ee885/.github/plugins/azure-skills/skills/azure-upgrade/references/services/functions/assessment.md"
sourceRel: ".github/plugins/azure-skills/skills/azure-upgrade/references/services/functions/assessment.md"
rawUrl: "/raw/10-context-memory/microsoft-skills/.github/plugins/azure-skills/skills/azure-upgrade/references/services/functions/assessment.md"
sourceSha256: "c547b0dcc99184682df90f82e328fff9f54598ff2560e1187c11c86ff75da911"
pageSha256: "c547b0dcc99184682df90f82e328fff9f54598ff2560e1187c11c86ff75da911"
contentMode: "local-full"
zh: ""
---

# Assessment: Functions Plan Upgrade

Generate an upgrade assessment report before any changes to Azure resources.

## Prerequisites

- User has an existing Azure Functions app on a Consumption or other plan
- User has Azure CLI v2.77.0+ installed
- User has Owner or Contributor role in the target resource group
- The `resource-graph` extension is installed (`az extension add --name resource-graph`)

## Assessment Steps

1. **Identify Source App** — Confirm the function app name, resource group, region, and current hosting plan
2. **Check Region Compatibility** — Verify the target plan is available in the app's region
3. **Verify Language Stack** — Confirm the app's runtime is supported on the target plan
4. **Verify Stack Version** — Confirm the runtime version is supported on the target plan in the region
5. **Check Deployment Slots** — Determine if slots are in use (Flex Consumption doesn't support slots)
6. **Check Certificates** — Determine if TLS/SSL certificates are in use (not yet supported in Flex Consumption)
7. **Check Blob Triggers** — Verify blob triggers use EventGrid source (container polling not supported in Flex Consumption)
8. **Assess Dependencies** — Review upstream and downstream service dependencies and plan mitigation strategies
9. **Generate Report** — Create `upgrade-assessment-report.md`

## Assessment Report Format

> ⚠️ **MANDATORY**: Use these exact section headings in every assessment report. Do NOT rename, reorder, or omit sections.

The report MUST be saved as `upgrade-assessment-report.md` in the workspace root.

```markdown
# Upgrade Assessment Report

## 1. Executive Summary

| Property | Value |
|----------|-------|
