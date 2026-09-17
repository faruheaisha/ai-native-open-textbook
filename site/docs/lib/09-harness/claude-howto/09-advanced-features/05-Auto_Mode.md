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
pageSha256: "7616798b22d2b7f591bedea76d615b6037e444ee5dd22452ad97ce999e1aeb7e"
contentMode: "local-full"
zh: ""
---

## Auto Mode

Auto Mode is a permission mode that uses a background safety classifier to review each action before execution. It allows Claude to work autonomously while blocking dangerous operations. It's available on all plans, but requires an eligible model (Claude Opus 5, Opus 4.6+, Sonnet 4.6+, or Fable 5 on the Anthropic API and Claude Platform on AWS; Opus 5, Sonnet 5, Opus 4.7, Opus 4.8, or Fable 5 on Bedrock, Vertex, Foundry, and signed-in Claude apps gateway sessions). On Team and Enterprise it is on by default — administrators can turn it off for the organization in managed settings.

### Requirements

Auto mode is available only when your account meets all of these requirements:

- **Plan**: all plans.
- **Organization**: on Team and Enterprise, auto mode is available by default. Administrators can turn it off for the organization by setting `permissions.disableAutoMode` to `"disable"` in managed settings.
- **Model**: on the Anthropic API and Claude Platform on AWS — Claude Opus 4.6 or later (Opus 5 included), Sonnet 4.6 or later, or Fable 5. On Amazon Bedrock, Google Cloud's Agent Platform (Vertex AI), Microsoft Foundry, and signed-in Claude apps gateway sessions — only Claude Sonnet 5, Opus 4.7 or later (Opus 5 included), and Fable 5. Older models — Sonnet 4.5, Opus 4.5, Haiku, and claude-3 models — are not supported on any provider.
- **Provider**: available by default on the Anthropic API, Claude Platform on AWS, Amazon Bedrock, Google Cloud's Agent Platform (Vertex AI), Microsoft Foundry, and signed-in Claude apps gateway sessions. In v2.1.158 through v2.1.206, auto mode was off on all of these except the Anthropic API and Claude Platform on AWS until you set `CLAUDE_CODE_ENABLE_AUTO_MODE=1`; v2.1.207 removed the requirement. The variable is still accepted for compatibility and has no effect from v2.1.207 onward.
- **Classifier**: runs on Claude Sonnet 4.6 (adds extra token cost)

### Enabling Auto Mode

```bash
# Unlock auto mode with CLI flag (no longer required for Max subscribers on Opus 4.7 — access it directly)
claude --enable-auto-mode

# Then cycle to it with Shift+Tab in the REPL
```

> **v2.1.112 update**: Auto mode no longer requires the `--enable-auto-mode` flag. Max subscribers access it directly on Opus 4.7.

> **v2.1.158 update**: Auto mode became available on Bedrock, Vertex, and Foundry for Opus 4.7/4.8, gated behind `CLAUDE_CODE_ENABLE_AUTO_MODE=1`.
>
> **v2.1.207 update**: That opt-in requirement was removed. Auto mode is now available by default on Bedrock, Vertex AI, Microsoft Foundry, and signed-in Claude apps gateway sessions for Claude Sonnet 5, Opus 4.7, Opus 4.8, and Fable 5 (and Opus 5 from v2.1.219) — no flag or env var needed. Administrators can disable it with `disableAutoMode` in managed settings. `CLAUDE_CODE_ENABLE_AUTO_MODE` is still accepted for compatibility but has no effect from v2.1.207 onward.

Or set it as the default permission mode:

```bash
claude --permission-mode auto
```

Setting via config:
```json
{
  "permissions": {
    "defaultMode": "auto"
  }
}
```

### How the Classifier Works

The background classifier evaluates each action using the following decision order:

1. **Allow/deny rules** -- Explicit permission rules are checked first
2. **Read-only/edits auto-approved** -- File reads and edits pass automatically
3. **Classifier** -- The background classifier reviews the action
4. **Fallback** -- Falls back to prompting after 3 consecutive or 20 total blocks

### Default Blocked Actions

Auto mode blocks the following by default:

| Blocked Action | Example |
|----------------|---------|
| Pipe-to-shell installs | `curl \| bash` |
| Sending sensitive data externally | API keys, credentials over network |
| Production deploys | Deploy commands targeting production |
| Mass deletion | `rm -rf` on large directories |
| IAM changes | Permission and role modifications |
| Force push to main | `git push --force origin main` |

> **More decisions moved to the classifier (v2.1.218)**: The classifier also decides removals targeting the filesystem root or home directory, such as `rm -rf /` and `rm -rf ~`, including when the removal sits inside command or process substitution. Before v2.1.218, the plain forms prompted for approval instead, and the substitution forms prompted in v2.1.208 through v2.1.217. The background-`&` and suspicious-Windows-path checks likewise no longer open permission dialogs — the classifier judges them.

### Default Allowed Actions

| Allowed Action | Example |
|----------------|---------|
| Local file operations | Read, write, edit project files |
| Declared dependency installs | `npm install`, `pip install` from manifest |
| Read-only HTTP | `curl` for fetching documentation |
| Pushing to current branch | `git push origin feature-branch` |

### Configuring Auto Mode

**Print default rules as JSON**:
```bash
claude auto-mode defaults
```

**Restore default auto-mode configuration** (v2.1.212), with a confirmation prompt (`--yes` to skip):
```bash
claude auto-mode reset
claude auto-mode reset --yes
```

**Configure trusted infrastructure** via the `autoMode.environment` managed setting for enterprise deployments. This allows administrators to define trusted CI/CD environments, deployment targets, and infrastructure patterns.

#### Extending defaults with `"$defaults"` (v2.1.118)

Since v2.1.118, `autoMode.allow`, `autoMode.soft_deny`, and `autoMode.environment` accept a `"$defaults"` token that **appends** your rules to the built-in list instead of replacing it. Before v2.1.118, any user-defined array silently clobbered the built-ins.

#### Unconditional blocks with `autoMode.hard_deny` (v2.1.136)

`autoMode.hard_deny` (v2.1.136+) is an array of classifier rules that block a class of actions **regardless of inferred user intent**. Use this for actions that must never run in auto mode — for example, `rm -rf` on root paths or `git push --force` on protected branches. Unlike `soft_deny`, hard-deny rules are not negotiable by the classifier.

```json
{
  "autoMode": {
    "hard_deny": ["Bash(rm -rf /:*)", "Bash(git push --force*)"]
  }
}
```

**Before (replaces built-ins — pre-v2.1.118 behavior):**

```json
{
  "autoMode": {
    "allow": ["Bash(gh pr list:*)"]
  }
}
```

**After (extends built-ins — v2.1.118+):**

```json
{
  "autoMode": {
    "allow": ["$defaults", "Bash(gh pr list:*)"],
    "soft_deny": ["$defaults", "Bash(kubectl delete:*)"],
    "environment": ["$defaults", "trusted-ci.internal"]
  }
}
```

Use `"$defaults"` to keep the shipped baseline rules while layering organization- or project-specific additions on top.

#### Classifying every shell command with `autoMode.classifyAllShell` (v2.1.193)

`autoMode.classifyAllShell` (boolean, v2.1.193+) routes **all** Bash/PowerShell commands through the auto-mode classifier. Enable it when you want the classifier to inspect every shell command in the session.

```json
{
  "autoMode": {
    "classifyAllShell": true
  }
}
```

The same release surfaces a **denial reason** when auto mode blocks an action — visible in the transcript, the denial toast, and the recently-denied list under `/permissions` (v2.1.193+).

#### Built-in intent-based protection (v2.1.183)

Separate from user-configured `hard_deny`, auto mode blocks the following destructive commands by default unless you explicitly asked for them this session:

- `git reset --hard`, `git checkout -- .`, `git clean -fd`, `git stash drop`
- `git commit --amend` (when the commit wasn't made by the agent this session)
- `terraform destroy`, `pulumi destroy`, `cdk destroy` (unless you asked for the specific stack)

This is built-in default protection driven by inferred intent — you don't need to add these to `hard_deny` yourself.

### Fallback Behavior

When the classifier is uncertain, auto mode falls back to prompting the user:
- After **3 consecutive** classifier blocks
- After **20 total** classifier blocks in a session

This ensures the user always retains control when the classifier cannot confidently approve an action.

### Seeding Auto-Mode-Equivalent Permissions (No Team Plan Required)

If you don't have a Team plan or want a simpler approach without the background classifier, you can seed your `~/.claude/settings.json` with a conservative baseline of safe permission rules. The script starts with read-only and local-inspection rules, then lets you opt into edits, tests, local git writes, package installs, and GitHub write actions only when you want them.

**File:** `09-advanced-features/setup-auto-mode-permissions.py`

```bash
# Preview what would be added (no changes written)
python3 09-advanced-features/setup-auto-mode-permissions.py --dry-run

# Apply the conservative baseline
python3 09-advanced-features/setup-auto-mode-permissions.py

# Add more capability only when you need it
python3 09-advanced-features/setup-auto-mode-permissions.py --include-edits --include-tests
python3 09-advanced-features/setup-auto-mode-permissions.py --include-git-write --include-packages
```

The script adds rules across these categories:

| Category | Examples |
|----------|---------|
| Core read-only tools | `Read(*)`, `Glob(*)`, `Grep(*)`, `Agent(*)`, `WebSearch(*)`, `WebFetch(*)` |
| Local inspection | `Bash(git status:*)`, `Bash(git log:*)`, `Bash(git diff:*)`, `Bash(cat:*)` |
| Optional edits | `Edit(*)`, `Write(*)`, `NotebookEdit(*)` |
| Optional test/build | `Bash(pytest:*)`, `Bash(python3 -m pytest:*)`, `Bash(cargo test:*)` |
| Optional git writes | `Bash(git add:*)`, `Bash(git commit:*)`, `Bash(git stash:*)` |
| Git (local write) | `Bash(git add:*)`, `Bash(git commit:*)`, `Bash(git checkout:*)` |
| Package managers | `Bash(npm install:*)`, `Bash(pip install:*)`, `Bash(cargo build:*)` |
| Build & test | `Bash(make:*)`, `Bash(pytest:*)`, `Bash(go test:*)` |
| Common shell | `Bash(ls:*)`, `Bash(cat:*)`, `Bash(find:*)`, `Bash(cp:*)`, `Bash(mv:*)` |
| GitHub CLI | `Bash(gh pr view:*)`, `Bash(gh pr create:*)`, `Bash(gh issue list:*)` |

Dangerous operations (`rm -rf`, `sudo`, force push, `DROP TABLE`, `terraform destroy`, etc.) are intentionally excluded. The script is idempotent — running it twice won't duplicate rules.
