---
title: "Claude Code Ultimate Guide"
sourceId: "09-harness/claude-code-ultimate-guide"
sourceTitle: "Claude Code Ultimate Guide"
sourceKind: "工程手册"
licenseLabel: "可转载"
lang: "英文"
tier: 3
volume: "09-harness"
sourceUrl: "https://github.com/FlorianBruniaux/claude-code-ultimate-guide"
entryUrl: "https://github.com/FlorianBruniaux/claude-code-ultimate-guide/blob/af05b84fb6e32432dae2114ee2a72c44ef3d29b1/guide/ecosystem/mcp-servers-ecosystem.md"
sourceRel: "guide/ecosystem/mcp-servers-ecosystem.md"
rawUrl: "/raw/09-harness/claude-code-ultimate-guide/guide/ecosystem/mcp-servers-ecosystem.md"
sourceSha256: "1875888571dbb7a38db6c0267188775718596a25164159e18ffc2c8999b0a6b2"
pageSha256: "65eab3439a7dba99f7588a58f1c4e8d860878741cacbacc748bd6f9da2f9af93"
contentMode: "local-full"
zh: ""
---

## Production Deployment

### Security Checklist

- [ ] **API keys** stored in `.env`, not in config files
- [ ] **RBAC/permissions** reviewed (especially Kubernetes, Semgrep)
- [ ] **Rate limits** understood (Linear GraphQL complexity, Vercel API)
- [ ] **Fallback mechanisms** for API downtime implemented
- [ ] **Monitoring + logging** enabled for all MCP servers

### Error Handling & Reliability

MCP tools can fail for many reasons, and how you signal those failures to Claude matters. The protocol provides a dedicated mechanism: the `isError` flag in tool responses.

**The `isError` flag**

When a tool call fails, set `isError: true` in the response instead of raising an exception or returning a fake success. This tells Claude the call failed and invites it to decide what to do next: retry, try a different approach, or surface the issue to the user.

```json
{
  "content": [
    {
      "type": "text",
      "text": "Database connection refused: ECONNREFUSED 127.0.0.1:5432"
    }
  ],
  "isError": true
}
```

Without `isError: true`, Claude may interpret the error message as data and continue confidently with a broken state. With it, Claude understands the step failed and can reason about recovery.

**Error taxonomy: four categories**

Different failure types warrant different recovery strategies. Structuring your error messages around these four categories makes it easier for Claude to pick the right recovery action:

| Category | When | Claude's expected response | Example |
|----------|------|---------------------------|---------|
| **Transient** | Temporary unavailability, network flap, rate limit | Retry after a delay | `503 Service Unavailable`, timeout |
| **Validation** | Bad input: wrong type, missing field, format error | Fix the input, retry immediately | `invalid date format: expected ISO8601` |
| **Business** | Correct input but operation not permitted by domain rules | Escalate or skip | `cannot delete: record has active dependencies` |
| **Permission** | Caller lacks authorization | Stop and explain to user | `403 Forbidden: insufficient scope` |

**Implementation pattern**

Include the category in your error messages so Claude can act without guessing:

```python
def call_tool(params):
    try:
        result = execute(params)
        return {"content": [{"type": "text", "text": result}], "isError": False}
    except NetworkError as e:
        return {
            "content": [{"type": "text", "text": f"[transient] {e}. Retry in a few seconds."}],
            "isError": True
        }
    except ValidationError as e:
        return {
            "content": [{"type": "text", "text": f"[validation] {e}. Check the input format."}],
            "isError": True
        }
    except PermissionError as e:
        return {
            "content": [{"type": "text", "text": f"[permission] {e}. Cannot proceed without elevated access."}],
            "isError": True
        }
    except BusinessError as e:
        return {
            "content": [{"type": "text", "text": f"[business] {e}. Operation not permitted by domain rules."}],
            "isError": True
        }
```

Transient errors are the only category where automatic retry makes sense. Validation errors should be retried with corrected input, not blindly. Business and permission errors should stop and surface to the user rather than loop.

### Tool Description Design Patterns

Tool descriptions are the most impactful part of an MCP server. Claude uses them to decide which tool to call. A vague or overlapping description causes misrouting more reliably than any other design mistake.

**The core problem: overlapping descriptions cause misrouting**

Two tools with similar-sounding descriptions create ambiguity. Claude will pick one, often inconsistently, because it's guessing from the description which one applies.

```json
// Bad — ambiguous, Claude will guess
{ "name": "analyze_content", "description": "Analyzes content" }
{ "name": "analyze_document", "description": "Analyzes document content" }

// Good — each description carves out a specific input type
{ "name": "analyze_content", "description": "Analyzes raw text strings or inline content (not files). Use for clipboard content, API responses, or text passed directly as a string." }
{ "name": "analyze_document", "description": "Analyzes content from a file path or URL. Use when the content lives on disk or at a remote endpoint, not when you already have the text in memory." }
```

The test: can you read the description alone and know exactly when NOT to use this tool? If not, add the boundary.

**Description anatomy**

A good tool description has three parts, in this order:

1. **What it does**: one sentence, present tense, action verb
2. **What it takes**: the key input type or constraint (file path vs string, single vs batch)
3. **When to use it vs similar tools**: the decision boundary, explicitly stated

```json
{
  "name": "search_codebase",
  "description": "Searches source code files by regex pattern across the repository. Use for finding symbol definitions, function calls, and string literals in code. Not for searching documentation, configs, or prose — use search_docs for those."
}
```

**Naming conventions that prevent misrouting**

| Pattern | Example pair | Why it works |
|---------|-------------|--------------|
| Verb distinguishes intent | `get_user` vs `search_users` | Fetch known ID vs discover by criteria |
| Noun distinguishes input type | `analyze_file` vs `analyze_text` | Path on disk vs inline string |
| Scope suffix | `list_tickets` vs `list_project_tickets` | Global vs scoped |
| Action granularity | `create_record` vs `bulk_create_records` | One vs batch |

Avoid synonyms as tool names: `fetch`, `get`, `retrieve` all mean the same thing to Claude. Pick one verb family per semantic operation.

**Anti-patterns to avoid**

- **Generic verbs without scope**: `process`, `handle`, `manage` tell Claude nothing about when to call the tool
- **Missing the boundary**: "Searches the database." Which database? All of it? A specific table?
- **Boolean flags that change semantics**: A tool that does completely different things based on a flag should be two tools
- **Descriptions longer than 3 sentences**: If you need more, the tool does too much

**`input_examples` as a complement**

When a schema isn't enough to express which parameter combinations are valid or typical, add `input_examples` (supported by Anthropic API since February 2026). These show Claude concrete usage patterns, especially useful for optional parameters:

```json
{
  "name": "create_ticket",
  "input_examples": [
    { "title": "Login page 500 error", "priority": "critical", "assignee": "oncall" },
    { "title": "Add dark mode toggle", "priority": "low" },
    { "title": "Update API docs for v2.1" }
  ]
}
```

Examples teach what the description can't: that `assignee` is only set for critical items, and `priority` can be omitted for routine tasks.
