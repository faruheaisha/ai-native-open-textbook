---
title: "Swift Security"
sourceId: "09-harness/ecc"
sourceTitle: "ECC —— Harness 性能优化系统"
sourceKind: "其他材料"
licenseLabel: "可转载"
lang: "英文"
tier: 3
volume: "09-harness"
sourceUrl: "https://github.com/affaan-m/ECC"
entryUrl: "https://github.com/affaan-m/ECC/blob/928c1dea72f5c330442fc1f595563398b8f389f7/.cursor/rules/swift-security.md"
sourceRel: ".cursor/rules/swift-security.md"
rawUrl: "/raw/09-harness/ecc/.cursor/rules/swift-security.md"
sourceSha256: "d7c4d423986a1247981466ab84295be1d757577eae9de197c3646a741393313a"
pageSha256: "d7c4d423986a1247981466ab84295be1d757577eae9de197c3646a741393313a"
contentMode: "local-full"
zh: ""
---

# Swift Security

> This file extends the common security rule with Swift specific content.

## Secret Management

- Use **Keychain Services** for sensitive data (tokens, passwords, keys) -- never `UserDefaults`
- Use environment variables or `.xcconfig` files for build-time secrets
- Never hardcode secrets in source -- decompilation tools extract them trivially

```swift
let apiKey = ProcessInfo.processInfo.environment["API_KEY"]
guard let apiKey, !apiKey.isEmpty else {
    fatalError("API_KEY not configured")
}
```

## Transport Security

- App Transport Security (ATS) is enforced by default -- do not disable it
- Use certificate pinning for critical endpoints
- Validate all server certificates

## Input Validation

- Sanitize all user input before display to prevent injection
- Use `URL(string:)` with validation rather than force-unwrapping
- Validate data from external sources (APIs, deep links, pasteboard) before processing
