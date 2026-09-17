---
title: "Hooks in Kiro"
sourceId: "09-harness/ecc"
sourceTitle: "ECC —— Harness 性能优化系统"
sourceKind: "其他材料"
licenseLabel: "可转载"
lang: "英文"
tier: 3
volume: "09-harness"
sourceUrl: "https://github.com/affaan-m/ECC"
entryUrl: "https://github.com/affaan-m/ECC/blob/928c1dea72f5c330442fc1f595563398b8f389f7/.kiro/hooks/README.md"
sourceRel: ".kiro/hooks/README.md"
rawUrl: "/raw/09-harness/ecc/.kiro/hooks/README.md"
sourceSha256: "290dd7b4006b0453a8ca016f65ae334b71d6e61d08b1b16b606021fb9dcd738b"
pageSha256: "290dd7b4006b0453a8ca016f65ae334b71d6e61d08b1b16b606021fb9dcd738b"
contentMode: "local-full"
zh: ""
---

# Hooks in Kiro

Kiro supports **two types of hooks**:

1. **IDE Hooks** (this directory) - Standalone `.kiro.hook` files that work in the Kiro IDE
2. **CLI Hooks** - Embedded in agent configuration files for CLI usage

## IDE Hooks (Standalone Files)

IDE hooks are `.kiro.hook` files in `.kiro/hooks/` that appear in the Agent Hooks panel in the Kiro IDE.

### Format

```json
{
  "version": "1.0.0",
  "enabled": true,
  "name": "hook-name",
  "description": "What this hook does",
  "when": {
    "type": "fileEdited",
    "patterns": ["*.ts", "*.tsx"]
  },
  "then": {
    "type": "runCommand",
    "command": "npx tsc --noEmit",
    "timeout": 30
  }
}
```

### Required Fields

- `version` - Hook version (e.g., "1.0.0")
- `enabled` - Whether the hook is active (true/false)
- `name` - Hook identifier (kebab-case)
- `description` - Human-readable description
- `when` - Trigger configuration
- `then` - Action to perform

### Available Trigger Types

- `fileEdited` - When a file matching patterns is edited
- `fileCreated` - When a file matching patterns is created
- `fileDeleted` - When a file matching patterns is deleted
- `userTriggered` - Manual trigger from Agent Hooks panel
- `promptSubmit` - When user submits a prompt
- `agentStop` - When agent finishes responding
- `preToolUse` - Before a tool is executed (requires `toolTypes`)
- `postToolUse` - After a tool is executed (requires `toolTypes`)

### Action Types

- `runCommand` - Execute a shell command
  - Optional `timeout` field (in seconds)
- `askAgent` - Send a prompt to the agent

### Environment Variables

When hooks run, these environment variables are available:
- `$KIRO_HOOK_FILE` - Path to the file that triggered the hook (for file events)

## CLI Hooks (Embedded in Agents)

CLI hooks are embedded in agent configuration files (`.kiro/agents/*.json`) for use with `kiro-cli`.

### Format

```json
{
  "name": "my-agent",
  "hooks": {
    "agentSpawn": [
      {
        "command": "git status"
      }
    ],
    "postToolUse": [
      {
        "matcher": "fs_write",
        "command": "npx tsc --noEmit"
      }
    ]
  }
}
```

See `.kiro/agents/tdd-guide-with-hooks.json` for a complete example.

## Documentation

- IDE Hooks: https://kiro.dev/docs/hooks/
- CLI Hooks: https://kiro.dev/docs/cli/hooks/
