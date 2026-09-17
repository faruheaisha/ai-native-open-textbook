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
entryUrl: "https://github.com/gsd-build/get-shit-done/blob/bdcaab2c752d9a33a1a1ca9acf3a3c81fb991815/commands/gsd/map-codebase.md"
sourceRel: "commands/gsd/map-codebase.md"
rawUrl: "/raw/10-context-memory/get-shit-done/commands/gsd/map-codebase.md"
sourceSha256: "6c97d2b1bc848d957b1226d24b6133bf4c301d49dda52688c4460b918dc68dc0"
pageSha256: "6c97d2b1bc848d957b1226d24b6133bf4c301d49dda52688c4460b918dc68dc0"
contentMode: "local-full"
zh: ""
---

# GSD（Get Shit Done）工作流文档

&lt;objective>
Analyze existing codebase using parallel gsd-codebase-mapper agents to produce structured codebase documents.

Each mapper agent explores a focus area and **writes documents directly** to `.planning/codebase/`. The orchestrator only receives confirmations, keeping context usage minimal.

Output: .planning/codebase/ folder with 7 structured documents about the codebase state.
&lt;/objective>

&lt;execution_context>
@~/.claude/get-shit-done/workflows/map-codebase.md
&lt;/execution_context>

&lt;flags>
- **--fast**: Lightweight scan mode — spawns one mapper agent instead of four. Accepts an optional `--focus` value: `tech`, `arch`, `quality`, `concerns`, or `tech+arch` (default). Faster and lower-context than the full map.
- **--query**: Codebase intelligence query mode. Sub-commands: `query <term>`, `status`, `diff`, `refresh`. Requires intel to be enabled in config (`intel.enabled: true`). Runs inline for query/status/diff; spawns an agent for refresh.
- **(no flag)**: Full parallel map — spawns 4 mapper agents to produce all 7 codebase documents.
&lt;/flags>

&lt;context>
Arguments: $ARGUMENTS

Parse the first token of $ARGUMENTS:
- If it is `--fast`: strip the flag, run the scan workflow (passing remaining args including optional --focus).
- If it is `--query`: strip the flag, run the intel workflow (passing remaining args as the subcommand).
- Otherwise: pass all of $ARGUMENTS as focus area to the map-codebase workflow.

**Load project state if exists:**
Check for .planning/STATE.md - loads context if project already initialized

**This command can run:**
- Before /gsd:new-project (brownfield codebases) - creates codebase map first
- After /gsd:new-project (greenfield codebases) - updates codebase map as code evolves
- Anytime to refresh codebase understanding
&lt;/context>

&lt;when_to_use>
**Use map-codebase for:**
- Brownfield projects before initialization (understand existing code first)
- Refreshing codebase map after significant changes
- Onboarding to an unfamiliar codebase
- Before major refactoring (understand current state)
- When STATE.md references outdated codebase info

**Skip map-codebase for:**
- Greenfield projects with no code yet (nothing to map)
- Trivial codebases (<5 files)
&lt;/when_to_use>

&lt;process>
1. Check if .planning/codebase/ already exists (offer to refresh or skip)
2. Create .planning/codebase/ directory structure
3. Spawn 4 parallel gsd-codebase-mapper agents:
   - Agent 1: tech focus → writes STACK.md, INTEGRATIONS.md
   - Agent 2: arch focus → writes ARCHITECTURE.md, STRUCTURE.md
   - Agent 3: quality focus → writes CONVENTIONS.md, TESTING.md
   - Agent 4: concerns focus → writes CONCERNS.md
4. Wait for agents to complete, collect confirmations (NOT document contents)
5. Verify all 7 documents exist with line counts
6. Commit codebase map
7. Offer next steps (typically: /gsd:new-project or /gsd:plan-phase)
&lt;/process>

&lt;success_criteria>
- [ ] .planning/codebase/ directory created
- [ ] All 7 codebase documents written by mapper agents
- [ ] Documents follow template structure
- [ ] Parallel agents completed without errors
- [ ] User knows next steps
&lt;/success_criteria>
