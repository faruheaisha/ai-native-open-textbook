---
title: "Superpowers 中文版 — Kiro 安装指南"
sourceId: "10-context-memory/superpowers-zh"
sourceTitle: "superpowers-zh（AI 编程超能力 · 中文增强版）"
sourceKind: "技能与配置库"
licenseLabel: "可转载"
lang: "中文"
tier: 3
volume: "10-context-memory"
sourceUrl: "https://github.com/jnMetaCode/superpowers-zh"
entryUrl: "https://github.com/jnMetaCode/superpowers-zh/blob/79ea5d262b7a1c7ce76a289390853bca51f940d4/docs/README.kiro.md"
sourceRel: "docs/README.kiro.md"
rawUrl: "/raw/10-context-memory/superpowers-zh/docs/README.kiro.md"
sourceSha256: "0a77c70317ad97dc51c38b9547e915714ddcc97ec4a82c9a81652010431acbe5"
pageSha256: "0a77c70317ad97dc51c38b9547e915714ddcc97ec4a82c9a81652010431acbe5"
contentMode: "local-full"
zh: ""
---

# Superpowers 中文版 — Kiro 安装指南

在 [Kiro](https://kiro.dev)（Amazon AI IDE）中使用 superpowers-zh 的完整指南。

## ⚠️ v1.7.9 及更早版本请重新安装

旧版把 20 个 skill 的**正文**直接装进了 `.kiro/steering/`。而 [Kiro 官方文档](https://kiro.dev/docs/steering/)明确：`.kiro/steering/` 下的文件默认 `inclusion: always`，会被 "loaded into every Kiro interaction automatically"。

实测那个布局是 **47 个 md、335 KB，每一轮对话全量进上下文**。不是不能用，是每轮都在烧 token。

v1.7.10 起改成索引式：**4.4 KB**（76 倍差距）。重装即可，安装器会自动清掉旧布局：

```bash
cd /your/project
npx superpowers-zh@latest --tool kiro
```

会看到：

```
🧹 Kiro: 清理旧布局 20 个 skill 目录 <- .kiro/steering/
✅ Kiro: steering 索引 -> .kiro/steering/superpowers-zh.md
```

**你自己写的 steering 文件不会被动** —— 只清理与我们 skill 同名的那些目录。

## 快速安装

```bash
cd /your/project
npx superpowers-zh --tool kiro
```

装两样东西：

| 位置 | 内容 | 是否每轮常驻 |
|---|---|---|
| `.kiro/steering/superpowers-zh.md` | 索引：核心规则 + 20 个 skill 的触发条件表（约 4.4 KB） | **是**（`inclusion: always`） |
| `.kiro/skills/<name>/SKILL.md` | skill 正文 | 否，按需读取 |

## 工作原理

Kiro 用 **Steering** 机制管理 AI 行为规则。关键的三件事：

- **目录**：`.kiro/steering/`（项目级）、`~/.kiro/steering/`（全局）
- **默认行为**：**没写 `inclusion` 的文件默认就是 always** —— 每次交互自动加载
- **frontmatter 键**（这是 Kiro 自己的，别和 Cursor 系搞混）：

  | 键 | 含义 |
  |---|---|
  | `inclusion: always` | 每次交互都加载（**默认值**） |
  | `inclusion: fileMatch` + `fileMatchPattern` | 匹配特定文件时加载 |
  | `inclusion: manual` | 仅在聊天里用 `#steering-file-name` 引用时加载 |
  | `inclusion: auto` | 按 `description` 与请求匹配时自动加载 |

> 📌 v1.7.9 及更早的本文档写着加载模式是 `alwaysApply: true` 和 `globs: "*.ts"` —— **这两个键 Kiro 文档里根本不存在**，是 Cursor / Trae 的约定被误写成了 Kiro 的。已更正。

### 为什么正文不放 steering 里

因为 steering 是常驻开销。这跟我们对 Cline、Kilo Code 的处理是同一个道理：**常驻的位置只放索引，正文按需读取。**
