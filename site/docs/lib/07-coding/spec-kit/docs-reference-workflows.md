---
title: "Workflows"
sourceId: "07-coding/spec-kit"
sourceTitle: "Spec Kit（GitHub 官方规格驱动开发工具包）"
sourceKind: "产品仓库"
licenseLabel: "可转载"
lang: "英文"
tier: 2
volume: "07-coding"
sourceUrl: "https://github.com/github/spec-kit"
entryUrl: "https://github.com/github/spec-kit/blob/c173bf19a6654e3b05386ec3599349a55282b897/docs/reference/workflows.md"
sourceRel: "docs/reference/workflows.md"
rawUrl: "/raw/07-coding/spec-kit/docs/reference/workflows.md"
sourceSha256: "0d97b527d420d4f1956f057ebedd004e5b8d722a6d0ef2040d525cde1782ff39"
pageSha256: "0d97b527d420d4f1956f057ebedd004e5b8d722a6d0ef2040d525cde1782ff39"
contentMode: "local-full"
zh: ""
---

# Workflows

Workflows automate multi-step Spec-Driven Development processes — chaining commands, prompts, shell steps, and human checkpoints into repeatable sequences. They support conditional logic, loops, fan-out/fan-in, and can be paused and resumed from the exact point of interruption.

## Run a Workflow

```bash
specify workflow run <source>
```

| Option              | Description                                              |
| ------------------- | -------------------------------------------------------- |
| `-i` / `--input`    | Pass input values as `key=value` (repeatable)            |
| `--json`            | Emit the run outcome as a single JSON object             |

Runs a workflow from a catalog ID, URL, or local file path. Inputs declared by the workflow can be provided via `--input` or will be prompted interactively.

Example:

```bash
specify workflow run speckit -i spec="Build a kanban board with drag-and-drop task management"
```

With `--json`, a single machine-readable object is printed instead of formatted text (the default output is unchanged when the flag is omitted):

```bash
specify workflow run my-pipeline.yml --json
```

```json
{
  "run_id": "662bf791",
  "workflow_id": "build-and-review",
  "status": "paused",
  "current_step_id": "review",
  "current_step_index": 0
}
```

`workflow_id` is the `workflow.id` declared inside the YAML, not the file name. The object is printed exactly as shown — pretty-printed with two-space indentation, on plain stdout with no Rich markup — so it always parses. While the workflow runs under `--json`, any progress a step would print (for example a gate prompt, or output from a prompt step's CLI subprocess) is redirected to stderr, so stdout carries only the JSON object. Read the object from stdout; leave stderr attached to the terminal or capture it separately.

For `failed` and `aborted` runs, the payload includes an `error` field carrying the terminal step's error message:

```json
{
  "run_id": "662bf791",
  "workflow_id": "build-and-review",
  "status": "failed",
  "current_step_id": "boom",
  "current_step_index": 0,
  "error": "Command exited with code 3"
}
```

`completed` and `paused` runs omit the `error` field. The error is persisted in the run's `state.json`, so `specify workflow status <run_id> --json` surfaces the same message after the fact.

> **Note:** Most workflow commands require a project already initialized with `specify init`. The exception is `specify workflow run <local-file.\{yml,yaml\}>`, which can run outside a project; in that case, run state is stored under the current directory's `.specify/workflows/runs/<run_id>/`.

## Resume a Workflow

```bash
specify workflow resume <run_id>
```

| Option              | Description                                              |
| ------------------- | -------------------------------------------------------- |
| `-i` / `--input`    | Updated input values as `key=value` (repeatable)         |
| `--json`            | Emit the resume outcome as a single JSON object          |

Resumes a paused or failed workflow run from the exact step where it stopped. Useful after responding to a gate step or fixing an issue that caused a failure.

Supplied `--input` values are merged over the run's stored inputs and re-validated against the workflow's input types, then the blocked step is re-run with the updated values. This lets a run continue with information that only became available after it paused, or with a corrected value after a failure:

```bash
specify workflow resume <run_id> --input cmd="exit 0"
```

## Workflow Status

```bash
specify workflow status [<run_id>]
```

| Option              | Description                                              |
| ------------------- | -------------------------------------------------------- |
| `--json`            | Emit run status (or the runs list) as a JSON object      |

Shows the status of a specific run, or lists all runs if no ID is given. Run states: `created`, `running`, `completed`, `paused`, `failed`, `aborted`.

## List Installed Workflows

```bash
specify workflow list
```

Lists workflows installed in the current project.

## Install a Workflow

```bash
specify workflow add <source>
```

| Option          | Description                                            |
| --------------- | ------------------------------------------------------ |
| `--dev`         | Install from a local YAML file, package directory, or archive |
| `--from <url>`  | Install from a custom URL (`<source>` names the expected workflow ID) |

Installs a workflow from the catalog, an HTTPS URL, a local YAML file, a
directory containing `workflow.yml`, or a `.zip`, `.tar.gz`, or `.tgz`
archive. Archives may contain `workflow.yml` at the root or inside one
top-level directory.

Directory and archive installs preserve the complete workflow package,
including scripts and other companion files. ZIP, `.tar.gz`, and `.tgz`
archives follow the same validation and installation behavior.

## Workflow Overlays

Workflow overlays let a project extend or override an installed workflow without editing the installed `workflow.yml`.  This keeps local customizations safe across `specify bundle update` or `specify workflow add` upgrades.
