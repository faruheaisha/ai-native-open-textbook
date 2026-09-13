---
title: "Installing with pipx"
sourceId: "07-coding/spec-kit"
sourceTitle: "Spec Kit（GitHub 官方规格驱动开发工具包）"
sourceKind: "产品仓库"
licenseLabel: "可转载"
lang: "英文"
tier: 2
volume: "07-coding"
sourceUrl: "https://github.com/github/spec-kit"
entryUrl: "https://github.com/github/spec-kit/blob/c173bf19a6654e3b05386ec3599349a55282b897/README.md"
zh: ""
---

# Installing with pipx

[pipx](https://pipx.pypa.io/) is a tool for installing Python CLI applications in isolated environments. It does not require [uv](https://docs.astral.sh/uv/).

## Install Specify CLI

Pin a specific release tag for stability (check [Releases](https://github.com/github/spec-kit/releases) for the latest):

```bash
# Install a specific stable release (recommended — replace vX.Y.Z with the
# latest tag, keeping the leading v, e.g. v0.12.11 not 0.12.11)
pipx install git+https://github.com/github/spec-kit.git@vX.Y.Z

# Or install latest from main (may include unreleased changes)
pipx install git+https://github.com/github/spec-kit.git
```

## Verify

```bash
specify version
```

## Upgrade

```bash
pipx install --force git+https://github.com/github/spec-kit.git@vX.Y.Z
```

## Uninstall

```bash
pipx uninstall specify-cli
```

## Next steps

Head to the [Quick Start](https://github.com/github/spec-kit/blob/c173bf19a6654e3b05386ec3599349a55282b897/docs/quickstart.md) to initialize your first project.
