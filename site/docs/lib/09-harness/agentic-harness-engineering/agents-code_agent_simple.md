---
title: "codeagentsimple"
sourceId: "09-harness/agentic-harness-engineering"
sourceTitle: "Agentic Harness Engineering（论文与实现）"
sourceKind: "工程手册"
licenseLabel: "可转载"
lang: "中英混排"
tier: 2
volume: "09-harness"
sourceUrl: "https://github.com/china-qijizhifeng/agentic-harness-engineering"
entryUrl: "https://github.com/china-qijizhifeng/agentic-harness-engineering/blob/8b2a55d97590363fe50c3cc6b5e833b020a4bb4c/README.md"
zh: ""
---

# code_agent_simple

仅注册 `run_shell_command` 的精简 NexAU code agent，配置见 `code_agent.yaml`。

## 本地测试

```bash
export LLM_MODEL=... LLM_BASE_URL=... LLM_API_KEY=...
export SANDBOX_WORK_DIR=/tmp/code_agent_work   # 建议
python3 start.py
```

或通过 NexAU CLI（需本目录为工作目录且已安装 `nexau`）：

```bash
nexau run code_agent
```
