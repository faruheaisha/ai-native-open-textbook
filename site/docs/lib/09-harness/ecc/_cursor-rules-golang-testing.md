---
title: "Go Testing"
sourceId: "09-harness/ecc"
sourceTitle: "ECC —— Harness 性能优化系统"
sourceKind: "其他材料"
licenseLabel: "可转载"
lang: "英文"
tier: 3
volume: "09-harness"
sourceUrl: "https://github.com/affaan-m/ECC"
entryUrl: "https://github.com/affaan-m/ECC/blob/928c1dea72f5c330442fc1f595563398b8f389f7/.cursor/rules/golang-testing.md"
sourceRel: ".cursor/rules/golang-testing.md"
rawUrl: "/raw/09-harness/ecc/.cursor/rules/golang-testing.md"
sourceSha256: "a2e64c00effdf3fefd8fb726d08a0f386f353672a1237b3918c1183e90eed5d5"
pageSha256: "a2e64c00effdf3fefd8fb726d08a0f386f353672a1237b3918c1183e90eed5d5"
contentMode: "local-full"
zh: ""
---

# Go Testing

> This file extends the common testing rule with Go specific content.

## Framework

Use the standard `go test` with **table-driven tests**.

## Race Detection

Always run with the `-race` flag:

```bash
go test -race ./...
```

## Coverage

```bash
go test -cover ./...
```

## Reference

See skill: `golang-testing` for detailed Go testing patterns and helpers.
