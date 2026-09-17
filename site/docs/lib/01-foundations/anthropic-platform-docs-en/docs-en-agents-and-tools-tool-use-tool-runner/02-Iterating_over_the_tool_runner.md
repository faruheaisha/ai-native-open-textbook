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
sourceRel: "docs/en/agents-and-tools/tool-use/tool-runner.md"
rawUrl: "/raw/01-foundations/anthropic-platform-docs-en/docs/en/agents-and-tools/tool-use/tool-runner.md"
sourceSha256: "db04c59098955d6f262f3c64053a341690a96faba7b419527d86c750bca4b45f"
pageSha256: "273c9e27197ffc130b3be8593e4538b4019f9575a2baf60e00766b36e8dfd471"
contentMode: "local-full"
zh: ""
---

## Iterating over the tool runner

The tool runner is an iterable that yields messages from Claude. On each iteration, the runner checks whether Claude requested a tool use. If so, it runs the tool and sends the result back to Claude automatically, then yields the next message from Claude to continue your loop.

You can end the loop at any iteration with a `break` statement. The runner loops until Claude returns a message without a tool use, or until it reaches `max_iterations` if you set it.

If you don't need intermediate messages, you can get the final message directly:

    Use `runner.until_done()` to get the final message.

    ```python
    client = anthropic.Anthropic()
    # ...
    runner = client.beta.messages.tool_runner(
        model="claude-opus-5",
        max_tokens=1024,
        tools=[get_weather, calculate_sum],
        messages=[
            \{
                "role": "user",
                "content": "What's the weather like in Paris? Also, what's 15 + 27?",
            \}
        ],
    )
    final_message = runner.until_done()
    for block in final_message.content:
        if block.type == "text":
            print(block.text)
    ```

    `await` the runner to get the final message.

    ```typescript
    const client = new Anthropic();
    // ...
    const runner = client.beta.messages.toolRunner(\{
      model: "claude-opus-5",
      max_tokens: 1024,
      tools: [getWeatherTool],
      messages: [\{ role: "user", content: "What's the weather like in Paris?" \}]
    \});

    const finalMessage = await runner;
    for (const block of finalMessage.content) \{
      if (block.type === "text") \{
        console.log(block.text);
      \}
    \}
    ```

    Use `runner.RunUntilDoneAsync()` to get the final message.

    ```csharp
    var client = new AnthropicClient();
    // ...
    var runner = client.Beta.Messages.ToolRunner(
        new MessageCreateParams
        \{
            Model = Model.ClaudeOpus5,
            MaxTokens = 1024,
            Messages =
            [
                new()
                \{
                    Role = Role.User,
                    Content = "What's the weather like in Paris?",
                \},
            ],
        \},
        [getWeatherTool]
    );

    var finalMessage = await runner.RunUntilDoneAsync();
    foreach (var block in finalMessage.Content)
    \{
        if (block.TryPickText(out var textBlock))
        \{
            Console.WriteLine(textBlock.Text);
        \}
    \}
    ```

    Use `runner.RunToCompletion(ctx)` to get the final message.

    ```go
    client := anthropic.NewClient()
    ctx := context.Background()
    // ...
    runner := client.Beta.Messages.NewToolRunner(
    	[]anthropic.BetaTool\{getWeather\},
    	anthropic.BetaToolRunnerParams\{
    		BetaMessageNewParams: anthropic.BetaMessageNewParams\{
    			Model:     anthropic.ModelClaudeOpus5,
    			MaxTokens: 1024,
    			Messages: []anthropic.BetaMessageParam\{
    				anthropic.NewBetaUserMessage(anthropic.NewBetaTextBlock(
    					"What's the weather like in Paris?",
    				)),
    			\},
    		\},
    	\},
    )

    finalMessage, err := runner.RunToCompletion(ctx)
    if err != nil \{
    	log.Fatal(err)
    \}
    for _, block := range finalMessage.Content \{
    	if textBlock, ok := block.AsAny().(anthropic.BetaTextBlock); ok \{
    		fmt.Println(textBlock.Text)
    	\}
    \}
    ```

    The Java SDK has no `until_done()` shortcut. Iterate to exhaustion and keep the last message.

    ```java
    AnthropicClient client = AnthropicOkHttpClient.fromEnv();

    BetaToolRunner runner = client.beta()
            .messages()
            .toolRunner(MessageCreateParams.builder()
                    .model(Model.CLAUDE_OPUS_5)
                    .maxTokens(1024)
                    .addBeta("structured-outputs-2025-11-13")
                    .addUserMessage("What's the weather like in Paris? Also, what's 15 + 27?")
                    .addTool(GetWeather.class)
                    .addTool(CalculateSum.class)
                    .build());

    BetaMessage finalMessage = null;
    for (BetaMessage message : runner) \{
        finalMessage = message;
    \}
    for (BetaContentBlock block : finalMessage.content()) \{
        block.text().ifPresent(textBlock -> IO.println(textBlock.text()));
    \}
    ```

    Use `runUntilDone()` to get the final message.

    ```php
    $client = new Client();
    // ...
    $runner = $client->beta->messages->toolRunner(
        maxTokens: 1024,
        messages: [
            ['role' => 'user', 'content' => "What's the weather like in Paris? Also, what's 15 + 27?"],
        ],
        model: Model::CLAUDE_OPUS_5,
        tools: [$getWeather, $calculateSum],
    );

    $finalMessage = $runner->runUntilDone();
    foreach ($finalMessage->content as $block) {
        if ($block->type === 'text') \{
            echo $block->text, "\n";
        \}
    \}
    ```

    Use `runner.run_until_finished` to get all messages.

    ```ruby
    client = Anthropic::Client.new
    # ...
    runner = client.beta.messages.tool_runner(
      model: "claude-opus-5",
      max_tokens: 1024,
      tools: [GetWeather.new, CalculateSum.new],
      messages: [
        \{role: "user", content: "What's the weather like in Paris? Also, what's 15 + 27?"\}
      ]
    )

    all_messages = runner.run_until_finished
    all_messages.each \{ |msg| puts msg.content \}
    ```
