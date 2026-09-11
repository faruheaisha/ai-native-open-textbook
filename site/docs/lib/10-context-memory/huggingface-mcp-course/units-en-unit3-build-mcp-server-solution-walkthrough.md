---
title: "Unit 3 Solution Walkthrough: Building a Pull Request Agent with MCP"
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

# Unit 3 Solution Walkthrough: Building a Pull Request Agent with MCP

## Overview

This walkthrough guides you through the complete solution for Unit 3's Pull Request Agent - an MCP server that helps developers create better pull requests by analyzing code changes, monitoring CI/CD pipelines, and automating team communications. The solution demonstrates all three MCP primitives (Tools, Resources, and Prompts) working together in a real-world workflow.

<div class="tb-zh"><p>这份讲解带你走完第三单元 Pull Request Agent 的完整解法——一个帮开发者写出更好 pull request 的 MCP 服务端，它通过分析代码改动、监控 CI/CD 流水线并自动化团队沟通来发挥作用。这套解法展示了 MCP 的三种原语（Tools、Resources 和 Prompts）在真实工作流中如何协同工作。</p></div>

## Architecture Overview

The PR Agent consists of interconnected modules that progressively build a complete automation system:

<div class="tb-zh"><p>PR Agent 由若干相互衔接的模块组成，逐步搭建出一套完整的自动化系统：</p></div>

1. **Build MCP Server** - Basic server with Tools for PR template suggestions
2. **Smart File Analysis** - Enhanced analysis using Resources for project context
3. **GitHub Actions Integration** - CI/CD monitoring with standardized Prompts
4. **Hugging Face Hub Integration** - Model deployment and dataset PR workflows
5. **Slack Notification** - Team communication integrating all MCP primitives

<div class="tb-zh"><p>1. 构建 MCP 服务端——用 Tools 提供 PR 模板建议的基础服务端；2. 智能文件分析——用 Resources 引入项目上下文，增强分析；3. GitHub Actions 集成——用标准化 Prompts 监控 CI/CD；4. Hugging Face Hub 集成——模型部署与数据集 PR 工作流；5. Slack 通知——整合全部 MCP 原语的团队协作。</p></div>

## Module 1: Build MCP Server

### What We're Building
A minimal MCP server that analyzes file changes and suggests appropriate PR templates using MCP Tools.

### Key Components

#### 1. Server Initialization (`server.py`)

```python
# The server registers three essential tools:
# - analyze_file_changes: Returns structured data about changed files
# - get_pr_templates: Lists available templates with metadata
# - suggest_template: Provides intelligent template recommendations
```

The server uses the MCP SDK to expose these tools to Claude Code, allowing it to gather information and make intelligent decisions about which PR template to use.

<div class="tb-zh"><p>服务端使用 MCP SDK 把这些工具暴露给 Claude Code，让它能够收集信息，并就使用哪个 PR 模板做出智能判断。</p></div>

#### 2. File Analysis Tool
The `analyze_file_changes` tool examines the git diff to identify:
- File types and extensions
- Number of files changed
- Lines added/removed
- Common patterns (tests, configs, docs)

This structured data enables Claude to understand the nature of the changes without hard-coding decision logic.

<div class="tb-zh"><p>这种结构化数据让 Claude 不必硬编码决策逻辑，就能理解改动的性质。</p></div>

#### 3. Template Management
Templates are stored as markdown files in the `templates/` directory:
- `bug.md` - For bug fixes
- `feature.md` - For new features
- `docs.md` - For documentation updates
- `refactor.md` - For code refactoring

Each template includes placeholders that Claude can fill based on the analysis.

<div class="tb-zh"><p>每个模板都包含占位符，Claude 可以依据分析结果把它们填好。</p></div>

### How Claude Uses These Tools

1. Claude calls `analyze_file_changes` to understand what changed
2. Uses `get_pr_templates` to see available options
3. Calls `suggest_template` with the analysis data
4. Receives a recommendation with reasoning
5. Can customize the template based on specific changes

<div class="tb-zh"><p>1. Claude 调用 analyze_file_changes 了解改了什么；2. 调用 get_pr_templates 查看有哪些可选模板；3. 带着分析数据调用 suggest_template；4. 拿到一份带理由的推荐；5. 可以针对具体改动定制模板。</p></div>

### Learning Outcomes
- Understanding tool registration and schemas
- Letting Claude make decisions with structured data
- Separation of data gathering from decision logic

## Module 2: Smart File Analysis

### What We're Building
Enhanced file analysis using MCP Resources to provide project context and team guidelines.

### Key Components

#### 1. Resource Registration
The server exposes four types of resources:

```python
# Resources provide read-only access to:
# - file://templates/ - PR template files
# - file://project-context/ - Coding standards, conventions
# - git://recent-changes/ - Commit history and patterns
# - team://guidelines/ - Review processes and standards
```

#### 2. Project Context Resources
The `project-context/` directory contains:
- `coding-standards.md` - Language-specific conventions
- `review-guidelines.md` - What reviewers look for
- `architecture.md` - System design patterns
- `dependencies.md` - Third-party library policies

Claude can read these to understand project-specific requirements.

<div class="tb-zh"><p>Claude 可以读取这些内容来理解项目特有的要求。</p></div>

#### 3. Git History Analysis
The `git://recent-changes/` resource provides:
- Recent commit messages and patterns
- Common PR titles and descriptions
- Team member contribution patterns
- Historical template usage

This helps Claude suggest templates consistent with team practices.

<div class="tb-zh"><p>这有助于 Claude 给出与团队实践一致的模板建议。</p></div>

### How Claude Uses Resources

1. Reads `team://guidelines/review-process.md` to understand PR requirements
2. Accesses `file://project-context/coding-standards.md` for style guides
3. Analyzes `git://recent-changes/` to match team patterns
4. Combines this context with file analysis for better suggestions

<div class="tb-zh"><p>1. 读取 team://guidelines/review-process.md 了解 PR 要求；2. 访问 file://project-context/coding-standards.md 获取风格规范；3. 分析 git://recent-changes/ 以对齐团队习惯；4. 把这些上下文与文件分析结合，给出更合适的建议。</p></div>

### Enhanced Decision Making
With resources, Claude can now:
- Suggest templates matching team conventions
- Include project-specific requirements in PRs
- Reference coding standards in descriptions
- Align with historical team practices

### Learning Outcomes
- Resource URI design and schemas
- Making project knowledge accessible to AI
- Context-aware decision making
- Balancing automation with team standards

## Module 3: GitHub Actions Integration

### What We're Building
Real-time CI/CD monitoring using webhooks and standardized prompts for consistent team communication.

### Key Components

#### 1. Webhook Server
Uses Cloudflare Tunnel to receive GitHub Actions events:

```python
# Webhook endpoint handles:
# - workflow_run events
# - check_run events  
# - pull_request status updates
# - deployment notifications
```

#### 2. Prompt Templates
Four standardized prompts ensure consistency:
- **"Analyze CI Results"** - Process test failures and build errors
- **"Generate Status Summary"** - Create human-readable status updates
- **"Create Follow-up Tasks"** - Suggest next steps based on results
- **"Draft Team Notification"** - Format updates for different audiences

#### 3. Event Processing Pipeline
1. Receive webhook from GitHub
2. Parse event data and extract relevant information
3. Use appropriate prompt based on event type
4. Generate standardized response
5. Store for team notification

### How Claude Uses Prompts

Example prompt usage:

<div class="tb-zh"><p>提示词用法示例：</p></div>

```python
# When tests fail, Claude uses the "Analyze CI Results" prompt:
prompt_data = {
    "event_type": "workflow_run",
    "status": "failure",
    "failed_jobs": ["unit-tests", "lint"],
    "error_logs": "...",
    "pr_context": {...}
}

# Claude generates:
# - Root cause analysis
# - Suggested fixes
# - Impact assessment
# - Next steps
```

### Standardized Workflows
Prompts ensure that regardless of who's working:
- CI failures are analyzed consistently
- Status updates follow team formats
- Follow-up actions align with processes
- Notifications contain required information

### Learning Outcomes
- Webhook integration patterns
- Prompt engineering for consistency
- Event-driven architectures
- Standardizing team workflows

## Module 4: Hugging Face Hub Integration

### What We're Building
Integration with Hugging Face Hub for LLM and dataset PRs, adding specialized workflows for teams working with language models.

### Key Components

#### 1. Hub-Specific Tools

```python
# Tools for Hugging Face workflows:
# - analyze_model_changes: Detect LLM file modifications
# - validate_dataset_format: Check training data compliance
# - generate_model_card: Create/update model documentation
# - suggest_hub_template: PR templates for LLMs/datasets
```

#### 2. Hub Resources

```python
# Resources for Hub context:
# - hub://model-cards/ - LLM card templates and examples
# - hub://dataset-formats/ - Training data specifications
# - hub://community-standards/ - Hub community guidelines
# - hub://license-info/ - License compatibility checks
```

#### 3. LLM-Specific Prompts

```python
# Prompts for LLM workflows:
# - "Analyze Model Changes" - Understand LLM updates
# - "Generate Benchmark Summary" - Create evaluation metrics
# - "Check Dataset Quality" - Validate training data
# - "Draft Model Card Update" - Update documentation
```

### Hub-Specific Workflows

When a PR modifies LLM files:
1. **Tool**: `analyze_model_changes` detects model architecture changes
2. **Resource**: Reads `hub://model-cards/llm-template.md`
3. **Prompt**: "Generate Benchmark Summary" creates evaluation section
4. **Tool**: `generate_model_card` updates documentation
5. **Resource**: Checks `hub://license-info/` for compatibility

<div class="tb-zh"><p>当某个 PR 修改了 LLM 相关文件时：1. 工具——analyze_model_changes 检测到模型架构变化；2. 资源——读取 hub://model-cards/llm-template.md；3. 提示词——“生成基准测试摘要”生成评测章节；4. 工具——generate_model_card 更新文档；5. 资源——检查 hub://license-info/ 的兼容性。</p></div>

### Dataset PR Handling
For training data updates:
- Validates format consistency
- Checks data quality metrics
- Updates dataset cards
- Suggests appropriate reviewers

### Learning Outcomes
- Hugging Face Hub API integration
- LLM-specific PR workflows
- Model and dataset documentation
- Community standards compliance

## Module 5: Slack Notification

### What We're Building
Automated team notifications combining Tools, Resources, and Prompts for complete workflow automation.

### Key Components

#### 1. Communication Tools

```python
# Three tools for team updates:
# - send_slack_message: Post to team channels
# - get_team_members: Identify who to notify
# - track_notification_status: Monitor delivery
```

#### 2. Team Resources

```python
# Resources for team data:
# - team://members/ - Developer profiles and preferences
# - slack://channels/ - Channel configurations
# - notification://templates/ - Message formats
```

#### 3. Notification Prompts

```python
# Prompts for communication:
# - "Format Team Update" - Style messages appropriately
# - "Choose Communication Channel" - Select right audience
# - "Escalate if Critical" - Handle urgent issues
```

### Integration Example

When CI fails on a critical PR:
1. **Tool**: `get_team_members` identifies the PR author and reviewers
2. **Resource**: `team://members/{user}/preferences` checks notification settings
3. **Prompt**: "Format Team Update" creates appropriate message
4. **Tool**: `send_slack_message` delivers to right channel
5. **Resource**: `notification://templates/ci-failure` ensures consistent format
6. **Prompt**: "Escalate if Critical" determines if additional alerts needed

<div class="tb-zh"><p>当关键 PR 上的 CI 失败时：1. 工具——get_team_members 识别出 PR 作者与评审人；2. 资源——team://members/{user}/preferences 检查通知设置；3. 提示词——“格式化团队更新”生成合适的消息；4. 工具——send_slack_message 投递到正确的频道；5. 资源——notification://templates/ci-failure 保证格式一致；6. 提示词——“若是严重问题则升级”判断是否需要额外告警。</p></div>

### Intelligent Routing
The system considers:
- Team member availability (from calendar resources)
- Notification preferences (email vs Slack)
- Message urgency (based on PR labels)
- Time zones and working hours

### Learning Outcomes
- Primitive integration patterns
- Complex workflow orchestration
- Balancing automation with human needs
- Production-ready error handling

## Complete Workflow Example

Here's how all components work together for a typical PR:

<div class="tb-zh"><p>下面是一个典型 PR 中所有组件如何协同工作：</p></div>

1. **Developer creates PR**
   - GitHub webhook triggers the server
   - Tool: `analyze_file_changes` examines the diff
   - Resource: Reads team guidelines and project context
   - Prompt: Suggests optimal PR template

<div class="tb-zh"><p>1. 开发者创建 PR——GitHub webhook 触发服务端；Tool：analyze_file_changes 检查 diff；Resource：读取团队规范与项目上下文；Prompt：推荐最合适的 PR 模板。</p></div>

2. **CI/CD Pipeline Runs**
   - Webhook receives workflow events
   - Prompt: "Analyze CI Results" processes outcomes
   - Resource: Checks team escalation policies
   - Tool: Updates PR status in GitHub

<div class="tb-zh"><p>2. CI/CD 流水线运行——webhook 收到工作流事件；Prompt：「Analyze CI Results」处理结果；Resource：检查团队的升级策略；Tool：在 GitHub 上更新 PR 状态。</p></div>

3. **Hugging Face Hub Integration**
   - Tool: Detects LLM/dataset changes
   - Resource: Reads Hub guidelines
   - Prompt: Generates model card updates
   - Tool: Validates against Hub standards

<div class="tb-zh"><p>3. Hugging Face Hub 集成——Tool：识别 LLM/数据集相关改动；Resource：读取 Hub 规范；Prompt：生成模型卡更新内容；Tool：按 Hub 标准做校验。</p></div>

4. **Team Notification**
   - Tool: Identifies relevant team members
   - Resource: Reads notification preferences
   - Prompt: Formats appropriate message
   - Tool: Sends via Slack channels

<div class="tb-zh"><p>4. 团队通知——Tool：找出相关的团队成员；Resource：读取通知偏好；Prompt：把消息组织成合适的格式；Tool：通过 Slack 频道发送。</p></div>

5. **Follow-up Actions**
   - Prompt: "Create Follow-up Tasks" generates next steps
   - Tool: Creates GitHub issues if needed
   - Resource: Links to documentation
   - All primitives work together seamlessly

<div class="tb-zh"><p>5. 后续动作——Prompt：「Create Follow-up Tasks」生成下一步；Tool：必要时创建 GitHub issue；Resource：附上文档链接；所有原语在此无缝协作。</p></div>

## Testing Strategy

### Unit Tests
Each module includes comprehensive unit tests:
- Tool schema validation
- Resource URI parsing
- Prompt template rendering
- Integration scenarios

### Integration Tests
End-to-end tests cover:
- Complete PR workflow
- Error recovery scenarios
- Performance under load
- Security validation

### Test Structure

```
tests/
├── unit/
│   ├── test_tools.py
│   ├── test_resources.py
│   ├── test_prompts.py
│   └── test_integration.py
├── integration/
│   ├── test_workflow.py
│   ├── test_webhooks.py
│   └── test_notifications.py
└── fixtures/
    ├── sample_events.json
    └── mock_responses.json
```

## Running the Solution

### Local Development Setup
1. **Start the MCP server**: `python server.py`
2. **Configure Claude Code**: Add server to MCP settings
3. **Set up Cloudflare Tunnel**: `cloudflared tunnel --url http://localhost:3000`
4. **Configure webhooks**: Add tunnel URL to GitHub repository
5. **Test the workflow**: Create a PR and watch the automation

### Configuration
Simple file-based configuration for easy setup:
- GitHub tokens in `.env` file
- Slack webhooks in config
- Template customization in `templates/`
- All settings in one place

## Common Patterns and Best Practices

### Tool Design
- Keep tools focused and single-purpose
- Return structured data for AI interpretation
- Include comprehensive error messages
- Version your tool schemas

### Resource Organization
- Use clear URI hierarchies
- Implement resource discovery
- Cache frequently accessed resources
- Version control all resources

### Prompt Engineering
- Make prompts specific but flexible
- Include context and examples
- Test with various inputs
- Maintain prompt libraries

### Integration Patterns
- Use events for loose coupling
- Implement circuit breakers
- Add retries with backoff
- Monitor all external calls

## Troubleshooting Guide

### Common Issues

1. **Webhook not receiving events**
   - Check Cloudflare Tunnel is running
   - Verify GitHub webhook configuration
   - Confirm secret matches

<div class="tb-zh"><p>1. webhook 收不到事件——检查 Cloudflare Tunnel 是否在运行；核对 GitHub 的 webhook 配置；确认密钥一致。</p></div>

2. **Tools not appearing in Claude**
   - Validate tool schemas
   - Check server registration
   - Review MCP connection

<div class="tb-zh"><p>2. 工具没有出现在 Claude 中——校验工具结构；检查服务端注册情况；检查 MCP 连接。</p></div>

3. **Resources not accessible**
   - Verify file permissions
   - Check URI formatting
   - Confirm resource registration

<div class="tb-zh"><p>3. 资源无法访问——确认文件权限；检查 URI 格式；确认资源已注册。</p></div>

4. **Prompts producing inconsistent results**
   - Review prompt templates
   - Check context provided
   - Validate input formatting

<div class="tb-zh"><p>4. Prompts 输出不稳定——检查提示词模板；检查所提供的上下文；校验输入的格式。</p></div>

## Next Steps and Extensions

### Potential Enhancements
1. Add more code analysis tools (complexity, security)
2. Integrate with more communication platforms
3. Add custom workflow definitions
4. Implement PR auto-merge capabilities

### Learning Path
- **Next**: Unit 4 - Deploy this server remotely
- **Advanced**: Custom MCP protocol extensions
- **Expert**: Multi-server orchestration

## Conclusion

This PR Agent demonstrates the power of MCP's three primitives working together. Tools provide capabilities, Resources offer context, and Prompts ensure consistency. Combined, they create an intelligent automation system that enhances developer productivity while maintaining team standards.

<div class="tb-zh"><p>这个 PR Agent 展示了 MCP 三种原语协同工作的威力。Tools 提供能力，Resources 提供上下文，Prompts 保证一致性。三者结合，构成了一套智能自动化系统，在维持团队规范的同时提升开发者的生产力。</p></div>

The modular architecture ensures each component can be understood, tested, and extended independently, while the integration showcases real-world patterns you'll use in production MCP servers.

<div class="tb-zh"><p>模块化的架构保证每个组件都能被独立理解、测试和扩展，而它们的集成则展示了你在生产级 MCP 服务端中会用到的真实模式。</p></div>
