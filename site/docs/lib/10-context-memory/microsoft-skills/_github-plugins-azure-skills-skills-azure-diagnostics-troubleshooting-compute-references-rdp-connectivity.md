---
title: "Unable to RDP into the VM"
sourceId: "10-context-memory/microsoft-skills"
sourceTitle: "Microsoft Agent Skills"
sourceKind: "技能与配置库"
licenseLabel: "可转载"
lang: "英文"
tier: 3
volume: "10-context-memory"
sourceUrl: "https://github.com/microsoft/skills"
entryUrl: "https://github.com/microsoft/skills/blob/cf77b1efbf3117501f4727c476894751311ee885/.github/plugins/azure-skills/skills/azure-diagnostics/troubleshooting/compute/references/rdp-connectivity.md"
sourceRel: ".github/plugins/azure-skills/skills/azure-diagnostics/troubleshooting/compute/references/rdp-connectivity.md"
rawUrl: "/raw/10-context-memory/microsoft-skills/.github/plugins/azure-skills/skills/azure-diagnostics/troubleshooting/compute/references/rdp-connectivity.md"
sourceSha256: "e3d5a70e4a027e639602967107eb53be3b40a9360898bb843508cd7214379247"
pageSha256: "e3d5a70e4a027e639602967107eb53be3b40a9360898bb843508cd7214379247"
contentMode: "local-full"
zh: ""
---

# Unable to RDP into the VM

Use for Windows VM RDP timeouts, refused connections, black screen, or RDP error dialogs.

## Symptoms -> Solutions

| Symptom | Action | Docs |
| --- | --- | --- |
| timeout/no response | Check power state, public IP, NSG allow for 3389 | [RDP NSG] |
| timeout with NSG OK | Check guest firewall | [Guest firewall] |
| credentials failed | Reset password or username format | [RDP errors] |
| internal/security/authentication error | Check TLS, NLA, CredSSP, certificate, clock skew | [Internal] / [General] |
| black screen after login | Check Explorer, GPU driver, GPO, session state | [Detailed] |
| license server unavailable | Fix or remove RDS licensing role | [RDP errors] |
| cannot find computer | Check public IP, DNS, and VM allocation | [RDP errors] |
| connects then disconnects | Check session limits, idle timeout, resources | [RDP overview] |
| works from some IPs | Check NSG source restriction | [RDP NSG] |
| Event IDs in logs | Match event ID to documented cause | [Event IDs] |
| guest NIC disabled | Enable NIC via safe command path | [RDP NIC] |

## Quick Commands

> Commands marked by reset/update use VM agent/extensions. Run [Pre-Flight Safety Checks](/lib/10-context-memory/microsoft-skills/_github-plugins-azure-skills-skills-azure-diagnostics-troubleshooting-compute-references-cannot-connect-to-vm#pre-flight-safety-checks) first.

```bash
az vm get-instance-view --name <vm> -g <rg> --query "instanceView.statuses" -o table
az network nsg rule list --nsg-name <nsg> -g <rg> -o table
az network watcher test-ip-flow --direction Inbound --protocol TCP \
