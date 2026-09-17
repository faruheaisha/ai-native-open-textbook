---
title: "RFC: Spec Kit Extension System"
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
pageSha256: "d29ed995b6c04fb1eff91d690e63ad8ddeb372c977a7832d10a48fd2d682cfd3"
contentMode: "local-full"
zh: ""
---

# RFC: Spec Kit Extension System

**Status**: Implemented
**Author**: Stats Perform Engineering
**Created**: 2026-01-28
**Updated**: 2026-03-11

---

## 本篇目录

- [Table of Contents](https://github.com/github/spec-kit/blob/c173bf19a6654e3b05386ec3599349a55282b897/extensions/01-Table_of_Contents.md)
- [Summary](https://github.com/github/spec-kit/blob/c173bf19a6654e3b05386ec3599349a55282b897/extensions/02-Summary.md)
- [Motivation](https://github.com/github/spec-kit/blob/c173bf19a6654e3b05386ec3599349a55282b897/extensions/03-Motivation.md)
- [Design Principles](https://github.com/github/spec-kit/blob/c173bf19a6654e3b05386ec3599349a55282b897/extensions/04-Design_Principles.md)
- [Architecture Overview](https://github.com/github/spec-kit/blob/c173bf19a6654e3b05386ec3599349a55282b897/extensions/05-Architecture_Overview.md)
- [Extension Manifest Specification](https://github.com/github/spec-kit/blob/c173bf19a6654e3b05386ec3599349a55282b897/extensions/06-Extension_Manifest_Specification.md)
- [Extension Lifecycle](https://github.com/github/spec-kit/blob/c173bf19a6654e3b05386ec3599349a55282b897/extensions/07-Extension_Lifecycle.md)
- [Command Registration](https://github.com/github/spec-kit/blob/c173bf19a6654e3b05386ec3599349a55282b897/extensions/08-Command_Registration.md)
- [Configuration Management](https://github.com/github/spec-kit/blob/c173bf19a6654e3b05386ec3599349a55282b897/extensions/09-Configuration_Management.md)
- [Hook System](https://github.com/github/spec-kit/blob/c173bf19a6654e3b05386ec3599349a55282b897/extensions/10-Hook_System.md)
- [Extension Discovery & Catalog](https://github.com/github/spec-kit/blob/c173bf19a6654e3b05386ec3599349a55282b897/extensions/11-Extension_Discovery_Catalog.md)
- [CLI Commands](https://github.com/github/spec-kit/blob/c173bf19a6654e3b05386ec3599349a55282b897/extensions/12-CLI_Commands.md)
- [Compatibility & Versioning](https://github.com/github/spec-kit/blob/c173bf19a6654e3b05386ec3599349a55282b897/extensions/13-Compatibility_Versioning.md)
- [Security Considerations](https://github.com/github/spec-kit/blob/c173bf19a6654e3b05386ec3599349a55282b897/extensions/14-Security_Considerations.md)
- [Migration Strategy](https://github.com/github/spec-kit/blob/c173bf19a6654e3b05386ec3599349a55282b897/extensions/15-Migration_Strategy.md)
- [Implementation Phases](https://github.com/github/spec-kit/blob/c173bf19a6654e3b05386ec3599349a55282b897/extensions/16-Implementation_Phases.md)
- [Resolved Questions](https://github.com/github/spec-kit/blob/c173bf19a6654e3b05386ec3599349a55282b897/extensions/17-Resolved_Questions.md)
- [Open Questions (Remaining)](https://github.com/github/spec-kit/blob/c173bf19a6654e3b05386ec3599349a55282b897/extensions/18-Open_Questions_Remaining.md)
- [Appendices](https://github.com/github/spec-kit/blob/c173bf19a6654e3b05386ec3599349a55282b897/extensions/19-Appendices.md)
- [Summary & Next Steps](https://github.com/github/spec-kit/blob/c173bf19a6654e3b05386ec3599349a55282b897/extensions/20-Summary_Next_Steps.md)
- [Questions for Discussion](https://github.com/github/spec-kit/blob/c173bf19a6654e3b05386ec3599349a55282b897/extensions/21-Questions_for_Discussion.md)
