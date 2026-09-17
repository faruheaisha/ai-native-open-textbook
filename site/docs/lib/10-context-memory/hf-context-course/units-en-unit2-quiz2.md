---
title: "Quiz 2: MCP in Practice"
sourceId: "10-context-memory/hf-context-course"
sourceTitle: "The Context Course"
sourceKind: "系统课程"
licenseLabel: "仅引用"
lang: "英文"
tier: 1
volume: "10-context-memory"
sourceUrl: "https://github.com/huggingface/context-course"
entryUrl: "https://github.com/huggingface/context-course/blob/0448a7ca721a63a81531e1ba94f46f897c70645b/units/en/unit2/quiz2.mdx"
sourceRel: "units/en/unit2/quiz2.mdx"
rawUrl: "/raw/10-context-memory/hf-context-course/units/en/unit2/quiz2.mdx"
sourceSha256: "bdcd8ed4e3fd71798b72c483418a1e5827f22f82f7908d5a5b8dcbeeab0cae5a"
pageSha256: "bdcd8ed4e3fd71798b72c483418a1e5827f22f82f7908d5a5b8dcbeeab0cae5a"
contentMode: "local-full"
zh: ""
---

# Quiz 2: MCP in Practice

Test your understanding of building, configuring, and deploying MCP systems. Choose the best answer.

## Question 1: FastMCP Server Building

**选项**

- A. Use FastMCP decorators (@mcp.tool()) to define functions as MCP tools
- B. Write raw JSON-RPC messages for each tool
- C. Gradio is the only way to build MCP servers
- D. MCP servers must be written in JavaScript

**答案解析**

- **A（正确答案）** — Correct! FastMCP infers types from function signatures and generates schemas automatically.
- **B** — Possible but tedious. FastMCP handles the protocol for you.
- **C** — Gradio is convenient, but FastMCP is more flexible for complex logic.
- **D** — MCP is language-agnostic. Python, JavaScript, Go, Rust all work.

## Question 2: Type Hints and Docstrings

**选项**

- A. Type hints and docstrings are essential for MCP tool schemas
- B. Type hints are optional; MCP infers types from usage
- C. Only Gradio MCP requires type hints
- D. Docstrings are just for human readers

**答案解析**

- **A（正确答案）** — Exactly! Type hints generate schemas, docstrings provide descriptions. Always include both.
- **B** — Type hints are essential. Without them, MCP can't generate proper schemas.
- **C** — All MCP servers benefit from type hints. Clients need to know parameter types.
- **D** — Docstrings are used by MCP to generate tool descriptions and argument docs.

## Question 3: Tools vs. Resources vs. Prompts

**选项**

- A. Tools: actions | Resources: read-only data | Prompts: instructions
- B. Tools and Resources are interchangeable
- C. Resources are for UI only, not for agents
- D. Prompts are the same as Tools

**答案解析**

- **A（正确答案）** — Perfect! Each serves a different purpose in agent workflows.
- **B** — No. Tools are called by agents; Resources are data agents read.
- **C** — Resources are designed for agents! They provide context agents can access.
- **D** — No. Prompts are instruction templates; Tools are callable functions.

## Question 4: Gradio MCP Integration

**选项**

- A. Use demo.launch(mcp_server=True) to enable MCP automatically
- B. Gradio and MCP are separate; you need both libraries
- C. You need to manually implement the MCP protocol in Gradio
- D. Gradio MCP only works with simple functions

**答案解析**

- **A（正确答案）** — Correct! One parameter enables both web UI and MCP endpoint.
- **B** — Gradio includes MCP support with gradio[mcp]. No separate library needed.
- **C** — Gradio handles it automatically. Just write functions with type hints.
- **D** — Gradio MCP works with complex functions, multiple parameters, and advanced types.

## Question 5: Configuring Agents to Use MCP Servers

**选项**

- A. Configure servers via CLI commands (like claude mcp add) or config files, depending on the agent
- B. Agents automatically discover all available MCP servers
- C. You need a special GUI tool to configure MCP servers
- D. Each agent needs its own custom MCP SDK integration

**答案解析**

- **A（正确答案）** — Correct! Claude Code uses CLI commands; other agents use config files. Remote Streamable HTTP servers can often be added without restarts.
- **B** — No. You must explicitly configure which servers each agent can access.
- **C** — Nope. Just edit JSON config files directly.
- **D** — False! MCP is a standard protocol. Agents are built as MCP clients already.

## Question 6: Deploying to Hugging Face Spaces

**选项**

- A. Create a Space, upload app.py with mcp_server=True, add requirements.txt
- B. Spaces doesn't support MCP yet
- C. You need to configure network ports and manage server processes
- D. MCP servers on Spaces only work with private access

**答案解析**

- **A（正确答案）** — Perfect! Spaces auto-builds and exposes the MCP endpoint.
- **B** — Spaces fully supports MCP via Gradio. It's the recommended deployment target.
- **C** — Spaces handles all of this. Just push your app code.
- **D** — Spaces can be public or private. MCP works with both.

## Question 7: Transport Mechanisms

**选项**

- A. Use stdio for local servers, Streamable HTTP for remote deployment
- B. Streamable HTTP is always better because it's 'network-native'
- C. Once deployed, you must switch from stdio to Streamable HTTP
- D. Transport is internal to MCP; agents don't see the difference

**答案解析**

- **A（正确答案）** — Exactly! Stdio is fast for subprocess communication. Streamable HTTP is the current standard for remote MCP connections.
- **B** — Streamable HTTP has network overhead. Use stdio locally for speed.
- **C** — You choose transport at configuration time. No switching mid-deployment.
- **D** — True! Agents use the same tool interface regardless of transport.

## Question 8: MCP Security

**选项**

- A. Use environment variables for secrets; never hardcode them in config
- B. Hardcode API tokens in config if it's 'private'
- C. Use relative paths in server configuration
- D. There's no security consideration for MCP configuration

**答案解析**

- **A（正确答案）** — Excellent! Env vars keep secrets out of version control.
- **B** — Even private configs can be exposed. Always use environment variables.
- **C** — Use absolute paths! Relative paths break depending on working directory.
- **D** — Configuration files can contain sensitive info. Protect them carefully.

## Summary

How many did you get right?

- **7-8 correct**: You're ready to build and deploy real MCP systems!
- **5-6 correct**: Good understanding. Review configuration and deployment sections.
- **3-4 correct**: Review the building and integration sections.
- **0-2 correct**: Go back through the unit and review the core concepts.

## Key Takeaways

- **FastMCP** is the simplest way to build servers with decorators
- **Type hints and docstrings** are essential for MCP tool schemas
- **Gradio with `mcp_server=True`** creates UI + MCP automatically
- **Configure servers in agent config files** (or use MCPClient in code)
- **Use stdio locally, Streamable HTTP for remote deployment**
- **Always use environment variables** for secrets
- **Deploy to Hugging Face Spaces** for easy sharing

You've mastered Unit 2! You can now build, deploy, and configure MCP servers for any agent.
