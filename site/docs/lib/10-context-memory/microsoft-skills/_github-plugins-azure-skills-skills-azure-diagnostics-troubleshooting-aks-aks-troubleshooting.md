---
title: "AKS Troubleshooting Guide"
sourceId: "10-context-memory/microsoft-skills"
sourceTitle: "Microsoft Agent Skills"
sourceKind: "技能与配置库"
licenseLabel: "可转载"
lang: "英文"
tier: 3
volume: "10-context-memory"
sourceUrl: "https://github.com/microsoft/skills"
entryUrl: "https://github.com/microsoft/skills/blob/cf77b1efbf3117501f4727c476894751311ee885/.github/plugins/azure-skills/skills/azure-diagnostics/troubleshooting/aks/aks-troubleshooting.md"
sourceRel: ".github/plugins/azure-skills/skills/azure-diagnostics/troubleshooting/aks/aks-troubleshooting.md"
rawUrl: "/raw/10-context-memory/microsoft-skills/.github/plugins/azure-skills/skills/azure-diagnostics/troubleshooting/aks/aks-troubleshooting.md"
sourceSha256: "913646320959dd89a3d9d282a984a99bfb8b0ee5b2e694d432e2bcfd3ed48c04"
pageSha256: "913646320959dd89a3d9d282a984a99bfb8b0ee5b2e694d432e2bcfd3ed48c04"
contentMode: "local-full"
zh: ""
---

# AKS Troubleshooting Guide

Primary AKS troubleshooting guide for incidents routed from [../../SKILL.md](/lib/10-context-memory/microsoft-skills/_github-plugins-azure-skills-skills-azure-diagnostics-SKILL).

## When to Use This Guide

- lifecycle, access, node, `kube-system`, workload, ingress, DNS, or scaling issues
- `kubectl` cannot connect, nodes are `NotReady`, or pods are unhealthy

## Scenario Playbooks

| Scenario                                                      | Reference                                        |
| ------------------------------------------------------------- | ------------------------------------------------ |
| broad cluster investigation                                   | [general-diagnostics.md](/lib/10-context-memory/microsoft-skills/_github-plugins-azure-skills-skills-azure-diagnostics-troubleshooting-aks-general-diagnostics) |
| workload, crash, image pull, readiness, or pending pod issues | [pod-failures.md](/lib/10-context-memory/microsoft-skills/_github-plugins-azure-skills-skills-azure-diagnostics-troubleshooting-aks-pod-failures)               |
| node health, scaling, pressure, upgrade, or zone issues       | [node-issues.md](/lib/10-context-memory/microsoft-skills/_github-plugins-azure-skills-skills-azure-diagnostics-troubleshooting-aks-node-issues)                 |
| service, ingress, DNS, or network policy issues               | [networking.md](/lib/10-context-memory/microsoft-skills/_github-plugins-azure-skills-skills-azure-diagnostics-troubleshooting-aks-networking)                   |

## Tool Selection For Diagnostics

When gathering AKS diagnostic evidence, prefer `mcp_azure_mcp_aks`, then the smallest discovered AKS-MCP tool that fits the read, then supporting Azure tools such as `mcp_azure_mcp_applens`, `mcp_azure_mcp_monitor`, or `mcp_azure_mcp_resourcehealth`. Use raw `az aks` and `kubectl` only when the AKS-MCP surface cannot perform the needed check.

When standard diagnostics do not reveal root cause, use **Inspektor Gadget** for real-time, low-level node and pod observability (DNS traces, TCP traces, process snapshots, file access traces). See [references/inspektor-gadget.md](/lib/10-context-memory/microsoft-skills/_github-plugins-azure-skills-skills-azure-diagnostics-troubleshooting-aks-references-inspektor-gadget) for the gadget catalog, the `run-ig` script, and symptom-to-gadget mapping.

See [references/aks-mcp.md](/lib/10-context-memory/microsoft-skills/_github-plugins-azure-skills-skills-azure-diagnostics-troubleshooting-aks-references-aks-mcp), [references/structured-input-modes.md](/lib/10-context-memory/microsoft-skills/_github-plugins-azure-skills-skills-azure-diagnostics-troubleshooting-aks-references-structured-input-modes), [references/command-flows.md](/lib/10-context-memory/microsoft-skills/_github-plugins-azure-skills-skills-azure-diagnostics-troubleshooting-aks-references-command-flows)

## Required Inputs

- subscription or active Azure context
- resource group and cluster name
- symptom summary
- first observed time or recent change window
- impacted namespace, workload, service, or ingress when known

If cluster identity is missing, stop and ask for it.

## Scope Buckets

- Lifecycle: create, update, start, stop, upgrade, or provisioning failures
- API access: kubeconfig, auth, private endpoint, DNS, or reachability problems
- Nodes: missing nodes, `NotReady`, pressure, CNI, kubelet, certificate, or VMSS drift
- `kube-system`: CoreDNS, metrics-server, konnectivity, ingress, CNI, CSI, or add-on failures
- Workloads: `Pending`, `CrashLoopBackOff`, `OOMKilled`, PVC, quota, secret, readiness, or dependency issues
- Connectivity and DNS: pod -> service -> endpoints -> ingress/load balancer -> DNS -> network controls
- Scaling: node pool sizing, pending pods, autoscaler config, metrics, quota, or subnet constraints

## Evidence Order

1. Azure-side state first: cluster state, resource health, recent operations, node pool state, detector or monitoring output.
2. Kubernetes-side state second: cluster reachability, nodes, `kube-system`, events, affected namespace, pod detail, logs.
3. Use detector, warning-event, or metrics modes when the incoming data already matches them.
4. Deep diagnostics; when steps 1–3 do not reveal root cause, use [inspektor-gadget.md](/lib/10-context-memory/microsoft-skills/_github-plugins-azure-skills-skills-azure-diagnostics-troubleshooting-aks-references-inspektor-gadget) for real-time tracing and snapshots on the affected node.

## Workflow

1. Get cluster context.
2. Classify the problem by scope bucket.
3. Prefer Azure-side evidence before Kubernetes-side evidence.
4. Use the matching AKS-MCP path first, then the documented CLI fallback if MCP cannot perform that read.
5. Return evidence, failure domain, confidence, next checks, remediation, and escalation.

## Error Patterns

- No cluster context: ask for subscription, resource group, and cluster name.
- MCP unavailable: fall back to safe `az aks` and `kubectl` reads.
- `kubectl` blocked: separate auth problems from network reachability.
- Logs or metrics missing: use events, node state, and resource descriptions.
- Detector noise: ignore `emergingIssues`, prefer critical findings, rank the most actionable signal first.

## Safe Fallback Checks

When AKS-MCP cannot perform the baseline read, run the **[`aks-baseline`](https://github.com/microsoft/skills/blob/cf77b1efbf3117501f4727c476894751311ee885/.github/plugins/azure-skills/skills/azure-diagnostics/scripts/aks-baseline.sh)** script. It executes the read-only cluster + Kubernetes baseline sweep (provisioning state, node pools, activity log, node readiness, unhealthy pods, kube-system health, warning events) and returns a single labeled digest:

```bash
# bash
