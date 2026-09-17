---
title: "Tool — Function Calling (client-side)"
sourceId: "10-context-memory/microsoft-skills"
sourceTitle: "Microsoft Agent Skills"
sourceKind: "技能与配置库"
licenseLabel: "可转载"
lang: "英文"
tier: 3
volume: "10-context-memory"
sourceUrl: "https://github.com/microsoft/skills"
entryUrl: "https://github.com/microsoft/skills/blob/cf77b1efbf3117501f4727c476894751311ee885/.github/plugins/azure-skills/skills/microsoft-foundry/foundry-agent/create/references/tools/prompt-agent/tool-function-calling.md"
sourceRel: ".github/plugins/azure-skills/skills/microsoft-foundry/foundry-agent/create/references/tools/prompt-agent/tool-function-calling.md"
rawUrl: "/raw/10-context-memory/microsoft-skills/.github/plugins/azure-skills/skills/microsoft-foundry/foundry-agent/create/references/tools/prompt-agent/tool-function-calling.md"
sourceSha256: "b19eec74f2fc65f5b8747838afbcfa45fe81f54658a6129e8f336f02785ac546"
pageSha256: "b19eec74f2fc65f5b8747838afbcfa45fe81f54658a6129e8f336f02785ac546"
contentMode: "local-full"
zh: ""
---

# Tool — Function Calling (client-side)

Define custom functions the agent can invoke. Your app executes the function and returns results. Runs expire 10 minutes after creation — return tool outputs promptly.

> **Security:** Treat tool arguments as untrusted input. Don't pass secrets in tool output. Use `strict=True` for schema validation.

> **Not available via toolbox** — function calling executes in the client process, so it's declared on the prompt agent, not in a toolbox version.

## Prompt-agent SDK class

`FunctionTool` — wraps a Python callable; the SDK introspects its signature and docstring to build the schema sent to the model.

## References

- [Function Calling tool documentation](https://learn.microsoft.com/azure/foundry/agents/how-to/tools/function-calling)
- [agent-tools.md](/lib/10-context-memory/microsoft-skills/_github-plugins-azure-skills-skills-microsoft-foundry-foundry-agent-create-references-tools-prompt-agent-agent-tools) — tool index
