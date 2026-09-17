---
title: "Upgrade Operations"
sourceId: "10-context-memory/microsoft-skills"
sourceTitle: "Microsoft Agent Skills"
sourceKind: "技能与配置库"
licenseLabel: "可转载"
lang: "英文"
tier: 3
volume: "10-context-memory"
sourceUrl: "https://github.com/microsoft/skills"
entryUrl: "https://github.com/microsoft/skills/blob/cf77b1efbf3117501f4727c476894751311ee885/.github/plugins/azure-skills/skills/azure-diagnostics/troubleshooting/aks/upgrade-operations.md"
sourceRel: ".github/plugins/azure-skills/skills/azure-diagnostics/troubleshooting/aks/upgrade-operations.md"
rawUrl: "/raw/10-context-memory/microsoft-skills/.github/plugins/azure-skills/skills/azure-diagnostics/troubleshooting/aks/upgrade-operations.md"
sourceSha256: "a159e73391f2436c0184790deb9a3296c766288269cead50d07f3d021331dc88"
pageSha256: "a159e73391f2436c0184790deb9a3296c766288269cead50d07f3d021331dc88"
contentMode: "local-full"
zh: ""
---

# Upgrade Operations

Use this guide when node image rotation, Kubernetes version changes, or node-pool upgrade settings appear to be the failure domain.

## Node Image / OS Upgrade Issues

> ⚠️ **Warning:** `az aks nodepool upgrade` and `az aks nodepool update --max-surge ...` change cluster state. During diagnostics, do not recommend or run upgrade actions by default. Only surface these commands after the user explicitly approves remediation or confirms the change window / change-control context.

```bash
# Check current node image versions
az aks nodepool show -g <rg> --cluster-name <cluster> -n <nodepool> \
  --query "{nodeImageVersion:nodeImageVersion, osType:osType}"

# Check available upgrades
az aks nodepool get-upgrades -g <rg> --cluster-name <cluster> --nodepool-name <nodepool>

# Upgrade node image (non-disruptive with surge)
az aks nodepool upgrade -g <rg> --cluster-name <cluster> -n <nodepool> --node-image-only
```

---

## Kubernetes Version Upgrade Failures

**Pre-upgrade check:**

```bash
# Check for deprecated API usage before upgrading
kubectl get --raw /metrics | grep apiserver_requested_deprecated_apis

# Verify available upgrade paths (can only skip one minor version)
az aks get-upgrades -g <rg> -n <cluster> -o table
```

**Upgrade stuck or failed:**

```bash
# Check control plane provisioning state
az aks show -g <rg> -n <cluster> --query "provisioningState"

# If stuck: check AKS diagnostics blade in portal
# Azure Portal -> AKS cluster -> Diagnose and solve problems -> Upgrade
```

Common causes: PDB blocking drain (`kubectl get pdb -A`), deprecated APIs in use, custom admission webhooks failing (`kubectl get validatingwebhookconfiguration`).

---

## Zero-Downtime Node Pool Upgrades

`maxSurge` controls how many extra nodes are provisioned during upgrade.

```bash
# Check current maxSurge
az aks nodepool show -g <rg> --cluster-name <cluster> -n <nodepool> \
  --query "upgradeSettings.maxSurge"

az aks nodepool update -g <rg> --cluster-name <cluster> -n <nodepool> \
  --max-surge 33%
```

**Upgrade stuck / nodes not draining:**

```bash
kubectl get pdb -A
