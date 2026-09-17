---
title: "Azure Functions Templates"
sourceId: "10-context-memory/microsoft-skills"
sourceTitle: "Microsoft Agent Skills"
sourceKind: "技能与配置库"
licenseLabel: "可转载"
lang: "英文"
tier: 3
volume: "10-context-memory"
sourceUrl: "https://github.com/microsoft/skills"
entryUrl: "https://github.com/microsoft/skills/blob/cf77b1efbf3117501f4727c476894751311ee885/.github/plugins/azure-skills/skills/azure-prepare/references/services/functions/templates/README.md"
sourceRel: ".github/plugins/azure-skills/skills/azure-prepare/references/services/functions/templates/README.md"
rawUrl: "/raw/10-context-memory/microsoft-skills/.github/plugins/azure-skills/skills/azure-prepare/references/services/functions/templates/README.md"
sourceSha256: "fdce203aa98c49f18cd51a8322e9257f27a0a92d2e9c13d90f3ebf4a6d74bbec"
pageSha256: "fdce203aa98c49f18cd51a8322e9257f27a0a92d2e9c13d90f3ebf4a6d74bbec"
contentMode: "local-full"
zh: ""
---

# Azure Functions Templates

Dynamic template selection for Azure Functions projects.

## Prerequisites: Check MCP Availability

Before proceeding, verify Azure MCP Server and Functions tools are available:

```
functions_template_get(language: "python")
```

| Result | Action |
|--------|--------|
| ✅ Returns template list | Use **Primary Path: MCP Tools** below |
| ❌ Tool not found / Error | Jump to **[Fallback (MCP Unavailable)](#fallback-mcp-unavailable)** |

---

## Primary Path: MCP Tools

**Use Azure MCP tools** — they provide complete, up-to-date AZD templates with IaC, RBAC, and managed identity.

### Step 1: Discover Templates

```
functions_template_get(language: "<python|csharp|typescript|javascript|java|powershell>")
```

Returns template list with metadata:

- `templateName` — pass to generate call
- `description` — use for selection (describes trigger, bindings, security features)
- `resource` — filter by trigger type (http, cosmos, timer, eventhub, blob, sql, mcp, ai)
- `infrastructure` — prefer `bicep` (default), use `terraform` if user requests

### Step 2: Select Template

Use the intent→resource mapping in [selection.md](/lib/10-context-memory/microsoft-skills/_github-plugins-azure-skills-skills-azure-prepare-references-services-functions-templates-selection) to map user intent to a `resource` filter value.

> **Default behavior:** When user intent cannot be determined or no trigger type is known, use `http` as the default.

**Single-template optimization:** If description mentions BOTH trigger AND binding user needs, fetch that one template only.

**IaC selection:**

- Default: `infrastructure: "bicep"`
- If user says "terraform": `infrastructure: "terraform"`

### Step 3: Generate Project

```
functions_template_get(
  language: "<language>",
