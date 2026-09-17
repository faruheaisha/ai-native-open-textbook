---
title: "SOP：把不可见知识编码进仓库"
sourceId: "09-harness/learn-harness-engineering"
sourceTitle: "Learn Harness Engineering"
sourceKind: "课时教程"
licenseLabel: "可转载"
lang: "英文"
tier: 2
volume: "09-harness"
sourceUrl: "https://github.com/walkinglabs/learn-harness-engineering"
entryUrl: "https://github.com/walkinglabs/learn-harness-engineering/blob/77e7a3e21469dcbece2558086c8d91657abeaa40/docs/zh/resources/openai-advanced/sops/encode-knowledge-into-repo.md"
sourceRel: "docs/zh/resources/openai-advanced/sops/encode-knowledge-into-repo.md"
rawUrl: "/raw/09-harness/learn-harness-engineering/docs/zh/resources/openai-advanced/sops/encode-knowledge-into-repo.md"
sourceSha256: "340e33263ce6ddcc9d23a3eed4c7080a35a2803be7132551ecd451fde11f948c"
pageSha256: "340e33263ce6ddcc9d23a3eed4c7080a35a2803be7132551ecd451fde11f948c"
contentMode: "local-full"
zh: ""
---

# SOP：把不可见知识编码进仓库

当重要上下文还散落在 Google Docs、聊天记录、ticket 或人的脑子里时，就用这份 SOP。

## 目标

让那些 agent 以前看不见的知识，变成 codebase 里可发现、可读取、可执行的事实。

## 触发信号

- agent 总在追问系统到底怎么运作。
- 人开始说“这个是 Slack 里定过的”或“按某某上周说的做”。
- review 里经常引用仓库里根本没写下来的产品、安全或架构规则。
- 新会话总在重复那些本该已经稳定下来的发现工作。

## 执行 SOP

1. 先列出所有不可见知识来源：外部文档、聊天、默认团队规则、口头决策。
2. 对每条知识判断：它属于架构、产品行为、安全策略、可靠性要求、执行上下文，还是参考材料？
3. 按类别编码到对应仓库工件：
   - 架构 -> `ARCHITECTURE.md`
   - 产品行为 -> `docs/product-specs/`
   - 设计理由 -> `docs/design-docs/`
   - 执行状态 -> `docs/exec-plans/`
   - 外部参考材料 -> `docs/references/`
   - 质量或可靠性要求 -> `docs/QUALITY_SCORE.md` 或 `docs/RELIABILITY.md`
4. 把模糊表达改写成运行上真正有用的表达。
5. 删除或废弃旧副本，保证仓库里有一个可发现的真相来源。

## 好的编码规则

- 为“可发现”而写，不是为“写得很全”而写。
- 文件尽量短，名字尽量明确。
- 相关工件要互相链接。
- 记录耐久规则，不要把会议流水账原封不动塞进来。
- 决策形成的同一轮会话里，就把仓库更新掉。

## 完成定义

- 一个全新 agent 不问人也能找到相关规则。
- 同一个事实不会散落在多个互相打架的文件里。
- 新工件放在离它所治理的代码或流程最近的地方。
