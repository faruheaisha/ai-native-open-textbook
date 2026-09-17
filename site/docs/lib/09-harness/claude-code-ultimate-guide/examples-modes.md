---
title: "Behavioral Modes"
sourceId: "09-harness/claude-code-ultimate-guide"
sourceTitle: "Claude Code Ultimate Guide"
sourceKind: "工程手册"
licenseLabel: "可转载"
lang: "英文"
tier: 3
volume: "09-harness"
sourceUrl: "https://github.com/FlorianBruniaux/claude-code-ultimate-guide"
entryUrl: "https://github.com/FlorianBruniaux/claude-code-ultimate-guide/blob/af05b84fb6e32432dae2114ee2a72c44ef3d29b1/examples/modes/README.md"
sourceRel: "examples/modes/README.md"
rawUrl: "/raw/09-harness/claude-code-ultimate-guide/examples/modes/README.md"
sourceSha256: "39e5eab8d8dc64f5c293ef821ad43bbbcbf2f7a3ee48bc608eee94d3dc53acf5"
pageSha256: "39e5eab8d8dc64f5c293ef821ad43bbbcbf2f7a3ee48bc608eee94d3dc53acf5"
contentMode: "local-full"
zh: ""
---

# Behavioral Modes

Ready-to-use behavioral mode files for Claude Code. Copy to `~/.claude/` and reference in your `CLAUDE.md`.

## Available Modes

| Mode | File | Purpose |
|------|------|---------|
| **Learning** | [MODE_Learning.md](/lib/09-harness/claude-code-ultimate-guide/examples-modes-MODE_Learning) | Just-in-time explanations when techniques are first used |

## Installation

### 1. Copy the mode file

```bash
cp MODE_Learning.md ~/.claude/
```

### 2. Reference in your CLAUDE.md

Add to `~/.claude/CLAUDE.md`:

```markdown
# Behavioral Modes
@MODE_Learning.md
```

### 3. Add flags (optional)

Add to `~/.claude/FLAGS.md` for flag-based activation:

```markdown
**--learn**
- Trigger: User requests learning mode, "why/how" questions
- Behavior: Enable just-in-time explanations with first-occurrence tracking

**--no-learn**
- Trigger: User wants pure execution without educational offers
- Behavior: Suppress all learning mode offers
```

## Usage

```bash
# Activate for entire session
claude --learn

# Focus on specific domain
claude --learn focus:git
claude --learn focus:architecture

# Batch explanations at task end
claude --learn batch
```

## More Modes: SuperClaude Framework

This guide includes only **Learning Mode**. For a complete behavioral framework with additional modes, check out [SuperClaude](https://github.com/SuperClaude-Org/SuperClaude_Framework):

| Mode | Purpose |
|------|---------|
| **Orchestration** | Smart tool selection, parallel execution optimization |
| **Task Management** | Hierarchical task tracking with persistent memory |
| **Token Efficiency** | Symbol-enhanced compression (30-50% token reduction) |
| **Learning** | Just-in-time skill development (included here) |

SuperClaude also includes:
- `FLAGS.md` (behavioral flags like `--delegate`, `--learn`) *Note: `--think`/`--ultrathink` are cosmetic only since v2.0.67, since thinking is now on by default across the Opus lineup (4.5 through Opus 5)*
- `PRINCIPLES.md` — Engineering principles (SOLID, DRY, evidence-based)
- `RULES.md` — Actionable rules with priority system
- MCP server documentation (Context7, Sequential, Serena)

## See Also

- [SuperClaude Behavioral Modes](/lib/09-harness/claude-code-ultimate-guide/guide-ultimate-guide/index#superclaude-behavioral-modes): Full documentation
- [SuperClaude Repository](https://github.com/SuperClaude-Org/SuperClaude_Framework): Complete framework
