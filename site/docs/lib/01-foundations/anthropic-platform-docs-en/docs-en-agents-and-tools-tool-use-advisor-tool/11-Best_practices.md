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
sourceRel: "docs/en/agents-and-tools/tool-use/advisor-tool.md"
rawUrl: "/raw/01-foundations/anthropic-platform-docs-en/docs/en/agents-and-tools/tool-use/advisor-tool.md"
sourceSha256: "e798608a5dfa622e88c58c702ea92d194e53b19d6d35af59857ed01dddea26ab"
pageSha256: "ef8273b988e6149fd33533b5254cf8ad878c9080728535d6d9d4f422424641fd"
contentMode: "local-full"
zh: ""
---

## Best practices

### Prompting for coding and agent tasks

The advisor tool ships with a built-in description that nudges the executor to call it near the start of complex tasks and when it hits difficulty. For research tasks, no additional prompting is typically needed.

On coding and agent tasks, the advisor produces higher intelligence at similar cost when it reduces total tool calls and conversation length. Two timings drive this improvement:

1. An early first advisor call, after a few exploratory reads are in the transcript.
2. For difficult tasks, a final advisor call after file writes and test outputs are in the transcript.

If your agent exposes other planner-like tools (for example, a todo list tool), prompt the model to call the advisor before those tools so the advisor's plan funnels into them. The [suggested system prompt](https://platform.claude.com/docs/en/agents-and-tools/tool-use/advisor-tool#suggested-system-prompt-for-coding-tasks) reinforces the early-call pattern. Add your own funnel-in sentence pointing at whichever planner tools your agent exposes.

#### Suggested system prompt for coding tasks

Without system-prompt steering, the executor tends to under-call the advisor in some domains, particularly coding tasks. For coding tasks where you want consistent advisor timing and around two to three calls for each task, prepend the following blocks to your executor system prompt before any other sentences that mention the advisor.

Timing guidance:

```text wrap
You have access to an `advisor` tool backed by a stronger reviewer model. It takes NO parameters — when you call advisor(), your entire conversation history is automatically forwarded. They see the task, every tool call you've made, every result you've seen.

Call advisor BEFORE substantive work — before writing, before committing to an interpretation, before building on an assumption. If the task requires orientation first (finding files, fetching a source, seeing what's there), do that, then call advisor. Orientation is not substantive work. Writing, editing, and declaring an answer are.

Also call advisor:
- When you believe the task is complete. BEFORE this call, make your deliverable durable: write the file, save the result, commit the change. The advisor call takes time; if the session ends during it, a durable result persists and an unwritten one doesn't.
- When stuck — errors recurring, approach not converging, results that don't fit.
- When considering a change of approach.

On tasks longer than a few steps, call advisor at least once before committing to an approach and once before declaring done. On short reactive tasks where the next action is dictated by tool output you just read, you don't need to keep calling — the advisor adds most of its value on the first call, before the approach crystallizes.
```

How the executor should treat the advice (place directly after the timing block):

```text wrap
Give the advice serious weight. If you follow a step and it fails empirically, or you have primary-source evidence that contradicts a specific claim (the file says X, the paper states Y), adapt. A passing self-test is not evidence the advice is wrong — it's evidence your test doesn't check what the advice is checking.

If you've already retrieved data pointing one way and the advisor points another: don't silently switch. Surface the conflict in one more advisor call — "I found X, you suggest Y, which constraint breaks the tie?" The advisor saw your evidence but may have underweighted it; a reconcile call is cheaper than committing to the wrong branch.
```

#### Alternative system prompt for Haiku on coding workloads

Claude Haiku 4.5 applies the default advisor guidance conservatively. That keeps its call rate appropriately low on research and lookup workloads but gives up quality on coding workloads, where an early advisor consult reliably pays for itself. On an internal coding benchmark, a close variant of the following block (the read-only carve-out in the Hard rule was added after measurement) raised Haiku pass rates by roughly 7.5 percentage points over the built-in default.

Use this block in place of the earlier timing and advice blocks when your Haiku executor runs predominantly coding or write-task workloads:

```text wrap
Consult a stronger reviewer who sees your full conversation transcript.

No parameters. When you call advisor(), your entire history -- task, every tool call and result, your reasoning -- is automatically forwarded. The advisor sees exactly what you've done.

Call advisor BEFORE substantive work -- before writing, before committing to an interpretation, before building on an assumption. If the task requires orientation first (finding files, fetching a source, seeing what's there), do that, then call advisor. Orientation is not substantive work. Writing, editing, and declaring an answer are.

Also call advisor:
- When you believe the task is complete. BEFORE this call, make your deliverable durable: write the file, save the result, commit the change. The advisor call takes time; if the session ends during it, a durable result persists and an unwritten one doesn't.
- When stuck -- errors recurring, approach not converging, results that don't fit.
- When considering a change of approach.

On tasks longer than a few steps, call advisor at least once before committing to an approach and once before declaring done. On short reactive tasks where the next action is dictated by tool output you just read, you don't need to keep calling -- the advisor adds most of its value on the first call, before the approach crystallizes.

Give the advice serious weight. If you follow a step and it fails empirically, or you have primary-source evidence that contradicts a specific claim (the file says X, the paper states Y), adapt. A passing self-test is not evidence the advice is wrong -- it's evidence your test doesn't check what the advice is checking.

If you've already retrieved data pointing one way and the advisor points another: don't silently switch. Surface the conflict in one more advisor call -- "I found X, you suggest Y, which constraint breaks the tie?" The advisor saw your evidence but may have underweighted it; a reconcile call is cheaper than committing to the wrong branch.

Call advisor for design, architecture, and risk questions where you won't touch a file. If your response would be analysis or a recommendation with no other tool calls, call advisor first -- that judgment call is exactly where a second opinion is highest-value.

Hard rule: your first write_file, edit_file, or state-changing bash call on a task must be preceded by an advisor call in the same or an earlier turn. Read-only orientation commands (ls, cat, grep, find) are not state-changing. This is a checkpoint, not a difficulty judgment. It applies to one-line edits too.
```

**Caveat:** On an internal browse-comprehension benchmark (n = 1,266), a close variant of this block cost roughly 4 percentage points of accuracy relative to the built-in default. If your workload mixes coding with substantial lookup or retrieval, stay with the [suggested blocks](https://platform.claude.com/docs/en/agents-and-tools/tool-use/advisor-tool#suggested-system-prompt-for-coding-tasks), or gate the swap on a workload-type signal you already compute.

#### Increasing advisor calls on Opus executors

Opus executors typically call the advisor at an appropriate rate without additional prompting. If your Opus executor is under-calling on your workload, add the following checkpoint to your system prompt:

```text wrap
Call advisor for design, architecture, and risk questions where you won't touch a file. If your response would be analysis or a recommendation with no other tool calls, call advisor first. That judgment call is exactly where a second opinion is highest-value. (This does not apply to simple factual lookups or arithmetic; those you answer directly.)

Hard rule: your first write_file, edit_file, or state-changing bash call on a task must be preceded by an advisor call in the same or an earlier turn. Read-only orientation commands (ls, cat, grep, find) are not state-changing. This is a checkpoint, not a difficulty judgment. It applies to one-line edits too.
```

**Caveat:** In Anthropic's testing, a close variant of this block (the read-only carve-out in the Hard rule was added after measurement) raised pass rates on under-calling tasks by roughly 7 to 10 percentage points but caused Opus to over-call on tasks whose first action needs no planning. The net effect was roughly flat on a mixed workload. Only add it if you have observed Opus skipping the advisor on tasks where a consult would have helped. Do not add it as a default.

#### Trimming advisor output length

Advisor output is the advisor's largest cost driver, and the top-level `max_tokens` does not bound it. The advisor sees both your system prompt and your user messages as quoted context about the executor's task, so instructions that address the advisor directly are followed much more reliably than third-person descriptions. The most effective placement Anthropic tested is a line in the user message:

```text wrap
(Advisor: please keep your guidance under 80 words — I need a focused starting point, not a comprehensive plan.)
```

This line can be prefixed programmatically by your agent framework before sending the request. The limit is a soft constraint. The advisor occasionally exceeds it, so ask for roughly 80 percent of your true ceiling.

  In Anthropic's testing this line also increased how often the executor consults the advisor, but the net effect was still lower total cost (more consults, each shorter).

Pair this approach with the timing guidance in [Suggested system prompt for coding tasks](https://platform.claude.com/docs/en/agents-and-tools/tool-use/advisor-tool#suggested-system-prompt-for-coding-tasks) (or the [alternative Haiku block](https://platform.claude.com/docs/en/agents-and-tools/tool-use/advisor-tool#alternative-system-prompt-for-haiku-on-coding-workloads) if you swapped it in) for the strongest cost-versus-quality tradeoff. For a hard ceiling rather than a soft request, see [Capping advisor output](https://platform.claude.com/docs/en/agents-and-tools/tool-use/advisor-tool#capping-advisor-output).

### Capping advisor output

Set `max_tokens` on the tool definition to cap the advisor's total output (thinking plus text) per call:

  ```python Python
  tools = [
      {
          "type": "advisor_20260301",
          "name": "advisor",
          "model": "claude-opus-5",
          "max_tokens": 2048,
      }
  ]
  ```

  ```typescript TypeScript
  const tools: Anthropic.Beta.Messages.BetaToolUnion[] = [
    {
      type: "advisor_20260301",
      name: "advisor",
      model: "claude-opus-5",
      max_tokens: 2048
    }
  ];
  ```

  ```csharp C#
  using Anthropic.Models.Beta.Messages;
  using Messages = Anthropic.Models.Messages;

  var tools = new BetaToolUnion[]
  {
      new BetaAdvisorTool20260301
      {
          Model = Messages::Model.ClaudeOpus5,
          MaxTokens = 2048
      }
  };
  ```

  ```go Go
  tools := []anthropic.BetaToolUnionParam{
  	{OfAdvisorTool20260301: &anthropic.BetaAdvisorTool20260301Param{
  		Model:     anthropic.ModelClaudeOpus5,
  		MaxTokens: anthropic.Int(2048),
  	}},
  }
  ```

  ```java Java
  import com.anthropic.models.beta.messages.BetaAdvisorTool20260301;
  import com.anthropic.models.beta.messages.BetaToolUnion;
  import com.anthropic.models.messages.Model;

  List<BetaToolUnion> tools = List.of(
      BetaToolUnion.ofAdvisorTool20260301(BetaAdvisorTool20260301.builder()
          .model(Model.CLAUDE_OPUS_5)
          .maxTokens(2048L)
          .build()));
  ```

  ```php PHP
  $tools = [
      [
          'type' => 'advisor_20260301',
          'name' => 'advisor',
          'model' => 'claude-opus-5',
          'max_tokens' => 2048,
      ],
  ];
  ```

  ```ruby Ruby
  tools = [
    {
      type: "advisor_20260301",
      name: "advisor",
      model: "claude-opus-5",
      max_tokens: 2048
    }
  ]
  ```

The minimum value is 1024. Setting `max_tokens` above the advisor model's own output cap returns a 400 error. The cap applies to each advisor call independently and is not shared across calls in the same request.

This is not a hard truncation alone. The server also passes the advisor its remaining-token budget, so the advisor shapes its response to fit.

**Recommended starting point:** `max_tokens: 2048`. In Anthropic's testing on a hard reasoning benchmark (n = 40 per configuration), this reduced mean advisor output by roughly 7x compared with leaving the cap unset, with near-zero truncation and no detectable quality degradation. The minimum value of 1024 reduced output roughly 10x but truncated around 10 percent of calls. Accuracy differences across all configurations were within noise at this sample size. Validate on your own workload.

| `max_tokens` | Mean advisor output tokens | Calls truncated |
| ------------ | -------------------------- | --------------- |
| unset        | \~4,200 to 5,900           | n/a             |
| 2048         | \~630 to 840               | \~0%            |
| 1024         | \~370 to 480               | \~10%           |

Hard reasoning tasks elicit substantially longer advisor output than the [typical 1,400 to 1,800 tokens](https://platform.claude.com/docs/en/agents-and-tools/tool-use/advisor-tool#usage-and-billing) quoted earlier for lighter workloads. Use this table to size the savings ratio, not as a universal baseline for advisor output.

When the advisor does hit the cap, the result block carries `stop_reason: "max_tokens"` on both [result variants](https://platform.claude.com/docs/en/agents-and-tools/tool-use/advisor-tool#result-variants), whichever advisor model you use. Use `stop_reason` to detect truncated advice and decide whether to raise the cap or let the executor proceed with partial guidance. The API also appends `[Advisor output truncated at max_tokens=2048.]` (naming your cap) to the advice text, so the executor sees the truncation in its own context; with a plaintext `advisor_result` advisor that marker is visible to your client as well. Both signals appear only when you set `max_tokens` on the tool definition.

```json
{
  "type": "advisor_tool_result",
  "tool_use_id": "srvtoolu_abc123",
  "content": {
    "type": "advisor_redacted_result",
    "encrypted_content": "EqQBCkYIBRgCIiQ3YTAwMjY1Mi1mZjM5LTQ1NGUtODgxNC1kNjNjNTk1ZWI3Y...",
    "stop_reason": "max_tokens"
  }
}
```

Check `output_tokens` on the corresponding `advisor_message` entry in `usage.iterations` to see how close each call came to its cap.

Compared with the [prompt-based approach](https://platform.claude.com/docs/en/agents-and-tools/tool-use/advisor-tool#trimming-advisor-output-length), `max_tokens` is a hard ceiling rather than a soft request. Use `max_tokens` when you need a guaranteed bound for cost or latency. Use the prompt-based approach (or both together) when you want to bias toward brevity without risking a mid-thought cut.

### Pairing with effort settings

For coding tasks, pairing a Sonnet executor at medium [effort](https://platform.claude.com/docs/en/build-with-claude/effort) with an Opus advisor achieves intelligence comparable to Sonnet at default effort, at lower cost. For maximum intelligence, keep the executor at default effort.

### Cost control

* For conversation-level budgets, count advisor calls client-side. When you reach your cap, remove the advisor tool from `tools`; you do not need to strip `advisor_tool_result` blocks from your message history (see the note in [Multi-turn conversations](https://platform.claude.com/docs/en/agents-and-tools/tool-use/advisor-tool#multi-turn-conversations)).
* Enable `caching` only for conversations where you expect three or more advisor calls.
