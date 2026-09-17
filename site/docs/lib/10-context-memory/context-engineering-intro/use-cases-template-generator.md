---
title: "Template Generator - Meta-Framework for Context Engineering"
sourceId: "10-context-memory/context-engineering-intro"
sourceTitle: "Context Engineering Intro"
sourceKind: "工程手册"
licenseLabel: "可转载"
lang: "英文"
tier: 1
volume: "10-context-memory"
sourceUrl: "https://github.com/coleam00/context-engineering-intro"
entryUrl: "https://github.com/coleam00/context-engineering-intro/blob/a2d84b021cee1e2f4e77ba854bba0be8cb319035/use-cases/template-generator/README.md"
sourceRel: "use-cases/template-generator/README.md"
rawUrl: "/raw/10-context-memory/context-engineering-intro/use-cases/template-generator/README.md"
sourceSha256: "4d1afacb98d979cf62d26c6b8e7ad33fffde9ab6576877bf1e7104d4420da48b"
pageSha256: "4d1afacb98d979cf62d26c6b8e7ad33fffde9ab6576877bf1e7104d4420da48b"
contentMode: "local-full"
zh: "on"
---

# Template Generator - Meta-Framework for Context Engineering

This template generator creates complete context engineering template packages for any technology domain. It's a meta-template that generates specialized templates for frameworks like Pydantic AI, Supabase, CrewAI, etc.

<div class="tb-zh"><p>这个模板生成器能为任何技术领域创建完整的上下文工程模板包。它是一个元模板，用于为 Pydantic AI、Supabase、CrewAI 等框架生成专门化的模板。</p></div>

## 🚀 Quick Start

```bash
# 1. Define your template requirements in detail
# Edit PRPs/INITIAL.md with specific technology and requirements

# 2. Generate comprehensive template PRP
/generate-template-prp PRPs/INITIAL.md

# 3. Execute the PRP to create complete template package
/execute-template-prp PRPs/template-{technology-name}.md
```

## 📚 What This Creates

This meta-template generates complete context engineering template packages with:

<div class="tb-zh"><p>这个元模板会生成完整的上下文工程模板包，包含：</p></div>

### Generated Template Structure

```
use-cases/{technology-name}/
├── CLAUDE.md                          # Technology-specific global rules
├── .claude/commands/
│   ├── generate-{tech}-prp.md        # Domain PRP generation
│   └── execute-{tech}-prp.md         # Domain PRP execution
├── PRPs/
│   ├── templates/
│   │   └── prp_{tech}_base.md        # Technology-specific base PRP
│   ├── ai_docs/                      # Domain documentation
│   └── INITIAL.md                    # Example feature request
├── examples/                         # Technology-specific examples
└── README.md                         # Usage guide
```

### Template Features

**Technology Specialization:**
- Framework-specific global rules and patterns
- Technology-appropriate validation loops
- Domain-specific research methodologies
- Framework-specialized documentation references

<div class="tb-zh"><p>技术专门化： 框架专属的全局规则与模式；适合该技术的验证闭环；领域专属的调研方法论；框架专门化的文档引用。</p></div>

**Web Research Integration:**
- Extensive web search requirements for technology research
- Official documentation gathering and analysis
- Real-world pattern identification and extraction
- Best practices and gotcha documentation

<div class="tb-zh"><p>网页调研集成： 对技术调研提出大量网页搜索要求；收集并分析官方文档；识别并提取真实世界中的模式；记录最佳实践与各种坑。</p></div>

**Context Engineering Adaptation:**
- PRP framework adapted for specific technologies
- Domain-appropriate success criteria
- Technology-specific implementation blueprints
- Framework-specialized validation gates

<div class="tb-zh"><p>上下文工程适配： 为特定技术改造的 PRP 框架；适合该领域的成功标准；技术专属的实现蓝图；框架专门化的验证门禁。</p></div>

## 🔍 Research-Driven Approach

This meta-template emphasizes **extensive web research** as the foundation for creating high-quality templates:

<div class="tb-zh"><p>这个元模板强调把大量网页调研作为创建高质量模板的基础：</p></div>

1. **Technology Deep Dive** - Comprehensive research of official docs, patterns, and best practices
2. **Pattern Extraction** - Identification of real-world implementation patterns
3. **Context Integration** - Adaptation of context engineering principles for the technology
4. **Validation Design** - Creation of technology-appropriate testing and validation loops

<div class="tb-zh"><p>1）技术深度研读——对官方文档、模式和最佳实践做完整调研；2）模式提取——识别真实世界的实现模式；3）上下文集成——为该技术适配上下文工程原则；4）验证设计——创建适合该技术的测试与验证闭环。</p></div>

## 📋 Usage Process

### 1. Define Requirements (PRPs/INITIAL.md)

Be extremely specific about:
- **Target technology/framework**
- **Core features to support**
- **Examples to include**
- **Documentation to research**
- **Development patterns**
- **Security considerations**
- **Common gotchas**
- **Validation requirements**

<div class="tb-zh"><p>请把以下几点写得极其具体：目标技术或框架；要支持的核心功能；要包含的示例；要调研的文档；开发模式；安全考量；常见的坑；验证要求。</p></div>

### 2. Generate Template PRP

```bash
/generate-template-prp PRPs/INITIAL.md
```

This will:
- Conduct extensive web research on your specified technology
- Analyze official documentation and best practices
- Create comprehensive implementation blueprint
- Design technology-specific validation loops

<div class="tb-zh"><p>它会：针对你指定的技术做大量网页调研；分析官方文档与最佳实践；创建完整的实现蓝图；设计该技术专属的验证闭环。</p></div>

### 3. Execute Template Generation

```bash
/execute-template-prp PRPs/template-{technology-name}.md
```

This will:
- Create complete template package directory structure
- Generate technology-specific CLAUDE.md with global rules
- Create specialized PRP commands for the technology
- Develop domain-specific base PRP template
- Include working examples and comprehensive documentation

<div class="tb-zh"><p>它会：创建完整的模板包目录结构；生成带全局规则的技术专属 CLAUDE.md；为该技术创建专门的 PRP 命令；开发领域专属的基础 PRP 模板；包含可运行的示例与完整的文档。</p></div>

## 🎯 Template Quality Standards

Generated templates include:

<div class="tb-zh"><p>生成的模板包含：</p></div>

**Comprehensive Research Foundation:**
- Extensive web research on target technology
- Official documentation analysis and integration
- Real-world pattern identification
- Best practices and gotcha documentation

<div class="tb-zh"><p>完整的调研基础： 对目标技术的大量网页调研；官方文档的分析与整合；真实世界模式的识别；最佳实践与各种坑的记录。</p></div>

**Technology Specialization:**
- Framework-specific patterns and conventions
- Domain-appropriate architectural guidance
- Technology-specific validation and testing approaches
- Integration patterns for common use cases

<div class="tb-zh"><p>技术专门化： 框架专属的模式与约定；适合该领域的架构指引；技术专属的验证与测试方式；常见用例的集成模式。</p></div>

**Context Engineering Integration:**
- Proper adaptation of PRP framework principles
- Technology-appropriate success criteria
- Domain-specific research methodologies
- Specialized validation loops and quality gates

<div class="tb-zh"><p>上下文工程集成： 对 PRP 框架原则的恰当改造；适合该技术的成功标准；领域专属的调研方法论；专门化的验证闭环与质量门禁。</p></div>

## 🔧 Key Features

### Web Research Emphasis
- **Web search is your best friend** throughout the process
- Comprehensive technology documentation analysis
- Real-world implementation pattern identification
- Community best practices research and integration

### Template Package Completeness
- Complete directory structure with all required files
- Technology-specific global rules and patterns
- Specialized PRP generation and execution commands
- Domain-appropriate base PRP templates
- Working examples and comprehensive documentation

### Quality Validation
- Multiple validation levels for template structure and content
- Technology-specific testing and validation approaches
- Integration testing with base context engineering framework
- Usability validation for immediate developer productivity

## 📚 Examples of Templates You Can Generate

- **Pydantic AI Agents** - AI agent development with tool integration
- **Supabase Applications** - Full-stack apps with real-time features
- **CrewAI Multi-Agents** - Complex multi-agent system development
- **FastAPI Services** - High-performance API development
- **React Applications** - Modern frontend development patterns
- **Any Technology** - The system adapts to any framework or library

<div class="tb-zh"><p>适用场景举例：Pydantic AI Agents——带工具集成的 AI agent 开发；Supabase 应用——带实时功能的全栈应用；CrewAI 多 agent——复杂多 agent 系统开发；FastAPI 服务——高性能 API 开发；React 应用——现代前端开发模式；任何技术——这套系统能适配任何框架或库。</p></div>

## 🚫 Anti-Patterns Avoided

- ❌ Generic templates without technology specialization
- ❌ Shallow research leading to incomplete patterns
- ❌ Missing validation loops and quality gates
- ❌ Ignoring framework-specific best practices
- ❌ Incomplete documentation and examples

<div class="tb-zh"><p>❌ 没有技术专门化的通用模板；❌ 调研肤浅导致模式不完整；❌ 缺少验证闭环与质量门禁；❌ 忽视框架专属的最佳实践；❌ 文档与示例不完整。</p></div>

## 🔄 Continuous Improvement

Templates generated with this system:
- Are based on comprehensive, current research
- Include real-world patterns and best practices
- Provide immediate developer productivity
- Can be updated as technologies evolve
- Maintain consistency with context engineering principles

<div class="tb-zh"><p>用这套系统生成的模板：基于全面且最新的调研；包含真实世界的模式与最佳实践；能立刻提升开发者生产力；可随技术演进而更新；与上下文工程原则保持一致。</p></div>

## 🎓 Philosophy

This meta-template embodies the principle that **context engineering can be applied to any technology domain** through:

<div class="tb-zh"><p>这个元模板体现的原则是：上下文工程可以应用到任何技术领域，途径是：</p></div>

1. **Deep Research** - Understanding the technology thoroughly
2. **Pattern Extraction** - Identifying reusable implementation patterns
3. **Context Integration** - Adapting context engineering principles
4. **Quality Validation** - Ensuring templates work immediately and effectively

<div class="tb-zh"><p>1）深度调研——彻底理解这项技术；2）模式提取——识别可复用的实现模式；3）上下文集成——适配上下文工程原则；4）质量验证——确保模板立即可用且有效。</p></div>

The result is a systematic approach to creating high-quality, immediately usable context engineering templates for any technology domain.

<div class="tb-zh"><p>最终得到的是一套系统化方法，能为任何技术领域创建高质量、可立即使用的上下文工程模板。</p></div>
