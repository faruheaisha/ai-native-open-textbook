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
pageSha256: "2c982f6f14af85c37ab7c7a613f0438ad68d6d01cf3ceaa4d7e212aea2d32d8d"
contentMode: "local-full"
zh: ""
---

## Section 2: Autonomous Coding Agents

These tools run without you watching. You give them a task description (a GitHub issue, a spec, a bug report), and they produce a pull request. The interaction model is fundamentally different from terminal agents: less iterative, more like assigning work to a colleague.

---

### 2.1 Devin (Cognition)

The first commercial fully autonomous software engineer. Closed-source, cloud-hosted, enterprise-priced.

| Attribute | Details |
|-----------|---------|
| **Website** | [devin.ai](https://devin.ai) |
| **Type** | Cloud SaaS, proprietary |
| **Pricing** | Core: $20/mo (pay-as-you-go ACUs), Team: $500/mo (250 ACUs), Enterprise: custom |
| **Launched** | 2024 |
| **Valuation** | $25B (April 2026 fundraise) |
| **Notable acquisition** | Windsurf AI-native IDE (July 2025) |
| **Enterprise customers** | Goldman Sachs, Microsoft, Palantir, Citi, Dell |

#### What Is Devin?

An autonomous software engineer that runs in a cloud-based Linux VM with its own shell, code editor, and browser. Devin plans its approach, writes code, runs tests, reads error messages, and iterates until the task is complete or it gets stuck. The primary interface is Slack: you send a message like "fix issue #342" and Devin opens a PR when done.

Billing is in ACUs (Agent Compute Units), where 1 ACU maps to roughly 15 minutes of agent work. A complex feature might consume 10-20 ACUs; a simple bug fix might use 1-3.

#### Claude Code vs Devin

| Aspect | Claude Code | Devin |
|--------|-------------|-------|
| **Execution environment** | Your local machine | Cloud Linux VM (sandboxed) |
| **Interaction model** | Interactive (you watch) | Async (assign and check back) |
| **State** | Session-scoped | Persistent across the task |
| **Pricing** | Subscription ($20-$200/mo) | Per-task ACU billing ($0.07-$0.15/ACU approx) |
| **Who drives** | You (pair programming) | Agent (autonomous, you review) |
| **Task specification** | Conversational, iterative | Upfront (better spec = better output) |
| **Browser access** | Via MCP (Playwright) | Built-in, native |
| **Code review integration** | You review in your IDE | Devin posts a PR, you review on GitHub |

#### When to Choose Devin

Devin works best when the task is well-specified, bounded, and does not require continuous judgment calls. Refactoring a specific module, implementing a documented API endpoint, fixing a regression with a known root cause: these are Devin tasks. Designing a new system architecture, debugging an obscure production issue, or writing code that depends on implicit context in your codebase: these require a more interactive loop.

The $500/month Team plan (250 ACUs) is substantial. At that price point, you are paying for the async value: developers not blocked waiting for agent output, agents running in parallel on multiple tasks, no context switching. If your bottleneck is developer attention rather than raw throughput, Devin is worth the calculation. If you want to stay in the loop and iterate interactively, Claude Code at $200/month delivers more value per dollar.

The Windsurf acquisition (July 2025) signals Cognition moving toward a full developer environment, not just a background agent. Watch for integrated workflows combining interactive coding (Windsurf IDE) and autonomous task execution (Devin) in the same product.

---

### 2.2 SWE-agent (Princeton)

An academic agent designed specifically for resolving GitHub issues from an issue description alone. NeurIPS 2024 paper, Princeton NLP Group and Stanford.

| Attribute | Details |
|-----------|---------|
| **GitHub** | [SWE-agent/SWE-agent](https://github.com/SWE-agent/SWE-agent) |
| **Stars** | 19,300+ (May 2026) |
| **Paper** | NeurIPS 2024 |
| **License** | MIT |
| **Language** | Python (95%) |
| **Version** | v1.1.0 (May 2025) |
| **Maintainers** | Princeton NLP Group + Stanford |

#### What Is SWE-agent?

An agent pipeline that takes a GitHub issue URL and a model, then attempts to reproduce the bug, write a fix, and produce a patch. Its architecture uses an Agent-Computer Interface (ACI) layer that abstracts terminal, file editing, and test running into a consistent set of commands regardless of the underlying environment. This ACI design is the main academic contribution: it shows that agent performance correlates strongly with how well the environment exposes information, not just with the model's raw capability.

The peer-reviewed NeurIPS 2024 evaluation did not test Claude 3.7 or an open-weight model in its principal SWE-bench result. On the full SWE-bench test set, SWE-agent resolved 12.47% of issues with GPT-4 Turbo and 10.46% with Claude 3 Opus. Table 1 reports average API inference costs of $1.59 and $2.59, respectively, averaged only over successfully resolved instances, with a $4 cap per run. These figures describe the paper's 2024 benchmark configuration, not current state of the art. Source: [Yang et al., SWE-agent](https://proceedings.neurips.cc/paper_files/paper/2024/file/5a7c947568c1b1328ccc5230172e1e7c-Paper-Conference.pdf), PDF pp. 5-6, Table 1.

#### When to Choose SWE-agent

Primarily academic and research use. If you want to run systematic evaluations of how different models perform on real GitHub issues, SWE-agent is the right tool because it has the reproducibility infrastructure (trajectory logging, evaluation harness, config YAML) that production tools skip.

For production batch issue resolution, Devin's cloud sandbox and better error recovery make it more practical. SWE-agent requires you to set up the environment and handle failures manually.

The research value is real: teams building agent systems can use SWE-agent's trajectory data (generated from issue resolution runs) to fine-tune models. Nous Research's SWE-agent-LM-32b (open weights, SoTA on SWE-Bench for open models) was trained on trajectories generated by SWE-agent.

```bash
pip install swe-agent

# Run on a GitHub issue
sweagent run \
  --agent.model.name=claude-sonnet-5 \
  --env.repo.github_url=https://github.com/org/repo \
  --problem_statement.github_url=https://github.com/org/repo/issues/123
```

---

### 2.3 Claude Code in Headless Mode

Claude Code's own autonomous mode: `claude -p "task"` runs a single instruction non-interactively and exits. Combined with CI/CD, it becomes an autonomous agent that triggers on GitHub events, runs on schedule via Routines, or processes tasks programmatically via the Agent SDK.

**This falls in the programmatic billing bucket since June 15, 2026.** See [Billing: Programmatic vs Interactive](/lib/09-harness/claude-code-ultimate-guide/guide-ultimate-guide/index#the-interactiveprogrammatic-billing-split-effective-june-15-2026) for the credit limits and overage rates.

Patterns:

```bash
# Single task, exits when done
claude -p "Write tests for src/auth.ts, aim for 80% coverage"

# GitHub Actions: triggered by issue label
# See workflows/event-driven-agents.md for the full pattern

# Agent SDK: programmatic with tools
# See ai-ecosystem.md §14 (Claude Managed Agents)
```

Cross-references:
- **Event-driven patterns**: [workflows/event-driven-agents.md](/lib/09-harness/claude-code-ultimate-guide/guide-workflows-event-driven-agents)
- **Agent teams**: [workflows/agent-teams.md](/lib/09-harness/claude-code-ultimate-guide/guide-workflows-agent-teams/index)
- **Managed Agents (cloud)**: [ai-ecosystem.md §14](/lib/09-harness/claude-code-ultimate-guide/guide-ecosystem-ai-ecosystem/index#14-claude-managed-agents)

---

### 2.4 OpenHands (All Hands AI)

Open source autonomous coding platform, formerly OpenDevin. The closest self-hostable equivalent to Devin.

| Attribute | Details |
|-----------|---------|
| **GitHub** | [OpenHands/OpenHands](https://github.com/OpenHands/OpenHands) |
| **Stars** | 79,900+ (July 2026) |
| **Model support** | Claude, GPT, Gemini, open-weight models |
| **Deployment** | Self-host (free) or OpenHands Cloud/Enterprise (paid) |
| **Execution** | Sandboxed environment |

#### What Is OpenHands?

A planning agent builds a dependency graph before any work starts, then spawns sub-agents to execute it: tasks with no dependencies (Tier 0) run in parallel, and each Tier 1 task starts as soon as its specific dependency resolves rather than waiting for all of Tier 0 to finish. An integrator agent then merges the resulting files, fixes import paths, wires API calls to frontend components, and runs the full test suite before handing back a result.

#### When to Choose OpenHands

OpenHands is the practical choice when you want Devin's dependency-graph parallelism without the per-task billing or the closed-source lock-in. Self-hosting means you control the sandbox and the model routing, at the cost of running the infrastructure yourself.

The governance layer (guardrails, budgets, an internal plugin marketplace, full audit trail) sits behind OpenHands Cloud/Enterprise. The open source core gives you the execution graph and the sandbox, not the organization-wide policy enforcement. If your priority is deterministic gates and traceability across a team, budget for the paid tier or pair OpenHands with an external policy layer.
