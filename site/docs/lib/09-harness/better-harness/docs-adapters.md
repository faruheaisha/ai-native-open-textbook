---
title: "Host Adapter Matrix"
sourceId: "09-harness/better-harness"
sourceTitle: "Better Harness（QoderAI）"
sourceKind: "工程手册"
licenseLabel: "可转载"
lang: "英文"
tier: 2
volume: "09-harness"
sourceUrl: "https://github.com/QoderAI/better-harness"
entryUrl: "https://github.com/QoderAI/better-harness/blob/e1538c15a98856b3349f365d951f4fa0bcc33f24/docs/adapters/README.md"
sourceRel: "docs/adapters/README.md"
rawUrl: "/raw/09-harness/better-harness/docs/adapters/README.md"
sourceSha256: "02282e3be83390bbd38e77e80b36c5e9bb09173fc55f3e29903c43d63f5c6dfd"
pageSha256: "02282e3be83390bbd38e77e80b36c5e9bb09173fc55f3e29903c43d63f5c6dfd"
contentMode: "local-full"
zh: ""
---

# Host Adapter Matrix

This is the single entry point for Claude Code, Augment/Auggie, Codex, Qoder,
Cursor, Qwen, GitHub Copilot, Pi, Kimi Code, WorkBuddy, and Grok host
boundaries, plus the
DeepSeek Harness (DSH) verified install/discovery, developer-preview
configured-assets, session, Asset Practices, neutral Harness analysis, and
Evidence Bundle slices, plus qualified portable HTML report rendering. Do not
create `docs/adapters/claude-code.md`, `docs/adapters/codex.md`,
`docs/adapters/qoder.md`, `docs/adapters/cursor.md`, `docs/adapters/qwen.md`,
`docs/adapters/copilot.md`, `docs/adapters/pi.md`,
`docs/adapters/kimi-code.md`, `docs/adapters/workbuddy.md`, or
`docs/adapters/grok.md` by default.

Adding another host? Follow
[Contributing a New Coding Agent Host](https://github.com/QoderAI/better-harness/blob/e1538c15a98856b3349f365d951f4fa0bcc33f24/docs/adapters/contributing-new-coding-agent.md) before
editing the matrix. The guide separates shell, configured-asset, session,
output, and packaging claims and links reviewed Qwen Code and GitHub Copilot
pull requests as worked examples.

Host differences enter only this matrix, capability-local configured-asset
providers, real session-evidence adapters, and output modes. Canonical product
judgment stays in `skills/`, `models/`, `references/`, `templates/`, and
`scripts/<capability>/`.

The `@qoder-ai/better-harness` npm package includes seven filesystem metadata
roots for Qoder, Claude Code, Codex, Cursor, Qwen, Copilot, and Kimi Code,
plus Pi install metadata in the existing `package.json`.
The generated Qoder runtime bundle includes only the Qoder shell,
`.qoder-plugin/`; non-Qoder generated host artifacts remain source-local.
Claude Code installs its shell through the repository's native marketplace
manifest. Pi installs the repository as a pi package through the `pi` manifest
in `package.json`. Kimi Code installs the repository as a plugin through the
`.kimi-plugin/plugin.json` manifest with `/plugins install <source>` (or a
manual `skills/better-harness` copy/symlink into `~/.kimi-code/skills/` or a
project `.kimi-code/skills/`), then runs `/skill:better-harness`.

| Host | Positioning | Shell | Configured Assets | Session Evidence | Default Output | Rules / Prompts | Smoke |
| --- | --- | --- | --- | --- | --- | --- | --- |
| Claude Code | Analysis-capable source-local host | `.claude-plugin/` | `scripts/agent-customize/providers/claude.mjs` | `scripts/session-analysis/platforms/claude.mjs` | self-contained HTML + Markdown | `.claude` + `CLAUDE.md` + Plugin assets | `claude plugin validate --strict .` -> isolated install/discovery -> configured-asset baseline -> validated `html` render |
| Augment/Auggie | Partial session adapter | none | unavailable | `scripts/session-analysis/platforms/augment.mjs`; workspace-qualified local JSON sessions from Auggie `0.36.0` | Harness Inspector self-contained HTML | unavailable; no Skill or prompt discovery claim | `auggie --version` -> `session-analysis --platform augment sources` -> bounded Inspector render |
| Codex | Analysis-capable source-local host | `.codex-plugin/` | `scripts/agent-customize/providers/codex.mjs` | `scripts/session-analysis/platforms/codex.mjs` | self-contained HTML + Markdown | `.codex` + `.agents` + `AGENTS.md` | `harness prepare --platform codex` -> finalize with `html-report` validation |
| Qoder | First-class product host | `.qoder-plugin/` | `scripts/agent-customize/providers/qoder.mjs` | `scripts/session-analysis/platforms/qoder.mjs` | `better-harness` | `.qoder/rules` + `AGENTS.md` + output templates | `better-harness harness render --mode qoder-canvas --validate` |
| Cursor | Canvas-capable source-local host | `.cursor-plugin/` | `scripts/agent-customize/providers/cursor.mjs` | `scripts/session-analysis/platforms/cursor.mjs` | `cursor-canvas` | `.cursor` + `.codex` compatibility + `AGENTS.md` | native `cursor-agent --help` contract check -> unavailable install plan -> Cursor evidence bundle -> validated `cursor-canvas` render |
| Qwen Code | Analysis-capable source-local host | `qwen-extension.json` | `scripts/agent-customize/providers/qwen.mjs` | `scripts/session-analysis/platforms/qwen.mjs` | self-contained HTML + Markdown | `.qwen` + `QWEN.md` + `AGENTS.md` | `harness prepare --platform qwen` -> finalize with `html-report` validation |
| GitHub Copilot | Analysis-capable source-local host | `.github/plugin/` | `scripts/agent-customize/providers/copilot.mjs` | `scripts/session-analysis/platforms/copilot.mjs` | self-contained HTML + Markdown | `.github` + `AGENTS.md` + `~/.copilot` | `copilot plugin marketplace add .` -> `copilot plugin install better-harness@better-harness` -> configured-asset baseline -> validated `html` render |
| Pi | Analysis-capable source-local host | `pi` manifest in `package.json` | `scripts/agent-customize/providers/pi.mjs` | `scripts/session-analysis/platforms/pi.mjs` | self-contained HTML + Markdown | `.pi` + `.agents` + `AGENTS.md` | `pi install <source>` or `pi -e <source>` -> `/better-harness` prompt template -> validated `html` render |
| Kimi Code | Analysis-capable source-local host | `.kimi-plugin/plugin.json` | `scripts/agent-customize/providers/kimi.mjs` | `scripts/session-analysis/platforms/kimi.mjs` | self-contained HTML + Markdown | `AGENTS.md` + `~/.kimi-code/skills` + project `.kimi-code/skills`/`.kimi/skills` + `~/.kimi-code/mcp.json` | `harness evidence-bundle --platform kimi` -> validated `html` render |
| WorkBuddy | Analysis-capable source-local host | none (skills install into `~/.workbuddy/skills`) | `scripts/agent-customize/providers/workbuddy.mjs` | `scripts/session-analysis/platforms/workbuddy.mjs` | self-contained HTML + Markdown | `~/.workbuddy` `AGENTS.md` + identity files + `.agents` + `AGENTS.md` | `session-analysis --platform workbuddy sources` -> validated `html` render |
| Grok | Analysis-capable source-local host | none (skills install into `~/.grok/skills`) | `scripts/agent-customize/providers/grok.mjs` | `scripts/session-analysis/platforms/grok.mjs` | self-contained HTML + Markdown | `~/.grok` + `.grok` + `.agents` + `AGENTS.md` | `session-analysis --platform grok sources` -> skill symlink -> validated `html` render |
| DeepSeek Harness (DSH) | Verified install/discovery for headless/base and Web `standard`/`code`/`cordis`; shared read-only analysis over developer-preview configured and Session evidence | local DSH Cordis policy at `scripts/dsh-skill-discovery/index.mjs`; no lifecycle shell | `scripts/agent-customize/providers/dsh.mjs`; filesystem Skills and cwd-sensitive Instructions, configured-not-observed | `scripts/session-analysis/platforms/dsh.mjs`; `dsh-v1` for the audited format-0 session-evidence slice from DSH `dsh-v0.1.0-rc.7` and `dsh-v0.1.0-rc.8`, raw `.jsonl` and feature-detected `.jsonl.zstd` | self-contained HTML + Markdown | canonical Skill from the complete root; model Skill calls rejected | `npm run test:dsh-native`; `npm run test:dsh-configured-assets-native`; validated portable `html` render and native output-root inertness |

## Read-only Plugin Lifecycle

`better-harness plugin status`, `plan`, and `verify` expose a Better Harness-only
view over these adapters. The shadow declarations in `scripts/host-support/`
record lifecycle evidence without replacing this matrix while ADR-0002 is
proposed. Each host declaration lives in `scripts/host-support/profiles/<host>.mjs`
and uses the shared typed constructors rather than copying registry logic. Each
module is locally validated and deeply frozen before registry composition;
aggregate validation adds only cross-host id and alias uniqueness. The
same profile declares its provider home option and each surface's observation
kind, so status collection does not carry a second host lookup table or
host-specific branches. Lifecycle status and plan also share one private target
resolver for aliases, explicit host requirements, surfaces, and scopes, keeping
usage diagnostics consistent as profiles grow. Plugin leaf metadata is declared
once and projected into the root command registry; runtime definitions bind the
same entries to executors and human renderers without leaf-name branches. Every
observed or inventory-failure status instance passes through one validated row
factory, so host additions cannot invent a second status shape. Every lifecycle
plan likewise passes through one transition and validation model: mutation
steps declare external host-plugin-state effects, while follow-up verification
steps declare read-only host-observation effects. The thin plan core does not
copy lifecycle state policy when a host profile is added.
Plans never execute and always preserve native surface differences:

| Host surface | Lifecycle disposition |
| --- | --- |
| Claude Code CLI | Native install, update, remove, and details verification steps |
| Codex CLI / Desktop | Native CLI argv; manual Desktop UI steps |
| Qoder Desktop / CLI | Bundled Desktop; manual CLI install, verified list/remove, unavailable update |
| Cursor Agent | Session-only evidence; install remains unavailable while the local help contract is stale |
| Qwen Code | Native extension install/list argv; update and remove remain unavailable until safe scope-targeted mutation semantics are evidenced |
| GitHub Copilot CLI | Native marketplace install, list, update, and uninstall argv |
| Pi CLI / CLI session | Persistent user/project install guidance and inventory; separate `pi -e` session-only activation whose update/remove operations are not applicable |
| WorkBuddy | `PLUGIN_LIFECYCLE_UNSUPPORTED`; adapter evidence remains available |

Kimi Code, Grok, and DSH are absent from this table on purpose: none has a
validated native lifecycle contract yet, so lifecycle targets reject them with
`UNKNOWN_HOST` instead of borrowing another host's install route. Kimi Code and
Grok retain their configured-asset and session evidence. DSH retains its
bounded verified discovery, configured-assets, and partial session-evidence
slices, but has no lifecycle profile or native lifecycle claim.

The lifecycle commands do not read raw session transcripts, contact a registry,
edit host settings, or register an `apply` path.

## Discovery And Evidence

- Claude Code discovers the canonical root `skills/` directory through
  `.claude-plugin/plugin.json`; `.claude-plugin/marketplace.json` makes the
  repository installable with Claude's native plugin commands. Its
  capability-owned session adapter reads workspace-matching local Claude
  transcripts when present; the shell does not own that evidence. Configured
  user/project/Plugin assets are inventoried through
  `scripts/agent-customize/providers/claude.mjs`; installed Plugin records are
  kept separate from marketplace catalogs and runtime-use claims.
- Augment/Auggie has a session-only adapter at
  `scripts/session-analysis/platforms/augment.mjs`. It reads bounded JSON files
  from `~/.augment/sessions` (or `--augment-home`), qualifies sessions only from
  recorded IDE workspace folders, repository roots, or terminal cwd, and
  exposes provider-observed user/assistant timing, tool lifecycle, per-inference
  token usage, prompt occupancy, `max_context_tokens`, and explicit
  `history_summary_node` compaction boundaries. Raw prompt, response, thinking,
  tool output, and history-summary text stay omitted by default. The adapter
  does not infer model attribution or parent/subagent ownership from
  session-level settings, `rootTaskUuid`, or credits. No shell, configured-asset,
  lifecycle, installation, Evidence Bundle, generic Harness render, or
  Quickstart support is claimed.
- Qoder configured assets are inventoried from Qoder plugin, rules, commands,
  skills, hooks, and MCP-facing paths through
  `scripts/agent-customize/providers/qoder.mjs`. Session evidence comes from
  `scripts/session-analysis/platforms/qoder.mjs`.
- Codex configured assets are inventoried through
  `scripts/agent-customize/providers/codex.mjs`. Session evidence comes from
  `scripts/session-analysis/platforms/codex.mjs`. The `.codex-plugin/` shell is
  install/discovery metadata included in the public npm package; it does not
  own Codex evidence collection.
- Cursor configured assets are inventoried through
  `scripts/agent-customize/providers/cursor.mjs` and the active
  `.cursor-plugin/` shell, which is included in the public npm package. Session
  evidence comes from
  `scripts/session-analysis/platforms/cursor.mjs`, which keeps transcript,
  metadata, and audit coverage explicit when local identities do not join.
- Qwen Code configured assets are inventoried through
  `scripts/agent-customize/providers/qwen.mjs`. Session evidence comes from
  `scripts/session-analysis/platforms/qwen.mjs`, which reads workspace-matching
  JSONL transcripts under `~/.qwen/projects/<slug>/chats/`. The `qwen-extension.json`
  manifest is native Qwen install/discovery metadata included in the public npm package; it
  does not own Qwen evidence collection.
- GitHub Copilot configured assets are inventoried through
  `scripts/agent-customize/providers/copilot.mjs`, covering `AGENTS.md`,
  `.github/copilot-instructions.md`, `.github/instructions/`, `.github/skills/`,
  `.agents/skills/`, `.github/agents/`, `.github/prompts/`, `.github/hooks/`,
  `.mcp.json`, `.github/mcp.json`, and the user-scope `~/.copilot` equivalents.
  Installed-Plugin records come from the `installedPlugins` array in
  `~/.copilot/config.json` and stay separate from marketplace catalogs and
  runtime-use claims. Session evidence comes from
  `scripts/session-analysis/platforms/copilot.mjs`, which reads
  workspace-matching `~/.copilot/session-state/<id>/events.jsonl` bound through
  each session's `workspace.yaml`. Copilot transcripts record no per-response
  model token usage, and a matched session directory without `events.jsonl`
  stays an explicit partial coverage boundary. `~/.copilot/session-store.db` is
  documented as automatically managed and is not an evidence source. The
  `.github/plugin/` shell is native Copilot install/discovery metadata included
  in the public npm package; it does not own Copilot evidence collection.

- Pi configured assets are inventoried through
  `scripts/agent-customize/providers/pi.mjs`, covering `~/.pi/agent`
  (settings-declared pi packages, skills, prompt templates, extensions, the
  global `AGENTS.md` context file), the shared `.agents/skills` directories,
  and project `.pi` assets. Session evidence comes from
  `scripts/session-analysis/platforms/pi.mjs`, which reads workspace-matching
