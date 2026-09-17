---
title: "OpenAI Knowledge"
sourceId: "08-agents/openai-agents-python"
sourceTitle: "OpenAI Agents SDK（Python）"
sourceKind: "产品仓库"
licenseLabel: "可转载"
lang: "英文"
tier: 3
volume: "08-agents"
sourceUrl: "https://github.com/openai/openai-agents-python"
entryUrl: "https://github.com/openai/openai-agents-python/blob/83c737fd0b8d9a53bd39fa2a0856070417bb0bd3/.agents/skills/openai-knowledge/SKILL.md"
sourceRel: ".agents/skills/openai-knowledge/SKILL.md"
rawUrl: "/raw/08-agents/openai-agents-python/.agents/skills/openai-knowledge/SKILL.md"
sourceSha256: "13d20498a52dad2b48697d332324c8c9ee948e0b0acac5cb6b684a15bc48c53e"
pageSha256: "13d20498a52dad2b48697d332324c8c9ee948e0b0acac5cb6b684a15bc48c53e"
contentMode: "local-full"
zh: ""
---

# OpenAI Knowledge

## Overview

Use the OpenAI Developer Documentation MCP server to search and fetch exact docs (markdown), then base your answer on that text instead of guessing.

## Workflow

### 1) Check whether the Docs MCP server is available

If the `mcp__openaiDeveloperDocs__*` tools are available, use them.

If you are unsure, run `codex mcp list` and check for `openaiDeveloperDocs`.

### 2) Use MCP tools to pull exact docs

- Search first, then fetch the specific page or pages.
  - `mcp__openaiDeveloperDocs__search_openai_docs` → pick the best URL.
  - `mcp__openaiDeveloperDocs__fetch_openai_doc` → retrieve the exact markdown (optionally with an `anchor`).
- When you need endpoint schemas or parameters, use:
  - `mcp__openaiDeveloperDocs__get_openapi_spec`
  - `mcp__openaiDeveloperDocs__list_api_endpoints`

Base your answer on the fetched text and quote or paraphrase it precisely. Do not invent flags, field names, defaults, or limits.

### 3) If MCP is not configured, guide setup (do not change config unless asked)

Provide one of these setup options, then ask the user to restart the Codex session so the tools load:

- CLI:
  - `codex mcp add openaiDeveloperDocs --url https://developers.openai.com/mcp`
- Config file (`~/.codex/config.toml`):
  - Add:
    ```toml
    [mcp_servers.openaiDeveloperDocs]
    url = "https://developers.openai.com/mcp"
    ```

Also point to: https://developers.openai.com/resources/docs-mcp#quickstart
