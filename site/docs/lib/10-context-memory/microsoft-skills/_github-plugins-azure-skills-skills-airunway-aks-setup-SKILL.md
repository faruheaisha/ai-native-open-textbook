---
title: "AI Runway AKS Setup"
sourceId: "10-context-memory/microsoft-skills"
sourceTitle: "Microsoft Agent Skills"
sourceKind: "技能与配置库"
licenseLabel: "可转载"
lang: "英文"
tier: 3
volume: "10-context-memory"
sourceUrl: "https://github.com/microsoft/skills"
entryUrl: "https://github.com/microsoft/skills/blob/cf77b1efbf3117501f4727c476894751311ee885/.github/plugins/azure-skills/skills/airunway-aks-setup/SKILL.md"
sourceRel: ".github/plugins/azure-skills/skills/airunway-aks-setup/SKILL.md"
rawUrl: "/raw/10-context-memory/microsoft-skills/.github/plugins/azure-skills/skills/airunway-aks-setup/SKILL.md"
sourceSha256: "fff89af6c8c81005b48a073e470636f3b11ef3f991e55c109dae9f36105ffda7"
pageSha256: "fff89af6c8c81005b48a073e470636f3b11ef3f991e55c109dae9f36105ffda7"
contentMode: "local-full"
zh: ""
---

# AI Runway AKS Setup

This skill walks users from a bare Kubernetes cluster to a running AI model deployment. Follow each step in sequence unless the user provides `skip-to-step N` to resume from a specific phase.

> **Cost awareness:** GPU node pools incur significant compute charges (A100-80GB can cost $3–5+/hr). Confirm the user understands cost implications before provisioning GPU resources.

## Prerequisites

This skill assumes an AKS cluster already exists. If the user does not have a cluster, hand off to the `azure-kubernetes` skill first to provision one (with a GPU node pool unless CPU-only inference is acceptable), then return here.

## Quick Reference

| Property | Value |
|----------|-------|
| Best for | End-to-end AI Runway onboarding on AKS |
| CLI tools | `kubectl`, `make`, `curl` |
| MCP tools | None |
| Related skills | `azure-kubernetes` (cluster setup), `azure-diagnostics` (troubleshooting) |

## When to Use This Skill

Use this skill when the user wants to:
- Set up AI Runway on an existing AKS cluster from scratch
- Install the AI Runway controller and CRDs
- Assess GPU hardware compatibility for model deployment
- Choose and install an inference provider (KAITO, Dynamo, KubeRay)
- Deploy their first AI model to AKS via AI Runway
- Resume a partially-complete AI Runway setup from a specific step

## MCP Tools

This skill uses no MCP tools. All cluster operations are performed directly via `kubectl` and `make`.

## Rules

1. Execute steps in sequence — load the reference for each step as you reach it
2. Report cluster state at each step: ✓ healthy, ✗ missing/failed
3. Ask for user confirmation before any install or deployment action
4. If a step is already complete, report status and skip to the next step
5. If the user provides `skip-to-step N`, start at step N; assume prior steps are complete

## Steps

| # | Step | Reference |
|---|------|-----------|
| 1 | **Cluster Verification** — context check, node inventory, GPU detection | [step-1-verify.md](/lib/10-context-memory/microsoft-skills/_github-plugins-azure-skills-skills-airunway-aks-setup-references-steps-step-1-verify) |
| 2 | **Controller Installation** — CRD + controller deployment | [step-2-controller.md](/lib/10-context-memory/microsoft-skills/_github-plugins-azure-skills-skills-airunway-aks-setup-references-steps-step-2-controller) |
| 3 | **GPU Assessment** — detect GPU models, flag dtype/attention constraints | [step-3-gpu.md](/lib/10-context-memory/microsoft-skills/_github-plugins-azure-skills-skills-airunway-aks-setup-references-steps-step-3-gpu) |
| 4 | **Provider Setup** — recommend and install inference provider | [step-4-provider.md](/lib/10-context-memory/microsoft-skills/_github-plugins-azure-skills-skills-airunway-aks-setup-references-steps-step-4-provider) |
| 5 | **First Deployment** — pick a model, deploy, verify Ready | [step-5-deploy.md](/lib/10-context-memory/microsoft-skills/_github-plugins-azure-skills-skills-airunway-aks-setup-references-steps-step-5-deploy) |
| 6 | **Summary** — recap, smoke test, next steps | [step-6-summary.md](/lib/10-context-memory/microsoft-skills/_github-plugins-azure-skills-skills-airunway-aks-setup-references-steps-step-6-summary) |

## Error Handling

| Error / Symptom | Likely Cause | Remediation |
|-----------------|--------------|-------------|
| No kubeconfig context | Not connected to a cluster | Run `az aks get-credentials` or equivalent |
| Controller in CrashLoopBackOff | Config or RBAC issue | `kubectl logs -n airunway-system -l control-plane=controller-manager --previous` |
