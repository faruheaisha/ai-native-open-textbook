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
pageSha256: "1b40707149d95c1b223a6603c96e5260a3fa65c0a4fbeab3e3e59d22039bbe60"
contentMode: "local-full"
zh: ""
---

## Security Considerations

### Trust Model

Extensions run with **same privileges as AI agent**:

- Can execute shell commands
- Can read/write files in project
- Can make network requests

**Trust boundary**: User must trust extension author.

### Verification

**Verified Extensions** (in catalog):

- Published by known organizations (GitHub, Stats Perform, etc.)
- Code reviewed by spec-kit maintainers
- Marked with ✓ badge in catalog

**Community Extensions**:

- Not verified, use at own risk
- Show warning during installation:

  ```text
  ⚠️  This extension is not verified.
     Review code before installing: https://github.com/...

     Continue? (yes/no):
  ```

### Sandboxing (Future)

**Phase 2** (not in initial release):

- Extensions declare required permissions in manifest
- CLI enforces permission boundaries
- Example permissions: `filesystem:read`, `network:external`, `env:read`

```yaml
# Future extension.yml
permissions:
  - "filesystem:read:.specify/extensions/jira/"  # Can only read own config
  - "filesystem:write:.specify/memory/"          # Can write to memory
  - "network:external:*.atlassian.net"           # Can call Jira API
  - "env:read:SPECKIT_JIRA_*"                    # Can read own env vars
```

### Package Integrity

**Future**: Sign extension packages with GPG/Sigstore

```yaml
# catalog.json
"jira": {
  "download_url": "...",
  "checksum": "sha256:abc123...",
  "signature": "https://github.com/.../spec-kit-jira-1.0.0.sig",
  "signing_key": "https://github.com/statsperform.gpg"
}
```

CLI verifies signature before extraction.
