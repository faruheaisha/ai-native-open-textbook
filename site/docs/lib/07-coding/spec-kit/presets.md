---
title: "Presets"
sourceId: "07-coding/spec-kit"
sourceTitle: "Spec Kit（GitHub 官方规格驱动开发工具包）"
sourceKind: "产品仓库"
licenseLabel: "可转载"
lang: "英文"
tier: 2
volume: "07-coding"
sourceUrl: "https://github.com/github/spec-kit"
entryUrl: "https://github.com/github/spec-kit/blob/c173bf19a6654e3b05386ec3599349a55282b897/presets/README.md"
sourceRel: "presets/README.md"
rawUrl: "/raw/07-coding/spec-kit/presets/README.md"
sourceSha256: "c0f520c5ec455e989c85ab92d5ef40d75815f6a373f5c5787353c93904d85270"
pageSha256: "c0f520c5ec455e989c85ab92d5ef40d75815f6a373f5c5787353c93904d85270"
contentMode: "local-full"
zh: ""
---

# Presets

Presets are stackable, priority-ordered collections of template and command overrides for Spec Kit. They let you customize both the artifacts produced by the Spec-Driven Development workflow (specs, plans, tasks, checklists, constitutions) and the commands that guide the LLM in creating them — without forking or modifying core files.

## How It Works

When Spec Kit needs a template (e.g. `spec-template`), it walks a resolution stack:

1. `.specify/templates/overrides/` — project-local one-off overrides
