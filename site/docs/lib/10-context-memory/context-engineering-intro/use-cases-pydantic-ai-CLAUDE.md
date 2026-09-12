---
title: "PydanticAI Context Engineering - Global Rules for AI Agent Development"
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

# PydanticAI Context Engineering - Global Rules for AI Agent Development

This file contains the global rules and principles that apply to ALL PydanticAI agent development work. These rules are specialized for building production-grade AI agents with tools, memory, and structured outputs.

<div class="tb-zh"><p>本文件包含适用于所有 PydanticAI agent 开发工作的全局规则与原则。这些规则专门针对构建生产级 AI agent，涉及工具、记忆与结构化输出。</p></div>

## 🔄 PydanticAI Core Principles

**IMPORTANT: These principles apply to ALL PydanticAI agent development:**

<div class="tb-zh"><p>重要：这些原则适用于所有 PydanticAI agent 开发：</p></div>

### Agent Development Workflow
- **Always start with INITIAL.md** - Define agent requirements before generating PRPs
- **Use the PRP pattern**: INITIAL.md → `/generate-pydantic-ai-prp INITIAL.md` → `/execute-pydantic-ai-prp PRPs/filename.md`
- **Follow validation loops** - Each PRP must include agent testing with TestModel/FunctionModel
- **Context is King** - Include ALL necessary PydanticAI patterns, examples, and documentation

### Research Methodology for AI Agents
- **Web search extensively** - Always research PydanticAI patterns and best practices
- **Study official documentation** - ai.pydantic.dev is the authoritative source
- **Pattern extraction** - Identify reusable agent architectures and tool patterns
- **Gotcha documentation** - Document async patterns, model limits, and context management issues

## 📚 Project Awareness & Context

- **Use a virtual environment** to run all code and tests. If one isn't already in the codebase when needed, create it
- **Use consistent PydanticAI naming conventions** and agent structure patterns
- **Follow established agent directory organization** patterns (agent.py, tools.py, models.py)
- **Leverage PydanticAI examples extensively** - Study existing patterns before creating new agents

<div class="tb-zh"><p>使用虚拟环境运行所有代码与测试，如果代码库中还没有，就在需要时创建它；使用统一的 PydanticAI 命名约定与 agent 结构模式；遵循既定的 agent 目录组织模式（agent.py、tools.py、models.py）；大量借鉴 PydanticAI 示例——在创建新 agent 之前先研究既有模式。</p></div>

## 🧱 Agent Structure & Modularity

- **Never create files longer than 500 lines** - Split into modules when approaching limit
- **Organize agent code into clearly separated modules** grouped by responsibility:
  - `agent.py` - Main agent definition and execution logic
  - `tools.py` - Tool functions used by the agent
  - `models.py` - Pydantic output models and dependency classes
  - `dependencies.py` - Context dependencies and external service integrations
- **Use clear, consistent imports** - Import from pydantic_ai package appropriately
- **Use python-dotenv and load_dotenv()** for environment variables - Follow examples/main_agent_reference/settings.py pattern
- **Never hardcode sensitive information** - Always use .env files for API keys and configuration

<div class="tb-zh"><p>绝不创建超过 500 行的文件——接近上限时就拆分成模块；把 agent 代码组织成按职责清晰分离的模块：agent.py 负责主 agent 的定义与执行逻辑，tools.py 存放 agent 使用的工具函数，models.py 存放 Pydantic 输出模型与依赖类，dependencies.py 存放上下文依赖与外部服务集成；使用清晰一致的导入方式——从 pydantic_ai 包按恰当方式导入；使用 python-dotenv 和 load_dotenv() 处理环境变量——遵循 examples/main_agent_reference/settings.py 的模式；绝不硬编码敏感信息——API key 与配置一律使用 .env 文件。</p></div>

## 🤖 PydanticAI Development Standards

### Agent Creation Patterns
- **Use model-agnostic design** - Support multiple providers (OpenAI, Anthropic, Gemini)
- **Implement dependency injection** - Use deps_type for external services and context
- **Define structured outputs** - Use Pydantic models for result validation
- **Include comprehensive system prompts** - Both static and dynamic instructions

### Tool Integration Standards
- **Use @agent.tool decorator** for context-aware tools with RunContext[DepsType]
- **Use @agent.tool_plain decorator** for simple tools without context dependencies
- **Implement proper parameter validation** - Use Pydantic models for tool parameters
- **Handle tool errors gracefully** - Implement retry mechanisms and error recovery

### Environment Variable Configuration with python-dotenv

```python
# Use python-dotenv and pydantic-settings for proper configuration management
from pydantic_settings import BaseSettings
from pydantic import Field, ConfigDict
from dotenv import load_dotenv
from pydantic_ai.providers.openai import OpenAIProvider
from pydantic_ai.models.openai import OpenAIModel

class Settings(BaseSettings):
    """Application settings with environment variable support."""
    
    model_config = ConfigDict(
        env_file=".env",
        env_file_encoding="utf-8",
        case_sensitive=False,
        extra="ignore"
    )
    
    # LLM Configuration
    llm_provider: str = Field(default="openai", description="LLM provider")
    llm_api_key: str = Field(..., description="API key for the LLM provider")
    llm_model: str = Field(default="gpt-4", description="Model name to use")
    llm_base_url: str = Field(
        default="https://api.openai.com/v1", 
        description="Base URL for the LLM API"
    )

def load_settings() -> Settings:
    """Load settings with proper error handling and environment loading."""
    # Load environment variables from .env file
    load_dotenv()
    
    try:
        return Settings()
    except Exception as e:
        error_msg = f"Failed to load settings: {e}"
        if "llm_api_key" in str(e).lower():
            error_msg += "\nMake sure to set LLM_API_KEY in your .env file"
        raise ValueError(error_msg) from e

def get_llm_model():
    """Get configured LLM model with proper environment loading."""
    settings = load_settings()
    provider = OpenAIProvider(
        base_url=settings.llm_base_url, 
        api_key=settings.llm_api_key
    )
    return OpenAIModel(settings.llm_model, provider=provider)
```

### Testing Standards for AI Agents
- **Use TestModel for development** - Fast validation without API calls
- **Use FunctionModel for custom behavior** - Control agent responses in tests
- **Use Agent.override() for testing** - Replace models in test contexts
- **Test both sync and async patterns** - Ensure compatibility with different execution modes
- **Test tool validation** - Verify tool parameter schemas and error handling

## ✅ Task Management for AI Development

- **Break agent development into clear steps** with specific completion criteria
- **Mark tasks complete immediately** after finishing agent implementations
- **Update task status in real-time** as agent development progresses
- **Test agent behavior** before marking implementation tasks complete

<div class="tb-zh"><p>把 agent 开发拆解为清晰的步骤，并为每步设定具体的完成标准；任务一完成就立即标记；随着开发推进实时更新任务状态；在把实现任务标记为完成之前，先测试 agent 的行为。</p></div>

## 📎 PydanticAI Coding Standards

### Agent Architecture

```python
# Follow main_agent_reference patterns - no result_type unless structured output needed
from pydantic_ai import Agent, RunContext
from dataclasses import dataclass
from .settings import load_settings

@dataclass
class AgentDependencies:
    """Dependencies for agent execution"""
    api_key: str
    session_id: str = None

# Load settings with proper dotenv handling
settings = load_settings()

# Simple agent with string output (default)
agent = Agent(
    get_llm_model(),  # Uses load_settings() internally
    deps_type=AgentDependencies,
    system_prompt="You are a helpful assistant..."
)

@agent.tool
async def example_tool(
    ctx: RunContext[AgentDependencies], 
    query: str
) -> str:
    """Tool with proper context access"""
    return await external_api_call(ctx.deps.api_key, query)
```

### Security Best Practices
- **API key management** - Use python-dotenv with .env files, never commit keys to version control
- **Environment variable loading** - Always use load_dotenv() following examples/main_agent_reference/settings.py
- **Input validation** - Use Pydantic models for all tool parameters
- **Rate limiting** - Implement proper request throttling for external APIs
- **Prompt injection prevention** - Validate and sanitize user inputs
- **Error handling** - Never expose sensitive information in error messages

### Common PydanticAI Gotchas
- **Async/sync mixing issues** - Be consistent with async/await patterns throughout
- **Model token limits** - Different models have different context limits, plan accordingly
- **Dependency injection complexity** - Keep dependency graphs simple and well-typed
- **Tool error handling failures** - Always implement proper retry and fallback mechanisms
- **Context state management** - Design stateless tools when possible for reliability

## 🔍 Research Standards for AI Agents

- **Use Archon MCP server** - Leverage available PydanticAI documentation via RAG
- **Study official examples** - ai.pydantic.dev/examples has working implementations
- **Research model capabilities** - Understand provider-specific features and limitations
- **Document integration patterns** - Include external service integration examples

<div class="tb-zh"><p>使用 Archon MCP server——通过 RAG 利用可用的 PydanticAI 文档；研究官方示例——ai.pydantic.dev/examples 上有可运行的实现；调研模型能力——理解各 provider 的特性与限制；记录集成模式——附上外部服务集成的示例。</p></div>

## 🎯 Implementation Standards for AI Agents

- **Follow the PRP workflow religiously** - Don't skip agent validation steps
- **Always test with TestModel first** - Validate agent logic before using real models
- **Use existing agent patterns** rather than creating from scratch
- **Include comprehensive error handling** for tool failures and model errors
- **Test streaming patterns** when implementing real-time agent interactions

<div class="tb-zh"><p>严格遵循 PRP 工作流——不要跳过 agent 验证步骤；始终先用 TestModel 测试——在接入真实模型之前先验证 agent 逻辑；复用既有的 agent 模式，而不是从零开始；包含完整的错误处理，覆盖工具失败与模型错误；在实现实时 agent 交互时测试流式模式。</p></div>

## 🚫 Anti-Patterns to Always Avoid

- ❌ Don't skip agent testing - Always use TestModel/FunctionModel for validation
- ❌ Don't hardcode model strings - Use environment-based configuration like main_agent_reference
- ❌ Don't use result_type unless structured output is specifically needed - default to string
- ❌ Don't ignore async patterns - PydanticAI has specific async/sync considerations
- ❌ Don't create complex dependency graphs - Keep dependencies simple and testable
- ❌ Don't forget tool error handling - Implement proper retry and graceful degradation
- ❌ Don't skip input validation - Use Pydantic models for all external inputs

<div class="tb-zh"><p>❌ 不要跳过 agent 测试——始终用 TestModel/FunctionModel 做验证；❌ 不要硬编码模型字符串——使用像 main_agent_reference 那样基于环境的配置；❌ 除非明确需要结构化输出，否则不要使用 result_type——默认用字符串；❌ 不要忽视异步模式——PydanticAI 对 async/sync 有特定的考量；❌ 不要构建复杂的依赖图——保持依赖简单、可测试；❌ 不要忘记工具的错误处理——实现恰当的 retry 与优雅降级；❌ 不要跳过输入校验——所有外部输入都使用 Pydantic 模型。</p></div>

## 🔧 Tool Usage Standards for AI Development

- **Use web search extensively** for PydanticAI research and documentation
- **Follow PydanticAI command patterns** for slash commands and agent workflows
- **Use agent validation loops** to ensure quality at each development step
- **Test with multiple model providers** to ensure agent compatibility

<div class="tb-zh"><p>大量使用网页搜索来做 PydanticAI 调研与查文档；遵循 PydanticAI 的命令模式来编写斜杠命令与 agent 工作流；使用 agent 验证闭环，在每个开发步骤都保证质量；用多个模型 provider 测试，确保 agent 的兼容性。</p></div>

## 🧪 Testing & Reliability for AI Agents

- **Always create comprehensive agent tests** for tools, outputs, and error handling
- **Test agent behavior with TestModel** before using real model providers
- **Include edge case testing** for tool failures and model provider issues
- **Test both structured and unstructured outputs** to ensure agent flexibility
- **Validate dependency injection** works correctly in test environments

<div class="tb-zh"><p>始终为工具、输出与错误处理编写完整的 agent 测试；在接入真实模型 provider 之前用 TestModel 测试 agent 行为；包含边界情况测试，覆盖工具失败与模型 provider 问题；同时测试结构化与非结构化输出，确保 agent 的灵活性；验证依赖注入在测试环境中能正确工作。</p></div>

These global rules apply specifically to PydanticAI agent development and ensure production-ready AI applications with proper error handling, testing, and security practices.

<div class="tb-zh"><p>这些全局规则专门适用于 PydanticAI agent 开发，确保产出具备恰当错误处理、测试与安全实践的生产级 AI 应用。</p></div>
