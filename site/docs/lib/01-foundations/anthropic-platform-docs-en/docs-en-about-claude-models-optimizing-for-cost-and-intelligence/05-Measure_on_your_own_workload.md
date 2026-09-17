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
pageSha256: "7847bcfb519f917e25229f540b327394e686a272281228503f64cbaf79bc5b46"
contentMode: "local-full"
zh: ""
---

## Measure on your own workload

The numbers on this page reflect list prices at the time of measurement and will drift as models and prices change. Your escalation rate, how cleanly tasks split, and transcript length move them too. The method stays the same:

1. Pull a few tasks from production logs, weighted like real traffic, and [write outcome checks](https://platform.claude.com/docs/en/test-and-evaluate/develop-tests) for each: tests pass, ticket closed, row count correct. Record cost per task beside the score: price the five priced token counts in each response's `usage` at their own rates (uncached input, 5-minute and 1-hour cache writes at 1.25x and 2x the input price, cache reads, and output), summed across the task's requests (the [Usage and Cost API](https://platform.claude.com/docs/en/manage-claude/usage-cost-api) reports the aggregate).
2. Baseline the model tiers across effort levels, not only the default, and plot score against spend. A multi-model configuration must beat the single model's whole curve.
3. If the curve shows a gap effort can't close, add the multi-model strategy that fits and re-run the suite.
4. Run the winner in shadow on a traffic slice before cutover, then keep the suite running.

The following example computes one request's step 1 cost at Claude Opus 5's list prices:

  ```bash cURL
  # Per-million-token prices from the pricing page; change these three for another model.
  INPUT_PER_MTOK=5.00 # Claude Opus 5
  CACHE_READ_PER_MTOK=0.50 # 0.1x the input price; 0.025x on Claude Fable 5.1 and Claude Mythos 5.1
  OUTPUT_PER_MTOK=25.00

  response=$(curl --fail-with-body -sS https://api.anthropic.com/v1/messages \
    -H "x-api-key: $ANTHROPIC_API_KEY" \
    -H "anthropic-version: 2023-06-01" \
    -H "content-type: application/json" \
    -d '{
      "model": "claude-opus-5",
      "max_tokens": 1024,
      "messages": [{"role": "user", "content": "Hello, Claude"}]
    }')

  cost=$(jq -r --argjson in_price "$INPUT_PER_MTOK" --argjson read_price "$CACHE_READ_PER_MTOK" --argjson out_price "$OUTPUT_PER_MTOK" '
    .usage
    | (.input_tokens * $in_price
       + (.cache_creation.ephemeral_1h_input_tokens // 0) * $in_price * 2.00  # 1-hour cache write
       + (.cache_creation.ephemeral_5m_input_tokens // 0) * $in_price * 1.25  # 5-minute cache write
       + (.cache_read_input_tokens // 0) * $read_price                   # cache read
       + .output_tokens * $out_price) / 1e6
  ' <<<"$response")
  printf 'Request cost: $%.6f\n' "$cost"
  ```

  ```bash CLI
  # Per-million-token prices from the pricing page; change these three for another model.
  INPUT_PER_MTOK=5.00 # Claude Opus 5
  CACHE_READ_PER_MTOK=0.50 # 0.1x the input price; 0.025x on Claude Fable 5.1 and Claude Mythos 5.1
  OUTPUT_PER_MTOK=25.00

  USAGE=$(ant messages create \
    --model claude-opus-5 \
    --max-tokens 1024 \
    --message '{role: user, content: "Hello, Claude"}' \
    --transform usage)

  COST=$(jq -r --argjson in_price "$INPUT_PER_MTOK" --argjson read_price "$CACHE_READ_PER_MTOK" --argjson out_price "$OUTPUT_PER_MTOK" '
    (.input_tokens * $in_price
      + (.cache_creation.ephemeral_1h_input_tokens // 0) * $in_price * 2.00  # 1-hour cache write
      + (.cache_creation.ephemeral_5m_input_tokens // 0) * $in_price * 1.25  # 5-minute cache write
      + (.cache_read_input_tokens // 0) * $read_price                   # cache read
      + .output_tokens * $out_price) / 1e6
  ' <<<"$USAGE")
  printf 'Request cost: $%.6f\n' "$COST"
  ```

  ```python Python
  # Per-million-token prices from the pricing page; change these three for another model.
  INPUT_PER_MTOK = 5.00  # Claude Opus 5
  # 0.1x the input price; 0.025x on Claude Fable 5.1 and Claude Mythos 5.1
  CACHE_READ_PER_MTOK = 0.50
  OUTPUT_PER_MTOK = 25.00

  client = anthropic.Anthropic()
  response = client.messages.create(
      model="claude-opus-5",
      max_tokens=1024,
      messages=[{"role": "user", "content": "Hello, Claude"}],
  )
  usage = response.usage
  cache_writes = usage.cache_creation
  writes_1h = cache_writes.ephemeral_1h_input_tokens if cache_writes else 0
  writes_5m = cache_writes.ephemeral_5m_input_tokens if cache_writes else 0
  cost = (
      usage.input_tokens * INPUT_PER_MTOK
      # 1-hour cache writes bill at 2x the input price, 5-minute at 1.25x; reads at the cache-read price.
      + writes_1h * INPUT_PER_MTOK * 2.0
      + writes_5m * INPUT_PER_MTOK * 1.25
      + (usage.cache_read_input_tokens or 0) * CACHE_READ_PER_MTOK
      + usage.output_tokens * OUTPUT_PER_MTOK
  ) / 1_000_000
  print(f"Request cost: ${cost:.6f}")
  ```

  ```typescript TypeScript
  // Per-million-token prices from the pricing page; change these three for another model.
  const INPUT_PER_MTOK = 5.0; // Claude Opus 5
  const CACHE_READ_PER_MTOK = 0.5; // 0.1x the input price; 0.025x on Claude Fable 5.1 and Claude Mythos 5.1
  const OUTPUT_PER_MTOK = 25.0;

  const client = new Anthropic();
  const response = await client.messages.create({
    model: "claude-opus-5",
    max_tokens: 1024,
    messages: [{ role: "user", content: "Hello, Claude" }]
  });
  const usage = response.usage;
  const cost =
    (usage.input_tokens * INPUT_PER_MTOK +
      (usage.cache_creation?.ephemeral_1h_input_tokens ?? 0) * INPUT_PER_MTOK * 2 + // 1-hour cache write
      (usage.cache_creation?.ephemeral_5m_input_tokens ?? 0) * INPUT_PER_MTOK * 1.25 + // 5-minute cache write
      (usage.cache_read_input_tokens ?? 0) * CACHE_READ_PER_MTOK + // cache read
      usage.output_tokens * OUTPUT_PER_MTOK) /
    1_000_000;
  console.log(`Request cost: $${cost.toFixed(6)}`);
  ```

  ```csharp C#
  // Per-million-token prices from the pricing page; change these three for another model.
  const double InputPerMtok = 5.00; // Claude Opus 5
  const double CacheReadPerMtok = 0.50; // 0.1x the input price; 0.025x on Claude Fable 5.1 and Claude Mythos 5.1
  const double OutputPerMtok = 25.00;

  AnthropicClient client = new();
  var response = await client.Messages.Create(
      new MessageCreateParams
      {
          Model = Model.ClaudeOpus5,
          MaxTokens = 1024,
          Messages = [new() { Role = Role.User, Content = "Hello, Claude" }],
      }
  );
  var usage = response.Usage;
  double cost =
      (
          usage.InputTokens * InputPerMtok
          + (usage.CacheCreation?.Ephemeral1hInputTokens ?? 0) * InputPerMtok * 2.00 // 1-hour cache write
          + (usage.CacheCreation?.Ephemeral5mInputTokens ?? 0) * InputPerMtok * 1.25 // 5-minute cache write
          + (usage.CacheReadInputTokens ?? 0) * CacheReadPerMtok // cache read
          + usage.OutputTokens * OutputPerMtok
      ) / 1_000_000;
  Console.WriteLine($"Request cost: ${cost:F6}");
  ```

  ```go Go
  // Per-million-token prices from the pricing page; change these three for another model.
  const (
  	inputPerMTok     = 5.00 // Claude Opus 5
  	cacheReadPerMTok = 0.50 // 0.1x the input price; 0.025x on Claude Fable 5.1 and Claude Mythos 5.1
  	outputPerMTok    = 25.00
  )

  // ...
  	client := anthropic.NewClient()

  	response, err := client.Messages.New(context.TODO(), anthropic.MessageNewParams{
  		Model:     anthropic.ModelClaudeOpus5,
  		MaxTokens: 1024,
  		Messages: []anthropic.MessageParam{
  			anthropic.NewUserMessage(anthropic.NewTextBlock("Hello, Claude")),
  		},
  	})
  	if err != nil {
  		log.Fatal(err)
  	}

  	usage := response.Usage
  	cost := (float64(usage.InputTokens)*inputPerMTok +
  		float64(usage.CacheCreation.Ephemeral1hInputTokens)*inputPerMTok*2.00 + // 1-hour cache write
  		float64(usage.CacheCreation.Ephemeral5mInputTokens)*inputPerMTok*1.25 + // 5-minute cache write
  		float64(usage.CacheReadInputTokens)*cacheReadPerMTok + // cache read
  		float64(usage.OutputTokens)*outputPerMTok) / 1_000_000
  	fmt.Printf("Request cost: $%.6f\n", cost)
  ```

  ```java Java
  // Per-million-token prices from the pricing page; change these three for another model.
  static final double INPUT_PER_MTOK = 5.00; // Claude Opus 5
  static final double CACHE_READ_PER_MTOK = 0.50; // 0.1x the input price; 0.025x on Claude Fable 5.1 and Claude Mythos 5.1
  static final double OUTPUT_PER_MTOK = 25.00;

  void main() {
      AnthropicClient client = AnthropicOkHttpClient.fromEnv();

      Message response = client.messages().create(MessageCreateParams.builder()
          .model(Model.CLAUDE_OPUS_5)
          .maxTokens(1024)
          .addUserMessage("Hello, Claude")
          .build());

      Usage usage = response.usage();
      long writes1h = usage.cacheCreation().map(CacheCreation::ephemeral1hInputTokens).orElse(0L);
      long writes5m = usage.cacheCreation().map(CacheCreation::ephemeral5mInputTokens).orElse(0L);
      double cost = (usage.inputTokens() * INPUT_PER_MTOK
          + writes1h * INPUT_PER_MTOK * 2.00 // 1-hour cache write
          + writes5m * INPUT_PER_MTOK * 1.25 // 5-minute cache write
          + usage.cacheReadInputTokens().orElse(0L) * CACHE_READ_PER_MTOK // cache read
          + usage.outputTokens() * OUTPUT_PER_MTOK) / 1_000_000;
      IO.println("Request cost: $%.6f".formatted(cost));
  }
  ```

  ```php PHP
  // Per-million-token prices from the pricing page; change these three for another model.
  const INPUT_PER_MTOK = 5.00; // Claude Opus 5
  const CACHE_READ_PER_MTOK = 0.50; // 0.1x the input price; 0.025x on Claude Fable 5.1 and Claude Mythos 5.1
  const OUTPUT_PER_MTOK = 25.00;

  $client = new Client();
  $response = $client->messages->create(
      model: 'claude-opus-5',
      maxTokens: 1024,
      messages: [['role' => 'user', 'content' => 'Hello, Claude']],
  );
  $usage = $response->usage;
  $cost = (
      $usage->inputTokens * INPUT_PER_MTOK
      + ($usage->cacheCreation?->ephemeral1hInputTokens ?? 0) * INPUT_PER_MTOK * 2.00 // 1-hour cache write
      + ($usage->cacheCreation?->ephemeral5mInputTokens ?? 0) * INPUT_PER_MTOK * 1.25 // 5-minute cache write
      + ($usage->cacheReadInputTokens ?? 0) * CACHE_READ_PER_MTOK // cache read
      + $usage->outputTokens * OUTPUT_PER_MTOK
  ) / 1_000_000;
  printf("Request cost: \$%.6f\n", $cost);
  ```

  ```ruby Ruby
  # Per-million-token prices from the pricing page; change these three for another model.
  INPUT_PER_MTOK = 5.00 # Claude Opus 5
  CACHE_READ_PER_MTOK = 0.50 # 0.1x the input price; 0.025x on Claude Fable 5.1 and Claude Mythos 5.1
  OUTPUT_PER_MTOK = 25.00

  client = Anthropic::Client.new
  response = client.messages.create(
    model: "claude-opus-5",
    max_tokens: 1024,
    messages: [{ role: "user", content: "Hello, Claude" }]
  )
  usage = response.usage
  cost = (
    usage.input_tokens * INPUT_PER_MTOK +
    usage.cache_creation&.ephemeral_1h_input_tokens.to_i * INPUT_PER_MTOK * 2.00 + # 1-hour cache write
    usage.cache_creation&.ephemeral_5m_input_tokens.to_i * INPUT_PER_MTOK * 1.25 + # 5-minute cache write
    usage.cache_read_input_tokens.to_i * CACHE_READ_PER_MTOK + # cache read
    usage.output_tokens * OUTPUT_PER_MTOK
  ) / 1_000_000
  puts format("Request cost: $%.6f", cost)
  ```

In agent loops the cache-read term is usually the largest of the five; if not, check that caching is engaged. When the [advisor tool](https://platform.claude.com/docs/en/agents-and-tools/tool-use/advisor-tool#usage-and-billing) or [compaction](https://platform.claude.com/docs/en/build-with-claude/compaction#understanding-usage) is enabled, some tokens are reported only in `usage.iterations` and not in the top-level totals, so sum over `usage.iterations` instead, pricing `advisor_message` entries at the advisor model's rates.

The following table lists the levers in the order to try them:

| Lever                                       | Saving in these runs                                                                                                                                                                                                                                                                                                                                                                                | Quality cost                                                          | Latency                         | Where                                                                                                                                                                           |
| ------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------- | ------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Prompt caching                              | Cost cut by a factor of 2.7 to 5.3 on agent loops; 83% on the triage run                                                                                                                                                                                                                                                                                                                            | None                                                                  | Faster                          | [Cache repeated context](https://platform.claude.com/docs/en/about-claude/models/optimizing-for-cost-and-intelligence#cache-repeated-context)                                   |
| 1-hour cache duration                       | Cheaper than the 5-minute default once about 1 turn in 20 follows a pause between 5 minutes and an hour and few gaps run over an hour, except on Claude Fable 5.1, where keeping the 5-minute cache warm is cheaper while pauses run minutes and the 1-hour duration wins when pauses run toward an hour; with no pauses the default cost 15% less on Claude Sonnet 5 and 11% less on Claude Opus 5 | None                                                                  | Stays warm after a pause        | [Pick the cache duration](https://platform.claude.com/docs/en/about-claude/models/optimizing-for-cost-and-intelligence#pick-the-cache-duration)                                 |
| Input trimming                              | A further 5 percentage points on the triage run                                                                                                                                                                                                                                                                                                                                                     | None                                                                  | Neutral                         | [Trim input and context tokens](https://platform.claude.com/docs/en/about-claude/models/optimizing-for-cost-and-intelligence#trim-input-and-context-tokens)                     |
| Prune stale tool results at task boundaries | 39% on the long triage run (compaction 32%); nothing on short loops                                                                                                                                                                                                                                                                                                                                 | None measured                                                         | Neutral                         | [Trim input and context tokens](https://platform.claude.com/docs/en/about-claude/models/optimizing-for-cost-and-intelligence#trim-input-and-context-tokens)                     |
| Tool search                                 | 45% with 500 tool definitions attached; 20% with a GitHub MCP server                                                                                                                                                                                                                                                                                                                                | None                                                                  | Neutral                         | [Trim input and context tokens](https://platform.claude.com/docs/en/about-claude/models/optimizing-for-cost-and-intelligence#trim-input-and-context-tokens)                     |
| Data files through code execution           | 92% on a 25-question data task                                                                                                                                                                                                                                                                                                                                                                      | A gain, 25 of 25 instead of 6 of 25                                   | Faster                          | [Trim input and context tokens](https://platform.claude.com/docs/en/about-claude/models/optimizing-for-cost-and-intelligence#trim-input-and-context-tokens)                     |
| Batch API                                   | 50%                                                                                                                                                                                                                                                                                                                                                                                                 | None                                                                  | Results within 24 hours         | [Batch work that can wait](https://platform.claude.com/docs/en/about-claude/models/optimizing-for-cost-and-intelligence#batch-work-that-can-wait)                               |
| Prompt audit against the current model      | 14% on both migrations measured                                                                                                                                                                                                                                                                                                                                                                     | None; a gain on one                                                   | Faster (fewer tool rounds)      | [Audit prompts against the current model](https://platform.claude.com/docs/en/about-claude/models/optimizing-for-cost-and-intelligence#audit-prompts-against-the-current-model) |
| Upgrade the model                           | Opus 4.8 to Opus 5: 12 more points at 21% more per solved task (Opus 5 at `low` beats Opus 4.8 for about 30% of the cost); Sonnet 4.6 to Sonnet 5: 15% less per solved task, 5 more points; Fable 5 to Fable 5.1: 43% less per solved task at about the same score                                                                                                                                  | A gain                                                                | Neutral                         | [Upgrade the model](https://platform.claude.com/docs/en/about-claude/models/optimizing-for-cost-and-intelligence#upgrade-the-model)                                             |
| Lower effort                                | Knowledge work: `medium` 13% to 31%, `low` a third to a half; long coding: `medium` about half, `low` about three quarters                                                                                                                                                                                                                                                                          | 1 to 3 points on knowledge work, 2 to 8 on long coding                | Faster                          | [Tune effort](https://platform.claude.com/docs/en/about-claude/models/optimizing-for-cost-and-intelligence#tune-effort)                                                         |
| Re-run failures                             | About half, at the same pass rate                                                                                                                                                                                                                                                                                                                                                                   | None                                                                  | Two runs on the tasks that fail | [Re-run failures at higher effort](https://platform.claude.com/docs/en/about-claude/models/optimizing-for-cost-and-intelligence#re-run-failures-at-higher-effort)               |
| Task budget                                 | 44% to 58%                                                                                                                                                                                                                                                                                                                                                                                          | 3 to 6 points                                                         | Faster                          | [Set budgets and output caps](https://platform.claude.com/docs/en/about-claude/models/optimizing-for-cost-and-intelligence#set-budgets-and-output-caps)                         |
| Ask for shorter answers                     | 39% of output tokens, 14% of cost on the triage run                                                                                                                                                                                                                                                                                                                                                 | None                                                                  | Faster                          | [Set budgets and output caps](https://platform.claude.com/docs/en/about-claude/models/optimizing-for-cost-and-intelligence#set-budgets-and-output-caps)                         |
| Raising `max_tokens`                        | None per solved task, but more tasks solved                                                                                                                                                                                                                                                                                                                                                         | Gains of up to 22 points on the internal set; none on the public pair | Neutral                         | [Set budgets and output caps](https://platform.claude.com/docs/en/about-claude/models/optimizing-for-cost-and-intelligence#set-budgets-and-output-caps)                         |
| Advisor                                     | Depends on the capability gap and the consult rate; the coding pairing scored 3.5 points over Opus 5 alone and about 2.5 over Fable 5.1 alone, the chart-reading pairing matched the advisor's model alone at `medium` for about 2.6 times the price                                                                                                                                                | Small gains                                                           | About two extra calls per task  | [Advisor strategy](https://platform.claude.com/docs/en/about-claude/models/optimizing-for-cost-and-intelligence#advisor-strategy-escalate-hard-decisions)                       |
| Orchestrator                                | About half against the frontier model, both beyond one context window and on routine tails (the latter measured on Claude Fable 5)                                                                                                                                                                                                                                                                  | 10 to 12 points below the frontier model                              | Much faster on large inputs     | [Orchestrator strategy](https://platform.claude.com/docs/en/about-claude/models/optimizing-for-cost-and-intelligence#orchestrator-strategy-delegate-bulk-work)                  |
