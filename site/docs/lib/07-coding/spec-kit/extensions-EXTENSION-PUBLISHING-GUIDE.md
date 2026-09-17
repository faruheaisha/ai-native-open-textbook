---
title: "Extension Publishing Guide"
sourceId: "07-coding/spec-kit"
sourceTitle: "Spec Kit（GitHub 官方规格驱动开发工具包）"
sourceKind: "产品仓库"
licenseLabel: "可转载"
lang: "英文"
tier: 2
volume: "07-coding"
sourceUrl: "https://github.com/github/spec-kit"
entryUrl: "https://github.com/github/spec-kit/blob/c173bf19a6654e3b05386ec3599349a55282b897/extensions/EXTENSION-PUBLISHING-GUIDE.md"
sourceRel: "extensions/EXTENSION-PUBLISHING-GUIDE.md"
rawUrl: "/raw/07-coding/spec-kit/extensions/EXTENSION-PUBLISHING-GUIDE.md"
sourceSha256: "7e471208d81f72b4eb791622463391bb98615e55766d09c2b12e699ca777f052"
pageSha256: "7e471208d81f72b4eb791622463391bb98615e55766d09c2b12e699ca777f052"
contentMode: "local-full"
zh: ""
---

# Extension Publishing Guide

This guide explains how to publish your extension to the Spec Kit extension catalog, making it discoverable by `specify extension search`.

## Table of Contents

1. [Prerequisites](#prerequisites)
2. [Prepare Your Extension](#prepare-your-extension)
3. [Submit to Catalog](#submit-to-catalog)
4. [Release Workflow](#release-workflow)
5. [Best Practices](#best-practices)

---

## Prerequisites

Before publishing an extension, ensure you have:

1. **Valid Extension**: A working extension with a valid `extension.yml` manifest
2. **Git Repository**: Extension hosted on GitHub (or other public git hosting)
3. **Documentation**: README.md with installation and usage instructions
4. **License**: Open source license file (MIT, Apache 2.0, etc.)
5. **Versioning**: Semantic versioning (e.g., 1.0.0)
6. **Testing**: Extension tested on real projects

---

## Prepare Your Extension

### 1. Extension Structure

Ensure your extension follows the standard structure:

```text
your-extension/
├── extension.yml              # Required: Extension manifest
├── README.md                  # Required: Documentation
├── LICENSE                    # Required: License file
├── CHANGELOG.md               # Recommended: Version history
├── .gitignore                 # Recommended: Git ignore rules
│
├── commands/                  # Extension commands
│   ├── command1.md
│   └── command2.md
│
├── config-template.yml        # Config template (if needed)
│
└── docs/                      # Additional documentation
    ├── usage.md
    └── examples/
```

### 2. extension.yml Validation

Verify your manifest is valid:

```yaml
schema_version: "1.0"

extension:
  id: "your-extension"           # Unique lowercase-hyphenated ID
  name: "Your Extension Name"     # Human-readable name
  version: "1.0.0"                # Semantic version
  description: "Brief description (one sentence)"
  author: "Your Name or Organization"
  repository: "https://github.com/your-org/spec-kit-your-extension"
  license: "MIT"
  homepage: "https://github.com/your-org/spec-kit-your-extension"

requires:
  speckit_version: ">=0.1.0"    # Required spec-kit version

provides:
  commands:                       # List all commands
    - name: "speckit.your-extension.command"
      file: "commands/command.md"
      description: "Command description"

tags:                             # 2-5 relevant tags
  - "category"
  - "tool-name"
```

**Validation Checklist**:

- ✅ `id` is lowercase with hyphens only (no underscores, spaces, or special characters)
- ✅ `version` follows semantic versioning (X.Y.Z)
- ✅ `description` is concise (under 100 characters)
- ✅ `repository` URL is valid and public
- ✅ All command files exist in the extension directory
- ✅ Tags are lowercase and descriptive

### 3. Create GitHub Release

Create a GitHub release for your extension version:

```bash
# Tag the release
git tag v1.0.0
git push origin v1.0.0

# Create release on GitHub
# Go to: https://github.com/your-org/spec-kit-your-extension/releases/new
# - Tag: v1.0.0
# - Title: v1.0.0 - Release Name
# - Description: Changelog/release notes
```

The release archive URL will be:

```text
https://github.com/your-org/spec-kit-your-extension/archive/refs/tags/v1.0.0.zip
```

### 4. Test Installation

Test that users can install from your release:

```bash
# Test dev installation
specify extension add --dev /path/to/your-extension

# Test from GitHub archive
