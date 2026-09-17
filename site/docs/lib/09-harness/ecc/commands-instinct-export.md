---
title: "Instinct Export Command"
sourceId: "09-harness/ecc"
sourceTitle: "ECC —— Harness 性能优化系统"
sourceKind: "其他材料"
licenseLabel: "可转载"
lang: "英文"
tier: 3
volume: "09-harness"
sourceUrl: "https://github.com/affaan-m/ECC"
entryUrl: "https://github.com/affaan-m/ECC/blob/928c1dea72f5c330442fc1f595563398b8f389f7/commands/instinct-export.md"
sourceRel: "commands/instinct-export.md"
rawUrl: "/raw/09-harness/ecc/commands/instinct-export.md"
sourceSha256: "cd2052ae1b9c49f75ad81aae6e236be959cc6656d32e3b8f3e6e13d2d3bd2d3c"
pageSha256: "cd2052ae1b9c49f75ad81aae6e236be959cc6656d32e3b8f3e6e13d2d3bd2d3c"
contentMode: "local-full"
zh: ""
---

# Instinct Export Command

Exports instincts to a shareable format. Perfect for:
- Sharing with teammates
- Transferring to a new machine
- Contributing to project conventions

## Usage

```
/instinct-export                           # Export all personal instincts
/instinct-export --domain testing          # Export only testing instincts
/instinct-export --min-confidence 0.7      # Only export high-confidence instincts
/instinct-export --output team-instincts.yaml
/instinct-export --scope project --output project-instincts.yaml
```

## What to Do

1. Detect current project context
2. Load instincts by selected scope:
   - `project`: current project only
   - `global`: global only
   - `all`: project + global merged (default)
3. Apply filters (`--domain`, `--min-confidence`)
4. Write YAML-style export to file (or stdout if no output path provided)

## Output Format

Creates a YAML file:

```yaml
# Instincts Export
# Generated: 2025-01-22
# Source: personal
# Count: 12 instincts

---
id: prefer-functional-style
trigger: "when writing new functions"
confidence: 0.8
domain: code-style
source: session-observation
scope: project
project_id: a1b2c3d4e5f6
project_name: my-app
---

# Prefer Functional Style

## Action
Use functional patterns over classes.
```

## Flags

- `--domain <name>`: Export only specified domain
- `--min-confidence <n>`: Minimum confidence threshold
- `--output <file>`: Output file path (prints to stdout when omitted)
- `--scope <project|global|all>`: Export scope (default: `all`)
