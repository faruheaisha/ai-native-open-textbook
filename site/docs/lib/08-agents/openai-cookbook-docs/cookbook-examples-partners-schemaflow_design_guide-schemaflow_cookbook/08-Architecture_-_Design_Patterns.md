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
pageSha256: "ae38dee33e8818f733591fc9330629fc4e02c6480ae8799d3cd1ed61083f31fd"
contentMode: "local-full"
zh: ""
---

## Architecture - Design Patterns

SchemaFlow uses a staged, contract-driven agent architecture. The goal is to avoid treating the model as a single black-box SQL generator. Instead, each stage has a narrow responsibility and produces an output that can be inspected, validated, traced, and reused.

### 1. Agent Specialization

Each agent performs one primary task:

| Agent | Responsibility | Main Output |
|---|---|---|
| Parse Agent | Extract structured fields from the natural-language request | `change_json` |
| Impact Agent | Identify affected objects, assumptions, and risks | `impact_json` |
| Plan Agent | Convert the change and impact into rollout steps | `plan_json` |
| SQL Agent | Draft SQL across data platform layers | `sql_text` |

This specialization makes the workflow easier to debug. If SQL is missing a column, you can inspect whether the issue started in parsing, impact analysis, planning, or SQL generation.

### 2. Typed Output Contracts

The notebook defines Pydantic models for the structured stages:

- `ChangeRequestModel`
- `ImpactModel`
- `PlanModel`

Those models are wrapped with `AgentOutputSchema` so the Agents SDK knows the expected output shape. The workflow also normalizes outputs after model calls to ensure expected keys exist before downstream stages run.

### 3. Retrieval-Augmented Impact Analysis

The PDF RAG section is optional. When `PDF_PATH` is set, the notebook:

1. Creates an OpenAI vector store.
2. Uploads the PDF.
3. Lets OpenAI parse, chunk, embed, and index it.
4. Gives the Impact Agent a `FileSearchTool`.
5. Captures a summary of returned File Search results.

This is useful when the change request needs grounding in an IFD, schema document, lineage file, data contract, or architecture reference.

### 4. Guardrail Gates Between Stages

The notebook adds deterministic checks after major stages:

- Stages 1-2 guardrails validate parse and impact outputs.
- Stages 3-4 guardrails validate plan completeness, data type propagation, and nullability handling.
- Stage 5 SQL checks validate expected table, column, and SQL keyword presence.
- Post-artifact checks verify the saved JSON artifact exists and round-trips.
- Pre-Promptfoo checks verify the notebook state is ready for evals.

These checks do not replace human review, but they catch common silent failures early.

### 5. Artifact-Centered Execution

The final bundle is the main workflow artifact. It captures the state needed to review or debug the run:

```text
bundle = {
  "summary": ...,
  "rag": ...,
  "change_json": ...,
  "impact_json": ...,
  "plan": ...,
  "sql": ...,
  "validation": ...
}
```

The notebook saves this bundle under `artifacts/notebook_runs/`.

### 6. Eval Runtime Generated from Notebook State

Promptfoo runs in a separate process, so it cannot directly read variables from the active notebook kernel. To solve this, Section 10 writes a small reusable Python module and Promptfoo runtime files from the current notebook state.

This ensures that prompt edits, `CHANGE_TEXT` edits, and model configuration changes are reflected when the eval files are regenerated.
