---
title: "Spec Kit Integration Catalog"
sourceId: "07-coding/spec-kit"
sourceTitle: "Spec Kit（GitHub 官方规格驱动开发工具包）"
sourceKind: "产品仓库"
licenseLabel: "可转载"
lang: "英文"
tier: 2
volume: "07-coding"
sourceUrl: "https://github.com/github/spec-kit"
entryUrl: "https://github.com/github/spec-kit/blob/c173bf19a6654e3b05386ec3599349a55282b897/integrations/README.md"
sourceRel: "integrations/README.md"
rawUrl: "/raw/07-coding/spec-kit/integrations/README.md"
sourceSha256: "d1b2d81bc6947c19aad6c66ce869e0292a3a3bc0db8dfa1e835e11ac933d4c86"
pageSha256: "d1b2d81bc6947c19aad6c66ce869e0292a3a3bc0db8dfa1e835e11ac933d4c86"
contentMode: "local-full"
zh: ""
---

# Spec Kit Integration Catalog

The integration catalog enables discovery, versioning, and distribution of AI agent integrations for Spec Kit.

## Catalog Files

### Built-In Catalog (`catalog.json`)

Contains integrations that ship with Spec Kit. These are maintained by the core team and always installable.

### Community Catalog (`catalog.community.json`)

Community-contributed integrations. Listed for discovery only — users install from the source repositories.

## Catalog Configuration

The catalog stack is resolved in this order (first match wins):

1. **Environment variable** — `SPECKIT_INTEGRATION_CATALOG_URL` overrides all catalogs with a single URL
2. **Project config** — `.specify/integration-catalogs.yml` in the project root
3. **User config** — `~/.specify/integration-catalogs.yml` in the user home directory
4. **Built-in defaults** — `catalog.json` + `catalog.community.json`

Example `integration-catalogs.yml`:

```yaml
catalogs:
  - url: "https://example.com/my-catalog.json"
    name: "my-catalog"
    priority: 1
    install_allowed: true
```

## CLI Commands

```bash
# List built-in integrations (default)
specify integration list

# Browse full catalog (built-in + community)
specify integration list --catalog

# Install an integration
specify integration install copilot

# Upgrade the current integration (diff-aware)
specify integration upgrade

# Upgrade with force (overwrite modified files)
specify integration upgrade --force
```

## Integration Descriptor (`integration.yml`)

Each integration can include an `integration.yml` descriptor that documents its metadata, requirements, and provided commands/scripts:

```yaml
schema_version: "1.0"
integration:
  id: "my-agent"
  name: "My Agent"
  version: "1.0.0"
  description: "Integration for My Agent"
  author: "my-org"
  repository: "https://github.com/my-org/speckit-my-agent"
  license: "MIT"
requires:
  speckit_version: ">=0.6.0"
  tools:
    - name: "my-agent"
      version: ">=1.0.0"
      required: true
provides:
  commands:
    - name: "speckit.specify"
      file: "templates/speckit.specify.md"
    - name: "speckit.plan"
      file: "templates/speckit.plan.md"
  scripts:
    - update-context.sh
    - update-context.ps1
```

## Catalog Schema

Both catalog files follow the same JSON schema:

```json
{
  "schema_version": "1.0",
  "updated_at": "2026-04-08T00:00:00Z",
  "catalog_url": "https://...",
  "integrations": {
    "my-agent": {
      "id": "my-agent",
      "name": "My Agent",
      "version": "1.0.0",
      "description": "Integration for My Agent",
      "author": "my-org",
      "repository": "https://github.com/my-org/speckit-my-agent",
      "tags": ["cli"]
    }
  }
}
```

### Required Fields

| Field | Type | Description |
|-------|------|-------------|
| `schema_version` | string | Must be `"1.0"` |
| `updated_at` | string | ISO 8601 timestamp |
| `integrations` | object | Map of integration ID → metadata |

### Integration Entry Fields

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `id` | string | Yes | Unique ID (lowercase alphanumeric + hyphens) |
| `name` | string | Yes | Human-readable display name |
| `version` | string | Yes | PEP 440 version (e.g., `1.0.0`, `1.0.0a1`) |
| `description` | string | Yes | One-line description |
| `author` | string | No | Author name or organization |
| `repository` | string | No | Source repository URL |
| `tags` | array | No | Searchable tags (e.g., `["cli", "ide"]`) |
