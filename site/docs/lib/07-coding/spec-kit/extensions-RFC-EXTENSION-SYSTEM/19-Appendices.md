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
pageSha256: "8748d563bd0652062f51330904f35b1a14b638993a56b9cb15e5b7a04dc9ef38"
contentMode: "local-full"
zh: ""
---

## Appendices

### Appendix A: Example Extension Structure

**Complete structure of `spec-kit-jira` extension:**

```text
spec-kit-jira/
├── README.md                        # Overview, features, installation
├── LICENSE                          # MIT license
├── CHANGELOG.md                     # Version history
├── .gitignore                       # Ignore local configs
│
├── extension.yml                    # Extension manifest (required)
├── jira-config.template.yml         # Config template
│
├── commands/                        # Command files
│   ├── specstoissues.md            # Main command
│   ├── discover-fields.md          # Helper: Discover custom fields
│   └── sync-status.md              # Helper: Sync completion status
│
├── scripts/                         # Helper scripts
│   ├── parse-jira-config.sh        # Config loader (bash)
│   ├── parse-jira-config.ps1       # Config loader (PowerShell)
│   └── validate-jira-connection.sh # Connection test
│
├── docs/                            # Documentation
│   ├── installation.md             # Installation guide
│   ├── configuration.md            # Configuration reference
│   ├── usage.md                    # Usage examples
│   ├── troubleshooting.md          # Common issues
│   └── examples/
│       ├── eng-msa-ts-config.yml   # Real-world config example
│       └── simple-project.yml      # Minimal config example
│
├── tests/                           # Tests (optional)
│   ├── test-extension.sh           # Extension validation
│   └── test-commands.sh            # Command execution tests
│
└── .github/                         # GitHub integration
    └── workflows/
        └── release.yml              # Automated releases
```

### Appendix B: Extension Development Guide (Outline)

**Documentation for creating new extensions:**

1. **Getting Started**
   - Prerequisites (tools needed)
   - Extension template (cookiecutter)
   - Directory structure

2. **Extension Manifest**
   - Schema reference
   - Required vs optional fields
   - Versioning guidelines

3. **Command Development**
   - Universal command format
   - Frontmatter specification
   - Template variables
   - Script references

4. **Configuration**
   - Config file structure
   - Schema validation
   - Layered config resolution
   - Environment variable overrides

5. **Hooks**
   - Available hook points
   - Hook registration
   - Conditional execution
   - Best practices

6. **Testing**
   - Local development setup
   - Testing with `--dev` flag
   - Validation checklist
   - Integration testing

7. **Publishing**
   - Packaging (ZIP format)
   - GitHub releases
   - Catalog submission
   - Versioning strategy

8. **Examples**
   - Minimal extension
   - Extension with hooks
   - Extension with configuration
   - Extension with multiple commands

### Appendix C: Compatibility Matrix

**Planned support matrix:**

| Extension Feature | Spec Kit Version | AI Agent Support |
|-------------------|------------------|------------------|
| Basic commands | 0.2.0+ | Claude, Gemini, Copilot |
| Hooks (after_tasks) | 0.3.0+ | Claude, Gemini |
| Config validation | 0.2.0+ | All |
| Multiple catalogs | 0.4.0+ | All |
| Permissions (sandboxing) | 1.0.0+ | TBD |

### Appendix D: Extension Catalog Schema

**Full schema for `catalog.json`:**

```json
{
  "$schema": "http://json-schema.org/draft-07/schema#",
  "type": "object",
  "required": ["schema_version", "updated_at", "extensions"],
  "properties": {
    "schema_version": {
      "type": "string",
      "pattern": "^\\d+\\.\\d+$"
    },
    "updated_at": {
      "type": "string",
      "format": "date-time"
    },
    "extensions": {
      "type": "object",
      "patternProperties": {
        "^[a-z0-9-]+$": {
          "type": "object",
          "required": ["name", "id", "version", "download_url", "repository"],
          "properties": {
            "name": { "type": "string" },
            "id": { "type": "string", "pattern": "^[a-z0-9-]+$" },
            "description": { "type": "string" },
            "author": { "type": "string" },
            "version": { "type": "string", "pattern": "^\\d+\\.\\d+\\.\\d+$" },
            "download_url": { "type": "string", "format": "uri" },
            "repository": { "type": "string", "format": "uri" },
            "homepage": { "type": "string", "format": "uri" },
            "documentation": { "type": "string", "format": "uri" },
            "changelog": { "type": "string", "format": "uri" },
            "license": { "type": "string" },
            "requires": {
              "type": "object",
              "properties": {
                "speckit_version": { "type": "string" },
                "tools": {
                  "type": "array",
                  "items": {
                    "type": "object",
                    "required": ["name"],
                    "properties": {
                      "name": { "type": "string" },
                      "version": { "type": "string" }
                    }
                  }
                }
              }
            },
            "tags": {
              "type": "array",
              "items": { "type": "string" }
            },
            "verified": { "type": "boolean" },
            "downloads": { "type": "integer" },
            "stars": { "type": "integer" },
            "checksum": { "type": "string" }
          }
        }
      }
    }
  }
}
```
