---
title: "Java后端简历筛选预览"
sourceId: "04-work/awesome-workbuddy"
sourceTitle: "办公 Agent 生态清单（awesome-workbuddy）"
sourceKind: "清单与速查"
licenseLabel: "可转载"
lang: "中文"
tier: 2
volume: "04-work"
sourceUrl: "https://github.com/staruhub/awesome-workbuddy"
entryUrl: "https://github.com/staruhub/awesome-workbuddy/blob/e32b6c953154e41f6cb4e6b69fd7d933f5cef3d3/prompts/runs/prompt-092-chatgpt-5-6-sol-20260731/output.md"
sourceRel: "prompts/runs/prompt-092-chatgpt-5-6-sol-20260731/output.md"
rawUrl: "/raw/04-work/awesome-workbuddy/prompts/runs/prompt-092-chatgpt-5-6-sol-20260731/output.md"
sourceSha256: "3f9cb64438416fd709471eb4c21eccdfac2cfcf99cec0a16fadae5d93f03abde"
pageSha256: "3f9cb64438416fd709471eb4c21eccdfac2cfcf99cec0a16fadae5d93f03abde"
contentMode: "local-full"
zh: ""
---

# Java后端简历筛选预览

合成JD重点：Java/Spring、数据库与并发、支付或订单经验、可观测性；学校、年龄、性别不进入评分。

| 候选人 | 匹配度 | 证据 | 建议 |
|---|---:|---|---|
| C01 | 8.7 | 订单系统3年；主导幂等改造；有压测数据 | 约面 |
| C02 | 7.9 | Spring扎实；数据库优化明确；支付经验弱 | 约面 |
| C03 | 6.8 | 项目规模合适；职责描述模糊；无监控证据 | 人才库 |
| C04 | 5.2 | 技能词匹配；缺可验证项目结果 | 婉拒 |
| C05 | 人工复核 | PDF两页识别失败 | 不自动结论 |

## C01推荐意见

简历显示其负责日均80万单订单服务，描述了重复下单从0.12%降至0.01%的措施，并给出数据库唯一键和幂等状态机细节；与JD核心任务匹配。需要面试核实其个人贡献、数据口径和故障处置深度。

面试三问：高峰重复请求如何保证只扣一次？数据一致性与可用性冲突时怎么取舍？讲一次监控未发现但用户先发现的问题。

## 评分规则

岗位相关经历40%、问题深度25%、结果证据20%、协作与表达15%。公司名气不加分；空泛“参与高并发项目”不算证据；职业空档不自动扣分。

真实60份任务要逐份读取原文并保留文件名、页码和评分依据；识别不清进入人工复核，不猜测。当前结果不涉及真实求职者，也不能用于招聘决定。
