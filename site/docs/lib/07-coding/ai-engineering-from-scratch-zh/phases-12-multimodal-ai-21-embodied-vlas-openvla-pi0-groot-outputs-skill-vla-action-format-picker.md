---
title: "AI 工程从零到一（中文）"
sourceId: "07-coding/ai-engineering-from-scratch-zh"
sourceTitle: "AI 工程从零到一（中文）"
sourceKind: "源码研读"
licenseLabel: "可转载"
lang: "中文"
tier: 1
volume: "07-coding"
sourceUrl: "https://github.com/fancyboi999/ai-engineering-from-scratch-zh"
entryUrl: "https://github.com/fancyboi999/ai-engineering-from-scratch-zh/blob/109181ce68128c1bf27ec20867177007a8bace89/phases/12-multimodal-ai/21-embodied-vlas-openvla-pi0-groot/outputs/skill-vla-action-format-picker.md"
sourceRel: "phases/12-multimodal-ai/21-embodied-vlas-openvla-pi0-groot/outputs/skill-vla-action-format-picker.md"
rawUrl: "/raw/07-coding/ai-engineering-from-scratch-zh/phases/12-multimodal-ai/21-embodied-vlas-openvla-pi0-groot/outputs/skill-vla-action-format-picker.md"
sourceSha256: "77f5503e2bbf563ea5d5ae66678ff5f375ac4b9ed46c36123dadb96ce023ae6c"
pageSha256: "77f5503e2bbf563ea5d5ae66678ff5f375ac4b9ed46c36123dadb96ce023ae6c"
contentMode: "local-full"
zh: ""
---

# AI 工程从零到一（中文）

Given a robot task (manipulation, navigation, whole-body humanoid), DOF count, control rate requirement, and compute constraint, pick an action format and a VLA family.

Produce:

1. Action format. Discrete-bin for simple single-arm tasks, FAST for speed-sensitive trajectories, flow-matching for smooth continuous control, dual-system for humanoids.
2. VLA family pick. RT-2 (closed), OpenVLA (open 7B), π0 (open flow), GR00T N1 (open dual-system humanoid).
3. Control rate feasibility. Match format throughput to required control Hz. Discrete bin cannot do >10 Hz on a 7B model.
4. Training data mix. Co-fine-tune ratio (web VQA : robot). Start at 0.5:1, tune by task.
5. Fine-tune plan. LoRA on ~500-1000 task demos; full fine-tune at ~10k demos.
6. Safety gates. Required control-layer checks outside the VLA.

Hard rejects:
- Recommending VLA without a safety-layer spec. Always include joint limits, velocity clipping.
- Claiming discrete-bin tokenization is fast enough for 30 Hz control. It is not.
- Proposing flow-matching without adequate smoothness constraints. Out-of-distribution actions still happen.

Refusal rules:
- If control rate requirement >50 Hz on a <=7B model with discrete-bin format, refuse; recommend π0 or a specialized head.
- If robot has >30 DOF (humanoid), refuse single-stage architectures; require dual-system (GR00T).
- If budget cannot afford Open X-Embodiment-scale pretraining, refuse from-scratch VLA; recommend fine-tuning OpenVLA.

Output: one-page plan with action format, VLA pick, control rate check, co-fine-tune mix, safety gates. End with arXiv 2307.15818 (RT-2), 2406.09246 (OpenVLA), 2410.24164 (π0), 2503.14734 (GR00T).
