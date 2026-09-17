---
title: "Go Patterns"
sourceId: "09-harness/ecc"
sourceTitle: "ECC —— Harness 性能优化系统"
sourceKind: "其他材料"
licenseLabel: "可转载"
lang: "英文"
tier: 3
volume: "09-harness"
sourceUrl: "https://github.com/affaan-m/ECC"
entryUrl: "https://github.com/affaan-m/ECC/blob/928c1dea72f5c330442fc1f595563398b8f389f7/.kiro/steering/golang-patterns.md"
sourceRel: ".kiro/steering/golang-patterns.md"
rawUrl: "/raw/09-harness/ecc/.kiro/steering/golang-patterns.md"
sourceSha256: "9ef03c60857d9dae0fed1d253a142077ebbb2beebf4c2a42214c03500592bce0"
pageSha256: "9ef03c60857d9dae0fed1d253a142077ebbb2beebf4c2a42214c03500592bce0"
contentMode: "local-full"
zh: ""
---

# Go Patterns

> This file extends the common patterns with Go specific content.

## Functional Options

```go
type Option func(*Server)

func WithPort(port int) Option {
    return func(s *Server) { s.port = port }
}

func NewServer(opts ...Option) *Server {
    s := &Server{port: 8080}
    for _, opt := range opts {
        opt(s)
    }
    return s
}
```

## Small Interfaces

Define interfaces where they are used, not where they are implemented.

## Dependency Injection

Use constructor functions to inject dependencies:

```go
func NewUserService(repo UserRepository, logger Logger) *UserService {
    return &UserService{repo: repo, logger: logger}
}
```

## Reference

See skill: `golang-patterns` for comprehensive Go patterns including concurrency, error handling, and package organization.
