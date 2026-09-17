---
title: "Agent Skills（Addy Osmani）"
sourceId: "10-context-memory/agent-skills-addyosmani"
sourceTitle: "Agent Skills（Addy Osmani）"
sourceKind: "技能与配置库"
licenseLabel: "可转载"
lang: "英文"
tier: 2
volume: "10-context-memory"
sourceUrl: "https://github.com/addyosmani/agent-skills"
entryUrl: "https://github.com/addyosmani/agent-skills/blob/6ca0cd7db39b41b1c37e26d335c507ee92382c6d/.claude/commands/ship.md"
sourceRel: ".claude/commands/ship.md"
rawUrl: "/raw/10-context-memory/agent-skills-addyosmani/.claude/commands/ship.md"
sourceSha256: "02d2d0fc10bfb58bb62dcfe22ed396cd2b9f55dced7d5cd92fce6d29f0da4ace"
pageSha256: "02d2d0fc10bfb58bb62dcfe22ed396cd2b9f55dced7d5cd92fce6d29f0da4ace"
contentMode: "local-full"
zh: ""
---

# Agent Skills（Addy Osmani）

Invoke the agent-skills:shipping-and-launch skill.

`/ship` is a **fan-out orchestrator**. It runs three specialist personas in parallel against the current change, then merges their reports into a single go/no-go decision with a rollback plan. The personas operate independently — no shared state, no ordering — which is what makes parallel execution safe and useful here.

## Phase A — Parallel fan-out

Spawn three subagents concurrently using the Agent tool. **Issue all three Agent tool calls in a single assistant turn so they execute in parallel** — sequential calls defeat the purpose of this command.

In Claude Code, each call passes `subagent_type` matching the persona's `name` field:

1. **`code-reviewer`** — Run a five-axis review (correctness, readability, architecture, security, performance) on the staged changes or recent commits. Output the standard review template.
2. **`security-auditor`** — Run a vulnerability and threat-model pass. Check OWASP Top 10, secrets handling, auth/authz, dependency CVEs. Output the standard audit report.
3. **`test-engineer`** — Analyze test coverage for the change. Identify gaps in happy path, edge cases, error paths, and concurrency scenarios. Output the standard coverage analysis.

In other harnesses without an Agent tool, invoke each persona's system prompt sequentially and treat their outputs as if returned in parallel — the merge phase still works.

Constraints (from Claude Code's subagent model):
- Subagents cannot spawn other subagents — do not let one persona delegate to another.
- Each subagent gets its own context window and returns only its report to this main session.
- If you need teammates that talk to each other instead of just reporting back, use Claude Code Agent Teams and reference these personas as teammate types (see `references/orchestration-patterns.md`).

**Persona resolution.** If you've defined your own `code-reviewer`, `security-auditor`, or `test-engineer` in `.claude/agents/` or `~/.claude/agents/`, those take precedence over this plugin's versions — `/ship` picks up your customizations automatically. This is intentional: plugin subagents sit at the bottom of Claude Code's scope priority table, so user-level definitions win by design.

## Phase B — Merge in main context

Once all three reports are back, the main agent (not a sub-persona) synthesizes them:

1. **Code Quality** — Aggregate Critical/Important findings from `code-reviewer` and any failing tests, lint, or build output. Resolve duplicates between reviewers.
2. **Security** — Promote any Critical/High `security-auditor` findings to launch blockers. Cross-reference with `code-reviewer`'s security axis.
3. **Performance** — Pull from `code-reviewer`'s performance axis; cross-check Core Web Vitals if applicable.
4. **Accessibility** — Verify keyboard nav, screen reader support, contrast (not covered by the three personas — handle directly here, or invoke the accessibility checklist).
5. **Infrastructure** — Env vars, migrations, monitoring, feature flags. Verify directly.
6. **Documentation** — README, ADRs, changelog. Verify directly.

## Phase C — Decision and rollback

Produce a single output:

```markdown
## Ship Decision: GO | NO-GO

### Blockers (must fix before ship)
- [Source persona: Critical finding + file:line]

### Recommended fixes (should fix before ship)
- [Source persona: Important finding + file:line]
