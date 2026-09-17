---
title: "Automating Code Quality and Security Fixes with Codex CLI in GitLab"
sourceId: "08-agents/openai-cookbook-docs"
sourceTitle: "openai-cookbook-docs"
sourceKind: "官方文档"
licenseLabel: "仅引用"
lang: "英文"
tier: 3
volume: "08-agents"
sourceUrl: "https://developers.openai.com/cookbook"
entryUrl: "https://developers.openai.com/cookbook"
sourceRel: "cookbook/examples/codex/secure_quality_gitlab.md"
rawUrl: "/raw/08-agents/openai-cookbook-docs/cookbook/examples/codex/secure_quality_gitlab.md"
sourceSha256: "9c9fe860d0c33da39c2794b4c3eb7f0ffa1b1bef857e6e23825ebd4d541399df"
pageSha256: "9c9fe860d0c33da39c2794b4c3eb7f0ffa1b1bef857e6e23825ebd4d541399df"
contentMode: "local-full"
zh: ""
---

# Automating Code Quality and Security Fixes with Codex CLI in GitLab

> For the complete documentation index, see [llms.txt](https://developers.openai.com/llms.txt). Markdown versions of documentation pages are available by appending `.md` to the page URL.

> **Update note — review the current guidance before using these examples.** The `--full-auto` flag used below is deprecated. Do not treat a failed Codex run or invalid output as an empty findings result. For general Codex automation, see [Non-interactive mode](https://learn.chatgpt.com/docs/non-interactive-mode). For dedicated Codex Security scanning and remediation, use the maintained [GitLab CI/CD guide](https://learn.chatgpt.com/docs/security/cli/ci/gitlab). That workflow differs from this article's code-quality analysis and interpretation of existing SAST results; the examples below have not been migrated to it.

## Introduction

When deploying production code, most teams rely on CI/CD pipelines to validate changes before merging. Reviewers typically look at unit test results, vulnerability scans, and code quality reports. Traditionally, these are produced by rule-based engines that catch known issues but often miss contextual or higher-order problems—while leaving developers with noisy results that are hard to prioritize or act on.

With LLMs, you can add a new layer of intelligence to this process: reasoning about code quality and interpreting security findings. By augmenting your GitLab pipelines with **OpenAI’s Codex CLI**, teams gain insights that go beyond static rules:

* **Code Quality** → Generate GitLab-compliant CodeClimate JSON reports that surface contextual issues directly in merge requests.

* **Security** → Post-process existing SAST results to consolidate duplicates, rank issues by exploitability, and provide clear, actionable remediation steps.

This guide shows how to integrate Codex CLI into a GitLab pipeline for both use cases—delivering structured, machine-readable reports alongside actionable, human-readable guidance.

## What is Codex CLI?

Codex CLI is an open-source command-line tool for bringing OpenAI’s reasoning models into your development workflow. For installation, usage, and full documentation, refer to the official repository: [github.com/openai/codex](https://github.com/openai/codex?utm_source=chatgpt.com).

In this cookbook, we’ll use **Full Auto mode** in an ephemeral GitLab runner to generate a standards-compliant JSON report.

### Pre-requisites

To follow along, you’ll need:

* A GitLab account and project  
* A GitLab runner with **internet access** (we’ve tested this on a Linux runner with 2 vCPUs, 8GB memory and 30GB of storage)  
* Runner must be able to connect to  `api.openai.com`  
* An **OpenAI API key** (`OPENAI_API_KEY`)  
* GitLab CI/CD variables configured under **Settings → CI/CD → Variables**

## Example #1 - Using Codex CLI to Produce a Code Quality Report

### Background

This repository is a deliberately vulnerable Node.js Express demo app based on [GitLab's node express template](https://gitlab.com/gitlab-org/project-templates/express/-/tree/main), built to showcase static application security testing (SAST) and code quality scanning in GitLab CI/CD.

The code includes common pitfalls such as command injection, path traversal, unsafe `eval`, regex DoS, weak cryptography (MD5), and hardcoded secrets. It’s used to validate that Codex-powered analyzers produce GitLab-native reports (Code Quality and SAST) that render directly in merge requests.

The CI runs on GitLab SaaS runners with `node:24` images and a few extras (`jq`, `curl`, `ca-certificates`, `ajv-cli`). Jobs are hardened with `set -euo pipefail`, schema validation, and strict JSON markers to keep parsing reliable even if Codex output varies.

This pipeline pattern—prompt, JSON marker extraction, schema validation—can be adapted to other stacks, though prompt wording and schema rules may need tweaks. Since Codex runs in a sandbox, some system commands (like `awk` or `nl`) may be restricted.

Your team wants to ensure that **code quality checks run automatically** before any merge. To surface findings directly in GitLab’s merge request widget, reports must follow the **CodeClimate JSON format**. [Reference: GitLab Docs](https://docs.gitlab.com/ci/testing/code_quality/#import-code-quality-results-from-a-cicd-job)

### Code Quality CI/CD Job Example

Here’s a drop-in GitLab CI job using **Codex CLI** to produce a compliant JSON file:
```yaml
stages: [codex]

default:
  image: node:24
  variables:
    CODEX_QA_PATH: "gl-code-quality-report.json"
    CODEX_RAW_LOG: "artifacts/codex-raw.log"
    # Strict prompt: must output a single JSON array (or []), no prose/markdown/placeholders.
    CODEX_PROMPT: |
      Review this repository and output a GitLab Code Quality report in CodeClimate JSON format.
      RULES (must follow exactly):
      - OUTPUT MUST BE A SINGLE JSON ARRAY. Example: [] or [ {...}, {...} ].
      - If you find no issues, OUTPUT EXACTLY: []
      - DO NOT print any prose, backticks, code fences, markdown, or placeholders.
      - DO NOT write any files. PRINT ONLY between these two lines:
        === BEGIN_CODE_QUALITY_JSON ===
        === END_CODE_QUALITY_JSON ===
      Each issue object MUST include these fields:
        "description": String,
        "check_name": String (short rule name),
        "fingerprint": String (stable across runs for same issue),
        "severity": "info"|"minor"|"major"|"critical"|"blocker",
