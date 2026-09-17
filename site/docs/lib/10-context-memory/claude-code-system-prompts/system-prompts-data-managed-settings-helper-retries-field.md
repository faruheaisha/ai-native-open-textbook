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
entryUrl: "https://github.com/Piebald-AI/claude-code-system-prompts/blob/3af4c6139aaabb0470440961ca8c8fb871099234/system-prompts/data-managed-settings-helper-retries-field.md"
sourceRel: "system-prompts/data-managed-settings-helper-retries-field.md"
rawUrl: "/raw/10-context-memory/claude-code-system-prompts/system-prompts/data-managed-settings-helper-retries-field.md"
sourceSha256: "02b38924c6f987268276fcdd91ca79326a3476c807ca6e37d691c8f9a792c925"
pageSha256: "02b38924c6f987268276fcdd91ca79326a3476c807ca6e37d691c8f9a792c925"
contentMode: "local-full"
zh: ""
---

# Claude Code System Prompts

How many more times to run this entry's helper when a run fails to execute — it could not be launched, exited non-zero, or was stopped at timeoutMs — before that counts as a failure (a non-negative integer; default 0, a single attempt; above 5 is treated as 5). Attempts are separated by a short randomized backoff (from 250 ms, doubling per attempt, at most 4 s each) and each attempt gets the full timeoutMs, so a start that waits on the helper can wait up to (retries + 1) × timeoutMs plus the backoff. Output the helper did produce and that was refused — oversized, not a JSON object, an invalid envelope, or settings that fail validation — is not retried, and neither is an invalid path. Applies alike at startup and on each background refresh; only once the attempts are used up do the entry's failure rules (a static settings payload in its place, onFailure, the refresh notice) apply, naming the last attempt's failure
