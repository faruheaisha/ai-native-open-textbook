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
pageSha256: "f8fe122844795ad2a32791378a88a24897a006a68a2a4db8e22d56dab10a966c"
contentMode: "local-full"
zh: ""
---

## Streaming

Enable streaming to process each turn's response incrementally. Each iteration yields a stream object that you can iterate for events.

    Set `stream=True` and use `get_final_message()` to get the accumulated message.

    ```python
    client = anthropic.Anthropic()
    # ...
    runner = client.beta.messages.tool_runner(
        model="claude-opus-5",
        max_tokens=1024,
        tools=[calculate_sum],
        messages=[\{"role": "user", "content": "What is 15 + 27?"\}],
        stream=True,
    )

    # When streaming, the runner returns BetaMessageStream
    for message_stream in runner:
        for event in message_stream:
            print("event:", event)
        print("message:", message_stream.get_final_message())

    print(runner.until_done())
    ```

    Set `stream: true` and use `finalMessage()` to get the accumulated message.

    ```typescript
    const client = new Anthropic();
    // ...
    const runner = client.beta.messages.toolRunner(\{
      model: "claude-opus-5",
      max_tokens: 1024,
      messages: [\{ role: "user", content: "What is the weather in San Francisco?" \}],
      tools: [getWeatherTool],
      stream: true
    \});

    // When streaming, the runner returns BetaMessageStream
    for await (const messageStream of runner) \{
      for await (const event of messageStream) \{
        console.log("event:", event);
      \}
      console.log("message:", await messageStream.finalMessage());
    \}

    console.log(await runner);
    ```

    Call `runner.Streaming()` to get a nested async sequence: one inner stream for each API call.

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
                new() \{ Role = Role.User, Content = "What is 15 + 27?" \},
            ],
        \},
        [calculateSumTool]
    );

    await foreach (var stream in runner.Streaming())
    \{
        await foreach (var streamEvent in stream)
        \{
            if (
                streamEvent.TryPickContentBlockDelta(out var deltaEvent)
                && deltaEvent.Delta.TryPickText(out var textDelta)
            )
            \{
                Console.Write(textDelta.Text);
            \}
        \}
        Console.WriteLine();
    \}
    ```

    Use `NewToolRunnerStreaming` and iterate `runner.AllStreaming(ctx)`. Each outer iteration yields a stream of events for one API call.

    ```go
    client := anthropic.NewClient()
    ctx := context.Background()
    // ...
    runner := client.Beta.Messages.NewToolRunnerStreaming(
    	[]anthropic.BetaTool\{calculateSum\},
    	anthropic.BetaToolRunnerParams\{
    		BetaMessageNewParams: anthropic.BetaMessageNewParams\{
    			Model:     anthropic.ModelClaudeOpus5,
    			MaxTokens: 1024,
    			Messages: []anthropic.BetaMessageParam\{
    				anthropic.NewBetaUserMessage(anthropic.NewBetaTextBlock("What is 15 + 27?")),
    			\},
    		\},
    	\},
    )

    for events, err := range runner.AllStreaming(ctx) \{
    	if err != nil \{
    		log.Fatal(err)
    	\}
    	for event, err := range events \{
    		if err != nil \{
    			log.Fatal(err)
    		\}
    		switch eventVariant := event.AsAny().(type) \{
    		case anthropic.BetaRawContentBlockDeltaEvent:
    			switch deltaVariant := eventVariant.Delta.AsAny().(type) \{
    			case anthropic.BetaTextDelta:
    				fmt.Print(deltaVariant.Text)
    			case anthropic.BetaInputJSONDelta:
    				fmt.Print(deltaVariant.PartialJSON)
    			\}
    		case anthropic.BetaRawMessageStopEvent:
    			fmt.Println()
    		\}
    	\}
    \}
    ```

    Call `runner.streaming()` to get a stream for each turn. Each `StreamResponse` must be closed after use.

    ```java
    void main() \{
        AnthropicClient client = AnthropicOkHttpClient.fromEnv();

        BetaToolRunner runner = client.beta()
                .messages()
                .toolRunner(MessageCreateParams.builder()
                        .model(Model.CLAUDE_OPUS_5)
                        .maxTokens(1024)
                        .addBeta("structured-outputs-2025-11-13")
                        .addUserMessage("What is 15 + 27?")
                        .addTool(CalculateSum.class)
                        .build());

        for (StreamResponse&lt;BetaRawMessageStreamEvent> stream : runner.streaming()) \{
            try (stream) \{
                stream.stream().forEach(event -> IO.println("event: " + event));
            \}
        \}
    \}
    ```

    Streaming is not currently available with the PHP tool runner.

    Use `each_streaming` to iterate over streaming events.

    ```ruby
    client = Anthropic::Client.new
    # ...
    runner = client.beta.messages.tool_runner(
      model: "claude-opus-5",
      max_tokens: 1024,
      tools: [CalculateSum.new],
      messages: [\{role: "user", content: "What is 15 + 27?"\}]
    )

    runner.each_streaming do |stream|
      stream.each do |event|
        case event
        when Anthropic::Streaming::TextEvent
          print event.text
        when Anthropic::Streaming::InputJsonEvent
          print event.partial_json
        end
      end
      puts
    end
    ```
