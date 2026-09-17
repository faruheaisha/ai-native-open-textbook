---
title: "千问办公官方帮助中心（阿里云）"
sourceId: "04-work/qwenwork-official-help"
sourceTitle: "千问办公官方帮助中心（阿里云）"
sourceKind: "官方文档"
licenseLabel: "仅引用"
lang: "中文"
tier: 3
volume: "04-work"
sourceUrl: ""
entryUrl: null
sourceRel: "md/enterprise-ultimate-audit-logs-ai-logs.md"
rawUrl: "/raw/04-work/qwenwork-official-help/md/enterprise-ultimate-audit-logs-ai-logs.md"
sourceSha256: "36e090cb79cc8e31e0cfafa968e13d202f1db9b7f33ed5b921efbe11e9852896"
pageSha256: "36e090cb79cc8e31e0cfafa968e13d202f1db9b7f33ed5b921efbe11e9852896"
contentMode: "local-full"
zh: ""
---

# 千问办公官方帮助中心（阿里云）

AI 日志按对话轮次查看处理结果及调用的技能、连接器和专家套件。每行是一轮对话，不是一个工具调用；同一轮可能包含多个资源调用。

## 查询一个对话轮次
1. 进入 数据与运营 → 日志审计 → AI 日志。
2. 选择查询周期，再按用户、邮箱、会话标题、Turn ID 或 Session ID 搜索。
3. 使用部门与结果筛选缩小范围，打开目标行的【详情】。
4. 对照该轮的时间、用户和处理结果，检查其中使用的资源。

Turn ID 用于识别一轮对话，Session ID 用于关联同一会话中的多轮对话。排查时应保留完整标识，避免只靠相似标题判断。

![](https://docs.qwenwork.cn/zh/images/qwenwork-flagship-155e155e9b58086c.png)

*没有匹配记录时先检查周期和筛选条件，再确认数据是否已经更新。*

## 理解更新时间与查询范围
AI 使用记录最迟在使用后 1 小时内可查，最多查询最近 90 天。刚完成任务后暂时没有记录，不应直接判断任务没有执行；先确认数据时间，再复查相同会话。

## 排查资源调用失败
查看轮次中的资源与结果，再到对应的[技能](https://docs.qwenwork.cn/enterprise-ultimate/ai-assets/skills)、[连接器](https://docs.qwenwork.cn/enterprise-ultimate/ai-assets/connectors)或[专家套件](https://docs.qwenwork.cn/enterprise-ultimate/ai-assets/expert-kits)页面检查启用状态、开放范围和凭据。外部系统返回的授权错误还需要在对应系统核对。

导出前设置所需周期和筛选，点击【导出 CSV】。对外提供排查材料前确认接收人有权查看相关业务内容。
