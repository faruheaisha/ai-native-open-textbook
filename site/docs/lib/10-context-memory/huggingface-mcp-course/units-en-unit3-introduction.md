---
title: "Advanced MCP Development: Building Custom Workflow Servers for Claude Code"
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

# Advanced MCP Development: Building Custom Workflow Servers for Claude Code

Welcome to Unit 3! In this unit, we'll build a practical MCP server that enhances Claude Code with custom development workflows while learning all three MCP primitives.

<div class="tb-zh"><p>欢迎来到第三单元！本单元我们会构建一个实用的 MCP 服务端，用自定义的开发工作流来增强 Claude Code，同时学习 MCP 的三种原语。</p></div>

If you'd like to hear from the creators of MCP, here's a video they made:

<div class="tb-zh"><p>如果你想听听 MCP 创造者的说法，他们录了这样一段视频：</p></div>

In this video Theo Chu, David Soria Parra and Alex Albert dive into the Model Context Protocol (MCP), the standard that's changing how AI applications connect with external data and tools.

<div class="tb-zh"><p>在这段视频里，Theo Chu、David Soria Parra 和 Alex Albert 深入讲解 Model Context Protocol（MCP）——这一正在改变 AI 应用与外部数据和工具连接方式的标准。</p></div>

## What You'll Build

**PR Agent Workflow Server** - An MCP server that demonstrates how to make Claude Code team-aware and workflow-intelligent:

<div class="tb-zh"><p>PR Agent Workflow Server —— 一个演示如何让 Claude Code 具备团队意识和工作流智能的 MCP 服务端：</p></div>

- **Smart PR Management**: Automatic PR template selection based on code changes using MCP Tools
- **CI/CD Monitoring**: Track GitHub Actions with Cloudflare Tunnel and standardized Prompts
- **Team Communication**: Slack notifications demonstrating all MCP primitives working together

<div class="tb-zh"><p>智能 PR 管理：用 MCP Tools 根据代码改动自动选择 PR 模板；CI/CD 监控：用 Cloudflare Tunnel 与标准化 Prompts 跟踪 GitHub Actions；团队协作：用 Slack 通知演示所有 MCP 原语如何协同工作。</p></div>

## Real-World Case Study

We'll implement a practical scenario every development team faces:

<div class="tb-zh"><p>我们将实现一个每个开发团队都会遇到的真实场景：</p></div>

**Before**: Developer manually creates PRs, waits for Actions to complete, manually checks results, remembers to notify team members

<div class="tb-zh"><p>之前：开发者手动创建 PR、等待 Actions 跑完、手动检查结果、还要记得通知团队成员。</p></div>

**After**: Claude Code connected to your workflow server can intelligently:
- Suggest the right PR template based on changed files
- Monitor GitHub Actions runs and provide formatted summaries
- Automatically notify team via Slack when deployments succeed/fail
- Guide developers through team-specific review processes based on Actions results

<div class="tb-zh"><p>之后：连接到你的工作流服务端的 Claude Code 可以智能地：根据改动文件推荐合适的 PR 模板；监控 GitHub Actions 运行并给出格式化摘要；在部署成功或失败时通过 Slack 自动通知团队；依据 Actions 结果引导开发者走团队专属的评审流程。</p></div>

## Key Learning Outcomes

1. **Core MCP Primitives**: Master Tools and Prompts through practical examples
2. **MCP Server Development**: Build a functional server with proper structure and error handling
3. **GitHub Actions Integration**: Use Cloudflare Tunnel to receive webhooks and process CI/CD events
4. **Hugging Face Hub Workflows**: Create specialized workflows for LLM development teams
5. **Multi-System Integration**: Connect GitHub, Slack, and Hugging Face Hub through MCP
6. **Claude Code Enhancement**: Make Claude understand your team's specific workflows

<div class="tb-zh"><p>1. MCP 核心原语：通过实例掌握 Tools 与 Prompts；2. MCP 服务端开发：构建一个结构规范、含错误处理的可运行服务端；3. GitHub Actions 集成：用 Cloudflare Tunnel 接收 webhook 并处理 CI/CD 事件；4. Hugging Face Hub 工作流：为 LLM 开发团队定制专用流程；5. 多系统集成：通过 MCP 连接 GitHub、Slack 与 Hugging Face Hub；6. 增强 Claude Code：让 Claude 理解你们团队的特定工作流。</p></div>

## MCP Primitives in Action

This unit provides hands-on experience with the core MCP primitives:

<div class="tb-zh"><p>本单元提供 MCP 核心原语的动手实践机会：</p></div>

- **Tools** (Module 1): Functions Claude can call to analyze files and suggest templates
- **Prompts** (Module 2): Standardized workflows for consistent team processes
- **Integration** (Module 3): All primitives working together for complex automation

<div class="tb-zh"><p>Tools（模块一）：Claude 可调用的函数，用于分析文件并推荐模板；Prompts（模块二）：标准化工作流，保证团队流程一致；整合（模块三）：让所有原语协同完成复杂的自动化。</p></div>

## Module Structure

1. **Module 1: Build MCP Server** - Create a basic server with Tools for PR template suggestions
2. **Module 2: GitHub Actions Integration** - Monitor CI/CD with Cloudflare Tunnel and Prompts
3. **Module 3: Slack Notification** - Team communication integrating all MCP primitives

<div class="tb-zh"><p>1. 模块一：构建 MCP 服务端——做出一个基础服务端，用 Tools 提供 PR 模板建议；2. 模块二：GitHub Actions 集成——用 Cloudflare Tunnel 与 Prompts 监控 CI/CD；3. 模块三：Slack 通知——整合全部 MCP 原语，完成团队协作。</p></div>

## Prerequisites

Before starting this unit, ensure you have:

<div class="tb-zh"><p>开始本单元之前，请确认你已具备：</p></div>

- Completion of Units 1 and 2 
- Basic familiarity with GitHub Actions and webhook concepts
- Access to a GitHub repository for testing (can be a personal test repo)
- A Slack workspace where you can create webhook integrations

<div class="tb-zh"><p>已完成第一、二单元；对 GitHub Actions 与 webhook 概念有基本了解；有一个可用于测试的 GitHub 仓库（个人测试仓库即可）；有一个可以创建 webhook 集成的 Slack 工作区。</p></div>

### Claude Code Installation and Setup

This unit requires Claude Code to test your MCP server integration.

<div class="tb-zh"><p>本单元需要 Claude Code 来测试你的 MCP 服务端集成。</p></div>

> [!TIP]
> **Installation Required:** This unit requires Claude Code for testing MCP server integration with AI workflows.

<div class="tb-zh"><p>需要安装：本单元需要 Claude Code，用来测试 MCP 服务端与 AI 工作流的集成。</p></div>

**Quick Setup:**

<div class="tb-zh"><p>快速安装：</p></div>

Follow the [official installation guide](https://docs.anthropic.com/en/docs/claude-code/getting-started) to install Claude Code and complete authentication. The key steps are installing via npm, navigating to your project directory, and running `claude` to authenticate through console.anthropic.com.

<div class="tb-zh"><p>按照官方安装指南（https://docs.anthropic.com/en/docs/claude-code/getting-started）安装 Claude Code 并完成鉴权。关键步骤是用 npm 安装、进入你的项目目录，然后运行 claude 通过 console.anthropic.com 完成鉴权。</p></div>

Once installed, you'll use Claude Code throughout this unit to test your MCP server and interact with the workflow automation you build.

<div class="tb-zh"><p>安装完成后，你会在本单元中一直使用 Claude Code 来测试 MCP 服务端，并与你构建的工作流自动化交互。</p></div>

> [!WARNING]
> **New to Claude Code?** If you encounter any setup issues, the [troubleshooting guide](https://docs.anthropic.com/en/docs/claude-code/troubleshooting) covers common installation and authentication problems.

<div class="tb-zh"><p>刚接触 Claude Code？如果遇到配置问题，故障排查指南里覆盖了常见的安装与认证问题。</p></div>

By the end of this unit, you'll have built a complete MCP server that demonstrates how to transform Claude Code into a powerful team development assistant, with hands-on experience using all three MCP primitives.

<div class="tb-zh"><p>学完本单元，你会构建出一个完整的 MCP 服务端，它展示了如何把 Claude Code 变成强大的团队开发助手，同时你也动手用遍了 MCP 的三种原语。</p></div>
