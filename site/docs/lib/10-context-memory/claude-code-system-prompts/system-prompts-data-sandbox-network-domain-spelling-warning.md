---
title: "Claude Code System Prompts"
sourceId: "10-context-memory/claude-code-system-prompts"
sourceTitle: "Claude Code System Prompts"
sourceKind: "源码研读"
licenseLabel: "可转载"
lang: "英文"
tier: 2
volume: "10-context-memory"
sourceUrl: "https://github.com/Piebald-AI/claude-code-system-prompts"
entryUrl: "https://github.com/Piebald-AI/claude-code-system-prompts/blob/3af4c6139aaabb0470440961ca8c8fb871099234/system-prompts/data-sandbox-network-domain-spelling-warning.md"
sourceRel: "system-prompts/data-sandbox-network-domain-spelling-warning.md"
rawUrl: "/raw/10-context-memory/claude-code-system-prompts/system-prompts/data-sandbox-network-domain-spelling-warning.md"
sourceSha256: "a38667e430f8ae2e45496e041bb41c3c2114678848ce6b9bcac2713e68fc5aa0"
pageSha256: "a38667e430f8ae2e45496e041bb41c3c2114678848ce6b9bcac2713e68fc5aa0"
contentMode: "local-full"
zh: ""
---

# Claude Code System Prompts

Found: $\{FORMAT_SANDBOX_DOMAIN_WARNINGS_FN(SANDBOX_DOMAIN_WARNINGS)\}. IPv6 literals must be bracketed, with any port 1-65535 and no leading zeros ("[::1]", "[::1]:443"); non-IPv6 entries must not contain wildcards in brackets, extra colons, "@", or path/query characters, and must use their canonical spelling (lowercase, no trailing dot, punycode). Until fixed, enforcement is conservative: a denied entry denies at least what any parseable reading denies (an entry with no parseable reading denies nothing); an allowed entry never allows more than written and may be removed entirely; bracketed IPv6-glob entries apply to in-process checks only, not the sandbox proxy.
