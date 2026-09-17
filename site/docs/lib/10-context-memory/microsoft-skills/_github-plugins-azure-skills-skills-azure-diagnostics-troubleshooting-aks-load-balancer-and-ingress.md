---
title: "Load Balancer And Ingress Troubleshooting"
sourceId: "10-context-memory/microsoft-skills"
sourceTitle: "Microsoft Agent Skills"
sourceKind: "技能与配置库"
licenseLabel: "可转载"
lang: "英文"
tier: 3
volume: "10-context-memory"
sourceUrl: "https://github.com/microsoft/skills"
entryUrl: "https://github.com/microsoft/skills/blob/cf77b1efbf3117501f4727c476894751311ee885/.github/plugins/azure-skills/skills/azure-diagnostics/troubleshooting/aks/load-balancer-and-ingress.md"
sourceRel: ".github/plugins/azure-skills/skills/azure-diagnostics/troubleshooting/aks/load-balancer-and-ingress.md"
rawUrl: "/raw/10-context-memory/microsoft-skills/.github/plugins/azure-skills/skills/azure-diagnostics/troubleshooting/aks/load-balancer-and-ingress.md"
sourceSha256: "411fe1e7af9b072011d1cdc34733051cf8c31d6fa59355c0b0a5b2421a5f4681"
pageSha256: "411fe1e7af9b072011d1cdc34733051cf8c31d6fa59355c0b0a5b2421a5f4681"
contentMode: "local-full"
zh: ""
---

# Load Balancer And Ingress Troubleshooting

Use this guide when AKS networking symptoms point at Azure load balancer provisioning, ingress controller behavior, or backend routing.

## Load Balancer Stuck In Pending

**Diagnostics:**

```bash
kubectl describe svc <svc> -n <ns>
# Events section reveals the actual Azure error

kubectl logs -n kube-system -l component=cloud-controller-manager --tail=100
```

**Error decision table:**

| Error in Events / CCM Logs                             | Cause                                  | Fix                                                                          |
| ------------------------------------------------------ | -------------------------------------- | ---------------------------------------------------------------------------- |
| `InsufficientFreeAddresses`                            | Subnet has no free IPs                 | Expand subnet CIDR; use Azure CNI Overlay; use NAT gateway instead           |
| `ensure(default/svc): failed... PublicIPAddress quota` | Public IP quota exhausted              | Request quota increase for Public IP Addresses in the region                 |
| `cannot find NSG`                                      | NSG name changed or detached           | Re-associate NSG to the AKS subnet; check `az aks show` for NSG name         |
| `reconciling NSG rules: failed`                        | NSG is locked or has conflicting rules | Remove resource lock; check for deny-all rules above AKS-managed rules       |
| `subnet not found`                                     | Wrong subnet name in annotation        | Verify subnet name: `az network vnet subnet list -g <rg> --vnet-name <vnet>` |
| No events, stuck Pending                               | CCM can't authenticate to Azure        | Check cluster managed identity access on the VNet resource group             |

---

## Ingress Not Routing Traffic

**Diagnostics:**

```bash
# Confirm controller is running
