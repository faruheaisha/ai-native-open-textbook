---
title: "Python Agent Optimizer in Foundry Patterns"
sourceId: "10-context-memory/microsoft-skills"
sourceTitle: "Microsoft Agent Skills"
sourceKind: "技能与配置库"
licenseLabel: "可转载"
lang: "英文"
tier: 3
volume: "10-context-memory"
sourceUrl: "https://github.com/microsoft/skills"
entryUrl: "https://github.com/microsoft/skills/blob/cf77b1efbf3117501f4727c476894751311ee885/.github/plugins/azure-skills/skills/microsoft-foundry/foundry-agent/agent-optimizer/references/python-patterns.md"
sourceRel: ".github/plugins/azure-skills/skills/microsoft-foundry/foundry-agent/agent-optimizer/references/python-patterns.md"
rawUrl: "/raw/10-context-memory/microsoft-skills/.github/plugins/azure-skills/skills/microsoft-foundry/foundry-agent/agent-optimizer/references/python-patterns.md"
sourceSha256: "e4581a6b29b78a8392c66f77aaec36f8081ed0bebc76b586f3bf0e4da11ba666"
pageSha256: "e4581a6b29b78a8392c66f77aaec36f8081ed0bebc76b586f3bf0e4da11ba666"
contentMode: "local-full"
zh: ""
---

# Python Agent Optimizer in Foundry Patterns

Use the Azure SDK optimization package and a local baseline folder. The baseline is file-based; call `load_config()` without code-level fallback parameters.

## Install and Import

Add `azure-ai-agentserver-optimization` to `requirements.txt` or the project dependency file:

```text
azure-ai-agentserver-optimization
```

Import from the SDK namespace:

```python
from azure.ai.agentserver.optimization import load_config
```

## Baseline Folder

Create `.agent_configs/baseline/` in the agent's service source directory (beside the entry point):

```text
