---
title: "Credential and Authentication Errors"
sourceId: "10-context-memory/microsoft-skills"
sourceTitle: "Microsoft Agent Skills"
sourceKind: "技能与配置库"
licenseLabel: "可转载"
lang: "英文"
tier: 3
volume: "10-context-memory"
sourceUrl: "https://github.com/microsoft/skills"
entryUrl: "https://github.com/microsoft/skills/blob/cf77b1efbf3117501f4727c476894751311ee885/.github/plugins/azure-skills/skills/azure-diagnostics/troubleshooting/compute/references/credential-auth-errors.md"
sourceRel: ".github/plugins/azure-skills/skills/azure-diagnostics/troubleshooting/compute/references/credential-auth-errors.md"
rawUrl: "/raw/10-context-memory/microsoft-skills/.github/plugins/azure-skills/skills/azure-diagnostics/troubleshooting/compute/references/credential-auth-errors.md"
sourceSha256: "741fdd4facf000ddaf01f0b6d0654a0f12b0421ba9f75d626d51a25babd1805a"
pageSha256: "741fdd4facf000ddaf01f0b6d0654a0f12b0421ba9f75d626d51a25babd1805a"
contentMode: "local-full"
zh: ""
---

# Credential and Authentication Errors

Use when the VM is reachable but sign-in fails.

## Symptoms -> Solutions

| Symptom | OS | Action | Docs |
| --- | --- | --- | --- |
| credentials failed, must change password, account expired | Windows | Reset password; extend account if needed | [Reset RDP] |
| trust relationship failed | Windows | Reset machine account or rejoin domain | [RDP overview] |
| access denied, connection denied, wrong local/domain format | Windows | Add Remote Desktop Users; use `VMNAME\user` or `DOMAIN\user` | [RDP errors] |
| CredSSP encryption oracle | Windows | Temporary client workaround; patch both sides | [CredSSP] |
| permission denied publickey/password | Linux | Verify user/key/password auth; reset key/password if needed | [SSH detail] |
| locked account | Linux | Unlock via Run Command or Serial Console | [SSH overview] |
| Entra ID SSH denied | Linux | Assign VM Admin/User Login role | [SSH overview] |
| sudo prompt fails | Linux | Fix sudoers via Run Command or Serial Console | [SSH overview] |

## Quick Commands

> Commands use VM agent/extensions. Run [Pre-Flight Safety Checks](/lib/10-context-memory/microsoft-skills/_github-plugins-azure-skills-skills-azure-diagnostics-troubleshooting-compute-references-cannot-connect-to-vm#pre-flight-safety-checks) first.

```bash
# Windows password / RDP reset
