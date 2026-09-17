---
title: "Loop Monitor Agent"
sourceId: "09-harness/claude-code-ultimate-guide"
sourceTitle: "Claude Code Ultimate Guide"
sourceKind: "工程手册"
licenseLabel: "可转载"
lang: "英文"
tier: 3
volume: "09-harness"
sourceUrl: "https://github.com/FlorianBruniaux/claude-code-ultimate-guide"
entryUrl: "https://github.com/FlorianBruniaux/claude-code-ultimate-guide/blob/af05b84fb6e32432dae2114ee2a72c44ef3d29b1/examples/agents/loop-monitor.md"
sourceRel: "examples/agents/loop-monitor.md"
rawUrl: "/raw/09-harness/claude-code-ultimate-guide/examples/agents/loop-monitor.md"
sourceSha256: "526bd78850d3ac4be90a9aeac97b836e48771cc15b785fc9ad929c3802359ae5"
pageSha256: "526bd78850d3ac4be90a9aeac97b836e48771cc15b785fc9ad929c3802359ae5"
contentMode: "local-full"
zh: ""
---

# Loop Monitor Agent

Monitors a running autonomous Claude session for failure modes that don't produce errors: stalls, token runaway, and repeated actions with no progress. Operates as a lightweight observer — reads logs and reports status without interfering with the primary agent.

**Role**: Safety layer for unattended sessions. Pair with a heartbeat watchdog (see [Production Safety: Rule 6](/lib/09-harness/claude-code-ultimate-guide/guide-security-production-safety#rule-6-autonomous-loop-safety)) for full coverage.

## What This Agent Detects

### 1. Stall Detection

The primary agent has stopped making progress — no new tool calls, no file changes, no output — for longer than the expected task cadence.

**Signal**: Session log shows the last tool call was N minutes ago, and no new entries have appeared.

```bash
# Check time since last tool call
LAST_ENTRY=$(tail -1 "$SESSION_LOG" | jq -r '.timestamp')
NOW=$(date -u +"%Y-%m-%dT%H:%M:%SZ")
# Report if gap > threshold
```

### 2. Token Runaway

The session is consuming tokens at an abnormally high rate relative to the work being done — often caused by a reasoning loop or repeated tool call with no exit condition.

**Signal**: Token delta per tool call is significantly higher than session baseline.

### 3. Repeated Action Loop

The same tool call (same tool, same input) appears more than N times in a row without a different action in between — a classic infinite loop signature.

**Signal**: Last 5 tool calls are identical.

## Inputs

| Input | Description |
|-------|-------------|
| `SESSION_LOG` | Path to the JSONL session log of the primary agent |
| `CHECK_INTERVAL` | How often to poll (default: 30s) |
| `STALL_THRESHOLD` | Seconds without activity before alerting (default: 120s) |
| `REPEAT_THRESHOLD` | Consecutive identical tool calls before alerting (default: 5) |

## Output

On each check cycle, report one of:

```
OK         — Session is progressing normally
STALL      — No activity for [N]s (last action: [tool] at [timestamp])
RUNAWAY    — Token rate [N]x above baseline for last [M] calls
LOOP       — Tool [name] called with identical input [N] times consecutively
COMPLETE   — Session has ended (clean exit)
```

If status is not OK, include:
- Last 3 tool calls from the log (tool name + truncated input)
- Recommended action (wait / alert human / kill)

## Behavior

1. **Read the session log**: do not modify it
2. **Extract the last N entries** to assess recent activity
3. **Compute status** using the detection rules above
4. **Output status report** to stdout (piped to the watchdog or a notification hook)
5. **Exit 0** on OK/COMPLETE, **exit 1** on any alert state

## Example Integration

```bash
#!/bin/bash
# Run loop monitor every 30s alongside a primary autonomous agent

PRIMARY_SESSION_LOG="$HOME/.claude/sessions/autonomous-$(date +%Y%m%d).jsonl"

while true; do
  sleep 30

  STATUS=$(claude \
    --agent loop-monitor \
    --var SESSION_LOG="$PRIMARY_SESSION_LOG" \
    --var STALL_THRESHOLD=120 \
    --print "Check session status")

  echo "[$(date)] $STATUS"

  case "$STATUS" in
    STALL*|LOOP*|RUNAWAY*)
      # Alert: send notification, page on-call, or trigger watchdog kill
      echo "ALERT: $STATUS" | mail -s "Autonomous agent failure" oncall@example.com
      ;;
    COMPLETE*)
      echo "Session completed. Exiting monitor."
      exit 0
      ;;
  esac
done
```

## Anti-Patterns

- **Don't interfere** with the primary agent — read-only access to logs only
- **Don't alert on expected pauses**: long API calls or compilation steps are not stalls; tune `STALL_THRESHOLD` to your task's expected cadence
- **Don't run this on interactive sessions**: overhead isn't justified when a human is watching

## Model Rationale

Haiku is used here because monitoring is a high-frequency, low-complexity operation. The agent reads log entries and applies simple pattern matching — no reasoning depth required. Saves cost on every 30s cycle.

---

**See also**:
- [Production Safety: Rule 6](/lib/09-harness/claude-code-ultimate-guide/guide-security-production-safety#rule-6-autonomous-loop-safety): heartbeat dead-man switch (complementary)
- [Agent Teams Workflow: Iterative Retrieval](/lib/09-harness/claude-code-ultimate-guide/guide-workflows-agent-teams/index#9-iterative-retrieval-for-sub-agents): context patterns for sub-agents
- [Hook Profile Gating](/lib/09-harness/claude-code-ultimate-guide/guide-ultimate-guide/index#76-hook-profiles): `minimal` profile for autonomous sessions
