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
sourceRel: "cookbook/examples/agents_sdk/agent_improvement_loop.md"
rawUrl: "/raw/08-agents/openai-cookbook-docs/cookbook/examples/agents_sdk/agent_improvement_loop.md"
sourceSha256: "e4974f3b65d46cea41ba7561497e8602ad0731cfc5d1ab4d976c4f0246ea610a"
pageSha256: "e72fadbe401dc14f066fb5abdd3094a6e04704f03230732a7cc9c1866b316a75"
contentMode: "local-full"
zh: ""
---

## Prerequisites

Run this notebook from the repository root after installing the Python dependencies used by the example:

```bash
python -m venv .venv
source .venv/bin/activate
pip install openai openai-agents halo-engine
```

Promptfoo runs through `npx`, so you also need Node.js with `npx` available on your path.

Set an API key before running the notebook:

```bash
export OPENAI_API_KEY=...
```

The example is intentionally live-only. The trace generation, model critique, eval generation, validation, and optimization steps all use fresh model outputs so the notebook demonstrates the actual loop rather than a scripted preview. The next cell exposes the model choices in one place so you can trade quality for cost by substituting cheaper models if desired.

With the default five traces, budget about 20 minutes for a full run, though model latency and network conditions will move that up or down. The longest sections are usually Step 3, which runs the traced agent calls, and Step 7, where HALO analyzes the full loop. The feedback, eval-generation, and Promptfoo cells also make live calls, but are typically shorter. Long-running cells print progress or elapsed time as they work.

```python
%%capture
# Install or upgrade the Python dependencies used by this notebook.
%pip install --quiet --upgrade openai openai-agents halo-engine
```

```python
from __future__ import annotations

import asyncio
import hashlib
import json
import os
import re
import shutil
import subprocess
import sys
import tempfile
import time
import textwrap
import threading
from contextlib import contextmanager
from dataclasses import asdict, dataclass, field
from datetime import datetime, timezone
from importlib.metadata import version
from pathlib import Path
from typing import Any, Iterable, Iterator, Mapping

from IPython.display import Markdown, display
from openai import OpenAI

def find_project_root(start: Path | None = None) -> Path:
    current = (start or Path.cwd()).resolve()
    for candidate in [current, *current.parents]:
        if (candidate / "registry.yaml").exists():
            return candidate
    return current

PROJECT_ROOT = find_project_root()

if not os.getenv("OPENAI_API_KEY"):
    raise RuntimeError("Set OPENAI_API_KEY before running this live notebook.")
if shutil.which("npx") is None:
    raise RuntimeError("Install Node.js with npx before running the Promptfoo eval gate.")

# Edit these in one place if you want to use lower-cost models for part of the loop.
AGENT_MODEL = os.getenv("OPENAI_AGENT_MODEL", "gpt-5.5")
ANALYSIS_MODEL = os.getenv("OPENAI_ANALYSIS_MODEL", "gpt-5.5")
EVAL_GENERATION_MODEL = os.getenv("OPENAI_EVAL_GENERATION_MODEL", ANALYSIS_MODEL)
JUDGE_MODEL = os.getenv("OPENAI_JUDGE_MODEL", ANALYSIS_MODEL)
HALO_MODEL = os.getenv("OPENAI_HALO_MODEL", ANALYSIS_MODEL)
PROMPTFOO_VERSION = os.getenv("PROMPTFOO_VERSION", "0.121.9")

client = OpenAI()

def format_duration(seconds: float) -> str:
    minutes, remainder = divmod(int(round(seconds)), 60)
    return f"{minutes}m {remainder:02d}s" if minutes else f"{remainder}s"

ARTIFACT_DIR = PROJECT_ROOT / "examples" / "agents_sdk" / "agent_improvement_loop_artifacts"
TRACE_DIR = ARTIFACT_DIR / "traces"
HALO_TRACE_PATH = ARTIFACT_DIR / "halo_traces" / "traces.jsonl"
if ARTIFACT_DIR.exists():
    shutil.rmtree(ARTIFACT_DIR)
ARTIFACT_DIR.mkdir(exist_ok=True)
TRACE_DIR.mkdir(exist_ok=True)
HALO_TRACE_PATH.parent.mkdir(exist_ok=True)

print("Project root detected.")
print("Models:", {
    "agent": AGENT_MODEL,
    "analysis": ANALYSIS_MODEL,
    "eval_generation": EVAL_GENERATION_MODEL,
    "judge": JUDGE_MODEL,
    "halo": HALO_MODEL,
    "promptfoo": PROMPTFOO_VERSION,
})
```

```text
Project root detected.
Models: {'agent': 'gpt-5.5', 'analysis': 'gpt-5.5', 'eval_generation': 'gpt-5.5', 'judge': 'gpt-5.5', 'halo': 'gpt-5.5', 'promptfoo': '0.121.9'}
```
