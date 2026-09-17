---
title: "AI Engineering from Scratch（英文原版）"
sourceId: "07-coding/ai-engineering-from-scratch"
sourceTitle: "AI Engineering from Scratch（英文原版）"
sourceKind: "源码研读"
licenseLabel: "可转载"
lang: "英文"
tier: 2
volume: "07-coding"
sourceUrl: "https://github.com/rohitg00/ai-engineering-from-scratch"
entryUrl: "https://github.com/rohitg00/ai-engineering-from-scratch/blob/d18b8fe5a913c46011a3b06cb6ebd6a924414fd3/phases/19-capstone-projects/01-terminal-native-coding-agent/outputs/skill-terminal-coding-agent.md"
sourceRel: "phases/19-capstone-projects/01-terminal-native-coding-agent/outputs/skill-terminal-coding-agent.md"
rawUrl: "/raw/07-coding/ai-engineering-from-scratch/phases/19-capstone-projects/01-terminal-native-coding-agent/outputs/skill-terminal-coding-agent.md"
sourceSha256: "d05c61cad4e6e2edf010c1e6d07d424635e2ac4ce0620a5ed2f3b7afce409422"
pageSha256: "d05c61cad4e6e2edf010c1e6d07d424635e2ac4ce0620a5ed2f3b7afce409422"
contentMode: "local-full"
zh: ""
---

# AI Engineering from Scratch（英文原版）

Given a target repository and a natural-language task, build a harness that plans, executes in a sandbox, and opens a pull request. Match or beat the mini-swe-agent baseline on a 30-task SWE-bench Pro subset while staying under a $5-per-task budget.

Build plan:

1. Stand up a Bun + Ink TUI harness with a plan pane, a tool-call stream, and a live token/dollar budget.
2. Define six tools (read_file, edit_file, ripgrep, tree_sitter_symbols, run_shell, git) over Model Context Protocol StreamableHTTP. Every call returns at most 4k tokens.
3. Run every tool call inside an E2B or Daytona sandbox on a fresh `git worktree add` branch. Never touch the host filesystem.
4. Wire all eight 2026 hook events: SessionStart, SessionEnd, PreToolUse, PostToolUse, UserPromptSubmit, Notification, Stop, PreCompact. Ship at least four user-authored hooks (destructive-command guard, token accounting, OTel span emitter, trace bundle writer).
5. Enforce three budgets: 50 turns, 200k tokens, $5 dollars. PreCompact fires at 150k and summarizes older turns.
6. Emit OpenTelemetry spans with GenAI semantic conventions to a self-hosted Langfuse.
7. On success, push the branch and open a PR with the plan and trace bundle in the body.
8. Evaluate against mini-swe-agent on a 30-issue SWE-bench Pro Python subset and record pass@1, turns, tokens, and dollars per task.

Assessment rubric:

| Weight | Criterion | Measurement |
|:-:|---|---|
| 25 | SWE-bench Pro pass@1 | Matched 30-task subset vs mini-swe-agent baseline |
| 20 | Architecture clarity | Plan/act/observe separation, hook surface, tool schema readability |
| 20 | Safety | Sandbox escape red-team + destructive-command guard audit |
| 20 | Observability | 100% of tool calls spanned, token accounting per turn |
| 15 | Developer UX | Cold-start under 2s, crash recovery, Ctrl-C cancel semantics |

Hard rejects:

- Harness that shells out to git on the host filesystem instead of inside the sandbox.
- Any agent that can write outside the worktree or curl external URLs without an explicit allowlist hook.
- Eval numbers reported without a matched baseline run on the same 30 issues.
- "Pass rate" claims that depend on `git reset --hard` between retries; SWE-bench Pro is pass@1.

Refusal rules:

- Refuse to push directly to main under any configuration. PR branches only.
- Refuse to disable the destructive-command guard. It is a hard requirement of the rubric.
- Refuse to run without a budget ceiling. Open-ended runs contaminate the eval comparison.

Output: a repo containing the harness, a fixed 30-task SWE-bench Pro eval harness with matched mini-swe-agent baseline run, an OpenTelemetry trace archive for at least 5 full runs, and a write-up naming which tasks the harness solves that the baseline does not and vice versa. End with a section on the top three failure modes you observed and the hook change that fixed each.
