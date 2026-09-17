---
title: "RDP Service and Configuration Issues"
sourceId: "10-context-memory/microsoft-skills"
sourceTitle: "Microsoft Agent Skills"
sourceKind: "技能与配置库"
licenseLabel: "可转载"
lang: "英文"
tier: 3
volume: "10-context-memory"
sourceUrl: "https://github.com/microsoft/skills"
entryUrl: "https://github.com/microsoft/skills/blob/cf77b1efbf3117501f4727c476894751311ee885/.github/plugins/azure-skills/skills/azure-diagnostics/troubleshooting/compute/references/rdp-service-config.md"
sourceRel: ".github/plugins/azure-skills/skills/azure-diagnostics/troubleshooting/compute/references/rdp-service-config.md"
rawUrl: "/raw/10-context-memory/microsoft-skills/.github/plugins/azure-skills/skills/azure-diagnostics/troubleshooting/compute/references/rdp-service-config.md"
sourceSha256: "1a6e3bb20d6e7ae9a7c7638ce74009bf0bdb82b632c3e560be5201e87ad44881"
pageSha256: "1a6e3bb20d6e7ae9a7c7638ce74009bf0bdb82b632c3e560be5201e87ad44881"
contentMode: "local-full"
zh: ""
---

# RDP Service and Configuration Issues

VM is reachable but the RDP service itself is broken or misconfigured.

## Symptoms → Solutions

| Symptom                                | Solution                                                               | Documentation                                                                                                                                    |
| -------------------------------------- | ---------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------ |
| TermService not running                | Start the service and set to Automatic                                 | [Reset RDP service](https://learn.microsoft.com/en-us/troubleshoot/azure/virtual-machines/windows/reset-rdp)                                     |
| RDP port changed from 3389             | Reset port or update NSG to allow the custom port                      | [Detailed RDP troubleshooting](https://learn.microsoft.com/en-us/troubleshoot/azure/virtual-machines/windows/detailed-troubleshoot-rdp)          |
| RDP disabled (fDenyTSConnections = 1)  | Reset RDP config via CLI or Portal                                     | [Reset RDP service](https://learn.microsoft.com/en-us/troubleshoot/azure/virtual-machines/windows/reset-rdp)                                     |
| TLS/SSL certificate expired or corrupt | Delete cert and restart TermService to regenerate                      | [RDP internal error](https://learn.microsoft.com/en-us/troubleshoot/azure/virtual-machines/windows/troubleshoot-rdp-internal-error)              |
| NLA/Security Layer mismatch            | Temporarily disable NLA for recovery                                   | [RDP general error](https://learn.microsoft.com/en-us/troubleshoot/azure/virtual-machines/windows/troubleshoot-rdp-general-error)                |
| GPO overriding local RDP settings      | Check `HKLM:\SOFTWARE\Policies\Microsoft\Windows NT\Terminal Services` | [Detailed RDP troubleshooting](https://learn.microsoft.com/en-us/troubleshoot/azure/virtual-machines/windows/detailed-troubleshoot-rdp)          |
| RDS licensing expired                  | Remove RDSH role or configure license server                           | [Specific RDP errors](https://learn.microsoft.com/en-us/troubleshoot/azure/virtual-machines/windows/troubleshoot-specific-rdp-errors#rdplicense) |

## Quick Commands

> ⚠️ **Warning:** Commands marked with ⚡ use the VM agent/extensions. Run [Pre-Flight Safety Checks](/lib/10-context-memory/microsoft-skills/_github-plugins-azure-skills-skills-azure-diagnostics-troubleshooting-compute-references-cannot-connect-to-vm#pre-flight-safety-checks) before using them.

```bash
# ⚡ Reset all RDP configuration to defaults
