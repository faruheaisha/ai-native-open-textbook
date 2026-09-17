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
pageSha256: "b87f310c2266874b3eeccc227c942959d2fa11191f038a29e7ed95c74b198510"
contentMode: "local-full"
zh: ""
---

## Cut spend without losing quality

Prompt caching, token hygiene, batch processing, and a prompt audit against your current model all lower what you pay without lowering output quality. Two caveats apply: batch processing trades latency for its discount, and context editing, a token-hygiene lever, cost more than it saved in the run measured in this section.

### Cache repeated context

#### Why caching comes first

Turn on [prompt caching](https://platform.claude.com/docs/en/build-with-claude/prompt-caching) before any other lever, because every turn of an agentic task resends the entire growing conversation: system prompt, tool definitions, and every prior turn. A 40-turn task sends its first turn 40 times, so task cost grows with roughly the square of turn count. Caching does not stop the resending, but each resend costs about a tenth as much and processes faster: the prefix is billed at the [cache-read rate](https://platform.claude.com/docs/en/build-with-claude/prompt-caching#pricing), a tenth of the input price, and each turn pays the 1.25x cache-write rate only for what is new.

**What good looks like.** Over a full day of real traffic, agent loops read a median 84% of their input from the cache, and the top 10% of harnesses, coding or not, read 94% or more[17](https://platform.claude.com/docs/en/about-claude/models/optimizing-for-cost-and-intelligence#refs). Deep in a task, a well-built loop pays full price on under 1% of its input. Below about 80%, look for something breaking the cache (see [What breaks the cache](https://platform.claude.com/docs/en/about-claude/models/optimizing-for-cost-and-intelligence#what-breaks-the-cache)).

Across Anthropic's measured runs, cache reads are routinely the largest single component of task cost, making caching worth more than most model-choice decisions. Anthropic priced the DeepResearch Bench II[7](https://platform.claude.com/docs/en/about-claude/models/optimizing-for-cost-and-intelligence#refs) runs with and without caching:

![Dumbbell chart, DeepResearch Bench II: with caching, Claude Fable 5.1 falls from $37.94 to $7.12 per task and Claude Sonnet 5 from $3.20 to $1.20](https://platform.claude.com/docs/images/cost-intel-caching.png)

The cache's default lifetime is 5 minutes and an agent loop's turns are seconds apart, so the discount applies to most tokens on every turn. The caching chart's runs read 79% to 90% of their input tokens from the cache. The saving varies with episode depth, because shorter loops re-read less, but caching stayed the largest single lever on every model and benchmark measured.

#### Pick the cache duration

If your loop waits on a person between turns, use the [1-hour cache duration](https://platform.claude.com/docs/en/build-with-claude/prompt-caching#1-hour-cache-duration). It costs more to write (2x the input price instead of 1.25x). A miss on either duration bills the whole prefix at the write price instead of the read price, so the longer duration pays off once a few turns per session follow a pause between 5 minutes and an hour.

To decide, count the gaps between consecutive requests in a conversation:

* More than about 1 gap in 20 falls between 5 minutes and an hour, and gaps over an hour are rare: use the 1-hour duration.
* Turns arrive seconds apart: stay on the 5-minute default. When nothing paused, it cost 15% less than the 1-hour setting on Claude Sonnet 5 and 11% less on Claude Opus 5.
* Gaps over an hour are common: stay on the default. A gap over an hour expires both durations, and the 1-hour setting then re-writes the prefix at its higher write price, so it loses on each of those gaps. Of your pauses longer than 5 minutes, if about 60% or more also run past an hour, stay on the default; the 1-hour duration pays only when at least about 40% of long pauses end within the hour.

Anthropic measured the triage job from [Trim input and context tokens](https://platform.claude.com/docs/en/about-claude/models/optimizing-for-cost-and-intelligence#trim-input-and-context-tokens) with pauses inserted before some turns to simulate a person's delay[16](https://platform.claude.com/docs/en/about-claude/models/optimizing-for-cost-and-intelligence#refs). On both models measured, the 1-hour cache became the cheaper setting once about 1 turn in 30 followed a pause, so the 1-in-20 rule leaves a margin, and the gap widens quickly past the crossover because every paused turn on the 5-minute setting re-writes the whole prefix. Every current model uses the same cache-write multipliers, and every model but Claude Fable 5.1 and Claude Mythos 5.1 the same read price, so the crossover is in the same range on the other models; Fable 5.1 is the case covered next. Accuracy stayed within run-to-run noise in every cell. The turn after a pause kept its warm-cache latency on the 1-hour setting. The following chart plots cost per session against the share of paused turns on Claude Sonnet 5:

![Line chart: cost per triage session by share of turns after a pause; the 1-hour cache is cheaper past about 1 turn in 30](https://platform.claude.com/docs/images/cost-intel-cache-ttl.png)

Anthropic also measured extra requests that keep the 5-minute cache warm. On Claude Sonnet 5 and Claude Opus 5 they saved nothing measurable over the 1-hour duration at any share of paused turns and cost more with a pause before every turn, so use the duration instead.

On Claude Fable 5.1 the cheapest setting is a different one. Its [cache read](https://platform.claude.com/docs/en/about-claude/pricing#prompt-caching) costs 0.025x the input price ($0.25 per million tokens) while its cache writes keep the standard multipliers, so a keep-alive request that re-reads the prefix is cheap and the 1-hour duration's write premium is the larger bill. Anthropic measured the triage job on Claude Fable 5.1 with the same three settings[19](https://platform.claude.com/docs/en/about-claude/models/optimizing-for-cost-and-intelligence#refs). Keeping the 5-minute cache warm cost 13% to 20% less per session than the 1-hour cache whenever pauses ran for minutes; only with pauses near 45 minutes did the 1-hour cache win, by about 12 cents a session. On Claude Fable 5.1, keep the 5-minute cache warm while a person is away for minutes, and buy the 1-hour duration when pauses run toward an hour:

![Line chart: measured cost per triage session by share of paused turns on Claude Fable 5.1 and Claude Sonnet 5; on Fable 5.1 keep-alive stays under the 1-hour cache, on Sonnet 5 the 1-hour cache wins once pauses are common](https://platform.claude.com/docs/images/cost-intel-cache-keepalive.png)

To keep the cache warm, send the previous request again with `max_tokens` set to 0 within 4 minutes of the previous request's start, and every 4 minutes after that, dropping `stream` if it was set. Count from the request's start, not its response's end: the [cache's 5-minute lifetime](https://platform.claude.com/docs/en/build-with-claude/prompt-caching#how-prompt-caching-works) runs from the start of the request that wrote or refreshed the entry, so time the response spent generating counts against it. That is the [pre-warming request](https://platform.claude.com/docs/en/build-with-claude/prompt-caching#pre-warming-the-cache): it refreshes the cache's lifetime, generates nothing, and bills only the cache read. Do not change a byte of the prefix, and do not use `max_tokens: 1`, which samples a token for no reason. Re-send the request's headers as well as its body: if your requests carry an `anthropic-beta` header (for a [task budget](https://platform.claude.com/docs/en/build-with-claude/task-budgets), say), the keep-alive request needs the same header, or the beta-gated fields in the replayed body are rejected. A `max_tokens: 0` request is rejected when the request sets `thinking.type: "enabled"` (the default adaptive thinking on Claude Fable 5.1 is fine), structured outputs, or a forced tool choice ([its limitations](https://platform.claude.com/docs/en/build-with-claude/prompt-caching#limitations)); on those workloads, buy the 1-hour duration instead.

  ```bash cURL
  # Within 4 minutes of the last request's start (time spent generating counts
  # against the cache's lifetime), re-send that request with max_tokens set to
  # 0, dropping stream (a max_tokens: 0 request cannot stream). Send the same
  # headers as the original request, including any anthropic-beta header.
  jq '.max_tokens = 0 | del(.stream)' last_request.json | \
    curl https://api.anthropic.com/v1/messages \
      -H "x-api-key: $ANTHROPIC_API_KEY" \
      -H "anthropic-version: 2023-06-01" \
      -H "content-type: application/json" \
      --data-binary @-
  ```

#### Turn on caching

Setup takes little work. [Automatic caching](https://platform.claude.com/docs/en/build-with-claude/prompt-caching#automatic-caching) places breakpoints for you; otherwise, the [Claude API skill](https://platform.claude.com/docs/en/agents-and-tools/agent-skills/claude-api-skill) that ships with Claude Code can add caching to an existing integration from one prompt. The following excerpt shows the skill adding it to the harness that produced these measurements:

```text wrap
$ claude
> /claude-api add prompt caching to this integration

Done. Prompt caching is now wired into the harness. Two changes:

- build_system() now adds cache_control: {"type": "ephemeral"} to the
  system block. Since the API renders tools -> system -> messages, this
  one breakpoint caches the entire static prefix -- the full tool array
  plus the system prompt.
- apply_moving_cache_breakpoints() strips any stale markers, then marks
  the last content block of the two most recent user turns. The older
  marker is the read point matching the prefix the previous request
  cached; the newer one extends the cache for the next request.

That's 3 breakpoints total, under the limit of 4.
...
```

Those breakpoint placements follow the standard pattern in [Explicit cache breakpoints](https://platform.claude.com/docs/en/build-with-claude/prompt-caching#explicit-cache-breakpoints).

#### What breaks the cache

Several things can break your cache during a task. Anything that changes per request, such as a timestamp or a queue position, placed ahead of the stable prefix turns every request into a full cache write: on the triage run in [Trim input and context tokens](https://platform.claude.com/docs/en/about-claude/models/optimizing-for-cost-and-intelligence#trim-input-and-context-tokens), a 25-token status line at the front of the system prompt cost $4.24 per run instead of $0.59, more than running with caching off. Keep per-request text in the newest user turn.

The cache is a byte-exact prefix match over the request in order (tools, then system prompt, then messages), so a change anywhere invalidates everything after it. Changing [`effort`](https://platform.claude.com/docs/en/build-with-claude/effort) or the thinking configuration between requests invalidates the cache from that point onward, and on some models the tools and system prompt ahead of it as well; any edit to the system prompt invalidates the cache from that point onward; setting or changing an output format invalidates the cache for the whole conversation; adding, removing, or reordering a tool definition invalidates all of it. The [prompt caching](https://platform.claude.com/docs/en/build-with-claude/prompt-caching#what-invalidates-the-cache) page lists these cases, apart from the output format, which [structured outputs](https://platform.claude.com/docs/en/build-with-claude/structured-outputs#prompt-modification-and-token-costs) covers. On the most recent models, change instructions with a [mid-conversation system message](https://platform.claude.com/docs/en/build-with-claude/mid-conversation-system-messages), a `\{"role": "system"\}` message appended to `messages`, instead of editing the top-level `system` field: the cached prefix stays intact. Check that page for which models support it. On models that support it, a [per-message effort change](https://platform.claude.com/docs/en/build-with-claude/effort#change-effort-mid-conversation-beta) leaves the cached prefix intact too. The stakes are highest on Claude Fable 5.1 and Claude Mythos 5.1: a break re-writes the prefix at 1.25x the input price instead of reading it at 0.025x, so on a 100,000-token prefix one broken turn costs $1.25 instead of $0.03, 50 times the read, against 12.5 times ($0.63 instead of $0.05) on Claude Opus 5.

Anthropic measured this on the triage agent's long sessions[18](https://platform.claude.com/docs/en/about-claude/models/optimizing-for-cost-and-intelligence#refs). An effort change and an added tool made mid-session rewrote 39,000 and 60,000 cached tokens, and those sessions cost $0.95 per session. The same two changes on the first request after compaction cost $0.75, and on the request that triggered the compaction $0.92, because the compaction's summarization pass then re-processed the 81,000-token context at the cache-write price: that summarization pass cost $0.21, against $0.04 when the same changes came one request later, with accuracy within run-to-run noise in every arm:

![Bar chart, cost per triage session: $0.81 no changes, $0.95 mid-session changes, $0.92 on the compaction request, $0.75 after](https://platform.claude.com/docs/images/cost-intel-compaction-timing.png)

Changing a [task budget](https://platform.claude.com/docs/en/build-with-claude/task-budgets) partway through invalidates any cached prefix that contains the budget value, so set it once, on the first request. Every [context editing](https://platform.claude.com/docs/en/build-with-claude/context-editing#context-editing-and-prompt-caching) pass invalidates the prefix from the point it clears and the next request pays to re-cache everything after it, so clear in a few large batches rather than many small ones. On Claude Fable 5.1 and Claude Mythos 5.1 each of these costs 50 times the read price per token, so they matter most there. Make every cache-invalidating change at natural breaks, then confirm cache reads have not dropped; if they have, [cache diagnostics](https://platform.claude.com/docs/en/build-with-claude/cache-diagnostics) shows where the prefix diverged.

### Trim input and context tokens

Most agent requests carry tokens that never influence the answer. Trimming them rarely costs output quality, although not every lever here saved money when measured. Two places to look:

* **Input trimming.** [Dynamic filtering](https://platform.claude.com/docs/en/agents-and-tools/tool-use/web-fetch-tool#dynamic-filtering) in the web fetch tool keeps boilerplate out of fetched pages, [image resizing](https://platform.claude.com/docs/en/build-with-claude/vision#evaluate-image-size) right-sizes vision inputs, and [tool search with deferred loading](https://platform.claude.com/docs/en/agents-and-tools/tool-use/tool-search-tool) loads tool definitions only when needed (measured later in this section). [Programmatic tool calling](https://platform.claude.com/docs/en/agents-and-tools/tool-use/programmatic-tool-calling) lets Claude run several tool calls from code so only the filtered result enters the context; its documentation reports 24% fewer input tokens on agentic search benchmarks, with a higher score. [Manage tool context](https://platform.claude.com/docs/en/agents-and-tools/tool-use/manage-tool-context) compares tool search, programmatic tool calling, prompt caching, and context editing.
* **Context lifecycle.** [Context editing](https://platform.claude.com/docs/en/build-with-claude/context-editing) clears stale tool results, and [automatic compaction](https://platform.claude.com/docs/en/build-with-claude/compaction) with its threshold stops long loops from carrying their whole history forward.

The levers interact with the cache and each other, so judge them by net effect, and use [cache diagnostics](https://platform.claude.com/docs/en/build-with-claude/cache-diagnostics) to confirm your cached prefix survives each change. Anthropic measured them on an issue-triage agent working through 20 real bug reports with screenshots from a public repository, and on a longer variant of the same job with 2.6 times the tokens. With caching on, input trimming (image resizing and tool search) took a further 26% off the short run and 21% off the long one.

#### Defer unused tool definitions

Every tool definition attached to a request is input on every turn, and a few MCP servers add up to hundreds of them. Anthropic ran the triage agent with its own two tools plus a catalog of real tool definitions from public MCP servers, for a total of up to 502 tools, loading all of them or marking the extras `defer_loading` behind [tool search](https://platform.claude.com/docs/en/agents-and-tools/tool-use/tool-search-tool):

![Line chart: with all tools loaded, run cost rises from $0.55 to $1.02 at 502 tools; with tool search it stays at $0.56](https://platform.claude.com/docs/images/cost-intel-tool-search.png)

With every definition loaded, the run cost nearly doubled as the catalog grew, tracking the schema tokens on each request. With tool search it stayed flat at every catalog size, 45% less at 502 tools. Accuracy was 15 to 18 of 20 in every cell either way, and the model never called a wrong tool, so at this scale the catalog costs money, not correctness. The same holds for tools that come through the [MCP connector](https://platform.claude.com/docs/en/agents-and-tools/mcp-connector): with a public GitHub MCP server attached, deferring its toolset (`default_config: \{defer_loading: true\}`) cut the run 20% at the same accuracy.

#### Keep data files out of the prompt

When the model has to compute over a table, upload it with the [Files API](https://platform.claude.com/docs/en/build-with-claude/files) and let the model query it with [code execution](https://platform.claude.com/docs/en/agents-and-tools/tool-use/code-execution-tool) instead of pasting it in. Anthropic asked 25 aggregate questions[15](https://platform.claude.com/docs/en/about-claude/models/optimizing-for-cost-and-intelligence#refs) (sums, filtered counts, group-bys, and a date filter) over a 1,862-row public CSV, with the answers computed by pandas:

![Scatter chart: with the file uploaded and code execution, 25 of 25 correct at $0.40; pasted into the prompt, 6 of 25 at $5.01](https://platform.claude.com/docs/images/cost-intel-data-files.png)

Pasted into the prompt, the table is about 91,000 input tokens on every request, and Claude Sonnet 5 answered 6 of 25 questions correctly. Uploaded, with code execution, it answered all 25, and the run cost about a twelfth as much. Claude Opus 5 showed the same pattern.

#### Manage the context lifecycle

The context levers only pay on a session long enough to need them:

![Bar chart by run length: context editing adds 74% on the short run; compaction saves 32% and pruning 39% on the long](https://platform.claude.com/docs/images/cost-intel-hygiene.png)

On the 20-issue run they saved nothing, and context editing cost 74% more. On the long run the prune saved 39% and compaction 32%, while context editing changed nothing. The prune is a few lines you write yourself: at each task boundary, replace large stale tool results with a one-line extract. It caches well because the edits sit at the tail of the conversation, where the next task adds new content anyway: 89% cache reads on the first request after a boundary and 81% on the requests between boundaries. Run-wide, the prune and context editing cache about equally well. The prune is cheaper because context editing rewrites content mid-task that the prune deletes (about two thirds of the gap) and because it keeps the context about half the size (the other third). If you use context editing, [clear in a few large batches](https://platform.claude.com/docs/en/build-with-claude/context-editing#context-editing-and-prompt-caching). The prune, adapted from the harness:

```python
import re

PRUNED = "[pruned at issue boundary]"

def prune_task_boundary(messages, tool_name_by_id, threshold=2000):
    """Call once per task boundary. Replaces large, stale search results with a one-line extract."""
    for message in messages:
        if message["role"] != "user" or not isinstance(message["content"], list):
            continue
        for block in message["content"]:
            if not (isinstance(block, dict) and block.get("type") == "tool_result"):
                continue
            if tool_name_by_id.get(block.get("tool_use_id")) != "search_issues":
                continue
            result_text = block.get("content")
            if not isinstance(result_text, str) or len(result_text) <= threshold:
                continue
            if result_text.startswith(PRUNED):
                continue  # already pruned on an earlier boundary
            # cap single-line results so the extract stays short
            first_line = result_text.split("\n", 1)[0].strip()[:200]
            refs = re.findall(r"#(\d+)", result_text)[:5]
            extract = f"{PRUNED} {first_line}"
            if refs:
                extract += " kept refs: " + " ".join("#" + r for r in refs)
            block["content"] = extract
```

### Batch work that can wait

The [Batch API](https://platform.claude.com/docs/en/build-with-claude/batch-processing) takes 50% off every token of a request, including cached ones, in exchange for results arriving any time within 24 hours. Route every request no one is waiting on through a batch, and keep the interactive path for the rest. Batching is the second-largest free lever after caching for unattended agent work: evaluation runs, backfills, and scheduled jobs such as a recurring run of the issue-triage agent from the [token-trimming measurement](https://platform.claude.com/docs/en/about-claude/models/optimizing-for-cost-and-intelligence#trim-input-and-context-tokens). It combines with everything on this page except interactivity, but is not available for Claude Managed Agents sessions, which are interactive by design (see [Claude Managed Agents pricing](https://platform.claude.com/docs/en/about-claude/pricing#claude-managed-agents-pricing)).

### Audit prompts against the current model

Each model generation responds to prompts differently, so a prompt accumulates text written for a model you no longer use. The usual case is over-specific instruction added to compensate for an older model: "verify twice," "be maximally thorough," a mandatory step-by-step procedure, or a hand-rolled reasoning scratchpad. A newer model follows these to the letter, producing extra tool rounds and extra writing, so the bill goes up with no gain in accuracy. Auditing prompts against the model you run now, and again whenever you change models, is a free win.

The audit is one command. The [Claude API skill](https://platform.claude.com/docs/en/agents-and-tools/agent-skills/claude-api-skill) that ships with Claude Code has a `prompt-audit` command that reads a project's prompts and request code and reports what was written for a different model. This shortened excerpt shows it run against a support-desk prompt and request code containing those patterns:

```text wrap
$ claude
> /claude-api prompt-audit

10 findings. The three that matter most:

1. budget_tokens returns a 400 on Opus 5 (support_agent.py:10). This code
   does not run against its own target model. Everything else here is
   quality; this one is an outage.
2. The prompt contains two live contradictions. Line 15 says confirm before
   every refund, line 17 says process every eligible refund immediately.
   Line 19 asks for a complete recap *and* a three-sentence maximum.
3. The reasoning scaffold and the 6-step script fight the model rather than
   steer it. <scratchpad> + "reason step by step" is now a request
   parameter, not prose; the mandatory 6-step procedure plus "investigate
   fully even when the ticket looks simple" forces four tool calls on a
   "where's my package" ticket.
...
-After any refund or escalation, verify twice before submitting: re-fetch
-the order, re-check every figure in your reply against the fresh lookup,
-and review the reply a second time for errors.
+Before submitting a refund or an escalation, re-fetch the order and confirm
+every figure in your reply matches the fresh lookup.
```

The command then proposes its edits as a diff (one hunk shown) and lists what it deliberately left alone: the refund window, the tone requirement, and the quality bar. You review a patch, not a rewrite.

The effect is measurable. On a support-desk evaluation[14](https://platform.claude.com/docs/en/about-claude/models/optimizing-for-cost-and-intelligence#refs), prompts written for Claude Opus 4.8 cost 36% more per ticket on Claude Opus 5 for no change in accuracy. Running the audit over the same prompts made Opus 5 both cheaper than the unaudited version (by 14%) and more accurate (97% of tickets, up from 92%, a gain outside the noise). On the Claude Sonnet 4.6 to Claude Sonnet 5 migration, the audit took 14% off at the same accuracy:

![Scatter chart, support-desk evaluation: the old prompt costs more on the new model; audited, it is cheaper and as accurate](https://platform.claude.com/docs/images/cost-intel-prompt-audit.png)

The two kinds of stale text have different costs. Instructions the new model follows too literally cost money: removing "verify twice" cut Opus 5's cost per ticket by a third, and removing "be maximally thorough" almost as much. Text that no longer fits the model costs accuracy instead: a retired thinking setting, contradictory rules, and a hand-rolled scratchpad that conflicts with the model's own thinking each restored 7 to 11 points on Opus 5 when removed:

![Bar charts per legacy pattern: over-obeyed instructions cost money; broken settings and contradictory rules cost accuracy](https://platform.claude.com/docs/images/cost-intel-prompt-audit-patterns.png)

The same patterns tend to appear in tool descriptions and skills, which are worth auditing too.
