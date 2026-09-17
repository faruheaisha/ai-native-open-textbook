---
title: "Visual Companion Auth Hardening Design"
sourceId: "10-context-memory/superpowers"
sourceTitle: "Superpowers（Claude Code 技能库）"
sourceKind: "技能与配置库"
licenseLabel: "可转载"
lang: "英文"
tier: 3
volume: "10-context-memory"
sourceUrl: "https://github.com/obra/superpowers"
entryUrl: "https://github.com/obra/superpowers/blob/b36e0829c6d0140e93cfef2ca599b1b07d4a7797/docs/superpowers/specs/2026-06-10-visual-companion-auth-hardening-design.md"
sourceRel: "docs/superpowers/specs/2026-06-10-visual-companion-auth-hardening-design.md"
rawUrl: "/raw/10-context-memory/superpowers/docs/superpowers/specs/2026-06-10-visual-companion-auth-hardening-design.md"
sourceSha256: "8d97d0384c61c0400fb67429a4384ad989bdc11953cce160069c368ac1f7e362"
pageSha256: "8d97d0384c61c0400fb67429a4384ad989bdc11953cce160069c368ac1f7e362"
contentMode: "local-full"
zh: ""
---

# Visual Companion Auth Hardening Design

**Date:** 2026-06-10
**Status:** Draft for Drew review

## Goal

Fix the security and reliability gaps found in PR #1720's brainstorming visual
companion without changing the companion's core workflow or adding runtime
dependencies.

The fixes must be test-first and must leave clear automated evidence for:

- cross-origin browser tabs cannot inject companion events by riding cookies
- restart reconnect works without depending only on browser cookie behavior
- bearer keys do not remain in the visible URL after bootstrap
- `/files/*` cannot serve files outside the content directory
- future same-origin vendored UI libraries still work

## Threat Model

The companion serves agent-generated local UI for a single brainstorming
session. The important assets are:

- screen content served from the companion
- the session key
- `state/events`, which the agent reads as user feedback
- local files under the companion session directory

In scope attackers:

- a malicious browser tab on another `localhost` port
- a browser page that can make requests to the companion but should not be able
  to authenticate as the companion UI
- a direct remote client when the server is bound to a non-loopback interface
- accidental leakage through URL history, referrers, or committed local state
- content-directory symlinks or path tricks that escape `/files/*`

Out of scope for this fix:

- malicious agent-authored screen HTML
- malicious same-origin vendored JavaScript loaded by a companion screen

This out-of-scope boundary is intentional. Companion screens are part of the
agent UI surface. They may use inline scripts today and may someday use
same-origin vendored libraries such as Alpine or Three.js. Protecting against
malicious screen HTML would require a larger sandboxed-iframe architecture with
a narrow message bridge; that is not the scope of this PR hardening pass.

## Current Failures

Automated and headed-browser testing found these failures in the PR branch:

1. A cross-origin localhost page can open a cookie-authenticated WebSocket and
   write attacker-controlled choices to `state/events` after the real companion
   page sets the cookie.
2. `/files/*` serves symlinks that point outside `content/`, including a symlink
   to `state/server-info` containing the keyed URL.
3. The session key remains in the URL of the actual screen page, so same-origin
   screen JavaScript and accidental referrers/history can see it.
4. The helper reconnects with a keyless `ws://host` URL. In headed Chrome, after
   a same-port/same-token restart, the browser stopped presenting the cookie to
   the restarted server, so the open tab stayed stuck on the tombstone until a
   manual reload.
5. Shell lint and the lifecycle test need cleanup so the test pass is stable in
   Codex.

## Design

### 1. Bootstrap Keyed Loads

`GET /?key=<token>` becomes a bootstrap response, not the screen response.

When the key is valid, the server:

1. sets the HttpOnly session cookie as it does today
2. returns a small HTML bootstrap page
3. the bootstrap page stores the key in tab-scoped `sessionStorage`
4. the bootstrap page navigates to `/` using `location.replace('/')`

After this, the visible screen URL is bare `/`, not `/?key=...`.

`GET /` with a valid cookie serves the current screen. `GET /` without a valid
cookie still returns the friendly 403 page. `GET /?key=<wrong>` returns 403.

Why `sessionStorage`: the helper needs a reconnect credential that survives
same-port restarts and does not depend only on cookie behavior. Because screen
HTML is trusted same-origin UI, storing the key in tab-scoped storage is
acceptable for this threat model. It is materially better than leaving the key
in the address bar, history, and referrer surface.

### 2. WebSocket Same-Origin Enforcement

WebSocket upgrades must pass both checks:

1. valid session auth by query key or cookie
2. if an `Origin` header is present, it must match the request target origin

The origin check should compare:

```text
Origin === "http://" + req.headers.host
```

Browser attacker page example:

```text
Origin: http://localhost:9999
Host: localhost:58088
```

This must be rejected even if the browser sends the companion cookie.

Legitimate companion page example:

```text
Origin: http://localhost:58088
Host: localhost:58088
```

This should be accepted when the key or cookie is valid.

Direct non-browser clients may omit `Origin`; they still need the session key.

### 3. Helper Reconnect Credential

`helper.js` should read the tab-scoped key from `sessionStorage` and append it
to the WebSocket URL:

```text
