---
title: "Preset Publishing Guide"
sourceId: "07-coding/spec-kit"
sourceTitle: "Spec Kit（GitHub 官方规格驱动开发工具包）"
sourceKind: "产品仓库"
licenseLabel: "可转载"
lang: "英文"
tier: 2
volume: "07-coding"
sourceUrl: "https://github.com/github/spec-kit"
entryUrl: "https://github.com/github/spec-kit/blob/c173bf19a6654e3b05386ec3599349a55282b897/presets/PUBLISHING.md"
sourceRel: "presets/PUBLISHING.md"
rawUrl: "/raw/07-coding/spec-kit/presets/PUBLISHING.md"
sourceSha256: "2bb1b1a2c357d10f88c87112bede87c78c54284731565c22dacbea1fb129ec30"
pageSha256: "2bb1b1a2c357d10f88c87112bede87c78c54284731565c22dacbea1fb129ec30"
contentMode: "local-full"
zh: ""
---

# Preset Publishing Guide

This guide explains how to publish your preset to the Spec Kit preset catalog, making it discoverable by `specify preset search`.

## Table of Contents

1. [Prerequisites](#prerequisites)
2. [Prepare Your Preset](#prepare-your-preset)
3. [Submit to Catalog](#submit-to-catalog)
4. [Verification Process](#verification-process)
5. [Release Workflow](#release-workflow)
6. [Best Practices](#best-practices)

---

## Prerequisites

Before publishing a preset, ensure you have:

1. **Valid Preset**: A working preset with a valid `preset.yml` manifest
2. **Git Repository**: Preset hosted on GitHub (or other public git hosting)
3. **Documentation**: A preset-scoped README.md that explains how to use **this preset**, including a valid `specify preset add ...` install command (see [Usage README Requirements](#usage-readme-requirements))
4. **License**: Open source license file (MIT, Apache 2.0, etc.)
5. **Versioning**: Semantic versioning (e.g., 1.0.0)
6. **Testing**: Preset tested on real projects with `specify preset add --dev`

---

## Prepare Your Preset

### 1. Preset Structure

Ensure your preset follows the standard structure:

```text
your-preset/
├── preset.yml                 # Required: Preset manifest
├── README.md                  # Required: Documentation
├── LICENSE                    # Required: License file
├── CHANGELOG.md               # Recommended: Version history
│
├── templates/                 # Template overrides
│   ├── spec-template.md
│   ├── plan-template.md
│   └── ...
│
└── commands/                  # Command overrides (optional)
    └── speckit.specify.md
```

Start from the [scaffold](/lib/07-coding/spec-kit/presets-scaffold) if you're creating a new preset.

### 2. preset.yml Validation

Verify your manifest is valid:

```yaml
schema_version: "1.0"

preset:
  id: "your-preset"               # Unique lowercase-hyphenated ID
  name: "Your Preset Name"        # Human-readable name
  version: "1.0.0"                # Semantic version
  description: "Brief description (one sentence)"
  author: "Your Name or Organization"
  repository: "https://github.com/your-org/spec-kit-preset-your-preset"
  license: "MIT"

requires:
  speckit_version: ">=0.1.0"      # Required spec-kit version
  extensions:                      # Optional: extensions this preset needs
    - "companion-extension"

provides:
  templates:
    - type: "template"
      name: "spec-template"
      file: "templates/spec-template.md"
      description: "Custom spec template"
      replaces: "spec-template"

tags:                              # 2-5 relevant tags
  - "category"
  - "workflow"
```

**Validation Checklist**:

- ✅ `id` is lowercase with hyphens only (no underscores, spaces, or special characters)
- ✅ `version` follows semantic versioning (X.Y.Z)
- ✅ `description` is concise (under 200 characters)
- ✅ `repository` URL is valid and public
- ✅ All template and command files exist in the preset directory
- ✅ Template names are lowercase with hyphens only
- ✅ Command names use dot notation (e.g. `speckit.specify`)
- ✅ Tags are lowercase and descriptive

#### Declaring extension dependencies

If your preset overrides commands that call into an extension, declare it in
`requires.extensions`. Without the extension the preset still installs and the
overrides fall through to the core workflow, so nothing errors — the feature
just silently does less than the user expects. Declaring the dependency makes
`specify preset add` say so, and spell out how to resolve it.

Use a bare id, or a mapping when you need a version constraint or an optional
dependency:

```yaml
requires:
  speckit_version: ">=0.9.0"
  extensions:
    - "companion-extension"              # required, any version
    - id: "other-extension"
      version: ">=1.2.0,<2"              # optional PEP 440 specifier
      required: false                    # optional, defaults to true
```

`version` accepts any PEP 440 specifier, not just a lower bound — upper bounds
(`<2`), exact pins (`==1.2.0`), and exclusions (`!=1.3.0`) all work.

Notes:

- The field is optional. A preset that declares nothing behaves exactly as before.
- A dependency that is missing, stale, disabled, or version-unsatisfied produces a **warning, not a failure** — the install still succeeds.
- A disabled extension counts as unmet, and so does one whose registry entry survives after its files were removed. Resolution skips both, so the preset is just as inert as if the extension were absent.
- The warning names an exact command for the missing, stale, and disabled cases. For a version mismatch it states the constraint to satisfy rather than naming a command, because `specify extension update` only moves forward to the catalog release and cannot satisfy an upper bound, a pin, or a downgrade.
- A recorded version that cannot be parsed is treated as uncomparable rather than as a mismatch, so an extension whose registry version reads `unknown` is not reported as failing a constraint it was never evaluated against.
- An extension present on disk but absent from the registry counts as satisfied. Resolution admits unregistered directories, so the preset works and warning about it would be a false alarm — though with no recorded version, a `version` constraint cannot be checked against it.
- `required: false` documents an enhancing-but-optional extension and is never warned about.
- Declare it in `preset.yml`, not only in your catalog entry. The catalog is not consulted for `--dev` and `--from <url>` installs, so the manifest is the only copy present on every install path.

### 3. Test Locally

```bash
# Install from local directory
specify preset add --dev /path/to/your-preset

# Verify templates resolve from your preset
specify preset resolve spec-template

# Verify preset info
specify preset info your-preset

# List installed presets
specify preset list

# Remove when done testing
specify preset remove your-preset
```

If your preset includes command overrides, verify they appear in the agent directories:

```bash
# Check Claude commands (if using Claude)
ls .claude/commands/speckit.*.md

# Check Copilot commands (if using Copilot)
ls .github/agents/speckit.*.agent.md

# Check Gemini commands (if using Gemini)
ls .gemini/commands/speckit.*.toml
```

### 4. Create GitHub Release

Create a GitHub release for your preset version:

```bash
# Tag the release
git tag v1.0.0
git push origin v1.0.0
```

The release archive URL will be:

```text
https://github.com/your-org/spec-kit-preset-your-preset/archive/refs/tags/v1.0.0.zip
```

### 5. Test Installation from Archive

```bash
specify preset add --from https://github.com/your-org/spec-kit-preset-your-preset/archive/refs/tags/v1.0.0.zip
```

### Usage README Requirements

The catalog `documentation` field must point at a README that explains how to use
**this preset** — not a product pitch for a broader framework or a separate CLI.

The submission workflow **mechanically enforces** that the linked README is a GitHub-hosted
URL whose path ends with `README.md`, resolves to a readable file, and contains at least one
valid `specify preset add ...` command. The remaining items (preferring a preset-scoped README
in monorepos, covering the minimum structure) are expectations a human reviewer checks —
follow them so your submission isn't sent back for changes.

- **Point `documentation` at the preset-scoped README.** In a monorepo where the preset
  lives in a subdirectory (e.g. `presets/<id>/`), link the README inside that directory
  (`presets/<id>/README.md`) rather than the repository-root README. The root README is
  often a marketing/overview page; the catalog should surface preset usage instead. The key
  requirement is that this README is reachable at the `documentation` URL so users can read
  it *before* downloading the release artifact — it's fine for the same file to also ship
  inside the release ZIP.
- **Include a valid Spec Kit CLI install command** *(enforced)*. The linked README must
  contain at least one `specify preset add ...` invocation. Preferably use the
  catalog-install form whose URL matches your Download URL:

  ```bash
