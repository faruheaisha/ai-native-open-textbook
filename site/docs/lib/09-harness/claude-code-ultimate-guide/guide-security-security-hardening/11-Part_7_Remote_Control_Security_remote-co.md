---
title: "Claude Code Ultimate Guide"
sourceId: "09-harness/claude-code-ultimate-guide"
sourceTitle: "Claude Code Ultimate Guide"
sourceKind: "工程手册"
licenseLabel: "可转载"
lang: "英文"
tier: 3
volume: "09-harness"
sourceUrl: "https://github.com/FlorianBruniaux/claude-code-ultimate-guide"
entryUrl: "https://github.com/FlorianBruniaux/claude-code-ultimate-guide/blob/af05b84fb6e32432dae2114ee2a72c44ef3d29b1/guide/security/security-hardening.md"
sourceRel: "guide/security/security-hardening.md"
rawUrl: "/raw/09-harness/claude-code-ultimate-guide/guide/security/security-hardening.md"
sourceSha256: "9e60a03ddb48e780dee266f946d4af20567529ee0e632ce6f3ed3cc721df06e8"
pageSha256: "3eb2190d8440e37f2c2f0dd3467c6648fba5939cd5125aecf0cc98c9369ad2d6"
contentMode: "local-full"
zh: ""
---

## Part 7: Remote Control Security \{#remote-control-security\}

> **Feature context**: Remote Control (Research Preview, Feb 2026) allows controlling a local Claude Code session from a phone, tablet, or browser. Available on Pro and Max plans only.

### Architecture

```
Local terminal ──HTTPS outbound──► Anthropic relay ──► Mobile/Browser
 (execution)                        (relay only)        (control UI)
```

**Security properties:**
- Zero inbound ports (reduces attack surface vs SSH tunnels or ngrok)
- HTTPS only (encrypted in transit)
- Multiple short-lived, narrowly scoped credentials (each limited to a specific purpose, expiring independently)
- Execution stays 100% local

### Threat Model

| Threat | Risk | Mitigation |
|--------|------|------------|
| **Session URL leak** | Full terminal access for whoever holds the URL | Treat URL as password: don't share in Slack/logs/screenshots |
| **RCE via remote commands** | Attacker who gets the URL can run commands if they approve tool calls | Per-command approval prompts on mobile (not foolproof against active attacker) |
| **Corporate policy violation** | Personal Claude account on corporate machine routes traffic through Anthropic relay | Verify policy before enabling, even on personal plans |
| **Persistent session exposure** | Long-running sessions increase window of exposure | Close sessions when done; ~10min auto-timeout on disconnect |
| **Shared/untrusted workstation** | Session URL valid while session is open | Never run remote-control on shared machines |

> **Community perspective**: Senior devs immediately noted: "C'est une sacrée RCE qu'ils introduisent là." The session URL is effectively a live key to an executing terminal. The per-command approval mechanism limits accidental execution but does not protect against a determined attacker who holds the URL and approves all prompts.

### Best Practices

```bash
# 1. Don't auto-enable; activate only when needed
#    Avoid: /config → auto-enable remote-control

# 2. Use on a dedicated, hardened workstation
#    Not on machines with access to production credentials or secrets

# 3. Close the session when done
#    Ctrl+C on local terminal, or dismiss from the mobile app

# 4. Never share session URLs in team chats, tickets, or logs
#    They are live access tokens while the session is active

# 5. Prefer use on personal dev machines
#    Not on corporate machines with elevated privileges
```

### Enterprise Considerations

Remote Control is **not available** on Team or Enterprise plans. However:

- Developers on personal Pro/Max accounts may use it on corporate hardware
- The relay traffic (your commands and Claude's responses) passes through Anthropic infrastructure
- If your organization has strict data residency requirements, treat Remote Control like any cloud-routed tool
- Recommended: use only on a dedicated "sandbox" workstation without access to production systems

### Comparison: Remote Control vs Alternatives

| Method | Inbound ports | Data path | Risk level |
|--------|---------------|-----------|------------|
| **Remote Control** | None (outbound HTTPS) | Anthropic relay | Low-Medium |
| **SSH + mobile terminal** | Yes (port 22) | Direct | Medium |
| **ngrok tunnel** | None (outbound) | ngrok relay | Medium |
| **VPN + SSH** | Yes (behind VPN) | VPN + direct | Low |

For the highest security: prefer SSH over VPN rather than Remote Control, especially on sensitive environments.
