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
pageSha256: "2909d4e796c281bb3898f573e25a295fdd3d7c563cd43dda8c577f77561bd80a"
contentMode: "local-full"
zh: ""
---

## Useful Commands

| Command | Description |
|---------|-------------|
| `/model` | Switch models and adjust effort level (Opus 4.7 and 4.8) |
| `/effort` | Set effort level directly: `low`, `medium`, `high`, `xhigh` (Fable 5, Opus 5, Sonnet 5, Opus 4.7, 4.8), `max` (session-only; available on all effort-supporting models), or `ultracode` (session-only; enables ultracode workflow, v2.1.203+) (v2.1.76+) |
| `/config` | Interactive configuration UI; also accepts `key=value` syntax for prompt-based settings: `/config model=sonnet` (v2.1.181) |
| `/autocompact` | Set the auto-compact window size in tokens. Writes `autoCompactWindow` to user settings. Use `--autocompact <tokens>` CLI flag for the same effect per-session (v2.1.221+) |
| `/memory` | View/edit all memory files |
| `/agents` | Manage subagents |
| `/mcp` | Manage MCP servers |
| `/hooks` | View configured hooks |
| `/plugin` | Manage plugins |
| `claude plugin tag` | Tag a plugin version in a marketplace for distribution. Run from the marketplace repo with the plugin name and version (v2.1.118) |
| `claude plugin prune` | Remove plugins whose marketplace source is no longer present (e.g., marketplace deleted or `extraKnownMarketplaces` entry removed). Cleans up local cache and disables orphaned plugins (v2.1.121) |
| `claude plugin details <plugin>` | Show the plugin's component inventory (commands, agents, skills, hooks) and the per-session context-token cost it adds. Useful for auditing token spend before enabling a plugin in a managed environment (v2.1.139) |
| `/keybindings` | Configure custom keyboard shortcuts |
| `/skills` | View and manage skills |
| `/permissions` | View and manage permission rules |
| `/usage-credits` | View remaining usage credits and limits. Renamed from `/extra-usage` in v2.1.144 (the old name still works) |
| `claude gateway` | Manage Claude Gateway connections for organization-managed deployments. Requires `forceLoginMethod: "gateway"` in managed settings (v2.1.195) |
| `claude auto-mode reset` | Reset auto-mode classification for the current session. Prompts for confirmation; pass `--yes` to skip the prompt (v2.1.212) |
| `/fork` | Fork the current session context into a new isolated subagent session (v2.1.212) |
| `/subtask` | Launch an isolated subtask in a separate context. The subtask runs independently and results are returned when it completes (v2.1.212) |
| `--doctor` | Diagnose configuration issues |
| `--debug` | Debug mode with hook execution details |
