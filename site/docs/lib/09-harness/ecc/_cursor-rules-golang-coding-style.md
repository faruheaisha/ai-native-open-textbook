---
title: "Go Coding Style"
sourceId: "09-harness/ecc"
sourceTitle: "ECC —— Harness 性能优化系统"
sourceKind: "其他材料"
licenseLabel: "可转载"
lang: "英文"
tier: 3
volume: "09-harness"
sourceUrl: "https://github.com/affaan-m/ECC"
entryUrl: "https://github.com/affaan-m/ECC/blob/928c1dea72f5c330442fc1f595563398b8f389f7/.cursor/rules/golang-coding-style.md"
sourceRel: ".cursor/rules/golang-coding-style.md"
rawUrl: "/raw/09-harness/ecc/.cursor/rules/golang-coding-style.md"
sourceSha256: "006a05a553ea080fd547d9f709e02a83cf52df9de276ce1c6216ffaf691fc37a"
pageSha256: "006a05a553ea080fd547d9f709e02a83cf52df9de276ce1c6216ffaf691fc37a"
contentMode: "local-full"
zh: ""
---

# Go Coding Style

> This file extends the common coding style rule with Go specific content.

## Formatting

- **gofmt** and **goimports** are mandatory -- no style debates

## Design Principles

- Accept interfaces, return structs
- Keep interfaces small (1-3 methods)

## Error Handling

Always wrap errors with context:

```go
if err != nil {
    return fmt.Errorf("failed to create user: %w", err)
}
```

## Reference

See skill: `golang-patterns` for comprehensive Go idioms and patterns.
