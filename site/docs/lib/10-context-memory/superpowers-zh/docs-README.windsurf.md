---
title: "Superpowers 中文版 — Windsurf 安装指南"
sourceId: "10-context-memory/superpowers-zh"
sourceTitle: "superpowers-zh（AI 编程超能力 · 中文增强版）"
sourceKind: "技能与配置库"
licenseLabel: "可转载"
lang: "中文"
tier: 3
volume: "10-context-memory"
sourceUrl: "https://github.com/jnMetaCode/superpowers-zh"
entryUrl: "https://github.com/jnMetaCode/superpowers-zh/blob/79ea5d262b7a1c7ce76a289390853bca51f940d4/docs/README.windsurf.md"
sourceRel: "docs/README.windsurf.md"
rawUrl: "/raw/10-context-memory/superpowers-zh/docs/README.windsurf.md"
sourceSha256: "cfdec8eb1cb5948895f1b3ecf401635e3b541dae50c84814f10d26d5c76c64bc"
pageSha256: "cfdec8eb1cb5948895f1b3ecf401635e3b541dae50c84814f10d26d5c76c64bc"
contentMode: "local-full"
zh: ""
---

# Superpowers 中文版 — Windsurf 安装指南

在 [Windsurf](https://windsurf.com) 中使用 superpowers-zh 的完整指南。

## 自动安装

```bash
cd /your/project
npx superpowers-zh
```

安装脚本会自动检测 `.windsurf/` 目录并将 skills 复制到 `.windsurf/skills/` 目录。

## 手动安装

```bash
git clone https://github.com/jnMetaCode/superpowers-zh.git
cp -r superpowers-zh/skills /your/project/.windsurf/skills
```

或全局安装（注意路径 —— **不是** `~/.windsurf/skills`）：

```bash
npx superpowers-zh --global --tool windsurf
# 等价于手动：cp -r superpowers-zh/skills/* ~/.codeium/windsurf/skills/
```

> 📌 **v1.7.10 及更早的 `--global` 装到了 `~/.windsurf/skills`，Windsurf 不读那里，等于装了不生效。** 这是我们的实现错误，v1.7.11 起修正为官方路径 `~/.codeium/windsurf/skills/`。之前全局装过的请重装，并可手动删掉遗留的 `~/.windsurf/skills`。

## 工作原理

[Windsurf 官方文档](https://docs.windsurf.com/windsurf/cascade/skills)明确了两个路径，**它们不同构**：

| 范围 | 路径 |
|---|---|
