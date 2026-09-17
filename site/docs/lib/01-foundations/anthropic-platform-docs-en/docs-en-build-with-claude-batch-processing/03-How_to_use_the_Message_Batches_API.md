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
sourceRel: "docs/en/build-with-claude/batch-processing.md"
rawUrl: "/raw/01-foundations/anthropic-platform-docs-en/docs/en/build-with-claude/batch-processing.md"
sourceSha256: "e1df24b2de12d22c8eed0e85d4dbc46cf6c2e1c8300d6d635d0667fd22a439c4"
pageSha256: "8967ea072e24a2bf0832a2b81799dd057678eefe3dfa165569e3c92a8e2bbccb"
contentMode: "local-full"
zh: ""
---

## How to use the Message Batches API

### Prepare and create your batch

A Message Batch is composed of a list of requests to create a Message. The shape of an individual request comprises:

* A unique `custom_id` for identifying the Messages request. Must be 1 to 64 characters and contain only alphanumeric characters, hyphens, and underscores (matching `^[a-zA-Z0-9_-]\{1,64\}$`).
* A `params` object with the standard [Messages API](https://platform.claude.com/docs/en/api/messages/create) parameters

You can [create a batch](https://platform.claude.com/docs/en/api/messages/batches/create) by passing this list into the `requests` parameter:

  ```bash cURL
  curl https://api.anthropic.com/v1/messages/batches \
       --header "x-api-key: $ANTHROPIC_API_KEY" \
       --header "anthropic-version: 2023-06-01" \
       --header "content-type: application/json" \
       --data \
  '{
      "requests": [
          {
              "custom_id": "my-first-request",
              "params": {
                  "model": "claude-opus-5",
                  "max_tokens": 1024,
                  "messages": [
                      {"role": "user", "content": "Hello, world"}
                  ]
              }
          },
          {
              "custom_id": "my-second-request",
              "params": {
                  "model": "claude-opus-5",
                  "max_tokens": 1024,
                  "messages": [
                      {"role": "user", "content": "Hi again, friend"}
                  ]
              }
          }
      ]
  }'
  ```

  ```bash CLI
  ant messages:batches create <<'YAML'
  requests:
    - custom_id: my-first-request
      params:
        model: claude-opus-5
        max_tokens: 1024
        messages:
          - role: user
            content: Hello, world
    - custom_id: my-second-request
      params:
        model: claude-opus-5
        max_tokens: 1024
        messages:
          - role: user
            content: Hi again, friend
  YAML
  ```

  ```python Python
  from anthropic.types.message_create_params import MessageCreateParamsNonStreaming
  from anthropic.types.messages.batch_create_params import Request

  client = anthropic.Anthropic()

  message_batch = client.messages.batches.create(
      requests=[
          Request(
              custom_id="my-first-request",
              params=MessageCreateParamsNonStreaming(
                  model="claude-opus-5",
                  max_tokens=1024,
                  messages=[
                      {
                          "role": "user",
                          "content": "Hello, world",
                      }
                  ],
              ),
          ),
          Request(
              custom_id="my-second-request",
              params=MessageCreateParamsNonStreaming(
                  model="claude-opus-5",
                  max_tokens=1024,
                  messages=[
                      {
                          "role": "user",
                          "content": "Hi again, friend",
                      }
                  ],
              ),
          ),
      ]
  )

  print(message_batch)
  ```

  ```typescript TypeScript
  const client = new Anthropic();

  const messageBatch = await client.messages.batches.create({
    requests: [
      {
        custom_id: "my-first-request",
        params: {
          model: "claude-opus-5",
          max_tokens: 1024,
          messages: [{ role: "user", content: "Hello, world" }]
        }
      },
      {
        custom_id: "my-second-request",
        params: {
          model: "claude-opus-5",
          max_tokens: 1024,
          messages: [{ role: "user", content: "Hi again, friend" }]
        }
      }
    ]
  });

  console.log(messageBatch);
  ```

  ```csharp C#
  using Anthropic;
  using Anthropic.Models.Messages;
  using Anthropic.Models.Messages.Batches;

  AnthropicClient client = new();

  var batch = await client.Messages.Batches.Create(new BatchCreateParams
  {
      Requests =
      [
          new()
          {
              CustomID = "my-first-request",
              Params = new()
              {
                  Model = Model.ClaudeOpus5,
                  MaxTokens = 1024,
                  Messages =
                  [
                      new() { Role = Role.User, Content = "Hello, world" }
                  ]
              }
          },
          new()
          {
              CustomID = "my-second-request",
              Params = new()
              {
                  Model = Model.ClaudeOpus5,
                  MaxTokens = 1024,
                  Messages =
                  [
                      new() { Role = Role.User, Content = "Hi again, friend" }
                  ]
              }
          }
      ]
  });

  Console.WriteLine(batch);
  ```

  ```go Go
  client := anthropic.NewClient()

  batch, _ := client.Messages.Batches.New(context.Background(),
  	anthropic.MessageBatchNewParams{
  		Requests: []anthropic.MessageBatchNewParamsRequest{
  			{
  				CustomID: "my-first-request",
  				Params: anthropic.MessageBatchNewParamsRequestParams{
  					Model:     anthropic.ModelClaudeOpus5,
  					MaxTokens: 1024,
  					Messages: []anthropic.MessageParam{
  						anthropic.NewUserMessage(
  							anthropic.NewTextBlock("Hello, world"),
  						),
  					},
  				},
  			},
  			{
  				CustomID: "my-second-request",
  				Params: anthropic.MessageBatchNewParamsRequestParams{
  					Model:     anthropic.ModelClaudeOpus5,
  					MaxTokens: 1024,
  					Messages: []anthropic.MessageParam{
  						anthropic.NewUserMessage(
  							anthropic.NewTextBlock("Hi again, friend"),
  						),
  					},
  				},
  			},
  		},
  	})

  fmt.Println(batch.ID)
  ```

  ```java Java
  AnthropicClient client = AnthropicOkHttpClient.fromEnv();

  BatchCreateParams params = BatchCreateParams.builder()
    .addRequest(
      BatchCreateParams.Request.builder()
        .customId("my-first-request")
        .params(
          BatchCreateParams.Request.Params.builder()
            .model(Model.CLAUDE_OPUS_5)
            .maxTokens(1024)
            .addUserMessage("Hello, world")
            .build()
        )
        .build()
    )
    .addRequest(
      BatchCreateParams.Request.builder()
        .customId("my-second-request")
        .params(
          BatchCreateParams.Request.Params.builder()
            .model(Model.CLAUDE_OPUS_5)
            .maxTokens(1024)
            .addUserMessage("Hi again, friend")
            .build()
        )
        .build()
    )
    .build();

  MessageBatch messageBatch = client.messages().batches().create(params);

  System.out.println(messageBatch);
  ```

  ```php PHP
  $client = new Client();

  $batch = $client->messages->batches->create(
      requests: [
          [
              'custom_id' => 'my-first-request',
              'params' => [
                  'model' => 'claude-opus-5',
                  'max_tokens' => 1024,
                  'messages' => [
                      ['role' => 'user', 'content' => 'Hello, world']
                  ]
              ]
          ],
          [
              'custom_id' => 'my-second-request',
              'params' => [
                  'model' => 'claude-opus-5',
                  'max_tokens' => 1024,
                  'messages' => [
                      ['role' => 'user', 'content' => 'Hi again, friend']
                  ]
              ]
          ]
      ],
  );

  echo $batch->id;
  ```

  ```ruby Ruby
  client = Anthropic::Client.new

  batch = client.messages.batches.create(
    requests: [
      {
        custom_id: "my-first-request",
        params: {
          model: "claude-opus-5",
          max_tokens: 1024,
          messages: [
            { role: "user", content: "Hello, world" }
          ]
        }
      },
      {
        custom_id: "my-second-request",
        params: {
          model: "claude-opus-5",
          max_tokens: 1024,
          messages: [
            { role: "user", content: "Hi again, friend" }
          ]
        }
      }
    ]
  )

  puts batch
  ```

In this example, two separate requests are batched together for asynchronous processing. Each request has a unique `custom_id` and contains the standard parameters you'd use for a Messages API call.

  **Test your batch requests with the Messages API**

  Validation of the `params` object for each message request is performed asynchronously, and validation errors are returned when processing of the entire batch has ended. You can ensure that you are building your input correctly by verifying your request shape with the [Messages API](https://platform.claude.com/docs/en/api/messages/create) first.

When a batch is first created, the response has a processing status of `in_progress`.

```json Output
{
  "id": "msgbatch_01HkcTjaV5uDC8jWR4ZsDV8d",
  "type": "message_batch",
  "processing_status": "in_progress",
  "request_counts": {
    "processing": 2,
    "succeeded": 0,
    "errored": 0,
    "canceled": 0,
    "expired": 0
  },
  "ended_at": null,
  "created_at": "2024-09-24T18:37:24.100435Z",
  "expires_at": "2024-09-25T18:37:24.100435Z",
  "cancel_initiated_at": null,
  "results_url": null
}
```

### Tracking your batch

The Message Batch's `processing_status` field indicates the stage of processing the batch is in. It starts as `in_progress`, then updates to `ended` once all the requests in the batch have finished processing, and results are ready. You can monitor the state of your batch by visiting the [Console](https://platform.claude.com/settings/workspaces/default/batches), or using the [retrieval endpoint](https://platform.claude.com/docs/en/api/retrieving-message-batches).

#### Polling for Message Batch completion

To poll a Message Batch, you'll need its `id`, which is provided in the response when creating a batch or by listing batches. You can implement a polling loop that checks the batch status periodically until processing has ended:

  ```bash cURL
  #!/bin/sh
  # ...
  # Check the status; repeat until processing_status is "ended"
  curl -s "https://api.anthropic.com/v1/messages/batches/$MESSAGE_BATCH_ID" \
    --header "x-api-key: $ANTHROPIC_API_KEY" \
    --header "anthropic-version: 2023-06-01" \
    | jq -r '.processing_status'
  ```

  ```bash CLI
  #!/bin/bash
  # ...
  # Check the status; repeat until processing_status is "ended"
  ant messages:batches retrieve \
    --message-batch-id "$MESSAGE_BATCH_ID" \
    --transform processing_status --raw-output
  ```

  ```python Python
  import time

  client = anthropic.Anthropic()

  MESSAGE_BATCH_ID = "msgbatch_01HkcTjaV5uDC8jWR4ZsDV8d"

  message_batch = None
  while True:
      message_batch = client.messages.batches.retrieve(MESSAGE_BATCH_ID)
      if message_batch.processing_status == "ended":
          break

      print(f"Batch {MESSAGE_BATCH_ID} is still processing...")
      time.sleep(60)
  print(message_batch)
  ```

  ```typescript TypeScript
  const client = new Anthropic();

  const messageBatchId = "msgbatch_01HkcTjaV5uDC8jWR4ZsDV8d";

  let messageBatch;
  while (true) {
    messageBatch = await client.messages.batches.retrieve(messageBatchId);
    if (messageBatch.processing_status === "ended") {
      break;
    }

    console.log(`Batch ${messageBatchId} is still processing... waiting`);
    await new Promise((resolve) => setTimeout(resolve, 60_000));
  }
  console.log(messageBatch);
  ```

  ```csharp C#
  AnthropicClient client = new();
  string messageBatchId = Environment.GetEnvironmentVariable("MESSAGE_BATCH_ID");

  MessageBatch messageBatch = null;
  while (true)
  {
      messageBatch = await client.Messages.Batches.Retrieve(messageBatchId);
      if (messageBatch.ProcessingStatus == "ended")
      {
          break;
      }

      Console.WriteLine($"Batch {messageBatchId} is still processing...");
      await Task.Delay(60000);
  }
  Console.WriteLine(messageBatch);
  ```

  ```go Go
  client := anthropic.NewClient()
  messageBatchID := os.Getenv("MESSAGE_BATCH_ID")

  var messageBatch *anthropic.MessageBatch
  for {
  	var err error
  	messageBatch, err = client.Messages.Batches.Get(context.TODO(), messageBatchID)
  	if err != nil {
  		log.Fatal(err)
  	}
  	if messageBatch.ProcessingStatus == "ended" {
  		break
  	}

  	fmt.Printf("Batch %s is still processing...\n", messageBatchID)
  	time.Sleep(60 * time.Second)
  }
  fmt.Println(messageBatch)
  ```

  ```java Java
  import com.anthropic.models.messages.batches.MessageBatch;
  // ...
          AnthropicClient client = AnthropicOkHttpClient.fromEnv();
          String messageBatchId = "msgbatch_01HkcTjaV5uDC8jWR4ZsDV8d";

          MessageBatch messageBatch = null;
          while (true) {
              messageBatch = client.messages().batches().retrieve(messageBatchId);
              if (messageBatch.processingStatus().equals(MessageBatch.ProcessingStatus.ENDED)) {
                  break;
              }

              System.out.println("Batch " + messageBatchId + " is still processing...");
              Thread.sleep(60000);
          }
          System.out.println(messageBatch);
  ```

  ```php PHP
  $client = new Client();
  $messageBatchId = getenv("MESSAGE_BATCH_ID");

  $messageBatch = null;
  while (true) {
      $messageBatch = $client->messages->batches->retrieve(
          messageBatchID: $messageBatchId,
      );
      if ($messageBatch->processingStatus === "ended") {
          break;
      }

      echo "Batch {$messageBatchId} is still processing...\n";
      sleep(60);
  }
  echo json_encode($messageBatch, JSON_PRETTY_PRINT);
  ```

  ```ruby Ruby
  client = Anthropic::Client.new

  message_batch_id = ENV["MESSAGE_BATCH_ID"]
  message_batch = nil
  loop do
    message_batch = client.messages.batches.retrieve(message_batch_id)
    break if message_batch.processing_status == :ended

    puts "Batch #{message_batch_id} is still processing..."
    sleep 60
  end
  puts message_batch
  ```

### Listing all Message Batches

You can list all Message Batches in your Workspace using the [list endpoint](https://platform.claude.com/docs/en/api/listing-message-batches). The API supports pagination, automatically fetching additional pages as needed:

  ```bash cURL
  #!/bin/sh
  # Fetches one page. While the response's has_more is true, pass its
  # last_id as after_id to fetch the next page. (The SDKs and the CLI
  # perform automatic pagination.)
  curl -s "https://api.anthropic.com/v1/messages/batches?limit=20" \
    --header "x-api-key: $ANTHROPIC_API_KEY" \
    --header "anthropic-version: 2023-06-01"
  ```

  ```bash CLI
  # Automatically fetches more pages as needed
  ant messages:batches list --limit 20
  ```

  ```python Python
  client = anthropic.Anthropic()

  # Automatically fetches more pages as needed.
  for message_batch in client.messages.batches.list(limit=20):
      print(message_batch)
  ```

  ```typescript TypeScript
  const client = new Anthropic();

  // Automatically fetches more pages as needed.
  for await (const messageBatch of client.messages.batches.list({
    limit: 20
  })) {
    console.log(messageBatch);
  }
  ```

  ```csharp C#
  AnthropicClient client = new();

  var parameters = new BatchListParams
  {
      Limit = 20
  };

  // Automatically fetches more pages as needed
  var page = await client.Messages.Batches.List(parameters);
  await foreach (var messageBatch in page.Paginate())
  {
      Console.WriteLine(messageBatch);
  }
  ```

  ```go Go
  client := anthropic.NewClient()

  // Automatically fetches more pages as needed
  iter := client.Messages.Batches.ListAutoPaging(context.TODO(), anthropic.MessageBatchListParams{
  	Limit: anthropic.Int(20),
  })

  for iter.Next() {
  	messageBatch := iter.Current()
  	fmt.Println(messageBatch)
  }

  if err := iter.Err(); err != nil {
  	log.Fatal(err)
  }
  ```

  ```java Java
  AnthropicClient client = AnthropicOkHttpClient.fromEnv();

  // Automatically fetches more pages as needed
  for (MessageBatch messageBatch : client
    .messages()
    .batches()
    .list(BatchListParams.builder().limit(20).build())
    .autoPager()) {
    System.out.println(messageBatch);
  }
  ```

  ```php PHP
  $client = new Client();

  // Automatically fetches more pages as needed
  foreach ($client->messages->batches->list(limit: 20)->pagingEachItem() as $messageBatch) {
      echo $messageBatch->id . "\n";
  }
  ```

  ```ruby Ruby
  client = Anthropic::Client.new

  # Automatically fetches more pages as needed
  client.messages.batches.list(limit: 20).auto_paging_each do |message_batch|
    puts message_batch
  end
  ```

### Retrieving batch results

Once batch processing has ended, each Messages request in the batch has a result. There are four result types:

| Result type | Description                                                                                                                                                                 |
| ----------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `succeeded` | Request was successful. Includes the message result.                                                                                                                        |
| `errored`   | Request encountered an error and a message was not created. Possible errors include invalid requests and internal server errors. You will not be billed for these requests. |
| `canceled`  | User canceled the batch before this request could be sent to the model. You will not be billed for these requests.                                                          |
| `expired`   | Batch reached its 24-hour expiration before this request could be sent to the model. You will not be billed for these requests.                                             |

The batch's `request_counts` shows an overview of your results, indicating how many requests reached each of these four states.

Results of the batch are available for download at the `results_url` property on the Message Batch, and if the organization permission allows, in the Console. Because of the potentially large size of the results, it's recommended to [stream results](https://platform.claude.com/docs/en/api/messages/batches/results) back rather than download them all at once.

  ```bash cURL
  #!/bin/sh
  # Fetch the batch's results_url, then stream the .jsonl results it
  # points to. For per-result handling (retries, validation errors),
  # use the SDK examples in the other tabs.
  RESULTS_URL=$(curl -s "https://api.anthropic.com/v1/messages/batches/msgbatch_01HkcTjaV5uDC8jWR4ZsDV8d" \
    --header "anthropic-version: 2023-06-01" \
    --header "x-api-key: $ANTHROPIC_API_KEY" \
    | jq -r '.results_url')

  curl -s "$RESULTS_URL" \
    --header "anthropic-version: 2023-06-01" \
    --header "x-api-key: $ANTHROPIC_API_KEY" \
    | jq -r '"\(.result.type): \(.custom_id)"'
  ```

  ```bash CLI
  # Prints one line per result, e.g. `{"custom_id":"test-1","type":"succeeded",…}`.
  # For per-result handling (retries, validation errors), use the SDK
  # examples in the other tabs.
  ant messages:batches results \
    --message-batch-id msgbatch_01HkcTjaV5uDC8jWR4ZsDV8d \
    --transform '{custom_id,"type":result.type,"error":result.error.error.type}' \
    --format jsonl
  ```

  ```python Python
  client = anthropic.Anthropic()

  # Stream results file in memory-efficient chunks, processing one at a time
  for result in client.messages.batches.results(
      "msgbatch_01HkcTjaV5uDC8jWR4ZsDV8d",
  ):
      match result.result.type:
          case "succeeded":
              print(f"Success! {result.custom_id}")
          case "errored":
              if result.result.error.error.type == "invalid_request_error":
                  # Request body must be fixed before re-sending request
                  print(f"Validation error {result.custom_id}")
              else:
                  # Request can be retried directly
                  print(f"Server error {result.custom_id}")
          case "expired":
              print(f"Request expired {result.custom_id}")
  ```

  ```typescript TypeScript
  const client = new Anthropic();

  // Stream results file in memory-efficient chunks, processing one at a time
  for await (const result of await client.messages.batches.results(
    "msgbatch_01HkcTjaV5uDC8jWR4ZsDV8d"
  )) {
    switch (result.result.type) {
      case "succeeded":
        console.log(`Success! ${result.custom_id}`);
        break;
      case "errored":
        if (result.result.error.type === "invalid_request_error") {
          // Request body must be fixed before re-sending request
          console.log(`Validation error: ${result.custom_id}`);
        } else {
          // Request can be retried directly
          console.log(`Server error: ${result.custom_id}`);
        }
        break;
      case "expired":
        console.log(`Request expired: ${result.custom_id}`);
        break;
    }
  }
  ```

  ```csharp C#
  AnthropicClient client = new();

  await foreach (var result in client.Messages.Batches.ResultsStreaming("msgbatch_01HkcTjaV5uDC8jWR4ZsDV8d"))
  {
      switch (result.Result.Type)
      {
          case "succeeded":
              Console.WriteLine($"Success! {result.CustomID}");
              break;
          case "errored":
              if (result.Result.Error?.Type == "invalid_request")
              {
                  Console.WriteLine($"Validation error: {result.CustomID}");
              }
              else
              {
                  Console.WriteLine($"Server error: {result.CustomID}");
              }
              break;
          case "expired":
              Console.WriteLine($"Request expired: {result.CustomID}");
              break;
      }
  }
  ```

  ```go Go
  client := anthropic.NewClient()

  stream := client.Messages.Batches.ResultsStreaming(context.TODO(), "msgbatch_01HkcTjaV5uDC8jWR4ZsDV8d")

  for stream.Next() {
  	result := stream.Current()

  	switch variant := result.Result.AsAny().(type) {
  	case anthropic.MessageBatchSucceededResult:
  		fmt.Printf("Success! %s\n", result.CustomID)
  	case anthropic.MessageBatchErroredResult:
  		fmt.Printf("Error: %s - %s\n", result.CustomID, variant.Error.Error.Message)
  	case anthropic.MessageBatchExpiredResult:
  		fmt.Printf("Request expired: %s\n", result.CustomID)
  	}
  }

  if err := stream.Err(); err != nil {
  	log.Fatal(err)
  }
  ```

  ```java Java
  import com.anthropic.core.http.StreamResponse;
  import com.anthropic.models.messages.batches.BatchResultsParams;
  import com.anthropic.models.messages.batches.MessageBatchIndividualResponse;
  // ...
      AnthropicClient client = AnthropicOkHttpClient.fromEnv();

      // Stream results file in memory-efficient chunks, processing one at a time
      try (
        StreamResponse<MessageBatchIndividualResponse> streamResponse = client
          .messages()
          .batches()
          .resultsStreaming(
            BatchResultsParams.builder()
              .messageBatchId("msgbatch_01HkcTjaV5uDC8jWR4ZsDV8d")
              .build()
          )
      ) {
        streamResponse
          .stream()
          .forEach(result -> {
            if (result.result().isSucceeded()) {
              System.out.println("Success! " + result.customId());
            } else if (result.result().isErrored()) {
              if (result.result().asErrored().error().error().isInvalidRequestError()) {
                // Request body must be fixed before re-sending request
                System.out.println("Validation error: " + result.customId());
              } else {
                // Request can be retried directly
                System.out.println("Server error: " + result.customId());
              }
            } else if (result.result().isExpired()) {
              System.out.println("Request expired: " + result.customId());
            }
          });
      }
  ```

  ```php PHP
  $client = new Client();

  foreach ($client->messages->batches->resultsStream(messageBatchID: 'msgbatch_01HkcTjaV5uDC8jWR4ZsDV8d') as $result) {
      switch ($result->result->type) {
          case "succeeded":
              echo "Success! {$result->customID}\n";
              break;
          case "errored":
              if ($result->result->error->error->type === "invalid_request_error") {
                  echo "Validation error: {$result->customID}\n";
              } else {
                  echo "Server error: {$result->customID}\n";
              }
              break;
          case "expired":
              echo "Request expired: {$result->customID}\n";
              break;
      }
  }
  ```

  ```ruby Ruby
  client = Anthropic::Client.new

  client.messages.batches.results_streaming("msgbatch_01HkcTjaV5uDC8jWR4ZsDV8d").each do |result|
    case result.result.type
    when :succeeded
      puts "Success! #{result.custom_id}"
    when :errored
      if result.result.error.type == :invalid_request
        puts "Validation error: #{result.custom_id}"
      else
        puts "Server error: #{result.custom_id}"
      end
    when :expired
      puts "Request expired: #{result.custom_id}"
    end
  end
  ```

The results are in `.jsonl` format, where each line is a valid JSON object representing the result of a single request in the Message Batch. For each streamed result, you can do something different depending on its `custom_id` and result type. Here is an example set of results:

```jsonl .jsonl file
{"custom_id":"my-second-request","result":{"type":"succeeded","message":{"id":"msg_014VwiXbi91y3JMjcpyGBHX5","type":"message","role":"assistant","model":"claude-opus-5","content":[{"type":"text","text":"Hello again! It's nice to see you. How can I assist you today? Is there anything specific you'd like to chat about or any questions you have?"}],"stop_reason":"end_turn","stop_sequence":null,"usage":{"input_tokens":11,"output_tokens":36}}}}
{"custom_id":"my-first-request","result":{"type":"succeeded","message":{"id":"msg_01FqfsLoHwgeFbguDgpz48m7","type":"message","role":"assistant","model":"claude-opus-5","content":[{"type":"text","text":"Hello! How can I assist you today? Feel free to ask me any questions or let me know if there's anything you'd like to chat about."}],"stop_reason":"end_turn","stop_sequence":null,"usage":{"input_tokens":10,"output_tokens":34}}}}
```

If your result has an error, its `result.error` will be set to the standard [error shape](https://platform.claude.com/docs/en/api/errors#error-shapes).

  **Batch results may not match input order**

  Batch results can be returned in any order, and may not match the ordering of requests when the batch was created. In the preceding example, the result for the second batch request is returned before the first. To correctly match results with their corresponding requests, always use the `custom_id` field.

### Canceling a Message Batch

You can cancel a Message Batch that is currently processing using the [cancel endpoint](https://platform.claude.com/docs/en/api/canceling-message-batches). Immediately after cancellation, a batch's `processing_status` will be `canceling`. You can use the same polling technique described earlier to wait until cancellation is finalized. Canceled batches end up with a status of `ended` and may contain partial results for requests that were processed before cancellation.

  ```bash cURL
  #!/bin/sh
  # ...
  curl --request POST https://api.anthropic.com/v1/messages/batches/$MESSAGE_BATCH_ID/cancel \
      --header "x-api-key: $ANTHROPIC_API_KEY" \
      --header "anthropic-version: 2023-06-01"
  ```

  ```bash CLI
  #!/bin/bash
  # ...
  ant messages:batches cancel --message-batch-id "$MESSAGE_BATCH_ID"
  ```

  ```python Python
  client = anthropic.Anthropic()

  MESSAGE_BATCH_ID = "msgbatch_01HkcTjaV5uDC8jWR4ZsDV8d"

  message_batch = client.messages.batches.cancel(
      MESSAGE_BATCH_ID,
  )
  print(message_batch)
  ```

  ```typescript TypeScript
  const client = new Anthropic();

  const messageBatch = await client.messages.batches.cancel(MESSAGE_BATCH_ID);
  console.log(messageBatch);
  ```

  ```csharp C#
  AnthropicClient client = new();
  string messageBatchId = Environment.GetEnvironmentVariable("MESSAGE_BATCH_ID");

  var messageBatch = await client.Messages.Batches.Cancel(messageBatchId);
  Console.WriteLine(messageBatch);
  ```

  ```go Go
  client := anthropic.NewClient()
  messageBatchID := os.Getenv("MESSAGE_BATCH_ID")

  messageBatch, err := client.Messages.Batches.Cancel(context.TODO(), messageBatchID)
  if err != nil {
  	log.Fatal(err)
  }
  fmt.Println(messageBatch)
  ```

  ```java Java
  import com.anthropic.models.messages.batches.*;
  // ...
      AnthropicClient client = AnthropicOkHttpClient.fromEnv();

      MessageBatch messageBatch = client
        .messages()
        .batches()
        .cancel("msgbatch_01HkcTjaV5uDC8jWR4ZsDV8d");
      System.out.println(messageBatch);
  ```

  ```php PHP
  $client = new Client();

  $messageBatch = $client->messages->batches->cancel(
      messageBatchID: 'msgbatch_example_id',
  );
  echo $messageBatch;
  ```

  ```ruby Ruby
  client = Anthropic::Client.new

  message_batch_id = ENV.fetch("MESSAGE_BATCH_ID")
  message_batch = client.messages.batches.cancel(message_batch_id)
  puts message_batch
  ```

The response shows the batch in a `canceling` state:

```json Output
{
  "id": "msgbatch_013Zva2CMHLNnXjNJJKqJ2EF",
  "type": "message_batch",
  "processing_status": "canceling",
  "request_counts": {
    "processing": 2,
    "succeeded": 0,
    "errored": 0,
    "canceled": 0,
    "expired": 0
  },
  "ended_at": null,
  "created_at": "2024-09-24T18:37:24.100435Z",
  "expires_at": "2024-09-25T18:37:24.100435Z",
  "cancel_initiated_at": "2024-09-24T18:39:03.114875Z",
  "results_url": null
}
```

### Using prompt caching with Message Batches

The Message Batches API supports prompt caching, allowing you to potentially reduce costs and processing time for batch requests. The pricing discounts from prompt caching and Message Batches can stack, providing even greater cost savings when both features are used together. However, because batch requests are processed asynchronously and concurrently, cache hits are provided on a best-effort basis. Users typically experience cache hit rates ranging from 30% to 98%, depending on their traffic patterns.

To maximize the likelihood of cache hits in your batch requests:

1. Include identical `cache_control` blocks in every Message request within your batch.
2. Maintain a steady stream of requests to prevent cache entries from expiring after their 5-minute lifetime.
3. Structure your requests to share as much cached content as possible.

Example of implementing prompt caching in a batch:

  ```bash cURL
  curl https://api.anthropic.com/v1/messages/batches \
       --header "x-api-key: $ANTHROPIC_API_KEY" \
       --header "anthropic-version: 2023-06-01" \
       --header "content-type: application/json" \
       --data \
  '{
      "requests": [
          {
              "custom_id": "my-first-request",
              "params": {
                  "model": "claude-opus-5",
                  "max_tokens": 1024,
                  "system": [
                      {
                          "type": "text",
                          "text": "You are an AI assistant tasked with analyzing literary works. Your goal is to provide insightful commentary on themes, characters, and writing style.\n"
                      },
                      {
                          "type": "text",
                          "text": "<the entire contents of Pride and Prejudice>",
                          "cache_control": {"type": "ephemeral"}
                      }
                  ],
                  "messages": [
                      {"role": "user", "content": "Analyze the major themes in Pride and Prejudice."}
                  ]
              }
          },
          {
              "custom_id": "my-second-request",
              "params": {
                  "model": "claude-opus-5",
                  "max_tokens": 1024,
                  "system": [
                      {
                          "type": "text",
                          "text": "You are an AI assistant tasked with analyzing literary works. Your goal is to provide insightful commentary on themes, characters, and writing style.\n"
                      },
                      {
                          "type": "text",
                          "text": "<the entire contents of Pride and Prejudice>",
                          "cache_control": {"type": "ephemeral"}
                      }
                  ],
                  "messages": [
                      {"role": "user", "content": "Write a summary of Pride and Prejudice."}
                  ]
              }
          }
      ]
  }'
  ```

  ```bash CLI
  ant messages:batches create <<'YAML'
  requests:
    - custom_id: my-first-request
      params:
        model: claude-opus-5
        max_tokens: 1024
        system:
          - type: text
            text: >
              You are an AI assistant tasked with analyzing literary works. Your
              goal is to provide insightful commentary on themes, characters, and
              writing style.
          - type: text
            text: "<the entire contents of Pride and Prejudice>"
            cache_control:
              type: ephemeral
        messages:
          - role: user
            content: Analyze the major themes in Pride and Prejudice.
    - custom_id: my-second-request
      params:
        model: claude-opus-5
        max_tokens: 1024
        system:
          - type: text
            text: >
              You are an AI assistant tasked with analyzing literary works. Your
              goal is to provide insightful commentary on themes, characters, and
              writing style.
          - type: text
            text: "<the entire contents of Pride and Prejudice>"
            cache_control:
              type: ephemeral
        messages:
          - role: user
            content: Write a summary of Pride and Prejudice.
  YAML
  ```

  ```python Python
  from anthropic.types.message_create_params import MessageCreateParamsNonStreaming
  from anthropic.types.messages.batch_create_params import Request

  client = anthropic.Anthropic()

  message_batch = client.messages.batches.create(
      requests=[
          Request(
              custom_id="my-first-request",
              params=MessageCreateParamsNonStreaming(
                  model="claude-opus-5",
                  max_tokens=1024,
                  system=[
                      {
                          "type": "text",
                          "text": "You are an AI assistant tasked with analyzing literary works. Your goal is to provide insightful commentary on themes, characters, and writing style.\n",
                      },
                      {
                          "type": "text",
                          "text": "<the entire contents of Pride and Prejudice>",
                          "cache_control": {"type": "ephemeral"},
                      },
                  ],
                  messages=[
                      {
                          "role": "user",
                          "content": "Analyze the major themes in Pride and Prejudice.",
                      }
                  ],
              ),
          ),
          Request(
              custom_id="my-second-request",
              params=MessageCreateParamsNonStreaming(
                  model="claude-opus-5",
                  max_tokens=1024,
                  system=[
                      {
                          "type": "text",
                          "text": "You are an AI assistant tasked with analyzing literary works. Your goal is to provide insightful commentary on themes, characters, and writing style.\n",
                      },
                      {
                          "type": "text",
                          "text": "<the entire contents of Pride and Prejudice>",
                          "cache_control": {"type": "ephemeral"},
                      },
                  ],
                  messages=[
                      {
                          "role": "user",
                          "content": "Write a summary of Pride and Prejudice.",
                      }
                  ],
              ),
          ),
      ]
  )
  ```

  ```typescript TypeScript
  const client = new Anthropic();

  const messageBatch = await client.messages.batches.create({
    requests: [
      {
        custom_id: "my-first-request",
        params: {
          model: "claude-opus-5",
          max_tokens: 1024,
          system: [
            {
              type: "text",
              text: "You are an AI assistant tasked with analyzing literary works. Your goal is to provide insightful commentary on themes, characters, and writing style.\n"
            },
            {
              type: "text",
              text: "<the entire contents of Pride and Prejudice>",
              cache_control: { type: "ephemeral" }
            }
          ],
          messages: [
            { role: "user", content: "Analyze the major themes in Pride and Prejudice." }
          ]
        }
      },
      {
        custom_id: "my-second-request",
        params: {
          model: "claude-opus-5",
          max_tokens: 1024,
          system: [
            {
              type: "text",
              text: "You are an AI assistant tasked with analyzing literary works. Your goal is to provide insightful commentary on themes, characters, and writing style.\n"
            },
            {
              type: "text",
              text: "<the entire contents of Pride and Prejudice>",
              cache_control: { type: "ephemeral" }
            }
          ],
          messages: [{ role: "user", content: "Write a summary of Pride and Prejudice." }]
        }
      }
    ]
  });
  ```

  ```csharp C#
  using Anthropic;
  using Anthropic.Models.Messages;
  using Anthropic.Models.Messages.Batches;

  AnthropicClient client = new()
  {
      ApiKey = Environment.GetEnvironmentVariable("ANTHROPIC_API_KEY")
  };

  var messageBatch = await client.Messages.Batches.Create(new BatchCreateParams
  {
      Requests =
      [
          new()
          {
              CustomID = "my-first-request",
              Params = new()
              {
                  Model = Model.ClaudeOpus5,
                  MaxTokens = 1024,
                  System = new List<TextBlockParam>
                  {
                      new()
                      {
                          Text = "You are an AI assistant tasked with analyzing literary works. Your goal is to provide insightful commentary on themes, characters, and writing style.\n"
                      },
                      new()
                      {
                          Text = "<the entire contents of Pride and Prejudice>",
                          CacheControl = new()
                      }
                  },
                  Messages =
                  [
                      new() { Role = Role.User, Content = "Analyze the major themes in Pride and Prejudice." }
                  ]
              }
          },
          new()
          {
              CustomID = "my-second-request",
              Params = new()
              {
                  Model = Model.ClaudeOpus5,
                  MaxTokens = 1024,
                  System = new List<TextBlockParam>
                  {
                      new()
                      {
                          Text = "You are an AI assistant tasked with analyzing literary works. Your goal is to provide insightful commentary on themes, characters, and writing style.\n"
                      },
                      new()
                      {
                          Text = "<the entire contents of Pride and Prejudice>",
                          CacheControl = new()
                      }
                  },
                  Messages =
                  [
                      new() { Role = Role.User, Content = "Write a summary of Pride and Prejudice." }
                  ]
              }
          }
      ]
  });
  ```

  ```go Go
  client := anthropic.NewClient()

  messageBatch, err := client.Messages.Batches.New(context.TODO(), anthropic.MessageBatchNewParams{
  	Requests: []anthropic.MessageBatchNewParamsRequest{
  		{
  			CustomID: "my-first-request",
  			Params: anthropic.MessageBatchNewParamsRequestParams{
  				Model:     anthropic.ModelClaudeOpus5,
  				MaxTokens: 1024,
  				System: []anthropic.TextBlockParam{
  					{
  						Text: "You are an AI assistant tasked with analyzing literary works. Your goal is to provide insightful commentary on themes, characters, and writing style.\n",
  					},
  					{
  						Text:         "<the entire contents of Pride and Prejudice>",
  						CacheControl: anthropic.NewCacheControlEphemeralParam(),
  					},
  				},
  				Messages: []anthropic.MessageParam{
  					anthropic.NewUserMessage(anthropic.NewTextBlock("Analyze the major themes in Pride and Prejudice.")),
  				},
  			},
  		},
  		{
  			CustomID: "my-second-request",
  			Params: anthropic.MessageBatchNewParamsRequestParams{
  				Model:     anthropic.ModelClaudeOpus5,
  				MaxTokens: 1024,
  				System: []anthropic.TextBlockParam{
  					{
  						Text: "You are an AI assistant tasked with analyzing literary works. Your goal is to provide insightful commentary on themes, characters, and writing style.\n",
  					},
  					{
  						Text:         "<the entire contents of Pride and Prejudice>",
  						CacheControl: anthropic.NewCacheControlEphemeralParam(),
  					},
  				},
  				Messages: []anthropic.MessageParam{
  					anthropic.NewUserMessage(anthropic.NewTextBlock("Write a summary of Pride and Prejudice.")),
  				},
  			},
  		},
  	},
  })
  if err != nil {
  	log.Fatal(err)
  }
  fmt.Println(messageBatch)
  ```

  ```java Java
  import com.anthropic.models.messages.CacheControlEphemeral;
  // ...
  import com.anthropic.models.messages.batches.*;
  // ...
      AnthropicClient client = AnthropicOkHttpClient.fromEnv();

      BatchCreateParams createParams = BatchCreateParams.builder()
        .addRequest(
          BatchCreateParams.Request.builder()
            .customId("my-first-request")
            .params(
              BatchCreateParams.Request.Params.builder()
                .model(Model.CLAUDE_OPUS_5)
                .maxTokens(1024)
                .systemOfTextBlockParams(
                  List.of(
                    TextBlockParam.builder()
                      .text(
                        "You are an AI assistant tasked with analyzing literary works. Your goal is to provide insightful commentary on themes, characters, and writing style.\n"
                      )
                      .build(),
                    TextBlockParam.builder()
                      .text("<the entire contents of Pride and Prejudice>")
                      .cacheControl(CacheControlEphemeral.builder().build())
                      .build()
                  )
                )
                .addUserMessage("Analyze the major themes in Pride and Prejudice.")
                .build()
            )
            .build()
        )
        .addRequest(
          BatchCreateParams.Request.builder()
            .customId("my-second-request")
            .params(
              BatchCreateParams.Request.Params.builder()
                .model(Model.CLAUDE_OPUS_5)
                .maxTokens(1024)
                .systemOfTextBlockParams(
                  List.of(
                    TextBlockParam.builder()
                      .text(
                        "You are an AI assistant tasked with analyzing literary works. Your goal is to provide insightful commentary on themes, characters, and writing style.\n"
                      )
                      .build(),
                    TextBlockParam.builder()
                      .text("<the entire contents of Pride and Prejudice>")
                      .cacheControl(CacheControlEphemeral.builder().build())
                      .build()
                  )
                )
                .addUserMessage("Write a summary of Pride and Prejudice.")
                .build()
            )
            .build()
        )
        .build();

      MessageBatch messageBatch = client.messages().batches().create(createParams);
  ```

  ```php PHP
  $client = new Client();

  $messageBatch = $client->messages->batches->create(
      requests: [
          [
              'custom_id' => 'my-first-request',
              'params' => [
                  'model' => 'claude-opus-5',
                  'max_tokens' => 1024,
                  'system' => [
                      [
                          'type' => 'text',
                          'text' => 'You are an AI assistant tasked with analyzing literary works. Your goal is to provide insightful commentary on themes, characters, and writing style.\n'
                      ],
                      [
                          'type' => 'text',
                          'text' => '<the entire contents of Pride and Prejudice>',
                          'cache_control' => ['type' => 'ephemeral']
                      ]
                  ],
                  'messages' => [
                      ['role' => 'user', 'content' => 'Analyze the major themes in Pride and Prejudice.']
                  ]
              ]
          ],
          [
              'custom_id' => 'my-second-request',
              'params' => [
                  'model' => 'claude-opus-5',
                  'max_tokens' => 1024,
                  'system' => [
                      [
                          'type' => 'text',
                          'text' => 'You are an AI assistant tasked with analyzing literary works. Your goal is to provide insightful commentary on themes, characters, and writing style.\n'
                      ],
                      [
                          'type' => 'text',
                          'text' => '<the entire contents of Pride and Prejudice>',
                          'cache_control' => ['type' => 'ephemeral']
                      ]
                  ],
                  'messages' => [
                      ['role' => 'user', 'content' => 'Write a summary of Pride and Prejudice.']
                  ]
              ]
          ]
      ],
  );
  ```

  ```ruby Ruby
  client = Anthropic::Client.new

  message_batch = client.messages.batches.create(
    requests: [
      {
        custom_id: "my-first-request",
        params: {
          model: "claude-opus-5",
          max_tokens: 1024,
          system: [
            {
              type: "text",
              text: "You are an AI assistant tasked with analyzing literary works. Your goal is to provide insightful commentary on themes, characters, and writing style.\n"
            },
            {
              type: "text",
              text: "<the entire contents of Pride and Prejudice>",
              cache_control: { type: "ephemeral" }
            }
          ],
          messages: [
            { role: "user", content: "Analyze the major themes in Pride and Prejudice." }
          ]
        }
      },
      {
        custom_id: "my-second-request",
        params: {
          model: "claude-opus-5",
          max_tokens: 1024,
          system: [
            {
              type: "text",
              text: "You are an AI assistant tasked with analyzing literary works. Your goal is to provide insightful commentary on themes, characters, and writing style.\n"
            },
            {
              type: "text",
              text: "<the entire contents of Pride and Prejudice>",
              cache_control: { type: "ephemeral" }
            }
          ],
          messages: [
            { role: "user", content: "Write a summary of Pride and Prejudice." }
          ]
        }
      }
    ]
  )
  ```

In this example, both requests in the batch include identical system messages and the full text of Pride and Prejudice marked with `cache_control` to increase the likelihood of cache hits.

### Server tools and the agentic loop

All [server tools](https://platform.claude.com/docs/en/agents-and-tools/tool-use/server-tools) (web search, web fetch, code execution, MCP connectors, advisor, and tool search) work in batch requests. The batch worker runs the same server-side agentic loop as the synchronous Messages API.

Because there is no open connection to maintain, the batch loop runs **more iterations per turn** than a synchronous request before it returns `stop_reason: "pause_turn"`. If a batch result comes back with `pause_turn`, the turn did not finish; you can continue it by submitting the paused assistant content in a follow-up request (batch or synchronous) exactly as shown in the [pause\_turn continuation pattern](https://platform.claude.com/docs/en/agents-and-tools/tool-use/server-tools#the-server-side-loop-and-pause-turn).

The batch worker additionally throttles `web_search` per organization so that highly concurrent batch processing does not exhaust your organization's web-search rate limit. The batch retries throttled requests automatically; you don't need to handle this yourself, but very large web-search batches might take longer to complete.

### Extended output (beta)

The `output-300k-2026-03-24` beta header raises the `max_tokens` cap to 300,000 for batch requests using Claude Opus 5, Claude Opus 4.8, Claude Opus 4.7, Claude Opus 4.6, Claude Sonnet 5, or Claude Sonnet 4.6. Include the header to generate outputs far longer than the standard 128k `max_tokens` limit in a single turn.

  Extended output is available on the Message Batches API only, not the synchronous Messages API. It is supported on the Claude API and Claude Platform on AWS, and is not currently available on Amazon Bedrock, Google Cloud, or Microsoft Foundry.

Use extended output for long-form generation such as book-length drafts and technical documentation, exhaustive structured data extraction, large code-generation scaffolds, and long reasoning chains.

A single 300k-token generation can take over an hour to complete, so plan your batch submissions with the 24-hour processing window in mind. Standard batch pricing (50% of standard API prices) applies.

  ```bash cURL
  curl https://api.anthropic.com/v1/messages/batches \
       --header "x-api-key: $ANTHROPIC_API_KEY" \
       --header "anthropic-version: 2023-06-01" \
       --header "anthropic-beta: output-300k-2026-03-24" \
       --header "content-type: application/json" \
       --data \
  '{
      "requests": [
          {
              "custom_id": "long-form-request",
              "params": {
                  "model": "claude-opus-5",
                  "max_tokens": 300000,
                  "messages": [
                      {"role": "user", "content": "Write a comprehensive technical guide to building distributed systems, covering architecture patterns, consistency models, fault tolerance, and operational best practices."}
                  ]
              }
          }
      ]
  }'
  ```

  ```bash CLI
  ant beta:messages:batches create --beta output-300k-2026-03-24 <<'YAML'
  requests:
    - custom_id: long-form-request
      params:
        model: claude-opus-5
        max_tokens: 300000
        messages:
          - role: user
            content: >-
              Write a comprehensive technical guide to building distributed
              systems, covering architecture patterns, consistency models,
              fault tolerance, and operational best practices.
  YAML
  ```

  ```python Python
  from anthropic.types.beta.message_create_params import MessageCreateParamsNonStreaming
  from anthropic.types.beta.messages.batch_create_params import Request

  client = anthropic.Anthropic()

  message_batch = client.beta.messages.batches.create(
      betas=["output-300k-2026-03-24"],
      requests=[
          Request(
              custom_id="long-form-request",
              params=MessageCreateParamsNonStreaming(
                  model="claude-opus-5",
                  max_tokens=300_000,
                  messages=[
                      {
                          "role": "user",
                          "content": "Write a comprehensive technical guide to building distributed systems, covering architecture patterns, consistency models, fault tolerance, and operational best practices.",
                      }
                  ],
              ),
          ),
      ],
  )

  print(message_batch)
  ```

  ```typescript TypeScript
  const client = new Anthropic();

  const messageBatch = await client.beta.messages.batches.create({
    betas: ["output-300k-2026-03-24"],
    requests: [
      {
        custom_id: "long-form-request",
        params: {
          model: "claude-opus-5",
          max_tokens: 300000,
          messages: [
            {
              role: "user",
              content:
                "Write a comprehensive technical guide to building distributed systems, covering architecture patterns, consistency models, fault tolerance, and operational best practices."
            }
          ]
        }
      }
    ]
  });

  console.log(messageBatch);
  ```

  ```csharp C#
  using Anthropic;
  using Anthropic.Models.Beta.Messages;
  using Anthropic.Models.Beta.Messages.Batches;
  using Model = Anthropic.Models.Messages.Model;

  AnthropicClient client = new();

  var batch = await client.Beta.Messages.Batches.Create(new BatchCreateParams
  {
      Betas = ["output-300k-2026-03-24"],
      Requests =
      [
          new()
          {
              CustomID = "long-form-request",
              Params = new()
              {
                  Model = Model.ClaudeOpus5,
                  MaxTokens = 300_000,
                  Messages =
                  [
                      new() { Role = Role.User, Content = "Write a comprehensive technical guide to building distributed systems, covering architecture patterns, consistency models, fault tolerance, and operational best practices." }
                  ]
              }
          }
      ]
  });

  Console.WriteLine(batch);
  ```

  ```go Go
  client := anthropic.NewClient()

  batch, err := client.Beta.Messages.Batches.New(context.Background(),
  	anthropic.BetaMessageBatchNewParams{
  		Betas: []anthropic.AnthropicBeta{"output-300k-2026-03-24"},
  		Requests: []anthropic.BetaMessageBatchNewParamsRequest{
  			{
  				CustomID: "long-form-request",
  				Params: anthropic.BetaMessageBatchNewParamsRequestParams{
  					Model:     anthropic.ModelClaudeOpus5,
  					MaxTokens: 300_000,
  					Messages: []anthropic.BetaMessageParam{
  						anthropic.NewBetaUserMessage(
  							anthropic.NewBetaTextBlock("Write a comprehensive technical guide to building distributed systems, covering architecture patterns, consistency models, fault tolerance, and operational best practices."),
  						),
  					},
  				},
  			},
  		},
  	})
  if err != nil {
  	panic(err)
  }

  fmt.Println(batch.ID)
  ```

  ```java Java
  import com.anthropic.models.beta.messages.batches.*;

  void main() {
    AnthropicClient client = AnthropicOkHttpClient.fromEnv();

    BatchCreateParams params = BatchCreateParams.builder()
      .addBeta("output-300k-2026-03-24")
      .addRequest(
        BatchCreateParams.Request.builder()
          .customId("long-form-request")
          .params(
            BatchCreateParams.Request.Params.builder()
              .model(Model.CLAUDE_OPUS_5)
              .maxTokens(300_000L)
              .addUserMessage("Write a comprehensive technical guide to building distributed systems, covering architecture patterns, consistency models, fault tolerance, and operational best practices.")
              .build()
          )
          .build()
      )
      .build();

    BetaMessageBatch messageBatch = client.beta().messages().batches().create(params);

    IO.println(messageBatch);
  }
  ```

  ```php PHP
  $client = new Client();

  $batch = $client->beta->messages->batches->create(
      betas: ['output-300k-2026-03-24'],
      requests: [
          [
              'custom_id' => 'long-form-request',
              'params' => [
                  'model' => 'claude-opus-5',
                  'max_tokens' => 300_000,
                  'messages' => [
                      ['role' => 'user', 'content' => 'Write a comprehensive technical guide to building distributed systems, covering architecture patterns, consistency models, fault tolerance, and operational best practices.']
                  ]
              ]
          ]
      ],
  );

  echo $batch->id;
  ```

  ```ruby Ruby
  client = Anthropic::Client.new

  batch = client.beta.messages.batches.create(
    betas: ["output-300k-2026-03-24"],
    requests: [
      {
        custom_id: "long-form-request",
        params: {
          model: "claude-opus-5",
          max_tokens: 300_000,
          messages: [
            { role: "user", content: "Write a comprehensive technical guide to building distributed systems, covering architecture patterns, consistency models, fault tolerance, and operational best practices." }
          ]
        }
      }
    ]
  )

  puts batch
  ```

### Best practices for effective batching

To get the most out of the Batches API:

* Monitor batch processing status regularly and implement appropriate retry logic for failed requests.
* Use meaningful `custom_id` values to easily match results with requests, since order is not guaranteed.
* Consider breaking very large datasets into multiple batches for better manageability.
* Dry run a single request shape with the Messages API to avoid validation errors.

### Troubleshooting common issues

If experiencing unexpected behavior:

* Verify that the total batch request size doesn't exceed 256 MB. If the request size is too large, you may get a 413 `request_too_large` error.
* Check that you're using [supported models](https://platform.claude.com/docs/en/build-with-claude/batch-processing#supported-models) for all requests in the batch.
* Ensure each request in the batch has a unique `custom_id`.
* Ensure that it has been less than 29 days since batch `created_at` (not processing `ended_at`) time. If over 29 days have passed, results will no longer be viewable.
* Confirm that the batch has not been canceled.

Note that the failure of one request in a batch does not affect the processing of other requests.
