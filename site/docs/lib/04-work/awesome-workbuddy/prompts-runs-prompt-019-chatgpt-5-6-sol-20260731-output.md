---
title: "会员 RFM 分层预览"
sourceId: "04-work/awesome-workbuddy"
sourceTitle: "办公 Agent 生态清单（awesome-workbuddy）"
sourceKind: "清单与速查"
licenseLabel: "可转载"
lang: "中文"
tier: 2
volume: "04-work"
sourceUrl: "https://github.com/staruhub/awesome-workbuddy"
entryUrl: "https://github.com/staruhub/awesome-workbuddy/blob/e32b6c953154e41f6cb4e6b69fd7d933f5cef3d3/prompts/runs/prompt-019-chatgpt-5-6-sol-20260731/output.md"
sourceRel: "prompts/runs/prompt-019-chatgpt-5-6-sol-20260731/output.md"
rawUrl: "/raw/04-work/awesome-workbuddy/prompts/runs/prompt-019-chatgpt-5-6-sol-20260731/output.md"
sourceSha256: "1dc53e047fccca5600f15d3f47d6aa9656ab5b862eec870a3ee2a200249d6e51"
pageSha256: "1dc53e047fccca5600f15d3f47d6aa9656ab5b862eec870a3ee2a200249d6e51"
contentMode: "local-full"
zh: ""
---

# 会员 RFM 分层预览

合成数据定义：R=距最近消费天数，越小越好；F=12个月有效订单数；M=12个月实付金额。各指标按五分位打1—5分，退款订单和内部测试账号排除。

| 人群 | 规则示例 | 人数占比 | GMV占比 | 近90天流失率 |
|---|---|---:|---:|---:|
| 核心价值 | R≥4,F≥4,M≥4 | 14% | 38% | 5% |
| 高价值流失预警 | R≤2,F≥4,M≥4 | 8% | 19% | 42% |
| 高频低价潜力 | R≥3,F≥4,M≤2 | 17% | 9% | 11% |
| 新客培育 | R≥4,F≤2 | 21% | 7% | 18% |
| 一般维持 | 其余中段 | 25% | 20% | 24% |
| 沉睡 | R=1,F≤2 | 15% | 7% | 78% |

**高价值流失预警：**客户经理一对一回访（中成本）；按历史品类给补货提醒（低成本）；服务问题用户优先补偿而非普发券（中成本）。
**高频低价潜力：**组合装阶梯价（低成本）；满额免运门槛实验（低成本）；高频品类订阅测试（中成本）。

## 下月复算口径

快照日固定为月末23:59；R按自然日；F按去重后的支付订单；M按实付减退款；分位点由全体有效会员重算，同时保存阈值版本。流失定义为过去90天无支付，而不是“没有打开App”。

正式8万用户运行前要检查一人多账号、跨店会员合并、退款跨期和金额币种。本预览不能作为真实营销名单。
