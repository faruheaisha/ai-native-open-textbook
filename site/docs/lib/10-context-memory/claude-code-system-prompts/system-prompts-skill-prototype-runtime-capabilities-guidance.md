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
entryUrl: "https://github.com/Piebald-AI/claude-code-system-prompts/blob/3af4c6139aaabb0470440961ca8c8fb871099234/system-prompts/skill-prototype-runtime-capabilities-guidance.md"
sourceRel: "system-prompts/skill-prototype-runtime-capabilities-guidance.md"
rawUrl: "/raw/10-context-memory/claude-code-system-prompts/system-prompts/skill-prototype-runtime-capabilities-guidance.md"
sourceSha256: "d83a0bdbd94313f127852038506244975037dcbb7d81a41dd3572b3bdfb15acb"
pageSha256: "d83a0bdbd94313f127852038506244975037dcbb7d81a41dd3572b3bdfb15acb"
contentMode: "local-full"
zh: ""
---

# Claude Code System Prompts

## When the idea needs real data or real actions

This is wired fidelity. A prototype that runs against the real thing proves far more than one against a mock. When the idea turns on the user's real data or real actions — their issues, their calendar, a doc, an API they already use — reading that live or connected data, acting on the user's behalf from the published page, or handing the viewer a file to save, is a runtime capability granted per user by the control plane and declared when you publish: load the `$\{ARTIFACT_CAPABILITIES_SKILL_NAME\}` skill before relying on it, to see which capabilities this user has and how to declare the one that fits. Fake only what no available capability covers — and if none fits, stay fully static — and keep saying what is faked.
