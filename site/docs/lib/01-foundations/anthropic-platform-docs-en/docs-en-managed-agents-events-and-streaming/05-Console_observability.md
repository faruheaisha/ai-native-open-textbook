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
pageSha256: "b06405aa50ffe17f1a0f6df99f2db1da0ee734cc77f84c302f4981560cc36a73"
contentMode: "local-full"
zh: ""
---

## Console observability

The Claude Console includes a session viewer for inspecting what an agent did without writing any code. In the Console sidebar, under **Managed Agents**, select **Sessions** to see every session in the workspace with its status, agent, token usage, cost, and creation time, then select a session to open it. The session viewer is only accessible to Developers and Admins. It shows:

* **Timeline minimap:** A zoomable overview of the session's activity over time, with one lane per thread in [multiagent](https://platform.claude.com/docs/en/managed-agents/multiagent-orchestration) sessions. Select a lane to view that thread, or select a mark to jump to its event.

* **Transcript:** The conversation grouped by model request, including thinking, tool calls with their inputs and results, and message text as it streams. You can filter the events and copy or download them as JSON.

* **Inspector:** A resizable side panel with details about the session, in five tabs:

  * **Session** shows the session's details and metadata, its cumulative cost over time, and spend against the session's [budget](https://platform.claude.com/docs/en/managed-agents/budgets) when one is set.
  * **Events** lists every raw event on the current thread in the order the server sent it; select an event to see its JSON. A message that streamed while the page was open also has a **Deltas** view of its [event deltas](https://platform.claude.com/docs/en/managed-agents/events-and-streaming#event-deltas).
  * **Tools** lists the tools the session's agents are configured with, along with call counts, failures, and median duration; select a tool to see its calls and jump to one in the transcript.
  * **Resources** lists mounted [files](https://platform.claude.com/docs/en/managed-agents/files), [repositories](https://platform.claude.com/docs/en/managed-agents/github), and [memory stores](https://platform.claude.com/docs/en/managed-agents/memory) at their container paths, including the memories in each store and the changes this session made to them, plus files the agent wrote to `/mnt/session/outputs` and the [skills](https://platform.claude.com/docs/en/managed-agents/skills) attached to the session's agents.
  * **Threads** lists every thread with its status, context size, and cost. Select a thread to view its details, such as the agent, model, context usage, and cost.

Append `?event=\{event_id\}` to a session URL to open the session at a specific event.

With `ant beta:sessions connect`, you can open the same viewer from the `ant` CLI or follow the session in your terminal. See [Connect to a Managed Agents session from your terminal](https://platform.claude.com/docs/en/cli-sdks-libraries/cli/sessions-connect).
