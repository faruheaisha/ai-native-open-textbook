---
title: "claude-code-docs-official"
sourceId: "09-harness/claude-code-docs-official"
sourceTitle: "claude-code-docs-official"
sourceKind: "官方文档"
licenseLabel: "仅引用"
lang: "英文"
tier: 3
volume: "09-harness"
sourceUrl: "https://code.claude.com/docs"
entryUrl: "https://code.claude.com/docs"
sourceRel: "en/tools-reference.md"
rawUrl: "/raw/09-harness/claude-code-docs-official/en/tools-reference.md"
sourceSha256: "f928a98a3f2e69421eeadeb064439c827340f4b19a28c7ad920c2a0e60b142f9"
pageSha256: "19bc297de32e69c25780980450cb2a9305aa25643bd37cbe572ca13a6e756d83"
contentMode: "local-full"
zh: ""
---

## WebFetch tool behavior

WebFetch takes a URL and a prompt describing what to extract. It fetches the page, converts the response to Markdown when the server returns HTML, and runs the prompt against the content using a small, fast model. For most fetches, Claude receives that model's answer, not the raw page. The conversion step is not configurable.

This makes WebFetch lossy by design. The extraction prompt determines what reaches Claude, so a result that says a page doesn't mention something may only mean the prompt didn't ask about it. Ask Claude to fetch again with a more specific prompt, or use `curl` via Bash for the unprocessed page.

A few behaviors shape the response Claude receives:

* HTTP URLs are automatically upgraded to HTTPS.
* Large pages are truncated to a fixed character limit before processing.
* WebFetch caches each response for 15 minutes by default, so repeated fetches of the same URL return quickly. On Claude Code v2.1.233 or later, set [`CLAUDE_CODE_WEBFETCH_CACHE_TTL_MS`](https://code.claude.com/docs/en/env-vars#variables) to change how long WebFetch keeps each response.
* A page that hasn't finished downloading within five minutes, including any redirects WebFetch follows, fails with a deadline error. On Claude Code v2.1.268 or later, set [`CLAUDE_CODE_WEBFETCH_DEADLINE_MS`](https://code.claude.com/docs/en/env-vars#variables) to change the limit, or to `0` to remove it.
* When a URL redirects to a different host, WebFetch returns a text result that names the original URL and the redirect target instead of following it. Claude then fetches the new URL with a second WebFetch call.
* When the extraction step hits an overloaded API, Claude Code retries it with backoff; a fetch that still fails returns an error result. Before v2.1.212, the API error text could reach Claude as if it were the extracted page content.

In Manual and `acceptEdits` [permission modes](https://code.claude.com/docs/en/permission-modes), WebFetch prompts before fetching, except for domains your [permission rules](https://code.claude.com/docs/en/permissions#manage-permissions) already allow or deny and a built-in set of preapproved documentation domains that fetch without a prompt. Whatever your rules allow, a fetch also passes the [WebFetch domain safety check](https://code.claude.com/docs/en/data-usage#webfetch-domain-safety-check) first; that section covers what the check sends and the setting that skips it. The prompt offers three options:

* **Yes**: approves this fetch only. The next WebFetch call prompts again, even for the same domain.
* **Yes, and don't ask again for `<domain>`**: approves the fetch and saves a `WebFetch(domain:...)` allow rule for that domain to `.claude/settings.local.json` for that repository. See [how saved approvals persist](https://code.claude.com/docs/en/permissions#permission-system). When your organization sets [`allowManagedPermissionRulesOnly`](https://code.claude.com/docs/en/permissions#managed-only-settings), Claude Code hides this option.
* **No, and tell Claude what to do differently**: rejects the fetch.

To allow a domain in advance without a prompt, add an allow rule like `WebFetch(domain:example.com)`; `WebFetch(domain:*)` allows every domain. The `auto` and `bypassPermissions` [permission modes](https://code.claude.com/docs/en/permissions#permission-modes) skip the prompt, except for a domain an explicit `ask` rule matches.

An explicit `WebFetch(domain:...)` rule in `deny`, `ask`, or `allow` takes precedence over the preapproved set, so you can block a preapproved domain or require a prompt for it.

WebFetch sets a `User-Agent` header beginning with `Claude-User`, and an `Accept` header that prefers Markdown over HTML so servers that support content negotiation can return Markdown directly.

Sandboxed commands don't inherit WebFetch's built-in set of preapproved documentation domains. To let a sandboxed command reach a domain without a prompt, add the domain to [`allowedDomains`](https://code.claude.com/docs/en/settings-reference#sandbox-network-alloweddomains) or allow it with a `WebFetch(domain:...)` rule, which the [sandbox also honors](https://code.claude.com/docs/en/sandboxing#network-isolation). WebFetch never reads the sandbox allowlist in return, so adding a domain to a sandbox or organization network allowlist doesn't stop WebFetch from prompting for it.
