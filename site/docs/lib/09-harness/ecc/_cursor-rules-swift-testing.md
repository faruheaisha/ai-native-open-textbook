---
title: "Swift Testing"
sourceId: "09-harness/ecc"
sourceTitle: "ECC —— Harness 性能优化系统"
sourceKind: "其他材料"
licenseLabel: "可转载"
lang: "英文"
tier: 3
volume: "09-harness"
sourceUrl: "https://github.com/affaan-m/ECC"
entryUrl: "https://github.com/affaan-m/ECC/blob/928c1dea72f5c330442fc1f595563398b8f389f7/.cursor/rules/swift-testing.md"
sourceRel: ".cursor/rules/swift-testing.md"
rawUrl: "/raw/09-harness/ecc/.cursor/rules/swift-testing.md"
sourceSha256: "339874f964e108edb63aad1e095c868bb2894350b374aaf4a44081edd8a8f816"
pageSha256: "339874f964e108edb63aad1e095c868bb2894350b374aaf4a44081edd8a8f816"
contentMode: "local-full"
zh: ""
---

# Swift Testing

> This file extends the common testing rule with Swift specific content.

## Framework

Use **Swift Testing** (`import Testing`) for new tests. Use `@Test` and `#expect`:

```swift
@Test("User creation validates email")
func userCreationValidatesEmail() throws {
    #expect(throws: ValidationError.invalidEmail) {
        try User(email: "not-an-email")
    }
}
```

## Test Isolation

Each test gets a fresh instance -- set up in `init`, tear down in `deinit`. No shared mutable state between tests.

## Parameterized Tests

```swift
@Test("Validates formats", arguments: ["json", "xml", "csv"])
func validatesFormat(format: String) throws {
    let parser = try Parser(format: format)
    #expect(parser.isValid)
}
```

## Coverage

```bash
swift test --enable-code-coverage
```

## Reference

See skill: `swift-protocol-di-testing` for protocol-based dependency injection and mock patterns with Swift Testing.
