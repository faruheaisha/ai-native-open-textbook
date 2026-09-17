---
title: "Agent Skills"
sourceId: "10-context-memory/openai-skills"
sourceTitle: "Agent Skills"
sourceKind: "技能与配置库"
licenseLabel: "仅引用"
lang: "英文"
tier: 3
volume: "10-context-memory"
sourceUrl: "https://github.com/openai/skills"
entryUrl: "https://github.com/openai/skills/blob/49f948faa9258a0c61caceaf225e179651397431/skills/.curated/winui-app/references/sample-source-map.md"
sourceRel: "skills/.curated/winui-app/references/sample-source-map.md"
rawUrl: "/raw/10-context-memory/openai-skills/skills/.curated/winui-app/references/sample-source-map.md"
sourceSha256: "fd03ee0e1abd41bd3cf2fa7f5131686498597d56122f219742854ac4d33f0ce2"
pageSha256: "fd03ee0e1abd41bd3cf2fa7f5131686498597d56122f219742854ac4d33f0ce2"
contentMode: "local-full"
zh: ""
---

# Agent Skills

## What This Reference Is For

Use this file when you know the task but need to identify the best canonical source to inspect first.

| Task | First source | Backup source |
| --- | --- | --- |
| Check whether a PC can build WinUI apps | `../SKILL.md` | `foundation-environment-audit-and-remediation.md` |
| Install missing prerequisites | `../SKILL.md` | `foundation-environment-audit-and-remediation.md` |
| Start a new packaged or unpackaged app | `../SKILL.md` | `foundation-setup-and-project-selection.md` |
| Choose packaged vs unpackaged | Learn Windows App SDK deployment docs | WindowsAppSDK-Samples `Samples/Unpackaged` |
| Build a shell with navigation | WinUI Gallery navigation pages | Learn navigation basics |
| Design a custom title bar | Learn title bar guidance | WinUI Gallery title bar samples |
| Add Mica or system backdrops | Learn Mica guidance | WindowsAppSDK-Samples `Samples/Mica` |
| Design a settings page | WinUI Gallery control pages | CommunityToolkit `SettingsControls` |
| Pick a control for a list or collection | WinUI Gallery control pages | Learn responsive/layout guidance |
| Improve accessibility | Learn accessibility docs | WinUI Gallery standard control behavior |
| Diagnose responsiveness | Learn `winui-perf.md` | WPR/WPA guidance in `testing-debugging-and-review-checklists.md` |
| Add notifications or activation flows | WindowsAppSDK-Samples | Learn Windows App SDK lifecycle docs |
| Decide whether to add CommunityToolkit | `community-toolkit-controls-and-helpers.md` | Toolkit component directories |

## Source Preferences

- Learn first for requirements and behavioral guidance.
- WinUI Gallery first for concrete control usage and shell composition.
- WindowsAppSDK-Samples first for scenario APIs and platform integration.
- CommunityToolkit only when the task clearly requires Toolkit-specific functionality.
