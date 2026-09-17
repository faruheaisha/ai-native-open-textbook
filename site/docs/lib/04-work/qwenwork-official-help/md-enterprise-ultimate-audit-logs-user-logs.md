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
sourceRel: "md/enterprise-ultimate-audit-logs-user-logs.md"
rawUrl: "/raw/04-work/qwenwork-official-help/md/enterprise-ultimate-audit-logs-user-logs.md"
sourceSha256: "26e093c388b7cb20cf9afb54c060ff30a21403b5766b74ad0b95a3b4439db57c"
pageSha256: "26e093c388b7cb20cf9afb54c060ff30a21403b5766b74ad0b95a3b4439db57c"
contentMode: "local-full"
zh: ""
---

# 千问办公官方帮助中心（阿里云）

用户日志记录成员在客户端的关键操作，用于排查登录、授权和使用过程中的问题。日志最多查询最近 90 天。

## 查询成员的一次操作
1. 进入 数据与运营 → 日志审计 → 用户日志。
2. 设置开始与结束日期，覆盖成员反馈的发生时间。默认查询近 30 天，日期不能超出 90 天查询范围。
3. 输入成员姓名、邮箱、事件描述、event_type、session_id 或 IP。
4. 检查结果列，点击【详情】查看事件信息；需要时按结果筛选失败记录。

![](https://docs.qwenwork.cn/zh/images/qwenwork-flagship-a9832e9bb08b4998.png)

*先按成员与时间定位，再用事件类型或会话标识关联前后操作。*

## 排查登录问题
请成员提供发生时间和使用的登录方式，先查相关认证事件，再看是否出现登录完成记录。身份平台授权成功与进入客户端工作区可能是不同阶段；符合首次创建密码条件的成员，还需要完成密码创建。

如果用户不能登录，结合[用户状态与席位](https://docs.qwenwork.cn/enterprise-ultimate/users/user)、[身份认证](https://docs.qwenwork.cn/enterprise-ultimate/users/authentication)和[可信设备](https://docs.qwenwork.cn/enterprise-ultimate/security/trusted-devices)检查。日志提供发生过的事件，不自动解释所有策略原因。

## 导出与复查
设好筛选后点击【导出 CSV】，抽查日期和用户是否正确。找不到记录时先清空条件，确认事件是否在查询范围内。需要查看任务内使用的技能或连接器时，转到 AI 日志。
