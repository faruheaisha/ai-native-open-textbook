---
title: "Claude How-To"
sourceId: "09-harness/claude-howto"
sourceTitle: "Claude How-To"
sourceKind: "工程手册"
licenseLabel: "可转载"
lang: "英文"
tier: 2
volume: "09-harness"
sourceUrl: "https://github.com/luongnv89/claude-howto"
entryUrl: "https://github.com/luongnv89/claude-howto/blob/97bfb0685e03112ad39845889061d02cef6e534c/09-advanced-features/README.md"
sourceRel: "09-advanced-features/README.md"
rawUrl: "/raw/09-harness/claude-howto/09-advanced-features/README.md"
sourceSha256: "988281137b2d4521b357f46ae4fdd619ac2b8be6a7500cb14375141641efbc65"
pageSha256: "25aff2b4dd4d9d0274bf97c9f764bf48f14850de3d19607c9c33759e2345f419"
contentMode: "local-full"
zh: ""
---

## Overview

Advanced features in Claude Code extend the core capabilities with planning, reasoning, automation, and control mechanisms. These features enable sophisticated workflows for complex development tasks, code review, automation, and multi-session management.

**Key advanced features include:**
- **Planning Mode**: Create detailed implementation plans before coding
- **Extended Thinking**: Deep reasoning for complex problems
- **Auto Mode**: Background safety classifier reviews each action before execution
- **Background Tasks**: Run long operations without blocking the conversation
- **Permission Modes**: Control what Claude can do (`manual` — formerly `default`, `acceptEdits`, `plan`, `auto`, `dontAsk`, `bypassPermissions`)
- **Print Mode**: Run Claude Code non-interactively for automation and CI/CD (`claude -p`)
- **Session Management**: Manage multiple work sessions
- **Interactive Features**: Keyboard shortcuts, multi-line input, and command history
- **Voice Dictation**: Push-to-talk voice input with 20-language STT support
- **Channels**: MCP servers push messages into running sessions (Research Preview)
- **Remote Control**: Control Claude Code from Claude.ai or the Claude app
- **Web Sessions**: Run Claude Code in the browser at claude.ai/code
- **Desktop App**: Standalone app for visual diff review and multiple sessions
- **Task List**: Persistent task tracking across context compactions
- **Prompt Suggestions**: Smart command suggestions based on context
- **Git Worktrees**: Isolated worktree branches for parallel work
- **Sandboxing**: OS-level filesystem and network isolation
- **Managed Settings**: Enterprise deployment via plist, Registry, or managed files
- **Configuration**: Customize behavior with JSON configuration files
