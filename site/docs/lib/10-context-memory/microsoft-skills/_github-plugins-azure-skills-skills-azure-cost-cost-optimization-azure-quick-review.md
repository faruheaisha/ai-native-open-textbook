---
title: "Microsoft Agent Skills"
sourceId: "10-context-memory/microsoft-skills"
sourceTitle: "Microsoft Agent Skills"
sourceKind: "技能与配置库"
licenseLabel: "可转载"
lang: "英文"
tier: 3
volume: "10-context-memory"
sourceUrl: "https://github.com/microsoft/skills"
entryUrl: "https://github.com/microsoft/skills/blob/cf77b1efbf3117501f4727c476894751311ee885/.github/plugins/azure-skills/skills/azure-cost/cost-optimization/azure-quick-review.md"
sourceRel: ".github/plugins/azure-skills/skills/azure-cost/cost-optimization/azure-quick-review.md"
rawUrl: "/raw/10-context-memory/microsoft-skills/.github/plugins/azure-skills/skills/azure-cost/cost-optimization/azure-quick-review.md"
sourceSha256: "08f5fbd8cff85f2533d101a1fa50835c6ef126bea8d26a21533b72991dd8e3d3"
pageSha256: "08f5fbd8cff85f2533d101a1fa50835c6ef126bea8d26a21533b72991dd8e3d3"
contentMode: "local-full"
zh: ""
---

# Microsoft Agent Skills

## Azure Quick Review (azqr) for Cost Optimization

Azure Quick Review (azqr) generates compliance and governance reports that identify cost-impacting issues and orphaned resources.

## Create Filters Configuration

Create a `filters.yaml` file to focus the scan on cost optimization:

```yaml
includeSections:
  - Costs
  - Advisor
  - Inventory
  - Orphaned
excludeSections:
  - Recommendations
  - AzurePolicy
  - DefenderRecommendations
```

## Run the azqr Scan

Execute the scan using Azure MCP or CLI:

```powershell
# Via Azure MCP (preferred if available)
# Use the extension_azqr tool with subscription and optional resource-group parameters

# Or via direct CLI:
azqr scan --subscription "<SUBSCRIPTION_ID>" --resource-group "<RESOURCE_GROUP>" --filters ./filters.yaml --output json
```

## Save Output

Save all generated files to the `output/` folder:
1. Create the folder: `mkdir output` (if it doesn't exist)
2. Save the azqr report as: `output/azqr_report_<YYYYMMDD_HHMMSS>.json`
3. After the scan completes, delete the temporary `filters.yaml` file

## Report Output

The scan generates a JSON report with recommendations categorized by impact level (High/Medium/Low), including:
- Orphaned resources (NICs, disks, IPs)
- Azure Advisor cost recommendations  
- Resource inventory
- Cost breakdown by resource

## Notes

- azqr provides qualitative governance recommendations
- Always validate findings with actual cost data before making changes
- The tool requires Reader role on the subscription or resource group
- Save reports to `output/` folder with timestamps for audit trail
