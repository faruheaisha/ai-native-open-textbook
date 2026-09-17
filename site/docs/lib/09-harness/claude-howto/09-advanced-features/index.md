---
title: "Advanced Features"
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
pageSha256: "fda5448a38f0a45e21a9e90413cf859e6cecca3088d8fe2153635e5c80b4784c"
contentMode: "local-full"
zh: ""
---

# Advanced Features

Comprehensive guide to Claude Code's advanced capabilities including planning mode, extended thinking, auto mode, background tasks, permission modes, print mode (non-interactive), session management, interactive features, channels, voice dictation, remote control, web sessions, desktop app, task list, prompt suggestions, git worktrees, sandboxing, managed settings, and configuration.

## 本篇目录

- [Table of Contents](https://github.com/luongnv89/claude-howto/blob/97bfb0685e03112ad39845889061d02cef6e534c/09-advanced-features/01-Table_of_Contents.md)
- [Overview](https://github.com/luongnv89/claude-howto/blob/97bfb0685e03112ad39845889061d02cef6e534c/09-advanced-features/02-Overview.md)
- [Planning Mode](https://github.com/luongnv89/claude-howto/blob/97bfb0685e03112ad39845889061d02cef6e534c/09-advanced-features/03-Planning_Mode.md)
- [Extended Thinking](https://github.com/luongnv89/claude-howto/blob/97bfb0685e03112ad39845889061d02cef6e534c/09-advanced-features/04-Extended_Thinking.md)
- [Auto Mode](https://github.com/luongnv89/claude-howto/blob/97bfb0685e03112ad39845889061d02cef6e534c/09-advanced-features/05-Auto_Mode.md)
- [Background Tasks](https://github.com/luongnv89/claude-howto/blob/97bfb0685e03112ad39845889061d02cef6e534c/09-advanced-features/06-Background_Tasks.md)
- [Monitor Tool (Event-Driven Streams)](https://github.com/luongnv89/claude-howto/blob/97bfb0685e03112ad39845889061d02cef6e534c/09-advanced-features/07-Monitor_Tool_Event-Driven_Streams.md)
- [Dynamic Workflows](https://github.com/luongnv89/claude-howto/blob/97bfb0685e03112ad39845889061d02cef6e534c/09-advanced-features/08-Dynamic_Workflows.md)
- [Scheduled Tasks](https://github.com/luongnv89/claude-howto/blob/97bfb0685e03112ad39845889061d02cef6e534c/09-advanced-features/09-Scheduled_Tasks.md)
- [Permission Modes](https://github.com/luongnv89/claude-howto/blob/97bfb0685e03112ad39845889061d02cef6e534c/09-advanced-features/10-Permission_Modes.md)
- [Headless Mode](https://github.com/luongnv89/claude-howto/blob/97bfb0685e03112ad39845889061d02cef6e534c/09-advanced-features/11-Headless_Mode.md)
- [Session Management](https://github.com/luongnv89/claude-howto/blob/97bfb0685e03112ad39845889061d02cef6e534c/09-advanced-features/12-Session_Management.md)
- [Cross-Session Messaging](https://github.com/luongnv89/claude-howto/blob/97bfb0685e03112ad39845889061d02cef6e534c/09-advanced-features/13-Cross-Session_Messaging.md)
- [Interactive Features](https://github.com/luongnv89/claude-howto/blob/97bfb0685e03112ad39845889061d02cef6e534c/09-advanced-features/14-Interactive_Features.md)
- [Output Styles](https://github.com/luongnv89/claude-howto/blob/97bfb0685e03112ad39845889061d02cef6e534c/09-advanced-features/15-Output_Styles.md)
- [Status Line](https://github.com/luongnv89/claude-howto/blob/97bfb0685e03112ad39845889061d02cef6e534c/09-advanced-features/16-Status_Line.md)
- [TUI Mode (Fullscreen)](https://github.com/luongnv89/claude-howto/blob/97bfb0685e03112ad39845889061d02cef6e534c/09-advanced-features/17-TUI_Mode_Fullscreen.md)
- [Voice Dictation](https://github.com/luongnv89/claude-howto/blob/97bfb0685e03112ad39845889061d02cef6e534c/09-advanced-features/18-Voice_Dictation.md)
- [Channels](https://github.com/luongnv89/claude-howto/blob/97bfb0685e03112ad39845889061d02cef6e534c/09-advanced-features/19-Channels.md)
- [Chrome Integration](https://github.com/luongnv89/claude-howto/blob/97bfb0685e03112ad39845889061d02cef6e534c/09-advanced-features/20-Chrome_Integration.md)
- [Remote Control](https://github.com/luongnv89/claude-howto/blob/97bfb0685e03112ad39845889061d02cef6e534c/09-advanced-features/21-Remote_Control.md)
- [Web Sessions](https://github.com/luongnv89/claude-howto/blob/97bfb0685e03112ad39845889061d02cef6e534c/09-advanced-features/22-Web_Sessions.md)
- [Desktop App](https://github.com/luongnv89/claude-howto/blob/97bfb0685e03112ad39845889061d02cef6e534c/09-advanced-features/23-Desktop_App.md)
- [Task List](https://github.com/luongnv89/claude-howto/blob/97bfb0685e03112ad39845889061d02cef6e534c/09-advanced-features/24-Task_List.md)
- [Prompt Suggestions](https://github.com/luongnv89/claude-howto/blob/97bfb0685e03112ad39845889061d02cef6e534c/09-advanced-features/25-Prompt_Suggestions.md)
- [Git Worktrees](https://github.com/luongnv89/claude-howto/blob/97bfb0685e03112ad39845889061d02cef6e534c/09-advanced-features/26-Git_Worktrees.md)
- [Sandboxing](https://github.com/luongnv89/claude-howto/blob/97bfb0685e03112ad39845889061d02cef6e534c/09-advanced-features/27-Sandboxing.md)
- [Managed Settings (Enterprise)](https://github.com/luongnv89/claude-howto/blob/97bfb0685e03112ad39845889061d02cef6e534c/09-advanced-features/28-Managed_Settings_Enterprise.md)
- [Configuration and Settings](https://github.com/luongnv89/claude-howto/blob/97bfb0685e03112ad39845889061d02cef6e534c/09-advanced-features/29-Configuration_and_Settings.md)
- [Trust and Permission Scoping](https://github.com/luongnv89/claude-howto/blob/97bfb0685e03112ad39845889061d02cef6e534c/09-advanced-features/30-Trust_and_Permission_Scoping.md)
- [Agent Teams](https://github.com/luongnv89/claude-howto/blob/97bfb0685e03112ad39845889061d02cef6e534c/09-advanced-features/31-Agent_Teams.md)
- [Best Practices](https://github.com/luongnv89/claude-howto/blob/97bfb0685e03112ad39845889061d02cef6e534c/09-advanced-features/32-Best_Practices.md)
- [Additional Resources](https://github.com/luongnv89/claude-howto/blob/97bfb0685e03112ad39845889061d02cef6e534c/09-advanced-features/33-Additional_Resources.md)
