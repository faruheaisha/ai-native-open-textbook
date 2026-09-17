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
pageSha256: "6d94e4ba3e7fa5e312239e8a352441403fda851be1ea3beb695b47c5b183bdae"
contentMode: "local-full"
zh: ""
---

## Architecture Overview

### Directory Structure

```text
project/
├── .specify/
│   ├── scripts/                 # Core scripts (unchanged)
│   ├── templates/               # Core templates (unchanged)
│   ├── memory/                  # Session memory
│   ├── extensions/              # Extensions directory (NEW)
│   │   ├── .registry            # Installed extensions metadata (NEW)
│   │   ├── jira/                # Jira extension
│   │   │   ├── extension.yml    # Manifest
│   │   │   ├── jira-config.yml  # Extension config
│   │   │   ├── commands/        # Command files
│   │   │   ├── scripts/         # Helper scripts
│   │   │   └── docs/            # Documentation
│   │   └── linear/              # Linear extension (example)
│   └── extensions.yml           # Project extension configuration (NEW)
└── .gitignore                   # Ignore local extension configs
```

### Component Diagram

```text
┌─────────────────────────────────────────────────────────┐
│                    Spec Kit Core                        │
│  ┌──────────────────────────────────────────────────┐   │
│  │  CLI (specify)                                   │   │
│  │  - init, check                                   │   │
│  │  - extension add/remove/list/update  ← NEW       │   │
│  └──────────────────────────────────────────────────┘   │
│  ┌──────────────────────────────────────────────────┐   │
│  │  Extension Manager  ← NEW                        │   │
│  │  - Discovery, Installation, Validation           │   │
│  │  - Command Registration, Hook Execution          │   │
│  └──────────────────────────────────────────────────┘   │
│  ┌──────────────────────────────────────────────────┐   │
│  │  Core Commands                                   │   │
│  │  - /speckit.specify                              │   │
│  │  - /speckit.tasks                                │   │
│  │  - /speckit.implement                            │   │
│  └─────────┬────────────────────────────────────────┘   │
└────────────┼────────────────────────────────────────────┘
             │ Hook Points (after_tasks, after_implement)
             ↓
┌─────────────────────────────────────────────────────────┐
│                    Extensions                           │
│  ┌──────────────────────────────────────────────────┐   │
│  │  Jira Extension                                  │   │
│  │  - /speckit.jira.specstoissues                   │   │
│  │  - /speckit.jira.discover-fields                 │   │
│  └──────────────────────────────────────────────────┘   │
│  ┌──────────────────────────────────────────────────┐   │
│  │  Linear Extension                                │   │
│  │  - /speckit.linear.sync                          │   │
│  └──────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────┘
             │ Calls external tools
             ↓
┌─────────────────────────────────────────────────────────┐
│                    External Tools                       │
│  - Jira MCP Server                                      │
│  - Linear API                                           │
│  - GitHub API                                           │
└─────────────────────────────────────────────────────────┘
```
