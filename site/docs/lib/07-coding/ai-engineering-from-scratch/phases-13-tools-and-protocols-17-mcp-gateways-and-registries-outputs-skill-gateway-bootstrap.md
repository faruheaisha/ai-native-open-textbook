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
entryUrl: "https://github.com/rohitg00/ai-engineering-from-scratch/blob/d18b8fe5a913c46011a3b06cb6ebd6a924414fd3/phases/13-tools-and-protocols/17-mcp-gateways-and-registries/outputs/skill-gateway-bootstrap.md"
sourceRel: "phases/13-tools-and-protocols/17-mcp-gateways-and-registries/outputs/skill-gateway-bootstrap.md"
rawUrl: "/raw/07-coding/ai-engineering-from-scratch/phases/13-tools-and-protocols/17-mcp-gateways-and-registries/outputs/skill-gateway-bootstrap.md"
sourceSha256: "bd0ec64d18ac8f22d1e1fb981fa992863baa9d5399959235cb041398be8ae87f"
pageSha256: "bd0ec64d18ac8f22d1e1fb981fa992863baa9d5399959235cb041398be8ae87f"
contentMode: "local-full"
zh: ""
---

# AI Engineering from Scratch（英文原版）

Given clients, backends, authorization requirements, and compliance constraints, produce a gateway design.

## Required inputs

- Public gateway resource URI, accepted protocol revisions, and transport.
- Authenticated principal and role model.
- Backend endpoints, issuers, resources, registry records, publisher evidence, and approved descriptors.
- Tool visibility, argument policy, cost classes, and data sensitivity.
- Streaming, change-notification, MRTR, and Tasks requirements.
- Audit, retention, trace, and redaction requirements.

## Produce

1. Stateless ingress. One POST endpoint, per-request version and capabilities, matching method and name headers, JSON or request-scoped SSE, and 405 for modern GET and DELETE. Validate header equality before version support. Specify HTTP 400 `-32020`, HTTP 400 `-32022` with exact supported and requested data, HTTP 404 `-32601`, optional error data serialization, and 202 empty-body notification handling.
2. Discovery plan. Implement gateway `server/discover`, discover each backend, expose only safe end-to-end capability intersections, and include current `resultType`, `ttlMs`, `cacheScope`, and server identity metadata.
3. Admission table. Validate the official Registry `server.json` publication shape and `com.example/*` style name separately from security admission. For every backend, join the record to external verified publisher namespace, provenance source, endpoint, version policy, descriptor digest, issuer, resource, approval, and expiry state.
4. Namespace map. Give every backend tool a stable qualified public name and retain a valid object-root `inputSchema` on every `tools/list` descriptor. Reject collision-by-order.
5. Authorization matrix. Map principal and role to public tool, resource, arguments, and scopes. Keep outer and backend credentials separate and issuer-bound.
6. Forwarding contract. Build a fresh self-contained backend request, advertise only mediated client capabilities, validate the backend result, and preserve trace correlation.
7. Cache plan. Make principal-dependent discovery and lists private. Set bounded TTLs and invalidation behavior.
8. Rate and audit policy. Key limits by principal, issuer, resource, tool, cost class, and time. Redact credentials and unnecessary sensitive arguments.
9. Interaction routing. Describe request-scoped SSE, `subscriptions/listen` acknowledgment and reconnect behavior, byte-exact MRTR state forwarding, and Tasks routing by task id in `Mcp-Name`.
10. Transport adapter. If the gateway receives parsed requests and headers, label it an in-process protocol model and connect it to Lesson 09 for JSON Content-Type and JSON plus SSE Accept enforcement.
11. Compatibility adapter. Fence older initialization, session ids, GET streams, resource subscriptions, and experimental task methods away from the modern gateway core.

## Hard rejects

- Session affinity, session stores, or session-id rewriting presented as required for 2026-07-28.
- Trusting registry presence or a display name without admission evidence.
- Silent tool collisions or descriptor pin updates without re-approval.
- Reusing the outer bearer token at a backend or a backend token at another issuer or resource.
- Public caching of a principal-filtered list.
- A standalone modern GET event stream, Last-Event-ID replay, or resource subscribe method.
- New `tasks/list` or `tasks/result` behavior.
- Rate limits keyed only by a removed protocol session.
- Security verification invented inside `server.json` instead of separate verified admission and provenance state.
- Namespaced tool descriptors that omit `inputSchema`.

## Output format

Return sections named Ingress, Discovery, Admission, Namespace Map, Authorization, Forwarding, Cache, Rate Limits, Audit, Interactions, and Legacy Adapter. End with the one route that requires the strongest acceptance test.
