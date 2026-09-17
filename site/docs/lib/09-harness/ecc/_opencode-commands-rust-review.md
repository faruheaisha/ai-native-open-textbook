---
title: "Rust Review Command"
sourceId: "09-harness/ecc"
sourceTitle: "ECC —— Harness 性能优化系统"
sourceKind: "其他材料"
licenseLabel: "可转载"
lang: "英文"
tier: 3
volume: "09-harness"
sourceUrl: "https://github.com/affaan-m/ECC"
entryUrl: "https://github.com/affaan-m/ECC/blob/928c1dea72f5c330442fc1f595563398b8f389f7/.opencode/commands/rust-review.md"
sourceRel: ".opencode/commands/rust-review.md"
rawUrl: "/raw/09-harness/ecc/.opencode/commands/rust-review.md"
sourceSha256: "e768b36b24aab69e9cb0b066c58ef2d1b342320efe2a4d130e5d73a29957d19c"
pageSha256: "e768b36b24aab69e9cb0b066c58ef2d1b342320efe2a4d130e5d73a29957d19c"
contentMode: "local-full"
zh: ""
---

# Rust Review Command

Review Rust code for idiomatic patterns and best practices: $ARGUMENTS

## Your Task

1. **Analyze Rust code** for idioms and patterns
2. **Check ownership** - borrowing, lifetimes, unnecessary clones
3. **Review error handling** - proper `?` propagation, no unwrap in production
4. **Verify safety** - unsafe usage, injection, secrets

## Review Checklist

### Safety (CRITICAL)
- [ ] No unchecked `unwrap()`/`expect()` in production paths
- [ ] `unsafe` blocks have `// SAFETY:` comments
- [ ] No SQL/command injection
- [ ] No hardcoded secrets

### Ownership (HIGH)
- [ ] No unnecessary `.clone()` to satisfy borrow checker
- [ ] `&str` preferred over `String` in function parameters
- [ ] `&[T]` preferred over `Vec<T>` in function parameters
- [ ] No excessive lifetime annotations where elision works

### Error Handling (HIGH)
- [ ] Errors propagated with `?`; use `.context()` in `anyhow`/`eyre` application code
- [ ] No silenced errors (`let _ = result;`)
- [ ] `thiserror` for library errors, `anyhow` for applications

### Concurrency (HIGH)
- [ ] No blocking in async context
- [ ] Bounded channels preferred
- [ ] `Mutex` poisoning handled
- [ ] `Send`/`Sync` bounds correct

### Code Quality (MEDIUM)
- [ ] Functions under 50 lines
- [ ] No deep nesting (>4 levels)
- [ ] Exhaustive matching on business enums
- [ ] Clippy warnings addressed

## Report Format

### CRITICAL Issues
- [file:line] Issue description
  Suggestion: How to fix

### HIGH Issues
- [file:line] Issue description
  Suggestion: How to fix

### MEDIUM Issues
- [file:line] Issue description
  Suggestion: How to fix

---

**TIP**: Run `cargo clippy -- -D warnings` and `cargo fmt --check` for automated checks.
