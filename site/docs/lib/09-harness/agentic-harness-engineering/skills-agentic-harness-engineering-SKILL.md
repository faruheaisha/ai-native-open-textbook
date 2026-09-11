---
title: "AHE Skill — Agent Harness Evolution"
sourceId: "09-harness/agentic-harness-engineering"
sourceTitle: "Agentic Harness Engineering（论文与实现）"
sourceKind: "工程手册"
licenseLabel: "可转载"
lang: "中英混排"
tier: 2
volume: "09-harness"
sourceUrl: "https://github.com/china-qijizhifeng/agentic-harness-engineering"
entryUrl: "https://github.com/china-qijizhifeng/agentic-harness-engineering/blob/8b2a55d97590363fe50c3cc6b5e833b020a4bb4c/README.md"
zh: ""
---

# AHE Skill — Agent Harness Evolution

> 将 [AHE（Agentic Harness Engineering）](https://arxiv.org/abs/2604.25850) 论文的核心模式实现为可执行的 Skill。
> 遵循 [HARNESS.md v1.0](/lib/09-harness/agentic-harness-engineering/skills-agentic-harness-engineering-references-HARNESS) 规范。

---

## 什么时候加载这个 Skill

- **做 Harness Audit** — 想知道当前 workspace 的结构是否符合规范 → 加载 skill，运行 audit 流程
- **改了一个核心组件** — 修改了 system prompt、工具、middleware 等 → 加载 skill，生成 Change Manifest
- **想验证上次修改** — 之前生成了 Change Manifest 但还没验证 → 加载 skill，运行 verify 流程
- **Harness 反复出同一个问题** — 同一个失败模式出现 2+ 次 → 加载 skill，做 evidence-driven 改进
- **搭建新 Agent** — 初始化一个新的 Agent workspace → 加载 skill，用 HARNESS.md 模板初始化

---

## 工作流 1：Harness Audit

评估当前 workspace 是否符合 HARNESS.md v1.0 规范。

### 步骤

1. **扫描当前 workspace 结构**
   - 检查是否存在 HARNESS.md 的 7 个组件目录
   - 统计每个组件下的文件数量和类型

2. **检查组件正交性**
   - System Rules 中是否有工具实现逻辑？→ 建议迁移到 tools/
   - Tool Descriptions 和 Tool Implementations 是否一一对应？→ 检查遗漏
   - MEMORY.md 中是否有会话级临时信息？→ 建议迁移到 workbench/

3. **检查 Change Manifest 存在性**
   - 根目录下是否存在 HARNESS_MANIFEST.json 或 manifests/ 目录？
   - 最近的修改是否有对应的 manifest？

4. **输出审计报告**
   - 合规度评分（满分 10）
   - 每个组件的状态（✅ 合规 / ⚠️ 需注意 / ❌ 不合规）
   - 改进建议列表

### 输出示例

```markdown
## Harness Audit Report — 2026-05-21

**合规度评分: 7/10**

| 组件 | 状态 | 说明 |
|------|------|------|
| System Rules | ✅ | AGENTS.md + SOUL.md 分离清晰 |
| Tool Descriptions | ✅ | 每个工具都有独立 YAML |
| Tool Implementations | ⚠️ | 部分工具的 description 和实现不同步 |
| Middleware | ❌ | 未定义 middleware 目录 |
| Skills | ✅ | skills/ 目录组织良好 |
| Sub-Agents | ⚠️ | sub_agents/ 目录存在但未注册 |
| Long-Term Memory | ✅ | MEMORY.md + experiences.md 分离 |

**改进建议：**
1. 排查 tools/vs tool_descriptions/ 的同步性
2. 考虑添加 middleware/ 目录
3. 在 code_agent.yaml 中注册 sub_agents
```

---

## 工作流 2：Generate Change Manifest

在对 Harness 组件做出修改时，生成标准化的 Change Manifest。

### 使用时机

你已经发现了问题并准备修改。在修改前或修改后，运行这个流程来记录变更。

### 步骤

1. **确认修改的组件类型**（必须从 7 个中选择一个）
2. **收集失败证据** — 描述什么失败了，附上 trace 或日志摘录
3. **分析根因** — 为什么失败？（不是"工具报错"而是"工具描述未声明参数导致 LLM 不知道可以分页"）
4. **描述修改内容** — 具体改了哪里
5. **预测影响** — 哪些任务应该修复，哪些可能回归
6. **写入 manifest 文件**

### Change Manifest 模板

将以下内容写入 `manifests/change_{timestamp}.json`：

```json
{
  "manifest_version": "1.0",
  "harness_spec_version": "1.0",
  "iteration": <当前迭代编号>,
  "timestamp": "<当前时间 ISO 格式>",
