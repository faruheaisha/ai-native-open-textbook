---
title: "Rust Test Command"
sourceId: "09-harness/ecc"
sourceTitle: "ECC —— Harness 性能优化系统"
sourceKind: "其他材料"
licenseLabel: "可转载"
lang: "英文"
tier: 3
volume: "09-harness"
sourceUrl: "https://github.com/affaan-m/ECC"
entryUrl: "https://github.com/affaan-m/ECC/blob/928c1dea72f5c330442fc1f595563398b8f389f7/.opencode/commands/rust-test.md"
sourceRel: ".opencode/commands/rust-test.md"
rawUrl: "/raw/09-harness/ecc/.opencode/commands/rust-test.md"
sourceSha256: "9f6200c319852e4d0deeab97490b9ca5004f2035a3f8fc68a691056ded14e06e"
pageSha256: "9f6200c319852e4d0deeab97490b9ca5004f2035a3f8fc68a691056ded14e06e"
contentMode: "local-full"
zh: ""
---

# Rust Test Command

Implement using Rust TDD methodology: $ARGUMENTS

## Your Task

Apply test-driven development with Rust idioms:

1. **Define types** - Structs, enums, traits
2. **Write tests** - Unit tests in `#[cfg(test)]` modules
3. **Implement minimal code** - Pass the tests
4. **Check coverage** - Target 80%+

## TDD Cycle for Rust

### Step 1: Define Interface
```rust
pub struct Input {
    // fields
}

pub fn process(input: &Input) -> Result<Output, Error> {
    todo!()
}
```

### Step 2: Write Tests
```rust
#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn valid_input_succeeds() {
        let input = Input { /* ... */ };
        let result = process(&input);
        assert!(result.is_ok());
    }

    #[test]
    fn invalid_input_returns_error() {
        let input = Input { /* ... */ };
        let result = process(&input);
        assert!(result.is_err());
    }
}
```

### Step 3: Run Tests (RED)
```bash
cargo test
```

### Step 4: Implement (GREEN)
```rust
pub fn process(input: &Input) -> Result<Output, Error> {
    // Minimal implementation that handles both paths
    validate(input)?;
    Ok(Output { /* ... */ })
}
```

### Step 5: Check Coverage
```bash
cargo llvm-cov
cargo llvm-cov --fail-under-lines 80
```

## Rust Testing Commands

```bash
cargo test                        # Run all tests
cargo test -- --nocapture         # Show println output
cargo test test_name              # Run specific test
cargo test --no-fail-fast         # Don't stop on first failure
cargo test --lib                  # Unit tests only
cargo test --test integration     # Integration tests only
cargo test --doc                  # Doc tests only
cargo bench                       # Run benchmarks
```

## Test File Organization

```
src/
├── lib.rs             # Library root
├── service.rs         # Implementation
└── service/
    └── tests.rs       # Or inline #[cfg(test)] mod tests {}
tests/
└── integration.rs     # Integration tests
benches/
└── benchmark.rs       # Criterion benchmarks
```

---

**TIP**: Use `rstest` for parameterized tests and `proptest` for property-based testing.
