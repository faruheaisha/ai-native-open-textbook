---
title: "Hosted Session Management with azd"
sourceId: "10-context-memory/microsoft-skills"
sourceTitle: "Microsoft Agent Skills"
sourceKind: "技能与配置库"
licenseLabel: "可转载"
lang: "英文"
tier: 3
volume: "10-context-memory"
sourceUrl: "https://github.com/microsoft/skills"
entryUrl: "https://github.com/microsoft/skills/blob/cf77b1efbf3117501f4727c476894751311ee885/.github/plugins/azure-skills/skills/microsoft-foundry/foundry-agent/invoke/references/session-management.md"
sourceRel: ".github/plugins/azure-skills/skills/microsoft-foundry/foundry-agent/invoke/references/session-management.md"
rawUrl: "/raw/10-context-memory/microsoft-skills/.github/plugins/azure-skills/skills/microsoft-foundry/foundry-agent/invoke/references/session-management.md"
sourceSha256: "b7291502094a6fc2a52fa328b8095f1135683686ef2afc4e404734d6e152f067"
pageSha256: "b7291502094a6fc2a52fa328b8095f1135683686ef2afc4e404734d6e152f067"
contentMode: "local-full"
zh: ""
---

# Hosted Session Management with azd

Use azd to manage session-backed compute and filesystem state for Hosted Agents.

## Automatic Session Handling

For `responses` and `invocations`, start with `azd ai agent invoke`. Do not create a session first unless the workflow needs a known session before invocation.

Within an azd project, azd resolves session state for a normal remote invoke in this order:

1. Use and persist an explicit `--session-id`.
2. Reuse the session saved for the agent endpoint.
3. If no session exists, let the server assign one, capture the returned session ID, and save it for later commands.

`--new-session` ignores the saved session and starts fresh session-backed state. `--version <version>` creates or reuses a session bound to that deployed version. Do not combine `--version` with `--session-id`.

File and monitor commands automatically use the session saved by invoke or `sessions create`. They also accept `--session-id <id>`.

## Session and Conversation State

| State | Used by | azd behavior |
|-------|---------|--------------|
| Session | All directly invocable Hosted protocols | Persisted per agent; controls compute affinity and filesystem state |
| Conversation | `responses` | Platform-managed; azd can persist the `conversationId` for reuse |

Use `--new-conversation` to reset responses history without replacing the session. Use `--new-session` to reset session-backed memory for invocations. `--new-conversation` has no effect for invocations. For completely fresh responses state, combine `--new-session` and `--new-conversation`.

## Explicit Session Commands

Create a session when files must be uploaded before the first invoke, when a caller-selected ID is required, or when binding to a specific version:

```bash
azd ai agent sessions create
azd ai agent sessions create my-agent <version>
azd ai agent sessions create --session-id my-session
```

The create command auto-detects a single agent and resolves the deployed version from the azd environment. It prints JSON by default and persists `agent_session_id` as the current session.

Inspect and enumerate sessions:

```bash
