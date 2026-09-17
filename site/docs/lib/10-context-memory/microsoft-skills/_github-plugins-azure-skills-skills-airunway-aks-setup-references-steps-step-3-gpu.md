---
title: "Step 3 — GPU Assessment"
sourceId: "10-context-memory/microsoft-skills"
sourceTitle: "Microsoft Agent Skills"
sourceKind: "技能与配置库"
licenseLabel: "可转载"
lang: "英文"
tier: 3
volume: "10-context-memory"
sourceUrl: "https://github.com/microsoft/skills"
entryUrl: "https://github.com/microsoft/skills/blob/cf77b1efbf3117501f4727c476894751311ee885/.github/plugins/azure-skills/skills/airunway-aks-setup/references/steps/step-3-gpu.md"
sourceRel: ".github/plugins/azure-skills/skills/airunway-aks-setup/references/steps/step-3-gpu.md"
rawUrl: "/raw/10-context-memory/microsoft-skills/.github/plugins/azure-skills/skills/airunway-aks-setup/references/steps/step-3-gpu.md"
sourceSha256: "882f657390c9fc55a87d657da9ac1c6ae18bc0730c0f9d64683d174d7d2892a8"
pageSha256: "882f657390c9fc55a87d657da9ac1c6ae18bc0730c0f9d64683d174d7d2892a8"
contentMode: "local-full"
zh: ""
---

# Step 3 — GPU Assessment

**Goal**: Match detected hardware to known profiles and surface compatibility constraints.

Load and consult [gpu-profiles.md](/lib/10-context-memory/microsoft-skills/_github-plugins-azure-skills-skills-airunway-aks-setup-references-gpu-profiles).

For each GPU type detected in Step 1:
1. Look up the model in `gpu-profiles.md`
2. Report: VRAM per card, total cluster VRAM, supported dtypes, recommended attention backend
3. Surface compatibility warnings:

| GPU | Warning |
|-----|---------|
| T4 | Does not support bfloat16. Set `--dtype float16` in serving args. |
| V100 | Does not support bfloat16; limited flash attention. Use xformers backend. |

**CPU-only path:** Note CPU-only inference is available via KAITO + llama.cpp. Recommend `google/gemma-3-1b-it-qat-q8_0-gguf`.

Use the **Model Sizing Guide** in [model-sizing.md](/lib/10-context-memory/microsoft-skills/_github-plugins-azure-skills-skills-airunway-aks-setup-references-model-sizing) to calculate maximum model size for the cluster.
