---
title: "Claude Code & OpenClaw & Codex & WorkBuddy 中文教程"
sourceId: "07-coding/ai-coding-guide-zh"
sourceTitle: "Claude Code & OpenClaw & Codex & WorkBuddy 中文教程"
sourceKind: "课时教程"
licenseLabel: "可转载"
lang: "中文"
tier: 3
volume: "07-coding"
sourceUrl: "https://github.com/KimYx0207/AI-Coding-Guide-Zh"
entryUrl: "https://github.com/KimYx0207/AI-Coding-Guide-Zh/blob/7a7c21b8e7dc976e8ade33b79ee000a172e63daf/docs/claude-code/01-Claude-Code完整安装指南.md"
sourceRel: "docs/claude-code/01-Claude-Code完整安装指南.md"
rawUrl: "/raw/07-coding/ai-coding-guide-zh/docs/claude-code/01-Claude-Code完整安装指南.md"
sourceSha256: "faa9c4a018405b1408c9cd9bbe81590453531a86b5e3100f6dba6afafac0f4bf"
pageSha256: "036052d7cff199e80670cc939743868069c0e055a15d3a13b6b2bfc2cccd80c9"
contentMode: "local-full"
zh: ""
---

## 第一部分：Claude Code 简介

### 1.1 什么是 Claude Code

Claude Code 是 Anthropic 公司开发的**命令行 AI 编程助手**。本课程主讲 CLI：从终端启动、读项目、改文件、跑命令、做 Review 和自动化。它现在也有 IDE、Desktop、Web 等入口，但这些在本系列里只作为 CLI 工作流的延伸，不反客为主。

**核心特征：**

- **本地执行架构**：文件读写和命令执行发生在你的电脑或企业受控环境里；任务上下文会按登录方式和模型提供商策略发送给 AI 服务
- **全能AI助手**：基于Claude模型，理解复杂技术需求
- **工具整合能力**：可调用文件操作、终端命令、Web搜索等工具
- **对话式开发**：用自然语言描述需求，AI帮你生成和修改代码

**简单理解：**

把 Claude Code 想象成一个在终端里工作的高级程序员。你用中文或英文告诉它需求，它能帮你写代码、改 bug、搜资料、运行测试。**本课程抓住的最大特点是 CLI**：它可以在当前项目目录里读写文件、运行系统命令，并把这些动作纳入脚本化和自动化流程。

### 1.2 核心优势：为什么值得学习

#### 优势1：隐私与安全

很多在线 AI 工具要求你先把代码粘贴到网页里。Claude Code 的不同点不是"永远不把任何内容发给模型"，而是**文件访问、命令执行和权限确认发生在你的本地项目工作流里**。你仍然要根据登录方式、模型提供商、企业策略和项目敏感度控制哪些上下文可以进入模型。

- ✅ 文件改动发生在本地工作区，读写范围受当前目录、权限模式和配置约束
- ✅ 可接企业托管配置、私有网络、Bedrock / Vertex / 第三方兼容提供商等受控路径
- ✅ 敏感项目要配合 allow/deny、MCP 白名单、日志边界、密钥管理和人工 Review，不能只靠一句“本地优先”

#### 优势2：真正的编程助手

**实际案例：**

```
你：帮我把项目中所有console.log改成更规范的日志系统

Claude Code：
1. [扫描] 找到37个console.log调用
2. [询问] 是否使用Winston日志库？
3. [执行] 安装依赖、创建配置、批量替换代码
4. [验证] 运行测试确认改动正确
```

#### 优势3：多语言多框架支持

不限于特定技术栈：

- **前端**：React、Vue、Next.js
- **后端**：Node.js、Python、Go
- **移动端**：React Native、Flutter
- **基础设施**：Docker、Kubernetes配置

### 1.3 与主流工具对比

**CLI工具 vs IDE集成工具对比：**

| 对比项               | Claude Code（CLI）  | Cursor（IDE集成） |
| -------------------- | ------------------- | ----------------- |
| **运行方式**   | 命令行独立运行      | VS Code编辑器内置 |
| **文件操作**   | ✅ 直接读写         | ✅ 直接读写       |
| **项目理解**   | ✅ 全项目上下文     | ✅ 全项目上下文   |
| **脚本自动化** | ✅ 完美支持         | ⚠️ 有限         |
| **CI/CD集成**  | ✅ 原生支持         | ❌ 困难           |
| **远程服务器** | ✅ 完美支持         | ❌ 需要图形界面   |
| **隐私性**     | ✅ 本地优先         | ⚠️ 云端处理     |
| **学习曲线**   | 中等（需要CLI基础） | 低（图形界面）    |

**推荐使用场景：**

**选Claude Code（CLI）适合：**

- ✅ 重构遗留项目、批量代码处理
- ✅ CI/CD自动化、脚本集成
- ✅ 远程服务器开发、无图形界面环境
- ✅ 企业级开发（私有部署、安全要求高）
- ✅ 高级开发者（熟悉命令行、需要自动化）

**选Cursor（IDE集成）适合：**

- ✅ 日常开发、快速原型
- ✅ 学习新框架、初学者友好
- ✅ 需要图形界面和可视化
- ✅ 实时代码补全和建议

### 1.4 适合谁学习

**强烈推荐：**

1. **有1年+编程经验的开发者**：能充分利用AI加速工作流
2. **技术Leader/架构师**：需要快速审查和重构代码
3. **独立开发者**：一个人维护多个项目，需要AI协作
4. **开源贡献者**：快速理解陌生代码库

**需要慎重考虑：**

1. **编程零基础**：建议先学基础语法和终端操作（建议学习时长：3-6个月）
2. **只用图形界面**：Claude Code需要熟悉命令行
3. **网络受限**：需要访问Anthropic API（国内需代理）
