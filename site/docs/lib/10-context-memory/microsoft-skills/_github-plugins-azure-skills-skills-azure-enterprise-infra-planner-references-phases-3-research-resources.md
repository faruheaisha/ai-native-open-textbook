---
title: "Phase 3: Research Resources"
sourceId: "10-context-memory/microsoft-skills"
sourceTitle: "Microsoft Agent Skills"
sourceKind: "技能与配置库"
licenseLabel: "可转载"
lang: "英文"
tier: 3
volume: "10-context-memory"
sourceUrl: "https://github.com/microsoft/skills"
entryUrl: "https://github.com/microsoft/skills/blob/cf77b1efbf3117501f4727c476894751311ee885/.github/plugins/azure-skills/skills/azure-enterprise-infra-planner/references/phases/3-research-resources.md"
sourceRel: ".github/plugins/azure-skills/skills/azure-enterprise-infra-planner/references/phases/3-research-resources.md"
rawUrl: "/raw/10-context-memory/microsoft-skills/.github/plugins/azure-skills/skills/azure-enterprise-infra-planner/references/phases/3-research-resources.md"
sourceSha256: "2c768ac449b066584334d63015f67ca6260a2b098b314d34072cf6efff3880bc"
pageSha256: "2c768ac449b066584334d63015f67ca6260a2b098b314d34072cf6efff3880bc"
contentMode: "local-full"
zh: ""
---

# Phase 3: Research Resources

> The goal of this phase is to research Azure resources before generating the plan.

## Step 1 - Resource Refinement

### Cross reference WAF

Read [WAF cross-cutting checklist](/lib/10-context-memory/microsoft-skills/_github-plugins-azure-skills-skills-azure-enterprise-infra-planner-references-waf-checklist). For every checklist item, either:
- Add missing resources / harden properties, or;
- Document the intentional omission in `overallReasoning.tradeoffs` and `inputs.subGoals`.

## Insights Integration

Read `.azure/insights.json` produced by Phase 1 and evaluate each insight against the current workload and sub-goals identified in Phase 2:
* If an insight applies, prefer it over defaults — especially for region, SKU tier, security posture, naming, and tagging.
* If an insight doesn't apply, document the intentional omission in `overallReasoning.tradeoffs`.
* Insights can shape both resource selection and property configuration.
* Track each insight you apply in `inputs.insightsApplied` so the user can trace why a decision was made.

> Mandatory Security rule: only apply a security-related insight if it results in an equal or stronger security posture than the alternatives. A weaker security posture from an insight is only acceptable when the user has explicitly requested it in the initial prompt.

## Step 2 - Resource Lookup

> Mandatory: Complete this step for every resource before generating the plan. WAF tools from Phase 2 provide architecture guidance, but do not provide ARM types, naming rules, or pairing constraints. This step fills those gaps.

For each resource identified since Phase 1:
1. Read the relevant resource reference file to get its ARM type, API version, and CAF prefix. Use [resources/README.md](/lib/10-context-memory/microsoft-skills/_github-plugins-azure-skills-skills-azure-enterprise-infra-planner-references-resources) as the index to help you find the right file (e.g., `resources/compute-infra.md` for AKS, `resources/data-analytics.md` for Cosmos DB).
2. Read the relevant pairing constraint file using [constraints/README.md](/lib/10-context-memory/microsoft-skills/_github-plugins-azure-skills-skills-azure-enterprise-infra-planner-references-constraints) as the index. Each category file is <2K tokens, you must read the whole file for all resources in that category.
3. **Required** — for every resource, spawn a general-purpose sub-agent to fetch its naming rules. Pass the naming rules URL from the resource file and instruct the sub-agent to call `microsoft_docs_fetch` and return only the min/max length, allowed characters, and uniqueness scope. The resource file's CAF prefix is a style convention only — it does not capture these ARM-enforced constraints, so this step cannot be skipped.

> Important Tip: Only load the category files you need. For a plan with AKS + Cosmos DB + VNet + Key Vault, you'd load 4 constraint files and 4 resource files (~5.5K tokens total) instead of the full catalog (~22K tokens).

After completing the steps above, verify from the tool results:

1. Type — Correct `Microsoft.*` resource type and API version
2. SKU — Available in target region, appropriate for workload
3. Region — Service available, data residency met
4. Name — CAF-compliant naming constraints
5. Dependencies — All prerequisites identified and ordered
6. Properties — Required properties per resource schema
7. Alternatives — At least one alternative with tradeoff documented

## Gate
- Every resource has an ARM type, naming rules, and pairing constraints checked.
- Present the preliminary resource list to the user with brief justifications and wait for approval before proceeding.
