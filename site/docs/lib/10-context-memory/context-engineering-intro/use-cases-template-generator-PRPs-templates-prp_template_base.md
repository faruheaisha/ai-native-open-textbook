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
entryUrl: "https://github.com/coleam00/context-engineering-intro/blob/a2d84b021cee1e2f4e77ba854bba0be8cb319035/use-cases/template-generator/PRPs/templates/prp_template_base.md"
sourceRel: "use-cases/template-generator/PRPs/templates/prp_template_base.md"
rawUrl: "/raw/10-context-memory/context-engineering-intro/use-cases/template-generator/PRPs/templates/prp_template_base.md"
sourceSha256: "12fb728c3310a13ec68dd565f47a3bf8c3f5c570fee24379d401348bd70c7faf"
pageSha256: "12fb728c3310a13ec68dd565f47a3bf8c3f5c570fee24379d401348bd70c7faf"
contentMode: "local-full"
zh: "on"
---

# Context Engineering Intro

## Purpose

Template optimized for AI agents to generate complete context engineering template packages for specific technology domains (AI frameworks, frontend stacks, backend technologies, etc.) with comprehensive domain specialization and validation.

<div class="tb-zh"><p>一个为 AI agent 优化的模板，用于为特定技术领域（AI 框架、前端技术栈、后端技术等）生成完整的上下文工程模板包，包含全面的领域专门化与验证。</p></div>

## Core Principles

1. **Meta-Context Engineering**: Apply context engineering principles to generate domain-specific templates
2. **Technology Specialization**: Deep integration with target framework patterns and conventions
3. **Complete Package Generation**: Create entire template ecosystems, not just individual files
4. **Validation-Driven**: Include comprehensive domain-appropriate testing and validation loops
5. **Usability First**: Generate templates that are immediately usable by developers

<div class="tb-zh"><p>1）元上下文工程：应用上下文工程原则来生成领域专属模板；2）技术专门化：与目标框架的模式和约定深度集成；3）生成完整的包：创建整套模板生态，而不只是单个文件；4）验证驱动：包含完整且适合该领域的测试与验证闭环；5）可用性优先：生成的模板开发者可以立即使用。</p></div>

---

## Goal

Generate a complete context engineering template package for **[TARGET_TECHNOLOGY]** that includes:

<div class="tb-zh"><p>为 [TARGET_TECHNOLOGY] 生成一个完整的上下文工程模板包，其中包含：</p></div>

- Domain-specific CLAUDE.md implementation guide
- Specialized PRP generation and execution commands
- Technology-appropriate base PRP template
- Comprehensive examples and documentation
- Domain-specific validation loops and success criteria

<div class="tb-zh"><p>领域专属的 CLAUDE.md 实现指南；专门的 PRP 生成与执行命令；适配该技术的基础 PRP 模板；完整的示例与文档；领域专属的验证闭环与成功标准。</p></div>

## Why

- **Developer Acceleration**: Enable rapid application of context engineering to any technology
- **Pattern Consistency**: Maintain context engineering principles across all domains
- **Quality Assurance**: Ensure comprehensive validation and testing for each technology
- **Knowledge Capture**: Document best practices and patterns for specific technologies
- **Scalable Framework**: Create reusable templates that evolve with technology changes

<div class="tb-zh"><p>加速开发：让上下文工程能够被快速应用到任何技术；模式一致性：在所有领域保持上下文工程原则；质量保证：为每项技术确保完整的验证与测试；知识沉淀：记录特定技术的最佳实践与模式；可扩展的框架：创建能随技术演进而更新的可复用模板。</p></div>

## What

### Template Package Components

**Complete Directory Structure:**

<div class="tb-zh"><p>完整的目录结构：</p></div>

```
use-cases/{technology-name}/
├── CLAUDE.md                      # Domain implementation guide
├── .claude/commands/
│   ├── generate-{technology}-prp.md  # Domain PRP generation
│   └── execute-{technology}-prp.md   # Domain PRP execution  
├── PRPs/
│   ├── templates/
│   │   └── prp_{technology}_base.md  # Domain base PRP template
│   ├── ai_docs/                      # Domain documentation (optional)
│   └── INITIAL.md                    # Example feature request
├── examples/                         # Domain code examples
├── copy_template.py                  # Template deployment script
└── README.md                         # Comprehensive usage guide
```

**Technology Integration:**
- Framework-specific tooling and commands
- Architecture patterns and conventions
- Development workflow integration
- Testing and validation approaches
- Security and performance considerations

<div class="tb-zh"><p>技术集成： 框架专属的工具与命令；架构模式与约定；与开发工作流的集成；测试与验证方式；安全与性能考量。</p></div>

**Context Engineering Adaptation:**
- Domain-specific research processes
- Technology-appropriate validation loops
- Framework-specialized implementation blueprints
- Integration with base context engineering principles

<div class="tb-zh"><p>上下文工程适配： 领域专属的调研流程；适合该技术的验证闭环；框架专门化的实现蓝图；与基础上下文工程原则的集成。</p></div>

### Success Criteria

- [ ] Complete template package structure generated
- [ ] All required files present and properly formatted
- [ ] Domain-specific content accurately represents technology patterns
- [ ] Context engineering principles properly adapted to the technology
- [ ] Validation loops appropriate and executable for the framework
- [ ] Template immediately usable for creating projects in the domain
- [ ] Integration with base context engineering framework maintained
- [ ] Comprehensive documentation and examples included

<div class="tb-zh"><p>验收清单：已生成完整的模板包结构；所有必需文件都存在且格式正确；领域专属内容准确体现该技术的模式；上下文工程原则已恰当适配该技术；验证闭环适合该框架且可执行；模板可直接用于在领域内创建项目；与基础上下文工程框架的集成得以保持；已包含完整的文档与示例。</p></div>

## All Needed Context

### Documentation & References (MUST READ)

```yaml
# CONTEXT ENGINEERING FOUNDATION - Understand the base framework
- file: ../../../README.md
  why: Core context engineering principles and workflow to adapt

- file: ../../../.claude/commands/generate-prp.md
  why: Base PRP generation patterns to specialize for domain

- file: ../../../.claude/commands/execute-prp.md  
  why: Base PRP execution patterns to adapt for technology

- file: ../../../PRPs/templates/prp_base.md
  why: Base PRP template structure to specialize for domain

# MCP SERVER EXAMPLE - Reference implementation of domain specialization
- file: ../mcp-server/CLAUDE.md
  why: Example of domain-specific implementation guide patterns

- file: ../mcp-server/.claude/commands/prp-mcp-create.md
  why: Example of specialized PRP generation command

- file: ../mcp-server/PRPs/templates/prp_mcp_base.md
  why: Example of domain-specialized base PRP template

# TARGET TECHNOLOGY RESEARCH - Add domain-specific documentation
- url: [OFFICIAL_FRAMEWORK_DOCS]
  why: Core framework concepts, APIs, and architectural patterns

- url: [BEST_PRACTICES_GUIDE]
  why: Established patterns and conventions for the technology

- url: [SECURITY_CONSIDERATIONS]
  why: Security best practices and common vulnerabilities

- url: [TESTING_FRAMEWORKS]
  why: Testing approaches and validation patterns for the technology

- url: [DEPLOYMENT_PATTERNS]
  why: Production deployment and monitoring considerations
```

### Current Context Engineering Structure

```bash
# Base framework structure to extend
context-engineering-intro/
├── README.md                    # Core principles to adapt
├── .claude/commands/            # Base commands to specialize
├── PRPs/templates/prp_base.md   # Base template to extend
├── CLAUDE.md                    # Base rules to inherit
└── use-cases/
    ├── mcp-server/              # Reference specialization example
    └── template-generator/      # This meta-template system
```

### Target Technology Analysis Requirements

```typescript
// Research areas for technology specialization
interface TechnologyAnalysis {
  // Core framework patterns
  architecture: {
    project_structure: string[];
    configuration_files: string[];
    dependency_management: string;
    module_organization: string[];
  };
  
  // Development workflow
  development: {
    package_manager: string;
    dev_server_commands: string[];
    build_process: string[];
    testing_frameworks: string[];
  };
  
  // Best practices
  patterns: {
    code_organization: string[];
    state_management: string[];
    error_handling: string[];
    performance_optimization: string[];
  };
  
  // Integration points
  ecosystem: {
    common_libraries: string[];
    deployment_platforms: string[];
    monitoring_tools: string[];
    CI_CD_patterns: string[];
  };
}
```

### Known Template Generation Patterns

```typescript
// CRITICAL: Template generation must follow these patterns

// 1. ALWAYS inherit from base context engineering principles
const basePatterns = {
  prp_workflow: "INITIAL.md → generate-prp → execute-prp",
  validation_loops: "syntax → unit → integration → deployment",
  context_richness: "documentation + examples + patterns + gotchas"
};

// 2. ALWAYS specialize for the target technology
const specialization = {
  tooling: "Replace generic commands with framework-specific ones",
  patterns: "Include framework architectural conventions",
  validation: "Use technology-appropriate testing and linting",
  examples: "Provide real, working code examples for the domain"
};

// 3. ALWAYS maintain usability and completeness
const quality_gates = {
  immediate_usability: "Template works out of the box",
  comprehensive_docs: "All patterns and gotchas documented",
  working_examples: "Examples compile and run successfully",
  validation_loops: "All validation commands are executable"
};

// 4. Common pitfalls to avoid
const anti_patterns = {
  generic_content: "Don't use placeholder text - research actual patterns",
  incomplete_research: "Don't skip technology-specific documentation",
  broken_examples: "Don't include non-working code examples",
  missing_validation: "Don't skip domain-appropriate testing patterns"
};
```

## Implementation Blueprint

### Technology Research Phase

**CRITICAL: Web search extensively before any template generation. This is essential for success.**

<div class="tb-zh"><p>关键：在做任何模板生成之前先做大量网页搜索。这对成功至关重要。</p></div>

Conduct comprehensive analysis of the target technology using web research:

<div class="tb-zh"><p>通过网页调研对目标技术做全面分析：</p></div>

```yaml
Research Task 1 - Core Framework Analysis (WEB SEARCH REQUIRED):
  WEB SEARCH and STUDY official documentation thoroughly:
    - Framework architecture and design patterns  
    - Project structure conventions and best practices
    - Configuration file patterns and management approaches
    - Package/dependency management for the technology
    - Getting started guides and setup procedures

Research Task 2 - Development Workflow Analysis (WEB SEARCH REQUIRED):
  WEB SEARCH and ANALYZE development patterns:
    - Local development setup and tooling
    - Build processes and compilation steps
    - Testing frameworks commonly used with this technology
    - Debugging tools and development environments
    - CLI commands and package management workflows

Research Task 3 - Best Practices Investigation (WEB SEARCH REQUIRED):
  WEB SEARCH and RESEARCH established patterns:
    - Code organization and file structure conventions
    - Security best practices specific to this technology
    - Common gotchas, pitfalls, and edge cases
    - Error handling patterns and strategies
    - Performance considerations and optimization techniques

Research Task 4 - Template Package Structure Planning:
  PLAN how to create context engineering template for this technology:
    - How to adapt PRP framework for this specific technology
    - What domain-specific CLAUDE.md rules are needed
    - What validation loops are appropriate for this framework
    - What examples and documentation should be included
```

### Template Package Generation

Create complete context engineering template package based on web research findings:

<div class="tb-zh"><p>基于网页调研的发现，创建完整的上下文工程模板包：</p></div>

```yaml
Generation Task 1 - Create Template Directory Structure:
  CREATE complete use case directory structure:
    - use-cases/{technology-name}/
    - .claude/commands/ subdirectory  
    - PRPs/templates/ subdirectory
    - examples/ subdirectory
    - All other required subdirectories per template package requirements

Generation Task 2 - Generate Domain-Specific CLAUDE.md:
  CREATE technology-specific global rules file:
    - Technology-specific tooling and package management commands
    - Framework architectural patterns and conventions from web research
    - Development workflow procedures specific to this technology
    - Security and best practices discovered through research
    - Common gotchas and integration points found in documentation

Generation Task 3 - Create Specialized Template PRP Commands:
  GENERATE domain-specific slash commands:
    - generate-{technology}-prp.md with technology research patterns
    - execute-{technology}-prp.md with framework validation loops
    - Commands should reference technology-specific patterns from research
    - Include web search strategies specific to this technology domain

Generation Task 4 - Develop Domain-Specific Base PRP Template:
  CREATE specialized prp_{technology}_base.md template:
    - Pre-filled with technology context from web research
    - Technology-specific success criteria and validation gates
    - Framework documentation references found through research
    - Domain-appropriate implementation patterns and validation loops

Generation Task 5 - Create Examples and INITIAL.md Template:
  GENERATE comprehensive template package content:
    - INITIAL.md example showing how to request features for this technology
    - Working code examples relevant to the technology (from research)
    - Configuration file templates and patterns

Generation Task 6 - Create Template Copy Script:
  CREATE Python script for template deployment:
    - copy_template.py script that accepts target directory argument
    - Copies entire template directory structure to specified location
    - Includes all files: CLAUDE.md, commands, PRPs, examples, etc.
    - Handles directory creation and file copying with error handling
    - Simple command-line interface for easy usage

Generation Task 7 - Generate Comprehensive README:
  CREATE comprehensive but concise README.md:
    - Clear description of what this template is for and its purpose
    - Explanation of the PRP framework workflow (3-step process)
    - Template copy script usage instructions (prominently placed near top)
    - Quick start guide with concrete examples
    - Template structure overview showing all generated files
    - Usage examples specific to this technology domain
```

### Implementation Details for Copy Script and README

**Copy Script (copy_template.py) Requirements:**

<div class="tb-zh"><p>复制脚本（copy_template.py）要求：</p></div>

```python
# Essential copy script functionality:
# 1. Accept target directory as command line argument
# 2. Copy entire template directory structure to target location
# 3. Include ALL files: CLAUDE.md, .claude/, PRPs/, examples/, README.md
# 4. Handle directory creation and error handling
# 5. Provide clear success feedback with next steps
# 6. Simple usage: python copy_template.py /path/to/target
```

**README Structure Requirements:**

<div class="tb-zh"><p>README 结构要求：</p></div>

```markdown
# Must include these sections in this order:
# 1. Title and brief description of template purpose
# 2. 🚀 Quick Start - Copy Template First (prominently at top)
# 3. 📋 PRP Framework Workflow (3-step process explanation)
# 4. 📁 Template Structure (directory tree with explanations)
# 5. 🎯 What You Can Build (technology-specific examples)
# 6. 📚 Key Features (framework capabilities)
# 7. 🔍 Examples Included (working examples provided)
# 8. 📖 Documentation References (research sources)
# 9. 🚫 Common Gotchas (technology-specific pitfalls)

# Copy script usage must be prominently featured near the top
# PRP workflow must clearly show the 3 steps with actual commands
# Everything should be technology-specific, not generic
```

### Domain Specialization Details

```typescript
// Template specialization patterns for specific domains

// For AI/ML Frameworks (Pydantic AI, CrewAI, etc.)
const ai_specialization = {
  patterns: ["agent_architecture", "tool_integration", "model_configuration"],
  validation: ["model_response_testing", "agent_behavior_validation"],
  examples: ["basic_agent", "multi_agent_system", "tool_integration"],
  gotchas: ["token_limits", "model_compatibility", "async_patterns"]
};

// For Frontend Frameworks (React, Vue, Svelte, etc.)
const frontend_specialization = {
  patterns: ["component_architecture", "state_management", "routing"],
  validation: ["component_testing", "e2e_testing", "accessibility"],
  examples: ["basic_app", "state_integration", "api_consumption"],
  gotchas: ["bundle_size", "ssr_considerations", "performance"]
};

// For Backend Frameworks (FastAPI, Express, Django, etc.)
const backend_specialization = {
  patterns: ["api_design", "database_integration", "authentication"],
  validation: ["api_testing", "database_testing", "security_testing"],
  examples: ["rest_api", "auth_system", "database_models"],
  gotchas: ["security_vulnerabilities", "performance_bottlenecks", "scalability"]
};

// For Database/Data Frameworks (SQLModel, Prisma, etc.)
const data_specialization = {
  patterns: ["schema_design", "migration_management", "query_optimization"],
  validation: ["schema_testing", "migration_testing", "query_performance"],
  examples: ["basic_models", "relationships", "complex_queries"],
  gotchas: ["migration_conflicts", "n+1_queries", "index_optimization"]
};
```

### Integration Points

```yaml
CONTEXT_ENGINEERING_FRAMEWORK:
  - base_workflow: Inherit core PRP generation and execution patterns from base framework
  - validation_principles: Extend base validation with domain-specific checks for the technology
  - documentation_standards: Maintain consistency with base context engineering documentation patterns

TECHNOLOGY_INTEGRATION:
  - package_management: Include framework-specific package managers and tooling
  - development_tools: Include technology-specific development and testing tools
  - framework_patterns: Use technology-appropriate architectural and code patterns
  - validation_approaches: Include framework-specific testing and validation methods

TEMPLATE_STRUCTURE:
  - directory_structure: Follow established use case template patterns from base framework
  - file_naming: Maintain consistent naming conventions (generate-{tech}-prp.md, etc.)
  - content_format: Use established markdown and documentation formats
  - command_patterns: Extend base slash command functionality for the specific technology
```

## Validation Loop

### Level 1: Template Structure Validation

```bash
# CRITICAL: Verify complete template package structure
find use-cases/{technology-name} -type f | sort
ls -la use-cases/{technology-name}/.claude/commands/
ls -la use-cases/{technology-name}/PRPs/templates/

# Verify copy script exists and is functional
test -f use-cases/{technology-name}/copy_template.py
python use-cases/{technology-name}/copy_template.py --help 2>/dev/null || echo "Copy script needs help option"

# Expected: All required files present including copy_template.py
# If missing: Generate missing files following established patterns
```

### Level 2: Content Quality Validation

```bash
# Verify domain-specific content accuracy
grep -r "TODO\|PLACEHOLDER\|{domain}" use-cases/{technology-name}/
grep -r "{technology}" use-cases/{technology-name}/ | wc -l

# Check for technology-specific patterns
grep -r "framework-specific-pattern" use-cases/{technology-name}/
grep -r "validation" use-cases/{technology-name}/.claude/commands/

# Expected: No placeholder content, technology patterns present
# If issues: Research and add proper domain-specific content
```

### Level 3: Functional Validation

```bash
# Test template functionality
cd use-cases/{technology-name}

# Test PRP generation command
/generate-prp INITIAL.md
ls PRPs/*.md | grep -v templates

# Test template completeness
grep -r "Context is King" . | wc -l  # Should inherit principles
grep -r "{technology-specific}" . | wc -l  # Should have specializations

# Expected: PRP generation works, content is specialized
# If failing: Debug command patterns and template structure
```

### Level 4: Integration Testing

```bash
# Verify integration with base context engineering framework
diff -r ../../.claude/commands/ .claude/commands/ | head -20
diff ../../CLAUDE.md CLAUDE.md | head -20

# Test template produces working results
cd examples/
# Run any example validation commands specific to the technology

# Expected: Proper specialization without breaking base patterns
# If issues: Adjust specialization to maintain compatibility
```

## Final Validation Checklist

### Template Package Completeness

- [ ] Complete directory structure: `tree use-cases/\{technology-name\}`
- [ ] All required files present: CLAUDE.md, commands, base PRP, examples
- [ ] Copy script present: `copy_template.py` with proper functionality
- [ ] README comprehensive: Includes copy script instructions and PRP workflow
- [ ] Domain-specific content: Technology patterns accurately represented
- [ ] Working examples: All examples compile/run successfully
- [ ] Documentation complete: README and usage instructions clear

<div class="tb-zh"><p>验证清单：目录结构完整——tree use-cases/{technology-name}；所有必需文件都在——CLAUDE.md、commands、基础 PRP、示例；复制脚本存在——copy_template.py 功能正确；README 完整——包含复制脚本的使用说明与 PRP 工作流；内容领域专属——准确体现该技术的模式；示例可运行——所有示例都能成功编译或运行；文档完整——README 与使用说明清晰。</p></div>

### Quality and Usability

- [ ] No placeholder content: `grep -r "TODO\|PLACEHOLDER"`
- [ ] Technology specialization: Framework patterns properly documented
- [ ] Validation loops work: All commands executable and functional
- [ ] Integration maintained: Works with base context engineering framework
- [ ] Ready for use: Developer can immediately start using template

<div class="tb-zh"><p>验证清单：没有占位内容——grep -r "TODO\|PLACEHOLDER"；技术专门化——框架模式被恰当记录；验证闭环可用——所有命令都能执行且功能正常；集成得以保持——能与基础上下文工程框架配合；可直接使用——开发者能立即开始使用该模板。</p></div>

### Framework Integration

- [ ] Inherits base principles: Context engineering workflow preserved
- [ ] Proper specialization: Technology-specific patterns included
- [ ] Command compatibility: Slash commands work as expected
- [ ] Documentation consistency: Follows established documentation patterns
- [ ] Maintainable structure: Easy to update as technology evolves

<div class="tb-zh"><p>验证清单：继承基础原则——上下文工程工作流得以保留；恰当专门化——包含技术专属模式；命令兼容——斜杠命令按预期工作；文档一致——遵循既定的文档模式；结构可维护——随技术演进易于更新。</p></div>

---

## Anti-Patterns to Avoid

### Template Generation

- ❌ Don't create generic templates - always research and specialize deeply
- ❌ Don't skip comprehensive technology research - understand frameworks thoroughly
- ❌ Don't use placeholder content - always include real, researched information
- ❌ Don't ignore validation loops - include comprehensive testing for the technology

<div class="tb-zh"><p>❌ 不要生成通用模板——始终深入研究并做专门化；❌ 不要跳过对技术的完整调研——彻底理解框架；❌ 不要使用占位内容——始终包含真实的、经过调研的信息；❌ 不要忽视验证闭环——为该技术包含完整的测试。</p></div>

### Content Quality

- ❌ Don't assume knowledge - document everything explicitly for the domain
- ❌ Don't skip edge cases - include common gotchas and error handling
- ❌ Don't ignore security - always include security considerations for the technology
- ❌ Don't forget maintenance - ensure templates can evolve with technology changes

<div class="tb-zh"><p>❌ 不要想当然——为该领域把一切都明确记录下来；❌ 不要跳过边界情况——包含常见的坑与错误处理；❌ 不要忽视安全——始终为该技术包含安全考量；❌ 不要忘记维护——确保模板能随技术变化而演进。</p></div>

### Framework Integration

- ❌ Don't break base patterns - maintain compatibility with context engineering principles
- ❌ Don't duplicate effort - reuse and extend base framework components
- ❌ Don't ignore consistency - follow established naming and structure conventions
- ❌ Don't skip validation - ensure templates actually work before completion

<div class="tb-zh"><p>❌ 不要破坏基础模式——与上下文工程原则保持兼容；❌ 不要重复造轮子——复用并扩展基础框架组件；❌ 不要忽视一致性——遵循既定的命名与结构约定；❌ 不要跳过验证——在完成之前确保模板真的可用。</p></div>
