---
title: "VPN Gateway & DNS Private Resolver Setup"
sourceId: "10-context-memory/microsoft-skills"
sourceTitle: "Microsoft Agent Skills"
sourceKind: "技能与配置库"
licenseLabel: "可转载"
lang: "英文"
tier: 3
volume: "10-context-memory"
sourceUrl: "https://github.com/microsoft/skills"
entryUrl: "https://github.com/microsoft/skills/blob/cf77b1efbf3117501f4727c476894751311ee885/.github/plugins/azure-skills/skills/microsoft-foundry/resource/private-network/references/vpn-dns-setup.md"
sourceRel: ".github/plugins/azure-skills/skills/microsoft-foundry/resource/private-network/references/vpn-dns-setup.md"
rawUrl: "/raw/10-context-memory/microsoft-skills/.github/plugins/azure-skills/skills/microsoft-foundry/resource/private-network/references/vpn-dns-setup.md"
sourceSha256: "c2cb4e6f9d48ddac7407e501454ca3fed157d5613d5879a89c8974a9f29d5887"
pageSha256: "c2cb4e6f9d48ddac7407e501454ca3fed157d5613d5879a89c8974a9f29d5887"
contentMode: "local-full"
zh: ""
---

# VPN Gateway & DNS Private Resolver Setup

Post-deployment add-on for private network templates (T10, T15–T19). Creates a point-to-site VPN Gateway and DNS Private Resolver so the user can connect from their dev machine and resolve private DNS zones.

## Assumptions

| Property | Value | Rationale |
|----------|-------|-----------|
| Auth | Microsoft Entra ID (AAD) only | No certificate management |
| Tunnel | OpenVPN | Cross-platform, Azure VPN Client |
| Gateway SKU | VpnGw1AZ | Zone-redundant, same cost as VpnGw1 |
| GatewaySubnet | /24 recommended | Agent computes from available VNet space |
| DNS resolver subnet | /28 minimum | Agent computes from available VNet space |
| Client address pool | `172.16.201.0/24` | Non-overlapping with VNet |

## Subnet Layout

Adds two subnets to the existing VNet. Uses the next available range after the agent and PE subnets.

| Subnet | CIDR (default) | Purpose | Delegation |
|--------|----------------|---------|------------|
| `GatewaySubnet` | Computed | VPN Gateway (name is required by Azure) | None |
| `dns-resolver-inbound` | Computed | DNS Private Resolver inbound endpoint | `Microsoft.Network/dnsResolvers` |

> ⚠️ **Warning:** `GatewaySubnet` is a reserved name — Azure requires this exact name for VPN Gateway.

## Pre-Deployment

### 1. Discover Available Subnets

List existing subnets to find free address space:

```bash
az network vnet subnet list \
