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
pageSha256: "4a69f12dbd33214e0e2737ea681234c69585b23e52d4ec3d2a3e3b1f02dbb670"
contentMode: "local-full"
zh: ""
---

## Login and authentication

These sections address login failures, OAuth errors, and token issues.

### Reset your login

When login fails and the cause isn't obvious, a clean re-authentication resolves most cases:

1. Run `/logout` to sign out completely
2. Close Claude Code
3. Restart with `claude` and complete the authentication process again

If the browser doesn't open automatically during login, press `c` to copy the OAuth URL to your clipboard, then paste it into a browser manually. This also works when the URL wraps across lines in a narrow or SSH terminal and can't be clicked directly.

### OAuth error: Invalid code

If you see `OAuth error: Invalid code. Please make sure the full code was copied`, the login code expired or was truncated during copy-paste.

**Solutions:**

* Press Enter to retry and complete the login quickly after the browser opens
* Type `c` to copy the full URL if the browser doesn't open automatically
* If using a remote/SSH session, the browser may open on the wrong machine. Copy the URL displayed in the terminal and open it in your local browser instead.

### 403 Forbidden after login

If you see <code v-pre>API Error: 403 \{"error":\{"type":"forbidden","message":"Request not allowed"}}</code> after logging in:

* **Claude Pro/Max users**: verify your subscription is active at [claude.ai/settings](https://claude.ai/settings)
* **Anthropic Console users**: confirm your account has the "Claude Code" or "Developer" role. Admins assign this in the Anthropic Console under Settings → Members.
* **Behind a proxy**: corporate proxies can interfere with API requests. See [network configuration](https://code.claude.com/docs/en/network-config) for proxy setup.

### This organization has been disabled with an active subscription

If you see `API Error: 400 ... "This organization has been disabled"` despite having an active Claude subscription, an `ANTHROPIC_API_KEY` environment variable is overriding your subscription. This commonly happens when an old API key from a previous employer or project is still set in your shell profile.

When `ANTHROPIC_API_KEY` is present and you have approved it, Claude Code uses that key instead of your subscription's OAuth credentials. In non-interactive mode with the `-p` flag, the key is always used when present. See [authentication precedence](https://code.claude.com/docs/en/authentication#authentication-precedence) for the full resolution order.

To use your subscription instead, unset the environment variable and remove it from your shell profile:

    ```bash theme=\{null\}
    unset ANTHROPIC_API_KEY
    claude
    ```

    ```powershell theme=\{null\}
    Remove-Item Env:ANTHROPIC_API_KEY
    claude
    ```

Check `~/.zshrc`, `~/.bashrc`, or `~/.profile` for `export ANTHROPIC_API_KEY=...` lines and remove them to make the change permanent. On Windows, check your PowerShell profile at `$PROFILE` and your User environment variables for `ANTHROPIC_API_KEY`. Run `/status` inside Claude Code to confirm which authentication method is active.

### OAuth login fails in WSL2, SSH, or containers

When Claude Code runs in WSL2, on a remote machine over SSH, or inside a container, the browser usually opens on a different host and its redirect can't reach Claude Code's local callback server. After you sign in, the browser shows a login code instead of redirecting back automatically. Paste that code into the terminal at the `Paste code here if prompted` prompt to complete login.

If the browser doesn't open at all from WSL2, set the `BROWSER` environment variable to your Windows browser path:

```bash theme={null}
export BROWSER="/mnt/c/Program Files/Google/Chrome/Application/chrome.exe"
claude
```

Alternatively, press `c` at the interactive login prompt to copy the OAuth URL, or copy the URL that `claude auth login` prints, and open it in a browser on your local machine.

If pasting the code into the interactive prompt does nothing, your terminal's paste binding likely isn't reaching the input field. Try your terminal's alternate paste shortcut, often right-click or Shift+Insert in Windows Terminal, or use `claude auth login` instead, which reads the pasted code from standard input:

```bash theme={null}
claude auth login
```

This fallback also applies on native Windows or any terminal where pasting into the interactive prompt fails.

### Not logged in or token expired

If Claude Code prompts you to log in again after a session, your OAuth token may have expired.

Run `/login` to re-authenticate. If this happens frequently, check that your system clock is accurate, as token validation depends on correct timestamps.

Parallel sessions on one machine share a saved login and coordinate its renewal so that only one process refreshes the token at a time. Before v2.1.211, waking the machine from sleep could cause two sessions to renew with the same token, which revoked the saved login and prompted every open session to log in again at once.

On macOS, Claude Code saves credentials to the login Keychain. When the Keychain rejects the write, such as when it's locked in an SSH session or its password is out of sync with your account password, Claude Code saves your login to the plaintext `~/.claude/.credentials.json` file instead. A Console login that creates an API key fails until the Keychain is writable again.

To make the Keychain writable again and move your login back into the encrypted Keychain:

    Run `claude doctor` to check Keychain access. When the Keychain rejects writes, the report lists a warning that starts with `macOS Keychain is not writable`, followed by a suggested fix. When the report lists no Keychain warning, the Keychain is writable and you can skip to the last step.

    ```bash theme=\{null\}
    security unlock-keychain ~/Library/Keychains/login.keychain-db
    ```

    Enter your Keychain password when the command asks for it, then run `claude doctor` again. When the unlock worked, the report no longer lists the Keychain warning.

    Open Keychain Access, select the `login` keychain, and choose **Edit > Change Password for Keychain "login"** to resync it with your account password. Then run `claude doctor` again. Go on to the next step once the report no longer lists the Keychain warning.

    Once the Keychain is writable again, Claude Code moves the credentials back the next time it writes a credential. To force it now, run `/logout` and then `/login`. Logging out removes all stored credentials, including the plaintext file's contents, saved MCP server logins, and plugin sensitive values, so expect to re-authorize MCP servers and re-enter plugin secrets afterwards. Logging in again stores your login in the Keychain.

### Bedrock, Agent Platform, or Foundry credentials not loading

If you configured Claude Code to use a cloud provider and see `Could not load credentials from any providers` on Amazon Bedrock, `Could not load the default credentials` on Google Cloud's Agent Platform, or `ChainedTokenCredential authentication failed` on Microsoft Foundry, your cloud provider CLI is likely not authenticated in the current shell.

For Amazon Bedrock, confirm your AWS credentials are valid:

```bash theme={null}
aws sts get-caller-identity
```

For Google Cloud's Agent Platform, confirm `ANTHROPIC_VERTEX_PROJECT_ID` and `CLOUD_ML_REGION` are set in your shell, then set application default credentials:

```bash theme={null}
gcloud auth application-default login
```

For Microsoft Foundry, confirm `ANTHROPIC_FOUNDRY_API_KEY` is set, or sign in with the Azure CLI so the default credential chain can find your account:

```bash theme={null}
az login
```

If credentials work in your terminal but not in the VS Code or JetBrains extension, the IDE process likely didn't inherit your shell environment. Set the provider environment variables in the IDE's own settings, or launch the IDE from a terminal where they're already exported.

See [Amazon Bedrock](https://code.claude.com/docs/en/amazon-bedrock), [Google Cloud's Agent Platform](https://code.claude.com/docs/en/google-vertex-ai), or [Microsoft Foundry](https://code.claude.com/docs/en/microsoft-foundry) for full provider setup.
