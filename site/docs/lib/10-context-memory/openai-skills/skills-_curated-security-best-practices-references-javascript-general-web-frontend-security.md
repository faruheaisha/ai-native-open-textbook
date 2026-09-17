---
title: "Frontend JavaScript/TypeScript Web Security Spec (Vanilla Browser JS/TS, Modern Browsers)"
sourceId: "10-context-memory/openai-skills"
sourceTitle: "Agent Skills"
sourceKind: "技能与配置库"
licenseLabel: "仅引用"
lang: "英文"
tier: 3
volume: "10-context-memory"
sourceUrl: "https://github.com/openai/skills"
entryUrl: "https://github.com/openai/skills/blob/49f948faa9258a0c61caceaf225e179651397431/skills/.curated/security-best-practices/references/javascript-general-web-frontend-security.md"
sourceRel: "skills/.curated/security-best-practices/references/javascript-general-web-frontend-security.md"
rawUrl: "/raw/10-context-memory/openai-skills/skills/.curated/security-best-practices/references/javascript-general-web-frontend-security.md"
sourceSha256: "3a7bc7b3f6e7ff043db9dbaa8933894d7a19d987d0607e4ddae5d70184a63d63"
pageSha256: "3a7bc7b3f6e7ff043db9dbaa8933894d7a19d987d0607e4ddae5d70184a63d63"
contentMode: "local-full"
zh: ""
---

# Frontend JavaScript/TypeScript Web Security Spec (Vanilla Browser JS/TS, Modern Browsers)

This document is designed as a **security spec** that supports:

1. **Secure-by-default code generation** for new frontend JavaScript/TypeScript (no specific framework assumed).
2. **Security review / vulnerability hunting** in existing frontend code (passive “notice issues while working” and active “scan the repo and report findings”).

It is intentionally written as a set of **normative requirements** (“MUST/SHOULD/MAY”) plus **audit rules** (what bad patterns look like, how to detect them, and how to fix/mitigate them).

---

## 0) Safety, boundaries, and anti-abuse constraints (MUST FOLLOW)

* MUST NOT request, output, log, hard-code, or commit secrets (API keys intended to be secret, private keys, passwords, OAuth refresh tokens, session tokens, cookies).
  Notes:

  * Frontend code is inherently observable by end users. If a value must remain secret, it must not be in browser-delivered code.
  * If the project uses “public” keys (e.g., publishable analytics keys), they MUST be treated as non-secret and scoped accordingly.

* MUST NOT “fix” security by disabling protections (e.g., weakening CSP with `unsafe-inline`/`unsafe-eval` without justification, removing origin checks for `postMessage`, switching to `innerHTML` for convenience, accepting arbitrary redirects/URLs, or turning off sanitization).

* MUST provide **evidence-based findings** during audits: cite file paths, code snippets, and relevant HTML/CSP/config values that justify the claim.

* MUST treat uncertainty honestly:

  * Security headers (CSP, frame-ancestors, etc.) might be set by server/edge/CDN rather than in repo code. If not visible, report as “not visible here; verify at runtime/edge config.” (Also note that `<meta http-equiv=...>` only simulates a subset of headers; don’t assume other security headers exist just because a meta tag exists.) ([MDN Web Docs][1])

---

## 1) Operating modes

### 1.1 Generation mode (default)

When asked to write new frontend JS/TS code or modify existing code:

* MUST follow every **MUST** requirement in this spec.
* SHOULD follow every **SHOULD** requirement unless the user explicitly says otherwise.
* MUST prefer safe-by-default browser APIs and proven libraries over custom security code (especially for HTML sanitization).
* MUST avoid introducing new risky sinks (DOM XSS injection sinks like `innerHTML`, navigation to `javascript:` URLs, dynamic code execution via `eval`/`Function`, unsafe `postMessage`, unsafe third-party script loading, etc.). ([OWASP Cheat Sheet Series][2])

### 1.2 Passive review mode (always on while editing)

While working anywhere in a frontend repo (even if the user did not ask for a security scan):

* MUST “notice” violations of this spec in touched/nearby code.
* SHOULD mention issues as they come up, with a brief explanation + safe fix.

### 1.3 Active audit mode (explicit scan request)

When the user asks to “scan”, “audit”, or “hunt for vulns”:

* MUST systematically search the codebase for violations of this spec.
* MUST output findings in a structured format (see §2.3).

Recommended audit order:

1. HTML entrypoints (`index.html`, server-rendered templates), script/style includes, and any CSP delivery (header vs meta). ([W3C][3])
2. DOM XSS sinks (`innerHTML`, `document.write`, `insertAdjacentHTML`, event-handler attributes) and their data sources (URL params/hash, storage, postMessage, API responses). ([OWASP Cheat Sheet Series][2])
3. Navigation/redirect handling (`window.location*`, link targets, URL allowlists) including `javascript:` URL hazards. ([MDN Web Docs][4])
4. Cross-origin communication (`postMessage`, iframe embed patterns, sandboxing). ([MDN Web Docs][5])
5. Storage of sensitive data (localStorage/sessionStorage) and assumptions about trust. ([OWASP Cheat Sheet Series][6])
6. Third-party scripts / tag managers / CDNs, and integrity controls (SRI) and policy controls (CSP). ([OWASP Cheat Sheet Series][7])
7. DOM clobbering gadgets and unsafe reliance on `window`/`document` named properties. ([OWASP Cheat Sheet Series][8])

---

## 2) Definitions and review guidance

### 2.1 Untrusted input (treat as attacker-controlled unless proven otherwise)

Examples include:

* URL-derived data: `location.href`, `location.search`, `location.hash`, `document.baseURI`, `new URLSearchParams(location.search)`, routing fragments. ([OWASP Cheat Sheet Series][2])
* DOM content that may include user-controlled markup (comments, profiles, CMS content, markdown-to-HTML output, etc.), especially if inserted dynamically. ([OWASP Cheat Sheet Series][2])
* `postMessage` event data (`event.data`) and metadata (`event.origin`) from other windows/frames. ([MDN Web Docs][5])
* Browser storage: `localStorage`, `sessionStorage`, IndexedDB (contents can be attacker-influenced via XSS or local machine access; never treat as “trusted”). ([OWASP Cheat Sheet Series][6])
* Any data returned from network calls (even if from “your API”), because it may contain stored attacker content that becomes dangerous only when inserted into the DOM. ([OWASP Cheat Sheet Series][2])

### 2.2 Dangerous sink (DOM XSS / code execution sink)

A sink is any API/operation that can execute script or interpret attacker-controlled strings as HTML/JS/URL in a security-sensitive way. High-signal sinks include:

* HTML parsing / insertion: `innerHTML`, `outerHTML`, `insertAdjacentHTML`, `document.write`, `document.writeln`. ([OWASP Cheat Sheet Series][2])
* Dynamic code execution: `eval`, `new Function`, `setTimeout("...")`, `setInterval("...")`. ([MDN Web Docs][10])
* Navigation to script-bearing URLs (e.g., `javascript:`) via setters like `Location.href`/`window.location` (and via link `href` if attacker-controlled). ([MDN Web Docs][4])
* Setting event handler attributes from strings, e.g. `setAttribute("onclick", "...")`. ([OWASP Cheat Sheet Series][2])

### 2.3 Required audit finding format

For each issue found, output:

* Rule ID:
* Severity: Critical / High / Medium / Low
* Location: file path + function/class/module + line(s)
* Evidence: the exact code/config snippet
* Impact: what could go wrong, who can exploit it
* Fix: safe change (prefer minimal diff)
* Mitigation: defense-in-depth if immediate fix is hard
* False positive notes: what to verify if uncertain

---

## 3) Secure baseline: minimum production configuration (MUST in production)

This is the smallest baseline that prevents common frontend JS/TS security misconfigurations. Some items are “in repo” (HTML/JS) and some may live at the server/edge.

### 3.1 Content Security Policy (CSP) baseline (SHOULD; MUST for high-risk apps)

* SHOULD deliver CSP via HTTP response headers when possible.
* MAY deliver CSP via an HTML `<meta http-equiv="Content-Security-Policy" ...>` tag when you cannot set headers (e.g., purely static hosting constraints). ([MDN Web Docs][1])
* If using CSP via `<meta http-equiv>`, MUST understand the limitations:

  * The policy only applies to content that follows the meta element (so it must appear very early, before any scripts/resources you want governed). ([W3C][3])
  * The following directives are **not supported** in a meta-delivered policy and will be ignored: `report-uri`, `frame-ancestors`, and `sandbox`. ([W3C][3])
  * “Report-only” CSP cannot be set via a meta element. ([W3C][3])

Practical baseline goals:

* Avoid script sources `unsafe-inline` and `unsafe-eval` (they significantly weaken CSP’s value against XSS). ([MDN Web Docs][10])
* Prefer nonce- or hash-based script policies if you need inline scripts. ([MDN Web Docs][10])
* Consider enabling Trusted Types enforcement where feasible. ([MDN Web Docs][11])

### 3.2 Third-party scripts baseline (SHOULD)

* SHOULD minimize third-party script execution and treat it as equivalent privilege to first-party JS (it runs with your origin’s privileges). ([OWASP Cheat Sheet Series][7])
* SHOULD use Subresource Integrity (SRI) for third-party scripts/styles loaded from CDNs. ([MDN Web Docs][12])

### 3.3 Cross-window communication baseline (SHOULD)

* SHOULD restrict `postMessage` communications to explicit origins, and validate both origin and message shape. ([MDN Web Docs][5])

---

## 4) Rules (generation + audit)

Each rule contains: required practice, insecure patterns, detection hints, and remediation.

### JS-XSS-001: Do not inject untrusted HTML into the DOM (avoid `innerHTML` and friends)

Severity: Critical if you can prove attacker-controlled input can reach these APIs; otherwise Medium

Required:

* MUST treat `innerHTML`, `outerHTML`, and `insertAdjacentHTML` as dangerous sinks when their input can contain untrusted data. ([OWASP Cheat Sheet Series][2])
* MUST prefer safe DOM APIs that do not parse HTML:

  * `textContent` for text. ([OWASP Cheat Sheet Series][2])
  * `document.createElement`, `appendChild`, `setAttribute` for non-event-handler attributes. ([OWASP Cheat Sheet Series][2])
* If HTML insertion is truly required, SHOULD sanitize with a well-reviewed HTML sanitizer and strongly consider enforcing Trusted Types to confine usage to audited code paths. ([MDN Web Docs][11])

Insecure patterns:

* `el.innerHTML = userInput`
* `el.insertAdjacentHTML('beforeend', userInput)`
* `el.outerHTML = userInput`

Detection hints:

* Search for: `.innerHTML`, `.outerHTML`, `insertAdjacentHTML(`.
* Trace the origin of inserted string: URL params/hash, postMessage, storage, API responses, DOM attributes. ([OWASP Cheat Sheet Series][2])

Fix:

* Replace with `textContent` for plain text. ([OWASP Cheat Sheet Series][2])
* For structured UI, build DOM nodes explicitly.
* For “rich text” requirements:

  * Sanitize using an allowlist-based sanitizer.
  * Prefer returning safe “components” instead of arbitrary HTML strings.
  * Use Trusted Types enforcement to ensure only `TrustedHTML` reaches sinks where supported. ([MDN Web Docs][11])

Mitigation:

* Deploy a strict CSP and consider Trusted Types enforcement (`require-trusted-types-for 'script'`). ([MDN Web Docs][10])

False positive notes:

* If the string is provably constant or fully generated from trusted constants, it may be safe. Still prefer safer APIs.

---

### JS-XSS-002: Avoid `document.write` / `document.writeln` (XSS + document clobbering hazards)

Severity: Critical if you can prove attacker-controlled input can reach these APIs; otherwise Medium 

Required:

* MUST avoid `document.write()` and `document.writeln()` in production code (they are XSS vectors and can be abused with crafted HTML even if some browsers block injected `` with no `integrity`.
* Loading `latest` or unpinned third-party resources.

Detection hints:

* Search for `<script src="https://` and `<link rel="stylesheet" href="https://` without `integrity=`.
* Check whether `integrity` is present and uses strong hashes (sha256/384/512 are typical). ([MDN Web Docs][12])

Fix:

* Add `integrity="sha384-..."` (or appropriate) and ensure proper CORS mode where needed.
* Prefer self-hosting critical libraries.

---

### FS-DOMC-001: Prevent DOM clobbering (avoid relying on `window`/`document` named properties)

Severity: Medium to High (can become Critical if it enables script loading or `javascript:` navigation)

Required:

* MUST NOT rely on implicit global variables or `window.someName` / `document.someName` lookups that can be clobbered by injected HTML elements with matching `id`/`name`. ([OWASP Cheat Sheet Series][8])
* MUST avoid patterns like `let x = window.redirectTo || "/safe"; location.assign(x);` where `redirectTo` could be clobbered to an `<a>` element whose `href` is attacker-controlled (including `javascript:`). ([OWASP Cheat Sheet Series][8])
* SHOULD use explicit variable declarations, local scope, and explicit DOM queries (`getElementById`) rather than named property access. ([OWASP Cheat Sheet Series][8])
* If the app inserts user-controlled markup (even sanitized), SHOULD ensure sanitization strategies consider `id`/`name` collisions. ([OWASP Cheat Sheet Series][8])

Insecure patterns:

* `const cfg = window.config || \{\};` used for security-sensitive URLs.
* `const redirect = window.redirectTo || "/"; location.assign(redirect);` ([OWASP Cheat Sheet Series][8])
* Loading scripts from `window.*` config values without strict validation.

Detection hints:

* Search for `window.` and `document.` used as config stores (especially `||` fallback patterns).
* Search for usage of `location.assign/replace` with variables that come from `window`/`document` properties.
* Search for dynamic script creation (`createElement('script')`) where `.src` comes from a non-local variable. ([OWASP Cheat Sheet Series][8])

Fix:

* Store config in module-scoped constants (not on `window`/`document`) and pass it explicitly.
* Validate any URL-like config with protocol/origin allowlists (see FEJS-URL-001). ([OWASP Cheat Sheet Series][8])
* Consider hardening: sanitization, CSP, and (in limited cases) freezing sensitive objects, but treat these as defense-in-depth, not a substitute for safe coding patterns. ([OWASP Cheat Sheet Series][8])

---

## 5) Practical scanning heuristics (how to “hunt”)

When actively scanning, use these high-signal patterns:

* DOM XSS sinks:

  * `.innerHTML`, `.outerHTML`, `insertAdjacentHTML(`
  * `document.write(`, `document.writeln(` ([OWASP Cheat Sheet Series][2])

* Dangerous navigation / URL sinks:

  * `window.location`, `location.href`, `location.assign`, `location.replace`
  * `javascript:` literals (and other suspicious schemes like `data:text/html`) ([MDN Web Docs][4])

* String-to-code execution:

  * `eval(`, `new Function`, `setTimeout("`, `setInterval("` ([MDN Web Docs][10])

* Event-handler string injection:

  * `.setAttribute("on`, `.onclick =`, `.onload =` with strings ([OWASP Cheat Sheet Series][2])

* `postMessage`:

  * `postMessage(` with `"*"` as targetOrigin
  * `addEventListener("message"` without strict `event.origin` allowlist checks ([MDN Web Docs][5])

* Storage:

  * `localStorage.setItem(` / `getItem(`, `sessionStorage.*`
  * keys containing `token`, `jwt`, `session`, `auth`, `refresh` ([OWASP Cheat Sheet Series][6])

* CSP and related:

  * `Content-Security-Policy` header config (server/edge)
  * `<meta http-equiv="Content-Security-Policy" ...>`
  * CSP containing `unsafe-inline` or `unsafe-eval`
  * `require-trusted-types-for` / `trusted-types` directives ([MDN Web Docs][1])

* Third-party scripts:

  * `<script src="https://...">` without `integrity=`
  * Tag manager snippets and dynamic script injection code paths ([MDN Web Docs][12])

* DOM clobbering gadgets:

  * `window.<name> || ...` and `document.<name> || ...` patterns
  * security-sensitive usage of `window`/`document` properties as config sources ([OWASP Cheat Sheet Series][8])

Always try to confirm:

* data origin (untrusted vs trusted),
* sink type (HTML parse, navigation, code execution, message handling, storage),
* protective controls present (CSP, Trusted Types, sanitizers, strict allowlists, schema validation).

---

## 6) Sources (accessed 2026-01-27)

Primary standards / platform docs:

* W3C Content Security Policy Level 2 (HTML `<meta>` delivery restrictions; unsupported directives in meta CSP): `https://www.w3.org/TR/CSP2/` ([W3C][3])
* MDN: CSP Guide (strict CSP, nonces/hashes, `unsafe-inline`/`unsafe-eval`, eval blocking): `https://developer.mozilla.org/en-US/docs/Web/HTTP/Guides/CSP` ([MDN Web Docs][10])
* MDN: `<meta http-equiv>` (CSP via meta and warning about meta-based security headers): `https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/meta/http-equiv` ([MDN Web Docs][1])
* MDN: `frame-ancestors` (and note it’s not supported in `<meta>`): `https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Headers/Content-Security-Policy/frame-ancestors` ([MDN Web Docs][18])

DOM XSS and dangerous sinks:

* OWASP: DOM Based XSS Prevention Cheat Sheet (dangerous sinks + safe patterns like `textContent`): `https://cheatsheetseries.owasp.org/cheatsheets/DOM_based_XSS_Prevention_Cheat_Sheet.html` ([OWASP Cheat Sheet Series][2])
* MDN: `innerHTML` (security considerations): `https://developer.mozilla.org/en-US/docs/Web/API/Element/innerHTML` ([MDN Web Docs][19])
* MDN: `insertAdjacentHTML` (security considerations): `https://developer.mozilla.org/en-US/docs/Web/API/Element/insertAdjacentHTML` ([MDN Web Docs][20])
* MDN: `document.write()` / `document.writeln()` (security considerations): `https://developer.mozilla.org/en-US/docs/Web/API/Document/write` and `https://developer.mozilla.org/en-US/docs/Web/API/Document/writeln` ([MDN Web Docs][13])

URL scheme hazards:

* MDN: `javascript:` URLs (execution on navigation; discouraged; references `window.location`): `https://developer.mozilla.org/en-US/docs/Web/URI/Reference/Schemes/javascript` ([MDN Web Docs][4])

Trusted Types:

* W3C: Trusted Types spec (DOM XSS sinks include `Element.innerHTML` and `Location.href` setters; goals and limitations): `https://www.w3.org/TR/trusted-types/` ([W3C][15])
* MDN: `require-trusted-types-for` directive: `https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Headers/Content-Security-Policy/require-trusted-types-for` ([MDN Web Docs][11])
* MDN: `trusted-types` directive: `https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Headers/Content-Security-Policy/trusted-types` ([MDN Web Docs][16])

Cross-window messaging:

* MDN: `window.postMessage` (security guidance: specify targetOrigin; validate origin): `https://developer.mozilla.org/en-US/docs/Web/API/Window/postMessage` ([MDN Web Docs][5])
* OWASP: HTML5 Security Cheat Sheet (Web Messaging guidance: explicit origin, strict checks, no `innerHTML`): `https://cheatsheetseries.owasp.org/cheatsheets/HTML5_Security_Cheat_Sheet.html` ([OWASP Cheat Sheet Series][6])

Third-party scripts and integrity:

* OWASP: Third Party JavaScript Management Cheat Sheet (risks and mitigations including SRI/mirroring): `https://cheatsheetseries.owasp.org/cheatsheets/Third_Party_Javascript_Management_Cheat_Sheet.html` ([OWASP Cheat Sheet Series][7])
* MDN: Subresource Integrity overview: `https://developer.mozilla.org/en-US/docs/Web/Security/Defenses/Subresource_Integrity` ([MDN Web Docs][12])
* W3C: Subresource Integrity spec: `https://www.w3.org/TR/sri-2/` ([W3C][21])

DOM clobbering:

* OWASP: DOM Clobbering Prevention Cheat Sheet (named property access risk; example attacks involving `location.assign` and `javascript:`): `https://cheatsheetseries.owasp.org/cheatsheets/DOM_Clobbering_Prevention_Cheat_Sheet.html` ([OWASP Cheat Sheet Series][8])

[1]: https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/meta/http-equiv "https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/meta/http-equiv"
[2]: https://cheatsheetseries.owasp.org/cheatsheets/DOM_based_XSS_Prevention_Cheat_Sheet.html "https://cheatsheetseries.owasp.org/cheatsheets/DOM_based_XSS_Prevention_Cheat_Sheet.html"
[3]: https://www.w3.org/TR/CSP2/ "Content Security Policy Level 2"
[4]: https://developer.mozilla.org/en-US/docs/Web/URI/Reference/Schemes/javascript "javascript: URLs - URIs | MDN"
[5]: https://developer.mozilla.org/en-US/docs/Web/API/Window/postMessage "https://developer.mozilla.org/en-US/docs/Web/API/Window/postMessage"
[6]: https://cheatsheetseries.owasp.org/cheatsheets/HTML5_Security_Cheat_Sheet.html "https://cheatsheetseries.owasp.org/cheatsheets/HTML5_Security_Cheat_Sheet.html"
[7]: https://cheatsheetseries.owasp.org/cheatsheets/Third_Party_Javascript_Management_Cheat_Sheet.html "https://cheatsheetseries.owasp.org/cheatsheets/Third_Party_Javascript_Management_Cheat_Sheet.html"
[8]: https://cheatsheetseries.owasp.org/cheatsheets/DOM_Clobbering_Prevention_Cheat_Sheet.html "https://cheatsheetseries.owasp.org/cheatsheets/DOM_Clobbering_Prevention_Cheat_Sheet.html"
[9]: https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Attributes/rel/noopener "https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Attributes/rel/noopener"
[10]: https://developer.mozilla.org/en-US/docs/Web/HTTP/Guides/CSP "https://developer.mozilla.org/en-US/docs/Web/HTTP/Guides/CSP"
[11]: https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Headers/Content-Security-Policy/require-trusted-types-for "https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Headers/Content-Security-Policy/require-trusted-types-for"
[12]: https://developer.mozilla.org/en-US/docs/Web/Security/Defenses/Subresource_Integrity "https://developer.mozilla.org/en-US/docs/Web/Security/Defenses/Subresource_Integrity"
[13]: https://developer.mozilla.org/en-US/docs/Web/API/Document/write "https://developer.mozilla.org/en-US/docs/Web/API/Document/write"
[14]: https://developer.mozilla.org/en-US/docs/Web/API/Document/writeln "https://developer.mozilla.org/en-US/docs/Web/API/Document/writeln"
[15]: https://www.w3.org/TR/trusted-types/ "https://www.w3.org/TR/trusted-types/"
[16]: https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Headers/Content-Security-Policy/trusted-types "https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Headers/Content-Security-Policy/trusted-types"
[18]: https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Headers/Content-Security-Policy/frame-ancestors "https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Headers/Content-Security-Policy/frame-ancestors"
[19]: https://developer.mozilla.org/en-US/docs/Web/API/Element/innerHTML "https://developer.mozilla.org/en-US/docs/Web/API/Element/innerHTML"
[20]: https://developer.mozilla.org/en-US/docs/Web/API/Element/insertAdjacentHTML "https://developer.mozilla.org/en-US/docs/Web/API/Element/insertAdjacentHTML"
[21]: https://www.w3.org/TR/sri-2/ "https://www.w3.org/TR/sri-2/"
