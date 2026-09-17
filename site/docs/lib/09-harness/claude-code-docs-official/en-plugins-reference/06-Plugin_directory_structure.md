---
title: "claude-code-docs-official"
sourceId: "09-harness/claude-code-docs-official"
sourceTitle: "claude-code-docs-official"
sourceKind: "官方文档"
licenseLabel: "仅引用"
lang: "英文"
tier: 3
volume: "09-harness"
sourceUrl: "https://code.claude.com/docs"
entryUrl: "https://code.claude.com/docs"
sourceRel: "en/plugins-reference.md"
rawUrl: "/raw/09-harness/claude-code-docs-official/en/plugins-reference.md"
sourceSha256: "c75119ccd8973aad659373d726d412bbe3f5184e6d0ca0d2064512cad255f0a3"
pageSha256: "27e67d49ade85be21ea8b4c5a73de0e5b207ad5998b53c53310911580a7e19e8"
contentMode: "local-full"
zh: ""
---

## Plugin directory structure

### Standard plugin layout

A complete plugin follows this structure:

```text theme={null}
enterprise-plugin/
├── .claude-plugin/           # Metadata directory (optional)
│   └── plugin.json             # plugin manifest
├── skills/                   # Skills
│   ├── code-reviewer/
│   │   └── SKILL.md
│   └── pdf-processor/
│       ├── SKILL.md
│       └── scripts/
├── commands/                 # Skills as flat .md files
│   ├── status.md
│   └── logs.md
├── agents/                   # Subagent definitions
│   ├── security-reviewer.md
│   ├── performance-tester.md
│   └── compliance-checker.md
├── workflows/                # Workflow scripts
│   └── release-audit.js
├── output-styles/            # Output style definitions
│   └── terse.md
├── themes/                   # Color theme definitions
│   └── dracula.json
├── monitors/                 # Background monitor configurations
│   └── monitors.json
├── hooks/                    # Hook configurations
│   ├── hooks.json           # Main hook config
│   └── security-hooks.json  # Additional hooks
├── bin/                      # Plugin executables added to PATH
│   └── my-tool               # Invokable as bare command in Bash tool
├── settings.json            # Default settings for the plugin
├── .mcp.json                # MCP server definitions
├── .lsp.json                # LSP server configurations
├── scripts/                 # Hook and utility scripts
│   ├── security-scan.sh
│   ├── format-code.py
│   └── deploy.js
├── LICENSE                  # License file
└── CHANGELOG.md             # Version history
```

  The `.claude-plugin/` directory contains the `plugin.json` file. All other directories (commands/, agents/, skills/, workflows/, output-styles/, themes/, monitors/, hooks/) must be at the plugin root, not inside `.claude-plugin/`.

A `CLAUDE.md` file at the plugin root is not loaded as project context. Plugins contribute context through skills, agents, and hooks rather than CLAUDE.md. To ship instructions that load into Claude's context, put them in a [skill](#skills).

### File locations reference

| Component         | Default Location             | Purpose                                                                                                                                                                                                                                                                                    |
| :---------------- | :--------------------------- | :----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Manifest**      | `.claude-plugin/plugin.json` | Plugin metadata and configuration (optional)                                                                                                                                                                                                                                               |
| **Skills**        | `skills/`                    | Skills with `<name>/SKILL.md` structure                                                                                                                                                                                                                                                    |
| **Commands**      | `commands/`                  | Skills as flat Markdown files. Use `skills/` for new plugins                                                                                                                                                                                                                               |
| **Agents**        | `agents/`                    | Subagent Markdown files                                                                                                                                                                                                                                                                    |
| **Workflows**     | `workflows/`                 | [Workflow](https://code.claude.com/docs/en/workflows) script files                                                                                                                                                                                                                                                     |
| **Output styles** | `output-styles/`             | Output style definitions                                                                                                                                                                                                                                                                   |
| **Themes**        | `themes/`                    | Color theme definitions                                                                                                                                                                                                                                                                    |
| **Hooks**         | `hooks/hooks.json`           | Hook configuration                                                                                                                                                                                                                                                                         |
| **MCP servers**   | `.mcp.json`                  | MCP server definitions                                                                                                                                                                                                                                                                     |
| **LSP servers**   | `.lsp.json`                  | Language server configurations                                                                                                                                                                                                                                                             |
| **Monitors**      | `monitors/monitors.json`     | Background monitor configurations                                                                                                                                                                                                                                                          |
| **Executables**   | `bin/`                       | Executables added to the Bash tool's `PATH` and invokable as bare commands while the plugin is enabled. You can't include this directory in a plugin you [distribute through claude.ai organization settings](https://code.claude.com/docs/en/plugin-marketplaces#keep-executables-out-of-the-top-level-bin-directory) |
| **Settings**      | `settings.json`              | Default configuration applied when the plugin is enabled. Only the [`agent`](https://code.claude.com/docs/en/sub-agents) and [`subagentStatusLine`](https://code.claude.com/docs/en/statusline#subagent-status-lines) keys are supported                                                                                                           |

***
