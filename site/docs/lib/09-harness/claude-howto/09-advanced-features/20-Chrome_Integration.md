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
pageSha256: "d13a202fec993659ad3861ebcd69fd43a3ac3fbd9ca09166bd9d602fff986e8d"
contentMode: "local-full"
zh: ""
---

## Chrome Integration

Chrome Integration connects Claude Code to your Chrome or Microsoft Edge browser for live web automation and debugging. This is a beta feature available since v2.0.73+ (Edge support added in v1.0.36+).

### Enabling Chrome Integration

**At startup**:

```bash
claude --chrome      # Enable Chrome connection
claude --no-chrome   # Disable Chrome connection
```

**Within a session**:

```
/chrome
```

Select "Enabled by default" to activate Chrome Integration for all future sessions. Claude Code shares your browser's login state, so it can interact with authenticated web apps.

### Capabilities

| Capability | Description |
|------------|-------------|
| **Live debugging** | Read console logs, inspect DOM elements, debug JavaScript in real time |
| **Design verification** | Compare rendered pages against design mockups |
| **Form validation** | Test form submissions, input validation, and error handling |
| **Web app testing** | Interact with authenticated apps (Gmail, Google Docs, Notion, etc.) |
| **Data extraction** | Scrape and process content from web pages |
| **Session recording** | Record browser interactions as GIF files |

### Site-level permissions

The Chrome extension manages per-site access. Grant or revoke access for specific sites at any time through the extension popup. Claude Code only interacts with sites you have explicitly allowed.

### How it works

Claude Code controls the browser in a visible window — you can watch actions happen in real time. When the browser encounters a login page or CAPTCHA, Claude pauses and waits for you to handle it manually before continuing.

### Known limitations

- **Browser support**: Chrome and Edge only — Brave, Arc, and other Chromium browsers are not supported
- **WSL**: Not available in Windows Subsystem for Linux
- **Third-party providers**: Not supported with Bedrock, Vertex, or Foundry API providers
- **Service worker idle**: The Chrome extension service worker may go idle during extended sessions

> **Tip**: Chrome Integration is a beta feature. Browser support may expand in future releases.
