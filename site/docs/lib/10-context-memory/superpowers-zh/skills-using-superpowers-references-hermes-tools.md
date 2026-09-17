---
title: "Hermes Agent 工具映射"
sourceId: "10-context-memory/superpowers-zh"
sourceTitle: "superpowers-zh（AI 编程超能力 · 中文增强版）"
sourceKind: "技能与配置库"
licenseLabel: "可转载"
lang: "中文"
tier: 3
volume: "10-context-memory"
sourceUrl: "https://github.com/jnMetaCode/superpowers-zh"
entryUrl: "https://github.com/jnMetaCode/superpowers-zh/blob/79ea5d262b7a1c7ce76a289390853bca51f940d4/skills/using-superpowers/references/hermes-tools.md"
sourceRel: "skills/using-superpowers/references/hermes-tools.md"
rawUrl: "/raw/10-context-memory/superpowers-zh/skills/using-superpowers/references/hermes-tools.md"
sourceSha256: "370cd5cc91ddd866a64a3a047fe29da86d3614a7659e05bfafb383565e3e889c"
pageSha256: "370cd5cc91ddd866a64a3a047fe29da86d3614a7659e05bfafb383565e3e889c"
contentMode: "local-full"
zh: ""
---

# Hermes Agent 工具映射

## 工具

| Skill 里要做的动作 | Hermes 工具 |
|------------------|------------|
| 读取文件 | `read_file` |
| 创建新文件 | `write_file` |
| 编辑文件（定点补丁） | `patch` |
| 运行 shell 命令 | `terminal` |
| 搜索文件内容 | `search_files` |
| 按文件名查找 | `terminal` 配合 `find` |
| 抓取 URL / 读网页 | `web_extract(urls=[...])` |
| 搜索网络 | `web_search(query=...)` |
| 派遣子智能体 | `delegate_task(goal=..., context=..., toolsets=[...], role="leaf")` |
| 任务跟踪 | `todo` 工具 |
| 调用 skill | `skill_view("skill-name")` |

## 指令文件

当某个 skill 提到「你的指令文件」时，在 Hermes Agent 上指的是项目目录里的 **`AGENTS.md`**，或全局的 **`~/.hermes/SOUL.md`**。

> 🇨🇳 **本节是 superpowers-zh 的增量内容，上游 obra/superpowers 没有。**
>
> 补充一条实践区分：`SOUL.md` 是**身份/人格**文件（Hermes 官方文档明确说项目工作流指令不属于它），所以 `npx superpowers-zh --tool hermes` 的**项目级**安装只写 `AGENTS.md`；**全局**安装只装 skills、不写 bootstrap —— 往 SOUL.md 里塞技能清单是误用那个文件。

## 调用 skill

Hermes Agent 有一个 `skills` 工具集，包含 `skill_view` 和 `skills_list` 两个工具。
要调用某个 superpowers skill，使用：

```
skill_view("brainstorming")
skill_view("test-driven-development")
```

如果 `skill_view` 找不到某个 superpowers skill（在插件完全注册之前，它可能还没出现在目录里），退回到直接读取 SKILL.md：

```
