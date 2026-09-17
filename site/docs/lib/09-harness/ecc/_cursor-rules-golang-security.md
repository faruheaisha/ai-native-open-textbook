---
title: "Go Security"
sourceId: "09-harness/ecc"
sourceTitle: "ECC —— Harness 性能优化系统"
sourceKind: "其他材料"
licenseLabel: "可转载"
lang: "英文"
tier: 3
volume: "09-harness"
sourceUrl: "https://github.com/affaan-m/ECC"
entryUrl: "https://github.com/affaan-m/ECC/blob/928c1dea72f5c330442fc1f595563398b8f389f7/.cursor/rules/golang-security.md"
sourceRel: ".cursor/rules/golang-security.md"
rawUrl: "/raw/09-harness/ecc/.cursor/rules/golang-security.md"
sourceSha256: "2cfa6b589b81885e4c8306bee5d668af112f89d27de874a6c92c0fb67c258c98"
pageSha256: "2cfa6b589b81885e4c8306bee5d668af112f89d27de874a6c92c0fb67c258c98"
contentMode: "local-full"
zh: ""
---

# Go Security

> This file extends the common security rule with Go specific content.

## Secret Management

```go
apiKey := os.Getenv("OPENAI_API_KEY")
if apiKey == "" {
    log.Fatal("OPENAI_API_KEY not configured")
}
```

## Security Scanning

- Use **gosec** for static security analysis:
  ```bash
  gosec ./...
  ```

## Context & Timeouts

Always use `context.Context` for timeout control:

```go
ctx, cancel := context.WithTimeout(ctx, 5*time.Second)
defer cancel()
```
