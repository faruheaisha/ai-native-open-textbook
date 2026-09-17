---
title: "App 签到功能 PRD 预览"
sourceId: "04-work/awesome-workbuddy"
sourceTitle: "办公 Agent 生态清单（awesome-workbuddy）"
sourceKind: "清单与速查"
licenseLabel: "可转载"
lang: "中文"
tier: 2
volume: "04-work"
sourceUrl: "https://github.com/staruhub/awesome-workbuddy"
entryUrl: "https://github.com/staruhub/awesome-workbuddy/blob/e32b6c953154e41f6cb4e6b69fd7d933f5cef3d3/prompts/runs/prompt-023-chatgpt-5-6-sol-20260731/output.md"
sourceRel: "prompts/runs/prompt-023-chatgpt-5-6-sol-20260731/output.md"
rawUrl: "/raw/04-work/awesome-workbuddy/prompts/runs/prompt-023-chatgpt-5-6-sol-20260731/output.md"
sourceSha256: "76b2f3fa85e1b6814c06fb69ed329cc01a5f350e6379d0966043cd5e371e636b"
pageSha256: "76b2f3fa85e1b6814c06fb69ed329cc01a5f350e6379d0966043cd5e371e636b"
contentMode: "local-full"
zh: ""
---

# App 签到功能 PRD 预览

## 目标

北极星指标：签到用户次日有效内容消费率，而非“签到次数”。合成基线为28%，首期目标提升2个百分点；护栏指标为作弊拦截误伤率低于0.5%、奖励成本每活跃用户低于0.08元。

| 用户故事 | 优先级 | 验收 |
|---|---|---|
| 用户每天完成一次签到并看到奖励 | P0 | 同一账号同一自然日仅成功一次 |
| 连续签到获得递增积分 | P0 | 中断后次日从第1天重算 |
| 漏签补签 | P1 | 每月最多2次，消耗积分 |
| 好友助力 | P2 | 首期不做，防刷成本过高 |

## 规则

每日00:00按用户账号时区刷新；第1—7天奖励为1、1、2、2、3、3、5积分，7天后循环。接口必须幂等，客户端动画失败不影响服务端结果。弱网重复点击返回同一签到记录。

## 防刷与异常

- 设备、账号、IP只作组合风险信号，不因单一共享网络封禁；
- 奖励发放失败写入补偿队列，用户页显示“处理中”；
- 时区修改24小时内不重复获得奖励；
- 积分成本达到日预算90%时告警，不自动砍已承诺奖励。

## 埋点

sign_view、sign_click、sign_success、reward_arrive、content_consume_24h；均带experiment_id和连续天数。

待业务确认：奖励是否过期、补签是否首期上线、未成年人是否有差异规则。本次未联网核查主流案例，因此不列虚构竞品机制；正式PRD应补五个真实产品证据卡再做取舍。
