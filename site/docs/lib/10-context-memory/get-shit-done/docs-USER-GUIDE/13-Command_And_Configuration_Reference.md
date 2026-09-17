---
title: "GSD（Get Shit Done）工作流文档"
sourceId: "10-context-memory/get-shit-done"
sourceTitle: "GSD（Get Shit Done）工作流文档"
sourceKind: "其他材料"
licenseLabel: "可转载"
lang: "英文"
tier: 3
volume: "10-context-memory"
sourceUrl: "https://github.com/gsd-build/get-shit-done"
entryUrl: "https://github.com/gsd-build/get-shit-done/blob/bdcaab2c752d9a33a1a1ca9acf3a3c81fb991815/docs/USER-GUIDE.md"
sourceRel: "docs/USER-GUIDE.md"
rawUrl: "/raw/10-context-memory/get-shit-done/docs/USER-GUIDE.md"
sourceSha256: "4550e970e63aa2066ecde7d4f8350d0d1c104699167310213bc4c5a9ca0fb7e4"
pageSha256: "9c7f5798b7e48259217426a0039ef19763d5a69ed32602c1a94402109d296acb"
contentMode: "local-full"
zh: ""
---

## Command And Configuration Reference

- **Command Reference:** see [`docs/COMMANDS.md`](/lib/10-context-memory/get-shit-done/docs-COMMANDS) for every stable command's flags, subcommands, and examples. The authoritative shipped-command roster lives in [`docs/INVENTORY.md`](/lib/10-context-memory/get-shit-done/docs-INVENTORY#commands-75-shipped).
- **Configuration Reference:** see [`docs/CONFIGURATION.md`](/lib/10-context-memory/get-shit-done/docs-CONFIGURATION/index) for the full `config.json` schema, every setting's default and provenance, the per-agent model-profile table (including the `inherit` option for non-Claude runtimes), git branching strategies, and security settings.
- **Discuss Mode:** see [`docs/workflow-discuss-mode.md`](https://github.com/gsd-build/get-shit-done/blob/bdcaab2c752d9a33a1a1ca9acf3a3c81fb991815/docs/workflow-discuss-mode.md) for interview vs assumptions mode.

This guide intentionally does not re-document commands or config settings: maintaining two copies previously produced drift (`workflow.discuss_mode`'s default, `claude_md_path`'s default, the model-profile table's agent coverage). The single-source-of-truth rule is enforced mechanically by the drift-guard tests anchored on `docs/INVENTORY.md`.
