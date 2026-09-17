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
entryUrl: "https://github.com/ranxi2001/zero2Agent/blob/46e9f7c28f84f54b2f6e45681d14989f01e18291/learn-agent-interview/08-prompt-engineering/index.md"
sourceRel: "learn-agent-interview/08-prompt-engineering/index.md"
rawUrl: "/raw/08-agents/zero2agent/learn-agent-interview/08-prompt-engineering/index.md"
sourceSha256: "d742947505870bddb5c387683d51215ba6095898b0fc5efb77e32ec65ffd84c1"
pageSha256: "bb8e89cda358f4ac6f130b6d0fc097f397aa525589698e2f900680ad8fa5417c"
contentMode: "local-full"
zh: ""
---

## Q：Skill 的 Prompt 配置上线后出错，如何快速止损和修复？

> 来源：百度秋招后端一面 【[拼多多 AI 全栈两轮技术面](https://www.nowcoder.com/discuss/921104232256675840)追问：Prompt 模板的版本、测试和灰度】

**新手答**：“马上修改 Prompt，再重新发布。”

**高手答**：

Skill Prompt 必须像代码一样发布，而不是直接覆盖数据库文本。每个版本绑定 Prompt、工具 schema、模型参数、评测结果和变更人；线上通过版本指针切换，旧版本保持可回滚。

止损顺序是：先关闭该 Skill 的自动路由或切回稳定版本，再限制高风险工具权限；随后用 trace 复现 badcase，判断是描述、指令、schema 还是模型版本导致。修复版先跑该 Skill 的专项集和全局路由回归集，再小流量灰度。监控任务成功率、误路由率、工具错误率和人工接管率，超过阈值自动回滚。

紧急手改 Prompt 只能作为临时措施，且必须留下审计记录和到期时间，避免“临时补丁”永久存在。

**追问：Prompt 模板如何版本化管理、自动测试和灰度发布？**

模板版本不能只有一段文本和更新时间。发布制品至少绑定模板内容、变量 schema、模型与采样参数、依赖的工具/知识版本、评测报告和变更人；渲染前校验必填变量、长度和转义，避免模板正确但运行时拼接失败。离线同时跑任务成功集、路由负例、边界输入和安全回归，记录相对稳定版的质量、延迟与成本差异。

线上通过不可变版本和流量规则灰度，同一会话或长任务固定版本，避免中途切换语义。异常先停止扩量，再按任务切片判断是模板、模型还是依赖变更；回滚只移动版本指针，不在线覆盖旧文本。这样测试结果、线上 Trace 和实际模板才能一一对应。

**差距在哪**：新手只想到改文本，高手把 Prompt 纳入版本、评测、灰度、熔断和回滚体系。面试官考的是 Skill 配置的生产发布能力。
