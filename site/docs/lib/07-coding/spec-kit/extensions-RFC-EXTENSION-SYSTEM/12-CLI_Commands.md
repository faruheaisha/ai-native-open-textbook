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
pageSha256: "e4355c48e3f8445f9eb438f090de46f7225d3c5f3326cbc8ca0f86397c9052c9"
contentMode: "local-full"
zh: ""
---

## CLI Commands

### `specify extension` Subcommands

#### `specify extension list`

List installed extensions in current project.

```bash
$ specify extension list

Installed Extensions:
  ✓ Jira Integration (v1.0.0)
     jira
     Create Jira issues from spec-kit artifacts
     Commands: 3 | Hooks: 2 | Priority: 10 | Status: Enabled

  ✓ Linear Integration (v0.9.0)
     linear
     Create Linear issues from spec-kit artifacts
     Commands: 1 | Hooks: 1 | Priority: 10 | Status: Enabled
```

**Options:**

- `--available`: Show available (not installed) extensions from catalog
- `--all`: Show both installed and available

#### `specify extension search [QUERY]`

Search extension catalog.

```bash
$ specify extension search jira

Found 1 extension:

┌─────────────────────────────────────────────────────────┐
│ jira (v1.0.0) ✓ Verified                                │
│ Jira Integration                                        │
│                                                         │
│ Create Jira Epics, Stories, and Issues from spec-kit   │
│ artifacts                                               │
│                                                         │
│ Author: Stats Perform                                   │
│ Tags: issue-tracking, jira, atlassian                   │
│ Downloads: 1,250                                        │
│                                                         │
│ Repository: github.com/statsperform/spec-kit-jira       │
│ Documentation: github.com/.../docs                      │
└─────────────────────────────────────────────────────────┘

Install: specify extension add jira
```

**Options:**

- `--tag TAG`: Filter by tag
- `--author AUTHOR`: Filter by author
- `--verified`: Show only verified extensions

#### `specify extension info NAME`

Show detailed information about an extension.

```bash
$ specify extension info jira

Jira Integration (jira) v1.0.0

Description:
  Create Jira Epics, Stories, and Issues from spec-kit artifacts

Author: Stats Perform
License: MIT
Repository: https://github.com/statsperform/spec-kit-jira
Documentation: https://github.com/statsperform/spec-kit-jira/blob/main/docs/

Requirements:
  • Spec Kit: >=0.1.0,<2.0.0
  • Tools: jira-mcp-server (>=1.0.0)

Provides:
  Commands:
    • speckit.jira.specstoissues - Create Jira hierarchy from spec and tasks
    • speckit.jira.discover-fields - Discover Jira custom fields
    • speckit.jira.sync-status - Sync task completion status

  Hooks:
    • after_tasks - Prompt to create Jira issues
    • after_implement - Prompt to sync status

Tags: issue-tracking, jira, atlassian, project-management

Downloads: 1,250 | Stars: 45 | Verified: ✓

Install: specify extension add jira
```

#### `specify extension add NAME`

Install an extension.

```bash
$ specify extension add jira

Installing extension: Jira Integration

✓ Downloaded spec-kit-jira-1.0.0.zip (245 KB)
✓ Validated manifest
✓ Checked compatibility (spec-kit 0.1.0 ≥ 0.1.0)
✓ Extracted to .specify/extensions/jira/
✓ Registered 3 commands with claude
✓ Installed config template (jira-config.yml)

⚠  Configuration required:
   Edit .specify/extensions/jira/jira-config.yml to set your Jira project key

Extension installed successfully!

Next steps:
  1. Configure: vim .specify/extensions/jira/jira-config.yml
  2. Discover fields: /speckit.jira.discover-fields
  3. Use commands: /speckit.jira.specstoissues
```

**Options:**

- `--from URL`: Install from a remote URL (archive). Does not accept Git repositories directly.
- `--dev`: Install from a local path in development mode (the PATH is the positional `extension` argument).
- `--priority NUMBER`: Set resolution priority (lower = higher precedence, default 10)

#### `specify extension remove NAME`

Uninstall an extension.

```bash
$ specify extension remove jira

⚠  This will remove:
   • 3 commands from AI agent
   • Extension directory: .specify/extensions/jira/
   • Config file: jira-config.yml (will be backed up)

Continue? (yes/no): yes

✓ Unregistered commands
✓ Backed up config to .specify/extensions/.backup/jira-config.yml
✓ Removed extension directory
✓ Updated registry

Extension removed successfully.

To reinstall: specify extension add jira
```

**Options:**

- `--keep-config`: Don't remove config file
- `--force`: Skip confirmation

#### `specify extension update [NAME]`

Update extension(s) to latest version.

```bash
$ specify extension update jira

Checking for updates...

jira: 1.0.0 → 1.1.0 available

Changes in v1.1.0:
  • Added support for custom workflows
  • Fixed issue with parallel tasks
  • Improved error messages

Update? (yes/no): yes

✓ Downloaded spec-kit-jira-1.1.0.zip
✓ Validated manifest
✓ Backed up current version
✓ Extracted new version
✓ Preserved config file
✓ Re-registered commands

Extension updated successfully!

Changelog: https://github.com/statsperform/spec-kit-jira/blob/main/CHANGELOG.md#v110
```

**Options:**

- `--all`: Update all extensions
- `--check`: Check for updates without installing
- `--force`: Force update even if already latest

#### `specify extension enable/disable NAME`

Enable or disable an extension without removing it.

```bash
$ specify extension disable jira

✓ Disabled extension: jira
  • Commands unregistered (but files preserved)
  • Hooks will not execute

To re-enable: specify extension enable jira
```

#### `specify extension set-priority NAME PRIORITY`

Change the resolution priority of an installed extension.

```bash
$ specify extension set-priority jira 5

✓ Extension 'Jira Integration' priority changed: 10 → 5

Lower priority = higher precedence in template resolution
```

**Priority Values:**

- Lower numbers = higher precedence (checked first in resolution)
- Default priority is 10
- Must be a positive integer (1 or higher)

**Use Cases:**

- Ensure a critical extension's templates take precedence
- Override default resolution order when multiple extensions provide similar templates
