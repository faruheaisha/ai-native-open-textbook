---
title: "@office-agents/core"
sourceId: "04-work/office-agents-hewliyang"
sourceTitle: "Office Agents"
sourceKind: "其他材料"
licenseLabel: "仅引用"
lang: "英文"
tier: 3
volume: "04-work"
sourceUrl: "https://github.com/hewliyang/office-agents"
entryUrl: "https://github.com/hewliyang/office-agents/blob/95fb654491a9d394dc85ea2b8c93dee2ca4546b9/packages/core/README.md"
sourceRel: "packages/core/README.md"
rawUrl: "/raw/04-work/office-agents-hewliyang/packages/core/README.md"
sourceSha256: "6971b9287e0e7364c71a3a4d82283c1d163336d37b85be95cbf0b7dc3038e670"
pageSha256: "6971b9287e0e7364c71a3a4d82283c1d163336d37b85be95cbf0b7dc3038e670"
contentMode: "local-full"
zh: ""
---

# @office-agents/core

`@office-agents/core` is the shared Svelte 5 chat UI layer for Office Agents.

It re-exports the headless SDK plus the generic chat interface used by the Excel, PowerPoint, and Word add-ins:

- `ChatInterface`
- `FilesPanel`
- `ErrorBoundary`
- app adapter types

## Key pieces

- `src/chat/chat-interface.svelte` — main taskpane chat shell
- `src/chat/chat-controller.ts` — runtime/controller wrapper over `AgentRuntime`
- `src/chat/app-adapter.ts` — app integration contract for Office-specific tools and UI
- `src/chat/settings-panel.svelte` — provider, OAuth, web tools, and skill management
- `src/chat/message-list.svelte` — assistant/user message rendering

## AppAdapter

Each Office app passes an `AppAdapter` into `ChatInterface` to provide:

- app-specific tools
- system prompt construction
- document identity and metadata
- optional Office-specific UI extensions like `ToolExtras`, `HeaderExtras`, and `SelectionIndicator`
- optional link interception via `handleLinkClick`

## Validation

Use the repo-level checks:

```bash
pnpm typecheck
pnpm lint
pnpm build
```
