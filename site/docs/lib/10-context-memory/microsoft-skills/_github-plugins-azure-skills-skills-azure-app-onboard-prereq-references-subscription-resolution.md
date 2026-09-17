---
title: "Subscription Resolution — Defensive Fallback"
sourceId: "10-context-memory/microsoft-skills"
sourceTitle: "Microsoft Agent Skills"
sourceKind: "技能与配置库"
licenseLabel: "可转载"
lang: "英文"
tier: 3
volume: "10-context-memory"
sourceUrl: "https://github.com/microsoft/skills"
entryUrl: "https://github.com/microsoft/skills/blob/cf77b1efbf3117501f4727c476894751311ee885/.github/plugins/azure-skills/skills/azure-app-onboard-prereq/references/subscription-resolution.md"
sourceRel: ".github/plugins/azure-skills/skills/azure-app-onboard-prereq/references/subscription-resolution.md"
rawUrl: "/raw/10-context-memory/microsoft-skills/.github/plugins/azure-skills/skills/azure-app-onboard-prereq/references/subscription-resolution.md"
sourceSha256: "3430f1ddf59a0c124e97e8e1841d67fb4961a40073ccf01260e688f0c06fa78b"
pageSha256: "3430f1ddf59a0c124e97e8e1841d67fb4961a40073ccf01260e688f0c06fa78b"
contentMode: "local-full"
zh: ""
---

# Subscription Resolution — Defensive Fallback

The `azure-app-onboard` orchestrator resolves the subscription at Step 1 (login hard gate) and writes `subscriptionId`, `subscriptionName`, `tenantId` to `context.json.azure` before any sub-skill runs. In normal operation, `context.json.azure.subscriptionId` is always set by the time prepare runs.

At prepare phase entry, verify `context.json.azure.subscriptionId` is set. If it is (expected path), use it — done.

If `context.json.azure` is somehow empty, resolve now rather than halting the flow:

1. **Check env vars** — if `AZURE_SUBSCRIPTION_ID` is set, use it directly (with `AZURE_TENANT_ID` if set). Write `subscriptionId`, `subscriptionName`, `tenantId` to `context.json.azure`, done.
2. **Run `az account show`** — `az account show --query "\{id:id, name:name, tenantId:tenantId\}" -o json`. If it succeeds, **auto-select** — write `subscriptionId`, `subscriptionName`, `tenantId` to `context.json.azure`. Do NOT run `az account list` or present a picker.
3. **Fallback: `mcp_azure_mcp_subscription_list` + picker** — only if `az account show` fails. Call `mcp_azure_mcp_subscription_list` to retrieve all subscriptions (returns `subscriptionId`, `displayName`, `isDefault`).
   - **1 subscription** → auto-select, no question. Write `subscriptionId`, `subscriptionName`, `tenantId` to `context.json.azure`.
   - **2+ subscriptions** → present a picker via `ask_user`: list each subscription as a choice `"\{displayName\} (\{subscriptionId\})"` with the default marked. The user selects one. Write `subscriptionId`, `subscriptionName`, `tenantId` to `context.json.azure`.
4. **MCP tool fails** → run `az login` (interactive browser login). If that fails (no browser, remote session), fall back to `az login --use-device-code`. After login succeeds, retry from step 2. Do NOT proceed without a resolved subscription.
