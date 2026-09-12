---
title: "Create Implementation Plan from Requirements"
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

# Create Implementation Plan from Requirements

You are about to create a comprehensive implementation plan based on initial requirements. This involves extensive research, analysis, and planning to produce a detailed roadmap for execution.

<div class="tb-zh"><p>你即将根据初始需求制定一份完整的实现计划。这需要大量调研、分析和规划，产出一份详细的执行路线图。</p></div>

## Step 1: Read and Analyze Requirements

Read the requirements document from: $ARGUMENTS

<div class="tb-zh"><p>从以下位置读取需求文档：$ARGUMENTS</p></div>

Extract and understand:
- Core feature requests and objectives
- Technical requirements and constraints
- Expected outcomes and success criteria
- Integration points with existing systems
- Performance and scalability requirements
- Any specific technologies or frameworks mentioned

<div class="tb-zh"><p>提取并理解：核心功能诉求与目标；技术需求与约束；预期结果与成功标准；与现有系统的集成点；性能与可扩展性要求；以及任何被提到的具体技术或框架。</p></div>

## Step 2: Research Phase

### 2.1 Web Research (if applicable)
- Search for best practices for the requested features
- Look up documentation for any mentioned technologies
- Find similar implementations or case studies
- Research common patterns and architectures
- Investigate potential libraries or tools

### 2.2 Knowledge Base Search (if instructed)
If Archon RAG is available and relevant:
- Use `mcp__archon__rag_get_available_sources()` to see available documentation
- Search for relevant patterns: `mcp__archon__rag_search_knowledge_base(query="...")`
- Find code examples: `mcp__archon__rag_search_code_examples(query="...")`
- Focus on implementation patterns, best practices, and similar features

### 2.3 Codebase Analysis (for existing projects)
If this is for an existing codebase:

**IMPORTANT: Use the `codebase-analyst` agent for deep pattern analysis**
- Launch the codebase-analyst agent using the Task tool to perform comprehensive pattern discovery
- The agent will analyze: architecture patterns, coding conventions, testing approaches, and similar implementations
- Use the agent's findings to ensure your plan follows existing patterns and conventions

<div class="tb-zh"><p>重要：使用 codebase-analyst agent 做深入的模式分析——用 Task 工具启动 codebase-analyst agent，执行全面的模式发现；该 agent 会分析架构模式、编码约定、测试方式与相似的实现；用它得出的发现来确保你的计划遵循既有模式与约定。</p></div>

For quick searches you can also:
- Use Grep to find specific features or patterns
- Identify the project structure and conventions
- Locate relevant modules and components
- Understand existing architecture and design patterns
- Find integration points for new features
- Check for existing utilities or helpers to reuse

<div class="tb-zh"><p>需要快速搜索时，你也可以：用 Grep 查找具体的功能或模式；识别项目结构与约定；定位相关模块与组件；理解现有的架构与设计模式；找出新功能的集成点；检查是否有现成的工具函数或 helper 可以复用。</p></div>

## Step 3: Planning and Design

Based on your research, create a detailed plan that includes:

<div class="tb-zh"><p>基于你的调研，制定一份详细的计划，其中包含：</p></div>

### 3.1 Task Breakdown
Create a prioritized list of implementation tasks:
- Each task should be specific and actionable
- Tasks should be sized appropriately
- Include dependencies between tasks
- Order tasks logically for implementation flow

### 3.2 Technical Architecture
Define the technical approach:
- Component structure and organization
- Data flow and state management
- API design (if applicable)
- Database schema changes (if needed)
- Integration points with existing code

### 3.3 Implementation References
Document key resources for implementation:
- Existing code files to reference or modify
- Documentation links for technologies used
- Code examples from research
- Patterns to follow from the codebase
- Libraries or dependencies to add

## Step 4: Create the Plan Document

Write a comprehensive plan to `PRPs/[feature-name].md` with roughly this structure (n represents that this could be any number of those things):

<div class="tb-zh"><p>把完整的计划写到 PRPs/[feature-name].md，大致采用以下结构（n 表示这类条目可以有任意多个）：</p></div>

```markdown
# Implementation Plan: [Feature Name]

## Overview
[Brief description of what will be implemented]

## Requirements Summary
- [Key requirement 1]
- [Key requirement 2]
- [Key requirement n]

## Research Findings
### Best Practices
- [Finding 1]
- [Finding n]

### Reference Implementations
- [Example 1 with link/location]
- [Example n with link/location]

### Technology Decisions
- [Technology choice 1 and rationale]
- [Technology choice n and rationale]

## Implementation Tasks

### Phase 1: Foundation
1. **Task Name**
   - Description: [What needs to be done]
   - Files to modify/create: [List files]
   - Dependencies: [Any prerequisites]
   - Estimated effort: [time estimate]

2. **Task Name**
   - Description: [What needs to be done]
   - Files to modify/create: [List files]
   - Dependencies: [Any prerequisites]
   - Estimated effort: [time estimate]

### Phase 2: Core Implementation
[Continue with numbered tasks...]

### Phase 3: Integration & Testing
[Continue with numbered tasks...]

## Codebase Integration Points
### Files to Modify
- `path/to/file1.js` - [What changes needed]
- `path/to/filen.py` - [What changes needed]

### New Files to Create
- `path/to/newfile1.js` - [Purpose]
- `path/to/newfilen.py` - [Purpose]

### Existing Patterns to Follow
- [Pattern 1 from codebase]
- [Pattern n from codebase]

## Technical Design

### Architecture Diagram (if applicable)
```

[ASCII diagram or description]

<div class="tb-zh"><p>[ASCII 图或文字描述]</p></div>

```

### Data Flow
[Description of how data flows through the feature]

### API Endpoints (if applicable)
- `POST /api/endpoint` - [Purpose]
- `GET /api/endpoint/:id` - [Purpose]

## Dependencies and Libraries
- [Library 1] - [Purpose]
- [Library n] - [Purpose]

## Testing Strategy
- Unit tests for [components]
- Integration tests for [workflows]
- Edge cases to cover: [list]

## Success Criteria
- [ ] [Criterion 1]
- [ ] [Criterion 2]
- [ ] [Criterion n]

## Notes and Considerations
- [Any important notes]
- [Potential challenges]
- [Future enhancements]

---
*This plan is ready for execution with `/execute-plan`*
```

## Step 5: Validation

Before finalizing the plan:
1. Ensure all requirements are addressed
2. Verify tasks are properly sequenced
3. Check that integration points are identified
4. Confirm research supports the approach
5. Make sure the plan is actionable and clear

<div class="tb-zh"><p>在最终确定计划之前：1）确保所有需求都被覆盖；2）核实任务排序合理；3）检查集成点已被识别；4）确认调研足以支撑该方案；5）确保计划可执行且清晰。</p></div>

## Important Guidelines

- **Be thorough in research**: The quality of the plan depends on understanding best practices
- **Keep it actionable**: Every task should be clear and implementable
- **Reference everything**: Include links, file paths, and examples
- **Consider the existing codebase**: Follow established patterns and conventions
- **Think about testing**: Include testing tasks in the plan
- **Size tasks appropriately**: Not too large, not too granular

<div class="tb-zh"><p>调研要彻底：计划的质量取决于对最佳实践的理解；保持可执行：每个任务都应清晰、可实现；处处引用：附上链接、文件路径和示例；考虑现有代码库：遵循既有的模式与约定；考虑测试：把测试任务写进计划；任务大小要合适：既不过大，也不过细。</p></div>

## Output

Save the plan to the PRPs directory and inform the user:
"Implementation plan created at: PRPs/[feature-name].md
You can now execute this plan using: `/execute-plan PRPs/[feature-name].md`"

<div class="tb-zh"><p>把计划保存到 PRPs 目录，并告知用户：实现计划已创建于 PRPs/[feature-name].md；你现在可以用 /execute-plan PRPs/[feature-name].md 执行这份计划。</p></div>
