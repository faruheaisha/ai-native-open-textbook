---
title: "Plan - Multi-Model Collaborative Planning"
sourceId: "09-harness/ecc"
sourceTitle: "ECC —— Harness 性能优化系统"
sourceKind: "其他材料"
licenseLabel: "可转载"
lang: "英文"
tier: 3
volume: "09-harness"
sourceUrl: "https://github.com/affaan-m/ECC"
entryUrl: "https://github.com/affaan-m/ECC/blob/928c1dea72f5c330442fc1f595563398b8f389f7/commands/multi-plan.md"
sourceRel: "commands/multi-plan.md"
rawUrl: "/raw/09-harness/ecc/commands/multi-plan.md"
sourceSha256: "f533ede8158bcbb32b4361c6f94a8548437d5a13de09df2cd733544a324b4d72"
pageSha256: "f533ede8158bcbb32b4361c6f94a8548437d5a13de09df2cd733544a324b4d72"
contentMode: "local-full"
zh: ""
---

# Plan - Multi-Model Collaborative Planning

Multi-model collaborative planning - Context retrieval + Dual-model analysis → Generate step-by-step implementation plan.

> **Prerequisite:** Requires the external `ccg-workflow` runtime, which is **not** part of the base ECC install. Initialize it with `npx ccg-workflow` to provision `~/.claude/bin/codeagent-wrapper` and the `~/.claude/.ccg/prompts/*` role files this command depends on. Without that runtime, this command will not run correctly.

$ARGUMENTS

---

## Core Protocols

- **Language Protocol**: Use **English** when interacting with tools/models, communicate with user in their language
- **Mandatory Parallel**: Codex/Antigravity calls MUST use `run_in_background: true` (including single model calls, to avoid blocking main thread)
- **Code Sovereignty**: External models have **zero filesystem write access**, all modifications by Claude
- **Stop-Loss Mechanism**: Do not proceed to next phase until current phase output is validated
- **Planning Only**: This command allows reading context and writing to `.claude/plan/*` plan files, but **NEVER modify production code**

---

## Multi-Model Call Specification

**Call Syntax** (parallel: use `run_in_background: true`):

```
Bash({
  command: "~/.claude/bin/codeagent-wrapper {{LITE_MODE_FLAG}}--backend <codex|antigravity> - \"$PWD\" <<'EOF'
ROLE_FILE: <role prompt path>
Requirement: <enhanced requirement>
Context: <retrieved project context>
OUTPUT: Step-by-step implementation plan with pseudo-code. DO NOT modify any files.
EOF",
  run_in_background: true,
  timeout: 3600000,
  description: "Brief description"
})
```

**Model Parameter Notes**:
- No extra model flag is needed for `--backend antigravity` or `--backend codex`; `codeagent-wrapper` picks each backend's default model.

**Role Prompts**:

| Phase | Codex | Antigravity |
|-------|-------|--------|
| Analysis | `~/.claude/.ccg/prompts/codex/analyzer.md` | `~/.claude/.ccg/prompts/antigravity/analyzer.md` |
| Planning | `~/.claude/.ccg/prompts/codex/architect.md` | `~/.claude/.ccg/prompts/antigravity/architect.md` |

**Session Reuse**: Each call returns `SESSION_ID: xxx` (typically output by wrapper), **MUST save** for subsequent `/ccg:execute` use.

**Wait for Background Tasks** (max timeout 600000ms = 10 minutes):

```
TaskOutput({ task_id: "<task_id>", block: true, timeout: 600000 })
```

**IMPORTANT**:
- Must specify `timeout: 600000`, otherwise default 30 seconds will cause premature timeout
- If still incomplete after 10 minutes, continue polling with `TaskOutput`, **NEVER kill the process**
- If waiting is skipped due to timeout, **MUST call `AskUserQuestion` to ask user whether to continue waiting or kill task**

---

## Execution Workflow

**Planning Task**: $ARGUMENTS

### Phase 1: Full Context Retrieval

`[Mode: Research]`

#### 1.1 Prompt Enhancement (MUST execute first)

**If ace-tool MCP is available**, call `mcp__ace-tool__enhance_prompt` tool:

```
mcp__ace-tool__enhance_prompt({
  prompt: "$ARGUMENTS",
  conversation_history: "<last 5-10 conversation turns>",
  project_root_path: "$PWD"
})
```

Wait for enhanced prompt, **replace original $ARGUMENTS with enhanced result** for all subsequent phases.

**If ace-tool MCP is NOT available**: Skip this step and use the original `$ARGUMENTS` as-is for all subsequent phases.

#### 1.2 Context Retrieval

**If ace-tool MCP is available**, call `mcp__ace-tool__search_context` tool:

```
mcp__ace-tool__search_context({
  query: "<semantic query based on enhanced requirement>",
  project_root_path: "$PWD"
})
```

- Build semantic query using natural language (Where/What/How)
- **NEVER answer based on assumptions**

**If ace-tool MCP is NOT available**, use Claude Code built-in tools as fallback:
1. **Glob**: Find relevant files by pattern (e.g., `Glob("**/*.ts")`, `Glob("src/**/*.py")`)
2. **Grep**: Search for key symbols, function names, class definitions (e.g., `Grep("className|functionName")`)
3. **Read**: Read the discovered files to gather complete context
4. **Task (Explore agent)**: For deeper exploration, use `Task` with `subagent_type: "Explore"` to search across the codebase

#### 1.3 Completeness Check

- Must obtain **complete definitions and signatures** for relevant classes, functions, variables
- If context insufficient, trigger **recursive retrieval**
- Prioritize output: entry file + line number + key symbol name; add minimal code snippets only when necessary to resolve ambiguity

#### 1.4 Requirement Alignment

- If requirements still have ambiguity, **MUST** output guiding questions for user
- Until requirement boundaries are clear (no omissions, no redundancy)

### Phase 2: Multi-Model Collaborative Analysis

`[Mode: Analysis]`

#### 2.1 Distribute Inputs

**Parallel call** Codex and Antigravity (`run_in_background: true`):

Distribute **original requirement** (without preset opinions) to both models:

1. **Codex Backend Analysis**:
   - ROLE_FILE: `~/.claude/.ccg/prompts/codex/analyzer.md`
   - Focus: Technical feasibility, architecture impact, performance considerations, potential risks
   - OUTPUT: Multi-perspective solutions + pros/cons analysis

2. **Antigravity Frontend Analysis**:
   - ROLE_FILE: `~/.claude/.ccg/prompts/antigravity/analyzer.md`
   - Focus: UI/UX impact, user experience, visual design
   - OUTPUT: Multi-perspective solutions + pros/cons analysis

Wait for both models' complete results with `TaskOutput`. **Save SESSION_ID** (`CODEX_SESSION` and `ANTIGRAVITY_SESSION`).

#### 2.2 Cross-Validation

Integrate perspectives and iterate for optimization:

1. **Identify consensus** (strong signal)
2. **Identify divergence** (needs weighing)
3. **Complementary strengths**: Backend logic follows Codex, Frontend design follows Antigravity
4. **Logical reasoning**: Eliminate logical gaps in solutions

#### 2.3 (Optional but Recommended) Dual-Model Plan Draft

To reduce risk of omissions in Claude's synthesized plan, can parallel have both models output "plan drafts" (still **NOT allowed** to modify files):

1. **Codex Plan Draft** (Backend authority):
   - ROLE_FILE: `~/.claude/.ccg/prompts/codex/architect.md`
   - OUTPUT: Step-by-step plan + pseudo-code (focus: data flow/edge cases/error handling/test strategy)

2. **Antigravity Plan Draft** (Frontend authority):
   - ROLE_FILE: `~/.claude/.ccg/prompts/antigravity/architect.md`
   - OUTPUT: Step-by-step plan + pseudo-code (focus: information architecture/interaction/accessibility/visual consistency)

Wait for both models' complete results with `TaskOutput`, record key differences in their suggestions.

#### 2.4 Generate Implementation Plan (Claude Final Version)

Synthesize both analyses, generate **Step-by-step Implementation Plan**:

```markdown
## Implementation Plan: <Task Name>

### Task Type
- [ ] Frontend (→ Antigravity)
- [ ] Backend (→ Codex)
- [ ] Fullstack (→ Parallel)

### Technical Solution

### Implementation Steps
1. <Step 1> - Expected deliverable
2. <Step 2> - Expected deliverable
...

### Key Files
| File | Operation | Description |
|------|-----------|-------------|
| path/to/file.ts:L10-L50 | Modify | Description |

### Risks and Mitigation
| Risk | Mitigation |
|------|------------|

### SESSION_ID (for /ccg:execute use)
- CODEX_SESSION: <session_id>
- ANTIGRAVITY_SESSION: <session_id>
```

### Phase 2 End: Plan Delivery (Not Execution)

**`/ccg:plan` responsibilities end here, MUST execute the following actions**:

1. Present complete implementation plan to user (including pseudo-code)
