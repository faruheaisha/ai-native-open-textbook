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
pageSha256: "a50d1289f1ad82cbd0e76799d20f6613834f5e65699385bdb2d8b7fe33cf70c7"
contentMode: "local-full"
zh: ""
---

## Hook Utilities

Tools that extend Claude Code's hook system with additional logic, conditional execution, or automation patterns. For DIY hook examples, see [the hooks section in the ultimate guide](/lib/09-harness/claude-code-ultimate-guide/guide-ultimate-guide/index).

### gitdiff-watcher

A Stop hook utility that enforces quality gates before Claude hands back control. Runs shell commands (build, tests, linting) only when relevant files have changed, making CLAUDE.md quality rules deterministic.

| Attribute | Details |
|-----------|---------|
| **Source** | [GitHub: fcamblor/gitdiff-watcher](https://github.com/fcamblor/gitdiff-watcher) |
| **Install** | `npx @fcamblor/gitdiff-watcher@0.1.0` (no global install needed) |
| **Language** | Node.js |
| **Version** | 0.1.0: work in progress, APIs may change |
| **Author** | Florian Camblor |

**The problem it solves**: CLAUDE.md rules like "tests must pass before handoff" are non-deterministic. As context grows, these rules compete with recent tool outputs for the model's attention and can be deprioritized, so Claude sometimes returns control with broken code even when the rule is explicit. A Stop hook runs outside the LLM context, making it structurally impossible to skip.

**How it works**:

1. Takes a glob pattern (`--on`) and one or more shell commands (`--exec`)
2. On each Stop event, SHA-256 hashes all files matching the glob that appear in `git diff` (staged + unstaged)
3. Compares against the previous snapshot stored in `.claude/gitdiff-watcher.state.local.json`
4. If no relevant changes: exits 0 silently (no command runs)
5. If changes detected: runs all `--exec` commands
6. If any command fails (exit code 2): Claude receives the stderr and retries; the snapshot is NOT updated, so the check runs again next turn
7. On full success: updates the snapshot

**Example configuration** (`.claude/settings.json`):

```json
{
  "hooks": {
    "Stop": [
      {
        "hooks": [
          {
            "type": "command",
            "command": "npx @fcamblor/gitdiff-watcher@0.1.0 --on 'src/**/*.{ts,tsx}' --exec 'npm run build'",
            "timeout": 300,
            "statusMessage": "Checking TypeScript build..."
          },
          {
            "type": "command",
            "command": "npx @fcamblor/gitdiff-watcher@0.1.0 --on 'src/**/*.{ts,tsx}' --exec 'npm test -- --passWithNoTests'",
            "timeout": 300,
            "statusMessage": "Checking tests..."
          }
        ]
      }
    ]
  }
}
```

Multiple hooks run in parallel (Claude Code spawns one subagent per hook entry).

**Key behaviors**:

- **Conditional**: only fires when matching files changed, so there's no wasted CI time on unrelated edits
- **Retry-safe**: failed runs preserve the snapshot, so the same check runs on the next attempt
- **Parallel**: multiple `--exec` commands within one hook entry run sequentially; use separate hook entries for parallel execution
- **Silent on no-op**: exits 0 without output when no relevant changes are detected

**Limitations**:

- v0.1.0 (explicitly "work in progress"), CLI options and state file format may change
- Uses `git diff (staged + unstaged)` for file detection, so files not tracked by git are not visible to the watcher
- Retry loops: a misconfigured check that always fails will cause Claude to retry indefinitely; add a `--exec-timeout` and ensure your commands have correct exit codes
- Each Stop hook failure starts a new Claude turn, consuming context. Near the 200K limit, repeated failures accelerate context consumption

**When to use gitdiff-watcher vs a native Stop hook**:

The same quality gate can be written in ~20 lines of bash without gitdiff-watcher. Use gitdiff-watcher when you want the file-change conditional logic and state persistence without writing it yourself, or when you need parallel checks across a polyglot codebase (e.g., TypeScript build + Kotlin tests simultaneously).

> **Cross-ref**: Stop hook mechanics at [ultimate-guide.md hooks section](/lib/09-harness/claude-code-ultimate-guide/guide-ultimate-guide/index). For PostToolUse build checks (fires after every file edit, not at handoff), see the hooks section example at line ~8262.
