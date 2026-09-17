---
title: "Azure VM/VMSS Creator"
sourceId: "10-context-memory/microsoft-skills"
sourceTitle: "Microsoft Agent Skills"
sourceKind: "技能与配置库"
licenseLabel: "可转载"
lang: "英文"
tier: 3
volume: "10-context-memory"
sourceUrl: "https://github.com/microsoft/skills"
entryUrl: "https://github.com/microsoft/skills/blob/cf77b1efbf3117501f4727c476894751311ee885/.github/plugins/azure-skills/skills/azure-compute/workflows/vm-creator/vm-creator.md"
sourceRel: ".github/plugins/azure-skills/skills/azure-compute/workflows/vm-creator/vm-creator.md"
rawUrl: "/raw/10-context-memory/microsoft-skills/.github/plugins/azure-skills/skills/azure-compute/workflows/vm-creator/vm-creator.md"
sourceSha256: "b6fad93d59ed7ea150b0fffdee2b224785b9b0928a9e0777e912e74128254e2b"
pageSha256: "b6fad93d59ed7ea150b0fffdee2b224785b9b0928a9e0777e912e74128254e2b"
contentMode: "local-full"
zh: ""
---

# Azure VM/VMSS Creator

Guided create-flow for Azure Virtual Machines (VMs) and VM Scale Sets (VMSS). Adapts to the user's expertise — beginners get sensible defaults; networking/spec/cost/security experts get the deep questions for their domain only — then emits the chosen artifact: az CLI bash, Bicep, Terraform, or live apply via Azure MCP.

## When to use

- User wants to **create / provision / deploy / spin up** a VM or VMSS (not just pick a SKU)
- User has a recommendation in hand and wants a deployable artifact
- User asks for a "create VM" script, template, or commands in az CLI, Bicep, or Terraform

> **Disambiguator.** If the user wants to deploy an **application** (Docker service, web app, API, function), route to `azure-prepare`. This workflow is for **bare VM/VMSS infrastructure** only.
> **Recommender first.** If the user has not picked a SKU yet ("what should I pick?"), pause and run [vm-recommender](/lib/10-context-memory/microsoft-skills/_github-plugins-azure-skills-skills-azure-compute-workflows-vm-recommender-vm-recommender) Steps 1–6 first, then resume here.

## Workflow

### Step 1 — Determine VM vs VMSS

If the user already said "VM" or "VMSS" / "scale set", use that. Otherwise: autoscaling, multiple identical instances, or stateless tier behind a load balancer → **VMSS**; everything else → **VM**. If unsure, default to single VM and ask one confirmation.

### Step 2 — Depth Probe

Classify the user's first 1–2 messages against the signal table in [depth-probe/index.md](/lib/10-context-memory/microsoft-skills/_github-plugins-azure-skills-skills-azure-compute-workflows-vm-creator-references-depth-probe) and pick the highest-scoring branch:

| Branch | File |
|---|---|
| Beginner / fast-path | [beginner.md](/lib/10-context-memory/microsoft-skills/_github-plugins-azure-skills-skills-azure-compute-workflows-vm-creator-references-depth-probe-beginner) |
| Networking-deep | [networking-deep.md](/lib/10-context-memory/microsoft-skills/_github-plugins-azure-skills-skills-azure-compute-workflows-vm-creator-references-depth-probe-networking-deep) |
| Spec-deep | [spec-deep.md](/lib/10-context-memory/microsoft-skills/_github-plugins-azure-skills-skills-azure-compute-workflows-vm-creator-references-depth-probe-spec-deep) |
| Cost-deep | [cost-deep.md](/lib/10-context-memory/microsoft-skills/_github-plugins-azure-skills-skills-azure-compute-workflows-vm-creator-references-depth-probe-cost-deep) |
| Security-deep | [security-deep.md](https://github.com/microsoft/skills/blob/cf77b1efbf3117501f4727c476894751311ee885/.github/plugins/azure-skills/skills/azure-compute/workflows/vm-creator/references/depth-probe/security-deep.md) |

> Never ask a question whose answer can be inferred or safely defaulted. Batch silent inferences into the Plan Card so the user can see and edit them.

### Step 3 — Adaptive Gather

Ask **only** the questions from the matched branch's matrix. Use the defaults ladder when asking:

> *"NSG inbound rules — `[Recommended: SSH from your IP only]` / `[Show alternatives]` / `[I have specifics]`"*

Cross-branch follow-ups (once, after the primary branch):
