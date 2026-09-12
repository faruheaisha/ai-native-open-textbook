---
title: "🏭 AI Agent Factory with Claude Code Subagents"
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

# 🏭 AI Agent Factory with Claude Code Subagents

A powerful yet simple orchestration framework that leverages Claude Code's subagent capabilities to autonomously build AI agents using Pydantic AI. This system transforms even basic requirements into fully-functional, tested, and documented AI agents through a coordinated workflow of specialized subagents. This can achieve in minutes what traditionally took hours or days of development.

<div class="tb-zh"><p>一个强大而简洁的编排框架，利用 Claude Code 的 subagent 能力，自主地用 Pydantic AI 构建 AI agent。这套系统通过多个专门 subagent 的协同工作流，把哪怕很基础的需求变成功能完整、经过测试、附带文档的 AI agent。传统上需要数小时甚至数天开发的东西，它能在几分钟内完成。</p></div>

> **Full Example**: For a complete, runnable AI agent built with this framework, see the [Hybrid Search RAG Agent](/lib/10-context-memory/context-engineering-intro/use-cases-agent-factory-with-subagents-agents-rag_agent-README) which includes full setup instructions and documentation.

<div class="tb-zh"><p>完整示例：想看用这套框架构建出的完整、可运行的 AI agent，请参见混合检索 RAG Agent，其中包含完整的搭建说明与文档。</p></div>

## 🚦 Getting Started

1. **Request an agent**: Open Claude Code in this directory and ask for an AI Agent (see examples below, your prompt can be simple)
2. **Answer clarifications**: Provide 2-3 quick answers about your needs
3. **Watch the magic**: Subagents work in parallel to build your agent in a new folder in `agents/`
4. **Receive your agent**: Complete with tests, docs, and setup instructions

<div class="tb-zh"><p>1）提出你的 agent 需求：在这个目录下打开 Claude Code，说出你想要的 AI Agent（示例见下，提示词可以很简单）；2）回答澄清问题：就你的需求给出两三个简短回答；3）看魔法发生：多个 subagent 并行工作，在 agents/ 下的新文件夹里构建你的 agent；4）接收你的 agent：自带测试、文档和搭建说明。</p></div>

## 🎯 Why Subagents?

Claude Code subagents have been all the rage, and for good reason. With subagents we get:

<div class="tb-zh"><p>Claude Code 的 subagent 近来极受追捧，而且理由充分。有了 subagent，我们可以得到：</p></div>

### **Parallel Execution & Scalability**
- Run many specialized agents simultaneously, dramatically reducing development time
- Each subagent operates independently with its own context window
- Orchestrate complex workflows without context pollution or token limitations

### **Specialized System Prompts**
- Each subagent has a focused, task-specific prompt optimized for its role
- Prevents prompt dilution and maintains specialized expertise across tasks
- Enables deep domain knowledge without compromising general capabilities

### **Modular Architecture**
- Cleanly separated concerns with independent configuration and tools
- Reusable components that can be versioned and shared across projects
- Easy to extend, modify, or replace individual subagents without affecting others

## 🏗️ Subagent Workflow Architecture

```
┌─────────────────┐
│  User Request   │
└────────┬────────┘
         ▼
┌─────────────────────┐
│ Phase 0: Clarify    │
└────────┬────────────┘
         ▼
┌─────────────────────┐
│ Phase 1: Planner    │
└────────┬────────────┘
         ▼
┌─────────────────────────────────────┐
│     Phase 2: Parallel Development   │
│  ┌─────────────┬─────────────┬──────┴───────┐
│  │   Prompt    │    Tool     │  Dependency  │
│  │  Engineer   │ Integrator  │   Manager    │
│  └─────────────┴─────────────┴──────────────┘
└────────┬────────────────────────────┘
         ▼
┌─────────────────────┐
│ Phase 3: Implement  │
└────────┬────────────┘
         ▼
┌─────────────────────┐
│ Phase 4: Validator  │
└────────┬────────────┘
         ▼
┌─────────────────────┐
│ Phase 5: Delivery   │
└─────────────────────┘
```

### Workflow Phases for the AI Agent Factory

1. **Phase 0: Clarification** - Main agent asks targeted questions to understand requirements
2. **Phase 1: Requirements Documentation** - Planner subagent creates comprehensive specifications
3. **Phase 2: Parallel Component Development** - Three specialized subagents work simultaneously:
   - **Prompt Engineer**: Designs optimal system prompts
   - **Tool Integrator**: Plans tool implementations and API integrations
   - **Dependency Manager**: Configures environment and dependencies
4. **Phase 3: Implementation** - Main agent builds the complete agent using specifications
5. **Phase 4: Validation** - Validator subagent creates tests and verifies functionality
6. **Phase 5: Delivery** - Documentation and final packaging

<div class="tb-zh"><p>1）阶段 0：澄清——主 agent 提出有针对性的问题以理解需求；2）阶段 1：需求文档——Planner subagent 编写完整的规格说明；3）阶段 2：并行组件开发——三个专门的 subagent 同时工作：Prompt Engineer 设计最优的 system prompt，Tool Integrator 规划工具实现与 API 集成，Dependency Manager 配置环境与依赖；4）阶段 3：实现——主 agent 依据规格构建完整的 agent；5）阶段 4：验证——Validator subagent 编写测试并核实功能；6）阶段 5：交付——编写文档并完成最终打包。</p></div>

## 📁 Project Structure

```
.
├── CLAUDE.md                    # Central orchestration rules and workflow
├── agents/                      # Generated AI agents
│   ├── rag_agent/               # Example: Complete RAG agent implementation
│   └── your_agent_here/         # Whatever agent you create with the factory will go here
├── examples/                    # Pydantic AI patterns and references
│   ├── main_agent_reference/    # Reference implementation patterns
│   └── rag_pipeline/            # RAG infrastructure components
│   CLAUDE.md                    # The global rules that instruct Claude Code on the AI Agent Factory workflow
└── README.md                    # This file
```

## 🤖 The Subagents

### **pydantic-ai-planner**
Creates minimal, focused requirements documents (INITIAL.md) with MVP mindset. Analyzes user needs and produces clear specifications for agent development.

### **pydantic-ai-prompt-engineer**
Designs concise system prompts (100-300 words) that define agent behavior. Specializes in creating clear, effective prompts for Pydantic AI agents.

### **pydantic-ai-tool-integrator**
Plans tool specifications focusing on 2-3 essential functions. Defines tool parameters, error handling, and integration patterns.

### **pydantic-ai-dependency-manager**
Configures minimal dependencies and environment variables. Sets up model providers, database connections, and agent initialization.

### **pydantic-ai-validator**
Creates comprehensive test suites using TestModel and FunctionModel. Validates requirements, tests functionality, and ensures production readiness.

## 🎨 CLAUDE.md - The Orchestration Engine

The `CLAUDE.md` file is the heart of the system, containing:

<div class="tb-zh"><p>CLAUDE.md 文件是这套系统的核心，其中包含：</p></div>

- **Workflow triggers**: Patterns that activate the agent factory
- **Phase definitions**: Detailed instructions for each development phase
- **Subagent prompts**: Specialized instructions for each subagent
- **Quality gates**: Validation criteria for each phase
- **Integration rules**: How components work together

<div class="tb-zh"><p>工作流触发器：激活 agent 工厂的模式；阶段定义：每个开发阶段的详细指令；Subagent 提示词：每个 subagent 的专门指令；质量门禁：每个阶段的验证标准；集成规则：各组件如何协同工作。</p></div>

Key features:
- Automatic workflow recognition from user requests
- Parallel subagent invocation for optimal performance
- Archon integration for project management (optional)
- Comprehensive error handling and recovery

<div class="tb-zh"><p>关键特性：从用户请求中自动识别工作流；并行调用 subagent 以获得最佳性能；可选的 Archon 项目管理集成；完整的错误处理与恢复。</p></div>

## 🚀 Example Prompts

### Simple Agents

```
"Build an AI agent that can search the web"
"Create an agent for summarizing documents"
"I need an assistant that can query databases"
```

### Complex Agents

```
"Build a customer support agent that integrates with Slack and searches our knowledge base"
"Create a data analysis agent that can query PostgreSQL and generate visualizations"
"Implement a content generation agent with brand voice customization and SEO optimization"
```

### Domain-Specific Agents

```
"Build a financial analysis agent that can process earnings reports"
"Create a code review agent that follows our team's style guide"
"Implement a research agent that can search academic papers and summarize findings"
```

## 🔗 Optional Archon Integration

When [Archon](https://archon.diy) is available through MCP, the system provides enhanced project management:

<div class="tb-zh"><p>当 Archon 通过 MCP 可用时，系统会提供增强的项目管理能力：</p></div>

- **Automatic project creation** with task tracking
- **Status updates** as each phase progresses
- **RAG-powered research** during implementation
- **Persistent project history** for iteration and improvement

<div class="tb-zh"><p>自动创建项目并跟踪任务；随每个阶段推进更新状态；实现过程中提供 RAG 驱动的调研；持久化的项目历史便于迭代与改进。</p></div>

The Archon integration is optional—the system works perfectly without it, using local TodoWrite for task tracking.

<div class="tb-zh"><p>Archon 集成是可选的——没有它系统也能完美运行，改用本地的 TodoWrite 跟踪任务。</p></div>

## 💡 Key Benefits

### **Speed**
- Complete agent in 10-15 minutes vs hours of manual development
- Parallel processing reduces sequential bottlenecks
- Automated testing and validation included

### **Quality**
- Consistent architecture following best practices
- Comprehensive testing with 80%+ coverage
- Production-ready with error handling and logging

### **Flexibility**
- Works with any LLM provider (OpenAI, Anthropic, Gemini, Ollama)
- Supports various databases (PostgreSQL, SQLite, Redis)
- Extensible for custom requirements

### **Maintainability**
- Clean separation of concerns
- Well-documented code and APIs
- Reusable components and patterns

## 📚 Pydantic AI Integration

All agents are built using [Pydantic AI](https://ai.pydantic.dev/), providing:

<div class="tb-zh"><p>所有 agent 都用 Pydantic AI 构建，提供：</p></div>

- **Type Safety**: Full type hints and runtime validation
- **Structured Outputs**: Reliable, schema-validated responses
- **Dependency Injection**: Clean separation of concerns
- **Testing Support**: TestModel and FunctionModel for comprehensive testing
- **Multi-Provider**: Support for OpenAI, Anthropic, Gemini, and more

<div class="tb-zh"><p>类型安全：完整的类型提示与运行时校验；结构化输出：可靠且经 schema 校验的响应；依赖注入：清晰的关注点分离；测试支持：用 TestModel 和 FunctionModel 做完整测试；多 provider：支持 OpenAI、Anthropic、Gemini 等。</p></div>

## 🛠️ Components Explained

### Planning Documents
Each agent includes four planning documents:
- `INITIAL.md` - Requirements and specifications
- `prompts.md` - System prompt design
- `tools.md` - Tool specifications
- `dependencies.md` - Configuration and dependencies

### Implementation Files
- `agent.py` - Main agent logic
- `tools.py` - Tool implementations
- `settings.py` - Environment configuration
- `providers.py` - LLM providers
- `dependencies.py` - Dependency injection
- `cli.py` - Command-line interface

### Testing & Validation
- Comprehensive test suite with pytest
- TestModel for development testing
- FunctionModel for behavior validation
- Integration tests for end-to-end verification

The system handles everything else from requirements analysis to implementation, testing, and documentation.

<div class="tb-zh"><p>从需求分析到实现、测试和文档，其余的一切都由这套系统处理。</p></div>

## 🔮 Future Enhancements

- Additional specialized subagents for specific domains
- Enhanced pattern library for common use cases
- Automated deployment pipeline generation
- Cross-agent communication protocols
- Real-time collaboration features

<div class="tb-zh"><p>面向特定领域的更多专用 subagent；常见用例的增强模式库；自动生成部署流水线；跨 agent 通信协议；实时协作能力。</p></div>
