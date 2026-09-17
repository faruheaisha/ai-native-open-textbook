---
title: "Spec Kit（GitHub 官方规格驱动开发工具包）"
sourceId: "07-coding/spec-kit"
sourceTitle: "Spec Kit（GitHub 官方规格驱动开发工具包）"
sourceKind: "产品仓库"
licenseLabel: "可转载"
lang: "英文"
tier: 2
volume: "07-coding"
sourceUrl: "https://github.com/github/spec-kit"
entryUrl: "https://github.com/github/spec-kit/blob/c173bf19a6654e3b05386ec3599349a55282b897/extensions/RFC-EXTENSION-SYSTEM.md"
sourceRel: "extensions/RFC-EXTENSION-SYSTEM.md"
rawUrl: "/raw/07-coding/spec-kit/extensions/RFC-EXTENSION-SYSTEM.md"
sourceSha256: "5947ce6c3e36a91188a44748eaa424e512cef6d1069d9e5b7c61904b4df102eb"
pageSha256: "8326ac25fc5864c470c54ff7bb24f1cdc03b9a99c2a372c83e3970e0e2b6140b"
contentMode: "local-full"
zh: ""
---

## Design Principles

### 1. Convention Over Configuration

- Standard directory structure (`.specify/extensions/\{name\}/`)
- Declarative manifest (`extension.yml`)
- Predictable command naming (`speckit.\{extension\}.\{command\}`)

### 2. Fail-Safe Defaults

- Missing extensions gracefully degrade (skip hooks)
- Invalid extensions warn but don't break core functionality
- Extension failures isolated from core operations

### 3. Backward Compatibility

- Core commands remain unchanged
- Extensions additive only (no core modifications)
- Old projects work without extensions

### 4. Developer Experience

- Simple installation: `specify extension add jira`
- Clear error messages for compatibility issues
- Local development mode for testing extensions

### 5. Security First

- Extensions run in same context as AI agent (trust boundary)
- Manifest validation prevents malicious code
- Verify signatures for official extensions (future)
