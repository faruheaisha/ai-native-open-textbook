---
title: "编排合约：Runtime 迁移决策"
sourceId: "07-coding/ai-engineering-from-scratch-zh"
sourceTitle: "AI 工程从零到一（中文）"
sourceKind: "源码研读"
licenseLabel: "可转载"
lang: "中文"
tier: 1
volume: "07-coding"
sourceUrl: "https://github.com/fancyboi999/ai-engineering-from-scratch-zh"
entryUrl: "https://github.com/fancyboi999/ai-engineering-from-scratch-zh/blob/109181ce68128c1bf27ec20867177007a8bace89/certifications/claude/lessons/16-multi-agent-orchestration-and-delegation/outputs/orchestration-contract.md"
sourceRel: "certifications/claude/lessons/16-multi-agent-orchestration-and-delegation/outputs/orchestration-contract.md"
rawUrl: "/raw/07-coding/ai-engineering-from-scratch-zh/certifications/claude/lessons/16-multi-agent-orchestration-and-delegation/outputs/orchestration-contract.md"
sourceSha256: "5ed1f38ddc32bd79744ccfc8ffdf549e3a3f249bfc2e6cbd7c689610183d0e7b"
pageSha256: "5ed1f38ddc32bd79744ccfc8ffdf549e3a3f249bfc2e6cbd7c689610183d0e7b"
contentMode: "local-full"
zh: ""
---

# 编排合约：Runtime 迁移决策

## Goal and Scope（目标与范围）

比较三种迁移方案并交付决策 brief。研究过程只读。任何 agent 都不得编辑仓库、联系 vendor 或选择最终架构。

## Tasks and Dependencies（任务与依赖）

coordinator 将来源、runtime 与风险研究分配给互不重叠的 claim ID。所有任务的 allowed tools 均为只读。synthesis 必须等到每项必需结果达到 complete 或明确的 partial；独立审查则必须等待经过验证的 synthesis。

## Result States（结果状态）

complete 表示满足每个主张字段；partial 会保留有效主张并列出缺失来源；blocked 则说明继续推进所需的策略、权限或外部状态。

## Budgets（预算）

每名 researcher 的 budget 上限是五个来源、六次 tool 调用和 12 分钟。coordinator 只能针对一个具名缺口重新委派一次。

## Merge Rules（合并规则）

主张按 claim ID 与 provenance 合并。重复来源会折叠；conflict 必须保留双方的来源版本与升级处理 owner。

## Independent Review（独立审查）

reviewer 在 isolated 上下文中接收 brief、主张、证据与 rubric。它返回稳定的 finding ID，不能编辑候选 brief。
