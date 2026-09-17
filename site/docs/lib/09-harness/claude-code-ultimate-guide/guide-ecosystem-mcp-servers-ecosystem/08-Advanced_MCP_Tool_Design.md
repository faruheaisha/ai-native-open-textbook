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
pageSha256: "1dc9f3c67c986193997b48ebeb501fd4ed09f804b4ed37552279ee48ba023ff5"
contentMode: "local-full"
zh: ""
---

## Advanced MCP Tool Design

Beyond basic error taxonomy, three design decisions significantly affect how Claude uses MCP tools in production: error response semantics, the distinction between Resources and Tools, and tool naming.

---

### isRetryable: Application-Level Convention

The MCP specification does not include an `isRetryable` field in the error response schema. However, the convention of embedding retry guidance in `structuredContent` has emerged as a practical pattern for tools that call fallible external services.

```json
{
    "isError": true,
    "content": [
        {
            "type": "text",
            "text": "Database query timed out after 30s. Retrying with the same parameters is likely to succeed."
        }
    ],
    "structuredContent": {
        "error": {
            "code": "DATABASE_TIMEOUT",
            "message": "Query timed out",
            "isRetryable": true,
            "retryAfterMs": 5000,
            "suggestedAction": "Retry the same query after 5 seconds"
        }
    }
}
```

For non-retryable errors:

```json
{
    "isError": true,
    "content": [
        {
            "type": "text",
            "text": "Record not found. No record with ID 'usr_99999' exists in the database."
        }
    ],
    "structuredContent": {
        "error": {
            "code": "RECORD_NOT_FOUND",
            "message": "No record found for ID: usr_99999",
            "isRetryable": false,
            "suggestedAction": "Verify the ID is correct before retrying"
        }
    }
}
```

The `isRetryable` flag is not something Claude reads natively from the MCP spec. It is read by your orchestration layer, which decides whether to retry or escalate. The pattern works because `structuredContent` is machine-readable and your code can check it before Claude does.

---

### isError: false + Empty Content vs isError: true

These two response shapes have completely different semantics. Confusing them causes silent failures that are hard to debug.

| Response | Meaning |
|---|---|
| `isError: false` + non-empty content | Tool succeeded, here is the result |
| `isError: false` + empty content | Tool succeeded, zero results found (legitimate empty state) |
| `isError: true` | Tool failed: the operation could not complete |

```json
// Search returning no results: NOT an error
{
    "isError": false,
    "content": [
        {
            "type": "text",
            "text": "No documents found matching query: 'quarterly report Q5 2024'"
        }
    ]
}

// Search that failed to execute: IS an error
{
    "isError": true,
    "content": [
        {
            "type": "text",
            "text": "Search service unavailable. Could not execute query."
        }
    ]
}
```

When a search returns zero results, Claude should report that to the user and potentially try different terms. When a search fails to execute, Claude should report a tool failure and the orchestrator should consider retrying or escalating. These paths diverge, and only correct error semantics makes them diverge correctly.

---

### MCP Resources vs Tools

Resources and Tools serve different purposes and are controlled by different actors. Mixing them up leads to tools that cannot be indexed and resources that cannot be parameterized.

| Dimension | Resources | Tools |
|---|---|---|
| Who controls access | Application (pre-defined, not model-initiated) | Model (calls as needed during conversation) |
| Parameters | None (read by URI) | Full parameter schema |
| Use case | Read-only data catalog: config files, reference data, documents | Parameterized operations: search, compute, write, API calls |
| Discovery | Listed at startup, browsable | Described in system prompt, called on demand |
| Side effects | None (read-only by convention) | Allowed |
| Example | Company policy document | `search_policy_documents(query, date_range)` |

```python
# Resource: static reference data, application-controlled
@server.list_resources()
async def list_resources():
    return [
        Resource(
            uri="config://database/schema",
            name="Database Schema",
            description="Current production database schema",
            mimeType="application/json"
        ),
        Resource(
            uri="docs://api/reference",
            name="API Reference",
            description="Internal API documentation",
            mimeType="text/markdown"
        )
    ]

@server.read_resource()
async def read_resource(uri: str) -> str:
    if uri == "config://database/schema":
        return json.dumps(get_current_schema())
    elif uri == "docs://api/reference":
        return read_file("docs/api-reference.md")
    raise ValueError(f"Unknown resource: {uri}")

# Tool: parameterized operation, model-controlled
@server.list_tools()
async def list_tools():
    return [
        Tool(
            name="search_database",
            description="Search the database with a structured query",
            inputSchema={
                "type": "object",
                "properties": {
                    "query": {"type": "string"},
                    "table": {"type": "string"},
                    "limit": {"type": "integer", "default": 10}
                },
                "required": ["query", "table"]
            }
        )
    ]
```

**ResourceLink bridge:** When a tool returns a reference to a resource (rather than inline content), use a ResourceLink:

```json
{
    "isError": false,
    "content": [
        {
            "type": "resource",
            "resource": {
                "uri": "docs://reports/Q3-2024",
                "mimeType": "application/pdf",
                "text": "Q3 2024 Financial Report (use read_resource to access full content)"
            }
        }
    ]
}
```

---

### Tool Naming and System Prompt Conflicts

Tool names that appear as keywords in the system prompt cause Claude to associate the tool with unrelated instructions. A tool named `process` will be mentally linked to any occurrence of the word "process" in the system prompt, creating unpredictable activation patterns.

Rules for tool names:
- Use specific, compound names: `search_customer_records` not `search`
- Avoid generic verbs that appear in system prompts: `run`, `process`, `execute`, `handle`, `manage`
- Use underscores, not camelCase or hyphens (MCP convention)
- Prefix with domain when there are many tools: `crm_get_contact`, `crm_update_contact`, `crm_search`

```python
# Bad: generic names that conflict with system prompt keywords
tools = ["search", "process", "run", "execute", "get", "update"]

# Good: specific compound names with domain prefix
tools = [
    "crm_search_contacts",
    "crm_get_contact_by_id",
    "crm_update_contact_status",
    "billing_create_invoice",
    "billing_get_invoice_status"
]
```

---

### Task-Scoped Tool Profiles

Providing every available tool to every agent call is wasteful and increases the risk of unintended writes during read-only phases. Task-scoped tool profiles restrict the available tools based on the current task phase.

```python
TOOL_PROFILES = {
    "exploration": [
        "search_documents",
        "get_document_by_id",
        "list_categories",
        "read_config"
    ],
    "analysis": [
        "search_documents",
        "get_document_by_id",
        "calculate_metrics",
        "compare_versions"
    ],
    "execution": [
        "create_document",
        "update_document",
        "delete_document",
        "send_notification"
    ]
}

def get_tools_for_phase(phase: str) -> list[str]:
    return TOOL_PROFILES.get(phase, TOOL_PROFILES["exploration"])
```

The exploration profile is read-only. The execution profile adds write operations. Claude cannot accidentally call `delete_document` during an analysis phase because the tool simply is not present in the call.

For multi-role systems where different user roles can access different tools, scope at the role level rather than filtering post-call:

```python
ROLE_TOOL_ACCESS = {
    "viewer": ["search_documents", "get_document_by_id"],
    "editor": ["search_documents", "get_document_by_id", "create_document", "update_document"],
    "admin": ["*"]  # all tools
}

def get_tools_for_role(role: str, all_tools: list) -> list:
    if role == "admin":
        return all_tools
    allowed = ROLE_TOOL_ACCESS.get(role, [])
    return [t for t in all_tools if t.name in allowed]
```

Scoped access is particularly valuable for the `verify_fact` tool pattern: a subagent that only needs to verify a single claim can be given only `verify_fact`, reducing both latency (fewer tools to describe in the context) and risk (no write tools in scope).

---

### Quick Start Stack

**MVP (Essentials)**:

1. **Playwright MCP**: E2E testing, web verification
2. **Semgrep MCP**: Security-first coding

**Important Additions**:

3. **Context7 MCP**: API reference accuracy
4. **Linear MCP** (optional): Issue tracking integration

**DevOps/SRE Stack**:

5. **Kubernetes MCP**: Cluster management
6. **Vercel MCP**: Next.js deployment automation

**Complex Setups**:

7. **MCP-Compose**: Multi-server orchestration
8. **Browserbase MCP**: Heavy web automation (premium)

### Installation Examples

```bash
# Playwright (browser testing)
npm install @microsoft/playwright-mcp

# Semgrep (security)
uvx semgrep-mcp

# Context7 (documentation)
npx -y @upstash/context7-mcp --api-key YOUR_API_KEY

# Linear (project management)
npm install mcp-linear
```

### Performance Metrics

| Metric | Median | Range | Notes |
|--------|--------|-------|-------|
| **Response Time** | ~200ms | 100-500ms | Cloud-dependent (Browserbase ~500ms) |
| **Token Overhead** | ~200-500 tokens | Minimal for structured output | Accessibility trees vs screenshots |
| **Setup Time** | ~5 minutes | 2-10 minutes | Cargo build (MCP-Compose) = 10 min |
