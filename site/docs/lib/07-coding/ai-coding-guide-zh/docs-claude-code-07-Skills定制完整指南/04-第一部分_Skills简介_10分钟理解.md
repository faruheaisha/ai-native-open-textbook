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
entryUrl: "https://github.com/KimYx0207/AI-Coding-Guide-Zh/blob/7a7c21b8e7dc976e8ade33b79ee000a172e63daf/docs/claude-code/07-Skills定制完整指南.md"
sourceRel: "docs/claude-code/07-Skills定制完整指南.md"
rawUrl: "/raw/07-coding/ai-coding-guide-zh/docs/claude-code/07-Skills定制完整指南.md"
sourceSha256: "08d59f9361ab023a91b05efb9383116c7f71eb884c8755c7a83ecf46cba2ef7d"
pageSha256: "57abf8dc48983367831d86f084cb9947ee76ae23ee307d5f0c78a265d69f6abc"
contentMode: "local-full"
zh: ""
---

## 第一部分：Skills简介（10分钟理解）

### 1.1 Skills是什么

**一句话理解**：Skills是Claude Code的"能力APP"，把特定领域的知识、规则、工具打包成可复用的模块，让AI瞬间变成该领域的专家。

#### 为什么需要Skills？

**没有Skills之前（每次都从零开始）**：

```
问题：AI没有记忆，每次对话都要重新说明

你：帮我写一篇公众号文章
Claude：好的，请问什么风格？字数多少？有什么特殊要求？

...下次对话...

你：再帮我写一篇
Claude：好的，请问什么风格？字数多少？（又从零开始问）
```

**有了Skills之后（专业知识即装即用）**：

```
解决方案：预置领域知识，AI直接变成专家

你：帮我写一篇公众号文章
Claude：[自动加载公众号写作Skill]
       [读取老金风格规范、爆款公式、质量标准]
       好的！基于V8.0爆款规律，我来帮你...
       [自动调用标题生成器、质量检测器]
```

**生活类比**：
- **没有Skills**：每次打车都要从零教司机认路
- **有Skills后**：安装了高德地图APP，司机直接导航到达（知识预装）

#### Skills的核心价值

| 对比维度 | 没有Skills | 有Skills后 |
|----------|-----------|------------|
| **知识积累** | 每次对话从零开始 | 领域知识预置，即用即专业 |
| **团队协作** | 每人都要教AI一遍 | 配置一次，全员共享 |
| **质量一致** | 输出质量随机 | 标准化流程，质量稳定 |
| **效率** | 大量时间在沟通需求 | 直接进入核心任务 |
| **可维护性** | 知识散落在聊天记录 | 集中管理，版本可控 |

### 1.2 Skills vs Commands：深度对比

**这是最常被问到的问题**：Skill和Command有什么区别？什么时候用哪个？

#### 一句话区分

- **Commands**：**触发器**，是用户交互的入口点（"按钮"）
- **Skills**：**能力包**，是知识和工具的集合（"APP"）

#### 详细对比表

| 对比维度 | Commands（斜杠命令） | Skills（能力包） |
|----------|---------------------|-----------------|
| **定位** | 触发器/入口点 | 能力包/知识库 |
| **复杂度** | 单个Markdown文件 | 多文件目录结构 |
| **触发方式** | 显式调用 `/command` | 自动识别 + 显式调用 |
| **状态管理** | 无状态 | 可以维护状态和配置 |
| **工具集成** | 有限（直接写在md里） | 强大（可集成Python/JS脚本） |
| **知识容量** | 几百到几千字 | 可达数万字 |
| **可维护性** | 简单直接 | 模块化分层 |
| **适用场景** | 单一任务 | 复杂工作流 |

#### 协作关系图

```
                    用户输入
                       │
                       ▼
           ┌────────────────────────┐
           │      CLAUDE.md         │ ← 全局上下文
           └────────────────────────┘
                       │
        ┌──────────────┴──────────────┐
        │                             │
        ▼                             ▼
┌────────────────┐           ┌──────────────────┐
│   Commands     │ ←───────→ │     Skills       │
│  （触发层）     │   调用     │   （能力层）      │
│  /write        │           │ gongzhonghao-    │
│  /title-gen    │           │ writer/          │
└────────────────┘           └──────────────────┘
        │                             │
        ▼                             ▼
┌────────────────┐           ┌──────────────────┐
│ 简单任务直接   │           │ prompts/         │
│ 在Command里    │           │ scripts/         │
│ 完成          │           │ config/          │
└────────────────┘           │ templates/       │
                            └──────────────────┘
```

**协作模式示例**：`/write` 命令与公众号写作Skill

```markdown
# 01-write.md (Command层)
当用户输入 /write 时:
1. 读取 `.claude/skills/gongzhonghao-writer/prompts/baokuan-rules.md`
2. 调用 `scripts/title_generator.py` 生成标题
3. 应用 `prompts/laojin-style.md` 风格规范
4. 执行 `scripts/quality_detector.py` 质量检测
```

**最佳实践**：
- **简单任务**：直接用Command（如`/help`显示帮助）
- **复杂任务**：Command + Skill（Command是入口，Skill提供能力）

### 1.3 渐进式披露原理（Progressive Disclosure）

这是Skills系统的核心设计哲学，理解它能帮你更好地设计自己的Skill。

**核心思想**：只在用户需要时才展示复杂功能，避免信息过载。

#### 四层披露结构

**第一层：自动激活（用户无感）**
```
用户："帮我写一篇关于Claude Code的公众号文章"
Claude Code：[检测到"公众号"关键词，自动加载gongzhonghao-writer Skill]
           "好的，我来帮你写..."
```
用户完全不需要知道Skill的存在。

**第二层：显式调用（简单控制）**
```
用户：/write Claude Code新功能解析
Claude Code：[执行完整的写作工作流]
```
用户通过Slash命令明确触发，获得更可控的流程。

**第三层：深度定制（修改配置）**
```yaml
# SKILL.md的YAML Frontmatter部分
---
name: gongzhonghao-writer
description: 当用户提到"公众号"、"写文章"、"老金风格"等关键词时激活
---
```
用户可以修改触发条件和参数。

**第四层：完全控制（修改代码）**
```
用户可以:
- 修改SKILL.md的Markdown Body部分调整生成风格
- 编辑scripts/*.py改变处理逻辑
- 创建新的templates/定制输出格式
```

**设计优势**：
- 新手可以直接用，无需学习复杂配置
- 高级用户可以深度定制每个细节
- 团队可以将最佳实践沉淀到Skills中

### 1.4 什么时候该用Skills

**适合使用Skills的场景**：

| 场景类型 | 示例 | 为什么适合 |
|----------|------|-----------|
| **领域专业化** | 公众号写作、技术博客、学术论文 | 需要预置大量领域知识 |
| **知识积累** | 数据驱动的规则优化 | 需要持续迭代和版本管理 |
| **复杂工作流** | Research→写作→质检→发布 | 需要多步骤自动化 |
| **团队标准化** | 代码审查规范、文档模板 | 需要统一团队标准 |
| **可复用能力** | 跨项目共享的工具包 | 需要在多个项目使用 |

**不适合使用Skills的场景**：

| 场景类型 | 为什么不适合 | 替代方案 |
|----------|-------------|---------|
| **一次性任务** | 没有复用价值 | 直接在对话中描述 |
| **高度变化** | 每次都不同 | 灵活的Command |
| **无法标准化** | 完全依赖创意 | 保持AI自由发挥 |
