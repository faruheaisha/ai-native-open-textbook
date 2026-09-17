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
entryUrl: "https://github.com/Piebald-AI/claude-code-system-prompts/blob/3af4c6139aaabb0470440961ca8c8fb871099234/system-prompts/skill-stuck-background-daemon-diagnostics.md"
sourceRel: "system-prompts/skill-stuck-background-daemon-diagnostics.md"
rawUrl: "/raw/10-context-memory/claude-code-system-prompts/system-prompts/skill-stuck-background-daemon-diagnostics.md"
sourceSha256: "d45deb9142b2b1356fe2c5cc34b27aa4e0045f6b4b582a64bae14454bb6ade8f"
pageSha256: "d45deb9142b2b1356fe2c5cc34b27aa4e0045f6b4b582a64bae14454bb6ade8f"
contentMode: "local-full"
zh: ""
---

# Claude Code System Prompts

## Daemon

The background daemon manages `& <prompt>` jobs and `claude agents`. If the issue involves background sessions, look here.

### daemon.lock
```json
${DAEMON_LOCK_CONTENT??"(missing)"}
```

### daemon.status.json
```json
${DAEMON_STATUS_CONTENT??"(missing)"}
```

### Daemon log (`${DAEMON_LOG_PATH}`)
${DAEMON_LOG_SNIPPET\}

Other daemon state on disk (Read if relevant — roster contains user prompts and env vars):
- `${WORKER_ROSTER_PATH_FN()}` — live worker roster
- `${DAEMON_STATE_DIR_FN()\}/<short>/state.json` — per-job state
