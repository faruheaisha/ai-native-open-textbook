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

## Purpose

Generate a complete context engineering template package for **PydanticAI** that enables developers to rapidly build intelligent AI agents with tool integration, conversation handling, and structured data validation using the PydanticAI framework.

<div class="tb-zh"><p>为 PydanticAI 生成一个完整的上下文工程模板包，让开发者能用 PydanticAI 框架快速构建具备工具集成、对话处理与结构化数据校验的智能 AI agent。</p></div>

## Core Principles

1. **PydanticAI Specialization**: Deep integration with PydanticAI patterns for agent creation, tools, and structured outputs
2. **Complete Package Generation**: Create entire template ecosystem with working examples and validation
3. **Type Safety First**: Leverage PydanticAI's type-safe design and Pydantic validation throughout
4. **Production Ready**: Include security, testing, and best practices for production deployments
5. **Context Engineering Integration**: Apply proven context engineering workflows to AI agent development

<div class="tb-zh"><p>1）PydanticAI 专门化：与 PydanticAI 的 agent 创建、工具与结构化输出模式深度集成；2）生成完整的包：创建整套模板生态，包含可运行的示例与验证；3）类型安全优先：自始至终利用 PydanticAI 的类型安全设计与 Pydantic 校验；4）生产就绪：包含面向生产部署的安全性、测试与最佳实践；5）上下文工程集成：把经过验证的上下文工程工作流应用到 AI agent 开发中。</p></div>

---

## Goal

Generate a complete context engineering template package for **PydanticAI** that includes:

<div class="tb-zh"><p>为 PydanticAI 生成一个完整的上下文工程模板包，其中包含：</p></div>

- PydanticAI-specific CLAUDE.md implementation guide with agent patterns
- Specialized PRP generation and execution commands for AI agents
- Domain-specific base PRP template with agent architecture patterns
- Comprehensive working examples (chat agents, tool integration, multi-step workflows)
- PydanticAI-specific validation loops and testing patterns

<div class="tb-zh"><p>PydanticAI 专属的 CLAUDE.md 实现指南，含 agent 模式；为 AI agent 专门化的 PRP 生成与执行命令；带 agent 架构模式的领域专属基础 PRP 模板；完整的可运行示例（聊天 agent、工具集成、多步工作流）；PydanticAI 专属的验证闭环与测试模式。</p></div>

## Why

- **AI Development Acceleration**: Enable rapid development of production-grade PydanticAI agents
- **Pattern Consistency**: Maintain established AI agent architecture patterns and best practices
- **Quality Assurance**: Ensure comprehensive testing for agent behavior, tools, and outputs
- **Knowledge Capture**: Document PydanticAI-specific patterns, gotchas, and integration strategies
- **Scalable AI Framework**: Create reusable templates for various AI agent use cases

<div class="tb-zh"><p>加速 AI 开发：让生产级 PydanticAI agent 的开发变得快速；模式一致性：保持既有的 AI agent 架构模式与最佳实践；质量保证：为 agent 行为、工具与输出确保完整的测试；知识沉淀：记录 PydanticAI 专属的模式、坑与集成策略；可扩展的 AI 框架：为各种 AI agent 用例创建可复用模板。</p></div>

## What

### Template Package Components

**Complete Directory Structure:**

<div class="tb-zh"><p>完整的目录结构：</p></div>

```
use-cases/pydantic-ai/
├── CLAUDE.md                           # PydanticAI implementation guide
├── .claude/commands/
│   ├── generate-pydantic-ai-prp.md     # Agent PRP generation
│   └── execute-pydantic-ai-prp.md      # Agent PRP execution  
├── PRPs/
│   ├── templates/
│   │   └── prp_pydantic_ai_base.md     # PydanticAI base PRP template
│   ├── ai_docs/                        # PydanticAI documentation
│   └── INITIAL.md                      # Example agent feature request
├── examples/
│   ├── basic_chat_agent/               # Simple chat agent with memory
│   ├── tool_enabled_agent/             # Web search + calculator tools
│   ├── workflow_agent/                 # Multi-step workflow processing
│   ├── structured_output_agent/        # Custom Pydantic models
│   └── testing_examples/               # Agent testing patterns
├── copy_template.py                    # Template deployment script
└── README.md                           # Comprehensive usage guide
```

**PydanticAI Integration:**
- Agent creation with multiple model providers (OpenAI, Anthropic, Gemini)
- Tool integration patterns and function registration
- Conversation memory and context management using dependencies
- Structured output validation with Pydantic models
- Testing patterns using TestModel and FunctionModel
- Security patterns for API key management and input validation

<div class="tb-zh"><p>PydanticAI 集成： 用多种模型 provider（OpenAI、Anthropic、Gemini）创建 agent；工具集成模式与函数注册；用依赖做对话记忆与上下文管理；用 Pydantic 模型做结构化输出校验；使用 TestModel 和 FunctionModel 的测试模式；API key 管理与输入校验的安全模式。</p></div>

**Context Engineering Adaptation:**
- PydanticAI-specific research processes and documentation references
- Agent-appropriate validation loops and testing strategies
- AI framework-specialized implementation blueprints
- Integration with base context engineering principles for AI development

<div class="tb-zh"><p>上下文工程适配： PydanticAI 专属的调研流程与文档引用；适合 agent 的验证闭环与测试策略；AI 框架专门化的实现蓝图；与面向 AI 开发的基础上下文工程原则的集成。</p></div>

### Success Criteria

- [ ] Complete PydanticAI template package structure generated
- [ ] All required files present with PydanticAI-specific content
- [ ] Agent patterns accurately represent PydanticAI best practices
- [ ] Context engineering principles adapted for AI agent development
- [ ] Validation loops appropriate for testing AI agents and tools
- [ ] Template immediately usable for creating PydanticAI projects
- [ ] Integration with base context engineering framework maintained
- [ ] Comprehensive examples and testing documentation included

<div class="tb-zh"><p>验收清单：已生成完整的 PydanticAI 模板包结构；所有必需文件都在且内容针对 PydanticAI；agent 模式准确体现 PydanticAI 最佳实践；上下文工程原则已为 AI agent 开发做适配；验证闭环适合测试 AI agent 与工具；模板可直接用于创建 PydanticAI 项目；与基础上下文工程框架的集成得以保持；已包含完整的示例与测试文档。</p></div>

## All Needed Context

### Documentation & References (RESEARCHED)

```yaml
# IMPORTANT - use the Archon MCP server to get more Pydantic AI documentation!
- mcp: Archon
  why: Official Pydantic AI documentation ready for RAG lookup
  content: All Pydantic AI documentation
# PYDANTIC AI CORE DOCUMENTATION - Essential framework understanding
- url: https://ai.pydantic.dev/
  why: Official PydanticAI documentation with core concepts and getting started
  content: Agent creation, model providers, type safety, dependency injection

- url: https://ai.pydantic.dev/agents/
  why: Comprehensive agent architecture, system prompts, tools, structured outputs
  content: Agent components, execution methods, configuration options

- url: https://ai.pydantic.dev/models/
  why: Model provider configuration, API key management, fallback models
  content: OpenAI, Anthropic, Gemini integration patterns and authentication

- url: https://ai.pydantic.dev/tools/
  why: Function tool registration, context usage, rich returns, dynamic tools
  content: Tool decorators, parameter validation, documentation patterns

- url: https://ai.pydantic.dev/testing/
  why: Testing strategies, TestModel, FunctionModel, pytest patterns
  content: Unit testing, agent behavior validation, mock model usage

- url: https://ai.pydantic.dev/examples/
  why: Working examples for various PydanticAI use cases
  content: Chat apps, RAG systems, SQL generation, FastAPI integration

# CONTEXT ENGINEERING FOUNDATION - Base framework to adapt
- file: ../../../README.md
  why: Core context engineering principles and workflow to adapt for AI agents

- file: ../../../.claude/commands/generate-prp.md
  why: Base PRP generation patterns to specialize for PydanticAI development

- file: ../../../.claude/commands/execute-prp.md  
  why: Base PRP execution patterns to adapt for AI agent validation

- file: ../../../PRPs/templates/prp_base.md
  why: Base PRP template structure to specialize for PydanticAI domain

# MCP SERVER EXAMPLE - Reference implementation
- file: ../mcp-server/CLAUDE.md
  why: Example of domain-specific implementation guide patterns
  
- file: ../mcp-server/.claude/commands/prp-mcp-create.md
  why: Example of specialized PRP generation command structure
```

### PydanticAI Framework Analysis (FROM RESEARCH)

```typescript
// PydanticAI Architecture Patterns (from official docs)
interface PydanticAIPatterns {
  // Core agent patterns
  agent_creation: {
    model_providers: ["openai:gpt-4o", "anthropic:claude-3-sonnet", "google:gemini-1.5-flash"];
    configuration: ["system_prompt", "deps_type", "output_type", "instructions"];
    execution_methods: ["run()", "run_sync()", "run_stream()", "iter()"];
  };
  
  // Tool integration patterns
  tool_system: {
    registration: ["@agent.tool", "@agent.tool_plain", "tools=[]"];
    context_access: ["RunContext[DepsType]", "ctx.deps", "dependency_injection"];
    return_types: ["str", "ToolReturn", "structured_data", "rich_content"];
    validation: ["parameter_schemas", "docstring_extraction", "type_hints"];
  };
  
  // Testing and validation
  testing_patterns: {
    unit_testing: ["TestModel", "FunctionModel", "Agent.override()"];
    validation: ["capture_run_messages()", "pytest_fixtures", "mock_dependencies"];
    evals: ["model_performance", "agent_behavior", "production_monitoring"];
  };
  
  // Production considerations
  security: {
    api_keys: ["environment_variables", "secure_storage", "key_rotation"];
    input_validation: ["pydantic_models", "parameter_validation", "sanitization"];
    monitoring: ["logfire_integration", "usage_tracking", "error_handling"];
  };
}
```

### Development Workflow Analysis (FROM RESEARCH)

```yaml
# PydanticAI Development Patterns (researched from docs and examples)
project_structure:
  basic_pattern: |
    my_agent/
    ├── agent.py          # Main agent definition
    ├── tools.py          # Tool functions
    ├── models.py         # Pydantic output models
    ├── dependencies.py   # Context dependencies
    └── tests/
        ├── test_agent.py
        └── test_tools.py

  advanced_pattern: |
    agents_project/
    ├── agents/
    │   ├── __init__.py
    │   ├── chat_agent.py
    │   └── workflow_agent.py
    ├── tools/
    │   ├── __init__.py
    │   ├── web_search.py
    │   └── calculator.py
    ├── models/
    │   ├── __init__.py
    │   └── outputs.py
    ├── dependencies/
    │   ├── __init__.py
    │   └── database.py
    ├── tests/
    └── examples/

package_management:
  installation: "pip install pydantic-ai"
  optional_deps: "pip install 'pydantic-ai[examples]'"
  dev_deps: "pip install pytest pytest-asyncio inline-snapshot dirty-equals"

testing_workflow:
  unit_tests: "pytest tests/ -v"
  agent_testing: "Use TestModel for fast validation"
  integration_tests: "Use real models with rate limiting"
  evals: "Run performance benchmarks separately"

environment_setup:
  api_keys: ["OPENAI_API_KEY", "ANTHROPIC_API_KEY", "GEMINI_API_KEY"]
  development: "Set ALLOW_MODEL_REQUESTS=False for testing"
  production: "Configure proper logging and monitoring"
```

### Security and Best Practices (FROM RESEARCH)

```typescript
// Security patterns specific to PydanticAI (from research)
interface PydanticAISecurity {
  // API key management
  api_security: {
    storage: "environment_variables_only";
    access_control: "minimal_required_permissions";
    monitoring: "usage_tracking_and_alerts";
  };
  
  // Input validation and sanitization
  input_security: {
    validation: "pydantic_models_for_all_inputs";
    sanitization: "escape_user_content";
    rate_limiting: "prevent_abuse_patterns";
    content_filtering: "block_malicious_prompts";
  };
  
  // Prompt injection prevention
  prompt_security: {
    system_prompts: "clear_instruction_boundaries";
    user_input: "validate_and_sanitize";
    tool_calls: "parameter_validation";
    output_filtering: "structured_response_validation";
  };
  
  // Production considerations
  production_security: {
    monitoring: "logfire_integration_recommended";
    error_handling: "no_sensitive_data_in_logs";
    dependency_injection: "secure_context_management";
    testing: "security_focused_unit_tests";
  };
}
```

### Common Gotchas and Edge Cases (FROM RESEARCH)

```yaml
# PydanticAI-specific gotchas discovered through research
agent_gotchas:
  model_limits:
    issue: "Different models have different token limits and capabilities"
    solution: "Use FallbackModel for automatic model switching"
    validation: "Test with multiple model providers"
  
  async_patterns:
    issue: "Mixing sync and async agent calls can cause issues"
    solution: "Consistent async/await patterns throughout"
    validation: "Test both sync and async execution paths"
  
  dependency_injection:
    issue: "Complex dependency graphs can be hard to debug"
    solution: "Keep dependencies simple and well-typed"
    validation: "Unit test dependencies in isolation"

tool_integration_gotchas:
  parameter_validation:
    issue: "Tools may receive unexpected parameter types"
    solution: "Use strict Pydantic models for tool parameters"
    validation: "Test tools with invalid inputs"
  
  context_management:
    issue: "RunContext state can become inconsistent"
    solution: "Design stateless tools when possible"
    validation: "Test context isolation between runs"
  
  error_handling:
    issue: "Tool errors can crash entire agent runs"
    solution: "Implement retry mechanisms and graceful degradation"
    validation: "Test error scenarios and recovery"

testing_gotchas:
  model_costs:
    issue: "Real model testing can be expensive"
    solution: "Use TestModel and FunctionModel for development"
    validation: "Separate unit tests from expensive eval runs"
  
  async_testing:
    issue: "Async agent testing requires special setup"
    solution: "Use pytest-asyncio and proper fixtures"
    validation: "Test both sync and async code paths"
  
  deterministic_behavior:
    issue: "AI responses are inherently non-deterministic"
    solution: "Focus on testing tool calls and structured outputs"
    validation: "Use inline-snapshot for complex assertions"
```

## Implementation Blueprint

### Technology Research Phase (COMPLETED)

**Comprehensive PydanticAI Analysis Complete:**

<div class="tb-zh"><p>对 PydanticAI 的完整分析已完成：</p></div>

✅ **Core Framework Analysis:** 
- PydanticAI architecture, agent creation patterns, model provider integration
- Project structure conventions from official docs and examples
- Dependency injection system and type-safe design principles
- Development workflow with async/sync patterns and streaming support

<div class="tb-zh"><p>✅ 核心框架分析： PydanticAI 架构、agent 创建模式、模型 provider 集成；来自官方文档与示例的项目结构约定；依赖注入系统与类型安全设计原则；配合异步/同步模式与流式支持的开发工作流。</p></div>

✅ **Tool System Investigation:**
- Function tool registration patterns (@agent.tool vs @agent.tool_plain)
- Context management with RunContext and dependency injection
- Parameter validation, docstring extraction, and schema generation
- Rich return types and multi-modal content support

<div class="tb-zh"><p>✅ 工具系统调研： 函数工具的注册模式（@agent.tool 与 @agent.tool_plain 的取舍）；用 RunContext 与依赖注入做上下文管理；参数校验、docstring 提取与 schema 生成；丰富的返回类型与多模态内容支持。</p></div>

✅ **Testing Framework Analysis:**
- TestModel and FunctionModel for unit testing without API calls
- Agent.override() patterns for test isolation
- Pytest integration with async testing and fixtures
- Evaluation strategies for model performance vs unit testing

<div class="tb-zh"><p>✅ 测试框架分析： 用 TestModel 和 FunctionModel 在不调用 API 的情况下做单元测试；用 Agent.override() 模式做测试隔离；与 pytest 集成异步测试与 fixture；模型性能评估与单元测试的区别。</p></div>

✅ **Security and Production Patterns:**
- API key management with environment variables and secure storage
- Input validation using Pydantic models and parameter schemas
- Rate limiting, monitoring, and Logfire integration
- Common security vulnerabilities and prevention strategies

<div class="tb-zh"><p>✅ 安全与生产模式： 用环境变量与安全存储管理 API key；用 Pydantic 模型与参数 schema 做输入校验；限流、监控与 Logfire 集成；常见安全漏洞与防护策略。</p></div>

### Template Package Generation

Create complete PydanticAI context engineering template based on research findings:

<div class="tb-zh"><p>基于调研发现，创建完整的 PydanticAI 上下文工程模板：</p></div>

```yaml
Generation Task 1 - Create PydanticAI Template Directory Structure:
  CREATE complete use case directory structure:
    - use-cases/pydantic-ai/
    - .claude/commands/ with PydanticAI-specific slash commands
    - PRPs/templates/ with agent-focused base template
    - examples/ with working agent implementations
    - All subdirectories per template package requirements

Generation Task 2 - Generate PydanticAI-Specific CLAUDE.md:
  CREATE PydanticAI global rules file including:
    - PydanticAI agent creation and tool integration patterns
    - Model provider configuration and API key management
    - Agent architecture patterns (chat, workflow, tool-enabled)
    - Testing strategies with TestModel/FunctionModel
    - Security best practices for AI agents and tool integration
    - Common gotchas: async patterns, context management, model limits

Generation Task 3 - Create PydanticAI PRP Commands:
  GENERATE domain-specific slash commands:
    - generate-pydantic-ai-prp.md with agent research patterns
    - execute-pydantic-ai-prp.md with AI agent validation loops
    - Include PydanticAI documentation references and research strategies
    - Agent-specific success criteria and testing requirements

Generation Task 4 - Develop PydanticAI Base PRP Template:
  CREATE specialized prp_pydantic_ai_base.md template:
    - Pre-filled with agent architecture patterns from research
    - PydanticAI-specific success criteria and validation gates
    - Official documentation references and model provider guides
    - Agent testing patterns with TestModel and validation strategies

Generation Task 5 - Create Working PydanticAI Examples:
  GENERATE comprehensive example agents:
    - basic_chat_agent: Simple conversation with memory
    - tool_enabled_agent: Web search and calculator integration
    - workflow_agent: Multi-step task processing
    - structured_output_agent: Custom Pydantic models
    - testing_examples: Unit tests and validation patterns
    - Include configuration files and environment setup

Generation Task 6 - Create Template Copy Script:
  CREATE Python script for template deployment:
    - copy_template.py with command-line interface
    - Copies entire PydanticAI template structure to target location
    - Handles all files: CLAUDE.md, commands, PRPs, examples, etc.
    - Error handling and success feedback with next steps

Generation Task 7 - Generate Comprehensive README:
  CREATE PydanticAI-specific README.md:
    - Clear description: "PydanticAI Context Engineering Template"
    - Template copy script usage (prominently at top)
    - PRP framework workflow for AI agent development
    - Template structure with PydanticAI-specific explanations
    - Quick start guide with agent creation examples
    - Working examples overview and testing patterns
```

### PydanticAI Specialization Details

```typescript
// Template specialization for PydanticAI
const pydantic_ai_specialization = {
  agent_patterns: [
    "chat_agent_with_memory",
    "tool_integrated_agent", 
    "workflow_processing_agent",
    "structured_output_agent"
  ],
  
  validation: [
    "agent_behavior_testing",
    "tool_function_validation", 
    "output_schema_verification",
    "model_provider_compatibility"
  ],
  
  examples: [
    "basic_conversation_agent",
    "web_search_calculator_tools",
    "multi_step_workflow_processing",
    "custom_pydantic_output_models",
    "comprehensive_testing_suite"
  ],
  
  gotchas: [
    "async_sync_mixing_issues",
    "model_token_limits",
    "dependency_injection_complexity",
    "tool_error_handling_failures",
    "context_state_management"
  ],
  
  security: [
    "api_key_environment_management",
    "input_validation_pydantic_models",
    "prompt_injection_prevention",
    "rate_limiting_implementation",
    "secure_tool_parameter_handling"
  ]
};
```

### Integration Points

```yaml
CONTEXT_ENGINEERING_FRAMEWORK:
  - base_workflow: Inherit PRP generation/execution, adapt for AI agent development
  - validation_principles: Extend with AI-specific testing (agent behavior, tool validation)
  - documentation_standards: Maintain consistency while specializing for PydanticAI

PYDANTIC_AI_INTEGRATION:
  - agent_architecture: Include chat, tool-enabled, and workflow agent patterns
  - model_providers: Support OpenAI, Anthropic, Gemini configuration patterns
  - testing_framework: Use TestModel/FunctionModel for development validation
  - production_patterns: Include security, monitoring, and deployment considerations

TEMPLATE_STRUCTURE:
  - directory_organization: Follow use case template patterns with AI-specific examples
  - file_naming: generate-pydantic-ai-prp.md, prp_pydantic_ai_base.md
  - content_format: Markdown with agent code examples and configuration
  - command_patterns: Extend slash commands for AI agent development workflows
```

## Validation Loop

### Level 1: PydanticAI Template Structure Validation

```bash
# Verify complete PydanticAI template package structure
find use-cases/pydantic-ai -type f | sort
ls -la use-cases/pydantic-ai/.claude/commands/
ls -la use-cases/pydantic-ai/PRPs/templates/
ls -la use-cases/pydantic-ai/examples/

# Verify copy script and agent examples
test -f use-cases/pydantic-ai/copy_template.py
ls use-cases/pydantic-ai/examples/*/agent.py 2>/dev/null | wc -l  # Should have agent files
python use-cases/pydantic-ai/copy_template.py --help 2>/dev/null || echo "Copy script needs help"

# Expected: All required files including working agent examples
# If missing: Generate missing components with PydanticAI patterns
```

### Level 2: PydanticAI Content Quality Validation

```bash
# Verify PydanticAI-specific content accuracy
grep -r "from pydantic_ai import Agent" use-cases/pydantic-ai/examples/
grep -r "@agent.tool" use-cases/pydantic-ai/examples/
grep -r "TestModel\|FunctionModel" use-cases/pydantic-ai/

# Check for PydanticAI patterns and avoid generic content
grep -r "TODO\|PLACEHOLDER" use-cases/pydantic-ai/
grep -r "openai:gpt-4o\|anthropic:" use-cases/pydantic-ai/
grep -r "RunContext\|deps_type" use-cases/pydantic-ai/

# Expected: Real PydanticAI code, no placeholders, agent patterns present
# If issues: Add proper PydanticAI-specific patterns and examples
```

### Level 3: PydanticAI Functional Validation

```bash
# Test PydanticAI template functionality
cd use-cases/pydantic-ai

# Test PRP generation with agent focus
/generate-pydantic-ai-prp INITIAL.md
ls PRPs/*.md | grep -v templates | head -1  # Should generate agent PRP

# Verify agent examples can be parsed (syntax check)
python -m py_compile examples/basic_chat_agent/agent.py 2>/dev/null && echo "Basic agent syntax OK"
python -m py_compile examples/tool_enabled_agent/agent.py 2>/dev/null && echo "Tool agent syntax OK"

# Expected: PRP generation works, agent examples have valid syntax
# If failing: Debug PydanticAI command patterns and fix agent code
```

### Level 4: PydanticAI Integration Testing

```bash
# Verify PydanticAI specialization maintains base framework compatibility
diff -r ../../.claude/commands/ .claude/commands/ | head -10
grep -r "Context is King" . | wc -l  # Should inherit base principles
grep -r "pydantic.ai.dev\|PydanticAI" . | wc -l  # Should have specializations

# Test agent examples have proper dependencies
grep -r "pydantic_ai" examples/ | wc -l  # Should import PydanticAI
grep -r "pytest" examples/testing_examples/ | wc -l  # Should have tests

# Expected: Proper specialization, working agent patterns, testing included
# If issues: Adjust to maintain compatibility while adding PydanticAI features
```

## Final Validation Checklist

### PydanticAI Template Package Completeness

- [ ] Complete directory structure: `tree use-cases/pydantic-ai`
- [ ] PydanticAI-specific files: CLAUDE.md with agent patterns, specialized commands
- [ ] Copy script present: `copy_template.py` with proper PydanticAI functionality
- [ ] README comprehensive: Includes agent development workflow and copy instructions
- [ ] Agent examples working: All examples use real PydanticAI code patterns
- [ ] Testing patterns included: TestModel/FunctionModel examples and validation
- [ ] Documentation complete: PydanticAI-specific patterns and gotchas documented

<div class="tb-zh"><p>验证清单：目录结构完整——tree use-cases/pydantic-ai；PydanticAI 专属文件——含 agent 模式与专门命令的 CLAUDE.md；复制脚本存在——copy_template.py 具备恰当的 PydanticAI 功能；README 完整——包含 agent 开发工作流与复制说明；agent 示例可运行——所有示例都使用真实的 PydanticAI 代码模式；包含测试模式——TestModel/FunctionModel 示例与验证；文档完整——PydanticAI 专属模式与坑都已记录。</p></div>

### Quality and Usability for PydanticAI

- [ ] No placeholder content: `grep -r "TODO\|PLACEHOLDER"` returns empty
- [ ] PydanticAI specialization: Agent patterns, tools, testing properly documented
- [ ] Validation loops work: All commands executable with agent-specific functionality
- [ ] Framework integration: Works with base context engineering for AI development
- [ ] Ready for AI development: Developers can immediately create PydanticAI agents

<div class="tb-zh"><p>验证清单：没有占位内容——grep -r "TODO\|PLACEHOLDER" 返回为空；PydanticAI 专门化——agent 模式、工具与测试都被恰当记录；验证闭环可用——所有命令都可执行且具备 agent 专属功能；框架集成——能与用于 AI 开发的基础上下文工程配合；可用于 AI 开发——开发者能立即创建 PydanticAI agent。</p></div>

### PydanticAI Framework Integration

- [ ] Inherits base principles: Context engineering workflow preserved for AI agents
- [ ] Proper AI specialization: PydanticAI patterns, security, testing included
- [ ] Command compatibility: Slash commands work for agent development workflows
- [ ] Documentation consistency: Follows patterns while specializing for AI development
- [ ] Maintainable structure: Easy to update as PydanticAI framework evolves

<div class="tb-zh"><p>验证清单：继承基础原则——上下文工程工作流为 AI agent 得以保留；恰当的 AI 专门化——包含 PydanticAI 模式、安全与测试；命令兼容——斜杠命令可服务于 agent 开发工作流；文档一致——在为 AI 开发专门化的同时遵循既有模式；结构可维护——随 PydanticAI 框架演进易于更新。</p></div>

---

## Anti-Patterns to Avoid

### PydanticAI Template Generation

- ❌ Don't create generic AI templates - research PydanticAI specifics thoroughly
- ❌ Don't skip agent architecture research - understand tools, memory, validation
- ❌ Don't use placeholder agent code - include real, working PydanticAI examples
- ❌ Don't ignore testing patterns - TestModel/FunctionModel are critical for AI

<div class="tb-zh"><p>❌ 不要创建通用的 AI 模板——彻底调研 PydanticAI 的具体细节；❌ 不要跳过 agent 架构调研——理解工具、记忆与校验；❌ 不要使用占位的 agent 代码——包含真实可运行的 PydanticAI 示例；❌ 不要忽视测试模式——TestModel/FunctionModel 对 AI 至关重要。</p></div>

### PydanticAI Content Quality

- ❌ Don't assume AI patterns - document PydanticAI-specific gotchas explicitly
- ❌ Don't skip security research - API keys, input validation, prompt injection critical
- ❌ Don't ignore model providers - include OpenAI, Anthropic, Gemini patterns
- ❌ Don't forget async patterns - PydanticAI has specific async/sync considerations

<div class="tb-zh"><p>❌ 不要对 AI 模式想当然——明确记录 PydanticAI 专属的坑；❌ 不要跳过安全调研——API key、输入校验、提示词注入都至关重要；❌ 不要忽视模型 provider——包含 OpenAI、Anthropic、Gemini 的模式；❌ 不要忘记异步模式——PydanticAI 对 async/sync 有特定考量。</p></div>

### PydanticAI Framework Integration

- ❌ Don't break context engineering - maintain PRP workflow for AI development
- ❌ Don't duplicate base functionality - extend and specialize appropriately
- ❌ Don't ignore AI-specific validation - agent behavior testing is unique requirement
- ❌ Don't skip real examples - include working agents with tools and validation

<div class="tb-zh"><p>❌ 不要破坏上下文工程——为 AI 开发保持 PRP 工作流；❌ 不要重复基础功能——恰当地扩展与专门化；❌ 不要忽视 AI 专属验证——agent 行为测试是独特的要求；❌ 不要跳过真实示例——包含带工具与校验的可运行 agent。</p></div>

**CONFIDENCE SCORE: 9/10** - Comprehensive PydanticAI research completed, framework patterns understood, ready to generate specialized context engineering template for AI agent development.

<div class="tb-zh"><p>置信度评分：9/10——已完成对 PydanticAI 的完整调研，理解了框架模式，可以开始为 AI agent 开发生成专门的上下文工程模板。</p></div>
