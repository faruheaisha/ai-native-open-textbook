---
title: "04. AI 模型配置指南"
sourceId: "07-coding/ai-coding-guide-zh"
sourceTitle: "Claude Code & OpenClaw & Codex & WorkBuddy 中文教程"
sourceKind: "课时教程"
licenseLabel: "可转载"
lang: "中文"
tier: 3
volume: "07-coding"
sourceUrl: "https://github.com/KimYx0207/AI-Coding-Guide-Zh"
entryUrl: "https://github.com/KimYx0207/AI-Coding-Guide-Zh/blob/7a7c21b8e7dc976e8ade33b79ee000a172e63daf/docs/openclaw/04-模型配置指南.md"
sourceRel: "docs/openclaw/04-模型配置指南.md"
rawUrl: "/raw/07-coding/ai-coding-guide-zh/docs/openclaw/04-模型配置指南.md"
sourceSha256: "bf84b647cce298844207522fead089fdf5ebd6a5ccc14443b97687725917262a"
pageSha256: "bf84b647cce298844207522fead089fdf5ebd6a5ccc14443b97687725917262a"
contentMode: "local-full"
zh: ""
---

# 04. AI 模型配置指南

> **课程信息**
>
> - **作者**：老金
> - **GitHub**：https://github.com/KimYx0207
> - **公众号**：老金带你玩AI
> - **X（Twitter）**：老金带你玩AI
> - **个人博客**：https://aiking.dev
> - **难度等级**：🟡 进阶
> - **阅读时间**：25 分钟
> - **前置知识**：已完成快速开始（[03-快速开始指南](/lib/07-coding/ai-coding-guide-zh/docs-openclaw-03-快速开始指南)）
>
> **本篇你将学会：** 切换 AI 模型、配置多个提供商、管理 API Key、优化模型参数
>
> **小白速通：** 如果你在引导向导中已经配好了模型，这篇可以先跳过。等你想换模型或者觉得 AI 回答质量不好时再来看

## 概述

老金我在模型配置里强调 provider 和密钥边界，因为换模型容易，管好调用路径才难。

OpenClaw 支持大量 AI 模型提供商（provider，即 AI 模型提供商，比如 OpenAI、Anthropic），从云端大模型到本地开源模型，总有一款适合你。

> **2026-06-18 模型口径**：v2026.6.8 强化 provider ID normalization、SecretRef、bounded model browsing 和 tool-schema recovery。课程里不要把某个模型名写成长期默认答案；先用 `openclaw models status` / models list 看当前目录，再确认 provider 控制台权限和密钥来源。Parallel Free、DuckDuckGo、Ollama、Codex Hosted Search 等 key-free search provider 需要显式 opt-in，不要默认打开。

---

## 配置文件位置

在开始之前，先了解配置文件在哪里。OpenClaw 的模型配置存放在：

```bash
# 查看当前模型状态
openclaw models status

# 配置文件默认路径
~/.openclaw/openclaw.json
```

配置文件是 JSON5 格式（支持注释和尾逗号），你可以直接编辑，也可以用 `openclaw models set` 命令修改。两种方式效果一样。

```json5
{
  agents: {
    defaults: {
      model: "anthropic/claude-sonnet-5",
    },
  },
}
```

### 模型 CLI 命令速查

| 命令 | 说明 |
|------|------|
| `openclaw models list` | 列出所有可用模型 |
| `openclaw models status` | 查看当前模型状态 |
| `openclaw models set` | 设置默认模型 |
| `openclaw models set-image` | 设置图像模型 |
| `openclaw models aliases list` | 列出模型别名 |
| `openclaw models aliases add <alias> <model>` | 添加模型别名 |
| `openclaw models aliases remove <alias>` | 删除模型别名 |
| `openclaw models fallbacks list` | 查看故障转移列表 |

---

## 云端模型提供商（按推荐度排序）

### OpenAI

OpenAI 是目前最主流的模型提供商之一，GPT 系列模型在各种任务上表现优秀。

**获取 API Key（访问 AI 服务的密钥，类似于密码）：**

1. 访问 [platform.openai.com](https://platform.openai.com/)
2. 注册或登录账号
3. 进入 API Keys 页面：Settings > API Keys
4. 点击 "Create new secret key"
5. 给 Key 起个名字（比如 "openclaw"），复制保存

> 注意：API Key 只在创建时显示一次，务必立刻复制保存。丢了只能重新创建。

**配置方法：**

```bash
# 方法一：用环境变量（推荐）
export OPENAI_API_KEY="sk-proj-xxxxx"

# 方法二：直接编辑配置文件
# 编辑 ~/.openclaw/openclaw.json
```

**支持的模型：**

OpenAI 模型名、价格和可用区会快速变化，不要把教程里的型号当作永久事实。课堂上按这个顺序确认：

1. 先用当前 OpenClaw 的 models / onboarding 输出查看可用模型。
2. 再去 provider 控制台确认账号是否有权限、额度和地区可用性。
3. 最后把真实模型 ID 写入配置。

| 选择维度 | 看什么 | 适用场景 |
|----------|--------|----------|
| 通用旗舰 | 当前 OpenAI 目录里的高能力模型 | 复杂推理、创作、规划 |
| 轻量模型 | 当前 OpenAI 目录里的 mini / low-cost 模型 | 高频问答、简单摘要 |
| 多模态模型 | 当前目录中明确支持图片/音频/视频的模型 | 图片理解、文件解析 |
| 推理模型 | 当前目录中强调 reasoning 的模型 | 数学、逻辑、科学 |

**指定使用 OpenAI 模型：**

```bash
