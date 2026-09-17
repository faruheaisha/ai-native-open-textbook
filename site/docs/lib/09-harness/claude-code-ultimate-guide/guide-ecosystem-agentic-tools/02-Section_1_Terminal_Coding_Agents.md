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
entryUrl: "https://github.com/FlorianBruniaux/claude-code-ultimate-guide/blob/af05b84fb6e32432dae2114ee2a72c44ef3d29b1/guide/ecosystem/agentic-tools.md"
sourceRel: "guide/ecosystem/agentic-tools.md"
rawUrl: "/raw/09-harness/claude-code-ultimate-guide/guide/ecosystem/agentic-tools.md"
sourceSha256: "b8f74a0aa5f41faad7912a23e33e7953aba0d889eef308ce73eed6f3f3c04368"
pageSha256: "2e9e947c4df5451eb6f55e6997766b0c0119abd8b713bd2b0e653581eab93b96"
contentMode: "local-full"
zh: ""
---

## Section 1: Terminal Coding Agents

These tools do what Claude Code does: sit in your terminal, read your codebase, write code, run commands. The differences are in model support, cost model, and specific capabilities.

---

### 1.1 Codex CLI (OpenAI)

OpenAI's direct answer to Claude Code. Launched April 2025, built in Rust, open-sourced under Apache 2.0.

| Attribute | Details |
|-----------|---------|
| **GitHub** | [openai/codex](https://github.com/openai/codex) |
| **Stars** | 86,200+ (May 2026) |
| **Install** | `npm install -g @openai/codex` |
| **Language** | Rust (96%) |
| **License** | Apache 2.0 |
| **Version** | v0.134.0 (May 26, 2026) |
| **Releases** | 800+ since April 2025 |
| **Contributors** | 400+ |

#### What Is Codex CLI?

A terminal AI agent for writing, editing, and running code, built on OpenAI's model family. The architecture mirrors Claude Code closely: you describe a task, the agent reads files, makes edits, runs tests, and iterates. The main difference is the model provider: Codex CLI talks to GPT-4o, o3, o4-mini, and other OpenAI models, not Claude.

ChatGPT Pro and Team subscribers get Codex CLI usage included in their plan, making it a zero-marginal-cost tool for teams already paying for OpenAI.

#### Claude Code vs Codex CLI

| Aspect | Claude Code | Codex CLI |
|--------|-------------|-----------|
| **Models** | Claude family (Opus 5, Sonnet 5, Haiku 4.5, Fable 5) only | GPT-4o, o3, o3-mini, o4-mini, plus future OpenAI models |
| **Language** | TypeScript | Rust |
| **License** | Open source | Apache 2.0 |
| **Subscription** | Anthropic Claude Max ($20-$200/mo) | OpenAI ChatGPT Pro/Team ($20-$30/mo) |
| **MCP Support** | Native, growing ecosystem | MCP compatible |
| **Release cadence** | Weekly | Very high (800+ releases in 13 months) |
| **Memory** | CLAUDE.md + Auto Memory | AGENTS.md convention |
| **Skills/Hooks** | Full system | Compatible with agentskills.io standard |

#### When to Choose Codex CLI

Good fit if you are already on a ChatGPT Pro or Team plan and want to avoid a second subscription. Also the right call if you prefer GPT-4o or o3 for specific tasks (reasoning, long-context analysis) and want a terminal agent that uses those models natively.

Poor fit if your team has invested in Claude Code workflows, CLAUDE.md files, and Anthropic-specific patterns. The cognitive cost of context-switching between two agent environments is real.

#### Quick Start

```bash
npm install -g @openai/codex
export OPENAI_API_KEY=sk-...
codex
```

OpenAI's [Codex docs](https://github.com/openai/codex/blob/main/README.md) cover setup in detail.

---

### 1.2 Hermes Agent (formerly OpenClaw)

The most starred open-source agent framework as of May 2026. Created by Nous Research, the AI lab known for its Hermes series of fine-tuned models. Was called OpenClaw until late 2025, when it rebranded on Anthropic reinstating subscription support.

| Attribute | Details |
|-----------|---------|
| **GitHub** | [NousResearch/hermes-agent](https://github.com/NousResearch/hermes-agent) |
| **Stars** | 170,000+ (May 2026) |
| **Install** | `pip install hermes-agent` or `curl -sSL install.hermes-agent.dev \| sh` |
| **Language** | Python (89%), TypeScript (8%) |
| **License** | MIT |
| **Version** | v0.15.1 (June 2026) |
| **Release cadence** | Weekly (v0.10 Apr 16 → v0.15.1 Jun 2026) |
| **Contributors** | 215+ |
| **Creator** | Nous Research (Teknium, @teknium1) |

#### What Is Hermes Agent?

A self-improving terminal agent that works with 200+ LLM providers, runs on any platform, and connects to 22 messaging platforms (Telegram, Discord, Slack, WhatsApp, Signal, Teams, LINE, SimpleX, and more). The distinguishing feature is its learning loop (GEPA): after completing tasks, Hermes analyzes what worked, extracts reusable patterns, and generates skills automatically. Community benchmarks show agents with 20+ auto-generated skills completing similar tasks 40% faster than fresh instances on the same codebase.

The OpenClaw history matters for two reasons. First, the migration path is clean: `hermes-agent` imports OpenClaw memories, skills, and settings during setup, so switching costs are low. Second, the Anthropic billing controversy from early 2026 was specifically about OpenClaw/Hermes being used on Claude Max subscriptions without proper programmatic billing attribution. Anthropic now explicitly includes Hermes in the programmatic usage bucket (see [Billing: Programmatic vs Interactive](/lib/09-harness/claude-code-ultimate-guide/guide-ultimate-guide/index#the-interactiveprogrammatic-billing-split-effective-june-15-2026)).

#### Claude Code vs Hermes Agent

| Aspect | Claude Code | Hermes Agent |
|--------|-------------|--------------|
| **Models** | Claude only | 200+ via OpenRouter, OpenAI, Anthropic, HuggingFace, local |
| **Self-improvement** | Each session starts fresh | Skills auto-generated from recurring patterns |
| **Messaging** | Terminal + IDE | Terminal + 22 chat platforms |
| **Cron scheduling** | Routines (Anthropic cloud) | Built-in cron, runs locally |
| **Billing** | Subscription or API | Pay your LLM provider directly |
| **Agent SDK** | Anthropic-specific | `ctx.llm` plugin for any provider |
| **Skills** | SKILL.md system | Skills Hub (agentskills.io) + auto-generated |
| **Memory** | CLAUDE.md + Auto Memory | Cross-session persistent memory, agent-curated |

#### When to Choose Hermes Agent

The model-agnostic case is the strongest argument. If you want to run Claude for code generation, GPT-4o for specific reasoning tasks, and a local model (via Ollama) for offline work, Hermes handles all three in a single agent. Claude Code cannot.

The self-improving loop is genuinely differentiated. Over 30-40 sessions on the same codebase, Hermes builds a library of skills specific to your project's patterns. Community benchmarks put the compound gain at 40% faster task completion once 20+ skills are accumulated. CLAUDE.md is human-authored and intentional; Hermes skills are machine-generated and project-specific. Different mechanisms, both worth having.

The 22 messaging platform integrations are useful for teams that want to interact with their agent via Telegram or Slack rather than a terminal. Not a priority for most developers, but critical for some workflows.

Poor fit if you are invested in Anthropic's ecosystem (Claude Max subscription, Routines, the Agent SDK). Running Hermes with Claude models hits the programmatic billing bucket, meaning your $200/mo Max subscription's $200 credit gets consumed by both interactive terminal use and Hermes API calls. Factor that in.

#### Quick Start

```bash
pip install hermes-agent

# Or one-line installer
curl -sSL install.hermes-agent.dev | sh

# Import from OpenClaw if migrating
hermes import --from openclaw

# Start (terminal-only, no WebUI, no dashboard)
hermes chat
```

Hermes has no official graphical interface. The entry point is `hermes chat` in a terminal. On Windows, WSL2 is required; native Windows support does not exist. A community project (`hermes-webui`) exists but is not maintained by Nous Research.

#### Known Operational Issues (v0.15.x)

Several failure modes recur in production deployments and are not obvious from the documentation. The following are drawn from community reports and verified issues on the project tracker.

**Agent executes before analyzing.** The default behavior is to start writing code immediately, without listing impacted files or proposing an approach. On complex refactors this leads to partial writes before scope is understood. Add this block to `SOUL.md` (the identity file injected at every session start):

```
## Defaults
Before any development action, explicitly list:
1. Files that will be modified
2. Proposed approach
3. Identified risks
Never write code before confirming these three points.
```

`SOUL.md` holds durable agent personality and behavior. `AGENTS.md` holds project-specific rules (paths, ports, commands). Mixing them creates confusion when switching projects.

**Kanban parallelism flood.** The default config has `max_in_progress_per_profile: null` (unlimited) combined with `auto_decompose_per_tick: 3`. A batch of 10 tasks can spawn 30+ concurrent workers within seconds. Explicit limits in `.hermes/config.yaml`:

```yaml
kanban:
  max_in_progress_per_profile: 2
  auto_decompose_per_tick: 1
  task:
    max_runtime_seconds: 300
```

**Subprocess PATH not inherited.** Binaries outside `/usr/bin` and `/usr/local/bin` are invisible to Hermes subprocesses (opencode, nvm-managed Node, pyenv Python, any tool installed under `$HOME`). Fix in `.hermes/config.yaml`:

```yaml
terminal:
  env_passthrough:
    - PATH
```

As of v0.15.1, this is partially resolved for Docker environments (npx, npm, node resolve against `/usr/local/bin`). Native installs still require the manual config above.

**Workers that exit without closing tasks.** A worker that finishes its work and exits without calling `kanban_complete` or `kanban_block` leaves the task permanently in "in progress" state. The dispatcher can re-launch the worker in a loop (issue #28712). Add this rule to every worker profile:

```
Every session must end with an explicit call to kanban_complete or kanban_block.
Exiting without this call is a protocol violation and blocks downstream tasks.
```

**SQLite corruption on `kanban.db`.** Rapid task creation, frequent gateway restarts via SIGTERM, and concurrent gateway access on the same file can corrupt the database. A minimal safeguard:

```bash
# Hourly backup (add to crontab)
0 * * * * cp ~/.hermes/kanban.db ~/.hermes/kanban.db.bak.$(date +%Y%m%d%H)
```

Recovery with `sqlite3` available: dump to SQL, reimport into a fresh file, replace. An open RFC (#23717) proposes replacing SQLite with a pluggable backend (PostgreSQL, MySQL) for multi-agent deployments.

**`HERMES_HOME` not propagated to subprocesses.** In profile mode, subprocesses launched by the gateway start with a minimal environment and do not inherit `HERMES_HOME`. They fall back silently to `~/.hermes`, writing memories and session data to the wrong profile. Workaround until the upstream fix lands:

```bash
export HERMES_HOME=~/.hermes/profiles/your-profile-name
hermes ...
```

**Token overhead is significant.** Each LLM call carries approximately 13,900 tokens of fixed overhead before any task content: tool definitions (~8-9K) and system prompt (~5K). Messaging gateway integrations (Telegram, LINE, Discord) add 15-20K tokens per request on top of that. A community analysis (issue #4379) documented 4 million tokens consumed in two hours on a misconfigured Telegram gateway. Cap context explicitly:

```yaml
context:
  max_tokens: 32000
```

---

### 1.3 Aider

The original terminal AI pair programmer. Launched in 2023 by Paul Gauthier before Claude Code existed, Aider established many of the conventions that later tools adopted: direct file editing, automatic git commits, multi-file context windows.

| Attribute | Details |
|-----------|---------|
| **GitHub** | [Aider-AI/aider](https://github.com/Aider-AI/aider) |
| **Stars** | 45,400+ (May 2026) |
| **Install** | `pip install aider-install && aider-install` |
| **Language** | Python (80%) |
| **License** | Apache 2.0 |
| **Creator** | Paul Gauthier (paul-gauthier) |
| **PyPI downloads** | 5.3M+ |

#### What Is Aider?

A Python-based coding assistant that edits files in your local git repo and auto-commits with descriptive messages. Key characteristic: near-universal model support via LiteLLM, covering GPT-4o, the Claude 5 family, Gemini, Ollama, and dozens of other providers. Aider popularized the "whole file" and "diff" editing formats that informed how later agents handle file modifications.

The SWE-Bench benchmark trajectory tells the story well: Aider held the top score on SWE-Bench Verified for several months in 2024-2025 before larger-context models and more capable agents surpassed it. That benchmark record established its reputation as a serious tool, not just a convenience wrapper.

#### Claude Code vs Aider

| Aspect | Claude Code | Aider |
|--------|-------------|-------|
| **Model support** | Claude only | GPT-4o, Claude, Gemini, Ollama, 50+ providers |
| **Git integration** | Native (reads .git, runs git) | Deep (auto-commits, commit messages, blame context) |
| **Architecture** | Anthropic proprietary | Open source, LiteLLM under the hood |
| **File editing** | Tool-based (Edit, Write) | Whole-file or diff format sent to model |
| **Web search** | Via MCP | Not native (requires plugin) |
| **Agentic loop** | Full (multi-turn, tool use) | Full (auto-accepts changes in architect mode) |
| **Release cadence** | Weekly | Monthly (last: v0.86.0, Aug 2025) |

The last release date, August 2025, matters here: Aider remains maintained and functional, but the release cadence has slowed relative to Claude Code and Hermes. That is not a warning sign by itself, but check it against your need for recent features before adopting.

#### When to Choose Aider

Best case: you need multi-model support in a mature, battle-tested tool and do not want the operational overhead of Hermes. Aider is simpler to configure than Hermes, has a smaller footprint, and has years of community documentation.

Also a good fit for teams that have strong git discipline and want every AI change explicitly committed with a clear message. Aider's auto-commit behavior is more aggressive than Claude Code's (which asks before committing by default).

#### Quick Start

```bash
pip install aider-install && aider-install

# With Claude
export ANTHROPIC_API_KEY=sk-ant-...
aider --model claude-sonnet-5

# With GPT-4o
export OPENAI_API_KEY=sk-...
aider
```

See [aider.chat](https://aider.chat) for the full model list and configuration options.

---

### 1.4 Goose (AAIF/Block)

A general-purpose agent, not just a coding tool. Originally built by Block (formerly Square), transferred to the Linux Foundation's AAIF (Agentic AI Infrastructure Foundation) for long-term governance neutrality.

**Full coverage in [AI Ecosystem §11.1: Goose](/lib/09-harness/claude-code-ultimate-guide/guide-ecosystem-ai-ecosystem/index#111-goose-open-source-alternative-block).**

Quick stats: 51,819 stars as of 2026-07-27 (45,900+ in May 2026), Rust (63%) + TypeScript (30%), Apache 2.0, daily active development, 368+ contributors. The headline difference from Claude Code: provider-agnostic (Claude, GPT, Gemini, Ollama, 15+ providers), with recipe-based reusable workflows and heterogeneous subagent teams where each subagent can run a different model.

---

### 1.5 opencode (Anomaly, formerly SST)

The single most-starred tool in this category, betting on provider neutrality and a client/server split instead of a fixed terminal UI.

| Attribute | Details |
|-----------|---------|
| **GitHub** | [anomalyco/opencode](https://github.com/anomalyco/opencode) |
| **Stars** | 199,400+ (Aug 2026) |
| **Install** | `curl -fsSL https://opencode.ai/install \| bash` or `npm i -g opencode-ai@latest` |
| **Language** | TypeScript |
| **License** | MIT |
| **Version** | v1.18.19 (Aug 2026) |
| **Contributors** | 1,000+ (GitHub API, Aug 2026) |

#### What Is opencode?

A terminal coding agent built around a client/server split: the agent itself runs as a server process, and a terminal, an IDE plugin, or a separate machine connects to it as a client. That architecture makes headless operation and resumable sessions first-class rather than bolted on, since disconnecting a client does not stop the server-side session. opencode was originally an SST project; it moved to a company called Anomaly, and the project keeps the name.

Model support is the other headline: 75+ providers through a single configuration surface, including local models, so nothing in the harness assumes Claude, GPT, or Gemini specifically. That breadth is also why the project has become the default reference point for "a coding agent that runs anywhere, on anything."

#### Claude Code vs opencode

| Aspect | Claude Code | opencode |
|--------|-------------|----------|
| **Models** | Claude family only | 75+ providers, including local models |
| **Architecture** | Single terminal process | Client/server; agent runs as a server, terminal is one possible client |
| **Language** | TypeScript | TypeScript |
| **License** | Proprietary | MIT |
| **Skills/Hooks** | Full first-party system | Plugin and MCP-based extension |
| **Memory** | CLAUDE.md + Auto Memory | AGENTS.md convention |
| **Governance** | Anthropic, single vendor | Anomaly (company), formerly SST |

#### When to Choose opencode

The strongest case is provider flexibility: a team that wants to route between Claude, GPT, Gemini, and a local model inside one harness, without switching tools per provider, gets that natively here. The client/server design also pays off for anyone running an agent on a remote box or inside CI and watching it from a laptop.

The honest weak point is depth of integration per provider. Being multi-provider by design means no single model gets the first-party polish Claude Code gives Claude models specifically (prompt caching behavior, skills, hooks tuned to one vendor's tool-use format). Star count also is not a proxy for stability here: the project moved stewards once already (SST to Anomaly), and a team betting on long-term API surface stability should read the migration history before standardizing on it.

Provider breadth also does not remove operational approval or version risk. A practitioner talk about an AI code reviewer built for a stated 200-engineer scope described using OpenRouter to prototype quickly through one API, then moving to Vertex AI and Gemini for stronger monitoring, logs, budgets, and security controls. After a later model update reduced the reviewer's measured satisfaction, the team rolled back to the previous model and observed recovery. The talk reports neither active-user count, migration cost, nor satisfaction values. Treat provider allowlists, pinned model versions, quality telemetry, and rollback as acceptance criteria for a multi-provider harness. Source: ["How We Built an AI Code Reviewer for 200 Engineers", 17:19](https://www.youtube.com/watch?v=dTye2zVfSco&t=1039s) and [21:44](https://www.youtube.com/watch?v=dTye2zVfSco&t=1304s), AI DevCon, published 2026-05-29.

#### Quick Start

```bash
curl -fsSL https://opencode.ai/install | bash
opencode
```

Full provider list and configuration at [opencode.ai/docs/providers](https://opencode.ai/docs/providers/); server architecture at [opencode.ai/docs/server](https://opencode.ai/docs/server/).

#### opencode Go: the subscription tier, and why it does not scale to a team

Beyond bring-your-own-provider-key usage, opencode offers a subscription called Go for $10/month. The current catalog includes Grok 4.6 and GPT 5.6 Luna alongside DeepSeek, Qwen, GLM, Kimi, and other models, so this is a curated coding-model subscription rather than an open-weight-only tier. Usage is limited in dollar-value terms rather than fixed request counts: $12 per 5-hour window, $30 per week, and $60 per month. The official estimates currently range from 110 to 45,300 requests per 5-hour window, but those estimates assume model-specific request profiles with large cached-input volumes and are not request guarantees. Source: [opencode.ai/docs/go](https://opencode.ai/docs/go/), verified 2026-08-30.

The plan is explicitly single-seat: only one member per workspace can subscribe to Go. The usage limits are also not necessarily a hard financial stop. If the subscriber enables **Use balance**, Go falls back to the workspace's OpenCode Zen balance after a limit is reached instead of blocking requests. Go can serve an individual evaluation, but it is not a documented way to provision or govern a team. Source: [opencode.ai/docs/go](https://opencode.ai/docs/go/), verified 2026-08-30. For team-scale subscription comparisons across providers, see [Subscription Strategy at Team Scale](/lib/09-harness/claude-code-ultimate-guide/guide-ops-subscription-strategy).

---

### 1.6 Gemini CLI (Google)

Google's first-party terminal agent, built for Gemini models with a free tier generous enough to be the primary reason to pick it.

| Attribute | Details |
|-----------|---------|
| **GitHub** | [google-gemini/gemini-cli](https://github.com/google-gemini/gemini-cli) |
| **Stars** | 106,600+ (Aug 2026) |
| **Install** | `npm install -g @google/gemini-cli` or `npx @google/gemini-cli` or `brew install gemini-cli` |
| **Language** | TypeScript |
| **License** | Apache-2.0 |
| **Version** | v0.56.0 (Aug 2026) |
| **Contributors** | 690+ (GitHub API, Aug 2026) |

#### What Is Gemini CLI?

A terminal coding agent built and maintained by Google, wired to Gemini models rather than offering broad multi-provider support. The case for it does not rest on harness novelty: the agent loop, tool set, and approval model look similar to what Codex CLI and Claude Code already do. The case rests on the free tier, personal Google accounts get 60 requests per minute and 1,000 requests per day at no cost, the most generous first-party allowance among the major terminal agents.

The agent runs in bounded-autonomy mode by default (step-gated, not headless) and supports resumable sessions. It reads `GEMINI.md` for project instructions by default; a single setting switches it to the shared `AGENTS.md` convention other tools use, so migrating instructions in either direction is cheap.

#### Claude Code vs Gemini CLI

| Aspect | Claude Code | Gemini CLI |
|--------|-------------|-------------|
| **Models** | Claude family only | Gemini family (first-party) |
| **Free tier** | None on the CLI itself | 60 req/min, 1,000/day on personal Google accounts |
| **License** | Proprietary | Apache-2.0 |
| **Memory** | CLAUDE.md + Auto Memory | GEMINI.md by default, AGENTS.md via one setting |
| **MCP Support** | Native, growing ecosystem | Native |
| **Steward** | Anthropic, single vendor | Google, single vendor |

#### When to Choose Gemini CLI

The clear-cut case is cost: a developer or small team already on Gemini, or wanting to try an agentic terminal workflow before paying for one, gets a working setup with a real daily quota and no subscription. It is also the sensible default if the rest of a team's stack already runs on Google Cloud and Gemini.

The honest limitation is that this is not a multi-provider tool: switching models means switching to a different harness entirely, unlike opencode or Aider. Anyone who expects to compare Claude, GPT, and Gemini output on the same task inside one terminal agent will not get that here.

#### Quick Start

```bash
npm install -g @google/gemini-cli
gemini
```

Or try it without installing: `npx @google/gemini-cli`. Full setup and free-tier details at the [Gemini CLI README](https://github.com/google-gemini/gemini-cli#readme).

---

### 1.7 crush (Charm)

Charm's terminal coding agent, built by the team behind Bubble Tea and Lip Gloss, the TUI libraries much of this category's terminal interfaces are built on.

| Attribute | Details |
|-----------|---------|
| **GitHub** | [charmbracelet/crush](https://github.com/charmbracelet/crush) |
| **Stars** | 27,500+ (Aug 2026) |
| **Install** | `brew install charmbracelet/tap/crush` or `npm install -g @charmland/crush` or `go install github.com/charmbracelet/crush@latest` |
| **Language** | Go |
| **License** | FSL-1.1-MIT (Functional Source License; see caveat below) |
| **Version** | v0.90.0 (Aug 2026) |
| **Contributors** | 144+ (GitHub API, Aug 2026) |

#### What Is crush?

A terminal coding agent with no model lock-in (multi-provider, same posture as opencode and Aider on that axis) and two distinctive bets: per-project session persistence, and a terminal interface built with Charm's own TUI tooling, which shows in day-to-day polish. Bounded autonomy, resumable sessions.

The license needs a direct flag. crush ships under FSL-1.1-MIT (Functional Source License), not a standard OSI-approved open source license at release. Each release converts to full MIT automatically two years after it ships, so older versions become plain MIT over time, but the current release is source-available rather than open source in the OSI sense. This is fine for individual use or internal team use. It is a real constraint if the plan involves redistributing crush, hosting it as a competing service, or bundling it into another commercial product before that release's two-year window closes; read the license text before doing any of those.

#### Claude Code vs crush

| Aspect | Claude Code | crush |
|--------|-------------|-------|
| **Models** | Claude family only | Multi-provider, no lock-in |
| **Language** | TypeScript | Go |
| **License** | Proprietary | FSL-1.1-MIT (converts to MIT 2 years after each release) |
| **Session persistence** | Native, per-project | Native, per-project |
| **Terminal UI** | Anthropic-built | Charm's Bubble Tea/Lip Gloss stack |
| **Steward** | Anthropic, single vendor | Charm |

#### When to Choose crush

The strongest reason to pick crush over opencode or Aider is the terminal experience itself: Charm has been building TUI tooling for years, and it is the most polished interface among the multi-provider terminal agents covered here. Per-project session persistence also makes it a reasonable fit for developers who juggle several codebases and want the agent to remember state per repo without extra configuration.

The weak points are real. It has the smallest community of the three tools added in this section (27,500+ stars against opencode's 199,400+ and Gemini CLI's 106,600+), it is younger, and the FSL license is a genuine blocker for anyone building a product on top of it for resale rather than using it as a personal or internal tool. If license clarity matters more than terminal polish, opencode or Aider avoid the question entirely.

#### Quick Start

```bash
brew install charmbracelet/tap/crush
crush
```

License text and the two-year MIT conversion terms at [charmbracelet/crush LICENSE.md](https://github.com/charmbracelet/crush/blob/main/LICENSE.md).

---

### 1.8 DeepSeek Harness (dsh)

DeepSeek's official agent runtime. It is technically ambitious, explicitly experimental, and should not be confused with a safe-by-default production sandbox.

| Attribute | Details |
|-----------|---------|
| **GitHub** | [deepseek-ai/deepseek-harness](https://github.com/deepseek-ai/deepseek-harness) |
| **Interface** | Local web UI and headless CLI |
| **License** | MIT |
| **Status** | Developer preview; compatibility-breaking changes are expected |
| **Architecture** | Cordis plugin tree: models, tools, skills, sessions, sandbox, storage, approvals, and UI are composable plugins |

#### What Is DeepSeek Harness?

DeepSeek Harness, exposed as `dsh`, is a local-first runtime that composes a profile from plugins rather than shipping one fixed agent surface. Its official architecture documents profiles and bundles for the agent loop, model adapters, tools, MCP, skills, subagents, workflows, sandboxing, permissions, storage, and UI. That makes it an interesting reference for builders: the seams are visible instead of being hidden behind a single CLI command.

Start from the official package rather than a similarly named community project:

```bash
npx @deepseek-ai/dsh web

# Inspect the fully composed profile before trusting it
npx @deepseek-ai/dsh --profile web --dump-config
```

The project documents Standard, PTC/Code Mode, Minimal, and Creation-oriented profiles. Its session event log can record messages, tool calls, and approval decisions for replay. That helps debugging, but it also raises a data-handling question: inspect telemetry and export settings before putting proprietary code or secrets through a local run.

#### Security and Operational Limits

The repository labels dsh a developer preview. Treat that as an operational constraint, not modest wording. A local-first agent can still read hostile repository content, call a powerful tool, and write to a workspace. Use an isolated VM or container for untrusted code, start with the least-privileged profile, and make consequential actions reviewable outside the model's own reasoning loop. Do not enable a `danger-full-access` preset on a primary machine.

One external study, [arXiv:2608.16393](https://arxiv.org/abs/2608.16393), evaluated one DeepSeek Harness commit and configuration in 14,560 controlled indirect-prompt-injection tests. Its results are evidence about that tested configuration, not a universal security rating. The durable lesson is simpler: sandboxing alone does not prove that untrusted content cannot influence a tool-using agent. Keep provenance, independent authorization, and review gates on top of a sandbox.

Official starting points: the [README](https://github.com/deepseek-ai/deepseek-harness), [architecture](https://github.com/deepseek-ai/deepseek-harness/blob/master/docs/architecture.md), [sandbox subsystem](https://github.com/deepseek-ai/deepseek-harness/blob/master/docs/subsystems/sandbox.md), and [permission presets](https://github.com/deepseek-ai/deepseek-harness/blob/master/docs/subsystems/permission-presets.md). Snapshot checked 2026-09-02.

#### When to Choose DeepSeek Harness

Choose dsh to study or extend a plugin-first runtime, or to experiment in an isolated environment with its explicit composition model. Do not standardize on it for a production team merely because it is local or open source. Claude Code remains the better default in this guide for a stable, documented coding workflow; dsh is a fast-moving alternative worth evaluating behind clear security and maintenance gates.

---

### 1.9 Warp Agent CLI

Warp Agent is a proprietary coding agent whose standalone CLI runs in third-party terminals as well as Warp. This matters for classification: Warp is no longer only a terminal application with an embedded assistant. The vendor now presents the agent as a terminal runtime with its own interactive surface, multi-agent coordination, and optional cloud continuation.

| Attribute | Details |
|-----------|---------|
| **Official source** | [Introducing Warp Agent](https://www.warp.dev/blog/introducing-the-warp-agent-cli-coding-agent) |
| **Interfaces** | CLI, interactive terminal UI, and web monitoring for cloud runs |
| **Terminal support** | Standalone use in terminals including Ghostty, iTerm2, VS Code terminals, and Windows terminals |
| **Execution model** | Local terminal work with optional handoff to Warp cloud agents |
| **Model strategy** | Vendor-managed routing plus configurable model routing |
| **License** | Proprietary |

#### What Distinguishes It?

Warp emphasizes terminal fidelity. Its agent can multiplex pseudo-terminals and interact with full-screen applications such as debuggers, editors, and database clients instead of treating every command as a one-shot subprocess. The same product surface can coordinate several agents and delegate work to external coding agents, including Claude Code and Codex, according to Warp's launch article.

The cloud handoff is the second differentiator. A task can begin in a local terminal and continue remotely, with progress visible from Warp's cloud surface. That is a hybrid execution model, not evidence that every command stays local. Teams should decide which repositories, credentials, and command outputs may cross that boundary before enabling remote runs.

#### Evidence Boundary

The capabilities above come from Warp's launch article dated August 4, 2026. This guide did not independently test terminal compatibility, model routing quality, cloud isolation, or multi-agent reliability. Treat the profile as a sourced product map, then verify the exact client version, data path, permission model, and pricing against a representative repository before adoption.

#### When to Choose Warp Agent

Shortlist it when interactive terminal programs are central to the task, when developers want the same agent in several terminal applications, or when local-to-cloud handoff is a real workflow requirement. Prefer an open-source terminal agent when inspectability or self-hosting is non-negotiable. Prefer a simpler CLI when remote continuation and terminal multiplexing do not justify another proprietary control surface.
