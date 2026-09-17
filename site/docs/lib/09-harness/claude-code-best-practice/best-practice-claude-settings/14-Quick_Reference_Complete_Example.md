---
title: "Claude Code Best Practice"
sourceId: "09-harness/claude-code-best-practice"
sourceTitle: "Claude Code Best Practice"
sourceKind: "工程手册"
licenseLabel: "可转载"
lang: "英文"
tier: 1
volume: "09-harness"
sourceUrl: "https://github.com/shanraisshan/claude-code-best-practice"
entryUrl: "https://github.com/shanraisshan/claude-code-best-practice/blob/2d6ea151c0d7189c3eaf364809c5574bd210e545/best-practice/claude-settings.md"
sourceRel: "best-practice/claude-settings.md"
rawUrl: "/raw/09-harness/claude-code-best-practice/best-practice/claude-settings.md"
sourceSha256: "75075e7b44bd6afd58459b40b4d627c415bb3b04514783ad87ee15a97b2e8077"
pageSha256: "f885353af1a3e7953e95aace207d24bd4f8498e7e1b2491685f8583961e45677"
contentMode: "local-full"
zh: ""
---

## Quick Reference: Complete Example

```json
{
  "$schema": "https://json.schemastore.org/claude-code-settings.json",
  "model": "sonnet",
  "advisorModel": "opus",
  "agent": "code-reviewer",
  "language": "english",
  "cleanupPeriodDays": 30,
  "autoUpdatesChannel": "stable",
  "alwaysThinkingEnabled": true,
  "showThinkingSummaries": true,
  "viewMode": "default",
  "tui": "fullscreen",
  "awaySummaryEnabled": false,
  "includeGitInstructions": true,
  "defaultShell": "bash",
  "plansDirectory": "./plans",
  "claudeMdExcludes": ["**/vendor/**/CLAUDE.md"],
  "effortLevel": "high",
  "autoCompactWindow": 800000,
  "skillListingMaxDescChars": 1536,
  "skillListingBudgetFraction": 0.01,
  "disableAgentView": false,
  "disableWorkflows": false,
  "workflowKeywordTriggerEnabled": true,
  "workflowSizeGuideline": "medium",
  "syntaxHighlightingDisabled": false,
  "emojiCompletionEnabled": true,

  "worktree": {
    "symlinkDirectories": ["node_modules"],
    "sparsePaths": ["packages/my-app", "shared/utils"],
    "baseRef": "fresh",
    "bgIsolation": "worktree"
  },

  "skillOverrides": {
    "legacy-context": "name-only",
    "deploy": "off"
  },

  "modelOverrides": {
    "claude-opus-4-6": "arn:aws:bedrock:us-east-1:123456789:inference-profile/anthropic.claude-opus-4-6-v1:0"
  },

  "autoMode": {
    "classifyAllShell": false,
    "environment": [
      "Source control: github.example.com/acme-corp and all repos under it",
      "Trusted internal domains: *.internal.example.com"
    ],
    "soft_deny": ["$defaults", "Never run terraform apply"],
    "hard_deny": ["Never run rm -rf on directories outside the project"]
  },

  "permissions": {
    "allow": [
      "Edit(*)",
      "Bash(npm run *)",
      "Bash(git *)",
      "WebFetch(domain:*)",
      "mcp__memory__*",
      "Agent(*)"
    ],
    "deny": [
      "Read(.env)",
      "Read(./secrets/**)"
    ],
    "additionalDirectories": ["../shared/"],
    "defaultMode": "acceptEdits"
  },

  "enableAllProjectMcpServers": true,

  "mcpServers": {
    "always-on-server": {
      "type": "http",
      "url": "https://mcp.example.com",
      "alwaysLoad": true
    }
  },

  "sshConfigs": [
    {
      "id": "dev-vm",
      "name": "Dev VM",
      "sshHost": "user@dev.example.com"
    }
  ],

  "sandbox": {
    "enabled": true,
    "excludedCommands": ["git", "docker"],
    "filesystem": {
      "denyRead": ["./secrets/"],
      "denyWrite": ["./.env"]
    }
  },

  "attribution": {
    "commit": "Generated with Claude Code",
    "pr": ""
  },
  "prUrlTemplate": "https://gitlab.example.com/{owner}/{repo}/-/merge_requests/{number}",

  "statusLine": {
    "type": "command",
    "command": "git branch --show-current"
  },

  "spinnerTipsEnabled": true,
  "spinnerTipsOverride": {
    "tips": ["Custom tip 1", "Custom tip 2"],
    "excludeDefault": false
  },
  "prefersReducedMotion": false,
  "preferredNotifChannel": "terminal_bell",

  "env": {
    "NODE_ENV": "development",
    "CLAUDE_CODE_EFFORT_LEVEL": "medium",
    "ANTHROPIC_BEDROCK_SERVICE_TIER": "priority"
  }
}
```
