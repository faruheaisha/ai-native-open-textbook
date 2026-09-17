---
title: "Superpowers 中文版 — Trae 安装指南"
sourceId: "10-context-memory/superpowers-zh"
sourceTitle: "superpowers-zh（AI 编程超能力 · 中文增强版）"
sourceKind: "技能与配置库"
licenseLabel: "可转载"
lang: "中文"
tier: 3
volume: "10-context-memory"
sourceUrl: "https://github.com/jnMetaCode/superpowers-zh"
entryUrl: "https://github.com/jnMetaCode/superpowers-zh/blob/79ea5d262b7a1c7ce76a289390853bca51f940d4/docs/README.trae.md"
sourceRel: "docs/README.trae.md"
rawUrl: "/raw/10-context-memory/superpowers-zh/docs/README.trae.md"
sourceSha256: "dc8fcf4276369694d0072cd3fd3a77f2544c93e4a51173aaae985299c6a36134"
pageSha256: "dc8fcf4276369694d0072cd3fd3a77f2544c93e4a51173aaae985299c6a36134"
contentMode: "local-full"
zh: ""
---

# Superpowers 中文版 — Trae 安装指南

在 [Trae](https://www.trae.ai)（字节跳动 AI IDE）中使用 superpowers-zh 的完整指南。

## 快速安装

```bash
cd /your/project
npx superpowers-zh
```

安装脚本会自动检测 `.trae/` 目录，将各 skill 完整复制到 `.trae/skills/`（含 `SKILL.md` 及其 `scripts/` 等附属文件），并在 `.trae/rules/superpowers-zh.md` 生成一份 bootstrap 规则用于自动触发。

## 手动安装

```bash
git clone https://github.com/jnMetaCode/superpowers-zh.git
mkdir -p /your/project/.trae/skills
cp -r superpowers-zh/skills/* /your/project/.trae/skills/
```

> 手动复制只会放好 skill 文件，不会生成 `.trae/rules/` 下的 bootstrap 自动触发规则。建议优先用上面的 `npx superpowers-zh`，否则需要在对话里手动点名 skill 才会激活。

## 工作原理

Trae 使用 `.rules` 机制管理 AI 行为：

- **目录**：`.trae/rules/`
- **格式**：Markdown + metadata（description、globs、alwaysApply、priority）
- **规则类型**：
  - **项目规则**（Project Rules）— 仅作用于当前项目
  - **个人规则**（Personal Rules）— 用户级别，可被项目规则覆盖
- **优先级**：1-4，数值越高优先级越高

### Skills 适配
