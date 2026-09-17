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
pageSha256: "129a959f766ad4f1960b81710a77faeedec390730c62f9317efa289f2eabaae3"
contentMode: "local-full"
zh: ""
---

## Table of Contents

### Conceptual Guide

- [Overview](#overview)
- [Why This Matters](#why-this-matters)
- [Key Benefits](#key-benefits)
- [What You'll Build](#what-youll-build)
- [Introduction: Use Case and Solution](#introduction-use-case-and-solution)
- [Workflow Overview](#workflow-overview)
- [Architecture - Design Patterns](#architecture-design-patterns)
- [System Design](#system-design)
- [Execution Workflow](#execution-workflow)

### Notebook Implementation

1. [Environment Setup](#environment-setup)
2. [Input](#input)
3. [Optional PDF RAG Context](#optional-pdf-rag-context)
4. [Stages 1-2: Parse Change Request + Impact Analysis](#stages-1-2-parse-change-request--impact-analysis)
   - [Impact Dashboard Preview](#impact-dashboard-preview)
   - [Stages 1-2 Output Guardrails](#stages-1-2-output-guardrails)
5. [Stages 3-4: Execution Plan + SQL Generation](#stages-3-4-execution-plan--sql-generation)
   - [Stages 3-4 Output Guardrails](#stages-3-4-output-guardrails)
6. [Stage 5: Lightweight SQL Sanity Checks](#stage-5-lightweight-sql-sanity-checks)
7. [Final Bundle](#final-bundle)
8. [Save Artifact](#save-artifact)
   - [Post-Artifact Generation Sanity Check](#post-artifact-generation-sanity-check)
9. [Optional Cleanup](#optional-cleanup)
   - [Pre-Promptfoo Checks / Guardrails](#pre-promptfoo-checks--guardrails)
10. [Evaluate the Flow with Promptfoo](#evaluate-the-flow-with-promptfoo)
    - [Promptfoo Runtime Directory Setup](#promptfoo-runtime-directory-setup)
    - [Node.js and npm Runtime Check](#nodejs-and-npm-runtime-check)
    - [Publish SchemaFlow Core Runtime](#publish-schemaflow-core-runtime)
    - [Promptfoo Provider Runtime](#promptfoo-provider-runtime)
    - [Promptfoo Assertion Runtime](#promptfoo-assertion-runtime)
    - [Build Promptfoo Test Cases and Config](#build-promptfoo-test-cases-and-config)
    - [Run Promptfoo Eval](#run-promptfoo-eval)
    - [Review Latest Promptfoo Results](#review-latest-promptfoo-results)

### Reference

- [Notes, Assumptions, and Extension Points](#notes-assumptions-and-extension-points)
