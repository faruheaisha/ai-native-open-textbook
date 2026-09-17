---
title: "Unable to SSH into the VM"
sourceId: "10-context-memory/microsoft-skills"
sourceTitle: "Microsoft Agent Skills"
sourceKind: "技能与配置库"
licenseLabel: "可转载"
lang: "英文"
tier: 3
volume: "10-context-memory"
sourceUrl: "https://github.com/microsoft/skills"
entryUrl: "https://github.com/microsoft/skills/blob/cf77b1efbf3117501f4727c476894751311ee885/.github/plugins/azure-skills/skills/azure-diagnostics/troubleshooting/compute/references/ssh-connectivity.md"
sourceRel: ".github/plugins/azure-skills/skills/azure-diagnostics/troubleshooting/compute/references/ssh-connectivity.md"
rawUrl: "/raw/10-context-memory/microsoft-skills/.github/plugins/azure-skills/skills/azure-diagnostics/troubleshooting/compute/references/ssh-connectivity.md"
sourceSha256: "75d519e09f1262deabf99fe02e90b66089cb7a37b157c11e3de5a3e89eb4db11"
pageSha256: "75d519e09f1262deabf99fe02e90b66089cb7a37b157c11e3de5a3e89eb4db11"
contentMode: "local-full"
zh: ""
---

# Unable to SSH into the VM

Use for Linux VM SSH failures.

## Symptoms -> Solutions

| Symptom | Action | Docs |
| --- | --- | --- |
| connection refused on 22 | Check sshd running/listening and port config | [SSH overview] |
| connection timed out | Check power state, public IP, NSG, routes | [SSH overview] |
| permission denied publickey/password | Verify user, key, password auth; reset key/password | [SSH detail] |
| host key verification failed | Remove stale `known_hosts` entry | [SSH detail] |
| server closed connection | Check disk, PAM, sshd config | [SSH detail] |
| hangs with no response | Check firewall, routes, NIC | [SSH overview] |
| Debian-specific failure | Check Debian networking/sshd doc | [Debian] |
| SELinux blocks sshd | Fix SELinux policy or temporarily permissive | [SELinux] |
| Entra ID SSH denied | Assign VM Admin/User Login role | [SSH overview] |
| VM not booting/UEFI failure | Use boot diagnostics and repair VM | [UEFI] |

## Quick Commands

> Commands use VM agent/extensions. Run [Pre-Flight Safety Checks](/lib/10-context-memory/microsoft-skills/_github-plugins-azure-skills-skills-azure-diagnostics-troubleshooting-compute-references-cannot-connect-to-vm#pre-flight-safety-checks) first.

```bash
az vm user reset-ssh --name <vm> -g <rg>
