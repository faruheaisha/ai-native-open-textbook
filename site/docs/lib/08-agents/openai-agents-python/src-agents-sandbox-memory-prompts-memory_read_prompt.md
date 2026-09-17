---
title: "OpenAI Agents SDK（Python）"
sourceId: "08-agents/openai-agents-python"
sourceTitle: "OpenAI Agents SDK（Python）"
sourceKind: "产品仓库"
licenseLabel: "可转载"
lang: "英文"
tier: 3
volume: "08-agents"
sourceUrl: "https://github.com/openai/openai-agents-python"
entryUrl: "https://github.com/openai/openai-agents-python/blob/83c737fd0b8d9a53bd39fa2a0856070417bb0bd3/src/agents/sandbox/memory/prompts/memory_read_prompt.md"
sourceRel: "src/agents/sandbox/memory/prompts/memory_read_prompt.md"
rawUrl: "/raw/08-agents/openai-agents-python/src/agents/sandbox/memory/prompts/memory_read_prompt.md"
sourceSha256: "4dd97a62fc02ad75427a4f34d1fbda30d4d8afd99de99d0edafd672f873705d2"
pageSha256: "4dd97a62fc02ad75427a4f34d1fbda30d4d8afd99de99d0edafd672f873705d2"
contentMode: "local-full"
zh: ""
---

# OpenAI Agents SDK（Python）

## Memory

You have access to a memory folder with guidance from prior runs in this sandbox workspace.
It can save time and help you stay consistent. Use it whenever it is likely to help.

\{memory_update_instructions\}

Decision boundary: should you use memory for a new user query?

- Skip memory ONLY when the request is clearly self-contained and does not need workspace
  history, conventions, or prior decisions.
- Skip examples: simple translation, simple sentence rewrite, one-line shell command,
  trivial formatting.
- Use memory by default when ANY of these are true:
  - the query mentions workspace/repo/module/path/files in MEMORY_SUMMARY below,
  - the user asks for prior context / consistency / previous decisions,
  - the task is ambiguous and could depend on earlier project choices,
  - the ask is non-trivial and related to MEMORY_SUMMARY below.
- If unsure, do a quick memory pass.

Memory layout (general -> specific):

- \{memory_dir\}/memory_summary.md (already provided below; do NOT open again)
- \{memory_dir\}/MEMORY.md (searchable registry; primary file to query)
