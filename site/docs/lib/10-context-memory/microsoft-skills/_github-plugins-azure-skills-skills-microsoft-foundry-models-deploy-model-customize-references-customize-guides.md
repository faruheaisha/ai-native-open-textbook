---
title: "Customize Guides — Selection Guides & Advanced Topics"
sourceId: "10-context-memory/microsoft-skills"
sourceTitle: "Microsoft Agent Skills"
sourceKind: "技能与配置库"
licenseLabel: "可转载"
lang: "英文"
tier: 3
volume: "10-context-memory"
sourceUrl: "https://github.com/microsoft/skills"
entryUrl: "https://github.com/microsoft/skills/blob/cf77b1efbf3117501f4727c476894751311ee885/.github/plugins/azure-skills/skills/microsoft-foundry/models/deploy-model/customize/references/customize-guides.md"
sourceRel: ".github/plugins/azure-skills/skills/microsoft-foundry/models/deploy-model/customize/references/customize-guides.md"
rawUrl: "/raw/10-context-memory/microsoft-skills/.github/plugins/azure-skills/skills/microsoft-foundry/models/deploy-model/customize/references/customize-guides.md"
sourceSha256: "28132d05c5db1f40618d74e6cde43bcab241c97d6f6e15d8866f61481b26b2a0"
pageSha256: "28132d05c5db1f40618d74e6cde43bcab241c97d6f6e15d8866f61481b26b2a0"
contentMode: "local-full"
zh: ""
---

# Customize Guides — Selection Guides & Advanced Topics

> Reference for: `models/deploy-model/customize/SKILL.md`

**Table of Contents:** [Selection Guides](#selection-guides) · [Advanced Topics](#advanced-topics)

## Selection Guides

### How to Choose SKU

| SKU | Best For | Cost | Availability |
|-----|----------|------|--------------|
| **GlobalStandard** | Production, high availability | Medium | Multi-region |
| **Standard** | Development, testing | Low | Single region |
| **ProvisionedManaged** | High-volume, predictable workloads | Fixed (PTU) | Reserved capacity |
| **DataZoneStandard** | Data residency requirements | Medium | Specific zones |

**Decision Tree:**
```
Do you need guaranteed throughput?
├─ Yes → ProvisionedManaged (PTU)
└─ No → Do you need high availability?
        ├─ Yes → GlobalStandard
        └─ No → Standard
```

### How to Choose Capacity

**For TPM-based SKUs (GlobalStandard, Standard):**

| Workload | Recommended Capacity |
|----------|---------------------|
| Development/Testing | 1K - 5K TPM |
| Small Production | 5K - 20K TPM |
| Medium Production | 20K - 100K TPM |
| Large Production | 100K+ TPM |

**For PTU-based SKUs (ProvisionedManaged):**

Use the PTU calculator based on:
- Input tokens per minute
- Output tokens per minute
- Requests per minute

**Capacity Planning Tips:**
- Start with recommended capacity
- Monitor usage and adjust
- Enable dynamic quota for flexibility
- Consider spillover for peak loads

### How to Choose RAI Policy

| Policy | Filtering Level | Use Case |
|--------|----------------|----------|
| **Microsoft.DefaultV2** | Balanced | Most applications |
| **Microsoft.Prompt-Shield** | Enhanced | Security-sensitive apps |
| **Custom** | Configurable | Specific requirements |

**Recommendation:** Start with `Microsoft.DefaultV2` and adjust based on application needs.

---

## Advanced Topics

### PTU (Provisioned Throughput Units) Deployments

**What is PTU?**
- Reserved capacity with guaranteed throughput
- Measured in PTU units, not TPM
- Fixed cost regardless of usage
- Best for high-volume, predictable workloads

**PTU Calculator:**

```
Estimated PTU = (Input TPM × 0.001) + (Output TPM × 0.002) + (Requests/min × 0.1)

Example:
- Input: 10,000 tokens/min
- Output: 5,000 tokens/min
- Requests: 100/min

PTU = (10,000 × 0.001) + (5,000 × 0.002) + (100 × 0.1)
    = 10 + 10 + 10
    = 30 PTU
```

**PTU Deployment:**
```bash
az cognitiveservices account deployment create \
