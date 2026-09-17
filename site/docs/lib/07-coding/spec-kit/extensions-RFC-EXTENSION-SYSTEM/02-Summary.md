---
title: "Spec Kit（GitHub 官方规格驱动开发工具包）"
sourceId: "07-coding/spec-kit"
sourceTitle: "Spec Kit（GitHub 官方规格驱动开发工具包）"
sourceKind: "产品仓库"
licenseLabel: "可转载"
lang: "英文"
tier: 2
volume: "07-coding"
sourceUrl: "https://github.com/github/spec-kit"
entryUrl: "https://github.com/github/spec-kit/blob/c173bf19a6654e3b05386ec3599349a55282b897/extensions/RFC-EXTENSION-SYSTEM.md"
sourceRel: "extensions/RFC-EXTENSION-SYSTEM.md"
rawUrl: "/raw/07-coding/spec-kit/extensions/RFC-EXTENSION-SYSTEM.md"
sourceSha256: "5947ce6c3e36a91188a44748eaa424e512cef6d1069d9e5b7c61904b4df102eb"
pageSha256: "c73de005ff37329fce563117bc7e13e977c67c72cb7f25c4bb813a96d5f46fbb"
contentMode: "local-full"
zh: ""
---

## Summary

Introduce an extension system to Spec Kit that allows modular integration with external tools (Jira, Linear, Azure DevOps, etc.) without bloating the core framework. Extensions are self-contained packages installed into `.specify/extensions/` with declarative manifests, versioned independently, and discoverable through a central catalog.
