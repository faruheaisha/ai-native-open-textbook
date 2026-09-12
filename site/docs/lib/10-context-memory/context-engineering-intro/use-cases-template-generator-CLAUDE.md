---
title: "Template Generator - Global Rules for Context Engineering"
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

# Template Generator - Global Rules for Context Engineering

This file contains the global rules and principles that apply to ALL context engineering work, regardless of what template or project you're building. These rules never change and should be followed consistently.

<div class="tb-zh"><p>本文件包含适用于所有上下文工程工作的全局规则与原则，无论你在构建哪个模板或项目。这些规则不会改变，应当始终遵守。</p></div>

## 🔄 Context Engineering Core Principles

**IMPORTANT: These principles apply to ALL context engineering work:**

<div class="tb-zh"><p>重要：这些原则适用于所有上下文工程工作：</p></div>

### PRP Framework Workflow
- **Always start with INITIAL.md** - Define requirements before generating PRPs
- **Use the PRP pattern**: INITIAL.md → `/generate-template-prp INITIAL.md` → `/execute-template-prp PRPs/filename.md`
- **Follow validation loops** - Each PRP must include executable validation steps
- **Context is King** - Include ALL necessary documentation, examples, and patterns

### Research Methodology
- **Web search first** - Always do extensive web research before implementation
- **Documentation deep dive** - Study official docs, best practices, and common patterns
- **Pattern extraction** - Identify reusable patterns and architectural conventions
- **Gotcha documentation** - Document common pitfalls and edge cases

## 📚 Project Awareness & Context

- **Use consistent naming conventions** and file structure patterns
- **Follow established directory organization** patterns
- **Leverage examples extensively** - Study existing patterns before creating new ones

<div class="tb-zh"><p>使用一致的命名约定与文件结构模式；遵循既定的目录组织模式；大量借鉴示例——在创建新模式之前先研究既有模式。</p></div>

## 🧱 Code Structure & Modularity

- **Never create files longer than 500 lines** - Split into modules when approaching limit
- **Organize code into clearly separated modules** grouped by feature or responsibility
- **Use clear, consistent imports** (prefer relative imports within packages)
- **Follow established coding standards** and conventions

<div class="tb-zh"><p>绝不创建超过 500 行的文件——接近上限时就拆分成模块；把代码组织成按功能或职责清晰分离的模块；使用清晰一致的导入方式（包内优先使用相对导入）；遵循既定的编码标准与约定。</p></div>

## ✅ Task Management

- **Break complex tasks into smaller steps** with clear completion criteria
- **Mark tasks complete immediately** after finishing them
- **Update task status in real-time** as work progresses

<div class="tb-zh"><p>把复杂任务拆成更小的步骤，并设定清晰的完成标准；任务一完成就立即标记；随着工作推进实时更新任务状态。</p></div>

## 📎 Documentation Standards

- **Write comprehensive documentation** for every component
- **Include clear usage examples** with working code
- **Document all gotchas and edge cases** to prevent common errors
- **Maintain up-to-date references** to external documentation

<div class="tb-zh"><p>为每个组件编写完整的文档；附上清晰的用法示例，且示例代码可运行；记录所有的坑与边界情况，以防常见错误；保持对外部文档的引用是最新的。</p></div>

## 🔍 Research Standards

- **Web search is your best friend** - Use it extensively for technology research
- **Study official documentation thoroughly** before implementation
- **Research established patterns** and best practices for the technology
- **Document all findings comprehensively** in PRPs and implementation guides

<div class="tb-zh"><p>网页搜索是你最好的朋友——用大量搜索来做技术调研；在动手实现之前彻底研究官方文档；调研该技术既有的模式与最佳实践；在 PRP 与实现指南中完整记录所有发现。</p></div>

## 🎯 Implementation Standards

- **Follow the PRP workflow religiously** - Don't skip steps
- **Always validate before proceeding** to the next step
- **Use existing patterns as templates** rather than creating from scratch
- **Include comprehensive error handling** in all implementations

<div class="tb-zh"><p>严格遵循 PRP 工作流——不要跳步；始终先验证再进入下一步；把既有模式当作模板，而不是从零创造；在所有实现中包含完整的错误处理。</p></div>

## 🚫 Anti-Patterns to Always Avoid

- ❌ Don't skip research - Always understand the technology deeply first
- ❌ Don't create generic solutions - Always specialize for the specific use case
- ❌ Don't ignore validation - Every step must include verification
- ❌ Don't assume knowledge - Document everything explicitly
- ❌ Don't skip examples - Always include working code examples
- ❌ Don't forget edge cases - Include error handling and gotchas

<div class="tb-zh"><p>❌ 不要跳过调研——先深入理解这项技术；❌ 不要做通用方案——始终针对具体用例做专门化；❌ 不要忽视验证——每一步都必须包含核查；❌ 不要想当然——把一切都明确记录下来；❌ 不要省掉示例——始终附上可运行的代码示例；❌ 不要忘记边界情况——包含错误处理与各种坑。</p></div>

## 🔧 Tool Usage Standards

- **Use web search extensively** for research and documentation
- **Follow established command patterns** for slash commands
- **Use validation loops** to ensure quality at each step

<div class="tb-zh"><p>大量使用网页搜索做调研与查文档；遵循既定的命令模式编写斜杠命令；使用验证闭环，确保每一步的质量。</p></div>

These global rules apply regardless of whether you're generating templates, implementing features, or doing research. They form the foundation of effective context engineering work.

<div class="tb-zh"><p>无论你是在生成模板、实现功能还是做调研，这些全局规则都适用。它们构成高效上下文工程工作的基础。</p></div>
