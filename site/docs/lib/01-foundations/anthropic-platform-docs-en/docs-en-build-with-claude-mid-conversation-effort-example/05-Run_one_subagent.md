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
sourceRel: "docs/en/build-with-claude/mid-conversation-effort-example.md"
rawUrl: "/raw/01-foundations/anthropic-platform-docs-en/docs/en/build-with-claude/mid-conversation-effort-example.md"
sourceSha256: "88a2fa6d07b354b90d37bbab7c6c1f65502776a31e4be76eaefe73d788798fbd"
pageSha256: "b49ffe8849339162e267b0aae34f284b1c813f1f419b7371ab8f3cdda11e2f17"
contentMode: "local-full"
zh: ""
---

## Run one subagent

Each workflow subtask becomes its own small agent loop with the bash tool, running at the same effort as the main loop. A per-request timeout bounds each API call so a dropped connection degrades one subagent instead of stalling the whole run.

  ```python Python
  def run_subagent(model: str, prompt: str) -> str:
      """One subagent: a small nested agent loop with the bash tool plus report_findings.
      Subagents inherit the main loop's effort level."""
      subagent_system = (
          "You are one agent in a larger parallel fan-out, assigned a single subtask. "
          "Investigate it directly, using bash to check facts rather than guessing, and finish "
          "by calling report_findings exactly once. Return findings, not narration."
      )
      messages = [{"role": "user", "content": prompt}]
      for _ in range(MAX_SUBAGENT_TURNS):
          with client.messages.stream(
              model=model,
              max_tokens=64000,
              system=subagent_system,
              output_config={"effort": EFFORT},
              tools=[BASH_TOOL, REPORT_TOOL],
              messages=messages,
              timeout=REQUEST_TIMEOUT_SECONDS,
          ) as stream:
              response = stream.get_final_message()
          messages.append({"role": "assistant", "content": response.content})
          if response.stop_reason == "pause_turn":
              continue
          if response.stop_reason != "tool_use":
              text = "".join(block.text for block in response.content if block.type == "text")
              if response.stop_reason == "max_tokens":
                  text += "\n\n(warning: subagent response was truncated at max_tokens)"
              return text
          tool_results = []
          report = None
          for block in response.content:
              if block.type != "tool_use":
                  continue
              if block.name == "report_findings":
                  report = json.dumps(block.input, indent=2)
                  output, is_error = "Findings recorded.", False
              elif block.name == "bash":
                  output, is_error = handle_bash_block(block)
              else:
                  output, is_error = f"unknown tool: {block.name}", True
              tool_results.append(
                  {
                      "type": "tool_result",
                      "tool_use_id": block.id,
                      "content": output,
                      "is_error": is_error,
                  }
              )
          if report is not None:
              return report
          messages.append({"role": "user", "content": tool_results})
      return "(subagent hit the turn limit before finishing)"
  ```

  ```typescript TypeScript
  // One subagent: a small nested agent loop with the bash tool plus report_findings.
  // Subagents inherit the main loop's effort level.
  async function runSubagent(model: string, prompt: string): Promise<string> {
    const subagentSystem =
      "You are one agent in a larger parallel fan-out, assigned a single subtask. " +
      "Investigate it directly, using bash to check facts rather than guessing, and finish " +
      "by calling report_findings exactly once. Return findings, not narration.";
    const messages: Anthropic.MessageParam[] = [{ role: "user", content: prompt }];
    for (let turn = 0; turn < MAX_SUBAGENT_TURNS; turn++) {
      const response = await client.messages
        .stream(
          {
            model,
            max_tokens: 64000,
            system: subagentSystem,
            output_config: { effort: EFFORT },
            tools: [BASH_TOOL, REPORT_TOOL],
            messages,
          },
          { signal: AbortSignal.timeout(REQUEST_TIMEOUT_SECONDS * 1000) },
        )
        .finalMessage();
      messages.push({ role: "assistant", content: response.content });
      if (response.stop_reason === "pause_turn") {
        continue;
      }
      if (response.stop_reason !== "tool_use") {
        let text = response.content
          .filter((block): block is Anthropic.TextBlock => block.type === "text")
          .map((block) => block.text)
          .join("");
        if (response.stop_reason === "max_tokens") {
          text += "\n\n(warning: subagent response was truncated at max_tokens)";
        }
        return text;
      }
      const toolResults: Anthropic.ToolResultBlockParam[] = [];
      let report: string | null = null;
      for (const block of response.content) {
        if (block.type !== "tool_use") {
          continue;
        }
        let output: string;
        let isError: boolean;
        if (block.name === "report_findings") {
          report = JSON.stringify(block.input, null, 2);
          output = "Findings recorded.";
          isError = false;
        } else if (block.name === "bash") {
          ({ output, isError } = await handleBashBlock(block));
        } else {
          output = `unknown tool: ${block.name}`;
          isError = true;
        }
        toolResults.push({
          type: "tool_result",
          tool_use_id: block.id,
          content: output,
          is_error: isError,
        });
      }
      if (report !== null) {
        return report;
      }
      messages.push({ role: "user", content: toolResults });
    }
    return "(subagent hit the turn limit before finishing)";
  }
  ```

  ```csharp C#
  // One subagent: a small nested agent loop with the bash tool plus report_findings.
  // Subagents inherit the main loop's effort level.
  async Task<string> RunSubagent(string prompt)
  {
      const string subagentSystem =
          "You are one agent in a larger parallel fan-out, assigned a single subtask. "
          + "Investigate it directly, using bash to check facts rather than guessing, and finish "
          + "by calling report_findings exactly once. Return findings, not narration.";
      List<MessageParam> messages = [new() { Role = Role.User, Content = prompt }];
      for (var turn = 0; turn < maxSubagentTurns; turn++)
      {
          using var deadline = new CancellationTokenSource(TimeSpan.FromSeconds(requestTimeoutSeconds));
          var response = await client.Messages.Create(new MessageCreateParams
          {
              Model = model,
              MaxTokens = requestMaxTokens,
              System = subagentSystem,
              OutputConfig = new OutputConfig { Effort = effort },
              Tools = [bashTool, reportTool],
              Messages = messages,
          }, cancellationToken: deadline.Token);
          messages.Add(new()
          {
              Role = Role.Assistant,
              Content = response.Content.Select(block => new ContentBlockParam(block.Json)).ToList(),
          });
          if (response.StopReason == StopReason.PauseTurn)
          {
              continue;
          }
          if (response.StopReason != StopReason.ToolUse)
          {
              var text = string.Concat(
                  response.Content.Select(block => block.TryPickText(out var textBlock) ? textBlock.Text : ""));
              if (response.StopReason == StopReason.MaxTokens)
              {
                  text += "\n\n(warning: subagent response was truncated at max_tokens)";
              }
              return text;
          }
          List<ContentBlockParam> toolResults = [];
          string? report = null;
          foreach (var block in response.Content)
          {
              if (!block.TryPickToolUse(out var toolUse))
              {
                  continue;
              }
              string output;
              bool isError;
              if (toolUse.Name == "report_findings")
              {
                  report = JsonSerializer.Serialize(
                      toolUse.Input, new JsonSerializerOptions { WriteIndented = true });
                  output = "Findings recorded.";
                  isError = false;
              }
              else if (toolUse.Name == "bash")
              {
                  (output, isError) = await HandleBashBlock(toolUse);
              }
              else
              {
                  output = $"unknown tool: {toolUse.Name}";
                  isError = true;
              }
              toolResults.Add(new ToolResultBlockParam(toolUse.ID) { Content = output, IsError = isError });
          }
          if (report is not null)
          {
              return report;
          }
          messages.Add(new() { Role = Role.User, Content = toolResults });
      }
      return "(subagent hit the turn limit before finishing)";
  }
  ```

  ```go Go
  // runSubagent runs one subagent: a small nested agent loop with the bash tool plus
  // report_findings. Subagents inherit the main loop's effort level.
  func runSubagent(ctx context.Context, model string, prompt string) (string, error) {
  	subagentSystem := "You are one agent in a larger parallel fan-out, assigned a single subtask. " +
  		"Investigate it directly, using bash to check facts rather than guessing, and finish " +
  		"by calling report_findings exactly once. Return findings, not narration."
  	messages := []anthropic.MessageParam{anthropic.NewUserMessage(anthropic.NewTextBlock(prompt))}
  	for range maxSubagentTurns {
  		var response anthropic.Message
  		err := func() error {
  			ctx, cancel := context.WithTimeout(ctx, requestTimeoutSeconds*time.Second)
  			defer cancel()
  			stream := client.Messages.NewStreaming(ctx, anthropic.MessageNewParams{
  				Model:        model,
  				MaxTokens:    64000,
  				System:       []anthropic.TextBlockParam{{Text: subagentSystem}},
  				OutputConfig: anthropic.OutputConfigParam{Effort: effort},
  				Tools:        []anthropic.ToolUnionParam{bashTool, reportTool},
  				Messages:     messages,
  			})
  			defer stream.Close()
  			for stream.Next() {
  				if err := response.Accumulate(stream.Current()); err != nil {
  					return err
  				}
  			}
  			return stream.Err()
  		}()
  		if err != nil {
  			return "", err
  		}
  		messages = append(messages, response.ToParam())
  		if response.StopReason == anthropic.StopReasonPauseTurn {
  			continue
  		}
  		if response.StopReason != anthropic.StopReasonToolUse {
  			var text strings.Builder
  			for _, block := range response.Content {
  				if textBlock, ok := block.AsAny().(anthropic.TextBlock); ok {
  					text.WriteString(textBlock.Text)
  				}
  			}
  			if response.StopReason == anthropic.StopReasonMaxTokens {
  				text.WriteString("\n\n(warning: subagent response was truncated at max_tokens)")
  			}
  			return text.String(), nil
  		}
  		var toolResults []anthropic.ContentBlockParamUnion
  		var report string
  		var reportRecorded bool
  		for _, block := range response.Content {
  			toolUse, ok := block.AsAny().(anthropic.ToolUseBlock)
  			if !ok {
  				continue
  			}
  			var output string
  			var isError bool
  			switch toolUse.Name {
  			case "report_findings":
  				report = string(toolUse.Input)
  				var pretty bytes.Buffer
  				if err := json.Indent(&pretty, toolUse.Input, "", "  "); err == nil {
  					report = pretty.String()
  				}
  				reportRecorded = true
  				output = "Findings recorded."
  			case "bash":
  				output, isError = handleBashBlock(ctx, toolUse)
  			default:
  				output, isError = fmt.Sprintf("unknown tool: %s", toolUse.Name), true
  			}
  			toolResults = append(toolResults, anthropic.NewToolResultBlock(toolUse.ID, output, isError))
  		}
  		if reportRecorded {
  			return report, nil
  		}
  		messages = append(messages, anthropic.NewUserMessage(toolResults...))
  	}
  	return "(subagent hit the turn limit before finishing)", nil
  }

  ```

  ```java Java
  // One subagent: a small nested agent loop with the bash tool plus report_findings.
  // Subagents inherit the main loop's effort level.
  String runSubagent(Model model, String prompt) throws InterruptedException {
      String subagentSystem = "You are one agent in a larger parallel fan-out, assigned a single subtask. "
              + "Investigate it directly, using bash to check facts rather than guessing, and finish "
              + "by calling report_findings exactly once. Return findings, not narration.";
      List<MessageParam> messages = new ArrayList<>();
      messages.add(MessageParam.builder().role(MessageParam.Role.USER).content(prompt).build());
      for (int turn = 0; turn < MAX_SUBAGENT_TURNS; turn++) {
          MessageCreateParams params = MessageCreateParams.builder()
                  .model(model)
                  .maxTokens(64000L)
                  .system(subagentSystem)
                  .outputConfig(OutputConfig.builder().effort(EFFORT).build())
                  .addTool(BASH_TOOL)
                  .addTool(REPORT_TOOL)
                  .messages(messages)
                  .build();
          MessageAccumulator accumulator = MessageAccumulator.create();
          try (var stream = client.messages().createStreaming(params, REQUEST_OPTIONS)) {
              stream.stream().forEach(accumulator::accumulate);
          }
          Message response = accumulator.message();
          messages.add(response.toParam());
          StopReason stopReason = response.stopReason().orElse(null);
          if (StopReason.PAUSE_TURN.equals(stopReason)) {
              continue;
          }
          if (!StopReason.TOOL_USE.equals(stopReason)) {
              String text = response.content().stream()
                      .flatMap(block -> block.text().stream())
                      .map(TextBlock::text)
                      .collect(Collectors.joining());
              if (StopReason.MAX_TOKENS.equals(stopReason)) {
                  text += "\n\n(warning: subagent response was truncated at max_tokens)";
              }
              return text;
          }
          List<ContentBlockParam> toolResults = new ArrayList<>();
          String report = null;
          for (ContentBlock block : response.content()) {
              if (block.toolUse().isEmpty()) {
                  continue;
              }
              ToolUseBlock toolUse = block.toolUse().get();
              ToolOutput result;
              if (toolUse.name().equals("report_findings")) {
                  report = toolUse._input().convert(JsonNode.class).toPrettyString();
                  result = new ToolOutput("Findings recorded.", false);
              } else if (toolUse.name().equals("bash")) {
                  result = handleBashBlock(toolUse);
              } else {
                  result = new ToolOutput("unknown tool: " + toolUse.name(), true);
              }
              toolResults.add(ContentBlockParam.ofToolResult(ToolResultBlockParam.builder()
                      .toolUseId(toolUse.id())
                      .content(result.output())
                      .isError(result.isError())
                      .build()));
          }
          if (report != null) {
              return report;
          }
          messages.add(MessageParam.builder()
                  .role(MessageParam.Role.USER)
                  .contentOfBlockParams(toolResults)
                  .build());
      }
      return "(subagent hit the turn limit before finishing)";
  }
  ```

  ```php PHP
  /**
   * Consume a message stream and assemble the final assistant turn from its events:
   * the full content-block list plus the stop reason, equivalent to what a
   * non-streaming create call returns.
   */
  function drainMessageStream(iterable $events): array
  {
      $stringValue = fn ($value) => $value instanceof BackedEnum ? $value->value : $value;
      $blocks = [];
      $jsonBuffers = [];
      $stopReason = null;
      foreach ($events as $event) {
          $type = $stringValue($event->type);
          if ($type === 'content_block_start') {
              $blocks[$event->index] = $event->contentBlock;
              $jsonBuffers[$event->index] = '';
          } elseif ($type === 'content_block_delta') {
              $block = $blocks[$event->index];
              $delta = $event->delta;
              $deltaType = $stringValue($delta->type);
              if ($deltaType === 'text_delta') {
                  $blocks[$event->index] = $block->withText($block->text . $delta->text);
              } elseif ($deltaType === 'input_json_delta') {
                  $jsonBuffers[$event->index] .= $delta->partialJSON;
              } elseif ($deltaType === 'thinking_delta') {
                  $blocks[$event->index] = $block->withThinking($block->thinking . $delta->thinking);
              } elseif ($deltaType === 'signature_delta') {
                  $blocks[$event->index] = $block->withSignature($delta->signature);
              }
          } elseif ($type === 'message_delta') {
              $stopReason = $stringValue($event->delta->stopReason);
          }
      }
      foreach ($jsonBuffers as $index => $buffer) {
          if ($buffer !== '' && $blocks[$index] instanceof ToolUseBlock) {
              $decoded = json_decode($buffer, true);
              $blocks[$index] = $blocks[$index]->withInput(is_array($decoded) ? $decoded : []);
          }
      }
      return [array_values($blocks), $stopReason];
  }

  /**
   * One subagent: a small nested agent loop with the bash tool plus report_findings.
   * Subagents inherit the main loop's effort level.
   */
  function runSubagent(Client $client, string $model, string $prompt): string
  {
      $subagentSystem =
          'You are one agent in a larger parallel fan-out, assigned a single subtask. '
          . 'Investigate it directly, using bash to check facts rather than guessing, and finish '
          . 'by calling report_findings exactly once. Return findings, not narration.';
      $messages = [['role' => 'user', 'content' => $prompt]];
      for ($turn = 0; $turn < MAX_SUBAGENT_TURNS; $turn++) {
          $stream = $client->messages->createStream(
              model: $model,
              maxTokens: 64000,
              system: $subagentSystem,
              outputConfig: ['effort' => EFFORT],
              tools: [BASH_TOOL, REPORT_TOOL],
              messages: $messages,
              requestOptions: ['timeout' => REQUEST_TIMEOUT_SECONDS],
          );
          [$content, $stopReason] = drainMessageStream($stream);
          $messages[] = ['role' => 'assistant', 'content' => $content];
          if ($stopReason === 'pause_turn') {
              continue;
          }
          if ($stopReason !== 'tool_use') {
              $text = '';
              foreach ($content as $block) {
                  if ($block instanceof TextBlock) {
                      $text .= $block->text;
                  }
              }
              if ($stopReason === 'max_tokens') {
                  $text .= "\n\n(warning: subagent response was truncated at max_tokens)";
              }
              return $text;
          }
          $report = null;
          $toolResults = [];
          foreach ($content as $block) {
              if (!$block instanceof ToolUseBlock) {
                  continue;
              }
              if ($block->name === 'report_findings') {
                  $report = json_encode($block->input, JSON_PRETTY_PRINT);
                  $output = 'Findings recorded.';
                  $isError = false;
              } elseif ($block->name === 'bash') {
                  [$output, $isError] = handleBashBlock($block);
              } else {
                  $output = "unknown tool: {$block->name}";
                  $isError = true;
              }
              $toolResults[] = [
                  'type' => 'tool_result',
                  'tool_use_id' => $block->id,
                  'content' => $output,
                  'is_error' => $isError,
              ];
          }
          if ($report !== null) {
              return $report;
          }
          $messages[] = ['role' => 'user', 'content' => $toolResults];
      }
      return '(subagent hit the turn limit before finishing)';
  }
  ```

  ```ruby Ruby
  # One subagent: a small nested agent loop with the bash tool plus report_findings.
  # Subagents inherit the main loop's effort level.
  def run_subagent(model, prompt)
    subagent_system =
      "You are one agent in a larger parallel fan-out, assigned a single subtask. " \
      "Investigate it directly, using bash to check facts rather than guessing, and finish " \
      "by calling report_findings exactly once. Return findings, not narration."
    messages = [{role: "user", content: prompt}]
    MAX_SUBAGENT_TURNS.times do
      stream = CLIENT.messages.stream(
        model: model,
        max_tokens: 64_000,
        system_: subagent_system,
        output_config: {effort: EFFORT},
        tools: [BASH_TOOL, REPORT_TOOL],
        messages: messages,
        request_options: {timeout: REQUEST_TIMEOUT_SECONDS}
      )
      response = stream.accumulated_message
      messages << {role: "assistant", content: assistant_content_param(response.content)}
      next if response.stop_reason == :pause_turn

      unless response.stop_reason == :tool_use
        text = response.content.select { |block| block.type == :text }.map(&:text).join
        text += "\n\n(warning: subagent response was truncated at max_tokens)" if response.stop_reason == :max_tokens
        return text
      end

      report = nil
      tool_results = []
      response.content.each do |block|
        next unless block.type == :tool_use

        input = parse_tool_input(block.input)
        case block.name
        when "report_findings"
          report = JSON.pretty_generate(input)
          output, is_error = "Findings recorded.", false
        when "bash"
          output, is_error = handle_bash_block(block)
        else
          output, is_error = "unknown tool: #{block.name}", true
        end
        tool_results << {
          type: "tool_result",
          tool_use_id: block.id,
          content: output,
          is_error: is_error
        }
      end
      return report unless report.nil?

      messages << {role: "user", content: tool_results}
    end
    "(subagent hit the turn limit before finishing)"
  end
  ```
