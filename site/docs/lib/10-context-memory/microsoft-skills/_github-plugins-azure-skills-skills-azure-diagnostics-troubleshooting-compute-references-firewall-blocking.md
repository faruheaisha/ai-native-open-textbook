---
title: "Firewall Blocking Connectivity"
sourceId: "10-context-memory/microsoft-skills"
sourceTitle: "Microsoft Agent Skills"
sourceKind: "技能与配置库"
licenseLabel: "可转载"
lang: "英文"
tier: 3
volume: "10-context-memory"
sourceUrl: "https://github.com/microsoft/skills"
entryUrl: "https://github.com/microsoft/skills/blob/cf77b1efbf3117501f4727c476894751311ee885/.github/plugins/azure-skills/skills/azure-diagnostics/troubleshooting/compute/references/firewall-blocking.md"
sourceRel: ".github/plugins/azure-skills/skills/azure-diagnostics/troubleshooting/compute/references/firewall-blocking.md"
rawUrl: "/raw/10-context-memory/microsoft-skills/.github/plugins/azure-skills/skills/azure-diagnostics/troubleshooting/compute/references/firewall-blocking.md"
sourceSha256: "a855444fd7d42a1f874b97c8a9d354cecf7567f12ce14ce7b410aec4092f221c"
pageSha256: "a855444fd7d42a1f874b97c8a9d354cecf7567f12ce14ce7b410aec4092f221c"
contentMode: "local-full"
zh: ""
---

# Firewall Blocking Connectivity

Use when NSG/platform rules allow traffic but the guest OS firewall blocks RDP/SSH.

## Symptoms -> Solutions

| Symptom | OS | Action | Docs |
| --- | --- | --- | --- |
| Windows Firewall blocks RDP | Windows | Enable Remote Desktop firewall group | [Guest firewall] |
| BlockInboundAlways or bad policy | Windows | Reset to `blockinbound,allowoutbound` | [Firewall rule] |
| third-party AV/firewall | Windows | Stop for test, then reconfigure | [Guest firewall] |
| iptables/nftables blocks SSH | Linux | Insert allow rule or remove blocking chain | [SSH overview] |
| firewalld blocks SSH | Linux | Open SSH service in active zone | [SSH overview] |
| UFW blocks SSH | Linux | `ufw allow 22/tcp` or disable temporarily | [SSH overview] |
| no guest access | Any | Use Serial Console or offline repair | [Offline firewall] / [Linux repair] |

## Quick Commands

> Commands use VM agent/extensions. Run [Pre-Flight Safety Checks](/lib/10-context-memory/microsoft-skills/_github-plugins-azure-skills-skills-azure-diagnostics-troubleshooting-compute-references-cannot-connect-to-vm#pre-flight-safety-checks) first.

```bash
# Windows
az vm user reset-remote-desktop --name <vm> -g <rg>
az vm run-command invoke --name <vm> -g <rg> --command-id RunPowerShellScript \
  --scripts "netsh advfirewall firewall set rule group='Remote Desktop' new enable=yes"

# Linux
az vm run-command invoke --name <vm> -g <rg> --command-id RunShellScript \
  --scripts "iptables -L -n; iptables -I INPUT -p tcp --dport 22 -j ACCEPT"
az vm run-command invoke --name <vm> -g <rg> --command-id RunShellScript \
  --scripts "firewall-cmd --add-service=ssh --permanent && firewall-cmd --reload"
az vm run-command invoke --name <vm> -g <rg> --command-id RunShellScript \
  --scripts "ufw status; ufw allow 22/tcp"
```

[Guest firewall]: https://learn.microsoft.com/en-us/troubleshoot/azure/virtual-machines/windows/guest-os-firewall-blocking-inbound-traffic
[Firewall rule]: https://learn.microsoft.com/en-us/troubleshoot/azure/virtual-machines/windows/enable-disable-firewall-rule-guest-os
[Offline firewall]: https://learn.microsoft.com/en-us/troubleshoot/azure/virtual-machines/windows/disable-guest-os-firewall-windows
[SSH overview]: https://learn.microsoft.com/en-us/troubleshoot/azure/virtual-machines/linux/troubleshoot-ssh-connection
[Linux repair]: https://learn.microsoft.com/en-us/troubleshoot/azure/virtual-machines/linux/repair-linux-vm-using-azure-virtual-machine-repair-commands
