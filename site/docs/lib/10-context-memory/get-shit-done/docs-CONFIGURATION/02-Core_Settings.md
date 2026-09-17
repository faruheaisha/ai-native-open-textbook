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
pageSha256: "57cc27f89405d17b6807623cc22fade4ec42d373df359354c6ea45fc3f5e42dd"
contentMode: "local-full"
zh: ""
---

## Core Settings

| Setting | Type | Options | Default | Description |
|---------|------|---------|---------|-------------|
| `mode` | enum | `interactive`, `yolo` | `interactive` | `yolo` auto-approves decisions; `interactive` confirms at each step |
| `granularity` | enum | `coarse`, `standard`, `fine` | `standard` | Controls phase count: `coarse` (3-5), `standard` (5-8), `fine` (8-12) |
| `model_profile` | enum | `quality`, `balanced`, `budget`, `adaptive`, `inherit` | `balanced` | Model tier for each agent (see [Model Profiles](#model-profiles)). `adaptive` was added per [#1713](https://github.com/gsd-build/get-shit-done/issues/1713) / [#1806](https://github.com/gsd-build/get-shit-done/issues/1806) and resolves the same way as the other tiers under runtime-aware profiles. |
| `runtime` | string | `claude`, `codex`, or any string | (none) | Active runtime for [runtime-aware profile resolution](#runtime-aware-profiles-2517). When set, profile tiers (opus/sonnet/haiku) resolve to runtime-native model IDs. Today only the Codex install path emits per-agent model IDs from this resolver; other runtimes (`opencode`, `gemini`, `qwen`, `copilot`, …) consume the resolver at spawn time and gain dedicated install-path support in [#2612](https://github.com/gsd-build/get-shit-done/issues/2612). When unset (default), behavior is unchanged from prior versions. Added in v1.39 |
| `model_profile_overrides.<runtime>.<tier>` | string \| object | per-runtime tier override | (none) | Override the runtime-aware tier mapping for a specific `(runtime, tier)`. Tier is one of `opus`, `sonnet`, `haiku`. Value is either a model ID string (e.g. `"gpt-5-pro"`) or `\{ model, reasoning_effort \}`. See [Runtime-Aware Profiles](#runtime-aware-profiles-2517). Added in v1.39 |
| `models.<phase_type>` | enum | `opus`, `sonnet`, `haiku`, `inherit` | (none) | Per-phase-type model tier. Six accepted slots: `planning`, `discuss`, `research`, `execution`, `verification`, `completion`. Lets you tune at the phase level ("Opus for planning, Sonnet for the rest") without learning agent names. Resolves between `model_overrides` (higher) and `model_profile` (lower); see [Per-Phase-Type Models](#per-phase-type-models-models--added-in-v140). Added in v1.40 ([#3023](https://github.com/gsd-build/get-shit-done/pull/3030)) |
| `dynamic_routing.enabled` | boolean | `true`, `false` | `false` | Master switch for [dynamic routing with failure-tier escalation](#dynamic-routing-with-failure-tier-escalation-dynamic_routing--added-in-v140). When `true`, agents resolve to `tier_models[default_tier]` and escalate one tier up on orchestrator-detected soft failure. Added in v1.40 ([#3024](https://github.com/gsd-build/get-shit-done/pull/3031)) |
| `dynamic_routing.tier_models.<tier>` | enum | `opus`, `sonnet`, `haiku` | (none) | Tier alias for `light`, `standard`, or `heavy`. Used when `dynamic_routing.enabled: true`. Added in v1.40 |
| `dynamic_routing.escalate_on_failure` | boolean | `true`, `false` | `true` | When `false`, escalation is disabled even if `enabled: true` — every attempt uses the default tier. Added in v1.40 |
| `dynamic_routing.max_escalations` | integer | `0`, `1`, `2`, … | `1` | Hard cap on retries per agent invocation. Beyond the cap the resolver returns the cap-tier model. Added in v1.40 |
| `project_code` | string | any short string | (none) | Prefix for phase directory names (e.g., `"ABC"` produces `ABC-01-setup/`). Added in v1.31 |
| `response_language` | string | language code | (none) | Language for agent responses (e.g., `"pt"`, `"ko"`, `"ja"`). Propagates to all spawned agents for cross-phase language consistency. Added in v1.32 |
| `context_window` | number | any integer | `200000` | Context window size in tokens. Set `1000000` for 1M-context models (e.g., `claude-opus-4-7[1m]`). Values `>= 500000` enable adaptive context enrichment (full-body reads of prior SUMMARY.md, deeper anti-pattern reads). Configured via `/gsd-config --advanced`. |
| `context_profile` | string | `dev`, `research`, `review` | (none) | Execution context preset that applies a pre-configured bundle of mode, model, and workflow settings for the current type of work. Added in v1.34 |
| `claude_md_path` | string | any file path | `./CLAUDE.md` | Custom output path for the generated CLAUDE.md file. Useful for monorepos or projects that need CLAUDE.md in a non-root location. Defaults to `./CLAUDE.md` at the project root. Added in v1.36 |
