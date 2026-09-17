---
title: "Artifact runtime capabilities"
sourceId: "10-context-memory/claude-code-system-prompts"
sourceTitle: "Claude Code System Prompts"
sourceKind: "源码研读"
licenseLabel: "可转载"
lang: "英文"
tier: 2
volume: "10-context-memory"
sourceUrl: "https://github.com/Piebald-AI/claude-code-system-prompts"
entryUrl: "https://github.com/Piebald-AI/claude-code-system-prompts/blob/3af4c6139aaabb0470440961ca8c8fb871099234/system-prompts/data-artifact-runtime-capability-declarations.md"
sourceRel: "system-prompts/data-artifact-runtime-capability-declarations.md"
rawUrl: "/raw/10-context-memory/claude-code-system-prompts/system-prompts/data-artifact-runtime-capability-declarations.md"
sourceSha256: "5fe619d0c895315c620b484ef22bd7caa62ef75d2d377ad98ed7b3a6f40ff759"
pageSha256: "5fe619d0c895315c620b484ef22bd7caa62ef75d2d377ad98ed7b3a6f40ff759"
contentMode: "local-full"
zh: ""
---

# Artifact runtime capabilities

A published Artifact page can declare **runtime capabilities** — abilities the claude.ai viewer grants the page at open time — by passing `capabilities: \{name: config\}` to the Artifact tool. The control plane is the authority on valid names and config shapes. Declaration gestures: **omitting** `capabilities` on a redeploy carries the stored declaration forward unchanged (and preserves the artifact's stored contract pin); an **empty object** `\{\}` is the explicit clear-all; a **non-empty object** is a full-set declaration (anything stored but not restated is revoked). Moving a republished artifact's runtime version is a deliberate gesture — pass `contract: 'latest'` to upgrade, or a specific version to pin or roll back — never a side effect of editing.
