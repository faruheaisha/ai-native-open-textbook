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
pageSha256: "911d9b6a802b1eebf3bd45634765a8c55f85d3b25f91b953f8b5f65f695aeda7"
contentMode: "local-full"
zh: ""
---

## Toggle the mode with mid-conversation system messages

The agent appends the user's message first, then any system messages that are due: the exit notice, the full mode text on entry, or the periodic refresher. Placing the system message after the user turn keeps every cached byte ahead of it untouched, and satisfies the placement rule that a system message follows a user turn.

  ```bash cURL
  # One orchestration-mode turn: the mode reminder rides in the messages array as a
  # {"role": "system"} entry placed after the user turn it applies to. The response
  # stops at the first tool call. The agent loop that executes tool calls and fans
  # out subagents is shown in the SDK tabs; the Workflow description is condensed
  # here, the SDK examples carry the full standing-consent text.
  curl --fail-with-body -sS https://api.anthropic.com/v1/messages \
    -H "x-api-key: $ANTHROPIC_API_KEY" \
    -H "anthropic-version: 2023-06-01" \
    -H "content-type: application/json" \
    -d @- <<'EOF'
  {
    "model": "claude-opus-5",
    "max_tokens": 64000,
    "system": "You are a helpful general-purpose agent. Answer the user's request directly.",
    "output_config": {"effort": "xhigh"},
    "tools": [
      {
        "name": "Workflow",
        "description": "Orchestrate a multiagent workflow: split a large task into independent subtasks and run them as parallel agents, then collect their results. Opt-in: only use this tool when the user explicitly asks for a workflow, or when a system message confirms that orchestration mode is on. Granularity: scope each subtask to a distinct concern rather than per line or file section; a review of a small module rarely needs more than about ten. Standing consent: while a system message confirms orchestration mode is on, author and run a workflow for every substantive task by default; work solo only on conversational turns or trivial mechanical edits.",
        "input_schema": {
          "type": "object",
          "properties": {
            "subtasks": {
              "type": "array",
              "items": {"type": "string"},
              "description": "Independent subtask prompts to run as parallel agents"
            }
          },
          "required": ["subtasks"]
        }
      },
      {"type": "bash_20250124", "name": "bash"}
    ],
    "messages": [
      {
        "role": "user",
        "content": "Explore the current directory, then give a thorough review: what it does, code-quality issues, and concrete improvements."
      },
      {
        "role": "system",
        "content": "Orchestration mode is on: optimize for the most exhaustive, correct answer rather than the fastest one. Use the Workflow tool on every substantive task, sized to the problem's natural decomposition rather than the maximum the tool allows. See the Workflow tool's description for standing consent, granularity guidance, and quality patterns. Work solo only on conversational or trivial turns."
      }
    ]
  }
  EOF
  ```

  ```bash CLI
  # One orchestration-mode turn: the mode reminder rides in the messages array as a
  # system-role entry placed after the user turn it applies to. The response stops
  # at the first tool call. The agent loop that executes tool calls and fans out
  # subagents is shown in the SDK tabs; the Workflow description is condensed here,
  # the SDK examples carry the full standing-consent text.
  ant messages create <<'YAML'
  model: claude-opus-5
  max_tokens: 64000
  system: You are a helpful general-purpose agent. Answer the user's request directly.
  output_config: {effort: xhigh}
  tools:
    - name: Workflow
      description: >-
        Orchestrate a multiagent workflow: split a large task into independent
        subtasks and run them as parallel agents, then collect their results.
        Opt-in: only use this tool when the user explicitly asks for a workflow,
        or when a system message confirms that orchestration mode is on.
        Granularity: scope each subtask to a distinct concern rather than per
        line or file section; a review of a small module rarely needs more than
        about ten. Standing consent: while a system message confirms
        orchestration mode is on, author and run a workflow for every
        substantive task by default; work solo only on conversational turns or
        trivial mechanical edits.
      input_schema:
        type: object
        properties:
          subtasks:
            type: array
            items: {type: string}
            description: Independent subtask prompts to run as parallel agents
        required: [subtasks]
    - {type: bash_20250124, name: bash}
  messages:
    - role: user
      content: >-
        Explore the current directory, then give a thorough review: what it
        does, code-quality issues, and concrete improvements.
    - role: system
      content: >-
        Orchestration mode is on: optimize for the most exhaustive, correct
        answer rather than the fastest one. Use the Workflow tool on every
        substantive task, sized to the problem's natural decomposition rather
        than the maximum the tool allows. See the Workflow tool's description
        for standing consent, granularity guidance, and quality patterns. Work
        solo only on conversational or trivial turns.
  YAML
  ```

  ```python Python
  class ModeAgent:
      """An agent loop whose orchestration mode is toggled with mid-conversation system messages."""

      def __init__(self, model: str, mode_on: bool = True):
          self.model = model
          self.mode_on = mode_on
          self.messages: list[dict] = []
          self._mode_announced = False
          self._exit_pending = False
          self._turns_since_reminder = 0

      def set_mode(self, mode_on: bool) -> None:
          """Turn the mode on or off. The notice is delivered with the next user turn."""
          if mode_on == self.mode_on:
              return
          if not mode_on:
              if self._mode_announced:
                  self._exit_pending = True
          else:
              self._exit_pending = False
          self.mode_on = mode_on

      def _due_system_messages(self) -> list[dict]:
          """System messages owed on this turn: an exit notice, the full mode text on entry,
          or a one-line refresher every TURNS_BETWEEN_REFRESHERS user turns."""
          due = []
          if self._exit_pending:
              self._exit_pending = False
              self._mode_announced = False
              due.append({"role": "system", "content": MODE_EXIT})
          if self.mode_on:
              if not self._mode_announced:
                  self._mode_announced = True
                  self._turns_since_reminder = 0
                  due.append({"role": "system", "content": MODE_ENTER})
              elif self._turns_since_reminder >= TURNS_BETWEEN_REFRESHERS:
                  self._turns_since_reminder = 0
                  due.append({"role": "system", "content": MODE_REFRESH})
          return due

      def turn(self, user_input: str) -> str:
          # Mid-conversation system messages follow the user turn they apply to, which keeps
          # the cached prefix ahead of them untouched.
          self.messages.append({"role": "user", "content": user_input})
          self.messages.extend(self._due_system_messages())
          self._turns_since_reminder += 1

          for _ in range(MAX_MAIN_TURNS):
              with client.messages.stream(
                  model=self.model,
                  max_tokens=64000,
                  system=SYSTEM_PROMPT,  # static for the whole session
                  output_config={"effort": EFFORT},
                  tools=[WORKFLOW_TOOL, BASH_TOOL],
                  messages=self.messages,
                  timeout=REQUEST_TIMEOUT_SECONDS,
              ) as stream:
                  response = stream.get_final_message()
              self.messages.append({"role": "assistant", "content": response.content})

              if response.stop_reason == "pause_turn":
                  continue
              if response.stop_reason != "tool_use":
                  text = "".join(block.text for block in response.content if block.type == "text")
                  if response.stop_reason == "max_tokens":
                      # Drop the truncated assistant message so later turns don't build on it.
                      self.messages.pop()
                      text += "\n\n(warning: response was truncated at max_tokens)"
                  return text

              tool_results = []
              for block in response.content:
                  if block.type != "tool_use":
                      continue
                  if block.name == "Workflow":
                      output, is_error = run_workflow(self.model, block.input.get("subtasks", []))
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
              self.messages.append({"role": "user", "content": tool_results})
          return "(hit the main loop turn limit before finishing)"
  ```

  ```typescript TypeScript
  // An agent loop whose orchestration mode is toggled with mid-conversation system messages.
  class ModeAgent {
    private readonly model: string;
    private modeOn: boolean;
    private readonly messages: Anthropic.MessageParam[] = [];
    private modeAnnounced = false;
    private exitPending = false;
    private turnsSinceReminder = 0;

    constructor(model: string, modeOn = true) {
      this.model = model;
      this.modeOn = modeOn;
    }

    // Turn the mode on or off. The notice is delivered with the next user turn.
    setMode(modeOn: boolean): void {
      if (modeOn === this.modeOn) {
        return;
      }
      if (!modeOn) {
        if (this.modeAnnounced) {
          this.exitPending = true;
        }
      } else {
        this.exitPending = false;
      }
      this.modeOn = modeOn;
    }

    // System messages owed on this turn: an exit notice, the full mode text on entry,
    // or a one-line refresher every TURNS_BETWEEN_REFRESHERS user turns.
    private dueSystemMessages(): Anthropic.MessageParam[] {
      const due: Array<{ role: "system"; content: string }> = [];
      if (this.exitPending) {
        this.exitPending = false;
        this.modeAnnounced = false;
        due.push({ role: "system", content: MODE_EXIT });
      }
      if (this.modeOn) {
        if (!this.modeAnnounced) {
          this.modeAnnounced = true;
          this.turnsSinceReminder = 0;
          due.push({ role: "system", content: MODE_ENTER });
        } else if (this.turnsSinceReminder >= TURNS_BETWEEN_REFRESHERS) {
          this.turnsSinceReminder = 0;
          due.push({ role: "system", content: MODE_REFRESH });
        }
      }
      // The published SDK types message roles as "user" | "assistant"; typed support for
      // mid-conversation system messages ships with the SDK release that includes them.
      return due as unknown as Anthropic.MessageParam[];
    }

    async turn(userInput: string): Promise<string> {
      // Mid-conversation system messages follow the user turn they apply to, which keeps
      // the cached prefix ahead of them untouched.
      this.messages.push({ role: "user", content: userInput });
      this.messages.push(...this.dueSystemMessages());
      this.turnsSinceReminder += 1;

      for (let turn = 0; turn < MAX_MAIN_TURNS; turn++) {
        const response = await client.messages
          .stream(
            {
              model: this.model,
              max_tokens: 64000,
              system: SYSTEM_PROMPT, // static for the whole session
              output_config: { effort: EFFORT },
              tools: [WORKFLOW_TOOL, BASH_TOOL],
              messages: this.messages,
            },
            { signal: AbortSignal.timeout(REQUEST_TIMEOUT_SECONDS * 1000) },
          )
          .finalMessage();
        this.messages.push({ role: "assistant", content: response.content });

        if (response.stop_reason === "pause_turn") {
          continue;
        }
        if (response.stop_reason !== "tool_use") {
          let text = response.content
            .filter((block): block is Anthropic.TextBlock => block.type === "text")
            .map((block) => block.text)
            .join("");
          if (response.stop_reason === "max_tokens") {
            // Drop the truncated assistant message so later turns do not build on it.
            this.messages.pop();
            text += "\n\n(warning: response was truncated at max_tokens)";
          }
          return text;
        }

        const toolResults: Anthropic.ToolResultBlockParam[] = [];
        for (const block of response.content) {
          if (block.type !== "tool_use") {
            continue;
          }
          let output: string;
          let isError: boolean;
          if (block.name === "Workflow") {
            const input = block.input as { subtasks?: unknown };
            ({ output, isError } = await runWorkflow(this.model, input.subtasks ?? []));
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
        this.messages.push({ role: "user", content: toolResults });
      }
      return "(hit the main loop turn limit before finishing)";
    }
  }
  ```

  ```csharp C#
  // An agent loop whose orchestration mode is toggled with mid-conversation system messages.
  List<MessageParam> messages = [];
  var modeOn = true;
  var modeAnnounced = false;
  var exitPending = false;
  var turnsSinceReminder = 0;

  // Turn the mode on or off. The notice is delivered with the next user turn.
  void SetMode(bool nextModeOn)
  {
      if (nextModeOn == modeOn)
      {
          return;
      }
      if (!nextModeOn)
      {
          if (modeAnnounced)
          {
              exitPending = true;
          }
      }
      else
      {
          exitPending = false;
      }
      modeOn = nextModeOn;
  }

  // The Role property is an open enum, so the mid-conversation "system" role can be assigned
  // as a raw string; a dedicated constant ships with the SDK release.
  MessageParam SystemMessage(string content) => new() { Role = "system", Content = content };

  // System messages owed on this turn: an exit notice, the full mode text on entry,
  // or a one-line refresher every turnsBetweenRefreshers user turns.
  List<MessageParam> DueSystemMessages()
  {
      List<MessageParam> due = [];
      if (exitPending)
      {
          exitPending = false;
          modeAnnounced = false;
          due.Add(SystemMessage(modeExit));
      }
      if (modeOn)
      {
          if (!modeAnnounced)
          {
              modeAnnounced = true;
              turnsSinceReminder = 0;
              due.Add(SystemMessage(modeEnter));
          }
          else if (turnsSinceReminder >= turnsBetweenRefreshers)
          {
              turnsSinceReminder = 0;
              due.Add(SystemMessage(modeRefresh));
          }
      }
      return due;
  }

  // Send one user turn through the loop, executing tool calls until the model stops.
  async Task<string> Turn(string userInput)
  {
      // Mid-conversation system messages follow the user turn they apply to, which keeps
      // the cached prefix ahead of them untouched.
      messages.Add(new() { Role = Role.User, Content = userInput });
      messages.AddRange(DueSystemMessages());
      turnsSinceReminder++;

      for (var turn = 0; turn < maxMainTurns; turn++)
      {
          using var deadline = new CancellationTokenSource(TimeSpan.FromSeconds(requestTimeoutSeconds));
          var response = await client.Messages.Create(new MessageCreateParams
          {
              Model = model,
              MaxTokens = requestMaxTokens,
              System = systemPrompt, // static for the whole session
              OutputConfig = new OutputConfig { Effort = effort },
              Tools = [workflowTool, bashTool],
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
                  // Drop the truncated assistant message so the next turn does not build on it.
                  messages.RemoveAt(messages.Count - 1);
                  text += "\n\n(warning: response was truncated at max_tokens)";
              }
              return text;
          }

          List<ContentBlockParam> toolResults = [];
          foreach (var block in response.Content)
          {
              if (!block.TryPickToolUse(out var toolUse))
              {
                  continue;
              }
              string output;
              bool isError;
              if (toolUse.Name == "Workflow")
              {
                  toolUse.Input.TryGetValue("subtasks", out var rawSubtasks);
                  (output, isError) = await RunWorkflow(rawSubtasks);
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
          messages.Add(new() { Role = Role.User, Content = toolResults });
      }
      return "(hit the main loop turn limit before finishing)";
  }
  ```

  ```go Go
  // modeAgent is an agent loop whose orchestration mode is toggled with mid-conversation
  // system messages.
  type modeAgent struct {
  	model              string
  	modeOn             bool
  	messages           []anthropic.MessageParam
  	modeAnnounced      bool
  	exitPending        bool
  	turnsSinceReminder int
  }

  func newModeAgent(model string) *modeAgent {
  	return &modeAgent{model: model, modeOn: true}
  }

  // setMode turns the mode on or off. The notice is delivered with the next user turn.
  func (agent *modeAgent) setMode(modeOn bool) {
  	if modeOn == agent.modeOn {
  		return
  	}
  	if !modeOn {
  		if agent.modeAnnounced {
  			agent.exitPending = true
  		}
  	} else {
  		agent.exitPending = false
  	}
  	agent.modeOn = modeOn
  }

  // dueSystemMessages returns the system messages owed on this turn: an exit notice, the
  // full mode text on entry, or a one-line refresher every turnsBetweenRefreshers user turns.
  func (agent *modeAgent) dueSystemMessages() []anthropic.MessageParam {
  	// MessageParamRole is an open string type, so the mid-conversation "system" role can
  	// be expressed directly; a dedicated constant ships with the SDK release.
  	systemMessage := func(content string) anthropic.MessageParam {
  		return anthropic.MessageParam{
  			Role:    anthropic.MessageParamRole("system"),
  			Content: []anthropic.ContentBlockParamUnion{anthropic.NewTextBlock(content)},
  		}
  	}
  	var due []anthropic.MessageParam
  	if agent.exitPending {
  		agent.exitPending = false
  		agent.modeAnnounced = false
  		due = append(due, systemMessage(modeExit))
  	}
  	if agent.modeOn {
  		if !agent.modeAnnounced {
  			agent.modeAnnounced = true
  			agent.turnsSinceReminder = 0
  			due = append(due, systemMessage(modeEnter))
  		} else if agent.turnsSinceReminder >= turnsBetweenRefreshers {
  			agent.turnsSinceReminder = 0
  			due = append(due, systemMessage(modeRefresh))
  		}
  	}
  	return due
  }

  // turn sends one user turn through the loop, executing tool calls until the model stops.
  func (agent *modeAgent) turn(ctx context.Context, userInput string) (string, error) {
  	// Mid-conversation system messages follow the user turn they apply to, which keeps
  	// the cached prefix ahead of them untouched.
  	agent.messages = append(agent.messages, anthropic.NewUserMessage(anthropic.NewTextBlock(userInput)))
  	agent.messages = append(agent.messages, agent.dueSystemMessages()...)
  	agent.turnsSinceReminder++

  	for range maxMainTurns {
  		var response anthropic.Message
  		err := func() error {
  			ctx, cancel := context.WithTimeout(ctx, requestTimeoutSeconds*time.Second)
  			defer cancel()
  			stream := client.Messages.NewStreaming(ctx, anthropic.MessageNewParams{
  				Model:        agent.model,
  				MaxTokens:    64000,
  				System:       []anthropic.TextBlockParam{{Text: systemPrompt}}, // static for the whole session
  				OutputConfig: anthropic.OutputConfigParam{Effort: effort},
  				Tools:        []anthropic.ToolUnionParam{workflowTool, bashTool},
  				Messages:     agent.messages,
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
  		agent.messages = append(agent.messages, response.ToParam())

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
  				// Drop the truncated assistant message rather than leave a clipped turn in history.
  				agent.messages = agent.messages[:len(agent.messages)-1]
  				text.WriteString("\n\n(warning: response was truncated at max_tokens)")
  			}
  			return text.String(), nil
  		}

  		var toolResults []anthropic.ContentBlockParamUnion
  		for _, block := range response.Content {
  			toolUse, ok := block.AsAny().(anthropic.ToolUseBlock)
  			if !ok {
  				continue
  			}
  			var output string
  			var isError bool
  			switch toolUse.Name {
  			case "Workflow":
  				var input struct {
  					Subtasks json.RawMessage `json:"subtasks"`
  				}
  				if err := json.Unmarshal(toolUse.Input, &input); err != nil {
  					output, isError = fmt.Sprintf("Workflow error: could not parse input: %s", err), true
  				} else {
  					output, isError = runWorkflow(ctx, agent.model, input.Subtasks)
  				}
  			case "bash":
  				output, isError = handleBashBlock(ctx, toolUse)
  			default:
  				output, isError = fmt.Sprintf("unknown tool: %s", toolUse.Name), true
  			}
  			toolResults = append(toolResults, anthropic.NewToolResultBlock(toolUse.ID, output, isError))
  		}
  		agent.messages = append(agent.messages, anthropic.NewUserMessage(toolResults...))
  	}
  	return "(hit the main loop turn limit before finishing)", nil
  }

  ```

  ```java Java
  // An agent loop whose orchestration mode is toggled with mid-conversation system messages.
  class ModeAgent {
      private final Model model;
      private boolean modeOn;
      private final List<MessageParam> messages = new ArrayList<>();
      private boolean modeAnnounced = false;
      private boolean exitPending = false;
      private int turnsSinceReminder = 0;

      ModeAgent(Model model) {
          this(model, true);
      }

      ModeAgent(Model model, boolean modeOn) {
          this.model = model;
          this.modeOn = modeOn;
      }

      // Turn the mode on or off. The notice is delivered with the next user turn.
      void setMode(boolean modeOn) {
          if (modeOn == this.modeOn) {
              return;
          }
          if (!modeOn) {
              if (modeAnnounced) {
                  exitPending = true;
              }
          } else {
              exitPending = false;
          }
          this.modeOn = modeOn;
      }

      // System messages owed on this turn: an exit notice, the full mode text on entry,
      // or a one-line refresher every TURNS_BETWEEN_REFRESHERS user turns.
      private List<MessageParam> dueSystemMessages() {
          List<MessageParam> due = new ArrayList<>();
          if (exitPending) {
              exitPending = false;
              modeAnnounced = false;
              due.add(systemMessage(MODE_EXIT));
          }
          if (modeOn) {
              if (!modeAnnounced) {
                  modeAnnounced = true;
                  turnsSinceReminder = 0;
                  due.add(systemMessage(MODE_ENTER));
              } else if (turnsSinceReminder >= TURNS_BETWEEN_REFRESHERS) {
                  turnsSinceReminder = 0;
                  due.add(systemMessage(MODE_REFRESH));
              }
          }
          return due;
      }

      // MessageParam.Role is an open enum, so the mid-conversation "system" role can be
      // expressed with Role.of; a dedicated constant ships with the SDK release.
      private MessageParam systemMessage(String content) {
          return MessageParam.builder()
                  .role(MessageParam.Role.of("system"))
                  .content(content)
                  .build();
      }

      // Send one user turn through the loop, executing tool calls until the model stops.
      String turn(String userInput) throws InterruptedException {
          // Mid-conversation system messages follow the user turn they apply to, which keeps
          // the cached prefix ahead of them untouched.
          messages.add(MessageParam.builder().role(MessageParam.Role.USER).content(userInput).build());
          messages.addAll(dueSystemMessages());
          turnsSinceReminder++;

          for (int turn = 0; turn < MAX_MAIN_TURNS; turn++) {
              MessageCreateParams params = MessageCreateParams.builder()
                      .model(model)
                      .maxTokens(64000L)
                      .system(SYSTEM_PROMPT) // static for the whole session
                      .outputConfig(OutputConfig.builder().effort(EFFORT).build())
                      .addTool(WORKFLOW_TOOL)
                      .addTool(BASH_TOOL)
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
                      // Drop the truncated assistant message so it does not poison later turns.
                      messages.removeLast();
                      text += "\n\n(warning: response was truncated at max_tokens)";
                  }
                  return text;
              }

              List<ContentBlockParam> toolResults = new ArrayList<>();
              for (ContentBlock block : response.content()) {
                  if (block.toolUse().isEmpty()) {
                      continue;
                  }
                  ToolUseBlock toolUse = block.toolUse().get();
                  ToolOutput result = switch (toolUse.name()) {
                      case "Workflow" -> {
                          Map<String, JsonValue> input =
                                  (Map<String, JsonValue>) toolUse._input().asObject().orElse(Map.of());
                          JsonValue rawSubtasks = input.getOrDefault("subtasks", JsonValue.from(List.of()));
                          yield runWorkflow(model, rawSubtasks);
                      }
                      case "bash" -> handleBashBlock(toolUse);
                      default -> new ToolOutput("unknown tool: " + toolUse.name(), true);
                  };
                  toolResults.add(ContentBlockParam.ofToolResult(ToolResultBlockParam.builder()
                          .toolUseId(toolUse.id())
                          .content(result.output())
                          .isError(result.isError())
                          .build()));
              }
              messages.add(MessageParam.builder()
                      .role(MessageParam.Role.USER)
                      .contentOfBlockParams(toolResults)
                      .build());
          }
          return "(hit the main loop turn limit before finishing)";
      }
  }
  ```

  ```php PHP
  /** An agent loop whose orchestration mode is toggled with mid-conversation system messages. */
  class ModeAgent
  {
      private array $messages = [];
      private bool $modeAnnounced = false;
      private bool $exitPending = false;
      private int $turnsSinceReminder = 0;

      public function __construct(
          private readonly Client $client,
          private readonly string $model,
          private bool $modeOn = true,
      ) {
      }

      /** Turn the mode on or off. The notice is delivered with the next user turn. */
      public function setMode(bool $modeOn): void
      {
          if ($modeOn === $this->modeOn) {
              return;
          }
          if ($modeOn) {
              $this->exitPending = false;
          } elseif ($this->modeAnnounced) {
              $this->exitPending = true;
          }
          $this->modeOn = $modeOn;
      }

      public function turn(string $userInput): string
      {
          // Mid-conversation system messages follow the user turn they apply to, which keeps
          // the cached prefix ahead of them untouched.
          $this->messages[] = ['role' => 'user', 'content' => $userInput];
          array_push($this->messages, ...$this->dueSystemMessages());
          $this->turnsSinceReminder++;

          for ($turn = 0; $turn < MAX_MAIN_TURNS; $turn++) {
              $stream = $this->client->messages->createStream(
                  model: $this->model,
                  maxTokens: 64000,
                  system: SYSTEM_PROMPT, // static for the whole session
                  outputConfig: ['effort' => EFFORT],
                  tools: [WORKFLOW_TOOL, BASH_TOOL],
                  messages: $this->messages,
                  requestOptions: ['timeout' => REQUEST_TIMEOUT_SECONDS],
              );
              [$content, $stopReason] = drainMessageStream($stream);
              $this->messages[] = ['role' => 'assistant', 'content' => $content];

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
                      // Drop the truncated assistant message so the next turn does not build on it.
                      array_pop($this->messages);
                      $text .= "\n\n(warning: response was truncated at max_tokens)";
                  }
                  return $text;
              }

              $toolResults = [];
              foreach ($content as $block) {
                  if (!$block instanceof ToolUseBlock) {
                      continue;
                  }
                  if ($block->name === 'Workflow') {
                      [$output, $isError] =
                          runWorkflow($this->client, $this->model, $block->input['subtasks'] ?? []);
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
              $this->messages[] = ['role' => 'user', 'content' => $toolResults];
          }
          return '(hit the main loop turn limit before finishing)';
      }

      /**
       * System messages owed on this turn: an exit notice, the full mode text on entry,
       * or a one-line refresher every TURNS_BETWEEN_REFRESHERS user turns.
       */
      private function dueSystemMessages(): array
      {
          $due = [];
          if ($this->exitPending) {
              $this->exitPending = false;
              $this->modeAnnounced = false;
              $due[] = ['role' => 'system', 'content' => MODE_EXIT];
          }
          if ($this->modeOn) {
              if (!$this->modeAnnounced) {
                  $this->modeAnnounced = true;
                  $this->turnsSinceReminder = 0;
                  $due[] = ['role' => 'system', 'content' => MODE_ENTER];
              } elseif ($this->turnsSinceReminder >= TURNS_BETWEEN_REFRESHERS) {
                  $this->turnsSinceReminder = 0;
                  $due[] = ['role' => 'system', 'content' => MODE_REFRESH];
              }
          }
          return $due;
      }
  }
  ```

  ```ruby Ruby
  # An agent loop whose orchestration mode is toggled with mid-conversation system messages.
  class ModeAgent
    def initialize(model, mode_on: true)
      @model = model
      @mode_on = mode_on
      @messages = []
      @mode_announced = false
      @exit_pending = false
      @turns_since_reminder = 0
    end

    # Turn the mode on or off. The notice is delivered with the next user turn.
    def set_mode(mode_on)
      return if mode_on == @mode_on

      if mode_on
        @exit_pending = false
      else
        @exit_pending = true if @mode_announced
      end
      @mode_on = mode_on
    end

    def turn(user_input)
      # Mid-conversation system messages follow the user turn they apply to, which keeps
      # the cached prefix ahead of them untouched.
      @messages << {role: "user", content: user_input}
      @messages.concat(due_system_messages)
      @turns_since_reminder += 1

      MAX_MAIN_TURNS.times do
        stream = CLIENT.messages.stream(
          model: @model,
          max_tokens: 64_000,
          system_: SYSTEM_PROMPT, # static for the whole session
          output_config: {effort: EFFORT},
          tools: [WORKFLOW_TOOL, BASH_TOOL],
          messages: @messages,
          request_options: {timeout: REQUEST_TIMEOUT_SECONDS}
        )
        response = stream.accumulated_message
        @messages << {role: "assistant", content: assistant_content_param(response.content)}

        next if response.stop_reason == :pause_turn

        unless response.stop_reason == :tool_use
          text = response.content.select { |block| block.type == :text }.map(&:text).join
          if response.stop_reason == :max_tokens
            @messages.pop # drop the truncated assistant message from the history
            text += "\n\n(warning: response was truncated at max_tokens)"
          end
          return text
        end

        tool_results = []
        response.content.each do |block|
          next unless block.type == :tool_use

          input = parse_tool_input(block.input)
          case block.name
          when "Workflow"
            output, is_error = run_workflow(@model, input["subtasks"] || [])
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
        @messages << {role: "user", content: tool_results}
      end
      "(hit the main loop turn limit before finishing)"
    end

    private

    # System messages owed on this turn: an exit notice, the full mode text on entry,
    # or a one-line refresher every TURNS_BETWEEN_REFRESHERS user turns.
    def due_system_messages
      due = []
      if @exit_pending
        @exit_pending = false
        @mode_announced = false
        due << {role: "system", content: MODE_EXIT}
      end
      if @mode_on
        if !@mode_announced
          @mode_announced = true
          @turns_since_reminder = 0
          due << {role: "system", content: MODE_ENTER}
        elsif @turns_since_reminder >= TURNS_BETWEEN_REFRESHERS
          @turns_since_reminder = 0
          due << {role: "system", content: MODE_REFRESH}
        end
      end
      due
    end
  end
  ```
