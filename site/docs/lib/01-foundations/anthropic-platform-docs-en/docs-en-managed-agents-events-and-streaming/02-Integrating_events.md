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
sourceRel: "docs/en/managed-agents/events-and-streaming.md"
rawUrl: "/raw/01-foundations/anthropic-platform-docs-en/docs/en/managed-agents/events-and-streaming.md"
sourceSha256: "b681673ea44583d365ff7c008a149752bfe4251979591e4b054076f37e5ece85"
pageSha256: "439f61d228b06daaaec08149ca9b37c05ee50cfddc072684dbfbc9ec9d58b75d"
contentMode: "local-full"
zh: ""
---

## Integrating events

    Send a `user.message` event to start or continue the agent's work:

      ```bash cURL
      curl --fail-with-body -sS "https://api.anthropic.com/v1/sessions/$SESSION_ID/events?beta=true" \
        -H "x-api-key: $ANTHROPIC_API_KEY" \
        -H "anthropic-version: 2023-06-01" \
        -H "anthropic-beta: managed-agents-2026-04-01" \
        -H "content-type: application/json" \
        -d @- <<'EOF'
      \{
        "events": [
          \{
            "type": "user.message",
            "content": [
              \{"type": "text", "text": "Analyze the performance of the sort function in utils.py"\}
            ]
          \}
        ]
      \}
      EOF
      ```

      ```bash CLI
      ant beta:sessions:events send --session-id "$SESSION_ID" <<'YAML'
      events:
        - type: user.message
          content:
            - type: text
              text: Analyze the performance of the sort function in utils.py
      YAML
      ```

      ```python Python
      client.beta.sessions.events.send(
          session.id,
          events=[
              {
                  "type": "user.message",
                  "content": [
                      {
                          "type": "text",
                          "text": "Analyze the performance of the sort function in utils.py",
                      },
                  ],
              },
          ],
      )
      ```

      ```typescript TypeScript
      await client.beta.sessions.events.send(session.id, {
        events: [
          {
            type: "user.message",
            content: [
              {
                type: "text",
                text: "Analyze the performance of the sort function in utils.py",
              },
            ],
          },
        ],
      });
      ```

      ```csharp C#
      await client.Beta.Sessions.Events.Send(session.ID, new()
      {
          Events =
          [
              new BetaManagedAgentsUserMessageEventParams
              {
                  Type = BetaManagedAgentsUserMessageEventParamsType.UserMessage,
                  Content =
                  [
                      new BetaManagedAgentsTextBlock
                      {
                          Type = BetaManagedAgentsTextBlockType.Text,
                          Text = "Analyze the performance of the sort function in utils.py",
                      },
                  ],
              },
          ],
      });
      ```

      ```go Go
      if _, err := client.Beta.Sessions.Events.Send(ctx, session.ID, anthropic.BetaSessionEventSendParams{
      	Events: []anthropic.BetaManagedAgentsEventParamsUnion&#123;&#123;
      		OfUserMessage: &anthropic.BetaManagedAgentsUserMessageEventParams{
      			Type: anthropic.BetaManagedAgentsUserMessageEventParamsTypeUserMessage,
      			Content: []anthropic.BetaManagedAgentsUserMessageEventParamsContentUnion&#123;&#123;
      				OfText: &anthropic.BetaManagedAgentsTextBlockParam{
      					Type: anthropic.BetaManagedAgentsTextBlockTypeText,
      					Text: "Analyze the performance of the sort function in utils.py",
      				},
      			}},
      		},
      	}},
      }); err != nil {
      	panic(err)
      }
      ```

      ```java Java
      client.beta().sessions().events().send(
          session.id(),
          EventSendParams.builder()
              .addEvent(BetaManagedAgentsUserMessageEventParams.builder()
                  .type(BetaManagedAgentsUserMessageEventParams.Type.USER_MESSAGE)
                  .addTextContent("Analyze the performance of the sort function in utils.py")
                  .build())
              .build());
      ```

      ```php PHP
      $client->beta->sessions->events->send(
          $session->id,
          events: [
              [
                  'type' => 'user.message',
                  'content' => [
                      [
                          'type' => 'text',
                          'text' => 'Analyze the performance of the sort function in utils.py',
                      ],
                  ],
              ],
          ],
      );
      ```

      ```ruby Ruby
      client.beta.sessions.events.send_(
        session.id,
        events: [
          {
            type: "user.message",
            content: [
              {
                type: "text",
                text: "Analyze the performance of the sort function in utils.py"
              }
            ]
          }
        ]
      )
      ```

    Send a `user.interrupt` event to stop the agent mid-execution, then follow up with a `user.message` event to redirect it:

      ```bash cURL
      # Agent is currently analyzing a file...
      # Interrupt with a new direction:
      curl --fail-with-body -sS "https://api.anthropic.com/v1/sessions/$SESSION_ID/events?beta=true" \
        -H "x-api-key: $ANTHROPIC_API_KEY" \
        -H "anthropic-version: 2023-06-01" \
        -H "anthropic-beta: managed-agents-2026-04-01" \
        -H "content-type: application/json" \
        -d @- <<'EOF'
      {
        "events": [
          {"type": "user.interrupt"},
          {
            "type": "user.message",
            "content": [
              {"type": "text", "text": "Instead, focus on fixing the bug in line 42."}
            ]
          }
        ]
      }
      EOF
      ```

      ```bash CLI
      # Agent is currently analyzing a file...
      # Interrupt with a new direction:
      ant beta:sessions:events send --session-id "$SESSION_ID" <<'YAML'
      events:
        - type: user.interrupt
        - type: user.message
          content:
            - type: text
              text: Instead, focus on fixing the bug in line 42.
      YAML
      ```

      ```python Python
      # Agent is currently analyzing a file...
      # Interrupt with a new direction:
      client.beta.sessions.events.send(
          session.id,
          events=[
              \{"type": "user.interrupt"\},
              \{
                  "type": "user.message",
                  "content": [
                      \{
                          "type": "text",
                          "text": "Instead, focus on fixing the bug in line 42.",
                      \},
                  ],
              \},
          ],
      )
      ```

      ```typescript TypeScript
      // Agent is currently analyzing a file...
      // Interrupt with a new direction:
      await client.beta.sessions.events.send(session.id, \{
        events: [
          \{ type: "user.interrupt" \},
          \{
            type: "user.message",
            content: [
              \{
                type: "text",
                text: "Instead, focus on fixing the bug in line 42.",
              \},
            ],
          \},
        ],
      \});
      ```

      ```csharp C#
      // Agent is currently analyzing a file...
      // Interrupt with a new direction:
      await client.Beta.Sessions.Events.Send(session.ID, new()
      \{
          Events =
          [
              new BetaManagedAgentsUserInterruptEventParams
              \{
                  Type = BetaManagedAgentsUserInterruptEventParamsType.UserInterrupt,
              \},
              new BetaManagedAgentsUserMessageEventParams
              \{
                  Type = BetaManagedAgentsUserMessageEventParamsType.UserMessage,
                  Content =
                  [
                      new BetaManagedAgentsTextBlock
                      \{
                          Type = BetaManagedAgentsTextBlockType.Text,
                          Text = "Instead, focus on fixing the bug in line 42.",
                      \},
                  ],
              \},
          ],
      \});
      ```

      ```go Go
      // Agent is currently analyzing a file...
      // Interrupt with a new direction:
      if _, err := client.Beta.Sessions.Events.Send(ctx, session.ID, anthropic.BetaSessionEventSendParams\{
      	Events: []anthropic.BetaManagedAgentsEventParamsUnion\{
      		\{
      			OfUserInterrupt: &anthropic.BetaManagedAgentsUserInterruptEventParams\{
      				Type: anthropic.BetaManagedAgentsUserInterruptEventParamsTypeUserInterrupt,
      			\},
      		\},
      		\{
      			OfUserMessage: &anthropic.BetaManagedAgentsUserMessageEventParams\{
      				Type: anthropic.BetaManagedAgentsUserMessageEventParamsTypeUserMessage,
      				Content: []anthropic.BetaManagedAgentsUserMessageEventParamsContentUnion&#123;&#123;
      					OfText: &anthropic.BetaManagedAgentsTextBlockParam\{
      						Type: anthropic.BetaManagedAgentsTextBlockTypeText,
      						Text: "Instead, focus on fixing the bug in line 42.",
      					\},
      				&#125;&#125;,
      			\},
      		\},
      	\},
      \}); err != nil \{
      	panic(err)
      \}
      ```

      ```java Java
      // Agent is currently analyzing a file...
      // Interrupt with a new direction:
      client.beta().sessions().events().send(
          session.id(),
          EventSendParams.builder()
              .addEvent(BetaManagedAgentsUserInterruptEventParams.builder()
                  .type(BetaManagedAgentsUserInterruptEventParams.Type.USER_INTERRUPT)
                  .build())
              .addEvent(BetaManagedAgentsUserMessageEventParams.builder()
                  .type(BetaManagedAgentsUserMessageEventParams.Type.USER_MESSAGE)
                  .addTextContent("Instead, focus on fixing the bug in line 42.")
                  .build())
              .build());
      ```

      ```php PHP
      // Agent is currently analyzing a file...
      // Interrupt with a new direction:
      $client->beta->sessions->events->send(
          $session->id,
          events: [
              ['type' => 'user.interrupt'],
              [
                  'type' => 'user.message',
                  'content' => [
                      [
                          'type' => 'text',
                          'text' => 'Instead, focus on fixing the bug in line 42.',
                      ],
                  ],
              ],
          ],
      );
      ```

      ```ruby Ruby
      # Agent is currently analyzing a file...
      # Interrupt with a new direction:
      client.beta.sessions.events.send_(
        session.id,
        events: [
          \{type: "user.interrupt"\},
          \{
            type: "user.message",
            content: [
              \{type: "text", text: "Instead, focus on fixing the bug in line 42."\}
            ]
          \}
        ]
      )
      ```

    The call returns as soon as the events are queued, and the interrupt's `processed_at` stays null until the agent applies it. A model response in progress stops immediately. The interrupt can take longer to apply while tool calls are running, and the session stays `running` until it does. The `user.interrupt` event then appears on the stream, and the interrupted turn ends with a `session.status_idle` event. Its `stop_reason` is `end_turn`, the same value as a turn that finishes on its own; there is no stop reason specific to interruption. The agent starts its next turn with the `user.message` you sent after the interrupt.

    Stream events from the session to receive real-time updates as the agent works. Only events emitted after the stream is opened are delivered, so open the stream before sending events to avoid a race condition.

      ```bash cURL
      # Open the stream first, then send the user message
      exec \{stream\}< <(
        curl --fail-with-body -sS -N \
          "https://api.anthropic.com/v1/sessions/$SESSION_ID/events/stream?beta=true" \
          -H "x-api-key: $ANTHROPIC_API_KEY" \
          -H "anthropic-version: 2023-06-01" \
          -H "anthropic-beta: managed-agents-2026-04-01" \
          -H "content-type: application/json" \
          -H "accept: text/event-stream"
      )

      curl --fail-with-body -sS \
        "https://api.anthropic.com/v1/sessions/$SESSION_ID/events?beta=true" \
        -H "x-api-key: $ANTHROPIC_API_KEY" \
        -H "anthropic-version: 2023-06-01" \
        -H "anthropic-beta: managed-agents-2026-04-01" \
        -H "content-type: application/json" \
        -d @- >/dev/null <<'EOF'
      \{
        "events": [
          \{
            "type": "user.message",
            "content": [\{"type": "text", "text": "Summarize the repo README"\}]
          \}
        ]
      \}
      EOF

      while IFS= read -r -u "$stream" event_line; do
        [[ $event_line == data:* ]] || continue
        event_json=${event_line#data: }
        case $(jq -r '.type' <<<"$event_json") in
          agent.message)
            jq -j '.content[] | select(.type == "text") | .text' <<<"$event_json"
            ;;
          session.status_idle)
            break
            ;;
          session.error)
            printf '\n[Error: %s]\n' "$(jq -r '.error.message // "unknown"' <<<"$event_json")"
            break
            ;;
        esac
      done
      exec \{stream\}<&-
      ```

      ```bash CLI
      # This workflow does not translate well to a one-off shell command.
      # Use one of the SDK examples in this code group instead.
      ```

      ```python Python
      # Open the stream first, then send the user message
      with client.beta.sessions.events.stream(session.id) as stream:
          client.beta.sessions.events.send(
              session.id,
              events=[
                  \{
                      "type": "user.message",
                      "content": [\{"type": "text", "text": "Summarize the repo README"\}],
                  \},
              ],
          )

          for event in stream:
              match event.type:
                  case "agent.message":
                      for block in event.content:
                          if block.type == "text":
                              print(block.text, end="")
                  case "session.status_idle":
                      break
                  case "session.error":
                      error_message = event.error.message if event.error else "unknown"
                      print(f"\n[Error: \{error_message\}]")
                      break
      ```

      ```typescript TypeScript
      // Open the stream first, then send the user message
      const stream = await client.beta.sessions.events.stream(session.id);
      await client.beta.sessions.events.send(session.id, \{
        events: [
          \{
            type: "user.message",
            content: [\{ type: "text", text: "Summarize the repo README" \}]
          \}
        ]
      \});

      for await (const event of stream) \{
        if (event.type === "agent.message") \{
          for (const block of event.content) \{
            if (block.type === "text") \{
              process.stdout.write(block.text);
            \}
          \}
        \} else if (event.type === "session.status_idle") \{
          break;
        \} else if (event.type === "session.error") \{
          console.log(`\n[Error: ${event.error?.message ?? "unknown"}]`);
          break;
        }
      }
      ```

      ```csharp C#
      // Open the stream first, then send the user message
      using var stream = await client.Beta.Sessions.Events.WithRawResponse.StreamStreaming(session.ID);
      await client.Beta.Sessions.Events.Send(session.ID, new()
      {
          Events =
          [
              new BetaManagedAgentsUserMessageEventParams
              {
                  Type = BetaManagedAgentsUserMessageEventParamsType.UserMessage,
                  Content =
                  [
                      new BetaManagedAgentsTextBlock
                      {
                          Type = BetaManagedAgentsTextBlockType.Text,
                          Text = "Summarize the repo README",
                      },
                  ],
              },
          ],
      });

      await foreach (var streamEvent in stream.Enumerate())
      {
          if (streamEvent.Value is BetaManagedAgentsAgentMessageEvent message)
          {
              foreach (var block in message.Content)
              {
                  if (block.Value is BetaManagedAgentsTextBlock textBlock)
                  {
                      Console.Write(textBlock.Text);
                  }
              }
          }
          else if (streamEvent.Value is BetaManagedAgentsSessionStatusIdleEvent)
          {
              break;
          }
          else if (streamEvent.Value is BetaManagedAgentsSessionErrorEvent error)
          {
              Console.WriteLine($"\n[Error: \{error.Error?.Message ?? "unknown"\}]");
              break;
          \}
      \}
      ```

      ```go Go
      	// Open the stream first, then send the user message
      	stream := client.Beta.Sessions.Events.StreamEvents(ctx, session.ID, anthropic.BetaSessionEventStreamParams\{\})
      	defer stream.Close()

      	if _, err := client.Beta.Sessions.Events.Send(ctx, session.ID, anthropic.BetaSessionEventSendParams\{
      		Events: []anthropic.BetaManagedAgentsEventParamsUnion&#123;&#123;
      			OfUserMessage: &anthropic.BetaManagedAgentsUserMessageEventParams\{
      				Type: anthropic.BetaManagedAgentsUserMessageEventParamsTypeUserMessage,
      				Content: []anthropic.BetaManagedAgentsUserMessageEventParamsContentUnion&#123;&#123;
      					OfText: &anthropic.BetaManagedAgentsTextBlockParam\{
      						Type: anthropic.BetaManagedAgentsTextBlockTypeText,
      						Text: "Summarize the repo README",
      					\},
      				&#125;&#125;,
      			\},
      		&#125;&#125;,
      	\}); err != nil \{
      		panic(err)
      	\}

      events:
      	for stream.Next() \{
      		switch event := stream.Current().AsAny().(type) \{
      		case anthropic.BetaManagedAgentsAgentMessageEvent:
      			// concrete-typed list: BetaManagedAgentsTextBlock
      			for _, block := range event.Content \{
      				fmt.Print(block.Text)
      			\}
      		case anthropic.BetaManagedAgentsSessionStatusIdleEvent:
      			break events
      		case anthropic.BetaManagedAgentsSessionErrorEvent:
      			fmt.Printf("\n[Error: %s]\n", cmp.Or(event.Error.Message, "unknown"))
      			break events
      		\}
      	\}
      	if err := stream.Err(); err != nil \{
      		panic(err)
      	\}
      ```

      ```java Java
      // Open the stream first, then send the user message
      try (var stream = client.beta().sessions().events().streamStreaming(session.id())) \{
          client.beta().sessions().events().send(
              session.id(),
              EventSendParams.builder()
                  .addEvent(BetaManagedAgentsUserMessageEventParams.builder()
                      .type(BetaManagedAgentsUserMessageEventParams.Type.USER_MESSAGE)
                      .addTextContent("Summarize the repo README")
                      .build())
                  .build()
          );

          Iterable&lt;BetaManagedAgentsStreamSessionEvents> events = stream.stream()::iterator;
          for (var event : events) \{
              if (event.isAgentMessage()) \{
                  event.asAgentMessage().content().forEach(block -> block.text().ifPresent(textBlock -> IO.print(textBlock.text())));
              \} else if (event.isSessionStatusIdle()) \{
                  break;
              \} else if (event.isSessionError()) \{
                  // The `message` field spans all error variants; read it from the raw JSON.
                  var errorMessage =
                      event.asSessionError().error()._json().orElse(null) instanceof JsonObject json
                          ? json.values().get("message").asStringOrThrow()
                          : "unknown";
                  IO.println("\n[Error: " + errorMessage + "]");
                  break;
              \}
          \}
      \}
      ```

      ```php PHP
      // Open the stream first, then send the user message
      $stream = $client->beta->sessions->events->streamStream($session->id);
      $client->beta->sessions->events->send(
          $session->id,
          events: [
              [
                  'type' => 'user.message',
                  'content' => [['type' => 'text', 'text' => 'Summarize the repo README']],
              ],
          ],
      );

      foreach ($stream as $event) {
          match ($event->type) \{
              'agent.message' => array_walk(
                  $event->content,
                  static fn ($block) => $block->type === 'text' ? print($block->text) : null,
              ),
              'session.error' => printf("\n[Error: %s]", $event->error?->message ?? 'unknown'),
              default => null,
          };
          if ($event->type === 'session.status_idle' || $event->type === 'session.error') {
              break;
          }
      }
      $stream->close();
      ```

      ```ruby Ruby
      # Open the stream first, then send the user message
      stream = client.beta.sessions.events.stream_events(session.id)

      client.beta.sessions.events.send_(
        session.id,
        events: [\{
          type: "user.message",
          content: [\{type: "text", text: "Summarize the repo README"\}]
        \}]
      )

      stream.each do |event|
        case event.type
        in :"agent.message"
          event.content.each \{ print it.text \}
        in :"session.status_idle"
          break
        in :"session.error"
          puts "\n[Error: #\{event.error&.message || "unknown"\}]"
          break
        else
          # ignore other event types
        end
      end
      ```

    To reconnect to an existing session without missing events:

    1. Open a new stream.
    2. List the full event history to seed a set of seen event IDs.
    3. Tail the live stream, skipping any events already returned by the history list.

      ```bash cURL
      exec \{stream\}< <(
        curl --fail-with-body -sS -N \
          "https://api.anthropic.com/v1/sessions/$SESSION_ID/events/stream?beta=true" \
          -H "x-api-key: $ANTHROPIC_API_KEY" \
          -H "anthropic-version: 2023-06-01" \
          -H "anthropic-beta: managed-agents-2026-04-01" \
          -H "content-type: application/json" \
          -H "accept: text/event-stream"
      )

      # Stream is open and buffering. List history before tailing live.
      declare -A seen_event_ids
      while IFS= read -r event_id; do
        seen_event_ids[$event_id]=1
      done < <(
        curl --fail-with-body -sS \
          "https://api.anthropic.com/v1/sessions/$SESSION_ID/events?beta=true" \
          -H "x-api-key: $ANTHROPIC_API_KEY" \
          -H "anthropic-version: 2023-06-01" \
          -H "anthropic-beta: managed-agents-2026-04-01" \
          -H "content-type: application/json" | jq -r '.data[].id'
      )

      # Tail live events, skipping anything already seen
      while IFS= read -r -u "$stream" event_line; do
        [[ $event_line == data:* ]] || continue
        event_json=${event_line#data: \}
        event_id=$(jq -r '.id' <<<"$event_json")
        [[ -n ${seen_event_ids[$event_id]+seen\} ]] && continue
        seen_event_ids[$event_id]=1
        case $(jq -r '.type' <<<"$event_json") in
          agent.message)
            jq -j '.content[] | select(.type == "text") | .text' <<<"$event_json"
            ;;
          session.status_idle)
            break
            ;;
        esac
      done
      exec \{stream\}<&-
      ```

      ```bash CLI
      # This workflow does not translate well to a one-off shell command.
      # Use one of the SDK examples in this code group instead.
      ```

      ```python Python
      with client.beta.sessions.events.stream(session.id) as stream:
          # Stream is open and buffering. List history before tailing live.
          history = client.beta.sessions.events.list(session.id)
          seen_event_ids = \{past_event.id for past_event in history\}

          # Tail live events, skipping anything already seen
          for event in stream:
              if event.type == "event_start" or event.type == "event_delta":
                  # Delta previews aren't enabled on this connection.
                  continue
              if event.id in seen_event_ids:
                  continue
              seen_event_ids.add(event.id)
              match event.type:
                  case "agent.message":
                      for block in event.content:
                          if block.type == "text":
                              print(block.text, end="")
                  case "session.status_idle":
                      break
      ```

      ```typescript TypeScript
      const seenEventIds = new Set&lt;string>();
      const stream = await client.beta.sessions.events.stream(session.id);

      // Stream is open and buffering. List history before tailing live.
      for await (const event of client.beta.sessions.events.list(session.id)) \{
        seenEventIds.add(event.id);
      \}

      // Tail live events, skipping anything already seen
      for await (const event of stream) \{
        // Preview events (event_start/event_delta) carry no top-level id
        if (event.type === "event_start" || event.type === "event_delta") continue;
        if (seenEventIds.has(event.id)) continue;
        seenEventIds.add(event.id);
        if (event.type === "agent.message") \{
          for (const block of event.content) \{
            if (block.type === "text") \{
              process.stdout.write(block.text);
            \}
          \}
        \} else if (event.type === "session.status_idle") \{
          break;
        \}
      \}
      ```

      ```csharp C#
      using var stream = await client.Beta.Sessions.Events.WithRawResponse.StreamStreaming(session.ID);

      // Stream is open and buffering. List history before tailing live.
      HashSet&lt;string> seenEventIds = [];
      var history = await client.Beta.Sessions.Events.List(session.ID);
      await foreach (var pastEvent in history.Paginate())
      \{
          seenEventIds.Add(pastEvent.ID);
      \}

      // Tail live events, skipping anything already seen
      await foreach (var streamEvent in stream.Enumerate())
      \{
          if (!seenEventIds.Add(streamEvent.ID))
          \{
              continue;
          \}
          if (streamEvent.Value is BetaManagedAgentsAgentMessageEvent message)
          \{
              foreach (var block in message.Content)
              \{
                  if (block.Value is BetaManagedAgentsTextBlock textBlock)
                  \{
                      Console.Write(textBlock.Text);
                  \}
              \}
          \}
          else if (streamEvent.Value is BetaManagedAgentsSessionStatusIdleEvent)
          \{
              break;
          \}
      \}
      ```

      ```go Go
      	stream := client.Beta.Sessions.Events.StreamEvents(ctx, session.ID, anthropic.BetaSessionEventStreamParams\{\})
      	defer stream.Close()

      	// Stream is open and buffering. List history before tailing live.
      	seenEventIDs := map[string]struct\{\}\{\}
      	history := client.Beta.Sessions.Events.ListAutoPaging(ctx, session.ID, anthropic.BetaSessionEventListParams\{\})
      	for history.Next() \{
      		seenEventIDs[history.Current().ID] = struct\{\}\{\}
      	\}
      	if err := history.Err(); err != nil \{
      		panic(err)
      	\}

      	// Tail live events, skipping anything already seen
      tail:
      	for stream.Next() \{
      		event := stream.Current()
      		if _, seen := seenEventIDs[event.ID]; seen \{
      			continue
      		\}
      		seenEventIDs[event.ID] = struct\{\}\{\}
      		switch event := event.AsAny().(type) \{
      		case anthropic.BetaManagedAgentsAgentMessageEvent:
      			// concrete-typed list: BetaManagedAgentsTextBlock
      			for _, block := range event.Content \{
      				fmt.Print(block.Text)
      			\}
      		case anthropic.BetaManagedAgentsSessionStatusIdleEvent:
      			break tail
      		\}
      	\}
      	if err := stream.Err(); err != nil \{
      		panic(err)
      	\}
      ```

      ```java Java
      try (var stream = client.beta().sessions().events().streamStreaming(session.id())) \{
          // Stream is open and buffering. List history before tailing live.
          // Every event variant carries `id`; read it from the raw JSON to dedup across variants.
          var seenEventIds = new HashSet&lt;String>();
          for (var pastEvent : client.beta().sessions().events().list(session.id()).autoPager()) \{
              if (pastEvent._json().orElseThrow() instanceof JsonObject json) \{
                  seenEventIds.add(json.values().get("id").asStringOrThrow());
              \}
          \}

          // Tail live events; Set.add returns false for already-seen IDs, skipping the replay.
          stream.stream()
              .filter(event -> event._json().orElseThrow() instanceof JsonObject json
                  && seenEventIds.add(json.values().get("id").asStringOrThrow()))
              .takeWhile(event -> !event.isSessionStatusIdle())
              .filter(BetaManagedAgentsStreamSessionEvents::isAgentMessage)
              .forEach(event -> event.asAgentMessage().content()
                  .forEach(block -> block.text().ifPresent(textBlock -> IO.print(textBlock.text()))));
      \}
      ```

      ```php PHP
      $stream = $client->beta->sessions->events->streamStream($session->id);

      // Stream is open and buffering. List history before tailing live.
      $seenEventIds = [];
      foreach ($client->beta->sessions->events->list($session->id)->pagingEachItem() as $event) {
          $seenEventIds[$event->id] = true;
      }

      // Tail live events, skipping anything already seen
      foreach ($stream as $event) {
          if (isset($seenEventIds[$event->id])) {
              continue;
          }
          $seenEventIds[$event->id] = true;
          match ($event->type) \{
              'agent.message' => array_walk(
                  $event->content,
                  static fn ($block) => $block->type === 'text' ? print($block->text) : null,
              ),
              default => null,
          \};
          if ($event->type === 'session.status_idle') {
              break;
          }
      }
      $stream->close();
      ```

      ```ruby Ruby
      stream = client.beta.sessions.events.stream_events(session.id)

      # Stream is open and buffering. List history before tailing live.
      seen_event_ids = Set.new
      client.beta.sessions.events.list(session.id).auto_paging_each \{ seen_event_ids << it.id \}

      # Tail live events, skipping anything already seen — Set#add? returns nil for duplicates
      stream.each do |event|
        next unless seen_event_ids.add?(event.id)
        case event.type
        in :"agent.message"
          event.content.each \{ print it.text \}
        in :"session.status_idle"
          break
        else
          # ignore other event types
        end
      end
      ```

    Retrieve the full event history for a session:

      ```bash cURL
      curl --fail-with-body -sS "https://api.anthropic.com/v1/sessions/$SESSION_ID/events?beta=true" \
        -H "x-api-key: $ANTHROPIC_API_KEY" \
        -H "anthropic-version: 2023-06-01" \
        -H "anthropic-beta: managed-agents-2026-04-01" \
        -H "content-type: application/json" \
        | jq -r '.data[] | "[\(.type)] \(.processed_at)"'
      ```

      ```bash CLI
      ant beta:sessions:events list --session-id "$SESSION_ID" \
        --format jsonl --transform '{type,processed_at}'
      ```

      ```python Python
      events = client.beta.sessions.events.list(session.id)
      for event in events.data:
          print(f"[{event.type}] {event.processed_at}")
      ```

      ```typescript TypeScript
      const events = await client.beta.sessions.events.list(session.id);
      for (const event of events.data) {
        console.log(`[${event.type\}] ${event.processed_at}`);
      }
      ```

      ```csharp C#
      var events = await client.Beta.Sessions.Events.List(session.ID);
      foreach (var sessionEvent in events.Items)
      {
          Console.WriteLine($"[\{sessionEvent.Json.GetProperty("type").GetString()\}] \{sessionEvent.ProcessedAt\}");
      \}
      ```

      ```go Go
      events, err := client.Beta.Sessions.Events.List(ctx, session.ID, anthropic.BetaSessionEventListParams\{\})
      if err != nil \{
      	panic(err)
      \}
      for _, event := range events.Data \{
      	fmt.Printf("[%s] %s\n", event.Type, event.ProcessedAt)
      \}
      ```

      ```java Java
      var events = client.beta().sessions().events().list(session.id());
      for (var event : events.data()) \{
          var eventJson = event._json().orElseThrow().convert(JsonNode.class);
          var processedAt = eventJson.path("processed_at");
          IO.println("[" + eventJson.get("type").asText() + "] "
              + (processedAt.isTextual() ? processedAt.asText() : "null"));
      \}
      ```

      ```php PHP
      $events = $client->beta->sessions->events->list($session->id);
      foreach ($events->data as $event) {
          $processedAt = ($event->processedAt ?? null)?->format(DATE_RFC3339) ?? 'null';
          echo "[{$event->type\}] \{$processedAt}\n";
      }
      ```

      ```ruby Ruby
      events = client.beta.sessions.events.list(session.id)
      events.data.each { puts "[#{it.type}] #{it.processed_at}" }
      ```

    Pass a `types` filter to return only specific event types:

      ```bash cURL
      curl --fail-with-body -sS "https://api.anthropic.com/v1/sessions/$SESSION_ID/events?beta=true&types[]=agent.tool_use&types[]=agent.tool_result" \
        -H "x-api-key: $ANTHROPIC_API_KEY" \
        -H "anthropic-version: 2023-06-01" \
        -H "anthropic-beta: managed-agents-2026-04-01" \
        | jq -r '.data[] | "[\(.type)] \(.processed_at)"'
      ```

      ```bash CLI
      ant beta:sessions:events list --session-id "$SESSION_ID" \
        --type agent.tool_use --type agent.tool_result \
        --format jsonl --transform '\{type,processed_at\}'
      ```

      ```python Python
      events = client.beta.sessions.events.list(
          session.id,
          types=["agent.tool_use", "agent.tool_result"],
      )
      for event in events.data:
          print(f"[\{event.type\}] \{event.processed_at\}")
      ```

      ```typescript TypeScript
      const events = await client.beta.sessions.events.list(session.id, \{
        types: ["agent.tool_use", "agent.tool_result"],
      \});
      for (const event of events.data) \{
        console.log(`[${event.type}] ${event.processed_at\}`);
      \}
      ```

      ```csharp C#
      var events = await client.Beta.Sessions.Events.List(session.ID, new()
      \{
          Types = ["agent.tool_use", "agent.tool_result"],
      \});
      foreach (var sessionEvent in events.Items)
      \{
          Console.WriteLine($"[\{sessionEvent.Json.GetProperty("type").GetString()\}] \{sessionEvent.ProcessedAt\}");
      \}
      ```

      ```go Go
      events, err := client.Beta.Sessions.Events.List(ctx, session.ID, anthropic.BetaSessionEventListParams\{
      	Types: []string\{"agent.tool_use", "agent.tool_result"\},
      \})
      if err != nil \{
      	panic(err)
      \}
      for _, event := range events.Data \{
      	fmt.Printf("[%s] %s\n", event.Type, event.ProcessedAt)
      \}
      ```

      ```java Java
      var events = client.beta().sessions().events().list(
          session.id(),
          EventListParams.builder()
              .addType("agent.tool_use")
              .addType("agent.tool_result")
              .build());
      for (var event : events.data()) \{
          event.agentToolUse().ifPresent(toolUse ->
              IO.println("[" + toolUse.type() + "] " + toolUse.processedAt()));
          event.agentToolResult().ifPresent(toolResult ->
              IO.println("[" + toolResult.type() + "] " + toolResult.processedAt()));
      \}
      ```

      ```php PHP
      // In PHP, pass the types you want on EventListParams; see the Anthropic PHP SDK.
      ```

      ```ruby Ruby
      events = client.beta.sessions.events.list(
        session.id,
        types: ["agent.tool_use", "agent.tool_result"]
      )
      events.data.each \{ puts "[#\{it.type\}] #\{it.processed_at\}" \}
      ```
```
```
