---
title: "ECC —— Harness 性能优化系统"
sourceId: "09-harness/ecc"
sourceTitle: "ECC —— Harness 性能优化系统"
sourceKind: "其他材料"
licenseLabel: "可转载"
lang: "英文"
tier: 3
volume: "09-harness"
sourceUrl: "https://github.com/affaan-m/ECC"
entryUrl: "https://github.com/affaan-m/ECC/blob/928c1dea72f5c330442fc1f595563398b8f389f7/commands/hookify-configure.md"
sourceRel: "commands/hookify-configure.md"
rawUrl: "/raw/09-harness/ecc/commands/hookify-configure.md"
sourceSha256: "a059c23f885d36e3597daa03b7bf77cbb79a2a87e5856ca4bede4eb3b816082a"
pageSha256: "a059c23f885d36e3597daa03b7bf77cbb79a2a87e5856ca4bede4eb3b816082a"
contentMode: "local-full"
zh: ""
---

# ECC —— Harness 性能优化系统

Interactively enable or disable existing hookify rules.

## Steps

1. Find all `.claude/hookify.*.local.md` files
2. Read the current state of each rule
3. Present the list with current enabled / disabled status
4. Ask which rules to toggle
5. Update the `enabled:` field in the selected rule files
6. Confirm the changes
