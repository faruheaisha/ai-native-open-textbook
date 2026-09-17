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
entryUrl: "https://github.com/luongnv89/claude-howto/blob/97bfb0685e03112ad39845889061d02cef6e534c/10-cli/README.md"
sourceRel: "10-cli/README.md"
rawUrl: "/raw/09-harness/claude-howto/10-cli/README.md"
sourceSha256: "d828c0d6684b52e2c08a4547b5e6e526f7b27045e72b6e3e8b73824e05e7f8e5"
pageSha256: "07aa4d4929ee7abef6666601b6eda17f78369987d84872bc6433f9730d261d3f"
contentMode: "local-full"
zh: ""
---

## Workspace & Directory

| Flag | Description | Example |
|------|-------------|---------|
| `--add-dir` | Add additional working directories | `claude --add-dir ../apps ../lib` |
| `--setting-sources` | Comma-separated setting sources | `claude --setting-sources user,project` |

> **`/config` persistence (v2.1.119)**: Changes made interactively via the `/config` command are now written to `~/.claude/settings.json` and participate in the normal precedence chain (policy → local → project → user). Before v2.1.119, some `/config` changes were session-only. See [Memory & Settings](/lib/09-harness/claude-howto/02-memory) for the full precedence order.
| `--settings` | Load settings from file or JSON. File must be no larger than 2 MiB (v2.1.214) | `claude --settings ./settings.json` |
| `--plugin-dir` | Load plugins from directory (repeatable) | `claude --plugin-dir ./my-plugin` |

### Multi-Directory Example

```bash
# Work across multiple project directories
claude --add-dir ../frontend ../backend ../shared "find all API endpoints"

# Load custom settings
claude --settings '{"model":"opus","verbose":true}' "complex task"
```
