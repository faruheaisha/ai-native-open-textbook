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
sourceRel: "cookbook/examples/partners/schemaflow_design_guide/schemaflow_cookbook.md"
rawUrl: "/raw/08-agents/openai-cookbook-docs/cookbook/examples/partners/schemaflow_design_guide/schemaflow_cookbook.md"
sourceSha256: "afab413d868b1d2b8951a5c01c177c86ce2789efff0e64115a37780fd84076dc"
pageSha256: "fb40074b8042a62a96038078f82544353faa35d723d4378607aa6f6f931192c8"
contentMode: "local-full"
zh: ""
---

## 1) Environment Setup

This section prepares the runtime for the SchemaFlow workflow.

The setup cell does the following:

- Imports standard Python utilities used throughout the notebook.
- Imports the OpenAI client.
- Imports the OpenAI Agents SDK primitives:
  - `Agent`
  - `Runner`
  - `RunConfig`
  - `AgentOutputSchema`
  - `FileSearchTool`
  - tracing and span helpers
- Verifies that the installed `openai-agents` package meets the minimum required version.
- Reads `OPENAI_API_KEY` from the environment or prompts for it.
- Sets the model with `OPENAI_MODEL`, defaulting to `gpt-5.5`.
- Creates a trace group ID so all related agent runs and guardrail spans can be grouped together.

The workflow intentionally enables sensitive trace payloads for this demo so prompts, outputs, eval bundles, and tool data are visible in traces. For production usage, review this setting before handling private data.

```python
%pip install --quiet -U "openai" "openai-agents>=0.17.0"
```

```python
import os
import json
import re
import uuid
from datetime import datetime, timezone
from getpass import getpass
from importlib.metadata import PackageNotFoundError, version

try:
    from openai import OpenAI
except Exception as e:
    raise RuntimeError("Install dependency first: pip install -U openai") from e

MIN_AGENTS_SDK_VERSION = "0.17.0"
try:
    from agents import (
        Agent,
        AgentOutputSchema,
        FileSearchTool,
        Runner,
        RunConfig,
        custom_span,
        flush_traces,
        function_span,
        guardrail_span,
        trace,
    )
except Exception as e:
    raise RuntimeError(
        'Install or upgrade the OpenAI Agents SDK first: pip install -U "openai-agents>=0.17.0"'
    ) from e

def _version_tuple(value):
    match = re.match(r"^(\d+)\.(\d+)\.(\d+)", str(value or ""))
    return tuple(int(part) for part in match.groups()) if match else (0, 0, 0)

try:
    AGENTS_SDK_VERSION = version("openai-agents")
except PackageNotFoundError as e:
    raise RuntimeError('Install the OpenAI Agents SDK first: pip install -U "openai-agents>=0.17.0"') from e

if _version_tuple(AGENTS_SDK_VERSION) < _version_tuple(MIN_AGENTS_SDK_VERSION):
    raise RuntimeError(
        f'OpenAI Agents SDK {MIN_AGENTS_SDK_VERSION}+ is required; found {AGENTS_SDK_VERSION}. '
        'Upgrade with: pip install -U "openai-agents>=0.17.0"'
    )

def _clean_openai_api_key(value):
    key = (value or "").strip()
    if not key:
        raise RuntimeError("OPENAI_API_KEY is required.")
    return key

if not os.getenv("OPENAI_API_KEY", "").strip():
    os.environ["OPENAI_API_KEY"] = getpass("Enter your OpenAI API key: ")
os.environ["OPENAI_API_KEY"] = _clean_openai_api_key(os.getenv("OPENAI_API_KEY"))
OPENAI_ORG_ID = os.getenv("OPENAI_ORG_ID", "").strip()
if OPENAI_ORG_ID:
    os.environ["OPENAI_ORG_ID"] = OPENAI_ORG_ID

MODEL = os.getenv("OPENAI_MODEL", "gpt-5.5")
TRACE_INCLUDE_SENSITIVE_DATA = os.getenv("OPENAI_AGENTS_TRACE_INCLUDE_SENSITIVE_DATA", "false").lower() in {"1", "true", "yes", "on"}
os.environ["OPENAI_AGENTS_TRACE_INCLUDE_SENSITIVE_DATA"] = "true" if TRACE_INCLUDE_SENSITIVE_DATA else "false"
SCHEMAFLOW_TRACE_GROUP_ID = os.getenv("SCHEMAFLOW_TRACE_GROUP_ID") or (
    "schemaflow-cookbook-" + datetime.now(timezone.utc).strftime("%Y%m%dT%H%M%SZ") + "-" + uuid.uuid4().hex[:8]
)
os.environ["SCHEMAFLOW_TRACE_GROUP_ID"] = SCHEMAFLOW_TRACE_GROUP_ID
client = OpenAI(api_key=os.environ["OPENAI_API_KEY"])
print("Using model:", MODEL)
print("OpenAI Agents SDK:", AGENTS_SDK_VERSION)
print("OpenAI organization:", os.getenv("OPENAI_ORG_ID") or "(default for API key)")
print("Trace group:", SCHEMAFLOW_TRACE_GROUP_ID)
print("Trace payloads include prompts/outputs:", TRACE_INCLUDE_SENSITIVE_DATA)
```

````python
from concurrent.futures import ThreadPoolExecutor
from pydantic import BaseModel, ConfigDict, Field

class SchemaFlowBaseModel(BaseModel):
    model_config = ConfigDict(extra="allow")

class OperationModel(SchemaFlowBaseModel):
    op: str
    details: dict = Field(default_factory=dict)

class ChangeRequestModel(SchemaFlowBaseModel):
    title: str | None = None
    domain: str | None = None
    target_schema: str | None = None
    target_table: str | None = None
    operations: list[OperationModel] = Field(default_factory=list)
    notes: list = Field(default_factory=list)

class ImpactObjectModel(SchemaFlowBaseModel):
    type: str
    name: str
    reason: str
    source: str

class ImpactModel(SchemaFlowBaseModel):
    impacted_objects: list[ImpactObjectModel] = Field(default_factory=list)
    risks: list[str] = Field(default_factory=list)
    assumptions: list[str] = Field(default_factory=list)

class PlanStepModel(SchemaFlowBaseModel):
    id: str
    description: str

class PlanModel(SchemaFlowBaseModel):
    plan_steps: list[PlanStepModel] = Field(default_factory=list)
    prechecks: list[str] = Field(default_factory=list)
    postchecks: list[str] = Field(default_factory=list)
    rollback: list[str] = Field(default_factory=list)

CHANGE_OUTPUT_SCHEMA = AgentOutputSchema(ChangeRequestModel, strict_json_schema=False)
IMPACT_OUTPUT_SCHEMA = AgentOutputSchema(ImpactModel, strict_json_schema=False)
PLAN_OUTPUT_SCHEMA = AgentOutputSchema(PlanModel, strict_json_schema=False)

def _parse_json_text(text: str):
    text = (text or "{}").strip()
    if text.startswith("```"):
        text = re.sub(r"^```(?:json)?\s*", "", text)
        text = re.sub(r"\s*```$", "", text).strip()
    try:
        return json.loads(text)
    except json.JSONDecodeError:
        match = re.search(r"\{.*\}", text, flags=re.DOTALL)
        if not match:
            raise
        return json.loads(match.group(0))

def _model_dump(value):
    if value is None or isinstance(value, (str, int, float, bool, bytes)):
        return value
    if isinstance(value, type):
        return value
    if hasattr(value, "model_dump"):
        try:
            return value.model_dump()
        except TypeError:
            pass
    if hasattr(value, "to_dict"):
        try:
            return value.to_dict()
        except TypeError:
            pass
    if hasattr(value, "__dict__"):
        try:
            return {k: v for k, v in vars(value).items() if not k.startswith("_")}
        except TypeError:
            pass
    return value

def _agent_output_to_json(value):
    value = _model_dump(value)
    if isinstance(value, dict):
        return value
    if isinstance(value, str):
        return _parse_json_text(value)
    return json.loads(json.dumps(value, default=str))

def _agent_output_to_text(value):
    value = _model_dump(value)
    if isinstance(value, str):
        return value.strip()
    return json.dumps(value, ensure_ascii=False)

def _trace_metadata(metadata: dict | None = None):
    cleaned = {}
    for key, value in (metadata or {}).items():
        if value is None:
            cleaned[str(key)] = ""
        elif isinstance(value, bool):
            cleaned[str(key)] = "true" if value else "false"
        elif isinstance(value, (dict, list, tuple, set)):
            cleaned[str(key)] = json.dumps(value, ensure_ascii=False, default=str)
        else:
            cleaned[str(key)] = str(value)
    return cleaned

def _schemaflow_run_config(workflow_name: str, metadata: dict | None = None):
    return RunConfig(
        workflow_name=workflow_name,
        group_id=SCHEMAFLOW_TRACE_GROUP_ID,
        trace_include_sensitive_data=TRACE_INCLUDE_SENSITIVE_DATA,
        trace_metadata=_trace_metadata({"notebook": "schemaflow_cookbook", **(metadata or {})}),
    )

def _runner_run_sync(agent, prompt: str, *, workflow_name: str, metadata: dict | None = None, max_turns: int = 4):
    kwargs = {"run_config": _schemaflow_run_config(workflow_name, metadata), "max_turns": max_turns}
    try:
        return Runner.run_sync(agent, prompt, **kwargs)
    except RuntimeError as exc:
        if "event loop" not in str(exc).lower():
            raise
        with ThreadPoolExecutor(max_workers=1) as pool:
            return pool.submit(lambda: Runner.run_sync(agent, prompt, **kwargs)).result()

def run_schemaflow_json_agent(*, name, instructions, prompt, output_schema, model=MODEL, tools=None, workflow_name=None, metadata=None):
    agent = Agent(name=name, instructions=instructions, model=model, output_type=output_schema, tools=tools or [])
    result = _runner_run_sync(agent, prompt, workflow_name=workflow_name or name, metadata={"agent": name, **(metadata or {})})
    return _agent_output_to_json(result.final_output), result

def run_schemaflow_text_agent(*, name, instructions, prompt, model=MODEL, tools=None, workflow_name=None, metadata=None):
    agent = Agent(name=name, instructions=instructions, model=model, tools=tools or [])
    result = _runner_run_sync(agent, prompt, workflow_name=workflow_name or name, metadata={"agent": name, **(metadata or {})})
    return _agent_output_to_text(result.final_output), result

def _collect_file_search_results(value):
    results = []
    seen = set()

    def visit(node):
        if node is None or isinstance(node, (str, int, float, bool, bytes)):
            return
        if isinstance(node, type) or callable(node):
            return
        node_id = id(node)
        if node_id in seen:
            return
        seen.add(node_id)

        node = _model_dump(node)
        if node is None or isinstance(node, (str, int, float, bool, bytes)):
            return
        if isinstance(node, type) or callable(node):
            return

        if isinstance(node, dict):
            if node.get("type") == "file_search_call":
                for result in node.get("results", []) or []:
                    result = _model_dump(result)
                    if isinstance(result, dict):
                        text = result.get("text") or result.get("content") or ""
                        if isinstance(text, list):
                            text = "\n".join(str(x) for x in text)
                        results.append({"file_id": result.get("file_id"), "filename": result.get("filename") or result.get("file_name") or result.get("title"), "score": result.get("score"), "text_preview": str(text)[:1200]})
            for child in node.values():
                visit(child)
        elif isinstance(node, (list, tuple, set)):
            for child in node:
                visit(child)

    visit(value)
    return results

def agent_file_search_results(run_result):
    return _collect_file_search_results(run_result)

def trace_function_result(name: str, *, input_obj=None, output_obj=None):
    with function_span(
        name,
        input=json.dumps(input_obj, ensure_ascii=False, default=str) if input_obj is not None else None,
        output=json.dumps(output_obj, ensure_ascii=False, default=str) if output_obj is not None else None,
    ):
        pass

def pretty(obj):
    print(json.dumps(obj, indent=2, ensure_ascii=False))
````
