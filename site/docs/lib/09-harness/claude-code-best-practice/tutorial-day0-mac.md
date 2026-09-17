---
title: "macOS Setup"
sourceId: "09-harness/claude-code-best-practice"
sourceTitle: "Claude Code Best Practice"
sourceKind: "工程手册"
licenseLabel: "可转载"
lang: "英文"
tier: 1
volume: "09-harness"
sourceUrl: "https://github.com/shanraisshan/claude-code-best-practice"
entryUrl: "https://github.com/shanraisshan/claude-code-best-practice/blob/2d6ea151c0d7189c3eaf364809c5574bd210e545/tutorial/day0/mac.md"
sourceRel: "tutorial/day0/mac.md"
rawUrl: "/raw/09-harness/claude-code-best-practice/tutorial/day0/mac.md"
sourceSha256: "3ddf94418a2f08a606ca29966f49a415610f45685bcc3d7c88a64cc0ab9c95c4"
pageSha256: "3ddf94418a2f08a606ca29966f49a415610f45685bcc3d7c88a64cc0ab9c95c4"
contentMode: "local-full"
zh: ""
---

# macOS Setup

[Back to Day 0](/lib/09-harness/claude-code-best-practice/tutorial-day0)

---

**Terminal**
- Open Terminal (press `Cmd + Space`, type "Terminal", hit Enter)

**Homebrew**
- Check if Homebrew is already installed:
  ```bash
  brew --version
  ```
- If you get "command not found", install Homebrew first:
  ```bash
  /bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
  ```

**Claude Code**
- ```bash
  brew install --cask claude-code
  ```

**Verify**
- ```bash
  claude --version
  ```

---

Now head back to [README.md](/lib/09-harness/claude-code-best-practice/tutorial-day0) for authentication setup.
