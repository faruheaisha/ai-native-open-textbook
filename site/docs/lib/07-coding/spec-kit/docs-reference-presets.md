---
title: "Presets"
sourceId: "07-coding/spec-kit"
sourceTitle: "Spec Kit（GitHub 官方规格驱动开发工具包）"
sourceKind: "产品仓库"
licenseLabel: "可转载"
lang: "英文"
tier: 2
volume: "07-coding"
sourceUrl: "https://github.com/github/spec-kit"
entryUrl: "https://github.com/github/spec-kit/blob/c173bf19a6654e3b05386ec3599349a55282b897/docs/reference/presets.md"
sourceRel: "docs/reference/presets.md"
rawUrl: "/raw/07-coding/spec-kit/docs/reference/presets.md"
sourceSha256: "001a47826fd2bf88b09aef39581a6b45845b9cade8770683df753282c842983f"
pageSha256: "001a47826fd2bf88b09aef39581a6b45845b9cade8770683df753282c842983f"
contentMode: "local-full"
zh: ""
---

# Presets

Presets customize how Spec Kit works — overriding templates, commands, and terminology without changing any tooling. They let you enforce organizational standards, adapt the workflow to your methodology, or localize the entire experience. Multiple presets can be stacked with priority ordering.

## Search Available Presets

```bash
specify preset search [query]
```

| Option     | Description          |
| ---------- | -------------------- |
| `--tag`    | Filter by tag        |
| `--author` | Filter by author     |

Searches all active catalogs for presets matching the query. Without a query, lists all available presets.

## Install a Preset

```bash
specify preset add [<preset_id>]
```

| Option           | Description                                              |
| ---------------- | -------------------------------------------------------- |
| `--dev <path>`   | Install from a local directory (for development)         |
| `--from <url>`   | Install from a custom URL instead of the catalog         |
| `--priority <N>` | Resolution priority (default: 10; lower = higher precedence) |

Installs a preset from the catalog, a URL, or a local directory. Preset commands are automatically registered with the currently installed AI coding agent integration.

> **Note:** All preset commands require a project already initialized with `specify init`.

## Remove a Preset

```bash
specify preset remove <preset_id>
```

Removes an installed preset and cleans up its registered commands.

## List Installed Presets

```bash
specify preset list
specify preset list --json
```

Lists installed presets with their versions, descriptions, template counts, and current status.

`--json` writes a JSON array to stdout. Every item has the keys `id`, `name`,
`description`, `version`, `author`, `priority`, `enabled`, `source`, and
`provides`. `author` is `null` when absent; `source` is `\{"kind":"local"\}`
for local, legacy, or malformed provenance, or
