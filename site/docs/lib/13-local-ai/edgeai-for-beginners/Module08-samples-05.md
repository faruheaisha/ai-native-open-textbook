---
title: "Session 5 Sample: Multi-Agent Orchestration"
sourceId: "13-local-ai/edgeai-for-beginners"
sourceTitle: "EdgeAI for Beginners"
sourceKind: "系统课程"
licenseLabel: "可转载"
lang: "英文"
tier: 1
volume: "13-local-ai"
sourceUrl: "https://github.com/microsoft/edgeai-for-beginners"
entryUrl: "https://github.com/microsoft/edgeai-for-beginners/blob/e88f123a4bb5796594919db3a13257c429d1288c/Module08/samples/05/README.md"
sourceRel: "Module08/samples/05/README.md"
rawUrl: "/raw/13-local-ai/edgeai-for-beginners/Module08/samples/05/README.md"
sourceSha256: "04b7ddec9e6f96e9f75cc4ae5e76a642f4585b6d129969e83d301bfea1be8a4d"
pageSha256: "04b7ddec9e6f96e9f75cc4ae5e76a642f4585b6d129969e83d301bfea1be8a4d"
contentMode: "local-full"
zh: ""
---

# Session 5 Sample: Multi-Agent Orchestration

This sample demonstrates a coordinator + specialists pattern using Foundry Local’s OpenAI-compatible endpoint.

## Run (cmd.exe)
```cmd
cd Module08
.\.venv\Scripts\activate
foundry model run phi-4-mini
python -m samples.05.agents.coordinator
```

## Validate
```cmd
curl http://localhost:8000/v1/models
```

## Troubleshooting
- If VS Code flags `import specialists` unresolved in `coordinator.py`, ensure you run as a module and the interpreter points to `Module08/.venv`:
	- Run: `python -m samples.05.agents.coordinator`
	- Select interpreter: `Module08/.venv/Scripts/python.exe` (Ctrl+Shift+P → Python: Select Interpreter)

## References
- Foundry Local (Learn): https://learn.microsoft.com/azure/ai-foundry/foundry-local/
- Azure AI Agents overview: https://learn.microsoft.com/azure/ai-services/agents/overview
- Function calling sample (Foundry Local): https://github.com/microsoft/Foundry-Local/tree/main/samples/python/functioncalling
