---
title: "Agent Note: Skill system — progressive disclosure instructions for agents"
sourceId: "09-harness/deepseek-harness"
sourceTitle: "DeepSeek Harness"
sourceKind: "工程手册"
licenseLabel: "可转载"
lang: "中英混排"
tier: 2
volume: "09-harness"
sourceUrl: "https://github.com/deepseek-ai/deepseek-harness"
entryUrl: "https://github.com/deepseek-ai/deepseek-harness/blob/c291e7961a515f6d7af9304e7fd1d257929aef26/.agents/notes/archived/feature/2026-07-05-skill-system.md"
sourceRel: ".agents/notes/archived/feature/2026-07-05-skill-system.md"
rawUrl: "/raw/09-harness/deepseek-harness/.agents/notes/archived/feature/2026-07-05-skill-system.md"
sourceSha256: "abee9fe973b9603f0a60e7efc034ab90910e3807d87862f8e7023b76624e09b1"
pageSha256: "abee9fe973b9603f0a60e7efc034ab90910e3807d87862f8e7023b76624e09b1"
contentMode: "local-full"
zh: ""
---

# Agent Note: Skill system — progressive disclosure instructions for agents

Status: implemented
Archived: 2026-09-04

English | [中文](/lib/09-harness/deepseek-harness/_agents-notes-archived-feature-2026-07-05-skill-system.zh)

## Problem

Agent products have converged on a skill pattern: keep the request prompt small by listing only available instruction bundles, then load the full body when the model decides a task matches. Codex, Claude Code, OpenCode, and Kimi Code differ in details, but all separate discovery metadata from complete instructions so a workspace can carry reusable behavior without paying the full prompt cost on every turn.

DeepSeek Harness uses the same primitive so project-specific review, plugin-authoring, and tool-usage guidance lives next to the workspace or the user's agent configuration instead of being hard-coded into the loop.

## Decision

`@deepseek-ai/dsh-skill` is the pure provider registry (`ctx.skills`), `@deepseek-ai/dsh-skill-filesystem` is the shipped local filesystem provider, and `@deepseek-ai/dsh-tool-skill` owns the durable session catalog and model-facing loader tool. `dsh-base` loads the registry, local provider, and consumer as separate rows so its profiles get the same behavior while embedded or remote providers contribute skills without changing the registry or consumer. Each row exposes only its owning package's configuration.

Dedicated packaged providers can contribute immutable skills without filesystem discovery. The shipped CLI declares `@deepseek-ai/dsh-skill-badge` disabled by default; enabling its composition row contributes the official badge instructions through the same registry and consumer (see [the package contract](https://github.com/deepseek-ai/deepseek-harness/blob/c291e7961a515f6d7af9304e7fd1d257929aef26/packages/skill/skill-badge/README.md)).

Provider plugins register synchronously during `apply()`. Provider membership is direct effect-owned state: registration and disposal invalidate completed catalogs synchronously, and discovery reads the current provider map on demand rather than observing registry-change events. Provider catalogs return ranked candidates from awaited `list()` calls, where remote providers perform initialization, authentication, and discovery while honoring the lookup abort signal. The registry validates each candidate, resolves same-name skills first-wins by rank, provider registration order, and provider-local order, then sorts summaries by skill name for deterministic consumers. It caches only completed catalog snapshots and retries when a provider/runtime revision changes during discovery, so an unload cannot freeze a stale, unresolvable skill into a session catalog. Runtime `ctx.skills.register(...)` remains a convenience for embedded in-process skills and uses project-over-user priority; `runtime` is reserved as the registry-owned provider name.

The local provider scans cwd-sensitive project roots, custom roots, and user roots in first-wins rank order: project `.dsh`, project `.agents`, `customSkillDirs`, user `.dsh`, then user `.agents`. The user `.dsh/skills` scan skips `.system` so a system-owned directory is not treated as normal user content. The local provider does not synthesize built-in system skills; configured bundled roots and dedicated providers supply additional skills.

Each skill is either `<name>/SKILL.md` or `<name>.md` with YAML frontmatter. `name` and `description` are required; `whenToUse`, `metadata`, `disable-model-invocation`, and `user-invocable` are optional. Names are kebab-case. The invocation fields project into a typed nested policy as defined by the [independent model and user invocation decision](https://github.com/deepseek-ai/deepseek-harness/blob/c291e7961a515f6d7af9304e7fd1d257929aef26/.agents/notes/archived/feature/2026-07-28-skill-invocation-policy.md); the parser rejects the old camel-case spellings. YAML frontmatter is parsed with the `yaml` package instead of `js-yaml` or a hand-written parser: `yaml` is the already-declared modern parser for this package's limited frontmatter needs, and a narrow parser would either reject valid YAML users expect to work or grow into an unreviewed YAML subset.

Local skill filesystem I/O goes through `ctx.fs` when a filesystem service is loaded: project-root lookup probes `.git` with `resolve` and `stat`, root discovery uses `listDir`, and skill reads use `readText`. The Node filesystem remains a fallback for minimal contexts that mount `dsh-skill-filesystem` without the fs seam. Missing roots, unreadable or malformed skill files, and transient provider `list()` failures degrade to warn-and-skip so one bad source does not make every agent request fail; malformed candidates still fail fast because they are provider contract violations.
