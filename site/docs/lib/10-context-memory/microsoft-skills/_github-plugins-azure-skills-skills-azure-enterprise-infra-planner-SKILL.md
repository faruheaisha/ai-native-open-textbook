---
title: "Azure Enterprise Infra Planner"
sourceId: "10-context-memory/microsoft-skills"
sourceTitle: "Microsoft Agent Skills"
sourceKind: "技能与配置库"
licenseLabel: "可转载"
lang: "英文"
tier: 3
volume: "10-context-memory"
sourceUrl: "https://github.com/microsoft/skills"
entryUrl: "https://github.com/microsoft/skills/blob/cf77b1efbf3117501f4727c476894751311ee885/.github/plugins/azure-skills/skills/azure-enterprise-infra-planner/SKILL.md"
sourceRel: ".github/plugins/azure-skills/skills/azure-enterprise-infra-planner/SKILL.md"
rawUrl: "/raw/10-context-memory/microsoft-skills/.github/plugins/azure-skills/skills/azure-enterprise-infra-planner/SKILL.md"
sourceSha256: "7e1b932f780b6348745b9d283437b64fc031ba452e8982ed9705849b9c19f50e"
pageSha256: "7e1b932f780b6348745b9d283437b64fc031ba452e8982ed9705849b9c19f50e"
contentMode: "local-full"
zh: ""
---

# Azure Enterprise Infra Planner

## When to Use This Skill

Activate this skill when user wants to:
- Plan enterprise Azure infrastructure from a workload or architecture description
- Architect a landing zone, hub-spoke network, or multi-region topology
- Design networking infrastructure: VNets, subnets, firewalls, private endpoints, VPN gateways
- Plan identity, RBAC, and compliance-driven infrastructure
- Generate Bicep or Terraform for subscription-scope or multi-resource-group deployments
- Plan disaster recovery, failover, or cross-region high-availability topologies

## Quick Reference

| Property | Details |
|---|---|
| MCP tools | `insights_get`, `get_azure_bestpractices_get`, `wellarchitectedframework_serviceguide_get`, `microsoft_docs_fetch`, `microsoft_docs_search`, `bicepschema_get` |
| CLI commands | `az deployment group create`, `az bicep build`, `az resource list`, `terraform init`, `terraform plan`, `terraform validate`, `terraform apply`, `checkov` |
| Output schema | [schema.md](/lib/10-context-memory/microsoft-skills/_github-plugins-azure-skills-skills-azure-enterprise-infra-planner-references-schema) |
| Key references | [workflow.md](/lib/10-context-memory/microsoft-skills/_github-plugins-azure-skills-skills-azure-enterprise-infra-planner-references-workflow), [waf-checklist.md](/lib/10-context-memory/microsoft-skills/_github-plugins-azure-skills-skills-azure-enterprise-infra-planner-references-waf-checklist), [resources/](/lib/10-context-memory/microsoft-skills/_github-plugins-azure-skills-skills-azure-enterprise-infra-planner-references-resources), [constraints/](/lib/10-context-memory/microsoft-skills/_github-plugins-azure-skills-skills-azure-enterprise-infra-planner-references-constraints) |

## Workflow (Start Here)

Follow the step-by-step instructions in [workflow.md](/lib/10-context-memory/microsoft-skills/_github-plugins-azure-skills-skills-azure-enterprise-infra-planner-references-workflow) to execute the 7 phases of infrastructure planning and provisioning.

## Architecture

The skill runs a **7-phase, gated pipeline**. Input is triaged into one of two flows:

- **Greenfield** — only new requirements; run the phases straight through.
- **Referenced (brownfield)** — the user supplies something that already exists (a live resource /
  resource group / subscription, IaC or an infra plan, or a requirements doc). The same phases run, plus
  [referenced-workload.md](/lib/10-context-memory/microsoft-skills/_github-plugins-azure-skills-skills-azure-enterprise-infra-planner-references-referenced-workload): existing resources are inventoried and
  referenced (never recreated), the new workload is wired into them, and **Phase 7 deploys additively**
  (incremental only — never modifying or destroying the referenced resources).

Every phase advances only after its gate passes. Phase 5 requires explicit user approval; **Phase 6 is a
hardened, self-verifying gate** — the generated IaC must be secure-by-default, pass local validation
(`az bicep build` / `terraform validate`) with zero errors, pass a `checkov` security scan with no
unresolved high/critical findings, and the skill must **show the command output** and emit a completion
self-check before advancing; Phase 7 requires an explicit, risk-acknowledged deploy confirmation.

```mermaid
flowchart TD
    IN([Input]) --> TRIAGE{Existing infra<br/>referenced?}
    TRIAGE -- "No (greenfield)" --> P1
    TRIAGE -- "Yes (referenced)" --> RW[/referenced-workload.md:<br/>inventory + assign roles<br/>reference, never recreate/]
    RW --> P1

    subgraph PIPE [7-phase gated pipeline]
        direction TB
        P1[Phase 1 · Extract insights] --> P2[Phase 2 · Research best practices]
        P2 --> P3[Phase 3 · Research resources]
        P3 --> P4[Phase 4 · Generate plan]
        P4 --> P5{Phase 5 · Verify<br/>user approves?}
        P5 -- "no" --> P4
        P5 -- "approved" --> P6[Phase 6 · Generate IaC]
        P6 --> VAL{Validate<br/>az bicep build /<br/>terraform validate}
        VAL -- "errors" --> P6
        VAL -- "clean" --> P7{Phase 7 · Deploy<br/>risk-ack confirm?}
    end

    P7 -- "greenfield" --> DEP[az deployment / terraform apply]
    P7 -- "referenced" --> DEPADD[Additive deploy · incremental only<br/>what-if preview · no destroy of<br/>referenced resources]
    DEP --> OUT([Deployed])
    DEPADD --> OUT

    classDef gate fill:#fff3cd,stroke:#d39e00,color:#000;
    classDef ref fill:#e2f0d9,stroke:#548235,color:#000;
    class P5,VAL,P7,TRIAGE gate;
    class RW,DEPADD ref;
```
