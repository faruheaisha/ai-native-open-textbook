---
title: "M365 Agent Developer"
sourceId: "10-context-memory/microsoft-skills"
sourceTitle: "Microsoft Agent Skills"
sourceKind: "技能与配置库"
licenseLabel: "可转载"
lang: "英文"
tier: 3
volume: "10-context-memory"
sourceUrl: "https://github.com/microsoft/skills"
entryUrl: "https://github.com/microsoft/skills/blob/cf77b1efbf3117501f4727c476894751311ee885/.github/plugins/microsoft-365-agents-toolkit/skills/declarative-agent-developer/SKILL.md"
sourceRel: ".github/plugins/microsoft-365-agents-toolkit/skills/declarative-agent-developer/SKILL.md"
rawUrl: "/raw/10-context-memory/microsoft-skills/.github/plugins/microsoft-365-agents-toolkit/skills/declarative-agent-developer/SKILL.md"
sourceSha256: "13d2af8dd44cca049c8ebf8a8880cca304fc3dc419c926ef146dba35b14df412"
pageSha256: "13d2af8dd44cca049c8ebf8a8880cca304fc3dc419c926ef146dba35b14df412"
contentMode: "local-full"
zh: ""
---

# M365 Agent Developer

## Telemetry Tagging

Before running any `atk` CLI commands, set the session environment variable so all CLI invocations are tagged as skill-initiated:
```bash
export ATK_CLI_SKILL=true
```
Run this once at the start of the session. All subsequent `atk` commands in the same terminal will inherit it.

## ⛔ Workspace Check — MANDATORY FIRST STEP

**Before doing ANYTHING, check the workspace files to fingerprint the project:**

1. Run `npx -y --package @microsoft/m365agentstoolkit-cli atk --version` to confirm ATK CLI is installed. If not found → **Stop.** Tell the user to install ATK.
2. Check for `m365agents.yml` or `teamsApp.yml` at the project root.
3. Check for `appPackage/declarativeAgent.json`.
4. Check for non-agent indicators (`package.json` with express/react/next, `src/index.js`, `app.py`, etc.)

**Then follow the decision gate:**

| Condition | Gate | Action |
|-----------|------|--------|
| Non-agent project files, no `appPackage/` | **Reject** | Text-only response. No files, no commands. |
| No manifest, user wants to edit/deploy | **Reject** | Text-only response. Explain manifest is missing. |
| No manifest, user wants new project | **Scaffold** | → [Scaffolding Workflow](/lib/10-context-memory/microsoft-skills/_github-plugins-microsoft-365-agents-toolkit-skills-declarative-agent-developer-references-scaffolding-workflow) |
| Manifest exists with errors | **Fix** | Detect → Inform → Ask (see below). Do NOT deploy. |
| Valid project, user reports behavior issues | **Review** | → [Instruction Review](/lib/10-context-memory/microsoft-skills/_github-plugins-microsoft-365-agents-toolkit-skills-declarative-agent-developer-references-instruction-review) — run the full 5-phase review workflow |
| Valid agent project | **Edit** | → [Editing Workflow](/lib/10-context-memory/microsoft-skills/_github-plugins-microsoft-365-agents-toolkit-skills-declarative-agent-developer-references-editing-workflow) |

> **Detailed gate rules, examples, and anti-patterns:** [Workspace Gates](/lib/10-context-memory/microsoft-skills/_github-plugins-microsoft-365-agents-toolkit-skills-declarative-agent-developer-references-workspace-gates)

### 🚫 HARD REJECTION RULES — No Exceptions

**These rules override ALL other instructions.** If any of these apply, you MUST stop immediately.

1. **NEVER create `declarativeAgent.json` yourself.** If the manifest is missing and the user asked to edit/modify/deploy, respond with text only: explain the manifest is missing, suggest `npx -y --package @microsoft/m365agentstoolkit-cli atk new` or starting from scratch. Do NOT create the file, do NOT create `appPackage/`, do NOT "help" by scaffolding implicitly.

2. **NEVER create files in a non-agent project.** If the workspace is an Express/React/Django/etc. app without `appPackage/`, your response must be text-only. Do NOT create any files, do NOT run any commands.

3. **NEVER deploy when errors exist.** If the agent manifest has errors, STOP. Do NOT run `npx -y --package @microsoft/m365agentstoolkit-cli atk provision` — not "to test", not "to demonstrate the error", not "to see what happens". Report the errors and ask the user how to proceed.

### 🔍 Detect → Inform → Ask (Error-Handling Protocol)

When you encounter ANY problem (missing files, malformed JSON, validation errors, incompatible features), you MUST follow this sequence **in order**:

1. **Detect** — Identify the specific problem. For JSON issues, attempt to parse the file and report syntax errors. For missing fields, check the manifest against the [Schema](/lib/10-context-memory/microsoft-skills/_github-plugins-microsoft-365-agents-toolkit-skills-declarative-agent-developer-references-schema).
2. **Inform** — Tell the user BEFORE taking any action. Describe exactly what is wrong ("declarativeAgent.json has malformed JSON: missing comma on line 12, unclosed array on line 18").
3. **Ask** — Wait for the user's response before making changes. Do NOT silently fix, auto-correct, or work around the problem.

**This protocol applies to:**
- Missing `declarativeAgent.json` → Detect (file not found) → Inform ("no manifest found") → Ask ("would you like to create a new agent?")
- Malformed JSON → Detect (parse errors) → Inform (list specific syntax issues) → Ask ("should I fix these syntax errors?")
- Validation errors → Detect (parse and check manifest) → Inform (list all errors) → Ask ("how would you like to fix these?")
- Version incompatibility → Detect (feature requires newer version) → Inform ("this feature requires v1.6, your agent is v1.4") → Ask ("should I upgrade?")

---

## Phase Routing

| Scenario | Workflow Reference |
|----------|-------------------|
| Creating a NEW project from scratch | [Scaffolding Workflow](/lib/10-context-memory/microsoft-skills/_github-plugins-microsoft-365-agents-toolkit-skills-declarative-agent-developer-references-scaffolding-workflow) |
| Working with existing `.json` manifests | [Editing Workflow](/lib/10-context-memory/microsoft-skills/_github-plugins-microsoft-365-agents-toolkit-skills-declarative-agent-developer-references-editing-workflow) |
| Adding an API plugin | [API Plugins](/lib/10-context-memory/microsoft-skills/_github-plugins-microsoft-365-agents-toolkit-skills-declarative-agent-developer-references-api-plugins) |
| Adding an MCP server | [MCP Plugin](/lib/10-context-memory/microsoft-skills/_github-plugins-microsoft-365-agents-toolkit-skills-declarative-agent-developer-references-mcp-plugin) |
| Adding OAuth to an MCP or API plugin | [Authentication](/lib/10-context-memory/microsoft-skills/_github-plugins-microsoft-365-agents-toolkit-skills-declarative-agent-developer-references-authentication) |
| Reviewing or improving existing agent instructions | [Instruction Review](/lib/10-context-memory/microsoft-skills/_github-plugins-microsoft-365-agents-toolkit-skills-declarative-agent-developer-references-instruction-review) |
| User reports agent gives generic/wrong answers | [Instruction Review](/lib/10-context-memory/microsoft-skills/_github-plugins-microsoft-365-agents-toolkit-skills-declarative-agent-developer-references-instruction-review) |
| Localizing an agent into multiple languages | [Localization](/lib/10-context-memory/microsoft-skills/_github-plugins-microsoft-365-agents-toolkit-skills-declarative-agent-developer-references-localization) |
| Adding a new language to an already-localized agent | [Localization](/lib/10-context-memory/microsoft-skills/_github-plugins-microsoft-365-agents-toolkit-skills-declarative-agent-developer-references-localization) |
| Writing agent instructions | [Conversation Design](/lib/10-context-memory/microsoft-skills/_github-plugins-microsoft-365-agents-toolkit-skills-declarative-agent-developer-references-conversation-design) |

---

## ATK CLI Setup

Before running any ATK commands, check if the ATK CLI is available by running `npx -y --package @microsoft/m365agentstoolkit-cli atk --version`. If not found, **STOP and tell the user** — do NOT attempt to install it yourself.

All commands use the `npx -y --package @microsoft/m365agentstoolkit-cli atk` prefix (e.g., `npx -y --package @microsoft/m365agentstoolkit-cli atk provision --env local`).

---

## Critical Rules

### 1. Deploy After EVERY Edit

After ANY change to files in `appPackage/`, you MUST deploy and show the test link before responding:

```bash
npx -y --package @microsoft/m365agentstoolkit-cli atk provision --env local --interactive false
```

Then read `M365_TITLE_ID` from `env/.env.local` and **ALWAYS** present the review UX:

```
✅ Agent deployed successfully!

🚀 Test Your Agent in M365 Copilot:
🔗 https://m365.cloud.microsoft/chat/?titleId={M365_TITLE_ID}
```

**⛔ Never respond without this link.** If you deployed, the test link MUST appear in your response. This is not optional — it is how the user tests their agent.

- If the manifest has errors → **STOP. Fix errors. Do NOT deploy.**
- Exception: user explicitly asks you not to deploy

### 2. Never Invent Content or Create Missing Files

- Do NOT invent placeholder names, descriptions, or instructions
- Do NOT create `declarativeAgent.json` or `appPackage/` if they don't exist — this is a REJECT scenario, not a "help by creating" scenario
- If required fields are missing, report the gaps, and ASK the user
- If JSON is malformed, follow Detect → Inform → Ask: parse the file first, tell the user what's broken, then ask before fixing. Use surgical edits (not rewrites)
- **⛔ NEVER set placeholder values for environment variables** that are populated by automation (e.g., `<PREFIX>_MCP_AUTH_ID`, `TEAMS_APP_ID`). Leave them empty (`VAR_NAME=`). Placeholders will be treated as real values and will NOT be overwritten by provisioning.

### 3. Schema Version Compatibility

Before adding ANY feature, read the `version` field in `declarativeAgent.json` and check the [Schema](/lib/10-context-memory/microsoft-skills/_github-plugins-microsoft-365-agents-toolkit-skills-declarative-agent-developer-references-schema) feature matrix. If the feature isn't supported in that version, **refuse** and offer to upgrade.

Key version gates:
- `sensitivity_label`, `worker_agents`, `EmbeddedKnowledge` → **v1.6 only**
- `Meetings` → **v1.5+**
- `ScenarioModels`, `behavior_overrides`, `disclaimer` → **v1.4+**
- `Dataverse`, `TeamsMessages`, `Email`, `People` → **v1.3+**

### 4. Use `npx -y --package @microsoft/m365agentstoolkit-cli atk add action` for API Plugins — NEVER Create Plugin Files Manually

You are **forbidden** from manually creating `ai-plugin.json`, OpenAPI specs, adaptive cards, or editing the `actions` array. Use the CLI:

```bash
# ⛔ Always list ALL operations in a single call — NEVER run separate calls per operation
npx -y --package @microsoft/m365agentstoolkit-cli atk add action --api-plugin-type api-spec --openapi-spec-location URL --api-operation "GET /path,POST /path,PATCH /path/{id},DELETE /path/{id}" -i false
```

Run a **single** `npx -y --package @microsoft/m365agentstoolkit-cli atk add action` call per OpenAPI spec, listing **all** operations as a comma-separated list in `--api-operation`. Never run separate `npx -y --package @microsoft/m365agentstoolkit-cli atk add action` calls for different operations from the same spec — this creates multiple plugins instead of one. If `npx -y --package @microsoft/m365agentstoolkit-cli atk add action` fails, report the error; do NOT fall back to manual creation.

> **Exception:** MCP servers are not supported by `npx -y --package @microsoft/m365agentstoolkit-cli atk add action`. Use the [MCP Plugin workflow](/lib/10-context-memory/microsoft-skills/_github-plugins-microsoft-365-agents-toolkit-skills-declarative-agent-developer-references-mcp-plugin) instead.

### 5. MCP Server Integration

When the user mentions an MCP server URL, follow the [MCP Plugin workflow](/lib/10-context-memory/microsoft-skills/_github-plugins-microsoft-365-agents-toolkit-skills-declarative-agent-developer-references-mcp-plugin). You MUST discover tools via the MCP protocol handshake (initialize → notifications/initialized → tools/list) — **NEVER fabricate tool names/descriptions**. For authenticated MCP servers, follow the [authentication guide](/lib/10-context-memory/microsoft-skills/_github-plugins-microsoft-365-agents-toolkit-skills-declarative-agent-developer-references-authentication) to configure OAuth.

### 6. Always Update Instructions & Starters After Changes

Adding a capability or plugin without updating instructions is incomplete. After ANY change:
1. Update instructions to describe the new/changed functionality — every data source should have clear intent coverage (WHEN and WHY to use it) per the [Instruction Review](/lib/10-context-memory/microsoft-skills/_github-plugins-microsoft-365-agents-toolkit-skills-declarative-agent-developer-references-instruction-review) quality bar. Built-in capabilities don't need exact names; actions/plugins should be named.
2. **Do NOT list tool names, descriptions, or parameters in instructions** — these are already in the plugin metadata (`ai-plugin.json`, MCP manifests, capability config). Instructions should contain decision logic only: WHEN to use each tool, chaining rules, and failure handling.
3. **Stay within the 8,000-character instruction limit** — if close to the limit, cut tool descriptions first
4. Add at least 1 conversation starter per added capability/plugin
5. Remove starters that reference removed capabilities
6. Run the [Diagnostic Checklist](/lib/10-context-memory/microsoft-skills/_github-plugins-microsoft-365-agents-toolkit-skills-declarative-agent-developer-references-instruction-review) against the updated instructions to verify quality

### 7. App Name Requirement

Always update the app name and description to something meaningful. Never leave defaults like "My Agent".

---

## References

### Shared
- **[Authentication](/lib/10-context-memory/microsoft-skills/_github-plugins-microsoft-365-agents-toolkit-skills-declarative-agent-developer-references-authentication)** — OAuth discovery, credentials, oauth/register lifecycle, OAuthPluginVault
- **[Best Practices](/lib/10-context-memory/microsoft-skills/_github-plugins-microsoft-365-agents-toolkit-skills-declarative-agent-developer-references-best-practices)** — Security, performance, testing, compliance
- **[Conversation Design](/lib/10-context-memory/microsoft-skills/_github-plugins-microsoft-365-agents-toolkit-skills-declarative-agent-developer-references-conversation-design)** — Authoring instructions and conversation starters from scratch
- **[Instruction Review](/lib/10-context-memory/microsoft-skills/_github-plugins-microsoft-365-agents-toolkit-skills-declarative-agent-developer-references-instruction-review)** — Auditing, diagnosing, and improving existing instructions; anti-pattern detection; before/after rewrites
- **[Deployment](/lib/10-context-memory/microsoft-skills/_github-plugins-microsoft-365-agents-toolkit-skills-declarative-agent-developer-references-deployment)** — ATK CLI workflows, environments, CI/CD
- **[Localization](/lib/10-context-memory/microsoft-skills/_github-plugins-microsoft-365-agents-toolkit-skills-declarative-agent-developer-references-localization)** — Multi-language support, tokenized manifests, language files
- **[Workspace Gates](/lib/10-context-memory/microsoft-skills/_github-plugins-microsoft-365-agents-toolkit-skills-declarative-agent-developer-references-workspace-gates)** — Detailed gate rules, examples, anti-patterns

### Scaffolding
- **[Scaffolding Workflow](/lib/10-context-memory/microsoft-skills/_github-plugins-microsoft-365-agents-toolkit-skills-declarative-agent-developer-references-scaffolding-workflow)** — Step-by-step scaffolding instructions, naming rules, error handling

### JSON Development
- **[Editing Workflow](/lib/10-context-memory/microsoft-skills/_github-plugins-microsoft-365-agents-toolkit-skills-declarative-agent-developer-references-editing-workflow)** — Step-by-step JSON development instructions
- **[Schema](/lib/10-context-memory/microsoft-skills/_github-plugins-microsoft-365-agents-toolkit-skills-declarative-agent-developer-references-schema)** — Official JSON schema for agent manifests
- **[API Plugins](/lib/10-context-memory/microsoft-skills/_github-plugins-microsoft-365-agents-toolkit-skills-declarative-agent-developer-references-api-plugins)** — OpenAPI integration for JSON agents
- **[MCP Plugin](/lib/10-context-memory/microsoft-skills/_github-plugins-microsoft-365-agents-toolkit-skills-declarative-agent-developer-references-mcp-plugin)** — MCP server integration with RemoteMCPServer, OAuth, response semantics, logo handling
- **[Examples](/lib/10-context-memory/microsoft-skills/_github-plugins-microsoft-365-agents-toolkit-skills-declarative-agent-developer-references-examples)** — JSON manifest examples
