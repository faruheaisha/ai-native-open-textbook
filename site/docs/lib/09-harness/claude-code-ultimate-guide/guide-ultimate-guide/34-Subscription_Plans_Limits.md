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
entryUrl: "https://github.com/FlorianBruniaux/claude-code-ultimate-guide/blob/af05b84fb6e32432dae2114ee2a72c44ef3d29b1/guide/ultimate-guide.md"
sourceRel: "guide/ultimate-guide.md"
rawUrl: "/raw/09-harness/claude-code-ultimate-guide/guide/ultimate-guide.md"
sourceSha256: "4d290b0171bbaaffd149d5d2e4da964392cb212d7357408df40d8f346f952dbc"
pageSha256: "28800898d6bded163ddef5c87137db5d9ebacffec5ac0c36dccb822bd89de352"
contentMode: "local-full"
zh: ""
---

#### Subscription Plans & Limits

> **Note**: Anthropic's plans evolve frequently. Always verify current pricing and limits at [claude.com/pricing](https://claude.com/pricing).

**How Subscription Limits Work**

Unlike API usage (pay-per-token), subscriptions use a hybrid model that's deliberately opaque:

| Concept | Description |
|---------|-------------|
| **5-hour rolling window** | Primary limit; resets when you send next message after 5 hours lapse |
| **Weekly aggregate cap** | Secondary limit; resets every 7 days. Both apply simultaneously |
| **Hybrid counting** | Advertised as "messages" but actual capacity is token-based, varying by code complexity, file size, and context |
| **Model weighting** | **Opus consumes 8-10× more quota than Sonnet** for equivalent work |

**Approximate Token Budgets by Plan** (Jan 2026, community-verified)

| Plan | 5-Hour Token Budget | Claude Code prompts/5h | Weekly Sonnet Hours | Weekly Opus Hours | Claude Code Access |
|------|---------------------|------------------------|---------------------|-------------------|-------------------|
| **Free** | 0 | 0 | 0 | 0 | ❌ None |
| **Pro** ($20/mo) | ~44,000 tokens | ~10-40 prompts | 40-80 hours | N/A (Sonnet only) | ✅ Limited |
| **Max 5x** ($100/mo) | ~88,000-220,000 tokens | ~50-200 prompts | 140-280 hours | 15-35 hours | ✅ Full |
| **Max 20x** ($200/mo) | ~220,000+ tokens | ~200-800 prompts | 240-480 hours | 24-40 hours | ✅ Full |

> **Warning**: These are community-measured estimates. Anthropic does not publish exact token limits, and limits have been reduced without announcement (notably Oct 2025). The 8-10× Opus/Sonnet ratio means Max 20x users get only ~24-40 Opus hours weekly despite paying $200/month. "Prompts/5h" is a rough practical translation of the token budget: actual capacity varies significantly with task complexity, context size, and sub-agent usage. Monthly cap: ~50 active 5-hour windows across all plans.

**Why "Hours" Are Misleading**

The term "hours of Sonnet 4" refers to **elapsed wall-clock time** during active processing, not calendar hours. This is not directly convertible to tokens without knowing:
- Code complexity (larger files = higher per-token overhead)
- Tool usage (Bash execution adds ~245 input tokens per call; text editor adds ~700)
- Context re-reads and caching misses

**Tier-Specific Strategies**

| If you have... | Recommended approach |
|----------------|---------------------|
| **Pro plan** | Sonnet only; batch sessions, avoid context bloat |
| **Limited Opus quota** | OpusPlan essential: Opus for planning, Sonnet for execution |
| **Max 5x** | Sonnet default, Opus only for architecture/complex debugging |
| **Max 20x** | More Opus freedom, but still monitor weekly usage (24-40h goes fast) |

**The Pro User Pattern** (validated by community):

```
1. Opus → Create detailed plan (high-quality thinking)
2. Sonnet/Haiku → Execute the plan (cost-effective implementation)
3. Result: Best reasoning where it matters, lower cost overall
```

This is exactly what OpusPlan mode does automatically (see Section 2.3).

**Monitoring Your Usage**

```bash
/status    # Shows current session: cost, context %, model
```

Anthropic provides no in-app real-time usage metrics. Community tools like [`ccusage`](https://github.com/ryoppippi/ccusage) help track token consumption across sessions.

For subscription usage history: Check your [Anthropic Console](https://console.anthropic.com/settings/usage) or Claude.ai settings.

**Historical Note**: In October 2025, users reported significant undocumented limit reductions coinciding with Sonnet 4.5's release. Pro users who previously sustained 40-80 Sonnet hours weekly reported hitting limits after only 6-8 hours. Anthropic acknowledged the limits but did not explain the discrepancy.

**Peak Hours (March 2026)**: On March 26, 2026, Anthropic adjusted how session limits are consumed during peak demand: the 5-hour rolling window drains faster during **weekdays 5am–11am PT** (1pm–7pm GMT). Same weekly total, different distribution. Anthropic cited GPU capacity constraints; roughly 7% of users hit limits they wouldn't have before. Max users reported going from 21% to 100% usage on a single prompt during peak. Practical workaround: move compute-heavy agentic tasks (long sub-agent chains, large refactors) to evenings or weekends. Off-peak usage clears faster, stretching the same budget further.

### Context Poisoning (Bleeding)

**Definition**: When information from one task contaminates another.

**Pattern 1: Style Bleeding**
```
Task 1: "Create a blue button"
Claude: [Creates blue button]

Task 2: "Create a form"
Claude: [Creates form... with all buttons blue!]
        ↑ The "blue" bled into the new task

Solution: Use explicit boundaries
"---NEW TASK---
Create a form. Use default design system colors."
```

**Pattern 2: Instruction Contamination**
```
Instruction 1: "Always use arrow functions"
Instruction 2: "Follow project conventions" (which uses function)

Claude: [Paralyzed, alternating between styles]

Solution: Clarify priority
"In case of conflict, project conventions take precedence over my preferences."
```

**Pattern 3: Temporal Confusion**
```
Early session: "auth.ts contains login logic"
... 2h of work ...
You renamed auth.ts to authentication.ts

Claude: "I'll modify auth.ts..."
        ↑ Using outdated info

Solution: Explicit updates
"Note: auth.ts was renamed to authentication.ts"
```

**Context Hygiene Checklist**:
- [ ] New tasks = explicit markdown boundaries
- [ ] Structural changes = inform Claude explicitly
- [ ] Contradictory instructions = clarify priority
- [ ] Long session (>2h) = consider `/clear` or new session
- [ ] Erratic behavior = check with `/context`

### Sanity Check Technique

Verify that Claude has loaded your configuration correctly.

**Simple Method**:

1. Add at the top of CLAUDE.md:
```markdown
# My name is [Your Name]
# Project: [Project Name]
# Stack: [Your tech stack]
```

2. Ask Claude: "What is my name? What project am I working on?"

3. If correct → Configuration loaded properly

**Advanced: Multiple Checkpoints**
```markdown
# === CHECKPOINT 1 === Project: MyApp ===

[... 500 lines of instructions ...]

# === CHECKPOINT 2 === Stack: Next.js ===

[... 500 lines of instructions ...]

# === CHECKPOINT 3 === Owner: [Name] ===
```

Ask "What is checkpoint 2?" to verify Claude read that far.

| Failure Symptom | Probable Cause | Solution |
|-----------------|----------------|----------|
| Doesn't know your name | CLAUDE.md not loaded | Check file location |
| Inconsistent answers | Typo in filename | Must be `CLAUDE.md` (not `clause.md`) |
| Partial knowledge | Context exhausted | `/clear` or new session |

### Session Handoff Pattern

When ending a session or switching contexts, create a **handoff document** to maintain continuity.

**Purpose**: Bridge the gap between sessions by documenting state, decisions, and next steps.

**Template**:

```markdown
# Session Handoff - [Date] [Time]

## What Was Accomplished
- [Key task 1 completed]
- [Key task 2 completed]
- [Files modified: list]

## Current State
- [What's working]
- [What's partially done]
- [Known issues or blockers]

## Decisions Made
- [Architectural choice 1: why]
- [Technology selection: rationale]
- [Trade-offs accepted]

## Next Steps
1. [Immediate next task]
2. [Dependent task]
3. [Follow-up validation]

## Context for Next Session
- Branch: [branch-name]
- Key files: [list 3-5 most relevant]
- Dependencies: [external factors]
```

**When to create handoff documents**:

| Scenario | Why |
|----------|-----|
| End of work day | Resume tomorrow without re-explaining context |
| Before context limit | Preserve state before `/clear` |
| Switching focus areas | Different task requires fresh context |
| Interruption expected | Emergency or meeting disrupts work |
| Complex debugging | Document hypotheses and tests tried |

**Storage location**: `claudedocs/handoffs/handoff-YYYY-MM-DD.md`

**Pro tip**: Ask Claude to generate the handoff:

```
You: "Create a session handoff document for what we accomplished today"
```

Claude will analyze git status, conversation history, and generate a structured handoff.

**Handoff Triad Pattern**: For teams or multi-session workflows, a three-command protocol adds explicit merge semantics on top of the basic handoff. Three commands work together:

| Command | Job |
|---------|-----|
| `/handoff:create` | Generates the structured document from current session context |
| `/handoff:resume` | Loads a handoff document, confirms understanding, and waits for approval before starting |
| `/handoff:update` | Updates an existing handoff with section-specific merge rules (see below) |

The critical addition is per-section merge rules in `update`:

| Section | Merge Rule |
|---------|------------|
| Task, Scope | Keep or refine |
| Files | Merge: combine original with new files touched |
| Discoveries | Append: add new findings, never remove prior ones |
| Work Done | **Append only**: add new entries, never delete history, include commit hashes |
| Status | Replace: write current state |
| Next Steps | Replace: write updated checklist |

The append-only Work Done section creates an audit trail across sessions. Even if earlier work was revised, the revision appears as a new entry rather than an overwrite.

Fork-ready templates at `examples/commands/handoff/` in this repo.

> Pattern inspired by [Packmind's handoff command triad](https://github.com/packmind/packmind) (Apache 2.0). See [Credits](/lib/09-harness/claude-code-ultimate-guide/guide-core-credits).

## 2.3 Plan Mode

Plan Mode is Claude Code's "look but don't touch" mode.

### Entering Plan Mode

```
/plan
```

Or ask Claude directly:

```
You: Let's plan this feature before implementing
```

### What Plan Mode Allows

- ✅ Reading files
- ✅ Searching the codebase
- ✅ Analyzing architecture
- ✅ Proposing approaches
- ✅ Writing to a plan file

### What Plan Mode Prevents

- ❌ Editing files
- ❌ Running commands that modify state
- ❌ Creating new files
- ❌ Making commits

### When to Use Plan Mode

| Situation | Use Plan Mode? |
|-----------|----------------|
| Exploring unfamiliar codebase | ✅ Yes |
| Investigating a bug | ✅ Yes |
| Planning a new feature | ✅ Yes |
| Fixing a typo | ❌ No |
| Quick edit to known file | ❌ No |

> **Recommended frequency**: Boris Cherny (Head of Claude Code at Anthropic) starts approximately **80% of tasks in Plan Mode**, letting Claude plan before writing a single line of code. Once the plan is approved, execution is almost always correct on the first try.
> *Lenny's Newsletter, February 19, 2026*

### Exiting Plan Mode

Press `Shift+Tab` to toggle back to Normal Mode (Act Mode). You can also type a message and Claude will ask: "Ready to implement this plan?"

> **Note**: `Shift+Tab` toggles between Plan Mode and Normal Mode during a session. Use `Shift+Tab` twice from Normal Mode to enter Plan Mode, once from Plan Mode to return.

### Auto Plan Mode

**Concept**: Automatically trigger planning mode before any risky operation.

**Configuration File** (`~/.claude/auto-plan-mode.txt`):
```
Before executing ANY tool (Read, Write, Edit, Bash, Grep, Glob, WebSearch), you MUST:
1. FIRST: Use exit_plan_mode tool to present your plan
2. WAIT: For explicit user approval before proceeding
3. ONLY THEN: Execute the planned actions

Each new user request requires a fresh plan - previous approvals don't carry over.
```

**Launch with Auto Plan Mode**:

*macOS/Linux:*
```bash
# Direct
claude --append-system-prompt "Before executing ANY tool..."

# Via file (recommended)
claude --append-system-prompt "$(cat ~/.claude/auto-plan-mode.txt)"

# Alias in .zshrc/.bashrc
alias claude-safe='claude --append-system-prompt "$(cat ~/.claude/auto-plan-mode.txt)"'
```

*Windows (PowerShell):*
```powershell
# Create the config file at %USERPROFILE%\.claude\auto-plan-mode.txt with the same content

# Direct
claude --append-system-prompt "Before executing ANY tool..."

# Via file (add to $PROFILE)
function claude-safe {
    $planPrompt = Get-Content "$env:USERPROFILE\.claude\auto-plan-mode.txt" -Raw
    claude --append-system-prompt $planPrompt $args
}
```

**Resulting Workflow**:
```
User: "Add an email field to the User model"

Claude (Auto Plan Mode active):
┌─────────────────────────────────────────────────────────────┐
│ 📋 PROPOSED PLAN                                            │
│                                                             │
│ 1. Read schema.prisma to understand current model           │
│ 2. Add field email: String? @unique                         │
│ 3. Generate Prisma migration                                │
│ 4. Update TypeScript types                                  │
│ 5. Add Zod validation in routers                            │
│                                                             │
│ ⚠️ Impact: 3 files modified, 1 migration created            │
│                                                             │
│ Approve this plan? (y/n)                                    │
└─────────────────────────────────────────────────────────────┘

User: "y"

Claude: [Executes the plan]
```

**Result**: 76% fewer tokens with better results because the plan is validated before execution.

### Model Aliases

Claude Code supports six model aliases via `/model` (each always resolves to the latest version):

| Alias | Resolves To | Use Case |
|-------|-------------|----------|
| `default` | Latest model for your plan tier | Standard usage |
| `sonnet` | Claude Sonnet 5 | Fast, cost-efficient |
| `opus` | Claude Opus 5 | Deep reasoning |
| `haiku` | Claude Haiku 4.5 | Budget, high-volume |
| `sonnet[1m]` | Sonnet with 1M context | Large codebases |
| `opusplan` | Opus (plan) + Sonnet (act) | Hybrid intelligence |

Model can also be set via `claude --model <alias>`, `ANTHROPIC_MODEL` env var, or `"model"` in settings.json. Priority: `/model` > `--model` flag > `ANTHROPIC_MODEL` > settings.json.

**Knowledge cutoffs** (what each model knows about):

| Model | Knowledge Cutoff |
|-------|-----------------|
| Claude Opus 5 | May 2026 |
| Claude Sonnet 5 | January 2026 |
| Claude Fable 5 | January 2026 |
| Claude Opus 4.8 | January 2026 |
| Claude Opus 4.7 | January 2026 |
| Claude Sonnet 4.6 | August 2025 |
| Claude Opus 4.6 | May 2025 |
| Claude Haiku 4.5 | February 2025 |

Claude Code injects the cutoff date for the active model into the system prompt at the start of each session. You can ask Claude directly ("what's your knowledge cutoff?") to confirm which date applies to your current session.

### OpusPlan Mode

**Concept**: Use Opus for planning (superior reasoning) and Sonnet for implementation (cost-efficient).

**Why OpusPlan?**
- **Cost optimization**: Opus tokens cost more than Sonnet
- **Best of both worlds**: Opus-quality planning + Sonnet-speed execution
- **Token savings**: Planning is typically shorter than implementation

**Activation**:
```
/model opusplan
```

Or in `~/.claude/settings.json`:
```json
{
  "model": "opusplan"
}
```

**How It Works**:
1. In **Plan Mode** (`/plan` or `Shift+Tab` twice) → Uses **Opus**
2. In **Act Mode** (normal execution) → Uses **Sonnet**
3. Automatic switching based on mode

**Recommended Workflow**:
```
1. /model opusplan        → Enable OpusPlan
2. Shift+Tab × 2          → Enter Plan Mode (Opus)
3. Describe your task     → Get Opus-quality planning
4. Shift+Tab              → Exit to Act Mode (Sonnet)
5. Execute the plan       → Sonnet implements efficiently
```

**Alternative Approach with Subagents**:

You can also control model usage per agent:

```yaml
# .claude/agents/planner.md
---
name: planner
model: opus
tools: Read, Grep, Glob
---
# Strategic Planning Agent
```

```yaml
# .claude/agents/implementer.md
---
name: implementer
model: haiku
tools: Write, Edit, Bash
---
# Fast Implementation Agent
```

**Pro Users Note**: OpusPlan is particularly valuable for Pro subscribers with limited Opus tokens. It lets you use Opus reasoning for critical planning while preserving tokens for more sessions.

**Budget Variant: SonnetPlan (Community Hack)**

`opusplan` is hardcoded to Opus+Sonnet. There's no native `sonnetplan` alias. But you can remap what the `opus` and `sonnet` aliases resolve to via environment variables, effectively creating a Sonnet→Haiku hybrid:

```bash
# Add to ~/.zshrc
sonnetplan() {
    ANTHROPIC_DEFAULT_OPUS_MODEL=claude-sonnet-4-6 \
    ANTHROPIC_DEFAULT_SONNET_MODEL=claude-haiku-4-5-20251001 \
    claude "$@"
}
```

With `sonnetplan`, `/model opusplan` routes:
- **Plan Mode** → Sonnet 4.6 (via remapped `opus` alias)
- **Act Mode** → Haiku 4.5 (via remapped `sonnet` alias)

> **Caveat**: The model's self-report (`what model are you?`) is unreliable: models don't always know their own identity. Trust the status bar (`Model: Sonnet 4.6` in plan mode) or verify via billing dashboard. GitHub issue [#9749](https://github.com/anthropics/claude-code/issues/9749) tracks native support.

**Pinning Opus 4.6 (Community Hack)**

Opus 4.7 ships with a new tokenizer that maps the same input to roughly 1.0-1.35x more tokens depending on content type, and at higher effort levels it produces more output tokens (more reasoning steps). For workflows where that extra spend doesn't translate into better results, pinning to Opus 4.6 cuts cost without changing behavior.

**Option A: Opus 4.6 everywhere (simplest)**

```json
// ~/.claude/settings.json
{
  "model": "claude-opus-4-6"
}
```

All sessions use Opus 4.6. No hybrid. Add `[1M]` if you need the 1M context window: `"claude-opus-4-6[1M]"`.

**Option B: Keep OpusPlan, pin only the Opus side (recommended)**

```json
// ~/.claude/settings.json
{
  "model": "opusplan",
  "env": {
    "ANTHROPIC_DEFAULT_OPUS_MODEL": "claude-opus-4-6"
  }
}
```

`opusplan` still switches between Plan and Act modes, but Plan Mode now routes to Opus 4.6 instead of 4.7. Sonnet stays unchanged in Act Mode.

Shell variant (non-persistent, useful for testing):
```bash
ANTHROPIC_DEFAULT_OPUS_MODEL=claude-opus-4-6 claude
```

**Option C: Per-session switch (no config change)**

```
/model claude-opus-4-6
```

Resets on the next session. Useful before committing to a config change.

**Verification**: check the status bar in Plan Mode. It should show `Model: Opus 4.6`, not `Opus 4.7`. The billing dashboard confirms which model was charged.

> **Trade-offs**: Opus 4.6 loses the `xhigh` effort level (introduced with Opus 4.8, which defaults to `high` effort in Claude Code) and the `max` effort level (`max` returns an error on Opus 4.6). Knowledge cutoff is also older: May 2025 vs. unpublished for 4.7. If you rely on `max` effort or need post-May-2025 knowledge baked in, stay on 4.7.

### Rev the Engine

**Concept**: Run multiple rounds of planning and deep thinking before executing. Like warming up an engine before driving.

Standard workflow: think → plan → execute.
Rev the Engine: think → plan → think harder → refine plan → think hardest → finalize → execute.

**When to use**:
- Critical architectural decisions (irreversible, high-impact)
- Complex migrations affecting 10+ files
- Unfamiliar domain where first instincts are often wrong

**Pattern**:

```markdown
## Round 1: Initial analysis
User: /plan
User: Analyze the current auth system. What are the key components,
      dependencies, and potential risks of migrating to OAuth2?
Claude: [Initial analysis]

## Round 2: Deep challenge
User: Now use extended thinking. Challenge your own analysis:
      - What assumptions did you make?
      - What failure modes did you miss?
      - What would a senior security engineer flag?
Claude: [Deeper analysis with self-correction]

## Round 3: Final plan
User: Based on both rounds, write the definitive migration plan.
      Include rollback strategy and risk mitigation for each step.
Claude: [Refined plan incorporating both rounds]

## Execute
[approve the plan, or Shift+Tab to leave plan mode]
User: Implement the plan from round 3.
```

**Why it works**: Each round forces Claude to reconsider assumptions. Round 2 typically catches 30-40% of issues that round 1 missed. Round 3 synthesizes into a more complete plan.

> **📊 Empirical backing: Anthropic AI Fluency Index (Feb 2026)**
>
> An Anthropic study analyzing 9,830 Claude conversations quantifies exactly why plan review works: users who iterate and **question the AI's reasoning are 5.6× more likely to catch missing context** and errors compared to users who accept the first output. A second round of review makes you 4× more likely to identify what was left out.
>
> The Rev the Engine pattern operationalizes this finding: each round of deep challenge triggers the questioning behavior that produces measurably better plans.
>
> *Source: Swanson et al., "The AI Fluency Index", Anthropic (2026-02-23), [anthropic.com/research/AI-fluency-index](https://www.anthropic.com/research/AI-fluency-index)*

### Ultrareview (v2.1.114+)

Cloud-based parallel multi-agent code review. Multiple Opus 5 agents read through your changes simultaneously and surface bugs and design issues that careful reviewers would catch.

**Activation**:

```bash
/ultrareview              # Review current branch (diff from base)
/ultrareview <PR#>        # Review a specific GitHub PR
```

Ultrareview operates on **diffs, not the full codebase**: it reviews what changed on the current branch, or the changes in a given PR. The cloud session dispatches parallel agents to analyse the diff; results arrive in the browser and can optionally be teleported back to the terminal.

**Launch offer**: Pro and Max subscribers receive three free ultrareviews to try the feature.

**Requirements**:

| Requirement | Detail |
|-------------|--------|
| Claude Code version | v2.1.114+ |
| Account | Pro or Max |
| Providers | Anthropic API only |

---

### Mechanic Stacking

**Concept**: Layer multiple Claude Code mechanisms for maximum intelligence on critical decisions.

```
Layer 1: Plan Mode          → Safe exploration, no side effects
Layer 2: Extended Thinking  → Deep reasoning with thinking tokens
Layer 3: Rev the Engine     → Multi-round refinement
Layer 4: Split-Role Agents  → Multi-perspective analysis
Layer 5: Permutation        → Systematic variation testing
```

**You don't need all layers for every task.** Match the stack depth to the decision's impact:

| Decision Impact | Stack Depth | Example |
|-----------------|-------------|---------|
| Low (fix typo) | 0 layers | Just do it |
| Medium (add feature) | 1-2 layers | Plan Mode + Extended Thinking |
| High (architecture) | 3-4 layers | Rev the Engine + Split-Role |
| Critical (migration) | 4-5 layers | Full stack |

**Anti-pattern**: Stacking on trivial decisions. If the change is reversible and low-risk, just execute. Over-planning is as wasteful as under-planning.

**Cross-references**:
- Permutation Frameworks: See [§9.19](#919-permutation-frameworks)
- Split-Role Sub-Agents: See [Sub-Agent Isolation](#sub-agent-isolation)
- Extended Thinking: See [§9.1 The Trinity](#91-the-trinity)

## 2.4 Rewind

Rewind is Claude Code's undo mechanism.

### Using Rewind

Access via `Esc + Esc` (double-tap Escape) or the `/rewind` command. This opens a scrollable checkpoint list.

### What Rewind Does

Rewind provides four distinct actions from the checkpoint list:

| Action | Effect |
|--------|--------|
| **Restore code and conversation** | Revert both file changes and conversation to selected point |
| **Restore conversation** | Keep current code, rewind conversation only |
| **Restore code** | Revert file changes, keep conversation |
| **Summarize from here** | Compress conversation from selected point forward (frees space without reverting) |

Key distinction: **Restore** = undo (reverts state). **Summarize** = compress (frees space without reverting). Checkpoints persist across sessions (30-day cleanup).

### Limitations

- Only works on Claude's changes (not manual edits)
- Works within the current session
- Git commits are NOT automatically reverted

### Best Practice: Checkpoint Before Risk

Before a risky operation:

```
You: Let's commit what we have before trying this experimental approach
```

This creates a git checkpoint you can always return to.

### Recovery Ladder: Three Levels of Undo

When things go wrong, you have multiple recovery options. Use the lightest-weight approach that solves your problem:

```
┌─────────────────────────────────────────────────────────┐
│               RECOVERY LADDER                           │
├─────────────────────────────────────────────────────────┤
│                                                         │
│   Level 3: Git Restore (nuclear option)                 │
│   ─────────────────────────────────────                 │
│   • git checkout -- <file>    (discard uncommitted)     │
│   • git stash                 (save for later)          │
│   • git reset --hard HEAD~1   (undo last commit)        │
│   • Works for: Manual edits, multiple sessions          │
│                                                         │
│   Level 2: /rewind (session undo)                       │
│   ─────────────────────────────                         │
│   • Reverts Claude's recent file changes                │
│   • Works within current session only                   │
│   • Doesn't touch git commits                           │
│   • Works for: Bad code generation, wrong direction     │
│                                                         │
│   Level 1: Reject Change (inline)                       │
│   ────────────────────────────                          │
│   • Press 'n' when reviewing diff                       │
│   • Change never applied                                │
│   • Works for: Catching issues before they happen       │
│                                                         │
└─────────────────────────────────────────────────────────┘
```

**When to use each level**:

| Scenario | Recovery Level | Command |
|----------|----------------|---------|
| Claude proposed bad code | Level 1 | Press `n` |
| Claude made changes, want to undo | Level 2 | `/rewind` |
| Changes committed, need full rollback | Level 3 | `git reset` |
| Experimental branch went wrong | Level 3 | `git checkout main` |
| Context corrupted, strange behavior | Fresh start | `/clear` + restate goal |

**Pro tip**: The `/rewind` command shows a list of changes to undo. You can selectively revert specific files rather than all changes.

### Checkpoint Pattern: Safe Experimentation

For systematic experimentation, use the checkpoint pattern to create safe restore points:

```
┌─────────────────────────────────────────────────────────┐
│              CHECKPOINT WORKFLOW                        │
├─────────────────────────────────────────────────────────┤
│                                                         │
│   1. Create checkpoint                                  │
│   ──────────────────                                    │
│   git stash push -u -m "checkpoint-before-refactor"     │
│   (saves all changes including untracked files)         │
│                                                         │
│   2. Experiment freely                                  │
│   ──────────────────                                    │
│   Try risky refactoring, architectural changes, etc.    │
│   If it works → commit normally                         │
│   If it fails → restore checkpoint                      │
│                                                         │
│   3. Restore checkpoint                                 │
│   ──────────────────                                    │
│   git stash list              # find your checkpoint    │
│   git stash apply stash@{0}   # restore without delete  │
│   # or                                                  │
│   git stash pop stash@{0}     # restore and delete      │
│                                                         │
└─────────────────────────────────────────────────────────┘
```

**Automated checkpoint**: Create a Stop hook to auto-checkpoint on session end:

```bash
# .claude/hooks/auto-checkpoint.sh
# See: examples/hooks/bash/auto-checkpoint.sh

# Automatically creates git stash on session end
# Naming: claude-checkpoint-{branch}-{timestamp}
# Logs to: ~/.claude/logs/checkpoints.log
```

**Common workflows**:

| Scenario | Workflow |
|----------|----------|
| Risky refactor | Checkpoint → Try → Commit or restore |
| A/B testing approaches | Checkpoint → Try A → Restore → Try B → Compare |
| Incremental migration | Checkpoint → Migrate piece → Test → Repeat |
| Prototype exploration | Checkpoint → Experiment → Discard cleanly |

**Benefits over branching**:
- Faster than creating feature branches
- Preserves uncommitted changes
- Lightweight for quick experiments
- Works across multiple files

## 2.5 Model Selection & Thinking Guide

Choosing the right model for each task is the fastest ROI improvement most Claude Code users can make. One decision per task, no overthinking.

_Quick jump:_ [Decision Table](#decision-table) · [Effort Levels](#effort-levels) · [Model per Agent](#model-per-agent-patterns) · [When Thinking Helps](#when-thinking-helps-vs-wastes-tokens)

> **Cross-references**: [OpusPlan Mode](#opusplan-mode) · [Rev the Engine](#rev-the-engine) · [Cost Awareness](#cost-awareness--optimization)

---

### Decision Table

| Task | Model | Effort | Est. cost/task |
|------|-------|--------|----------------|
| Rename, format, boilerplate | Haiku | low | ~$0.02 |
| Generate unit tests | Haiku | low | ~$0.03 |
| CI/CD PR review (volume) | Haiku | low | ~$0.02 |
| Feature dev, standard debug | Sonnet | medium | ~$0.23 |
| Module refactoring | Sonnet | high | ~$0.75 |
| System architecture | Opus | high | ~$1.25 |
| Critical security audit | Opus | max | ~$2+ |
| Multi-agent orchestration | Sonnet + Haiku | mixed | variable |
| Tasks where Opus 4.8 at max is insufficient | Fable 5 | max | See official docs |

> **Note on costs**: Estimates based on API pricing (Haiku $1/$5 per MTok, Sonnet $3/$15, Opus $5/$25). Pro/Max subscribers pay a flat rate, so prioritize quality over cost. Fable 5 pricing unpublished; check [anthropic.com/pricing](https://www.anthropic.com/pricing). See [Section 2.2](#cost-awareness--optimization) for full pricing breakdown.
>
> **Budget modifier** (Teams Standard/Pro): downgrade one tier per phase (use Sonnet where the table says Opus, Haiku where it says Sonnet for mechanical implementation tasks). Community pattern: *Sonnet for Plan → Haiku for Implementation* on a $25/mo Teams Standard plan.
