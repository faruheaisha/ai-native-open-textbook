---
title: "Session 6 Sample: Models as Tools"
sourceId: "13-local-ai/edgeai-for-beginners"
sourceTitle: "EdgeAI for Beginners"
sourceKind: "系统课程"
licenseLabel: "可转载"
lang: "英文"
tier: 1
volume: "13-local-ai"
sourceUrl: "https://github.com/microsoft/edgeai-for-beginners"
entryUrl: "https://github.com/microsoft/edgeai-for-beginners/blob/e88f123a4bb5796594919db3a13257c429d1288c/Module08/samples/06/README.md"
sourceRel: "Module08/samples/06/README.md"
rawUrl: "/raw/13-local-ai/edgeai-for-beginners/Module08/samples/06/README.md"
sourceSha256: "bf33c365c7ce44699ff6e5775921f6e7bdae1dcfd67c3d3e09fa421f3c084aa6"
pageSha256: "bf33c365c7ce44699ff6e5775921f6e7bdae1dcfd67c3d3e09fa421f3c084aa6"
contentMode: "local-full"
zh: ""
---

# Session 6 Sample: Models as Tools

This sample implements a minimal router + tool registry that selects a model based on the user prompt and calls Foundry Local’s OpenAI-compatible endpoint.

## Files
- `router.py`: simple registry and heuristic routing; endpoint discovery + health check.

## Run (cmd.exe)
```cmd
cd Module08
.\.venv\Scripts\activate
REM Start whatever models you plan to route to
foundry model run phi-4-mini
foundry model run qwen2.5-7b
foundry model run deepseek-r1-7b

python samples\06\router.py "Explain how local-first AI improves privacy in two sentences."
```

## Notes
- The router uses simple keyword heuristics to pick between `general`, `reasoning`, and `code` tools and prints `/v1/models` on start.
- Configure via environment variables:
```cmd
set BASE_URL=http://localhost:8000
set API_KEY=
REM Override models per tool
set GENERAL_MODEL=phi-4-mini
set REASONING_MODEL=deepseek-r1-7b
set CODE_MODEL=qwen2.5-7b
REM Or provide a full JSON registry
set TOOL_REGISTRY={"general":{"model":"phi-4-mini"},"reasoning":{"model":"deepseek-r1-7b"},"code":{"model":"qwen2.5-7b"}}
```

## References
- Foundry Local (Learn): https://learn.microsoft.com/azure/ai-foundry/foundry-local/
- Integrate with inference SDKs: https://learn.microsoft.com/azure/ai-foundry/foundry-local/how-to/how-to-integrate-with-inference-sdks
