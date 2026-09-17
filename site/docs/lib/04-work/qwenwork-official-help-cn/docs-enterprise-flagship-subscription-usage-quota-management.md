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
sourceRel: "docs/enterprise/flagship/subscription-usage/quota-management.md"
rawUrl: "/raw/04-work/qwenwork-official-help-cn/docs/enterprise/flagship/subscription-usage/quota-management.md"
sourceSha256: "cb217ccbfae9a0c5b65d14ce09625c242d806237eee3eb36edee1694d3b02e85"
pageSha256: "cb217ccbfae9a0c5b65d14ce09625c242d806237eee3eb36edee1694d3b02e85"
contentMode: "local-full"
zh: ""
---

# qwenwork-official-help-cn

帮助中心 企业旗舰版能力 订阅与用量 限额管理
 通用官方知识库
限额管理
限额管理设置每位成员在一个周期内可以使用的积分上限。所有成员仍使用组织共享额度；提高个人上限不会增加企业已购买的积分。
⚠️ BYOK 适用说明： BYOK（Bring Your Own Key，自带模型密钥）能力仅对已开放该能力的部分用户可用。BYOK 模型不适用千问办公-旗舰版的用量统计与限额管理；相关统计数据和限额规则不包含 BYOK 模型。
设置默认限额
- 进入 数据与运营 → 订阅与用量 → 限额管理，选择「限额策略组」。
- 找到「默认限额策略组」，点击【编辑】。
- 填写每位用户周期积分上限并保存。默认策略适用于没有命中其他启用策略的成员，新成员加入后也按此规则处理。
- 默认策略始终保留，不能停用或删除。
给特定成员设置不同上限
- 点击【新增限额策略组】，填写名称和说明，例如「研发团队周期限额」。
- 设置优先级与适用用户范围，可选择用户、部门或用户组。
- 填写每位用户周期积分上限。输入 0 表示该用户当前周期不能使用组织共享积分，上限不能超过页面显示的组织当前总额度。
- 点击【保存策略组】，回到列表确认启用状态。
【截图：限额策略组、优先级和每位用户周期上限 · subscription-usage--quota-management.png】
图 1：上限按每位用户计算；同一成员命中多个策略时，优先级数字越小越先匹配。
【截图：管理后台新增限额策略组 · quota-create.png】
这里填写每位用户的周期上限，数值不超过组织总额度。
同一成员只采用一个生效限额策略，多个上限不会相加。例如成员同时属于 P10 的 8,000 积分策略和 P20 的 20,000 积分策略，最终采用 P10 的上限。
验证成员实际限额
- 点击【命中验证】，搜索并选择目标成员。
- 查看命中的策略组与周期上限，确认部门和用户组选择正确。
- 到用量统计检查该成员周期内已用与可用数据，并通过【来源】核对限额来源。
- 如果成员已用量超过调整后的上限，不会因为降低上限而抹去历史用量；需要继续使用时应合理调整策略并检查组织剩余额度。
查看计量周期
切换到「计量设置」，查看限量周期模式与下次重置时间。当前按订阅周期统一重置，不能在此为每个策略另设重置日期。日均统计或近 30 天用量不等同于这个周期的个人限额。
停用或删除策略
停用或删除自定义策略后，相关成员会按其他启用策略或默认策略重新计算上限。提交后再次使用命中验证检查受影响成员，防止意外进入过高或过低的默认限额。
