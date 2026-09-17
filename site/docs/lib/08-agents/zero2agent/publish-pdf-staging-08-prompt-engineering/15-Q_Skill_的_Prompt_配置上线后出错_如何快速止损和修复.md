---
title: "Zero2Agent：从零实现 Agent"
sourceId: "08-agents/zero2agent"
sourceTitle: "Zero2Agent：从零实现 Agent"
sourceKind: "课时教程"
licenseLabel: "可转载"
lang: "中文"
tier: 2
volume: "08-agents"
sourceUrl: "https://github.com/ranxi2001/zero2Agent"
entryUrl: "https://github.com/ranxi2001/zero2Agent/blob/46e9f7c28f84f54b2f6e45681d14989f01e18291/publish-pdf/staging/08-prompt-engineering.md"
sourceRel: "publish-pdf/staging/08-prompt-engineering.md"
rawUrl: "/raw/08-agents/zero2agent/publish-pdf/staging/08-prompt-engineering.md"
sourceSha256: "d712b57348415001dc95647a70207bec02aaff7ce2fa002468a87ac72874651a"
pageSha256: "f10685a9dc7257e5009a24f88d2a75103a0cf13a0ab42909aac3025a1b678ac4"
contentMode: "local-full"
zh: ""
---

## Q：Skill 的 Prompt 配置上线后出错，如何快速止损和修复？

> 来源：百度/秋招后端一面

**新手答**：“马上修改 Prompt，再重新发布。”

**高手答**：

Skill Prompt 必须像代码一样发布，而不是直接覆盖数据库文本。每个版本绑定 Prompt、工具 schema、模型参数、评测结果和变更人；线上通过版本指针切换，旧版本保持可回滚。

止损顺序是：先关闭该 Skill 的自动路由或切回稳定版本，再限制高风险工具权限；随后用 trace 复现 badcase，判断是描述、指令、schema 还是模型版本导致。修复版先跑该 Skill 的专项集和全局路由回归集，再小流量灰度。监控任务成功率、误路由率、工具错误率和人工接管率，超过阈值自动回滚。

紧急手改 Prompt 只能作为临时措施，且必须留下审计记录和到期时间，避免“临时补丁”永久存在。

**差距在哪**：新手只想到改文本，高手把 Prompt 纳入版本、评测、灰度、熔断和回滚体系。面试官考的是 Skill 配置的生产发布能力。
