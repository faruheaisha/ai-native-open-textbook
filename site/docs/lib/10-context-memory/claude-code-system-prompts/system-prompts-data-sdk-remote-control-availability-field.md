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
entryUrl: "https://github.com/Piebald-AI/claude-code-system-prompts/blob/3af4c6139aaabb0470440961ca8c8fb871099234/system-prompts/data-sdk-remote-control-availability-field.md"
sourceRel: "system-prompts/data-sdk-remote-control-availability-field.md"
rawUrl: "/raw/10-context-memory/claude-code-system-prompts/system-prompts/data-sdk-remote-control-availability-field.md"
sourceSha256: "1975a11d5fe45925dd72c4ebb9b833ebbe0052ea9c563104cdf56686323d7543"
pageSha256: "1975a11d5fe45925dd72c4ebb9b833ebbe0052ea9c563104cdf56686323d7543"
contentMode: "local-full"
zh: ""
---

# Claude Code System Prompts

@internal Whether Remote Control can be offered at all in this deployment (isRemoteControlDeploymentAvailable: not hard-disabled by managed settings, not nested in a remote environment, first-party provider). Only host-lifetime-stable conditions; transient ones (auth state, the GrowthBook rollout gate, the async org-compliance verdict) are deliberately excluded since hosts latch this from one initialize response — see the helper docstring. Lets IDE hosts hide their Remote Control affordance where it can never work. Absent (older CLI) → treat as available.
