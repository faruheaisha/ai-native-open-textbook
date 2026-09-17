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
pageSha256: "0f4d4b96ce2224bbc25c08a9ffb6d847bb6ac879c1cb524deed79a2b883a0d1f"
contentMode: "local-full"
zh: ""
---

## Settings Hierarchy

Settings apply in order of precedence (highest to lowest):

| Priority | Location | Scope | Shared? | Purpose |
|----------|----------|-------|---------|---------|
| 1 | Managed settings | Organization | Yes (deployed by IT) | Security policies that cannot be overridden |
| 2 | Command line arguments | Session | N/A | Temporary single-session overrides |
| 3 | `.claude/settings.local.json` | Project | No (git-ignored) | Personal project-specific |
| 4 | `.claude/settings.json` | Project | Yes (committed) | Team-shared settings |
| 5 | `~/.claude/settings.json` | User | N/A | Global personal defaults |

**Managed settings** are organization-enforced and cannot be overridden by any other level, including command line arguments. Delivery methods:
- **Server-managed** settings (remote delivery)
- **MDM profiles** — macOS plist at `com.anthropic.claudecode`
- **Registry policies** — Windows `HKLM\SOFTWARE\Policies\ClaudeCode` (admin) and `HKCU\SOFTWARE\Policies\ClaudeCode` (user-level, lowest policy priority)
- **File** — `managed-settings.json` and `managed-mcp.json` (macOS: `/Library/Application Support/ClaudeCode/`, Linux/WSL: `/etc/claude-code/`, Windows: `C:\Program Files\ClaudeCode\`)
- **Drop-in directory** — `managed-settings.d/` alongside `managed-settings.json` for independent policy fragments (v2.1.83). Following the systemd convention, `managed-settings.json` is merged first as the base, then all `*.json` files in the drop-in directory are sorted alphabetically and merged on top. Later files override earlier ones for scalar values; arrays are concatenated and de-duplicated; objects are deep-merged. Hidden files starting with `.` are ignored. Use numeric prefixes to control merge order (e.g., `10-telemetry.json`, `20-security.json`)

Within the managed tier, precedence is: server-managed > MDM/OS-level policies > file-based (`managed-settings.d/*.json` + `managed-settings.json`) > HKCU registry (Windows only). Only one managed source wins for most keys; sources do not merge across tiers. Within the file-based tier, drop-in files and the base file are merged together.

**Exception — admin-source union keys:** The following keys are honored when *any* admin-controlled managed source sets them, not just the winning source: `sandbox.network.allowManagedDomainsOnly`, `sandbox.network.allowedDomains` (when `allowManagedDomainsOnly` is set), `sandbox.filesystem.allowManagedReadPathsOnly`, `sandbox.filesystem.allowRead` (when `allowManagedReadPathsOnly` is set), `allowAllClaudeAiMcps`, `sandbox.bwrapPath`, `sandbox.socatPath`, `forceRemoteSettingsRefresh`, and `env` (which merges **per key** across all admin sources rather than taking the highest-precedence source's entire object).

> **Note:** As of v2.1.75, the deprecated Windows fallback path `C:\ProgramData\ClaudeCode\managed-settings.json` has been removed. Use `C:\Program Files\ClaudeCode\managed-settings.json` instead.

> **Note (v2.1.126):** `/config` now persists changes to `~/.claude/settings.json` instead of holding them in memory only. Edits made through the interactive Config UI survive restarts.

**Managed-only policy keys:**

| Key | Type | Default | Description |
|-----|------|---------|-------------|
| `parentSettingsBehavior` | string | `"first-wins"` | Controls whether managed settings supplied programmatically by an embedding host process (SDK parent) apply when an admin-deployed managed tier is also present. `"first-wins"`: parent-supplied settings are dropped and only the admin tier applies. `"merge"`: parent-supplied settings apply under the admin tier and are filtered so they can **tighten** policy but not loosen it. Requires v2.1.133+ |
| `policyHelper` | object | - | Admin-deployed executable that computes managed settings dynamically at startup. Object shape: `\{path: string, timeoutMs?: number, refreshIntervalMs?: number\}` — `path` points at the helper binary; `timeoutMs` caps the wait (omit or `0` for no timeout); `refreshIntervalMs` controls re-runs at session start (omit for startup-only, `0` disables, otherwise must be ≥ `60000`). Only honored from MDM or a system `managed-settings.json` file (never from user/project settings). **When configured, `policyHelper` output is the sole active managed source — other managed-tier sources (server-managed, MDM, file) are ignored for that run.** Requires v2.1.136+ |
| `requiredMinimumVersion` | string | - | **(Managed only)** Prevents Claude Code from starting if the installed version is below this floor. CLI exits with an error prompting the user to upgrade. Complements `minimumVersion` (which controls auto-update floor) — this one enforces at startup. Example: `"2.1.163"` |
| `requiredMaximumVersion` | string | - | **(Managed only)** Prevents Claude Code from starting if the installed version exceeds this ceiling. CLI exits with an error if the version is too new. Use alongside `requiredMinimumVersion` to pin a specific version range in managed environments. Example: `"2.1.165"` |
| `browserExternalPageTools` | string | - | **(Managed only)** Set to `"disabled"` to prevent Claude from using tools to read or act on external pages in the desktop app's Browser pane. Users can still navigate to external sites themselves, and local dev server previews are unaffected |
| `disableBrowserExternalNavigation` | boolean | - | **(Managed only)** Set to `true` (JSON boolean only — string `"true"` is silently ignored) to prevent Claude from navigating the desktop app's Browser pane to external URLs. Only JSON boolean `true` is honored |
| `disableMobileSimulatorTools` | boolean | - | **(Managed only)** Set to `true` (JSON boolean only — a malformed value logs a warning) to remove mobile simulator tools from Claude. Only JSON boolean `true` is honored |

**Important**:
- `deny` rules have highest safety precedence and cannot be overridden by lower-priority allow/ask rules.
- Managed settings may lock or override local behavior even if local files specify different values.
- Array settings (e.g., `permissions.allow`) are **concatenated and deduplicated** across scopes — entries from all levels are combined, not replaced. **Exceptions:** `fallbackModel`, `availableModels`, `modelPicker`, and `modelSettings` do **not** merge — the highest-precedence settings file that defines them supplies the entire value. For `availableModels`, a managed-source value applies as-is and lower scopes cannot extend it.
