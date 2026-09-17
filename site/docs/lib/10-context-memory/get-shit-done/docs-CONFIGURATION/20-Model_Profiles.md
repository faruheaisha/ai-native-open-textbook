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
entryUrl: "https://github.com/gsd-build/get-shit-done/blob/bdcaab2c752d9a33a1a1ca9acf3a3c81fb991815/docs/CONFIGURATION.md"
sourceRel: "docs/CONFIGURATION.md"
rawUrl: "/raw/10-context-memory/get-shit-done/docs/CONFIGURATION.md"
sourceSha256: "3e67baa72c7b00dab65464616eb7f7f38b2c72cad311f0d2b8c6e7ba8e914eb1"
pageSha256: "491adeb9b512e81aa52e145743a215b6398bd6df83040232db70f71d3d130f52"
contentMode: "local-full"
zh: ""
---

## Model Profiles

### Profile Definitions

| Agent | `quality` | `balanced` | `budget` | `inherit` |
|-------|-----------|------------|----------|-----------|
| gsd-planner | Opus | Opus | Sonnet | Inherit |
| gsd-roadmapper | Opus | Sonnet | Sonnet | Inherit |
| gsd-executor | Opus | Sonnet | Sonnet | Inherit |
| gsd-phase-researcher | Opus | Sonnet | Haiku | Inherit |
| gsd-project-researcher | Opus | Sonnet | Haiku | Inherit |
| gsd-research-synthesizer | Sonnet | Sonnet | Haiku | Inherit |
| gsd-debugger | Opus | Sonnet | Sonnet | Inherit |
| gsd-codebase-mapper | Sonnet | Haiku | Haiku | Inherit |
| gsd-verifier | Sonnet | Sonnet | Haiku | Inherit |
| gsd-plan-checker | Sonnet | Sonnet | Haiku | Inherit |
| gsd-integration-checker | Sonnet | Sonnet | Haiku | Inherit |
| gsd-nyquist-auditor | Sonnet | Sonnet | Haiku | Inherit |
| gsd-pattern-mapper | Sonnet | Sonnet | Haiku | Inherit |
| gsd-ui-researcher | Opus | Sonnet | Haiku | Inherit |
| gsd-ui-checker | Sonnet | Sonnet | Haiku | Inherit |
| gsd-ui-auditor | Sonnet | Sonnet | Haiku | Inherit |
| gsd-doc-writer | Opus | Sonnet | Haiku | Inherit |
| gsd-doc-verifier | Sonnet | Sonnet | Haiku | Inherit |

> **All 33 shipped agents have explicit per-profile tier assignments** in the catalog (`sdk/shared/model-catalog.json`). The table above shows a representative subset of the most-used agents. For agents not listed here, `model_overrides` accepts any shipped agent name. The authoritative profile data is derived from `sdk/shared/model-catalog.json` via `get-shit-done/bin/lib/model-catalog.cjs` and `sdk/src/model-catalog.ts`.

### Per-Agent Overrides

Override specific agents without changing the entire profile:

```json
{
  "model_profile": "balanced",
  "model_overrides": {
    "gsd-executor": "opus",
    "gsd-planner": "haiku"
  }
}
```

Valid override values: `opus`, `sonnet`, `haiku`, `inherit`, or any fully-qualified model ID (e.g., `"openai/o3"`, `"google/gemini-2.5-pro"`).

`model_overrides` can be set in either `.planning/config.json` (per-project)
or `~/.gsd/defaults.json` (global). Per-project entries win on conflict and
non-conflicting global entries are preserved, so you can tune a single
agent's model in one repo without re-setting global defaults. This applies
uniformly across Claude Code, Codex, OpenCode, Kilo, and the other
supported runtimes. On Codex and OpenCode, the resolved model is embedded
into each agent's static config at install time — `spawn_agent` and
OpenCode's `task` interface do not accept an inline `model` parameter, so
running `gsd install <runtime>` after editing `model_overrides` is required
for the change to take effect. See issue #2256.

### Per-Phase-Type Models (`models`) — added in v1.41

> Express tuning at the **phase** level (planning, research, execution, verification) without learning the agent taxonomy. Added in [#3023](https://github.com/gsd-build/get-shit-done/pull/3030).

`model_overrides` is per-**agent** (precise but verbose; you have to know that `gsd-codebase-mapper` is research and `gsd-doc-writer` is execution). The `models` block lets you say "Opus for planning and execution, Sonnet for the rest" in two lines:

```json
{
  "model_profile": "balanced",
  "models": {
    "planning": "opus",
    "discuss": "opus",
    "research": "sonnet",
    "execution": "opus",
    "verification": "sonnet",
    "completion": "sonnet"
  },
  "model_overrides": {
    "gsd-codebase-mapper": "haiku"
  }
}
```

#### Phase-type → agent mapping

| Phase type | Agents |
|---|---|
| `planning` | `gsd-planner`, `gsd-roadmapper`, `gsd-pattern-mapper` |
| `discuss` | (reserved — no subagent today) |
| `research` | `gsd-phase-researcher`, `gsd-project-researcher`, `gsd-research-synthesizer`, `gsd-codebase-mapper`, `gsd-ui-researcher` |
| `execution` | `gsd-executor`, `gsd-debugger`, `gsd-doc-writer` |
| `verification` | `gsd-verifier`, `gsd-plan-checker`, `gsd-integration-checker`, `gsd-nyquist-auditor`, `gsd-ui-checker`, `gsd-ui-auditor`, `gsd-doc-verifier` |
| `completion` | (reserved — no subagent today) |

`discuss` and `completion` are accepted by the schema for forward compatibility; setting them today is a no-op until a subagent maps to them.

#### Resolution precedence (highest → lowest)

```text
1. model_overrides[<agent>]              ← per-agent; full IDs; targeted exception
2. dynamic_routing.tier_models[<tier>]   ← when enabled (see §Dynamic Routing)
3. models[<phase_type>]                  ← coarse phase-level tier (this section)
4. model_profile (per-agent col)         ← global tier strategy
5. Runtime default                       ← when nothing else applies
```

The five layers compose top-down: `model_profile` is the base tier, `models[<phase_type>]` overrides at the phase level, `dynamic_routing` (when enabled) escalates per-attempt on soft failure, `model_overrides[<agent>]` carves per-agent exceptions at the top, and the runtime default applies when nothing else does. In the example above, all five research agents resolve to `sonnet` *except* `gsd-codebase-mapper`, which the per-agent override pins to `haiku`. `dynamic_routing` is disabled by default — when off (`enabled: false` or block omitted), this section's behavior is unchanged from today.

#### Accepted values

`models.<phase_type>` accepts only tier aliases:

| Value | Effect |
|---|---|
| `"opus"` / `"sonnet"` / `"haiku"` | Standard tier — runtime resolution maps to the active runtime's model for that tier |
| `"inherit"` | Agents in this phase follow the session model (same semantics as `model_profile: "inherit"`) |

If you need a fully-qualified model ID (`"openai/gpt-5"`, `"google/gemini-2.5-pro"`), use `model_overrides` per agent instead. `models.*` is intentionally tier-only so the runtime-aware mapping stays correct on Codex / OpenCode / Gemini CLI installs.

#### When to use which

| You want | Use |
|---|---|
| One global tier strategy ("balanced everywhere") | `model_profile` |
| Coarse phase-level tuning ("Opus for planning") | `models.<phase_type>` |
| Per-agent precision ("force haiku on the codebase mapper") | `model_overrides[<agent>]` |
| Full model ID for a specific agent | `model_overrides[<agent>]: "openai/gpt-5"` |

Mix freely — the precedence rule above resolves any overlap deterministically.

#### Validation

`config-set` rejects unknown phase-types:

```bash
$ gsd config-set models.deployment opus
Error: 'models.deployment' is not a valid config key

# Valid:
$ gsd config-set models.research sonnet
```

Direct edits to `.planning/config.json` are looser — the resolver simply ignores values it doesn't recognize and falls through to the profile tier — so a typo doesn't silently break tier resolution.

### Dynamic Routing with Failure-Tier Escalation (`dynamic_routing`) — added in v1.41

> Start cheap, escalate only when the agent fails the gate. Added in [#3024](https://github.com/gsd-build/get-shit-done/pull/3031).

`dynamic_routing` lets you pay for the cheap tier by default and only escalate to the more expensive tier when the orchestrator detects a soft failure (verification inconclusive, plan-check FLAG, etc.).

```json
{
  "dynamic_routing": {
    "enabled": true,
    "tier_models": {
      "light":    "haiku",
      "standard": "sonnet",
      "heavy":    "opus"
    },
    "escalate_on_failure": true,
    "max_escalations": 1
  }
}
```

#### Agent default tiers

Each agent in `MODEL_PROFILES` declares one of three default tiers. The resolver picks `tier_models[default_tier]` for the first attempt.

| Tier | Agents | Use case |
|---|---|---|
| `light` | gsd-codebase-mapper, gsd-doc-classifier, gsd-doc-verifier, gsd-integration-checker, gsd-intel-updater, gsd-nyquist-auditor, gsd-pattern-mapper, gsd-plan-checker, gsd-research-synthesizer, gsd-ui-auditor, gsd-ui-checker | Cheap/fast — pure mappers, scanners, low-stakes audits |
| `standard` | gsd-advisor-researcher, gsd-ai-researcher, gsd-code-fixer, gsd-code-reviewer, gsd-doc-synthesizer, gsd-doc-writer, gsd-domain-researcher, gsd-eval-auditor, gsd-executor, gsd-phase-researcher, gsd-project-researcher, gsd-ui-researcher, gsd-verifier | Default workhorse — research, writing, primary verification |
| `heavy` | gsd-assumptions-analyzer, gsd-debug-session-manager, gsd-debugger, gsd-eval-planner, gsd-framework-selector, gsd-planner, gsd-roadmapper, gsd-security-auditor, gsd-user-profiler | Deep reasoning — already at top, can't escalate further |

#### Escalation flow

```text
1. Orchestrator spawns agent → resolver returns tier_models[default_tier]
2. Soft failure?
   ├─ no → ✓ done (cheap path)
   └─ yes → orchestrator re-spawns at attempt+1
            → resolver returns tier_models[next_tier_up]
            → cap at max_escalations
3. Hard failure (exception/crash) → bypass escalation, surface immediately
```

If `dynamic_routing.escalate_on_failure: false`, soft failures do **not** advance the tier — every respawn keeps using `tier_models[default_tier]` regardless of the attempt counter. The kill-switch overrides the soft-failure branch above.

`light → standard → heavy → heavy` (heavy stays at heavy; can't go further).

#### Resolution precedence (highest → lowest)

1. **`model_overrides[<agent>]`** — full IDs accepted; targeted exception
2. **`dynamic_routing.tier_models[<tier>]`** (when `enabled: true`)
3. **`models[<phase_type>]`** — coarse phase-level (#3023)
4. **`model_profile`** — per-agent column from active profile
5. **Runtime default**

The `dynamic_routing` block is **disabled by default** — `enabled: false` (or omitting the block) preserves today's static resolution exactly.

#### Settings

| Key | Type | Default | Description |
|---|---|---|---|
| `dynamic_routing.enabled` | boolean | `false` | Master switch. When `true`, the dynamic-routing resolver is used for tier selection. |
| `dynamic_routing.tier_models.light` | enum | (none) | Tier alias for the light tier. Typically `haiku`. |
| `dynamic_routing.tier_models.standard` | enum | (none) | Tier alias for standard. Typically `sonnet`. |
| `dynamic_routing.tier_models.heavy` | enum | (none) | Tier alias for heavy. Typically `opus`. |
| `dynamic_routing.escalate_on_failure` | boolean | `true` | When false, escalation is disabled (every attempt uses the default tier). |
| `dynamic_routing.max_escalations` | integer | `1` | Hard cap on retries per agent invocation. Prevents runaway loops. |

#### When to use which

| You want | Use |
|---|---|
| One tier strategy across all agents | `model_profile` |
| Coarse phase-level tuning | `models.<phase_type>` |
| Per-agent precision (full IDs) | `model_overrides` |
| **Cheap-by-default, escalate only on failure** | **`dynamic_routing`** |

`dynamic_routing` is structurally a *cost lever*: you pay Opus rates only for the hard cases that warrant Opus. Compose with `model_overrides` for per-agent exceptions (override always wins).

### Non-Claude Runtimes (Codex, OpenCode, Gemini CLI, Kilo)

> **Codex CLI minimum supported version: `0.130.0`** (issue [#3562](https://github.com/gsd-build/get-shit-done/issues/3562)).
>
> [Codex CLI 0.130.0](https://github.com/openai/codex/releases/tag/rust-v0.130.0) (released 2026-05-08) removed extra-skills-roots discovery via [openai/codex#21485](https://github.com/openai/codex/pull/21485). From this version forward, Codex CLI only scans `~/.codex/skills/<name>/SKILL.md`, `<project>/.codex/skills/`, and registered plugin roots for invocable skills. GSD installs the `$gsd-*` surface as `~/.codex/skills/gsd-<name>/SKILL.md` so commands resolve after a Codex restart. Earlier Codex CLI versions can show a duplicate listing (the legacy extra-roots scan plus the user-root copies) — restart Codex and either upgrade to ≥ 0.130.0 or accept the duplicates until you do.

When GSD is installed for a non-Claude runtime, the installer automatically sets `resolve_model_ids: "omit"` in `~/.gsd/defaults.json`. This causes GSD to return an empty model parameter for all agents, so each agent uses whatever model the runtime is configured with. No additional setup is needed for the default case.

If you want different agents to use different models, use `model_overrides` with fully-qualified model IDs that your runtime recognizes:

```json
{
  "resolve_model_ids": "omit",
  "model_overrides": {
    "gsd-planner": "o3",
    "gsd-executor": "o4-mini",
    "gsd-debugger": "o3",
    "gsd-codebase-mapper": "o4-mini"
  }
}
```

The intent is the same as the Claude profile tiers -- use a stronger model for planning and debugging (where reasoning quality matters most), and a cheaper model for execution and mapping (where the plan already contains the reasoning).

**When to use which approach:**

| Scenario | Setting | Effect |
|----------|---------|--------|
| Non-Claude runtime, single model | `resolve_model_ids: "omit"` (installer default) | All agents use the runtime's default model |
| Non-Claude runtime, tiered models | `resolve_model_ids: "omit"` + `model_overrides` | Named agents use specific models, others use runtime default |
| Claude Code with OpenRouter/local provider | `model_profile: "inherit"` | All agents follow the session model |
| Claude Code with OpenRouter, tiered | `model_profile: "inherit"` + `model_overrides` | Named agents use specific models, others inherit |

**`resolve_model_ids` values:**

| Value | Behavior | Use When |
|-------|----------|----------|
| `false` (default) | Returns Claude aliases (`opus`, `sonnet`, `haiku`) | Claude Code with native Anthropic API |
| `true` | Maps aliases to full Claude model IDs (`claude-opus-4-7`) | Claude Code with API that requires full IDs |
| `"omit"` | Returns empty string (runtime picks its default) | Non-Claude runtimes (Codex, OpenCode, Gemini CLI, Kilo) |

### Runtime-Aware Profiles (#2517)

When `runtime` is set, profile tiers (`opus`/`sonnet`/`haiku`) resolve to runtime-native model IDs instead of Claude aliases. This lets a single shared `.planning/config.json` work cleanly across Claude and Codex.

`resolve-model` JSON output includes `reasoning_effort` when the runtime tier resolved for the agent (after phase-type overrides) defines a `reasoning_effort`. Runtime adapters may pass that value to child-agent launch calls that support it; runtimes without explicit support omit it.

**Built-in tier maps:**

| Runtime | `opus` | `sonnet` | `haiku` | reasoning_effort |
|---------|--------|----------|---------|------------------|
| `claude` | `claude-opus-4-7` | `claude-sonnet-4-6` | `claude-haiku-4-5` | (not used) |
| `codex` | `gpt-5.4` | `gpt-5.3-codex` | `gpt-5.4-mini` | `xhigh` / `medium` / `medium` |
| `gemini` | `gemini-3-pro` | `gemini-3-flash` | `gemini-2.5-flash-lite` | (not used) |
| `qwen` | `qwen3-max-2026-01-23` | `qwen3-coder-plus` | `qwen3-coder-next` | (not used) |
| `opencode` | `anthropic/claude-opus-4-7` | `anthropic/claude-sonnet-4-6` | `anthropic/claude-haiku-4-5` | (not used) |
| `copilot` | `claude-opus-4-7` | `claude-sonnet-4-6` | `claude-haiku-4-5` | (not used) |
| `hermes` | `anthropic/claude-opus-4-7` | `anthropic/claude-sonnet-4-6` | `anthropic/claude-haiku-4-5` | (not used) |
| Group B (`kilo`, `cline`, `cursor`, `windsurf`, `augment`, `trae`, `codebuddy`, `antigravity`) | (no built-in default — your runtime handles model selection) | | | |

**Codex example** — one config, tiered models, no large `model_overrides` block:

```json
{
  "runtime": "codex",
  "model_profile": "balanced"
}
```

This resolves `gsd-planner` → `gpt-5.4` (xhigh), `gsd-executor` → `gpt-5.3-codex` (medium), `gsd-codebase-mapper` → `gpt-5.4-mini` (medium). The Codex installer embeds `model = "..."` and `model_reasoning_effort = "..."` in each generated agent TOML.

**Claude example** — explicit opt-in resolves to full Claude IDs (no `resolve_model_ids: true` needed):

```json
{
  "runtime": "claude",
  "model_profile": "quality"
}
```

**Per-runtime overrides** — replace one or more tier defaults:

```json
{
  "runtime": "codex",
  "model_profile": "quality",
  "model_profile_overrides": {
    "codex": {
      "opus": "gpt-5-pro",
      "haiku": { "model": "gpt-5-nano", "reasoning_effort": "low" }
    }
  }
}
```

**Precedence (highest to lowest):**

1. `model_overrides[<agent>]` — explicit per-agent ID always wins.
2. **Runtime-aware tier resolution** (this section) — when `runtime` is set and profile is not `inherit`.
3. `resolve_model_ids: "omit"` — returns empty string when no `runtime` is set.
4. Claude-native default — `model_profile` tier as alias (current default).
5. `inherit` — propagates literal `inherit` for `Task(model="inherit")` semantics.

**Backwards compatibility.** Setups without `runtime` set see zero behavior change — every existing config continues to work identically. Codex installs that auto-set `resolve_model_ids: "omit"` continue to omit the model field unless the user opts in by setting `runtime: "codex"`.

**Unknown runtimes.** If `runtime` is set to a value with no built-in tier map and no `model_profile_overrides[<runtime>]`, GSD falls back to the Claude-alias safe default rather than emit a model ID the runtime cannot accept. To support a new runtime, populate `model_profile_overrides.<runtime>.\{opus,sonnet,haiku\}` with valid IDs.

### Profile Philosophy

| Profile | Philosophy | When to Use |
|---------|-----------|-------------|
| `quality` | Opus for all decision-making, Sonnet for verification | Quota available, critical architecture work |
| `balanced` | Opus for planning only, Sonnet for everything else | Normal development (default) |
| `budget` | Sonnet for code-writing, Haiku for research/verification | High-volume work, less critical phases |
| `inherit` | All agents use current session model | Dynamic model switching, **non-Anthropic providers** (OpenRouter, local models) |
