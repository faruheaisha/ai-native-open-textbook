---
title: "中文资料库"
sourceId: "09-harness/learn-harness-engineering"
sourceTitle: "Learn Harness Engineering"
sourceKind: "课时教程"
licenseLabel: "可转载"
lang: "英文"
tier: 2
volume: "09-harness"
sourceUrl: "https://github.com/walkinglabs/learn-harness-engineering"
entryUrl: "https://github.com/walkinglabs/learn-harness-engineering/blob/77e7a3e21469dcbece2558086c8d91657abeaa40/docs/zh/resources/index.md"
sourceRel: "docs/zh/resources/index.md"
rawUrl: "/raw/09-harness/learn-harness-engineering/docs/zh/resources/index.md"
sourceSha256: "7b2102f7c364c4d921e254659610823305e016d083a2bd72eed99894bba2dd5d"
pageSha256: "7b2102f7c364c4d921e254659610823305e016d083a2bd72eed99894bba2dd5d"
contentMode: "local-full"
zh: ""
---

# 中文资料库

这个文件夹把课程里的方法整理成可以直接参考和复用的材料，不是再讲一遍概念，而是尽量回答两个问题：

- 我现在应该先抄哪些文件
- 这些文件分别解决什么问题

## 适合什么时候用

当你准备让 Codex、Claude Code 或其他 coding agent 在一个仓库里持续工作时，就可以从这里开始。它特别适合这些场景：

- 多轮会话开发，担心上下文断裂
- 功能多，容易出现做一半就停的半成品
- 常常提前宣布完成，但实际没测透
- 每次开工都要重新摸索启动方式

## 从这里开始

如果你想先搭一个最小可用版本，优先看这些文件：

- 根指令文件：[`templates/AGENTS.md`](https://github.com/walkinglabs/learn-harness-engineering/blob/77e7a3e21469dcbece2558086c8d91657abeaa40/docs/zh/resources/templates/AGENTS.md) 或 [`templates/CLAUDE.md`](https://github.com/walkinglabs/learn-harness-engineering/blob/77e7a3e21469dcbece2558086c8d91657abeaa40/docs/zh/resources/templates/CLAUDE.md)
- 功能状态文件：[`templates/feature_list.json`](https://github.com/walkinglabs/learn-harness-engineering/blob/77e7a3e21469dcbece2558086c8d91657abeaa40/docs/zh/resources/templates/feature_list.json)
- 进度日志：[`templates/claude-progress.md`](/lib/09-harness/learn-harness-engineering/docs-zh-resources-templates-claude-progress)

这个文件名是课程早期留下的约定，实际是通用的、放在仓库里的会话进度日志，
并不绑定 Claude Code。Codex、OpenHands、Antigravity 等 agent 都可以使用，
但必须在 `AGENTS.md` 或其他等价指令里明确要求它在开工时读取、收尾时更新；
agent 不会自动维护这个文件。
- 启动脚本参考：`docs/resources/templates/init.sh`

然后按需要补上：

- 会话交接模板：[`templates/session-handoff.md`](/lib/09-harness/learn-harness-engineering/docs-zh-resources-templates-session-handoff)
- 收尾检查清单：[`templates/clean-state-checklist.md`](/lib/09-harness/learn-harness-engineering/docs-zh-resources-templates-clean-state-checklist)
- 评审模板：[`templates/evaluator-rubric.md`](/lib/09-harness/learn-harness-engineering/docs-zh-resources-templates-evaluator-rubric)

如果你想直接采用 OpenAI 那篇 harness engineering 文章里更完整的仓库组织方式，可以继续看：

- [`openai-advanced/index.md`](/lib/09-harness/learn-harness-engineering/docs-zh-resources-openai-advanced)

## 资料库结构

- [`templates/`](/lib/09-harness/learn-harness-engineering/docs-zh-resources-templates)：可以直接复制到真实仓库里的模板
- [`reference/`](/lib/09-harness/learn-harness-engineering/docs-zh-resources-reference)：方法说明、启动流程和问题对照表
- [`openai-advanced/`](/lib/09-harness/learn-harness-engineering/docs-zh-resources-openai-advanced)：更完整的 OpenAI 风格高级资源包，包括仓库骨架、质量文档、执行计划和系统级治理文件

## 推荐最小组合

- `AGENTS.md` 或 `CLAUDE.md`
- `feature_list.json`
- `claude-progress.md`（通用会话进度日志，文件名沿用历史约定）
- `init.sh`

先把这四样放进项目里，再开始让 agent 持续工作，通常就已经能明显降低返工和瞎猜。

如果你的仓库已经进入多模块、多阶段、多角色协作，可以直接升级到
[`openai-advanced/`](/lib/09-harness/learn-harness-engineering/docs-zh-resources-openai-advanced) 这一套高级结构，而不是继续把最小模板硬撑成一个大而乱的系统。
