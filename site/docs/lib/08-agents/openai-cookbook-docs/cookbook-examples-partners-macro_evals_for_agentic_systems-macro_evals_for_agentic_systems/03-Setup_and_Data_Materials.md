---
title: "openai-cookbook-docs"
sourceId: "08-agents/openai-cookbook-docs"
sourceTitle: "openai-cookbook-docs"
sourceKind: "官方文档"
licenseLabel: "仅引用"
lang: "英文"
tier: 3
volume: "08-agents"
sourceUrl: "https://developers.openai.com/cookbook"
entryUrl: "https://developers.openai.com/cookbook"
sourceRel: "cookbook/examples/partners/macro_evals_for_agentic_systems/macro_evals_for_agentic_systems.md"
rawUrl: "/raw/08-agents/openai-cookbook-docs/cookbook/examples/partners/macro_evals_for_agentic_systems/macro_evals_for_agentic_systems.md"
sourceSha256: "8e4ce8a04972a43b5743557fbb3b3e380c8bbb81c9660fa3c0c3e2e83a97c026"
pageSha256: "0f626ef1bdaad027c124bd3f3f189d1e1b28b4a0cdfba1520fa9011003c8fb49"
contentMode: "local-full"
zh: ""
---

## Setup and Data Materials

Install the dependencies, then load the offline dataset bundled with this example. The saved Promptfoo labels are part of the local data folder, so this notebook does not require a separate Promptfoo config, Promptfoo run artifact, or OpenAI API key.

Expected files:

```text
data/trace_results.jsonl
data/run_summary.json
data/trace_bundles.zip
data/eval_labels.jsonl
```

`trace_bundles.zip` is expanded automatically into a local cache the first time the notebook runs. A full SQLite trace snapshot can be placed at `data/trace_snapshot.sqlite` for optional enrichment, but it is not required for the end-to-end workflow.

If your data lives outside the example folder, set `MACRO_EVALS_DATA_ROOT` to that directory. If labels live separately, set `MACRO_EVALS_LABELS_PATH`.

```python
from __future__ import annotations

import json
import os
import sqlite3
import sys
import warnings
import zipfile
from pathlib import Path
from time import perf_counter
from typing import Any

import numpy as np
import pandas as pd
import plotly.express as px
import plotly.graph_objects as go
from IPython.display import Markdown, display

pd.set_option("display.max_colwidth", 180)
pd.set_option("display.max_rows", 100)
warnings.filterwarnings("ignore", message="n_jobs value 1 overridden.*")

def find_example_root(start: Path | None = None) -> Path:
    start = (start or Path.cwd()).resolve()
    candidates = [start, *start.parents, start / "examples/partners/macro_evals_for_agentic_systems"]
    for candidate in candidates:
        if (candidate / "helpers/data_prep.py").is_file() and (candidate / "helpers/macro_eval_pipeline.py").is_file():
            return candidate
    raise FileNotFoundError("Could not locate the macro evals example root.")

EXAMPLE_ROOT = find_example_root()
HELPERS_ROOT = EXAMPLE_ROOT / "helpers"
if str(HELPERS_ROOT) not in sys.path:
    sys.path.insert(0, str(HELPERS_ROOT))

from data_prep import add_public_label_columns, build_trace_documents, load_promptfoo_label_rows, normalize_bundle
from macro_eval_pipeline import (
    drill_down_topic_root_causes,
    pick_focus_topic,
    plot_root_cause_story,
    plot_suspect_leaderboard,
    plot_topic_heatmap,
    plot_topic_leaderboard,
    plot_topic_scatter,
    plot_trace_swimlane,
    run_macro_discovery,
    slice_topics_by_metadata,
)

def display_path(path: Path | None) -> str:
    if path is None:
        return "not found"
    try:
        return str(path.resolve().relative_to(EXAMPLE_ROOT))
    except ValueError:
        return str(path)

def as_path(value: str | Path) -> Path:
    path = Path(value).expanduser()
    return path if path.is_absolute() else EXAMPLE_ROOT / path

def unique_paths(paths: list[Path]) -> list[Path]:
    seen: set[Path] = set()
    unique: list[Path] = []
    for path in paths:
        resolved = path.resolve()
        if resolved not in seen:
            seen.add(resolved)
            unique.append(resolved)
    return unique

def find_material(label: str, names: list[str], *, kind: str = "file", required: bool = True) -> Path | None:
    checked: list[Path] = []
    for root in DATA_ROOTS:
        for name in names:
            if not name:
                continue
            candidate = as_path(name) if Path(name).expanduser().is_absolute() else root / name
            checked.append(candidate)
            if kind == "dir":
                exists = candidate.is_dir() and any(candidate.glob("*.json"))
            else:
                exists = candidate.is_file()
            if exists:
                return candidate.resolve()
    if required:
        checked_text = "\n".join(f"- {display_path(path)}" for path in checked)
        raise FileNotFoundError(f"Missing {label}. Checked:\n{checked_text}")
    return None

def ensure_trace_bundle_dir(bundle_dir: Path | None, bundle_zip: Path | None) -> Path:
    if bundle_dir is not None:
        return bundle_dir
    if bundle_zip is None:
        raise FileNotFoundError("Missing trace bundles. Expected data/trace_bundles/ or data/trace_bundles.zip.")
    cache_dir = bundle_zip.parent / ".macro_eval_cache" / "trace_bundles"
    marker = cache_dir / ".extracted_from_trace_bundles_zip"
    if not marker.is_file() or not any(cache_dir.glob("*.json")):
        cache_dir.mkdir(parents=True, exist_ok=True)
        with zipfile.ZipFile(bundle_zip) as archive:
            for member in archive.infolist():
                if member.is_dir() or not member.filename.endswith(".json"):
                    continue
                (cache_dir / Path(member.filename).name).write_bytes(archive.read(member))
        marker.write_text(str(bundle_zip.stat().st_mtime_ns), encoding="utf-8")
    return cache_dir.resolve()

env_data_root = os.environ.get("MACRO_EVALS_DATA_ROOT")
DATA_ROOTS = unique_paths(
    ([as_path(env_data_root)] if env_data_root else [])
    + [
        EXAMPLE_ROOT / "data",
    ]
)

RESULTS_PATH = find_material("trace results", ["trace_results.jsonl", "metadata/results.jsonl", "results.jsonl"])
SUMMARY_PATH = find_material("run summary", ["run_summary.json", "metadata/summary.json", "summary.json"])
SQLITE_PATH = find_material("optional trace snapshot", ["trace_snapshot.sqlite"], required=False)
BUNDLE_ZIP_PATH = find_material("trace bundle archive", ["trace_bundles.zip", "bundles.zip"], required=False)
BUNDLE_DIR = ensure_trace_bundle_dir(find_material("trace bundles", ["trace_bundles", "bundles"], kind="dir", required=False), BUNDLE_ZIP_PATH)
PROGRESS_PATH = find_material("run progress", ["run_progress.json", "metadata/progress.json", "progress.json"], required=False)
PROMPTFOO_LABELS_PATH = find_material(
    "lower-level eval labels",
    [
        os.environ.get("MACRO_EVALS_LABELS_PATH", ""),
        "eval_labels.jsonl",
        "metadata/eval_labels.jsonl",
    ],
    required=False,
)

DATA_ROOT = next((root for root in DATA_ROOTS if RESULTS_PATH.is_relative_to(root)), DATA_ROOTS[0])
TRACE_LIMIT = int(os.environ.get("MACRO_EVALS_TRACE_LIMIT", "0")) or None
DISCOVERY_DOC_COLUMN = "doc_structured_summary"
DISCOVERY_MIN_CLUSTER_SIZE = int(os.environ.get("MACRO_EVALS_DISCOVERY_MIN_CLUSTER_SIZE", "24"))
RANDOM_STATE = 42

resolved_paths_df = pd.DataFrame(
    [
        ("Trace results", RESULTS_PATH),
        ("Run summary", SUMMARY_PATH),
        ("Trace bundle archive", BUNDLE_ZIP_PATH),
        ("Expanded trace bundles", BUNDLE_DIR),
        ("Optional trace snapshot", SQLITE_PATH),
        ("Run progress", PROGRESS_PATH),
        ("Lower-level eval labels", PROMPTFOO_LABELS_PATH),
    ],
    columns=["material", "path"],
)
resolved_paths_df["path"] = resolved_paths_df["path"].map(display_path)

display(Markdown("### Data materials"))
display(resolved_paths_df)
display(Markdown(f"Example root: `{display_path(EXAMPLE_ROOT)}`  \nData root: `{display_path(DATA_ROOT)}`"))
```
