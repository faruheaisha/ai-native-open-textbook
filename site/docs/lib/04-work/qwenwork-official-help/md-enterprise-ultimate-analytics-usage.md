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
sourceRel: "md/enterprise-ultimate-analytics-usage.md"
rawUrl: "/raw/04-work/qwenwork-official-help/md/enterprise-ultimate-analytics-usage.md"
sourceSha256: "dfc42ff91634d9abf7033ae5331a9571bd66d95c3d2f9a90d54f96fc7ea48e49"
pageSha256: "dfc42ff91634d9abf7033ae5331a9571bd66d95c3d2f9a90d54f96fc7ea48e49"
contentMode: "local-full"
zh: ""
---

# 千问办公官方帮助中心（阿里云）

用量统计按用户或部门查看积分使用情况，可用于核对限额来源、定位使用较多的成员及导出报表。  
**警告**

**BYOK 适用说明：** BYOK（Bring Your Own Key，自带模型密钥）能力仅对已开放该能力的部分用户可用。BYOK 模型不适用千问办公-旗舰版的用量统计与限额管理；相关统计数据和限额规则不包含 BYOK 模型。

## 查询一名成员
1. 进入 数据与运营 → 数据统计 → 用量统计，选择查询周期。
2. 在「用户」页签输入姓名、邮箱或工号，必要时通过部门列筛选范围。
3. 查看最近登录时间、所选周期的已用积分和周期内已用／可用数据。点击【来源】检查限额来自哪个策略。
4. 点击该用户的【详情】，查看用户用量信息与趋势。

![](https://docs.qwenwork.cn/zh/images/qwenwork-flagship-6438ebd725d26540.png)

*近 30 天用量和周期内用量属于不同时间口径，比较时先确认列名。*

## 按部门查询并导出
切换到「部门」，点击带有下级入口的部门名称逐级查看。点击上方面包屑返回上级；输入部门名称可以搜索整个组织的部门。

导出前设好周期、搜索和筛选条件，点击【导出 CSV】。打开文件抽查成员、时间范围和数值，保存报告时同时注明数据更新时间。统计数据保留 180 天，超出保留范围的历史数据不能仅靠切换筛选恢复。

## 排查可用额度与实际使用不一致
先核对该成员命中的[限额策略组](https://docs.qwenwork.cn/enterprise-ultimate/subscription/quota)，再检查组织共享额度和统计更新时间。策略调整不会重写已发生的用量，降低上限后历史已用可能高于新上限。

最近登录时间只说明登录行为，不能代表积分已使用。需要判断是否实际发起任务，应结合用量和对应日志。
