---
title: "Troubleshooting & Rollback"
sourceId: "10-context-memory/microsoft-skills"
sourceTitle: "Microsoft Agent Skills"
sourceKind: "技能与配置库"
licenseLabel: "可转载"
lang: "英文"
tier: 3
volume: "10-context-memory"
sourceUrl: "https://github.com/microsoft/skills"
entryUrl: "https://github.com/microsoft/skills/blob/cf77b1efbf3117501f4727c476894751311ee885/.github/plugins/azure-skills/skills/airunway-aks-setup/references/troubleshooting.md"
sourceRel: ".github/plugins/azure-skills/skills/airunway-aks-setup/references/troubleshooting.md"
rawUrl: "/raw/10-context-memory/microsoft-skills/.github/plugins/azure-skills/skills/airunway-aks-setup/references/troubleshooting.md"
sourceSha256: "e04601080a33e34bfad2aff51dfaa47c8410aed2a524366d156641837efd8ead"
pageSha256: "e04601080a33e34bfad2aff51dfaa47c8410aed2a524366d156641837efd8ead"
contentMode: "local-full"
zh: ""
---

# Troubleshooting & Rollback

## Error Handling

| Error / Symptom | Likely Cause | Remediation |
|-----------------|--------------|-------------|
| No kubeconfig context | Not connected to a cluster | Run `az aks get-credentials` or equivalent |
| `make: *** No rule to make target` | Not in AI Runway repo root | `cd` to repo root and retry |
| Controller in CrashLoopBackOff | Config or RBAC issue | `kubectl logs -n airunway-system -l control-plane=controller-manager --previous` |
| Provider not ready | Image pull or RBAC issue | `kubectl describe pod` for the provider pod |
| ModelDeployment stuck in Pending | GPU scheduling failure or provider not ready | `kubectl describe modeldeployment` events |
| Pod shows ImagePullBackOff | Wrong image reference or missing pull secret | `kubectl describe pod` for the model pod |
| 401 from HuggingFace at model load | Gated model, token secret not wired into CR | Ensure `huggingFaceTokenSecretRef` is set in the CR |
| `bfloat16` errors at inference | T4 or V100 lacks bfloat16 support | Add `--dtype float16` to serving args |

## Rollback

If a step fails and you need to undo a partial setup, work backwards through the steps:

| What to undo | Command |
|--------------|---------|
