---
title: "Setup tips & tricks — CMA as an MCP server"
sourceId: "08-agents/anthropic-cookbook"
sourceTitle: "Claude Cookbooks"
sourceKind: "官方资料集"
licenseLabel: "可转载"
lang: "英文"
tier: 1
volume: "08-agents"
sourceUrl: "https://github.com/anthropics/anthropic-cookbook"
entryUrl: "https://github.com/anthropics/anthropic-cookbook/blob/a97b9a2dc300635f0c26b5e05d0b54bbe0279ee5/README.md"
zh: ""
---

# Setup tips & tricks — CMA as an MCP server

Things that aren't obvious from the docs and tend to cost debugging time.

---

## Mental model

### Claude Desktop is the frontend, CMA is the backend

The Claude you're typing to in Desktop is a **relay**. It calls `send_message` with your words, calls `wait_for_idle` to block until the CMA agent finishes, then shows you the reply. The actual work — tool use, code execution, repo edits — happens in the CMA session, not in Desktop.

### Eight 1:1 tools, one shim

`list_agents`, `get_agent`, `create_session`, `send_message`, `interrupt`, `get_session`, `list_events`, `archive_session` are straight endpoint wrappers. `wait_for_idle` is the only editorial: MCP is request/response and CMA completion is SSE, so something has to stream-to-idle inside a tool call.

### `session_id` is the only state, and Claude holds it

`create_session` returns it; Claude passes it to every subsequent call. The MCP server itself is stateless.

### Two transports, one tool set

`src/tools.ts` registers the nine tools. `src/server.ts` wraps it in stdio (Claude Desktop spawns it as a subprocess); `src/server-http.ts` wraps it in Streamable HTTP (claude.ai web reaches it over the network). Pick one.

---

## Setup — Claude Desktop (stdio, local)

1. **Environment** (one-time — sessions need an `environment_id`):
   ```bash
   ant beta:environments create --name cma-mcp \
     --config '{type: cloud, networking: {type: unrestricted}}' --transform id -r
   ```
2. **Agents**: this server doesn't create agents — it drives the ones already in your workspace. Create/update them via the `ant` CLI or the Console.
3. **`.env.local`**:
   ```
   ANTHROPIC_API_KEY=sk-ant-...
   CLAUDE_ENVIRONMENT_ID=env_...
   ```
4. **Register with Claude Desktop** — add to `~/Library/Application Support/Claude/claude_desktop_config.json` (macOS) and restart Desktop:
   ```json
   {
     "mcpServers": {
       "cma": {
         "command": "bun",
         "args": ["run", "/absolute/path/to/managed_agents/cma-mcp/src/server.ts"],
         "env": {
           "ANTHROPIC_API_KEY": "sk-ant-...",
           "CLAUDE_ENVIRONMENT_ID": "env_..."
         }
       }
     }
   }
   ```
5. **Test**: in a new Desktop chat, ask *"list my managed agents, start a session with the first one, and relay this message to it: hello."*

---

## Setup — claude.ai web (Streamable HTTP, remote)

Same tools, but the server runs at a public URL and claude.ai connects to it as a custom Connector.

1. **Token** — generate and keep it; anyone with this token can drive your agents:
   ```bash
   export CMA_MCP_TOKEN=$(openssl rand -hex 32)
   ```
2. **Run locally first** (ngrok/cloudflared for a public URL while testing):
   ```bash
   bun run http   # → :3000/mcp
   ```
3. **Deploy** — the `Dockerfile` targets Fly / Railway / Render; set `ANTHROPIC_API_KEY`, `CLAUDE_ENVIRONMENT_ID`, `CMA_MCP_TOKEN` as secrets. (Cloudflare Workers also works — `WebStandardStreamableHTTPServerTransport` is fetch-native; swap `process.env` → `env` and `Bun.serve` → `export default { fetch }`.)
4. **claude.ai → Settings → Connectors → Add custom connector**:

   | Field | Value |
   |---|---|
   | Name | `CMA` |
