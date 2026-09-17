---
title: "One-time Usage (uvx)"
sourceId: "07-coding/spec-kit"
sourceTitle: "Spec Kit（GitHub 官方规格驱动开发工具包）"
sourceKind: "产品仓库"
licenseLabel: "可转载"
lang: "英文"
tier: 2
volume: "07-coding"
sourceUrl: "https://github.com/github/spec-kit"
entryUrl: "https://github.com/github/spec-kit/blob/c173bf19a6654e3b05386ec3599349a55282b897/docs/install/one-time.md"
sourceRel: "docs/install/one-time.md"
rawUrl: "/raw/07-coding/spec-kit/docs/install/one-time.md"
sourceSha256: "1a128e9fdb0d75be4bc9b48740c68f3eb3729385f92f71237b52ad5864f3a660"
pageSha256: "1a128e9fdb0d75be4bc9b48740c68f3eb3729385f92f71237b52ad5864f3a660"
contentMode: "local-full"
zh: ""
---

# One-time Usage (uvx)

If you want to try Spec Kit without installing it permanently, use `uvx` to run it directly. This downloads the tool into a temporary environment that is discarded after the command finishes.

> [!NOTE]
> The commands below require **[uv](https://docs.astral.sh/uv/)**. If you see `command not found: uvx`, [install uv first](/lib/07-coding/spec-kit/docs-install-uv).

## Run Specify CLI

```bash
# Create a new project (latest from main)
uvx --from git+https://github.com/github/spec-kit.git specify init <PROJECT_NAME>

# Or target a specific release (replace vX.Y.Z with a tag from Releases;
# keep the leading v, e.g. v0.12.11 not 0.12.11)
uvx --from git+https://github.com/github/spec-kit.git@vX.Y.Z specify init <PROJECT_NAME>

# Initialize in the current directory
uvx --from git+https://github.com/github/spec-kit.git specify init . --integration copilot

# Or use the --here flag
uvx --from git+https://github.com/github/spec-kit.git specify init --here --integration copilot
```

## When to use persistent installation instead

If you plan to use Spec Kit regularly, a persistent installation is recommended:

- Tool stays installed and available in PATH
- No re-download on every invocation
- Better tool management with `uv tool list`, `uv tool upgrade`, `uv tool uninstall`

See the main [Installation Guide](/lib/07-coding/spec-kit/docs-installation) for persistent installation instructions.
