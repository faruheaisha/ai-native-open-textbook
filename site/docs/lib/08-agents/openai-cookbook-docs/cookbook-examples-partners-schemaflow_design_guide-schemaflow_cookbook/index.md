---
title: "SchemaFlow: Agentic Database Change Impact Analysis, SQL Generation, and Eval Guardrails"
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
pageSha256: "0ff8e1e7bdba137a071c09ae1ded688ca4c553c4e6d5ae044f7ad90dc9d61003"
contentMode: "local-full"
zh: ""
---

# SchemaFlow: Agentic Database Change Impact Analysis, SQL Generation, and Eval Guardrails

> For the complete documentation index, see [llms.txt](https://developers.openai.com/llms.txt). Markdown versions of documentation pages are available by appending `.md` to the page URL.

---

This cookbook walks through an end-to-end **AI-assisted database change workflow** using the OpenAI Agents SDK. 

It demonstrates how OpenAI’s tooling ecosystem can be applied to orchestrate complex, data-intensive workflows across modern enterprise infrastructures. While the current implementation focuses on a retail-oriented schema change and impact-analysis use case, the underlying architectural patterns are domain-agnostic and extensible. The same workflow design can be adapted across industries such as manufacturing, pharmaceuticals, healthcare, logistics, finance, and supply chain operations — wherever structured data workflows, operational reasoning, retrieval-augmented analysis, and automated validation are required.

The running example is a retail loyalty-tier change, but the same pattern applies to many database-change requests where teams need traceable impact analysis and reviewable implementation output.

The workflow starts from a natural-language database change request, converts it into structured JSON, optionally grounds impact analysis with PDF-based File Search context, generates a safe rollout plan, drafts SQL across data platform layers, validates the output with deterministic guardrails, saves a reusable artifact, and optionally evaluates the flow with Promptfoo.

The notebook is intentionally self-contained: all core workflow logic, prompts, guardrails, artifact generation, and eval runtime files are created from notebook cells.

---

## 本篇目录

- [Overview](https://developers.openai.com/cookbook)
- [Why This Matters](https://developers.openai.com/cookbook)
- [Key Benefits](https://developers.openai.com/cookbook)
- [What You'll Build](https://developers.openai.com/cookbook)
- [Introduction: Use Case and Solution](https://developers.openai.com/cookbook)
- [Workflow Overview](https://developers.openai.com/cookbook)
- [Table of Contents](https://developers.openai.com/cookbook)
- [Architecture - Design Patterns](https://developers.openai.com/cookbook)
- [System Design](https://developers.openai.com/cookbook)
- [Execution Workflow](https://developers.openai.com/cookbook)
- [1) Environment Setup](https://developers.openai.com/cookbook)
- [2) Input](https://developers.openai.com/cookbook)
- [3) Optional PDF RAG Context](https://developers.openai.com/cookbook)
- [4) Stages 1-2 - Parse Change Request + Impact Analysis](https://developers.openai.com/cookbook)
- [5) Stages 3-4 - Execution Plan + SQL Generation](https://developers.openai.com/cookbook)
- [6) Stage 5 - Lightweight SQL Sanity Checks](https://developers.openai.com/cookbook)
- [7) Final Bundle](https://developers.openai.com/cookbook)
- [8) Save Artifact](https://developers.openai.com/cookbook)
- [9) Optional Cleanup](https://developers.openai.com/cookbook)
- [10) Evaluate the Flow with Promptfoo](https://developers.openai.com/cookbook)
- [11) Optional Neo4j Knowledge Graph & Dashboard](https://developers.openai.com/cookbook)
- [Notes, Assumptions, and Extension Points](https://developers.openai.com/cookbook)
- [Contributors](https://developers.openai.com/cookbook)
