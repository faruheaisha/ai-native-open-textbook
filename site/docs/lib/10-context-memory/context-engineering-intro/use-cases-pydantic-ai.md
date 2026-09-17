---
title: "Pydantic AI Context Engineering Template"
sourceId: "10-context-memory/context-engineering-intro"
sourceTitle: "Context Engineering Intro"
sourceKind: "工程手册"
licenseLabel: "可转载"
lang: "英文"
tier: 1
volume: "10-context-memory"
sourceUrl: "https://github.com/coleam00/context-engineering-intro"
entryUrl: "https://github.com/coleam00/context-engineering-intro/blob/a2d84b021cee1e2f4e77ba854bba0be8cb319035/use-cases/pydantic-ai/README.md"
sourceRel: "use-cases/pydantic-ai/README.md"
rawUrl: "/raw/10-context-memory/context-engineering-intro/use-cases/pydantic-ai/README.md"
sourceSha256: "565c369e86c6016d8d6225ef51d6f234719143f64c9562efabe1d1d346afacee"
pageSha256: "565c369e86c6016d8d6225ef51d6f234719143f64c9562efabe1d1d346afacee"
contentMode: "local-full"
zh: "on"
---

# Pydantic AI Context Engineering Template

A comprehensive template for building production-grade AI agents using Pydantic AI with context engineering best practices, tools integration, structured outputs, and comprehensive testing patterns.

<div class="tb-zh"><p>一个完整的模板，用于结合上下文工程最佳实践、工具集成、结构化输出与完整测试模式，用 Pydantic AI 构建生产级 AI agent。</p></div>

## 🚀 Quick Start - Copy Template

**Get started in 2 minutes:**

<div class="tb-zh"><p>2 分钟上手：</p></div>

```bash
# Clone the context engineering repository
git clone https://github.com/coleam00/Context-Engineering-Intro.git
cd Context-Engineering-Intro/use-cases/pydantic-ai

# 1. Copy this template to your new project
python copy_template.py /path/to/my-agent-project

# 2. Navigate to your project
cd /path/to/my-agent-project

# 3. Start building with the PRP workflow
# Fill out PRPs/INITIAL.md with the agent you want to create

# 4. Generate the PRP based on your detailed requirements (validate the PRP after generating!)
/generate-pydantic-ai-prp PRPs/INITIAL.md

# 5. Execute the PRP to create your Pydantic AI agent
/execute-pydantic-ai-prp PRPs/generated_prp.md
```

If you are not using Claude Code, you can simply tell your AI coding assistant to use the generate-pydantic-ai-prp and execute-pydantic-ai-prp slash commands in .claude/commands as prompts.

<div class="tb-zh"><p>如果你不使用 Claude Code，可以直接让你的 AI 编码助手把 .claude/commands 中的 generate-pydantic-ai-prp 和 execute-pydantic-ai-prp 斜杠命令当作提示词来使用。</p></div>

## 📖 What is This Template?

This template provides everything you need to build sophisticated Pydantic AI agents using proven context engineering workflows. It combines:

<div class="tb-zh"><p>这个模板提供了用经过验证的上下文工程工作流构建复杂 Pydantic AI agent 所需的一切。它结合了：</p></div>

- **Pydantic AI Best Practices**: Type-safe agents with tools, structured outputs, and dependency injection
- **Context Engineering Workflows**: Proven PRP (Product Requirements Prompts) methodology
- **Working Examples**: Complete agent implementations you can learn from and extend

<div class="tb-zh"><p>Pydantic AI 最佳实践：带工具、结构化输出和依赖注入的类型安全 agent；上下文工程工作流：经过验证的 PRP（Product Requirements Prompts）方法论；可运行的示例：可以学习并扩展的完整 agent 实现。</p></div>

## 🎯 PRP Framework Workflow

This template uses a 3-step context engineering workflow for building AI agents:

<div class="tb-zh"><p>这个模板使用三步上下文工程工作流来构建 AI agent：</p></div>

### 1. **Define Requirements** (`PRPs/INITIAL.md`)
Start by clearly defining what your agent needs to do:

```markdown
# Customer Support Agent - Initial Requirements

## Overview
Build an intelligent customer support agent that can handle inquiries, 
access customer data, and escalate issues appropriately.

## Core Requirements
- Multi-turn conversations with context and memory
- Customer authentication and account access
- Account balance and transaction queries
- Payment processing and refund handling
...
```

### 2. **Generate Implementation Plan** 

```bash
/generate-pydantic-ai-prp PRPs/INITIAL.md
```

This creates a comprehensive 'Product Requirements Prompts' document that includes:
- Pydantic AI technology research and best practices
- Agent architecture design with tools and dependencies
- Implementation roadmap with validation loops
- Security patterns and production considerations

<div class="tb-zh"><p>这一步会生成一份完整的「Product Requirements Prompts」文档，包含：Pydantic AI 技术调研与最佳实践；带工具与依赖的 agent 架构设计；带验证闭环的实现路线图；安全模式与生产考量。</p></div>

### 3. **Execute Implementation**

```bash
/execute-pydantic-ai-prp PRPs/your_agent.md
```

This implements the complete agent based on the PRP, including:
- Agent creation with proper model provider configuration
- Tool integration with error handling and validation
- Structured output models with Pydantic validation
- Comprehensive testing with TestModel and FunctionModel

<div class="tb-zh"><p>这一步依据 PRP 实现完整的 agent，包括：以正确的模型 provider 配置创建 agent；带错误处理与校验的工具集成；用 Pydantic 校验的结构化输出模型；用 TestModel 和 FunctionModel 做的完整测试。</p></div>

## 📂 Template Structure

```
pydantic-ai/
├── CLAUDE.md                           # Pydantic AI global development rules
├── copy_template.py                    # Template deployment script
├── .claude/commands/
│   ├── generate-pydantic-ai-prp.md     # PRP generation for agents
│   └── execute-pydantic-ai-prp.md      # PRP execution for agents
├── PRPs/
│   ├── templates/
│   │   └── prp_pydantic_ai_base.md     # Base PRP template for agents
│   └── INITIAL.md                      # Example agent requirements
├── examples/
│   ├── basic_chat_agent/               # Simple conversational agent
│   │   ├── agent.py                    # Agent with memory and context
│   │   └── README.md                   # Usage guide
│   ├── tool_enabled_agent/             # Agent with external tools
│   │   ├── agent.py                    # Web search + calculator tools
│   │   └── requirements.txt            # Dependencies
│   └── testing_examples/               # Comprehensive testing patterns
│       ├── test_agent_patterns.py      # TestModel, FunctionModel examples
│       └── pytest.ini                  # Test configuration
└── README.md                           # This file
```

## 🤖 Agent Examples Included

### 1. Main Agent Reference (`examples/main_agent_reference/`)
**The canonical reference implementation** showing proper Pydantic AI patterns:
- Environment-based configuration with `settings.py` and `providers.py`
- Clean separation of concerns between email and research agents
- Proper file structure to separate prompts, tools, agents, and Pydantic models
- Tool integration with external APIs (Gmail, Brave Search)

**Key Files:**
- `settings.py`: Environment configuration with pydantic-settings
- `providers.py`: Model provider abstraction with `get_llm_model()`
- `research_agent.py`: Multi-tool agent with web search and email integration
- `email_agent.py`: Specialized agent for Gmail draft creation

<div class="tb-zh"><p>关键文件： settings.py 使用 pydantic-settings 做环境配置；providers.py 通过 get_llm_model() 做模型 provider 抽象；research_agent.py 带网页搜索与邮件集成的多工具 agent；email_agent.py 专门用于创建 Gmail 草稿的 agent。</p></div>

### 2. Basic Chat Agent (`examples/basic_chat_agent/`)
A simple conversational agent demonstrating core patterns:
- **Environment-based model configuration** (follows main_agent_reference)
- **String output by default** (no `result_type` unless needed)
- System prompts (static and dynamic)
- Conversation memory with dependency injection

**Key Features:**
- Simple string responses (not structured output)
- Settings-based configuration pattern
- Conversation context tracking
- Clean, minimal implementation

<div class="tb-zh"><p>关键特性： 简单的字符串响应（而非结构化输出）；基于 settings 的配置模式；对话上下文跟踪；干净、最小的实现。</p></div>

### 3. Tool-Enabled Agent (`examples/tool_enabled_agent/`)
An agent with tool integration capabilities:
- **Environment-based configuration** (follows main_agent_reference)
- **String output by default** (no unnecessary structure)
- Web search and calculation tools
- Error handling and retry mechanisms

**Key Features:**
- `@agent.tool` decorator patterns
- RunContext for dependency injection
- Tool error handling and recovery
- Simple string responses from tools

<div class="tb-zh"><p>关键特性： @agent.tool 装饰器模式；用 RunContext 做依赖注入；工具的错误处理与恢复；工具返回简单的字符串响应。</p></div>

### 4. Structured Output Agent (`examples/structured_output_agent/`)
**NEW**: Shows when to use `result_type` for data validation:
- **Environment-based configuration** (follows main_agent_reference)
- **Structured output with Pydantic validation** (when specifically needed)
- Data analysis with statistical tools
- Professional report generation

**Key Features:**
- Demonstrates proper use of `result_type`
- Pydantic validation for business reports
- Data analysis tools with numerical statistics
- Clear documentation on when to use structured vs string output

<div class="tb-zh"><p>关键特性： 演示 result_type 的正确用法；用 Pydantic 校验业务报告；带数值统计的数据分析工具；清楚说明何时该用结构化输出、何时该用字符串输出。</p></div>

### 5. Testing Examples (`examples/testing_examples/`)
Comprehensive testing patterns for Pydantic AI agents:
- TestModel for rapid development validation
- FunctionModel for custom behavior testing
- Agent.override() for test isolation
- Pytest fixtures and async testing

**Key Features:**
- Unit testing without API costs
- Mock dependency injection
- Tool validation and error scenario testing
- Integration testing patterns

<div class="tb-zh"><p>关键特性： 不消耗 API 成本的单元测试；mock 依赖注入；工具校验与错误场景测试；集成测试模式。</p></div>

## 📚 Additional Resources

- **Official Pydantic AI Documentation**: https://ai.pydantic.dev/
- **Context Engineering Methodology**: See main repository README

<div class="tb-zh"><p>Pydantic AI 官方文档：https://ai.pydantic.dev/ ；上下文工程方法论：见主仓库 README。</p></div>

## 🆘 Support & Contributing

- **Issues**: Report problems with the template or examples
- **Improvements**: Contribute additional examples or patterns
- **Questions**: Ask about Pydantic AI integration or context engineering

<div class="tb-zh"><p>问题反馈：报告模板或示例中的问题；改进：贡献更多示例或模式；提问：询问 Pydantic AI 集成或上下文工程相关的问题。</p></div>

This template is part of the larger Context Engineering framework. See the main repository for more context engineering templates and methodologies.

<div class="tb-zh"><p>本模板是更大的 Context Engineering 框架的一部分。更多上下文工程模板与方法论请见主仓库。</p></div>

---

**Ready to build production-grade AI agents?** Start with `python copy_template.py my-agent-project` and follow the PRP workflow! 🚀

<div class="tb-zh"><p>准备好构建生产级 AI agent 了吗？ 从 python copy_template.py my-agent-project 开始，然后遵循 PRP 工作流！🚀</p></div>
