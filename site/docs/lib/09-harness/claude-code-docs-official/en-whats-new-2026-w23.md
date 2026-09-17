---
title: "Week 23 · June 1–5, 2026"
sourceId: "09-harness/claude-code-docs-official"
sourceTitle: "claude-code-docs-official"
sourceKind: "官方文档"
licenseLabel: "仅引用"
lang: "英文"
tier: 3
volume: "09-harness"
sourceUrl: "https://code.claude.com/docs"
entryUrl: "https://code.claude.com/docs"
sourceRel: "en/whats-new/2026-w23.md"
rawUrl: "/raw/09-harness/claude-code-docs-official/en/whats-new/2026-w23.md"
sourceSha256: "226b64f003432d664b840391fbfc0bbe06ca73f1480e18b5f5b6943e821daba4"
pageSha256: "226b64f003432d664b840391fbfc0bbe06ca73f1480e18b5f5b6943e821daba4"
contentMode: "local-full"
zh: ""
---

# Week 23 · June 1–5, 2026

> Run auto mode on Amazon Bedrock, Google Cloud's Agent Platform, and Microsoft Foundry, prompt before writing files that can run code in acceptEdits mode, list installed plugins with /plugin list, and require an approved version range for managed deployments.

<div className="digest-meta">
  <span>Releases <a href="https://code.claude.com/docs/en/changelog#2-1-158">v2.1.158 → v2.1.165</a></span>
  <span>4 features · June 1–5</span>
</div>


  <div className="digest-feature-header">
    <span className="digest-feature-title">Auto mode on Amazon Bedrock, Google Cloud's Agent Platform, and Microsoft Foundry</span>
    <span className="digest-feature-pill">v2.1.158</span>
  </div>

  <p className="digest-feature-lede">Auto mode is now available on Amazon Bedrock, Google Cloud's Agent Platform, and Microsoft Foundry for Opus 4.7 and Opus 4.8, replacing permission prompts with background safety checks on third-party providers. Opt in by setting <code>CLAUDE\_CODE\_ENABLE\_AUTO\_MODE=1</code>.</p>

  <p className="digest-feature-try">Opt in on a third-party provider, then cycle to auto mode with Shift+Tab:</p>

  ```bash terminal theme={null}
  export CLAUDE_CODE_ENABLE_AUTO_MODE=1
  ```

[Auto mode on third-party providers](https://code.claude.com/docs/en/permission-modes#enable-auto-mode-on-bedrock-agent-platform-or-foundry)



  <div className="digest-feature-header">
    <span className="digest-feature-title">Safer automatic edits</span>
    <span className="digest-feature-pill">v2.1.160</span>
  </div>

  <p className="digest-feature-lede">Claude Code now prompts before writing files that can run code, even in <code>acceptEdits</code> mode. The protected set covers shell startup files such as <code>.zshenv</code> and <code>.bash\_login</code>, git config under <code>\~/.config/git/</code>, and build-tool configs such as <code>.npmrc</code>, <code>.bazelrc</code>, and <code>.pre-commit-config.yaml</code>. These writes are never auto-approved in any mode except <code>bypassPermissions</code>.</p>

  <p className="digest-feature-try">Work in acceptEdits mode; Claude now pauses before writing these files:</p>

  ```bash terminal theme={null}
  claude --permission-mode acceptEdits
  ```

[Protected paths](https://code.claude.com/docs/en/permission-modes#protected-paths)



  <div className="digest-feature-header">
    <span className="digest-feature-title">List installed plugins with /plugin list</span>
    <span className="digest-feature-pill">v2.1.163</span>
  </div>

  <p className="digest-feature-lede">The new <code>/plugin list</code> command prints your installed plugins inline, without opening the <code>/plugin</code> menu, and is also available as <code>claude plugin list</code> from the shell. In the interactive form, add `--enabled` or `--disabled` to show only plugins in that state.</p>

  <p className="digest-feature-try">List the plugins that are currently turned on:</p>

  ```text Claude Code theme={null}
  > /plugin list --enabled
  ```

[Plugin commands](https://code.claude.com/docs/en/plugins-reference#plugin-list)



  <div className="digest-feature-header">
    <span className="digest-feature-title">Version requirements for managed deployments</span>
    <span className="digest-feature-pill">v2.1.163</span>
  </div>

  <p className="digest-feature-lede">Two managed settings, <code>requiredMinimumVersion</code> and <code>requiredMaximumVersion</code>, let your organization require an approved Claude Code version range. A client outside the range exits at startup and tells the user to update through the organization's method. <code>claude update</code>, <code>claude install</code>, and <code>claude doctor</code> keep working so users can still recover.</p>

  <p className="digest-feature-try">Add a floor to your managed settings so older clients refuse to start:</p>

  ```json managed-settings.json theme={null}
  {
    "requiredMinimumVersion": "2.1.163"
  }
  ```

[Decide what to enforce](https://code.claude.com/docs/en/admin-setup#decide-what-to-enforce)


<div className="digest-wins">
  <p className="digest-wins-title">Other wins</p>

  <div className="digest-wins-grid">
    <div>The trigger keyword for <a href="https://code.claude.com/docs/en/workflows">dynamic workflows</a> changed from <code>workflow</code> to <code>ultracode</code>; asking for a workflow in your own words still works, and the keyword is highlighted in violet in the prompt</div>
    <div><a href="https://code.claude.com/docs/en/hooks">Stop and SubagentStop hooks</a> can return <code>hookSpecificOutput.additionalContext</code> to give Claude feedback and keep the turn going instead of being treated as an error</div>
    <div><code>claude mcp</code> list, get, and add no longer print secrets: environment-variable references are not expanded, and credential headers and URL secrets are redacted</div>
    <div>A failed Bash command in a parallel tool batch no longer cancels the others; each tool returns its own result independently</div>
    <div>Editing a file no longer needs a separate Read first when you viewed it with a single-file <code>grep</code>, <code>egrep</code>, or <code>fgrep</code></div>
    <div>Clicking a command in the autocomplete menu now fills it into your prompt instead of running it immediately; press Enter to run</div>
    <div>Listing <code>Grep</code> or <code>Glob</code> in `--tools` now provides the dedicated search tools on native builds with embedded search, instead of silently ignoring those names</div>
    <div><code>/effort</code> now confirms when your chosen level will persist as the default for new sessions</div>
    <div><code>OTEL\_RESOURCE\_ATTRIBUTES</code> values are now attached as labels on metric datapoints, so you can slice usage metrics by custom dimensions like team or repo</div>
    <div>Windsurf is renamed to Devin Desktop in <code>/ide</code>, <code>/terminal-setup</code>, and <code>/scroll-speed</code>, following the editor's rebrand</div>
    <div><code>/btw</code> gains a <code>c to copy</code> shortcut that copies the raw markdown answer to the clipboard</div>
  </div>
</div>

[Full changelog for v2.1.158–v2.1.165 →](https://code.claude.com/docs/en/changelog#2-1-158)
