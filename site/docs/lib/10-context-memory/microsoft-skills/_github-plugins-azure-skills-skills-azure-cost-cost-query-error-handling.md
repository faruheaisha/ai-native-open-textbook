---
title: "Cost Query Error Handling"
sourceId: "10-context-memory/microsoft-skills"
sourceTitle: "Microsoft Agent Skills"
sourceKind: "技能与配置库"
licenseLabel: "可转载"
lang: "英文"
tier: 3
volume: "10-context-memory"
sourceUrl: "https://github.com/microsoft/skills"
entryUrl: "https://github.com/microsoft/skills/blob/cf77b1efbf3117501f4727c476894751311ee885/.github/plugins/azure-skills/skills/azure-cost/cost-query/error-handling.md"
sourceRel: ".github/plugins/azure-skills/skills/azure-cost/cost-query/error-handling.md"
rawUrl: "/raw/10-context-memory/microsoft-skills/.github/plugins/azure-skills/skills/azure-cost/cost-query/error-handling.md"
sourceSha256: "ac5ef0406ece95dc254e5eb8de9218e82aaa5231b8c2b5409f5feb78dea5f417"
pageSha256: "ac5ef0406ece95dc254e5eb8de9218e82aaa5231b8c2b5409f5feb78dea5f417"
contentMode: "local-full"
zh: ""
---

# Cost Query Error Handling

Detailed error handling reference for the Cost Management Query API.

## HTTP Status Codes

| Status | Error | Cause | Remediation |
|--------|-------|-------|-------------|
| 400 | `BadRequest` | Invalid request body, unsupported dimension, date range exceeds limits, malformed filter expression. | Validate request body against [request-body-schema.md](/lib/10-context-memory/microsoft-skills/_github-plugins-azure-skills-skills-azure-cost-cost-query-request-body-schema). Check dimension compatibility in [dimensions-by-scope.md](/lib/10-context-memory/microsoft-skills/_github-plugins-azure-skills-skills-azure-cost-cost-query-dimensions-by-scope). |
| 401 | `Unauthorized` | Missing or expired authentication token. | Re-authenticate with `az login` or refresh the bearer token. |
| 403 | `Forbidden` | Insufficient permissions on the target scope. User lacks Cost Management Reader or equivalent role. | Assign `Cost Management Reader` or `Cost Management Contributor` role on the scope. |
| 404 | `NotFound` | Scope does not exist, subscription not found, or resource group does not exist. | Verify the scope URL. Confirm the subscription ID and resource group name are correct. |
| 429 | `TooManyRequests` | Rate limit exceeded. QPU, entity, or tenant throttling triggered. | Check all `x-ms-ratelimit-microsoft.costmanagement-*-retry-after` headers (`qpu`, `entity`, `tenant`). Wait for the **longest** value before retrying. |
| 503 | `ServiceUnavailable` | Cost Management service is temporarily unavailable. | Check [Azure Status](https://status.azure.com) for service health. |

## Common Error Scenarios

| Error Message / Scenario | Cause | Remediation |
|--------------------------|-------|-------------|
| "Agreement type X does not support Y scope" | Scope type is incompatible with the account's agreement type. | Use a compatible scope. EA accounts cannot use Invoice Section scope; MOSP accounts cannot use Department scope. |
| "Dimension Z is not valid for scope" | The requested dimension is not available for the current scope and agreement type combination. | Check [dimensions-by-scope.md](/lib/10-context-memory/microsoft-skills/_github-plugins-azure-skills-skills-azure-cost-cost-query-dimensions-by-scope) for valid dimensions. |
| "SubscriptionName filter without SubscriptionId" | EA + Management Group scope: filtering by `SubscriptionName` without also filtering by `SubscriptionId`. | Add a `SubscriptionId` filter alongside the `SubscriptionName` filter. See [guardrails.md](/lib/10-context-memory/microsoft-skills/_github-plugins-azure-skills-skills-azure-cost-cost-query-guardrails). |
| Date range exceeds granularity limit | `Daily` range > 31 days or `Monthly`/`None` range > 12 months. | System auto-truncates `from` date. To avoid silent truncation, ensure range is within limits. |
| Date range exceeds absolute limit (37 months) | `from` to `to` spans more than 37 months. | Reduce the date range to 37 months or less. Split into multiple queries if needed. |
| "Request body is null or invalid" | Missing or malformed JSON in the request body. | Validate JSON syntax. Ensure `type`, `timeframe`, and `dataset` fields are present. |
| Invalid filter structure | `and`/`or` has fewer than 2 child expressions, or `not` has more than 1. | Ensure `and`/`or` contain 2+ children. Use `not` with exactly 1 child. For single conditions, use the filter directly without a logical wrapper. |
| "The query usage is not supported for the scope" | The query type (e.g., `AmortizedCost`) is not supported at the given scope. | Try a different scope or query type. Not all scopes support all report types. |
| `BillingSubscriptionNotFound` | The subscription ID in the scope URL is invalid or not associated with the billing account. | Verify the subscription ID exists and is active. Check that it belongs to the expected billing account. |

## Retry Strategy

| Status | Retry? | Strategy |
|--------|--------|----------|
| 429 | ✅ Yes | Check the response for all `x-ms-ratelimit-microsoft.costmanagement-*-retry-after` headers (`qpu-retry-after`, `entity-retry-after`, `tenant-retry-after`). Take the **longest** value and **do NOT retry until that duration has fully elapsed.** Maximum 3 retries. |
| 400 | ❌ No | Fix the request. Review error message for specific field or validation issue. |
| 401 | ❌ No | Re-authenticate. Token has expired or is missing. |
| 403 | ❌ No | Fix permissions. Request appropriate RBAC role assignment on the scope. |
| 404 | ❌ No | Fix the scope URL. Verify resource exists. |
| 503 | ❌ No | Do not retry. Check [Azure Status](https://status.azure.com) for service health. |
| 5xx (other) | ❌ No | Do not retry. Investigate the error and check service health. |

> ⚠️ **Warning:** Do not retry any errors except 429. All other errors indicate issues that must be fixed before re-attempting the request.

## Error Response Structure

All error responses follow a consistent JSON structure:

```json
{
  "error": {
