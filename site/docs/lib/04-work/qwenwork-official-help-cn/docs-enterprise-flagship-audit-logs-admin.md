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
sourceRel: "docs/enterprise/flagship/audit-logs/admin.md"
rawUrl: "/raw/04-work/qwenwork-official-help-cn/docs/enterprise/flagship/audit-logs/admin.md"
sourceSha256: "5e3a8a3ef7d8f6f6522d4500e3965fabda54ec109a44eed4079911ee76c54daa"
pageSha256: "5e3a8a3ef7d8f6f6522d4500e3965fabda54ec109a44eed4079911ee76c54daa"
contentMode: "local-full"
zh: ""
---

# qwenwork-official-help-cn

帮助中心 企业旗舰版能力 日志审计 管理员日志
 通用官方知识库
管理员日志
管理员日志记录后台管理操作的对象、动作与最终结果。查看页面本身不会产生一条管理变更记录。最多查询最近 180 天；查询窗口不代表历史数据会被删除。
查找一次配置变更
- 进入 数据与运营 → 日志审计 → 管理员日志。
- 选择发生操作的时间周期，按功能分类缩小范围。
- 搜索操作人、对象、动作或 IP；只想排查失败时使用结果筛选。
- 点击目标记录的【详情】，核对操作时间、对象和结果说明。
【截图：管理员日志的搜索、分类筛选与结果详情 · audit-logs--admin.png】
图 1：同时用对象、时间与操作人定位，避免把同一功能下的测试操作当成保存操作。
核对变更是否完成
日志中的动作需要一起阅读。例如“测试连接成功”与“保存配置成功”是两种记录。确认目标动作成功后，还应回到对应配置页面检查当前保存值；后续操作可能已经再次修改配置。
需要交给同事排查时，保持相同筛选条件点击【导出 CSV】，提供操作时间、对象与结果。凭据类变更只需要提供标识与状态，不应补贴密钥原文。
找不到记录
先清空搜索和结果筛选，再扩大查询周期；核对操作是否在当前企业执行。如果只是打开页面查看数据，本来就不会生成管理变更记录。客户端事件应到用户日志或AI 日志查询。
