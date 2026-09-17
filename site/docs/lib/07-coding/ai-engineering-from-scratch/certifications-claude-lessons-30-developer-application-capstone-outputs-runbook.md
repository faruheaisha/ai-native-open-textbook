---
title: "Order Status Assistant Runbook"
sourceId: "07-coding/ai-engineering-from-scratch"
sourceTitle: "AI Engineering from Scratch（英文原版）"
sourceKind: "源码研读"
licenseLabel: "可转载"
lang: "英文"
tier: 2
volume: "07-coding"
sourceUrl: "https://github.com/rohitg00/ai-engineering-from-scratch"
entryUrl: "https://github.com/rohitg00/ai-engineering-from-scratch/blob/d18b8fe5a913c46011a3b06cb6ebd6a924414fd3/certifications/claude/lessons/30-developer-application-capstone/outputs/runbook.md"
sourceRel: "certifications/claude/lessons/30-developer-application-capstone/outputs/runbook.md"
rawUrl: "/raw/07-coding/ai-engineering-from-scratch/certifications/claude/lessons/30-developer-application-capstone/outputs/runbook.md"
sourceSha256: "6574fabf0210e33ec90b36b51b05baf13ad83ad16c22847d07d2c3fc02613d7d"
pageSha256: "6574fabf0210e33ec90b36b51b05baf13ad83ad16c22847d07d2c3fc02613d7d"
contentMode: "local-full"
zh: ""
---

# Order Status Assistant Runbook

## Service Objective

Return a verified order status or a clear escalation without exposing secrets, crossing tenant boundaries, or performing mutation.

## First Response

1. Identify the trace or request ID.
2. Classify the failure before retry.
3. Confirm whether any tool executed.
4. Inspect authoritative order state.
5. Contain affected capability when security or cross-tenant access is possible.

## Failure Classes

### Missing or malformed order ID

- Response: request an exact public ID.
- Retry: user-driven only.
- Verify: no lookup tool ran.

### Provider timeout before complete response

- Response: mark attempt incomplete.
- Retry: once with bounded backoff if no tool side effect occurred.
- Verify: inspect trace for complete terminal event and tool operations.

### Rate limit

- Response: queue or return a clear temporary-unavailability state within the service objective.
- Retry: follow provider guidance with bounded backoff.
- Verify: no duplicate tool operation.

### Protocol or schema error

- Response: do not display partial output as final.
- Retry: only after reconstructing valid message state or within the bounded structured-output repair policy.
- Verify: contract tests and wire trace identify the repaired boundary.

### Policy denial

- Response: preserve denial and explain the safe next step.
- Retry: only after valid external approval or corrected low-risk request.
- Verify: forbidden tool did not execute.

### Order not found

- Response: do not guess status; escalate to the approved support path.
- Retry: only with corrected authenticated identifier.
- Verify: lookup used current user's authorized order scope.

### Tool unavailable

- Response: state that status cannot currently be verified.
- Retry: one bounded read-only retry or queue according to service objective.
- Verify: no fabricated status appears.

### Security incident or secret exposure

- Contain: disable affected tool, MCP server, plugin, hook, or network path.
- Revoke: rotate any potentially exposed credential immediately.
- Investigate: preserve redacted traces and query authoritative access logs.
- Recover: fix the failed trust boundary and add the fixture to security evals.
- Restore: canary with least privilege and active monitoring.

### Regression after model or configuration change

- Contain: roll back model, prompt, schema, tool, Skill, hook, plugin, or server version.
- Diagnose: compare paired eval cases and traces.
- Recover: address the specific failing boundary.
- Verify: full required and safety suites pass before rollout resumes.

## Ambiguous Mutation Rule

The current application is read-only. If future versions add mutation, never retry an ambiguous timeout until a stable idempotency key and system-of-record reconciliation prove whether the first attempt completed.

## Escalation Evidence

Provide the operator with trace ID, failure class, order ID if permitted, component versions, policy decision, tool result class, and current authoritative state. Do not include raw credentials, full private content, or unrestricted prompts.
