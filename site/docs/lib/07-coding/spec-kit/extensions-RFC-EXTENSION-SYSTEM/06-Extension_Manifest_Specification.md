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
pageSha256: "70ec700304dada76c477ed05d63b0a720caa57d91bdbb77d64c299ab64d498a2"
contentMode: "local-full"
zh: ""
---

## Extension Manifest Specification

### Schema: `extension.yml`

```yaml
# Extension Manifest Schema v1.0
# All extensions MUST include this file at root

# Schema version for compatibility
schema_version: "1.0"

# Extension metadata (REQUIRED)
extension:
  id: "jira"                    # Unique identifier (lowercase, alphanumeric, hyphens)
  name: "Jira Integration"      # Human-readable name
  version: "1.0.0"              # Semantic version
  description: "Create Jira Epics, Stories, and Issues from spec-kit artifacts"
  author: "Stats Perform"       # Author/organization
  repository: "https://github.com/statsperform/spec-kit-jira"
  license: "MIT"                # SPDX license identifier
  homepage: "https://github.com/statsperform/spec-kit-jira/blob/main/README.md"

# Compatibility requirements (REQUIRED)
requires:
  # Spec-kit version (semantic version range)
  speckit_version: ">=0.1.0,<2.0.0"

  # External tools required by extension
  tools:
    - name: "jira-mcp-server"
      required: true
      version: ">=1.0.0"          # Optional: version constraint
      description: "Jira MCP server for API access"
      install_url: "https://github.com/your-org/jira-mcp-server"
      check_command: "jira --version"  # Optional: CLI command to verify

  # Core spec-kit commands this extension depends on
  commands:
    - "speckit.tasks"             # Extension needs tasks command

  # Core scripts required
  scripts:
    - "check-prerequisites.sh"

# What this extension provides (REQUIRED)
provides:
  # Commands added to AI agent
  commands:
    - name: "speckit.jira.specstoissues"
      file: "commands/specstoissues.md"
      description: "Create Jira hierarchy from spec and tasks"
      aliases: ["speckit.jira.sync"]  # Alternate names

    - name: "speckit.jira.discover-fields"
      file: "commands/discover-fields.md"
      description: "Discover Jira custom fields for configuration"

    - name: "speckit.jira.sync-status"
      file: "commands/sync-status.md"
      description: "Sync task completion status to Jira"

  # Configuration files
  config:
    - name: "jira-config.yml"
      template: "jira-config.template.yml"
      description: "Jira integration configuration"
      required: true              # User must configure before use

  # Helper scripts
  scripts:
    - name: "parse-jira-config.sh"
      file: "scripts/parse-jira-config.sh"
      description: "Parse jira-config.yml to JSON"
      executable: true            # Make executable on install

# Extension configuration defaults (OPTIONAL)
defaults:
  project:
    key: null                     # No default, user must configure
  hierarchy:
    issue_type: "subtask"
  update_behavior:
    mode: "update"
    sync_completion: true

# Configuration schema for validation (OPTIONAL)
config_schema:
  type: "object"
  required: ["project"]
  properties:
    project:
      type: "object"
      required: ["key"]
      properties:
        key:
          type: "string"
          pattern: "^[A-Z]{2,10}$"
          description: "Jira project key (e.g., MSATS)"

# Integration hooks (OPTIONAL)
hooks:
  # Hook fired after /speckit.tasks completes
  after_tasks:
    command: "speckit.jira.specstoissues"
    optional: true
    prompt: "Create Jira issues from tasks?"
    description: "Automatically create Jira hierarchy after task generation"

  # Hook fired after /speckit.implement completes
  after_implement:
    command: "speckit.jira.sync-status"
    optional: true
    prompt: "Sync completion status to Jira?"

# Tags for discovery (OPTIONAL)
tags:
  - "issue-tracking"
  - "jira"
  - "atlassian"
  - "project-management"

# Changelog URL (OPTIONAL)
changelog: "https://github.com/statsperform/spec-kit-jira/blob/main/CHANGELOG.md"

# Support information (OPTIONAL)
support:
  documentation: "https://github.com/statsperform/spec-kit-jira/blob/main/docs/"
  issues: "https://github.com/statsperform/spec-kit-jira/issues"
  discussions: "https://github.com/statsperform/spec-kit-jira/discussions"
  email: "support@statsperform.com"
```

### Validation Rules

1. **MUST have** `schema_version`, `extension`, `requires`, `provides`
2. **MUST follow** semantic versioning for `version`
3. **MUST have** unique `id` (no conflicts with other extensions)
4. **MUST declare** all external tool dependencies
5. **SHOULD include** `config_schema` if extension uses config
6. **SHOULD include** `support` information
7. Command `file` paths **MUST be** relative to extension root
8. Hook `command` names **MUST match** a command in `provides.commands`
