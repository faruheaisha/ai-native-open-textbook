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
sourceRel: "en/env-vars.md"
rawUrl: "/raw/09-harness/claude-code-docs-official/en/env-vars.md"
sourceSha256: "9b1792540478648e4ff9cdd48c6e17a321d70a401812c1fc557b74c9080a7b5f"
pageSha256: "21ac11430375a922afc72daf0381c0713734ef7c2fabca1fbddb21bbf1d77614"
contentMode: "local-full"
zh: ""
---

## Set environment variables

A variable you set in your shell lasts for that terminal session, while a variable in a settings file applies every time `claude` runs.

### In your shell

Set the variable before launching `claude`:

    ```bash theme=\{null\}
    export API_TIMEOUT_MS="1200000"
    claude
    ```

    To set it for every session, add the `export` line to `~/.bashrc`, `~/.zshrc`, or your shell's profile file.

    ```powershell theme=\{null\}
    $env:API_TIMEOUT_MS = "1200000"
    claude
    ```

    To set it for every session, run `[Environment]::SetEnvironmentVariable("API_TIMEOUT_MS", "1200000", "User")` and open a new terminal.

    ```batch theme={null}
    set API_TIMEOUT_MS=1200000
    claude
    ```

    To set it for every session, run `setx API_TIMEOUT_MS "1200000"` and open a new terminal.

The assignment line prints nothing on success, so confirm the variable is set by printing it in the same shell before you run `claude`:

    ```bash theme={null}
    echo $API_TIMEOUT_MS
    ```

    ```powershell theme=\{null\}
    echo $env:API_TIMEOUT_MS
    ```

    ```batch theme=\{null\}
    echo %API_TIMEOUT_MS%
    ```

### In settings files

Add variables under the `env` key in a `settings.json` file, creating the file if it doesn't exist. Claude Code reads them directly from the file, so they take effect no matter how `claude` was launched. A running session applies new and changed values to its environment when you save the file, but a feature that reads its variables once at startup, such as [OpenTelemetry monitoring](https://code.claude.com/docs/en/monitoring-usage), keeps its startup values until you relaunch. Removing a variable from the file doesn't unset it in a running session; the removal takes effect the next time you launch `claude`.

```json ~/.claude/settings.json theme={null}
{
  "env": {
    "API_TIMEOUT_MS": "1200000",
    "BASH_DEFAULT_TIMEOUT_MS": "300000"
  }
}
```

The file you choose controls who the variables apply to:

| File                          | Applies to                                                                                                                      |
| :---------------------------- | :------------------------------------------------------------------------------------------------------------------------------ |
| `~/.claude/settings.json`     | You, in every project                                                                                                           |
| `.claude/settings.json`       | Everyone working in the project, checked into source control                                                                    |
| `.claude/settings.local.json` | You, in this project only, gitignored when Claude Code saves a setting to it; add it to your gitignore if you create it by hand |
| Managed settings              | Everyone in your organization, deployed by an admin                                                                             |

See [Settings files](https://code.claude.com/docs/en/settings#where-settings-live) for where each file lives and [Settings precedence](https://code.claude.com/docs/en/settings#settings-precedence) for how they combine when more than one sets the same variable.
