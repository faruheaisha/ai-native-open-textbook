---
title: "🏭 Pydantic AI Agent Factory - Global Orchestration Rules"
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

# 🏭 Pydantic AI Agent Factory - Global Orchestration Rules

This defines the complete orchestration workflow for the AI Agent Factory system and the principles that apply to ALL Pydantic AI agent development work. When a user requests to build an AI agent, follow this systematic process using specialized subagents to transform high-level requirements into simple but complete Pydantic AI agents.

<div class="tb-zh"><p>本文件定义了 AI Agent Factory 系统的完整编排工作流，以及适用于所有 Pydantic AI agent 开发工作的原则。当用户请求构建 AI agent 时，遵循这套系统化流程，用专门的 subagent 把高层需求转化为简单但完整的 Pydantic AI agent。</p></div>

**Core Philosophy**: Transform "I want an agent that can search the web" into a fully-functional and tested Pydantic AI agent. User input is required during Phase 0 clarification, then the process runs autonomously.

<div class="tb-zh"><p>核心理念：把「我想要一个能搜索网页的 agent」这句话变成功能完整且经过测试的 Pydantic AI agent。只有在阶段 0 澄清时需要用户输入，之后就自主运行。</p></div>

---

## 🎯 Primary Directive

⚠️ **CRITICAL WORKFLOW TRIGGER**: When ANY user request involves creating, building, or developing an AI agent:

<div class="tb-zh"><p>⚠️ 关键的工作流触发条件：当任何用户请求涉及创建、构建或开发 AI agent 时：</p></div>

1. **IMMEDIATELY** recognize this as an agent factory request (stop everything else)
2. **MUST** follow Phase 0 first - ask clarifying questions
3. **WAIT** for user responses
4. **THEN** check Archon and proceed with workflow

<div class="tb-zh"><p>1）立即把它识别为 agent factory 请求（停下手上的其他事情）；2）必须先走阶段 0——提出澄清问题；3）等待用户回答；4）然后再检查 Archon 并推进工作流。</p></div>

**Factory Workflow Recognition Patterns** (if user says ANY of these):
- "Build an AI agent that..."
- "Create an agent for..."  
- "I need an AI assistant that can..."
- "Make a Pydantic AI agent..."
- "I want to build a Pydantic AI agent..."
- Any request mentioning agent/AI/LLM + functionality

<div class="tb-zh"><p>工厂工作流的识别模式（用户只要说出以下任意一句）：「Build an AI agent that...」「Create an agent for...」「I need an AI assistant that can...」「Make a Pydantic AI agent...」「I want to build a Pydantic AI agent...」，以及任何提到 agent、AI 或 LLM 并附带功能的请求。</p></div>

**MANDATORY Archon Integration (happens AFTER Phase 0):**
1. After getting user clarifications, run `mcp__archon__health_check`
2. If Archon is available:
   - **CREATE** an Archon project for the agent being built
   - **CREATE** tasks in Archon for each workflow phase:
     - Task 1: "Requirements Analysis" (Phase 1 - pydantic-ai-planner)
     - Task 2: "System Prompt Design" (Phase 2A - pydantic-ai-prompt-engineer)
     - Task 3: "Tool Development Planning" (Phase 2B - pydantic-ai-tool-integrator)
     - Task 4: "Dependency Configuration" (Phase 2C - pydantic-ai-dependency-manager)
     - Task 5: "Agent Implementation" (Phase 3 - main Claude Code)
     - Task 6: "Validation & Testing" (Phase 4 - pydantic-ai-validator)
     - Task 7: "Documentation & Delivery" (Phase 5 - main Claude Code)
   - **UPDATE** each task status as you progress:
     - Mark as "doing" when starting the phase
     - Mark as "done" when phase completes successfully
     - Add notes about any issues or deviations
   - **USE** Archon's RAG during implementation for documentation lookup
   - **INSTRUCT** all subagents to reference the Archon project ID
3. If Archon is not available: Proceed without it but use TodoWrite for local tracking

<div class="tb-zh"><p>强制的 Archon 集成（发生在阶段 0 之后）： 1）拿到用户澄清之后，运行 mcparchonhealth_check；2）如果 Archon 可用：创建一个对应正在构建的 agent 的 Archon 项目；为每个工作流阶段在 Archon 中创建任务——任务 1：「Requirements Analysis」（阶段 1，pydantic-ai-planner）、任务 2：「System Prompt Design」（阶段 2A，pydantic-ai-prompt-engineer）、任务 3：「Tool Development Planning」（阶段 2B，pydantic-ai-tool-integrator）、任务 4：「Dependency Configuration」（阶段 2C，pydantic-ai-dependency-manager）、任务 5：「Agent Implementation」（阶段 3，主 Claude Code）、任务 6：「Validation &amp; Testing」（阶段 4，pydantic-ai-validator）、任务 7：「Documentation &amp; Delivery」（阶段 5，主 Claude Code）；随着推进更新每个任务的状态——阶段开始时标为 "doing"，阶段成功完成时标为 "done"，并补充关于问题或偏差的备注；实现期间使用 Archon 的 RAG 查文档；指示所有 subagent 引用该 Archon 项目 ID；3）如果 Archon 不可用：不用它继续推进，但改用 TodoWrite 做本地跟踪。</p></div>

**WORKFLOW ENFORCEMENT**: You MUST:
1. Start with Phase 0 (clarifying questions)
2. Wait for user response before proceeding
3. Then systematically progress through ALL phases
4. Never jump directly to implementation

<div class="tb-zh"><p>工作流强制要求：你必须：1）从阶段 0（澄清问题）开始；2）等待用户回答后再继续；3）然后系统性地走完全部阶段；4）绝不直接跳到实现。</p></div>

When you want to use or call upon a subagent, you must invoke the subagent, giving them a prompt and passing control to them.

<div class="tb-zh"><p>当你想使用或调用某个 subagent 时，必须真正调用它，给它一段提示词并把控制权交给它。</p></div>

---

## 🔄 Complete Factory Workflow

### Phase 0: Request Recognition & Clarification
**Trigger Patterns** (activate factory on any of these):
- "Build an AI agent that..."
- "Create an agent for..."
- "I need an AI assistant that can..."
- "Make a Pydantic AI agent..."
- "Develop an LLM agent..."
- Any request mentioning agent/AI/LLM + functionality

**Immediate Action**:

<div class="tb-zh"><p>立即行动：</p></div>

```
1. Acknowledge agent creation request
2. Ask 2-3 targeted clarifying questions (BEFORE invoking planner):
   - Primary functionality and use case
   - Preferred APIs or integrations (if applicable)
   - Output format preferences
3. ⚠️ CRITICAL: STOP AND WAIT for user responses
   - Wait to proceed to step 4 until user has answered
   - Refrain from making assumptions to "keep the process moving"
   - Avoid creating folders or invoke subagents yet
   - WAIT for explicit user input before continuing
4. Only after user responds: DETERMINE AGENT FOLDER NAME (snake_case, e.g., web_search_agent, asana_manager)
5. Create agents/[AGENT_FOLDER_NAME]/ directory
6. Invoke ALL subagents with the EXACT SAME folder name
7. Tell each subagent: "Output to agents/[AGENT_FOLDER_NAME]/"
```

### Phase 1: Requirements Documentation 🎯
**Subagent**: `pydantic-ai-planner`
**Trigger**: Invoked after Phase 0 clarifications collected
**Mode**: AUTONOMOUS - Works without user interaction
**Philosophy**: SIMPLE, FOCUSED requirements - MVP mindset
**Archon**: Update Task 1 to "doing" before invoking subagent

```
Actions:
1. Update Archon Task 1 "Requirements Analysis" to status="doing"
2. Receive user request + clarifications + FOLDER NAME + Archon project ID from main agent
3. Analyze requirements focusing on CORE functionality only
4. Make simple, practical assumptions (single model, basic error handling)
5. Create minimal INITIAL.md with 2-3 core features maximum
6. Output: agents/[EXACT_FOLDER_NAME]/planning/INITIAL.md
   ⚠️ CRITICAL: Output to planning/ subdirectory
7. Update Archon Task 1 to status="done" after subagent completes
```

**Quality Gate**: INITIAL.md must include:
- ✅ Agent classification and type
- ✅ Functional requirements
- ✅ Technical requirements
- ✅ External dependencies
- ✅ Success criteria

<div class="tb-zh"><p>质量门禁：INITIAL.md 必须包含：✅ agent 的分类与类型；✅ 功能需求；✅ 技术需求；✅ 外部依赖；✅ 成功标准。</p></div>

### Phase 2: Parallel Component Development ⚡
**Execute SIMULTANEOUSLY** (all three subagents work in parallel):
**Archon**: Update Tasks 2, 3, 4 to "doing" before parallel invocation

**CRITICAL: Use parallel tool invocation:** When invoking multiple subagents, you MUST call all three Task tools in a SINGLE message with multiple tool uses. This ensures true parallel execution.
- ❌ WRONG: Invoke planner, wait for completion, then invoke prompt engineer
- ✅ RIGHT: Single message with three Task tool invocations
- Also update all three Archon tasks (2, 3, 4) to "doing" before the parallel invocation

<div class="tb-zh"><p>关键：使用并行工具调用：调用多个 subagent 时，你必须在同一条消息里用多个 tool use 调用全部三个 Task 工具。这样才能保证真正的并行执行。❌ 错误做法：调用 planner，等它完成，再调用 prompt engineer。✅ 正确做法：一条消息里发起三个 Task 工具调用。另外，在并行调用之前把三个 Archon 任务（2、3、4）都更新为 "doing"。</p></div>

#### 2A: System Prompt Engineering
**Subagent**: `pydantic-ai-prompt-engineer`
**Philosophy**: SIMPLE, CLEAR prompts - typically 100-300 words

```
Input: planning/INITIAL.md + FOLDER NAME from main agent
Output: agents/[EXACT_FOLDER_NAME]/planning/prompts.md
⚠️ CRITICAL: Output MARKDOWN file with prompt specifications, NOT Python code
Contents:
- One simple static system prompt (100-300 words)
- Skip dynamic prompts unless explicitly needed
- Focus on essential behavior only
```

#### 2B: Tool Development Planning
**Subagent**: `pydantic-ai-tool-integrator`
**Philosophy**: MINIMAL tools - 2-3 essential functions only

```
Input: planning/INITIAL.md + FOLDER NAME from main agent
Output: agents/[EXACT_FOLDER_NAME]/planning/tools.md
⚠️ CRITICAL: Output MARKDOWN file with tool specifications, NOT Python code
Contents:
- 2-3 essential tool specifications only
- Simple parameters (1-3 per tool)
- Basic error handling
- Single-purpose tools
```

#### 2C: Dependency Configuration Planning
**Subagent**: `pydantic-ai-dependency-manager`
**Philosophy**: MINIMAL config - essential environment variables only

```
Input: planning/INITIAL.md + FOLDER NAME from main agent
Output: agents/[EXACT_FOLDER_NAME]/planning/dependencies.md
⚠️ CRITICAL: Output MARKDOWN file with dependency specifications, NOT Python code
Contents:
- Essential environment variables only
- Single model provider (no fallbacks)
- Simple dataclass dependencies
- Minimal Python packages
```

**Phase 2 Complete When**: All three subagents report completion

<div class="tb-zh"><p>阶段 2 完成的标志：三个 subagent 都报告完成。</p></div>

### Phase 3: Agent Implementation 🔨
**Actor**: Main Claude Code (not a subagent)
**Archon**: Update Task 5 to "doing" before starting implementation

```
Actions:
1. Update Archon Task 5 "Agent Implementation" to status="doing"
2. Mark Archon Tasks 2, 3, 4 as "done" (after verifying subagents completed)
3. READ the 4 markdown files from planning phase:
   - agents/[folder]/planning/INITIAL.md
   - agents/[folder]/planning/prompts.md
   - agents/[folder]/planning/tools.md
   - agents/[folder]/planning/dependencies.md
4. Use Archon RAG to search for Pydantic AI patterns and examples as needed
5. IMPLEMENT the actual Python code based on specifications:
   - Convert prompt specs → prompts.py
   - Convert tool specs → tools.py
   - Convert dependency specs → settings.py, providers.py, dependencies.py
6. Create complete agent implementation:
   - Combine all components into agent.py
   - Wire up dependencies and tools
   - Create main execution file
7. Update Archon Task 5 to status="done" when implementation completes
8. Structure final project:
   agents/[agent_name]/
   ├── agent.py           # Main agent
   ├── settings.py        # Configuration
   ├── providers.py       # Model providers
   ├── dependencies.py    # Dependencies
   ├── tools.py          # Tool implementations
   ├── prompts.py        # System prompts
   ├── __init__.py       # Package init
   ├── requirements.txt  # Python deps
   ├── .env.example      # Environment template
   └── README.md         # Usage documentation
```

### Phase 4: Validation & Testing ✅
**Subagent**: `pydantic-ai-validator`
**Trigger**: Automatic after implementation
**Duration**: 3-5 minutes
**Archon**: Update Task 6 to "doing" before invoking validator

```
Actions:
1. Update Archon Task 6 "Validation & Testing" to status="doing"
2. Invoke validator subagent with agent folder and Archon project ID
3. Create comprehensive test suite
4. Validate against INITIAL.md requirements
5. Run tests with TestModel
6. Generate validation report
7. Update Archon Task 6 to status="done" after validation completes
8. Output: agents/[agent_name]/tests/
   ├── test_agent.py
   ├── test_tools.py
   ├── test_integration.py
   ├── test_validation.py
   ├── conftest.py
   └── VALIDATION_REPORT.md
```

**Success Criteria**:
- All requirements validated
- Core functionality tested
- Error handling verified
- Performance acceptable

<div class="tb-zh"><p>成功标准：所有需求都经过验证；核心功能经过测试；错误处理经过核实；性能可接受。</p></div>

### Phase 5: Delivery & Documentation 📦
**Actor**: Main Claude Code
**Archon**: Update Task 7 to "doing" before final documentation
**Final Actions**:

```
1. Update Archon Task 7 "Documentation & Delivery" to status="doing"
2. Generate comprehensive README.md
3. Create usage examples
4. Document API endpoints (if applicable)
5. Provide deployment instructions
6. Update Archon Task 7 to status="done"
7. Add final notes to Archon project about agent capabilities
8. Summary report to user with Archon project link
```

---

## 📋 Archon Task Management Protocol

### Task Creation Flow
When Archon is available, create all workflow tasks immediately after project creation:

```python
# After creating Archon project
tasks = [
    {"title": "Requirements Analysis", "assignee": "pydantic-ai-planner"},
    {"title": "System Prompt Design", "assignee": "pydantic-ai-prompt-engineer"},
    {"title": "Tool Development Planning", "assignee": "pydantic-ai-tool-integrator"},
    {"title": "Dependency Configuration", "assignee": "pydantic-ai-dependency-manager"},
    {"title": "Agent Implementation", "assignee": "Claude Code"},
    {"title": "Validation & Testing", "assignee": "pydantic-ai-validator"},
    {"title": "Documentation & Delivery", "assignee": "Claude Code"}
]
# Create all tasks with status="todo" initially
```

### Task Status Updates
- Set to "doing" immediately before starting each phase
- Set to "done" immediately after phase completes successfully
- Add notes if phase encounters issues or deviations
- Never have multiple tasks in "doing" status (except during parallel Phase 2)

### Subagent Communication
Always pass the Archon project ID to subagents:
- Include in the prompt: "Use Archon Project ID: [project-id]"
- Subagents should reference this in their output for traceability

## 🎭 Subagent Invocation Rules

### Automatic Invocation
Subagents are invoked AUTOMATICALLY based on workflow phase:

```python
if user_request.contains(agent_creation_pattern):
    # Phase 0 - Main Claude Code asks clarifications
    clarifications = ask_user_questions()
    
    # Phase 1 - Invoke planner with context
    invoke("pydantic-ai-planner", context={
        "user_request": original_request,
        "clarifications": clarifications
    })
    
    # Phase 2 - Parallel automatic
    parallel_invoke([
        "pydantic-ai-prompt-engineer",
        "pydantic-ai-tool-integrator", 
        "pydantic-ai-dependency-manager"
    ])
    
    # Phase 3 - Main Claude Code
    implement_agent()
    
    # Phase 4 - Automatic
    invoke("pydantic-ai-validator")
```

### Manual Override
Users can explicitly request specific subagents:
- "Use the planner to refine requirements"
- "Have the tool integrator add web search"
- "Run the validator again"

---

## 📁 Output Directory Structure

Every agent factory run creates:

<div class="tb-zh"><p>每一次 agent factory 运行都会创建：</p></div>

```
agents/
└── [agent_name]/
    ├── planning/              # All planning documents
    │   ├── INITIAL.md         # Requirements (planner)
    │   ├── prompts.md         # Prompt specifications (prompt-engineer)
    │   ├── tools.md           # Tool specifications (tool-integrator)
    │   └── dependencies.md    # Dependency specifications (dependency-manager)
    ├── agent.py               # Main implementation
    ├── settings.py            # Configuration
    ├── providers.py           # Model providers
    ├── dependencies.py        # Dependencies
    ├── tools.py              # Tools
    ├── prompts.py            # Prompts
    ├── cli.py                # CLI interface
    ├── requirements.txt      # Python packages
    ├── .env.example          # Environment template
    ├── README.md             # Documentation
    └── tests/                # Test suite (if created)
        ├── test_agent.py
        └── test_tools.py
```

---

## 🔧 Implementation Guidelines

### For Simple Agent Requests
Example: "Build an agent that can search the web"

```
1. Planner asks minimal questions (1-2)
2. Assumes standard patterns (Brave API, string output)
3. Completes in ~10 minutes total
4. Delivers working agent with basic tests
```

### For Complex Agent Requests
Example: "Build a multi-modal agent with database, caching, and workflow orchestration"

```
1. Planner asks comprehensive questions (4-5)
2. Multiple iterations may be needed
3. Delivers simple yet complete system with full test coverage
```

### Error Handling Protocol
If any subagent fails:

```
1. Log error with context
2. Attempt automatic recovery
3. If recovery fails, ask user for guidance
4. Continue with partial implementation if possible
5. Document limitations in README
```

---

## 📝 Main Agent Clarification Guidelines

When a user requests an AI agent, the main Claude Code agent should:

<div class="tb-zh"><p>当用户请求一个 AI agent 时，主 Claude Code agent 应当：</p></div>

### Ask 2-3 Focused Questions
Keep questions simple and targeted:
1. **Core Functionality**: "What specific tasks should this agent handle?"
2. **Integration Needs**: "Will it need to connect to any external services or APIs?"
3. **Output Format**: "Should it return plain text, structured data, or something else?"

### Avoid Over-Questioning
- Don't ask about technical details (the planner will handle those)
- Don't ask about implementation specifics
- Keep questions high-level and user-friendly

### Pass Context to Planner
When invoking the planner, provide:
- Original user request
- User's answers to clarifying questions
- Any additional context from the conversation

## 🚀 Quick Start Examples

### Example 1: Web Search Agent
**User**: "I want to build an AI agent that can search the web"

**Claude Code Response**:

<div class="tb-zh"><p>Claude Code 的回应：</p></div>

```
I'll help you build a web search AI agent using the Pydantic AI framework. Let me ask a few quick questions to better understand your needs:

1. What will the agent primarily search for? (general web content, specific domains, research papers, etc.)
2. Should the agent summarize the results or return raw search data?
3. Do you have a preference for which search API to use? (Brave, Google, Bing)

[STOPS HERE AND WAITS FOR USER TO RESPOND]

[After user responds with their answers]

Perfect! Based on your requirements [summarize their answers], I'll now invoke our requirements planner to create a comprehensive specification for your web search agent.

📋 Creating Requirements Document...
[Invokes pydantic-ai-planner with context]

[Planner works autonomously and creates INITIAL.md]

⚙️ Building Agent Components...
[Parallel invocation of prompt-engineer, tool-integrator, dependency-manager]

🔨 Implementing Your Agent...
[Main implementation]

✅ Running Validation...
[Invokes pydantic-ai-validator]

🎉 Agent Complete!
Your web search agent is ready at: agents/web_search_agent/
```

### Example 2: Database Query Agent
**User**: "Create an agent that can query PostgreSQL databases and explain results"

**Claude Code Response**:

<div class="tb-zh"><p>Claude Code 的回应：</p></div>

```
I'll create a PostgreSQL query agent with explanation capabilities. Let me ask a few quick questions first:

1. What types of queries will this agent need to run? (SELECT only, or also INSERT/UPDATE/DELETE?)
2. Should it connect to a specific database or handle multiple database connections?
3. How detailed should the explanations be? (brief summaries or detailed analysis?)

[STOPS HERE AND WAITS FOR USER TO RESPOND]

[After user responds with their answers]

Great! Based on your requirements [summarize their answers], I'll now create a comprehensive requirements document for your PostgreSQL agent.

📋 Creating Requirements Document...
[Invokes pydantic-ai-planner with context]
[Process continues autonomously]
```

---

## 🔍 Monitoring & Debugging

### Progress Tracking
Claude Code should provide status updates:

```
✅ Phase 1: Requirements Complete (INITIAL.md created)
⏳ Phase 2: Building Components (3 subagents working...)
  ✅ Prompts: Complete
  ✅ Tools: Complete
  ⏳ Dependencies: In progress...
⏳ Phase 3: Implementation pending...
⏳ Phase 4: Validation pending...
```

### Debug Mode
Enable with: "Build agent in debug mode"
- Verbose logging from all subagents
- Intermediate outputs preserved
- Step-by-step confirmation mode
- Performance metrics collected

---

## 🛡️ Quality Assurance

### Every Agent MUST Have:
1. **Comprehensive tests** using TestModel/FunctionModel
2. **Error handling** for all external operations
3. **Security measures** for API keys and inputs
4. **Documentation** for usage and deployment
5. **Environment template** (.env.example)

### Validation Checklist
Before delivery, confirm:
- [ ] All requirements from INITIAL.md implemented
- [ ] Tests passing with >80% coverage
- [ ] API keys properly managed
- [ ] Error scenarios handled
- [ ] Documentation complete
- [ ] Usage examples provided

---

## 🎨 Customization Points

### User Preferences
Users can specify:
- Preferred LLM provider (OpenAI, Anthropic, Gemini)
- Output format (string, structured, streaming)
- Testing depth (basic, comprehensive, exhaustive)
- Documentation style (minimal, standard, detailed)

### Advanced Features
For power users:
- Custom subagent configurations
- Alternative workflow sequences
- Integration with existing codebases
- CI/CD pipeline generation

---

## 📊 Success Metrics

Track factory performance:
- **Time to Completion**: Target <15 minutes for standard agents
- **Test Coverage**: Minimum 80% for agents
- **Validation Pass Rate**: 100% of requirements tested
- **User Intervention**: Minimize to initial requirements only

<div class="tb-zh"><p>跟踪工厂的性能：完成时间——标准 agent 的目标是 15 分钟以内；测试覆盖率——agent 最低 80%；验证通过率——100% 的需求经过测试；用户介入——尽量只限于初始需求。</p></div>

---

## 🔄 Continuous Improvement

### Feedback Loop
After each agent creation:
1. Analyze what worked well
2. Identify bottlenecks
3. Update subagent prompts if needed
4. Refine workflow based on patterns

### Pattern Library
Build a library of common patterns:
- Search agents
- Database agents
- Workflow orchestrators
- Chat interfaces
- API integrations

---

## 🚨 Important Rules

### ALWAYS:
- ✅ Use python-dotenv for environment management
- ✅ Create a .env.example
- ✅ Follow main_agent_reference patterns
- ✅ Create comprehensive tests
- ✅ Document everything
- ✅ Validate against requirements

### Anti-patterns to ALWAYS avoid:
- ❌ Hardcode API keys or secrets
- ❌ Skip testing phase
- ❌ Ignore error handling
- ❌ Create overly complex agents
- ❌ Forget security considerations

---

## 🎯 Final Checklist

Before considering an agent complete:
- [ ] Requirements captured in INITIAL.md
- [ ] All components generated by subagents
- [ ] Agent implementation complete and functional
- [ ] Tests written and passing
- [ ] Documentation comprehensive
- [ ] Security measures in place
- [ ] User provided with clear next steps

<div class="tb-zh"><p>在认为一个 agent 完成之前：需求已记录在 INITIAL.md 中；所有组件都由 subagent 生成；agent 实现完整且可用；测试已编写并通过；文档完整；安全措施到位；已向用户提供清晰的后续步骤。</p></div>

---

## 🔄 Pydantic AI Core Principles

**IMPORTANT: These principles apply to ALL Pydantic AI agent development:**

<div class="tb-zh"><p>重要：这些原则适用于所有 Pydantic AI agent 开发：</p></div>

### Research Methodology for AI Agents
- **Web search extensively** - Always research Pydantic AI patterns and best practices
- **Study official documentation** - ai.pydantic.dev is the authoritative source
- **Pattern extraction** - Identify reusable agent architectures and tool patterns
- **Gotcha documentation** - Document async patterns, model limits, and context management issues

## 📚 Project Awareness & Context

- **Use a virtual environment** to run all code and tests. If one isn't already in the codebase when needed, create it
- **Use consistent Pydantic AI naming conventions** and agent structure patterns
- **Follow established agent directory organization** patterns (agent.py, tools.py, models.py)
- **Leverage Pydantic AI examples extensively** - Study existing patterns before creating new agents

<div class="tb-zh"><p>使用虚拟环境运行所有代码与测试，如果代码库中还没有，就在需要时创建它；使用统一的 Pydantic AI 命名约定与 agent 结构模式；遵循既定的 agent 目录组织模式（agent.py、tools.py、models.py）；大量借鉴 Pydantic AI 示例——在创建新 agent 之前先研究既有模式。</p></div>

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

## 🤖 Pydantic AI Development Standards

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

## 📎 Pydantic AI Coding Standards

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
