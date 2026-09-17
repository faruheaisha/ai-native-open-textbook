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
pageSha256: "15cd4f3fcca03ecc8e4f4855f4b04e9859ece63845bb992054159faecbdabb26"
contentMode: "local-full"
zh: ""
---

## Appendix: Quick Reference

### Security Posture Levels

| Level | Measures | Time | For |
|-------|----------|------|-----|
| **Basic** | Output scanner + dangerous blocker | 5 min | Solo dev, experiments |
| **Standard** | + Injection hooks + MCP vetting | 30 min | Teams, sensitive code |
| **Hardened** | + Integrity verification + ZDR | 2 hours | Enterprise, production |

### Command Quick Reference

```bash
# Scan for secrets
gitleaks detect --source . --verbose

# Check MCP config
cat ~/.claude.json | jq '.mcpServers | keys'

# Verify hook installation
ls -la ~/.claude/hooks/

# Test Unicode detection
echo -e "test\u200Bhidden" | grep -P '[\x{200B}-\x{200D}]'
```
