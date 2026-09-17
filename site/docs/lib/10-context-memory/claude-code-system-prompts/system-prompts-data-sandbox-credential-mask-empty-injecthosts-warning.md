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
entryUrl: "https://github.com/Piebald-AI/claude-code-system-prompts/blob/3af4c6139aaabb0470440961ca8c8fb871099234/system-prompts/data-sandbox-credential-mask-empty-injecthosts-warning.md"
sourceRel: "system-prompts/data-sandbox-credential-mask-empty-injecthosts-warning.md"
rawUrl: "/raw/10-context-memory/claude-code-system-prompts/system-prompts/data-sandbox-credential-mask-empty-injecthosts-warning.md"
sourceSha256: "838e6eff3086991815a56067eb68ac63e740b4afecf292c65973c25389bff76b"
pageSha256: "838e6eff3086991815a56067eb68ac63e740b4afecf292c65973c25389bff76b"
contentMode: "local-full"
zh: ""
---

# Claude Code System Prompts

proxy never substitutes the real credential, so tools needing these will fail to authenticate. If the adapter forced this (a filesystem.allowRead entry re-opened a denied credential path), remove the conflicting allowRead entry or the deny; if a parent/managed settings tier supplied this mask, sentinel-only is its intended posture (that channel cannot grant injection, so an injectHosts set there is stripped on load) and the entry can only be removed in the parent settings; otherwise set injectHosts or remove the entry
