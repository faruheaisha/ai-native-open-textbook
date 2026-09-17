---
title: "CodeBuddy 使用指南"
sourceId: "10-context-memory/superpowers-zh"
sourceTitle: "superpowers-zh（AI 编程超能力 · 中文增强版）"
sourceKind: "技能与配置库"
licenseLabel: "可转载"
lang: "中文"
tier: 3
volume: "10-context-memory"
sourceUrl: "https://github.com/jnMetaCode/superpowers-zh"
entryUrl: "https://github.com/jnMetaCode/superpowers-zh/blob/79ea5d262b7a1c7ce76a289390853bca51f940d4/docs/README.codebuddy.md"
sourceRel: "docs/README.codebuddy.md"
rawUrl: "/raw/10-context-memory/superpowers-zh/docs/README.codebuddy.md"
sourceSha256: "4b50d909dd343172968e07f02ef5f42436be027c20a1f4215cc7afb0cf765e62"
pageSha256: "4b50d909dd343172968e07f02ef5f42436be027c20a1f4215cc7afb0cf765e62"
contentMode: "local-full"
zh: ""
---

# CodeBuddy 使用指南

[CodeBuddy](https://www.codebuddy.cn)（腾讯云 AI 编程助手 / AI IDE）加载 superpowers-zh skills 的方式与 Claude Code 类似：项目根目录的 `CODEBUDDY.md` 作为 bootstrap 引导，skills 放在 `.codebuddy/skills/` 下。

## 一键安装（推荐）

在你的项目根目录运行：

```bash
npx superpowers-zh
```

自动检测到 `.codebuddy/` 或 `CODEBUDDY.md` 时会安装到 CodeBuddy。检测不到时显式指定：

```bash
npx superpowers-zh --tool codebuddy
```

安装内容：

- `.codebuddy/skills/` — 20 个 skill（每个含 `SKILL.md`）
- `CODEBUDDY.md` — bootstrap 引导（已存在则在哨兵注释间追加，不覆盖你的内容）

## 全局安装

```bash
npx superpowers-zh --global --tool codebuddy
```

装到 `~/.codebuddy/skills/`，bootstrap 写 `~/.codebuddy/CODEBUDDY.md`，所有项目共享。

> 📌 v1.7.10 及更早写着「用户级路径尚未验证」且没有 `--global`。现已核实：[官方目录结构文档](https://www.codebuddy.cn/docs/cli/codebuddy-dir)确认全局与项目级同构。v1.7.11 起支持。

## Skill 加载优先级

| 位置 | 范围 |
|------|------|
| `.codebuddy/skills/` | 项目级，仅当前项目 |
| `~/.codebuddy/skills/` | 用户级，所有项目共享 |

同名时**项目级 > 用户级 > 插件级**（官方文档口径）。

记忆文件同理：全局在 `~/.codebuddy/CODEBUDDY.md`，项目级放项目根 `CODEBUDDY.md`（官方称项目根与 `.codebuddy/CODEBUDDY.md` 两处等价，我们用项目根）。

## 使用

1. 安装完成后**重启 CodeBuddy**。
