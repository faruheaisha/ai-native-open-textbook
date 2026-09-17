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
pageSha256: "f41f7b84c0e6ee6f3c14000df90ade3d0b1f6b4b78d3895cd69d6f0ce35df8f5"
contentMode: "local-full"
zh: ""
---

## Execution Workflow

Run the notebook in order.

### Core Workflow

1. **Environment Setup**
   - Imports dependencies.
   - Verifies the OpenAI Agents SDK version.
   - Reads `OPENAI_API_KEY`.
   - Configures tracing and model selection.

2. **Input**
   - Defines `CHANGE_TEXT`.
   - This is the only required business input for the core workflow.

3. **Optional PDF RAG Context**
   - Leave `PDF_PATH = None` to run without retrieval.
   - Set `PDF_PATH` to a local PDF to enable File Search context for impact analysis.

4. **Stages 1-2**
   - Parse the change request.
   - Analyze impact.
   - Optionally use File Search during impact analysis.

5. **Stages 1-2 Guardrails**
   - Confirm parse output is well-formed.
   - Confirm impact output includes the target.
   - Confirm impacted objects contain required fields.

6. **Stages 3-4**
   - Generate an execution plan.
   - Generate SQL across landing, staging, core, and mart layers.

7. **Stages 3-4 Guardrails**
   - Confirm plan sections are populated.
   - Confirm data type propagation.
   - Confirm nullability behavior matches the request.

8. **Stage 5 SQL Sanity Checks**
   - Check for empty SQL.
   - Check expected target table and columns.
   - Check required SQL actions implied by the request.

9. **Final Bundle and Artifact**
   - Assemble the full output bundle.
   - Save it as JSON.
   - Verify the artifact round-trips successfully.

### Optional Eval Workflow

10. **Pre-Promptfoo Checks**
    - Confirm the notebook state is ready for evals.

11. **Promptfoo Runtime Generation**
    - Create a reusable SchemaFlow core module.
    - Write a Promptfoo provider.
    - Write a Promptfoo assertion file.
    - Generate Promptfoo test cases and config.

12. **Promptfoo Eval Execution**
    - Run parse-only and full-flow evals.
    - Save timestamped JSON and HTML reports.
    - Refresh `schemaflow_cookbook_eval_latest.*` aliases.
