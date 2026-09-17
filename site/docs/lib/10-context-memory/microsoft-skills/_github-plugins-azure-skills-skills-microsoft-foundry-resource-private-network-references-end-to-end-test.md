---
title: "End-to-End Test (VNet Access Required)"
sourceId: "10-context-memory/microsoft-skills"
sourceTitle: "Microsoft Agent Skills"
sourceKind: "技能与配置库"
licenseLabel: "可转载"
lang: "英文"
tier: 3
volume: "10-context-memory"
sourceUrl: "https://github.com/microsoft/skills"
entryUrl: "https://github.com/microsoft/skills/blob/cf77b1efbf3117501f4727c476894751311ee885/.github/plugins/azure-skills/skills/microsoft-foundry/resource/private-network/references/end-to-end-test.md"
sourceRel: ".github/plugins/azure-skills/skills/microsoft-foundry/resource/private-network/references/end-to-end-test.md"
rawUrl: "/raw/10-context-memory/microsoft-skills/.github/plugins/azure-skills/skills/microsoft-foundry/resource/private-network/references/end-to-end-test.md"
sourceSha256: "f8919ed4cf7a14f7fa30420bdcdde18716bcbcf1c68e832a9d00443e7576d63a"
pageSha256: "f8919ed4cf7a14f7fa30420bdcdde18716bcbcf1c68e832a9d00443e7576d63a"
contentMode: "local-full"
zh: ""
---

# End-to-End Test (VNet Access Required)

Continues from [post-deployment-validation.md](/lib/10-context-memory/microsoft-skills/_github-plugins-azure-skills-skills-microsoft-foundry-resource-private-network-references-post-deployment-validation). Steps 1–3 there must be complete first.

## 4. VNet Access Setup

> ⚠️ The remaining tests require connectivity to the VNet.

Use `AskUserQuestion`: **"Steps 1-3 are done. The remaining tests need VNet access. How do you want to proceed?"**
Options:
- `I have a Bastion VM / jump box`
- `Set up a point-to-site VPN for me` — read [vpn-dns-setup.md](/lib/10-context-memory/microsoft-skills/_github-plugins-azure-skills-skills-microsoft-foundry-resource-private-network-references-vpn-dns-setup)
- `I have VPN / ExpressRoute already`
- `Skip testing for now`

**Bastion VM:** User has direct access to all private endpoints from the VM. Setup is complete — do NOT proceed to Step 5.

---

## 5. End-to-End Test (VPN users only)

Three phases:
1. **Network** — DNS resolution + port 443 reachability
2. **Agent Lifecycle** — Create agent, thread, run, verify, cleanup
3. **Isolation Proof** — Repeat with VPN off — expect 403

> ⚠️ Chromium browsers may bypass VPN DNS via Secure DNS (DoH). If portal shows "Error loading agents" but CLI works, disable Secure DNS.

### Requirements

```bash
pip install azure-ai-projects azure-identity azure-ai-agents
```

### Phase 1: Network Validation

Resolve DNS and test port 443 for all private endpoints. Substitute actual resource names from the deployment.

PowerShell:

```powershell
$endpoints = @(
