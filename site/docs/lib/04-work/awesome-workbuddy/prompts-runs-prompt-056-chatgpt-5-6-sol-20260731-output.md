---
title: "收件箱清理结果预览"
sourceId: "04-work/awesome-workbuddy"
sourceTitle: "办公 Agent 生态清单（awesome-workbuddy）"
sourceKind: "清单与速查"
licenseLabel: "可转载"
lang: "中文"
tier: 2
volume: "04-work"
sourceUrl: "https://github.com/staruhub/awesome-workbuddy"
entryUrl: "https://github.com/staruhub/awesome-workbuddy/blob/e32b6c953154e41f6cb4e6b69fd7d933f5cef3d3/prompts/runs/prompt-056-chatgpt-5-6-sol-20260731/output.md"
sourceRel: "prompts/runs/prompt-056-chatgpt-5-6-sol-20260731/output.md"
rawUrl: "/raw/04-work/awesome-workbuddy/prompts/runs/prompt-056-chatgpt-5-6-sol-20260731/output.md"
sourceSha256: "960607dd27f6798fb04356ef8958cbdbc9bde1b9133a9ab1eceb8d92ff4a32f6"
pageSha256: "960607dd27f6798fb04356ef8958cbdbc9bde1b9133a9ab1eceb8d92ff4a32f6"
contentMode: "local-full"
zh: ""
---

# 收件箱清理结果预览

合成样本20封，按“需要回复、产生任务、仅留档、可退订”分类。没有删除、归档或回复真实邮件。

| 发件人 | 主题 | 分类 | 建议动作 | 截止 |
|---|---|---|---|---|
| 客户A | 合同范围确认 | 必须回复 | 确认两项边界 | 48小时 |
| 财务部 | 7月发票缺失 | 待办跟进 | 补3张凭证 | 周三 |
| 系统通知 | 版本发布成功 | 仅备忘 | 归档到项目 | 无 |
| 营销平台 | 本周精选 | 可退订/垃圾 | 人工确认退订 | 无 |

## 回复草稿

**主题：Re: 合同范围确认**
王经理您好，您列出的接口联调与首轮培训在当前范围内；历史数据手工清理不含在固定费用中。为避免理解不同，我已把两项范围和验收标准写进附件表格。烦请周三前确认，收到后我们按该版本排期。

## 分类规则

“必须回复”要求对方明确等待答复且影响业务；系统生成但含审批链接的邮件进入待办，而非仅备忘；拿不准的一律待办跟进。退订建议按发件频率、近90天打开和业务关系判断，不能只凭“像广告”自动退订。

高频营销发件人只进入“建议退订”清单，不自动操作；同一域名可能同时发送账单和营销邮件，必须按具体订阅识别。真实运行需读取全部200封，输出message_id方便追溯，并在任何实际移动、退订或发送前获得用户确认。本预览没有邮箱权限。
