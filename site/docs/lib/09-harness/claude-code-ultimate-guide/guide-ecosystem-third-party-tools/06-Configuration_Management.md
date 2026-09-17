---
title: "Claude Code Ultimate Guide"
sourceId: "09-harness/claude-code-ultimate-guide"
sourceTitle: "Claude Code Ultimate Guide"
sourceKind: "工程手册"
licenseLabel: "可转载"
lang: "英文"
tier: 3
volume: "09-harness"
sourceUrl: "https://github.com/FlorianBruniaux/claude-code-ultimate-guide"
entryUrl: "https://github.com/FlorianBruniaux/claude-code-ultimate-guide/blob/af05b84fb6e32432dae2114ee2a72c44ef3d29b1/guide/ecosystem/third-party-tools.md"
sourceRel: "guide/ecosystem/third-party-tools.md"
rawUrl: "/raw/09-harness/claude-code-ultimate-guide/guide/ecosystem/third-party-tools.md"
sourceSha256: "b3e2f559e8457efd6710fab561c9ec7cd746c62b9885fa5535509f700f4a2677"
pageSha256: "ae2041f2629212220a58eb0a200b59120175dd2bb0d2169c8300f785eec5f9ea"
contentMode: "local-full"
zh: ""
---

## Configuration Management

### claude-code-config

A TUI for managing `~/.claude.json` configuration, focused on MCP server management.

| Attribute | Details |
|-----------|---------|
| **Source** | [GitHub: joeyism/claude-code-config](https://github.com/joeyism/claude-code-config) |
| **Install** | `pip install claude-code-config` |
| **Language** | Python (Textual TUI) |

**Key features**:

- Visual MCP server management (add, edit, remove)
- Configuration file editing with validation
- TUI navigation for `~/.claude.json` structure

**Limitations**: Limited to `~/.claude.json` scope. Does not manage `.claude/settings.json`, hooks, or slash commands.

---

### AIBlueprint

A CLI that scaffolds pre-configured Claude Code setups with hooks, commands, statusline, and workflow automation.

| Attribute | Details |
|-----------|---------|
| **Source** | [GitHub: Melvynx/aiblueprint](https://github.com/Melvynx/aiblueprint) |
| **Install** | `npx aiblueprint-cli` |
| **Language** | TypeScript |

**Key features**:

- Pre-built security hooks
- Custom command templates
- Statusline configuration
- Workflow automation presets

**Limitations**: Opinionated configuration choices. Some features require a premium tier. Does not read existing config (scaffolds from scratch).

> **Cross-ref**: For manual Claude Code configuration, see [ultimate-guide.md Section 4](/lib/09-harness/claude-code-ultimate-guide/guide-ultimate-guide/index) (CLAUDE.md, settings, hooks, commands).

---

### Claude Code Organizer

A web dashboard and MCP server for organizing Claude Code configs across the full scope hierarchy (Global > Workspace > Project).

| Attribute | Details |
|-----------|---------|
| **Source** | [GitHub: mcpware/claude-code-organizer](https://github.com/mcpware/claude-code-organizer) |
| **Install** | `npx @mcpware/claude-code-organizer` |
| **Language** | JavaScript (vanilla, zero dependencies) |
| **License** | MIT |

**Key features**:

- Scans 11 categories in `~/.claude/`: memories, skills, MCP servers, commands, agents, rules, configs, hooks, plugins, plans, sessions
- Visual scope inheritance tree showing what Claude loads per directory
- Drag-and-drop items between scopes with undo on every action
- Bulk operations (select multiple, move or delete at once)
- Real-time search and filter across all scopes
- MCP server mode (`--mcp`) so Claude can manage its own config programmatically

**Limitations**: No inline editing of config content yet. No Windows support. Dashboard is read-write for memories/skills/MCP but locked for hooks/plugins/configs.
