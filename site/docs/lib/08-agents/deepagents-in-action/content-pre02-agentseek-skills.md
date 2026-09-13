---
title: "AgentSeek 准备篇（下）：为 AI 编码助手安装开发技能"
sourceId: "08-agents/deepagents-in-action"
sourceTitle: "《Deep Agents 实战》"
sourceKind: "实践案例集"
licenseLabel: "限非商用"
lang: "中文"
tier: 2
volume: "08-agents"
sourceUrl: "https://github.com/datawhalechina/deepagents-in-action"
entryUrl: "https://github.com/datawhalechina/deepagents-in-action/blob/4097ff944f9ffa1bdfe2dd04f751f4416b058860/README.md"
zh: ""
---

# AgentSeek 准备篇（下）：为 AI 编码助手安装开发技能

> 完成本章后，Codex、Claude Code 或其他兼容工具可以在当前项目中使用 `langchain-dev-guide` 和 `langsmith-trace`。
>
> 本文命令于 2026-07-15 验证。Skills CLI 会继续更新；请以 `npx skills --help` 的输出为准。

> Windows 学员请沿用上一章选择的环境：WSL2 用户执行本文的 macOS / Linux / WSL2（Bash）命令；留在原生 Windows 的学员执行对应的 PowerShell 命令。不要在同一个项目中混用两套 Python、Node.js 或 Git 环境。

## 两类 Skill 的区别

本章安装的是编码助手开发技能。它们帮助 Codex、Claude Code、Cursor 等工具修改和调试项目。

课程第 7 章介绍的是 DeepAgents 运行时 Skill。运行时 Skill 通过 `create_deep_agent(skills=[...])` 提供给你的 Agent。两者都使用 `SKILL.md`，但服务对象不同：

| 类型 | 使用者 | 安装或加载方式 | 本章是否涉及 |
|------|--------|----------------|--------------|
| 编码助手开发技能 | Codex、Claude Code、Cursor 等 | `npx skills add ...` | 是 |
| DeepAgents 运行时 Skill | 你构建的 Deep Agent | `create_deep_agent(skills=[...])` | 否，见第 7 章 |

## 1. 查看 AgentSeek 开发技能

Skills CLI 通过 npm 运行。先确认 Node.js 和 npm 已安装：

```bash
node --version
npm --version
```

进入上一章生成的项目：

```bash
cd research_deepagent
```

查看 AgentSeek 仓库提供的技能：

```bash
npx skills add ob-labs/agentseek --list
```

仓库里的技能会继续增加，实际清单以命令输出为准。本课程重点使用其中两个：

| Skill | 用途 |
|------|------|
| `langchain-dev-guide` | LangChain、LangGraph 和 DeepAgents 开发指南 |
| `langsmith-trace` | LangSmith Trace 查询与调试流程 |

输出中出现的其他技能与本课程准备流程无关，可以暂时忽略。

## 2. 安装到当前项目

运行以下命令：

```bash
npx skills add ob-labs/agentseek --skill langchain-dev-guide --skill langsmith-trace
```

Skills CLI 会检测本机已有的编码助手。按提示选择 Codex、Claude Code 或你正在使用的工具，并确认安装。

你也可以直接指定工具。安装到 Codex：

```bash
npx skills add ob-labs/agentseek --skill langchain-dev-guide --skill langsmith-trace --agent codex --yes
```

安装到 Claude Code：

```bash
npx skills add ob-labs/agentseek --skill langchain-dev-guide --skill langsmith-trace --agent claude-code --yes
```

本章使用项目级安装，不加 `--global`。技能只作用于当前项目，也更方便你在安装后先检查内容，再决定是否把它们纳入版本管理。

## 3. 检查安装位置

列出当前项目和用户目录中的已安装技能：

```bash
npx skills list
```

不同编码助手读取不同目录：

| 编码助手 | 项目级目录 | 全局目录 |
|----------|------------|----------|
| Codex | `.agents/skills/` | `~/.agents/skills/` |
| Claude Code | `.claude/skills/` | `~/.claude/skills/` |
| Cursor | `.agents/skills/` | `~/.agents/skills/` |

项目级安装是默认行为。`--global` 会写入用户级目录，不会写入当前项目的 `.agents/skills/`。

如果你选择了 Codex，可以检查技能入口：

```bash
ls .agents/skills/langchain-dev-guide/SKILL.md
ls .agents/skills/langsmith-trace/SKILL.md
```

如果你选择了 Claude Code，请把路径替换为 `.claude/skills/`。

## 4. 使用 langchain-dev-guide

`langchain-dev-guide` 汇总了 LangChain 生态开发中容易出现的配置和运行问题，主要覆盖：

- DeepAgents 模型、文件系统、子 Agent 和长期记忆
- OpenAI 兼容接口与国产模型接入
- Middleware、流式输出和多 Agent 编排
- 结构化输出、Tool Call 和运行时上下文问题

在编码助手中输入一个具体任务，并明确提到技能名称：

```text
请使用 langchain-dev-guide 检查这个 deepagents/research 项目的模型配置。
本课程默认通过 SiliconFlow 的 OpenAI 兼容接口使用 GLM。
请核对环境变量，并说明 Tool Call、reasoning_content 等能力的兼容性边界。
```

编码助手应该先读取 `langchain-dev-guide/SKILL.md`，再按需读取它引用的资料。你可以要求助手说明它使用了哪个参考文件，以确认技能已经生效。

另一个示例：

```text
请使用 langchain-dev-guide，为这个研究 Agent 添加自定义 Middleware。
先检查 Middleware 执行顺序和 state_schema 合并规则，再给出修改方案。
```

## 5. 实操：用 langsmith-trace 定位一次慢调用（5–10 分钟）

本节使用上一章 `deepagents/research` 生成的 Trace。完成后，你应该能指出研究过程慢在哪里、判断依据是什么，以及下一步如何优化。

开始前确认：

- 上一章已经启用 `LANGSMITH_TRACING=true`
- `.env` 中已经设置 `LANGSMITH_API_KEY` 和 `LANGSMITH_PROJECT=deepagents-course`
- `deepagents-course` 或 `default` 中至少有一条已完成的 `research` Trace
- 当前项目已经安装 `langsmith-trace`

### 5.1 检查 CLI 和认证

先确认 LangSmith CLI 是否可用。

macOS / Linux / WSL2：

```bash
command -v langsmith
langsmith --version
```

原生 Windows PowerShell：

```powershell
if (Get-Command langsmith -ErrorAction SilentlyContinue) {
  langsmith --version
} else {
  Write-Warning "LangSmith CLI 未安装，请先执行下面的 Windows 安装步骤。"
}
```

如果命令不存在，使用 LangSmith CLI 官方安装脚本。

macOS / Linux / WSL2：

```bash
curl -fsSL https://cli.langsmith.com/install.sh | sh
```

原生 Windows PowerShell：

```powershell
irm https://cli.langsmith.com/install.ps1 | iex
```

安装完成后关闭并重新打开终端，再运行 `langsmith --version`。如果仍然找不到命令，请按安装器输出修复 PATH。安装脚本与最新版本见 [LangSmith CLI 官方仓库](https://github.com/langchain-ai/langsmith-cli)。

PyPI 的 `langsmith` 包是 Python SDK，不提供这里使用的 CLI 可执行文件；不要使用 `uv tool install langsmith` 安装 LangSmith CLI。

LangSmith CLI 从环境变量读取凭证。请在项目根目录加载 `.env`。

macOS / Linux / WSL2：

```bash
set -a
source .env
set +a
```

原生 Windows PowerShell：

```powershell
Get-Content .env | ForEach-Object {
  if ($_ -match '^\s*([A-Za-z_][A-Za-z0-9_]*)=(.*)$') {
    $value = $matches[2] -replace '^"(.*)"$', '$1'
    Set-Item -Path "Env:$($matches[1])" -Value $value
  }
}
```

PowerShell 片段只加载本课程 `.env` 中常见的 `KEY=value` 行，并忽略注释和其他格式；它不会把 `.env` 当作 PowerShell 脚本执行。

确认凭证有效，并找到最近有运行记录的项目：

```bash
langsmith --format pretty project list
```

你应该能在列表中找到 `deepagents-course`。如果最近的 `research` Trace 已经进入 `default`，可以把后续命令中的项目名换成 `default`，直接分析已有 Trace。`LANGSMITH_PROJECT` 只影响未来运行；只有两个项目中都没有已完成的 `research` Trace 时，才需要修正配置并重新运行研究问题。

不要把真实 Key 写进 Shell 命令，也不要使用 `--api-key`。命令可能进入 Shell 历史、进程列表或编码助手日志。

### 5.2 找到完整 Trace

先列出最近的根 Trace：

```bash
langsmith trace list --project deepagents-course --name research --include-metadata --limit 5
```

复制最新、状态已完成的 `research` 根节点 `trace_id`，再查看完整运行树：

```bash
