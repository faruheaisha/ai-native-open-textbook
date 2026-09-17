---
title: "Chapter 17: Autonomy & Continuation — /goal and /loop"
sourceId: "09-harness/how-claude-code-works"
sourceTitle: "How Claude Code Works"
sourceKind: "源码研读"
licenseLabel: "可转载"
lang: "中文"
tier: 2
volume: "09-harness"
sourceUrl: "https://github.com/Windy3f3f3f3f/how-claude-code-works"
entryUrl: "https://github.com/Windy3f3f3f3f/how-claude-code-works/blob/f4d6505ed9162a0ee6be089190f74c419ecacb19/en/docs/17-autonomy-goal-loop.md"
sourceRel: "en/docs/17-autonomy-goal-loop.md"
rawUrl: "/raw/09-harness/how-claude-code-works/en/docs/17-autonomy-goal-loop.md"
sourceSha256: "95a9ffefcd296ed3062b8142805d81940578d7f2fd9e5fe5e7d58c5dd3ae3804"
pageSha256: "95a9ffefcd296ed3062b8142805d81940578d7f2fd9e5fe5e7d58c5dd3ae3804"
contentMode: "local-full"
zh: ""
---

# Chapter 17: Autonomy & Continuation — `/goal` and `/loop`

> From here on, a new module: features that postdate the source snapshot.
>
> The first sixteen chapters read the source snapshot that leaked in late March 2026, but `/goal`, `/loop`, dynamic workflows, and auto mode all postdate it, with no source to read. The only way to understand them is to switch methods: install the latest build and actually use it, capture the network requests it sends, and cross-check against the official docs. So anything below in quotes is text pulled that way; anything about "how it probably schedules internally" is reasoned back from behavior, and is flagged as such where it comes up. This chapter explains how `/goal` and `/loop` let Claude keep going on its own, with the method written out at the end so you can go capture the next feature yourself.

## 17.1 Two paradigms for "keep going"

By 2026, Claude Code is long past being just "one question, one answer." It has a whole family of ways to keep an agent going on its own — across turns, across time, across sessions. The two outermost, most-encountered entry points are `/goal` and `/loop`, and they happen to be two opposite ideas.

`/goal` is "fix on a condition and don't quit until it's met." You give it a completion condition, and it works round after round; at the end of each round a separate judge rules "met or not," and if not, Claude comes back for another round carrying the judge's reason, stopping only once it's met. It's passive: when to stop is the judge's call.

`/loop` is "set an alarm and come back." You give it an interval (or let it set its own pace), and it reruns the same thing on schedule. It's active: when to return is decided by the schedule, independent of whether the work got done.

One uses a "gatekeeper" to decide when to stop, the other an "alarm clock" to decide when to return — grasp that distinction and you've grasped the two spines of Claude Code's autonomy. We'll take them one at a time.

## 17.2 `/goal`: a gatekeeping judge

### It's syntactic sugar over a Stop hook

The official docs name the mechanism in a sentence: `/goal` is a wrapper around a session-scoped Stop hook. Each time a turn ends, the system sends "your condition + the conversation so far" to the configured evaluator model (officially the "small/fast" model, defaulting to Haiku; the model actually seen in one capture is discussed below), which returns "yes / no + a reason"; "no" sends Claude back for another round carrying that reason, "yes" clears the goal and records an achievement in the session record.

Traffic capture confirms the flow. The moment you set a goal, the main model's message contains this stretch, which all but writes the mechanism out in the open (a key fragment, with the tail elided):

> A session-scoped Stop hook is now active with condition: "&lt;your condition>". Briefly acknowledge the goal, then immediately start (or continue) working toward it — treat the condition itself as your directive and do not pause to ask the user what to do. The hook will block stopping until the condition holds. It auto-clears once the condition is met…

"Setting a goal starts a round, treating the condition itself as the directive." That's why you don't send a separate prompt.

### The judge's verdict: three outcomes, and a loop brake

The interesting part is that judge. Capture its actual request and its system prompt reads, verbatim, as the block below — short enough to read in full, because an autonomous loop's whole sense of restraint is packed into these few lines:

> You are evaluating a stop-condition hook in Claude Code. Read the conversation transcript carefully, then judge whether the user-provided condition is satisfied.
>
> Your response must be a JSON object with one of these shapes:
> - `\{"ok": true, "reason": "<quote evidence from the transcript that satisfies the condition>"\}`
> - `\{"ok": false, "reason": "<quote what is missing or what blocks the condition>"\}`
> - `\{"ok": false, "impossible": true, "reason": "<explain why the condition can never be satisfied>"\}`
>
> Always include a "reason" field, quoting specific text from the transcript whenever possible. If the transcript does not contain clear evidence that the condition is satisfied, return `\{"ok": false, "reason": "insufficient evidence in transcript"\}`.
>
> Only use `\{"ok": false, "impossible": true\}` when the condition is genuinely unachievable in this session — for example: the condition is self-contradictory, it depends on a resource or capability that is unavailable, or the assistant has explicitly tried, exhausted reasonable approaches, and stated it cannot be done. Apply your own judgment when deciding this — the assistant claiming the goal is impossible is evidence, not proof; independently confirm the condition is genuinely unachievable rather than deferring to the assistant's self-assessment. Do not use it just because the goal has not been reached yet or because progress is slow. When in doubt, return `\{"ok": false\}` without "impossible".

The three outcomes — met, not met, judged impossible — are the three JSON shapes in that block. The first two are plain; the point is the third. `impossible` is a carefully designed loop brake, and a whole paragraph guards one thing: don't let the main agent talk the judge into quitting early. "The main agent saying it can't be done is only evidence, not proof; the judge confirms it independently, and when unsure returns `\{"ok": false\}` without `impossible`." What an autonomous loop fears most is exactly two things — never stopping, or being talked into quitting early — and this stretch of prompt is written against both at once. It even rules out "slow" by name: slow progress is not impossibility.

### Three details you only see by capturing the request

Take the judge's real request apart and three things surface that the docs don't mention.

First, the verdict is enforced at the API layer, not merely requested in the prompt. The request carries an `output_config` that constrains the output, via JSON schema, into exactly the shape `\{ok, reason, impossible\}` (`ok` and `reason` required, no other fields allowed). The prompt explains; the schema is the guardrail — even if the model wanted to freelance, it couldn't produce anything outside that shape.

Second, the judge gets no tools and only reads the conversation. The request's `tools` is empty. This confirms the official line that the judge doesn't call tools and can only judge what's already in the conversation: it's handed a transcript path, but has no tool to read that file.

Third, the judge runs at high reasoning effort — `effort: "high"` in the request. Judging "is it actually done" is something the system is willing to spend compute on.

On which model, one thing has to be said plainly: the docs say the judge uses "your configured small/fast model, which defaults to Haiku," but the model I captured was `claude-fable-5` — because this machine configured its small/fast model to that. So don't take one capture's model name for the default. And to be precise: it's the client-side hook runtime that assembles and sends this request locally; the model still runs on Anthropic's side, not on your machine.

### What it looks like in the trace

Every round of a `/goal` run lands in the session record: a `goal_status` entry carrying the condition, how many rounds it iterated, duration, how many tokens it burned, whether it was met. So "how many turns a goal spanned, and the state of each round" is fully replayable — a live example of the "always there" trace from the previous chapter (see [Chapter 16](/lib/09-harness/how-claude-code-works/en-docs-16-observability)).

## 17.3 `/loop`: an alarm clock that schedules itself

`/loop` is fundamentally unlike `/goal`. It isn't a passive hook but a large orchestration prompt executed by the main model. You type `/loop …`, the system injects an instruction block beginning `# /loop — schedule a recurring or self-paced prompt`, and the main model itself parses it, picks a scheduling method, and calls generic scheduling tools. Put differently, `/loop`'s "smarts" live in a prompt, not in a hardcoded scheduler — though one caveat: the actual execution, lifecycle, and guardrails are still hardcoded in the runtime, as we'll see.

### How it parses your input

The captured orchestration prompt pins the parsing rules down verbatim — clearer read straight from the source than paraphrased:

> \# /loop — schedule a recurring or self-paced prompt
>
> \#\# Parsing (in priority order)
>
> 1. **Leading token**: if the first whitespace-delimited token matches `^\d+[smhd]$` (e.g. `5m`, `2h`), that's the interval; the rest is the prompt.
