---
title: "Slash Commands 参考指南"
sourceId: "09-harness/claude-howto"
sourceTitle: "Claude How-To"
sourceKind: "工程手册"
licenseLabel: "可转载"
lang: "英文"
tier: 2
volume: "09-harness"
sourceUrl: "https://github.com/luongnv89/claude-howto"
entryUrl: "https://github.com/luongnv89/claude-howto/blob/97bfb0685e03112ad39845889061d02cef6e534c/zh/01-slash-commands/README.md"
sourceRel: "zh/01-slash-commands/README.md"
rawUrl: "/raw/09-harness/claude-howto/zh/01-slash-commands/README.md"
sourceSha256: "b9e65d1d047046bef1dc1456f364c0bcd055c6ea8ea66e2633fa4f069c0edb04"
pageSha256: "b9e65d1d047046bef1dc1456f364c0bcd055c6ea8ea66e2633fa4f069c0edb04"
contentMode: "local-full"
zh: ""
---

# Slash Commands 参考指南

## 概览

Slash command 是你在 Claude 的交互式会话中用来控制行为的快捷方式，主要分为几类：

- **内置命令**：Claude Code 自带，例如 `/help`、`/clear`、`/model`
- **Skills**：你自己定义的命令，基于 `SKILL.md` 文件，例如 `/optimize`、`/pr`
- **插件命令**：来自已安装插件的命令，例如 `/frontend-design:frontend-design`
- **MCP prompts**：来自 MCP server 的命令，例如 `/mcp__github__list_prs`

> **注意**：自定义 slash command 已经合并进 Skills。`.claude/commands/` 仍然可用，但现在更推荐使用 `.claude/skills/`。两者都会创建 `/command-name` 形式的快捷命令。完整参考请见 [Skills 指南](/lib/09-harness/claude-howto/zh-03-skills)。

## 内置命令速查

Claude Code 目前提供 55+ 个内置命令和 5 个内置 Skills。你可以在 Claude Code 中输入 `/` 查看全部，也可以输入 `/` 后继续键入字母进行筛选。

| 命令 | 作用 |
|---------|---------|
| `/add-dir <path>` | 添加工作目录 |
| `/agents` | 管理 agent 配置 |
| `/branch [name]` | 切换到当前对话的一个副本，原对话保持不变 |
| `/fork [prompt]` | 把当前对话复制到一个新的**后台会话**，你可以继续在这里工作；从这一刻起两者互相独立，副本会在 `claude agents` 里占一行（v2.1.212+） |
| `/subtask <task>` | 派生一个**forked subagent**，它继承完整对话并去执行该任务，你可以继续工作；任务完成后结果会返回到本对话（v2.1.212+） |
| `/btw <question>` | 额外问题，不写入历史 |
| `/chrome` | 配置 Chrome 浏览器集成 |
| `/clear` | 清空对话（别名：`/reset`、`/new`） |
| `/color [color\|default]` | 设置提示栏颜色 |
| `/compact [instructions]` | 压缩对话，可附带聚焦指令 |
| `/config` | 打开设置（别名：`/settings`） |
| `/context` | 用彩色网格可视化上下文占用 |
| `/copy [N]` | 将 assistant 回复复制到剪贴板；`w` 会写入文件 |
| `/cost` | 查看 token 使用统计 |
| `/desktop` | 继续在桌面应用中处理（别名：`/app`） |
| `/diff` | 查看未提交更改的交互式 diff |
| `/doctor` | 检查安装健康状态 |
| `/effort [low\|medium\|high\|max\|auto]` | 设置推理强度；`max` 需要 Opus 4.6 |
| `/exit` | 退出 REPL（别名：`/quit`） |
| `/export [filename]` | 将当前对话导出为文件或剪贴板内容 |
| `/extra-usage` | 配置额外用量以应对速率限制 |
| `/fast [on\|off]` | 切换快速模式 |
| `/feedback` | 提交反馈（别名：`/bug`） |
| `/help` | 显示帮助 |
| `/hooks` | 查看 hook 配置 |
| `/ide` | 管理 IDE 集成 |
| `/init` | 初始化 `CLAUDE.md`，可设置 `CLAUDE_CODE_NEW_INIT=1` 启用交互式流程 |
| `/insights` | 生成会话分析报告 |
| `/install-github-app` | 配置 GitHub Actions app |
| `/install-slack-app` | 安装 Slack app |
| `/keybindings` | 打开快捷键配置 |
| `/login` | 切换 Anthropic 账号 |
| `/logout` | 退出当前 Anthropic 账号 |
| `/mcp` | 管理 MCP servers 和 OAuth |
| `/memory` | 编辑 `CLAUDE.md`，切换自动记忆 |
| `/mobile` | 生成移动端扫码二维码（别名：`/ios`、`/android`） |
| `/model [model]` | 选择模型，并可用左右箭头调整 effort |
| `/passes` | 分享一周免费 Claude Code 使用权 |
| `/permissions` | 查看或更新权限（别名：`/allowed-tools`） |
| `/plan [description]` | 进入规划模式 |
| `/plugin` | 管理插件 |
| `/pr-comments [PR]` | 获取 GitHub PR 评论 |
| `/privacy-settings` | 隐私设置（仅 Pro/Max） |
| `/release-notes` | 查看更新日志 |
| `/reload-plugins` | 重新加载当前插件。自 v2.1.221 起，大多数安装会立即生效，只有当安装摘要提示 `Run /reload-plugins to activate.` 时才需要执行 |
| `/remote-control` | 从 claude.ai 进行远程控制（别名：`/rc`） |
| `/remote-env` | 配置默认远程环境 |
| `/rename [name]` | 重命名会话 |
| `/resume [session]` | 恢复对话（别名：`/continue`） |
| `/review [low\|medium\|high\|xhigh\|max\|ultra] [--fix] [--comment] [pr#\|branch\|path]` | `/code-review` 的别名（v2.1.223）：审查当前 diff，或你传入的 PR 编号、分支、路径 —— 例如 `/review 1234`。接受相同的 effort 级别和标志。未指定级别时，复用你上次输入的 `low`–`max` 级别 |
| `/rewind` | 回退对话和/或代码（别名：`/checkpoint`） |
| `/sandbox` | 切换沙盒模式 |
| `/schedule [description]` | 创建/管理定时任务 |
| `/security-review` | 分析分支中的安全漏洞 |
| `/skills` | 列出可用 Skills |
| `/stats` | 可视化每日使用量、会话和连续天数 |
| `/status` | 显示版本、模型、账号 |
| `/statusline` | 配置状态栏 |
| `/tasks` | 列出/管理后台任务 |
| `/terminal-setup` | 配置终端快捷键 |
| `/theme` | 更改颜色主题 |
| `/voice` | 切换按住说话语音输入 |

### 内置 Skills

以下 Skills 随 Claude Code 一起提供，调用方式和 slash command 一样：

| Skill | 作用 |
|-------|---------|
| `/batch <instruction>` | 使用 worktree 编排大规模并行修改 |
| `/claude-api` | 加载 Claude API 参考，便于为项目所用语言编写代码 |
| `/debug [description]` | 启用调试日志 |
| `/loop [interval] <prompt>` | 按固定间隔重复运行提示词 |
| `/simplify [focus]` | 审查改动文件的代码质量 |

### 已弃用命令

| 命令 | 状态 |
|---------|--------|
| `/output-style` | 已于 v2.1.91 移除（v2.1.73 起弃用）— 改用 `/config` → Output style，或 `outputStyle` 设置 |
| `/vim` | 自 v2.1.92 起移除；改用 `/config → Editor mode` |

### 最近变化

- `/fork` 与 `/subtask` 在 **v2.1.212** 互换了角色。`/fork` 现在是把对话复制到一个独立的后台会话；原来的 forked subagent 行为转移到了新命令 `/subtask`。历史：v2.1.77–v2.1.161 期间 `/fork` 是 `/branch` 的别名；v2.1.161–v2.1.211 期间它启动 forked subagent（即现在 `/subtask` 的行为）。关闭 agent view 时 `/subtask` 不可用，`/fork` 仍保留 forked subagent 行为
- `/output-style` 已弃用（v2.1.73）并于 v2.1.91 移除 — output styles 仍可通过 `/config` → Output style 或 `outputStyle` 设置使用
- `/review` 成为 `/code-review` 的完整别名 —— 目标、effort 级别和标志完全相同（v2.1.223）。历史：它在 v2.1.186 首次迁移到 `/code-review medium` 引擎，但当时仅支持 PR
- 新增 `/effort`，其中 `max` 级别需要 Opus 4.6
- 新增 `/voice`，用于按住说话语音输入
- 新增 `/schedule`，用于创建和管理定时任务
- 新增 `/color`，用于自定义提示栏颜色
- `/model` 选择器现在显示人类可读标签，例如 “Sonnet 4.6”
- `/resume` 支持 `/continue` 别名
- MCP prompts 可作为 `/mcp__<server>__<prompt>` 命令使用，见 [MCP Prompts as Commands](#mcp-prompts-作为命令)

## 自定义命令（现已归入 Skills）

自定义 slash command 已经**合并到 Skills**。两种方式都可以通过 `/command-name` 调用：

| 方式 | 位置 | 状态 |
|----------|----------|--------|
| **Skills（推荐）** | `.claude/skills/<name>/SKILL.md` | 当前标准 |
| **旧式命令** | `.claude/commands/<name>.md` | 仍可使用 |

如果 skill 和 command 同名，**skill 优先**。例如同时存在 `.claude/commands/review.md` 和 `.claude/skills/review/SKILL.md` 时，会使用 skill 版本。

### 迁移路径

你现有的 `.claude/commands/` 文件可以继续直接使用。若要迁移到 Skills：

**迁移前（Command）：**
```text
.claude/commands/optimize.md
```

**迁移后（Skill）：**
```text
.claude/skills/optimize/SKILL.md
```

### 为什么用 Skills

- **目录结构**：可以把脚本、模板、参考文件打包在一起
- **自动触发**：相关场景下 Claude 可以自动调用
- **调用控制**：可以决定由用户、Claude 或两者共同调用
- **子 agent 执行**：可在隔离上下文中运行 skill
- **渐进披露**：只在需要时加载额外文件

### 把自定义命令做成 Skill

创建一个包含 `SKILL.md` 的目录：

```bash
mkdir -p .claude/skills/my-command
```

**文件：** `.claude/skills/my-command/SKILL.md`

```yaml
---
name: my-command
description: 这个命令的作用，以及何时使用它
---

# 我的命令

当该命令被触发时，Claude 需要遵循的说明。

1. 第一步
2. 第二步
3. 第三步
```

### Frontmatter 参考

| 字段 | 作用 | 默认值 |
|-------|---------|---------|
| `name` | 命令名（会变成 `/name`） | 目录名 |
| `description` | 简短说明，帮助 Claude 判断何时使用 | 第一段 |
| `argument-hint` | 自动补全时显示的参数提示 | 无 |
| `allowed-tools` | 命令可无权限使用的工具 | 继承 |
| `model` | 指定要使用的模型 | 继承 |
| `disable-model-invocation` | 若为 `true`，只有用户能调用，Claude 不能自动调用 | `false` |
| `user-invocable` | 若为 `false`，不会出现在 `/` 菜单中 | `true` |
| `context` | 设为 `fork` 时，在隔离 subagent 中运行 | 无 |
| `agent` | `context: fork` 时使用的 agent 类型 | `general-purpose` |
| `hooks` | Skill 范围内的 hooks（PreToolUse、PostToolUse、Stop） | 无 |

### 参数

命令可以接收参数：

**使用 `$ARGUMENTS` 接收全部参数：**

```yaml
---
name: fix-issue
description: 根据编号修复 GitHub issue
---

按团队编码规范修复 #$ARGUMENTS
```

调用 `/fix-issue 123` 时，`$ARGUMENTS` 会变成 `123`。

**使用 `$0`、`$1` 等接收单个参数：**

```yaml
---
name: review-pr
description: 按优先级审查 PR
---

审查 #$0，优先级为 $1
```

调用 `/review-pr 456 high` 时，`$0="456"`，`$1="high"`。

### 用 Shell 命令注入动态上下文

在 prompt 发送前，可用 `` !`command` `` 先执行 shell 命令：

```yaml
---
name: commit
description: 使用上下文创建 git commit
allowed-tools: Bash(git *)
---

## 上下文

- 当前 git 状态：!`git status`
- 当前 diff：!`git diff HEAD`
- 当前分支：!`git branch --show-current`
- 最近提交：!`git log --oneline -5`

## 你的任务

根据以上变更，创建一个 git commit。
```

### 文件引用

使用 `@` 引用文件内容：

```markdown
审查 @src/utils/helpers.js 中的实现
比较 @src/old-version.js 和 @src/new-version.js
```

## 插件命令

插件可以提供自定义命令：

```text
/plugin-name:command-name
```

如果没有命名冲突，也可以直接使用 `/command-name`。

**示例：**
```bash
/frontend-design:frontend-design
/commit-commands:commit
```

## MCP Prompts 作为命令

MCP servers 可以把 prompt 暴露成 slash command：

```text
