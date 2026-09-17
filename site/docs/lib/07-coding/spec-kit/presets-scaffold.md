---
title: "My Preset"
sourceId: "07-coding/spec-kit"
sourceTitle: "Spec Kit（GitHub 官方规格驱动开发工具包）"
sourceKind: "产品仓库"
licenseLabel: "可转载"
lang: "英文"
tier: 2
volume: "07-coding"
sourceUrl: "https://github.com/github/spec-kit"
entryUrl: "https://github.com/github/spec-kit/blob/c173bf19a6654e3b05386ec3599349a55282b897/presets/scaffold/README.md"
sourceRel: "presets/scaffold/README.md"
rawUrl: "/raw/07-coding/spec-kit/presets/scaffold/README.md"
sourceSha256: "0f0cb095a73721b928f5b80be1653c4ec172ceb32589ccc83f6099c0d5c11574"
pageSha256: "0f0cb095a73721b928f5b80be1653c4ec172ceb32589ccc83f6099c0d5c11574"
contentMode: "local-full"
zh: ""
---

# My Preset

A custom preset for Spec Kit. Copy this directory and customize it to create your own.

## Templates Included

| Template | Type | Description |
|----------|------|-------------|
| `spec-template` | template | Custom feature specification template (overrides core and extensions) |
| `myext-template` | template | Override of the myext extension's report template |
| `speckit.specify` | command | Custom specification command (overrides core) |
| `speckit.myext.myextcmd` | command | Override of the myext extension's myextcmd command |

## Development

1. Copy this directory: `cp -r presets/scaffold my-preset`
2. Edit `preset.yml` — set your preset's ID, name, description, and templates
3. Add or modify templates in `templates/`
4. Test locally: `specify preset add --dev ./my-preset`
5. Verify resolution: `specify preset resolve spec-template`
6. Remove when done testing: `specify preset remove my-preset`

## Manifest Reference (`preset.yml`)

Required fields:
- `schema_version` — always `"1.0"`
- `preset.id` — lowercase alphanumeric with hyphens
- `preset.name` — human-readable name
- `preset.version` — semantic version (e.g. `1.0.0`)
- `preset.description` — brief description
- `requires.speckit_version` — version constraint (e.g. `>=0.1.0`)
- `provides.templates` — list of templates with `type`, `name`, and `file`

## Template Types

- **template** — Document scaffolds (spec-template.md, plan-template.md, tasks-template.md, etc.)
- **command** — AI agent workflow prompts (e.g. speckit.specify, speckit.plan)
- **script** — Custom scripts (reserved for future use)

## Publishing

See the [Preset Publishing Guide](/lib/07-coding/spec-kit/presets-PUBLISHING) for details on submitting to the catalog.
