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
sourceRel: "md/enterprise-ultimate-analytics-dashboard.md"
rawUrl: "/raw/04-work/qwenwork-official-help/md/enterprise-ultimate-analytics-dashboard.md"
sourceSha256: "536a0936e098aa3a7ba85b59041711a49bb9f4ce0ca553d2a790945c7dc399fa"
pageSha256: "536a0936e098aa3a7ba85b59041711a49bb9f4ce0ca553d2a790945c7dc399fa"
contentMode: "local-full"
zh: ""
---

# 千问办公官方帮助中心（阿里云）

综合看板用于查看组织的积分消耗和活跃情况。先选择时间范围，再解读总量、日均和趋势，避免把不同周期的数据放在一起比较。  
**警告**

**BYOK 适用说明：** BYOK（Bring Your Own Key，自带模型密钥）能力仅对已开放该能力的部分用户可用。BYOK 模型不适用千问办公-旗舰版的用量统计与限额管理；相关统计数据和限额规则不包含 BYOK 模型。

## 查看组织使用趋势
1. 进入 数据与运营 → 数据统计 → 综合看板。
2. 在「筛选条件」选择周期，记录页面显示的起止日期与数据截至时间。
3. 查看累计消耗积分、日均消耗积分、当前周期剩余积分和活跃人数。
4. 查看组织积分消耗趋势，找到明显增长或下降的日期，再进入用量明细定位成员。

![](https://docs.qwenwork.cn/zh/images/qwenwork-flagship-c37c454b5c688eb0.png)

*先确认筛选周期与数据截至时间，再比较指标。*

## 理解指标口径
<table> <thead> <tr> <td>指标</td> <td>阅读方法</td> </tr> </thead> <tbody> <tr> <td>累计消耗积分</td> <td>所选时间段内的消耗，不等同于企业所有历史消耗</td> </tr> <tr> <td>日均消耗积分</td> <td>按所选时间段的自然日计算，不只计算有使用记录的日期</td> </tr> <tr> <td>当前周期剩余积分</td> <td>对应组织当前周期额度，不是给每位成员单独发放的额度</td> </tr> <tr> <td>活跃人数</td> <td>筛选周期内至少使用一次的成员数量，不等同于已授权席位数</td> </tr> </tbody> </table>

统计数据保留 180 天。页面显示的数据截至时间可帮助判断最新使用是否已进入统计。

## 用量突然增加时
先确认周期没有改变，再到[用量统计](https://docs.qwenwork.cn/enterprise-ultimate/analytics/usage)在「用户」页签按周期内已用排序，查看增量集中在哪里。需要进一步了解任务内容时，在权限允许的范围内结合[AI 日志](https://docs.qwenwork.cn/enterprise-ultimate/audit-logs/ai-logs)查询相关对话轮次。
