---
title: "Network Policy Troubleshooting"
sourceId: "10-context-memory/microsoft-skills"
sourceTitle: "Microsoft Agent Skills"
sourceKind: "技能与配置库"
licenseLabel: "可转载"
lang: "英文"
tier: 3
volume: "10-context-memory"
sourceUrl: "https://github.com/microsoft/skills"
entryUrl: "https://github.com/microsoft/skills/blob/cf77b1efbf3117501f4727c476894751311ee885/.github/plugins/azure-skills/skills/azure-diagnostics/troubleshooting/aks/network-policy.md"
sourceRel: ".github/plugins/azure-skills/skills/azure-diagnostics/troubleshooting/aks/network-policy.md"
rawUrl: "/raw/10-context-memory/microsoft-skills/.github/plugins/azure-skills/skills/azure-diagnostics/troubleshooting/aks/network-policy.md"
sourceSha256: "557901c258eb637baad32466e6e4eb9e570fa66deebb21520cef3436fe4672ce"
pageSha256: "557901c258eb637baad32466e6e4eb9e570fa66deebb21520cef3436fe4672ce"
contentMode: "local-full"
zh: ""
---

# Network Policy Troubleshooting

Use this guide when pod-to-pod or pod-to-service traffic is selectively blocked and the symptom points at ingress or egress filtering.

```bash
# List all policies in the namespace - check both ingress and egress
kubectl get networkpolicy -n <ns> -o yaml

# Check for a default-deny policy (blocks everything unless explicitly allowed)
kubectl get networkpolicy -n <ns> -o jsonpath='{range .items[?(@.spec.podSelector=={})]}{.metadata.name}{"\n"}{end}'
```

**AKS network policy engine check:** Azure NPM (Azure CNI): `kubectl get pods -n kube-system -l k8s-app=azure-npm`. Calico: `kubectl get pods -n calico-system`.

Policy audit: source labels, destination labels, destination ingress rules, and source egress rules must all line up. With default-deny, explicitly allow UDP/TCP 53 to kube-dns.
