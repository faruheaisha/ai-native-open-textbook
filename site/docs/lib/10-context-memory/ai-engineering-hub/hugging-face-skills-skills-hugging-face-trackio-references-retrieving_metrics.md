---
title: "Retrieving Metrics with Trackio CLI"
sourceId: "10-context-memory/ai-engineering-hub"
sourceTitle: "AI Engineering Hub"
sourceKind: "其他材料"
licenseLabel: "可转载"
lang: "英文"
tier: 2
volume: "10-context-memory"
sourceUrl: "https://github.com/patchy631/ai-engineering-hub"
entryUrl: "https://github.com/patchy631/ai-engineering-hub/blob/2c9b106168d4540b88e727e4aa316c06c856c2b7/hugging-face-skills/skills/hugging-face-trackio/references/retrieving_metrics.md"
sourceRel: "hugging-face-skills/skills/hugging-face-trackio/references/retrieving_metrics.md"
rawUrl: "/raw/10-context-memory/ai-engineering-hub/hugging-face-skills/skills/hugging-face-trackio/references/retrieving_metrics.md"
sourceSha256: "9c7bc5e30cd09d29404e3cfa865d7a62b9bfaff919e7eec9ca007e0939773b69"
pageSha256: "9c7bc5e30cd09d29404e3cfa865d7a62b9bfaff919e7eec9ca007e0939773b69"
contentMode: "local-full"
zh: ""
---

# Retrieving Metrics with Trackio CLI

The `trackio` CLI provides direct terminal access to query Trackio experiment tracking data locally without needing to start the MCP server.

## Quick Command Reference

| Task | Command |
|------|---------|
| List projects | `trackio list projects` |
| List runs | `trackio list runs --project <name>` |
| List metrics | `trackio list metrics --project <name> --run <name>` |
| List system metrics | `trackio list system-metrics --project <name> --run <name>` |
| Get project summary | `trackio get project --project <name>` |
| Get run summary | `trackio get run --project <name> --run <name>` |
| Get metric values | `trackio get metric --project <name> --run <name> --metric <name>` |
| Get system metrics | `trackio get system-metric --project <name> --run <name>` |
| Show dashboard | `trackio show [--project <name>]` |
| Sync to Space | `trackio sync --project <name> --space-id <space_id>` |

## Core Commands

### List Commands

```bash
trackio list projects                                    # List all projects
trackio list projects --json                            # JSON output

trackio list runs --project &lt;name>                      # List runs in project
trackio list runs --project &lt;name> --json               # JSON output

trackio list metrics --project &lt;name> --run &lt;name>      # List metrics for run
trackio list metrics --project &lt;name> --run &lt;name> --json

trackio list system-metrics --project &lt;name> --run &lt;name>  # List system metrics
trackio list system-metrics --project &lt;name> --run &lt;name> --json
```

### Get Commands

```bash
trackio get project --project &lt;name>                    # Project summary
trackio get project --project &lt;name> --json             # JSON output

trackio get run --project &lt;name> --run &lt;name>           # Run summary
trackio get run --project &lt;name> --run &lt;name> --json

trackio get metric --project &lt;name> --run &lt;name> --metric &lt;name>  # Metric values
trackio get metric --project &lt;name> --run &lt;name> --metric &lt;name> --json

trackio get system-metric --project &lt;name> --run &lt;name>           # All system metrics
trackio get system-metric --project &lt;name> --run &lt;name> --metric &lt;name>  # Specific metric
trackio get system-metric --project &lt;name> --run &lt;name> --json
```

### Dashboard Commands

```bash
trackio show                                              # Launch dashboard
trackio show --project &lt;name>                           # Load specific project
trackio show --theme &lt;theme>                            # Custom theme
trackio show --mcp-server                                # Enable MCP server
trackio show --color-palette "#FF0000,#00FF00"         # Custom colors
```

### Sync Commands

```bash
trackio sync --project &lt;name> --space-id &lt;space_id>     # Sync to HF Space
trackio sync --project &lt;name> --space-id &lt;space_id> --private  # Private space
trackio sync --project &lt;name> --space-id &lt;space_id> --force   # Overwrite
```

## Output Formats

All `list` and `get` commands support two output formats:

- **Human-readable** (default): Formatted text for terminal viewing
- **JSON** (with `--json` flag): Structured JSON for programmatic use

## Common Patterns

### Discover Projects and Runs

```bash
# List all available projects
trackio list projects

# List runs in a project
trackio list runs --project my-project

# Get project overview
trackio get project --project my-project --json
```

### Inspect Run Details

```bash
# Get run summary with all metrics
trackio get run --project my-project --run my-run --json

# List available metrics
trackio list metrics --project my-project --run my-run

# Get specific metric values
trackio get metric --project my-project --run my-run --metric loss --json
```

### Query System Metrics

```bash
# List system metrics (GPU, etc.)
trackio list system-metrics --project my-project --run my-run

# Get all system metric data
trackio get system-metric --project my-project --run my-run --json

# Get specific system metric
trackio get system-metric --project my-project --run my-run --metric gpu_utilization --json
```

### Automation Scripts

```bash
# Extract latest metric value
LATEST_LOSS=$(trackio get metric --project my-project --run my-run --metric loss --json | jq -r '.values[-1].value')

# Export run summary to file
trackio get run --project my-project --run my-run --json > run_summary.json

# Filter runs with jq
trackio list runs --project my-project --json | jq '.runs[] | select(startswith("train"))'
```

### LLM Agent Workflow

```bash
# 1. Discover available projects
trackio list projects --json

# 2. Explore project structure
trackio get project --project my-project --json

# 3. Inspect specific run
trackio get run --project my-project --run my-run --json

# 4. Query metric values
trackio get metric --project my-project --run my-run --metric accuracy --json
```

## Error Handling

Commands validate inputs and return clear errors:

- Missing project: `Error: Project '<name>' not found.`
- Missing run: `Error: Run '<name>' not found in project '<project>'.`
- Missing metric: `Error: Metric '<name>' not found in run '<run>' of project '<project>'.`

All errors exit with non-zero status code and write to stderr.

## Key Options

- `--project`: Project name (required for most commands)
- `--run`: Run name (required for run-specific commands)
- `--metric`: Metric name (required for metric-specific commands)
- `--json`: Output in JSON format instead of human-readable
- `--theme`: Dashboard theme (for `show` command)
- `--mcp-server`: Enable MCP server mode (for `show` command)
- `--color-palette`: Comma-separated hex colors (for `show` command)
- `--private`: Create private Space (for `sync` command)
- `--force`: Overwrite existing database (for `sync` command)

## JSON Output Structure

### List Projects
```json
\{"projects": ["project1", "project2"]\}
```

### List Runs
```json
\{"project": "my-project", "runs": ["run1", "run2"]\}
```

### Project Summary
```json
\{
  "project": "my-project",
  "num_runs": 3,
  "runs": ["run1", "run2", "run3"],
  "last_activity": 100
\}
```

### Run Summary
```json
\{
  "project": "my-project",
  "run": "my-run",
  "num_logs": 50,
  "metrics": ["loss", "accuracy"],
  "config": \{"learning_rate": 0.001\},
  "last_step": 49
\}
```

### Metric Values
```json
\{
  "project": "my-project",
  "run": "my-run",
  "metric": "loss",
  "values": [
    \{"step": 0, "timestamp": "2024-01-01T00:00:00", "value": 0.5\},
    \{"step": 1, "timestamp": "2024-01-01T00:01:00", "value": 0.4\}
  ]
\}
```

## References

- **Complete CLI documentation**: See [docs/source/cli_commands.md](https://github.com/patchy631/ai-engineering-hub/blob/2c9b106168d4540b88e727e4aa316c06c856c2b7/hugging-face-skills/skills/hugging-face-trackio/references/docs/source/cli_commands.md)
- **API and MCP Server**: See [docs/source/api_mcp_server.md](https://github.com/patchy631/ai-engineering-hub/blob/2c9b106168d4540b88e727e4aa316c06c856c2b7/hugging-face-skills/skills/hugging-face-trackio/references/docs/source/api_mcp_server.md)
