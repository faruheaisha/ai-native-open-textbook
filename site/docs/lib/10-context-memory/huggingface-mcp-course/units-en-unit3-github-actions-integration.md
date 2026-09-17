---
title: "Module 2: GitHub Actions Integration"
sourceId: "10-context-memory/huggingface-mcp-course"
sourceTitle: "The Model Context Protocol (MCP) Course"
sourceKind: "系统课程"
licenseLabel: "可转载"
lang: "英文"
tier: 1
volume: "10-context-memory"
sourceUrl: "https://github.com/huggingface/mcp-course"
entryUrl: "https://github.com/huggingface/mcp-course/blob/e706ccc0d7abe73c31813979c3451c0e31c8a464/units/en/unit3/github-actions-integration.mdx"
sourceRel: "units/en/unit3/github-actions-integration.mdx"
rawUrl: "/raw/10-context-memory/huggingface-mcp-course/units/en/unit3/github-actions-integration.mdx"
sourceSha256: "c9814d1fe653aec33acd2396568bcf733bc624482a02d07ae319a459d66db128"
pageSha256: "c9814d1fe653aec33acd2396568bcf733bc624482a02d07ae319a459d66db128"
contentMode: "local-full"
zh: "on"
---

# Module 2: GitHub Actions Integration

## The Silent Failures Strike

Week 2 at CodeCraft Studios. Your PR Agent from Module 1 is already helping developers write better pull requests - Sarah's latest PR had a clear description that saved Mike 20 minutes of investigation time. The team is thrilled!

<div class="tb-zh"><p>CodeCraft Studios 的第二周。你在第一模块做的 PR Agent 已经在帮开发者写出更好的 pull request——Sarah 最新的 PR 描述很清楚，帮 Mike 省下 20 分钟的排查时间。团队非常兴奋！</p></div>

But then disaster strikes.

<div class="tb-zh"><p>但灾难随即降临。</p></div>

A critical bug reaches production on Friday afternoon. The payment system is down, customers are complaining, and the team scrambles to investigate. After two stressful hours, they discover the root cause: a test failure in Tuesday's CI run that nobody noticed.

<div class="tb-zh"><p>周五下午，一个严重缺陷进入了生产环境。支付系统挂了，客户在投诉，团队手忙脚乱地排查。紧张的两小时后，他们找到了根因：周二那次 CI 运行中的一个测试失败，没有人注意到。</p></div>

"How did we miss this?" asks the team lead, scrolling through GitHub Actions. "The tests clearly failed, but with 47 repositories and dozens of daily commits, who has time to check every build?"

<div class="tb-zh"><p>“我们怎么会漏掉？”团队负责人一边翻看 GitHub Actions 一边问。“测试明明失败了，但 47 个仓库、每天几十次提交，谁有时间去检查每一次构建？”</p></div>

The team realizes they need real-time visibility into their CI/CD pipeline, but manually checking GitHub Actions across all their projects isn't scalable. They need automation that watches for problems and alerts them immediately.

<div class="tb-zh"><p>团队意识到需要对 CI/CD 流水线有实时的可见性，但在所有项目里手动检查 GitHub Actions 并不现实。他们需要能自动盯住问题、立即告警的机制。</p></div>

**Your mission**: Extend your MCP server with webhook capabilities to monitor GitHub Actions and never let another failure slip through unnoticed.

<div class="tb-zh"><p>你的任务：为你的 MCP 服务端加上 webhook 能力，去监控 GitHub Actions，不再让任何一次失败被漏掉。</p></div>

## What You'll Build

This module bridges the gap between static file analysis (Module 1) and dynamic team notifications (Module 3). You'll add real-time capabilities that transform your PR Agent into a comprehensive development monitoring system.

<div class="tb-zh"><p>本模块衔接了静态文件分析（第一模块）与动态团队通知（第三模块）。你会加入实时能力，把你的 PR Agent 变成一个完整的开发监控系统。</p></div>

Building on the foundation you created in Module 1, you'll add:
- **Webhook server** to receive GitHub Actions events
- **New tools** for monitoring CI/CD status
- **MCP Prompts** that provide consistent workflow patterns
- **Real-time integration** with your GitHub repository

<div class="tb-zh"><p>在第一模块的基础上，你会加入：webhook 服务端——用于接收 GitHub Actions 事件；新工具——用于监控 CI/CD 状态；MCP Prompts——提供一致的工作流模式；与你的 GitHub 仓库的实时集成。</p></div>

### Screencast: Real-Time CI/CD Monitoring in Action! 🎯

**The Setup**: Watch how CodeCraft Studios' new system catches failures before they reach production:
1. **GitHub Webhooks** - See the actual webhook configuration that sends events to your server
2. **Failed Tests** - Those red X's that used to go unnoticed? Not anymore!
3. **Local Development** - The webhook server and Cloudflare tunnel working together

<div class="tb-zh"><p>准备工作：看看 CodeCraft Studios 的新系统如何在失败到达生产之前就抓住它——1. GitHub Webhooks：看到真实的 webhook 配置，它把事件发送到你的服务端；2. 失败的测试：那些以前没人注意的红叉？再也不会了！3. 本地开发：webhook 服务端与 Cloudflare 隧道协同工作。</p></div>

**MCP Magic in Real-Time**: Claude responds to three key requests:
- **"What GitHub Actions events have we received?"** - Claude uses your new tools to check recent activity
- **"Analyze CI Results"** - Watch Claude dig into test failures and provide actionable insights
- **"Create Deployment Summary"** - See how MCP Prompts guide Claude to create team-friendly updates

<div class="tb-zh"><p>MCP 实时魔法：Claude 响应三类关键请求——“我们收到了哪些 GitHub Actions 事件？”——Claude 用你的新工具查看最近活动；“分析 CI 结果”——看 Claude 深入测试失败并给出可执行的洞察；“生成部署摘要”——看 MCP Prompts 如何引导 Claude 写出对团队友好的更新。</p></div>

**The Silent Failures No More** 🚨: Remember that critical bug from Tuesday's failed test? With this system, Claude would have caught it immediately. The screencast shows exactly how your MCP server turns GitHub's raw webhook data into clear, actionable alerts.

<div class="tb-zh"><p>不再有静默失败 🚨：还记得周二那次失败测试引发的严重缺陷吗？有了这套系统，Claude 本可以立刻抓住它。录屏清楚展示了你的 MCP 服务端如何把 GitHub 的原始 webhook 数据变成清晰、可执行的告警。</p></div>

**What Makes This Special**: Your Module 1 PR Agent was static—it analyzed code when asked. This Module 2 enhancement is dynamic—it watches your CI/CD pipeline 24/7 and helps Claude provide real-time insights. No more Friday afternoon surprises!

<div class="tb-zh"><p>特别之处在哪：第一模块的 PR Agent 是静态的——被问到时才去分析代码。第二模块的增强是动态的——它 7×24 监控你的 CI/CD 流水线，帮 Claude 提供实时洞察。不再有周五下午的“惊喜”！</p></div>

## Learning Objectives

By the end of this module, you'll understand:
1. How to run a webhook server alongside an MCP server
2. How to receive and process GitHub webhooks
3. How to create MCP Prompts for standardized workflows
4. How to use Cloudflare Tunnel for local webhook testing

<div class="tb-zh"><p>学完本模块，你将理解：1. 如何让 webhook 服务端与 MCP 服务端一起运行；2. 如何接收并处理 GitHub webhook；3. 如何为标准化工作流创建 MCP Prompts；4. 如何用 Cloudflare Tunnel 做本地 webhook 测试。</p></div>

## Prerequisites

You'll build directly on your work from Module 1, so make sure you have:
- **Completed Module 1: Build MCP Server** - You'll be extending that same codebase
- **Basic understanding of GitHub Actions** - You should know what CI/CD workflows are
- **A GitHub repository with Actions enabled** - Even a simple workflow file works fine
- **Cloudflare Tunnel (cloudflared) installed** - This will expose your local webhook server to GitHub

<div class="tb-zh"><p>你会直接在第一模块的成果上继续构建，所以请确保你已有：完成第一模块“构建 MCP 服务端”——你将扩展同一份代码；对 GitHub Actions 的基本了解——你应当知道 CI/CD 工作流是什么；一个启用了 Actions 的 GitHub 仓库——哪怕只有一个简单的 workflow 文件也可以；已安装 Cloudflare Tunnel（cloudflared）——用来把你的本地 webhook 服务端暴露给 GitHub。</p></div>

## Key Concepts

### MCP Prompts

Prompts are reusable templates that guide Claude through complex workflows. Unlike Tools (which Claude calls automatically), Prompts are user-initiated and provide structured guidance.

<div class="tb-zh"><p>Prompts 是可复用的模板，用来引导 Claude 完成复杂工作流。与 Tools（由 Claude 自动调用）不同，Prompts 由用户发起，提供结构化的指引。</p></div>

Example use cases:
- Analyzing CI/CD results consistently
- Creating standardized deployment summaries
- Troubleshooting failures systematically

<div class="tb-zh"><p>典型用例：一致地分析 CI/CD 结果；生成标准化的部署摘要；系统化地排查故障。</p></div>

### Webhook Integration

Your MCP server will run two services:
1. The MCP server (communicates with Claude)
2. A webhook server on port 8080 (receives GitHub events)

<div class="tb-zh"><p>你的 MCP 服务端会运行两个服务：1. MCP 服务端（与 Claude 通信）；2. 8080 端口上的 webhook 服务端（接收 GitHub 事件）。</p></div>

This allows Claude to react to real-time CI/CD events!

<div class="tb-zh"><p>这样 Claude 就能对实时的 CI/CD 事件做出反应！</p></div>

> [!TIP]
> **Architecture Insight**: Running separate services for MCP communication and webhook handling is a clean separation of concerns. The webhook server handles HTTP complexity while your MCP server focuses on data analysis and Claude integration.

<div class="tb-zh"><p>架构洞察：把 MCP 通信与 webhook 处理拆成两个独立服务，是一种职责清晰的划分。webhook 服务端处理 HTTP 的复杂性，而你的 MCP 服务端专注于数据分析与 Claude 集成。</p></div>

## Project Structure

```
github-actions-integration/
├── starter/          # Your starting point
│   ├── server.py     # Module 1 code + TODOs
│   ├── pyproject.toml
│   └── README.md
└── solution/         # Complete implementation
    ├── server.py     # Full webhook + prompts
    ├── pyproject.toml
    └── README.md
```

## Implementation Steps

### Step 1: Set Up and Run Webhook Server

Unlike Module 1 where you worked with existing files, this module introduces real-time event handling. The starter code includes:
- **Your Module 1 implementation** - All your existing PR analysis tools
- **A complete webhook server** (`webhook_server.py`) - Ready to receive GitHub events

<div class="tb-zh"><p>第一模块里你处理的是已有文件，本模块则引入实时事件处理。起始代码包含：你在第一模块的实现——所有既有的 PR 分析工具；一个完整的 webhook 服务端（webhook_server.py）——随时可以接收 GitHub 事件。</p></div>

1. Install dependencies (same as Module 1):

<div class="tb-zh"><p>1. 安装依赖（与模块一相同）：</p></div>

   ```bash
   uv sync
   ```

2. Start the webhook server (in a separate terminal):

<div class="tb-zh"><p>2. 启动 webhook 服务端（在另一个终端中）：</p></div>

   ```bash
   python webhook_server.py
   ```

This server will receive GitHub webhooks and store them in `github_events.json`.

<div class="tb-zh"><p>这个服务端会接收 GitHub webhook，并把它们存进 github_events.json。</p></div>

**How webhook event storage works:**
- Each incoming GitHub webhook (push, pull request, workflow completion, etc.) is appended to the JSON file
- Events are stored with timestamps, making it easy to find recent activity
- The file acts as a simple event log that your MCP tools can read and analyze
- No database required - everything is stored in a simple, readable JSON format

<div class="tb-zh"><p>webhook 事件存储的工作方式：每个传入的 GitHub webhook（push、pull request、workflow 完成等）都会被追加到这个 JSON 文件；事件带时间戳存储，便于查找最近活动；该文件充当一份简单的事件日志，供你的 MCP 工具读取和分析；不需要数据库——一切都以简单、可读的 JSON 格式保存。</p></div>

### Step 2: Connect to Event Storage

Now you'll connect your MCP server (from Module 1) to the webhook data. This is much simpler than handling HTTP requests directly - the webhook server does all the heavy lifting and stores events in a JSON file.

<div class="tb-zh"><p>现在你要把第一模块的 MCP 服务端接到 webhook 数据上。这比直接处理 HTTP 请求简单得多——webhook 服务端承担了所有重活，并把事件存进 JSON 文件。</p></div>

Add the path to read webhook events:

<div class="tb-zh"><p>加入读取 webhook 事件的路径：</p></div>

```python
# File where webhook server stores events
EVENTS_FILE = Path(__file__).parent / "github_events.json"
```

The webhook server handles all the HTTP details - you just need to read the JSON file! This separation of concerns keeps your MCP server focused on what it does best.

<div class="tb-zh"><p>HTTP 细节都由 webhook 服务端处理——你只需要读 JSON 文件！这种关注点分离让 MCP 服务端专注于它最擅长的事。</p></div>

> [!TIP]
> **Development Tip**: Working with files instead of HTTP requests makes testing much easier. You can manually add events to `github_events.json` to test your tools without setting up webhooks.

<div class="tb-zh"><p>开发提示：用文件代替 HTTP 请求来操作，能让测试轻松很多。你可以手动往 github_events.json 里添加事件，无需搭建 webhook 就能测试工具。</p></div>

### Step 3: Add GitHub Actions Tools

Just like in Module 1 where you created tools for file analysis, you'll now create tools for CI/CD analysis. These tools will work alongside your existing PR analysis tools, giving Claude a complete view of both code changes and build status.

<div class="tb-zh"><p>就像第一模块里你做了文件分析的工具一样，现在你要为 CI/CD 分析创建工具。这些工具会与你既有的 PR 分析工具并存，让 Claude 同时看到代码改动和构建状态。</p></div>

> [!TIP]
> **Note**: The starter code already includes the output limiting fix from Module 1, so you won't encounter token limit errors. Focus on the new concepts in this module!

<div class="tb-zh"><p>注意：起始代码已经包含模块一中的输出限制修复，因此你不会再遇到 token 超限错误。请专注于本模块的新概念！</p></div>

Implement two new tools:

<div class="tb-zh"><p>实现两个新工具：</p></div>

1. **`get_recent_actions_events`**: 
   - Read from `EVENTS_FILE`
   - Return the most recent events (up to limit)
   - Return empty list if file doesn't exist

<div class="tb-zh"><p>1. get_recent_actions_events：从 EVENTS_FILE 读取；返回最近的事件（不超过给定上限）；文件不存在时返回空列表。</p></div>

2. **`get_workflow_status`**: 
   - Read all events from file
   - Filter for workflow_run events
   - Group by workflow name and show latest status

<div class="tb-zh"><p>2. get_workflow_status：从文件读取全部事件；筛选出 workflow_run 事件；按工作流名称分组并显示最新状态。</p></div>

These tools let Claude analyze your CI/CD pipeline.

<div class="tb-zh"><p>这两个工具让 Claude 能分析你的 CI/CD 流水线。</p></div>

### Step 4: Create MCP Prompts

Now you'll add your first MCP Prompts! Unlike Tools (which Claude calls automatically), Prompts are templates that help users interact with Claude consistently. Think of them as "conversation starters" that guide Claude through complex workflows.

<div class="tb-zh"><p>现在加入你的第一批 MCP Prompts！与 Tools（由 Claude 自动调用）不同，Prompts 是帮助用户一致地与 Claude 交互的模板。可以把它们看作“对话开场白”，引导 Claude 走完复杂工作流。</p></div>

While Module 1 focused on Tools for data access, this module introduces Prompts for workflow guidance.

<div class="tb-zh"><p>第一模块聚焦用于取数的 Tools，本模块则引入用于工作流指引的 Prompts。</p></div>

Implement four prompts that demonstrate different workflow patterns:

<div class="tb-zh"><p>实现四个提示词，演示不同的工作流模式：</p></div>

1. **`analyze_ci_results`**: Comprehensive CI/CD analysis
2. **`create_deployment_summary`**: Team-friendly updates
3. **`generate_pr_status_report`**: Combined code + CI report
4. **`troubleshoot_workflow_failure`**: Systematic debugging

<div class="tb-zh"><p>1. analyze_ci_results：全面的 CI/CD 分析；2. create_deployment_summary：面向团队的进展更新；3. generate_pr_status_report：代码与 CI 的合并报告；4. troubleshoot_workflow_failure：系统化的问题排查。</p></div>

Each prompt should return a string with clear instructions for Claude to follow.

<div class="tb-zh"><p>每个提示词都应返回一段字符串，给出 Claude 可以遵循的清晰指令。</p></div>

### Step 5: Test with Cloudflare Tunnel

Now for the exciting part - testing your expanded MCP server with real GitHub events! You'll run multiple services together, just like in a real development environment.

<div class="tb-zh"><p>接下来是最有意思的部分——用真实的 GitHub 事件测试你扩展后的 MCP 服务端！你会像在真实开发环境中那样同时运行多个服务。</p></div>

1. Start your MCP server (same command as Module 1):

<div class="tb-zh"><p>1. 启动你的 MCP 服务端（命令与模块一相同）：</p></div>

   ```bash
   uv run server.py
   ```

2. In another terminal, start Cloudflare Tunnel:

<div class="tb-zh"><p>2. 在另一个终端中启动 Cloudflare Tunnel：</p></div>

   ```bash
   cloudflared tunnel --url http://localhost:8080
   ```

3. Configure GitHub webhook with the tunnel URL

<div class="tb-zh"><p>3. 用隧道地址配置 GitHub webhook</p></div>

4. Test with Claude Code using the prompts

<div class="tb-zh"><p>4. 在 Claude Code 中用这些提示词进行测试</p></div>

## Exercises

### Exercise 1: Custom Workflow Prompt
Create a new prompt that helps with PR reviews by combining:
- Code changes from Module 1 tools
- CI/CD status from Module 2 tools
- A checklist format for reviewers

### Exercise 2: Event Filtering
Enhance `get_workflow_status` to:
- Filter by workflow conclusion (success/failure)
- Group by repository
- Show time since last run

### Exercise 3: Notification System
Add a tool that:
- Tracks which events have been "seen"
- Highlights new failures
- Suggests which team member to notify

## Common Issues

### Webhook Not Receiving Events
- Ensure Cloudflare Tunnel is running
- Check GitHub webhook settings (should show recent deliveries)
- Verify the payload URL includes `/webhook/github`

### Prompt Not Working
- FastMCP prompts simply return strings
- Make sure your function is decorated with `@mcp.prompt()`

### Webhook Server Issues
- Ensure webhook_server.py is running in a separate terminal
- Check that port 8080 is free: `lsof -i :8080`
- The events file will be created automatically when first event is received

## Next Steps

Excellent work! You've successfully added real-time capabilities to your MCP server. You now have a system that can:

<div class="tb-zh"><p>干得漂亮！你已经成功为 MCP 服务端加上了实时能力。现在你拥有的系统可以：</p></div>

- **Analyze code changes** (from Module 1) 
- **Monitor CI/CD events in real-time** (from this module)
- **Use MCP Prompts** to provide consistent workflow guidance
- **Handle webhook events** through a clean file-based architecture

<div class="tb-zh"><p>分析代码改动（来自模块一）；实时监控 CI/CD 事件（来自本模块）；用 MCP Prompts 提供一致的工作流指引；通过清晰的基于文件的架构来处理 webhook 事件。</p></div>

### Key achievements in Module 2:
- Built your first webhook integration
- Learned MCP Prompts for workflow standardization  
- Created tools that work with real-time data
- Established patterns for event-driven automation

### What to do next:
1. **Review the solution** in `/projects/unit3/github-actions-integration/solution/` to see different implementation approaches
2. **Experiment with your prompts** - try using them for different types of GitHub events
3. **Test the integration** - combine your Module 1 file analysis tools with Module 2 event monitoring in a single conversation with Claude
4. **Move on to Module 3** - where you'll complete the automation pipeline by adding team notifications through Slack integration

Module 3 will bring everything together into a complete workflow that your team can actually use!

<div class="tb-zh"><p>第三模块会把所有内容串成一套团队真正可用的完整工作流！</p></div>

### The story continues...
Your monitoring system is working! CodeCraft Studios now catches CI/CD failures in real-time, and the team feels much more confident about their deployments. But next week brings a new challenge: information silos are causing duplicate work and missed opportunities. Module 3 will complete the automation system with intelligent team notifications that keep everyone in the loop.

## Additional Resources

- [MCP Prompts Documentation](https://modelcontextprotocol.io/docs/concepts/prompts)
- [GitHub Webhooks Guide](https://docs.github.com/en/developers/webhooks-and-events)
- [Cloudflare Tunnel Documentation](https://developers.cloudflare.com/cloudflare-one/connections/connect-apps)

<div class="tb-zh"><p>MCP Prompts 文档；GitHub Webhooks 指南；Cloudflare Tunnel 文档</p></div>
