---
title: "README 重写预览"
sourceId: "04-work/awesome-workbuddy"
sourceTitle: "办公 Agent 生态清单（awesome-workbuddy）"
sourceKind: "清单与速查"
licenseLabel: "可转载"
lang: "中文"
tier: 2
volume: "04-work"
sourceUrl: "https://github.com/staruhub/awesome-workbuddy"
entryUrl: "https://github.com/staruhub/awesome-workbuddy/blob/e32b6c953154e41f6cb4e6b69fd7d933f5cef3d3/prompts/runs/prompt-077-chatgpt-5-6-sol-20260731/output.md"
sourceRel: "prompts/runs/prompt-077-chatgpt-5-6-sol-20260731/output.md"
rawUrl: "/raw/04-work/awesome-workbuddy/prompts/runs/prompt-077-chatgpt-5-6-sol-20260731/output.md"
sourceSha256: "fbd747d82e4a88a61cd3aae6e6b09ed542402e2b5bfbf8ebc8087b2338aed048"
pageSha256: "fbd747d82e4a88a61cd3aae6e6b09ed542402e2b5bfbf8ebc8087b2338aed048"
contentMode: "local-full"
zh: ""
---

# README 重写预览

> **RowGuard 在数据进仓前发现列漂移、空值激增和重复主键，并给出可审计报告。**

## 30秒上手

~~~bash
pip install rowguard
rowguard check orders.csv --schema schema.yml
~~~

输出：

~~~text
FAIL  orders.csv
duplicate order_id: 12 rows
missing paid_at: 4.8% (limit 1.0%)
report: ./rowguard-report.html
~~~

| 能力 | 用处 | 证据 |
|---|---|---|
| Schema校验 | 阻止列名/类型漂移 | tests/schema |
| 数据规则 | 检查空值、唯一、范围 | examples/rules |
| HTML报告 | 给非开发者复核 | examples/report |
| CI退出码 | 接入流水线 | docs/ci |

## 安装选择

本地CLI用pip；GitHub Actions复制示例工作流；Python项目可调用API。每条命令必须在干净环境验证后才进入正式README。

## 为什么不是另一个大数据平台

RowGuard合成定位是“小而明确的入仓门禁”，不负责调度、血缘或BI。限制写清楚比“全能”更可信。

贡献流程：先开issue说明规则与失败样例，新增功能需测试和文档。License以仓库真实文件为准。中英文版本保持相同信息架构，不逐句翻译制造差异。

真实重写必须通读代码、运行示例并引用真实路径；本预览不能说明真实项目具备上述功能。
