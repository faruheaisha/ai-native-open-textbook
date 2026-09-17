---
title: "Trackio - Experiment Tracking for ML Training"
sourceId: "10-context-memory/ai-engineering-hub"
sourceTitle: "AI Engineering Hub"
sourceKind: "其他材料"
licenseLabel: "可转载"
lang: "英文"
tier: 2
volume: "10-context-memory"
sourceUrl: "https://github.com/patchy631/ai-engineering-hub"
entryUrl: "https://github.com/patchy631/ai-engineering-hub/blob/2c9b106168d4540b88e727e4aa316c06c856c2b7/hugging-face-skills/skills/hugging-face-trackio/SKILL.md"
sourceRel: "hugging-face-skills/skills/hugging-face-trackio/SKILL.md"
rawUrl: "/raw/10-context-memory/ai-engineering-hub/hugging-face-skills/skills/hugging-face-trackio/SKILL.md"
sourceSha256: "3a297136ee212fb2d09896b45666f06ccf52828f1e3f6a805f74a31aea91b4e9"
pageSha256: "3a297136ee212fb2d09896b45666f06ccf52828f1e3f6a805f74a31aea91b4e9"
contentMode: "local-full"
zh: ""
---

# Trackio - Experiment Tracking for ML Training

Trackio is an experiment tracking library for logging and visualizing ML training metrics. It syncs to Hugging Face Spaces for real-time monitoring dashboards.

## Two Interfaces

| Task | Interface | Reference |
|------|-----------|-----------|
| **Logging metrics** during training | Python API | [references/logging_metrics.md](/lib/10-context-memory/ai-engineering-hub/hugging-face-skills-skills-hugging-face-trackio-references-logging_metrics) |
| **Retrieving metrics** after/during training | CLI | [references/retrieving_metrics.md](/lib/10-context-memory/ai-engineering-hub/hugging-face-skills-skills-hugging-face-trackio-references-retrieving_metrics) |

## When to Use Each

### Python API → Logging

Use `import trackio` in your training scripts to log metrics:

- Initialize tracking with `trackio.init()`
- Log metrics with `trackio.log()` or use TRL's `report_to="trackio"`
- Finalize with `trackio.finish()`

**Key concept**: For remote/cloud training, pass `space_id` — metrics sync to a Space dashboard so they persist after the instance terminates.

→ See [references/logging_metrics.md](/lib/10-context-memory/ai-engineering-hub/hugging-face-skills-skills-hugging-face-trackio-references-logging_metrics) for setup, TRL integration, and configuration options.

### CLI → Retrieving

Use the `trackio` command to query logged metrics:

- `trackio list projects/runs/metrics` — discover what's available
- `trackio get project/run/metric` — retrieve summaries and values
- `trackio show` — launch the dashboard
- `trackio sync` — sync to HF Space

**Key concept**: Add `--json` for programmatic output suitable for automation and LLM agents.

→ See [references/retrieving_metrics.md](/lib/10-context-memory/ai-engineering-hub/hugging-face-skills-skills-hugging-face-trackio-references-retrieving_metrics) for all commands, workflows, and JSON output formats.

## Minimal Logging Setup

```python
import trackio

trackio.init(project="my-project", space_id="username/trackio")
trackio.log({"loss": 0.1, "accuracy": 0.9})
trackio.log({"loss": 0.09, "accuracy": 0.91})
trackio.finish()
```

### Minimal Retrieval

```bash
trackio list projects --json
trackio get metric --project my-project --run my-run --metric loss --json
```
