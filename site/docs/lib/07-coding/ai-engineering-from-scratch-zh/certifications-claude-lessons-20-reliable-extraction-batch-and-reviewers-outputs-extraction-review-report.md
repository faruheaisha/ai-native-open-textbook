---
title: "提取审查报告：客服 Policy 变更"
sourceId: "07-coding/ai-engineering-from-scratch-zh"
sourceTitle: "AI 工程从零到一（中文）"
sourceKind: "源码研读"
licenseLabel: "可转载"
lang: "中文"
tier: 1
volume: "07-coding"
sourceUrl: "https://github.com/fancyboi999/ai-engineering-from-scratch-zh"
entryUrl: "https://github.com/fancyboi999/ai-engineering-from-scratch-zh/blob/109181ce68128c1bf27ec20867177007a8bace89/certifications/claude/lessons/20-reliable-extraction-batch-and-reviewers/outputs/extraction-review-report.md"
sourceRel: "certifications/claude/lessons/20-reliable-extraction-batch-and-reviewers/outputs/extraction-review-report.md"
rawUrl: "/raw/07-coding/ai-engineering-from-scratch-zh/certifications/claude/lessons/20-reliable-extraction-batch-and-reviewers/outputs/extraction-review-report.md"
sourceSha256: "f168e5edf9f87337e4d295a67423deac0121b386de8d129041217354cd3a5caf"
pageSha256: "f168e5edf9f87337e4d295a67423deac0121b386de8d129041217354cd3a5caf"
contentMode: "local-full"
zh: ""
---

# 提取审查报告：客服 Policy 变更

## Extraction Contract（提取合约）

每条记录包含 policy ID、生效日期或 `null`、地区、动作类型、阈值或 `null`、证据片段、来源版本和审查状态。unknown 可被显式表示，额外字段会被拒绝。

## Batch Manifest（Batch 清单）

Job `policy-w32-review` 包含 40 个输入，通过稳定的 `custom_id`、来源版本、schema `policy-change-2` 和预期输出关联。fixture 返回 shuffled 结果，其中有两项 dependency 失败，并保留 38 条成功记录。有日期的规划假设是 Message Batches 成本降低 50%、服务窗口最长 24-hour、no guaranteed latency SLA；deploy 时必须重新核对当前 API 文档。

## Validation Layers（验证层）

syntax 解析 40/40；schema 接受 40 条。semantic validation 拒绝一条早于其来源生效日期的 deadline；provenance validation 拒绝一个证据片段中不存在的编造 threshold。

## Reviewer Findings（Reviewer Finding）

independent reviewer 返回稳定 finding `REV-017` 和 `REV-018`，包含字段、来源片段、原因和处置；它没有静默重写输出。

## Adjudication（裁决）

具备资格的 policy owner 将不受支持的 threshold 设为 `null`，确认 deadline 例外，并记录原因代码。反复歧义会升级处理，而不是进入下一轮重试。

## Metrics（指标）

字段 precision：0.98。adjudication 后的 evidence-support 率：1.00。高风险误报：0。reviewer 分歧：40 条中的 2 条。每条已接受记录成本：0.014 单位。
