---
title: "第 14 讲代码"
sourceId: "09-harness/learn-harness-engineering"
sourceTitle: "Learn Harness Engineering"
sourceKind: "课时教程"
licenseLabel: "可转载"
lang: "英文"
tier: 2
volume: "09-harness"
sourceUrl: "https://github.com/walkinglabs/learn-harness-engineering"
entryUrl: "https://github.com/walkinglabs/learn-harness-engineering/blob/77e7a3e21469dcbece2558086c8d91657abeaa40/docs/zh/lectures/lecture-14-graph-engineering/code/index.md"
sourceRel: "docs/zh/lectures/lecture-14-graph-engineering/code/index.md"
rawUrl: "/raw/09-harness/learn-harness-engineering/docs/zh/lectures/lecture-14-graph-engineering/code/index.md"
sourceSha256: "7b41b063132209588d4db1cf1d1a1d917c8cd065a686cb9b93a9524e6039a64a"
pageSha256: "7b41b063132209588d4db1cf1d1a1d917c8cd065a686cb9b93a9524e6039a64a"
contentMode: "local-full"
zh: ""
---

# 第 14 讲代码

使用此文件夹存放以下方面的示例：

- graph.md 图描述模板（节点 / 边 / 共享状态 / 路由规则）
- node-prompt.md 节点角色 prompt 模板
- routing-rules.md 路由规则模板
- maker_checker_graph.py 参考实现（框架绑定：LangGraph）：把正文"从零构建"六步变成可运行代码——状态定义、节点、边、条件路由、checkpoint。正文示例框架无关，这是其中一种真实落地的写法
- 图控制脚本示例（执行图、检查 checkpoint、触发人工审批）
