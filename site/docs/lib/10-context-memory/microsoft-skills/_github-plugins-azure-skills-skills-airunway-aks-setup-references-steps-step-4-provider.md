---
title: "Step 4 — Provider Recommendation & Installation"
sourceId: "10-context-memory/microsoft-skills"
sourceTitle: "Microsoft Agent Skills"
sourceKind: "技能与配置库"
licenseLabel: "可转载"
lang: "英文"
tier: 3
volume: "10-context-memory"
sourceUrl: "https://github.com/microsoft/skills"
entryUrl: "https://github.com/microsoft/skills/blob/cf77b1efbf3117501f4727c476894751311ee885/.github/plugins/azure-skills/skills/airunway-aks-setup/references/steps/step-4-provider.md"
sourceRel: ".github/plugins/azure-skills/skills/airunway-aks-setup/references/steps/step-4-provider.md"
rawUrl: "/raw/10-context-memory/microsoft-skills/.github/plugins/azure-skills/skills/airunway-aks-setup/references/steps/step-4-provider.md"
sourceSha256: "3a618de715c5594d12ded0e08189cf66843239dc234d86c541df268ac9dcbcff"
pageSha256: "3a618de715c5594d12ded0e08189cf66843239dc234d86c541df268ac9dcbcff"
contentMode: "local-full"
zh: ""
---

# Step 4 — Provider Recommendation & Installation

**Goal**: Select and install the right inference provider for the detected hardware.

```bash
# Check if providers are already registered
kubectl get inferenceproviderconfigs --all-namespaces 2>/dev/null || kubectl get inferenceproviderconfigs
```

> See [powershell-notes.md](/lib/10-context-memory/microsoft-skills/_github-plugins-azure-skills-skills-airunway-aks-setup-references-powershell-notes) for the PowerShell equivalent.

**If providers already registered:** Show name and status, skip installation.

**Provider recommendation logic:**

| Hardware | Use Case | Recommended Provider |
|----------|----------|---------------------|
| CPU-only | Any | KAITO (llama.cpp) |
| GPUs | Standard inference (most users start here) | KAITO |
| GPUs | High-throughput serving with separate prefill/decode phases | Dynamo |
| GPUs | Already using Ray for ML workloads | KubeRay |

> **Default to KAITO** unless the user has a specific reason to choose otherwise. KAITO is the simplest to set up and handles most use cases. Dynamo is for teams that need to independently scale the prefill and decode stages of inference for high throughput. KubeRay is for teams already invested in the Ray ecosystem.

Present recommendation with reasoning. Ask user to confirm before installing.

**Installation** — from the **repository root**:

First, check the provider's Makefile or README for the default image:

```bash
# List available providers and their default images
ls providers/
cat providers/<provider>/Makefile | grep -E 'IMG\s*\?='
```

> See [powershell-notes.md](/lib/10-context-memory/microsoft-skills/_github-plugins-azure-skills-skills-airunway-aks-setup-references-powershell-notes) for the PowerShell equivalent.

Then deploy:

```bash
cd providers/<provider>
make deploy IMG=<image>
```

> **Tip:** If the Makefile defines a default `IMG`, you can omit the `IMG=` argument and just run `make deploy`.

**Verify registration:**

```bash
kubectl get inferenceproviderconfigs <provider> -o yaml
```
