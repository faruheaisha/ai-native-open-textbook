---
title: "数据中台项目风险登记预览"
sourceId: "04-work/awesome-workbuddy"
sourceTitle: "办公 Agent 生态清单（awesome-workbuddy）"
sourceKind: "清单与速查"
licenseLabel: "可转载"
lang: "中文"
tier: 2
volume: "04-work"
sourceUrl: "https://github.com/staruhub/awesome-workbuddy"
entryUrl: "https://github.com/staruhub/awesome-workbuddy/blob/e32b6c953154e41f6cb4e6b69fd7d933f5cef3d3/prompts/runs/prompt-062-chatgpt-5-6-sol-20260731/output.md"
sourceRel: "prompts/runs/prompt-062-chatgpt-5-6-sol-20260731/output.md"
rawUrl: "/raw/04-work/awesome-workbuddy/prompts/runs/prompt-062-chatgpt-5-6-sol-20260731/output.md"
sourceSha256: "0a1cc610c667f8443180f6a3821ef9ccbe7937a2aad70b52b970011314204b41"
pageSha256: "0a1cc610c667f8443180f6a3821ef9ccbe7937a2aad70b52b970011314204b41"
contentMode: "local-full"
zh: ""
---

# 数据中台项目风险登记预览

合成评分：概率1—5、影响1—5，风险值为两者乘积。下表展示Top5，完整版本应覆盖技术、进度、人员、外部依赖各至少5条。

| 风险 | 类别 | 概率 | 影响 | 风险值 | 触发信号 | 应对 |
|---|---|---:|---:|---:|---|---|
| 指标口径无人签字 | 人员 | 5 | 5 | 25 | 同指标出现3种定义 | 设业务Owner |
| 源系统接口延期 | 外部 | 4 | 5 | 20 | 两周无联调环境 | Mock+升级 |
| 历史数据质量差 | 技术 | 4 | 4 | 16 | 抽样错误率>5% | 分域治理 |
| 核心工程师单点 | 人员 | 3 | 5 | 15 | 仅1人能部署 | 双人值班+文档 |
| 范围持续增加 | 进度 | 4 | 3 | 12 | 每周新增>3项P0 | 变更委员会 |

## 项目委员会摘要

最大风险不是“平台性能”，而是指标与责任不清。建议启动会先冻结首期三个业务域，每个域明确数据Owner、口径签字人和验收样例。技术压测应在真实量级下进行，但不在一期提前建设全公司所有数据。

## 预警动作

- 风险值≥15每周汇报，≥20由Sponsor持有；
- 触发信号出现后24小时内转为issue并指定截止；
- 应对完成不等于风险消失，需要复测触发指标；
- 风险条目必须有最后更新时间，超过两周未更新标红。

正式登记表需要读取立项书并让团队补充，当前风险与分值均为合成，不代表真实项目判断。
