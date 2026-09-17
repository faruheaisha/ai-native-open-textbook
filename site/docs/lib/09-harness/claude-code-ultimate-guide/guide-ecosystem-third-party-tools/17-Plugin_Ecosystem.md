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
pageSha256: "af5a85659e626a1385e38f71cde7c446f8e41355c969aa2cd938cab6ec89ca0f"
contentMode: "local-full"
zh: ""
---

## Plugin Ecosystem

Claude Code's plugin system supports community-built extensions. For detailed documentation:

- **[Ultimate Guide Section 8](/lib/09-harness/claude-code-ultimate-guide/guide-ultimate-guide/index)** - Plugin system, commands, installation
- **[claude-plugins.dev](https://claude-plugins.dev)** - 11,989 plugins, 63,065 skills indexed
- **[claudemarketplaces.com](https://claudemarketplaces.com)** - Auto-scan GitHub for marketplace plugins
- **[agentskills.io](https://agentskills.io)** - Open standard for agent skills (26+ platforms)

**Notable skill packs**:
- **[Superpowers](https://github.com/obra/superpowers)**: Complete software development methodology suite (262K stars, 23.4K forks as of 2026-07-27, up from 95K+ stars / 7.5K forks earlier; MIT). 7 context-aware skills covering the full development arc: spec elicitation through Socratic brainstorming, detailed implementation planning (2-5 min tasks with exact file paths), subagent-driven development with two-stage review (spec compliance then code quality), mandatory TDD enforcement (code written before a test gets deleted), code review, git worktree management, and branch lifecycle completion (merge/PR/discard decision). Skills trigger automatically based on context: no manual invocation needed. Install: `/plugin install superpowers@claude-plugins-official`. Created by Jesse Vincent (Prime Radiant), MIT. Also supports Cursor, Codex, OpenCode, and Gemini CLI.
- **[gstack](https://github.com/garrytan/gstack)**: 6-skill workflow suite covering the full ship cycle: strategic product gate (`/plan-ceo-review`), architecture review (`/plan-eng-review`), paranoid code review (`/review`), automated release (`/ship`), native browser QA (`/browse`), and retrospective (`/retro`). Created by Garry Tan (Y Combinator CEO). See [Cognitive Mode Switching](/lib/09-harness/claude-code-ultimate-guide/guide-workflows-gstack-workflow) for the workflow pattern and adoption guide. Despite the `/plan-ceo-review` command name, this is a software engineering tool, not a business persona: for AI agents that actually simulate named executive roles (CFO, CMO, board of directors), see [AI Executive Agents](/lib/09-harness/claude-code-ultimate-guide/guide-ecosystem-ai-executive-agents).
- **[Ponytail](https://github.com/DietrichGebert/ponytail)**: "Lazy senior dev" mode for AI agents. Before writing code, the agent stops at the first rung that holds: does this need to exist? → stdlib? → native platform feature? → installed dependency? → one line? → only then the minimum that works. Benchmarked at 80-94% less code, 47-77% lower cost, and 3-6x faster than an unconstrained agent across Haiku, Sonnet, and Opus (median of 10 runs, 5 tasks). Three intensity levels: `lite` (suggest the lazier path, let the user pick), `full` (enforce the ladder, default), `ultra` (YAGNI extremist, challenges the requirement in the same response). Deliberate shortcuts are marked with a `ponytail:` comment naming the ceiling and upgrade path; `/ponytail-debt` harvests them into a ledger so "later" stays visible. Four commands: `/ponytail [lite|full|ultra|off]`, `/ponytail-review` (over-engineering review of current diff), `/ponytail-audit` (whole-repo scan), `/ponytail-debt` (shortcut ledger). Install: `/plugin install ponytail@ponytail`. MIT. Supports 13 agents: Claude Code, Codex, GitHub Copilot CLI, Gemini CLI, Antigravity CLI, OpenCode, pi, OpenClaw, Cursor, Windsurf, Cline, Kiro, and VS Code with the Codex extension.
- **[fable-mode](https://github.com/mrtooher/fable-mode)**: Execution discipline skill for complex tasks, structured as a 4-step loop: (1) write a numbered stage map with expected outputs before touching anything, (2) delegate independent stages to parallel subagents where the runtime allows, (3) verify each stage with a check that can actually fail (tests, diffs, sources read, not self-assessment), (4) self-critique as a skeptical reviewer before delivery. Named after the Claude Fable model but works on any model; honest that it shapes procedure, not capability ceiling. Three variants: `fable-mode` (inline on current model), `fable-sonnet` (pins a Sonnet subagent), `fable-haiku` (pins a Haiku subagent for cost-sensitive work). Includes 4 worked examples across domains (API null-path bug, mis-attributed research claim, SQL nulls silently dropped from an AVG, multi-session refactor with no done criteria), each showing exactly where the failable check catches what one-shot misses. Two operational rules worth noting: surface accumulated warnings at threshold 3 rather than one by one; anchor sed replacements on word boundaries to avoid corrupting compound words. Install: copy the skill directory to wherever your Claude environment loads skills from (no plugin registry entry yet). No license. 802 stars, 86 forks as of 2026-07-27 (was 477 stars, 54 forks at 5 days post-launch in June 2026).
