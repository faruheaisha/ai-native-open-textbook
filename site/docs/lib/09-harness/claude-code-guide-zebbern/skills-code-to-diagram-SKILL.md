---
title: "Code to Diagram"
sourceId: "09-harness/claude-code-guide-zebbern"
sourceTitle: "Claude Code Guide（zebbern）"
sourceKind: "工程手册"
licenseLabel: "可转载"
lang: "英文"
tier: 3
volume: "09-harness"
sourceUrl: "https://github.com/zebbern/claude-code-guide"
entryUrl: "https://github.com/zebbern/claude-code-guide/blob/64c890fe74c3ccfad673dc9c71dc85b8dd2f4817/skills/code-to-diagram/SKILL.md"
sourceRel: "skills/code-to-diagram/SKILL.md"
rawUrl: "/raw/09-harness/claude-code-guide-zebbern/skills/code-to-diagram/SKILL.md"
sourceSha256: "82de1fa7245660316d2683b140b79dedc32f130c286b9beb69bacda814f95f40"
pageSha256: "82de1fa7245660316d2683b140b79dedc32f130c286b9beb69bacda814f95f40"
contentMode: "local-full"
zh: ""
---

# Code to Diagram

Extract import and dependency relationships from a codebase via AST parsing, and automatically generate three types of diagrams:

1. **Architecture Diagram** — Module/directory-level dependency relationships
2. **Flowchart** — File-level import call chains
3. **Org Chart** — Directory/file hierarchy structure

Supported languages: Python, JavaScript, TypeScript, Go, Java

Output formats: Mermaid text (`.mmd`) or SVG images (requires `mmdc` installed on the system)

## Usage

### Basic: Analyze an Entire Project

```bash
python3 scripts/analyze_codebase.py /path/to/project
```

Outputs three Mermaid diagrams to stdout and writes `.mmd` files to the current directory.

### Specify Diagram Type

```bash
# Architecture diagram only
python3 scripts/analyze_codebase.py /path/to/project --type architecture

# Flowchart only
python3 scripts/analyze_codebase.py /path/to/project --type flowchart

# Org chart only
python3 scripts/analyze_codebase.py /path/to/project --type org
```

### Specify Output Directory and Format

```bash
# Output to a specific directory
python3 scripts/analyze_codebase.py /path/to/project --output /tmp/diagrams

# Output as SVG (requires mmdc)
python3 scripts/analyze_codebase.py /path/to/project --format svg

# Output both Mermaid and SVG
python3 scripts/analyze_codebase.py /path/to/project --format both
```

### Output JSON Analysis Results

```bash
python3 scripts/analyze_codebase.py /path/to/project --json
```

### Parameters

| Parameter | Description |
|-----------|-------------|
| `directory` | Code directory to analyze (required) |
| `--type, -t` | Diagram type: `architecture`, `flowchart`, `org`, `all` (default: `all`) |
| `--output, -o` | Output directory (default: current directory) |
| `--format, -f` | Output format: `mermaid`, `svg`, `both` (default: `mermaid`) |
| `--max-files` | Maximum number of files to scan (default: 500) |
| `--max-depth` | Maximum depth for org chart (default: 4) |
| `--json` | Output analysis results in JSON format |

## How It Works

1. **Scan phase**: Recursively traverse the directory, skipping `node_modules`, `.git`, `__pycache__`, etc.
2. **Parse phase**:
   - Python files: uses the `ast` module to parse `import` and `from ... import` statements
   - JS/TS files: uses regex to match `import`, `require`, and `export from`
   - Go files: uses regex to match `import` statements
   - Java files: uses regex to match `import` statements
3. **Resolve internal dependencies**: Maps import paths to actual files within the project
4. **Generate diagrams**: Converts dependency relationships into Mermaid diagram syntax
5. **Render (optional)**: Calls `mmdc` (Mermaid CLI) to render `.mmd` files as SVG

## Use Cases

- Quickly understand the module structure of an unfamiliar project
- Visualize dependencies during code review
- Create architecture diagrams for technical documentation
- Detect circular dependencies or excessive coupling
- Analyze project structure before refactoring

## Dependencies

- Python 3.7+ (standard library only, no extra packages needed)
- SVG output requires `@mermaid-js/mermaid-cli` (optional)

## Notes

- Only analyzes static import relationships; dynamic imports are not tracked
- For large projects, use `--max-files` to limit the scan scope
- Mermaid diagrams with too many nodes may be hard to render; use `--type` to generate diagrams separately
