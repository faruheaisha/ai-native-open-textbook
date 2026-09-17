---
title: "Kotlin Patterns"
sourceId: "09-harness/ecc"
sourceTitle: "ECC —— Harness 性能优化系统"
sourceKind: "其他材料"
licenseLabel: "可转载"
lang: "英文"
tier: 3
volume: "09-harness"
sourceUrl: "https://github.com/affaan-m/ECC"
entryUrl: "https://github.com/affaan-m/ECC/blob/928c1dea72f5c330442fc1f595563398b8f389f7/.cursor/rules/kotlin-patterns.md"
sourceRel: ".cursor/rules/kotlin-patterns.md"
rawUrl: "/raw/09-harness/ecc/.cursor/rules/kotlin-patterns.md"
sourceSha256: "a561c39f154e0f8a7eac72cae00418fa8e79a498a805b1806488eaa961ffa6aa"
pageSha256: "a561c39f154e0f8a7eac72cae00418fa8e79a498a805b1806488eaa961ffa6aa"
contentMode: "local-full"
zh: ""
---

# Kotlin Patterns

> This file extends the common patterns rule with Kotlin-specific content.

## Sealed Classes

Use sealed classes/interfaces for exhaustive type hierarchies:

```kotlin
sealed class Result<out T> {
    data class Success<T>(val data: T) : Result<T>()
    data class Failure(val error: AppError) : Result<Nothing>()
}
```

## Extension Functions

Add behavior without inheritance, scoped to where they're used:

```kotlin
fun String.toSlug(): String =
    lowercase().replace(Regex("[^a-z0-9\\s-]"), "").replace(Regex("\\s+"), "-")
```

## Scope Functions

- `let`: Transform nullable or scoped result
- `apply`: Configure an object
- `also`: Side effects
- Avoid nesting scope functions

## Dependency Injection

Use Koin for DI in Ktor projects:

```kotlin
val appModule = module {
    single<UserRepository> { ExposedUserRepository(get()) }
    single { UserService(get()) }
}
```

## Reference

See skill: `kotlin-patterns` for comprehensive Kotlin patterns including coroutines, DSL builders, and delegation.
