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
entryUrl: "https://github.com/Piebald-AI/claude-code-system-prompts/blob/3af4c6139aaabb0470440961ca8c8fb871099234/system-prompts/data-sdk-register-device-hooks-request-schema.md"
sourceRel: "system-prompts/data-sdk-register-device-hooks-request-schema.md"
rawUrl: "/raw/10-context-memory/claude-code-system-prompts/system-prompts/data-sdk-register-device-hooks-request-schema.md"
sourceSha256: "19a5c65737f25a8ce7b6b6902991965d0ac1af6cbb20a4176ef4f9ea54c9ab3f"
pageSha256: "19a5c65737f25a8ce7b6b6902991965d0ac1af6cbb20a4176ef4f9ea54c9ab3f"
contentMode: "local-full"
zh: ""
---

# Claude Code System Prompts

@internal Registers this device's hooks with the worker — unrelated to device registration or bind. Sent by a claude --cloud device client after it attaches to a cloud session (never as an initial event of the create): names, by opaque id, which of the user's own hooks the worker should ask this device to run over hook_callback, and which vetted templates to run in the container. The worker rejects requests over 64 KiB with invalid_registration. Error replies use the standard error response with a message that starts with a code token and a colon: hook_forwarding_disabled (off for this session; not retryable, nothing stored), hook_forwarding_not_ready (retry after a short backoff), invalid_registration, or stale_worker_epoch (re-read the worker epoch and re-send). A worker that predates the request answers with the usual unsupported-subtype error.
