---
title: "Depth Probe — Meet the User Where They Are"
sourceId: "10-context-memory/microsoft-skills"
sourceTitle: "Microsoft Agent Skills"
sourceKind: "技能与配置库"
licenseLabel: "可转载"
lang: "英文"
tier: 3
volume: "10-context-memory"
sourceUrl: "https://github.com/microsoft/skills"
entryUrl: "https://github.com/microsoft/skills/blob/cf77b1efbf3117501f4727c476894751311ee885/.github/plugins/azure-skills/skills/azure-compute/workflows/vm-creator/references/depth-probe/index.md"
sourceRel: ".github/plugins/azure-skills/skills/azure-compute/workflows/vm-creator/references/depth-probe/index.md"
rawUrl: "/raw/10-context-memory/microsoft-skills/.github/plugins/azure-skills/skills/azure-compute/workflows/vm-creator/references/depth-probe/index.md"
sourceSha256: "420e024b29d6e0c578fa7e63b132d3d07db4237c7a71d5a6dbd439215c3b2e3a"
pageSha256: "420e024b29d6e0c578fa7e63b132d3d07db4237c7a71d5a6dbd439215c3b2e3a"
contentMode: "local-full"
zh: ""
---

# Depth Probe — Meet the User Where They Are

The VM Creator adapts its questioning to the user's expertise and intent. A beginner asking for a "dev VM" should not get peppered with networking and egress questions. An advanced networking engineer specifying "VMSS behind App Gateway with private endpoints" should not be asked whether they want a public IP.

## Philosophy

1. **Never ask a question whose answer can be inferred or safely defaulted.**
2. **Batch silent inferences into a Plan Card.** Defaulted decisions should be visible and editable.
3. **Defaults ladder.** When you must ask, prefer `[recommended default] / [show alternatives] / [I have specifics]`.
4. **Branching is signal-driven, not flag-driven.** Reclassify any time the user volunteers a deep signal.

## Classification — read the initial request

Score each signal that appears in the user's first 1-2 messages. The highest-scoring branch wins; a user can be in multiple branches.

| Signal phrase / keyword | Branch |
|---|---|
| "VNet", "subnet", "NSG", "egress", "private endpoint", "App Gateway", "accelerated networking", "service tag", "UDR", "IPv6", "DNS", "Bastion" | [networking-deep](/lib/10-context-memory/microsoft-skills/_github-plugins-azure-skills-skills-azure-compute-workflows-vm-creator-references-depth-probe-networking-deep) |
| "vCPUs", "GPU", "memory", "family", "D-series", "N-series", "ephemeral OS disk", "proximity placement", "AMD", "Intel", "generation", "SR-IOV", "trusted launch" | [spec-deep](/lib/10-context-memory/microsoft-skills/_github-plugins-azure-skills-skills-azure-compute-workflows-vm-creator-references-depth-probe-spec-deep) |
| "spot", "reserved", "savings plan", "hybrid benefit", "autoscale floor/ceiling", "$", "budget", "cheapest", "cost-optimize" | [cost-deep](/lib/10-context-memory/microsoft-skills/_github-plugins-azure-skills-skills-azure-compute-workflows-vm-creator-references-depth-probe-cost-deep) |
| "managed identity", "Entra", "RBAC", "Key Vault", "JIT", "encryption at host", "CMK", "confidential", "compliance", "FedRAMP", "HIPAA" | [security-deep](https://github.com/microsoft/skills/blob/cf77b1efbf3117501f4727c476894751311ee885/.github/plugins/azure-skills/skills/azure-compute/workflows/vm-creator/references/depth-probe/security-deep.md) |
| "dev", "sandbox", "quick", "test out", "play with", "just need", "simple", or nothing specific | [beginner](/lib/10-context-memory/microsoft-skills/_github-plugins-azure-skills-skills-azure-compute-workflows-vm-creator-references-depth-probe-beginner) |

> **Tiebreak:** prefer the branch that affects the most expensive defaults: Networking > Security > Spec > Cost > Beginner. Networking mistakes are the hardest to undo post-deployment.

## Cross-branch follow-ups (ask once, after primary branch)

| Question | When to ask |
|---|---|
| "Tags? (env, owner, cost-center)" | Always — but accept "none" without follow-up |
