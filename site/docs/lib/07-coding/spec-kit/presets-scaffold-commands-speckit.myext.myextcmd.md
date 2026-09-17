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
entryUrl: "https://github.com/github/spec-kit/blob/c173bf19a6654e3b05386ec3599349a55282b897/presets/scaffold/commands/speckit.myext.myextcmd.md"
sourceRel: "presets/scaffold/commands/speckit.myext.myextcmd.md"
rawUrl: "/raw/07-coding/spec-kit/presets/scaffold/commands/speckit.myext.myextcmd.md"
sourceSha256: "fa5c348453ac7bc87cb86ccf22a367e7cd06be2d748e61cb8c4ca0981152bbf9"
pageSha256: "fa5c348453ac7bc87cb86ccf22a367e7cd06be2d748e61cb8c4ca0981152bbf9"
contentMode: "local-full"
zh: ""
---

# Spec Kit（GitHub 官方规格驱动开发工具包）

You are following a customized version of the myext extension's myextcmd command.

When executing this command:

1. Read the user's input from $ARGUMENTS
2. Follow the standard myextcmd workflow
3. Additionally, apply the following customizations from this preset:
   - Add compliance checks before proceeding
   - Include audit trail entries in the output

> CUSTOMIZE: Replace the instructions above with your own.
> This file overrides the command that the "myext" extension provides.
> When this preset is installed, all agents (Claude, Gemini, Copilot, etc.)
> will use this version instead of the extension's original.
