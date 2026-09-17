---
title: "Vibe Coding：AI 编程实战课"
sourceId: "07-coding/fufan-vibe-coding-course"
sourceTitle: "Vibe Coding：AI 编程实战课"
sourceKind: "系统课程"
licenseLabel: "可转载"
lang: "中英混排"
tier: 1
volume: "07-coding"
sourceUrl: "https://github.com/fufankeji/FuFan-VibeCodingCourse"
entryUrl: "https://github.com/fufankeji/FuFan-VibeCodingCourse/blob/5336ede159a7ac2ce0ee136324fe5bffd56970ca/Stage7_Superpowers_Applied/Lesson12_Superpowers_Getting_Started/nanoclaw-v2-backend/src/modules/approvals/project.md"
sourceRel: "Stage7_Superpowers_Applied/Lesson12_Superpowers_Getting_Started/nanoclaw-v2-backend/src/modules/approvals/project.md"
rawUrl: "/raw/07-coding/fufan-vibe-coding-course/Stage7_Superpowers_Applied/Lesson12_Superpowers_Getting_Started/nanoclaw-v2-backend/src/modules/approvals/project.md"
sourceSha256: "2a2098ef4551b7f1f04f08be0ae52c27d579eae41849347c63fd747fbd202b91"
pageSha256: "2a2098ef4551b7f1f04f08be0ae52c27d579eae41849347c63fd747fbd202b91"
contentMode: "local-full"
zh: ""
---

# Vibe Coding：AI 编程实战课

## Approvals module

Admin-gated approval flow for agent self-modification and OneCLI credential access. Lives in `src/modules/approvals/`.

### Two flows

**Agent-initiated (DB-backed, fire-and-forget).** The container writes a `system`-kind outbound row with one of two actions — `install_packages`, `add_mcp_server`. The module's delivery-action handlers validate, route to the right approver's DM, and persist a `pending_approvals` row. When the admin clicks a button, the registered response handler applies the change (config update → image rebuild if needed → container kill) and notifies the agent via system chat.

**OneCLI credential (long-poll).** The OneCLI gateway holds an HTTP connection open when it needs credential approval. `onecli-approvals.ts` delivers a card, persists a `pending_approvals` row (action = `onecli_credential`), and waits on an in-memory Promise that resolves on click or expiry timer. Survives host restart: the startup sweep edits stale cards to "Expired (host restarted)" and drops the rows.

### Wiring

- **Delivery actions:** `install_packages`, `add_mcp_server` via `registerDeliveryAction`.
- **Response handler:** single handler claims both agent-initiated and OneCLI approvals. OneCLI is tried first (in-memory Promise); falls through to `pending_approvals` lookup.
- **Adapter-ready hook (`onDeliveryAdapterReady`):** starts the OneCLI manual-approval handler once the delivery adapter is set.
- **Shutdown hook (`onShutdown`):** stops the OneCLI handler.

### Tables

`pending_approvals` (created by `module-approvals-pending-approvals.ts`). Columns for both DB-backed and OneCLI-tracking rows. Not dropped on uninstall — approvals in flight aren't lost on reinstall.

### Core integration

The module depends on host-side infra but does not reach into core decision paths beyond the registered hooks:
- `buildAgentGroupImage`, `killContainer` from container-runner (image rebuilds)
- `updateContainerConfig` from container-config (apt/npm/mcp edits)
- `pickApprover`, `pickApprovalDelivery` from access
- `getDeliveryAdapter` in request-approval.ts and the adapter-ready callback in OneCLI handler

No core code imports from this module. Removing it: delete `src/modules/approvals/`, remove the import from `src/modules/index.ts`. Delivery actions will log "Unknown system action"; button clicks on approval cards will log "Unclaimed response". Stale rows remain in `pending_approvals` until reinstall or manual cleanup.
