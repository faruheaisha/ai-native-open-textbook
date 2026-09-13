---
title: "Superpowers 中文版 — Qoder 安装指南"
sourceId: "10-context-memory/superpowers-zh"
sourceTitle: "superpowers-zh（AI 编程超能力 · 中文增强版）"
sourceKind: "技能与配置库"
licenseLabel: "可转载"
lang: "中文"
tier: 3
volume: "10-context-memory"
sourceUrl: "https://github.com/jnMetaCode/superpowers-zh"
entryUrl: "https://github.com/jnMetaCode/superpowers-zh/blob/79ea5d262b7a1c7ce76a289390853bca51f940d4/README.md"
zh: ""
---

# Superpowers 中文版 — Qoder 安装指南

在 [Qoder](https://qoder.com)（阿里推出的 AI IDE）中使用 superpowers-zh 的完整指南。

## 自动安装

```bash
cd /your/project
npx superpowers-zh
```

安装脚本会自动检测 `.qoder/` 目录并：

1. 把 20 个 skills 复制到 `.qoder/skills/<name>/SKILL.md`
2. 生成一个**始终生效**的 bootstrap rule `.qoder/rules/superpowers-zh.md`（`trigger: always_on`），让 Qoder 每个会话都加载核心规则与 skill 索引

如果项目目录里还没有 `.qoder/`，可以显式指定：

```bash
npx superpowers-zh --tool qoder
```

## 手动安装

```bash
git clone https://github.com/jnMetaCode/superpowers-zh.git
cp -r superpowers-zh/skills /your/project/.qoder/skills
```

或全局安装（对所有项目生效）：

```bash
cp -r superpowers-zh/skills ~/.qoder/skills
```

## Skill 加载优先级

| 位置 | 优先级 | 说明 |
|------|--------|------|
| `.qoder/skills/` | 最高 | 项目级，仅当前项目 |
| `~/.qoder/skills/` | 中 | 用户级，所有项目共享 |

> 同名 skill 项目级覆盖用户级。

## 使用

1. 安装完成后**重启 Qoder**
2. 在对话框输入 `/` 即可看到已加载的 skills 列表
3. bootstrap rule（`.qoder/rules/superpowers-zh.md`）会被 Qoder 识别为"始终生效"，每个会话自动加载核心规则
