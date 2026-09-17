---
title: "CLAUDE.md Review"
sourceId: "09-harness/claude-code-everything"
sourceTitle: "Claude Code Everything You Need to Know"
sourceKind: "工程手册"
licenseLabel: "可转载"
lang: "英文"
tier: 3
volume: "09-harness"
sourceUrl: "https://github.com/wesammustafa/Claude-Code-Everything-You-Need-to-Know"
entryUrl: "https://github.com/wesammustafa/Claude-Code-Everything-You-Need-to-Know/blob/d9e93740193aeae2cd661c7ddf6f0c8f8989860b/.claude/skills/claude-md-review/SKILL.md"
sourceRel: ".claude/skills/claude-md-review/SKILL.md"
rawUrl: "/raw/09-harness/claude-code-everything/.claude/skills/claude-md-review/SKILL.md"
sourceSha256: "3293619fdde528965f09c9388349cc8ae4ebfde2d9bc86b4e818d9fa0a1bf600"
pageSha256: "3293619fdde528965f09c9388349cc8ae4ebfde2d9bc86b4e818d9fa0a1bf600"
contentMode: "local-full"
zh: ""
---

# CLAUDE.md Review

Audit a `CLAUDE.md` against the failure modes that actually cost output quality.

**Premise:** `CLAUDE.md` loads into context on every single session, so every line is either paying rent or costing you tokens on every turn forever. Most "the model isn't following instructions" problems are instruction problems.

## Steps

1. Read the target file (default `./CLAUDE.md`; also check `~/.claude/CLAUDE.md` and any nested `**/CLAUDE.md` if the project has them, since the closest one wins).
2. Score each dimension below and quote the specific lines that fail.
3. Output the report format at the bottom. Propose concrete rewrites, not "consider being more specific."

## What to check

**Specificity** — the highest-leverage dimension.
- Flag unfalsifiable directives: "write clean code", "follow best practices", "be careful", "use good naming".
- Every rule should be checkable by reading a diff. `"Refactor functions over 40 lines"` is checkable; `"keep functions short"` is not.

**Named anchors.**
- Rules that reference "the config", "our API layer", or "the usual pattern" force rediscovery every session. Replace with real paths: `src/config/env.ts`, `src/api/client.ts`.
- Verify every path, command, and filename mentioned still exists. Report the dead ones — a `CLAUDE.md` pointing at a deleted file actively misleads.

**Staleness.**
- Version numbers, model names, and tool commands that no longer match the repo.
- Instructions for a framework, script, or directory that's since been removed.
- Cross-check build/test/lint commands against `package.json`, `Makefile`, `pyproject.toml`, or equivalent — a wrong test command is worse than none.

**Bloat and rent.**
- Anything derivable from the code itself (file tree listings, dependency lists, restating what a function does). Claude can read the repo.
- Long procedures that only apply to one occasional task: those belong in a skill, whose body loads only when used, rather than in context on every turn.
- Generic advice that applies to all software everywhere and therefore teaches nothing about *this* project.

**Conflicts.**
- Rules that contradict each other, or contradict what the code actually does. Flag both sides and ask which wins.
- Precedence surprises: a nested `CLAUDE.md` or `~/.claude/CLAUDE.md` overriding what the author expects.

**What's missing.** The gaps worth calling out, if absent:
- How to run tests, build, and lint — the three things needed to self-verify a change.
- Non-obvious project constraints (a directory that must not be touched, a generated file, a required migration step).
- Conventions that are genuinely surprising and not visible from a quick read of the code.

## Output format

```
## CLAUDE.md review — <path> (<N> lines)

**Verdict:** <one sentence>

### Blocking
- L<n>: <quoted line> → <concrete rewrite>

### Worth fixing
- L<n>: <quoted line> → <concrete rewrite>

### Delete (costs context on every session, earns nothing)
- L<n>–<m>: <what and why>

### Missing
- <gap> → <suggested line to add>

**Estimated size after edits:** <N> lines (from <M>)
```

## Rules

- Quote real line numbers and real text. Never invent a finding to fill a section.
- If a section has no findings, write `None.` — a clean file is a valid result.
- Prefer deleting to rewriting. The best `CLAUDE.md` is short enough that people actually read it.
- Do not edit the file unless asked. Report first.
