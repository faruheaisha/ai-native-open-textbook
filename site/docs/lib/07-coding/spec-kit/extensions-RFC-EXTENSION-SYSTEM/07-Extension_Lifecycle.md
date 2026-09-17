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
pageSha256: "4f4d08f9c9541496d57be136ef8b7e016ed01c2415dee3cddf9628b50a75ed1d"
contentMode: "local-full"
zh: ""
---

## Extension Lifecycle

### 1. Discovery

```bash
specify extension search jira
# Searches catalog for extensions matching "jira"
```

**Process:**

1. Fetch extension catalog from GitHub
2. Filter by search term (name, tags, description)
3. Display results with metadata

### 2. Installation

```bash
specify extension add jira
```

**Process:**

1. **Resolve**: Look up extension in catalog
2. **Download**: Fetch extension package (ZIP from GitHub release)
3. **Validate**: Check manifest schema, compatibility
4. **Extract**: Unpack to `.specify/extensions/jira/`
5. **Configure**: Copy config templates
6. **Register**: Add commands to AI agent config
7. **Record**: Update `.specify/extensions/.registry`

**Registry Format** (`.specify/extensions/.registry`):

```json
{
  "schema_version": "1.0",
  "extensions": {
    "jira": {
      "version": "1.0.0",
      "installed_at": "2026-01-28T14:30:00Z",
      "source": "catalog",
      "manifest_hash": "sha256:abc123...",
      "enabled": true,
      "priority": 10
    }
  }
}
```

**Priority Field**: Extensions are ordered by `priority` (lower = higher precedence). Default is 10. Used for template resolution when multiple extensions provide the same template.

### 3. Configuration

```bash
# User edits extension config
vim .specify/extensions/jira/jira-config.yml
```

**Config discovery order:**

1. Extension defaults (`extension.yml` → `defaults`)
2. Project config (`jira-config.yml`)
3. Local overrides (`jira-config.local.yml` - gitignored)
4. Environment variables (`SPECKIT_JIRA_*`)

### 4. Usage

```bash
claude
> /speckit.jira.specstoissues
```

**Command resolution:**

1. AI agent finds command in `.claude/commands/speckit.jira.specstoissues.md`
2. Command file references extension scripts/config
3. Extension executes with full context

### 5. Update

```bash
specify extension update jira
```

**Process:**

1. Check catalog for newer version
2. Download new version
3. Validate compatibility
4. Back up current config
5. Extract new version (preserve config)
6. Re-register commands
7. Update registry

### 6. Removal

```bash
specify extension remove jira
```

**Process:**

1. Confirm with user (show what will be removed)
2. Unregister commands from AI agent
3. Remove from `.specify/extensions/jira/`
4. Update registry
5. Optionally preserve config for reinstall
