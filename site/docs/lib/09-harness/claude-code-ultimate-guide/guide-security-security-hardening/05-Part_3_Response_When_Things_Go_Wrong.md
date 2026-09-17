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
pageSha256: "ed034f8ced1925737140a83b4cc0623cbc2c5fe9e02d9a4168dd266da96b1624"
contentMode: "local-full"
zh: ""
---

## Part 3: Response (When Things Go Wrong)

### 3.1 Secret Exposed

**First 15 minutes** (stop the bleeding):

1. **Revoke immediately**
   ```bash
   # AWS
   aws iam delete-access-key --access-key-id AKIA... --user-name <user>

   # GitHub
   # Settings → Developer settings → Personal access tokens → Revoke

   # Stripe
   # Dashboard → Developers → API keys → Roll key
   ```

2. **Confirm exposure scope**
   ```bash
   # Check if pushed to remote
   git log --oneline origin/main..HEAD

   # Search for the secret pattern
   git log -p | grep -E "(AKIA|sk_live_|ghp_|xoxb-)"

   # Full repo scan
   gitleaks detect --source . --report-format json > exposure-report.json
   ```

**First hour** (assess damage):

3. **Audit git history**
   ```bash
   # If pushed, you may need to rewrite history
