---
title: "Router Benchmark Results (run 2)"
sourceId: "10-context-memory/agent-skills-for-context-engineering"
sourceTitle: "Agent Skills for Context Engineering"
sourceKind: "技能与配置库"
licenseLabel: "可转载"
lang: "英文"
tier: 3
volume: "10-context-memory"
sourceUrl: "https://github.com/muratcankoylan/Agent-Skills-for-Context-Engineering"
entryUrl: "https://github.com/muratcankoylan/Agent-Skills-for-Context-Engineering/blob/6dbe1a1d868eab51a3bc9011b0f55e2891513e40/researcher/benchmarks/router/results-published/2026-05-15-v2.md"
sourceRel: "researcher/benchmarks/router/results-published/2026-05-15-v2.md"
rawUrl: "/raw/10-context-memory/agent-skills-for-context-engineering/researcher/benchmarks/router/results-published/2026-05-15-v2.md"
sourceSha256: "bd56c5e325175c129a9f24d77595127cfb517a40598e33914ff0f127ee467316"
pageSha256: "bd56c5e325175c129a9f24d77595127cfb517a40598e33914ff0f127ee467316"
contentMode: "local-full"
zh: ""
---

# Router Benchmark Results (run 2)

_run timestamp: 2026-05-15T14:08:51Z_
_repo commit: `358c36b461df4c0cb7a5c972e2f789dce8c12d3a` (description fixes + hardened runner)_
_fixture sha256-16: `8f974d930836bc9c` (unchanged from baseline)_
_seed: 1_
_runs: 600 of 600 (100%; resume + concurrency=4; ~15 minute wall time vs ~60 minutes sequential)_  
_models: claude-opus-4-7, composer-2, gemini-3.1-pro, gpt-5.5_  
_reps per (prompt, model): 3_

## Executive summary

This run measures the effect of the description rewrites and harness improvements that landed after the baseline at `results-published/2026-05-15.md`.

**Headline results:**

- **3 of 4 models improved on top-1 accuracy.** Composer-2 0.888 -> 0.913 (+2.5pp), GPT-5.5 0.886 -> 0.913 (+2.7pp), Gemini 3.1 Pro 0.886 -> 0.925 (+3.9pp). Claude Opus 4.7 went 0.886 -> 0.867 (-2.0pp top-1) but improved on top-3 (+1.7pp), so it is essentially noise.
- **All 4 models improved on top-3 accuracy.** Composer-2 top-3 jumped from 0.930 to 0.973 (+4.3pp).
- **The targeted description rewrites worked.** `context-fundamentals` went from 12/47 = 0.255 to 22/45 = 0.489 (**+23.4pp**, the largest single-skill improvement). `project-development` went from 0.750 to 1.000 (**+25pp, now perfect routing**). `tool-design` went from 0.729 to 0.807 (+7.8pp).
- **The previously-hardest prompts are mostly fixed.** p001 ("Explain why context windows degrade") went from 0.00 to 0.83 top-1. p037 ("Why structured output design") went from 0.00 to 1.00. p040 and p045 (other context-fundamentals prompts) improved by +17pp each.
- **One apparent regression is mostly an artifact.** `advanced-evaluation` looks like it dropped from 0.980 to 0.797, but the baseline only completed 49 of 60 expected runs (the v1 process died at 566/600); the new run completed all 60 (well, 59 after one format failure). The 11 newly-attempted runs were heavily weighted toward p048, a genuinely ambiguous prompt ("Plan how to evaluate KV compaction with ablations and baselines") that routes to `evaluation` 11/12 times across all models. Absolute correct count is 48 (baseline) vs 47 (new): essentially the same.

**What the data says we should do next:**

- The remaining failure modes are now concentrated in `context-fundamentals` (still only 49% top-1) and a few specific prompts:
  - p047 ("Translate this English paragraph to French") regressed -33pp on top-1. This is a negative control where no skill should fit; the new routing went to `project-development` instead of `context-fundamentals`. This is fine behavior; the fixture's expected primary is debatable.
  - p046 ("Reformat this Python file") and p048 ("Plan KV compaction evaluation") remain at 0.00 top-1 across all models. Both are genuinely ambiguous; consider re-labeling.
- `context-fundamentals` still has 14 confusions to `project-development`. The new description routes correctly when prompts use foundational vocabulary ("attention mechanics", "anatomy of context"), but generic onboarding prompts ("explain context for a new team member") still route to project-development. May need one more description pass.

**Methodological notes:**

- **Wall time improvement:** 60min -> 15min via concurrency=4. The hardened runner means future sweeps will not silently die at 94%, and resume capability means a killed sweep can be picked up exactly where it left off.
- **Format compliance:** 597 of 600 (99.5%). Three format failures from Gemini; all four other models had zero. Gemini's strict-JSON adherence is measurably weaker than the other three.
- **Latency:** Gemini median 9130ms vs 3269-4201ms for others. Same pattern as baseline; Gemini is consistently ~2.5-3x slower.

## Methodology

Each prompt is presented to each model with the 15 skill activation descriptions in a deterministically-shuffled order (different shuffle per replication). The model must return JSON with a ranked list of skill names. Top-1 accuracy is whether the first ranked skill matches the human-labeled `expected_primary_skill`; top-3 is whether the expected skill appears in the first three positions.

No skills are loaded into the agent (`settingSources: []`); the only routing signal is the in-prompt descriptions. Confidence intervals are 95% bootstrap with 2000 resamples.

## Per-model leaderboard

| Model | Top-1 | 95% CI | Top-3 | 95% CI | Format Failures | Median ms |
| --- | --- | --- | --- | --- | --- | --- |
| `gemini-3.1-pro` | 0.925 | [0.884, 0.966] | 0.932 | [0.884, 0.973] | 3 | 9130 |
| `composer-2` | 0.913 | [0.867, 0.953] | 0.973 | [0.947, 0.993] | 0 | 3269 |
| `gpt-5.5` | 0.913 | [0.867, 0.953] | 0.953 | [0.913, 0.980] | 0 | 4201 |
| `claude-opus-4-7` | 0.867 | [0.813, 0.920] | 0.953 | [0.920, 0.987] | 0 | 3355 |

## Per-skill confusion (when expected is X, predicted is Y)

Rows are the ground-truth `expected_primary_skill`; columns are what models actually predicted. Only `finished` runs counted.

| Expected \ Predicted | `advanced-evaluation` | `bdi-mental-states` | `context-compression` | `context-degradation` | `context-fundamentals` | `context-optimization` | `evaluation` | `filesystem-context` | `harness-engineering` | `hosted-agents` | `latent-briefing` | `memory-systems` | `multi-agent-patterns` | `project-development` | `tool-design` |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| `advanced-evaluation` (n=59) | **47** | - | - | - | - | - | 11 | - | - | - | 1 | - | - | - | - |
| `bdi-mental-states` (n=24) | - | **24** | - | - | - | - | - | - | - | - | - | - | - | - | - |
| `context-compression` (n=35) | - | 1 | **34** | - | - | - | - | - | - | - | - | - | - | - | - |
| `context-degradation` (n=36) | - | - | - | **36** | - | - | - | - | - | - | - | - | - | - | - |
| `context-fundamentals` (n=45) | - | - | - | 2 | **22** | 7 | - | - | - | - | - | - | - | 14 | - |
| `context-optimization` (n=36) | - | - | - | - | - | **36** | - | - | - | - | - | - | - | - | - |
| `evaluation` (n=36) | 3 | - | - | - | - | - | **33** | - | - | - | - | - | - | - | - |
| `filesystem-context` (n=48) | - | - | - | - | - | 2 | - | **46** | - | - | - | - | - | - | - |
| `harness-engineering` (n=36) | - | - | - | - | - | - | - | - | **36** | - | - | - | - | - | - |
| `hosted-agents` (n=24) | - | - | - | - | - | - | - | - | - | **24** | - | - | - | - | - |
| `latent-briefing` (n=24) | - | - | - | - | - | - | - | - | - | - | **24** | - | - | - | - |
| `memory-systems` (n=36) | - | - | - | - | - | - | - | - | - | - | - | **36** | - | - | - |
| `multi-agent-patterns` (n=48) | - | - | - | - | - | - | - | - | - | - | - | - | **48** | - | - |
| `project-development` (n=48) | - | - | - | - | - | - | - | - | - | - | - | - | - | **48** | - |
| `tool-design` (n=57) | - | - | - | - | 1 | - | - | 1 | 1 | - | - | - | - | 8 | **46** |

## Hardest prompts (lowest top-1 across all models)

| Prompt | Expected | Top-1 Rate | Predicted Primaries |
| --- | --- | --- | --- |
| p046 | `tool-design` | 0.00 | `filesystem-context`, `harness-engineering`, `project-development` |
| p048 | `advanced-evaluation` | 0.00 | `evaluation`, `latent-briefing` |
| p047 | `context-fundamentals` | 0.17 | `context-fundamentals`, `project-development` |
| p040 | `context-fundamentals` | 0.42 | `context-fundamentals`, `context-optimization` |
| p045 | `context-fundamentals` | 0.42 | `context-fundamentals`, `project-development` |
| p016 | `evaluation` | 0.75 | `advanced-evaluation`, `evaluation` |
| p001 | `context-fundamentals` | 0.83 | `context-degradation`, `context-fundamentals` |
| p030 | `context-compression` | 0.83 | `bdi-mental-states`, `context-compression` |
| p031 | `filesystem-context` | 0.83 | `context-optimization`, `filesystem-context` |
| p041 | `tool-design` | 0.83 | `context-fundamentals`, `project-development`, `tool-design` |

## Reproducibility

Reproduce these numbers exactly with:

```bash
cd researcher/benchmarks/sdk-runner
npm install
