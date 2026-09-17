---
title: "Context Engineering Template"
sourceId: "10-context-memory/context-engineering-intro"
sourceTitle: "Context Engineering Intro"
sourceKind: "工程手册"
licenseLabel: "可转载"
lang: "英文"
tier: 1
volume: "10-context-memory"
sourceUrl: "https://github.com/coleam00/context-engineering-intro"
entryUrl: "https://github.com/coleam00/context-engineering-intro/blob/a2d84b021cee1e2f4e77ba854bba0be8cb319035/README.md"
sourceRel: "README.md"
rawUrl: "/raw/10-context-memory/context-engineering-intro/README.md"
sourceSha256: "ab659339a50f0f8ab4e5383d3d9edbe85cf49f014cfd968544ecb2fd1759531c"
pageSha256: "ab659339a50f0f8ab4e5383d3d9edbe85cf49f014cfd968544ecb2fd1759531c"
contentMode: "local-full"
zh: "on"
---

# Context Engineering Template

A comprehensive template for getting started with Context Engineering - the discipline of engineering context for AI coding assistants so they have the information necessary to get the job done end to end.

<div class="tb-zh"><p>一份用于上手上下文工程的综合模板——上下文工程这门功夫，是为 AI 编程助手设计上下文，让它们掌握必要信息、端到端把活干完。</p></div>

> **Context Engineering is 10x better than prompt engineering and 100x better than vibe coding.**

<div class="tb-zh"><p>上下文工程比提示词工程强 10 倍，比 vibe coding 强 100 倍。</p></div>

## 🚀 Quick Start

```bash
# 1. Clone this template
git clone https://github.com/coleam00/Context-Engineering-Intro.git
cd Context-Engineering-Intro

# 2. Set up your project rules (optional - template provided)
# Edit CLAUDE.md to add your project-specific guidelines

# 3. Add examples (highly recommended)
# Place relevant code examples in the examples/ folder

# 4. Create your initial feature request
# Edit INITIAL.md with your feature requirements

# 5. Generate a comprehensive PRP (Product Requirements Prompt)
# In Claude Code, run:
/generate-prp INITIAL.md

# 6. Execute the PRP to implement your feature
# In Claude Code, run:
/execute-prp PRPs/your-feature-name.md
```

## 📚 Table of Contents

- [What is Context Engineering?](#what-is-context-engineering)
- [Template Structure](#template-structure)
- [Step-by-Step Guide](#step-by-step-guide)
- [Writing Effective INITIAL.md Files](#writing-effective-initialmd-files)
- [The PRP Workflow](#the-prp-workflow)
- [Using Examples Effectively](#using-examples-effectively)
- [Best Practices](#best-practices)

<div class="tb-zh"><p>什么是上下文工程？· 模板结构 · 分步指南 · 如何写好 INITIAL.md · PRP 工作流 · 如何有效使用示例 · 最佳实践。</p></div>

## What is Context Engineering?

Context Engineering represents a paradigm shift from traditional prompt engineering:

<div class="tb-zh"><p>上下文工程代表着一次从传统提示词工程出发的范式转变：</p></div>

### Prompt Engineering vs Context Engineering

**Prompt Engineering:**
- Focuses on clever wording and specific phrasing
- Limited to how you phrase a task
- Like giving someone a sticky note

<div class="tb-zh"><p>提示词工程：关注措辞是否巧妙、表达是否精准；局限于你如何描述一项任务；就像给别人递一张便利贴。</p></div>

**Context Engineering:**
- A complete system for providing comprehensive context
- Includes documentation, examples, rules, patterns, and validation
- Like writing a full screenplay with all the details

<div class="tb-zh"><p>上下文工程：一套提供完整上下文的完整体系；包含文档、示例、规则、模式和验证；就像写出带全部细节的完整剧本。</p></div>

### Why Context Engineering Matters

1. **Reduces AI Failures**: Most agent failures aren't model failures - they're context failures
2. **Ensures Consistency**: AI follows your project patterns and conventions
3. **Enables Complex Features**: AI can handle multi-step implementations with proper context
4. **Self-Correcting**: Validation loops allow AI to fix its own mistakes

<div class="tb-zh"><p>1）减少 AI 失败：大多数 agent 的失败不是模型失败，而是上下文失败；2）保证一致性：AI 会遵循你项目的模式与约定；3）支撑复杂功能：有了恰当的上下文，AI 能处理多步实现；4）自我纠正：验证闭环让 AI 能自己修错。</p></div>

## Template Structure

```
context-engineering-intro/
├── .claude/
│   ├── commands/
│   │   ├── generate-prp.md    # Generates comprehensive PRPs
│   │   └── execute-prp.md     # Executes PRPs to implement features
│   └── settings.local.json    # Claude Code permissions
├── PRPs/
│   ├── templates/
│   │   └── prp_base.md       # Base template for PRPs
│   └── EXAMPLE_multi_agent_prp.md  # Example of a complete PRP
├── examples/                  # Your code examples (critical!)
├── CLAUDE.md                 # Global rules for AI assistant
├── INITIAL.md               # Template for feature requests
├── INITIAL_EXAMPLE.md       # Example feature request
└── README.md                # This file
```

This template doesn't focus on RAG and tools with context engineering because I have a LOT more in store for that soon. ;)

<div class="tb-zh"><p>这份模板没有聚焦 RAG 与工具在上下文工程中的用法，因为我很快还会拿出多得多的东西。;)</p></div>

## Step-by-Step Guide

### 1. Set Up Global Rules (CLAUDE.md)

The `CLAUDE.md` file contains project-wide rules that the AI assistant will follow in every conversation. The template includes:

<div class="tb-zh"><p>CLAUDE.md 文件包含项目级规则，AI 助手会在每次对话中遵循。模板里包含：</p></div>

- **Project awareness**: Reading planning docs, checking tasks
- **Code structure**: File size limits, module organization
- **Testing requirements**: Unit test patterns, coverage expectations
- **Style conventions**: Language preferences, formatting rules
- **Documentation standards**: Docstring formats, commenting practices

<div class="tb-zh"><p>项目感知：读取规划文档、检查任务；代码结构：文件大小限制、模块组织；测试要求：单元测试模式、覆盖率预期；风格约定：语言偏好、格式规则；文档标准：docstring 格式、注释习惯。</p></div>

**You can use the provided template as-is or customize it for your project.**

<div class="tb-zh"><p>你可以直接使用提供的模板，也可以针对自己的项目做定制。</p></div>

### 2. Create Your Initial Feature Request

Edit `INITIAL.md` to describe what you want to build:

<div class="tb-zh"><p>编辑 INITIAL.md，描述你想构建什么：</p></div>

```markdown
## FEATURE:
[Describe what you want to build - be specific about functionality and requirements]

## EXAMPLES:
[List any example files in the examples/ folder and explain how they should be used]

## DOCUMENTATION:
[Include links to relevant documentation, APIs, or MCP server resources]

## OTHER CONSIDERATIONS:
[Mention any gotchas, specific requirements, or things AI assistants commonly miss]
```

**See `INITIAL_EXAMPLE.md` for a complete example.**

<div class="tb-zh"><p>完整示例见 INITIAL_EXAMPLE.md。</p></div>

### 3. Generate the PRP

PRPs (Product Requirements Prompts) are comprehensive implementation blueprints that include:

<div class="tb-zh"><p>PRP（产品需求提示，Product Requirements Prompts）是综合性的实现蓝图，包含：</p></div>

- Complete context and documentation
- Implementation steps with validation
- Error handling patterns
- Test requirements

<div class="tb-zh"><p>完整的上下文与文档；带验证的实现步骤；错误处理模式；测试要求。</p></div>

They are similar to PRDs (Product Requirements Documents) but are crafted more specifically to instruct an AI coding assistant.

<div class="tb-zh"><p>它们类似 PRD（产品需求文档），但写法更专门，用来指示 AI 编程助手。</p></div>

Run in Claude Code:

<div class="tb-zh"><p>在 Claude Code 中运行：</p></div>

```bash
/generate-prp INITIAL.md
```

**Note:** The slash commands are custom commands defined in `.claude/commands/`. You can view their implementation:
- `.claude/commands/generate-prp.md` - See how it researches and creates PRPs
- `.claude/commands/execute-prp.md` - See how it implements features from PRPs

<div class="tb-zh"><p>注意：这些斜杠命令是在 .claude/commands/ 里自定义的。你可以查看它们的实现：.claude/commands/generate-prp.md——看它如何做调研并生成 PRP；.claude/commands/execute-prp.md——看它如何依据 PRP 实现功能。</p></div>

The `$ARGUMENTS` variable in these commands receives whatever you pass after the command name (e.g., `INITIAL.md` or `PRPs/your-feature.md`).

<div class="tb-zh"><p>这些命令里的 $ARGUMENTS 变量会接收你在命令名之后传入的内容（例如 INITIAL.md 或 PRPs/your-feature.md）。</p></div>

This command will:
1. Read your feature request
2. Research the codebase for patterns
3. Search for relevant documentation
4. Create a comprehensive PRP in `PRPs/your-feature-name.md`

<div class="tb-zh"><p>这条命令会：1）读取你的功能需求；2）在代码库里调研可用的模式；3）检索相关文档；4）在 PRPs/你的功能名.md 中生成一份完整的 PRP。</p></div>

### 4. Execute the PRP

Once generated, execute the PRP to implement your feature:

<div class="tb-zh"><p>生成之后，执行该 PRP 来实现你的功能：</p></div>

```bash
/execute-prp PRPs/your-feature-name.md
```

The AI coding assistant will:
1. Read all context from the PRP
2. Create a detailed implementation plan
3. Execute each step with validation
4. Run tests and fix any issues
5. Ensure all success criteria are met

<div class="tb-zh"><p>AI 编程助手会：1）读取 PRP 中的全部上下文；2）制定详细的实现计划；3）逐步执行并做验证；4）运行测试并修复问题；5）确认所有成功标准都满足。</p></div>

## Writing Effective INITIAL.md Files

### Key Sections Explained

**FEATURE**: Be specific and comprehensive
- ❌ "Build a web scraper"
- ✅ "Build an async web scraper using BeautifulSoup that extracts product data from e-commerce sites, handles rate limiting, and stores results in PostgreSQL"

<div class="tb-zh"><p>功能：要具体、要全面。❌「做一个网页爬虫」；✅「用 BeautifulSoup 做一个异步网页爬虫，从电商站点抽取商品数据，处理限流，并把结果存入 PostgreSQL」。</p></div>

**EXAMPLES**: Leverage the examples/ folder
- Place relevant code patterns in `examples/`
- Reference specific files and patterns to follow
- Explain what aspects should be mimicked

<div class="tb-zh"><p>示例：善用 examples/ 目录。把相关的代码模式放进 examples/；引用具体的文件与要遵循的模式；说明哪些地方需要照搬。</p></div>

**DOCUMENTATION**: Include all relevant resources
- API documentation URLs
- Library guides
- MCP server documentation
- Database schemas

<div class="tb-zh"><p>文档：把所有相关资源都带上。API 文档 URL；库的使用指南；MCP 服务器文档；数据库 schema。</p></div>

**OTHER CONSIDERATIONS**: Capture important details
- Authentication requirements
- Rate limits or quotas
- Common pitfalls
- Performance requirements

<div class="tb-zh"><p>其他考量：把重要细节写清楚。认证要求；速率限制或配额；常见坑；性能要求。</p></div>

## The PRP Workflow

### How /generate-prp Works

The command follows this process:

<div class="tb-zh"><p>这条命令遵循以下流程：</p></div>

1. **Research Phase**
   - Analyzes your codebase for patterns
   - Searches for similar implementations
   - Identifies conventions to follow

<div class="tb-zh"><p>1）调研阶段：分析你的代码库找出模式；搜索类似实现；识别应当遵循的约定。</p></div>

2. **Documentation Gathering**
   - Fetches relevant API docs
   - Includes library documentation
   - Adds gotchas and quirks

<div class="tb-zh"><p>2）收集文档：抓取相关 API 文档；纳入库的文档；补充各种坑与古怪之处。</p></div>

3. **Blueprint Creation**
   - Creates step-by-step implementation plan
   - Includes validation gates
   - Adds test requirements

<div class="tb-zh"><p>3）生成蓝图：制定分步实现计划；加入验证关卡；补充测试要求。</p></div>

4. **Quality Check**
   - Scores confidence level (1-10)
   - Ensures all context is included

<div class="tb-zh"><p>4）质量检查：给置信度打分（1–10）；确保所有上下文都已包含。</p></div>

### How /execute-prp Works

1. **Load Context**: Reads the entire PRP
2. **Plan**: Creates detailed task list using TodoWrite
3. **Execute**: Implements each component
4. **Validate**: Runs tests and linting
5. **Iterate**: Fixes any issues found
6. **Complete**: Ensures all requirements met

<div class="tb-zh"><p>1）加载上下文：读完整个 PRP；2）规划：用 TodoWrite 生成详细任务清单；3）逐个实现各组件；4）验证：运行测试与 lint；5）迭代：修复发现的问题；6）完成：确保所有要求都满足。</p></div>

See `PRPs/EXAMPLE_multi_agent_prp.md` for a complete example of what gets generated.

<div class="tb-zh"><p>生成结果长什么样，完整示例见 PRPs/EXAMPLE_multi_agent_prp.md。</p></div>

## Using Examples Effectively

The `examples/` folder is **critical** for success. AI coding assistants perform much better when they can see patterns to follow.

<div class="tb-zh"><p>examples/ 目录对成功至关重要。当 AI 编程助手能看到可以照搬的模式时，表现会好得多。</p></div>

### What to Include in Examples

1. **Code Structure Patterns**
   - How you organize modules
   - Import conventions
   - Class/function patterns

<div class="tb-zh"><p>1）代码结构模式：你如何组织模块；import 约定；类与函数的写法。</p></div>

2. **Testing Patterns**
   - Test file structure
   - Mocking approaches
   - Assertion styles

<div class="tb-zh"><p>2）测试模式：测试文件结构；mock 的做法；断言风格。</p></div>

3. **Integration Patterns**
   - API client implementations
   - Database connections
   - Authentication flows

<div class="tb-zh"><p>3）集成模式：API 客户端的实现；数据库连接；认证流程。</p></div>

4. **CLI Patterns**
   - Argument parsing
   - Output formatting
   - Error handling

<div class="tb-zh"><p>4）CLI 模式：参数解析；输出格式；错误处理。</p></div>

### Example Structure

```
examples/
├── README.md           # Explains what each example demonstrates
├── cli.py             # CLI implementation pattern
├── agent/             # Agent architecture patterns
│   ├── agent.py      # Agent creation pattern
│   ├── tools.py      # Tool implementation pattern
│   └── providers.py  # Multi-provider pattern
└── tests/            # Testing patterns
    ├── test_agent.py # Unit test patterns
    └── conftest.py   # Pytest configuration
```

## Best Practices

### 1. Be Explicit in INITIAL.md
- Don't assume the AI knows your preferences
- Include specific requirements and constraints
- Reference examples liberally

### 2. Provide Comprehensive Examples
- More examples = better implementations
- Show both what to do AND what not to do
- Include error handling patterns

### 3. Use Validation Gates
- PRPs include test commands that must pass
- AI will iterate until all validations succeed
- This ensures working code on first try

### 4. Leverage Documentation
- Include official API docs
- Add MCP server resources
- Reference specific documentation sections

### 5. Customize CLAUDE.md
- Add your conventions
- Include project-specific rules
- Define coding standards

## Resources

- [Claude Code Documentation](https://docs.anthropic.com/en/docs/claude-code)
- [Context Engineering Best Practices](https://www.philschmid.de/context-engineering)

<div class="tb-zh"><p>延伸阅读：Claude Code 文档；上下文工程最佳实践。</p></div>
