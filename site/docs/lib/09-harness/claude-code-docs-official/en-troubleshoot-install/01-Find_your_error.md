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
pageSha256: "ed05c0dcb346aa107172cb43a9934afec6a33435709d544842a9aecf75063967"
contentMode: "local-full"
zh: ""
---

## Find your error

Match the error message or symptom you're seeing to a fix:

| What you see                                                                                               | Solution                                                                                                                                      |
| :--------------------------------------------------------------------------------------------------------- | :-------------------------------------------------------------------------------------------------------------------------------------------- |
| `command not found: claude` or `'claude' is not recognized`                                                | [Fix your PATH](#command-not-found-claude-after-installation)                                                                                 |
| `syntax error near unexpected token '<'`                                                                   | [Install script returns HTML](#install-script-returns-html-instead-of-a-shell-script)                                                         |
| `curl: (22) The requested URL returned error: 403`                                                         | [Install script returned 403](#install-script-returns-html-instead-of-a-shell-script)                                                         |
| `curl: (23)` or `curl: (56) Failure writing output to destination`                                         | [Check connectivity or use an alternative installer](#curl-56-failure-writing-output-to-destination)                                          |
| `Killed` during install on Linux, or `Installation was killed before it could finish (exit code 137)`      | [Free memory or add swap space](#install-killed-on-low-memory-linux-servers)                                                                  |
| `Raw mode is not supported` during install                                                                 | [Rerun the installer](#raw-mode-is-not-supported-during-install)                                                                              |
| `TLS connect error` or `SSL/TLS secure channel`                                                            | [Update CA certificates](#tls-or-ssl-connection-errors)                                                                                       |
| `Failed to fetch version` or can't reach download server                                                   | [Check network and proxy settings](#check-network-connectivity)                                                                               |
| `irm is not recognized` or `&& is not valid`                                                               | [Use the right command for your shell](#wrong-install-command-on-windows)                                                                     |
| `Cask 'claude-code' is unavailable: No Cask with this name exists`                                         | [Update Homebrew](#homebrew-cask-unavailable-or-outdated)                                                                                     |
| `'bash' is not recognized as the name of a cmdlet`                                                         | [Use the Windows installer command](#wrong-install-command-on-windows)                                                                        |
| `A parameter cannot be found that matches parameter name 'fsSL'`                                           | [Use the Windows installer command](#wrong-install-command-on-windows)                                                                        |
| `Claude Code on Windows requires either Git for Windows (for bash) or PowerShell`                          | [Install a shell](#claude-code-on-windows-requires-either-git-for-windows-for-bash-or-powershell)                                             |
| `Claude Code does not support 32-bit Windows`                                                              | [Open Windows PowerShell, not the x86 entry](#claude-code-does-not-support-32-bit-windows)                                                    |
| `The process cannot access the file ... because it is being used by another process`                       | [Clear the downloads folder and retry](#the-process-cannot-access-the-file-during-windows-install)                                            |
| `Error loading shared library`                                                                             | [Wrong binary variant for your system](#linux-musl-or-glibc-binary-mismatch)                                                                  |
| `Illegal instruction`                                                                                      | [Architecture or CPU instruction set mismatch](#illegal-instruction)                                                                          |
| `cannot execute binary file: Exec format error` in WSL                                                     | [WSL1 native-binary regression](#exec-format-error-on-wsl1)                                                                                   |
| PowerShell installer completes but `claude` is not found or shows an old version                           | [Add the install directory to your PATH](#verify-your-path), then open a new terminal                                                         |
| `dyld: Symbol not found`, `dyld: cannot load`, or `Abort trap` on macOS                                    | [Binary incompatibility](#dyld-cannot-load-on-macos)                                                                                          |
| `claude update` hangs after `Checking for updates`, or `claude doctor` hangs with no output                | [Move the directory at a shell config path](#claude-update-or-claude-doctor-hangs)                                                            |
| `Invoke-Expression` or `iex` parse errors quoting HTML tags or CSS, or `ParserError` with `ParseException` | [Install script returns HTML](#install-script-returns-html-instead-of-a-shell-script)                                                         |
| `running scripts is disabled on this system` or `PSSecurityException`                                      | [Allow the npm shims to run](#running-scripts-is-disabled-on-this-system)                                                                     |
| `Error: claude native binary not installed`                                                                | [Complete the npm install](#native-binary-not-found-after-npm-install)                                                                        |
| `npm error code ENOTEMPTY` during update or reinstall                                                      | [Remove the leftover package directory](#npm-enotempty-during-update-or-reinstall)                                                            |
| On Windows, the install command prints script text and nothing installs                                    | [Run the complete install command](#wrong-install-command-on-windows)                                                                         |
| `App unavailable in region`                                                                                | Claude Code is not available in your country. See [supported countries](https://www.anthropic.com/supported-countries).                       |
| `unable to get local issuer certificate`                                                                   | [Configure corporate CA certificates](#tls-or-ssl-connection-errors)                                                                          |
| `OAuth error` or `403 Forbidden`                                                                           | [Fix authentication](#login-and-authentication)                                                                                               |
| `Unable to connect to Anthropic services` during setup                                                     | See [Unable to connect to Anthropic services](https://code.claude.com/docs/en/errors#unable-to-connect-to-anthropic-services) in the Error reference                      |
| `Could not load the default credentials` or `Could not load credentials from any providers`                | [Amazon Bedrock, Google Cloud's Agent Platform, or Microsoft Foundry credentials](#bedrock-agent-platform-or-foundry-credentials-not-loading) |
| `ChainedTokenCredential authentication failed` or `CredentialUnavailableError`                             | [Amazon Bedrock, Google Cloud's Agent Platform, or Microsoft Foundry credentials](#bedrock-agent-platform-or-foundry-credentials-not-loading) |
| `API Error: 500`, `529 Overloaded`, `429`, or other 4xx and 5xx errors not listed above                    | See the [Error reference](https://code.claude.com/docs/en/errors)                                                                                                         |

If your issue isn't listed, work through the diagnostic checks below to narrow down the cause.

  If you'd rather skip the terminal entirely, the [Claude Code Desktop app](https://code.claude.com/docs/en/desktop-quickstart) lets you install and use Claude Code through a graphical interface. Download it for [macOS](https://claude.ai/api/desktop/darwin/universal/dmg/latest/redirect?utm_source=claude_code\&utm_medium=docs) or [Windows](https://claude.com/download?utm_source=claude_code\&utm_medium=docs) and start coding without any command-line setup. On Linux, install the app with apt by following the [Linux install instructions](https://code.claude.com/docs/en/desktop-linux).
