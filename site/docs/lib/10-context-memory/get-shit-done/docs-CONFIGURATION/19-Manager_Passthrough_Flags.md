---
title: "GSD（Get Shit Done）工作流文档"
sourceId: "10-context-memory/get-shit-done"
sourceTitle: "GSD（Get Shit Done）工作流文档"
sourceKind: "其他材料"
licenseLabel: "可转载"
lang: "英文"
tier: 3
volume: "10-context-memory"
sourceUrl: "https://github.com/gsd-build/get-shit-done"
entryUrl: "https://github.com/gsd-build/get-shit-done/blob/bdcaab2c752d9a33a1a1ca9acf3a3c81fb991815/docs/CONFIGURATION.md"
sourceRel: "docs/CONFIGURATION.md"
rawUrl: "/raw/10-context-memory/get-shit-done/docs/CONFIGURATION.md"
sourceSha256: "3e67baa72c7b00dab65464616eb7f7f38b2c72cad311f0d2b8c6e7ba8e914eb1"
pageSha256: "4baedd3c5290958996a3b909d2f51ff12898d360a2370208ad4d2b16c5d3e1be"
contentMode: "local-full"
zh: ""
---

## Manager Passthrough Flags

Configure per-step flags that `/gsd-manager` appends to each dispatched command. This allows customizing how the manager runs discuss, plan, and execute steps without manual flag entry.

| Setting | Type | Default | Description |
|---------|------|---------|-------------|
| `manager.flags.discuss` | string | (none) | Flags appended to discuss-phase commands (e.g., `"--auto"`) |
| `manager.flags.plan` | string | (none) | Flags appended to plan-phase commands (e.g., `"--skip-research"`) |
| `manager.flags.execute` | string | (none) | Flags appended to execute-phase commands (e.g., `"--validate"`) |

**Example:**

```json
{
  "manager": {
    "flags": {
      "discuss": "--auto",
      "plan": "--skip-research",
      "execute": "--validate"
    }
  }
}
```

Invalid flag tokens are sanitized and logged as warnings. Only recognized GSD flags are passed through.
