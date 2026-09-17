---
title: "Realtime with tools"
sourceId: "01-foundations/openai-api-docs-en"
sourceTitle: "OpenAI API 文档（英文）"
sourceKind: "官方文档"
licenseLabel: "仅引用"
lang: "英文"
tier: 3
volume: "01-foundations"
sourceUrl: "https://developers.openai.com/api/docs"
entryUrl: "https://developers.openai.com/api/docs"
sourceRel: "api/docs/guides/realtime-mcp.md"
rawUrl: "/raw/01-foundations/openai-api-docs-en/api/docs/guides/realtime-mcp.md"
sourceSha256: "932c175e255151ece8f8f47feb15ed82de285a2d6a5896b1dfd820eadaff3750"
pageSha256: "932c175e255151ece8f8f47feb15ed82de285a2d6a5896b1dfd820eadaff3750"
contentMode: "local-full"
zh: ""
---

# Realtime with tools

> For the complete documentation index, see [llms.txt](https://developers.openai.com/llms.txt). Markdown versions of documentation pages are available by appending `.md` to the page URL.

You can attach tools to a Realtime session so the model can look up data, take actions, or call services during a live conversation. Tool configuration uses the same event surface whether your client is using a [WebRTC data channel](https://developers.openai.com/api/docs/guides/voice-webrtc?api=realtime) or a [WebSocket](https://developers.openai.com/api/docs/guides/voice-websockets?api=realtime).

Use function tools when your application should execute the tool and return the result. Use MCP tools or built-in connectors when the Realtime API should connect to a remote tool server for you.

## Choose a tool type

| Tool type                 | Use when                                                                             | Who executes it                                                                    |
| ------------------------- | ------------------------------------------------------------------------------------ | ---------------------------------------------------------------------------------- |
| `function`                | Your application owns the business logic, approval checks, or private system access. | Your client or server receives a function call and returns `function_call_output`. |
| `mcp` with `server_url`   | You want the model to call tools exposed by a remote MCP server.                     | The Realtime API calls the remote MCP server.                                      |
| `mcp` with `connector_id` | You want to use a built-in connector such as Google Calendar.                        | The Realtime API calls the connector with the authorization you provide.           |

Add tools in **one of two places**:

- At the **session level** with `session.tools` in [`session.update`](https://developers.openai.com/api/reference/resources/realtime), if you want the tool available for the full session.
- At the **response level** with `response.tools` in [`response.create`](https://developers.openai.com/api/reference/resources/realtime), if you only need the tool for one turn.

## Configure a function tool

Function tools are the right default when the tool should run in your application. The model emits function call arguments, your code executes the action, and your code sends the result back with a `function_call_output` item.

Configure a function tool with session.update

```javascript
const event = {
  type: "session.update",
  session: {
    type: "realtime",
    model: "gpt-realtime-2.1",
    tools: [
      {
        type: "function",
        name: "lookup_order",
        description: "Look up an order by its order number.",
        parameters: {
          type: "object",
          properties: {
            order_number: {
              type: "string",
              description: "The customer-facing order number.",
            },
          },
          required: ["order_number"],
        },
      },
    ],
    tool_choice: "auto",
  },
};

ws.send(JSON.stringify(event));
```

```python
event = {
    "type": "session.update",
    "session": {
        "type": "realtime",
        "model": "gpt-realtime-2.1",
        "tools": [
            {
                "type": "function",
                "name": "lookup_order",
                "description": "Look up an order by its order number.",
                "parameters": {
                    "type": "object",
                    "properties": {
                        "order_number": {
                            "type": "string",
                            "description": "The customer-facing order number.",
                        }
                    },
                    "required": ["order_number"],
                },
            }
        ],
        "tool_choice": "auto",
    },
}

ws.send(json.dumps(event))
```

```ruby
connection.session.update(
  type: :realtime,
  model: "gpt-realtime-2.1",
  tools: [{
    type: :function,
    name: "lookup_order",
    description: "Look up an order by its order number.",
    parameters: {
      type: "object",
      properties: {
        order_number: {
          type: "string",
          description: "The customer-facing order number."
        }
      },
      required: ["order_number"]
    }
  }],
  tool_choice: :auto
)
```

When the model calls the function, listen for the function call item, run your application logic, then send the output back:

Send function call output

```javascript
const event = {
  type: "conversation.item.create",
  item: {
    type: "function_call_output",
    call_id: functionCall.call_id,
    output: JSON.stringify({
      status: "shipped",
      delivery_date: "2026-05-09",
    }),
  },
};

ws.send(JSON.stringify(event));
ws.send(JSON.stringify({ type: "response.create" }));
```

```python
event = {
    "type": "conversation.item.create",
    "item": {
        "type": "function_call_output",
        "call_id": function_call["call_id"],
        "output": json.dumps(
            {
                "status": "shipped",
                "delivery_date": "2026-05-09",
            }
        ),
    },
}

ws.send(json.dumps(event))
ws.send(json.dumps({"type": "response.create"}))
```

```ruby
connection.conversation.items.create(
  type: :function_call_output,
  call_id: call_id,
  output: JSON.generate(status: "shipped", delivery_date: "2026-05-09")
)
connection.response.create(tool_choice: :none)
```

For a full event-by-event walkthrough of function calling, see [Managing conversations](https://developers.openai.com/api/docs/guides/realtime-conversations#function-calling).

## Configure an MCP tool

MCP tools are useful when the tool already exists behind a remote MCP server, or when you want to use an OpenAI-managed connector. Unlike function tools, MCP tools are executed by the Realtime API itself.

In Realtime, the MCP tool shape is:

- `type: "mcp"`
- `server_label`
- One of `server_url` or `connector_id`
- Optional `authorization` and `headers`
- Optional `allowed_tools`
- Optional `require_approval`
- Optional `server_description`

This example makes a docs MCP server available for the full session:

Configure an MCP tool with session.update

```javascript
const event = {
  type: "session.update",
  session: {
    type: "realtime",
    model: "gpt-realtime-2.1",
    output_modalities: ["text"],
    tools: [
      {
        type: "mcp",
        server_label: "openai_docs",
        server_url: "https://developers.openai.com/mcp",
        allowed_tools: ["search_openai_docs", "fetch_openai_doc"],
        require_approval: "never",
      },
    ],
  },
};

ws.send(JSON.stringify(event));
```

```python
event = {
    "type": "session.update",
    "session": {
        "type": "realtime",
        "model": "gpt-realtime-2.1",
        "output_modalities": ["text"],
        "tools": [
            {
                "type": "mcp",
                "server_label": "openai_docs",
                "server_url": "https://developers.openai.com/mcp",
                "allowed_tools": ["search_openai_docs", "fetch_openai_doc"],
                "require_approval": "never",
            }
        ],
    },
}

ws.send(json.dumps(event))
```

```ruby
connection.session.update(
  type: :realtime,
  model: "gpt-realtime-2.1",
  output_modalities: [:text],
  tools: [{
    type: :mcp,
    server_label: "openai_docs",
    server_url: "https://developers.openai.com/mcp",
    allowed_tools: ["search_openai_docs", "fetch_openai_doc"],
    require_approval: :never
  }]
)
```

Built-in connectors use the same MCP tool shape, but pass `connector_id`
instead of `server_url`. For example, Google Calendar uses
`connector_googlecalendar`. In Realtime, use these built-in connectors for read
actions, such as searching or reading events or emails. Pass the user's OAuth
access token in `authorization`, and narrow the tool surface with
`allowed_tools` when possible:

Configure a Google Calendar connector

```javascript
const event = {
  type: "session.update",
  session: {
    type: "realtime",
    model: "gpt-realtime-2.1",
    output_modalities: ["text"],
    tools: [
      {
        type: "mcp",
        server_label: "google_calendar",
        connector_id: "connector_googlecalendar",
