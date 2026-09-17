---
title: "Quiz 1: MCP Fundamentals"
sourceId: "10-context-memory/hf-context-course"
sourceTitle: "The Context Course"
sourceKind: "系统课程"
licenseLabel: "仅引用"
lang: "英文"
tier: 1
volume: "10-context-memory"
sourceUrl: "https://github.com/huggingface/context-course"
entryUrl: "https://github.com/huggingface/context-course/blob/0448a7ca721a63a81531e1ba94f46f897c70645b/units/en/unit2/quiz1.mdx"
sourceRel: "units/en/unit2/quiz1.mdx"
rawUrl: "/raw/10-context-memory/hf-context-course/units/en/unit2/quiz1.mdx"
sourceSha256: "92eec663dadf720bdb0a4aef124afb586f49c9e44eb4b4f54b70b57e2b712145"
pageSha256: "92eec663dadf720bdb0a4aef124afb586f49c9e44eb4b4f54b70b57e2b712145"
contentMode: "local-full"
zh: ""
---

# Quiz 1: MCP Fundamentals

Test your understanding of MCP architecture and core concepts. Choose the best answer for each question.

## Question 1: The M×N Integration Problem

**选项**

- A. Without MCP, you need M agents × N tools separate integrations
- B. Agents can only integrate with one tool at a time
- C. MCP requires a different implementation for every agent
- D. Modern APIs eliminate the need for MCP

**答案解析**

- **A（正确答案）** — Correct! This is the integration complexity MCP solves. With MCP, you build N servers once, and any agent can use them.
- **B** — Not the core issue. The M×N problem is about integration complexity across all agent-tool pairs.
- **C** — Opposite! MCP is universal—one server works with all MCP-compatible agents.
- **D** — APIs are part of the solution, but they don't standardize how agents discover and use capabilities. MCP does.

## Question 2: Hosts, Clients, and Servers

**选项**

- A. Host runs the agent, Client requests capabilities, Server provides them
- B. Server runs the agent, Client provides data, Host makes requests
- C. Client runs the agent, Server requests capabilities, Host provides them
- D. All three are interchangeable roles

**答案解析**

- **A（正确答案）** — Perfect! The Host is the agent's environment (Claude Code, Codex, OpenCode). The Client is the protocol handler requesting from servers. The Server exposes capabilities.
- **B** — Incorrect roles. The Host runs the agent, not the Server.
- **C** — No. The Client requests, not the Server. The Host runs the agent.
- **D** — Each has a distinct responsibility. They're not interchangeable.

## Question 3: Tools vs. Resources vs. Prompts

**选项**

- A. Tools: callable functions | Resources: read-only data | Prompts: instruction templates
- B. Tools: static data | Resources: callable functions | Prompts: configurations
- C. All three are the same capability type
- D. Resources and Prompts don't exist in modern MCP

**答案解析**

- **A（正确答案）** — Exactly! Tools perform actions or queries. Resources provide static data. Prompts guide agent behavior.
- **B** — Backwards. Tools are callable, Resources are data.
- **C** — No. Each serves a different purpose and has different characteristics.
- **D** — False. All three capability types are core MCP features.

## Question 4: MCP Transport Mechanisms

**选项**

- A. Stdio for local servers, Streamable HTTP for remote servers
- B. HTTP+SSE is the only remote transport option
- C. Always use Streamable HTTP—it's more powerful
- D. Transport is irrelevant; MCP hides it from agents

**答案解析**

- **A（正确答案）** — Correct! Stdio uses subprocess communication (fast, simple, local). Streamable HTTP is the current standard for remote connections, replacing the older HTTP+SSE transport.
- **B** — HTTP+SSE is now deprecated. Streamable HTTP is the current standard remote transport in the MCP specification.
- **C** — Streamable HTTP has network overhead. Use stdio for local development, which is simpler and faster.
- **D** — Transport matters for deployment and performance, though the JSON-RPC protocol is the same regardless of transport.

## Question 5: Skills vs. MCP

**选项**

- A. Skills: static context. MCP: dynamic, real-time access to tools and data
- B. MCP is just a newer name for Skills
- C. MCP is only for APIs; Skills are for everything else
- D. You have to choose between Skills and MCP

**答案解析**

- **A（正确答案）** — Perfect! Skills are pre-written and bundled. MCP servers provide live access that changes without agent restart.
- **B** — No. They're complementary but distinct. Skills teach how to think; MCP provides what to access.
- **C** — MCP covers tools, resources, and prompts. Skills are for context teaching.
- **D** — You use both together. Skills provide knowledge; MCP provides tools.

## Summary

How did you do? If you got 4-5 questions correct, you have a solid grasp of MCP fundamentals. If you struggled, review "Key Concepts and Architecture" before moving to the next section.

Key concepts to remember:
- **MCP solves the M×N problem** with universal server standard
- **Three roles**: Host (agent location), Client (protocol handler), Server (capability provider)
- **Three capabilities**: Tools (callable), Resources (data), Prompts (instructions)
- **Two transports**: Stdio (local development), Streamable HTTP (remote/production)
- **Skills + MCP work together** to teach and enable agent capabilities
