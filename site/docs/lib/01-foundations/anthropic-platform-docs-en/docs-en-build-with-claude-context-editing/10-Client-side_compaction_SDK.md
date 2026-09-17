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
sourceRel: "docs/en/build-with-claude/context-editing.md"
rawUrl: "/raw/01-foundations/anthropic-platform-docs-en/docs/en/build-with-claude/context-editing.md"
sourceSha256: "69cc82d4054f45a2f7ea239a67c946153f54af5b92acae1915b2166281ec6469"
pageSha256: "592611a50e29693f72066a54dd40309cfc673250bba347cd741165f0aea2d3a9"
contentMode: "local-full"
zh: ""
---

## Client-side compaction (SDK)

  **Anthropic recommends server-side compaction over SDK compaction.** [Server-side compaction](https://platform.claude.com/docs/en/build-with-claude/compaction) handles context management automatically with less integration complexity, better token usage calculation, and no client-side limitations. Use SDK compaction only if you specifically need client-side control over the summarization process.

  The `compaction_control` parameter is deprecated in the TypeScript and Ruby SDKs and will be removed in a future version. The SDKs emit a deprecation warning when it is enabled. The Python SDK removed it in v1.0. To use server-side compaction with a tool runner, pass the `compact_20260112` edit in the request's `context_management` parameter.

  Compaction is available in the [TypeScript and Ruby SDKs](https://platform.claude.com/docs/en/cli-sdks-libraries/overview) when using the [`tool_runner` method](https://platform.claude.com/docs/en/agents-and-tools/tool-use/tool-runner).

Compaction is an SDK feature that automatically manages conversation context by generating summaries when token usage grows too large. Unlike server-side context editing strategies that clear content, compaction instructs Claude to summarize the conversation history, then replaces the full history with that summary. This allows Claude to continue working on long-running tasks that would otherwise exceed the [context window](https://platform.claude.com/docs/en/build-with-claude/context-windows).

### How compaction works

When compaction is enabled, the SDK monitors token usage after each model response:

1. **Threshold check:** The SDK calculates total tokens as `input_tokens + cache_creation_input_tokens + cache_read_input_tokens + output_tokens` (see [Prompt caching](https://platform.claude.com/docs/en/build-with-claude/prompt-caching) for the cache token fields).
2. **Summary generation:** When the threshold is exceeded, a summary prompt is injected as a user turn, and Claude generates a structured summary wrapped in `<summary></summary>` tags.
3. **Context replacement:** The SDK extracts the summary and replaces the entire message history with it.
4. **Continuation:** The conversation resumes from the summary, with Claude picking up where it left off.

### Using compaction

Add `compaction_control` to your `tool_runner` call to enable automatic summarization when token usage exceeds the threshold.

      Compaction runs client-side in the SDK `tool_runner` helpers, so it has no direct HTTP equivalent. Use [server-side compaction](https://platform.claude.com/docs/en/build-with-claude/compaction) instead, which handles compaction on Anthropic's servers.

      The CLI does not include a `tool_runner` helper. Use [server-side compaction](https://platform.claude.com/docs/en/build-with-claude/compaction) instead, which handles compaction on Anthropic's servers without SDK-side integration.

      In v1.0 and later, the Python SDK's tool runner does not support client-side `compaction_control`. Use [server-side compaction](https://platform.claude.com/docs/en/build-with-claude/compaction) instead: it works with the tool runner by passing the `compact_20260112` edit in the request's `context_management` parameter.

    ```typescript TypeScript
    const client = new Anthropic();

    const runner = client.beta.messages.toolRunner(\{
      model: "claude-opus-5",
      max_tokens: 1024,
      tools: [readFile],
      messages: [\{ role: "user", content: "What's in config.json?" \}],
      compactionControl: \{ enabled: true, contextTokenThreshold: 100000 \}
    \});

    for await (const message of runner) \{
      console.log(`Tokens used: $\{message.usage.input_tokens\}`);
    \}
    ```

      The C# SDK includes a tool runner, but it does not support client-side `compaction_control`. Use [server-side compaction](https://platform.claude.com/docs/en/build-with-claude/compaction) instead: it works with the tool runner by passing the `compact_20260112` edit in the request's `context_management` parameter.

      The Go SDK includes a tool runner, but it does not support client-side `compaction_control`. Use [server-side compaction](https://platform.claude.com/docs/en/build-with-claude/compaction) instead: it works with the tool runner by passing the `compact_20260112` edit in the request's `context_management` parameter.

      The Java SDK includes a tool runner, but it does not support client-side `compaction_control`. Use [server-side compaction](https://platform.claude.com/docs/en/build-with-claude/compaction) instead: it works with the tool runner by passing the `compact_20260112` edit in the request's `context_management` parameter.

      The PHP SDK includes a tool runner, but it does not support client-side `compaction_control`. Use [server-side compaction](https://platform.claude.com/docs/en/build-with-claude/compaction) instead: it works with the tool runner by passing the `compact_20260112` edit in the request's `context_management` parameter.

    ```ruby Ruby
    client = Anthropic::Client.new

    runner = client.beta.messages.tool_runner(
      model: "claude-opus-5",
      max_tokens: 1024,
      tools: [ReadFile.new],
      messages: [\{ role: "user", content: "What's in config.json?" \}],
      compaction_control: \{ enabled: true, context_token_threshold: 100000 \}
    )

    runner.each_message do |message|
      puts "Tokens used: #\{message.usage.input_tokens\}"
    end
    ```

#### What occurs during compaction

As the conversation grows, the message history accumulates:

**Before compaction (approaching 100k tokens):**

```json
[
  { "role": "user", "content": "Analyze all files and write a report..." },
  { "role": "assistant", "content": "I'll help. Let me start by reading..." },
  {
    "role": "user",
    "content": [{ "type": "tool_result", "tool_use_id": "...", "content": "..." }]
  },
  { "role": "assistant", "content": "Based on file1.txt, I see..." },
  {
    "role": "user",
    "content": [{ "type": "tool_result", "tool_use_id": "...", "content": "..." }]
  },
  { "role": "assistant", "content": "After analyzing file2.txt..." }
  // ... 50 more exchanges like this ...
]
```

When tokens exceed the threshold, the SDK injects a summary request and Claude generates a summary. The entire history is then replaced:

**After compaction (back to \~2–3k tokens):**

```json
[
  {
    "role": "assistant",
    "content": "# Task Overview\nThe user requested analysis of directory files to produce a summary report...\n\n# Current State\nAnalyzed 52 files across 3 subdirectories. Key findings documented in report.md...\n\n# Important Discoveries\n- Configuration files use YAML format\n- Found 3 deprecated dependencies\n- Test coverage at 67%\n\n# Next Steps\n1. Analyze remaining files in /src/legacy\n2. Complete final report sections...\n\n# Context to Preserve\nUser prefers markdown format with executive summary first..."
  }
]
```

Claude continues working from this summary as if it were the original conversation history.

### Configuration options

| Parameter                 | Type    | Required | Default                                                                                                                    | Description                              |
| ------------------------- | ------- | -------- | -------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------- |
| `enabled`                 | boolean | Yes      | -                                                                                                                          | Whether to enable automatic compaction   |
| `context_token_threshold` | number  | No       | 100,000                                                                                                                    | Token count at which compaction triggers |
| `model`                   | string  | No       | Same as main model                                                                                                         | Model to use for generating summaries    |
| `summary_prompt`          | string  | No       | See [Default summary prompt](https://platform.claude.com/docs/en/build-with-claude/context-editing#default-summary-prompt) | Custom prompt for summary generation     |

#### Choosing a token threshold

The threshold determines when compaction occurs. A lower threshold means more frequent compactions with smaller context windows. A higher threshold allows more context but risks hitting limits.

      Compaction runs client-side in the SDK `tool_runner` helpers, so it has no direct HTTP equivalent. Use [server-side compaction](https://platform.claude.com/docs/en/build-with-claude/compaction) instead, which handles compaction on Anthropic's servers.

      The CLI does not include a `tool_runner` helper. Use [server-side compaction](https://platform.claude.com/docs/en/build-with-claude/compaction) instead, which handles compaction on Anthropic's servers without SDK-side integration.

      In v1.0 and later, the Python SDK's tool runner does not support client-side `compaction_control`. Use [server-side compaction](https://platform.claude.com/docs/en/build-with-claude/compaction) instead: it works with the tool runner by passing the `compact_20260112` edit in the request's `context_management` parameter.

    ```typescript TypeScript
    const client = new Anthropic();

    const runner = client.beta.messages.toolRunner(\{
      model: "claude-opus-5",
      max_tokens: 1024,
      tools: [readFile],
      messages: [\{ role: "user", content: "What's in config.json?" \}],
      // Lower values compact more often; raise to 150000 when the task needs more context
      compactionControl: \{ enabled: true, contextTokenThreshold: 50000 \}
    \});

    for await (const message of runner) \{
      console.log(`Tokens used: ${message.usage.input_tokens}`);
    }
    ```

      The C# SDK includes a tool runner, but it does not support client-side `compaction_control`. Use [server-side compaction](https://platform.claude.com/docs/en/build-with-claude/compaction) instead: it works with the tool runner by passing the `compact_20260112` edit in the request's `context_management` parameter.

      The Go SDK includes a tool runner, but it does not support client-side `compaction_control`. Use [server-side compaction](https://platform.claude.com/docs/en/build-with-claude/compaction) instead: it works with the tool runner by passing the `compact_20260112` edit in the request's `context_management` parameter.

      The Java SDK includes a tool runner, but it does not support client-side `compaction_control`. Use [server-side compaction](https://platform.claude.com/docs/en/build-with-claude/compaction) instead: it works with the tool runner by passing the `compact_20260112` edit in the request's `context_management` parameter.

      The PHP SDK includes a tool runner, but it does not support client-side `compaction_control`. Use [server-side compaction](https://platform.claude.com/docs/en/build-with-claude/compaction) instead: it works with the tool runner by passing the `compact_20260112` edit in the request's `context_management` parameter.

    ```ruby Ruby
    client = Anthropic::Client.new

    runner = client.beta.messages.tool_runner(
      model: "claude-opus-5",
      max_tokens: 1024,
      tools: [ReadFile.new],
      messages: [{ role: "user", content: "What's in config.json?" }],
      # Lower values compact more often; raise to 150000 when the task needs more context
      compaction_control: { enabled: true, context_token_threshold: 50000 }
    )

    runner.each_message do |message|
      puts "Tokens used: #{message.usage.input_tokens}"
    end
    ```

#### Using a different model for summaries

You can use a faster or cheaper model for generating summaries:

      Compaction runs client-side in the SDK `tool_runner` helpers, so it has no direct HTTP equivalent. Use [server-side compaction](https://platform.claude.com/docs/en/build-with-claude/compaction) instead, which handles compaction on Anthropic's servers.

      The CLI does not include a `tool_runner` helper. Use [server-side compaction](https://platform.claude.com/docs/en/build-with-claude/compaction) instead, which handles compaction on Anthropic's servers without SDK-side integration.

      In v1.0 and later, the Python SDK's tool runner does not support client-side `compaction_control`. Use [server-side compaction](https://platform.claude.com/docs/en/build-with-claude/compaction) instead: it works with the tool runner by passing the `compact_20260112` edit in the request's `context_management` parameter.

    ```typescript TypeScript
    const client = new Anthropic();

    const runner = client.beta.messages.toolRunner({
      model: "claude-opus-5",
      max_tokens: 1024,
      tools: [readFile],
      messages: [{ role: "user", content: "What's in config.json?" }],
      compactionControl: {
        enabled: true,
        contextTokenThreshold: 100000,
        model: "claude-haiku-4-5"
      }
    });

    for await (const message of runner) {
      console.log(`Tokens used: ${message.usage.input_tokens\}`);
    \}
    ```

      The C# SDK includes a tool runner, but it does not support client-side `compaction_control`. Use [server-side compaction](https://platform.claude.com/docs/en/build-with-claude/compaction) instead: it works with the tool runner by passing the `compact_20260112` edit in the request's `context_management` parameter.

      The Go SDK includes a tool runner, but it does not support client-side `compaction_control`. Use [server-side compaction](https://platform.claude.com/docs/en/build-with-claude/compaction) instead: it works with the tool runner by passing the `compact_20260112` edit in the request's `context_management` parameter.

      The Java SDK includes a tool runner, but it does not support client-side `compaction_control`. Use [server-side compaction](https://platform.claude.com/docs/en/build-with-claude/compaction) instead: it works with the tool runner by passing the `compact_20260112` edit in the request's `context_management` parameter.

      The PHP SDK includes a tool runner, but it does not support client-side `compaction_control`. Use [server-side compaction](https://platform.claude.com/docs/en/build-with-claude/compaction) instead: it works with the tool runner by passing the `compact_20260112` edit in the request's `context_management` parameter.

    ```ruby Ruby
    client = Anthropic::Client.new

    runner = client.beta.messages.tool_runner(
      model: "claude-opus-5",
      max_tokens: 1024,
      tools: [ReadFile.new],
      messages: [\{ role: "user", content: "What's in config.json?" \}],
      compaction_control: \{
        enabled: true,
        context_token_threshold: 100000,
        model: "claude-haiku-4-5"
      \}
    )

    runner.each_message do |message|
      puts "Tokens used: #\{message.usage.input_tokens\}"
    end
    ```

#### Custom summary prompts

You can provide a custom prompt for domain-specific needs. Your prompt should instruct Claude to wrap its summary in `<summary></summary>` tags.

      Compaction runs client-side in the SDK `tool_runner` helpers, so it has no direct HTTP equivalent. Use [server-side compaction](https://platform.claude.com/docs/en/build-with-claude/compaction) instead, which handles compaction on Anthropic's servers.

      The CLI does not include a `tool_runner` helper. Use [server-side compaction](https://platform.claude.com/docs/en/build-with-claude/compaction) instead, which handles compaction on Anthropic's servers without SDK-side integration.

      In v1.0 and later, the Python SDK's tool runner does not support client-side `compaction_control`. Use [server-side compaction](https://platform.claude.com/docs/en/build-with-claude/compaction) instead: it works with the tool runner by passing the `compact_20260112` edit in the request's `context_management` parameter.

    ```typescript TypeScript
    const client = new Anthropic();

    const runner = client.beta.messages.toolRunner(\{
      model: "claude-opus-5",
      max_tokens: 1024,
      tools: [readFile],
      messages: [\{ role: "user", content: "What's in config.json?" \}],
      compactionControl: \{
        enabled: true,
        contextTokenThreshold: 100000,
        summaryPrompt: `Summarize the research conducted so far, including:
    - Sources consulted and key findings
    - Questions answered and remaining unknowns
    - Recommended next steps

    Wrap your summary in <summary></summary> tags.`
      \}
    \});

    for await (const message of runner) \{
      console.log(`Tokens used: $\{message.usage.input_tokens\}`);
    \}
    ```

      The C# SDK includes a tool runner, but it does not support client-side `compaction_control`. Use [server-side compaction](https://platform.claude.com/docs/en/build-with-claude/compaction) instead: it works with the tool runner by passing the `compact_20260112` edit in the request's `context_management` parameter.

      The Go SDK includes a tool runner, but it does not support client-side `compaction_control`. Use [server-side compaction](https://platform.claude.com/docs/en/build-with-claude/compaction) instead: it works with the tool runner by passing the `compact_20260112` edit in the request's `context_management` parameter.

      The Java SDK includes a tool runner, but it does not support client-side `compaction_control`. Use [server-side compaction](https://platform.claude.com/docs/en/build-with-claude/compaction) instead: it works with the tool runner by passing the `compact_20260112` edit in the request's `context_management` parameter.

      The PHP SDK includes a tool runner, but it does not support client-side `compaction_control`. Use [server-side compaction](https://platform.claude.com/docs/en/build-with-claude/compaction) instead: it works with the tool runner by passing the `compact_20260112` edit in the request's `context_management` parameter.

    ```ruby Ruby
    client = Anthropic::Client.new

    runner = client.beta.messages.tool_runner(
      model: "claude-opus-5",
      max_tokens: 1024,
      tools: [ReadFile.new],
      messages: [\{ role: "user", content: "What's in config.json?" \}],
      compaction_control: \{
        enabled: true,
        context_token_threshold: 100000,
        summary_prompt: <<~PROMPT
          Summarize the research conducted so far, including:
          - Sources consulted and key findings
          - Questions answered and remaining unknowns
          - Recommended next steps

          Wrap your summary in <summary></summary> tags.
        PROMPT
      \}
    )

    runner.each_message do |message|
      puts "Tokens used: #\{message.usage.input_tokens\}"
    end
    ```

### Default summary prompt

The built-in summary prompt instructs Claude to create a structured continuation summary including:

1. **Task Overview:** The user's core request, success criteria, and constraints.
2. **Current State:** What has been completed, files modified, and artifacts produced.
3. **Important Discoveries:** Technical constraints, decisions made, errors resolved, and failed approaches.
4. **Next Steps:** Specific actions needed, blockers, and priority order.
5. **Context to Preserve:** User preferences, domain-specific details, and commitments made.

This structure enables Claude to resume work efficiently without losing important context or repeating mistakes.

  ```text wrap
  You have been working on the task described above but have not yet completed it. Write a continuation summary that will allow you (or another instance of yourself) to resume work efficiently in a future context window where the conversation history will be replaced with this summary. Your summary should be structured, concise, and actionable. Include:

  1. Task Overview
  The user's core request and success criteria
  Any clarifications or constraints they specified

  2. Current State
  What has been completed so far
  Files created, modified, or analyzed (with paths if relevant)
  Key outputs or artifacts produced

  3. Important Discoveries
  Technical constraints or requirements uncovered
  Decisions made and their rationale
  Errors encountered and how they were resolved
  What approaches were tried that didn't work (and why)

  4. Next Steps
  Specific actions needed to complete the task
  Any blockers or open questions to resolve
  Priority order if multiple steps remain

  5. Context to Preserve
  User preferences or style requirements
  Domain-specific details that aren't obvious
  Any promises made to the user

  Be concise but complete—err on the side of including information that would prevent duplicate work or repeated mistakes. Write in a way that enables immediate resumption of the task.

  Wrap your summary in <summary></summary> tags.
  ```

### Limitations

#### Server-side tools

  Compaction requires special consideration when using server-side tools such as [web search](https://platform.claude.com/docs/en/agents-and-tools/tool-use/web-search-tool) or [web fetch](https://platform.claude.com/docs/en/agents-and-tools/tool-use/web-fetch-tool).

When using server-side tools, the SDK may incorrectly calculate token usage, causing compaction to trigger at the wrong time.

For example, after a web search operation, the API response might show:

```json Output
{
  "usage": {
    "input_tokens": 63000,
    "cache_creation_input_tokens": 0,
    "cache_read_input_tokens": 270000,
    "output_tokens": 1400
  }
}
```

The SDK calculates total usage as 63,000 + 0 + 270,000 + 1,400 = 334,400 tokens. However, the `cache_read_input_tokens` value includes accumulated reads from multiple internal API calls made by the server-side tool, not your actual conversation context. Your real context length might only be the 63,000 `input_tokens`, but the SDK sees 334k and triggers compaction prematurely.

**Workarounds:**

* Use the [token counting](https://platform.claude.com/docs/en/build-with-claude/token-counting) endpoint to get accurate context length
* Avoid compaction when using server-side tools extensively

#### Tool use edge cases

When the SDK triggers compaction while a tool use response is pending, it removes the tool use block from the message history before generating the summary. Claude will re-issue the tool call after resuming from the summary if still needed.

### Monitoring compaction

Understanding when compaction triggers helps you tune thresholds and verify expected behavior.

      Compaction runs client-side in the SDK `tool_runner` helpers, so it has no direct HTTP equivalent. Use [server-side compaction](https://platform.claude.com/docs/en/build-with-claude/compaction) instead, which handles compaction on Anthropic's servers.

      The CLI does not include a `tool_runner` helper. Use [server-side compaction](https://platform.claude.com/docs/en/build-with-claude/compaction) instead, which handles compaction on Anthropic's servers without SDK-side integration.

      In v1.0 and later, the Python SDK's tool runner does not support `compaction_control`. Use [server-side compaction](https://platform.claude.com/docs/en/build-with-claude/compaction) instead.

    The TypeScript SDK's `toolRunner` supports compaction but does not log events. Detect compaction by watching `runner.params.messages.length` shrink between turns:

    ```typescript TypeScript
    let prevMsgCount = 0;
    for await (const message of runner) \{
      const currMsgCount = runner.params.messages.length;
      if (currMsgCount < prevMsgCount) \{
        console.log(`Compaction occurred: ${prevMsgCount} -> ${currMsgCount\} messages`);
        console.log(`Input tokens after compaction: $\{message.usage.input_tokens\}`);
      \}
      prevMsgCount = currMsgCount;
    \}
    ```

      The C# SDK's tool runner does not support `compaction_control`. Use [server-side compaction](https://platform.claude.com/docs/en/build-with-claude/compaction) instead.

      The Go SDK's tool runner does not support `compaction_control`. Use [server-side compaction](https://platform.claude.com/docs/en/build-with-claude/compaction) instead.

      The Java SDK's tool runner does not support `compaction_control`. Use [server-side compaction](https://platform.claude.com/docs/en/build-with-claude/compaction) instead.

      The PHP SDK's tool runner does not support `compaction_control`. Use [server-side compaction](https://platform.claude.com/docs/en/build-with-claude/compaction) instead.

    The Ruby SDK supports an `on_compact:` callback that fires when compaction occurs. Add it to your `compaction_control` configuration:

    ```ruby Ruby
    client = Anthropic::Client.new

    runner = client.beta.messages.tool_runner(
      model: "claude-opus-5",
      max_tokens: 1024,
      tools: [ReadFile.new],
      messages: [\{ role: "user", content: "What's in config.json?" \}],
      compaction_control: \{
        enabled: true,
        context_token_threshold: 100000,
        on_compact: ->(tokens_before, tokens_after) do
          puts "Compaction occurred: #\{tokens_before\} -> #\{tokens_after\} tokens"
        end
      \}
    )

    runner.each_message do |message|
      puts "Tokens: #\{message.usage.input_tokens\}"
    end
    ```

### When to use compaction

**Good use cases:**

* Long-running agent tasks that process many files or data sources
* Research workflows that accumulate large amounts of information
* Multistep tasks with clear, measurable progress
* Tasks that produce artifacts (files, reports) that persist outside the conversation

**Less ideal use cases:**

* Tasks requiring precise recall of early conversation details
* Workflows using server-side tools extensively
* Tasks that need to maintain exact state across many variables
