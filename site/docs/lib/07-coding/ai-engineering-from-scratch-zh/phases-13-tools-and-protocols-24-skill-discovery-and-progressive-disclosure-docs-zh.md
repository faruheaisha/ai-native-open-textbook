---
title: "Skill 发现与渐进式披露"
sourceId: "07-coding/ai-engineering-from-scratch-zh"
sourceTitle: "AI 工程从零到一（中文）"
sourceKind: "源码研读"
licenseLabel: "可转载"
lang: "中文"
tier: 1
volume: "07-coding"
sourceUrl: "https://github.com/fancyboi999/ai-engineering-from-scratch-zh"
entryUrl: "https://github.com/fancyboi999/ai-engineering-from-scratch-zh/blob/109181ce68128c1bf27ec20867177007a8bace89/phases/13-tools-and-protocols/24-skill-discovery-and-progressive-disclosure/docs/zh.md"
sourceRel: "phases/13-tools-and-protocols/24-skill-discovery-and-progressive-disclosure/docs/zh.md"
rawUrl: "/raw/07-coding/ai-engineering-from-scratch-zh/phases/13-tools-and-protocols/24-skill-discovery-and-progressive-disclosure/docs/zh.md"
sourceSha256: "b90e04e12aea334b6af2770fc3c193b3003aea449343930ea9492bd2b5d0b8b2"
pageSha256: "b90e04e12aea334b6af2770fc3c193b3003aea449343930ea9492bd2b5d0b8b2"
contentMode: "local-full"
zh: ""
---

# Skill 发现与渐进式披露

> Skill 的价值在加载正文之前就已经出现：名称和描述让它进入目录；只有任务走到需要它的地方，深层文件才进入上下文。

**类型：** Build
**语言：** Python（标准库）
**前置要求：** 阶段 13 · 22（Agent Skills：可移植契约与运行时边界）
**预计时间：** 约 105 分钟

## 学习目标

- 构建将 scope、校验、冲突策略与目录发布分离的文件系统发现管线。
- 解释目录元数据、已激活指令与任务专用资源这三个披露层级。
- 设计能让 agent 直接取得所需细节、而无需加载整个包的引用。
- 将目录空间预算与已激活 skill 的上下文预算分开核算。
- 当 skill 读取自身资源时，拒绝路径穿越和符号链接逃逸。

## 问题背景

你的 agent 装了 200 个 skill。会话启动时把每个 `SKILL.md`、引用文件、脚本和模板都读进来，会让无关流程淹没当前任务；什么都不读，又等于要求用户记住准确的文件系统路径。

常见折中是目录：先给模型每个可用 skill 的紧凑身份与路由描述，选中后才加载完整正文。这又带来两个新的工程问题。

第一，发现不只是递归搜索文件。skill 可以位于项目、用户、管理员、插件或内建 scope；两个包可以同名；符号链接可能指向可信根之外；损坏的包可能耗尽目录空间，或根本无法调用。

第二，渐进式披露可能变成渐进式困惑。若 `SKILL.md` 只说“阅读相关指南”，而包里有十二份指南，模型只能猜；若每份指南还指向更多文件，加载就会成为无边界的图遍历。

好的运行时让发现具有确定性，让披露有明确意图。

## 核心概念

### 发现是一条编译器管线

把文件系统当作源输入，别把原始路径直接发布给模型。

```figure
skill-discovery-pipeline
```

每个阶段都应产生结构化数据和结构化失败。发现日志至少应回答：

- 搜索了哪些根？
- 找到了哪些候选项？
- 哪些候选项被拒绝，原因是什么？
- 哪个包赢得了冲突？
- 哪些目录条目因预算而缩短或省略？

没有这些证据，“模型没有用我的 skill”几乎无从诊断。

### 作用域是运行时策略

可移植规范定义 skill 包的形状，不规定通用安装路径或优先级。由宿主决定搜索位置。

| 作用域 | 示例根目录 | 预期所有者 |
|---|---|---|
| 工作区 | `<repo>/.agents/skills/` | 项目维护者 |
