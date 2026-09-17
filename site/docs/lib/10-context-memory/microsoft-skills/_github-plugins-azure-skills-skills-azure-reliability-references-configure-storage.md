---
title: "Configure Storage Redundancy"
sourceId: "10-context-memory/microsoft-skills"
sourceTitle: "Microsoft Agent Skills"
sourceKind: "技能与配置库"
licenseLabel: "可转载"
lang: "英文"
tier: 3
volume: "10-context-memory"
sourceUrl: "https://github.com/microsoft/skills"
entryUrl: "https://github.com/microsoft/skills/blob/cf77b1efbf3117501f4727c476894751311ee885/.github/plugins/azure-skills/skills/azure-reliability/references/configure-storage.md"
sourceRel: ".github/plugins/azure-skills/skills/azure-reliability/references/configure-storage.md"
rawUrl: "/raw/10-context-memory/microsoft-skills/.github/plugins/azure-skills/skills/azure-reliability/references/configure-storage.md"
sourceSha256: "e2e4c1ec09593e2e7bc1bfdab69404a361424ef1507348e1ead0efb88d0fad60"
pageSha256: "e2e4c1ec09593e2e7bc1bfdab69404a361424ef1507348e1ead0efb88d0fad60"
contentMode: "local-full"
zh: ""
---

# Configure Storage Redundancy

## Overview

Storage accounts must match or exceed the redundancy level of the compute they support. Zone-redundant compute requires at minimum ZRS storage.

## Upgrade Paths

| Current | Target | Method | Downtime |
|---|---|---|---|
| Standard_LRS → Standard_ZRS | ZRS | Live migration or manual | None (live) or planned (manual) |
| Standard_LRS → Standard_GRS | GRS | In-place update | None |
| Standard_LRS → Standard_GZRS | GZRS | In-place update | None |
| Premium_LRS → Premium_ZRS | ZRS | Manual migration only | Planned |

## In-Place Upgrade (LRS → GRS/GZRS)

GRS and GZRS upgrades can be done in-place immediately:

```bash
# Upgrade to GZRS (zone + region redundant — recommended)
az storage account update \
