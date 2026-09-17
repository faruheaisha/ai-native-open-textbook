---
title: "AgentSeek 准备篇（上）：用生命周期工作流启动 DeepAgents 模板"
sourceId: "08-agents/deepagents-in-action"
sourceTitle: "《Deep Agents 实战》"
sourceKind: "实践案例集"
licenseLabel: "限非商用"
lang: "中文"
tier: 2
volume: "08-agents"
sourceUrl: "https://github.com/datawhalechina/deepagents-in-action"
entryUrl: "https://github.com/datawhalechina/deepagents-in-action/blob/4097ff944f9ffa1bdfe2dd04f751f4416b058860/content/pre01-agentseek-create.md"
sourceRel: "content/pre01-agentseek-create.md"
rawUrl: "/raw/08-agents/deepagents-in-action/content/pre01-agentseek-create.md"
sourceSha256: "e10687f639d97f37b94a8bb169661d5afd235f466b8be4d38697b1a8314bef61"
pageSha256: "e10687f639d97f37b94a8bb169661d5afd235f466b8be4d38697b1a8314bef61"
contentMode: "local-full"
zh: ""
---

# AgentSeek 准备篇（上）：用生命周期工作流启动 DeepAgents 模板

> 完成本章后，你会得到一个可运行的 DeepAgents 研究应用。AgentSeek 会负责检查环境、安装项目依赖并启动前后端。
>
> 本文命令于 2026-08-18 使用 AgentSeek `0.1.2` 验证。AgentSeek 和模板会继续更新；如果任务名称与本文不同，以 `agentseek task --list` 的输出为准。

## AgentSeek 管理什么

AgentSeek 是一个面向 AI 应用开发的模板与生命周期工具。你通过模板创建项目，再用一组固定命令管理不同项目：

| 阶段 | 命令 | 用途 |
|------|------|------|
| 创建 | `agentseek create` | 从模板生成可编辑的项目 |
| 查看 | `agentseek info` | 查看项目入口、环境要求和任务 |
| 准备 | `agentseek task` | 运行模板声明的依赖安装等一次性任务 |
| 检查 | `agentseek doctor` | 静态检查文件、uv、Node.js、npm 和环境变量 |
| 运行 | `agentseek dev` | 启动模板声明的本地开发进程 |

每个生成项目都包含 `.agentseek/lifecycle.toml`。这个文件声明当前模板需要哪些工具、环境变量、任务和本地服务。AgentSeek 读取它，不接管应用自己的框架代码。

## 1. 准备本地环境

本章使用 `deepagents/research` 模板。你需要：

| 依赖 | 要求 | 用途 |
|------|------|------|
| Python | 3.12 或 3.13 | 运行 AgentSeek 和 DeepAgents 后端 |
| uv | 当前稳定版 | 安装 CLI 和 Python 依赖 |
| Node.js、npm | 当前 LTS 版本 | 运行 React 前端 |

### Windows 学员：优先使用 WSL2

本课程命令以 Bash 环境为主。Windows 10 2004+ 或 Windows 11 学员推荐使用 WSL2 + Ubuntu，这样可以直接执行后续的 macOS / Linux / WSL2 命令。请在**管理员 PowerShell** 中安装：

```powershell
wsl --install
```

安装完成后重启 Windows，首次打开 Ubuntu 时按提示创建 Linux 用户名和密码。再在 PowerShell 中确认发行版使用 WSL 2，并进入 Ubuntu：

```powershell
wsl -l -v
wsl -d Ubuntu
```

如果 `wsl -l -v` 显示版本为 1，请参考 [Microsoft WSL 安装文档](https://learn.microsoft.com/windows/wsl/install) 升级到 WSL 2。使用 WSL2 的 Linux 工具时，建议把项目放在 `~/projects/` 等 Linux 文件系统目录，不要放在 `/mnt/c/` 下；也不要混用 Windows 与 WSL 中的 Python、uv、Node.js、npm 或 Git。详见 [Microsoft WSL 开发环境指南](https://learn.microsoft.com/windows/wsl/setup/environment)。

如果设备策略、管理员权限或虚拟化条件不允许安装 WSL2，可以留在原生 Windows PowerShell 中，并使用本文标出的 PowerShell 命令。

macOS / Linux / WSL2 安装 `uv`：

```bash
curl -LsSf https://astral.sh/uv/install.sh | sh
```

原生 Windows PowerShell 安装 `uv`：

```powershell
powershell -ExecutionPolicy ByPass -c "irm https://astral.sh/uv/install.ps1 | iex"
```

安装 AgentSeek：

```bash
uv tool install --upgrade agentseek
```

原生 Windows PowerShell 如果提示 uv 的工具目录不在 PATH，运行：

```powershell
uv tool update-shell
```

然后关闭并重新打开 PowerShell，再执行后面的版本检查。如果只想让当前会话立即生效，可以临时加入 uv 返回的工具目录：

```powershell
$env:Path = "$(uv tool dir --bin);$env:Path"
```

临时写法不会永久修改 PATH。`uv tool update-shell` 的行为以 [uv 官方 CLI 文档](https://docs.astral.sh/uv/reference/cli/) 为准。

确认命令已经可用：

```bash
agentseek version
agentseek --help
```

你应该在帮助信息中看到 `create`、`info`、`task`、`doctor` 和 `dev`。本文验证时版本输出为 `AGENTSEEK v0.1.2`；以后版本号可能不同。

## 2. 选择并创建模板

查看当前 CLI 识别的模板：

```bash
agentseek create --list-templates --checkout main
```

这会列出模板仓库 `main` 分支当前注册的模板；不加 `--checkout main` 时，列表来自当前 AgentSeek 版本锁定的目录，可能不会立即包含最新批次。本课程使用 `deepagents/research`，它包含 DeepAgents 研究 Agent、Tavily 搜索和 React 前端。

创建项目并从模板仓库的 `main` 分支获取最新批次模板：

```bash
agentseek create deepagents/research --checkout main --no-input
```

`--checkout main` 让 AgentSeek 在创建时读取模板仓库当前的 `main` 分支，而不是只使用 CLI 内置的锁定目录。它适合跟随最新模板学习；模板更新后，生成项目的文件和依赖也可能变化。如果你需要课程作业完全复现某一次结果，再把 `main` 换成当时记录的完整提交 SHA。

进入生成目录：

```bash
cd research_deepagent
```

如果你想自定义项目名称、模型和端口，去掉 `--no-input`，再按提示填写模板变量。

## 3. 查看生命周期配置

先查看项目摘要：

```bash
agentseek info
```

再查看模板提供的一次性任务：

```bash
agentseek task --list
```

当前 `deepagents/research` 模板会列出两个准备任务：

```text
sync      Install Python dependencies with uv.
frontend  Install frontend dependencies.
```

任务名称属于模板配置。以后如果输出发生变化，请运行输出中对应的依赖安装任务。

项目中的关键文件如下：

```text
research_deepagent/
├── .agentseek/lifecycle.toml
├── .env.example
├── frontend/
│   ├── .env.example
│   ├── package.json
│   └── src/
├── langgraph.json
├── pyproject.toml
└── src/research_deepagent/
    ├── agent.py
    ├── prompts.py
    └── tools.py
```

## 4. 安装项目依赖

运行模板声明的后端依赖任务：

```bash
agentseek task sync
```

安装前端依赖：

```bash
agentseek task frontend
```

这两个任务当前分别执行 `uv sync` 和 `npm install --prefix frontend`。你可以在 `.agentseek/lifecycle.toml` 中查看实际命令。

## 5. 配置模型和搜索服务

复制后端和前端环境文件：

```bash
cp .env.example .env
cp frontend/.env.example frontend/.env
```

打开 `.env` 并填写模型与搜索服务的 Key。本课程默认使用课程赞助方 SiliconFlow 提供的 OpenAI 兼容接口，并选择 GLM 作为演示模型：

```bash
AGENTSEEK_MODEL_PROVIDER=openai
AGENTSEEK_MODEL=zai-org/GLM-5.2
OPENAI_API_BASE=https://api.siliconflow.cn/v1
