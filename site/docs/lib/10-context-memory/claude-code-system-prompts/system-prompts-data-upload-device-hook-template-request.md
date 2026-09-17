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
entryUrl: "https://github.com/Piebald-AI/claude-code-system-prompts/blob/3af4c6139aaabb0470440961ca8c8fb871099234/system-prompts/data-upload-device-hook-template-request.md"
sourceRel: "system-prompts/data-upload-device-hook-template-request.md"
rawUrl: "/raw/10-context-memory/claude-code-system-prompts/system-prompts/data-upload-device-hook-template-request.md"
sourceSha256: "c91827add8c8d90240636de9071b940997c9bb461ba29c4fdcd898e4f2ea176b"
pageSha256: "c91827add8c8d90240636de9071b940997c9bb461ba29c4fdcd898e4f2ea176b"
contentMode: "local-full"
zh: ""
---

# Claude Code System Prompts

@internal Sent by a claude --cloud device client BEFORE register_device_hooks for each vetted template it wants run in the container; a register that arrives first reports awaiting_upload and the device registers again after uploading. The worker keeps the bytes for its own life only after hashing them against its own table; nothing executable is taken from the wire. Idempotent. Errors: hook_forwarding_disabled | hook_forwarding_not_ready (retryable) | stale_worker_epoch | invalid_upload | template_refused: unknown_template, version_mismatch, too_large or digest_mismatch.
