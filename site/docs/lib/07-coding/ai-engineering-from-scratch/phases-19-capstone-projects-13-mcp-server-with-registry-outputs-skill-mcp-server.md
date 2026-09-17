---
title: "AI Engineering from Scratch（英文原版）"
sourceId: "07-coding/ai-engineering-from-scratch"
sourceTitle: "AI Engineering from Scratch（英文原版）"
sourceKind: "源码研读"
licenseLabel: "可转载"
lang: "英文"
tier: 2
volume: "07-coding"
sourceUrl: "https://github.com/rohitg00/ai-engineering-from-scratch"
entryUrl: "https://github.com/rohitg00/ai-engineering-from-scratch/blob/d18b8fe5a913c46011a3b06cb6ebd6a924414fd3/phases/19-capstone-projects/13-mcp-server-with-registry/outputs/skill-mcp-server.md"
sourceRel: "phases/19-capstone-projects/13-mcp-server-with-registry/outputs/skill-mcp-server.md"
rawUrl: "/raw/07-coding/ai-engineering-from-scratch/phases/19-capstone-projects/13-mcp-server-with-registry/outputs/skill-mcp-server.md"
sourceSha256: "6198744a4fd927bbfc431b40fbf41ba415a0086414d0ed40e27f84cbdece6a5e"
pageSha256: "6198744a4fd927bbfc431b40fbf41ba415a0086414d0ed40e27f84cbdece6a5e"
contentMode: "local-full"
zh: ""
---

# AI Engineering from Scratch（英文原版）

Given an internal platform need, design a stateless MCP server and governance boundary targeting protocol revision `2026-07-28`.

Build plan:

1. A schema-valid `server.json` whose reverse-DNS name matches the publisher's authenticated namespace.
2. Mandatory `server/discover` for live versions, capabilities, extensions, and server identity.
3. Version and client capabilities in every request `_meta`; `resultType` and server identity in every result.
4. Deterministic `tools/list` with `ttlMs` and `cacheScope`.
5. POST-only Streamable HTTP with required version, method, and name headers; no protocol sessions, GET stream, session DELETE, or replay header.
6. Authorization that validates issuer, audience, expiry, and scopes on every call.
7. Policy over actor, tool, target, and normalized arguments. Bind high-risk approvals to the exact action and expiry, then prove that changing one argument rejects replay.
8. Redacted audit and trace evidence outside model-visible context.
9. A registry adapter that validates `server.json`, probes `server/discover`, and reports metadata/runtime drift.
10. Two interchangeable replicas and a concurrent load probe with no session affinity.

Assessment rubric:

| Weight | Criterion | Measurement |
|:-:|---|---|
| 25 | Protocol correctness | Stateless envelopes, discovery, results, headers, and negative cases |
| 20 | Authorization | Issuer, audience, expiry, scope, and exact-action approval cases |
| 15 | Registry integrity | Valid `server.json`, live probe, and drift report |
| 15 | Policy and safety | Allow, deny, malformed, stale approval, and sensitive-data cases |
| 15 | Scale | Two replicas with no affinity dependency plus cancellation and recovery |
| 10 | Auditability | Redacted receiver-side audit and trace evidence |

Hard rejects:

- A current MCP design that uses `initialize`, `notifications/initialized`, or `Mcp-Session-Id`.
- Treating `server.json` as live capability discovery or inventing `.well-known/mcp-capabilities` as an MCP requirement.
- Publishing a server name outside the namespace authenticated for that publisher.
- Accepting a token without issuer and audience or resource validation.
- Treating tool annotations or a chat approval as authorization.
- Audit records that persist secrets or raw sensitive data.

Refusal rules:

- Refuse to claim production readiness from the local simulations alone.
- Refuse to expose a state-changing tool without policy and action-bound approval evidence.
- Refuse to publish metadata that points to an endpoint whose live discovery cannot be verified.

Output: a build plan and evidence matrix covering publication metadata, live discovery, stateless transport, tool schemas, authorization, policy, approval, audit, and scale. End with the highest-risk boundary and the exact failure test that proves it fails closed.
