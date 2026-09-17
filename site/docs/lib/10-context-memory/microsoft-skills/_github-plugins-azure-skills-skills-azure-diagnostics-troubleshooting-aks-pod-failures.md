---
title: "Pod Failures & Application Issues"
sourceId: "10-context-memory/microsoft-skills"
sourceTitle: "Microsoft Agent Skills"
sourceKind: "技能与配置库"
licenseLabel: "可转载"
lang: "英文"
tier: 3
volume: "10-context-memory"
sourceUrl: "https://github.com/microsoft/skills"
entryUrl: "https://github.com/microsoft/skills/blob/cf77b1efbf3117501f4727c476894751311ee885/.github/plugins/azure-skills/skills/azure-diagnostics/troubleshooting/aks/pod-failures.md"
sourceRel: ".github/plugins/azure-skills/skills/azure-diagnostics/troubleshooting/aks/pod-failures.md"
rawUrl: "/raw/10-context-memory/microsoft-skills/.github/plugins/azure-skills/skills/azure-diagnostics/troubleshooting/aks/pod-failures.md"
sourceSha256: "930c8da84023a13da2fc92793f283eb7252bb03779b611716852338fe79a2126"
pageSha256: "930c8da84023a13da2fc92793f283eb7252bb03779b611716852338fe79a2126"
contentMode: "local-full"
zh: ""
---

# Pod Failures & Application Issues

## Evidence Bundle Script

For **any** pod symptom below, run the **pod-evidence** script to collect the same
read-only evidence bundle. Per pod it digests **STATUS**, **STATE** (exit code, reason,
last state), **EVENTS**, current/previous **LOGS**, and **RESOURCES** (requests vs
`top`). It only gathers; interpret with the tables.

Bash [`../../scripts/pod-evidence.sh`](https://github.com/microsoft/skills/blob/cf77b1efbf3117501f4727c476894751311ee885/.github/plugins/azure-skills/skills/azure-diagnostics/scripts/pod-evidence.sh) · PowerShell [`../../scripts/pod-evidence.ps1`](https://github.com/microsoft/skills/blob/cf77b1efbf3117501f4727c476894751311ee885/.github/plugins/azure-skills/skills/azure-diagnostics/scripts/pod-evidence.ps1)

```bash
