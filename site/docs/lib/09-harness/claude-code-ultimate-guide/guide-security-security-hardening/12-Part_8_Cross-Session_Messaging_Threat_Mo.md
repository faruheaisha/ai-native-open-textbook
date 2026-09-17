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
pageSha256: "9d6f0d54486a7747dc6d91c1a11a829f229437722bb0b2171558b126fcb599d1"
contentMode: "local-full"
zh: ""
---

## Part 8: Cross-Session Messaging Threat Model \{#cross-session-messaging-threat-model\}

> **Feature context**: since v2.1.224, any two Claude Code sessions can message each other via `ListAgents` and `SendMessage`, on the same machine automatically, or across your account through Remote Control. Full mechanics: [Cross-Session Messaging](/lib/09-harness/claude-code-ultimate-guide/guide-workflows-cross-session-messaging).

### Architecture

```
Same machine:    Session A ──Unix socket / named pipe──► Session B   (never touches Anthropic servers)
Other machine:   Session A ──HTTPS──► Anthropic relay ──► Remote Control ──► Session B
Web session:     Session A ──HTTPS──► Anthropic relay ──► Session B (Claude Code on the web)
```

Each session registers itself in on-disk files and binds an inbox socket restricted to the operating-system user (a per-connection key on native Windows). A session started as one OS user cannot see or message a session started as another, even sharing the same terminal multiplexer.

### Threat Model

The principal security risk is **cross-session prompt injection**: a compromised, misconfigured, or simply overzealous peer session sends text designed to get the receiving session to act outside what its own user authorized. A separate correctness risk appears when sessions propagate a false premise and converge on the same wrong result.

| Threat | Risk | Mitigation |
|--------|------|------------|
| **Peer suggests a destructive or risky action** | A compromised peer session tries to get another session to run a command, touch a file, or approve something it shouldn't | Text-only channel: a message can never approve a permission prompt or change configuration. The receiving session's own permission rules still apply. [Native sandboxing](/lib/09-harness/claude-code-ultimate-guide/guide-security-sandbox-native#cross-session-inbox-sockets) can limit Bash-command effects, but built-in file tools remain under the permission system. |
| **Command injection via message text** | A message body contains something that looks like a slash command or shell instruction | Claude Code never executes text arriving in a message; it is delivered as plain text, same as any other prompt content. |
| **Socket spoofing / stale endpoint** | A reply is routed to the wrong process because a socket path was replaced or a session restarted | `SendMessage` verifies the endpoint before delivering and refuses on a symlinked target, an unexpected connected process, or an endpoint whose identity can't be read, rather than sending blind. |
| **Unsolicited flood from a peer** | A misbehaving or looping peer sends messages faster than the recipient can process | Burst refusal at the sender once a same-machine inbox's capacity is reached; at the recipient, repeated messages from one sender are rate-limited, identical repeats within a short window are dropped, and at most 50 accepted messages queue for Claude to read. |
| **Cross-machine exposure via Remote Control** | Messages to another of your machines or the web pass through Anthropic's infrastructure rather than staying local | Same-machine traffic never leaves the box; cross-machine traffic is HTTPS through the same relay Remote Control already uses. Set `isolatePeerMachines: true` to require explicit approval before anything crosses a machine boundary. |
| **Silent acceptance of untrusted peers** | A session with permissive defaults accepts messages from any session that can reach it | `crossSessionInbound: "refuse"` drops all inbound peer messages. An explicit `"hold"` retains messages until an applicable `accept` releases them; when no setting applies, the receiving session's permission-mode class can instead open a per-message approval dialog. |
| **Correlated drift / false consensus** | One session's stale or incorrect conclusion becomes shared context, so another session repeats the mistake or validates it against the same incomplete evidence | Treat a peer message as a claim, not proof. Bind handoffs to a branch or worktree and commit SHA, include reproducible evidence and uncertainty, then use deterministic gates plus the [Agent Harness creator-verifier pattern](/lib/09-harness/claude-code-ultimate-guide/guide-core-agent-harness/index#8-creator-verifier-pattern). |
| **Shared-working-tree race** | Two sessions coordinate in text but concurrently edit the same checkout, invalidating each other's reads or overwriting changes | Use one worktree per concurrent writer and explicit ownership. Cross-session messages do not provide file locks or transactional writes. |

The design constraint that makes this tractable: a cross-session message is informational only. It is never treated as user consent, and the receiving session is explicitly instructed never to change its own permission settings, `CLAUDE.md`, or other configuration because a peer asked.

The [native sandbox boundary](/lib/09-harness/claude-code-ultimate-guide/guide-security-sandbox-native#cross-session-inbox-sockets) reduces the filesystem and network impact of Bash commands and their children after delivery. It does not govern built-in `Read`, `Edit`, or `Write` tools, validate the peer's claim, or isolate two sessions that share a checkout.

That authority boundary does not validate correctness. The [cross-session coordination protocol](/lib/09-harness/claude-code-ultimate-guide/guide-workflows-cross-session-messaging#coordination-safety-correlated-drift-and-false-consensus) defines the message provenance contract and current-SHA gate; [Agent Harness: Creator-Verifier](/lib/09-harness/claude-code-ultimate-guide/guide-core-agent-harness/index#8-creator-verifier-pattern) defines the independence and proof boundary.

### Best Practices

```bash
# 1. Lock down a sensitive session's inbound side explicitly
#    In that project's settings.json:
#    { "crossSessionInbound": "refuse" }

# 2. Require approval before any message leaves the machine
#    { "isolatePeerMachines": true }

# 3. Turn the whole feature off for a session or an organization
#    { "permissions": { "deny": ["SendMessage", "ListAgents"] }, "crossSessionInbound": "refuse" }
#    Denying SendMessage also removes messaging to subagents and agent-team teammates.

# 4. Don't assume a quiet /status means the feature is off
#    A refusing session shows no visible change in its own /status or in peers' /list-agents.
#    Confirm via the settings files that apply, not by observing behavior.

# 5. Keep concurrent writers in separate worktrees
#    A peer message is coordination text, not a file lock or verification result.
```

### Enterprise Considerations

Same-machine messaging never leaves the box and needs no Remote Control connection. Cross-machine and web messaging route through Anthropic's relay, the same one Remote Control already uses; organizations with data-residency constraints on that relay should treat cross-session messaging like any other Remote-Control-adjacent traffic and consider the managed-settings lockdown above. `crossSessionInbound` and permission deny rules on `SendMessage`/`ListAgents` both apply from managed settings, so this is enforceable at the org level without relying on individual developers to configure it.

---

*Version 1.2.0 | February 2026 | Part of [Claude Code Ultimate Guide](/lib/09-harness/claude-code-ultimate-guide/guide)*
