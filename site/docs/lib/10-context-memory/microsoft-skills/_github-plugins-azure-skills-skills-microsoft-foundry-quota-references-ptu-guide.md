---
title: "Provisioned Throughput Units (PTU) Guide"
sourceId: "10-context-memory/microsoft-skills"
sourceTitle: "Microsoft Agent Skills"
sourceKind: "技能与配置库"
licenseLabel: "可转载"
lang: "英文"
tier: 3
volume: "10-context-memory"
sourceUrl: "https://github.com/microsoft/skills"
entryUrl: "https://github.com/microsoft/skills/blob/cf77b1efbf3117501f4727c476894751311ee885/.github/plugins/azure-skills/skills/microsoft-foundry/quota/references/ptu-guide.md"
sourceRel: ".github/plugins/azure-skills/skills/microsoft-foundry/quota/references/ptu-guide.md"
rawUrl: "/raw/10-context-memory/microsoft-skills/.github/plugins/azure-skills/skills/microsoft-foundry/quota/references/ptu-guide.md"
sourceSha256: "012db2f537dcb7da0a7d1caf773e04e66a96e142b7c3072dd98bfcc183c3d3f4"
pageSha256: "012db2f537dcb7da0a7d1caf773e04e66a96e142b7c3072dd98bfcc183c3d3f4"
contentMode: "local-full"
zh: ""
---

# Provisioned Throughput Units (PTU) Guide

**Table of Contents:** [Understanding PTU vs Standard TPM](#understanding-ptu-vs-standard-tpm) · [When to Use PTU](#when-to-use-ptu) · [PTU Capacity Planning](#ptu-capacity-planning) · [Deploy Model with PTU](#deploy-model-with-ptu) · [Request PTU Quota Increase](#request-ptu-quota-increase) · [Understanding Region and Deployment Quotas](#understanding-region-and-deployment-quotas) · [External Resources](#external-resources)

## Understanding PTU vs Standard TPM

Microsoft Foundry offers two quota types:

### Standard TPM (Tokens Per Minute)
- Pay-as-you-go model, charged per token
- Each deployment consumes capacity units (e.g., 10K TPM, 50K TPM)
- Total regional quota shared across all deployments
- Subject to rate limiting during high demand (429 errors possible)
- Best for: Variable workloads, development, testing, bursty traffic

### Provisioned Throughput Units (PTU)
- Monthly commitment for guaranteed throughput
- No rate limiting, consistent latency
- Measured in PTU units (not TPM)
- Best for: Predictable, high-volume production workloads
- More cost-effective when consistent token usage justifies monthly commitment

## When to Use PTU

| Factor | Standard (TPM) | Provisioned (PTU) |
|--------|----------------|-------------------|
| **Best For** | Variable workloads, development, testing | Predictable production workloads |
| **Pricing** | Pay-per-token | Monthly commitment (hourly rate per PTU) |
| **Rate Limits** | Yes (429 errors possible) | No (guaranteed throughput) |
| **Latency** | Variable | Consistent |
| **Cost Decision** | Lower upfront commitment | More economical for consistent, high-volume usage |
| **Flexibility** | Scale up/down instantly | Requires planning and commitment |
| **Use Case** | Prototyping, bursty traffic | Production apps, high-volume APIs |

**Use PTU when:**
- Consistent, predictable token usage where monthly commitment is cost-effective
- Need guaranteed throughput (no 429 rate limit errors)
- Require consistent latency with performance SLA
- High-volume production workloads with stable traffic patterns

**Decision Guidance:**
Compare your current pay-as-you-go costs with PTU pricing. PTU may be more economical when consistent usage justifies the monthly commitment.

## PTU Capacity Planning

### Official Calculation Methods

> **Agent Instruction:** Only present official Azure capacity calculator methods below. Do NOT generate or suggest estimated PTU formulas, TPM-per-PTU conversion tables, or reference deprecated calculators (oai.azure.com/portal/calculator).

Calculate PTU requirements using these official methods:

**Method 1: Microsoft Foundry Portal**
1. Navigate to Microsoft Foundry portal
2. Go to **Operate** → **Quota**
3. Select **Provisioned throughput unit** tab
4. Click **Capacity calculator** button
5. Enter workload parameters (model, tokens/call, RPM, latency target)
6. Calculator returns exact PTU count needed

**Method 2: Using Azure REST API**
```bash
# Calculate required PTU capacity
