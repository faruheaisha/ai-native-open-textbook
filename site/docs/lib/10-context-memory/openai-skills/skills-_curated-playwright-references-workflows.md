---
title: "Playwright CLI Workflows"
sourceId: "10-context-memory/openai-skills"
sourceTitle: "Agent Skills"
sourceKind: "技能与配置库"
licenseLabel: "仅引用"
lang: "英文"
tier: 3
volume: "10-context-memory"
sourceUrl: "https://github.com/openai/skills"
entryUrl: "https://github.com/openai/skills/blob/49f948faa9258a0c61caceaf225e179651397431/skills/.curated/playwright/references/workflows.md"
sourceRel: "skills/.curated/playwright/references/workflows.md"
rawUrl: "/raw/10-context-memory/openai-skills/skills/.curated/playwright/references/workflows.md"
sourceSha256: "a2b5835a00ebee3906c146adf7f764f7718ea3f89a8702d86eaa135dfe0fc8c2"
pageSha256: "a2b5835a00ebee3906c146adf7f764f7718ea3f89a8702d86eaa135dfe0fc8c2"
contentMode: "local-full"
zh: ""
---

# Playwright CLI Workflows

Use the wrapper script and snapshot often.
Assume `PWCLI` is set and `pwcli` is an alias for `"$PWCLI"`.
In this repo, run commands from `output/playwright/<label>/` to keep artifacts contained.

## Standard interaction loop

```bash
pwcli open https://example.com
pwcli snapshot
pwcli click e3
pwcli snapshot
```

## Form submission

```bash
pwcli open https://example.com/form --headed
pwcli snapshot
pwcli fill e1 "user@example.com"
pwcli fill e2 "password123"
pwcli click e3
pwcli snapshot
pwcli screenshot
```

## Data extraction

```bash
pwcli open https://example.com
pwcli snapshot
pwcli eval "document.title"
pwcli eval "el => el.textContent" e12
```

## Debugging and inspection

Capture console messages and network activity after reproducing an issue:

```bash
pwcli console warning
pwcli network
```

Record a trace around a suspicious flow:

```bash
pwcli tracing-start
# reproduce the issue
pwcli tracing-stop
pwcli screenshot
```

## Sessions

Use sessions to isolate work across projects:

```bash
pwcli --session marketing open https://example.com
pwcli --session marketing snapshot
pwcli --session checkout open https://example.com/checkout
```

Or set the session once:

```bash
export PLAYWRIGHT_CLI_SESSION=checkout
pwcli open https://example.com/checkout
```

## Configuration file

By default, the CLI reads `playwright-cli.json` from the current directory. Use `--config` to point at a specific file.

Minimal example:

```json
{
  "browser": {
    "launchOptions": {
      "headless": false
    },
    "contextOptions": {
      "viewport": { "width": 1280, "height": 720 }
    }
  }
}
```

## Troubleshooting

- If an element ref fails, run `pwcli snapshot` again and retry.
- If the page looks wrong, re-open with `--headed` and resize the window.
- If a flow depends on prior state, use a named `--session`.
