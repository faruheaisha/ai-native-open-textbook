---
title: "Anthropic 平台文档（英文全量）"
sourceId: "01-foundations/anthropic-platform-docs-en"
sourceTitle: "Anthropic 平台文档（英文全量）"
sourceKind: "官方文档"
licenseLabel: "仅引用"
lang: "英文"
tier: 3
volume: "01-foundations"
sourceUrl: "https://platform.claude.com/docs"
entryUrl: "https://platform.claude.com/docs"
sourceRel: "docs/en/about-claude/models/optimizing-for-cost-and-intelligence.md"
rawUrl: "/raw/01-foundations/anthropic-platform-docs-en/docs/en/about-claude/models/optimizing-for-cost-and-intelligence.md"
sourceSha256: "02a2c9604100c24f7a4e7265a73c9be80f789384e8402709656d21737957e59e"
pageSha256: "7ad0221be648fd74245619eb698d6089e0e9895943acfbcb4131eae7dc08acf7"
contentMode: "local-full"
zh: ""
---

## Combine models

Multi-model architectures fit workloads whose task complexity varies enough that different steps are best served by different models. When your traffic mixes routine work that a smaller model handles reliably with harder steps that need frontier capability, splitting the work keeps frontier intelligence where it matters while most tokens bill at smaller-model rates. When a workload lacks that mix, because its difficulty is uniform or it is one dependent chain, a single well-tuned model is usually the better choice. Each strategy section gives the rule for telling the two cases apart.

Two strategies cover most workloads, and they differ in which model holds the main loop:

| Strategy         | Control flow                                          | Frontier model's role               | Fits                                                                                                                      | Frontier cost scales with             |
| ---------------- | ----------------------------------------------------- | ----------------------------------- | ------------------------------------------------------------------------------------------------------------------------- | ------------------------------------- |
| **Advisor**      | Smaller model runs the loop, escalates on demand      | Consulted for plans and corrections | Serial work that is hard in spots, such as a coding agent's many turns between a few real decisions                       | How often the executor gets stuck     |
| **Orchestrator** | Frontier model runs the loop, delegates the bulk work | Plans, dispatches, and synthesizes  | Work that fans out across genuinely independent files, documents, or cases, especially more than one context window of it | How hard the pieces are to coordinate |

### Advisor strategy: escalate hard decisions

In the advisor strategy, a lower-cost executor model runs the agent loop and performs most turns. When it hits a decision that needs deeper judgment, such as choosing an approach or recovering from a failure, it calls a higher-intelligence advisor model for strategic guidance, then continues. Most tokens are billed at executor rates, and only the occasional consultations at advisor rates.

To use it, add the [advisor tool](https://platform.claude.com/docs/en/agents-and-tools/tool-use/advisor-tool) to your request. This beta feature runs the whole strategy server-side in one `/v1/messages` request: the executor emits a tool call, Anthropic runs the advisor inference, and the executor continues with the advice; you write no orchestration code. On Claude Managed Agents, [give the session an advisor](https://platform.claude.com/docs/en/managed-agents/multiagent-orchestration#give-the-session-an-advisor) by adding an `advisor` entry to the agent's `multiagent` roster; the session's primary thread consults it the same way. Claude Code supports it too; see [escalating hard decisions with the advisor tool](https://code.claude.com/docs/en/advisor).

![Diagram of the advisor strategy: an executor model runs the main loop and calls a Claude Fable 5.1 advisor on demand](https://platform.claude.com/docs/images/model-routing-advisor-strategy.png)

**What sets the payoff.** The advisor sees the task only through the executor's calls, so two things decide how much it helps.

The first is the gap between the models. The advisor can only hand over capability the executor lacks: on GPQA Diamond[9](https://platform.claude.com/docs/en/about-claude/models/optimizing-for-cost-and-intelligence#refs) a Claude Haiku 4.5 executor gained a great deal from a Claude Opus 5 advisor, a Claude Sonnet 5 executor gained a few points, and a frontier executor almost nothing.

The second, and the fragile one, is whether the executor actually asks (the consult rate). An executor at low effort can stop detecting that it is stuck: a pairing that consults on most tasks at the default effort can fall to consulting on almost none when effort is lowered, and then scores below the executor alone. The rate also varies by task: on DeepSWE[10](https://platform.claude.com/docs/en/about-claude/models/optimizing-for-cost-and-intelligence#refs) a low-effort Sonnet 5 executor kept asking and gained 23 points; on SWE-bench Pro[3](https://platform.claude.com/docs/en/about-claude/models/optimizing-for-cost-and-intelligence#refs) the same executor stopped. When the executor does ask, it recovers much of the gap. Across the pairings in the following chart whose executor kept asking, the advisor closed at least half the gap to the stronger model (the coding pairing beat the stronger model outright), and you pay for the stronger model only on the consultations, which is what makes the cost cases possible:

![Bar chart of six advisor pairings, Claude Fable 5.1 as the advisor where it applies: gap available versus gain realized, labeled with consult rates, which the gains track](https://platform.claude.com/docs/images/cost-intel-advisor-mechanism.png)

The consult rate responds to prompting. With only the tool's built-in description, executors under-call, especially on coding work, so the [advisor tool documentation](https://platform.claude.com/docs/en/agents-and-tools/tool-use/advisor-tool#prompting-for-coding-and-agent-tasks) gives a system prompt that asks for one call before substantive work and one before finishing, about two to three calls per task. The coding pairing measured next ran at that cadence, about two consultations on every task. That page also covers nudging an under-calling executor and capping calls client-side to bound cost. So watch the consult rate: prompt for it, measure it, and restore the executor's effort if it collapses.

**When it pays on cost.** An advisor saves money when a few short consultations, billed at the advisor's rate, replace running the advisor's model for the whole task. That works best when the advisor's model is priced well above the executor's, so the most cost-effective configuration is a frontier advisor over a mid-tier executor. A pairing can hold its own even at the top of the range, because advice also saves executor tokens: an executor told the right approach explores fewer dead ends, which can cover the consultations.

On an internal agentic-coding benchmark[11](https://platform.claude.com/docs/en/about-claude/models/optimizing-for-cost-and-intelligence#refs), run with a plain API agent, a Claude Opus 5 executor with a Claude Fable 5.1 advisor was the most accurate configuration measured, at $7.69 per attempt. It sits above the line through each model's own effort settings: 3.5 points over Opus 5 alone at the default setting for slightly less money, a gap that five attempts per task do separate from noise, and about 2.5 points over the advisor's model alone for about half again the money:

![Chart, coding benchmark: both models' effort curves, with the Opus 5 plus Fable 5.1 advisor pairing 3.5 points over Opus 5 alone and about 2.5 over Fable 5.1 alone](https://platform.claude.com/docs/images/cost-intel-internal-coding-advisor.png)

An earlier measurement through [Claude Code's advisor mode](https://code.claude.com/docs/en/advisor) produced the same ordering. Read this result as a shape to test on your workload: the advisor buys a few points at about the executor's own price. A wider capability gap does not guarantee a better deal. The latency cost is the consultations themselves: about two extra frontier-model calls per task on this benchmark, each on the task's critical path.

**When the stronger model alone is the better step.** Where a workload's accuracy responds to effort, compare the pairing with the advisor's model alone at a reduced setting before building it: the advisor is paid for only on tasks that need it, but a consult that fires on most tasks costs more than running the stronger model itself. On Chartography[13](https://platform.claude.com/docs/en/about-claude/models/optimizing-for-cost-and-intelligence#refs) the same pairing matched Claude Fable 5.1 alone at `medium` within run-to-run noise (65.0 against 67.5) at about 2.6 times the cost per task, because the advisor was consulted on nearly every task. Measure your own consult rate first: if the executor asks on most of its tasks, you are paying advisor rates across the whole workload, and running the advisor's model itself is the cheaper way to the same score.

Whatever the pairing, first price the advisor's model alone at low effort; that is the baseline to beat. Recheck at every model release, because releases move both the capability gap and the price ratio.

**When it fits.** The advisor strategy suits workloads where turns are mostly mechanical but an excellent plan matters: coding agents, computer use, and multistep research pipelines. It fits poorly when every turn genuinely needs frontier capability, when there is nothing to plan (single-turn Q\&A), or when your executor is already close to the advisor's capability.

### Orchestrator strategy: delegate bulk work

In the orchestrator strategy, the frontier model holds the loop. It decomposes the task, dispatches subtasks to lower-cost worker models, and merges their results. The orchestrator's own transcript stays short because workers absorb the token-heavy exploration, so most tokens are billed at worker rates while the plan and synthesis still come from the frontier model.

To build one, use [multiagent orchestration](https://platform.claude.com/docs/en/managed-agents/multiagent-orchestration) in Claude Managed Agents: configure a coordinator agent (the orchestrator) and a roster of worker agents, each with its own model. For a complete working example with a frontier coordinator and Claude Sonnet 5 workers, see the Claude Cookbook recipe [Coordinator pattern: big models for planning, small models for execution](https://github.com/anthropics/claude-cookbooks/blob/main/managed_agents/CMA_plan_big_execute_small.ipynb).

![Diagram of the orchestrator strategy: a Claude Fable 5.1 orchestrator fans subtasks out to three Claude Sonnet 5 workers](https://platform.claude.com/docs/images/model-routing-orchestrator-strategy.png)

This pattern saves wall-clock time when workers can run in parallel: on the corpus benchmark[8](https://platform.claude.com/docs/en/about-claude/models/optimizing-for-cost-and-intelligence#refs), an episode took about 2.3 hours with the coordinator running the platform's documented limit of 25 concurrent workers, compared with 15 to 20 hours solo. It saved money in only two measured situations. On work a single model could handle alone, the same model at lower effort was cheaper every time.

**Case 1: insurance against the cost tail on routine work.** A frontier model running alone occasionally spirals on a routine problem it would normally solve. Because you cannot tell in advance which those will be, a few such runs dominate the bill. A coordinator that hands routine work to a lower-cost worker caps that tail, because any spiraling now happens at worker rates.

Anthropic measured this on a deliberately easy slice of BrowseComp[4](https://platform.claude.com/docs/en/about-claude/models/optimizing-for-cost-and-intelligence#refs) (10 problems the solo model reliably solves; 50 delegated and 70 solo runs). A Claude Fable 5 coordinator with one Claude Sonnet 5 worker cost about half as much as Claude Fable 5 alone on average and about a third as much at the 90th percentile ($12 compared with $33), and the solo model's single most expensive run, at $84, was also wrong:

![Dot plot, BrowseComp routine slice: delegated runs cost about half of Claude Fable 5 alone on average, a third at the 90th percentile](https://platform.claude.com/docs/images/cost-intel-tail-insurance.png)

Delegation paid on the routine, normally solvable share of the work, the opposite of the intuition that workers are for hard problems. On the full, harder BrowseComp set, the economics reversed. If your traffic has a long cost tail on routine tasks, this is the orchestrator case to measure first.

**Case 2: work larger than one context window.** A solo model must work through an input that large serially, one context window at a time, paying to re-read its own state on every pass. Workers each read their own partition, in parallel and at worker rates. Reading-heavy work that still fits in one context window is a model-choice problem, not a delegation problem: on reading cost alone, the orchestrator comes out ahead only when no single context can hold the work.

Anthropic built a benchmark for this case[8](https://platform.claude.com/docs/en/about-claude/models/optimizing-for-cost-and-intelligence#refs): a 21.6-million-token corpus of 14 public Python packages with 130 planted defects, too large for any context window. Lowering effort cannot help, because the bill is the corpus read itself: Claude Fable 5.1 solo cost $468 to $552 per episode across the three effort settings, and only its accuracy moved. The coordinator configuration, a Claude Fable 5.1 lead over 25 Claude Sonnet 5 workers, cost about half as much as those settings (47% to 55% less) and scored 10 to 12 points below them, in about 2.3 hours per episode against 15 to 20, while beating a Claude Sonnet 5 solo baseline outright:

![Chart, corpus benchmark: the coordinator costs about half as much as Fable 5.1 solo at any effort, about 12 points below its best](https://platform.claude.com/docs/images/cost-intel-corpus-pareto.png)

The token accounting shows the scale of the reading: the coordinator configuration read about 560 million cached tokens per episode, about one and a half times the solo model's roughly 365 million, nearly all of them at Claude Sonnet 5's cache-read rate, and still cost about half as much overall. Fable 5.1 at `high` effort still holds peak accuracy, at about 2.2 times the coordinator configuration's cost, so delegation here buys most of the accuracy, not all of it.

**When delegation doesn't pay.** An orchestrator buys something only when there is bulk to hand off: many independent pieces, ideally too many for one context window. When the work is one dependent chain, or fits in a single context, the orchestrator pays for a plan, a handoff, and a merge that a single model gets for free. In every such case measured, the coordinator's model alone at lower effort came out ahead.

The boundary is task difficulty, not the benchmark: on the full, harder BrowseComp[4](https://platform.claude.com/docs/en/about-claude/models/optimizing-for-cost-and-intelligence#refs) set, Claude Fable 5 alone reached the coordinator configuration's accuracy at 22% to 30% lower cost. Independent external work reports the same pattern[5](https://platform.claude.com/docs/en/about-claude/models/optimizing-for-cost-and-intelligence#refs). If the work is one chain, fits in one context without a long cost tail, or a single model at lower effort already meets your bar, don't build an orchestrator.

### Choose between the strategies

Most cases come down to one question: does the work split into independent pieces, or is it one answer reached through a chain of dependent steps? The [strategy table](https://platform.claude.com/docs/en/about-claude/models/optimizing-for-cost-and-intelligence#combine-models) maps the two answers to the two strategies.

If you are unsure, don't build anything yet:

1. Sweep effort on your current model first. It is the cheapest experiment on this page, and most workloads end there.
2. If the sweep shows a gap, price the stronger model alone at low effort. That is the number an advisor pairing has to beat, and the pairings on this page that beat it were the ones whose executor actually consulted.

The multi-model results on this page were judged against the same model at lower effort and against the next model down running alone. That is the comparison to run on your own workload, and why the first step is an effort sweep.

When you do add an advisor, it is a tool definition rather than a rearchitecture.
