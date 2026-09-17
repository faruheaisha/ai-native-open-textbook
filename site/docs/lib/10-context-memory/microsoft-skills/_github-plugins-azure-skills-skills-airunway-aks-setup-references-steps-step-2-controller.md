---
title: "Step 2 — Controller Status & Installation"
sourceId: "10-context-memory/microsoft-skills"
sourceTitle: "Microsoft Agent Skills"
sourceKind: "技能与配置库"
licenseLabel: "可转载"
lang: "英文"
tier: 3
volume: "10-context-memory"
sourceUrl: "https://github.com/microsoft/skills"
entryUrl: "https://github.com/microsoft/skills/blob/cf77b1efbf3117501f4727c476894751311ee885/.github/plugins/azure-skills/skills/airunway-aks-setup/references/steps/step-2-controller.md"
sourceRel: ".github/plugins/azure-skills/skills/airunway-aks-setup/references/steps/step-2-controller.md"
rawUrl: "/raw/10-context-memory/microsoft-skills/.github/plugins/azure-skills/skills/airunway-aks-setup/references/steps/step-2-controller.md"
sourceSha256: "5088d7b90881e35db3d2f9d7a128eca6661487924338aaf057cfc22109701e93"
pageSha256: "5088d7b90881e35db3d2f9d7a128eca6661487924338aaf057cfc22109701e93"
contentMode: "local-full"
zh: ""
---

# Step 2 — Controller Status & Installation

**Goal**: Ensure the AI Runway controller and CRDs are installed and healthy.

```bash
# Check CRD presence
kubectl get crd modeldeployments.airunway.ai

# Check controller pod health
kubectl get pods -n airunway-system -l control-plane=controller-manager
```

**If already installed and healthy:** Report version and pod status, skip to Step 3.

**If not installed:** Ask user to confirm, then from the **repository root** run:

```bash
make controller-install   # Install CRDs
make controller-deploy    # Deploy controller manager
```

> **Note:** `make` targets must be run from the AI Runway repository root.

Verify rollout:

```bash
kubectl rollout status deployment/airunway-controller-manager -n airunway-system --timeout=120s
```

**Error handling:**
- `CrashLoopBackOff` → `kubectl logs -n airunway-system -l control-plane=controller-manager --previous`
- Rollout timeout → `kubectl describe deployment airunway-controller-manager -n airunway-system`
- `No rule to make target` → Navigate to repo root and retry
