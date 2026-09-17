---
title: "codex-cli-best-practice"
sourceId: "09-harness/codex-cli-best-practice"
sourceTitle: "Codex CLI Best Practice"
sourceKind: "工程手册"
licenseLabel: "可转载"
lang: "英文"
tier: 2
volume: "09-harness"
sourceUrl: "https://github.com/shanraisshan/codex-cli-best-practice"
entryUrl: "https://github.com/shanraisshan/codex-cli-best-practice/blob/b79f473a188632867354fc793894dfd368a18e48/README.md"
sourceRel: "README.md"
rawUrl: "/raw/09-harness/codex-cli-best-practice/README.md"
sourceSha256: "090e711bcc36301320b6dd18975a8d846c7a52b8c464a3196933394d27ef38b2"
pageSha256: "090e711bcc36301320b6dd18975a8d846c7a52b8c464a3196933394d27ef38b2"
contentMode: "local-full"
zh: "on"
---

# codex-cli-best-practice
from vibe coding to agentic engineering - practice makes codex perfect

-white?style=flat&labelColor=555) 

[![Best Practice](/mirror/ec/ec08fa1f324719239cf93980b84f4f0b1453aecd.svg)](https://github.com/shanraisshan/codex-cli-best-practice/blob/b79f473a188632867354fc793894dfd368a18e48/best-practice/README.md) [![Implemented](/mirror/ef/efeebd2cb4d7f873a01ae5e80c65dc8ab1281051.svg)](https://github.com/shanraisshan/codex-cli-best-practice/blob/b79f473a188632867354fc793894dfd368a18e48/.codex/README.md) [![Orchestration Workflow](/mirror/81/81ac72cfdafe9a2c26acced9759e2dcc42f09a6e.svg)](https://github.com/shanraisshan/codex-cli-best-practice/blob/b79f473a188632867354fc793894dfd368a18e48/lib/09-harness/codex-cli-best-practice/orchestration-workflow-orchestration-workflow/README.md) [![Codex](/mirror/03/038900b3863ddbabca50b11ef0a28765569ecce3.svg)](https://developers.openai.com/codex/overview) [![Community](/mirror/03/0388b535055ec01a1ab2cd1c6e2207ffb743cd8f.svg)](#-tips-and-tricks) ![Click on these badges below to see the actual sources](/mirror/6d/6d9f2276cefe130665938ef30a8e5ace87703cce.svg)<br>
<img src="/mirror/f4/f4f34d68b399b6f956c4be5e817e00cb60dd39a9.svg" height="14"> = Agents · <img src="/mirror/d0/d05c9d5833ebd195c770604d35bd3ef65f5aec76.svg" height="14"> = Commands · <img src="/mirror/b4/b4ac8ce766cb92fa0e98158e05b6d1da1894f1cc.svg" height="14"> = Skills

<div class="tb-zh"><p>徽章入口（可点击跳转）：最佳实践 · 已实现 · 编排工作流 · Codex 官方文档 · 社区；下方图例：A = Agents，C = Commands，S = Skills。</p></div>

  <img src="/mirror/d5/d53dec6003575523123a41b242b60001c19a9882.svg" alt="Codex CLI mascot jumping" width="120" height="100">

## 🧠 CONCEPTS

| Feature | Location | Description |
|---------|----------|-------------|
| <img src="/mirror/d0/d05c9d5833ebd195c770604d35bd3ef65f5aec76.svg" height="14"> [**Commands**](https://developers.openai.com/codex/cli/slash-commands) | `interactive session / slash popup` | Built-in slash commands for session control — examples include `/plan`, `/fast`, `/fork`, `/review`, `/status`, `/mcp`, `/agent`, `/apps`, `/model`, and `/permissions` |
| <img src="/mirror/f4/f4f34d68b399b6f956c4be5e817e00cb60dd39a9.svg" height="14"> [**Subagents**](https://developers.openai.com/codex/subagents) | [`.codex/agents/<name>.toml`](https://github.com/shanraisshan/codex-cli-best-practice/blob/b79f473a188632867354fc793894dfd368a18e48/.codex/agents/README.md) | [![Best Practice](/mirror/ec/ec08fa1f324719239cf93980b84f4f0b1453aecd.svg)](https://github.com/shanraisshan/codex-cli-best-practice/blob/b79f473a188632867354fc793894dfd368a18e48/lib/09-harness/codex-cli-best-practice/best-practice-codex-subagents/README.md) [![Implemented](/mirror/ef/efeebd2cb4d7f873a01ae5e80c65dc8ab1281051.svg)](https://github.com/shanraisshan/codex-cli-best-practice/blob/b79f473a188632867354fc793894dfd368a18e48/.codex/agents/README.md) Custom agents registered under `[agents.<name>]` with dedicated TOML role configs, parallel subagent orchestration, and CSV batch processing · Global settings live under `[agents]` (`max_threads`, `max_depth`, `job_max_runtime_seconds`) · Built-in: `default`, `worker`, `explorer` |
| <img src="/mirror/b4/b4ac8ce766cb92fa0e98158e05b6d1da1894f1cc.svg" height="14"> [**Skills**](https://developers.openai.com/codex/skills) | [`.agents/skills/<name>/SKILL.md`](https://github.com/shanraisshan/codex-cli-best-practice/blob/b79f473a188632867354fc793894dfd368a18e48/.agents/skills/README.md) | [![Best Practice](/mirror/ec/ec08fa1f324719239cf93980b84f4f0b1453aecd.svg)](https://github.com/shanraisshan/codex-cli-best-practice/blob/b79f473a188632867354fc793894dfd368a18e48/lib/09-harness/codex-cli-best-practice/best-practice-codex-skills/README.md) [![Implemented](/mirror/ef/efeebd2cb4d7f873a01ae5e80c65dc8ab1281051.svg)](https://github.com/shanraisshan/codex-cli-best-practice/blob/b79f473a188632867354fc793894dfd368a18e48/.agents/skills/README.md) [Reference](/lib/09-harness/codex-cli-best-practice/docs-SKILLS) Reusable instruction packages with required `name` + `description` metadata and progressive disclosure via `scripts/`, `references/`, `assets/`, and optional `agents/openai.yaml` · Invoke explicitly via `/skills` or `$skill-name`, or implicitly by description match · Built-in examples: `$plan`, `$skill-creator`, `$skill-installer` · Distributed via [Plugins](https://developers.openai.com/codex/plugins) |
| [**Plugins**](https://developers.openai.com/codex/plugins) | `.codex-plugin/plugin.json` | Distributable bundles combining skills + app integrations + MCP servers — local/personal [marketplace](https://developers.openai.com/codex/plugins/build) system · Built-in: `$plugin-creator` · Browse via `/plugins` or Codex App |
| [**Marketplace**](https://developers.openai.com/codex/plugins) ![new](/mirror/af/afbf2d90461c3b48cd24cc9bf0eafcb651fe3815.svg) | `$CODEX_HOME` → `[marketplaces.*]` | [![Best Practice](/mirror/ec/ec08fa1f324719239cf93980b84f4f0b1453aecd.svg)](https://github.com/shanraisshan/codex-cli-best-practice/blob/b79f473a188632867354fc793894dfd368a18e48/lib/09-harness/codex-cli-best-practice/best-practice-codex-marketplace/README.md) Plugin catalog system (v0.121.0+) — `codex plugin marketplace add\|upgrade\|remove` accepts GitHub shorthand, git URLs, and local directories · Manifest at `.agents/plugins/marketplace.json` · Browse installed marketplaces via `/plugins` tabs |
| [**Memories**](https://developers.openai.com/codex/memories) ![new](/mirror/af/afbf2d90461c3b48cd24cc9bf0eafcb651fe3815.svg) | `$CODEX_HOME/memories/` | [![Best Practice](/mirror/ec/ec08fa1f324719239cf93980b84f4f0b1453aecd.svg)](https://github.com/shanraisshan/codex-cli-best-practice/blob/b79f473a188632867354fc793894dfd368a18e48/lib/09-harness/codex-cli-best-practice/best-practice-codex-memory/README.md) Cross-session memory pipeline (v0.119.0+) — enable via `[features] memories = true` and configure under `[memories]` · TUI control via `/memories` (use · generate · reset) · Per-thread toggle persists in state DB · Scope is per-user, not per-project |
| [**Workflows**](https://developers.openai.com/codex/workflows/) | [`.codex/agents/weather-agent.toml`](https://github.com/shanraisshan/codex-cli-best-practice/blob/b79f473a188632867354fc793894dfd368a18e48/.codex/agents/weather-agent.toml) | [![Orchestration Workflow](/mirror/81/81ac72cfdafe9a2c26acced9759e2dcc42f09a6e.svg)](https://github.com/shanraisshan/codex-cli-best-practice/blob/b79f473a188632867354fc793894dfd368a18e48/lib/09-harness/codex-cli-best-practice/orchestration-workflow-orchestration-workflow/README.md) End-to-end usage patterns — explain codebase, fix bugs, write tests, prototype from screenshot, iterate UI, delegate to cloud, code review, update docs |
| [**MCP Servers**](https://developers.openai.com/codex/mcp) | `config.toml` → `[mcp_servers.*]` | [![Best Practice](/mirror/ec/ec08fa1f324719239cf93980b84f4f0b1453aecd.svg)](https://github.com/shanraisshan/codex-cli-best-practice/blob/b79f473a188632867354fc793894dfd368a18e48/lib/09-harness/codex-cli-best-practice/best-practice-codex-mcp/README.md) [![Implemented](/mirror/ef/efeebd2cb4d7f873a01ae5e80c65dc8ab1281051.svg)](https://github.com/shanraisshan/codex-cli-best-practice/blob/b79f473a188632867354fc793894dfd368a18e48/.codex/config.toml) Model Context Protocol for external tools — STDIO + Streamable HTTP servers · OAuth support (`codex mcp login`) · Also acts as MCP **server** via `codex mcp-server` (exposes `codex()` + `codex-reply()` tools) · **MCP Apps** (v0.119.0+): resource reads, elicitations, file-parameter uploads · **Parallel calls** (v0.121.0+): `supports_parallel_tool_calls = true` per server · CLI management: `codex mcp add\|get\|list\|login\|logout\|remove` |
| [**Config**](https://developers.openai.com/codex/config-basic) | [`.codex/config.toml`](https://github.com/shanraisshan/codex-cli-best-practice/blob/b79f473a188632867354fc793894dfd368a18e48/.codex/config.toml) | [![Best Practice](/mirror/ec/ec08fa1f324719239cf93980b84f4f0b1453aecd.svg)](https://github.com/shanraisshan/codex-cli-best-practice/blob/b79f473a188632867354fc793894dfd368a18e48/lib/09-harness/codex-cli-best-practice/best-practice-codex-config/README.md) [![Implemented](/mirror/ef/efeebd2cb4d7f873a01ae5e80c65dc8ab1281051.svg)](https://github.com/shanraisshan/codex-cli-best-practice/blob/b79f473a188632867354fc793894dfd368a18e48/.codex/config.toml) TOML-based layered config system · [Profiles](https://developers.openai.com/codex/config-basic) · [Sandbox](https://developers.openai.com/codex/cli/features) · [Approval Policy](https://developers.openai.com/codex/cli/features) · [Advanced](https://developers.openai.com/codex/config-advanced) (`[features]`, `[otel]`, `[shell_environment_policy]`, `[tui]`, model providers, granular approvals) · [Trust](https://developers.openai.com/codex/config-basic) system for project configs · `developer_instructions` · `model_instructions_file` for custom system prompts |
| [**Rules**](https://developers.openai.com/codex/rules) | `.codex/rules/` | Starlark-based command execution policies via `prefix_rule()` — `allow`, `prompt`, `forbidden` decisions with exact-prefix matching · Test via `codex execpolicy check` · Rules work alongside granular `approval_policy` controls and user-managed approvals |
| [**AGENTS.md**](https://developers.openai.com/codex/guides/agents-md) | [`AGENTS.md`](https://github.com/shanraisshan/codex-cli-best-practice/blob/b79f473a188632867354fc793894dfd368a18e48/AGENTS.md) | [![Best Practice](/mirror/ec/ec08fa1f324719239cf93980b84f4f0b1453aecd.svg)](https://github.com/shanraisshan/codex-cli-best-practice/blob/b79f473a188632867354fc793894dfd368a18e48/lib/09-harness/codex-cli-best-practice/best-practice-codex-agents-md/README.md) Project-level context for Codex CLI — hierarchical discovery from cwd to repo root, capped at 32 KiB (`project_doc_max_bytes`) · `AGENTS.override.md` for personal overrides |
| [**Hooks**](https://developers.openai.com/codex/hooks) ![beta](/mirror/af/afbf2d90461c3b48cd24cc9bf0eafcb651fe3815.svg) | [`.codex/hooks.json`](https://github.com/shanraisshan/codex-cli-best-practice/blob/b79f473a188632867354fc793894dfd368a18e48/.codex/README.md) | [![Best Practice](/mirror/ec/ec08fa1f324719239cf93980b84f4f0b1453aecd.svg)](https://github.com/shanraisshan/codex-cli-best-practice/blob/b79f473a188632867354fc793894dfd368a18e48/lib/09-harness/codex-cli-best-practice/best-practice-codex-hooks/README.md) [![Implemented](/mirror/ef/efeebd2cb4d7f873a01ae5e80c65dc8ab1281051.svg)](https://github.com/shanraisshan/codex-cli-hooks) User-defined shell scripts that inject into the agentic loop — logging, security scanning, validation, and custom automation · Requires `codex_hooks = true` feature flag |
| [**Speed**](https://developers.openai.com/codex/speed) | `config.toml` → `service_tier` | Fast Mode (1.5x speed, 2x credits) on gpt-5.4 — toggle with `/fast on\|off\|status` · GPT-5.3-Codex-Spark for near-instant iteration (Pro subscribers) |
| [**Code Review**](https://developers.openai.com/codex/cli/features) | `/review` | Review branches, uncommitted changes, or specific commits — configurable `review_model` in config.toml · Custom review instructions |
| [**Sessions**](https://github.com/openai/codex/releases) ![new](/mirror/af/afbf2d90461c3b48cd24cc9bf0eafcb651fe3815.svg) | `$CODEX_HOME/sessions/` · `/archive` | Session lifecycle management — resume or fork prior threads · **archive** via `/archive` (TUI) or `codex archive` / `codex unarchive` (CLI); archived threads are protected from resume/fork until restored (v0.137.0+) · **search local conversation history** with case-insensitive content matches + result previews (v0.135.0+) |
| **AI Terms** | | [![Best Practice](/mirror/ec/ec08fa1f324719239cf93980b84f4f0b1453aecd.svg)](https://github.com/shanraisshan/claude-code-codex-cursor-gemini/blob/main/reports/ai-terms.md) Agentic Engineering · Context Engineering · Vibe Coding |
| [**Best Practices**](https://developers.openai.com/codex/learn/best-practices) | | Official best practices · [Prompt Engineering](https://platform.openai.com/docs/guides/prompt-engineering) · [Codex Guides](https://developers.openai.com/codex/overview) |

  <img src="/mirror/d5/d53dec6003575523123a41b242b60001c19a9882.svg" alt="section divider" width="60" height="50">

[![Orchestration Workflow](/mirror/df/dfd3a2628c49008b081813b890a4e6ecc92f1296.svg)](https://github.com/shanraisshan/codex-cli-best-practice/blob/b79f473a188632867354fc793894dfd368a18e48/lib/09-harness/codex-cli-best-practice/orchestration-workflow-orchestration-workflow/README.md)

<div class="tb-zh"><p>徽章：编排工作流（点开看详情）。</p></div>

See [orchestration-workflow](/lib/09-harness/codex-cli-best-practice/orchestration-workflow-orchestration-workflow) for implementation details of <img src="/mirror/f4/f4f34d68b399b6f956c4be5e817e00cb60dd39a9.svg" height="14"> **Agent** → <img src="/mirror/b4/b4ac8ce766cb92fa0e98158e05b6d1da1894f1cc.svg" height="14"> **Skill** pattern. The agent fetches temperature from Open-Meteo and invokes the SVG creator skill.

<div class="tb-zh"><p>Agent → Skill 模式的实现细节见 orchestration-workflow：agent 从 Open-Meteo 取回温度，再调用生成 SVG 的 skill。</p></div>

  <img src="/mirror/d0/d0e770112b9a9c8a416c2be170846524de844bc5.svg" alt="Orchestration Workflow: Agent → Skill → Output" width="100%">

![How to Use](/mirror/6e/6e97c4520101a2ed5f0363ff79822b80c90e4c8c.svg)

```bash
codex
> Fetch the current weather for Dubai in Celsius and create the SVG weather card output using the repo.
```

> **Note:** This workflow is not 100% in sync with the [Claude Code Best Practice](https://github.com/shanraisshan/claude-code-best-practice) orchestration workflow. Codex CLI does not yet support custom commands (`.codex/commands/`), so the full <img src="/mirror/d0/d05c9d5833ebd195c770604d35bd3ef65f5aec76.svg" height="14"> **Command** → <img src="/mirror/f4/f4f34d68b399b6f956c4be5e817e00cb60dd39a9.svg" height="14"> **Agent** → <img src="/mirror/b4/b4ac8ce766cb92fa0e98158e05b6d1da1894f1cc.svg" height="14"> **Skill** pattern is not possible. There is an experimental `tool/requestUserInput` in the Codex App Server docs and an internal `request_user_input` capability gated behind an under-development feature flag in codex-cli 0.115.0, but neither is publicly available yet.

<div class="tb-zh"><p>注意：这条工作流与 Claude Code Best Practice 的编排工作流并非 100% 同步。Codex CLI 目前还不支持自定义命令（.codex/commands/），所以无法实现完整的 Command → Agent → Skill 模式。Codex App Server 文档里有一个实验性的 tool/requestUserInput，codex-cli 0.115.0 里也有一个受开发中特性开关控制的内部能力 request_user_input，但两者都还没有公开可用。</p></div>

  <img src="/mirror/d5/d53dec6003575523123a41b242b60001c19a9882.svg" alt="section divider" width="60" height="50">

## ⚙️ DEVELOPMENT WORKFLOWS

All major workflows converge on the same architectural pattern: **Research → Plan → Execute → Review → Ship**

<div class="tb-zh"><p>所有主流工作流最终都收敛到同一套架构模式：调研 → 规划 → 执行 → 评审 → 交付。</p></div>

| Name | ★ | Workflow | <img src="/mirror/f4/f4f34d68b399b6f956c4be5e817e00cb60dd39a9.svg" height="14"> | <img src="/mirror/b4/b4ac8ce766cb92fa0e98158e05b6d1da1894f1cc.svg" height="14"> |
|------|---|----------|---|---|
| [Superpowers](https://github.com/obra/superpowers) | 218k |  →  →  →  →  →  | 5 | 14 |
| [Spec Kit](https://github.com/github/spec-kit) | 108k |  →  →  →  →  | 0 | 0 |
| [gstack](https://github.com/garrytan/gstack) | 107k |  →  →  →  →  →  →  →  →  | 0 | 41 |
| [Get Shit Done](https://github.com/gsd-build/get-shit-done) | 64k |  →  →  →  →  →  →  | 33 | 0 |
| [oh-my-codex](https://github.com/Yeachan-Heo/oh-my-codex) | 30k |  →  →  | 19 | 36 |
| [Compound Engineering](https://github.com/EveryInc/compound-engineering-plugin) | 20k |  →  →  →  →  →  →  | 49 | 42 |

> *Note: yellow tags are sub-loops — steps that repeat inside a parent step (e.g. per task, per story, or until a verify condition passes).*

<div class="tb-zh"><p>注：黄色标签表示子循环——在父步骤内部反复执行的步骤（例如每个任务、每个 story 各走一遍，或直到某项校验条件通过）。</p></div>

### Others
- [Cross-Model (Claude Code + Codex) Workflow](https://github.com/shanraisshan/claude-code-best-practice/blob/main/development-workflows/cross-model-workflow/cross-model-workflow.md) [![Implemented](/mirror/ef/efeebd2cb4d7f873a01ae5e80c65dc8ab1281051.svg)](https://github.com/shanraisshan/claude-code-best-practice/blob/main/development-workflows/cross-model-workflow/cross-model-workflow.md)

  <img src="/mirror/d5/d53dec6003575523123a41b242b60001c19a9882.svg" alt="section divider" width="60" height="50">

## 💡 TIPS AND TRICKS (50)

[Prompting](#tips-prompting) · [Planning](#tips-planning) · [AGENTS.md](#tips-agentsmd) · [Agents](#tips-agents) · [Skills](#tips-skills) · [Hooks](#tips-hooks) · [Memories](#tips-memory) · [Workflows](#tips-workflows) · [Advanced](#tips-workflows-advanced) · [Git / PR](#tips-git-pr) · [Debugging](#tips-debugging) · [Utilities](#tips-utilities) · [Daily](#tips-daily)

<div class="tb-zh"><p>快速跳转：提示词 · 规划 · AGENTS.md · Agents · Skills · Hooks · 记忆 · 工作流 · 进阶 · Git / PR · 调试 · 实用工具 · 日常。</p></div>

![Community](/mirror/03/0388b535055ec01a1ab2cd1c6e2207ffb743cd8f.svg)

<a id="tips-prompting"></a>■ **Prompting (3)**

| Tip |
|-----|
| challenge Codex — "prove to me this works" and have Codex diff between main and your branch |
| after a mediocre fix — "knowing everything you know now, scrap this and implement the elegant solution" |
| Codex fixes most bugs by itself — paste the bug, say "fix", don't micromanage how |

<a id="tips-planning"></a>■ **Planning (4)**

| Tip |
|-----|
| use [/plan](https://developers.openai.com/codex/cli/slash-commands) when you want an explicit plan — Codex may also plan automatically for multi-step tasks |
| always make a phase-wise gated plan, with each phase having multiple tests (unit, automation, integration) |
| spin up a second Codex (or use [cross-model](https://github.com/shanraisshan/claude-code-best-practice/blob/main/development-workflows/cross-model-workflow/cross-model-workflow.md)) to review your plan as a staff engineer |
| write detailed specs and reduce ambiguity before handing work off — the more specific you are, the better the output |

<a id="tips-agentsmd"></a>■ **AGENTS.md (5)**

| Tip |
|-----|
| keep [AGENTS.md](https://developers.openai.com/codex/guides/agents-md) concise — 150 lines is a useful heuristic, but the actual limit is byte-based (32 KiB) |
| use [AGENTS.override.md](https://developers.openai.com/codex/rules) for personal preferences without affecting the team |
| any developer should be able to launch Codex, say "run the tests" and it works on the first try — if it doesn't, your AGENTS.md is missing essential setup/build/test commands |
| keep codebases clean and finish migrations — partially migrated frameworks confuse models that might pick the wrong pattern |
| use [config.toml](https://developers.openai.com/codex/config-basic) for harness-enforced behavior (approval policy, sandbox, model) — don't put behavioral rules in AGENTS.md when config.toml settings are deterministic |

<a id="tips-agents"></a><img src="/mirror/f4/f4f34d68b399b6f956c4be5e817e00cb60dd39a9.svg" height="14"> **Agents (3)**

| Tip |
|-----|
| have feature specific [sub-agents](https://developers.openai.com/codex/subagents) with [skills](https://developers.openai.com/codex/skills) instead of general qa, backend engineer |
| use [multi-agent](https://developers.openai.com/codex/multi-agent/) to throw more compute at a problem — offload tasks to keep your main context clean and focused |
| use test time compute — separate context windows make results better; one agent can cause bugs and another can find them |

<a id="tips-skills"></a><img src="/mirror/b4/b4ac8ce766cb92fa0e98158e05b6d1da1894f1cc.svg" height="14"> **Skills (7)**

| Tip |
|-----|
| use [skills](https://developers.openai.com/codex/skills) with clear name and description frontmatter for auto-discovery |
| skills are folders, not files — use references/, scripts/, examples/ subdirectories for [progressive disclosure](https://developers.openai.com/codex/skills) |
| build a Gotchas section in every skill — highest-signal content, add Codex's failure points over time |
| skill description field is a trigger, not a summary — write it for the model ("when should I fire?") |
| don't state the obvious in skills — focus on what pushes Codex out of its default behavior |
| don't railroad Codex in skills — give goals and constraints, not prescriptive step-by-step instructions |
| use the built-in skill creator to scaffold new skills, and document one invocation style consistently across the repo |

<a id="tips-hooks"></a>■ **Hooks (3)**

| Tip |
|-----|
| use [hooks](https://developers.openai.com/codex/hooks) for logging, security scanning, and validation — requires codex_hooks = true feature flag |
| use hooks for auto-formatting code — Codex generates well-formatted code, the hook handles the last 10% to avoid CI failures |
| branch `SessionStart` on `source` (`startup \| resume \| clear`) — skip heavy context on `clear` so `/clear` stays snappy (v0.120.0+) |

<a id="tips-memory"></a>■ **Memories (2)**

| Tip |
|-----|
| enable [memories](https://developers.openai.com/codex/memories) once and forget about it — consolidation runs between sessions, not mid-turn |
| set `no_memories_if_mcp_or_web_search = true` for threads that touch secrets or untrusted content — reset via `/memories → Reset` if exposure happens |

<a id="tips-workflows"></a>■ **Workflows (4)**

| Tip |
|-----|
| vanilla Codex is better than any workflows with smaller tasks |
| use [profiles](https://developers.openai.com/codex/config-basic) to switch between project-defined safety levels — in this repo, conservative and trusted are examples |
| start with [on-request](https://developers.openai.com/codex/cli/features) approval policy — only escalate to never when confident |
| use [/fork](https://developers.openai.com/codex/cli/slash-commands) in-session (or `codex fork`) to explore alternatives without losing your current thread, and [/resume](https://developers.openai.com/codex/cli/slash-commands) (or `codex resume`) to pick up where you left off |

<a id="tips-workflows-advanced"></a>■ **Workflows Advanced (5)**

| Tip |
|-----|
| use [multi-agent](https://developers.openai.com/codex/multi-agent/) to spawn sub-agents for parallel fan-out work (GA — enabled by default) |
| use [codex exec](https://developers.openai.com/codex/noninteractive) for headless/CI pipelines |
| combine [sandbox modes](https://developers.openai.com/codex/cli/features) with [approval policies](https://developers.openai.com/codex/cli/features) — workspace-write + on-request is a good default |
| [git worktrees](https://git-scm.com/docs/git-worktree) for parallel development |
| use ASCII diagrams a lot to understand your architecture |

<a id="tips-git-pr"></a>■ **Git / PR (3)**

| Tip | Source |
|-----|--------|
| keep PRs small and focused — one feature per PR, easier to review and revert | |
| always squash merge PRs — clean linear history, one commit per feature, easy git revert and git bisect | |
| commit often — as soon as a task is completed, commit | ![Shayan](/mirror/4b/4bea2dc8266df66647495fdaa651591ec27c8d23.svg) |

<a id="tips-debugging"></a>■ **Debugging (5)**

| Tip | Source |
|-----|--------|
| always ask Codex to run the terminal (you want to see logs of) as a background task for better debugging | |
| use MCP ([Chrome DevTools](https://developer.chrome.com/blog/chrome-devtools-mcp), [Playwright](https://github.com/microsoft/playwright-mcp)) to let Codex see browser console logs on its own | |
| make it a habit to take screenshots and share with Codex whenever you are stuck with any issue | ![Shayan](/mirror/4b/4bea2dc8266df66647495fdaa651591ec27c8d23.svg) |
| use a different model for QA — e.g. [Claude Code](https://github.com/shanraisshan/claude-code-best-practice) for plan and implementation review | |
| agentic search (glob + grep) beats RAG — code drifts out of sync and permissions are complex | |

<a id="tips-utilities"></a>■ **Utilities (4)**

| Tip | Source |
|-----|--------|
| [iTerm](https://iterm2.com/)/[Ghostty](https://ghostty.org/)/[tmux](https://github.com/tmux/tmux) terminals instead of IDE ([VS Code](https://code.visualstudio.com/)/[Cursor](https://www.cursor.com/)) | |
| [Wispr Flow](https://wisprflow.ai) for voice prompting (10x productivity) | |
| [codex-cli-hooks](https://github.com/shanraisshan/codex-cli-hooks) for Codex feedback | ![Shayan](/mirror/4b/4bea2dc8266df66647495fdaa651591ec27c8d23.svg) |
| explore config.toml features like [profiles](https://developers.openai.com/codex/config-basic), [sandbox modes](https://developers.openai.com/codex/cli/features), and [MCP](https://developers.openai.com/codex/mcp) for a personalized experience | |

<a id="tips-daily"></a>■ **Daily (2)**

| Tip | Source |
|-----|--------|
| update Codex CLI daily | ![Shayan](/mirror/4b/4bea2dc8266df66647495fdaa651591ec27c8d23.svg) |
| start your day by reading the [changelog](https://github.com/openai/codex/releases) | ![Shayan](/mirror/4b/4bea2dc8266df66647495fdaa651591ec27c8d23.svg) |

![Codex](/mirror/03/038900b3863ddbabca50b11ef0a28765569ecce3.svg)

| Article / Tweet | Source |
|-----------------|--------|
| How Codex is built — 90% self-built in Rust (Tibo, Pragmatic Engineer) \| 17 Feb 2026 | [![Tibo](/mirror/58/582361ef583ed7a6d5e7806df0ea3bf62e44f30b.svg)](https://x.com/thsottiaux) |
| Skills in Codex — standardizing .agents/skills across agents (Embiricos) \| Feb 2026 | [![Embiricos](/mirror/84/84740311cef58139b457be89009cb6824c8cb8d1.svg)](https://x.com/embirico) |
| Unrolling the Codex agent loop — how Codex works internally (Bolin) \| Jan 2026 | [Tweet](https://x.com/OpenAIDevs/status/2014794871962533970) |
| AMA with Codex team — CLI, sandbox, agents (Embiricos, Fouad, Tibo + team) \| May 2025 | [Reddit](https://www.reddit.com/r/ChatGPT/comments/1ko3tp1/ama_with_openai_codex_team/) |
| Codex CLI — open-source local coding agent, first look (Fouad + Romain) \| Apr 2025 | [Tweet](https://x.com/OpenAIDevs/status/1912556874211422572) |

  <img src="/mirror/d5/d53dec6003575523123a41b242b60001c19a9882.svg" alt="section divider" width="60" height="50">

## 🎬 VIDEOS / PODCASTS

| Video / Podcast | Source | Link |
|-----------------|--------|------|
| The power user's guide to Codex — parallelizing workflows, planning, context engineering (Embiricos) \| 2026 \| How I AI | [![Embiricos](/mirror/84/84740311cef58139b457be89009cb6824c8cb8d1.svg)](https://x.com/embirico) | [Podcast](https://open.spotify.com/episode/6RNqTaOb5ly3zgQCGB23fE) |
| Scaffolding is coping not scaling, and other lessons from Codex (Tibo) \| 2026 \| Dev Interrupted | [![Tibo](/mirror/58/582361ef583ed7a6d5e7806df0ea3bf62e44f30b.svg)](https://x.com/thsottiaux) | [Podcast](https://linearb.io/dev-interrupted/podcast/openai-codex-thibault-sottiaux-agentic-autonomy) |
| How Codex team uses their coding agent (Tibo + Andrew) \| 18 Feb 2026 \| Every | [![Tibo](/mirror/58/582361ef583ed7a6d5e7806df0ea3bf62e44f30b.svg)](https://x.com/thsottiaux) | [Podcast](https://every.to/podcast/transcript-how-openai-s-codex-team-uses-their-coding-agent) |
| Dogfood — Codex team uses Codex to build Codex (Tibo) \| 24 Feb 2026 \| Stack Overflow | [![Tibo](/mirror/58/582361ef583ed7a6d5e7806df0ea3bf62e44f30b.svg)](https://x.com/thsottiaux) | [Podcast](https://stackoverflow.blog/2026/02/24/dogfood-so-nutritious-it-s-building-the-future-of-sdlcs/) |
| Why humans are AI's biggest bottleneck — Codex product vision (Embiricos) \| Feb 2026 \| Lenny's Podcast | [![Embiricos](/mirror/84/84740311cef58139b457be89009cb6824c8cb8d1.svg)](https://x.com/embirico) | [Podcast](https://www.lennysnewsletter.com/p/why-humans-are-ais-biggest-bottleneck) |
| OpenAI and Codex (Tibo + Ed Bayes) \| 29 Jan 2026 \| Software Engineering Daily | [![Tibo](/mirror/58/582361ef583ed7a6d5e7806df0ea3bf62e44f30b.svg)](https://x.com/thsottiaux) | [Podcast](https://softwareengineeringdaily.com/2026/01/29/openai-and-codex-with-thibault-sottiaux-and-ed-bayes/) |

  <img src="/mirror/d5/d53dec6003575523123a41b242b60001c19a9882.svg" alt="section divider" width="60" height="50">

## 🔔 SUBSCRIBE

| Source | Name | Badge |
|--------|------|-------|
|  | [r/ChatGPT](https://www.reddit.com/r/ChatGPT/), [r/OpenAI](https://www.reddit.com/r/OpenAI/), [r/Codex](https://www.reddit.com/r/Codex/) | ![Codex](/mirror/03/038900b3863ddbabca50b11ef0a28765569ecce3.svg) |
|  | [OpenAI](https://x.com/OpenAI), [OpenAI Devs](https://x.com/OpenAIDevs), [Tibo](https://x.com/thsottiaux), [Embiricos](https://x.com/embirico), [Jason](https://x.com/jxnlco), [Romain](https://x.com/romainhuet), [Dominik](https://x.com/dkundel), [Fouad](https://x.com/fouadmatin), [Bolin](https://x.com/bolinfest) | ![Codex](/mirror/03/038900b3863ddbabca50b11ef0a28765569ecce3.svg) |
|  | [Jesse Kriss](https://x.com/obra) ([Superpowers](https://github.com/obra/superpowers)), [Garry Tan](https://x.com/garrytan) ([gstack](https://github.com/garrytan/gstack)), [Kieran Klaassen](https://x.com/kieranklaassen) ([Compound Eng](https://github.com/EveryInc/compound-engineering-plugin)), [Lex Christopherson](https://x.com/official_taches) ([GSD](https://github.com/gsd-build/get-shit-done)), [Yeachan Heo](https://x.com/bellman_ych) ([oh-my-codex](https://github.com/Yeachan-Heo/oh-my-codex)), [Andrej Karpathy](https://x.com/karpathy) | ![Community](/mirror/03/0388b535055ec01a1ab2cd1c6e2207ffb743cd8f.svg) |
|  | [OpenAI](https://www.youtube.com/@OpenAI) | ![Codex](/mirror/03/038900b3863ddbabca50b11ef0a28765569ecce3.svg) |
|  | [Lenny's Podcast](https://www.youtube.com/@LennysPodcast), [The Pragmatic Engineer](https://www.youtube.com/@pragmaticengineer) | ![Community](/mirror/03/0388b535055ec01a1ab2cd1c6e2207ffb743cd8f.svg) |

  <img src="/mirror/d5/d53dec6003575523123a41b242b60001c19a9882.svg" alt="section divider" width="60" height="50">

<a href="https://github.com/shanraisshan/claude-code-best-practice#billion-dollar-questions"><img src="/mirror/50/50f1e233d8382208d8bbad64c8a1416222c4a87d.svg" alt="Billion-Dollar Questions"></a>

  <img src="/mirror/d5/d53dec6003575523123a41b242b60001c19a9882.svg" alt="section divider" width="60" height="50">

## Other Repos

<a href="https://github.com/shanraisshan/codex-cli-hooks"><img src="/mirror/87/879496fb2451e7a44621f31a59fd313b6f1a6561.svg" alt="Codex CLI Hooks" width="40" height="40" align="center"></a> <a href="https://github.com/shanraisshan/codex-cli-hooks"><strong>codex-cli-hooks</strong></a> · <a href="https://github.com/shanraisshan/claude-code-best-practice"><img src="/mirror/32/322a5169a68c6b8f7f50a1a8b865cf33c8639efd.svg" alt="Claude Code" width="40" height="40" align="center"></a> <a href="https://github.com/shanraisshan/claude-code-best-practice"><strong>claude-code-best-practice</strong></a> · <a href="https://github.com/shanraisshan/claude-code-hooks"><img src="/mirror/b6/b66bcf2318e4ca531b909983765e2aed720dd9e4.svg" alt="Claude Code Hooks" width="40" height="40" align="center"></a> <a href="https://github.com/shanraisshan/claude-code-hooks"><strong>claude-code-hooks</strong></a>

---

<a href="https://openai.com/form/codex-for-oss/"><img src="/mirror/26/26af8acd1b097d92fb0ef27ea0e5ac5d0c080167.svg" alt="Codex for Open Source" width="720"></a>

  <img src="/mirror/d5/d53dec6003575523123a41b242b60001c19a9882.svg" alt="section divider" width="60" height="50">
