---
title: "Swift Hooks"
sourceId: "09-harness/ecc"
sourceTitle: "ECC —— Harness 性能优化系统"
sourceKind: "其他材料"
licenseLabel: "可转载"
lang: "英文"
tier: 3
volume: "09-harness"
sourceUrl: "https://github.com/affaan-m/ECC"
entryUrl: "https://github.com/affaan-m/ECC/blob/928c1dea72f5c330442fc1f595563398b8f389f7/.cursor/rules/swift-hooks.md"
sourceRel: ".cursor/rules/swift-hooks.md"
rawUrl: "/raw/09-harness/ecc/.cursor/rules/swift-hooks.md"
sourceSha256: "a6320c6667d442c7198f229a19ed1cfd1efe05f3a05d01e2574e7ddb4d4b0912"
pageSha256: "a6320c6667d442c7198f229a19ed1cfd1efe05f3a05d01e2574e7ddb4d4b0912"
contentMode: "local-full"
zh: ""
---

# Swift Hooks

> This file extends the common hooks rule with Swift specific content.

## PostToolUse Hooks

Configure in `~/.claude/settings.json`:

- **SwiftFormat**: Auto-format `.swift` files after edit
- **SwiftLint**: Run lint checks after editing `.swift` files
- **swift build**: Type-check modified packages after edit

## Warning

Flag `print()` statements -- use `os.Logger` or structured logging instead for production code.
