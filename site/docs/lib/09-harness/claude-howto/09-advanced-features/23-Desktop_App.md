---
title: "Claude How-To"
sourceId: "09-harness/claude-howto"
sourceTitle: "Claude How-To"
sourceKind: "工程手册"
licenseLabel: "可转载"
lang: "英文"
tier: 2
volume: "09-harness"
sourceUrl: "https://github.com/luongnv89/claude-howto"
entryUrl: "https://github.com/luongnv89/claude-howto/blob/97bfb0685e03112ad39845889061d02cef6e534c/09-advanced-features/README.md"
sourceRel: "09-advanced-features/README.md"
rawUrl: "/raw/09-harness/claude-howto/09-advanced-features/README.md"
sourceSha256: "988281137b2d4521b357f46ae4fdd619ac2b8be6a7500cb14375141641efbc65"
pageSha256: "6241858815f1903a5a76211b34dec4bb942d47cf4041221983311b55e3d2feb1"
contentMode: "local-full"
zh: ""
---

## Desktop App

The Claude Code Desktop App provides a standalone application with visual diff review, parallel sessions, and integrated connectors. Available for macOS and Windows (Pro, Max, Team, and Enterprise plans).

### Installation

Download from [claude.ai](https://claude.ai) for your platform:
- **macOS**: Universal build (Apple Silicon and Intel)
- **Windows**: x64 and ARM64 installers available

See the [Desktop Quickstart](https://code.claude.com/docs/en/desktop-quickstart) for setup instructions.

### Handing off from CLI

Transfer your current CLI session to the Desktop App:

```
/desktop
```

### Core features

| Feature | Description |
|---------|-------------|
| **Diff view** | File-by-file visual review with inline comments; Claude reads comments and revises |
| **App preview** | Auto-starts dev servers with an embedded browser for live verification |
| **PR monitoring** | GitHub CLI integration with auto-fix CI failures and auto-merge when checks pass |
| **Parallel sessions** | Multiple sessions in the sidebar with automatic Git worktree isolation |
| **Scheduled tasks** | Recurring tasks (hourly, daily, weekdays, weekly) that run while the app is open |
| **Rich rendering** | Code, markdown, and diagram rendering with syntax highlighting; GitHub-Flavored-Markdown task-list checkboxes (`- [ ]` / `- [x]`) render as checkboxes (v2.1.149+) |

### App preview configuration

Configure dev server behavior in `.claude/launch.json`:

```json
{
  "command": "npm run dev",
  "port": 3000,
  "readyPattern": "ready on",
  "persistCookies": true
}
```

### Connectors

Connect external services for richer context:

| Connector | Capability |
|-----------|------------|
| **GitHub** | PR monitoring, issue tracking, code review |
| **Slack** | Notifications, channel context |
| **Linear** | Issue tracking, sprint management |
| **Notion** | Documentation, knowledge base access |
| **Asana** | Task management, project tracking |
| **Calendar** | Schedule awareness, meeting context |

> **Note**: Connectors are not available for remote (cloud) sessions.

### Remote and SSH sessions

- **Remote sessions**: Run on Anthropic cloud infrastructure; continue even when the app is closed. Accessible from claude.ai/code or the Claude mobile app
- **SSH sessions**: Connect to remote machines over SSH with full access to the remote filesystem and tools. Claude Code must be installed on the remote machine

### Permission modes in Desktop

The Desktop App supports the same permission modes as the CLI:

| Mode | Behavior |
|------|----------|
| **Ask permissions** (default) | Review and approve every edit and command |
| **Auto accept edits** | File edits auto-approved; commands require manual approval |
| **Plan mode** | Review approach before any changes are made |
| **Bypass permissions** | Automatic execution (sandbox-only, admin-controlled) |

### Enterprise features

- **Admin console**: Control Code tab access and permission settings for the organization
- **MDM deployment**: Deploy via MDM on macOS or MSIX on Windows
- **SSO integration**: Require single sign-on for organization members
- **Managed settings**: Centrally manage team configuration and model availability
