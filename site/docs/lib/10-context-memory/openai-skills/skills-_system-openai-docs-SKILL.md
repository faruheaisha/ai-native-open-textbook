---
title: "OpenAI Docs"
sourceId: "10-context-memory/openai-skills"
sourceTitle: "Agent Skills"
sourceKind: "技能与配置库"
licenseLabel: "仅引用"
lang: "英文"
tier: 3
volume: "10-context-memory"
sourceUrl: "https://github.com/openai/skills"
entryUrl: "https://github.com/openai/skills/blob/49f948faa9258a0c61caceaf225e179651397431/skills/.system/openai-docs/SKILL.md"
sourceRel: "skills/.system/openai-docs/SKILL.md"
rawUrl: "/raw/10-context-memory/openai-skills/skills/.system/openai-docs/SKILL.md"
sourceSha256: "669a42ccf3323fe0ceda6e466730bcb05dddf1e0c220d6523ea504909fc49165"
pageSha256: "669a42ccf3323fe0ceda6e466730bcb05dddf1e0c220d6523ea504909fc49165"
contentMode: "local-full"
zh: ""
---

# OpenAI Docs

Provide authoritative, current guidance from OpenAI developer docs using the developers.openai.com MCP server. "Docs MCP" means `mcp__openaiDeveloperDocs__search_openai_docs` and `mcp__openaiDeveloperDocs__fetch_openai_doc`; for API reference, schema, parameter, or required-field questions, also use `mcp__openaiDeveloperDocs__get_openapi_spec` when available. Official-domain web search is fallback after those tools are unavailable or unhelpful. Broad Codex questions use the manual helper before Docs MCP. This skill also owns model selection, API model migration, and prompt-upgrade guidance.

## API Key Setup

For requests to build, run, configure, debug, or implement an API-backed app, script, CLI, generator, or tool, use `openai-platform-api-key` first when available. After that credential gate is resolved, return here for current docs as needed.

Use this skill directly for docs-only questions, citations, model/API guidance, conceptual explanations, and examples that do not require building or running an API-backed artifact.

## Workflow Configuration

### Source Priority

- For Codex self-knowledge, use the Codex source route below; it owns when to use the manual helper, Docs MCP, or bounded uncertainty.
- For non-Codex OpenAI docs questions, use `mcp__openaiDeveloperDocs__search_openai_docs` to find the most relevant doc pages.
- For non-Codex OpenAI docs questions, fetch the relevant page with `mcp__openaiDeveloperDocs__fetch_openai_doc` before answering. If search is noisy, run a narrower Docs MCP search; when any plausible official OpenAI docs URL is known or found, try fetching that URL through Docs MCP before relying on web-search content.
- For API reference, schema, parameter, or required-field questions, use `mcp__openaiDeveloperDocs__get_openapi_spec` when available to verify the API shape alongside the relevant guide or reference page.
- Use `mcp__openaiDeveloperDocs__list_openai_docs` only when you need to browse or discover non-Codex pages without a clear query.
- For model-selection, "latest model", or default-model questions, fetch `https://developers.openai.com/api/docs/guides/latest-model.md` first. If that is unavailable, load `references/latest-model.md`.
- For model upgrades or prompt upgrades, run `node scripts/resolve-latest-model-info.js` only when the target is latest/current/default or otherwise unspecified; otherwise preserve the explicitly requested target.
- Preserve explicit target requests: if the user names a target model like "migrate to GPT-5.4", keep that requested target even if `latest-model.md` names a newer model. Mention newer guidance only as optional.
- If current remote guidance is needed, fetch both the returned migration and prompting guide URLs directly. If direct fetch fails, use MCP/search fallback; if that also fails, use bundled fallback references and disclose the fallback.

## OpenAI product snapshots

1. Apps SDK: Build ChatGPT apps by providing a web component UI and an MCP server that exposes your app's tools to ChatGPT.
2. Responses API: A unified endpoint designed for stateful, multimodal, tool-using interactions in agentic workflows.
3. Chat Completions API: Generate a model response from a list of messages comprising a conversation.
4. Codex: OpenAI's coding agent for software development that can write, understand, review, and debug code.
5. gpt-oss: Open-weight OpenAI reasoning models (gpt-oss-120b and gpt-oss-20b) released under the Apache 2.0 license.
6. Realtime API: Build low-latency, multimodal experiences including natural speech-to-speech conversations.
7. Agents SDK: A toolkit for building agentic apps where a model can use tools and context, hand off to other agents, stream partial results, and keep a full trace.

## Codex self-knowledge

Use this path for questions about Codex itself: configuring, extending, operating, troubleshooting, local state, product surfaces, or where Codex behavior should live. A codebase merely mentioning a plugin, skill, hook, MCP server, browser, or automation is not enough. For generic software tasks, answer the software task directly; if asked whether Codex self-knowledge applies, answer that meta question briefly and continue the requested artifact.

### Source Route

The Codex manual is the first source for broad Codex synthesis. Treat the manual and Docs MCP as different lanes, not interchangeable official-doc sources. For published-user Codex product answers, the source route is complete: the manual, Docs MCP when this route calls for it, official OpenAI web fallback, and callable capabilities surfaced in the current session when the question is about that capability. Knowledge bases outside developers.openai.com are outside this route for public product answers.

For broad Codex behavior, setup, customization, skills, plugins, MCP, hooks, `AGENTS.md`, automations, surfaces, local state, or system-map questions:

1. Reuse a same-thread manual and outline path when it is still fresh.
2. Otherwise run the skill-local helper first in normal writable sessions. Skip it without trying only when the session is explicitly read-only, shell execution is unavailable, or visible policy shows no allowed temp cache.
3. By default, the helper chooses the first usable temp cache dir in this order: `$TMPDIR/openai-docs-cache`, `%TEMP%\openai-docs-cache`, `%TMP%\openai-docs-cache`, `/private/tmp/openai-docs-cache`, then `/tmp/openai-docs-cache`. Workspace-only write access is not enough for this temp cache.
