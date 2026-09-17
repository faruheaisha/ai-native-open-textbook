---
title: "收尾一个开发分支"
sourceId: "10-context-memory/superpowers-zh"
sourceTitle: "superpowers-zh（AI 编程超能力 · 中文增强版）"
sourceKind: "技能与配置库"
licenseLabel: "可转载"
lang: "中文"
tier: 3
volume: "10-context-memory"
sourceUrl: "https://github.com/jnMetaCode/superpowers-zh"
entryUrl: "https://github.com/jnMetaCode/superpowers-zh/blob/79ea5d262b7a1c7ce76a289390853bca51f940d4/skills/finishing-a-development-branch/SKILL.md"
sourceRel: "skills/finishing-a-development-branch/SKILL.md"
rawUrl: "/raw/10-context-memory/superpowers-zh/skills/finishing-a-development-branch/SKILL.md"
sourceSha256: "1038c93b17fcbcf116a2c251a3e03be489703643b51e208e4fc08e71500e1e5a"
pageSha256: "1038c93b17fcbcf116a2c251a3e03be489703643b51e208e4fc08e71500e1e5a"
contentMode: "local-full"
zh: ""
---

# 收尾一个开发分支

## 概述

**核心原则：** 验证测试 → 检测环境 → 展示选项 → 执行选择 → 清理。

**开始时宣告：** "我正在使用 finishing-a-development-branch 技能来收尾这份工作。"

## 步骤 1：验证测试

运行项目的完整测试套件（`npm test` / `cargo test` / `pytest` / `go test ./...`）。

**如果测试失败**，报告失败并停下——菜单是在测试全绿之后才出现的：

```
测试失败（<N> 个）。完成之前必须先修：

[展示失败详情]
```

**如果测试通过：** 继续步骤 2。

## 步骤 2：检测环境

```bash
GIT_DIR=$(cd "$(git rev-parse --git-dir)" 2>/dev/null && pwd -P)
GIT_COMMON=$(cd "$(git rev-parse --git-common-dir)" 2>/dev/null && pwd -P)
# 现在就捕获 —— 此刻还在工作区里面。步骤 5 会切换目录，
# 而清理（步骤 6）需要这个值
WORKTREE_PATH=$(git rev-parse --show-toplevel)
```

这决定了展示哪种菜单、以及清理方式：

| 状态 | 菜单 | 清理 |
|------|------|------|
| `GIT_DIR == GIT_COMMON`（普通仓库） | 标准 3 个选项 | 无 worktree 可清理 |
| `GIT_DIR != GIT_COMMON`，命名分支 | 标准 3 个选项 | 按来源判断（见步骤 6） |
| `GIT_DIR != GIT_COMMON`，分离 HEAD | 收敛为 2 个选项（不含合并） | 由外部管理——原地别动 |

## 步骤 3：确定基础分支

基础分支就是这份工作从哪儿分出来的那个——通常在计划里、对话里，或者分支的 upstream 里已经写明了。如果还不知道，就问："这个分支是从 <你的最佳猜测> 分出来的，对吗？"**合并之前先确认：合并到错误的基础分支，代价很高。**

## 步骤 4：展示选项

**普通仓库和命名分支 worktree——精确展示这 3 个选项：**

```
实现已完成。你想怎么做？
