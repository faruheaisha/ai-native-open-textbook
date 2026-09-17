---
title: "GSD（Get Shit Done）工作流文档"
sourceId: "10-context-memory/get-shit-done"
sourceTitle: "GSD（Get Shit Done）工作流文档"
sourceKind: "其他材料"
licenseLabel: "可转载"
lang: "英文"
tier: 3
volume: "10-context-memory"
sourceUrl: "https://github.com/gsd-build/get-shit-done"
entryUrl: "https://github.com/gsd-build/get-shit-done/blob/bdcaab2c752d9a33a1a1ca9acf3a3c81fb991815/commands/gsd/config.md"
sourceRel: "commands/gsd/config.md"
rawUrl: "/raw/10-context-memory/get-shit-done/commands/gsd/config.md"
sourceSha256: "55d454b8022dc44ab4462688c3afd4a56965f61a73316a275b2cb0407ab8f370"
pageSha256: "55d454b8022dc44ab4462688c3afd4a56965f61a73316a275b2cb0407ab8f370"
contentMode: "local-full"
zh: ""
---

# GSD（Get Shit Done）工作流文档

&lt;objective>
Configure GSD settings interactively with a single consolidated command.

Mode routing:
- **default** (no flag): Common-case toggles (model, research, plan_check, verifier, branching) → settings workflow
- **--advanced**: Power-user knobs (planning tuning, timeouts, branch templates, cross-AI execution) → settings-advanced workflow
- **--integrations**: Third-party API keys, code-review CLI routing, agent-skill injection → settings-integrations workflow
- **--profile &lt;name>**: Switch model profile (quality|balanced|budget|inherit) → set-profile (inline)
&lt;/objective>

&lt;routing>

| Flag | Action | Workflow |
|------|--------|----------|
| (none) | Interactive 5-question common-case config prompt | settings |
| --advanced | Power-user knobs: planning, execution, discussion, cross-AI, git, runtime | settings-advanced |
| --integrations | API keys (Brave/Firecrawl/Exa), review CLI routing, agent skills | settings-integrations |
| --profile &lt;name&gt; | Switch model profile without interactive prompt | gsd-sdk config-set-model-profile |

&lt;/routing>

&lt;execution_context>
@~/.claude/get-shit-done/workflows/settings.md
@~/.claude/get-shit-done/workflows/settings-advanced.md
@~/.claude/get-shit-done/workflows/settings-integrations.md
&lt;/execution_context>

&lt;context>
Arguments: $ARGUMENTS

Parse the first token of $ARGUMENTS:
- If it is `--advanced`: strip the flag, execute settings-advanced workflow
- If it is `--integrations`: strip the flag, execute settings-integrations workflow
- If it starts with `--profile`: extract the profile name (remainder after `--profile`), then:
  1. **Pre-flight check (#2439):** verify `gsd-sdk` is on PATH via `command -v gsd-sdk`.
     If absent, emit the install hint `Install GSD via 'npm i -g get-shit-done'` and stop —
     do NOT invoke `gsd-sdk` directly (avoids the opaque `command not found: gsd-sdk` failure).
