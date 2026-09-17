---
title: "Anthropic 平台文档（英文全量）"
sourceId: "01-foundations/anthropic-platform-docs-en"
sourceTitle: "Anthropic 平台文档（英文全量）"
sourceKind: "官方文档"
licenseLabel: "仅引用"
lang: "英文"
tier: 3
volume: "01-foundations"
sourceUrl: "https://platform.claude.com/docs"
entryUrl: "https://platform.claude.com/docs"
sourceRel: "docs/en/cli-sdks-libraries/cli/quickstart.md"
rawUrl: "/raw/01-foundations/anthropic-platform-docs-en/docs/en/cli-sdks-libraries/cli/quickstart.md"
sourceSha256: "f0fe6e6518dd197ca413412ba1e641d6a9ccad40eb79fdc8886b0dab2cbae2b1"
pageSha256: "f0fe6e6518dd197ca413412ba1e641d6a9ccad40eb79fdc8886b0dab2cbae2b1"
contentMode: "local-full"
zh: ""
---

# Anthropic 平台文档（英文全量）

The `ant` CLI provides access to the Claude API from your terminal. Every API resource is exposed as a subcommand, with output formatting, response filtering, and YAML or JSON file input.

Compared to `curl`, `ant` builds request bodies from typed flags or piped YAML instead of hand-written JSON, and inlines file contents into string fields with an `@path` reference. It extracts response fields with a built-in `--transform` query, so you don't need a separate tool such as `jq`, and it paginates list endpoints automatically.

  For endpoint-specific parameters and response schemas, see the [API reference](https://platform.claude.com/docs/en/api/cli/messages/create). This page gets you to a working command. For everything else the CLI does, see [Using the CLI](https://platform.claude.com/docs/en/cli-sdks-libraries/cli/using) and [CLI scripting and automation](https://platform.claude.com/docs/en/cli-sdks-libraries/cli/scripting).

## Installation

    ```bash
    brew install anthropics/tap/ant
    ```

    For Linux environments, download the release binary directly.

    ```bash
    VERSION=1.30.0
    OS=$(uname -s | tr '[:upper:]' '[:lower:]')
    case $(uname -m) in
      x86_64) ARCH=amd64 ;;
      aarch64) ARCH=arm64 ;;
    esac
    curl -fsSL "https://github.com/anthropics/anthropic-cli/releases/download/v${VERSION}/ant_${VERSION\}_${OS}_${ARCH\}.tar.gz" \
      | sudo tar -xz -C /usr/local/bin ant
    ```

    You can find all releases on the [GitHub releases page](https://github.com/anthropics/anthropic-cli/releases).

    You can also install the CLI from source using `go install`. Requires Go 1.25 or later.

    ```bash
    go install github.com/anthropics/anthropic-cli/cmd/ant@latest
    ```

    The binary is placed in `$(go env GOPATH)/bin`. Add it to your `PATH` if it isn't already:

    ```bash
    export PATH="$PATH:$(go env GOPATH)/bin"
    ```

Check the installation:

```bash
ant --version
```

## Authentication

`ant auth login` opens a browser-based OAuth flow against the Claude Console and stores the resulting credentials locally, so you can call the API without creating or managing an API key.

```bash CLI
ant auth login
```

  For other ways to authenticate (API key environment variable, headless hosts, multiple workspaces, named profiles, and Workload Identity Federation), see [CLI authentication options](https://platform.claude.com/docs/en/cli-sdks-libraries/cli/authentication).

## Send your first request

With the binary installed and authenticated, call the [Messages API](https://platform.claude.com/docs/en/api/cli/messages/create):

```bash
ant messages create \
  --model claude-opus-5 \
  --max-tokens 1024 \
  --message '{role: user, content: "Hello, Claude"}'
```

```text Output wrap
{
  "model": "claude-opus-5",
  "id": "msg_01YMmR5XodC5nTqMxLZMKaq6",
  "type": "message",
  "role": "assistant",
  "content": [
    {
      "type": "text",
      "text": "Hello! How are you doing today? Is there something I can help you with?"
    }
  ],
  "stop_reason": "end_turn",
  "usage": { "input_tokens": 27, "output_tokens": 20 /*, ... */ }
}
```

The response is the full API object, pretty-printed because stdout is a terminal.

## Shell completion

The CLI ships completion scripts for bash, zsh, fish, and PowerShell. Generate and install one for your shell:

    ```bash
    ant @completion zsh > "${fpath[1]}/_ant"
    # Restart your shell or run: autoload -U compinit && compinit
    ```

    ```bash
    ant @completion bash > /etc/bash_completion.d/ant
    ```

    ```bash
    ant @completion fish > ~/.config/fish/completions/ant.fish
    ```

    ```powershell
    ant @completion powershell | Out-String | Invoke-Expression
    # To persist across sessions:
    # ant @completion powershell >> $PROFILE
    ```

## Next steps

    API keys, headless hosts, multiple workspaces, and named profiles

    Command structure, output formats, GJSON transforms, and request bodies

    Version-control API resources, scripting patterns, and use from Claude Code
