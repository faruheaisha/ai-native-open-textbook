---
title: "AKS Structured Input Modes"
sourceId: "10-context-memory/microsoft-skills"
sourceTitle: "Microsoft Agent Skills"
sourceKind: "技能与配置库"
licenseLabel: "可转载"
lang: "英文"
tier: 3
volume: "10-context-memory"
sourceUrl: "https://github.com/microsoft/skills"
entryUrl: "https://github.com/microsoft/skills/blob/cf77b1efbf3117501f4727c476894751311ee885/.github/plugins/azure-skills/skills/azure-diagnostics/troubleshooting/aks/references/structured-input-modes.md"
sourceRel: ".github/plugins/azure-skills/skills/azure-diagnostics/troubleshooting/aks/references/structured-input-modes.md"
rawUrl: "/raw/10-context-memory/microsoft-skills/.github/plugins/azure-skills/skills/azure-diagnostics/troubleshooting/aks/references/structured-input-modes.md"
sourceSha256: "eb1d1efe70567b5583d56c155a640ed6d3964befba1e63589d57045ee0640119"
pageSha256: "eb1d1efe70567b5583d56c155a640ed6d3964befba1e63589d57045ee0640119"
contentMode: "local-full"
zh: ""
---

# AKS Structured Input Modes

Use this reference when the troubleshooting request already contains structured inputs.

## Detector-backed Mode

Use when AKS-aware detectors or AppLens-style insights are available.

Decision rules:

- Ignore findings where the detector is `emergingIssues`.
- Prefer critical findings over warnings.
- Prefer findings with more concrete remediation detail when choosing the likely root problem.
- Preserve per-insight output: problem summary, root-problem flag, affected resources, suggested commands.

## Warning Events Mode

Use when the request includes Kubernetes warning events.

Expected output:

- summary of the events and their impact
- likely cause or causes
- next kubectl checks
- monitoring follow-up

## Metrics Scan Mode

Use when the request includes CPU or memory time-series data.

Expected output:

- healthy or unhealthy status
- anomaly timestamps and explanations
- suggestion tied to the observed metric pressure

## Generic Symptoms Mode

Use when the request includes resource symptoms but not detector results, warning events, or time-series metrics.

Expected output:

- symptom summary by resource
- likely failure domain
- next evidence-collection steps

## Learn Grounding Fallback

If the first troubleshooting pass is incomplete, search Microsoft Learn using:

- the user prompt
- the parsed problem names
- the AKS troubleshooting context

Use Learn grounding to refine or validate the root-cause hypothesis, not to replace observed evidence.
