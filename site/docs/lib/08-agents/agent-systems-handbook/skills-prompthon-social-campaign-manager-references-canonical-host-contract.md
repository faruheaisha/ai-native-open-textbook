---
title: "Canonical Host source contract"
sourceId: "08-agents/agent-systems-handbook"
sourceTitle: "Agent Systems Handbook（智能体系统手册）"
sourceKind: "工程手册"
licenseLabel: "限非商用"
lang: "英文"
tier: 1
volume: "08-agents"
sourceUrl: "https://github.com/Prompthon-IO/agent-systems-handbook"
entryUrl: "https://github.com/Prompthon-IO/agent-systems-handbook/blob/5b71cfa598701a34834f33b42be5f8a422138a3c/README.md"
zh: ""
---

# Canonical Host source contract

Source audit 2026-08-30: Prompthon Web App checkout HEAD `f58570af7cc5f6d75e62faed31743fefd48a1cac`; the files below were clean at inspection. This establishes source behavior only, not the deployed production release.

- `apps/social-media-manager-agent/src/ui/api.ts` maps logical `/api/organizations/:orgId/social/:path` requests into Host `operation.execute` with `social.http.read` or `social.http.write`.
- `apps/web/src/app/api/agent-applications/workspaces/[workspaceId]/operations/route.ts` accepts signed-in request-user auth and a strict body containing `operationId`, `input`, `idempotencyKey`, `organizationId`. It checks workspace/org and Host capability before dispatch.
- `apps/web/src/services/agent-applications/transportService.ts` resolves the application release, uses server-owned signing and stores idempotent operation receipts. Students must not call the app's signed endpoint or receive Host signing secrets.
- `apps/social-media-manager-agent/src/server/social/socialHttpOperation.ts` maps path/method to the existing canonical service. `socialCanonicalService.ts` owns campaign/post/variant/schedule/delivery/audit behavior and readback shapes.
- `apps/web/src/services/agent/localBridgeRequestAuth.ts` explicitly marks the former bridge request-auth helper deprecated and says product APIs use normal request-user auth. Do not assume the retained legacy bridge docs authorize a current production flow.

Browser request shape (same signed-in origin; cookies remain browser-owned):

```json
{
  "operationId": "social.http.read",
