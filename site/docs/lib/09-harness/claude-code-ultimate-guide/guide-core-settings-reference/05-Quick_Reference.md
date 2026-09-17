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
entryUrl: "https://github.com/FlorianBruniaux/claude-code-ultimate-guide/blob/af05b84fb6e32432dae2114ee2a72c44ef3d29b1/guide/core/settings-reference.md"
sourceRel: "guide/core/settings-reference.md"
rawUrl: "/raw/09-harness/claude-code-ultimate-guide/guide/core/settings-reference.md"
sourceSha256: "d71d09e7fe0e14138483215b2914bfeed715745a15fdcc31323d061554ffb433"
pageSha256: "a0df675ec09f12fa9b6dced0ed2b4c9575a482017e3be8f90d75bbd9bf6cefe5"
contentMode: "local-full"
zh: ""
---

## Quick Reference

| Task | Setting / Variable |
|------|--------------------|
| Set default model | `model` in settings or `ANTHROPIC_MODEL` env var |
| Lock model choices | `availableModels` array |
| Silence telemetry | `DISABLE_TELEMETRY=1` or `CLAUDE_CODE_DISABLE_NONESSENTIAL_TRAFFIC=1` |
| Auto-approve bash | `permissions.defaultMode: "acceptEdits"` |
| Block sensitive files | `permissions.deny: ["Read(.env)"]` |
| Reduce context compaction | `CLAUDE_AUTOCOMPACT_PCT_OVERRIDE=70` |
| Set response language | `language: "japanese"` |
| Custom spinner text | `spinnerVerbs` + `spinnerTipsOverride` |
| Remove attribution | `attribution.commit: ""`, `attribution.pr: ""` |
| Pin to stable releases | `autoUpdatesChannel: "stable"` |
| Dynamic auth token | `apiKeyHelper: "/path/to/script.sh"` |
| Large monorepo | `worktree.symlinkDirectories` + `worktree.sparsePaths` |
| Enable sandboxing | `sandbox.enabled: true` |
| Trust all project MCP servers | `enableAllProjectMcpServers: true` |
