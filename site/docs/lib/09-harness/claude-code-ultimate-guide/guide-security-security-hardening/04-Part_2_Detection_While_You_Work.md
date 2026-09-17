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
pageSha256: "6c94f4f33c82adf32964866b6a7706ac582ae2944cf3e13b0cd74811db2d4cf6"
contentMode: "local-full"
zh: ""
---

## Part 2: Detection (While You Work)

### 2.1 Prompt Injection Detection

Coding assistants are vulnerable to indirect prompt injection through code context. Attackers embed instructions in files that Claude reads automatically.

#### Evasion Techniques

| Technique | Example | Risk | Detection |
|-----------|---------|------|-----------|
| **Zero-width chars** | `U+200B`, `U+200C`, `U+200D` | Instructions invisible to humans | Unicode regex |
| **RTL override** | `U+202E` reverses text display | Hidden command appears normal | Bidirectional scan |
| **ANSI escape** | `\x1b[` terminal sequences | Terminal manipulation | Escape filter |
| **Null byte** | `\x00` truncation attacks | Bypass string checks | Null detection |
| **Base64 comments** | `# SGlkZGVuOiBpZ25vcmU=` | LLM decodes automatically | Entropy check |
| **Nested commands** | `$(evil_command)` | Bypass denylist via substitution | Pattern block |
| **Homoglyphs** | Cyrillic `а` vs Latin `a` | Keyword filter bypass | Normalization |

#### Detection Patterns

```bash
# Zero-width + RTL + Bidirectional
[\x{200B}-\x{200D}\x{FEFF}\x{202A}-\x{202E}\x{2066}-\x{2069}]

# ANSI escape sequences (terminal injection)
\x1b\[|\x1b\]|\x1b\(

# Null bytes (truncation attacks)
\x00

# Tag characters (invisible Unicode block)
[\x{E0000}-\x{E007F}]

# Base64 in comments (high entropy)
[#;].*[A-Za-z0-9+/]{20,}={0,2}

# Nested command execution
\$\([^)]+\)|\`[^\`]+\`
```

#### Existing vs New Patterns

The [prompt-injection-detector.sh](https://github.com/FlorianBruniaux/claude-code-ultimate-guide/blob/af05b84fb6e32432dae2114ee2a72c44ef3d29b1/examples/hooks/bash/prompt-injection-detector.sh) hook includes:

| Pattern | Status | Location |
|---------|--------|----------|
| Role override (`ignore previous`) | Exists | Lines 50-72 |
| Jailbreak attempts | Exists | Lines 74-95 |
| Authority impersonation | Exists | Lines 120-145 |
| Base64 payload detection | Exists | Lines 148-160 |
| Zero-width characters | **New** | Added in v3.6.0 |
| ANSI escape sequences | **New** | Added in v3.6.0 |
| Null byte injection | **New** | Added in v3.6.0 |
| Nested command `$()` | **New** | Added in v3.6.0 |

### 2.2 Secret & Output Monitoring

**Treat every LLM session the same way you treat a code repository: as a channel that can leak secrets.** As more developers write production code through an AI assistant, the risk shifts from committed files to prompts and session logs, a place teams rarely apply the same scanning discipline they already apply to git diffs. A session transcript deserves the same secret-scanning treatment as a pull request.

*Brian Vermeer, Devoxx, 2026*

#### Tool Comparison

| Tool | Recall | Precision | Speed | Best For |
|------|--------|-----------|-------|----------|
| **Gitleaks** | 88% | 46% | Fast (~2 min/100K commits) | Pre-commit hooks |
| **TruffleHog** | 52% | 85% | Slow (~15 min) | CI verification |
| **GitGuardian** | 80% | 95% | Cloud | Enterprise monitoring |
| **detect-secrets** | 60% | 98% | Fast | Baseline approach |

**Recommended stack**:
```
Pre-commit → Gitleaks (catch early, accept some FP)
CI/CD → TruffleHog (verify with API validation)
Monitoring → GitGuardian (if budget allows)
```

#### Environment Variable Leakage

58% of leaked credentials are "generic secrets" (passwords, tokens without recognizable format). Watch for:

| Vector | Example | Mitigation |
|--------|---------|------------|
| `env` / `printenv` output | Dumps all environment | Block in output scanner |
| `/proc/self/environ` access | Linux env read | Block file access pattern |
| Error messages with creds | Stack trace with DB password | Redact before display |
| Bash history exposure | Commands with inline secrets | History sanitization |

#### MCP Secret Scanner (Conceptual)

```bash
# Add Gitleaks as MCP tool for on-demand scanning
claude mcp add gitleaks-scanner -- gitleaks detect --source . --report-format json

# Usage in conversation
"Scan this repo for secrets before I commit"
```

### 2.3 Hook Stack Setup

Recommended security hook configuration for `~/.claude/settings.json`:

```json
{
  "hooks": {
    "PreToolUse": [
      {
        "matcher": "Bash",
        "hooks": [
          "~/.claude/hooks/dangerous-actions-blocker.sh"
        ]
      },
      {
        "matcher": "Edit|Write",
        "hooks": [
          "~/.claude/hooks/prompt-injection-detector.sh",
          "~/.claude/hooks/unicode-injection-scanner.sh"
        ]
      }
    ],
    "PostToolUse": [
      {
        "matcher": "Bash",
        "hooks": [
          "~/.claude/hooks/output-secrets-scanner.sh"
        ]
      }
    ],
    "SessionStart": [
      "~/.claude/hooks/mcp-config-integrity.sh"
    ]
  }
}
```

**Hook installation**:
```bash
# Copy hooks to Claude directory
cp examples/hooks/bash/*.sh ~/.claude/hooks/
chmod +x ~/.claude/hooks/*.sh
```
