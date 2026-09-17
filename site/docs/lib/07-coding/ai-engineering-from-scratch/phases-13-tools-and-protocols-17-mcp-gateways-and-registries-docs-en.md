---
title: "Stateless MCP Gateways and Registry Admission"
sourceId: "07-coding/ai-engineering-from-scratch"
sourceTitle: "AI Engineering from Scratch（英文原版）"
sourceKind: "源码研读"
licenseLabel: "可转载"
lang: "英文"
tier: 2
volume: "07-coding"
sourceUrl: "https://github.com/rohitg00/ai-engineering-from-scratch"
entryUrl: "https://github.com/rohitg00/ai-engineering-from-scratch/blob/d18b8fe5a913c46011a3b06cb6ebd6a924414fd3/phases/13-tools-and-protocols/17-mcp-gateways-and-registries/docs/en.md"
sourceRel: "phases/13-tools-and-protocols/17-mcp-gateways-and-registries/docs/en.md"
rawUrl: "/raw/07-coding/ai-engineering-from-scratch/phases/13-tools-and-protocols/17-mcp-gateways-and-registries/docs/en.md"
sourceSha256: "6c72285350d087babd97ec9907f94137be217337999ed1b4e44f299b4e3b1692"
pageSha256: "6c72285350d087babd97ec9907f94137be217337999ed1b4e44f299b4e3b1692"
contentMode: "local-full"
zh: ""
---

# Stateless MCP Gateways and Registry Admission

> A gateway should make every route explicit. The 2026-07-28 protocol gives it method, name, version, capability, identity, cache, and trace boundaries without a transport session.

**Type:** Learn
**Languages:** Python
**Prerequisites:** Phase 13 · 15 (security), Phase 13 · 16 (authorization)
**Time:** ~75 minutes

## Learning Objectives

- Aggregate several MCP servers behind one 2026-07-28 endpoint without session affinity.
- Validate per-request metadata and routing headers before policy or forwarding.
- Merge tools with stable namespaces, deterministic order, descriptor pins, RBAC, and private caching.
- Treat registry records as discovery evidence that still requires admission policy.
- Route request-scoped SSE, `subscriptions/listen`, MRTR retries, and Tasks extension calls correctly.
- Isolate legacy handshake and session support from the modern path.

## The Problem

Connecting one client directly to one server is simple. A larger deployment needs a consistent answer to harder questions:

- Which servers are allowed?
- Which principal can see and call each tool?
- What happens when two backends expose the same name?
- How are descriptor changes reviewed?
- Where are rate limits and audit events applied?
- Can any instance handle the next request?

A gateway sits between clients and backend MCP servers. It presents one MCP endpoint, applies cross-cutting policy, and forwards approved requests.

Older gateway designs often multiplexed one client session into several backend sessions and rewrote `Mcp-Session-Id`. That is a legacy compatibility design. The 2026-07-28 core has no protocol sessions.

## The Concept

### The modern gateway path

For each request:

1. Authenticate the principal from transport authorization.
2. Validate `MCP-Protocol-Version`, `Mcp-Method`, `Mcp-Name`, and `params._meta`.
3. Authorize the principal, resource, method, tool, and arguments.
4. Apply descriptor, registry, rate, and data policy.
5. Create a fresh self-contained request for the selected backend.
6. Validate the backend result and return a gateway result.
7. Record an audit event without logging secrets.

No step needs a hidden protocol session. Application state can still exist in databases, explicit handles, Tasks, or integrity-protected MRTR state.

### Runtime policy is the primary gateway decision

Admission decides which backend version may enter the gateway. It does not authorize a live call. For every request, the gateway recomputes policy from the authenticated principal, issuer and resource, tenant, matched method and name, normalized arguments, admitted descriptor pin, current backend health, capability intersection, data classification, rate state, and any action-bound approval.

This ordering matters. A Registry record can remain active while a user's role is revoked. A descriptor can remain pinned while a destination argument crosses a tenant boundary. A backend can remain approved while incident policy quarantines state-changing calls. Runtime policy is therefore the primary allow or deny decision, with Registry and descriptor evidence as inputs.

Do not cache an allow decision under a connection or removed session identifier. If policy is unavailable, follow a declared failure policy by operation class. A safe default is to fail closed for state changes and sensitive reads, while explicitly approved public read paths may use a short-lived last-known policy only when their risk model permits it. Record which policy version and failure path made the decision, then validate the backend result before returning it.

### One POST endpoint

Modern Streamable HTTP sends each JSON-RPC message through POST:

```text
POST /mcp
