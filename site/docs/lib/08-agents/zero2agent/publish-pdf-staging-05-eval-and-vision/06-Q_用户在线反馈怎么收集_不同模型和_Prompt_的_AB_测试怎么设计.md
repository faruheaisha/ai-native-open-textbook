---
title: "Zero2Agent：从零实现 Agent"
sourceId: "08-agents/zero2agent"
sourceTitle: "Zero2Agent：从零实现 Agent"
sourceKind: "课时教程"
licenseLabel: "可转载"
lang: "中文"
tier: 2
volume: "08-agents"
sourceUrl: "https://github.com/ranxi2001/zero2Agent"
entryUrl: "https://github.com/ranxi2001/zero2Agent/blob/46e9f7c28f84f54b2f6e45681d14989f01e18291/publish-pdf/staging/05-eval-and-vision.md"
sourceRel: "publish-pdf/staging/05-eval-and-vision.md"
rawUrl: "/raw/08-agents/zero2agent/publish-pdf/staging/05-eval-and-vision.md"
sourceSha256: "522251cd44ac5841f540eaf4da4f60a49782ca1736e0ab863498790f1cfd6e8e"
pageSha256: "b5ba7472d02bbd571c87fac31c187027464b69c65c07bb3e3bfe941de69dc844"
contentMode: "local-full"
zh: ""
---

## Q：用户在线反馈怎么收集？不同模型和 Prompt 的 AB 测试怎么设计？

> 来源：快手AI应用开发一面

**新手答**：”加个点赞按钮，然后随机分流看哪个模型好就行。”

**高手答**：

在线反馈分**显式反馈**和**隐式反馈**两层：

| 类型 | 来源 | 信号 |
|------|------|------|
| 显式 | 用户/客服 | 点”有帮助/没帮助”、客服标记”可直接发送/需修改” |
| 隐式 | 行为日志 | 用户是否继续追问、客服修改比例、工单是否被退回、人工改判率 |

AB 测试的设计要点：

**分流原则**：

1. **用户粘性**：同一用户或同一工单必须稳定在同一实验组，避免体验混乱
2. **分流方式**：`hash(userId + experimentKey) % 100 < 50 ? A : B`
3. **不能只看点赞率**：理赔场景关注准确性和风险，核心指标是证据引用率、人工修改率、投诉率、审核耗时、最终改判率

```sql
CREATE TABLE llm_ab_eval (
    request_id VARCHAR(64),
    user_id VARCHAR(64),
    experiment_key VARCHAR(64),
    group_name VARCHAR(32),
    model_name VARCHAR(64),
    prompt_version VARCHAR(64),
    helpful TINYINT,
    manual_edit_rate DECIMAL(6,4),
    evidence_valid TINYINT
);
```

**统计显著性**：样本量要够——每组至少跑 500+ 请求，且按场景分层统计（简单咨询 vs 复杂审核的 AB 效果不同，不能混在一起看均值）。

**差距在哪**：新手只想到加点赞按钮和随机分流。高手有完整的反馈分层（显式+隐式）、分流一致性保证、业务相关指标选择和统计显著性意识。面试官考的是你对**在线实验系统**的工程理解——不是”A/B测试是什么”，而是在 AI 场景下怎么科学评估效果差异。
