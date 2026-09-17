---
title: "Browser Automation with playwright-cli"
sourceId: "09-harness/claude-code-guide-zebbern"
sourceTitle: "Claude Code Guide（zebbern）"
sourceKind: "工程手册"
licenseLabel: "可转载"
lang: "英文"
tier: 3
volume: "09-harness"
sourceUrl: "https://github.com/zebbern/claude-code-guide"
entryUrl: "https://github.com/zebbern/claude-code-guide/blob/64c890fe74c3ccfad673dc9c71dc85b8dd2f4817/skills/playwright/playwright-cli/SKILL.md"
sourceRel: "skills/playwright/playwright-cli/SKILL.md"
rawUrl: "/raw/09-harness/claude-code-guide-zebbern/skills/playwright/playwright-cli/SKILL.md"
sourceSha256: "d9d361b10171fa90a523706d7963222548109bebc472edf44bd30699ae9e9366"
pageSha256: "d9d361b10171fa90a523706d7963222548109bebc472edf44bd30699ae9e9366"
contentMode: "local-full"
zh: ""
---

# Browser Automation with playwright-cli

> Comprehensive CLI-driven browser automation — navigate, interact, mock, debug, record, and generate tests without writing a single script file.

## Quick Start

```bash
# Install and set up
playwright-cli install --skills
playwright-cli install-browser

# Open a browser and navigate
playwright-cli open https://playwright.dev

# Take a snapshot to see interactive elements (refs like e1, e2, e3...)
playwright-cli snapshot

# Interact using element refs from the snapshot
playwright-cli click e15
playwright-cli fill e5 "search query"
playwright-cli press Enter

# Take a screenshot
playwright-cli screenshot

# Close the browser
playwright-cli close
```

## Golden Rules

1. **Always `snapshot` first** — identify element refs before interacting; never guess ref numbers
2. **Use `fill` for inputs, `click` for buttons** — `type` sends keystrokes one-by-one, `fill` replaces the entire value
3. **Named sessions for parallel work** — `-s=name` isolates cookies, storage, and tabs per session
4. **Save auth state** — `state-save auth.json` after login, `state-load auth.json` to skip login next time
5. **Trace before debugging** — `tracing-start` before the failing step, not after
6. **`run-code` for advanced scenarios** — when CLI commands aren't enough, drop into full Playwright API
7. **Clean up sessions** — `close` or `close-all` when done; `kill-all` for zombie processes
8. **Descriptive filenames** — `screenshot --filename=checkout-step3.png` not `screenshot`
9. **Mock external APIs only** — use `route` to intercept third-party services, not your own app
10. **Persistent profiles for stateful flows** — `--persistent` keeps cookies and storage across restarts

## Command Reference

### Core Interaction

```bash
playwright-cli open [url]                    # Launch browser, optionally navigate
playwright-cli goto <url>                    # Navigate to URL
playwright-cli snapshot                      # Show page elements with refs
playwright-cli snapshot --filename=snap.yaml # Save snapshot to file
playwright-cli click <ref>                   # Click an element
playwright-cli dblclick <ref>                # Double-click
playwright-cli fill <ref> "value"            # Clear and fill input
playwright-cli type "text"                   # Type keystroke by keystroke
playwright-cli select <ref> "option-value"   # Select dropdown option
playwright-cli check <ref>                   # Check a checkbox
playwright-cli uncheck <ref>                 # Uncheck a checkbox
playwright-cli hover <ref>                   # Hover over element
