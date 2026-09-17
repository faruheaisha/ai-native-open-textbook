---
title: "Repo Tokens"
sourceId: "07-coding/fufan-vibe-coding-course"
sourceTitle: "Vibe Coding：AI 编程实战课"
sourceKind: "系统课程"
licenseLabel: "可转载"
lang: "中英混排"
tier: 1
volume: "07-coding"
sourceUrl: "https://github.com/fufankeji/FuFan-VibeCodingCourse"
entryUrl: "https://github.com/fufankeji/FuFan-VibeCodingCourse/blob/5336ede159a7ac2ce0ee136324fe5bffd56970ca/Stage7_Superpowers_Applied/Lesson12_Superpowers_Getting_Started/nanoclaw-v2-backend/repo-tokens/README.md"
sourceRel: "Stage7_Superpowers_Applied/Lesson12_Superpowers_Getting_Started/nanoclaw-v2-backend/repo-tokens/README.md"
rawUrl: "/raw/07-coding/fufan-vibe-coding-course/Stage7_Superpowers_Applied/Lesson12_Superpowers_Getting_Started/nanoclaw-v2-backend/repo-tokens/README.md"
sourceSha256: "68c36dda2c231c8dbc1278fb1c3e4653900612893fb108528da43379b44cbdf0"
pageSha256: "68c36dda2c231c8dbc1278fb1c3e4653900612893fb108528da43379b44cbdf0"
contentMode: "local-full"
zh: ""
---

# Repo Tokens

A GitHub Action that calculates the size of your codebase in terms of tokens and updates a badge in your README.

<p>
  <img src="/mirror/5e/5ed3708cdbbe16ae6dd1b2aefd8487c9caa17b30.svg" alt="tokens 12.4k">&nbsp;
  <img src="/mirror/c6/c64b8811ac556f7b673ee230ccbbf6570888e5f5.svg" alt="tokens 74.8k">&nbsp;
  <img src="/mirror/57/5719d4f75c9bcc0a101d0cd051b274f471a7c757.svg" alt="tokens 120k">&nbsp;
  <img src="/mirror/3c/3cef438a208eaa23f95ce25e45e8bf99e4890757.svg" alt="tokens 158k">
</p>

## Usage

```yaml
- uses: qwibitai/nanoclaw/repo-tokens@v1
  with:
    include: 'src/**/*.ts'
    exclude: 'src/**/*.test.ts'
```

This counts tokens using [tiktoken](https://github.com/openai/tiktoken) and writes the result between HTML comment markers in your README:

The badge color reflects what percentage of an LLMs context window the codebase fills (context window size is configurable, defaults to 200k which is the size of Claude Opus). Green for under 30%, yellow-green for 30%-50%, yellow for 50%-70%, red for 70%+.

## Why

Small codebases were always a good thing. With coding agents, there's now a huge advantage to having a codebase small enough that an agent can hold the full thing in context.

This badge gives some indication of how easy it will be to work with an agent on the codebase, and will hopefully be a visual reminder to avoid bloat.

## Examples

Repos using repo-tokens:

| Repo | Badge |
|------|-------|
| [NanoClaw](https://github.com/qwibitai/NanoClaw) | ![tokens](/mirror/13/131eb986f92cce251a43caefad57e2323e280d7a.svg) |

### Full workflow example

```yaml
name: Update token count

on:
  push:
    branches: [main]
    paths: ['src/**']

permissions:
  contents: write

jobs:
  update-tokens:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4

      - uses: actions/setup-python@v5
        with:
          python-version: '3.12'

      - uses: qwibitai/nanoclaw/repo-tokens@v1
        id: tokens
        with:
          include: 'src/**/*.ts'
          exclude: 'src/**/*.test.ts'
          badge-path: '.github/badges/tokens.svg'

      - name: Commit if changed
        run: |
          git add README.md .github/badges/tokens.svg
          git diff --cached --quiet && exit 0
          git config user.name "github-actions[bot]"
          git config user.email "github-actions[bot]@users.noreply.github.com"
          git commit -m "docs: update token count to ${{ steps.tokens.outputs.badge }}"
          git push
```

### README setup

Add markers where you want the token count text to appear:

```html

```

The action replaces everything between the markers with the token count.

## Inputs

| Input | Default | Description |
|-------|---------|-------------|
| `include` | *required* | Glob patterns for files to count (space-separated) |
| `exclude` | `''` | Glob patterns to exclude (space-separated) |
| `context-window` | `200000` | Context window size for percentage calculation |
| `readme` | `README.md` | Path to README file |
| `encoding` | `cl100k_base` | Tiktoken encoding name |
| `marker` | `token-count` | HTML comment marker name |
| `badge-path` | `''` | Path to write SVG badge (empty = no SVG) |

## Outputs

| Output | Description |
|--------|-------------|
| `tokens` | Total token count (e.g., `34940`) |
| `percentage` | Percentage of context window (e.g., `17`) |
| `badge` | The formatted text that was inserted (e.g., `34.9k tokens · 17% of context window`) |

## How it works

Composite GitHub Action. Installs tiktoken, runs ~60 lines of inline Python. Takes about 10 seconds.

The action counts tokens and updates the README but does not commit. Your workflow decides the git strategy.
