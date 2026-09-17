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
entryUrl: "https://github.com/ranxi2001/zero2Agent/blob/46e9f7c28f84f54b2f6e45681d14989f01e18291/publish-pdf/staging/03-fault-tolerance.md"
sourceRel: "publish-pdf/staging/03-fault-tolerance.md"
rawUrl: "/raw/08-agents/zero2agent/publish-pdf/staging/03-fault-tolerance.md"
sourceSha256: "3d3fec6536b92234d38c933ae3738bd2e2f0687c81d39b5421d097eec7da0e12"
pageSha256: "331ac188ca838d9e388077a315cef00444c882da2c693e60c4f77cac0944d240"
contentMode: "local-full"
zh: ""
---

## Q：Agent 系统中网络抖动 vs 真实故障，如何区分判断？

> 来源：滴滴AI agent开发日常实习

**新手答**：”报错了就重试，重试几次还不行就报故障。”

**高手答**：

这是 Agent 做运维排障场景下的核心判断问题。区分策略：
1. **时间窗口观测**：网络抖动通常是短暂的（秒级），真实故障是持续的。设置观测窗口（如 5 分钟），如果异常在窗口内自动恢复→抖动，持续异常→故障
2. **多维度交叉验证**：不只看单一接口的报错，还要看同一链路上其他服务是否正常、是否有同时段的网络层告警（丢包率、延迟突增）
3. **指标模式匹配**：抖动的特征是”脉冲式”（突然升高又回落），故障的特征是”阶跃式”（升高后不回落）。用滑动窗口统计错误率模式
4. **重试结果分析**：重试成功率>80%→大概率抖动；重试全部失败→故障
5. **历史基线对比**：和同时段历史数据对比，判断是否在正常波动范围内

**差距在哪**：面试官考察的是你对 Agent 执行环境不确定性的理解——Agent 不能一报错就触发告警，需要有”置信度判断”能力。
