---
title: "Module 1: Build MCP Server"
sourceId: "10-context-memory/huggingface-mcp-course"
sourceTitle: "The Model Context Protocol (MCP) Course"
sourceKind: "系统课程"
licenseLabel: "可转载"
lang: "英文"
tier: 1
volume: "10-context-memory"
sourceUrl: "https://github.com/huggingface/mcp-course"
entryUrl: "https://github.com/huggingface/mcp-course/blob/e706ccc0d7abe73c31813979c3451c0e31c8a464/units/en/unit3/build-mcp-server.mdx"
sourceRel: "units/en/unit3/build-mcp-server.mdx"
rawUrl: "/raw/10-context-memory/huggingface-mcp-course/units/en/unit3/build-mcp-server.mdx"
sourceSha256: "8fa995c226ab6caa90b0b5537338c7ab8f43c4d204d624db43ce83339c254f33"
pageSha256: "8fa995c226ab6caa90b0b5537338c7ab8f43c4d204d624db43ce83339c254f33"
contentMode: "local-full"
zh: "on"
---

# Module 1: Build MCP Server

## The PR Chaos at CodeCraft Studios

It's your first week at CodeCraft Studios, and you're witnessing something that makes every developer cringe. The team's pull requests look like this:

<div class="tb-zh"><p>这是你在 CodeCraft Studios 的第一周，你目睹了一幕让每个开发者都头大的场景。团队的 pull request 长这样：</p></div>

- "stuff" 
- "more changes"
- "fix"
- "update things"

<div class="tb-zh"><p>「stuff」「more changes」「fix」「update things」</p></div>

Meanwhile, the code review backlog is growing because reviewers can't understand what changed or why. Sarah from the backend team spent 30 minutes trying to figure out what "various improvements" actually meant, while Mike from frontend had to dig through 47 files to understand a "small fix."

<div class="tb-zh"><p>与此同时，代码评审的积压越来越多，因为评审人看不懂改了什么、为什么改。后端团队的 Sarah 花了 30 分钟想搞清楚“各种改进”到底指什么，前端的 Mike 则不得不翻遍 47 个文件，才弄明白一个“小修复”。</p></div>

The team knows they need better PR descriptions, but everyone's too busy shipping features to write detailed explanations. They need a solution that helps without slowing them down.

<div class="tb-zh"><p>团队知道需要更好的 PR 描述，但每个人都忙于交付功能，没时间写详细说明。他们需要一个既能帮忙、又不会拖慢节奏的方案。</p></div>

**Your mission**: Build an intelligent PR Agent that analyzes code changes and suggests helpful descriptions automatically.

<div class="tb-zh"><p>你的任务：构建一个智能 PR Agent，自动分析代码改动并给出有用的描述建议。</p></div>

### Screencast: The PR Problem in Action 😬

**What You'll See**: A real PR at CodeCraft Studios titled "various improvements" and the description simply says "Fixed some stuff and made updates". Classic, right?

<div class="tb-zh"><p>你会看到什么：CodeCraft Studios 上一个真实的 PR，标题是“各种改进”，描述只写了“修了些东西，做了些更新”。太经典了，对吧？</p></div>

**The Confusion**: Watch as teammates struggle:
- **Sarah** (3 hours ago): "What was fixed? I see changes to the User model but can't tell if this is addressing a bug or adding features"
- **Jamie** (3 hours ago): "There are 8 files across 4 services... are these changes related? What should I focus on during review?"

<div class="tb-zh"><p>困惑之处：看着队友们苦苦挣扎——Sarah（3 小时前）：“到底修了什么？我看到 User 模型有改动，但看不出是修 bug 还是加功能”；Jamie（3 小时前）：“4 个服务里共有 8 个文件……这些改动相关吗？评审时我该重点看什么？”</p></div>

**The Pain Point**: The screencast shows the actual diff—8 files scattered across multiple services with zero context. Reviewers have to piece together the story themselves, wasting precious time and possibly missing critical issues.

<div class="tb-zh"><p>痛点在于：录屏里展示的是真实 diff——8 个文件散落在多个服务中，毫无上下文。评审人得自己拼凑故事，白费宝贵时间，还可能漏掉关键问题。</p></div>

**Why This Matters**: This is exactly the PR chaos your MCP server will solve! By the end of this module, you'll turn these cryptic PRs into clear, actionable descriptions that make everyone's life easier.

<div class="tb-zh"><p>为什么这很重要：这正是你的 MCP 服务端要解决的 PR 混乱！学完本模块，你会把这些晦涩难懂的 PR 变成清晰、可执行的描述，让所有人都轻松一些。</p></div>

## What You'll Build

In this first module, you'll create the foundation of CodeCraft Studios' automation system: an MCP server that transforms how the team writes pull requests. This module focuses on core MCP concepts that you'll build upon in Modules 2 and 3.

<div class="tb-zh"><p>在第一个模块里，你会搭建 CodeCraft Studios 自动化系统的基础：一个改变团队撰写 pull request 方式的 MCP 服务端。本模块聚焦 MCP 的核心概念，它们会是第二、第三模块的基础。</p></div>

### Screencast: Your PR Agent Saves the Day! 🚀

**The Solution in Action**: Watch how your MCP server will transform PR chaos into clarity:
1. **`analyze_file_changes`** - Grabs all the changes (453 lines across 8 files!)
2. **`get_pr_templates`** - Shows Claude the 7 templates to choose from
3. **`suggest_template`** - Claude picks "Feature" (smart choice!)

<div class="tb-zh"><p>方案实际运行的样子：看看你的 MCP 服务端如何把 PR 混乱变成清晰——1. analyze_file_changes：抓取全部改动（8 个文件、453 行！）；2. get_pr_templates：把 7 个可选模板展示给 Claude；3. suggest_template：Claude 选中“功能”模板（明智之选！）。</p></div>

**What You'll See**: Claude doesn't just pick a template—it:
- Writes a clear summary of what actually changed
- Spots security issues (yikes, unhashed passwords!)
- Creates a nice to-do list for follow-up work
- Even prioritizes what needs fixing first

<div class="tb-zh"><p>你会看到什么：Claude 不只是在挑模板——它还会写出真实改动的清晰摘要，指出安全问题（天哪，密码没做哈希！），列出后续待办清单，甚至给需要先修的问题排好优先级。</p></div>

**The "Wow" Moment** ✨: In just seconds, your MCP server helps Claude transform the same branch into a PR that actually explains what's going on. No more confused reviewers, no more "what does this do?" comments.

<div class="tb-zh"><p>惊艳时刻 ✨：短短几秒内，你的 MCP 服务端就帮 Claude 把同一个分支变成了一份真正讲清楚来龙去脉的 PR。不再有困惑的评审人，不再有“这是干什么的？”这类评论。</p></div>

**This is what you'll build**: A tool that turns PR dread into PR delight—let's get started!

<div class="tb-zh"><p>这就是你要构建的东西：一个把“怕 PR”变成“爱 PR”的工具——我们开始吧！</p></div>

## What You Will Learn

In this foundational module, you'll master:
- **How to create a basic MCP server using FastMCP** - The building blocks for Modules 2 and 3
- **Implementing MCP Tools for data retrieval and analysis** - The core primitive you'll use throughout Unit 3  
- **Letting Claude make intelligent decisions based on raw data** - A key principle for all MCP development
- **Testing and validating your MCP server** - Essential skills for building reliable tools

<div class="tb-zh"><p>在这个基础模块中，你将掌握：如何用 FastMCP 创建基础 MCP 服务端——第二、第三模块的构建基石；如何实现用于取数和分析的 MCP Tools——贯穿第三单元的核心原语；如何让 Claude 基于原始数据做出智能判断——MCP 开发的一条关键原则；如何测试和验证你的 MCP 服务端——构建可靠工具的必备技能。</p></div>

## Overview

Your PR Agent will solve CodeCraft Studios' problem using a key principle of MCP development: instead of hard-coding rigid rules about what makes a good PR, you'll provide Claude with raw git data and let it intelligently suggest appropriate descriptions.

<div class="tb-zh"><p>你的 PR Agent 会用一个 MCP 开发的关键原则解决 CodeCraft Studios 的问题：不去硬编码“什么算好 PR”的刻板规则，而是把原始 git 数据交给 Claude，让它智能地建议合适的描述。</p></div>

This approach works because:
- **Flexible analysis**: Claude can understand context that simple rules miss
- **Natural language**: Suggestions feel human, not robotic
- **Adaptable**: Works for any codebase or coding style

<div class="tb-zh"><p>这种做法之所以有效，是因为：分析灵活——简单规则会漏掉的上下文，Claude 能理解；语言自然——建议读起来像人写的，而不是机器写的；适应性强——适用于任何代码库或编码风格。</p></div>

You'll implement three essential tools that establish patterns for the entire automation system:

<div class="tb-zh"><p>你会实现三个必不可少的工具，它们为整套自动化系统奠定了模式：</p></div>

1. **analyze_file_changes** - Retrieves git diff information and changed files (data collection)
2. **get_pr_templates** - Lists available PR templates (resource management)  
3. **suggest_template** - Allows Claude to recommend the most appropriate template (intelligent decision-making)

<div class="tb-zh"><p>1. analyze_file_changes——获取 git diff 信息与改动文件（数据收集）；2. get_pr_templates——列出可用的 PR 模板（资源管理）；3. suggest_template——让 Claude 推荐最合适的模板（智能决策）。</p></div>

## Getting Started

### Prerequisites

- Python 3.10 or higher
- Git installed and a git repository to test with
- uv package manager ([installation guide](https://docs.astral.sh/uv/getting-started/installation/))

<div class="tb-zh"><p>Python 3.10 或更高版本；已安装 Git，并有一个可用于测试的 git 仓库；uv 包管理器（参见安装指南）</p></div>

### Starter Code

Clone the starter code repository:

<div class="tb-zh"><p>克隆起始代码仓库：</p></div>

```bash
git clone https://github.com/huggingface/mcp-course.git
```

Navigate to the starter code directory:

<div class="tb-zh"><p>进入起始代码目录：</p></div>

```bash
cd mcp-course/projects/unit3/build-mcp-server/starter
```

Install dependencies:

<div class="tb-zh"><p>安装依赖：</p></div>

> [!TIP]
> You might want to create a virtual environment for this project:
>
> ```bash
> uv venv .venv
> source .venv/bin/activate # On Windows use: .venv\Scripts\activate
> ```

<div class="tb-zh"><p>你可能想为这个项目创建一个虚拟环境：uv venv .venv，然后 source .venv/bin/activate（在 Windows 上使用 .venv\Scripts\activate）。</p></div>

```bash
uv sync --all-extras
```

### Your Task

This is your first hands-on MCP development experience! Open `server.py` and implement the three tools following the TODO comments. The starter code provides the basic structure - you need to:

<div class="tb-zh"><p>这是你第一次动手做 MCP 开发！打开 server.py，按照 TODO 注释实现这三个工具。起始代码提供了基本骨架，你需要：</p></div>

1. **Implement `analyze_file_changes`** to run git commands and return diff data
   - ⚠️ **Important**: You'll likely hit a token limit error (25,000 tokens max per response)
   - This is a real-world constraint that teaches proper output management
   - See the "Handling Large Outputs" section below for the solution
   - ⚠️ **Note**: Git commands will run in the MCP server's directory by default. See "Working Directory Considerations" below for details
2. **Implement `get_pr_templates`** to manage and return PR templates  
3. **Implement `suggest_template`** to map change types to templates

<div class="tb-zh"><p>1. 实现 analyze_file_changes，运行 git 命令并返回 diff 数据。⚠️ 重要：你很可能会遇到 token 超限错误（每次响应最多 25,000 token）。这是真实世界中的约束，也正好教你如何妥善管理输出，解决办法见下文「处理大体积输出」一节。⚠️ 注意：git 命令默认在 MCP 服务端所在目录下运行，详见下文「工作目录注意事项」。2. 实现 get_pr_templates，负责管理并返回 PR 模板。3. 实现 suggest_template，把改动类型映射到模板。</p></div>

Don't worry about making everything perfect - you'll refine these skills as you progress through the unit.

<div class="tb-zh"><p>不必强求一步到位——随着单元推进，你会不断打磨这些技能。</p></div>

### Design Philosophy

Unlike traditional systems that categorize changes based on file extensions or rigid patterns, your implementation should:

<div class="tb-zh"><p>与传统系统按文件扩展名或刻板模式给改动分类不同，你的实现应该：</p></div>

- Provide Claude with raw git data (diffs, file lists, statistics)
- Let Claude analyze the actual code changes
- Allow Claude to make intelligent template suggestions
- Keep the logic simple - Claude handles the complexity

<div class="tb-zh"><p>把原始的 git 数据（diff、文件清单、统计信息）交给 Claude；让 Claude 去分析真实的代码改动；让 Claude 给出有依据的模板建议；把逻辑保持简单——复杂的部分交给 Claude。</p></div>

> [!TIP]
> **MCP Philosophy**: Instead of building complex logic into your tools, provide Claude with rich data and let its intelligence make the decisions. This makes your code simpler and more flexible than traditional rule-based systems.

<div class="tb-zh"><p>MCP 的设计哲学：与其把复杂逻辑塞进工具，不如把丰富的数据交给 Claude，让它的智能来做判断。比起传统的规则系统，这样你的代码更简单、也更灵活。</p></div>

## Testing Your Implementation

### 1. Validate Your Code

Run the validation script to check your implementation:

<div class="tb-zh"><p>运行校验脚本检查你的实现：</p></div>

```bash
uv run python validate_starter.py
```

### 2. Run Unit Tests

Test your implementation with the provided test suite:

<div class="tb-zh"><p>用提供的测试套件测试你的实现：</p></div>

```bash
uv run pytest test_server.py -v
```

### 3. Test with Claude Code

Configure your server directly in Claude Code:

<div class="tb-zh"><p>直接在 Claude Code 中配置你的服务端：</p></div>

```bash
# Add the MCP server to Claude Code
claude mcp add pr-agent -- uv --directory /absolute/path/to/starter run server.py

# Verify the server is configured
claude mcp list
```

Then:
1. Make some changes in a git repository
2. Ask Claude: "Can you analyze my changes and suggest a PR template?"
3. Watch Claude use your tools to provide intelligent suggestions

<div class="tb-zh"><p>然后：1. 在某个 git 仓库里做一些改动；2. 问 Claude：“你能分析我的改动并建议一个 PR 模板吗？”；3. 看 Claude 如何用你的工具给出智能建议。</p></div>

> [!WARNING]
> **Common first error**: If you get "MCP tool response exceeds maximum allowed tokens (25000)", this is expected! Large repositories can generate massive diffs. This is a valuable learning moment - see the "Handling Large Outputs" section for the solution.

<div class="tb-zh"><p>最常见的第一个报错：如果你看到「MCP tool response exceeds maximum allowed tokens (25000)」，这是正常现象！大型仓库会产生非常庞大的 diff。这是一次很有价值的学习机会，解决办法见「处理大体积输出」一节。</p></div>

## Common Patterns

### Tool Implementation Pattern

```python
@mcp.tool()
async def tool_name(param1: str, param2: bool = True) -> str:
    """Tool description for Claude.
    
    Args:
        param1: Description of parameter
        param2: Optional parameter with default
    """
    # Your implementation
    result = {"key": "value"}
    return json.dumps(result)
```

### Error Handling

Always handle potential errors gracefully:

<div class="tb-zh"><p>始终要优雅地处理潜在错误：</p></div>

```python
try:
    result = subprocess.run(["git", "diff"], capture_output=True, text=True)
    return json.dumps({"output": result.stdout})
except Exception as e:
    return json.dumps({"error": str(e)})
```

> [!WARNING]
> **Error Handling**: Always return valid JSON from your tools, even for errors. Claude needs structured data to understand what went wrong and provide helpful responses to users.

<div class="tb-zh"><p>错误处理：工具即使在出错时也必须返回合法的 JSON。Claude 需要结构化的数据，才能理解哪里出了问题，并给用户有用的回复。</p></div>

### Handling Large Outputs (Critical Learning Moment!)

> [!WARNING]
> **Real-world constraint**: MCP tools have a token limit of 25,000 tokens per response. Large git diffs can easily exceed this limit 10x or more! This is a critical lesson for production MCP development.

<div class="tb-zh"><p>真实世界的约束：MCP 工具每次响应的上限是 25,000 token。大型 git diff 很容易超出这个上限十倍甚至更多！这是生产级 MCP 开发中关键的一课。</p></div>

When implementing `analyze_file_changes`, you'll likely encounter this error:

<div class="tb-zh"><p>在实现 analyze_file_changes 时，你很可能会遇到这个错误：</p></div>

```
Error: MCP tool response (262521 tokens) exceeds maximum allowed tokens (25000)
```

**Why this happens:**
- A single file change can be thousands of lines
- Enterprise repositories often have massive refactorings
- Git diffs include full context by default
- JSON encoding adds overhead

<div class="tb-zh"><p>为什么会这样：单个文件的改动就可能有上千行；企业级仓库常有大规模重构；git diff 默认会带上完整上下文；JSON 编码还会增加额外开销。</p></div>

This teaches us an important principle: **Always design tools with output limits in mind**. Here's the solution:

<div class="tb-zh"><p>这教会我们一条重要原则：设计工具时始终要考虑输出上限。解决办法如下：</p></div>

```python
@mcp.tool()
async def analyze_file_changes(base_branch: str = "main", 
                              include_diff: bool = True,
                              max_diff_lines: int = 500) -> str:
    """Analyze file changes with smart output limiting.
    
    Args:
        base_branch: Branch to compare against
        include_diff: Whether to include the actual diff
        max_diff_lines: Maximum diff lines to include (default 500)
    """
    try:
        # Get the diff
        result = subprocess.run(
            ["git", "diff", f"{base_branch}...HEAD"],
            capture_output=True, 
            text=True
        )
        
        diff_output = result.stdout
        diff_lines = diff_output.split('\n')
        
        # Smart truncation if needed
        if len(diff_lines) > max_diff_lines:
            truncated_diff = '\n'.join(diff_lines[:max_diff_lines])
            truncated_diff += f"\n\n... Output truncated. Showing {max_diff_lines} of {len(diff_lines)} lines ..."
            diff_output = truncated_diff
        
        # Get summary statistics
        stats_result = subprocess.run(
            ["git", "diff", "--stat", f"{base_branch}...HEAD"],
            capture_output=True,
            text=True
        )
        
        return json.dumps({
            "stats": stats_result.stdout,
            "total_lines": len(diff_lines),
            "diff": diff_output if include_diff else "Use include_diff=true to see diff",
            "files_changed": self._get_changed_files(base_branch)
        })
        
    except Exception as e:
        return json.dumps({"error": str(e)})
```

**Best practices for large outputs:**
1. **Implement pagination**: Break large results into pages
2. **Add filtering options**: Let users request specific files or directories
3. **Provide summaries first**: Return statistics before full content
4. **Use progressive disclosure**: Start with high-level info, allow drilling down
5. **Set sensible defaults**: Default to reasonable limits that work for most cases

<div class="tb-zh"><p>处理大输出的最佳实践：1. 实现分页——把大结果拆成多页；2. 增加过滤选项——让用户指定文件或目录；3. 先给摘要——在完整内容之前先返回统计信息；4. 渐进式展开——先给高层信息，再允许逐层深入；5. 设定合理默认值——默认限制要适配大多数场景。</p></div>

## Working Directory Considerations

By default, MCP servers run commands in their installation directory, not in Claude's current working directory. This means your git commands might analyze the wrong repository! 

<div class="tb-zh"><p>默认情况下，MCP 服务端在其安装目录中执行命令，而不是在 Claude 当前的工作目录中。这意味着你的 git 命令可能分析到错误的仓库！</p></div>

To solve this, MCP provides [roots](https://modelcontextprotocol.io/docs/concepts/roots) - a way for clients to inform servers about relevant directories. Claude Code automatically provides its working directory as a root.

<div class="tb-zh"><p>要解决这个问题，MCP 提供了 roots（https://modelcontextprotocol.io/docs/concepts/roots）——一种让客户端把相关目录告知服务端的方式。Claude Code 会自动把它的工作目录作为一个 root 提供出来。</p></div>

Here's how to access it in your tool:

<div class="tb-zh"><p>下面说明如何在你的工具中读取它：</p></div>

```python
@mcp.tool()
async def analyze_file_changes(...):
    # Get Claude's working directory from roots
    context = mcp.get_context()
    roots_result = await context.session.list_roots()
    
    # Extract the path from the FileUrl object
    working_dir = roots_result.roots[0].uri.path
    
    # Use it for all git commands
    result = subprocess.run(
        ["git", "diff", "--name-status"],
        capture_output=True,
        text=True,
        cwd=working_dir  # Run in Claude's directory!
    )
```

This ensures your tools operate on the repository Claude is actually working with, not the MCP server's installation location.

<div class="tb-zh"><p>这样就能保证你的工具作用于 Claude 实际在用的仓库，而不是 MCP 服务端的安装位置。</p></div>

## Troubleshooting

- **Import errors**: Ensure you've run `uv sync`
- **Git errors**: Make sure you're in a git repository
- **No output**: MCP servers communicate via stdio - test with Claude Desktop
- **JSON errors**: All tools must return valid JSON strings
- **Token limit exceeded**: This is expected with large diffs! Implement output limiting as shown above
- **"Response too large" errors**: Add `max_diff_lines` parameter or set `include_diff=false`
- **Git commands run in wrong directory**: MCP servers run in their installation directory by default, not Claude's working directory. To fix this, use [MCP roots](https://modelcontextprotocol.io/docs/concepts/roots) to access Claude's current directory:

<div class="tb-zh"><p>导入错误：确认已经运行过 uv sync；Git 错误：确认你处在某个 git 仓库中；没有输出：MCP 服务端通过 stdio 通信，请用 Claude Desktop 测试；JSON 错误：所有工具都必须返回合法的 JSON 字符串；超出 token 上限：面对大型 diff 这是预期之内，请按上文实现输出限制；「Response too large」错误：加上 max_diff_lines 参数，或设置 include_diff=false；git 命令在错误的目录下运行：MCP 服务端默认在其安装目录下运行，而不是 Claude 的工作目录。要解决这个问题，可以用 MCP roots 访问 Claude 当前所在的目录。</p></div>

  ```python
  # Get Claude's working directory from roots
  context = mcp.get_context()
  roots_result = await context.session.list_roots()
  working_dir = roots_result.roots[0].uri.path  # FileUrl object has .path property
  
  # Use it in subprocess calls
  subprocess.run(["git", "diff"], cwd=working_dir)
  ```

  Claude Code automatically provides its working directory as a root, allowing your MCP server to operate in the correct location.

<div class="tb-zh"><p>Claude Code 会自动把它的工作目录作为一个 root 提供出来，让你的 MCP 服务端能在正确的位置上工作。</p></div>

## Next Steps

Congratulations! You've built your first MCP server with Tools - the foundation for everything that follows in Unit 3.

<div class="tb-zh"><p>恭喜！你已经用 Tools 构建了第一个 MCP 服务端——这是第三单元后续一切的基础。</p></div>

### What you've accomplished in Module 1:
- **Created MCP Tools** that provide Claude with structured data
- **Implemented the core MCP philosophy** - let Claude make intelligent decisions from raw data
- **Built a practical PR Agent** that can analyze code changes and suggest templates
- **Learned about real-world constraints** - the 25,000 token limit and how to handle it
- **Established testing patterns** with validation scripts and unit tests

### Key patterns you can reuse:
- **Data collection tools** that gather information from external sources
- **Intelligent analysis** where Claude processes raw data to make decisions  
- **Output management** - truncating large responses while preserving usefulness
- **Error handling** that returns structured JSON responses
- **Testing strategies** for MCP server development

### What to do next:
1. **Review the solution** in `/projects/unit3/build-mcp-server/solution/` to see different implementation approaches
2. **Compare your implementation** with the provided solution - there's no single "right" way to solve the problem
3. **Test your tools thoroughly** - try them with different types of code changes to see how Claude adapts
4. **Move on to Module 2** where you'll add real-time webhook capabilities and learn about MCP Prompts for workflow standardization

Module 2 will build directly on the server you created here, adding dynamic event handling to complement your static file analysis tools!

<div class="tb-zh"><p>第二模块会直接在你这里创建的服务端上继续构建，加入动态事件处理，与你的静态文件分析工具形成互补！</p></div>

### The story continues...
With your PR Agent working, CodeCraft Studios developers are already writing better pull requests. But next week, you'll face a new challenge: critical CI/CD failures are slipping through unnoticed. Module 2 will add real-time monitoring to catch these issues before they reach production.

## Additional Resources

- [MCP Documentation](https://modelcontextprotocol.io/)
- [FastMCP Guide](https://modelcontextprotocol.io/quickstart/server)
- Solution walkthrough: `unit3/build-mcp-server-solution-walkthrough.md`

<div class="tb-zh"><p>MCP 文档；FastMCP 指南；解题步骤讲解：unit3/build-mcp-server-solution-walkthrough.md</p></div>
