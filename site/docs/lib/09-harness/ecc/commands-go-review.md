---
title: "Go Code Review"
sourceId: "09-harness/ecc"
sourceTitle: "ECC —— Harness 性能优化系统"
sourceKind: "其他材料"
licenseLabel: "可转载"
lang: "英文"
tier: 3
volume: "09-harness"
sourceUrl: "https://github.com/affaan-m/ECC"
entryUrl: "https://github.com/affaan-m/ECC/blob/928c1dea72f5c330442fc1f595563398b8f389f7/commands/go-review.md"
sourceRel: "commands/go-review.md"
rawUrl: "/raw/09-harness/ecc/commands/go-review.md"
sourceSha256: "73a29ec62007e25490d0962ed52fe196eac3df31c6ccd774b10c9a8e07b63b39"
pageSha256: "73a29ec62007e25490d0962ed52fe196eac3df31c6ccd774b10c9a8e07b63b39"
contentMode: "local-full"
zh: ""
---

# Go Code Review

This command invokes the **go-reviewer** agent for comprehensive Go-specific code review.

## What This Command Does

1. **Identify Go Changes**: Find modified `.go` files via `git diff`
2. **Run Static Analysis**: Execute `go vet`, `staticcheck`, and `golangci-lint`
3. **Security Scan**: Check for SQL injection, command injection, race conditions
4. **Concurrency Review**: Analyze goroutine safety, channel usage, mutex patterns
5. **Idiomatic Go Check**: Verify code follows Go conventions and best practices
6. **Generate Report**: Categorize issues by severity

## When to Use

Use `/go-review` when:
- After writing or modifying Go code
- Before committing Go changes
- Reviewing pull requests with Go code
- Onboarding to a new Go codebase
- Learning idiomatic Go patterns

## Review Categories

### CRITICAL (Must Fix)
- SQL/Command injection vulnerabilities
- Race conditions without synchronization
- Goroutine leaks
- Hardcoded credentials
- Unsafe pointer usage
- Ignored errors in critical paths

### HIGH (Should Fix)
- Missing error wrapping with context
- Panic instead of error returns
- Context not propagated
- Unbuffered channels causing deadlocks
- Interface not satisfied errors
- Missing mutex protection

### MEDIUM (Consider)
- Non-idiomatic code patterns
- Missing godoc comments on exports
- Inefficient string concatenation
- Slice not preallocated
- Table-driven tests not used

## Automated Checks Run

```bash
# Static analysis
go vet ./...

# Advanced checks (if installed)
staticcheck ./...
golangci-lint run

# Race detection
go build -race ./...

# Security vulnerabilities
govulncheck ./...
```

## Example Usage

```text
User: /go-review

Agent:
# Go Code Review Report

## Files Reviewed
- internal/handler/user.go (modified)
- internal/service/auth.go (modified)

## Static Analysis Results
✓ go vet: No issues
✓ staticcheck: No issues

## Issues Found

[CRITICAL] Race Condition
File: internal/service/auth.go:45
Issue: Shared map accessed without synchronization
```go
var cache = map[string]*Session{}  // Concurrent access!

func GetSession(id string) *Session {
    return cache[id]  // Race condition
}
```
Fix: Use sync.RWMutex or sync.Map
```go
var (
    cache   = map[string]*Session{}
    cacheMu sync.RWMutex
)

func GetSession(id string) *Session {
    cacheMu.RLock()
    defer cacheMu.RUnlock()
    return cache[id]
}
```

[HIGH] Missing Error Context
File: internal/handler/user.go:28
Issue: Error returned without context
```go
return err  // No context
```
Fix: Wrap with context
```go
return fmt.Errorf("get user %s: %w", userID, err)
```

## Summary
- CRITICAL: 1
- HIGH: 1
- MEDIUM: 0

Recommendation: FAIL: Block merge until CRITICAL issue is fixed
```

## Approval Criteria

| Status | Condition |
|--------|-----------|
| PASS: Approve | No CRITICAL or HIGH issues |
| WARNING: Warning | Only MEDIUM issues (merge with caution) |
| FAIL: Block | CRITICAL or HIGH issues found |

## Integration with Other Commands

- Use `/go-test` first to ensure tests pass
- Use `/go-build` if build errors occur
- Use `/go-review` before committing
- Use `/code-review` for non-Go specific concerns

## Related

- Agent: `agents/go-reviewer.md`
- Skills: `skills/golang-patterns/`, `skills/golang-testing/`
