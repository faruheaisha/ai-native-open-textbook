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
pageSha256: "1c0d8bd88ef1cfccddefe6cec20d1c9b138f61934990b778222911ec5d477e45"
contentMode: "local-full"
zh: ""
---

## Motivation

### Current Problems

1. **Monolithic Growth**: Adding Jira integration to core spec-kit creates:
   - Large configuration files affecting all users
   - Dependencies on Jira MCP server for everyone
   - Merge conflicts as features accumulate

2. **Limited Flexibility**: Different organizations use different tools:
   - GitHub Issues vs Jira vs Linear vs Azure DevOps
   - Custom internal tools
   - No way to support all without bloat

3. **Maintenance Burden**: Every integration adds:
   - Documentation complexity
   - Testing matrix expansion
   - Breaking change surface area

4. **Community Friction**: External contributors can't easily add integrations without core repo PR approval and release cycles.

### Goals

1. **Modularity**: Core spec-kit remains lean, extensions are opt-in
2. **Extensibility**: Clear API for building new integrations
3. **Independence**: Extensions version/release separately from core
4. **Discoverability**: Central catalog for finding extensions
5. **Safety**: Validation, compatibility checks, sandboxing
