---
title: "Windows Setup"
sourceId: "09-harness/claude-code-best-practice"
sourceTitle: "Claude Code Best Practice"
sourceKind: "工程手册"
licenseLabel: "可转载"
lang: "英文"
tier: 1
volume: "09-harness"
sourceUrl: "https://github.com/shanraisshan/claude-code-best-practice"
entryUrl: "https://github.com/shanraisshan/claude-code-best-practice/blob/2d6ea151c0d7189c3eaf364809c5574bd210e545/tutorial/day0/windows.md"
sourceRel: "tutorial/day0/windows.md"
rawUrl: "/raw/09-harness/claude-code-best-practice/tutorial/day0/windows.md"
sourceSha256: "6bd787a67ed0eec1314d526a9f040beb516adfad1710775206cea1fe873ded7d"
pageSha256: "6bd787a67ed0eec1314d526a9f040beb516adfad1710775206cea1fe873ded7d"
contentMode: "local-full"
zh: ""
---

# Windows Setup

[Back to Day 0](/lib/09-harness/claude-code-best-practice/tutorial-day0)

---

**Node.js**
- Go to [nodejs.org](https://nodejs.org)
- Click the **"Download Node.js (LTS)"** button — this downloads the `.msi` installer
- Run the `.msi` file and click **Next** through the wizard
- Accept the defaults, click **Install**, wait for it to finish

**Verify Node.js**
- Open a **new** terminal (PowerShell or Windows Terminal) and run:
  ```powershell
  node --version
  npm --version
  ```

**Claude Code**
- ```powershell
  npm install -g @anthropic-ai/claude-code
  ```
- If you get a permission error, run your terminal as **Administrator** (right-click > Run as administrator)

**Verify**
- ```powershell
  claude --version
  ```

---

Now head back to [README.md](/lib/09-harness/claude-code-best-practice/tutorial-day0) for authentication setup.
