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
pageSha256: "429423b27d9b0b4a5cfbdc1e102b721b7e52410c432f0d08e2276540c803e2b9"
contentMode: "local-full"
zh: ""
---

## Trade cost against intelligence

These levers set where a single model sits between cost and intelligence: model choice, effort, re-running failures at a higher setting, and the budgets and caps it works within. Start with an effort sweep on your current model ([Tune effort](https://platform.claude.com/docs/en/about-claude/models/optimizing-for-cost-and-intelligence#tune-effort)). From lowest to highest cost and capability, the current models are Claude Haiku 4.5, Claude Sonnet 5, Claude Opus 5, and Claude Fable 5.1 (the frontier model); [Models overview](https://platform.claude.com/docs/en/models/overview) has the full lineup and prices.

### Compare models on cost per task

Price lists are written per token, and per token the frontier model looks expensive: Claude Fable 5.1's per-token price is several times Claude Sonnet 5's. You pay for completed tasks, though, so compare models on cost per completed task. A more capable model finishes a task with less work: fewer turns, less searching, less re-reading of its own context, and less backtracking. The per-token premium is often overwhelmed by doing less of everything.

Anthropic measured this on the SWE-bench Pro[3](https://platform.claude.com/docs/en/about-claude/models/optimizing-for-cost-and-intelligence#refs) subset, priced as a customer is billed:

![Scatter chart, SWE-bench Pro: Claude Fable 5.1 at low effort solves 11 points more than Claude Sonnet 5 for 35% less per solved task; Claude Opus 5 at low effort is cheaper still](https://platform.claude.com/docs/images/cost-intel-cost-per-task.png)

Claude Fable 5.1 at `low` effort solved 88.6% of tasks for $0.54 per solved task, against 77.4% for $0.84 from Claude Sonnet 5 at its default: 11 more points for 35% less per solved task, despite a per-token price five times higher. It does not always win, though. On the same subset, which both models largely saturate and whose scores are not comparable to the public leaderboard, Claude Opus 5 alone matched Claude Fable 5.1 alone at the default (91.7% compared with 92.1%, inside run-to-run noise) at about 15% less per solved task ($1.01 against $1.19), and Opus 5 at `low` solved 84.0% for $0.25. And on long research loops the frontier model does more work, not less: on DeepResearch Bench II[7](https://platform.claude.com/docs/en/about-claude/models/optimizing-for-cost-and-intelligence#refs), Fable 5.1 at `low` scored 10 points above Sonnet 5 (66% against 56%) at about four times the cost per task ($4.66 against $1.20), because it runs a longer research loop over a larger context. Claude Opus 5 at its default scored 71% on the same basis for $6.71 per task, above Fable 5.1 at its default (65% for $7.12), so on research too Fable 5.1 earns its price only at `low`.

For most agent workloads, start with Claude Fable 5.1 at `low` effort and raise effort where it misses. Per token it costs twice what Claude Opus 5 does on uncached input, but half as much on cached input ($0.25 against $0.50 per million), and in an agent loop cached input is the largest term. On the coding benchmark in [Advisor strategy](https://platform.claude.com/docs/en/about-claude/models/optimizing-for-cost-and-intelligence#advisor-strategy-escalate-hard-decisions), Fable 5.1 at `medium` matched Opus 5 at its default for about a third of the cost per attempt ($2.91 against $8.50). On Chartography[13](https://platform.claude.com/docs/en/about-claude/models/optimizing-for-cost-and-intelligence#refs), a chart-reading benchmark, Fable 5.1 at `low` scored 62.5 for $0.15 a chart, compared with 49 for $0.38 from Opus 5 at `low`. On the SWE-bench Pro subset, Claude Opus 5 at its default remains the cheaper way to the top score, as noted earlier. At the other end, Claude Haiku 4.5 answered GPQA Diamond[9](https://platform.claude.com/docs/en/about-claude/models/optimizing-for-cost-and-intelligence#refs) questions at about a tenth of Opus 5's cost per question, with 63% accuracy compared with 92% for Opus, and fell much further behind on long coding tasks. It fits high-volume work with checkable outputs, not long agentic loops.

The ranking flips by workload, and no price list tells you which way. Price every candidate in cost per completed task on your own traffic, including Claude Opus 5 and the frontier model at reduced effort.

Price the tail of your workload, not the median: compare models on the hardest tenth of your tasks, not the typical one. On the typical task every model looks similar and the cheapest looks best, but the bill is decided by the tasks the cheaper model fails, because a failed task still bills its tokens, then the retry, then whatever the failure costs downstream. The tail is also where the money goes even when nothing fails. On a 20-problem WideSearch[1](https://platform.claude.com/docs/en/about-claude/models/optimizing-for-cost-and-intelligence#refs) run, two problems carried 43% of the spend:

![Bar chart of 20 WideSearch problems ranked by cost: the top two carry 43% of spend and the cheapest half 10%](https://platform.claude.com/docs/images/cost-intel-tail.png)

The [multi-model strategies](https://platform.claude.com/docs/en/about-claude/models/optimizing-for-cost-and-intelligence#combine-models) exist to spend frontier intelligence on that tail without paying frontier rates for the rest.

### Upgrade the model

If you are a model or two behind, the cheapest lever is the model string. Anthropic ran recent Claude Opus, Claude Sonnet, and Claude Fable models through the same harness on the SWE-bench Pro[3](https://platform.claude.com/docs/en/about-claude/models/optimizing-for-cost-and-intelligence#refs) subset, each at its shipped defaults and priced at list rates, and ran the Opus line again on Terminal-Bench 3[20](https://platform.claude.com/docs/en/about-claude/models/optimizing-for-cost-and-intelligence#refs):

![Two charts of cost per solved task against tasks solved: on SWE-bench Pro every model solves most tasks and the upgrade steps are small; on Terminal-Bench 3 the Opus ladder falls from $183 to $63 to $28 per solved task](https://platform.claude.com/docs/images/cost-intel-upgrade-ladder.png)

Anthropic prices the Opus line identically per token across versions, so any difference comes from how much work each model does per task: priced as a customer is billed, Claude Opus 4.8 solves the same share of tasks as Claude Opus 4.7 for 14% less per solved task, and Claude Opus 5 then solves 12 more points of tasks at 21% more per solved task. Claude Opus 5 at `low` effort beats Opus 4.8's default on this benchmark for about 30% of its cost per solved task, so the cheapest upgrade is the new model at a lower setting. Sonnet 5's saving comes from its lower per-token price, which more than offsets the extra tokens it uses per task compared with Sonnet 4.6: 15% less per solved task for 5 more points. The frontier tier gained the same way: Claude Fable 5.1 matches Claude Fable 5's score for 43% less per solved task, most of it the lower cache-read price. That direction is not guaranteed: on DeepResearch Bench II[7](https://platform.claude.com/docs/en/about-claude/models/optimizing-for-cost-and-intelligence#refs) the same upgrade costs 41% more per task at `high` (79% more at `low`) for its 2 to 3 extra points on the tasks clean in every arm (reference 7), because the new model does more work per task there. The input and output prices are the same and the cache read is 4x cheaper, so measure the upgrade on your own workload before assuming it saves.

On harder work the gap widens. On Terminal-Bench 3[20](https://platform.claude.com/docs/en/about-claude/models/optimizing-for-cost-and-intelligence#refs), where the tasks are hard enough that pass rate rather than tokens sets the bill, Claude Opus 4.7, Opus 4.8, and Opus 5 each spend $8 to $15 per task but solve 7%, 15%, and 41% of tasks, so cost per solved task falls from $183 to $63 to $28 up the ladder. The 21% premium Claude Opus 5 carries over Opus 4.8 on the saturated coding subset becomes a 56% saving on Terminal-Bench 3, where the older model mostly fails: the more your workload defeats the old model, the more the upgrade saves per result.

Compare on cost per solved task, not per token: the same text costs about 30% more tokens on Claude Opus 4.7 and later, so a per-token comparison makes the newer models look more expensive by construction.

### Tune effort

Effort is the most direct way to tune a model to your task. The `effort` parameter governs how much thinking, tool calling, and self-verification the model does, and the default (`high`) suits demanding tasks. Cost scales with all that activity; accuracy scales only with the part your task needs. Below the model's ceiling, the highest effort levels pay for depth the task never uses.

On the research and knowledge-work benchmarks (WideSearch[1](https://platform.claude.com/docs/en/about-claude/models/optimizing-for-cost-and-intelligence#refs), DeepWideSearch[6](https://platform.claude.com/docs/en/about-claude/models/optimizing-for-cost-and-intelligence#refs), BrowseComp[4](https://platform.claude.com/docs/en/about-claude/models/optimizing-for-cost-and-intelligence#refs), and GDPval[2](https://platform.claude.com/docs/en/about-claude/models/optimizing-for-cost-and-intelligence#refs), all with Claude Fable 5), the curve of accuracy against cost is nearly flat: `low` gave up 1 to 3 points for a third to a half off the cost per task, `medium` matched the default's accuracy at about 70% to 87% of its cost, and the default bought nothing measurable over `medium` on any of the four. On DeepWideSearch, `low` also matched an orchestrator with a Claude Sonnet 5 worker at 29% lower cost: lowering effort beat an architecture change.

Lower effort settings are often faster, which matters when latency is the constraint. In these runs, `low` took 4.5 minutes per problem on DeepWideSearch, compared with 7.9 minutes at the default. On the [corpus benchmark](https://platform.claude.com/docs/en/about-claude/models/optimizing-for-cost-and-intelligence#orchestrator-strategy-delegate-bulk-work), whose input does not fit in any single context window, Fable 5.1 took 15.2, 17.5, and 19.9 hours per episode at `low`, `medium`, and `high`.

Long-horizon coding is where effort genuinely buys accuracy. On SWE-bench Pro[3](https://platform.claude.com/docs/en/about-claude/models/optimizing-for-cost-and-intelligence#refs), Claude Opus 5 gave up about 2 points at `medium` for half the cost and about 8 points at `low` for a quarter of it: a real tradeoff, which [re-running failures at higher effort](https://platform.claude.com/docs/en/about-claude/models/optimizing-for-cost-and-intelligence#re-run-failures-at-higher-effort) turns back into a saving. This chart plots accuracy against cost for the research and knowledge-work benchmarks and for SWE-bench Pro:

![Line charts of accuracy against cost by effort on five benchmarks: nearly flat on four research tasks, steep on SWE-bench Pro](https://platform.claude.com/docs/images/cost-intel-effort-sweep.png)

Two consequences follow. First, draw this curve for your own workload before you add a second model: in these internal measurements, a multi-model configuration that looked cheaper than the default single model cost more than that same model at lower effort. Second, this curve is the single-model baseline any multi-model strategy must beat, so [step 2 of measuring on your own workload](https://platform.claude.com/docs/en/about-claude/models/optimizing-for-cost-and-intelligence#measure-on-your-own-workload) baselines across effort levels.

Hard work does not automatically need high effort. On DeepResearch Bench II[7](https://platform.claude.com/docs/en/about-claude/models/optimizing-for-cost-and-intelligence#refs), Claude Fable 5.1 scored nearly the same at `low`, `medium`, and `high` while the cost per task rose from $4.66 to $7.12, so raising the effort in this case does not increase the quality of the output noticeably; on the 21 tasks clean in every arm (reference 7), Claude Fable 5 was flat across effort too, though the chart's 33-task basis, which drops each model's own cut-short attempts, shows it climbing. Measure the curve on the model you ship, not the one you measured last:

![Line chart of rubric score against cost per task on DeepResearch Bench II: on Claude Fable 5.1 higher effort bought no score, only cost](https://platform.claude.com/docs/images/cost-intel-effort-limit.png)

The task description alone does not reveal which kind of workload you have, so sweep two or three effort levels on a sample of your own traffic and read the answer off the curve. Test each level in a separate session: changing top-level effort mid-session invalidates the cache (see [Cache repeated context](https://platform.claude.com/docs/en/about-claude/models/optimizing-for-cost-and-intelligence#cache-repeated-context)) and distorts the comparison. For parameter details, see [Effort](https://platform.claude.com/docs/en/build-with-claude/effort).

### Re-run failures at higher effort

When a task's outcome is checkable, the cheapest policy on the effort curve is not a fixed setting: run every task at a low setting and re-run only the failures at a higher one.

Anthropic computed this policy task by task from the effort runs on the SWE-bench Pro[3](https://platform.claude.com/docs/en/about-claude/models/optimizing-for-cost-and-intelligence#refs) subset in [Tune effort](https://platform.claude.com/docs/en/about-claude/models/optimizing-for-cost-and-intelligence#tune-effort). With Claude Opus 5 at `low`, 16% of tasks failed; with those re-run at the default, about 93% passed for about $0.45 each, against 91.7% for $0.93 running everything at the default: the same pass rate for half the cost, counting the failed cheap attempts. Starting at `medium` instead solved about 94% for about $0.61. Most of the small lift is the second attempt (re-running the default's own failures at the default scores about the same, for more money), so use this policy for the saving, not the lift:

![Chart, SWE-bench Pro: running low or medium and re-running failures at the default beats every fixed effort setting on cost](https://platform.claude.com/docs/images/cost-intel-escalation.png)

Two conditions apply. First, you need a failure signal (here, the benchmark's own tests); a checker that passes bad work lets those failures through. Second, every first-pass failure takes two runs' worth of wall-clock time, so the saving is paid for in latency on the failures.

### Set budgets and output caps

Most agentic task runs are cheap, but a minority spend many times the median cost on searching, re-verifying, and over-testing. A [task budget](https://platform.claude.com/docs/en/build-with-claude/task-budgets) targets that tail. The model sees a live token countdown for the whole task and self-regulates, trimming low-value searches, skipping redundant verification, and wrapping up instead of spiraling.

Anthropic measured pass rate and cost per task on SWE-bench Pro[3](https://platform.claude.com/docs/en/about-claude/models/optimizing-for-cost-and-intelligence#refs) with Claude Fable 5.1 as the budget tightened:

![Line chart on SWE-bench Pro: pass@1 falls a few points as task budgets tighten while cost per task drops by 44% to 58%](https://platform.claude.com/docs/images/cost-intel-budget-pareto.png)

A generous budget cut cost per task 44% for about 3 points of pass rate, at the edge of run-to-run noise, and the tightest allowed budget cut it 58% for 6 points. Budgets bought efficiency here, at a price in pass rate that grows as the budget tightens.

Three controls do three different jobs. A task budget saves money, because the model sees it. `max_tokens` is a safety cap: lowering it cut cost per attempt without lowering cost per solved task. On Claude Managed Agents, a session budget is the hard dollar stop behind both. Set all three: a task budget, a high `max_tokens`, and a session cap for the run you never want on a bill, with a [workspace spend limit](https://platform.claude.com/docs/en/api/rate-limits#setting-lower-limits-for-workspaces) as the final backstop.

* **Task budgets** are in beta (beta header `task-budgets-2026-03-13`) on the most recent models; check the [support table](https://platform.claude.com/docs/en/build-with-claude/task-budgets#feature-support) for which. Start near your loop's 90th-percentile token usage, then tighten ([Choosing a budget](https://platform.claude.com/docs/en/build-with-claude/task-budgets#choosing-a-budget) shows how to collect that distribution). Budgets below the current 20,000-token floor are rejected, and very tight budgets can produce refusal-like behavior. Set the budget once, on the first request, because a mid-task change [invalidates the cache](https://platform.claude.com/docs/en/about-claude/models/optimizing-for-cost-and-intelligence#cache-repeated-context). The budget is advisory, steering the model rather than stopping it, so verify adherence on your workload.
* **`max_tokens`** caps a single response, invisibly to the model, so lowering it does not make the model economize. The turns that needed the room are discarded and still billed. On an internal repository-task benchmark[12](https://platform.claude.com/docs/en/about-claude/models/optimizing-for-cost-and-intelligence#refs), a 16,384-token cap ended 15% of Claude Opus 5's attempts and 43% of Claude Fable 5.1's at the default effort, and only 9 of the 117 capped Fable attempts still passed. Capped runs spent less per attempt but bought proportionally fewer solves, so cost per solved task was about the same as at 64,000 ($21 against $22). At 64,000, 2 of about 14,000 turns at the default effort were still cut off, and Fable 5.1 solved 58.5% of tasks instead of 36.3% (on a separate cut of the SWE-bench Pro[3](https://platform.claude.com/docs/en/about-claude/models/optimizing-for-cost-and-intelligence#refs) subset, described in reference 12, no difference: 94 of 100 at either cap). Retrying capped attempts rarely helps: at the same cap most of them fail again, and at a higher one you also pay for the wasted attempt. Set `max_tokens` to 64,000 for agentic work, or to 128,000, the maximum, when a single cut-off attempt is costly; at 128,000 Fable 5.1 solved 60.0% for the same cost per solved task. [Stream responses](https://platform.claude.com/docs/en/build-with-claude/streaming) that large, treat [`stop_reason: max_tokens`](https://platform.claude.com/docs/en/build-with-claude/handling-stop-reasons#max-tokens) as a failure, and save money with effort and task budgets, which the model can see.
* **Session budgets on Claude Managed Agents** are the hard stop. A [session budget](https://platform.claude.com/docs/en/managed-agents/budgets) is a dollar cap on one session at list rates for tokens, searches, and session time. At the cap, the session pauses with `stop_reason: budget_reached`; raising the budget resumes it. It is platform-enforced, works on any model with a list price, including models where task budgets are not yet available, and combines with the advisory task budget. Deployments apply the same field to every run.

Ask for shorter answers. Output tokens cost five times input tokens on Claude Sonnet 5, and in an agent loop every token the model writes comes back as input on every later turn, so you pay for a long answer again and again. Anthropic ran the triage job under three final-answer instructions, three runs each, with the same model and tools. The original asked for two lines:

```text wrap
4. Finish with exactly two lines:
LABEL: <one of: bug-confirmed, needs-more-info, duplicate-candidate, feature-request, upstream-issue, perf, ui-polish>
SUMMARY: <one or two sentences for the engineering team>
```

The shorter variant asked for one:

```text wrap
4. Finish with exactly one line in this form:
DECISION | LABEL | REASON
where DECISION is one of: triage-now, needs-info, close-duplicate; LABEL is one of: bug-confirmed, needs-more-info, duplicate-candidate, feature-request, upstream-issue, perf, ui-polish; REASON is one clause under 15 words. Output nothing after that line.
```

The longer variant asked for a memo with five headed sections: problem summary, evidence, duplicate check, recommended label, and next steps. For one issue, a queued prompt that never sends after a skipped question, the first two answers were:

```text wrap
LABEL: bug-confirmed
SUMMARY: When a user submits a new prompt instead of answering an agent's pending question, the question is cancelled/skipped but the new prompt remains stuck in "QUEUED" state indefinitely since it's waiting on a response to the now-cancelled question; the queued prompt should be processed immediately after cancellation.
```

```text wrap
triage-now | bug-confirmed | Clear repro steps show prompt queues indefinitely after cancelled question.
```

![Bar chart: one-line format $0.49 per run, original two-line format $0.57, memo $1.40, all 78% to 85% correct](https://platform.claude.com/docs/images/cost-intel-output-format.png)

The one-line answer used 39% fewer output tokens than the two-line original and cost 14% less per run. The memo used six times the output tokens and cost 2.8 times the one-line answer. All three scored within run-to-run noise of each other against the gold labels, so the formats differ in what you pay far more than in what they get right. Ask for the answer you will read, not the one that looks thorough.

At the lower `max_tokens` cap both models spend less per attempt but solve proportionally fewer tasks, so cost per solved task barely moves:

![Bar charts: at a 16k cap both models spend less per attempt but about the same per solved task as at 64k, because they solve fewer tasks](https://platform.claude.com/docs/images/cost-intel-max-tokens-saving.png)

Almost every turn finishes far below either cap. The rare long turn is what the higher cap buys:

![Dot plot of per-turn output for Opus 5 and Fable 5.1: medians a few hundred tokens, longest turns 33k and 128k, against the caps](https://platform.claude.com/docs/images/cost-intel-max-tokens-ladder.png)
