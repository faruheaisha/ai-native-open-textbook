---
title: "Kotlin Testing"
sourceId: "09-harness/ecc"
sourceTitle: "ECC —— Harness 性能优化系统"
sourceKind: "其他材料"
licenseLabel: "可转载"
lang: "英文"
tier: 3
volume: "09-harness"
sourceUrl: "https://github.com/affaan-m/ECC"
entryUrl: "https://github.com/affaan-m/ECC/blob/928c1dea72f5c330442fc1f595563398b8f389f7/.cursor/rules/kotlin-testing.md"
sourceRel: ".cursor/rules/kotlin-testing.md"
rawUrl: "/raw/09-harness/ecc/.cursor/rules/kotlin-testing.md"
sourceSha256: "ce9cc8f5576ad3b0ea3bcb128c5b19ff0f474c066b5452b1bdd4c0e817736c73"
pageSha256: "ce9cc8f5576ad3b0ea3bcb128c5b19ff0f474c066b5452b1bdd4c0e817736c73"
contentMode: "local-full"
zh: ""
---

# Kotlin Testing

> This file extends the common testing rule with Kotlin-specific content.

## Framework

Use **Kotest** with spec styles (StringSpec, FunSpec, BehaviorSpec) and **MockK** for mocking.

## Coroutine Testing

Use `runTest` from `kotlinx-coroutines-test`:

```kotlin
test("async operation completes") {
    runTest {
        val result = service.fetchData()
        result.shouldNotBeEmpty()
    }
}
```

## Coverage

Use **Kover** for coverage reporting:

```bash
./gradlew koverHtmlReport
./gradlew koverVerify
```

## Reference

See skill: `kotlin-testing` for detailed Kotest patterns, MockK usage, and property-based testing.
