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
entryUrl: "https://github.com/FlorianBruniaux/claude-code-ultimate-guide/blob/af05b84fb6e32432dae2114ee2a72c44ef3d29b1/guide/ultimate-guide.md"
sourceRel: "guide/ultimate-guide.md"
rawUrl: "/raw/09-harness/claude-code-ultimate-guide/guide/ultimate-guide.md"
sourceSha256: "4d290b0171bbaaffd149d5d2e4da964392cb212d7357408df40d8f346f952dbc"
pageSha256: "59ed95759e437f7cc1b6b6fff957b757a5dd8b67dc5bfa1098a9bfeb1ce3fd70"
contentMode: "local-full"
zh: ""
---

#### Using both together

The two approaches handle different moments in a session's lifecycle. Approach A renames early so the session is identifiable while it's still running. Approach B renames at the end with a title that reflects the full session scope, potentially overwriting the mid-session name with something more accurate.

**Limitation (both approaches)**: Terminal tab names in WebStorm and iTerm2 are not affected. JetBrains filters ANSI escape sequences. The Claude session is renamed, not the OS tab.

> See full template: [examples/claude-md/session-naming.md](/lib/09-harness/claude-code-ultimate-guide/examples-claude-md-session-naming)
> See hook template: [examples/hooks/bash/auto-rename-session.sh](https://github.com/FlorianBruniaux/claude-code-ultimate-guide/blob/af05b84fb6e32432dae2114ee2a72c44ef3d29b1/examples/hooks/bash/auto-rename-session.sh)

## 1.4 Permission Modes

Claude Code has five permission modes that control how much autonomy Claude has:

### Default Mode

Claude asks permission before:
- Editing files
- Running commands
- Making commits

This is the safest mode for learning.

### Auto-accept Mode (`acceptEdits`)

```
You: Turn on auto-accept for the rest of this session
```

Claude auto-approves file edits but still asks for shell commands. Use when you trust the edits and want speed.

⚠️ **Warning**: Only use auto-accept for well-defined, reversible operations.

### Plan Mode

```
/plan
```

Claude can only read and analyze, no modifications allowed. Perfect for:
- Understanding unfamiliar code
- Exploring architectural options
- Safe investigation before changes

Exit plan mode by approving the plan Claude presents, or by pressing `Shift+Tab` to leave without approving. There is no `/execute` command.

### Don't Ask Mode (`dontAsk`)

Auto-denies tools unless pre-approved via `/permissions` or `permissions.allow` rules. Claude never interrupts with permission prompts: if a tool isn't explicitly allowed, it's silently denied.

Use for restrictive workflows where you want tight control over which tools run, without interactive confirmation.

### Auto Mode (all plans, v2.1.114+)

Auto mode delegates permission decisions to a dedicated classifier model. Instead of stopping to ask for approval on each action, a second AI instance running Sonnet 5 evaluates every tool call before it executes. Safe actions proceed automatically; risky ones are blocked, and Claude receives the reason so it can try a different approach.

```json
// .claude/settings.json
{ "permissionMode": "auto" }
```

**Two layers of defense**

Auto mode runs two parallel checks on everything Claude touches:

1. **Input probe**: Before any content enters Claude's context (file reads, web fetches, shell output, MCP responses), a server-side probe scans for prompt injection. When it detects suspicious instructions, it adds a warning to Claude's context rather than silently filtering, so Claude knows that content may be trying to manipulate it.
2. **Transcript classifier** (Sonnet 5): Evaluates each tool call against three risk categories before execution. The classifier sees user messages and Claude's pending tool calls only; tool outputs and Claude's own reasoning are stripped to prevent reasoning manipulation.

The three categories the classifier checks:

| Category | What it looks for |
|----------|------------------|
| Scope escalation | Claude doing more than the task asked for |
| Untrusted infrastructure | Action targeting a host, API, or system not recognized from context |
| Prompt injection | Action appearing driven by hostile content Claude read from a file, repo, or web page |

**Performance and limits**

Anthropic's production traffic measurements: 94% of dangerous operations correctly identified, 2% of safe operations falsely flagged, 17% false negative rate (FNR).

An independent stress-test ([arXiv 2604.04978](https://arxiv.org/abs/2604.04978)) targeting scope escalation specifically found 81% FNR end-to-end (CI: 73.8%–87.4%). Even restricting to actions the classifier actually evaluates, the FNR was 70.3%. A key structural gap: in-project file edits are exempt from classification by design, which produced a 92.9% FNR on artifact cleanup tasks when agents fell back to the Edit tool. These are adversarial benchmarks against the authorization boundary, not production averages, but they establish the real ceiling: auto mode is a friction reducer, not a security boundary.

**Escalation and visual feedback**

If the classifier blocks Claude 3 consecutive times, or 20 times total in a session, auto mode falls back to a manual permission prompt to break the loop. During a check, the status spinner turns red, so you can distinguish a classifier stall from a running tool.

**Configuring classifier rules**

The `autoMode` key lets you extend built-in rules using the `"$defaults"` sentinel. Include it to add your rules alongside the defaults; omit it to replace the entire built-in list:

```json
{
  "autoMode": {
    "allow": ["$defaults", "Bash(git log:*)", "Bash(cat:*)"],
    "soft_deny": ["$defaults", "Bash(curl:*)"],
    "environment": ["$defaults", "production-db"]
  }
}
```

**Hard deny rules** (`settings.autoMode.hard_deny`, v2.1.136)

Unconditional block rules that fire before the classifier and cannot be overridden by user intent or allow exceptions:

```json
{
  "autoMode": {
    "hard_deny": [
      { "tool": "Bash", "pattern": "rm -rf" },
      { "tool": "Write", "pathPattern": "/etc/**" },
      { "tool": "Write", "pathPattern": "**/.env" }
    ]
  }
}
```

Unlike classifier rules (which weigh context and user intent), `hard_deny` entries are absolute. Use them for operations that must never run unattended: destructive commands, credential files, system config paths.

**Generating environment entries with `/auto-mode-setup`** (v2.1.228+, v2.1.233+ on native Windows)

Run `/auto-mode-setup` to have Claude Code draft `autoMode.environment` entries, and sometimes `allow`/`soft_deny`/`hard_deny` entries, from the current project and your recent sessions in it. Accepting the draft writes it to `~/.claude/settings.json`. Requires a Pro, Max, or Team plan and feature-flag fetching enabled; not available in Claude Code on the web.

What it reads:

| Always scanned | Optional (asked first) |
|-----------------|------------------------|
| This project's CLAUDE.md, README.md, config files, and git remotes | First word of each shell-history command |
| Your `autoMode` and `permissions.allow` settings | Remote hosts and names of repos under your home directory |
| Hosts, buckets, and command names from commands Claude ran in this project's recent sessions (never your messages) | |

You accept or discard the draft as a whole, then edit `~/.claude/settings.json` afterward to adjust individual entries. On acceptance, Claude Code writes the `environment` list without `"$defaults"` (the draft spells out the unchanged built-ins), adds `"$defaults"` to any `allow`/`soft_deny`/`hard_deny` list it touches so the built-in rules stay in effect, and offers to remove `permissions.allow` rules that auto mode ignores or that auto-approve destructive commands (e.g. `Bash(*)`).

Once auto mode has blocked several actions with no `autoMode.environment` entries configured, Claude Code shows a "Teach auto mode about your environment?" dialog offering to run the wizard. "Don't show again" stops the offer but keeps the command; to turn off both:

```json
{ "skillOverrides": { "auto-mode-setup": "off" } }
```

`/auto-mode-setup` is a built-in command, not a bundled skill, so `disableBundledSkills` doesn't turn it off, only `skillOverrides` does.

Related inspection commands: `claude auto-mode defaults` (built-in rules as JSON), `claude auto-mode config` (effective config with your settings applied), `claude auto-mode critique` (AI review of your custom rules), `claude auto-mode reset` (v2.1.212+, discards your customizations; managed-settings entries still apply).

**When to use auto mode**

| Context | Verdict | Notes |
|---------|---------|-------|
| Isolated container or VM, no production credentials | Go | The intended use case |
| Background Dispatch jobs | Go | No human present to confirm; auto mode is required |
| Local dev machine, personal project, read-only branch | OK | Low stakes; use version control as backstop |
| Staging environment with real data | Caution | Limit credentials to read-only; ensure backups |
| Production, PII, financial data, compliance scope | No | Use default mode or `dontAsk` with an explicit allowlist |

For team use: keep audit logs of auto-approved actions, set a distinct git committer identity for Claude commits so you can trace them, and review Claude's commits before merging.

**Requirements**: All plans (Max subscribers gained access automatically at v2.1.111; all plans at v2.1.114). Team and Enterprise require admin enablement in Claude Code admin settings. Cost and latency are slightly higher than other modes since a second model runs on every tool call.

### Bypass Permissions Mode (`bypassPermissions`)

Auto-approves everything, including shell commands. No permission prompts at all.

⚠️ **Warning**: Only use in sandboxed CI/CD environments. Requires `--dangerously-skip-permissions` to enable from CLI. Never use on production systems or with untrusted code.

**Safety invariant: some paths always prompt, even in `bypassPermissions` mode**:

Certain writes are considered too sensitive to auto-approve under any configuration. Claude Code always prompts before modifying:

| Protected target | Examples |
|-----------------|---------|
| `.git/` directory | git hooks, refs, config inside the repo |
| `.claude/` directory | agents, skills, hooks, settings, except `.claude/worktrees/` |
| Shell config files | `.bashrc`, `.zshrc`, `.bash_profile`, `.profile` |
| VCS and tool configs | `.gitconfig`, `.mcp.json`, `.claude.json` |

Content-specific `allow` rules (e.g., `Bash(npm publish:*)`) defined in `settings.json` or CLAUDE.md also survive `bypassPermissions`: they continue to apply as additional filters on top of any permission mode. This lets you build precise guardrails (e.g., "always ask before publishing to npm") that hold regardless of how the session is launched.

### Permission Fatigue (anti-pattern)

A common trap: you're deep in a task, prompts keep appearing, you start approving them without reading. This is **permission fatigue**, and it defeats the purpose of the permission system entirely.

The fix is to pick the right mode upfront rather than clicking through prompts one by one:

| Situation | Right mode | Why |
|-----------|-----------|-----|
| Exploratory work, unfamiliar codebase | Plan mode | Can't accidentally change anything |
| Trusted local edits, no shell ops | `acceptEdits` | Approves edits silently, still gates commands |
| Long agentic tasks, Max plan | Auto mode | Claude judges actions; fewer interruptions with less risk than bypass |
| Automated pipeline, sandboxed env | `bypassPermissions` | No prompts at all, but only safe in isolation |
| You need one tool auto-approved | `permissions.allow` in CLAUDE.md | Granular, not all-or-nothing |
| Default new session | Default mode | Explicit review of each action |

The failure mode to avoid: reaching for `--dangerously-skip-permissions` on a dev machine with SSH keys, API tokens, or production access in scope. The permissions system only adds value if you actually read what you're approving, or configure a mode that matches your real trust level.

## 1.5 Productivity Checklist

You're ready for Day 2 when you can:

- [ ] Launch Claude Code in your project
- [ ] Describe a task and review the proposed changes
- [ ] Accept or reject changes after reading the diff
- [ ] Run a shell command with `!`
- [ ] Reference a file with `@`
- [ ] Use `/clear` to start fresh
- [ ] Use `/status` to check context usage
- [ ] Exit cleanly with `/exit` or `Ctrl+D`

## 1.6 Migrating from Other AI Coding Tools

> **Last updated**: March 2026. AI coding tools evolve rapidly; verify pricing and features on official sites.

Switching from GitHub Copilot, Cursor, or other AI assistants? Here's what you need to know.

### Why Claude Code is Different

| Feature | GitHub Copilot | Cursor | Windsurf | Zed | Claude Code |
|---------|---------------|--------|----------|-----|-------------|
| **Interaction** | Agent + Chat + Autocomplete | Agent + Chat + Autocomplete | Cascade agent | Agent panel + Zeta2 | CLI + conversation |
| **Context** | Full codebase (agent mode) | Codebase-aware (Composer) | ~200K tokens (IDE) | Up to 1M tokens | Entire project (agentic) |
| **Autonomy** | Agent mode + coding agent | Agent + Background Agents | Cascade (Cognition AI) | Agent + subagents | Full task execution |
| **Customization** | MCP, custom agents, AGENTS.md | MCP Apps, .cursorrules | Cascade hooks | ACP Registry, MCP | Agents, skills, hooks, MCP |
| **MCP support** | ✅ GA (auto-approve) | ✅ MCP Apps v2.6 | Not documented | ✅ OAuth | ✅ Native |
| **Inline autocomplete** | ✅ Native | ✅ Tab | ✅ Supercomplete | ✅ Zeta2 | ❌ Use alongside |
| **Offline/local** | ❌ | ❌ | ❌ | BYO providers | ❌ |
| **Best for** | IDE-native, GitHub teams | IDE-native AI UX | Multi-agent IDE | Speed + open-source | Terminal/CLI, large refactors |
