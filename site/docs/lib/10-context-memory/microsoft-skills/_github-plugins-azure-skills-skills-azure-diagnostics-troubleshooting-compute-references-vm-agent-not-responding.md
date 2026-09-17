---
title: "VM Agent Not Responding"
sourceId: "10-context-memory/microsoft-skills"
sourceTitle: "Microsoft Agent Skills"
sourceKind: "技能与配置库"
licenseLabel: "可转载"
lang: "英文"
tier: 3
volume: "10-context-memory"
sourceUrl: "https://github.com/microsoft/skills"
entryUrl: "https://github.com/microsoft/skills/blob/cf77b1efbf3117501f4727c476894751311ee885/.github/plugins/azure-skills/skills/azure-diagnostics/troubleshooting/compute/references/vm-agent-not-responding.md"
sourceRel: ".github/plugins/azure-skills/skills/azure-diagnostics/troubleshooting/compute/references/vm-agent-not-responding.md"
rawUrl: "/raw/10-context-memory/microsoft-skills/.github/plugins/azure-skills/skills/azure-diagnostics/troubleshooting/compute/references/vm-agent-not-responding.md"
sourceSha256: "270c2b73af1ac40d9cc9b0acc6b830363f6fa1a76d5591b2e275cfcbd78f2adc"
pageSha256: "270c2b73af1ac40d9cc9b0acc6b830363f6fa1a76d5591b2e275cfcbd78f2adc"
contentMode: "local-full"
zh: ""
---

# VM Agent Not Responding

Run Command and password reset depend on the VM agent. If the agent is unhealthy, alternative methods are needed.

> ⚠️ **OS Note:** Serial Console, Boot Diagnostics, and repair VM commands are available for both Windows and Linux but use separate doc pages and tools. Match the correct OS below.

## Symptoms → Solutions

| Symptom                                                          | OS      | Solution                                                 | Documentation                                                                                                                                                       |
| ---------------------------------------------------------------- | ------- | -------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Run Command times out                                            | Windows | VM agent may be down — use Serial Console instead        | [Serial Console — Windows](https://learn.microsoft.com/en-us/troubleshoot/azure/virtual-machines/windows/serial-console-overview)                                   |
| Run Command times out                                            | Linux   | VM agent may be down — use Serial Console instead        | [Serial Console — Linux](https://learn.microsoft.com/en-us/troubleshoot/azure/virtual-machines/linux/serial-console-linux)                                         |
| Password reset fails via Portal/CLI                              | Windows | VMAccess extension can't communicate — use offline reset | [Reset password without agent](https://learn.microsoft.com/en-us/troubleshoot/azure/virtual-machines/windows/reset-local-password-without-agent)                    |
| Password/key reset fails via Portal/CLI                          | Linux   | VMAccess extension can't communicate — use Serial Console | [Serial Console — Linux](https://learn.microsoft.com/en-us/troubleshoot/azure/virtual-machines/linux/serial-console-linux)                                        |
| VM not booting (Boot Diagnostics shows BSOD/stuck)               | Windows | OS-level issue — use repair VM for offline fix           | [Repair Windows VM](https://learn.microsoft.com/en-us/troubleshoot/azure/virtual-machines/windows/repair-windows-vm-using-azure-virtual-machine-repair-commands)    |
| VM not booting (Boot Diagnostics shows kernel panic/stuck)       | Linux   | Use repair VM for offline Linux disk fix                 | [Repair Linux VM](https://learn.microsoft.com/en-us/troubleshoot/azure/virtual-machines/linux/repair-linux-vm-using-azure-virtual-machine-repair-commands)          |
| VMAccess extension error on domain controller                    | Windows | VMAccess doesn't support DCs — use Serial Console        | [Serial Console — Windows](https://learn.microsoft.com/en-us/troubleshoot/azure/virtual-machines/windows/serial-console-overview)                                   |

## Quick Commands

```bash
# Connect to Serial Console via CLI
