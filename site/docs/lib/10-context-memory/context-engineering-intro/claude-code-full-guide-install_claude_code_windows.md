---
title: "Context Engineering Intro"
sourceId: "10-context-memory/context-engineering-intro"
sourceTitle: "Context Engineering Intro"
sourceKind: "工程手册"
licenseLabel: "可转载"
lang: "英文"
tier: 1
volume: "10-context-memory"
sourceUrl: "https://github.com/coleam00/context-engineering-intro"
entryUrl: "https://github.com/coleam00/context-engineering-intro/blob/a2d84b021cee1e2f4e77ba854bba0be8cb319035/claude-code-full-guide/install_claude_code_windows.md"
sourceRel: "claude-code-full-guide/install_claude_code_windows.md"
rawUrl: "/raw/10-context-memory/context-engineering-intro/claude-code-full-guide/install_claude_code_windows.md"
sourceSha256: "be6e8dc3f0383498eac40ed78c3a918f1686be36e7fef16af615d19e86c45757"
pageSha256: "be6e8dc3f0383498eac40ed78c3a918f1686be36e7fef16af615d19e86c45757"
contentMode: "local-full"
zh: ""
---

# Context Engineering Intro

## Installing Claude Code on Windows (with WSL)

Claude Code only supports Linux and MacOS by default. To use Claude Code with Windows, you can use WSL.

1. Go to the Microsoft Store

2. Search for Ubuntu WSL and install

3. Open WSL in a terminal

4. Run the following commands (this follows best security practices):

```bash
# First, save a list of your existing global packages for later migration
npm list -g --depth=0 > ~/npm-global-packages.txt

# Create a directory for your global packages
mkdir -p ~/.npm-global

# Configure npm to use the new directory path
npm config set prefix ~/.npm-global

# Note: Replace ~/.bashrc with ~/.zshrc, ~/.profile, or other appropriate file for your shell
echo 'export PATH=~/.npm-global/bin:$PATH' >> ~/.bashrc

# Apply the new PATH setting
source ~/.bashrc

# Now reinstall Claude Code in the new location
npm install -g @anthropic-ai/claude-code
```

5. Now within your IDEs you can open a terminal with Ctrl + J (also use this hotkey to toggle it off) and you can click on the down arrow next to the plus to open an Ubuntu (WSL) terminal where you can run the "claude" command to start Claude Code.
