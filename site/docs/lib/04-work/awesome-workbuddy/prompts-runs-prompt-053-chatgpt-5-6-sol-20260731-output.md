---
title: "客户分级跟进方案预览"
sourceId: "04-work/awesome-workbuddy"
sourceTitle: "办公 Agent 生态清单（awesome-workbuddy）"
sourceKind: "清单与速查"
licenseLabel: "可转载"
lang: "中文"
tier: 2
volume: "04-work"
sourceUrl: "https://github.com/staruhub/awesome-workbuddy"
entryUrl: "https://github.com/staruhub/awesome-workbuddy/blob/e32b6c953154e41f6cb4e6b69fd7d933f5cef3d3/prompts/runs/prompt-053-chatgpt-5-6-sol-20260731/output.md"
sourceRel: "prompts/runs/prompt-053-chatgpt-5-6-sol-20260731/output.md"
rawUrl: "/raw/04-work/awesome-workbuddy/prompts/runs/prompt-053-chatgpt-5-6-sol-20260731/output.md"
sourceSha256: "f95afe3e5a9d221ac27fb4e51c02e194436fd9a4e94bbc1c74aeb974f1ccad81"
pageSha256: "f95afe3e5a9d221ac27fb4e51c02e194436fd9a4e94bbc1c74aeb974f1ccad81"
contentMode: "local-full"
zh: ""
---

# 客户分级跟进方案预览

合成线索12条。分级不是只看销售主观意向：A档需近14天有明确业务问题和下一步；B档有匹配需求但时间未定；C档仅有泛兴趣或超过45天无互动。

| 客户 | 档位 | 最近动作 | 下次日期 | 建议动作 |
|---|---|---|---|---|
| 星河零售 | A | 确认预算口径 | 8月1日 | 电话+定制方案 |
| 云岭科技 | A | 索要安全资料 | 8月2日 | 安全答疑 |
| 海川制造 | B | 内部评估 | 8月5日 | 价值邮件 |
| 青禾咨询 | C | 60天无回复 | 8月28日 | 月度轻触达 |

## A档话术：星河零售

开场：“上次您提到80家门店月底集中退单，我把问题拆成提交校验和预算占用两段。今天想先确认退单量与责任人，再决定是否值得出完整方案。”
不做：重复介绍全部产品；用“月底优惠”逼单；没有客户动作仍维持A档。

## 每周任务规格

每周一09:00读取最新表；生成7天内应跟进、已逾期和缺沟通记录三栏；同一客户只保留最近一项动作；字段缺失时明确失败。IM摘要示例：“本周A档2家、逾期1家；优先处理星河零售预算方案。”

每周清单还应列“为什么现在跟进”，避免销售照表机械触达。当前环境没有销售表、IM或自动化连接，因此未实际创建任务、未推送。正式上线还需确认时区、负责人映射和客户退订偏好。
