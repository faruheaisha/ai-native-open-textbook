---
title: "Module 3: Slack Notification"
sourceId: "10-context-memory/huggingface-mcp-course"
sourceTitle: "The Model Context Protocol (MCP) Course"
sourceKind: "系统课程"
licenseLabel: "可转载"
lang: "英文"
tier: 1
volume: "10-context-memory"
sourceUrl: "https://github.com/huggingface/mcp-course"
entryUrl: "https://github.com/huggingface/mcp-course/blob/e706ccc0d7abe73c31813979c3451c0e31c8a464/README.md"
zh: "on"
---

# Module 3: Slack Notification

## The Communication Gap Crisis

Week 3 at CodeCraft Studios. Your automation system is already transforming how the team works:
- **PR Agent** (Module 1): Developers are writing clear, helpful pull request descriptions
- **CI/CD Monitor** (Module 2): The team catches test failures immediately, preventing bugs from reaching production

<div class="tb-zh"><p>CodeCraft Studios 的第三周。你的自动化系统已经在改变团队的工作方式：PR Agent（第一模块）——开发者写出清晰、有用的 pull request 描述；CI/CD 监控（第二模块）——团队立刻发现测试失败，阻止缺陷进入生产。</p></div>

The team is feeling much more confident... until Monday morning brings a new crisis.

<div class="tb-zh"><p>团队信心大增……直到周一早上又来了新的危机。</p></div>

The frontend team (Emma and Jake) spent the entire weekend debugging a nasty API integration issue. They tried everything: checked their network calls, validated request formats, even rewrote the error handling. Finally, at 2 AM Sunday, they discovered the backend team had fixed this exact issue on Friday and deployed the fix to staging - but forgot to announce it.

<div class="tb-zh"><p>前端团队（Emma 和 Jake）整个周末都在排查一个棘手 API 集成问题。他们试了各种办法：检查网络调用、校验请求格式，甚至重写了错误处理。终于在周日凌晨两点，他们发现后端团队周五就修好了同一个问题，并把修复部署到了预发环境——但忘了通知大家。</p></div>

"We wasted 12 hours solving a problem that was already fixed!" Emma says, frustrated.

<div class="tb-zh"><p>“我们白白花了 12 小时去解决一个早就修好的问题！”Emma 沮丧地说。</p></div>

Meanwhile, the design team finished the new user onboarding flow illustrations last week, but the frontend team didn't know they were ready. Those beautiful assets are still sitting unused while the team ships a temporary design.

<div class="tb-zh"><p>与此同时，设计团队上周完成了新用户引导流程的插画，但前端团队并不知道它们已经就绪。那些漂亮的素材至今闲置，团队还在用临时设计上线。</p></div>

The team realizes they have an information silo problem. Everyone's working hard, but they're not communicating effectively about what's happening when.

<div class="tb-zh"><p>团队意识到自己面临信息孤岛问题。每个人都很努力，却没能就“什么时候发生了什么”有效沟通。</p></div>

**Your mission**: Complete the automation system with intelligent Slack notifications that keep the whole team informed about important developments automatically.

<div class="tb-zh"><p>你的任务：用智能 Slack 通知补全这套自动化系统，让重要进展自动触达整个团队。</p></div>

## What You'll Build

This final module completes the CodeCraft Studios transformation. You'll integrate Tools and Prompts to create a smart notification system that sends formatted Slack messages about CI/CD events, demonstrating how all MCP primitives work together in a real-world scenario.

<div class="tb-zh"><p>这个最后的模块完成 CodeCraft Studios 的转型。你会把 Tools 和 Prompts 整合起来，做出一个智能通知系统，就 CI/CD 事件发送格式化好的 Slack 消息，展示 MCP 的各类原语在真实场景中如何协同工作。</p></div>

Building on the foundation from Modules 1 and 2, you'll add the final piece of the puzzle:
- **Slack webhook tool** for sending messages to your team channel
- **Two notification prompts** that intelligently format CI events
- **Complete integration** showing all MCP primitives working together

<div class="tb-zh"><p>在第一、第二模块的基础上，你会加上最后一块拼图：Slack webhook 工具——用于把消息发送到团队频道；两个通知提示词——智能地格式化 CI 事件；完整集成——展示所有 MCP 原语如何协同。</p></div>

### Screencast: The Complete Automation System! 🎉

**The Final Piece**: Watch how your complete automation system prevents those Monday morning surprises that plagued Emma and Jake!

<div class="tb-zh"><p>最后一块拼图：看看你完整的自动化系统如何杜绝那些困扰 Emma 和 Jake 的周一早晨“惊喜”！</p></div>

**What You'll See**: 
- **Claude's intelligent workflow** - Notice how Claude breaks down the task: ☐ Check events → ☐ Send notification
- **Real-time MCP tools in action** - `get_recent_actions_events` pulls fresh CI data, then `send_slack_notification` delivers the alert
- **Side-by-side demonstration** - The Slack channel is open in parallel to show the formatted message appearing as Claude sends it

<div class="tb-zh"><p>你会看到什么：Claude 的智能工作流——注意它如何拆解任务：☐ 检查事件 → ☐ 发送通知；实时运行的 MCP 工具——get_recent_actions_events 拉取最新的 CI 数据，随后 send_slack_notification 投递告警；并排演示——Slack 频道同步打开，展示 Claude 发送时格式化消息的出现过程。</p></div>

**The Smart Notification**: Claude doesn't just spam the team—it crafts a professional alert with:
- 🚨 Clear urgency indicators and emoji
- **Detailed failure breakdown** (test-auth-service ❌, test-api ❌, test-frontend ⏳)
- **Actionable links** to the pipeline run and pull request
- **Context everyone needs** - repository, PR #1 "various improvements", commit hash

<div class="tb-zh"><p>智能通知：Claude 不会对团队狂轰滥炸——它精心组织出一条专业告警，包含：🚨 清晰的紧急程度标识与 emoji；详尽的失败拆解（test-auth-service ❌、test-api ❌、test-frontend ⏳）；指向流水线运行与 pull request 的可执行链接；所有人都需要的上下文——仓库、PR #1 “various improvements”、提交哈希。</p></div>

**Why This Matters**: Remember the communication gap crisis? No more! This system ensures that when CI fails on `demo-bad-pr` branch, the whole team knows immediately. No more weekend debugging sessions for issues that were already fixed!

<div class="tb-zh"><p>为什么这很重要：还记得那次沟通断层引发的危机吗？不会再有了！这套系统保证当 demo-bad-pr 分支上的 CI 失败时，整个团队立刻知情。再也不用为早已修好的问题搭上周末去调试！</p></div>

**The Complete Journey**: From Module 1's PR chaos to Module 3's intelligent team notifications—you've built a system that transforms how CodeCraft Studios collaborates. The weekend warriors become informed teammates! 🚀

<div class="tb-zh"><p>完整旅程：从第一模块的 PR 混乱，到第三模块的智能团队通知——你构建的系统改变了 CodeCraft Studios 的协作方式。周末战士变成了信息通畅的队友！🚀</p></div>

## Learning Objectives

By the end of this module, you'll understand:
1. How to integrate external APIs with MCP Tools
2. How to combine Tools and Prompts for complete workflows  
3. How to format rich messages using Slack markdown
4. How all MCP primitives work together in practice

<div class="tb-zh"><p>学完本模块，你将理解：1. 如何把外部 API 与 MCP Tools 集成；2. 如何把 Tools 与 Prompts 组合成完整工作流；3. 如何用 Slack markdown 格式化富文本消息；4. 各类 MCP 原语在实践中如何协同。</p></div>

## Prerequisites

You'll need everything from the previous modules plus:
- **Completed Modules 1 and 2** - This module directly extends your existing MCP server
- **A Slack workspace** where you can create incoming webhooks (personal workspaces work fine)
- **Basic understanding of REST APIs** - You'll be making HTTP requests to Slack's webhook endpoints

<div class="tb-zh"><p>除了前面模块的内容，你还需要：完成第一、第二模块——本模块直接扩展你已有的 MCP 服务端；一个可以创建 incoming webhook 的 Slack 工作区（个人工作区也可以）；对 REST API 的基本了解——你会向 Slack 的 webhook 端点发起 HTTP 请求。</p></div>

## Key Concepts

### MCP Integration Pattern

This module demonstrates the complete workflow:
1. **Events** → GitHub Actions webhook (from Module 2)
2. **Prompts** → Format events into readable messages
3. **Tools** → Send formatted messages to Slack
4. **Result** → Professional team notifications

<div class="tb-zh"><p>本模块演示完整工作流：1. 事件 → GitHub Actions webhook（来自第二模块）；2. 提示词 → 把事件格式化成可读消息；3. 工具 → 把格式化消息发送到 Slack；4. 结果 → 专业的团队通知。</p></div>

### Slack Markdown Formatting

You'll use [Slack's markdown](https://api.slack.com/reference/surfaces/formatting) for rich messages:
- [`*bold text*`](https://api.slack.com/reference/surfaces/formatting#visual-styles) for emphasis
- [`_italic text_`](https://api.slack.com/reference/surfaces/formatting#visual-styles) for details
- [`` `code blocks` ``](https://api.slack.com/reference/surfaces/formatting#inline-code) for technical info
- [`> quoted text`](https://api.slack.com/reference/surfaces/formatting#quotes) for summaries
- [Emoji](https://api.slack.com/reference/surfaces/formatting#emoji): ✅ ❌ 🚀 ⚠️
- [Links](https://api.slack.com/reference/surfaces/formatting#linking-urls): `<https://github.com/user/repo|Repository>`

<div class="tb-zh"><p>你会用 Slack 的 markdown（https://api.slack.com/reference/surfaces/formatting）来写富文本消息：用 粗体 表示强调；用 _斜体_ 表示细节；用代码块表示技术信息；用 &gt; 引用表示摘要；emoji：✅ ❌ 🚀 ⚠️；链接写法形如 &lt;https://github.com/user/repo|仓库名&gt;。</p></div>

## Project Structure

```
slack-notification/
├── starter/          # Your starting point
│   ├── server.py     # Modules 1+2 code + TODOs
│   ├── webhook_server.py  # From Module 2
│   ├── pyproject.toml
│   └── README.md
└── solution/         # Complete implementation
    ├── server.py     # Full Slack integration
    ├── webhook_server.py
    └── README.md
```

## Implementation Steps

### Step 1: Set Up Slack Integration (10 min)

1. Create a Slack webhook:
   - Go to [Slack API Apps](https://api.slack.com/apps)
   - Create new app → "From scratch" ([Creating an app guide](https://api.slack.com/authentication/basics#creating))
   - App Name: "MCP Course Notifications"
   - Choose your workspace
   - Go to "Features" → "[Incoming Webhooks](https://api.slack.com/messaging/webhooks)"
   - [Activate incoming webhooks](https://api.slack.com/messaging/webhooks#enable_webhooks)
   - Click "Add New Webhook to Workspace"
   - Choose channel and authorize ([Webhook setup guide](https://api.slack.com/messaging/webhooks#getting_started))
   - Copy the webhook URL

<div class="tb-zh"><p>1. 创建 Slack webhook：前往 Slack API Apps；创建新应用 →「From scratch」（参见创建应用指南）；应用名称填「MCP Course Notifications」；选择你的工作区；进入「Features」→「Incoming Webhooks」；启用入站 webhook；点击「Add New Webhook to Workspace」；选择频道并授权（参见 webhook 配置指南）；复制 webhook 地址。</p></div>

2. Test webhook works (following [webhook posting examples](https://api.slack.com/messaging/webhooks#posting_with_webhooks)):

<div class="tb-zh"><p>2. 测试 webhook 是否可用（参考 webhook 发送示例）：</p></div>

   ```bash
   curl -X POST -H 'Content-type: application/json' \
     --data '{"text":"Hello from MCP Course!"}' \
     YOUR_WEBHOOK_URL
   ```

3. Set environment variable:

<div class="tb-zh"><p>3. 设置环境变量：</p></div>

   ```bash
   export SLACK_WEBHOOK_URL="https://hooks.slack.com/services/YOUR/WEBHOOK/URL"
   ```

   **⚠️ Security Note**: The webhook URL is a sensitive secret that grants permission to post messages to your Slack channel. Always:
   - Store it as an environment variable, never hardcode it in your code
   - Never commit webhook URLs to version control (add to .gitignore)
   - Treat it like a password - anyone with this URL can send messages to your channel

<div class="tb-zh"><p>⚠️ 安全提示：webhook URL 是一个敏感密钥，拿到它就等于获得了向你的 Slack 频道发消息的权限。务必：把它存为环境变量，绝不要硬编码进代码；绝不要把 webhook URL 提交进版本控制（写进 .gitignore）；像对待密码一样对待它——任何拿到这个 URL 的人都能向你的频道发消息。</p></div>

> [!WARNING]
> **Security Alert**: Webhook URLs are sensitive credentials! Anyone with your webhook URL can send messages to your Slack channel. Always store them as environment variables and never commit them to version control.

<div class="tb-zh"><p>安全提醒：webhook 地址属于敏感凭据！任何拿到你 webhook 地址的人都能向你的 Slack 频道发消息。请务必把它存为环境变量，绝不要提交到版本控制。</p></div>

### Step 2: Add Slack Tool (15 min)

Now that you have a working webhook, you'll add a new MCP tool to your existing server.py from Module 2. This tool will handle sending notifications to Slack by making HTTP requests to the webhook URL.

<div class="tb-zh"><p>现在你有了可用的 webhook，接下来在第二模块的 server.py 里加一个新的 MCP 工具。这个工具通过向 webhook URL 发起 HTTP 请求，把通知发送到 Slack。</p></div>

> [!TIP]
> **Note**: The starter code includes all improvements from Modules 1 & 2 (output limiting, webhook handling). Focus on the new Slack integration!

<div class="tb-zh"><p>注意：起始代码已包含模块一、模块二的全部改进（输出限制、webhook 处理）。请专注于新的 Slack 集成部分！</p></div>

Add this tool to your server.py:

<div class="tb-zh"><p>把这个工具加入你的 server.py：</p></div>

**`send_slack_notification`**:
- Takes a message string parameter
- Reads webhook URL from environment variable
- Sends POST request to Slack webhook
- Returns success/failure message
- Handles basic error cases

<div class="tb-zh"><p>send_slack_notification 会：接收一个消息字符串参数；从环境变量读取 webhook URL；向 Slack webhook 发送 POST 请求；返回成功或失败信息；处理基本错误情形。</p></div>

```python
import os
import requests
from mcp.types import TextContent

@mcp.tool()
def send_slack_notification(message: str) -> str:
    """Send a formatted notification to the team Slack channel."""
    webhook_url = os.getenv("SLACK_WEBHOOK_URL")
    if not webhook_url:
        return "Error: SLACK_WEBHOOK_URL environment variable not set"
    
    try:
        # TODO: Send POST request to webhook_url
        # TODO: Include message in JSON payload with "mrkdwn": true
        # TODO: Handle response and return status
        pass
    except Exception as e:
        return f"Error sending message: {str(e)}"
```

### Step 3: Create Formatting Prompts (15 min)

Next, you'll add MCP Prompts to your server - this is where the magic happens! These prompts will work with Claude to automatically format your GitHub webhook data into well-structured Slack messages. Remember from Module 1 that Prompts provide reusable instructions that Claude can use consistently.

<div class="tb-zh"><p>接着往服务端加入 MCP Prompts——魔法就在这里！这些提示词会与 Claude 配合，自动把你的 GitHub webhook 数据格式化成结构良好的 Slack 消息。回想第一模块讲过的：Prompts 提供可复用的指令，让 Claude 能一致地遵循。</p></div>

Implement two prompts that generate Slack-formatted messages:

<div class="tb-zh"><p>实现两个生成 Slack 格式消息的提示词：</p></div>

1. **`format_ci_failure_alert`**:

<div class="tb-zh"><p>1. format_ci_failure_alert：</p></div>

   ```python
   @mcp.prompt()
   def format_ci_failure_alert() -> str:
       """Create a Slack alert for CI/CD failures."""
       return """Format this GitHub Actions failure as a Slack message:

   Use this template:
   :rotating_light: *CI Failure Alert* :rotating_light:
   
   A CI workflow has failed:
   *Workflow*: workflow_name
   *Branch*: branch_name
   *Status*: Failed
   *View Details*: <LOGS_LINK|View Logs>
   
   Please check the logs and address any issues.
   
   Use Slack markdown formatting and keep it concise for quick team scanning."""
   ```

2. **`format_ci_success_summary`**:

<div class="tb-zh"><p>2. format_ci_success_summary：</p></div>

   ```python
   @mcp.prompt()
   def format_ci_success_summary() -> str:
       """Create a Slack message celebrating successful deployments."""
       return """Format this successful GitHub Actions run as a Slack message:

   Use this template:
   :white_check_mark: *Deployment Successful* :white_check_mark:
   
   Deployment completed successfully for [Repository Name]
   
   *Changes:*
   - Key feature or fix 1
   - Key feature or fix 2
   
   *Links:*
   <PR_LINK|View Changes>
   
   Keep it celebratory but informative. Use Slack markdown formatting."""
   ```

### Step 4: Test Complete Workflow (10 min)

Now comes the exciting part - testing your complete MCP workflow! You'll have all three components working together: webhook capture from Module 2, prompt formatting from this module, and Slack notifications.

<div class="tb-zh"><p>接下来是最有意思的部分——测试你完整的 MCP 工作流！你会让三个组件一起工作：来自第二模块的 webhook 采集、来自本模块的提示词格式化，以及 Slack 通知。</p></div>

1. Start all services (just like in Module 2, but now with Slack integration):

<div class="tb-zh"><p>1. 启动所有服务（与模块二相同，只是现在多了 Slack 集成）：</p></div>

   ```bash
   # Terminal 1: Start webhook server
   python webhook_server.py
   
   # Terminal 2: Start MCP server
   uv run server.py
   
   # Terminal 3: Start Cloudflare Tunnel  
   cloudflared tunnel --url http://localhost:8080
   ```

2. Test the complete integration with Claude Code:
   - **Configure GitHub webhook** with tunnel URL (same as Module 2)
   - **Push changes** to trigger GitHub Actions 
   - **Ask Claude** to check recent events and format them using your prompts
   - **Let Claude send** the formatted message using your Slack tool
   - **Verify** notifications appear in your Slack channel

<div class="tb-zh"><p>2. 用 Claude Code 测试完整集成：用隧道地址配置 GitHub webhook（与模块二相同）；推送改动以触发 GitHub Actions；让 Claude 检查最近的事件，并用你的提示词格式化；让 Claude 用你的 Slack 工具发送格式化后的消息；确认通知出现在你的 Slack 频道中。</p></div>

### Step 5: Verify Integration (5 min)

You can test your implementation without setting up a real GitHub repository! See `manual_test.md` for curl commands that simulate GitHub webhook events.

<div class="tb-zh"><p>你不需要真的搭一个 GitHub 仓库也能测试！manual_test.md 里有模拟 GitHub webhook 事件的 curl 命令。</p></div>

**Understanding the webhook event flow:**
- Your webhook server (from Module 2) captures GitHub events and stores them in `github_events.json`
- Your MCP tools read from this file to get recent CI/CD activity  
- Claude uses your formatting prompts to create readable messages
- Your Slack tool sends the formatted messages to your team channel
- This creates a complete pipeline: GitHub → Local Storage → Claude Analysis → Slack Notification

<div class="tb-zh"><p>理解 webhook 事件流转：你的 webhook 服务端（来自第二模块）采集 GitHub 事件并存入 github_events.json；你的 MCP 工具读取该文件以获取最近的 CI/CD 活动；Claude 用你的格式化提示词生成可读消息；你的 Slack 工具把格式化消息发送到团队频道；由此形成一条完整链路：GitHub → 本地存储 → Claude 分析 → Slack 通知。</p></div>

**Quick Test Workflow:**
1. Use curl to send fake GitHub events to your webhook server
2. Ask Claude to check recent events and format them
3. Send formatted messages to Slack
4. Verify everything works end-to-end

<div class="tb-zh"><p>快速测试流程：1. 用 curl 向你的 webhook 服务端发送伪造的 GitHub 事件；2. 让 Claude 检查最近事件并做格式化；3. 把格式化消息发送到 Slack；4. 验证整条链路端到端可用。</p></div>

**Manual Testing Alternative:** For a complete testing experience without GitHub setup, follow the step-by-step curl commands in `manual_test.md`.

<div class="tb-zh"><p>手动测试替代方案：如果想在不搭建 GitHub 的情况下获得完整测试体验，按 manual_test.md 中的 curl 命令一步步操作即可。</p></div>

## Example Workflow in Claude Code

```
User: "Check recent CI events and notify the team about any failures"

Claude: 
1. Uses get_recent_actions_events (from Module 2)
2. Finds a workflow failure
3. Uses format_ci_failure_alert prompt to create message
4. Uses send_slack_notification tool to deliver it
5. Reports back: "Sent failure alert to #dev-team channel"
```

## Expected Slack Message Output

**Failure Alert:**

<div class="tb-zh"><p>失败告警：</p></div>

```
🚨 *CI Failure Alert* 🚨

A CI workflow has failed:
*Workflow*: CI (Run #42)
*Branch*: feature/slack-integration
*Status*: Failed
*View Details*: <https://github.com/user/mcp-course/actions/runs/123|View Logs>

Please check the logs and address any issues.
```

**Success Summary:**

<div class="tb-zh"><p>成功摘要：</p></div>

```
✅ *Deployment Successful* ✅

Deployment completed successfully for mcp-course

*Changes:*
- Added team notification system
- Integrated MCP Tools and Prompts

*Links:*
<https://github.com/user/mcp-course/pull/42|View Changes>
```

## Common Issues

### Webhook URL Issues
- Verify the environment variable is set correctly
- Test webhook directly with curl before integrating
- Ensure Slack app has proper permissions

### Message Formatting
- [Slack markdown](https://api.slack.com/reference/surfaces/formatting) differs from GitHub markdown
- **Important**: Use `*text*` for bold (not `**text**`)
- Include `"mrkdwn": true` in webhook payload for proper formatting
- Test message formatting manually before automating
- Handle special characters in commit messages properly ([formatting reference](https://api.slack.com/reference/surfaces/formatting#escaping))

### Network Errors
- Add basic timeout handling to webhook requests ([webhook error handling](https://api.slack.com/messaging/webhooks#handling_errors))
- Return meaningful error messages from the tool
- Check internet connectivity if requests fail

## Key Takeaways

You've now built a complete MCP workflow that demonstrates:
- **Tools** for external API integration (Slack webhooks)
- **Prompts** for intelligent message formatting
- **Integration** of all MCP primitives working together
- **Real-world application** that teams can actually use

<div class="tb-zh"><p>你现在已经构建出一套完整的 MCP 工作流，它展示了：用 Tools 集成外部 API（Slack webhook）；用 Prompts 做智能消息格式化；各类 MCP 原语的协同集成；团队真正能用的真实应用。</p></div>

This shows the power of MCP for building practical development automation tools!

<div class="tb-zh"><p>这展示了 MCP 在构建实用开发自动化工具方面的威力！</p></div>

> [!TIP]
> **Key Learning**: You've now built a complete MCP workflow that combines Tools (for external API calls) with Prompts (for consistent formatting). This pattern of Tools + Prompts is fundamental to advanced MCP development and can be applied to many other automation scenarios.

<div class="tb-zh"><p>关键收获：你现在已经搭出了一套完整的 MCP 工作流，把 Tools（用于调用外部 API）与 Prompts（用于统一格式）结合起来。这种 Tools + Prompts 的组合是进阶 MCP 开发的基础模式，可以套用到许多其他自动化场景。</p></div>

## Next Steps

Congratulations! You've completed the final module of Unit 3 and built a complete end-to-end automation system. Your journey through all three modules has given you hands-on experience with:

<div class="tb-zh"><p>恭喜！你已经完成了第三单元的最后一个模块，构建出一套完整的端到端自动化系统。三模块的旅程让你动手体验了：</p></div>

- **Module 1**: MCP Tools and intelligent data analysis
- **Module 2**: Real-time webhooks and MCP Prompts
- **Module 3**: External API integration and workflow completion

<div class="tb-zh"><p>模块一：MCP Tools 与智能数据分析；模块二：实时 webhook 与 MCP Prompts；模块三：外部 API 集成与工作流收尾。</p></div>

### What to do next:
1. **Test your complete system** - Try triggering real GitHub events and watch the full pipeline work
2. **Experiment with customization** - Modify the Slack message formats or add new notification types
3. **Review the Unit 3 Conclusion** - Reflect on everything you've learned and explore next steps
4. **Share your success** - Show teammates how MCP can automate your development workflows

You now have a solid foundation for building intelligent automation systems with MCP!

<div class="tb-zh"><p>现在你已经有了用 MCP 构建智能自动化系统的扎实基础！</p></div>

### The transformation is complete!
CodeCraft Studios has gone from chaotic development to a well-oiled machine. The automation system you built handles:
- **Smart PR descriptions** that help reviewers understand changes
- **Real-time CI/CD monitoring** that catches failures before they reach production  
- **Intelligent team notifications** that keep everyone informed automatically

The team can now focus on building great products instead of fighting process problems. And you've learned advanced MCP patterns that you can apply to any automation challenge!

<div class="tb-zh"><p>团队现在可以把精力放在做出好产品上，而不是跟流程问题较劲。而你也学到了可以应用到任何自动化挑战中的进阶 MCP 模式！</p></div>

## Additional Resources

- [Slack Incoming Webhooks Documentation](https://api.slack.com/messaging/webhooks)
- [Slack Message Formatting Guide](https://api.slack.com/reference/surfaces/formatting)
- [MCP Tools Documentation](https://modelcontextprotocol.io/docs/concepts/tools)
- [MCP Prompts Guide](https://modelcontextprotocol.io/docs/concepts/prompts)

<div class="tb-zh"><p>Slack 入站 Webhook 文档；Slack 消息格式指南；MCP Tools 文档；MCP Prompts 指南</p></div>
