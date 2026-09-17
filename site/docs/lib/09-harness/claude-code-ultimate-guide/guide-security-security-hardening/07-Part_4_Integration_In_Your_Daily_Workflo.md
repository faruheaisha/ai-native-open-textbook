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
pageSha256: "835a9d468914d0a89f53b02b351d3471b349eb2d18526005197cf6676bd8a09e"
contentMode: "local-full"
zh: ""
---

## Part 4: Integration (In Your Daily Workflow)

### 4.1 PR Security Review Workflow

The most high-ROI use of Claude Code for security: systematic review of every PR before merge. Takes 2-3 minutes, catches issues before they reach production.

#### Setup: Add to your PR checklist

```bash
# Run from repo root before merging any PR
git diff main...HEAD > /tmp/pr-diff.txt
```

Then in Claude Code:

```
Review the security implications of this PR diff.
Focus: injection, auth bypass, secrets exposure, insecure deserialization.
File: /tmp/pr-diff.txt
Use the security-auditor agent for the analysis.
```

#### The 3-agent PR security pipeline

For high-stakes PRs (auth changes, payment flows, data access), run in sequence:

```
Step 1: Threat surface scan:
"Use the security-auditor agent to analyze all changed files in this diff.
 Report CRITICAL and HIGH findings only. No fixes."

Step 2: Data flow trace:
"For each CRITICAL finding from the audit, trace the full data flow:
 where does user input enter? where does it reach? what sanitization exists?"

Step 3: Patch (if findings):
"Use the security-patcher agent with the findings report above.
 Propose patches for CRITICAL findings only. Do not apply without my review."
```

#### What to always check in a security PR review

| Change type | Risk | What to look for |
|-------------|------|-----------------|
| New API endpoint | High | Auth check, input validation, rate limiting |
| DB query change | High | Parameterized queries, index exposure |
| Auth logic | Critical | Token validation, session management, privilege escalation |
| File upload | High | MIME type, size limit, path traversal |
| Third-party lib added | Medium | CVE check (`npm audit`, `cargo audit`) |
| Env var added | Medium | Not hardcoded, in `.gitignore`, in `.env.example` |

#### Integration with git hooks

Automate the trigger in `.git/hooks/pre-push`:

```bash
#!/bin/bash
# Pre-push: remind to run security review for auth/payment changes
CHANGED=$(git diff origin/main...HEAD --name-only)

if echo "$CHANGED" | grep -qE "(auth|payment|token|session|password|crypt)"; then
    echo "⚠️  Security-sensitive files changed. Run /security-audit before pushing."
    echo "   Files: $(echo "$CHANGED" | grep -E '(auth|payment|token|session)')"
    # Warning only; does not block push
fi
exit 0
```
