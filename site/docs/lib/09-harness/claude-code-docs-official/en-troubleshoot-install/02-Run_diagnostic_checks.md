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
sourceRel: "en/troubleshoot-install.md"
rawUrl: "/raw/09-harness/claude-code-docs-official/en/troubleshoot-install.md"
sourceSha256: "c83d61a9b307685768a93997521188fc5ff121e43600061575eada47bfd2e639"
pageSha256: "e83b0db575cf41a199a40f35ae4be189e03cf938e2091adfcb33c59c525e0494"
contentMode: "local-full"
zh: ""
---

## Run diagnostic checks

### Check network connectivity

The installer downloads from `downloads.claude.ai`. Verify you can reach it:

    ```bash theme=\{null\}
    curl -sI https://downloads.claude.ai/claude-code-releases/latest
    ```

    ```powershell theme=\{null\}
    curl.exe -sI https://downloads.claude.ai/claude-code-releases/latest
    ```

    PowerShell aliases `curl` to `Invoke-WebRequest`, which rejects the `-sI` flags, so call `curl.exe` explicitly.

You reached the server if the first line shows a `200` status. You see `HTTP/2 200` on macOS and Linux, and `HTTP/1.1 200 OK` from the `curl.exe` included with Windows. Other results point to the cause:

* `403`: usually a proxy or network filter blocking the host, or Claude Code is [not available in your region](https://www.anthropic.com/supported-countries)
* `5xx`: usually a temporary service issue; wait a few minutes and retry

If you see no output, `Could not resolve host`, or a connection timeout, your network is blocking the connection. Common causes:

* Corporate firewalls or proxies blocking `downloads.claude.ai`
* Regional network restrictions: try a VPN or alternative network
* TLS/SSL issues: update your system's CA certificates, or check if `HTTPS_PROXY` is configured

If you're behind a corporate proxy, set `HTTPS_PROXY` and `HTTP_PROXY` to your proxy's address before installing. Ask your IT team for the proxy URL if you don't know it, or check your browser's proxy settings.

This example sets both proxy variables, then runs the installer through your proxy:

    ```bash theme=\{null\}
    export HTTP_PROXY=http://proxy.example.com:8080
    export HTTPS_PROXY=http://proxy.example.com:8080
    curl -fsSL https://claude.ai/install.sh | bash
    ```

    ```powershell theme=\{null\}
    $env:HTTP_PROXY = 'http://proxy.example.com:8080'
    $env:HTTPS_PROXY = 'http://proxy.example.com:8080'
    irm https://claude.ai/install.ps1 | iex
    ```

### Verify your PATH

If installation succeeded but you get a `command not found` or `not recognized` error when running `claude`, the install directory isn't in your PATH. Your shell searches for programs in directories listed in PATH, and the installer places `claude` at `~/.local/bin/claude` on macOS/Linux or `%USERPROFILE%\.local\bin\claude.exe` on Windows.

  The [VS Code extension](https://code.claude.com/docs/en/vs-code) does not place `claude` at this location. It bundles a private copy of the CLI inside the extension directory for its own chat panel and does not add it to PATH. If you have only installed the extension, `~/.local/bin/claude` will not exist. Run the [standalone install](https://code.claude.com/docs/en/setup) to use `claude` from a terminal, then continue below.

Check if the install directory is in your PATH by listing your PATH entries and filtering for `local/bin`:

    ```bash theme=\{null\}
    echo $PATH | tr ':' '\n' | grep -Fx "$HOME/.local/bin"
    ```

    If this prints `/Users/you/.local/bin` or `/home/you/.local/bin`, the directory is in your PATH and you can skip to [Check for conflicting installations](#check-for-conflicting-installations). If there's no output, add it to your shell configuration.

    For Zsh, the default on macOS:

    ```bash theme=\{null\}
    echo 'export PATH="$HOME/.local/bin:$PATH"' >> ~/.zshrc
    source ~/.zshrc
    ```

    For Bash, the default on most Linux distributions:

    ```bash theme=\{null\}
    echo 'export PATH="$HOME/.local/bin:$PATH"' >> ~/.bashrc
    source ~/.bashrc
    ```

    Alternatively, close and reopen your terminal.

    For other shells such as fish or Nushell, add `~/.local/bin` to your PATH using your shell's own configuration syntax, then restart your terminal.

    Verify the fix worked:

    ```bash theme=\{null\}
    claude --version
    ```

    ```powershell theme=\{null\}
    $env:PATH -split ';' | Select-String '\.local\\bin'
    ```

    If there's no output, add the install directory to your User PATH:

    ```powershell theme={null}
    $currentPath = [Environment]::GetEnvironmentVariable('PATH', 'User')
    [Environment]:https://code.claude.com/docs "$currentPath;$env:USERPROFILE\.local\bin", 'User')
    ```

    Restart your terminal for the change to take effect.

    Verify the fix worked:

    ```powershell theme=\{null\}
    claude --version
    ```

    ```batch theme=\{null\}
    echo %PATH% | findstr /i "local\bin"
    ```

    If there's no output, open System Settings, go to Environment Variables, and add `%USERPROFILE%\.local\bin` to your User PATH variable. Restart your terminal.

    Verify the fix worked:

    ```batch theme=\{null\}
    claude --version
    ```

### Check for conflicting installations

Multiple Claude Code installations can cause version mismatches or unexpected behavior. Check what's installed:

    List all `claude` binaries found in your PATH:

    ```bash theme=\{null\}
    which -a claude
    ```

    If this prints nothing, no `claude` is on your PATH yet. Go back to [Verify your PATH](#verify-your-path).

    Check the three locations a `claude` binary can come from. `~/.local/bin/claude` is the native installer, `~/.claude/local/` is a legacy local npm install created by older versions of Claude Code, and the npm global list shows a `-g` install:

    ```bash theme=\{null\}
    ls -la ~/.local/bin/claude
    ```

    A native install shows a symlink into `~/.local/share/claude/versions/`. A script or a symlink you created yourself at this path is a custom launcher, which [auto-update leaves in place](https://code.claude.com/docs/en/setup#auto-updates).

    If either `ls` command prints `No such file or directory`, that's not an error. It means nothing is installed at that location, so move on to the next check.

    ```bash theme=\{null\}
    ls -la ~/.claude/local/
    ```

    ```bash theme=\{null\}
    npm -g ls @anthropic-ai/claude-code 2>/dev/null
    ```

    List all `claude` binaries found in your PATH:

    ```powershell theme=\{null\}
    where.exe claude
    ```

    Check whether the native installer placed a binary:

    ```powershell theme=\{null\}
    Test-Path "$env:USERPROFILE\.local\bin\claude.exe"
    ```

If you find multiple installations, keep only one. The native install at `~/.local/bin/claude` on macOS/Linux or `%USERPROFILE%\.local\bin\claude.exe` on Windows is recommended. Remove the extras:

Uninstall an npm global install:

```bash theme={null}
npm uninstall -g @anthropic-ai/claude-code
```

Remove the legacy local npm install:

    ```bash theme=\{null\}
    rm -rf ~/.claude/local
    ```

    ```powershell theme=\{null\}
    Remove-Item -Recurse -Force "$env:USERPROFILE\.claude\local"
    ```

Remove a Homebrew install on macOS. If you installed the `claude-code@latest` cask, substitute that name:

```bash theme={null}
brew uninstall --cask claude-code
```

Remove a WinGet install on Windows:

```powershell theme={null}
winget uninstall Anthropic.ClaudeCode
```

### Check directory permissions

The installer needs write access to `~/.local/bin/` and `~/.claude/` on macOS and Linux. On Windows the install location is under `%USERPROFILE%`, which is writable by your user by default, so this section rarely applies there.

Check whether the directories are writable:

```bash theme={null}
test -w ~/.local/bin && echo "writable" || echo "not writable"
test -w ~/.claude && echo "writable" || echo "not writable"
```

If either directory isn't writable, create the install directory and set your user as the owner:

```bash theme={null}
sudo mkdir -p ~/.local/bin
sudo chown -R $(whoami) ~/.local
```

### Verify the binary works

If `claude --version` prints a version but `claude` crashes or hangs on startup, run these checks to narrow down the cause. If `claude --version` says command not found, go to [Verify your PATH](#verify-your-path) first; the commands below assume `claude` is on your PATH.

Confirm the binary exists and is executable:

    ```bash theme=\{null\}
    ls -la "$(command -v claude)"
    ```

    ```powershell theme=\{null\}
    Get-Command claude | Select-Object Source
    ```

On Linux, check for missing shared libraries. If `ldd` shows missing libraries, you may need to install system packages. On Alpine Linux and other musl-based distributions, see [Alpine Linux setup](https://code.claude.com/docs/en/setup#alpine-linux-and-musl-based-distributions).

```bash theme={null}
ldd "$(command -v claude)" | grep "not found"
```

Confirm the binary can execute:

```bash theme={null}
claude --version
```
