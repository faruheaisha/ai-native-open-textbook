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
pageSha256: "7a087de06173070471ea6eaf1c2f85a54b401c418b7f47a06120468d8b9dd166"
contentMode: "local-full"
zh: ""
---

## Extension Discovery & Catalog

### Dual Catalog System

Spec Kit uses two catalog files with different purposes:

#### User Catalog (`catalog.json`)

**URL**: `https://raw.githubusercontent.com/github/spec-kit/main/extensions/catalog.json`

- **Purpose**: Organization's curated catalog of approved extensions
- **Default State**: Empty by design - users populate with extensions they trust
- **Usage**: Primary catalog (priority 1, `install_allowed: true`) in the default stack
- **Control**: Organizations maintain their own fork/version for their teams

#### Community Reference Catalog (`catalog.community.json`)

**URL**: `https://raw.githubusercontent.com/github/spec-kit/main/extensions/catalog.community.json`

- **Purpose**: Reference catalog of available community-contributed extensions
- **Verification**: Community extensions may have `verified: false` initially
- **Status**: Active - open for community contributions
- **Submission**: Via Pull Request following the Extension Publishing Guide
- **Usage**: Secondary catalog (priority 2, `install_allowed: false`) in the default stack — discovery only

**How It Works (default stack):**

1. **Discover**: `specify extension search` searches both catalogs — community extensions appear automatically
2. **Review**: Evaluate community extensions for security, quality, and organizational fit
3. **Curate**: Copy approved entries from community catalog to your `catalog.json`, or add to `.specify/extension-catalogs.yml` with `install_allowed: true`
4. **Install**: Use `specify extension add <name>` — only allowed from `install_allowed: true` catalogs

This approach gives organizations full control over which extensions can be installed while still providing community discoverability out of the box.

### Catalog Format

**Format** (same for both catalogs):

```json
{
  "schema_version": "1.0",
  "updated_at": "2026-01-28T14:30:00Z",
  "extensions": {
    "jira": {
      "name": "Jira Integration",
      "id": "jira",
      "description": "Create Jira Epics, Stories, and Issues from spec-kit artifacts",
      "author": "Stats Perform",
      "version": "1.0.0",
      "download_url": "https://github.com/statsperform/spec-kit-jira/releases/download/v1.0.0/spec-kit-jira-1.0.0.zip",
      "repository": "https://github.com/statsperform/spec-kit-jira",
      "homepage": "https://github.com/statsperform/spec-kit-jira/blob/main/README.md",
      "documentation": "https://github.com/statsperform/spec-kit-jira/blob/main/docs/",
      "changelog": "https://github.com/statsperform/spec-kit-jira/blob/main/CHANGELOG.md",
      "license": "MIT",
      "requires": {
        "speckit_version": ">=0.1.0,<2.0.0",
        "tools": [
          {
            "name": "jira-mcp-server",
            "version": ">=1.0.0"
          }
        ]
      },
      "tags": ["issue-tracking", "jira", "atlassian", "project-management"],
      "verified": true,
      "downloads": 1250,
      "stars": 45
    },
    "linear": {
      "name": "Linear Integration",
      "id": "linear",
      "description": "Sync spec-kit tasks with Linear issues",
      "author": "Community",
      "version": "0.9.0",
      "download_url": "https://github.com/example/spec-kit-linear/releases/download/v0.9.0/spec-kit-linear-0.9.0.zip",
      "repository": "https://github.com/example/spec-kit-linear",
      "requires": {
        "speckit_version": ">=0.1.0"
      },
      "tags": ["issue-tracking", "linear"],
      "verified": false
    }
  }
}
```

### Catalog Discovery Commands

```bash
# List all available extensions
specify extension search

# Search by keyword
specify extension search jira

# Search by tag
specify extension search --tag issue-tracking

# Show extension details
specify extension info jira
```

### Custom Catalogs

Spec Kit supports a **catalog stack** — an ordered list of catalogs that the CLI merges and searches across. This allows organizations to maintain their own org-approved extensions alongside an internal catalog and community discovery, all at once.

#### Catalog Stack Resolution

The active catalog stack is resolved in this order (first match wins):

1. **`SPECKIT_CATALOG_URL` environment variable** — single catalog replacing all defaults (backward compat)
2. **Project-level `.specify/extension-catalogs.yml`** — full control for the project
3. **User-level `~/.specify/extension-catalogs.yml`** — personal defaults
4. **Built-in default stack** — `catalog.json` (install_allowed: true) + `catalog.community.json` (install_allowed: false)

#### Default Built-in Stack

When no config file exists, the CLI uses:

| Priority | Catalog | install_allowed | Purpose |
|----------|---------|-----------------|---------|
| 1 | `catalog.json` (default) | `true` | Curated extensions available for installation |
| 2 | `catalog.community.json` (community) | `false` | Discovery only — browse but not install |

This means `specify extension search` surfaces community extensions out of the box, while `specify extension add` is still restricted to entries from catalogs with `install_allowed: true`.

#### `.specify/extension-catalogs.yml` Config File

```yaml
catalogs:
  - name: "default"
    url: "https://raw.githubusercontent.com/github/spec-kit/main/extensions/catalog.json"
    priority: 1          # Highest — only approved entries can be installed
    install_allowed: true
    description: "Built-in catalog of installable extensions"

  - name: "internal"
    url: "https://internal.company.com/spec-kit/catalog.json"
    priority: 2
    install_allowed: true
    description: "Internal company extensions"

  - name: "community"
    url: "https://raw.githubusercontent.com/github/spec-kit/main/extensions/catalog.community.json"
    priority: 3          # Lowest — discovery only, not installable
    install_allowed: false
    description: "Community-contributed extensions (discovery only)"
```

A user-level equivalent lives at `~/.specify/extension-catalogs.yml`. When a project-level config is present with one or more catalog entries, it takes full control and the built-in defaults are not applied. An empty `catalogs: []` list is treated the same as no config file, falling back to defaults.

#### Catalog CLI Commands

```bash
# List active catalogs with name, URL, priority, and install_allowed
specify extension catalog list

# Add a catalog (project-scoped)
specify extension catalog add --name "internal" --install-allowed \
  https://internal.company.com/spec-kit/catalog.json

# Add a discovery-only catalog
specify extension catalog add --name "community" \
  https://raw.githubusercontent.com/github/spec-kit/main/extensions/catalog.community.json

# Remove a catalog
specify extension catalog remove internal

# Show which catalog an extension came from
specify extension info jira
# → Source catalog: default
```

#### Merge Conflict Resolution

When the same extension `id` appears in multiple catalogs, the higher-priority (lower priority number) catalog wins. Extensions from lower-priority catalogs with the same `id` are ignored.

#### `install_allowed: false` Behavior

Extensions from discovery-only catalogs are shown in `specify extension search` results but cannot be installed directly:

```
⚠  'linear' is available in the 'community' catalog but installation is not allowed from that catalog.

To enable installation, add 'linear' to an approved catalog (install_allowed: true) in .specify/extension-catalogs.yml.
```

#### `SPECKIT_CATALOG_URL` (Backward Compatibility)

The `SPECKIT_CATALOG_URL` environment variable still works — it is treated as a single `install_allowed: true` catalog, **replacing both defaults** for full backward compatibility:

```bash
# Point to your organization's catalog
export SPECKIT_CATALOG_URL="https://internal.company.com/spec-kit/catalog.json"

# All extension commands now use your custom catalog
specify extension search       # Uses custom catalog
specify extension add jira     # Installs from custom catalog
```

**Requirements:**
- URL must use HTTPS (HTTP only allowed for localhost testing)
- Catalog must follow the standard catalog.json schema
- Must be publicly accessible or accessible within your network

**Example for testing:**
```bash
# Test with localhost during development
export SPECKIT_CATALOG_URL="http://localhost:8000/catalog.json"
specify extension search
```
