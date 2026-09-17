---
title: "Network Connectivity Problems"
sourceId: "10-context-memory/microsoft-skills"
sourceTitle: "Microsoft Agent Skills"
sourceKind: "技能与配置库"
licenseLabel: "可转载"
lang: "英文"
tier: 3
volume: "10-context-memory"
sourceUrl: "https://github.com/microsoft/skills"
entryUrl: "https://github.com/microsoft/skills/blob/cf77b1efbf3117501f4727c476894751311ee885/.github/plugins/azure-skills/skills/azure-diagnostics/troubleshooting/compute/references/network-connectivity.md"
sourceRel: ".github/plugins/azure-skills/skills/azure-diagnostics/troubleshooting/compute/references/network-connectivity.md"
rawUrl: "/raw/10-context-memory/microsoft-skills/.github/plugins/azure-skills/skills/azure-diagnostics/troubleshooting/compute/references/network-connectivity.md"
sourceSha256: "0d4dab14b9ee2b8f05faa0ecc2fc08592a12d05ee23489e4c7a52c5300d0d0fc"
pageSha256: "0d4dab14b9ee2b8f05faa0ecc2fc08592a12d05ee23489e4c7a52c5300d0d0fc"
contentMode: "local-full"
zh: ""
---

# Network Connectivity Problems

Use when the VM is running but unreachable due to Azure network configuration: NSG, routing, NIC, public IP, or DNS.

## Symptoms -> Solutions

| Symptom | OS | Action | Docs |
| --- | --- | --- | --- |
| no NSG allow for RDP/SSH | Any | Add inbound TCP 3389/22 from approved source | [RDP NSG] |
| NIC and subnet NSGs conflict | Any | Traffic must pass both; inspect effective rules | [Traffic filter] |
| UDR sends traffic to NVA | Any | Check effective routes and NVA forwarding | [Routing] |
| no public IP | Any | Add public IP or use Bastion/private path | [Public IP] |
| guest NIC disabled/down | Windows/Linux | Enable NIC via Run Command or Serial Console | [RDP NIC] / [SSH overview] |
| static guest IP misconfig | Windows/Linux | Restore DHCP guest config | [Reset NIC] / [SSH overview] |
| ghost NIC after disk swap/resize | Windows | Reset network interface | [Reset NIC] |
| DNS failure | Any | Check DNS; Azure default is `168.63.129.16` | [DHCP] |

## Quick Commands

```bash
az network nic list-effective-nsg --name <nic> -g <rg>
az network nic show-effective-route-table --name <nic> -g <rg> -o table
az vm list-ip-addresses --name <vm> -g <rg> -o table
