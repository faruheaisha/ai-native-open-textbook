---
title: "Execute Development Plan with Archon Task Management"
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

# Execute Development Plan with Archon Task Management

You are about to execute a comprehensive development plan with integrated Archon task management. This workflow ensures systematic task tracking and implementation throughout the entire development process.

<div class="tb-zh"><p>你即将执行一份完整的开发计划，并集成 Archon 任务管理。这个工作流确保整个开发过程中都有系统的任务跟踪与实现。</p></div>

## Critical Requirements

**MANDATORY**: Throughout the ENTIRE execution of this plan, you MUST maintain continuous usage of Archon for task management. DO NOT drop or skip Archon integration at any point. Every task from the plan must be tracked in Archon from creation to completion.

<div class="tb-zh"><p>强制要求：在整份计划的整个执行过程中，你必须持续使用 Archon 做任务管理。任何时刻都不要丢掉或跳过 Archon 集成。计划中的每个任务都必须从创建到完成全程在 Archon 中跟踪。</p></div>

## Step 1: Read and Parse the Plan

Read the plan file specified in: $ARGUMENTS

<div class="tb-zh"><p>读取以下位置指定的计划文件：$ARGUMENTS</p></div>

The plan file will contain:
- A list of tasks to implement
- References to existing codebase components and integration points
- Context about where to look in the codebase for implementation

<div class="tb-zh"><p>计划文件会包含：要实现的任务清单；对现有代码库组件与集成点的引用；关于到代码库哪里去找实现位置的上下文。</p></div>

## Step 2: Project Setup in Archon

1. Check if a project ID is specified in CLAUDE.md for this feature
   - Look for any Archon project references in CLAUDE.md
   - If found, use that project ID

<div class="tb-zh"><p>1）检查 CLAUDE.md 中是否为这个功能指定了项目 ID——在 CLAUDE.md 中查找任何 Archon 项目引用；如果找到，就使用那个项目 ID。</p></div>

2. If no project exists:
   - Create a new project in Archon using `mcp__archon__manage_project`
   - Use a descriptive title based on the plan's objectives
   - Store the project ID for use throughout execution

<div class="tb-zh"><p>2）如果不存在项目——用 mcparchonmanage_project 在 Archon 中创建新项目；使用基于计划目标的描述性标题；保存项目 ID 以便在整个执行过程中使用。</p></div>

## Step 3: Create All Tasks in Archon

For EACH task identified in the plan:
1. Create a corresponding task in Archon using `mcp__archon__manage_task("create", ...)`
2. Set initial status as "todo"
3. Include detailed descriptions from the plan
4. Maintain the task order/priority from the plan

<div class="tb-zh"><p>对于计划中识别出的每一个任务：1）用 mcparchonmanage_task("create", ...) 在 Archon 中创建对应任务；2）初始状态设为 "todo"；3）写上计划中的详细描述；4）保持计划里的任务顺序与优先级。</p></div>

**IMPORTANT**: Create ALL tasks in Archon upfront before starting implementation. This ensures complete visibility of the work scope.

<div class="tb-zh"><p>重要：在开始实现之前，先把所有任务一次性创建到 Archon 中。这样才能完整看到工作范围。</p></div>

## Step 4: Codebase Analysis

Before implementation begins:
1. Analyze ALL integration points mentioned in the plan
2. Use Grep and Glob tools to:
   - Understand existing code patterns
   - Identify where changes need to be made
   - Find similar implementations for reference
3. Read all referenced files and components
4. Build a comprehensive understanding of the codebase context

<div class="tb-zh"><p>实现开始之前：1）分析计划中提到的所有集成点；2）用 Grep 和 Glob 工具：理解现有代码模式，确定需要改动的位置，找到可参考的相似实现；3）阅读所有被引用的文件和组件；4）建立对代码库上下文的完整理解。</p></div>

## Step 5: Implementation Cycle

For EACH task in sequence:

<div class="tb-zh"><p>按顺序处理每一个任务：</p></div>

### 5.1 Start Task
- Move the current task to "doing" status in Archon: `mcp__archon__manage_task("update", task_id=..., status="doing")`
- Use TodoWrite to track local subtasks if needed

### 5.2 Implement
- Execute the implementation based on:
  - The task requirements from the plan
  - Your codebase analysis findings
  - Best practices and existing patterns
- Make all necessary code changes
- Ensure code quality and consistency

### 5.3 Complete Task
- Once implementation is complete, move task to "review" status: `mcp__archon__manage_task("update", task_id=..., status="review")`
- DO NOT mark as "done" yet - this comes after validation

### 5.4 Proceed to Next
- Move to the next task in the list
- Repeat steps 5.1-5.3

**CRITICAL**: Only ONE task should be in "doing" status at any time. Complete each task before starting the next.

<div class="tb-zh"><p>关键：任何时刻只应有一个任务处于 "doing" 状态。完成一个任务再开始下一个。</p></div>

## Step 6: Validation Phase

After ALL tasks are in "review" status:

<div class="tb-zh"><p>当所有任务都进入 "review" 状态之后：</p></div>

**IMPORTANT: Use the `validator` agent for comprehensive testing**
1. Launch the validator agent using the Task tool
   - Provide the validator with a detailed description of what was built
   - Include the list of features implemented and files modified
   - The validator will create simple, effective unit tests
   - It will run tests and report results

<div class="tb-zh"><p>重要：使用 validator agent 做完整测试——1）用 Task 工具启动 validator agent：向 validator 提供关于已构建内容的详细说明，附上已实现的功能清单与修改过的文件，validator 会编写简单有效的单元测试，并运行测试、报告结果。</p></div>

The validator agent will:
- Create focused unit tests for the main functionality
- Test critical edge cases and error handling
- Run the tests using the project's test framework
- Report what was tested and any issues found

<div class="tb-zh"><p>validator agent 会：为主要功能编写聚焦的单元测试；测试关键的边界情况与错误处理；用项目的测试框架运行测试；报告测试了什么以及发现的问题。</p></div>

Additional validation you should perform:
- Check for integration issues between components
- Ensure all acceptance criteria from the plan are met

<div class="tb-zh"><p>你还需要额外做的验证：检查组件之间的集成问题；确保计划中的所有验收标准都已满足。</p></div>

## Step 7: Finalize Tasks in Archon

After successful validation:

<div class="tb-zh"><p>验证成功之后：</p></div>

1. For each task that has corresponding unit test coverage:
   - Move from "review" to "done" status: `mcp__archon__manage_task("update", task_id=..., status="done")`

<div class="tb-zh"><p>1）对每个有对应单元测试覆盖的任务——把状态从 "review" 改为 "done"：mcparchonmanage_task("update", task_id=..., status="done")。</p></div>

2. For any tasks without test coverage:
   - Leave in "review" status for future attention
   - Document why they remain in review (e.g., "Awaiting integration tests")

<div class="tb-zh"><p>2）对任何没有测试覆盖的任务——保持 "review" 状态留待后续处理，并记录它们为何仍留在 review（例如「等待集成测试」）。</p></div>

## Step 8: Final Report

Provide a summary including:
- Total tasks created and completed
- Any tasks remaining in review and why
- Test coverage achieved
- Key features implemented
- Any issues encountered and how they were resolved

<div class="tb-zh"><p>给出总结，包括：创建与完成的任务总数；仍留在 review 的任务及原因；达到的测试覆盖情况；实现的关键功能；遇到的任何问题以及如何解决。</p></div>

## Workflow Rules

1. **NEVER** skip Archon task management at any point
2. **ALWAYS** create all tasks in Archon before starting implementation
3. **MAINTAIN** one task in "doing" status at a time
4. **VALIDATE** all work before marking tasks as "done"
5. **TRACK** progress continuously through Archon status updates
6. **ANALYZE** the codebase thoroughly before implementation
7. **TEST** everything before final completion

<div class="tb-zh"><p>1）任何时刻都绝不跳过 Archon 任务管理；2）开始实现之前务必在 Archon 中创建所有任务；3）同一时刻保持只有一个任务处于 "doing" 状态；4）把任务标记为 "done" 之前验证所有工作；5）通过 Archon 的状态更新持续跟踪进度；6）实现之前彻底分析代码库；7）最终完成之前测试一切。</p></div>

## Error Handling

If at any point Archon operations fail:
1. Retry the operation
2. If persistent failures, document the issue but continue tracking locally
3. Never abandon the Archon integration - find workarounds if needed

<div class="tb-zh"><p>如果在任何时刻 Archon 操作失败：1）重试该操作；2）如果持续失败，记录问题但继续在本地跟踪；3）绝不要放弃 Archon 集成——必要时找替代办法。</p></div>

Remember: The success of this execution depends on maintaining systematic task management through Archon throughout the entire process. This ensures accountability, progress tracking, and quality delivery.

<div class="tb-zh"><p>请记住：这次执行能否成功，取决于自始至终通过 Archon 保持系统化的任务管理。它保证了责任可追溯、进度可跟踪与高质量交付。</p></div>
