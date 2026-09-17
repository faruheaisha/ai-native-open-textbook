---
title: "MCP server and UI quickstart"
sourceId: "11-personal-agents/openai-plugins-docs"
sourceTitle: "openai-plugins-docs"
sourceKind: "官方文档"
licenseLabel: "仅引用"
lang: "英文"
tier: 3
volume: "11-personal-agents"
sourceUrl: "https://developers.openai.com/plugins"
entryUrl: "https://developers.openai.com/plugins"
sourceRel: "plugins/build/app-quickstart.md"
rawUrl: "/raw/11-personal-agents/openai-plugins-docs/plugins/build/app-quickstart.md"
sourceSha256: "8f3ad902378c799ca44b1621bdb424a541457609e38cce3142b258d43f82775f"
pageSha256: "8f3ad902378c799ca44b1621bdb424a541457609e38cce3142b258d43f82775f"
contentMode: "local-full"
zh: ""
---

# MCP server and UI quickstart

> For the complete documentation index, see [llms.txt](https://developers.openai.com/llms.txt). Markdown versions of documentation pages are available by appending `.md` to the page URL.

## Introduction

Plugins use the [Model Context Protocol
(MCP)](https://developers.openai.com/plugins/concepts/mcp-server) to expose server-backed capabilities to
ChatGPT and Codex. This tutorial uses:

1. An MCP server that defines tools and exposes them to ChatGPT and Codex.
2. An optional web component, rendered in an iframe inside ChatGPT.

ChatGPT implements the open MCP Apps UI standard so you can build your UI once
and run it across MCP Apps-compatible hosts.

In this quickstart, we'll build a basic to-do workflow with UI contained in a
single HTML file that keeps the markup, CSS, and JavaScript together.

To see more advanced examples using React, see the [examples repository on GitHub](https://github.com/openai/openai-apps-sdk-examples).

## Build a web component

This step is optional. If you only need tools and no ChatGPT UI, skip to
  [Build an MCP server](#build-an-mcp-server) and do not register a UI resource.

Start by creating a file called `public/todo-widget.html` in a new directory.
ChatGPT will render this UI when the associated MCP tool returns it.
This file will contain the web component that will be rendered in the ChatGPT interface.

Add the following content:

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <title>Todo list</title>
    
  </head>
  <body>
    <main>
      <h2>Todo list</h2>
      <form id="add-form" autocomplete="off">
        <input id="todo-input" name="title" placeholder="Add a task" />
        <button type="submit">Add</button>
      </form>
      <ul id="todo-list"></ul>
    </main>

    
  </body>
</html>
```

### Use MCP Apps in your web component

For new UI, use the MCP Apps host bridge: JSON-RPC over `postMessage`
with `ui/*` notifications and methods such as `tools/call`.

After the shared MCP Apps flow works, add optional ChatGPT extensions through
`window.openai` only when you need capabilities the standard does not cover.
For details, see [Add UI to your MCP
server](https://developers.openai.com/plugins/build/chatgpt-ui#layer-on-chatgpt-extensions).

## Build an MCP server

Install the official Python or Node MCP SDK to create a server and expose a `/mcp` endpoint.

In this quickstart, we'll use the [Node SDK](https://github.com/modelcontextprotocol/typescript-sdk).

If you're using Python, refer to our [examples repository on GitHub](https://github.com/openai/openai-apps-sdk-examples) to see an example MCP server with the Python SDK.

Install the Node SDK, MCP Apps helpers, and the `zod` package with:

```bash
npm install @modelcontextprotocol/sdk @modelcontextprotocol/ext-apps zod
```

### MCP server with UI resources

Register a resource for your component bundle and the tools the model can call (for example, `add_todo` and `complete_todo`) so ChatGPT can drive the UI.

Create a file named `server.js` and paste the following example that uses the Node SDK:

```js

const todoHtml = readFileSync("public/todo-widget.html", "utf8");

const addTodoInputSchema = {
  title: z.string().min(1),
};

const completeTodoInputSchema = {
  id: z.string().min(1),
};

const todoOutputSchema = {
  tasks: z.array(
    z.object({
      id: z.string(),
      title: z.string(),
      completed: z.boolean(),
    })
  ),
};

let todos = [];
let nextId = 1;

const replyWithTodos = (message) => ({
  content: message ? [{ type: "text", text: message }] : [],
  structuredContent: { tasks: todos },
});

function createTodoServer() {
  const server = new McpServer({
    name: "todo-plugin-server",
    version: "0.1.0",
  });

  registerAppResource(
    server,
    "todo-widget",
    "ui://widget/todo.html",
    {},
    async () => ({
      contents: [
        {
          uri: "ui://widget/todo.html",
          mimeType: RESOURCE_MIME_TYPE,
          text: todoHtml,
        },
      ],
    })
  );

  registerAppTool(
    server,
    "add_todo",
    {
      title: "Add todo",
      description: "Creates a todo item with the given title.",
      inputSchema: addTodoInputSchema,
      outputSchema: todoOutputSchema,
      _meta: {
        ui: { resourceUri: "ui://widget/todo.html" },
      },
    },
    async (args) => {
      const title = args?.title?.trim?.() ?? "";
      if (!title) return replyWithTodos("Missing title.");
      const todo = { id: `todo-${nextId++}`, title, completed: false };
      todos = [...todos, todo];
      return replyWithTodos(`Added "${todo.title}".`);
    }
  );

  registerAppTool(
    server,
    "complete_todo",
    {
      title: "Complete todo",
      description: "Marks a todo as done by id.",
      inputSchema: completeTodoInputSchema,
      outputSchema: todoOutputSchema,
      _meta: {
        ui: { resourceUri: "ui://widget/todo.html" },
      },
    },
    async (args) => {
      const id = args?.id;
      if (!id) return replyWithTodos("Missing todo id.");
      const todo = todos.find((task) => task.id === id);
      if (!todo) {
        return replyWithTodos(`Todo ${id} was not found.`);
      }

      todos = todos.map((task) =>
        task.id === id ? { ...task, completed: true } : task
      );

      return replyWithTodos(`Completed "${todo.title}".`);
    }
  );

  return server;
}

const port = Number(process.env.PORT ?? 8787);
const MCP_PATH = "/mcp";

const httpServer = createServer(async (req, res) => {
  if (!req.url) {
    res.writeHead(400).end("Missing URL");
    return;
  }

  const url = new URL(req.url, `http://${req.headers.host ?? "localhost"}`);

  if (req.method === "OPTIONS" && url.pathname === MCP_PATH) {
    res.writeHead(204, {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "POST, GET, OPTIONS",
      "Access-Control-Allow-Headers": "content-type, mcp-session-id",
      "Access-Control-Expose-Headers": "Mcp-Session-Id",
    });
    res.end();
    return;
  }

  if (req.method === "GET" && url.pathname === "/") {
    res.writeHead(200, { "content-type": "text/plain" }).end("Todo MCP server");
    return;
  }

  const MCP_METHODS = new Set(["POST", "GET", "DELETE"]);
  if (url.pathname === MCP_PATH && req.method && MCP_METHODS.has(req.method)) {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Expose-Headers", "Mcp-Session-Id");

    const server = createTodoServer();
    const transport = new StreamableHTTPServerTransport({
      sessionIdGenerator: undefined, // stateless mode
      enableJsonResponse: true,
    });

    res.on("close", () => {
      transport.close();
      server.close();
    });

    try {
      await server.connect(transport);
      await transport.handleRequest(req, res);
    } catch (error) {
      console.error("Error handling MCP request:", error);
      if (!res.headersSent) {
        res.writeHead(500).end("Internal server error");
      }
    }
    return;
  }

  res.writeHead(404).end("Not Found");
});

httpServer.listen(port, () => {
  console.log(
    `Todo MCP server listening on http://localhost:${port}${MCP_PATH}`
  );
});
```

This snippet also responds to `GET /` for health checks, handles CORS preflight for `/mcp`, and returns `404 Not Found` for OAuth discovery routes you are not using yet. That keeps ChatGPT from surfacing 502 errors while you iterate without authentication.

## Run locally

If you're using a web framework like React, build your component into static assets so the HTML template can inline them.
Usually, you can run a build command such as `npm run build` to produce a `dist` directory with your compiled assets.

In this quickstart, since we're using vanilla HTML, no build step is required.

Start the MCP server on `http://localhost:<port>/mcp` from the directory that contains `server.js` (or `server.ts`).

Make sure you have `"type": "module"` in your `package.json` file:

```json
{
  "type": "module",
  "dependencies": {
    "@modelcontextprotocol/sdk": "^1.20.2",
    "@modelcontextprotocol/ext-apps": "^1.0.1",
    "zod": "^3.25.76"
  }
}
```

Then run the server with the following command:

```bash
node server.js
```

The server should print `Todo MCP server listening on http://localhost:8787/mcp` once it is ready.

### Test with MCP Inspector

You can use the [MCP Inspector](https://modelcontextprotocol.io/docs/tools/inspector) to test your server locally.

```bash
npx @modelcontextprotocol/inspector@latest
```

This opens the MCP Inspector interface. Select **Streamable HTTP**, enter
`http://localhost:8787/mcp`, and connect to test your server and inspect its
tool responses.

![MCP Inspector](https://developers.openai.com/images/apps-sdk/mcp_inspector.png)

### Expose your server to the public internet

For ChatGPT to access your server during development, you need to expose it to the public internet. You can use a tool such as [ngrok](https://ngrok.com/) to open a tunnel to your local server.

```bash
ngrok http <port>
```

This will give you a public URL like `https://<subdomain>.ngrok.app` that you can use to access your server from ChatGPT.

When you connect your MCP server in developer mode, provide the public URL with
the `/mcp` path (for example, `https://<subdomain>.ngrok.app/mcp`).

## Connect your MCP server in ChatGPT

Once your MCP server and web component work locally, connect the server in
ChatGPT:

1. In [ChatGPT](https://chatgpt.com), open **Settings → Security and login** and turn on **Developer mode**.
2. Go to [ChatGPT Plugins](https://chatgpt.com/plugins) and select the plus button.
3. Paste the HTTPS + `/mcp` URL from your tunnel or deployment (for example, `https://<subdomain>.ngrok.app/mcp`), name the connection, provide a short description, and click **Create**.

  <img src="https://developers.openai.com/images/apps-sdk/new_connector.jpg"
    alt="Connect an MCP server in ChatGPT"
  />

4. Open a new chat, select the plugin from the **More** menu (accessible after clicking the **+** button), and prompt the model (for example, “Add a new task to read my book”). ChatGPT will stream tool payloads so you can confirm inputs and outputs.

![Select your plugin in a conversation](https://developers.openai.com/images/apps-sdk/developer_mode_more.jpg)

## Next steps

From there, you can iterate on the UI/UX, prompts, tool metadata, and the overall experience.

Refresh the plugin connection after each change to the MCP server (tools,
  metadata, and related configuration). You can do this from the detail page at
  [chatgpt.com/plugins](https://chatgpt.com/plugins).

When you're preparing for public distribution, review
[Submit plugins](https://developers.openai.com/plugins/deploy/submission), the
[Plugin guidelines](https://developers.openai.com/plugins/app-guidelines), and
[Brainstorm plugin use cases](https://developers.openai.com/plugins/plan/use-case). If you're building a UI, you
can also review the [UI guidelines](https://developers.openai.com/plugins/concepts/ui-guidelines).

Once you understand the basics, you can
[build richer UI](https://developers.openai.com/plugins/build/chatgpt-ui), [authenticate
users](https://developers.openai.com/plugins/build/auth) when needed, and
[manage state](https://developers.openai.com/plugins/build/chatgpt-ui#manage-state).
