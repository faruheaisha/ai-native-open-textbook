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
pageSha256: "8a3412effd36b89cb90387bd2684b677ff624e4cb014f02ccdf2c254502f1013"
contentMode: "local-full"
zh: ""
---

## 10) Evaluate the Flow with Promptfoo

Promptfoo is now part of OpenAI. This section uses Promptfoo's Jupyter/Colab pattern to run evals from notebook cells while keeping the SchemaFlow logic readable in Python. Promptfoo itself runs via Node.js, and the evaluated flow is provided through Promptfoo's Python `file://` provider and Python assertion integrations.

This optional section turns the notebook workflow into a repeatable eval.

The core notebook run validates one live example. Promptfoo adds a reusable eval harness that can run parse-only and full-flow checks using generated provider and assertion files, which is useful when you want to keep the same workflow stable as prompts, models, or inputs change.

Because Promptfoo launches a separate Python process, it cannot directly access variables that only exist inside the active notebook kernel. To solve that, the next cells publish runtime files from the current notebook state:

- a reusable `schemaflow_cookbook_core.py` module
- a Python Promptfoo provider
- a Python Promptfoo assertion file
- generated eval cases
- a generated Promptfoo config

This section includes three validation layers:

1. **Input preflight**
   - deterministic checks before writing the config
   - no model calls

2. **Parse-only eval**
   - checks Stage 1 behavior
   - verifies target, operation presence, expected added column, and expected data type

3. **Full-flow eval**
   - checks downstream impact, SQL terms, and validation status

Eval results are printed in the notebook and exported as timestamped JSON and HTML files under:

```text
artifacts/promptfoo/results/
```

The latest successful run also refreshes:

```text
schemaflow_cookbook_eval_latest.json
schemaflow_cookbook_eval_latest.html
```

Runtime note: the core SchemaFlow cells require Python and an OpenAI API key. The Promptfoo cells additionally require Node.js and npm in the same executable notebook runtime.

After the eval runs, Promptfoo provides a compact view of the current change request, expected fields, parse-only check, and full-flow check.

Use this view to answer questions such as:

- Did the Parse Agent extract the expected target table?
- Did it detect the expected added column?
- Did it preserve the requested data type?
- Did the full flow produce impact risks?
- Did the SQL include required terms?
- Did deterministic validation pass?

![Promptfoo eval results view](https://developers.openai.com/cookbook/assets/images/schemaflow_promptfoo.gif)

---

### Promptfoo Runtime Directory Setup

This cell creates notebook-local directories for Promptfoo config, logs, cache, npm cache, and results.

Keeping these directories under `artifacts/promptfoo/` makes the eval runtime portable and avoids relying on global Promptfoo state under the user’s home directory.

The cell also exports environment variables so the generated provider, assertion, and Promptfoo command all use the same trace group and local runtime paths.

```python
from pathlib import Path
import os
PROMPTFOO_DIR = Path("artifacts/promptfoo")
PROMPTFOO_DIR.mkdir(parents=True, exist_ok=True)
PROMPTFOO_CONFIG_DIR = PROMPTFOO_DIR / ".promptfoo"
PROMPTFOO_LOG_DIR = PROMPTFOO_CONFIG_DIR / "logs"
PROMPTFOO_CACHE_DIR = PROMPTFOO_CONFIG_DIR / "cache"
PROMPTFOO_RESULTS_DIR = PROMPTFOO_DIR / "results"
NPM_CACHE_DIR = PROMPTFOO_DIR / ".npm-cache"
for path in (PROMPTFOO_CONFIG_DIR, PROMPTFOO_LOG_DIR, PROMPTFOO_CACHE_DIR, PROMPTFOO_RESULTS_DIR, NPM_CACHE_DIR):
    path.mkdir(parents=True, exist_ok=True)
os.environ["PROMPTFOO_CONFIG_DIR"] = str(PROMPTFOO_CONFIG_DIR.resolve())
os.environ["PROMPTFOO_LOG_DIR"] = str(PROMPTFOO_LOG_DIR.resolve())
os.environ["PROMPTFOO_CACHE_PATH"] = str(PROMPTFOO_CACHE_DIR.resolve())
os.environ["npm_config_cache"] = str(NPM_CACHE_DIR.resolve())
os.environ["npm_config_update_notifier"] = "false"
os.environ["npm_config_loglevel"] = "error"
os.environ["SCHEMAFLOW_TRACE_GROUP_ID"] = SCHEMAFLOW_TRACE_GROUP_ID
os.environ["OPENAI_AGENTS_TRACE_INCLUDE_SENSITIVE_DATA"] = os.getenv("OPENAI_AGENTS_TRACE_INCLUDE_SENSITIVE_DATA", "false")
print("Promptfoo runtime dir:", PROMPTFOO_DIR.resolve())
print("Promptfoo config dir:", PROMPTFOO_CONFIG_DIR.resolve())
print("Promptfoo results dir:", PROMPTFOO_RESULTS_DIR.resolve())
print("Notebook-local npm cache:", NPM_CACHE_DIR.resolve())
print("Promptfoo trace group:", SCHEMAFLOW_TRACE_GROUP_ID)
```

---

### Node.js and npm Runtime Check

Promptfoo runs through Node.js, even though the SchemaFlow provider and assertion logic are written in Python.

This cell verifies that the notebook runtime has a supported `node` and `npm` available.

The check is intentionally explicit. The notebook does not silently install or upgrade Node because that depends on the execution environment.

For local macOS notebooks, the cell prefers a supported `nvm` Node runtime before common Homebrew paths. This helps ensure that the notebook and terminal use the same Node ABI and avoids stale native dependencies.

If this check fails, fix the runtime first and then rerun the Promptfoo section.

```python
import os
import re
import shutil
import subprocess
from pathlib import Path

REQUIRED_NODE = "^20.20.0 or >=22.22.0"
COMMON_NODE_DIRS = ["/opt/homebrew/bin", "/usr/local/bin"]

def _nvm_node_dirs():
    root = Path.home() / ".nvm" / "versions" / "node"
    if not root.exists():
        return []
    candidates = []
    for node_bin in root.glob("*/bin/node"):
        version = _node_version(str(node_bin))
        if version and _node_is_supported(version[1]):
            candidates.append((version[1], str(node_bin.parent)))
    return [path for _, path in sorted(candidates, reverse=True)]

def _node_version(node_cmd="node"):
    try:
        raw = subprocess.check_output([node_cmd, "--version"], text=True).strip()
    except (OSError, subprocess.CalledProcessError):
        return None
    match = re.match(r"v?(\d+)\.(\d+)\.(\d+)", raw)
    if not match:
        return None
    return raw, tuple(int(part) for part in match.groups())

def _node_is_supported(version_tuple):
    major, minor, patch = version_tuple
    return (major == 20 and minor >= 20) or (major >= 22)

def _prepend_path(path_dir):
    parts = os.environ.get("PATH", "").split(os.pathsep)
    parts = [p for p in parts if p and p != path_dir]
    os.environ["PATH"] = path_dir + os.pathsep + os.pathsep.join(parts)

def ensure_promptfoo_node_runtime():
    node_path = shutil.which("node")
    npm_path = shutil.which("npm")
    current = _node_version("node") if node_path else None

    if current and npm_path and _node_is_supported(current[1]):
        print(f"Node OK: {node_path} ({current[0]})")
        print(f"npm: {npm_path}")
        return

    for candidate_dir in [*_nvm_node_dirs(), *COMMON_NODE_DIRS]:
        candidate_node = Path(candidate_dir) / "node"
        candidate_npm = Path(candidate_dir) / "npm"
        if not candidate_node.exists() or not candidate_npm.exists():
            continue
        candidate = _node_version(str(candidate_node))
        if candidate and _node_is_supported(candidate[1]):
            _prepend_path(candidate_dir)
            print(f"Switched notebook PATH to supported Node: {candidate_node} ({candidate[0]})")
            print(f"npm: {candidate_npm}")
            return

    detected = current[0] if current else "not found"
    raise RuntimeError(
        "Promptfoo requires Node.js " + REQUIRED_NODE + ".\n"
        f"Detected Node: {detected}.\n\n"
        "Use an executable runtime with supported Node/npm before continuing.\n"
        "Examples:\n"
        "- Google Colab or Codespaces: run the notebook in that runtime and rerun this cell.\n"
        "- macOS nvm: `nvm install 22 && nvm use 22`, then start Jupyter from that terminal.\n"
        "- macOS Homebrew: `brew install node`, then start Jupyter from a terminal where the intended Node is first on PATH.\n"
        "- nvm: `nvm install 22 && nvm use 22`, then start Jupyter from that same shell.\n\n"
        "Static notebook preview in a browser cannot run Promptfoo evals."
    )

ensure_promptfoo_node_runtime()
```

---

### Publish SchemaFlow Core Runtime

Promptfoo runs the evaluated flow in a separate Python process. This cell writes a reusable Python module named:

```text
artifacts/promptfoo/schemaflow_cookbook_core.py
```

The generated module contains the same core SchemaFlow logic used by the notebook:

- Pydantic models
- Agents SDK setup
- output normalization helpers
- Parse Agent execution
- Impact Agent execution
- optional PDF vector store creation
- Plan Agent execution
- SQL Agent execution
- SQL validation
- parse-only eval entrypoint
- full-flow eval entrypoint

The prompt strings are injected from the current notebook variables. That means if you edit the Parse, Impact, Plan, or SQL prompts above and rerun this cell, the Promptfoo runtime receives the updated prompts.

````python
from pathlib import Path

CORE_MODULE_TEMPLATE = r'''
import json
import os
import re
from concurrent.futures import ThreadPoolExecutor
from datetime import datetime, timezone
from importlib.metadata import PackageNotFoundError, version
from pathlib import Path

from openai import OpenAI
from pydantic import BaseModel, ConfigDict, Field
from agents import Agent, AgentOutputSchema, FileSearchTool, Runner, RunConfig, custom_span, flush_traces, function_span, guardrail_span, trace

MODEL = os.getenv("OPENAI_MODEL", __MODEL_DEFAULT__)
PARSE_SYSTEM = __PARSE_SYSTEM__
IMPACT_SYSTEM = __IMPACT_SYSTEM__
PLAN_SYSTEM = __PLAN_SYSTEM__
SQL_SYSTEM = __SQL_SYSTEM__
MIN_AGENTS_SDK_VERSION = "0.17.0"
TRACE_INCLUDE_SENSITIVE_DATA = os.getenv("OPENAI_AGENTS_TRACE_INCLUDE_SENSITIVE_DATA", "false").lower() in {"1", "true", "yes", "on"}
SCHEMAFLOW_TRACE_GROUP_ID = os.getenv("SCHEMAFLOW_TRACE_GROUP_ID", "schemaflow-cookbook-promptfoo")

def _version_tuple(value):
    match = re.match(r"^(\d+)\.(\d+)\.(\d+)", str(value or ""))
    return tuple(int(part) for part in match.groups()) if match else (0, 0, 0)

try:
    AGENTS_SDK_VERSION = version("openai-agents")
except PackageNotFoundError as exc:
    raise RuntimeError('Install the OpenAI Agents SDK: pip install -U "openai-agents>=0.17.0"') from exc
if _version_tuple(AGENTS_SDK_VERSION) < _version_tuple(MIN_AGENTS_SDK_VERSION):
    raise RuntimeError(f"OpenAI Agents SDK {MIN_AGENTS_SDK_VERSION}+ is required; found {AGENTS_SDK_VERSION}.")

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

def _clean_openai_api_key(value):
    key = (value or "").strip()
    if not key:
        raise RuntimeError("OPENAI_API_KEY is required for SchemaFlow evals")
    return key

def _ensure_openai_api_key(api_key=None):
    if api_key is not None:
        os.environ["OPENAI_API_KEY"] = _clean_openai_api_key(api_key)
    else:
        os.environ["OPENAI_API_KEY"] = _clean_openai_api_key(os.getenv("OPENAI_API_KEY"))
    org_id = os.getenv("OPENAI_ORG_ID", "").strip()
    if org_id:
        os.environ["OPENAI_ORG_ID"] = org_id

def _get_client(api_key=None):
    _ensure_openai_api_key(api_key)
    return OpenAI(api_key=os.environ["OPENAI_API_KEY"])

def _parse_json_text(text):
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

def _trace_metadata(metadata=None):
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

def _schemaflow_run_config(workflow_name, metadata=None):
    return RunConfig(
        workflow_name=workflow_name,
        group_id=SCHEMAFLOW_TRACE_GROUP_ID,
        trace_include_sensitive_data=TRACE_INCLUDE_SENSITIVE_DATA,
        trace_metadata=_trace_metadata({"runtime": "promptfoo", **(metadata or {})}),
    )

def _runner_run_sync(agent, prompt, *, workflow_name, metadata=None, max_turns=4):
    kwargs = {"run_config": _schemaflow_run_config(workflow_name, metadata), "max_turns": max_turns}
    try:
        return Runner.run_sync(agent, prompt, **kwargs)
    except RuntimeError as exc:
        if "event loop" not in str(exc).lower():
            raise
        with ThreadPoolExecutor(max_workers=1) as pool:
            return pool.submit(lambda: Runner.run_sync(agent, prompt, **kwargs)).result()

def run_schemaflow_json_agent(*, name, instructions, prompt, output_schema, model=None, tools=None, workflow_name=None, metadata=None):
    agent = Agent(name=name, instructions=instructions, model=model or MODEL, output_type=output_schema, tools=tools or [])
    result = _runner_run_sync(agent, prompt, workflow_name=workflow_name or name, metadata={"agent": name, **(metadata or {})})
    return _agent_output_to_json(result.final_output), result

def run_schemaflow_text_agent(*, name, instructions, prompt, model=None, tools=None, workflow_name=None, metadata=None):
    agent = Agent(name=name, instructions=instructions, model=model or MODEL, tools=tools or [])
    result = _runner_run_sync(agent, prompt, workflow_name=workflow_name or name, metadata={"agent": name, **(metadata or {})})
    return _agent_output_to_text(result.final_output), result

def trace_function_result(name, *, input_obj=None, output_obj=None):
    with function_span(
        name,
        input=json.dumps(input_obj, ensure_ascii=False, default=str) if input_obj is not None else None,
        output=json.dumps(output_obj, ensure_ascii=False, default=str) if output_obj is not None else None,
    ):
        pass

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

def normalize_change(change_json):
    if not isinstance(change_json, dict):
        change_json = {}
    change_json.setdefault("title", None)
    change_json.setdefault("domain", None)
    change_json.setdefault("target_schema", None)
    change_json.setdefault("target_table", None)
    if not isinstance(change_json.get("operations"), list):
        change_json["operations"] = [change_json.get("operations")] if change_json.get("operations") else []
    if not isinstance(change_json.get("notes"), list):
        change_json["notes"] = []
    return change_json

def parse_change(change_text, model=None):
    change_json, _ = run_schemaflow_json_agent(
        name="SchemaFlow Parse Agent",
        instructions=PARSE_SYSTEM,
        prompt="Change Request:\n\n" + change_text,
        output_schema=CHANGE_OUTPUT_SCHEMA,
        model=model,
        workflow_name="SchemaFlow Eval Parse",
        metadata={"eval_stage": "parse"},
    )
    return normalize_change(change_json)

def run_schemaflow_parse(change_text, *, model=None, api_key=None):
    _ensure_openai_api_key(api_key)
    with custom_span("SchemaFlow Promptfoo Parse Eval", {"eval_mode": "parse_only", "group_id": SCHEMAFLOW_TRACE_GROUP_ID}):
        try:
            change_json = parse_change(change_text, model=model)
            bundle = {"eval_mode": "parse_only", "change_text": change_text, "change_json": change_json, "validation": {"valid": True, "issues": []}}
            trace_function_result("Promptfoo parse bundle", input_obj={"change_text": change_text}, output_obj=bundle)
            return bundle
        finally:
            flush_traces()

def normalize_impact(impact_json):
    if not isinstance(impact_json, dict):
        impact_json = {}
    impact_json.setdefault("impacted_objects", [])
    impact_json.setdefault("risks", [])
    impact_json.setdefault("assumptions", [])
    return impact_json

def normalize_plan(plan_json):
    if not isinstance(plan_json, dict):
        plan_json = {}
    plan_json.setdefault("plan_steps", [])
    plan_json.setdefault("prechecks", [])
    plan_json.setdefault("postchecks", [])
    plan_json.setdefault("rollback", [])
    return plan_json

def resolve_eval_pdf_path(pdf_path):
    requested = Path(pdf_path).expanduser()
    module_dir = Path(__file__).resolve().parent
    candidates = [requested]
    if not requested.is_absolute():
        candidates.extend([
            module_dir / requested,
            module_dir.parent / requested,
            module_dir.parent.parent / requested,
        ])
    resolved_candidates = []
    for candidate in candidates:
        resolved = candidate.resolve()
        if resolved in resolved_candidates:
            continue
        resolved_candidates.append(resolved)
        if resolved.exists():
            return resolved
    attempted = ", ".join(str(candidate) for candidate in resolved_candidates)
    raise FileNotFoundError(f"PDF not found: {pdf_path}. Tried: {attempted}")

def create_pdf_vector_store(client, pdf_path, name_prefix="schemaflow-cookbook"):
    pdf_path = resolve_eval_pdf_path(pdf_path)
    if pdf_path.suffix.lower() != ".pdf":
        raise ValueError(f"Expected a PDF file, got: {pdf_path}")
    with custom_span("Promptfoo create vector store", {"pdf_path": str(pdf_path)}):
        vector_store = client.vector_stores.create(name=f"{name_prefix}-{datetime.now(timezone.utc).strftime('%Y%m%dT%H%M%SZ')}", expires_after={"anchor": "last_active_at", "days": 1})
    with custom_span("Promptfoo upload PDF to vector store", {"vector_store_id": vector_store.id, "pdf_path": str(pdf_path)}):
        with pdf_path.open("rb") as handle:
            vector_store_file = client.vector_stores.files.upload_and_poll(vector_store_id=vector_store.id, file=handle)
    trace_function_result("Promptfoo vector store ready", input_obj={"pdf_path": str(pdf_path)}, output_obj={"vector_store_id": vector_store.id, "status": getattr(vector_store_file, "status", "unknown")})
    return vector_store, vector_store_file

def delete_vector_store(client, vector_store_id):
    if not vector_store_id:
        return
    try:
        with custom_span("Promptfoo delete vector store", {"vector_store_id": vector_store_id}):
            client.vector_stores.delete(vector_store_id=vector_store_id)
    except Exception:
        pass

def validate_sql(sql_text, required_keywords=None):
    issues = []
    if not (sql_text or "").strip():
        issues.append("SQL output is empty")
    for keyword in required_keywords or ["ALTER TABLE"]:
        if keyword.lower() not in (sql_text or "").lower():
            issues.append(f"Expected keyword missing: {keyword}")
    validation = {"valid": len(issues) == 0, "issues": issues}
    with guardrail_span("promptfoo_sql_validation", triggered=not validation["valid"]):
        trace_function_result("Promptfoo SQL validation", output_obj=validation)
    return validation

def run_schemaflow_case(change_text, *, pdf_path=None, rag_max_results=6, model=None, api_key=None, validation_keywords=None, delete_vector_store_after_run=True):
    client = _get_client(api_key=api_key)
    vector_store_id = None
    rag_file_search_results = []
    with custom_span("SchemaFlow Promptfoo Full Flow Eval", {"eval_mode": "full_flow", "pdf_path": pdf_path or "", "group_id": SCHEMAFLOW_TRACE_GROUP_ID}):
        try:
            change_json = parse_change(change_text, model=model)
            impact_user_parts = ["CHANGE_JSON:\n" + json.dumps(change_json, ensure_ascii=False)]
            impact_tools = []
            if pdf_path:
                vector_store, _ = create_pdf_vector_store(client, pdf_path, name_prefix="schemaflow-promptfoo")
                vector_store_id = vector_store.id
                impact_tools.append(FileSearchTool(vector_store_ids=[vector_store_id], max_num_results=rag_max_results, include_search_results=True))
                impact_user_parts.append("Use the file_search tool against the uploaded PDF to look for relevant IFD, schema, table, column, lineage, and downstream dependency context before returning JSON.")
            impact_json, impact_result = run_schemaflow_json_agent(name="SchemaFlow Impact Agent", instructions=IMPACT_SYSTEM, prompt="\n\n".join(impact_user_parts), output_schema=IMPACT_OUTPUT_SCHEMA, model=model, tools=impact_tools, workflow_name="SchemaFlow Eval Impact", metadata={"eval_stage": "impact", "rag_enabled": bool(vector_store_id)})
            impact_json = normalize_impact(impact_json)
            try:
                rag_file_search_results = _collect_file_search_results(impact_result)
            except Exception as exc:
                rag_file_search_results = []
                trace_function_result("Promptfoo File Search summary skipped", output_obj={"error": f"{type(exc).__name__}: {exc}"})
            plan_user = "\n\n".join(["CHANGE_JSON:\n" + json.dumps(change_json, ensure_ascii=False), "IMPACT_JSON:\n" + json.dumps(impact_json, ensure_ascii=False)])
            plan_json, _ = run_schemaflow_json_agent(name="SchemaFlow Plan Agent", instructions=PLAN_SYSTEM, prompt=plan_user, output_schema=PLAN_OUTPUT_SCHEMA, model=model, workflow_name="SchemaFlow Eval Plan", metadata={"eval_stage": "plan"})
            plan_json = normalize_plan(plan_json)
            sql_user = "\n\n".join(["CHANGE_JSON:\n" + json.dumps(change_json, ensure_ascii=False), "PLAN_JSON:\n" + json.dumps(plan_json, ensure_ascii=False)])
            sql_text, _ = run_schemaflow_text_agent(name="SchemaFlow SQL Agent", instructions=SQL_SYSTEM, prompt=sql_user, model=model, workflow_name="SchemaFlow Eval SQL", metadata={"eval_stage": "sql"})
            validation = validate_sql(sql_text, required_keywords=validation_keywords)
            bundle = {"summary": {"matched_tables": [], "impact_risks": impact_json.get("risks", []), "rag_hits": len(rag_file_search_results)}, "rag": {"enabled": bool(vector_store_id), "vector_store_id": vector_store_id, "hits": len(rag_file_search_results), "file_search_results": rag_file_search_results}, "change_json": change_json, "impact_json": impact_json, "plan": plan_json, "sql": sql_text, "validation": validation}
            trace_function_result("Promptfoo full-flow bundle", input_obj={"change_text": change_text}, output_obj=bundle)
            return bundle
        finally:
            if delete_vector_store_after_run:
                delete_vector_store(client, vector_store_id)
            flush_traces()
'''

core_module = (CORE_MODULE_TEMPLATE
    .replace("__MODEL_DEFAULT__", repr(MODEL))
    .replace("__PARSE_SYSTEM__", repr(PARSE_SYSTEM))
    .replace("__IMPACT_SYSTEM__", repr(IMPACT_SYSTEM))
    .replace("__PLAN_SYSTEM__", repr(PLAN_SYSTEM))
    .replace("__SQL_SYSTEM__", repr(SQL_SYSTEM)))
core_path = PROMPTFOO_DIR / "schemaflow_cookbook_core.py"
core_path.write_text(core_module, encoding="utf-8")
print("Published SchemaFlow core:", core_path.resolve())
````

---

### Promptfoo Provider Runtime

This cell writes the Promptfoo provider file:

```text
artifacts/promptfoo/schemaflow_cookbook_eval_provider.py
```

The provider is the bridge between Promptfoo and SchemaFlow.

For each Promptfoo test case, it reads variables such as:

- `change_text`
- `eval_mode`
- optional `pdf_path`
- optional `rag_max_results`
- validation keywords

Then it chooses one of two execution paths:

- `parse_only` runs only Stage 1 and returns a parse bundle.
- `full_flow` runs the complete SchemaFlow pipeline and returns the full bundle.

The provider returns JSON so Promptfoo assertions can inspect structured fields instead of parsing notebook text output.

```python
%%writefile artifacts/promptfoo/schemaflow_cookbook_eval_provider.py
import json
import os
from agents import flush_traces, function_span, trace
from schemaflow_cookbook_core import run_schemaflow_case, run_schemaflow_parse
SCHEMAFLOW_TRACE_GROUP_ID = os.getenv("SCHEMAFLOW_TRACE_GROUP_ID", "schemaflow-cookbook-promptfoo")

def _json_list(value):
    if value is None:
        return []
    if isinstance(value, list):
        return value
    try:
        parsed = json.loads(value)
    except Exception:
        return [value]
    return parsed if isinstance(parsed, list) else [parsed]

def _trace_function_result(name, *, input_obj=None, output_obj=None):
    with function_span(name, input=json.dumps(input_obj, ensure_ascii=False, default=str) if input_obj is not None else None, output=json.dumps(output_obj, ensure_ascii=False, default=str) if output_obj is not None else None):
        pass

def call_api(prompt, options, context):
    vars_ = (context or {}).get("vars", {})
    change_text = vars_.get("change_text") or prompt
    eval_mode = vars_.get("eval_mode", "full_flow")
    with trace("SchemaFlow Promptfoo Provider", group_id=SCHEMAFLOW_TRACE_GROUP_ID, metadata={"eval_mode": eval_mode}):
        try:
            if eval_mode == "parse_only":
                bundle = run_schemaflow_parse(change_text)
            elif eval_mode == "full_flow":
                bundle = run_schemaflow_case(change_text, pdf_path=vars_.get("pdf_path"), rag_max_results=int(vars_.get("rag_max_results") or 6), validation_keywords=_json_list(vars_.get("validation_keywords_json")))
                bundle["eval_mode"] = "full_flow"
            else:
                raise ValueError(f"Unsupported eval_mode: {eval_mode}")
            _trace_function_result("Promptfoo provider output", input_obj={"eval_mode": eval_mode, "change_text": change_text, "vars": vars_}, output_obj=bundle)
            return {"output": json.dumps(bundle, ensure_ascii=False)}
        finally:
            flush_traces()
```

---

### Promptfoo Assertion Runtime

This cell writes the Promptfoo assertion file:

```text
artifacts/promptfoo/schemaflow_cookbook_eval_assert.py
```

The assertion file validates provider output for both eval modes.

For `parse_only`, it checks:

- output is valid JSON
- target schema and table match expectations
- at least one parsed operation is present
- expected added column appears in parsed operations
- expected data type appears structurally in parsed operations

For `full_flow`, it checks:

- output is valid JSON
- target schema and table match expectations
- at least one parsed operation is present
- impact risks are present
- required SQL terms are present
- validation passed

The assertion also emits guardrail spans so eval failures are visible in traces.

```python
%%writefile artifacts/promptfoo/schemaflow_cookbook_eval_assert.py
import json
import os
import re
from agents import flush_traces, function_span, guardrail_span, trace
SCHEMAFLOW_TRACE_GROUP_ID = os.getenv("SCHEMAFLOW_TRACE_GROUP_ID", "schemaflow-cookbook-promptfoo")

def _json_list(value):
    if value is None:
        return []
    if isinstance(value, list):
        return value
    try:
        parsed = json.loads(value)
    except Exception:
        return [value]
    return parsed if isinstance(parsed, list) else [parsed]

def _normalize_name(value):
    return (value or "").replace('"', "").replace("'", "").strip().upper()

def _normalize_text(value):
    return " ".join(str(value or "").upper().replace('"', "").replace("'", "").split())

def _compact_text(value):
    return re.sub(r"\s+", "", _normalize_text(value))

def _operation_text(bundle):
    operations = bundle.get("change_json", {}).get("operations", [])
    return _normalize_text(json.dumps(operations, ensure_ascii=False))

def _trace_function_result(name, *, input_obj=None, output_obj=None):
    with function_span(name, input=json.dumps(input_obj, ensure_ascii=False, default=str) if input_obj is not None else None, output=json.dumps(output_obj, ensure_ascii=False, default=str) if output_obj is not None else None):
        pass

def _check_target(bundle, expected_schema, expected_table):
    if not expected_schema or not expected_table:
        return True, "target expectation not configured"
    change = bundle.get("change_json", {})
    actual_schema = _normalize_name(change.get("target_schema"))
    actual_table = _normalize_name(change.get("target_table"))
    return actual_schema == _normalize_name(expected_schema) and actual_table == _normalize_name(expected_table), f"expected target {_normalize_name(expected_schema)}.{_normalize_name(expected_table)}, got {actual_schema}.{actual_table}"

def _check_expected_text(bundle, value, label):
    if not value:
        return True, f"{label} expectation not configured"
    haystack = _operation_text(bundle)
    needle = _normalize_text(value)
    return needle in haystack, f"expected parsed {label} {needle} in operations"

def _check_expected_data_type(bundle, value):
    if not value:
        return True, "data type expectation not configured"
    haystack = _operation_text(bundle)
    compact_haystack = _compact_text(haystack)
    compact_needle = _compact_text(value)
    if compact_needle in compact_haystack:
        return True, "data type matched"
    match = re.match(r"([A-Z]+)\(?([0-9,]*)\)?", compact_needle)
    if not match:
        return False, f"expected parsed data type {value} in operations"
    base_type, size = match.groups()
    if base_type and base_type not in compact_haystack:
        return False, f"expected parsed data type base {base_type} in operations"
    if size:
        missing_sizes = [part for part in size.split(",") if part and part not in compact_haystack]
        if missing_sizes:
            return False, f"expected parsed data type size {size} in operations"
    return True, "data type matched structurally"

def get_assert(output, context):
    vars_ = (context or {}).get("vars", {})
    eval_mode = vars_.get("eval_mode", "full_flow")
    with trace("SchemaFlow Promptfoo Assertion", group_id=SCHEMAFLOW_TRACE_GROUP_ID, metadata={"eval_mode": eval_mode}):
        try:
            try:
                bundle = json.loads(output)
            except Exception as exc:
                result = {"pass": False, "score": 0, "reason": f"Provider output was not JSON: {exc}"}
                with guardrail_span("provider_output_json", triggered=True):
                    _trace_function_result("Promptfoo assertion parse failure", input_obj={"output": output}, output_obj=result)
                return result
            checks = []
            ok, reason = _check_target(bundle, vars_.get("expected_schema"), vars_.get("expected_table"))
            checks.append(("target_matches_expected", ok, reason))
            operations = bundle.get("change_json", {}).get("operations", [])
            checks.append(("parsed_operation_present", isinstance(operations, list) and len(operations) > 0, "expected at least one parsed operation"))
            if eval_mode == "parse_only":
                ok, reason = _check_expected_text(bundle, vars_.get("expected_added_column"), "added column")
                checks.append(("expected_added_column", ok, reason))
                ok, reason = _check_expected_data_type(bundle, vars_.get("expected_data_type"))
                checks.append(("expected_data_type", ok, reason))
            else:
                risks = bundle.get("impact_json", {}).get("risks", [])
                checks.append(("impact_risks_present", isinstance(risks, list) and len(risks) > 0, "expected at least one impact risk"))
                sql_text = bundle.get("sql") or bundle.get("sql_text") or ""
                missing_terms = [term for term in _json_list(vars_.get("sql_terms_json")) if term.lower() not in sql_text.lower()]
                checks.append(("sql_terms_present", not missing_terms, "missing SQL terms: " + ", ".join(missing_terms)))
                validation = bundle.get("validation", {})
                checks.append(("validation_passed", bool(validation.get("valid")), "validation issues: " + "; ".join(validation.get("issues", []))))
            for name, ok, reason in checks:
                with guardrail_span(name, triggered=not ok):
                    _trace_function_result("Promptfoo assertion check", output_obj={"name": name, "ok": ok, "reason": reason})
            passed = [ok for _, ok, _ in checks if ok]
            failures = [reason for _, ok, reason in checks if not ok]
            score = len(passed) / len(checks) if checks else 0
            result = {"pass": score == 1, "score": score, "reason": "All checks passed" if not failures else "; ".join(failures)}
            _trace_function_result("Promptfoo assertion result", input_obj={"vars": vars_}, output_obj=result)
            return result
        finally:
            flush_traces()
```

---

### Build Promptfoo Test Cases and Config

This cell builds Promptfoo test cases from the current notebook input.

By default, it creates two test cases from the current `CHANGE_TEXT`, carrying through `PDF_PATH` when a PDF is configured:

1. a parse-only test
2. a full-flow test

The helper functions infer expectations from the change request, including:

- expected schema
- expected table
- expected added column
- expected data type
- expected SQL terms
- expected validation keywords

The cell also includes optional regression fixtures. Set:

```python
RUN_EXTRA_REGRESSION_CASES = True
```

to add those extra cases to the generated config.

Before writing `promptfooconfig.yaml`, the cell runs deterministic input preflight checks. This prevents obviously malformed eval inputs from producing confusing Promptfoo failures.

```python
import json
import re
import sys
from pathlib import Path

def infer_eval_expectations(change_text):
    target_match = re.search(
        r"\b(?:to|from|in|on)\s+([A-Za-z_][\w$]*)\.([A-Za-z_][\w$]*)",
        change_text,
        flags=re.IGNORECASE,
    )
    column_type_match = re.search(
        r"\badd\s+([A-Za-z_][\w$]*)\s+((?:VAR)?CHAR\s*\([^)]*\)|TEXT|INTEGER|INT|BIGINT|BOOLEAN|DATE|TIMESTAMP|NUMERIC\s*\([^)]*\)|DECIMAL\s*\([^)]*\)|FLOAT|DOUBLE)",
        change_text,
        flags=re.IGNORECASE,
    )

    expected_schema = target_match.group(1).upper() if target_match else None
    expected_table = target_match.group(2).upper() if target_match else None
    added_column = column_type_match.group(1).upper() if column_type_match else None
    data_type = " ".join(column_type_match.group(2).upper().split()) if column_type_match else None

    sql_terms = []
    validation_keywords = ["ALTER TABLE"]
    if expected_table:
        sql_terms.append(expected_table)
    if added_column:
        sql_terms.append(added_column)
    if data_type:
        sql_terms.append(data_type)
    sql_terms.append("ALTER TABLE")

    lower_text = change_text.lower()
    if any(term in lower_text for term in ["backfill", "update", "source it from"]):
        sql_terms.append("UPDATE")
        validation_keywords.append("UPDATE")
    if "index" in lower_text:
        sql_terms.append("CREATE INDEX")
        validation_keywords.append("CREATE INDEX")

    return {
        "expected_schema": expected_schema,
        "expected_table": expected_table,
        "expected_added_column": added_column,
        "expected_data_type": data_type,
        "sql_terms": list(dict.fromkeys(sql_terms)),
        "validation_keywords": list(dict.fromkeys(validation_keywords)),
    }

def build_eval_case(description, change_text, **overrides):
    expectations = infer_eval_expectations(change_text)
    vars_ = {
        "change_text": change_text,
        "sql_terms_json": json.dumps(expectations["sql_terms"], ensure_ascii=False),
        "validation_keywords_json": json.dumps(expectations["validation_keywords"], ensure_ascii=False),
    }
    for key in ["expected_schema", "expected_table", "expected_added_column", "expected_data_type"]:
        if expectations.get(key):
            vars_[key] = expectations[key]
    vars_.update({k: v for k, v in overrides.items() if v is not None})
    return {"description": description, "vars": vars_}

def _json_list(value):
    if value is None:
        return []
    if isinstance(value, list):
        return value
    parsed = json.loads(value)
    return parsed if isinstance(parsed, list) else [parsed]

def preflight_eval_case(case):
    vars_ = case["vars"]
    errors = []
    warnings = []
    change_text = vars_.get("change_text", "")
    sql_terms = _json_list(vars_.get("sql_terms_json"))

    if len(change_text.strip()) < 20:
        errors.append("change_text is missing or too short")
    if not vars_.get("expected_schema") or not vars_.get("expected_table"):
        errors.append("could not infer target schema/table")
    if not vars_.get("expected_added_column"):
        warnings.append("could not infer added column")
    if not vars_.get("expected_data_type"):
        warnings.append("could not infer added column data type")
    if len(sql_terms) <= 1:
        warnings.append("few SQL terms inferred")
    if vars_.get("pdf_path"):
        pdf_path = Path(vars_["pdf_path"]).expanduser()
        if not pdf_path.exists():
            errors.append(f"pdf_path does not exist: {pdf_path}")
        elif pdf_path.suffix.lower() != ".pdf":
            errors.append(f"pdf_path is not a PDF: {pdf_path}")

    return {"description": case["description"], "errors": errors, "warnings": warnings}

def as_promptfoo_test(case, eval_mode):
    vars_ = dict(case["vars"])
    vars_["eval_mode"] = eval_mode
    label = "Parse-only" if eval_mode == "parse_only" else "Full flow"
    return {"description": f"{label}: {case['description']}", "vars": vars_}

CURRENT_NOTEBOOK_EVAL_CASE = build_eval_case(
    "Current notebook change request",
    CHANGE_TEXT,
    pdf_path=str(Path(PDF_PATH).expanduser().resolve()) if PDF_PATH else None,
)

RUN_EXTRA_REGRESSION_CASES = False

EXTRA_REGRESSION_CASES = [
    build_eval_case(
        "Product style color propagation",
        """Add COLOR_CODE VARCHAR(10) to ODS.ODS_PLIM_STYLE as nullable.
Source it from FLEX.STYLE.COLOR_CODE when available and propagate the field through staging and mart outputs used by product reporting.""",
    ),
    build_eval_case(
        "Optional customer note field",
        """Add CUSTOMER_SEGMENT_NOTE VARCHAR(255) to ODS.ODS_CUSTOMER_PROFILE as nullable.
No historical backfill is required. The field is optional metadata for analyst annotations and should not block existing loads.""",
    ),
]

ADDITIONAL_EVAL_CASES = EXTRA_REGRESSION_CASES if RUN_EXTRA_REGRESSION_CASES else []
INPUT_EVAL_CASES = [CURRENT_NOTEBOOK_EVAL_CASE, *ADDITIONAL_EVAL_CASES]
INPUT_PREFLIGHT_RESULTS = [preflight_eval_case(case) for case in INPUT_EVAL_CASES]
INPUT_PREFLIGHT_ERRORS = [
    f"{result['description']}: {error}"
    for result in INPUT_PREFLIGHT_RESULTS
    for error in result["errors"]
]

print("Input preflight:")
for result in INPUT_PREFLIGHT_RESULTS:
    status = "PASS" if not result["errors"] else "FAIL"
    print(f"- {status}: {result['description']}")
    for warning in result["warnings"]:
        print(f"  warning: {warning}")
    for error in result["errors"]:
        print(f"  error: {error}")
if INPUT_PREFLIGHT_ERRORS:
    raise ValueError("Input preflight failed:\n" + "\n".join(INPUT_PREFLIGHT_ERRORS))

PROMPTFOO_PARSE_EVAL_CASES = [as_promptfoo_test(case, "parse_only") for case in INPUT_EVAL_CASES]
PROMPTFOO_FULL_FLOW_EVAL_CASES = [as_promptfoo_test(case, "full_flow") for case in INPUT_EVAL_CASES]
PROMPTFOO_EVAL_CASES = [*PROMPTFOO_PARSE_EVAL_CASES, *PROMPTFOO_FULL_FLOW_EVAL_CASES]

promptfoo_config = {
    "description": "SchemaFlow cookbook evals",
    "prompts": ["{{change_text}}"],
    "providers": [{
        "id": "file://schemaflow_cookbook_eval_provider.py",
        "config": {"pythonExecutable": sys.executable},
    }],
    "defaultTest": {
        "assert": [{
            "type": "python",
            "value": "file://schemaflow_cookbook_eval_assert.py",
        }],
    },
    "tests": PROMPTFOO_EVAL_CASES,
}

config_path = PROMPTFOO_DIR / "promptfooconfig.yaml"
config_text = "# yaml-language-server: $schema=https://promptfoo.dev/config-schema.json\n" + json.dumps(
    promptfoo_config,
    indent=2,
    ensure_ascii=False,
)
config_path.write_text(config_text, encoding="utf-8")

print("Promptfoo config:", config_path.resolve())
print("Promptfoo Python executable:", sys.executable)
print("Promptfoo eval cases:", len(PROMPTFOO_EVAL_CASES))
for case in PROMPTFOO_EVAL_CASES:
    vars_ = case["vars"]
    target = ".".join(part for part in [vars_.get("expected_schema"), vars_.get("expected_table")] if part)
    print("-", case["description"], "->", target or "target not inferred")
```

---

### Run Promptfoo Eval

This cell runs Promptfoo non-interactively from the notebook.

The command:

- runs from `artifacts/promptfoo/`
- uses the generated `promptfooconfig.yaml`
- uses notebook-local Promptfoo config, cache, logs, and npm cache
- runs with concurrency `1` for predictable notebook behavior
- keeps CLI output visible in the notebook
- writes timestamped JSON and HTML reports
- refreshes latest-result aliases after a successful run

The exported result files are saved under:

```text
artifacts/promptfoo/results/
```

If the Node.js/npm runtime check failed earlier, fix the runtime before running this cell.

```python
%%bash
set -euo pipefail
cd artifacts/promptfoo
export PROMPTFOO_CONFIG_DIR="$PWD/.promptfoo"
export PROMPTFOO_LOG_DIR="$PWD/.promptfoo/logs"
export PROMPTFOO_CACHE_PATH="$PWD/.promptfoo/cache"
export npm_config_cache="$PWD/.npm-cache"
export npm_config_update_notifier=false
export npm_config_loglevel=error
export SCHEMAFLOW_TRACE_GROUP_ID="${SCHEMAFLOW_TRACE_GROUP_ID:-schemaflow-cookbook-promptfoo}"
export OPENAI_AGENTS_TRACE_INCLUDE_SENSITIVE_DATA="${OPENAI_AGENTS_TRACE_INCLUDE_SENSITIVE_DATA:-false}"
mkdir -p "$PROMPTFOO_LOG_DIR" "$PROMPTFOO_CACHE_PATH" results
RUN_ID="$(date -u +%Y%m%dT%H%M%SZ)"
RESULT_JSON="results/schemaflow_cookbook_eval_${RUN_ID}.json"
RESULT_HTML="results/schemaflow_cookbook_eval_${RUN_ID}.html"
npx --yes promptfoo@latest eval \
  -c promptfooconfig.yaml \
  --max-concurrency 1 \
  --no-progress-bar \
  --description "SchemaFlow cookbook eval ${RUN_ID}" \
  -o "$RESULT_JSON" "$RESULT_HTML"
cp "$RESULT_JSON" results/schemaflow_cookbook_eval_latest.json
cp "$RESULT_HTML" results/schemaflow_cookbook_eval_latest.html
printf '\nSaved Promptfoo results:\n  %s\n  %s\n' "$RESULT_JSON" "$RESULT_HTML"
printf 'Latest aliases:\n  %s\n  %s\n' "results/schemaflow_cookbook_eval_latest.json" "results/schemaflow_cookbook_eval_latest.html"
printf 'Trace group:\n  %s\n' "$SCHEMAFLOW_TRACE_GROUP_ID"
```

---

### Review Latest Promptfoo Results

This cell checks whether the latest Promptfoo result aliases exist and prints their paths and sizes.

Expected files:

```text
artifacts/promptfoo/results/schemaflow_cookbook_eval_latest.json
artifacts/promptfoo/results/schemaflow_cookbook_eval_latest.html
```

If the latest JSON file exists, the cell also prints available eval metadata such as the eval ID and aggregate stats.

Use this section as a quick confirmation that the eval completed and exported artifacts successfully.

```python
from pathlib import Path
import json

results_dir = Path("artifacts/promptfoo/results")
latest_json = results_dir / "schemaflow_cookbook_eval_latest.json"
latest_html = results_dir / "schemaflow_cookbook_eval_latest.html"

for path in (latest_json, latest_html):
    if path.exists():
        print(f"{path.name}: {path.resolve()} ({path.stat().st_size:,} bytes)")
    else:
        print(f"Missing expected Promptfoo result: {path.resolve()}")

if latest_json.exists():
    data = json.loads(latest_json.read_text())
    eval_id = data.get("evalId")
    results = data.get("results", {})
    stats = results.get("stats", {}) if isinstance(results, dict) else {}
    if eval_id:
        print("Eval ID:", eval_id)
    if stats:
        print("Stats:", stats)
```
