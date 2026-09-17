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
pageSha256: "9a2539a5d22dce7d648ef0cdcbee206c44d4d0714a7b919580970e3374cf18c0"
contentMode: "local-full"
zh: ""
---

## Multi-turn conversations

Pass the full assistant content, including `advisor_tool_result` blocks, back to the API on subsequent turns. Round-trip the result blocks verbatim: with a Claude Opus 5 advisor the result block's `content` is the encrypted `advisor_redacted_result` variant, and the server decrypts it and renders the advice into the executor's prompt on the next turn (see [Result variants](https://platform.claude.com/docs/en/agents-and-tools/tool-use/advisor-tool#result-variants)). The mechanics are identical for any advisor model.

  ```python Python
  client = anthropic.Anthropic()

  tools = [
      {
          "type": "advisor_20260301",
          "name": "advisor",
          "model": "claude-opus-5",
      }
  ]

  messages = [
      {
          "role": "user",
          "content": "Build a concurrent worker pool in Go with graceful shutdown.",
      }
  ]

  response = client.beta.messages.create(
      model="claude-sonnet-5",
      max_tokens=1024,
      betas=["advisor-tool-2026-03-01"],
      tools=tools,
      messages=messages,
  )

  # Append the full response content, including any advisor_tool_result blocks
  messages.append({"role": "assistant", "content": response.content})

  # Continue the conversation
  messages.append({"role": "user", "content": "Now add a max-in-flight limit of 10."})

  response = client.beta.messages.create(
      model="claude-sonnet-5",
      max_tokens=1024,
      betas=["advisor-tool-2026-03-01"],
      tools=tools,
      messages=messages,
  )
  ```

  ```typescript TypeScript
  const client = new Anthropic();

  const tools: Anthropic.Beta.Messages.BetaToolUnion[] = [
    {
      type: "advisor_20260301",
      name: "advisor",
      model: "claude-opus-5"
    }
  ];

  const messages: Anthropic.Beta.Messages.BetaMessageParam[] = [
    {
      role: "user",
      content: "Build a concurrent worker pool in Go with graceful shutdown."
    }
  ];

  const response = await client.beta.messages.create({
    model: "claude-sonnet-5",
    max_tokens: 1024,
    betas: ["advisor-tool-2026-03-01"],
    tools,
    messages
  });

  // Append the full response content, including any advisor_tool_result blocks
  messages.push({ role: "assistant", content: response.content });

  // Continue the conversation
  messages.push({ role: "user", content: "Now add a max-in-flight limit of 10." });

  const followUp = await client.beta.messages.create({
    model: "claude-sonnet-5",
    max_tokens: 1024,
    betas: ["advisor-tool-2026-03-01"],
    tools,
    messages
  });
  ```

  ```csharp C#
  using Anthropic.Models.Beta.Messages;
  using Messages = Anthropic.Models.Messages;

  var client = new AnthropicClient();

  var tools = new BetaToolUnion[]
  {
      new BetaAdvisorTool20260301 { Model = Messages::Model.ClaudeOpus5 }
  };

  var messages = new List<BetaMessageParam>
  {
      new() { Role = Role.User, Content = "Build a concurrent worker pool in Go with graceful shutdown." }
  };

  var response = await client.Beta.Messages.Create(new MessageCreateParams
  {
      Model = Messages::Model.ClaudeSonnet5,
      MaxTokens = 1024,
      Tools = tools,
      Messages = messages,
      Betas = ["advisor-tool-2026-03-01"]
  });

  // Append the full response content, including any advisor_tool_result blocks
  messages.Add(new BetaMessageParam
  {
      Role = Role.Assistant,
      Content = response.Content.Select(block => new BetaContentBlockParam(block.Json)).ToList()
  });

  // Continue the conversation
  messages.Add(new BetaMessageParam { Role = Role.User, Content = "Now add a max-in-flight limit of 10." });

  var followUp = await client.Beta.Messages.Create(new MessageCreateParams
  {
      Model = Messages::Model.ClaudeSonnet5,
      MaxTokens = 1024,
      Tools = tools,
      Messages = messages,
      Betas = ["advisor-tool-2026-03-01"]
  });
  ```

  ```go Go
  client := anthropic.NewClient()

  tools := []anthropic.BetaToolUnionParam{
  	{OfAdvisorTool20260301: &anthropic.BetaAdvisorTool20260301Param{
  		Model: anthropic.ModelClaudeOpus5,
  	}},
  }

  messages := []anthropic.BetaMessageParam{
  	anthropic.NewBetaUserMessage(anthropic.NewBetaTextBlock("Build a concurrent worker pool in Go with graceful shutdown.")),
  }

  response, err := client.Beta.Messages.New(context.TODO(), anthropic.BetaMessageNewParams{
  	Model:     anthropic.ModelClaudeSonnet5,
  	MaxTokens: 1024,
  	Tools:     tools,
  	Messages:  messages,
  	Betas: []anthropic.AnthropicBeta{
  		anthropic.AnthropicBetaAdvisorTool2026_03_01,
  	},
  })
  if err != nil {
  	log.Fatal(err)
  }

  // Append the full response content, including any advisor_tool_result blocks.
  // BetaMessage.ToParam drops advisor result content as of anthropic-sdk-go
  // v1.61.0, so re-parse each response block's raw JSON into a param block instead.
  assistantContent := make([]anthropic.BetaContentBlockParamUnion, len(response.Content))
  for i, block := range response.Content {
  	if err := json.Unmarshal([]byte(block.RawJSON()), &assistantContent[i]); err != nil {
  		log.Fatal(err)
  	}
  }
  messages = append(messages, anthropic.BetaMessageParam{
  	Role:    anthropic.BetaMessageParamRoleAssistant,
  	Content: assistantContent,
  })

  // Continue the conversation
  messages = append(messages, anthropic.NewBetaUserMessage(anthropic.NewBetaTextBlock("Now add a max-in-flight limit of 10.")))

  response, err = client.Beta.Messages.New(context.TODO(), anthropic.BetaMessageNewParams{
  	Model:     anthropic.ModelClaudeSonnet5,
  	MaxTokens: 1024,
  	Tools:     tools,
  	Messages:  messages,
  	Betas: []anthropic.AnthropicBeta{
  		anthropic.AnthropicBetaAdvisorTool2026_03_01,
  	},
  })
  if err != nil {
  	log.Fatal(err)
  }
  ```

  ```java Java
  import com.anthropic.models.beta.messages.BetaAdvisorTool20260301;
  import com.anthropic.models.beta.messages.BetaContentBlock;
  import com.anthropic.models.beta.messages.BetaMessage;
  import com.anthropic.models.beta.messages.BetaMessageParam;
  import com.anthropic.models.beta.messages.BetaToolUnion;
  import com.anthropic.models.beta.messages.MessageCreateParams;
  import com.anthropic.models.messages.Model;

  void main() {
      AnthropicClient client = AnthropicOkHttpClient.fromEnv();

      List<BetaToolUnion> tools = List.of(
          BetaToolUnion.ofAdvisorTool20260301(
              BetaAdvisorTool20260301.builder().model(Model.CLAUDE_OPUS_5).build()));

      List<BetaMessageParam> messages = new ArrayList<>();
      messages.add(BetaMessageParam.builder()
          .role(BetaMessageParam.Role.USER)
          .content("Build a concurrent worker pool in Go with graceful shutdown.")
          .build());

      BetaMessage response = client.beta().messages().create(MessageCreateParams.builder()
          .model(Model.CLAUDE_SONNET_5)
          .maxTokens(1024L)
          .tools(tools)
          .messages(messages)
          .addBeta("advisor-tool-2026-03-01")
          .build());

      // Append the full response content, including any advisor_tool_result blocks
      messages.add(BetaMessageParam.builder()
          .role(BetaMessageParam.Role.ASSISTANT)
          .contentOfBetaContentBlockParams(
              response.content().stream().map(BetaContentBlock::toParam).toList())
          .build());

      // Continue the conversation
      messages.add(BetaMessageParam.builder()
          .role(BetaMessageParam.Role.USER)
          .content("Now add a max-in-flight limit of 10.")
          .build());

      BetaMessage followUp = client.beta().messages().create(MessageCreateParams.builder()
          .model(Model.CLAUDE_SONNET_5)
          .maxTokens(1024L)
          .tools(tools)
          .messages(messages)
          .addBeta("advisor-tool-2026-03-01")
          .build());
  }
  ```

  ```php PHP
  $client = new Client();

  $tools = [
      [
          'type' => 'advisor_20260301',
          'name' => 'advisor',
          'model' => 'claude-opus-5',
      ],
  ];

  $messages = [
      [
          'role' => 'user',
          'content' => 'Build a concurrent worker pool in Go with graceful shutdown.',
      ],
  ];

  $response = $client->beta->messages->create(
      maxTokens: 1024,
      messages: $messages,
      model: 'claude-sonnet-5',
      tools: $tools,
      betas: ['advisor-tool-2026-03-01'],
  );

  // Append the full response content, including any advisor_tool_result blocks
  $messages[] = ['role' => 'assistant', 'content' => $response->content];

  // Continue the conversation
  $messages[] = ['role' => 'user', 'content' => 'Now add a max-in-flight limit of 10.'];

  $response = $client->beta->messages->create(
      maxTokens: 1024,
      messages: $messages,
      model: 'claude-sonnet-5',
      tools: $tools,
      betas: ['advisor-tool-2026-03-01'],
  );
  ```

  ```ruby Ruby
  client = Anthropic::Client.new

  tools = [
    {
      type: "advisor_20260301",
      name: "advisor",
      model: "claude-opus-5"
    }
  ]

  messages = [
    {
      role: "user",
      content: "Build a concurrent worker pool in Go with graceful shutdown."
    }
  ]

  response = client.beta.messages.create(
    model: "claude-sonnet-5",
    max_tokens: 1024,
    tools: tools,
    messages: messages,
    betas: ["advisor-tool-2026-03-01"]
  )

  # Append the full response content, including any advisor_tool_result blocks
  messages << { role: "assistant", content: response.content }

  # Continue the conversation
  messages << { role: "user", content: "Now add a max-in-flight limit of 10." }

  response = client.beta.messages.create(
    model: "claude-sonnet-5",
    max_tokens: 1024,
    tools: tools,
    messages: messages,
    betas: ["advisor-tool-2026-03-01"]
  )
  ```

You can drop the advisor tool from `tools` on a follow-up turn while the message history still contains `advisor_tool_result` blocks. The request is accepted and the historical blocks are preserved; the model cannot call the advisor on that turn. You must still send the `advisor-tool-2026-03-01` beta header for those history blocks to be accepted.

  The advisor tool has no built-in conversation-level cap. To limit advisor calls across a conversation, count them client-side. When you reach your ceiling, remove the advisor tool from your `tools` array. You do not need to strip `advisor_tool_result` blocks from your message history.

### Resuming a paused turn

A response can end with `stop_reason: "pause_turn"` while an advisor call is still pending. When that occurs, the response contains the advisor's `server_tool_use` block with no `advisor_tool_result` for it. To resume, append that assistant message to `messages` with its content unchanged, keeping the `server_tool_use` block, and send the request again with the same advisor tool and beta header. You do not need to add a user message or a `tool_result` block. The API runs the pending advisor call and continues the executor's turn in the new response. A resumed turn can pause again. If it does, repeat the same step. Omitting the advisor tool from the resume request returns a 400 `invalid_request_error`, because the pending `server_tool_use` block has no tool definition to run against; include the tool whenever a call is pending. If instead the executor called one of your tools in the same turn, the response ends with `stop_reason: "tool_use"` while the advisor call is still pending. Send the `tool_result` blocks as usual, and the pending advisor call runs at the start of that next request. See [Mixing server tools and client tools in one turn](https://platform.claude.com/docs/en/agents-and-tools/tool-use/server-tools#mixing-server-tools-and-client-tools-in-one-turn).

### Mid-conversation nudge for under-calling executors

If a Haiku executor has not called the advisor in its first assistant turn, append a short reminder as an additional user message before the second assistant turn. In Anthropic's internal behavioral evaluation this raised task pass rates by roughly 7 percentage points on Haiku executors. On Sonnet executors, the plain-text nudge had no measurable effect in Anthropic's testing. The call-timing considerations that follow are especially relevant for Sonnet. Do not apply the nudge to Opus executors: On Opus it slightly lowered pass rates.

With the default `NUDGE_TURN` of 2, the reminder typically arrives after the model has oriented on the task but before it has committed to an approach.

  ```python Python
  client = anthropic.Anthropic()

  NUDGE_TURN = 2  # inject before this assistant turn if no advisor call yet
  NUDGE_TEXT = (
      "You have not consulted the advisor yet. If the task has a non-obvious "
      "design decision or a failure mode you haven't ruled out, call advisor "
      "now before committing to an approach."
  )
  MAX_TURNS = 10  # agent loop cap

  def run_your_tools(content):
      # Replace with your tool dispatch. Returns one tool_result block per tool_use block.
      return [
          {
              "type": "tool_result",
              "tool_use_id": block.id,
              "content": "Replace with your tool output.",
          }
          for block in content
          if block.type == "tool_use"
      ]

  tools = [
      {"type": "advisor_20260301", "name": "advisor", "model": "claude-opus-5"},
      # ... your other tools
  ]
  task = "Build a concurrent worker pool in Go with graceful shutdown."
  messages = [{"role": "user", "content": task}]
  advisor_called = False

  for turn in range(1, MAX_TURNS + 1):
      response = client.beta.messages.create(
          model="claude-haiku-4-5",
          max_tokens=4096,
          betas=["advisor-tool-2026-03-01"],
          tools=tools,
          messages=messages,
      )
      messages.append({"role": "assistant", "content": response.content})
      advisor_called = advisor_called or any(
          block.type == "server_tool_use" and block.name == "advisor"
          for block in response.content
      )
      if response.stop_reason == "end_turn":
          break
      if response.stop_reason == "pause_turn":
          continue  # server tool pending; re-send to let the API complete it

      results = run_your_tools(response.content)  # list of tool_result blocks
      if results:
          messages.append({"role": "user", "content": results})
      # Skip this if your system prompt already tells the model to call sparingly.
      if turn == NUDGE_TURN - 1 and not advisor_called:
          messages.append({"role": "user", "content": NUDGE_TEXT})
  ```

  ```typescript TypeScript
  const client = new Anthropic();

  const NUDGE_TURN = 2; // inject before this assistant turn if no advisor call yet
  const NUDGE_TEXT =
    "You have not consulted the advisor yet. If the task has a non-obvious " +
    "design decision or a failure mode you haven't ruled out, call advisor " +
    "now before committing to an approach.";
  const MAX_TURNS = 10; // agent loop cap

  function runYourTools(
    content: Anthropic.Beta.Messages.BetaContentBlock[]
  ): Anthropic.Beta.Messages.BetaToolResultBlockParam[] {
    // Replace with your tool dispatch. Returns one tool_result block per tool_use block.
    return content
      .filter((block) => block.type === "tool_use")
      .map((block) => ({
        type: "tool_result" as const,
        tool_use_id: block.id,
        content: "Replace with your tool output."
      }));
  }

  const tools: Anthropic.Beta.Messages.BetaToolUnion[] = [
    { type: "advisor_20260301", name: "advisor", model: "claude-opus-5" }
    // ... your other tools
  ];
  const task = "Build a concurrent worker pool in Go with graceful shutdown.";
  const messages: Anthropic.Beta.Messages.BetaMessageParam[] = [{ role: "user", content: task }];
  let advisorCalled = false;

  for (let turn = 1; turn <= MAX_TURNS; turn++) {
    const response = await client.beta.messages.create({
      model: "claude-haiku-4-5",
      max_tokens: 4096,
      betas: ["advisor-tool-2026-03-01"],
      tools,
      messages
    });
    messages.push({ role: "assistant", content: response.content });
    advisorCalled =
      advisorCalled ||
      response.content.some(
        (block) => block.type === "server_tool_use" && block.name === "advisor"
      );
    if (response.stop_reason === "end_turn") {
      break;
    }
    if (response.stop_reason === "pause_turn") {
      continue; // server tool pending; re-send to let the API complete it
    }

    const results = runYourTools(response.content); // list of tool_result blocks
    if (results.length > 0) {
      messages.push({ role: "user", content: results });
    }
    // Skip this if your system prompt already tells the model to call sparingly.
    if (turn === NUDGE_TURN - 1 && !advisorCalled) {
      messages.push({ role: "user", content: NUDGE_TEXT });
    }
  }
  ```

  ```csharp C#
  using Anthropic.Models.Beta.Messages;
  using Messages = Anthropic.Models.Messages;

  var client = new AnthropicClient();

  const int NudgeTurn = 2; // inject before this assistant turn if no advisor call yet
  const string NudgeText =
      "You have not consulted the advisor yet. If the task has a non-obvious "
      + "design decision or a failure mode you haven't ruled out, call advisor "
      + "now before committing to an approach.";
  const int MaxTurns = 10; // agent loop cap

  // Replace with your tool dispatch. Returns one tool_result block per tool_use block.
  List<BetaContentBlockParam> RunYourTools(IReadOnlyList<BetaContentBlock> content)
  {
      List<BetaContentBlockParam> results = [];
      foreach (var block in content)
      {
          if (block.TryPickToolUse(out var toolUse))
          {
              results.Add(new BetaToolResultBlockParam
              {
                  ToolUseID = toolUse.ID,
                  Content = "Replace with your tool output."
              });
          }
      }
      return results;
  }

  var tools = new BetaToolUnion[]
  {
      new BetaAdvisorTool20260301 { Model = Messages::Model.ClaudeOpus5 }
      // ... your other tools
  };
  var task = "Build a concurrent worker pool in Go with graceful shutdown.";
  var messages = new List<BetaMessageParam> { new() { Role = Role.User, Content = task } };
  var advisorCalled = false;

  for (var turn = 1; turn <= MaxTurns; turn++)
  {
      var response = await client.Beta.Messages.Create(new MessageCreateParams
      {
          Model = Messages::Model.ClaudeHaiku4_5,
          MaxTokens = 4096,
          Tools = tools,
          Messages = messages,
          Betas = ["advisor-tool-2026-03-01"]
      });
      messages.Add(new BetaMessageParam
      {
          Role = Role.Assistant,
          Content = response.Content.Select(block => new BetaContentBlockParam(block.Json)).ToList()
      });
      advisorCalled =
          advisorCalled
          || response.Content.Any(block =>
              block.TryPickServerToolUse(out var serverToolUse)
              && serverToolUse.Name.Value() == Name.Advisor
          );
      if (response.StopReason == BetaStopReason.EndTurn)
      {
          break;
      }
      if (response.StopReason == BetaStopReason.PauseTurn)
      {
          continue; // server tool pending; re-send to let the API complete it
      }

      var results = RunYourTools(response.Content); // list of tool_result blocks
      if (results.Count > 0)
      {
          messages.Add(new BetaMessageParam { Role = Role.User, Content = results });
      }
      // Skip this if your system prompt already tells the model to call sparingly.
      if (turn == NudgeTurn - 1 && !advisorCalled)
      {
          messages.Add(new BetaMessageParam { Role = Role.User, Content = NudgeText });
      }
  }
  ```

  ```go Go
  const (
  	nudgeTurn = 2 // inject before this assistant turn if no advisor call yet
  	nudgeText = "You have not consulted the advisor yet. If the task has a non-obvious " +
  		"design decision or a failure mode you haven't ruled out, call advisor " +
  		"now before committing to an approach."
  	maxTurns = 10 // agent loop cap
  )

  // Replace with your tool dispatch. Returns one tool_result block per tool_use block.
  func runYourTools(content []anthropic.BetaContentBlockUnion) []anthropic.BetaContentBlockParamUnion {
  	var results []anthropic.BetaContentBlockParamUnion
  	for _, block := range content {
  		if block.Type == "tool_use" {
  			results = append(results, anthropic.NewBetaToolResultBlock(block.ID, "Replace with your tool output.", false))
  		}
  	}
  	return results
  }

  func main() {
  	client := anthropic.NewClient()

  	tools := []anthropic.BetaToolUnionParam{
  		{OfAdvisorTool20260301: &anthropic.BetaAdvisorTool20260301Param{
  			Model: anthropic.ModelClaudeOpus5,
  		}},
  		// ... your other tools
  	}
  	task := "Build a concurrent worker pool in Go with graceful shutdown."
  	messages := []anthropic.BetaMessageParam{
  		anthropic.NewBetaUserMessage(anthropic.NewBetaTextBlock(task)),
  	}
  	advisorCalled := false

  	for turn := 1; turn <= maxTurns; turn++ {
  		response, err := client.Beta.Messages.New(context.TODO(), anthropic.BetaMessageNewParams{
  			Model:     anthropic.ModelClaudeHaiku4_5,
  			MaxTokens: 4096,
  			Tools:     tools,
  			Messages:  messages,
  			Betas: []anthropic.AnthropicBeta{
  				anthropic.AnthropicBetaAdvisorTool2026_03_01,
  			},
  		})
  		if err != nil {
  			log.Fatal(err)
  		}

  		// Append the full response content, including any advisor_tool_result blocks.
  		// BetaMessage.ToParam drops advisor result content as of anthropic-sdk-go
  		// v1.61.0, so re-parse each response block's raw JSON into a param block instead.
  		assistantContent := make([]anthropic.BetaContentBlockParamUnion, len(response.Content))
  		for i, block := range response.Content {
  			if err := json.Unmarshal([]byte(block.RawJSON()), &assistantContent[i]); err != nil {
  				log.Fatal(err)
  			}
  		}
  		messages = append(messages, anthropic.BetaMessageParam{
  			Role:    anthropic.BetaMessageParamRoleAssistant,
  			Content: assistantContent,
  		})

  		for _, block := range response.Content {
  			if block.Type == "server_tool_use" && block.Name == "advisor" {
  				advisorCalled = true
  			}
  		}
  		if response.StopReason == anthropic.BetaStopReasonEndTurn {
  			break
  		}
  		if response.StopReason == anthropic.BetaStopReasonPauseTurn {
  			continue // server tool pending; re-send to let the API complete it
  		}

  		results := runYourTools(response.Content) // list of tool_result blocks
  		if len(results) > 0 {
  			messages = append(messages, anthropic.BetaMessageParam{
  				Role:    anthropic.BetaMessageParamRoleUser,
  				Content: results,
  			})
  		}
  		// Skip this if your system prompt already tells the model to call sparingly.
  		if turn == nudgeTurn-1 && !advisorCalled {
  			messages = append(messages, anthropic.NewBetaUserMessage(anthropic.NewBetaTextBlock(nudgeText)))
  		}
  	}
  }
  ```

  ```java Java
  import com.anthropic.models.beta.messages.BetaAdvisorTool20260301;
  import com.anthropic.models.beta.messages.BetaContentBlock;
  import com.anthropic.models.beta.messages.BetaContentBlockParam;
  import com.anthropic.models.beta.messages.BetaMessage;
  import com.anthropic.models.beta.messages.BetaMessageParam;
  import com.anthropic.models.beta.messages.BetaServerToolUseBlock;
  import com.anthropic.models.beta.messages.BetaStopReason;
  import com.anthropic.models.beta.messages.BetaToolResultBlockParam;
  import com.anthropic.models.beta.messages.BetaToolUnion;
  import com.anthropic.models.beta.messages.MessageCreateParams;
  import com.anthropic.models.messages.Model;

  static final int NUDGE_TURN = 2; // inject before this assistant turn if no advisor call yet
  static final String NUDGE_TEXT =
      "You have not consulted the advisor yet. If the task has a non-obvious "
          + "design decision or a failure mode you haven't ruled out, call advisor "
          + "now before committing to an approach.";
  static final int MAX_TURNS = 10; // agent loop cap

  // Replace with your tool dispatch. Returns one tool_result block per tool_use block.
  List<BetaContentBlockParam> runYourTools(List<BetaContentBlock> content) {
      List<BetaContentBlockParam> results = new ArrayList<>();
      for (BetaContentBlock block : content) {
          if (block.isToolUse()) {
              results.add(BetaContentBlockParam.ofToolResult(
                  BetaToolResultBlockParam.builder()
                      .toolUseId(block.asToolUse().id())
                      .content("Replace with your tool output.")
                      .build()));
          }
      }
      return results;
  }

  void main() {
      AnthropicClient client = AnthropicOkHttpClient.fromEnv();

      List<BetaToolUnion> tools = List.of(
          BetaToolUnion.ofAdvisorTool20260301(
              BetaAdvisorTool20260301.builder().model(Model.CLAUDE_OPUS_5).build())
          // ... your other tools
      );
      String task = "Build a concurrent worker pool in Go with graceful shutdown.";
      List<BetaMessageParam> messages = new ArrayList<>();
      messages.add(BetaMessageParam.builder()
          .role(BetaMessageParam.Role.USER)
          .content(task)
          .build());
      boolean advisorCalled = false;

      for (int turn = 1; turn <= MAX_TURNS; turn++) {
          BetaMessage response = client.beta().messages().create(MessageCreateParams.builder()
              .model(Model.CLAUDE_HAIKU_4_5)
              .maxTokens(4096L)
              .tools(tools)
              .messages(messages)
              .addBeta("advisor-tool-2026-03-01")
              .build());
          messages.add(BetaMessageParam.builder()
              .role(BetaMessageParam.Role.ASSISTANT)
              .contentOfBetaContentBlockParams(
                  response.content().stream().map(BetaContentBlock::toParam).toList())
              .build());
          advisorCalled = advisorCalled
              || response.content().stream().anyMatch(block ->
                  block.isServerToolUse()
                      && block.asServerToolUse().name().equals(BetaServerToolUseBlock.Name.ADVISOR));
          BetaStopReason stopReason = response.stopReason().orElse(null);
          if (BetaStopReason.END_TURN.equals(stopReason)) {
              break;
          }
          if (BetaStopReason.PAUSE_TURN.equals(stopReason)) {
              continue; // server tool pending; re-send to let the API complete it
          }

          List<BetaContentBlockParam> results = runYourTools(response.content()); // list of tool_result blocks
          if (!results.isEmpty()) {
              messages.add(BetaMessageParam.builder()
                  .role(BetaMessageParam.Role.USER)
                  .contentOfBetaContentBlockParams(results)
                  .build());
          }
          // Skip this if your system prompt already tells the model to call sparingly.
          if (turn == NUDGE_TURN - 1 && !advisorCalled) {
              messages.add(BetaMessageParam.builder()
                  .role(BetaMessageParam.Role.USER)
                  .content(NUDGE_TEXT)
                  .build());
          }
      }
  }
  ```

  ```php PHP
  $client = new Client();

  const NUDGE_TURN = 2; // inject before this assistant turn if no advisor call yet
  const NUDGE_TEXT = "You have not consulted the advisor yet. If the task has a non-obvious "
      . "design decision or a failure mode you haven't ruled out, call advisor "
      . "now before committing to an approach.";
  const MAX_TURNS = 10; // agent loop cap

  // Replace with your tool dispatch. Returns one tool_result block per tool_use block.
  function runYourTools(array $content): array
  {
      $results = [];
      foreach ($content as $block) {
          if ($block->type === 'tool_use') {
              $results[] = [
                  'type' => 'tool_result',
                  'tool_use_id' => $block->id,
                  'content' => 'Replace with your tool output.',
              ];
          }
      }
      return $results;
  }

  $tools = [
      ['type' => 'advisor_20260301', 'name' => 'advisor', 'model' => 'claude-opus-5'],
      // ... your other tools
  ];
  $task = 'Build a concurrent worker pool in Go with graceful shutdown.';
  $messages = [['role' => 'user', 'content' => $task]];
  $advisorCalled = false;

  for ($turn = 1; $turn <= MAX_TURNS; $turn++) {
      $response = $client->beta->messages->create(
          maxTokens: 4096,
          messages: $messages,
          model: 'claude-haiku-4-5',
          tools: $tools,
          betas: ['advisor-tool-2026-03-01'],
      );
      $messages[] = ['role' => 'assistant', 'content' => $response->content];
      foreach ($response->content as $block) {
          if ($block->type === 'server_tool_use' && $block->name === 'advisor') {
              $advisorCalled = true;
          }
      }
      if ($response->stopReason === 'end_turn') {
          break;
      }
      if ($response->stopReason === 'pause_turn') {
          continue; // server tool pending; re-send to let the API complete it
      }

      $results = runYourTools($response->content); // list of tool_result blocks
      if ($results !== []) {
          $messages[] = ['role' => 'user', 'content' => $results];
      }
      // Skip this if your system prompt already tells the model to call sparingly.
      if ($turn === NUDGE_TURN - 1 && !$advisorCalled) {
          $messages[] = ['role' => 'user', 'content' => NUDGE_TEXT];
      }
  }
  ```

  ```ruby Ruby
  client = Anthropic::Client.new

  NUDGE_TURN = 2 # inject before this assistant turn if no advisor call yet
  NUDGE_TEXT =
    "You have not consulted the advisor yet. If the task has a non-obvious " \
    "design decision or a failure mode you haven't ruled out, call advisor " \
    "now before committing to an approach."
  MAX_TURNS = 10 # agent loop cap

  # Replace with your tool dispatch. Returns one tool_result block per tool_use block.
  def run_your_tools(content)
    content.filter_map do |block|
      next unless block.type == :tool_use
      { type: "tool_result", tool_use_id: block.id, content: "Replace with your tool output." }
    end
  end

  tools = [
    { type: "advisor_20260301", name: "advisor", model: "claude-opus-5" }
    # ... your other tools
  ]
  task = "Build a concurrent worker pool in Go with graceful shutdown."
  messages = [{ role: "user", content: task }]
  advisor_called = false

  (1..MAX_TURNS).each do |turn|
    response = client.beta.messages.create(
      model: "claude-haiku-4-5",
      max_tokens: 4096,
      tools: tools,
      messages: messages,
      betas: ["advisor-tool-2026-03-01"]
    )
    messages << { role: "assistant", content: response.content }
    advisor_called ||= response.content.any? do |block|
      block.type == :server_tool_use && block.name == :advisor
    end
    break if response.stop_reason == :end_turn
    next if response.stop_reason == :pause_turn # server tool pending; re-send to let the API complete it

    results = run_your_tools(response.content) # list of tool_result blocks
    messages << { role: "user", content: results } unless results.empty?
    # Skip this if your system prompt already tells the model to call sparingly.
    messages << { role: "user", content: NUDGE_TEXT } if turn == NUDGE_TURN - 1 && !advisor_called
  end
  ```

Append the nudge as its own user message after the tool results rather than as a sibling block in the same message. Consecutive user messages are valid. In Anthropic's testing on Haiku and Sonnet executors they behaved equivalently to a sibling block. The separate-message shape also keeps the reminder clearly distinct from tool output.

**Trade-offs:** The nudge raises the call rate, which can push trivially simple tasks into an unnecessary consult. If your workload mixes simple and complex tasks, consider raising `NUDGE_TURN` to 3 so two-turn tasks complete before the nudge fires, or gate the nudge on a task-complexity signal you already compute. If your system prompt already contains restraint language ("reserve the advisor for genuine uncertainty"), skip the nudge entirely, because the two instructions conflict.

The plain-text nudge is highly salient on Haiku and Sonnet executors: 74 percent (Sonnet) to 98 percent (Haiku) of nudged attempts in Anthropic's testing called the advisor immediately at turn 2. If that lands before your executor has read the problem or gathered context, the resulting advisor call is low-context and can displace a better-timed later call. Measure your executor's baseline first-call turn before adding the nudge. If the executor already calls the advisor reliably and its first call typically lands at turn N, set `NUDGE_TURN` greater than N. In Anthropic's testing, a turn-2 nudge on workloads where the baseline first call was turn 7 or later correlated with a 3 to 4 percentage-point task-performance drop. On a browse workload where the baseline call rate was 86 percent, the same nudge raised engagement with no task-performance cost.

To force a consult on a specific request instead of nudging, set `tool_choice` to `\{"type": "tool", "name": "advisor"\}`, subject to the constraints in [Forcing tool use](https://platform.claude.com/docs/en/agents-and-tools/tool-use/define-tools#forcing-tool-use). Forcing tool use cannot be combined with manual extended thinking (`thinking: \{type: "enabled"\}`): the API returns a `400 invalid_request_error` if you enable both. Adaptive thinking supports forced tool use. Claude Fable 5.1 and Claude Mythos 5.1 executors reject `tool_choice` types `tool` and `any`, so use the prompt nudge on those models instead.
