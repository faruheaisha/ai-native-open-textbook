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
sourceRel: "docs/en/managed-agents/self-hosted-sandboxes.md"
rawUrl: "/raw/01-foundations/anthropic-platform-docs-en/docs/en/managed-agents/self-hosted-sandboxes.md"
sourceSha256: "1f7859dc89e17f00a3dc7ec93296471611247acca42ed2149c714b5102c1ac2b"
pageSha256: "246109dcc91eefbff27e0c2505f5b19329d2148e38f4161cd35b9b8aaa4b17a0"
contentMode: "local-full"
zh: ""
---

## Serve custom tools from your sandbox

[Custom tools](https://platform.claude.com/docs/en/managed-agents/tools#custom-tools) are tools your own code executes: the agent emits an `agent.custom_tool_use` event and waits for a matching `user.custom_tool_result`. The worker can be that code, and because it runs inside your sandbox, the tool reaches the internal services, credentials, and network egress you configured for the sandbox, and nothing more. The environment key authorizes posting custom tool results, so your Claude API key stays off the worker host.

  Serving custom tools requires the SDK worker: the `ant` CLI worker has no way to register a custom tool implementation. In the sandbox-per-session pattern, run `EnvironmentWorker` inside the sandbox with `handle_item()` (`handleItem` in TypeScript, `HandleItem` in Go) in place of `ant beta:worker run`.

    Add a `custom` entry to the agent's `tools` whose `name` matches the tool your worker registers. See [Custom tools](https://platform.claude.com/docs/en/managed-agents/tools#custom-tools) for the full declaration shape.

    ```json
    \{
      "type": "custom",
      "name": "get_order_status",
      "description": "Look up an order in the internal fulfillment system by order ID.",
      "input_schema": \{
        "type": "object",
        "properties": \{
          "order_id": \{ "type": "string", "description": "The order ID" \}
        \},
        "required": ["order_id"]
      \}
    \}
    ```

    Pass the tool through the worker's `tools` factory (see [SDK helpers](https://platform.claude.com/docs/en/managed-agents/self-hosted-sandboxes#sdk-helpers)), alongside the built-in toolset:

      ```python Python
      import asyncio
      import os
      from anthropic import AsyncAnthropic, beta_async_tool
      from anthropic.lib.environments import EnvironmentWorker
      from anthropic.lib.tools.agent_toolset import beta_agent_toolset_20260401

      @beta_async_tool
      async def get_order_status(order_id: str) -> str:
          """Look up an order in the internal fulfillment system by order ID."""
          # Runs on the worker host: call anything the sandbox can reach.
          return f"Order \{order_id\}: shipped"

      async def main() -> None:
          environment_key = os.environ["ANTHROPIC_ENVIRONMENT_KEY"]
          environment_id = os.environ["ANTHROPIC_ENVIRONMENT_ID"]
          async with AsyncAnthropic(auth_token=environment_key) as client:
              await EnvironmentWorker(
                  client,
                  environment_id=environment_id,
                  environment_key=environment_key,
                  workdir="/workspace",
                  tools=lambda env: [*beta_agent_toolset_20260401(env), get_order_status],
              ).run()

      asyncio.run(main())
      ```

      ```typescript TypeScript
      import Anthropic from "@anthropic-ai/sdk";
      import \{ EnvironmentWorker \} from "@anthropic-ai/sdk/helpers/beta/environments";
      import \{ betaTool \} from "@anthropic-ai/sdk/helpers/beta/json-schema";
      import \{ betaAgentToolset20260401 \} from "@anthropic-ai/sdk/tools/agent-toolset/node";

      const getOrderStatus = betaTool(\{
        name: "get_order_status",
        description: "Look up an order in the internal fulfillment system by order ID.",
        inputSchema: \{
          type: "object",
          properties: \{ order_id: \{ type: "string", description: "The order ID" \} \},
          required: ["order_id"]
        \},
        // Runs on the worker host: call anything the sandbox can reach.
        run: async (\{ order_id \}) => `Order $\{order_id\}: shipped`
      \});

      const environmentKey = process.env.ANTHROPIC_ENVIRONMENT_KEY!;
      const environmentId = process.env.ANTHROPIC_ENVIRONMENT_ID!;
      const client = new Anthropic(\{ authToken: environmentKey \});
      const controller = new AbortController();
      process.once("SIGTERM", () => controller.abort());

      await new EnvironmentWorker(\{
        client,
        environmentId,
        environmentKey,
        workdir: "/workspace",
        signal: controller.signal,
        tools: (ctx) => [...betaAgentToolset20260401(ctx), getOrderStatus]
      \}).run();
      ```

      ```csharp C#
      // EnvironmentWorker is not currently available in the C# SDK.
      // To answer custom tool calls directly, see the session event stream.
      ```

      ```go Go
      package main

      import (
      	"context"
      	"log"
      	"os"
      	"os/signal"
      	"syscall"

      	"github.com/anthropics/anthropic-sdk-go"
      	"github.com/anthropics/anthropic-sdk-go/lib/environments"
      	"github.com/anthropics/anthropic-sdk-go/option"
      	"github.com/anthropics/anthropic-sdk-go/toolrunner"
      	"github.com/anthropics/anthropic-sdk-go/tools/agenttoolset"
      )

      type orderStatusInput struct \{
      	OrderID string `json:"order_id"`
      \}

      func main() \{
      	environmentKey := os.Getenv("ANTHROPIC_ENVIRONMENT_KEY")
      	environmentID := os.Getenv("ANTHROPIC_ENVIRONMENT_ID")

      	ctx, stop := signal.NotifyContext(context.Background(), os.Interrupt, syscall.SIGTERM)
      	defer stop()

      	getOrderStatus := toolrunner.NewBetaTool(
      		"get_order_status",
      		"Look up an order in the internal fulfillment system by order ID.",
      		anthropic.BetaToolInputSchemaParam\{
      			Properties: map[string]any\{
      				"order_id": map[string]any\{"type": "string", "description": "The order ID"\},
      			\},
      			Required: []string\{"order_id"\},
      		\},
      		// Runs on the worker host: call anything the sandbox can reach.
      		func(ctx context.Context, input orderStatusInput) (anthropic.BetaToolResultBlockParamContentUnion, error) \{
      			return anthropic.BetaToolResultBlockParamContentUnion\{
      				OfText: &anthropic.BetaTextBlockParam\{Text: "Order " + input.OrderID + ": shipped"\},
      			\}, nil
      		\},
      	)

      	client := anthropic.NewClient(option.WithAuthToken(environmentKey))

      	worker := environments.NewEnvironmentWorker(client, environments.EnvironmentWorkerOptions\{
      		EnvironmentID:  environmentID,
      		EnvironmentKey: environmentKey,
      		Workdir:        "/workspace",
      		ToolsFunc: func(env *agenttoolset.AgentToolContext) []anthropic.BetaTool \{
      			return append(agenttoolset.BetaAgentToolset20260401(env), getOrderStatus)
      		\},
      	\})
      	if err := worker.Run(ctx); err != nil \{
      		log.Fatalf("worker: %v", err)
      	\}
      \}

      ```

      ```java Java
      // EnvironmentWorker is not currently available in the Java SDK.
      // To answer custom tool calls directly, see the session event stream.
      ```

      ```php PHP
      // EnvironmentWorker is not currently available in the PHP SDK.
      // To answer custom tool calls directly, see the session event stream.
      ```

      ```ruby Ruby
      # EnvironmentWorker is not currently available in the Ruby SDK.
      # To answer custom tool calls directly, see the session event stream.
      ```
```
```

The worker answers only the tools registered with it. A custom tool that is declared on the agent but registered with no worker or client leaves the session paused with a `requires_action` stop reason until something posts its result; see [Handling custom tool calls](https://platform.claude.com/docs/en/managed-agents/events-and-streaming#handling-custom-tool-calls) for the event flow.

### Wrap an MCP server as custom tools

The [MCP connector](https://platform.claude.com/docs/en/managed-agents/mcp-connector) connects to MCP servers from Anthropic's side, so a server must expose an HTTP endpoint that Anthropic can reach, directly or through an [MCP tunnel](https://platform.claude.com/docs/en/agents-and-tools/mcp-tunnels/overview). To use a server that only your network can reach, make the worker the MCP client instead and declare the server's tools as custom tools. The MCP server needs no inbound connectivity from outside your network; Anthropic receives the tool definitions you declare on the agent, each call's input, and the result your worker posts back. At runtime the model calls a wrapped tool like any other custom tool:

1. The agent emits an `agent.custom_tool_use` event.
2. The worker, inside your sandbox, forwards the call over its open MCP session to the server on your network.
3. The worker posts the server's response as the `user.custom_tool_result`.

The SDKs' [Client-side MCP helpers](https://platform.claude.com/docs/en/agents-and-tools/mcp-connector#client-side-mcp-helpers) convert the server's tools into the runnable tools the worker accepts; install an MCP SDK alongside the Anthropic SDK (`pip install "anthropic[mcp]" "mcp>=1.24"`, `npm install @modelcontextprotocol/sdk`, `go get github.com/modelcontextprotocol/go-sdk`). The examples connect without authentication; to send credentials, configure the HTTP client or request options you hand to the MCP transport (`http_client` in Python, `requestInit` in TypeScript, `HTTPClient` in Go).

    List the MCP server's tools and declare each one as a `custom` tool; the MCP `name`, `description`, and `inputSchema` map one to one onto the custom tool's fields. If the server paginates its tool list, declare every page; the worker must list the same pages.

      ```python Python
      import asyncio
      from typing import Any, cast
      from anthropic import AsyncAnthropic
      from anthropic.types.beta import BetaManagedAgentsCustomToolParams
      from mcp import ClientSession, types
      # Requires mcp >= 1.24, which renamed streamablehttp_client to streamable_http_client.
      from mcp.client.streamable_http import streamable_http_client

      MCP_SERVER_URL = "http://mcp.internal.example.com:8000/mcp"

      def to_custom_tool(tool: types.Tool) -> BetaManagedAgentsCustomToolParams:
          # The MCP fields map one to one onto a custom tool declaration. The cast
          # hands the schema dictionary to the SDK's typed parameter unchanged.
          return \{
              "type": "custom",
              "name": tool.name,
              "description": tool.description or tool.name,
              "input_schema": cast(Any, tool.inputSchema),
          \}

      async def main() -> None:
          # Run this wherever you create agents, not on the worker host: it
          # authenticates with your Claude API key (ANTHROPIC_API_KEY).
          async with (
              streamable_http_client(MCP_SERVER_URL) as (read, write, _),
              ClientSession(read, write) as mcp_session,
              AsyncAnthropic() as client,
          ):
              await mcp_session.initialize()
              listed = await mcp_session.list_tools()
              agent = await client.beta.agents.create(
                  name="Internal tools agent",
                  model="claude-opus-5",
                  tools=[
                      \{"type": "agent_toolset_20260401"\},
                      *[to_custom_tool(tool) for tool in listed.tools],
                  ],
              )
              print(agent.id)

      asyncio.run(main())
      ```

      ```typescript TypeScript
      import Anthropic from "@anthropic-ai/sdk";
      import \{ Client \} from "@modelcontextprotocol/sdk/client/index.js";
      import \{ StreamableHTTPClientTransport \} from "@modelcontextprotocol/sdk/client/streamableHttp.js";

      const MCP_SERVER_URL = "http://mcp.internal.example.com:8000/mcp";

      // Run this wherever you create agents, not on the worker host: it
      // authenticates with your Claude API key (ANTHROPIC_API_KEY).
      const client = new Anthropic();

      const mcpClient = new Client(\{ name: "declare-agent-tools", version: "1.0.0" \});
      await mcpClient.connect(new StreamableHTTPClientTransport(new URL(MCP_SERVER_URL)));
      const \{ tools \} = await mcpClient.listTools();

      const agent = await client.beta.agents.create(\{
        name: "Internal tools agent",
        model: "claude-opus-5",
        tools: [
          \{ type: "agent_toolset_20260401" \},
          // The MCP fields map one to one onto a custom tool declaration.
          ...tools.map((tool) => (\{
            type: "custom" as const,
            name: tool.name,
            description: tool.description || tool.name,
            input_schema: tool.inputSchema
          \}))
        ]
      \});
      console.log(agent.id);

      await mcpClient.close();
      ```

      ```csharp C#
      // See the Python, TypeScript, and Go tabs. Declaring custom tools from
      // C# works the same way once you list the server's tools with an MCP client.
      ```

      ```go Go
      package main

      import (
      	"context"
      	"encoding/json"
      	"fmt"
      	"log"

      	"github.com/anthropics/anthropic-sdk-go"
      	mcpsdk "github.com/modelcontextprotocol/go-sdk/mcp"
      )

      const mcpServerURL = "http://mcp.internal.example.com:8000/mcp"

      // toCustomTool maps one MCP tool definition onto a custom tool declaration.
      // The fields map one to one: the typed parameter carries `properties` and
      // `required`, and every other JSON Schema keyword the server emits travels in
      // ExtraFields so the declared schema matches the server's schema.
      func toCustomTool(tool *mcpsdk.Tool) (anthropic.BetaAgentNewParamsToolUnion, error) \{
      	raw, err := json.Marshal(tool.InputSchema)
      	if err != nil \{
      		return anthropic.BetaAgentNewParamsToolUnion\{\}, err
      	\}
      	var schema map[string]any
      	if err := json.Unmarshal(raw, &schema); err != nil \{
      		return anthropic.BetaAgentNewParamsToolUnion\{\}, err
      	\}

      	inputSchema := anthropic.BetaManagedAgentsCustomToolInputSchemaParam\{ExtraFields: map[string]any\{&#125;&#125;
      	for keyword, value := range schema \{
      		switch keyword \{
      		case "type":
      			// The parameter type always marshals "type": "object".
      		case "properties":
      			properties, _ := value.(map[string]any)
      			inputSchema.Properties = properties
      		case "required":
      			entries, _ := value.([]any)
      			for _, entry := range entries \{
      				if name, isString := entry.(string); isString \{
      					inputSchema.Required = append(inputSchema.Required, name)
      				\}
      			\}
      		default:
      			inputSchema.ExtraFields[keyword] = value
      		\}
      	\}

      	description := tool.Description
      	if description == "" \{
      		description = tool.Name
      	\}
      	return anthropic.BetaAgentNewParamsToolUnion\{
      		OfCustom: &anthropic.BetaManagedAgentsCustomToolParams\{
      			Type:        anthropic.BetaManagedAgentsCustomToolParamsTypeCustom,
      			Name:        tool.Name,
      			Description: description,
      			InputSchema: inputSchema,
      		\},
      	\}, nil
      \}

      func main() \{
      	ctx := context.Background()

      	// Run this wherever you create agents, not on the worker host: it
      	// authenticates with your Claude API key (ANTHROPIC_API_KEY).
      	client := anthropic.NewClient()

      	mcpClient := mcpsdk.NewClient(&mcpsdk.Implementation\{Name: "declare-agent-tools", Version: "1.0.0"\}, nil)
      	session, err := mcpClient.Connect(ctx, &mcpsdk.StreamableClientTransport\{Endpoint: mcpServerURL\}, nil)
      	if err != nil \{
      		log.Fatalf("connect to MCP server: %v", err)
      	\}
      	defer session.Close()

      	listed, err := session.ListTools(ctx, nil)
      	if err != nil \{
      		log.Fatalf("list MCP tools: %v", err)
      	\}

      	tools := []anthropic.BetaAgentNewParamsToolUnion\{
      		\{OfAgentToolset20260401: &anthropic.BetaManagedAgentsAgentToolset20260401Params\{
      			Type: anthropic.BetaManagedAgentsAgentToolset20260401ParamsTypeAgentToolset20260401,
      		&#125;&#125;,
      	\}
      	for _, tool := range listed.Tools \{
      		custom, err := toCustomTool(tool)
      		if err != nil \{
      			log.Fatalf("convert MCP tool %s: %v", tool.Name, err)
      		\}
      		tools = append(tools, custom)
      	\}

      	agent, err := client.Beta.Agents.New(ctx, anthropic.BetaAgentNewParams\{
      		Name:  "Internal tools agent",
      		Model: anthropic.BetaManagedAgentsModelConfigParams\{ID: anthropic.BetaManagedAgentsModelClaudeOpus5\},
      		Tools: tools,
      	\})
      	if err != nil \{
      		log.Fatalf("create agent: %v", err)
      	\}
      	fmt.Println(agent.ID)
      \}

      ```

      ```java Java
      // See the Python, TypeScript, and Go tabs. Declaring custom tools from
      // Java works the same way once you list the server's tools with an MCP client.
      ```

      ```php PHP
      // See the Python, TypeScript, and Go tabs. Declaring custom tools from
      // PHP works the same way once you list the server's tools with an MCP client.
      ```

      ```ruby Ruby
      # See the Python, TypeScript, and Go tabs. Declaring custom tools from
      # Ruby works the same way once you list the server's tools with an MCP client.
      ```

    Connect to the same MCP server at startup, convert its tools with the MCP helpers, and register them alongside the built-in toolset. Keep one MCP session open for the life of the worker.

      ```python Python
      import asyncio
      import os
      from datetime import timedelta
      from anthropic import AsyncAnthropic
      from anthropic.lib.environments import EnvironmentWorker
      from anthropic.lib.tools.agent_toolset import beta_agent_toolset_20260401
      from anthropic.lib.tools.mcp import async_mcp_tool
      from mcp import ClientSession
      # Requires mcp >= 1.24, which renamed streamablehttp_client to streamable_http_client.
      from mcp.client.streamable_http import streamable_http_client

      MCP_SERVER_URL = "http://mcp.internal.example.com:8000/mcp"

      async def main() -> None:
          environment_key = os.environ["ANTHROPIC_ENVIRONMENT_KEY"]
          environment_id = os.environ["ANTHROPIC_ENVIRONMENT_ID"]
          # Connect to the MCP server once at startup and keep the session open for
          # the life of the worker. The timeout turns a hung tool call into an error
          # result instead of a stalled call.
          async with (
              streamable_http_client(MCP_SERVER_URL) as (read, write, _),
              ClientSession(read, write, read_timeout_seconds=timedelta(seconds=60)) as mcp_session,
              AsyncAnthropic(auth_token=environment_key) as client,
          ):
              await mcp_session.initialize()
              listed = await mcp_session.list_tools()
              mcp_tools = [async_mcp_tool(tool, mcp_session) for tool in listed.tools]
              await EnvironmentWorker(
                  client,
                  environment_id=environment_id,
                  environment_key=environment_key,
                  workdir="/workspace",
                  tools=lambda env: [*beta_agent_toolset_20260401(env), *mcp_tools],
              ).run()

      asyncio.run(main())
      ```

      ```typescript TypeScript
      import Anthropic from "@anthropic-ai/sdk";
      import \{ EnvironmentWorker \} from "@anthropic-ai/sdk/helpers/beta/environments";
      import \{
        mcpTools,
        type MCPCallToolResultLike,
        type MCPClientLike
      \} from "@anthropic-ai/sdk/helpers/beta/mcp";
      import \{ betaAgentToolset20260401 \} from "@anthropic-ai/sdk/tools/agent-toolset/node";
      import \{ Client \} from "@modelcontextprotocol/sdk/client/index.js";
      import \{ StreamableHTTPClientTransport \} from "@modelcontextprotocol/sdk/client/streamableHttp.js";

      const MCP_SERVER_URL = "http://mcp.internal.example.com:8000/mcp";

      const environmentKey = process.env.ANTHROPIC_ENVIRONMENT_KEY!;
      const environmentId = process.env.ANTHROPIC_ENVIRONMENT_ID!;
      const client = new Anthropic(\{ authToken: environmentKey \});
      const controller = new AbortController();
      process.once("SIGTERM", () => controller.abort());

      // Connect to the MCP server once at startup and keep the connection open for
      // the life of the worker.
      const mcpClient = new Client(\{ name: "sandbox-worker", version: "1.0.0" \});
      await mcpClient.connect(new StreamableHTTPClientTransport(new URL(MCP_SERVER_URL)));
      const \{ tools \} = await mcpClient.listTools();

      // The MCP SDK's callTool return type still includes a legacy result shape that
      // mcpTools does not accept; narrow it. Drop this once MCPClientLike widens.
      const mcpClientForTools: MCPClientLike = \{
        callTool: (params) => mcpClient.callTool(params) as Promise&lt;MCPCallToolResultLike>
      \};

      await new EnvironmentWorker(\{
        client,
        environmentId,
        environmentKey,
        workdir: "/workspace",
        signal: controller.signal,
        tools: (ctx) => [...betaAgentToolset20260401(ctx), ...mcpTools(tools, mcpClientForTools)]
      \}).run();
      ```

      ```csharp C#
      // EnvironmentWorker is not currently available in the C# SDK.
      ```

      ```go Go
      package main

      import (
      	"context"
      	"log"
      	"os"
      	"os/signal"
      	"syscall"

      	"github.com/anthropics/anthropic-sdk-go"
      	"github.com/anthropics/anthropic-sdk-go/lib/environments"
      	"github.com/anthropics/anthropic-sdk-go/mcp"
      	"github.com/anthropics/anthropic-sdk-go/option"
      	"github.com/anthropics/anthropic-sdk-go/tools/agenttoolset"
      	mcpsdk "github.com/modelcontextprotocol/go-sdk/mcp"
      )

      const mcpServerURL = "http://mcp.internal.example.com:8000/mcp"

      func main() \{
      	environmentKey := os.Getenv("ANTHROPIC_ENVIRONMENT_KEY")
      	environmentID := os.Getenv("ANTHROPIC_ENVIRONMENT_ID")

      	ctx, stop := signal.NotifyContext(context.Background(), os.Interrupt, syscall.SIGTERM)
      	defer stop()

      	client := anthropic.NewClient(option.WithAuthToken(environmentKey))

      	// Connect to the MCP server once at startup and keep the session open for
      	// the life of the worker.
      	mcpClient := mcpsdk.NewClient(&mcpsdk.Implementation\{Name: "sandbox-worker", Version: "1.0.0"\}, nil)
      	session, err := mcpClient.Connect(ctx, &mcpsdk.StreamableClientTransport\{Endpoint: mcpServerURL\}, nil)
      	if err != nil \{
      		log.Fatalf("connect to MCP server: %v", err)
      	\}
      	defer session.Close()

      	listed, err := session.ListTools(ctx, nil)
      	if err != nil \{
      		log.Fatalf("list MCP tools: %v", err)
      	\}
      	mcpTools, err := mcp.NewBetaTools(listed.Tools, session)
      	if err != nil \{
      		log.Fatalf("convert MCP tools: %v", err)
      	\}

      	worker := environments.NewEnvironmentWorker(client, environments.EnvironmentWorkerOptions\{
      		EnvironmentID:  environmentID,
      		EnvironmentKey: environmentKey,
      		Workdir:        "/workspace",
      		ToolsFunc: func(env *agenttoolset.AgentToolContext) []anthropic.BetaTool \{
      			return append(agenttoolset.BetaAgentToolset20260401(env), mcpTools...)
      		\},
      	\})
      	if err := worker.Run(ctx); err != nil \{
      		log.Fatalf("worker: %v", err)
      	\}
      \}

      ```

      ```java Java
      // EnvironmentWorker is not currently available in the Java SDK.
      ```

      ```php PHP
      // EnvironmentWorker is not currently available in the PHP SDK.
      ```

      ```ruby Ruby
      # EnvironmentWorker is not currently available in the Ruby SDK.
      ```
```
```

Keep the following in mind when you wrap an MCP server:

* **Tools are declared, not discovered at runtime.** The worker lists the MCP server's tools once at startup and cannot add tools to a running session. When the server's tools change, declare them again, on the agent or on an idle session through [Updating the agent configuration](https://platform.claude.com/docs/en/managed-agents/session-operations#updating-the-agent-configuration), and restart the worker.
* **Names and descriptions must fit the Managed Agents API.** Custom tool names are unique per agent and use letters, digits, underscores, and hyphens (1–128 characters); a non-empty description is required; and an agent's `tools` array takes at most 128 entries (each wrapped tool is one entry, and the built-in toolset is one more). The API rejects a declaration that reuses a tool name, names a custom tool after a built-in agent tool such as `bash` or `read`, or uses the reserved `mcp__` prefix. The MCP helpers keep the server's names and descriptions, so rename or trim where needed. When two servers expose the same tool name, define the wrapper yourself under a prefixed name and have it call the server's original tool name.
* **Most schemas pass through unchanged.** The API accepts the JSON Schema keywords MCP servers commonly emit, such as `additionalProperties` and `title`. It rejects reference keywords such as `$ref` anywhere in a custom tool's `input_schema`, so inline the schemas that generators such as pydantic factor into `$defs`. It also rejects top-level `oneOf`, `anyOf`, and `allOf`, and property names outside letters, digits, underscores, dots, and hyphens (1–64 characters).
* **Tool failures surface as error tool results.** When the MCP server reports a tool error, the worker posts an error tool result the model can react to. MCP content with no tool result equivalent, such as audio blocks and resource links, also surfaces as an error. Set a timeout on the MCP client for a faster and clearer failure, as the Python worker example does with `read_timeout_seconds`. Without one, a hung call becomes an error result only when the TypeScript MCP SDK's default request timeout fires (about a minute) or when the worker's own backstop does: about two and a half minutes in Python, and two minutes in Go, where the worker cancels a tool call that outlives its 120-second default and posts an error result.
* **Wrap servers you operate or trust.** A wrapped tool's name, description, and results enter the model's context like any other tool's: untrusted input that can influence what the agent does with its other tools, including `bash` on the worker host. Declare only the tools you intend the agent to use.
* **Permission policies do not apply to custom tools.** [Permission policies](https://platform.claude.com/docs/en/managed-agents/permission-policies#custom-tools) govern the built-in and MCP toolsets; the worker executes every wrapped tool call the model makes, so put any approval step in your own tool code.
