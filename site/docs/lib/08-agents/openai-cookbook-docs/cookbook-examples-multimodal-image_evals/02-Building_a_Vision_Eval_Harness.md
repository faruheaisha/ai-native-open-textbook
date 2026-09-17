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
sourceRel: "cookbook/examples/multimodal/image_evals.md"
rawUrl: "/raw/08-agents/openai-cookbook-docs/cookbook/examples/multimodal/image_evals.md"
sourceSha256: "e1cb173d20238637b17f74eead4c8760debec34d02e51970e14d7ba623a126c7"
pageSha256: "bba5528e9338e27468eaeea63d32732787e06595ca90f24cbc8de37e3405547a"
contentMode: "local-full"
zh: ""
---

## Building a Vision Eval Harness

A vision eval harness is a small, repeatable system that turns “did this
image work?” into **structured, comparable results** across prompts,
models, and settings.

At a high level, vision evals follow the same loop as any LLM eval
system:

**Inputs → Model → Outputs → Graders → Scores → Feedback → Improvement**

To make this reusable across the rest of the cookbook (generation +
editing), build the harness around **three plug-ins**:

1.  **Test cases:** what to run (prompt + criteria + optional input
    images/mask)  
2.  **Runners:** how to call a model and save output images  
3.  **Graders:** how to score an output (rubrics, LLM-as-judge, human
    labels later)

**Setup**

Run this once. It:
- creates the API client
- creates `images/` in the folder. 

```python
import os
from openai import OpenAI

client = OpenAI()

os.makedirs("../../images", exist_ok=True)
```

Below is a minimal `vision_harness/` package you can drop into your repo.

For a full, runnable harness you can extend (edit, reproduce, and add your own cases), see [examples/evals/imagegen_evals](https://github.com/openai/openai-cookbook/tree/main/examples/evals/imagegen_evals).

### vision_harness/types.py

Keep the core types generic so you can reuse them for *both* image
generation and image editing.

```python
from __future__ import annotations

from dataclasses import dataclass, field
from pathlib import Path
from typing import Any, Literal, Optional

TaskType = Literal["image_generation", "image_editing"]
ScoreValue = bool | int | float | str

@dataclass(frozen=True)
class ImageInputs:
    """Editing inputs: one or more reference images + optional mask."""
    image_paths: list[Path]
    mask_path: Optional[Path] = None

@dataclass(frozen=True)
class TestCase:
    """A single evaluable example."""
    id: str
    task_type: TaskType
    prompt: str
    criteria: str
    image_inputs: Optional[ImageInputs] = None

@dataclass(frozen=True)
class ModelRun:
    """One model configuration to evaluate (useful for sweeps)."""
    label: str
    task_type: TaskType
    params: dict[str, Any]  # e.g. {"model": "...", "quality": "...", ...}

@dataclass(frozen=True)
class Artifact:
    """A saved artifact from a run (usually an image)."""
    kind: Literal["image"]
    path: Path
    mime: str = "image/png"

@dataclass
class ModelResponse:
    """Normalized output from any runner."""
    artifacts: list[Artifact] = field(default_factory=list)
    raw: dict[str, Any] = field(default_factory=dict)  # optional debug payload

@dataclass(frozen=True)
class Score:
    key: str
    value: ScoreValue
    reason: str = ""
    tags: Optional[list[str]] = None
```

### vision_harness/io.py

You’ll use this in graders (LLM-as-judge) and sometimes in model calls.

```python
from __future__ import annotations

import base64
from pathlib import Path

_MIME_BY_SUFFIX = {
    ".jpg": "image/jpeg",
    ".jpeg": "image/jpeg",
    ".png": "image/png",
    ".webp": "image/webp",
}

def image_to_data_url(path: Path) -> str:
    mime = _MIME_BY_SUFFIX.get(path.suffix.lower(), "image/png")
    b64 = base64.b64encode(path.read_bytes()).decode("utf-8")
    return f"data:{mime};base64,{b64}"
```

### vision_harness/storage.py

```python
from __future__ import annotations

import time
from dataclasses import dataclass
from pathlib import Path

@dataclass
class OutputStore:
    """
    Simple artifact store that writes directly to the root folder.
    Note: This implementation writes directly to `root` (no per-test subfolders),
    which keeps site-relative image paths stable for cookbook rendering.
    """
    root: Path

    def run_dir(self, test_id: str, model_label: str) -> Path:
        # Ignore test/model subfolders; write everything to the root.
        self.root.mkdir(parents=True, exist_ok=True)
        return self.root

    def new_basename(self, prefix: str) -> str:
        created_ms = int(time.time() * 1000)
        return f"{prefix}_{created_ms}"

    def save_png(self, run_dir: Path, basename: str, idx: int, png_bytes: bytes) -> Path:
        out = run_dir / f"{basename}_{idx}.png"
        out.write_bytes(png_bytes)
        return out
```

### vision_harness/sweeps.py

```python
from __future__ import annotations

from itertools import product
from typing import Any

def grid_sweep(
    *,
    base_label: str,
    task_type: TaskType,
    fixed: dict[str, Any],
    grid: dict[str, list[Any]],
) -> list[ModelRun]:
    keys = list(grid.keys())
    runs: list[ModelRun] = []

    for values in product(*[grid[k] for k in keys]):
        params = dict(fixed)
        label_parts = [base_label]
        for k, v in zip(keys, values):
            params[k] = v
            label_parts.append(f"{k}={v}")
        runs.append(ModelRun(label=",".join(label_parts), task_type=task_type, params=params))

    return runs
```

### vision_harness/runners.py

Two runners: one for **generation**, one for **editing**. Both return a
normalized `ModelResponse` containing saved output images.

```python
from __future__ import annotations

import base64
from contextlib import ExitStack
from typing import Optional

from openai import OpenAI

def _mime_for_path(path) -> str:
    suffix = str(path).lower()
    if suffix.endswith(".png"):
        return "image/png"
    if suffix.endswith(".jpg") or suffix.endswith(".jpeg"):
        return "image/jpeg"
    if suffix.endswith(".webp"):
        return "image/webp"
    return "application/octet-stream"

def _extract_b64_items(images_response) -> list[str]:
    b64_items: list[str] = []
    for item in getattr(images_response, "data", []) or []:
        b64 = getattr(item, "b64_json", None)
        if b64:
            b64_items.append(b64)
    return b64_items

class ImageGenerationRunner:
    """Text-to-image runner."""

    def __init__(self, client: Optional[OpenAI] = None):
        self.client = client or OpenAI()

    def run(self, case: TestCase, run_cfg: ModelRun, store: OutputStore) -> ModelResponse:
        assert case.task_type == "image_generation"
        assert run_cfg.task_type == "image_generation"

        params = dict(run_cfg.params)
        model = params.pop("model")
        n = int(params.pop("n", 1))

        run_dir = store.run_dir(case.id, run_cfg.label)
        basename = store.new_basename(f"gen_{case.id}_{run_cfg.label}")

        images_response = self.client.images.generate(
            model=model,
            prompt=case.prompt,
            n=n,
            **params,
        )

        artifacts: list[Artifact] = []
        for idx, b64_json in enumerate(_extract_b64_items(images_response)):
            png_bytes = base64.b64decode(b64_json)
            out_path = store.save_png(run_dir, basename, idx, png_bytes)
            artifacts.append(Artifact(kind="image", path=out_path))

        return ModelResponse(artifacts=artifacts, raw={"model": model, "params": run_cfg.params})

class ImageEditRunner:
    """Image editing runner (reference image(s) + optional mask)."""

    def __init__(self, client: Optional[OpenAI] = None):
        self.client = client or OpenAI()

    def run(self, case: TestCase, run_cfg: ModelRun, store: OutputStore) -> ModelResponse:
        assert case.task_type == "image_editing"
        assert run_cfg.task_type == "image_editing"
        assert case.image_inputs is not None and case.image_inputs.image_paths

        params = dict(run_cfg.params)
        model = params.pop("model")
        n = int(params.pop("n", 1))

        run_dir = store.run_dir(case.id, run_cfg.label)
        basename = store.new_basename(f"edit_{case.id}_{run_cfg.label}")

        with ExitStack() as stack:
            image_files = []
            for p in case.image_inputs.image_paths:
                f = stack.enter_context(p.open("rb"))
                image_files.append((p.name, f, _mime_for_path(p)))

            mask_file = None
            if case.image_inputs.mask_path:
                mf = stack.enter_context(case.image_inputs.mask_path.open("rb"))
                mask_file = (case.image_inputs.mask_path.name, mf, _mime_for_path(case.image_inputs.mask_path))

            edit_kwargs = dict(
                model=model,
                prompt=case.prompt,
                image=image_files,
                n=n,
                **params,
            )
            if mask_file is not None:
                edit_kwargs["mask"] = mask_file

            images_response = self.client.images.edit(**edit_kwargs)

        artifacts: list[Artifact] = []
        for idx, b64_json in enumerate(_extract_b64_items(images_response)):
            png_bytes = base64.b64decode(b64_json)
            out_path = store.save_png(run_dir, basename, idx, png_bytes)
            artifacts.append(Artifact(kind="image", path=out_path))

        return ModelResponse(artifacts=artifacts, raw={"model": model, "params": run_cfg.params})
```

### vision_harness/graders.py

A clean grader interface + a reusable **LLM-as-judge** grader that can
be used for both generation and editing by changing how you build the
judge inputs.

```python
from __future__ import annotations

import json
from dataclasses import dataclass, field
from pathlib import Path
from typing import Callable, Optional, Protocol

from openai import OpenAI

class Grader(Protocol):
    key: str

    def grade(self, response: ModelResponse, case: TestCase) -> Score | list[Score]: ...

def pick_first_image(response: ModelResponse) -> Optional[Path]:
    for artifact in response.artifacts:
        if artifact.kind == "image":
            return artifact.path
    return None

def build_generation_judge_content(case: TestCase, output_image: Path) -> list[dict]:
    return [
        {
            "type": "input_text",
            "text": f"Prompt:\n{case.prompt}\n\nCriteria:\n{case.criteria}",
        },
        {
            "type": "input_image",
            "image_url": image_to_data_url(output_image),
        },
    ]

def build_editing_judge_content(case: TestCase, output_image: Path) -> list[dict]:
    assert case.image_inputs is not None and case.image_inputs.image_paths
    content: list[dict] = [
        {
            "type": "input_text",
            "text": f"Edit instruction:\n{case.prompt}\n\nCriteria:\n{case.criteria}",
        }
    ]
    for image_path in case.image_inputs.image_paths:
        content.append(
            {
                "type": "input_image",
                "image_url": image_to_data_url(image_path),
            }
        )
    if case.image_inputs.mask_path:
        content.append(
            {
                "type": "input_image",
                "image_url": image_to_data_url(case.image_inputs.mask_path),
            }
        )
    content.append(
        {
            "type": "input_image",
            "image_url": image_to_data_url(output_image),
        }
    )
    return content

def default_schema() -> dict:
    return {
        "type": "object",
        "properties": {
            "pass": {"type": "boolean"},
            "reason": {"type": "string"},
        },
        "required": ["pass", "reason"],
        "additionalProperties": False,
    }

@dataclass
class LLMajRubricGrader:
    """
    Reusable vision LLM-as-judge grader.
    - Provide a system prompt + a content_builder for generation/editing.
    - Optionally provide a custom JSON schema and parser.
    """

    key: str
    system_prompt: str
    content_builder: Callable[[TestCase, Path], list[dict]]
    judge_model: str = "gpt-5.2"
    client: Optional[OpenAI] = None

    json_schema_name: str = "vision_eval_result"
    json_schema: dict = field(default_factory=default_schema)
    result_parser: Optional[Callable[[dict, str], Score | list[Score]]] = None

    def _parse_result(self, data: dict) -> Score | list[Score]:
        if self.result_parser:
            return self.result_parser(data, self.key)
        return Score(
            key=self.key,
            value=bool(data.get("pass", False)),
            reason=(data.get("reason") or "").strip(),
            tags=data.get("tags") or None,
        )

    def grade(self, response: ModelResponse, case: TestCase) -> Score | list[Score]:
        output_image = pick_first_image(response)
        if not output_image:
            return Score(key=self.key, value=False, reason="No output image artifact found")

        client = self.client or OpenAI()
        content = self.content_builder(case, output_image)

        completion = client.responses.create(
            model=self.judge_model,
            input=[
                {"role": "system", "content": self.system_prompt},
                {"role": "user", "content": content},
            ],
            text={
                "format": {
                    "type": "json_schema",
                    "name": self.json_schema_name,
                    "schema": self.json_schema,
                    "strict": True,
                }
            },
        )

        data = json.loads(completion.output_text)
        return self._parse_result(data)
```

### vision_harness/evaluate.py

A simple evaluation loop that returns plain Python data (no “eval row”
class). Later sections can write their own reporting/CSV utilities on
top.

```python
from __future__ import annotations

from typing import Any

def _as_score_list(score_or_scores: Score | list[Score]) -> list[Score]:
    if isinstance(score_or_scores, list):
        return score_or_scores
    return [score_or_scores]

def evaluate(
    *,
    cases: list[TestCase],
    model_runs: list[ModelRun],
    graders: list[Grader],
    output_store: OutputStore,
) -> list[dict[str, Any]]:
    gen_runner = ImageGenerationRunner()
    edit_runner = ImageEditRunner()

    results: list[dict[str, Any]] = []

    for case in cases:
        for run_cfg in model_runs:
            if run_cfg.task_type != case.task_type:
                continue

            if case.task_type == "image_generation":
                response = gen_runner.run(case, run_cfg, output_store)
            elif case.task_type == "image_editing":
                response = edit_runner.run(case, run_cfg, output_store)
            else:
                raise ValueError(f"Unknown task_type: {case.task_type}")

            score_map: dict[str, Any] = {}
            reason_map: dict[str, str] = {}

            for grader in graders:
                scored = grader.grade(response, case)
                for score in _as_score_list(scored):
                    score_map[score.key] = score.value
                    reason_map[score.key] = score.reason

            results.append(
                {
                    "test_id": case.id,
                    "model_label": run_cfg.label,
                    "task_type": case.task_type,
                    "artifact_paths": [str(a.path) for a in response.artifacts],
                    "scores": score_map,
                    "reasons": reason_map,
                    "run_params": run_cfg.params,
                }
            )

    return results
```

### Result Table Rendering Helpers

```python
import os
from html import escape
from IPython.display import HTML, display

def summarize_scores(scores: dict[str, object]) -> str:
    return os.linesep.join(f"{k}: {scores[k]}" for k in sorted(scores.keys()))

def summarize_reasons(reasons: dict[str, str]) -> str:
    verdict_reason = (reasons.get("verdict") or "").strip()
    if verdict_reason:
        return verdict_reason
    return os.linesep.join(f"{k}: {reasons[k]}" for k in sorted(reasons.keys()) if reasons[k])

def _pre(text: str) -> str:
    return (
        "<pre style='white-space:pre-wrap; word-break:break-word; margin:0'>"
        f"{escape(text)}"
        "</pre>"
    )

def render_result_table(
    *,
    case: TestCase,
    result: dict[str, object],
    title: str,
) -> None:
    sep = os.linesep
    prompt_text = f"{case.prompt}{sep}{sep}Criteria:{sep}{case.criteria}"
    scores = result["scores"]
    reasons = result["reasons"]

    prompt_html = _pre(prompt_text)
    scores_html = _pre(summarize_scores(scores))
    reasons_html = _pre(summarize_reasons(reasons))

    table_html = (
        "<table style='width:100%; table-layout:fixed; border-collapse:collapse;'>"
        "<colgroup>"
        "<col style='width:33%'>"
        "<col style='width:33%'>"
        "<col style='width:33%'>"
        "</colgroup>"
        "<thead><tr>"
        "<th style='text-align:left; padding:8px; border-bottom:1px solid #ddd'>Input Prompt</th>"
        "<th style='text-align:left; padding:8px; border-bottom:1px solid #ddd'>Scores</th>"
        "<th style='text-align:left; padding:8px; border-bottom:1px solid #ddd'>Reasoning</th>"
        "</tr></thead>"
        "<tbody><tr>"
        f"<td style='text-align:left; padding:8px; vertical-align:top'>{prompt_html}</td>"
        f"<td style='text-align:left; padding:8px; vertical-align:top'>{scores_html}</td>"
        f"<td style='text-align:left; padding:8px; vertical-align:top'>{reasons_html}</td>"
        "</tr></tbody></table>"
    )

    display(HTML(f"<div style='font-weight:600; margin:6px 0'>{escape(title)}</div>"))
    display(HTML(table_html))
```

Later cookbook sections will only need to provide:

1.  A list of `TestCase` objects for the use case (UI mockups, marketing
    graphics, virtual try-on, logo edits, etc.)  
2.  A set of `ModelRun`s (single run or a sweep with `grid_sweep`)  
3.  A set of graders, typically:
    - **Gating graders** (pass/fail): non-negotiables ex: instruction
      following, text correctness, locality/preservation  
    - **Graded metrics** (0–5): quality dimensions ex:
      realism/usability, layout/hierarchy, artifact severity  
    - Optional: human rubric labels and pairwise prefs (stored outside
      the harness)

This keeps the rest of the cookbook focused on **what to measure** per
use case—without rewriting harness plumbing each time.
