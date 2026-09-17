---
title: "GSD Configuration Reference"
sourceId: "10-context-memory/get-shit-done"
sourceTitle: "GSD（Get Shit Done）工作流文档"
sourceKind: "其他材料"
licenseLabel: "可转载"
lang: "英文"
tier: 3
volume: "10-context-memory"
sourceUrl: "https://github.com/gsd-build/get-shit-done"
entryUrl: "https://github.com/gsd-build/get-shit-done/blob/bdcaab2c752d9a33a1a1ca9acf3a3c81fb991815/docs/CONFIGURATION.md"
sourceRel: "docs/CONFIGURATION.md"
rawUrl: "/raw/10-context-memory/get-shit-done/docs/CONFIGURATION.md"
sourceSha256: "3e67baa72c7b00dab65464616eb7f7f38b2c72cad311f0d2b8c6e7ba8e914eb1"
pageSha256: "ceb088476d2585135c55e58fde5744f322606944443844ff8cbbb25a912a02ed"
contentMode: "local-full"
zh: ""
---

# GSD Configuration Reference

> Full configuration schema, workflow toggles, model profiles, and git branching options. For feature context, see [Feature Reference](/lib/10-context-memory/get-shit-done/docs-FEATURES/index).

---

## 本篇目录

- [Configuration File](https://github.com/gsd-build/get-shit-done/blob/bdcaab2c752d9a33a1a1ca9acf3a3c81fb991815/docs/01-Configuration_File.md)
- [Core Settings](https://github.com/gsd-build/get-shit-done/blob/bdcaab2c752d9a33a1a1ca9acf3a3c81fb991815/docs/02-Core_Settings.md)
- [Integration Settings](https://github.com/gsd-build/get-shit-done/blob/bdcaab2c752d9a33a1a1ca9acf3a3c81fb991815/docs/03-Integration_Settings.md)
- [Workflow Toggles](https://github.com/gsd-build/get-shit-done/blob/bdcaab2c752d9a33a1a1ca9acf3a3c81fb991815/docs/04-Workflow_Toggles.md)
- [Code Quality Settings](https://github.com/gsd-build/get-shit-done/blob/bdcaab2c752d9a33a1a1ca9acf3a3c81fb991815/docs/05-Code_Quality_Settings.md)
- [Ship Settings](https://github.com/gsd-build/get-shit-done/blob/bdcaab2c752d9a33a1a1ca9acf3a3c81fb991815/docs/06-Ship_Settings.md)
- [Planning Settings](https://github.com/gsd-build/get-shit-done/blob/bdcaab2c752d9a33a1a1ca9acf3a3c81fb991815/docs/07-Planning_Settings.md)
- [Hook Settings](https://github.com/gsd-build/get-shit-done/blob/bdcaab2c752d9a33a1a1ca9acf3a3c81fb991815/docs/08-Hook_Settings.md)
- [Agent Skills Injection](https://github.com/gsd-build/get-shit-done/blob/bdcaab2c752d9a33a1a1ca9acf3a3c81fb991815/docs/09-Agent_Skills_Injection.md)
- [Feature Flags](https://github.com/gsd-build/get-shit-done/blob/bdcaab2c752d9a33a1a1ca9acf3a3c81fb991815/docs/10-Feature_Flags.md)
- [Parallelization Settings](https://github.com/gsd-build/get-shit-done/blob/bdcaab2c752d9a33a1a1ca9acf3a3c81fb991815/docs/11-Parallelization_Settings.md)
- [STATE.md Frontmatter (Phase Lifecycle)](https://github.com/gsd-build/get-shit-done/blob/bdcaab2c752d9a33a1a1ca9acf3a3c81fb991815/docs/12-STATE.md_Frontmatter_Phase_Lifecycle.md)
- [Git Branching](https://github.com/gsd-build/get-shit-done/blob/bdcaab2c752d9a33a1a1ca9acf3a3c81fb991815/docs/13-Git_Branching.md)
- [Gate Settings](https://github.com/gsd-build/get-shit-done/blob/bdcaab2c752d9a33a1a1ca9acf3a3c81fb991815/docs/14-Gate_Settings.md)
- [Safety Settings](https://github.com/gsd-build/get-shit-done/blob/bdcaab2c752d9a33a1a1ca9acf3a3c81fb991815/docs/15-Safety_Settings.md)
- [Security Settings](https://github.com/gsd-build/get-shit-done/blob/bdcaab2c752d9a33a1a1ca9acf3a3c81fb991815/docs/16-Security_Settings.md)
- [Decision Coverage Gates (workflow.contextcoveragegate)](https://github.com/gsd-build/get-shit-done/blob/bdcaab2c752d9a33a1a1ca9acf3a3c81fb991815/docs/17-Decision_Coverage_Gates_workflow.context.md)
- [Review Settings](https://github.com/gsd-build/get-shit-done/blob/bdcaab2c752d9a33a1a1ca9acf3a3c81fb991815/docs/18-Review_Settings.md)
- [Manager Passthrough Flags](https://github.com/gsd-build/get-shit-done/blob/bdcaab2c752d9a33a1a1ca9acf3a3c81fb991815/docs/19-Manager_Passthrough_Flags.md)
- [Model Profiles](https://github.com/gsd-build/get-shit-done/blob/bdcaab2c752d9a33a1a1ca9acf3a3c81fb991815/docs/20-Model_Profiles.md)
- [Environment Variables](https://github.com/gsd-build/get-shit-done/blob/bdcaab2c752d9a33a1a1ca9acf3a3c81fb991815/docs/21-Environment_Variables.md)
- [Global Defaults](https://github.com/gsd-build/get-shit-done/blob/bdcaab2c752d9a33a1a1ca9acf3a3c81fb991815/docs/22-Global_Defaults.md)
