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
pageSha256: "86687b30ed6eddb464b76d1fac2ede2153e2eacc7c53525c43c46c65d41d9add"
contentMode: "local-full"
zh: ""
---

## Part 1: Prevention (Before You Start)

### 1.1 MCP Vetting Workflow

Model Context Protocol (MCP) servers extend Claude Code's capabilities but introduce significant attack surface. Understanding the threat model is essential.

**Command allowlist, not blanket auto-approval.** Granting an agent permission to run all commands eliminates approval friction but grants the agent host-user-level capability. A practical baseline: allow `git add` and `git commit`, but require explicit approval before `git push`, hard resets, force-deletes, or any database mutation. Jocelyn N'takpe (Head of Engineering & Architecture, ManoMano) documented losing all Firefox bookmarks to an agent that misidentified them as "context to clear" during a cleanup task, illustrating that the blast radius of broad permissions extends well beyond production systems. ([IFTTD ep 346 "IA & DevX"](https://www.ifttd.io/episodes/ia-devx))

---

#### Attack: MCP Rug Pull

```
┌─────────────────────────────────────────────────────────────┐
│  1. Attacker publishes benign MCP "code-formatter"          │
│                         ↓                                    │
│  2. User adds to ~/.claude.json, approves once               │
│                         ↓                                    │
│  3. MCP works normally for 2 weeks (builds trust)           │
│                         ↓                                    │
│  4. Attacker pushes malicious update (no re-approval!)      │
│                         ↓                                    │
│  5. MCP exfiltrates ~/.ssh/*, .env, credentials             │
└─────────────────────────────────────────────────────────────┘
MITIGATION: Version pinning + hash verification + monitoring
```

This attack exploits the one-time approval model: once you approve an MCP, updates execute automatically without re-consent.

#### CVE Summary (2025-2026)

| CVE | Severity | Impact | Mitigation |
|-----|----------|--------|------------|
| **CVE-2025-53109/53110** | High | Filesystem MCP sandbox escape via prefix bypass + symlinks | Update to >= 0.6.3 / 2025.7.1 |
| **CVE-2025-54135** | High (8.6) | RCE in Cursor via prompt injection rewriting mcp.json | File integrity monitoring hook |
| **CVE-2025-54136** | High | Persistent team backdoor via post-approval config tampering | Git hooks + hash verification |
| **CVE-2025-49596** | Critical (9.4) | RCE in MCP Inspector tool | Update to patched version |
| **CVE-2026-24052** | High | SSRF via domain validation bypass in WebFetch | Update to v1.0.111+ |
| **CVE-2025-66032** | High | 8 command execution bypasses via blocklist flaws | Update to v1.0.93+ |
| **ADVISORY-CC-2026-001** | High | Sandbox bypass: commands excluded from sandboxing bypass Bash permissions (no CVE assigned) | **Update to v2.1.34+ immediately** |
| **CVE-2026-0755** | **Critical (9.8)** | RCE in gemini-mcp-tool: LLM-generated args passed to shell without validation; no auth, network-reachable | **No fix yet**, avoid using in production or on exposed networks |
| **SNYK-PYTHON-MCPRUNPYTHON-15250607** | High | SSRF in mcp-run-python: Deno sandbox permits localhost access, enabling internal network pivoting | Restrict sandbox network permissions; block localhost range |
| **CVE-2026-25725** | High | Claude Code sandbox escape: malicious code inside bubblewrap sandbox creates missing `.claude/settings.json` with SessionStart hooks that execute with host privileges on restart | Update to >= v2.1.2 (covered by v2.1.34+) |
| **CVE-2026-25253** | High (8.8) | OpenClaw 1-click RCE: malicious link triggers WebSocket to attacker-controlled server, exfiltrating auth token; 17,500+ exposed instances found | Update OpenClaw to >= 2026.1.29; block public internet exposure |
| **CVE-2026-0757** | High | MCP Manager for Claude Desktop sandbox escape via command injection in execute-command with unsanitized MCP config objects | Restrict to trusted configs; check upstream for patch |
| **CVE-2025-35028** | **Critical (9.1)** | HexStrike AI MCP Server: semicolon-prefixed arg causes OS command injection in EnhancedCommandExecutor, typically running as root; no auth required | **No fix yet**, avoid exposing to untrusted inputs/networks |
| **CVE-2025-15061** | **Critical (9.8)** | Framelink Figma MCP Server: fetchWithRetry method executes attacker-controlled shell metacharacters; unauthenticated RCE | Update to latest patched version |
| **CVE-2026-3484** | Medium (6.5) | nmap-mcp-server (PhialsBasement): command injection in `child_process.exec` Nmap CLI handler; remotely exploitable | Apply patch commit `30a6b9e` |
| **CVE-2026-33032** | **Critical (9.8)** | nginx-ui MCPwn: missing `AuthRequired()` on `/mcp_message` endpoint allows unauthenticated full nginx takeover in 2 HTTP requests; actively exploited, 2,689+ exposed instances | **Update to nginx-ui >= v2.3.4 immediately** |
| **ADVISORY-MCP-STDIO-2026-001** | Critical | OX Security: MCP STDIO interface lacks input validation across all SDK languages, which enables RCE in any MCP-integrated app that doesn't sanitize inputs; Anthropic considers this by design; 150M+ downloads affected | Sanitize all STDIO inputs; sandbox MCP services; see OX Security advisory |
| **CVE-2026-25723** | High | Claude Code file-write sandbox bypass: piped sed/echo commands escaped project sandbox because command chaining wasn't validated | Update to v2.0.55+ |
| **CVE-2026-33068** | High | Claude Code permission mode bypass: settings.json resolved before workspace trust dialog, allowing `bypassPermissions` to silently skip consent | Update to v2.1.53+ |
| **ADVISORY-CC-2026-002** | Medium | Claude Code deny-rule bypass: all configured deny rules silently dropped when command exceeded 50 subcommands | **Update to v2.1.90+** |
| **CVE-2026-50548/50549** | **Critical (9.8 each)** | Cursor "DuneSlide" agent terminal sandbox escape (working-directory restriction bypass plus a symlink file-write escape when path canonicalization fails), letting zero-click prompt injection overwrite the sandbox binary and reach OS-level RCE | Update to Cursor Desktop 3.0+ |
| **CVE-2026-12958/12957** | High (7.8) | "GhostApproval": a booby-trapped repo ships a file that is really a symlink to a sensitive path (`~/.ssh/authorized_keys`, agent config), so the agent writes attacker content there while the approval dialog shows a benign in-project path. Class flaw across Amazon Q, Cursor, Claude Code, Antigravity, Augment, Windsurf | Amazon Q language server >= 1.69.0; Cursor >= 3.0; never approve writes to symlinked paths. Anthropic disputes it applies to Claude Code (folder-trust equals consent) |
| **CVE-2026-59950** | High | MCP Python SDK's deprecated WebSocket server transport skips Host/Origin validation on the handshake, so a hostile web page can drive a user's local MCP server via a cross-site WebSocket connection (auth bypass) | Update `mcp` (PyPI) to >= 1.28.1; stop using the deprecated `websocket_server` transport |
| **CVE-2026-48124** | High | Cursor: a workspace-controlled `.claude`/`.cursor` hook config is trusted and run outside the agent sandbox on next launch, one instance of a broader "configuration-based sandbox escape" pattern also seen in Codex CLI, Gemini CLI, and Antigravity | Update Cursor to >= 3.0.0; treat repo-provided hook/config files as untrusted until reviewed |
| **CVE-2026-54316** | **Critical (9.1 NVD)** | Claude Code: `huggingface.co` was allowlisted as a *bare hostname* for WebFetch, so any path on it was fetched with no prompt. Researchers created 64 model repos, one per possible character, and read an API key back one character at a time off Hugging Face's public download counter. Exfiltration over a domain the operator trusted on purpose. Affects 0.2.54 through 2.1.162 | **Update to >= 2.1.163.** Then audit your own allowlists: never allowlist a bare hostname on a domain where third parties can create content and read a public metric. Anthropic self-scored this 6.0 (v4) against NVD's 9.1 |
| **CVE-2026-12537** | **Critical (10.0 CVSS v4)** | Gemini CLI + `run-gemini-cli` GitHub Action: headless CI trusts the workspace automatically, so a `.gemini/.env` shipped in an untrusted PR loads as config and runs OS commands on the CI host **before the sandbox initialises**. A chained flaw read a sibling process's environment via `/proc/[PID]/environ` and pushed a backdoored commit | Update Gemini CLI to >= 0.39.1 **and** the Action to >= 0.1.22 (patching one leaves the path open); disable automatic workspace trust for untrusted PRs |
| **CVE-2026-67431** | **Critical (9.1 NVD / 8.3 v4)** | MCP Ruby SDK: session IDs are not bound to a session owner, so a stolen ID lets an attacker run `tools/call` inside the victim's session with responses delivered to the victim's own SSE stream. Silent by design | Update the `mcp` gem to >= 0.23.0. Four sibling advisories ship in the same release: CVE-2026-67432 (unbounded request body read *before* auth), CVE-2026-63118 (no Host/Origin check, DNS rebinding), CVE-2026-63119 (unbounded stdio line reads), CVE-2026-67430 (sessions never expire) |

**v2.1.90 Security Fix (May 2026)**: Claude Code v2.1.90 patched the 50-subcommand deny-rule bypass (ADVISORY-CC-2026-002) where all configured deny rules were silently dropped when a command chain exceeded 50 subcommands. **Upgrade immediately** if running v2.1.89 or earlier.

**v2.1.34 Security Fix (Feb 2026)**: Claude Code v2.1.34 patched a sandbox bypass vulnerability where commands excluded from sandboxing could bypass Bash permission enforcement. **Upgrade immediately** if running v2.1.33 or earlier. Note: this is separate from CVE-2026-25725 (a different sandbox escape fixed later).

**⚠️ CVE-2026-0755 (Feb 2026, No Patch)**: Critical RCE in `gemini-mcp-tool` (CVSS 9.8). An attacker can send crafted JSON-RPC `CallTool` requests with malicious arguments that execute arbitrary code on the host machine with full service account privileges. No fix confirmed as of 2026-02-22. Do not expose gemini-mcp-tool to untrusted networks.

**⚠️ CVE-2025-35028 (No Patch)**: Critical RCE in HexStrike AI MCP Server (CVSS 9.1). Passing any argument starting with `;` to the API endpoint executes arbitrary OS commands, typically as root. No fix confirmed. Do not expose this server to untrusted inputs or networks.

**⚠️ CVE-2025-15061 (Jan 2026)**: Critical RCE in Framelink Figma MCP Server (CVSS 9.8). The `fetchWithRetry` method passes unsanitized user input to shell: unauthenticated remote code execution. Update Figma MCP Server to the latest patched version immediately.

**⚠️ CVE-2026-33032 (MCPwn, April 2026, Actively Exploited)**: Critical authentication bypass in nginx-ui's MCP integration (CVSS 9.8). The `/mcp_message` endpoint is missing the `AuthRequired()` middleware, allowing any network-adjacent attacker to invoke 12 destructive MCP tools, including nginx config write/reload, with zero authentication in two HTTP requests. Added to VulnCheck KEV April 13, 2026. 2,689+ publicly reachable instances confirmed. **Update nginx-ui to >= v2.3.4 immediately.** Chains with CVE-2026-27944 (unauthenticated `/api/backup` endpoint leaking SSL keys and credentials).

**⚠️ CVE-2026-25253 (OpenClaw, Feb 2026)**: One-click RCE affecting OpenClaw/clawdbot/Moltbot (CVSS 8.8). A malicious link causes OpenClaw to automatically establish a WebSocket to an attacker-controlled server, leaking the auth token, which grants full system control since OpenClaw runs with filesystem and shell access. Over 17,500 internet-exposed instances identified. Update to >= 2026.1.29.

**Source**: [Cymulate EscapeRoute](https://cymulate.com/blog/cve-2025-53109-53110-escaperoute-anthropic/), [Checkpoint MCPoison](https://research.checkpoint.com/2025/cursor-vulnerability-mcpoison/), [Cato CurXecute](https://www.catonetworks.com/blog/curxecute-rce/), [SentinelOne CVE-2026-24052](https://www.sentinelone.com/vulnerability-database/cve-2026-24052/), [Flatt Security](https://flatt.tech/research/posts/pwning-claude-code-in-8-different-ways/), [Penligent AI CVE-2026-0755](https://www.penligent.ai/hackinglabs/de/deep-analysis-of-gemini-mcp-tool-command-injection-cve-2026-0755-when-an-mcp-toolchain-hands-user-input-to-the-shell/), Claude Code CHANGELOG

#### Attack Patterns

| Pattern | Description | Detection |
|---------|-------------|-----------|
| **Tool Poisoning** | Malicious instructions in tool metadata (descriptions, schemas) influence LLM before execution | Schema diff monitoring |
| **Rug Pull** | Benign server turns malicious after gaining trust | Version pinning + hash verify |
| **Confused Deputy** | Attacker registers tool with trusted name on untrusted server | Namespace verification |

#### 5-Minute MCP Audit

Before adding any MCP server, complete this checklist:

| Step | Command/Action | Pass Criteria |
|------|----------------|---------------|
