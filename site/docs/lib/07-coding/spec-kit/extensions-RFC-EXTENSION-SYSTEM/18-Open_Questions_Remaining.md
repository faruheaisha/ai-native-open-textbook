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
pageSha256: "56c219c4d91acdcc45246328637026bbf2e6fafb41018fe7a5b8c0a72b20a6c1"
contentMode: "local-full"
zh: ""
---

## Open Questions (Remaining)

### 1. Sandboxing / Permissions (Future)

**Question**: Should extensions declare required permissions?

**Options**:

- A) No sandboxing (current): Extensions run with same privileges as AI agent
- B) Permission declarations: Extensions declare `filesystem:read`, `network:external`, etc.
- C) Opt-in sandboxing: Organizations can enable permission enforcement

**Status**: Deferred to future version. Currently using trust-based model where users trust extension authors.

---

### 2. Package Signatures (Future)

**Question**: Should extensions be cryptographically signed?

**Options**:

- A) No signatures (current): Trust based on catalog source
- B) GPG/Sigstore signatures: Verify package integrity
- C) Catalog-level verification: Catalog maintainers verify packages

**Status**: Deferred to future version. `checksum` field is available in catalog schema but not enforced.
