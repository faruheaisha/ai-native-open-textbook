---
title: "Kotlin Coding Style"
sourceId: "09-harness/ecc"
sourceTitle: "ECC —— Harness 性能优化系统"
sourceKind: "其他材料"
licenseLabel: "可转载"
lang: "英文"
tier: 3
volume: "09-harness"
sourceUrl: "https://github.com/affaan-m/ECC"
entryUrl: "https://github.com/affaan-m/ECC/blob/928c1dea72f5c330442fc1f595563398b8f389f7/.cursor/rules/kotlin-coding-style.md"
sourceRel: ".cursor/rules/kotlin-coding-style.md"
rawUrl: "/raw/09-harness/ecc/.cursor/rules/kotlin-coding-style.md"
sourceSha256: "4552ca0bfef5be2429a38f536afad10ac5b4a6ffd2c8ff54fd849813a6e49021"
pageSha256: "4552ca0bfef5be2429a38f536afad10ac5b4a6ffd2c8ff54fd849813a6e49021"
contentMode: "local-full"
zh: ""
---

# Kotlin Coding Style

> This file extends the common coding style rule with Kotlin-specific content.

## Formatting

- Auto-formatting via **ktfmt** or **ktlint** (configured in `kotlin-hooks.md`)
- Use trailing commas in multiline declarations

## Immutability

The global immutability requirement is enforced in the common coding style rule.
For Kotlin specifically:

- Prefer `val` over `var`
- Use immutable collection types (`List`, `Map`, `Set`)
- Use `data class` with `copy()` for immutable updates

## Null Safety

- Avoid `!!` -- use `?.`, `?:`, `require`, or `checkNotNull`
- Handle platform types explicitly at Java interop boundaries

## Expression Bodies

Prefer expression bodies for single-expression functions:

```kotlin
fun isAdult(age: Int): Boolean = age >= 18
```

## Reference

See skill: `kotlin-patterns` for comprehensive Kotlin idioms and patterns.
