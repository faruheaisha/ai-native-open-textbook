---
title: "跨项目资源调配预览"
sourceId: "04-work/awesome-workbuddy"
sourceTitle: "办公 Agent 生态清单（awesome-workbuddy）"
sourceKind: "清单与速查"
licenseLabel: "可转载"
lang: "中文"
tier: 2
volume: "04-work"
sourceUrl: "https://github.com/staruhub/awesome-workbuddy"
entryUrl: "https://github.com/staruhub/awesome-workbuddy/blob/e32b6c953154e41f6cb4e6b69fd7d933f5cef3d3/prompts/runs/prompt-064-chatgpt-5-6-sol-20260731/output.md"
sourceRel: "prompts/runs/prompt-064-chatgpt-5-6-sol-20260731/output.md"
rawUrl: "/raw/04-work/awesome-workbuddy/prompts/runs/prompt-064-chatgpt-5-6-sol-20260731/output.md"
sourceSha256: "3bb1e0d0cb380fea0991c43aa85a0e92fad4c50b24e7df8087e7822a372deb2f"
pageSha256: "3bb1e0d0cb380fea0991c43aa85a0e92fad4c50b24e7df8087e7822a372deb2f"
contentMode: "local-full"
zh: ""
---

# 跨项目资源调配预览

标准周可用40小时，会议与运维已先扣除；负荷率=项目分配工时/净可用工时，不用名义40小时制造虚假余量。

| 成员 | 角色 | 第1周 | 第2周 | 第3周 | 第4周 | 状态 |
|---|---|---:|---:|---:|---:|---|
| 李楠 | 后端 | 125% | 118% | 105% | 90% | 超载 |
| 周航 | 数据 | 110% | 120% | 95% | 80% | 超载 |
| 王茜 | 产品 | 85% | 90% | 88% | 82% | 正常 |
| 赵可 | 测试 | 132% | 140% | 115% | 70% | 超载 |
| 陈默 | 前端 | 55% | 58% | 65% | 75% | 前两周闲置 |

单点依赖：只有周航能维护迁移脚本；只有赵可掌握支付回归集。

## 三套方案

| 方案 | 动作 | 项目A | 项目B | 项目C |
|---|---|---|---|---|
| A 保上线 | 陈默转支援自动化，借调测试 | 不变 | 延3天 | 延5天 |
| B 平均摊 | 三项目都降范围 | 延2天 | 延2天 | 延2天 |
| C 外包峰值 | 临时外包回归执行 | 不变 | 不变 | 成本+8万 |

推荐A：项目A有外部承诺，B/C的非关键范围可调整；同时要求周航本周完成迁移脚本结对、赵可录制回归演示，降低单点。正式热力图需读取资源台账并确认休假、支持工作和技能匹配，不能只按人头搬工时。
