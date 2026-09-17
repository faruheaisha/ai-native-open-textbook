---
title: "Claude Code Plugins生态完整指南：从安装到自定义开发"
sourceId: "07-coding/ai-coding-guide-zh"
sourceTitle: "Claude Code & OpenClaw & Codex & WorkBuddy 中文教程"
sourceKind: "课时教程"
licenseLabel: "可转载"
lang: "中文"
tier: 3
volume: "07-coding"
sourceUrl: "https://github.com/KimYx0207/AI-Coding-Guide-Zh"
entryUrl: "https://github.com/KimYx0207/AI-Coding-Guide-Zh/blob/7a7c21b8e7dc976e8ade33b79ee000a172e63daf/docs/claude-code/08-Plugins生态完整指南.md"
sourceRel: "docs/claude-code/08-Plugins生态完整指南.md"
rawUrl: "/raw/07-coding/ai-coding-guide-zh/docs/claude-code/08-Plugins生态完整指南.md"
sourceSha256: "45c0d115e61f70d7b0ff1b768a02b6aef85d3aa887dc48f65804795ba2c7ef48"
pageSha256: "45c0d115e61f70d7b0ff1b768a02b6aef85d3aa887dc48f65804795ba2c7ef48"
contentMode: "local-full"
zh: ""
---

# Claude Code Plugins生态完整指南：从安装到自定义开发

> **课程信息**
>
> - **作者**：老金
> - **GitHub**：https://github.com/KimYx0207
> - **公众号**：老金带你玩AI
> - **X（Twitter）**：老金带你玩AI
> - **个人博客**：https://aiking.dev
> - **预计学时**：4-6小时
> - **更新日期**：2026年6月9日
> - **适用版本**：Claude Code v2.1.181（验证于 2026-06-18；旧差量和 v2.1.90+ 插件市场 env 说明保留为历史基线）

---

## 📚 本课学习目标

老金我看插件生态时最关心三件事：来源、权限、可撤销；这比插件名字听起来多厉害更重要。

完成本课学习后，你将能够：

1. **理解Plugin生态**：掌握Plugin与Commands/Skills/MCP的区别
2. **安装和使用Plugin**：掌握当前 `/plugin` + market 的主路径，以及本地目录开发模式
3. **浏览Marketplace**：在官方市场发现和安装 Plugin
4. **创建自定义Plugin**：从零开发一个完整的Plugin包
5. **发布Plugin**：将Plugin分享到GitHub和社区
6. **排查Plugin问题**：解决大多数常见故障

---

## 🗺️ 学习路径导航（先看这里！）

### 路径A：快速上手（⏱️ 30分钟）

**适合人群**：急着用Plugin，想快速体验

**只看这些章节**：

```
✅ 术语表（3分钟）
✅ 第1章：Plugins概览（10分钟）
✅ 第2章：5分钟快速开始（15分钟）
```

### 路径B：Plugin开发者（⏱️ 3小时）

**适合人群**：想创建自己的Plugin

**学习顺序**：

```
✅ 第1-2章：概念+快速上手（30分钟）
✅ 第3章：Marketplace深度指南（30分钟）
✅ 第4章：创建自定义Plugin（90分钟）
✅ 第5章：发布与分享（30分钟）
```

### 路径C：问题排查（⏱️ 5分钟）

**适合人群**：Plugin出问题了

**直接跳到**：

```
🔧 第6章：故障排查指南
🔧 第7章：FAQ
```

---

## 术语表（小白必读）

| 术语 | 英文 | 解释 |
|------|------|------|
| **Plugin** | Plugin | Claude Code 的扩展包，可封装 agents、skills、hooks、MCP、LSP、bin、settings 等资源 |
| **Marketplace** | Marketplace | Plugin商店，浏览和发现Plugin的网页平台 |
| **.claude-plugin/plugin.json** | - | Plugin的元数据清单文件，位于 `.claude-plugin/` 子目录中 |
| **--plugin-dir** | - | Claude Code 启动参数，主要用于本地开发 / 调试加载指定目录 |
| **Skill** | Skill | Plugin中的核心能力模块（SKILL.md定义） |
| **Hook** | Hook | Plugin中的自动化触发器（如代码提交前检查） |

---

## 第1章：Plugins生态概览

> **v2.1.139→v2.1.158 插件更新**：插件依赖会被强制检查；Marketplace / Browse / Details 会展示 commands、agents、skills、hooks、MCP/LSP servers、更新时间和 projected context cost；插件启用、禁用、安装、HTTPS clone 以及 root-level `SKILL.md` 暴露都有修复。v2.1.153 起 `github` / `git` marketplace source 可用 `skipLfs` 跳过 Git LFS 下载；无 GitHub SSH key 的环境可用 `CLAUDE_CODE_PLUGIN_PREFER_HTTPS` 优先 HTTPS clone。v2.1.154 起插件可在 `plugin.json` 或 marketplace entry 声明 `defaultEnabled: false`，由用户通过 `/plugin` 或 `claude plugin enable` 显式开启；Discover tab 也会根据当前目录给出 “suggested for this directory” 推荐。v2.1.157 起 `.claude/skills` 目录里的插件会自动加载，无需 marketplace；`claude plugin init <name>` 可直接脚手架新插件，`/plugin` 参数也会补全子命令、已安装插件和已知 marketplace 插件。企业环境还要看 `pluginSuggestionMarketplaces` allowlist，避免把未经允许的组织市场推荐给用户。教程中遇到插件清单差异时，以 `/plugin` 当前界面为准。

### 1.1 什么是Claude Code Plugin？

**定义**：

Plugin是Claude Code的扩展包，可以添加新的命令、专业能力和自动化流程，且可以跨项目和团队共享。

**类比理解**：

```
手机              |  Claude Code
------------------|------------------
操作系统(iOS/Android) | Claude Code核心
App Store        | Plugin Marketplace（网页）
安装的APP        | 已安装的Plugins
APP更新          | Plugin手动更新（git pull）
```

**核心价值**：

1. **可复用性**：一次开发，多个项目使用
2. **易分享性**：通过GitHub一键克隆
3. **模块化**：每个Plugin专注一个领域
4. **社区驱动**：社区持续贡献优质Plugin

### 1.2 Plugins vs Commands/Skills/MCP

| 维度 | Commands | Skills | MCP | **Plugins** |
|------|----------|--------|-----|-------------|
| **定义** | Markdown提示词 | 专业Agent能力 | 外部服务集成 | **打包的扩展** |
| **位置** | `.claude/commands/`（兼容层） | `.claude/skills/` | `.mcp.json` | **本地目录 + market 安装** |
| **可分享性** | ❌ 手动复制 | ❌ 手动复制 | ⚠️ 需配置 | **✅ 市场安装 / CLI / 本地开发目录** |
| **包含内容** | 单个提示词 | 多个文件+配置 | 服务器配置 | **manifest + agents/skills/hooks/MCP/LSP/bin/settings** |
| **加载方式** | 自动（在项目目录中） | 自动（在项目目录中） | 自动（配置后） | **`/plugin` 为主，`--plugin-dir` 为本地开发补充** |

**关键区别**：Plugin是一个"超集"概念：

```
Plugin = manifest + runtime resources + optional markets/scope + 文档
```

### 1.3 Plugins生态现状（2026年4月）

**官方数据**：

- **当前版本**：Claude Code v2.1.181（2026年6月18日验证）
- **官方市场**：✅ 已上线，可通过 `/plugin` 和网页入口协同使用
- **社区Plugin**：持续增长中

**主流Plugin来源**：

1. **Anthropic官方Marketplace**：
   - URL：`https://code.claude.com/plugins`
   - 特点：审核严格，质量保证，网页浏览

2. **Jeremy Longshore社区合集**：
   - URL：`https://github.com/jeremylongshore/claude-code-plugins-plus`
   - 特点：100%符合Anthropic Skills Schema

3. **GitHub搜索**：
   - 搜索关键词：`claude-code-plugin`
   - 特点：最丰富的来源，质量参差不齐

> ⚠️ **重要说明**：Claude Code 现在既有交互里的 `/plugin`，也有 CLI 子命令 `claude plugin`（别名 `claude plugins`）。对普通用户来说，`/plugin` 依旧是最顺手的入口；`claude plugin` 更适合脚本化和精确控制作用域。

---

## 第2章：5分钟快速开始

### 2.1 安装你的第一个Plugin

**目标**：先用官方主路径装一个 Plugin，再了解本地开发模式

**前置条件检查**：

```bash
# 确认Claude Code已安装
claude --version
# 预期输出：2.1.92 (Claude Code)

# 确认在项目目录中
cd /path/to/your/project
```

**步骤1：在 Claude Code 里打开插件入口**

```text
/plugin
```

在这里你可以浏览市场、查看已安装插件、执行安装和管理操作。

**步骤2：按市场路径安装**

```text
