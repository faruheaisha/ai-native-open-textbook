---
title: "qwenwork-official-help-cn"
sourceId: "04-work/qwenwork-official-help-cn"
sourceTitle: "qwenwork-official-help-cn"
sourceKind: "官方文档"
licenseLabel: "仅引用"
lang: "中文"
tier: 3
volume: "04-work"
sourceUrl: "https://qwenwork.cn/docs"
entryUrl: "https://qwenwork.cn/docs"
sourceRel: "docs/enterprise/flagship/audit-logs/ai.md"
rawUrl: "/raw/04-work/qwenwork-official-help-cn/docs/enterprise/flagship/audit-logs/ai.md"
sourceSha256: "e3f3f9c088228e2fea5d781620cbea4dc3ae24c3ad363855f936b1aef2caf592"
pageSha256: "e3f3f9c088228e2fea5d781620cbea4dc3ae24c3ad363855f936b1aef2caf592"
contentMode: "local-full"
zh: ""
---

# qwenwork-official-help-cn

帮助中心 企业旗舰版能力 日志审计 AI 日志
 通用官方知识库
AI 日志
AI 日志按对话轮次查看处理结果及调用的技能、连接器和专家套件。每行是一轮对话，不是一个工具调用；同一轮可能包含多个资源调用。
查询一个对话轮次
- 进入 数据与运营 → 日志审计 → AI 日志。
- 选择查询周期，再按用户、邮箱、会话标题、Turn ID 或 Session ID 搜索。
- 使用部门与结果筛选缩小范围，打开目标行的【详情】。
- 对照该轮的时间、用户和处理结果，检查其中使用的资源。
Turn ID 用于识别一轮对话，Session ID 用于关联同一会话中的多轮对话。排查时应保留完整标识，避免只靠相似标题判断。
【截图：AI 日志的周期、用户与会话搜索入口 · audit-logs--ai.png】
图 1：没有匹配记录时先检查周期和筛选条件，再确认数据是否已经更新。
理解更新时间与查询范围
AI 使用记录最迟在使用后 1 小时内可查，最多查询最近 90 天。刚完成任务后暂时没有记录，不应直接判断任务没有执行；先确认数据时间，再复查相同会话。
排查资源调用失败
查看轮次中的资源与结果，再到对应的技能、连接器或专家套件页面检查启用状态、开放范围和凭据。外部系统返回的授权错误还需要在对应系统核对。
导出前设置所需周期和筛选，点击【导出 CSV】。对外提供排查材料前确认接收人有权查看相关业务内容。
