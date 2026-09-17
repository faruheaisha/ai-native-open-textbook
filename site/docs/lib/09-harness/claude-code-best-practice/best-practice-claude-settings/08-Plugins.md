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
pageSha256: "68bbe0a60d7aadc2237d794a4bb33eee712f5d82b48cff447b7ba1f57ec9dabc"
contentMode: "local-full"
zh: ""
---

## Plugins

Configure Claude Code plugins and marketplaces.

### Plugin Settings

| Key | Type | Scope | Description |
|-----|------|-------|-------------|
| `enabledPlugins` | object | Any | Enable/disable specific plugins |
| `extraKnownMarketplaces` | object | Project | Add custom plugin marketplaces (team sharing via `.claude/settings.json`) |
| `strictKnownMarketplaces` | boolean | Managed only | When `true`, only the official Anthropic marketplace is permitted; no additional or custom marketplaces may be installed |
| `strictPluginOnlyCustomization` | boolean \| array | Managed only | Block skills, agents, hooks, and MCP servers from user and project sources, so they can only come from plugins or managed settings. `true` locks all four surfaces; an array such as `["skills", "hooks"]` locks only the named ones |
| `pluginSuggestionMarketplaces` | array | Managed only | Allowlist of marketplace names whose plugins may appear as contextual install suggestions during a session. Restricts which marketplaces can surface "you might want this plugin" prompts (v2.1.152) |
| `skippedMarketplaces` | array | Any | Marketplaces user declined to install *(in JSON schema, not on official settings page)* |
| `skippedPlugins` | array | Any | Plugins user declined to install *(in JSON schema, not on official settings page)* |
| `pluginConfigs` | object | Managed / User / --settings | Per-plugin MCP server configs (keyed by `plugin@marketplace`). As of v2.1.207, no longer read from project-level `.claude/settings.json` or `.claude/settings.local.json`; only user, `--settings`, and managed settings are honored |
| `blockedMarketplaces` | array | Managed only | Block specific plugin marketplaces. Each entry can match by source string, `hostPattern`, or `pathPattern` — as of v2.1.119 the `hostPattern` and `pathPattern` matchers are correctly enforced before any download touches the filesystem, so blocked marketplaces never reach disk |
| `pluginTrustMessage` | string | Managed only | Custom message displayed when prompting users to trust plugins |
| `disableSideloadFlags` | boolean | Managed only | Reject the `--plugin-dir`, `--plugin-url`, `--agents`, and `--mcp-config` startup flags. When `true`, users cannot bypass `strictKnownMarketplaces` by passing sideload flags at launch. Use in managed environments to enforce marketplace-only plugin distribution (v2.1.193) |
| `disableCommandPluginSources` | boolean | Managed only | Block marketplace sources of type `command` (dynamic plugin-directory resolution via a local command). When `true`, `command`-typed marketplace source entries are ignored even if present in plugin configs. Use to prevent plugins that use command sources from loading in managed environments (v2.1.229+) |

**Marketplace source types:** `github`, `git`, `directory`, `settings`, `url`, `npm`, `file`, `archive`, `command`. Use `source: 'settings'` to declare a small set of plugins inline without setting up a hosted marketplace repository. Use `source: 'archive'` for zip-based plugin installation with SHA-256 pinning (v2.1.224). Use `source: 'command'` for dynamic plugin-directory resolution — a local command prints the plugin directory path, re-resolved each session; `mode: "link"` uses it in place instead of copying it (v2.1.229). Note: `hostPattern` is a *matcher* field for `blockedMarketplaces`, not a source type.

**Owner wildcard entries (v2.1.223):** `strictKnownMarketplaces` and `blockedMarketplaces` now accept `"owner/*"` wildcard entries to match all repositories from a specific organization or user.

**Example:**
```json
{
  "enabledPlugins": {
    "formatter@acme-tools": true,
    "deployer@acme-tools": true,
    "experimental@acme-tools": false
  },
  "extraKnownMarketplaces": {
    "acme-tools": {
      "source": {
        "source": "github",
        "repo": "acme-corp/claude-plugins"
      }
    },
    "inline-tools": {
      "source": {
        "source": "settings",
        "name": "inline-tools",
        "plugins": [
          {
            "name": "code-formatter",
            "source": { "source": "github", "repo": "acme-corp/code-formatter" }
          }
        ]
      }
    }
  }
}
```
