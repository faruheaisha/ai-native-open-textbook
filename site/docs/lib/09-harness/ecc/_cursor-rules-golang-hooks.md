---
title: "Go Hooks"
sourceId: "09-harness/ecc"
sourceTitle: "ECC —— Harness 性能优化系统"
sourceKind: "其他材料"
licenseLabel: "可转载"
lang: "英文"
tier: 3
volume: "09-harness"
sourceUrl: "https://github.com/affaan-m/ECC"
entryUrl: "https://github.com/affaan-m/ECC/blob/928c1dea72f5c330442fc1f595563398b8f389f7/.cursor/rules/golang-hooks.md"
sourceRel: ".cursor/rules/golang-hooks.md"
rawUrl: "/raw/09-harness/ecc/.cursor/rules/golang-hooks.md"
sourceSha256: "2bf7972db31c4e3b5603a1a303cd15dae6f9dae14e8e64e1d2a34cfd89d4dff0"
pageSha256: "2bf7972db31c4e3b5603a1a303cd15dae6f9dae14e8e64e1d2a34cfd89d4dff0"
contentMode: "local-full"
zh: ""
---

# Go Hooks

> This file extends the common hooks rule with Go specific content.

## PostToolUse Hooks

Configure in `~/.claude/settings.json`:

- **gofmt/goimports**: Auto-format `.go` files after edit
- **go vet**: Run static analysis after editing `.go` files
- **staticcheck**: Run extended static checks on modified packages
