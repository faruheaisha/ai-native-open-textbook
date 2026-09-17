---
title: "GSD（Get Shit Done）工作流文档"
sourceId: "10-context-memory/get-shit-done"
sourceTitle: "GSD（Get Shit Done）工作流文档"
sourceKind: "其他材料"
licenseLabel: "可转载"
lang: "英文"
tier: 3
volume: "10-context-memory"
sourceUrl: "https://github.com/gsd-build/get-shit-done"
entryUrl: "https://github.com/gsd-build/get-shit-done/blob/bdcaab2c752d9a33a1a1ca9acf3a3c81fb991815/docs/CONFIGURATION.md"
sourceRel: "docs/CONFIGURATION.md"
rawUrl: "/raw/10-context-memory/get-shit-done/docs/CONFIGURATION.md"
sourceSha256: "3e67baa72c7b00dab65464616eb7f7f38b2c72cad311f0d2b8c6e7ba8e914eb1"
pageSha256: "8efdf2eebf898f2875298f29c7f08cb8e6d0002e66295a9b6e692c373cf0db26"
contentMode: "local-full"
zh: ""
---

## Review Settings

Configure per-CLI model selection for `/gsd-review`. When set, overrides the CLI's default model for that reviewer.

| Setting | Type | Default | Description |
|---------|------|---------|-------------|
| `review.models.gemini` | string | (CLI default) | Model used when `--gemini` reviewer is invoked |
| `review.models.claude` | string | (CLI default) | Model used when `--claude` reviewer is invoked |
| `review.models.codex` | string | (CLI default) | Model used when `--codex` reviewer is invoked |
| `review.models.opencode` | string | (CLI default) | Model used when `--opencode` reviewer is invoked |
| `review.models.qwen` | string | (CLI default) | Model used when `--qwen` reviewer is invoked |
| `review.models.cursor` | string | (CLI default) | Model used when `--cursor` reviewer is invoked |
| `review.models.ollama` | string | (server default) | Model name passed to Ollama when `--ollama` reviewer is invoked. If unset, the first available model reported by the server is used (e.g. `llama3`). Set to a specific tag: `gsd config-set review.models.ollama codellama` |
| `review.models.lm_studio` | string | (server default) | Model name passed to LM Studio when `--lm-studio` reviewer is invoked. If unset, the first available model reported by the server is used. |
| `review.models.llama_cpp` | string | (server default) | Model name passed to llama.cpp when `--llama-cpp` reviewer is invoked. If unset, the first model reported by `/v1/models` is used. |
| `review.default_reviewers` | string[] \| null | (all detected reviewers) | Default reviewer subset for no-flag `/gsd-review`. Example: `["gemini","codex"]`. Explicit flags and `--all` override this setting. |
| `review.max_prompt_tokens` | number\|null | null | Default maximum estimated tokens for the assembled review prompt. When set, the prompt is deterministically trimmed before being sent to each reviewer. Per-reviewer overrides via `review.max_prompt_tokens_per_reviewer` take precedence. null = no trim (current behavior). |
| `review.max_prompt_tokens_per_reviewer` | object | \{\} | Per-reviewer token budget overrides. Keys are reviewer slugs (ollama, llama_cpp, lm_studio, gemini, claude, codex, opencode, qwen, cursor). Values override `review.max_prompt_tokens` for that reviewer. Recommended for local model servers. |
| `review.ollama_host` | string | `http://localhost:11434` | Base URL of the Ollama server. Override when running Ollama on a non-default port or remote host: `gsd config-set review.ollama_host http://192.168.1.10:11434` |
| `review.lm_studio_host` | string | `http://localhost:1234` | Base URL of the LM Studio local server. Override when using a non-default port. |
| `review.llama_cpp_host` | string | `http://localhost:8080` | Base URL of the llama.cpp server (`llama-server`). Override when using a non-default port. |

### Prompt budgets for small-context reviewers

Local model servers (Ollama, llama.cpp, LM Studio) typically accept far fewer tokens than cloud APIs. Setting `review.max_prompt_tokens_per_reviewer` (or the global `review.max_prompt_tokens` fallback) triggers deterministic prompt trimming before the prompt is sent to that reviewer: CONTEXT is dropped first, then RESEARCH, then REQUIREMENTS; PROJECT.md is head-shrunk to the first 40 lines; PLANs are tail-truncated proportionally — instructions and roadmap are always preserved. When a reviewer is trimmed, a disclosure note is injected at the top of the prompt and trim metadata (budget, omitted sections, truncation percentage) is recorded in the REVIEWS.md frontmatter under `trimmed_reviewers`. If even the minimum review set (instructions + roadmap + plan stubs) exceeds the budget, the reviewer is skipped with a warning rather than sending a truncated prompt that would produce misleading feedback.

### Example

```json
{
  "review": {
    "models": {
      "gemini": "gemini-2.5-pro",
      "qwen": "qwen-max"
    }
  }
}
```

Falls back to each CLI's configured default when a key is absent. Added in v1.35.0 (#1849).
