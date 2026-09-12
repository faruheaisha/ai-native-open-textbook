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
entryUrl: "https://github.com/coleam00/context-engineering-intro/blob/a2d84b021cee1e2f4e77ba854bba0be8cb319035/README.md"
zh: "on"
---

# Context Engineering Intro

## FEATURE:

[REPLACE EVERYTHING IN BRACKETS WITH YOUR OWN CONTEXT]
[Provide an overview of the agent you want to build. The more detail the better!]
[Overly simple example: Build a simple research agent using Pydantic AI that can research topics with the Brave API and draft emails with Gmail to share insights.]

<div class="tb-zh"><p>【把方括号里的内容全部替换为你自己的上下文】【概述你想构建的 agent，细节越多越好！】【举个过于简单的例子：用 Pydantic AI 构建一个简单的研究 agent，它能用 Brave API 研究主题，并用 Gmail 起草邮件来分享洞见。】</p></div>

## TOOLS:

[Describe the tools you want for your agent(s) - functionality, arguments, what they return, etc. Be as specific as you like - the more specific the better.]

<div class="tb-zh"><p>【描述你想为 agent 配备的工具——功能、参数、返回什么等等。尽量具体，越具体越好。】</p></div>

## DEPENDENCIES

[Describe the dependencies needed for the agent tools (for the Pydantic AI RunContext) - things like API keys, DB connections, an HTTP client, etc.]

<div class="tb-zh"><p>【描述 agent 工具所需的依赖（用于 Pydantic AI 的 RunContext）——例如 API key、数据库连接、HTTP client 等。】</p></div>

## SYSTEM PROMPT(S)

[Describe the instructions for the agent(s) here - you can create the entire system prompt here or give a general description to guide the coding assistant]

<div class="tb-zh"><p>【在这里描述给 agent 的指令——你可以直接写出完整的 system prompt，也可以给出总体描述来引导编码助手。】</p></div>

## EXAMPLES:

[Add any additional example agents/tool implementations from past projects or online resources to the examples/ folder and reference them here.]
[The template contains the following already for Pydantic AI:]

<div class="tb-zh"><p>【把过去项目或网上资源中额外的示例 agent 与工具实现放进 examples/ 目录，并在这里引用它们。】【模板已经为 Pydantic AI 内置了以下内容：】</p></div>

- examples/basic_chat_agent - Basic chat agent with conversation memory
- examples/tool_enabled_agent - Tool-enabled agent with web search capabilities  
- examples/structured_output_agent - Structured output agent for data validation
- examples/testing_examples - Testing examples with TestModel and FunctionModel
- examples/main_agent_reference - Best practices for building Pydantic AI agents

<div class="tb-zh"><p>模板内置的示例：examples/basic_chat_agent 带对话记忆的基础聊天 agent；examples/tool_enabled_agent 具备网页搜索能力的工具型 agent；examples/structured_output_agent 用于数据校验的结构化输出 agent；examples/testing_examples 使用 TestModel 和 FunctionModel 的测试示例；examples/main_agent_reference 构建 Pydantic AI agent 的最佳实践。</p></div>

## DOCUMENTATION:

[Add any additional documentation you want it to reference - this can be curated docs you put in PRPs/ai_docs, URLs, etc.]

<div class="tb-zh"><p>【添加你希望它参考的其他文档——可以是放进 PRPs/ai_docs 的精选文档、URL 等。】</p></div>

- Pydantic AI Official Documentation: https://ai.pydantic.dev/
- Agent Creation Guide: https://ai.pydantic.dev/agents/
- Tool Integration: https://ai.pydantic.dev/tools/
- Testing Patterns: https://ai.pydantic.dev/testing/
- Model Providers: https://ai.pydantic.dev/models/

<div class="tb-zh"><p>参考链接：Pydantic AI 官方文档 https://ai.pydantic.dev/ ；Agent 创建指南 https://ai.pydantic.dev/agents/ ；工具集成 https://ai.pydantic.dev/tools/ ；测试模式 https://ai.pydantic.dev/testing/ ；模型 provider https://ai.pydantic.dev/models/ 。</p></div>

## OTHER CONSIDERATIONS:

- Use environment variables for API key configuration instead of hardcoded model strings
- Keep agents simple - default to string output unless structured output is specifically needed
- Follow the main_agent_reference patterns for configuration and providers
- Always include comprehensive testing with TestModel for development

<div class="tb-zh"><p>API key 配置请使用环境变量，不要硬编码模型字符串；保持 agent 简单——除非明确需要结构化输出，否则默认使用字符串输出；配置与 provider 遵循 main_agent_reference 中的模式；开发时始终配合 TestModel 做完整测试。</p></div>

[Add any additional considerations for the coding assistant, especially "gotchas" you want it to keep in mind.]

<div class="tb-zh"><p>【补充任何给编码助手的注意事项，尤其是你希望它记住的「坑」。】</p></div>
