---
title: "Go Build Command"
sourceId: "09-harness/ecc"
sourceTitle: "ECC —— Harness 性能优化系统"
sourceKind: "其他材料"
licenseLabel: "可转载"
lang: "英文"
tier: 3
volume: "09-harness"
sourceUrl: "https://github.com/affaan-m/ECC"
entryUrl: "https://github.com/affaan-m/ECC/blob/928c1dea72f5c330442fc1f595563398b8f389f7/.opencode/commands/go-build.md"
sourceRel: ".opencode/commands/go-build.md"
rawUrl: "/raw/09-harness/ecc/.opencode/commands/go-build.md"
sourceSha256: "918387886c6d2091193ae38b908902ac978f350b3655911b9190c70c6f3c5eeb"
pageSha256: "918387886c6d2091193ae38b908902ac978f350b3655911b9190c70c6f3c5eeb"
contentMode: "local-full"
zh: ""
---

# Go Build Command

Fix Go build, vet, and compilation errors: $ARGUMENTS

## Your Task

1. **Run go build**: `go build ./...`
2. **Run go vet**: `go vet ./...`
3. **Fix errors** one by one
4. **Verify fixes** don't introduce new errors

## Common Go Errors

### Import Errors
```
imported and not used: "package"
```
**Fix**: Remove unused import or use `_` prefix

### Type Errors
```
cannot use x (type T) as type U
```
**Fix**: Add type conversion or fix type definition

### Undefined Errors
```
undefined: identifier
```
**Fix**: Import package, define variable, or fix typo

### Vet Errors
```
printf: call has arguments but no formatting directives
```
**Fix**: Add format directive or remove arguments

## Fix Order

1. **Import errors** - Fix or remove imports
2. **Type definitions** - Ensure types exist
3. **Function signatures** - Match parameters
4. **Vet warnings** - Address static analysis

## Build Commands

```bash
# Build all packages
go build ./...

# Build with race detector
go build -race ./...

# Build for specific OS/arch
GOOS=linux GOARCH=amd64 go build ./...

# Run go vet
go vet ./...

# Run staticcheck
staticcheck ./...

# Format code
gofmt -w .

# Tidy dependencies
go mod tidy
```

## Verification

After fixes:
```bash
go build ./...    # Should succeed
go vet ./...      # Should have no warnings
go test ./...     # Tests should pass
```

---

**IMPORTANT**: Fix errors only. No refactoring, no improvements. Get the build green with minimal changes.
