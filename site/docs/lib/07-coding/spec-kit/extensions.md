---
title: "Spec Kit Extensions"
sourceId: "07-coding/spec-kit"
sourceTitle: "Spec Kit（GitHub 官方规格驱动开发工具包）"
sourceKind: "产品仓库"
licenseLabel: "可转载"
lang: "英文"
tier: 2
volume: "07-coding"
sourceUrl: "https://github.com/github/spec-kit"
entryUrl: "https://github.com/github/spec-kit/blob/c173bf19a6654e3b05386ec3599349a55282b897/README.md"
zh: ""
---

# Spec Kit Extensions

Extension system for [Spec Kit](https://github.com/github/spec-kit) - add new functionality without bloating the core framework.

## Extension Catalogs

Spec Kit provides two catalog files with different purposes:

### Your Catalog (`catalog.json`)

- **Purpose**: Default upstream catalog of extensions used by the Spec Kit CLI
- **Default State**: Empty by design in the upstream project - you or your organization populate a fork/copy with extensions you trust
- **Location (upstream)**: `extensions/catalog.json` in the GitHub-hosted spec-kit repo
- **CLI Default**: The `specify extension` commands use the upstream catalog URL by default, unless overridden
- **Org Catalog**: Point `SPECKIT_CATALOG_URL` at your organization's fork or hosted catalog JSON to use it instead of the upstream default
- **Customization**: Copy entries from the community catalog into your org catalog, or add your own extensions directly

**Example override:**
```bash
# Override the default upstream catalog with your organization's catalog
export SPECKIT_CATALOG_URL="https://your-org.com/spec-kit/catalog.json"
specify extension search  # Now uses your organization's catalog instead of the upstream default
```

### Community Reference Catalog (`catalog.community.json`)

> [!NOTE]
> Community extensions are independently created and maintained by their respective authors. Maintainers only verify that catalog entries are complete and correctly formatted — they do **not review, audit, endorse, or support the extension code itself**. Review extension source code before installation and use at your own discretion.

- **Purpose**: Browse available community-contributed extensions
- **Status**: Active - contains extensions submitted by the community
- **Location**: `extensions/catalog.community.json`
- **Usage**: Reference catalog for discovering available extensions
- **Submission**: Open to community contributions via [issue template](https://github.com/github/spec-kit/issues/new?template=extension_submission.yml)

**How It Works:**

## Making Extensions Available

You control which extensions your team can discover and install:

### Option 1: Curated Catalog (Recommended for Organizations)

Populate your `catalog.json` with approved extensions:

1. **Discover** extensions from various sources:
   - Browse `catalog.community.json` for community extensions
   - Find private/internal extensions in your organization's repos
   - Discover extensions from trusted third parties
2. **Review** extensions and choose which ones you want to make available
3. **Add** those extension entries to your own `catalog.json`
4. **Team members** can now discover and install them:
   - `specify extension search` shows your curated catalog
   - `specify extension add <name>` installs from your catalog

**Benefits**: Full control over available extensions, team consistency, organizational approval workflow

**Example**: Copy an entry from `catalog.community.json` to your `catalog.json`, then your team can discover and install it by name.

### Option 2: Direct URLs (For Ad-hoc Use)

Skip catalog curation - team members install directly using URLs:

```bash
