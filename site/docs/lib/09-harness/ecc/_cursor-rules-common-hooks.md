---
title: "Hooks System"
sourceId: "09-harness/ecc"
sourceTitle: "ECC —— Harness 性能优化系统"
sourceKind: "其他材料"
licenseLabel: "可转载"
lang: "英文"
tier: 3
volume: "09-harness"
sourceUrl: "https://github.com/affaan-m/ECC"
entryUrl: "https://github.com/affaan-m/ECC/blob/928c1dea72f5c330442fc1f595563398b8f389f7/.cursor/rules/common-hooks.md"
sourceRel: ".cursor/rules/common-hooks.md"
rawUrl: "/raw/09-harness/ecc/.cursor/rules/common-hooks.md"
sourceSha256: "59fc54cbfdd3afeaf3aad3085337a3ba1f9cca4b6d3cb0d7327fdcb75e7ae804"
pageSha256: "59fc54cbfdd3afeaf3aad3085337a3ba1f9cca4b6d3cb0d7327fdcb75e7ae804"
contentMode: "local-full"
zh: ""
---

# Hooks System

## Hook Types

- **PreToolUse**: Before tool execution (validation, parameter modification)
- **PostToolUse**: After tool execution (auto-format, checks)
- **Stop**: When session ends (final verification)

## Auto-Accept Permissions

Use with caution:
- Enable for trusted, well-defined plans
- Disable for exploratory work
- Never use dangerously-skip-permissions flag
- Configure `allowedTools` in `~/.claude.json` instead

## TodoWrite Best Practices

Use TodoWrite tool to:
- Track progress on multi-step tasks
- Verify understanding of instructions
- Enable real-time steering
- Show granular implementation steps

Todo list reveals:
- Out of order steps
- Missing items
- Extra unnecessary items
- Wrong granularity
- Misinterpreted requirements
