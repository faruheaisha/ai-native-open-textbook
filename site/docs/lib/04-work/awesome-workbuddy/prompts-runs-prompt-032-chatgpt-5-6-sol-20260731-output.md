---
title: "项目月度汇报 PPT 预览"
sourceId: "04-work/awesome-workbuddy"
sourceTitle: "办公 Agent 生态清单（awesome-workbuddy）"
sourceKind: "清单与速查"
licenseLabel: "可转载"
lang: "中文"
tier: 2
volume: "04-work"
sourceUrl: "https://github.com/staruhub/awesome-workbuddy"
entryUrl: "https://github.com/staruhub/awesome-workbuddy/blob/e32b6c953154e41f6cb4e6b69fd7d933f5cef3d3/prompts/runs/prompt-032-chatgpt-5-6-sol-20260731/output.md"
sourceRel: "prompts/runs/prompt-032-chatgpt-5-6-sol-20260731/output.md"
rawUrl: "/raw/04-work/awesome-workbuddy/prompts/runs/prompt-032-chatgpt-5-6-sol-20260731/output.md"
sourceSha256: "66d77b565952bafe79ffb6732819210b4768fcb06937678f9cf8fb01ec6e2170"
pageSha256: "66d77b565952bafe79ffb6732819210b4768fcb06937678f9cf8fb01ec6e2170"
contentMode: "local-full"
zh: ""
---

# 项目月度汇报 PPT 预览

合成项目整体状态为“黄灯”：范围完成72%，较基线晚6天；质量指标达标，但接口联调和测试资源存在风险。

| 页 | 标题就是结论 | 页面内容 |
|---:|---|---|
| 1 | 项目黄灯，预计仍可守住9月30日上线 | 红黄绿灯与三条判据 |
| 2 | 需求完成72%，较基线落后6天 | 基线/实际里程碑 |
| 3 | 本月交付了支付、会员与权限三个闭环 | 成果卡片 |
| 4 | 联调成为关键路径，缓冲只剩4天 | 燃尽与关键路径 |
| 5 | 测试资源下周缺口1.5人周 | 负荷图 |
| 6 | TOP3风险均已有负责人和期限 | 风险表 |
| 7 | 质量未因赶工下降 | 缺陷趋势 |
| 8 | 预算使用61%，与进度基本匹配 | 成本进度 |
| 9 | 委员会需拍板：砍P1报表还是顺延 | 选项对比 |
| 10 | 未来四周按三个门禁推进 | 路线图 |

## 风险摘录

| 风险 | 概率×影响 | 责任人 | 截止 | 应对 |
|---|---:|---|---|---|
| 第三方接口延迟 | 4×5 | 李工 | 8月5日 | 启用Mock与降级 |
| 测试资源冲突 | 4×4 | 王经理 | 8月2日 | 借调1人 |
| 历史数据质量 | 3×5 | 陈工 | 8月8日 | 抽样与回滚 |

自查发现合成周报写“完成74%”，燃尽数据为72%，已标黄，不能擅自取平均。真实PPT必须只从 ./project 取数，任何估算单独标注，并让委员会清楚看到需要决定什么。
