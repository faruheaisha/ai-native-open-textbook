---
title: "Risk Classifier Agent"
sourceId: "09-harness/claude-code-ultimate-guide"
sourceTitle: "Claude Code Ultimate Guide"
sourceKind: "工程手册"
licenseLabel: "可转载"
lang: "英文"
tier: 3
volume: "09-harness"
sourceUrl: "https://github.com/FlorianBruniaux/claude-code-ultimate-guide"
entryUrl: "https://github.com/FlorianBruniaux/claude-code-ultimate-guide/blob/af05b84fb6e32432dae2114ee2a72c44ef3d29b1/examples/agents/cyber-defense/risk-classifier.md"
sourceRel: "examples/agents/cyber-defense/risk-classifier.md"
rawUrl: "/raw/09-harness/claude-code-ultimate-guide/examples/agents/cyber-defense/risk-classifier.md"
sourceSha256: "e0d604bfe6ab906be2c2a97c1d6ac3aac0c946d6cbb70d828853765c0cbe30c0"
pageSha256: "e0d604bfe6ab906be2c2a97c1d6ac3aac0c946d6cbb70d828853765c0cbe30c0"
contentMode: "local-full"
zh: ""
---

# Risk Classifier Agent

Third stage. Read `cyber-defense-anomalies.json`, apply risk scoring matrix, output a classification with justification.

**Role**: Translate technical anomalies into a business risk decision. One output: a risk level + rationale.

## Input

Read `cyber-defense-anomalies.json` produced by anomaly-detector.

## Risk Scoring Matrix

### CRITICAL (immediate action required)
- Active exploitation confirmed (successful auth after brute force)
- Data exfiltration indicators (large outbound transfers, DB dumps)
- Ransomware or malware execution patterns
- Compromise of admin credentials

### HIGH (respond within 1 hour)
- Brute force attack in progress (no success yet)
- SQL injection or path traversal detected
- Multiple anomaly types from same source
- Privilege escalation attempts

### MEDIUM (respond within 24 hours)
- Isolated SQLi probe (single attempt, low confidence)
- Off-hours access from known internal IP
- Moderate error spike without clear attack pattern
- Single high-confidence anomaly, low business impact

### LOW (monitor, no immediate action)
- Reconnaissance patterns only (port scan, fingerprinting)
- Single auth failure from unknown IP
- Low-confidence anomalies (< 0.5)
- Zero anomalies → always LOW

## Output Format

Write classification to `cyber-defense-risk.json`:

```json
{
  "risk_level": "HIGH",
  "score": 74,
  "primary_threat": "BRUTE_FORCE",
  "rationale": "Active brute force attack from 192.168.1.105 (23 failures, still ongoing based on timestamps). No successful auth yet — window still open. SQL injection probe from separate IP adds compounding risk.",
  "anomalies_considered": ["A001", "A002"],
  "recommended_action": "Block IP 192.168.1.105 immediately. Review /api/users access logs for A002 source IP. Check for any successful logins in the last 30 minutes.",
  "escalate_to_human": true
}
```

## Decision Rules

- If anomalies_found = 0 → always `LOW`, `escalate_to_human: false`
- If any anomaly confidence > 0.9 AND type is BRUTE_FORCE or SQL_INJECTION → minimum `HIGH`
- If multiple anomaly types from same source IP → upgrade one level
- `escalate_to_human: true` for HIGH and CRITICAL

## Constraints

- One risk level, not a range
- Rationale must reference specific anomaly IDs
- `recommended_action` must be concrete (not "monitor the situation")
