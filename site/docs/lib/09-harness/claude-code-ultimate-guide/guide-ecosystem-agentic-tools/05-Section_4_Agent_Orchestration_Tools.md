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
pageSha256: "05b7821da4b75754ebc6ff38d21390d4863236a6a4b27c2f9f2f099f8dfd7e48"
contentMode: "local-full"
zh: ""
---

## Section 4: Agent Orchestration Tools

Tools that sit above agent frameworks and manage how agents are deployed, routed, and operated at scale. Not to be confused with multi-Claude orchestration tools (Gas Town, multiclaude) which are covered in [Third-Party Tools](/lib/09-harness/claude-code-ultimate-guide/guide-ecosystem-third-party-tools/index#multi-agent-orchestration).

---

### 4.1 Conductor (Gemini CLI methodology)

A development methodology, not a product. "Conductor" started as an extension for Gemini CLI that enforces a Context, Spec, Plan, Implement workflow: before writing any code, the agent creates and commits a spec document, then a plan document, then implements against both.

| Attribute | Details |
|-----------|---------|
| **GitHub** | [gemini-cli-extensions/conductor](https://github.com/gemini-cli-extensions/conductor) |
| **Stars** | 3,600+ (May 2026) |
| **License** | Apache 2.0 |

The methodology has been ported to Claude Code via community repos: [lackeyjb/claude-conductor](https://github.com/lackeyjb/claude-conductor), [ryanmac/code-conductor](https://github.com/ryanmac/code-conductor), and the wshobson/agents plugin marketplace. None of these have significant traction on their own, but the pattern itself (spec-before-code, committed documentation) maps directly to Claude Code's [Spec-First Development workflow](/lib/09-harness/claude-code-ultimate-guide/guide-workflows-spec-first).

---

### 4.2 Conductor (Microsoft CLI)

An entirely separate project from the Gemini one. A YAML-first CLI for deterministic multi-agent workflows where the routing logic is static configuration, not LLM decisions.

| Attribute | Details |
|-----------|---------|
| **GitHub** | [microsoft/conductor](https://github.com/microsoft/conductor) |
| **Stars** | 350 (2026-07-27, was 158 in May 2026, brand new at the time) |
| **License** | MIT |
| **Launched** | May 14, 2026 (Microsoft Open Source Blog) |

Core idea: define your agent workflow in YAML (which agents run in sequence, which in parallel, which model each uses, what gets passed between stages) and execute it deterministically. No LLM in the orchestration loop, only in the agent steps. Supports both GitHub Copilot SDK and Anthropic Agent SDK as providers. Very early stage (350 stars as of 2026-07-27, up from 158 days after launch), but backed by Microsoft's open-source team.

---

### 4.3 Hermes Control Room

A community template by Shann (@shannhk, Lisbon) for managing a fleet of Hermes agents on a VPS. Not a Nous Research project.

| Attribute | Details |
|-----------|---------|
| **GitHub** | [shannhk/hermes-agent-control-room](https://github.com/shannhk/hermes-agent-control-room) |
| **Stars** | 474 (May 2026) |
| **Age** | 12 days (as of May 27, 2026) |
| **Type** | Template/documentation, not executable software |

The concept: a folder structure with governance docs, a registry of deployed agents, runbooks for common operations, and 8 bundled Hermes skills for VPS provisioning, task routing, backup, security auditing, and cron planning. Agents share a filesystem-based task bus (inbox/working/outbox/archive per specialty). The orchestrator reads the control room docs to know agent capabilities, routes tasks via the bus, and synthesizes results.

The pattern is sound for anyone running 3+ Hermes agents. The specific repo is too new (7 commits) to recommend as a production dependency. Watch for a v1.0 with more operational hardening.

---

### 4.4 Symphony (OpenAI)

OpenAI's answer to "what do you build on top of Codex?" Symphony watches a Linear board, creates an isolated workspace per issue, spawns a Codex agent in it, and collects proof of work before the PR lands.

| Attribute | Details |
|-----------|---------|
| **GitHub** | [openai/symphony](https://github.com/openai/symphony) |
| **Stars** | 25,969 (July 2026) |
| **Language** | Elixir (reference implementation) |
| **License** | Apache 2.0 |
| **Created** | February 26, 2026 |
| **Last commit** | June 9, 2026 |
| **Status** | Engineering preview, no tagged release |

#### What It Actually Does

The tagline is "manage work, not agents." Symphony polls a tracker, dispatches an agent per issue into its own workspace, and gathers evidence the work is real: CI status, PR review feedback, complexity analysis, and a walkthrough video. An engineer reviews the evidence instead of watching the agent type.

The distribution model is unusual: the repo's primary recommendation is not "install our binary" but "hand [SPEC.md](https://github.com/openai/symphony/blob/main/SPEC.md) to your favorite coding agent and have it build Symphony in the language of your choice." The Elixir version is an experimental reference implementation, built on BEAM/OTP for supervision and concurrency. The spec is the product.

Symphony assumes you have already done [harness engineering](https://openai.com/index/harness-engineering/) on your codebase: making the repo legible to agents through tests, docs, and tooling. It positions itself as the step after that.

#### Read the Warning Label

The README opens with a bolded warning that this is "a low-key engineering preview for testing in trusted environments." No tagged release exists, and the repo has been quiet since June 9, 2026. The 26,265 stars (2026-07-27) measure OpenAI's distribution reach, not production readiness.

#### Where It Stops

Symphony is deliberately narrow: a scheduler, runner, and tracker reader. It does not review, and it does not enforce. The spec explicitly states it "does not require a single approval, sandbox, or operator-confirmation policy," leaving trust posture to whoever implements it. The agent self-certifies its own work; there is no second agent that can reject it. The reference implementation is Codex-only.

That narrowness is a design choice, not an oversight. If you want dispatch and workspace isolation, Symphony is a clean spec to copy. If you want a review loop or a merge gate, you build that yourself.

---

### 4.5 Paperclip

An org chart for agents. Paperclip models the corporate apparatus (roles, budgets, approval gates, delegation chains) and lets you point any agent runtime at it. The fastest-growing project in this entire page.

| Attribute | Details |
|-----------|---------|
| **GitHub** | [paperclipai/paperclip](https://github.com/paperclipai/paperclip) |
| **Stars** | 74,900 (2026-07-27), 13,956 forks |
| **Language** | TypeScript (Node.js server + React UI) |
| **License** | MIT |
| **Created** | March 2, 2026 |
| **Latest release** | v2026.707.0 (July 7, 2026) |
| **Works with** | Hermes Agent/OpenClaw, Claude Code, Codex, Cursor, Bash, HTTP |

#### What It Actually Does

The README frames it precisely: "If OpenClaw is an employee, Paperclip is the company." You define a goal, hire a team (CEO, CTO, engineers, marketers, each backed by whatever agent runtime you like), set budgets, and monitor from a dashboard. It looks like a task manager. Underneath sit org charts, budget caps, governance rules, and cost tracking per agent, task, and goal.

Runtime-agnostic by design, summarized in their own line: "if it can receive a heartbeat, it's hired." This is what makes it interesting next to Claude Code rather than in competition with it. Claude Code becomes one of the employees.

#### Why the Traction Matters

75K stars and 14K forks (2026-07-27) in roughly four months, with releases shipping weekly. Whatever you think of the "zero-human company" narrative, the adoption is real and the project is maintained. A plugin ecosystem has already formed around it ([awesome-paperclip](https://github.com/gsxdsm/awesome-paperclip), company-wizard templates, a Hermes adapter from Nous Research).

#### Where It Stops

Trust in Paperclip is organizational, not behavioral. It governs who may act and how much they may spend, with budget auto-pause and append-only audit trails. It does not govern how the work gets done inside an agent session. Their own docs are direct about it not being a code review tool. Nothing here stops an agent from modifying a test to make broken code pass; that is a different layer of the problem, addressed by [spec-first governance patterns](/lib/09-harness/claude-code-ultimate-guide/guide-workflows-spec-first).

Different domain, too. Paperclip targets business operations broadly, not software engineering specifically. If your goal is shipping code, the org-chart abstraction may be more apparatus than the job needs.

---

### 4.6 CLI Agent Orchestrator (CAO, AWS Labs)

A supervisor agent that delegates to worker agents, each one a real CLI process in its own tmux session, coordinated over MCP. Notable for a reason that has nothing to do with its features: it is the only orchestrator in this category with a defensible bus factor.

| Attribute | Details |
|-----------|---------|
| **GitHub** | [awslabs/cli-agent-orchestrator](https://github.com/awslabs/cli-agent-orchestrator) |
| **Stars** | 954 (2026-07-27), 184 forks, 73 open issues (was 893 / 172 / 71 in July 2026) |
| **Language** | Python 3.10+, distributed on PyPI as `cli-agent-orchestrator` |
| **License** | Apache-2.0 |
| **Created** | July 29, 2025 |
| **Latest release** | v2.3.0 (July 12, 2026) |
| **Contributors** | 41, top contributor at 20% of commits |
| **Works with** | Claude Code, Kiro CLI, Codex CLI, Antigravity CLI, Hermes Agent, Kimi CLI, GitHub Copilot CLI, OpenCode, Cursor CLI |

#### What It Actually Does

One supervisor agent launches, messages, and coordinates multiple workers through three MCP primitives: `handoff` (synchronous, waits for completion), `assign` (asynchronous, fire and forget), and `send_message` (inbox delivery between agents). Every agent runs as a full CLI process in an isolated tmux session, which is the design decision that matters most: because it drives the real binary rather than wrapping an API, native features survive, including Claude Code sub-agents, Kiro custom agents, and provider auth.

Two consequences follow that most orchestrators cannot offer. You can `tmux attach` to any running worker and steer it mid-task, rather than waiting for a sub-agent to finish and hoping. And you can mix providers inside one session, pinning a profile to a given CLI through agent frontmatter, so a Kiro supervisor can drive Claude Code workers.

Around that core sit scheduled flows (cron-style unattended runs), a bundled Web UI, a `cao-ops-mcp` server that lets an agent spawn and monitor CAO sessions from its own chat loop, persistent cross-session memory via `memory_store` and `memory_recall`, and per-agent tool restrictions declared as `role` plus `allowedTools` in the profile, translated to each provider's native enforcement where one exists.

#### Why It Is Listed Here At All

A July 2026 market sweep of eight open-source multi-agent orchestrators, verified against the GitHub API rather than project READMEs, found seven with a single contributor holding 95% to 100% of commits. CAO was the exception, at 41 contributors and a top contributor holding 20%.

The comparison that should stay with you: Mission Control ([builderz-labs/mission-control](https://github.com/builderz-labs/mission-control), MIT) carries 5,862 stars as of 2026-07-27 (was 5,763), 6.1 times CAO's count, and one person authored 78% of its commits. Sorting that market by stars selects almost exactly the wrong tool. This guide's position on star counts as an adoption proxy is stated at [Section 5](#the-model-lock-in-question) and in [`docs/resource-evaluations/README.md`](https://github.com/FlorianBruniaux/claude-code-ultimate-guide/blob/af05b84fb6e32432dae2114ee2a72c44ef3d29b1/docs/resource-evaluations/README.md); CAO versus Mission Control is the cleanest illustration of it in the wild.

#### Where It Stops

CAO owns coordination and nothing else. It ships no quality gate of its own, and it is honest about this: whether an agent can declare "done" on broken code depends entirely on what the underlying CLI runs inside its worktree. Tool restrictions constrain which tools an agent may call, not whether its output is correct. Answer question 1 of the [governance checklist](/lib/09-harness/claude-code-ultimate-guide/guide-workflows-agentic-software-factories#4-five-governance-questions-before-you-adopt-anything) yourself, in your own CI, because CAO will not answer it for you.

Isolation is process-level, not system-level. tmux separates contexts and gives real PTY access; it is not a sandbox. Agents inherit the environment, including secrets and configs. The `cao-server` is hardened for localhost specifically (host-header validation against DNS rebinding, WebSocket PTY refusing non-loopback connections), which tells you the intended deployment: your machine, not a shared host.

No published case study with measured outcomes exists as of July 2026, which puts it in the same evidentiary position as every commercial platform in this category. AWS Labs backing means maintenance continuity, not proven production results.

---

### 4.7 Nimbalyst

A desktop workspace for running Claude Code and Codex side by side, built around visual review rather than terminal output. Each session can be isolated in its own git worktree, so several agents work the same repository without colliding.

| Attribute | Details |
|-----------|---------|
| **GitHub** | [nimbalyst/nimbalyst](https://github.com/nimbalyst/nimbalyst) |
| **Stars** | 1,558 (2026-08-24), 223 forks |
| **License** | MIT |
| **Language** | TypeScript |
| **Created** | October 30, 2025 |
| **Platforms** | macOS, Windows, Linux; mobile companion for iOS and Android |
| **Works with** | Claude Code, Codex; OpenCode and GitHub Copilot in alpha |

#### What It Actually Does

Every session lands on a searchable kanban board linked to the files it touched. The differentiator is how review works: agent edits render as inline red/green changes inside the document itself, whether that document is markdown, a mockup, a Mermaid or Excalidraw diagram, a CSV, or a data model, and each change gets accepted or rejected in place. Trackers for plans and bugs live in the same workspace and are readable and writable by the agents. It also bundles git management (worktrees, AI-assisted commits, workstreams) and a terminal, plus an extension SDK and MCP client for wiring in other tools.

#### Where It Stops

560 open issues against 1,558 stars (2026-08-24) is a high ratio for a project that has been public less than a year, worth checking before depending on it for anything unattended. Codex and Claude Code are the only providers with full support; OpenCode and Copilot integration is still alpha.

---

### 4.8 Liza

Liza is a code-enforced multi-agent control plane for coding work. It launches provider CLIs as workers, assigns each task to a doer/reviewer pair, isolates their branches in git worktrees, and persists coordination state outside model context.

| Attribute | Details |
|-----------|---------|
| **GitHub** | [liza-mas/liza](https://github.com/liza-mas/liza) |
| **Stars** | 363 (2026-08-28), 49 forks |
| **License** | Apache-2.0 |
| **Language** | Go supervisors, Python support utilities |
| **Latest release** | [v0.8.0](https://github.com/liza-mas/liza/releases/tag/v0.8.0), 2026-06-03 |
| **Adapter catalog** | Claude Code, Codex, OpenCode, Kimi, Gemini, Qwen, Mistral, Devin; some disabled by default |
| **Evidence snapshot** | [`a22c123`](https://github.com/liza-mas/liza/commit/a22c12381c5d884d2586a48aaaa517bca184f9cf), 2026-08-27 |

#### What the Code Enforces

Liza's [supervision model](https://github.com/liza-mas/liza/blob/a22c12381c5d884d2586a48aaaa517bca184f9cf/specs/architecture/supervision-model.md) separates semantic work from deterministic lifecycle control. Agents propose task transitions; Go supervisors validate ownership, state, leases, review verdicts, and merge eligibility. The YAML blackboard survives model context loss, while lease generations fence stale workers after recovery. Each doer works in an isolated worktree, and a separate reviewer can reject the submission before the supervisor allows integration.

This makes Liza a useful example of two layers combined. Its `liza init` path installs repository-harness assets such as behavioral contracts, skills, settings, and guardrails. MAS mode adds an orchestrator above the selected runtime. The [provider catalog](https://github.com/liza-mas/liza/blob/a22c12381c5d884d2586a48aaaa517bca184f9cf/provider-catalog.yaml) confirms that Claude Code, Codex, and the other CLIs still own their inner tool loops.

The reviewed commit contained 296 Go test files and passed the project's Ubuntu and macOS CI jobs. This review did not execute the suite locally because Go was unavailable on the review host. Upstream CI is useful maintenance evidence, but it does not establish task quality, recovery success under production load, or security against an untrusted repository.

#### Where It Stops

Liza's isolation boundary is git, not the operating system. Several provider adapters enable broad approval modes, including OpenCode's `--dangerously-skip-permissions` and Devin's `--permission-mode dangerous`. Agents still inherit whatever filesystem, environment, credentials, and network access the underlying process receives. Put an OS or container sandbox and scoped credentials below Liza before unattended use.

The project also publishes an unusually candid [architectural issues ledger](https://github.com/liza-mas/liza/blob/a22c12381c5d884d2586a48aaaa517bca184f9cf/specs/architecture/architectural-issues.md). It records reliance on one orchestrator for semantic interpretation, one supervisor as the correctness gate, incomplete cross-pair review, specification-quality feedback gaps, and context pressure from the behavioral contract. Those limits make Liza suitable for an isolated 8-to-12-ticket pilot, not a default production dependency based on feature count alone.

Read Liza as both a loop system and a domain-specific graph. The frozen [pipeline configuration](https://github.com/liza-mas/liza/blob/a22c12381c5d884d2586a48aaaa517bca184f9cf/internal/embedded/pipeline.yaml) defines the stable organization graph: roles, role pairs, state vocabularies, quorums, and transitions. Runtime tasks and dependencies form the changing work graph. The model does semantic work inside nodes; deterministic Go code validates parts of the transition protocol. Liza is not a general graph runtime, because its transition type is intentionally narrow and its node programs are fixed to the coding lifecycle.

The responsibility boundary is more important than the graph label. Illegal transitions, stale claims, and unmet quorums are mechanically rejectable. Whether a plan is sufficient or a patch is correct still depends on evidence and reviewer judgment. The pinned ledger explicitly identifies unmeasured reviewer accuracy, consequential cross-pair decomposition decisions, provider diversity that is preferred rather than guaranteed, and human checkpoints that constrain throughput. Evaluate workflow correctness and task correctness separately. See [Agent Evaluation](/lib/09-harness/claude-code-ultimate-guide/guide-roles-agent-evaluation#evaluate-judgment-allocation-and-reviewer-independence) for the test protocol.

One independent practitioner report now exists. Hippolyte Durix's [Ippon write-up](https://blog.ippon.fr/2026/04/29/premier-rex-multi-agent-liza/) describes a small Spring Boot, Vue.js, and PostgreSQL catalog run: roughly 30 tasks over 5 automated sprints, 35 review verdicts, 3 rejections corrected and resubmitted, and 3 to 4 hours of human time. The author also reports massive token consumption, required human validation of planning stages, and no test of cross-provider review. This is useful operational evidence from a real user, but not a production benchmark: the project was deliberately simple, the figures are self-reported, and no comparable artifact-level baseline is published.

Liza's maintainer also publishes the separate [bash-policy](https://github.com/liza-mas/bash-policy) project. It parses compound shell payloads into command units, evaluates project policy, and produces `allow`, `manual`, or `deny` decisions. The checked repository had no tagged release and no adoption evidence, so treat it as an inspectable policy experiment rather than a mature security dependency. Its boundary is still useful: command policy can constrain and audit what an agent asks to run, but it does not provide filesystem, credential, process, or network isolation. Pair it with the runtime's native policy engine and an OS-level sandbox.

---

### 4.9 Multica

Multica is an issue-driven control plane for people and coding agents. It keeps workspaces, issues, chat, agent configuration, schedules, and run history in one application, then delegates execution to existing coding-agent CLIs. Claude Code, Codex, Cursor, OpenCode, and the other tools still own their inner model-and-tool loops.

| Attribute | Details |
|-----------|---------|
| **GitHub** | [multica-ai/multica](https://github.com/multica-ai/multica) |
| **Repository snapshot** | 49,348 stars and 6,375 forks on 2026-09-09 |
| **License** | [Multica License](https://github.com/multica-ai/multica/blob/7a438bd5b8bf39afd54259a7eb0971390e50a8ef/LICENSE): Apache 2.0 text plus hosted-service, embedding, branding, and attribution conditions |
| **Stack** | Go server and daemon, PostgreSQL, Next.js web app, Electron desktop app, Expo/React Native mobile app |
| **Surfaces** | Web, desktop, mobile, CLI, API, and team chat channels |
| **Latest release observed** | [v0.4.41](https://github.com/multica-ai/multica/releases/tag/v0.4.41), 2026-09-07 |
| **Runtime catalog** | 26 advertised agent CLI integrations; the audited code contains 25 protocol families plus the OMP runtime identity |
| **Evidence snapshot** | [`7a438bd`](https://github.com/multica-ai/multica/commit/7a438bd5b8bf39afd54259a7eb0971390e50a8ef), 2026-09-05 |

#### What It Actually Does

An issue assignment, direct chat, mention, or scheduled Autopilot creates a run in the server queue. A daemon on a connected computer claims that run, prepares a working directory or git worktree, invokes the configured local CLI, and streams progress, tool activity, errors, token usage, and the final result back to the issue.

```text
issue / chat / mention / Autopilot
              |
              v
Multica server + PostgreSQL
              |
       queued run over WebSocket
              |
              v
daemon on a connected computer
              |
      worktree + local agent CLI
              |
              v
progress, logs, cost, result -> server timeline
```

The deployment mode changes where the coordination tier runs, not this execution split:

| Mode | Coordination tier | Execution tier |
|---|---|---|
| Multica Cloud | Multica hosts the web app, API, and database | Your computer or cloud machine runs the daemon, repository, credentials, and agent CLIs |
| Self-hosted | You run the web app, API, and PostgreSQL with Docker Compose or Helm | One or more connected machines run the daemon and agent CLIs |

If a daemon is offline, new runs stay queued. Runs that were already executing can fail and become eligible for retry; the daemon re-registers runtimes and attempts recovery when it returns. This makes Multica more than a visual session launcher, while still leaving task reasoning and tool execution to the selected CLI.

#### Data and Security Boundary

Local repositories and tool credentials are not automatically uploaded in full. The server does retain issues, comments, agent configuration, run context, execution records, and results. Agent `custom_env` values and MCP configuration are stored server-side and passed to the runtime, so local execution does not mean every secret or task artifact stays on the execution machine.

The [documented security model](https://github.com/multica-ai/multica/blob/7a438bd5b8bf39afd54259a7eb0971390e50a8ef/apps/docs/content/docs/security-model.mdx) makes the operating-system account running the daemon the effective boundary. Runs can read and write what that account can reach, use its credentials, and access the network. The audited default paths launch Claude Code with `bypassPermissions` and Codex with `danger-full-access`, except when the documented Windows Codex sandbox opt-in applies. Use a dedicated OS account, container, or VM with scoped Git and cloud credentials before unattended execution.

The `in_review` state records workflow status inside Multica. It does not configure branch protection or replace Git-host review and merge rules. Agents can use credentials available on the execution machine to push branches or open pull requests, so repository policy remains the enforcement point.

#### Where It Stops

The source review covered the pinned commit, documentation, daemon paths, agent adapters, database queries, licence, and successful upstream CI for that commit. The application was not started and no real agent run was executed. This establishes the architecture and declared controls, not end-to-end reliability, task quality, recovery under load, or protection against a hostile repository.

The repository describes itself as open source, but its licence adds restrictions beyond Apache 2.0. Call it source-available unless legal review establishes a narrower usage conclusion. A team evaluating Multica should pilot the exact cloud or self-hosted topology with non-production credentials, branch protection, one recoverable repository, and an exercised daemon-disconnect scenario.
