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
sourceRel: "docs/en/build-with-claude/prompt-engineering/claude-prompting-best-practices.md"
rawUrl: "/raw/01-foundations/anthropic-platform-docs-en/docs/en/build-with-claude/prompt-engineering/claude-prompting-best-practices.md"
sourceSha256: "f98aa130a7974b2edf98f8c3babe806ab140d5cdd3933a506f5211335b431c5f"
pageSha256: "b6d88a3ae92e41b0ef940f3eae1b887d3bdbd4942c50b30bf0e8c51e00d88797"
contentMode: "local-full"
zh: ""
---

## Thinking and reasoning

### Overthinking and excessive thoroughness

Claude Opus 4.6 does more upfront exploration than previous models, especially at higher [`effort`](https://platform.claude.com/docs/en/build-with-claude/effort) settings. This initial work often helps to optimize the final results, but the model may gather extensive context or pursue multiple threads of research without being prompted. If your prompts previously encouraged the model to be more thorough, you should tune that guidance for Claude Opus 4.6:

* **Replace blanket defaults with more targeted instructions.** Instead of "Default to using \[tool]," add guidance like "Use \[tool] when it would enhance your understanding of the problem."
* **Remove over-prompting.** Tools that undertriggered in previous models are likely to trigger appropriately now. Instructions like "If in doubt, use \[tool]" will cause overtriggering.
* **Use effort as a fallback.** If Claude continues to be overly aggressive, use a lower setting for `effort`.

In some cases, Claude Opus 4.6 may think extensively, which can inflate thinking tokens and slow down responses. If this behavior is undesirable, you can add explicit instructions to constrain its reasoning, or you can lower the `effort` setting to reduce overall thinking and token usage.

```text Sample prompt wrap
When you're deciding how to approach a problem, choose an approach and commit to it.
Avoid revisiting decisions unless you encounter new information that directly
contradicts your reasoning. If you're weighing two approaches, pick one and see it
through. You can always course-correct later if the chosen approach fails.
```

If you need a hard ceiling on thinking costs, extended thinking with a `budget_tokens` cap is still functional on Opus 4.6 and Sonnet 4.6 but is deprecated. On Claude 4.7 and later models, setting `budget_tokens` returns a 400 error. Prefer lowering the [effort](https://platform.claude.com/docs/en/build-with-claude/effort) setting or using `max_tokens` as a hard limit with [adaptive thinking](https://platform.claude.com/docs/en/build-with-claude/thinking).

### Leverage thinking & interleaved thinking capabilities

Claude's latest models offer thinking capabilities that can be especially helpful for tasks involving reflection after tool use or complex multistep reasoning. You can guide its initial or interleaved thinking for better results.

Claude 4.6 and later models and Claude Mythos Preview use [adaptive thinking](https://platform.claude.com/docs/en/build-with-claude/thinking) (`thinking: \{type: "adaptive"\}`), where Claude dynamically decides when and how much to think. On Claude Fable 5.1, Claude Mythos 5.1, Claude Fable 5, and Claude Mythos 5, thinking is always on and adaptive thinking is the only mode. Claude calibrates its thinking based on two factors: the `effort` parameter and query complexity. Higher effort elicits more thinking, and more complex queries do the same. On easier queries that don't require thinking, the model responds directly. In internal evaluations, adaptive thinking reliably drives better performance than extended thinking. Consider moving to adaptive thinking.

Use adaptive thinking for workloads that require agentic behavior such as multistep tool use, complex coding tasks, and long-horizon agent loops. Older models use manual [extended thinking](https://platform.claude.com/docs/en/build-with-claude/extended-thinking) with `budget_tokens`; see the [per-model configuration table](https://platform.claude.com/docs/en/build-with-claude/thinking-troubleshooting#supported-models) for which configuration each model accepts.

You can guide Claude's thinking behavior:

```text Example prompt wrap
After receiving tool results, carefully reflect on their quality and determine optimal
next steps before proceeding. Use your thinking to plan and iterate based on this new
information, and then take the best next action.
```

The triggering behavior for adaptive thinking is promptable. If you find the model thinking more often than you'd like, which can happen with large or complex system prompts, add guidance to steer it:

```text Sample prompt wrap
Thinking adds latency and should only be used when it will meaningfully improve
answer quality - typically for problems that require multistep reasoning. When in
doubt, respond directly.
```

If you are migrating from [extended thinking](https://platform.claude.com/docs/en/build-with-claude/extended-thinking) with `budget_tokens`, replace your thinking configuration and move budget control to `effort`. The following examples show the same request before and after the migration (see [effort](https://platform.claude.com/docs/en/build-with-claude/effort) for the available levels and per-model availability):

  ```bash cURL
  # Before: extended thinking with a manual budget (older models)
  curl https://api.anthropic.com/v1/messages \
    -H "content-type: application/json" \
    -H "x-api-key: $ANTHROPIC_API_KEY" \
    -H "anthropic-version: 2023-06-01" \
    -d '{
      "model": "claude-sonnet-4-5-20250929",
      "max_tokens": 16000,
      "thinking": {"type": "enabled", "budget_tokens": 10000},
      "messages": [
        {"role": "user", "content": "..."}
      ]
    }'

  # After: adaptive thinking with effort
  curl https://api.anthropic.com/v1/messages \
    -H "content-type: application/json" \
    -H "x-api-key: $ANTHROPIC_API_KEY" \
    -H "anthropic-version: 2023-06-01" \
    -d '{
      "model": "claude-opus-4-8",
      "max_tokens": 16000,
      "thinking": {"type": "adaptive"},
      "output_config": {"effort": "high"},
      "messages": [
        {"role": "user", "content": "..."}
      ]
    }'
  ```

  ```bash CLI
  # Before: extended thinking with a manual budget (older models)
  ant messages create <<'YAML'
  model: claude-sonnet-4-5-20250929
  max_tokens: 16000
  thinking:
    type: enabled
    budget_tokens: 10000
  messages:
    - role: user
      content: "..."
  YAML

  # After: adaptive thinking with effort
  ant messages create <<'YAML'
  model: claude-opus-4-8
  max_tokens: 16000
  thinking:
    type: adaptive
  output_config:
    effort: high
  messages:
    - role: user
      content: "..."
  YAML
  ```

  ```python Python
  # Before: extended thinking with a manual budget (older models)
  client.messages.create(
      model="claude-sonnet-4-5-20250929",
      max_tokens=16000,
      thinking={"type": "enabled", "budget_tokens": 10000},
      messages=[{"role": "user", "content": "..."}],
  )

  # After: adaptive thinking with effort
  client.messages.create(
      model="claude-opus-4-8",
      max_tokens=16000,
      thinking={"type": "adaptive"},
      output_config={"effort": "high"},
      messages=[{"role": "user", "content": "..."}],
  )
  ```

  ```typescript TypeScript
  // Before: extended thinking with a manual budget (older models)
  await client.messages.create({
    model: "claude-sonnet-4-5-20250929",
    max_tokens: 16000,
    thinking: { type: "enabled", budget_tokens: 10000 },
    messages: [{ role: "user", content: "..." }]
  });

  // After: adaptive thinking with effort
  await client.messages.create({
    model: "claude-opus-4-8",
    max_tokens: 16000,
    thinking: { type: "adaptive" },
    output_config: { effort: "high" },
    messages: [{ role: "user", content: "..." }]
  });
  ```

  ```csharp C#
  // Before: extended thinking with a manual budget (older models)
  await client.Messages.Create(new MessageCreateParams
  {
      Model = "claude-sonnet-4-5-20250929",
      MaxTokens = 16000,
      Thinking = new ThinkingConfigEnabled(budgetTokens: 10000),
      Messages = [new() { Role = Role.User, Content = "..." }]
  });

  // After: adaptive thinking with effort
  await client.Messages.Create(new MessageCreateParams
  {
      Model = Model.ClaudeOpus4_8,
      MaxTokens = 16000,
      Thinking = new ThinkingConfigAdaptive(),
      OutputConfig = new OutputConfig { Effort = Effort.High },
      Messages = [new() { Role = Role.User, Content = "..." }]
  });
  ```

  ```go Go
  // Before: extended thinking with a manual budget (older models)
  client.Messages.New(ctx, anthropic.MessageNewParams{
  	Model:     "claude-sonnet-4-5-20250929",
  	MaxTokens: 16000,
  	Thinking: anthropic.ThinkingConfigParamUnion{
  		OfEnabled: &anthropic.ThinkingConfigEnabledParam{BudgetTokens: 10000},
  	},
  	Messages: []anthropic.MessageParam{
  		anthropic.NewUserMessage(anthropic.NewTextBlock("...")),
  	},
  })

  // After: adaptive thinking with effort
  client.Messages.New(ctx, anthropic.MessageNewParams{
  	Model:     anthropic.ModelClaudeOpus4_8,
  	MaxTokens: 16000,
  	Thinking: anthropic.ThinkingConfigParamUnion{
  		OfAdaptive: &anthropic.ThinkingConfigAdaptiveParam{},
  	},
  	OutputConfig: anthropic.OutputConfigParam{
  		Effort: anthropic.OutputConfigEffortHigh,
  	},
  	Messages: []anthropic.MessageParam{
  		anthropic.NewUserMessage(anthropic.NewTextBlock("...")),
  	},
  })
  ```

  ```java Java
  // Before: extended thinking with a manual budget (older models)
  client.messages().create(MessageCreateParams.builder()
      .model("claude-sonnet-4-5-20250929")
      .maxTokens(16000L)
      .thinking(ThinkingConfigEnabled.builder().budgetTokens(10000L).build())
      .addUserMessage("...")
      .build());

  // After: adaptive thinking with effort
  client.messages().create(MessageCreateParams.builder()
      .model(Model.CLAUDE_OPUS_4_8)
      .maxTokens(16000L)
      .thinking(ThinkingConfigAdaptive.builder().build())
      .outputConfig(OutputConfig.builder()
          .effort(OutputConfig.Effort.HIGH)
          .build())
      .addUserMessage("...")
      .build());
  ```

  ```php PHP
  // Before: extended thinking with a manual budget (older models)
  $client->messages->create(
      model: 'claude-sonnet-4-5-20250929',
      maxTokens: 16000,
      thinking: ['type' => 'enabled', 'budget_tokens' => 10000],
      messages: [['role' => 'user', 'content' => '...']],
  );

  // After: adaptive thinking with effort
  $client->messages->create(
      model: 'claude-opus-4-8',
      maxTokens: 16000,
      thinking: ['type' => 'adaptive'],
      outputConfig: ['effort' => 'high'],
      messages: [['role' => 'user', 'content' => '...']],
  );
  ```

  ```ruby Ruby
  # Before: extended thinking with a manual budget (older models)
  client.messages.create(
    model: "claude-sonnet-4-5-20250929",
    max_tokens: 16000,
    thinking: { type: "enabled", budget_tokens: 10000 },
    messages: [{ role: "user", content: "..." }]
  )

  # After: adaptive thinking with effort
  client.messages.create(
    model: "claude-opus-4-8",
    max_tokens: 16000,
    thinking: { type: "adaptive" },
    output_config: { effort: "high" },
    messages: [{ role: "user", content: "..." }]
  )
  ```

If you are not using extended thinking, no changes are required. On Claude Opus 4.6 through Claude Opus 4.8 and Claude Sonnet 4.6, thinking is off when you omit the `thinking` parameter. On Claude Opus 5 and Claude Sonnet 5, thinking is on by default when you omit the `thinking` parameter. On Claude Opus 5, you can disable it only at effort `high` or lower. On Claude Fable 5.1, Claude Mythos 5.1, Claude Fable 5, and Claude Mythos 5, thinking is always on, regardless of whether you set the `thinking` parameter.

* **Prefer general instructions over prescriptive steps.** A prompt like "think thoroughly" often produces better reasoning than a hand-written step-by-step plan. Claude's reasoning frequently exceeds what a human would prescribe.
* **Multishot examples work with thinking.** Use `<thinking>` tags inside your few-shot examples to show Claude the reasoning pattern. It will generalize that style to its own extended thinking blocks.
* **Manual chain-of-thought (CoT) prompting as a fallback.** When thinking is off, you can still encourage step-by-step reasoning by asking Claude to think through the problem. Use structured tags like `<thinking>` and `<answer>` to cleanly separate reasoning from the final output. On Claude Opus 5, prefer keeping thinking enabled at a lower effort level instead: with thinking disabled, the model can occasionally emit internal XML tags into its visible output, so see [Running with thinking disabled](https://platform.claude.com/docs/en/build-with-claude/prompt-engineering/prompting-claude-opus-5#running-with-thinking-disabled) before applying this pattern there.
* **Ask Claude to self-check.** Append something like "Before you finish, verify your answer against \[test criteria]." This catches errors reliably, especially for coding and math. Claude Opus 5 is the exception: it verifies its own work well without explicit instruction, and verification instructions carried over from prompts tuned for earlier models can cause over-verification, adding tokens and latency. When migrating to Claude Opus 5, remove these instructions rather than rewriting them. See [Task scope and over-verification](https://platform.claude.com/docs/en/build-with-claude/prompt-engineering/prompting-claude-opus-5#task-scope-and-over-verification).

  When extended thinking is disabled, Claude Opus 4.5 is particularly sensitive to the word "think" and its variants. Consider using alternatives like "consider," "evaluate," or "reason through" in those cases.

  For more information on thinking capabilities, see [Thinking](https://platform.claude.com/docs/en/build-with-claude/thinking) and [Steering thinking](https://platform.claude.com/docs/en/build-with-claude/thinking-steering-and-cost).
