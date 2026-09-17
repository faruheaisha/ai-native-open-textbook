---
title: "azure.yaml Generation"
sourceId: "10-context-memory/microsoft-skills"
sourceTitle: "Microsoft Agent Skills"
sourceKind: "技能与配置库"
licenseLabel: "可转载"
lang: "英文"
tier: 3
volume: "10-context-memory"
sourceUrl: "https://github.com/microsoft/skills"
entryUrl: "https://github.com/microsoft/skills/blob/cf77b1efbf3117501f4727c476894751311ee885/.github/plugins/azure-skills/skills/azure-prepare/references/recipes/azd/azure-yaml.md"
sourceRel: ".github/plugins/azure-skills/skills/azure-prepare/references/recipes/azd/azure-yaml.md"
rawUrl: "/raw/10-context-memory/microsoft-skills/.github/plugins/azure-skills/skills/azure-prepare/references/recipes/azd/azure-yaml.md"
sourceSha256: "e105632f169f99598a695fe00c810ef602fc8fd45cd429e5ab4a9acf01996118"
pageSha256: "e105632f169f99598a695fe00c810ef602fc8fd45cd429e5ab4a9acf01996118"
contentMode: "local-full"
zh: ""
---

# azure.yaml Generation

> ⛔ **CRITICAL: Check for .NET Aspire projects FIRST**
>
> **DO NOT manually create azure.yaml for .NET Aspire projects.** If you detect:
> - Files ending with `*.AppHost.csproj` (e.g., `MyApp.AppHost.csproj`)
> - `Aspire.Hosting` or `Aspire.AppHost.Sdk` in `.csproj` files
>
> **STOP and use `azd init --from-code` instead.** See [aspire.md](/lib/10-context-memory/microsoft-skills/_github-plugins-azure-skills-skills-azure-prepare-references-recipes-azd-aspire) for details.

Create `azure.yaml` in project root for AZD.

## Structure

### Basic (Bicep - default)

```yaml
