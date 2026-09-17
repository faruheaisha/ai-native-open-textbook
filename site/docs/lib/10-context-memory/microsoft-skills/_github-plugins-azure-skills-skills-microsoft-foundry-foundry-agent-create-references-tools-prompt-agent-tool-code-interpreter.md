---
title: "Tool — Code Interpreter"
sourceId: "10-context-memory/microsoft-skills"
sourceTitle: "Microsoft Agent Skills"
sourceKind: "技能与配置库"
licenseLabel: "可转载"
lang: "英文"
tier: 3
volume: "10-context-memory"
sourceUrl: "https://github.com/microsoft/skills"
entryUrl: "https://github.com/microsoft/skills/blob/cf77b1efbf3117501f4727c476894751311ee885/.github/plugins/azure-skills/skills/microsoft-foundry/foundry-agent/create/references/tools/prompt-agent/tool-code-interpreter.md"
sourceRel: ".github/plugins/azure-skills/skills/microsoft-foundry/foundry-agent/create/references/tools/prompt-agent/tool-code-interpreter.md"
rawUrl: "/raw/10-context-memory/microsoft-skills/.github/plugins/azure-skills/skills/microsoft-foundry/foundry-agent/create/references/tools/prompt-agent/tool-code-interpreter.md"
sourceSha256: "63c007201e87e53aa7dce5cfcdf4987947dc224e64e5565f9781e9008a2c663d"
pageSha256: "63c007201e87e53aa7dce5cfcdf4987947dc224e64e5565f9781e9008a2c663d"
contentMode: "local-full"
zh: ""
---

# Tool — Code Interpreter

Enables agents to write and run Python in a sandboxed environment. Supports data analysis, chart generation, and file processing. Has [additional charges](https://azure.microsoft.com/pricing/details/cognitive-services/openai-service/) beyond token-based fees.

> Sessions: 1-hour active / 30-min idle timeout. Each conversation = separate billable session.

> ⚠️ When Code Interpreter is used through a toolbox in a **hosted agent**, user isolation isn't supported — all users in the same project share one container context.

## Prompt-agent SDK class

`CodeInterpreterTool` — see [tool-mcp.md](/lib/10-context-memory/microsoft-skills/_github-plugins-azure-skills-skills-microsoft-foundry-foundry-agent-create-references-tools-prompt-agent-tool-mcp) for the general prompt-agent tool-wiring pattern; Code Interpreter takes no constructor arguments.

## Toolbox shape

```json
{ "type": "code_interpreter" }
```

No other fields. Only one `code_interpreter` per toolbox version (unnamed tool).

## References

- [Code Interpreter tool documentation](https://learn.microsoft.com/azure/foundry/agents/how-to/tools/code-interpreter)
- [agent-tools.md](/lib/10-context-memory/microsoft-skills/_github-plugins-azure-skills-skills-microsoft-foundry-foundry-agent-create-references-tools-prompt-agent-agent-tools) — tool index
