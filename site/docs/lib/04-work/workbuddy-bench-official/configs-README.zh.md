---
title: "配置体系"
sourceId: "04-work/workbuddy-bench-official"
sourceTitle: "WorkBuddy Bench（腾讯官方评测集）"
sourceKind: "产品仓库"
licenseLabel: "限非商用"
lang: "英文"
tier: 3
volume: "04-work"
sourceUrl: "https://github.com/Tencent/workbuddy-bench"
entryUrl: "https://github.com/Tencent/workbuddy-bench/blob/625b2233093ae4f23e76be28c1f341d41cc70373/README.md"
zh: ""
---

# 配置体系

[English](/lib/04-work/workbuddy-bench-official/configs) | **简体中文**

一次评测 run 的全部输入都在这里。四个子目录各是一层，运行时先 **deep-merge**，
再解析成一份 **resolved manifest JSON**，最后落成传给 Harbor 的 **runtime config
YAML**（后两者区别见下方「产物」）：

```
configs/bench/<dataset_id>.yaml       ← 运行不变量 + 上下文窗口（按数据集）
configs/harnesses/<family>/…          ← 被测 agent CLI 的身份、参数、env
configs/models/<provider>/<slug>.yaml ← 模型身份、后端 URL/KEY env 名、采样参数
configs/jobs/<slug>.yaml              ← 上面三者的组合 + 单次 override
```

合并顺序（后者覆盖前者）：

```
bench/_default.yaml
  → bench/<dataset_id>.yaml
    → harnesses/<family>/<version>.yaml
      → models/<slug>.yaml
        → jobs/<slug>.yaml
```

合并由 `workbuddy_bench.runner.prepare_job` 完成，落成的 runtime config YAML 写到
`.workspace/data/generated/jobs/`（本地、gitignore 的工作目录）。凭据永远不进这些
YAML —— 文件只写 **env 变量名**，真实密钥留在 `.env`。

### 产物：manifest JSON vs runtime config YAML

一次 run 有两个易混淆的产物，路径和用途不同：

- **Resolved manifest JSON** ——
