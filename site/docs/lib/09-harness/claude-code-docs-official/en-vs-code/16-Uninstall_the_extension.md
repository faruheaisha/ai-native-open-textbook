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
sourceRel: "en/vs-code.md"
rawUrl: "/raw/09-harness/claude-code-docs-official/en/vs-code.md"
sourceSha256: "6c14f8a02079b0d1ee1142ff770bcda731b181565c57a600c9377c899fbc9801"
pageSha256: "cc182d6557e5eb750615df0bed3265522c0013f8f43b4fbceee61706363826ac"
contentMode: "local-full"
zh: ""
---

## Uninstall the extension

To uninstall the Claude Code extension:

1. Open the Extensions view (`Cmd+Shift+X` on Mac or `Ctrl+Shift+X` on Windows/Linux)
2. Search for "Claude Code"
3. Click **Uninstall**

If you run `claude` in a VS Code integrated terminal, Claude Code reinstalls the extension automatically. To keep it uninstalled, turn off **Auto-install IDE extension** in `/config`, or set [`autoInstallIdeExtension`](https://code.claude.com/docs/en/settings-reference#autoinstallideextension) to `false`. You can also set the [`CLAUDE_CODE_IDE_SKIP_AUTO_INSTALL`](https://code.claude.com/docs/en/env-vars) environment variable to `1`.

To also remove extension data and reset all settings, delete the extension's storage directory for your platform.

On macOS:

```bash theme={null}
rm -rf ~/Library/"Application Support"/Code/User/globalStorage/anthropic.claude-code
```

On Linux:

```bash theme={null}
rm -rf ~/.config/Code/User/globalStorage/anthropic.claude-code
```

On Windows, in PowerShell:

```powershell theme={null}
Remove-Item -Recurse -Force "$env:APPDATA\Code\User\globalStorage\anthropic.claude-code"
```

For additional help, see the [troubleshooting guide](https://code.claude.com/docs/en/troubleshooting).
