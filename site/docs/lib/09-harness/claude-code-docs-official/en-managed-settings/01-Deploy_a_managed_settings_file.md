---
title: "claude-code-docs-official"
sourceId: "09-harness/claude-code-docs-official"
sourceTitle: "claude-code-docs-official"
sourceKind: "官方文档"
licenseLabel: "仅引用"
lang: "英文"
tier: 3
volume: "09-harness"
sourceUrl: "https://code.claude.com/docs"
entryUrl: "https://code.claude.com/docs"
sourceRel: "en/managed-settings.md"
rawUrl: "/raw/09-harness/claude-code-docs-official/en/managed-settings.md"
sourceSha256: "d004e5b69cafe5d2bb7b626e4b76989e9712594969ab0ca8ce430cadf56dcb6b"
pageSha256: "20c4619fd8f698be478ffa7cfae3aca368cad904ea4d86c11be9b2e602878945"
contentMode: "local-full"
zh: ""
---

## Deploy a managed settings file

This is the quickest way to put a policy on each machine: a `managed-settings.json` file. If you haven't picked how to deliver managed settings yet, or your devices are under MDM or developers run cloud sessions, read [Choose a delivery mechanism](#choose-a-delivery-mechanism) first.

    Write a `managed-settings.json` that holds the keys you've decided to enforce, in the same JSON shape as `settings.json`. The [Decide what to enforce](https://code.claude.com/docs/en/admin-setup#decide-what-to-enforce) table lists the keys behind each control, and each entry in the [settings reference](https://code.claude.com/docs/en/settings-reference) says whether a managed source can set it. This file blocks two file reads, turns off bypass mode, and makes Claude Code ignore permission rules from user, project, and local files and from `--allowedTools`:

    ```json managed-settings.json theme=\{null\}
    \{
      "permissions": \{
        "deny": [
          "Read(./.env)",
          "Read(./secrets/**)"
        ],
        "disableBypassPermissionsMode": "disable"
      \},
      "allowManagedPermissionRulesOnly": true
    \}
    ```

    For a fuller example that shows the shape of more managed keys, including the login method, models, MCP servers, and marketplaces, see [An organization's managed settings](https://code.claude.com/docs/en/settings-example#an-organizations-managed-settings).

    Save the file as `managed-settings.json` in the system directory for the operating system, using whatever tooling already places files on your fleet:

    * **macOS**: `/Library/Application Support/ClaudeCode/managed-settings.json`
    * **Linux and WSL**: `/etc/claude-code/managed-settings.json`
    * **Windows**: `C:\Program Files\ClaudeCode\managed-settings.json`

    On one machine, run `/status` inside Claude Code. The `Setting sources` line shows `Enterprise managed settings (file)`. Roll out to the rest of the fleet after that; [Check that a policy is in force](#check-that-a-policy-is-in-force) covers what to look at when the line is missing.

&lt;span id="managed-settings-delivery" />

&lt;span id="delivery-mechanisms" />
