---
title: "Context Engineering Intro"
sourceId: "10-context-memory/context-engineering-intro"
sourceTitle: "Context Engineering Intro"
sourceKind: "工程手册"
licenseLabel: "可转载"
lang: "英文"
tier: 1
volume: "10-context-memory"
sourceUrl: "https://github.com/coleam00/context-engineering-intro"
entryUrl: "https://github.com/coleam00/context-engineering-intro/blob/a2d84b021cee1e2f4e77ba854bba0be8cb319035/use-cases/mcp-server/PRPs/INITIAL.md"
sourceRel: "use-cases/mcp-server/PRPs/INITIAL.md"
rawUrl: "/raw/10-context-memory/context-engineering-intro/use-cases/mcp-server/PRPs/INITIAL.md"
sourceSha256: "758a009c3e057503d8d08108b34b80bdc860ed0058812ebeeac21ffc50b2682b"
pageSha256: "758a009c3e057503d8d08108b34b80bdc860ed0058812ebeeac21ffc50b2682b"
contentMode: "local-full"
zh: "on"
---

# Context Engineering Intro

## FEATURE:

We want to create a MCP server using this repos template

<div class="tb-zh"><p>我们想用这个仓库里的模板创建一个 MCP 服务器。</p></div>

The goal of the MCP server is to create a simple version of taskmaster mcp that instead of parsing PRDs we parse PRPs.

<div class="tb-zh"><p>这个 MCP 服务器的目标是做一个简化版的 taskmaster mcp，区别在于我们解析的不是 PRD，而是 PRP。</p></div>

Additional features:

<div class="tb-zh"><p>附加功能：</p></div>

- LLM powered PRP information extraction using anthropic
- Crud operation on tasks, documentation, tags, etc to and from the DB

<div class="tb-zh"><p>用 Anthropic 做由 LLM 驱动的 PRP 信息抽取；对任务、文档、标签等做数据库的增删改查（CRUD）操作。</p></div>

We need tools for parsing PRPs this tool should take a filled PRP and use anthropic to extract the tasks into tasks and save them to the db, including surrounding documentation from the prp like the goals what whys, target users, etc.

<div class="tb-zh"><p>我们需要解析 PRP 的工具。该工具应接收一份填写完整的 PRP，用 Anthropic 把其中的任务抽取为 tasks 并保存到数据库，同时保存 PRP 中周边的文档信息，例如目标、why、目标用户等。</p></div>

We need:

<div class="tb-zh"><p>我们需要：</p></div>

- To be able to perform CRUD operations on tasks, documentation, tags, etc
- A task fetch tool to get the tasks from the
- To be able to list all tasks
- To be able to add information to a task
- To be able to fetch the additional documentation from the db
- To be able to modify the additional documentation
- DB tables needs to be updated to match our new data models

<div class="tb-zh"><p>能够对任务、文档、标签等执行 CRUD 操作；有一个任务获取工具，用来取回任务；能够列出所有任务；能够给任务添加信息；能够从数据库取回附加文档；能够修改附加文档；数据库表需要更新，以匹配新的数据模型。</p></div>

## EXAMPLES & DOCUMENTATION:

All examples are already referenced in prp_mcp_base.md - do any additional research as needed.

<div class="tb-zh"><p>所有示例都已在 prp_mcp_base.md 中引用——按需做补充调研。</p></div>

## OTHER CONSIDERATIONS:

- Do not use complex regex or complex parsing patterns, we use an LLM to parse PRPs.
- Model and API key for Anthropic both need to be environment variables - these are set up in .dev.vars.example
- It's very important that we create one task per file to keep concerns separate

<div class="tb-zh"><p>不要使用复杂的正则或复杂的解析模式，我们用 LLM 来解析 PRP；Anthropic 的模型和 API key 都必须是环境变量——它们已在 .dev.vars.example 中配置好；非常重要的一点是每个文件只创建一个任务，以保持关注点分离。</p></div>
