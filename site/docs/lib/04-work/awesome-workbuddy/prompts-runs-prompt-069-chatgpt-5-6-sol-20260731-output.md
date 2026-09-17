---
title: "官网改版验收核对预览"
sourceId: "04-work/awesome-workbuddy"
sourceTitle: "办公 Agent 生态清单（awesome-workbuddy）"
sourceKind: "清单与速查"
licenseLabel: "可转载"
lang: "中文"
tier: 2
volume: "04-work"
sourceUrl: "https://github.com/staruhub/awesome-workbuddy"
entryUrl: "https://github.com/staruhub/awesome-workbuddy/blob/e32b6c953154e41f6cb4e6b69fd7d933f5cef3d3/prompts/runs/prompt-069-chatgpt-5-6-sol-20260731/output.md"
sourceRel: "prompts/runs/prompt-069-chatgpt-5-6-sol-20260731/output.md"
rawUrl: "/raw/04-work/awesome-workbuddy/prompts/runs/prompt-069-chatgpt-5-6-sol-20260731/output.md"
sourceSha256: "469c411a409b14d67f1f34eb8708f695b666d8f0f3e5f578e00ada92e1e9a76e"
pageSha256: "469c411a409b14d67f1f34eb8708f695b666d8f0f3e5f578e00ada92e1e9a76e"
contentMode: "local-full"
zh: ""
---

# 官网改版验收核对预览

| 条款 | 验收要求 | 证据 | 状态 | 结论 |
|---|---|---|---|---|
| 4.1 | Chrome/Edge最新两版可用 | 测试报告T-01 | 满足 | 通过 |
| 4.2 | 首屏LCP≤2.5秒 | 实测3.1秒 | 不满足 | 整改 |
| 4.3 | 10个页面可编辑 | CMS仅8页 | 不满足 | 整改 |
| 5.1 | 源码及部署文档 | 源码ZIP、README | 人工复核 | 查可复现性 |
| 5.3 | 90天缺陷维护 | 服务承诺函 | 满足 | 通过 |

## 整改通知函摘录

依据合成合同第4.2、4.3条，当前交付在首屏性能和CMS页面覆盖上未达到验收标准。请于收到通知后10个工作日内完成整改并提交复测证据。整改期间不视为我方放弃其他合同权利。

## 验收确认单边界

仅确认第4.1与5.3条满足；第5.1条须由技术人员从空环境完成一次部署后再结论。确认单不能用“整体通过”覆盖未满足项。

人工复核清单：合同版本与盖章页、条款是否有变更附件、性能测试网络条件、源码是否含第三方许可、维护起算日。

复测必须沿用同一设备、网络和脚本，否则3.1秒与2.5秒不可比；源码验收还要核依赖锁文件、构建命令和许可证清单。真实执行必须读取合同与交付包逐项核对，并由法务确认函件。本预览不构成真实验收或法律通知。
