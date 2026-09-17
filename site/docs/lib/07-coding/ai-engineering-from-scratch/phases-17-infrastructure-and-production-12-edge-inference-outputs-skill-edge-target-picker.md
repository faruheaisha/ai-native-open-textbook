---
title: "AI Engineering from Scratch（英文原版）"
sourceId: "07-coding/ai-engineering-from-scratch"
sourceTitle: "AI Engineering from Scratch（英文原版）"
sourceKind: "源码研读"
licenseLabel: "可转载"
lang: "英文"
tier: 2
volume: "07-coding"
sourceUrl: "https://github.com/rohitg00/ai-engineering-from-scratch"
entryUrl: "https://github.com/rohitg00/ai-engineering-from-scratch/blob/d18b8fe5a913c46011a3b06cb6ebd6a924414fd3/phases/17-infrastructure-and-production/12-edge-inference/outputs/skill-edge-target-picker.md"
sourceRel: "phases/17-infrastructure-and-production/12-edge-inference/outputs/skill-edge-target-picker.md"
rawUrl: "/raw/07-coding/ai-engineering-from-scratch/phases/17-infrastructure-and-production/12-edge-inference/outputs/skill-edge-target-picker.md"
sourceSha256: "9339782153167c8b97b060531e39fdc81b6441c7ededc37542728ebe11ebe78d"
pageSha256: "9339782153167c8b97b060531e39fdc81b6441c7ededc37542728ebe11ebe78d"
contentMode: "local-full"
zh: ""
---

# AI Engineering from Scratch（英文原版）

Given deployment platform (iOS, Android, browser, robotics/automotive/edge server), model, and latency/memory budget, produce an edge target recommendation.

Produce:

1. Target. Name the specific NPU/GPU (ANE, Hexagon, WebGPU, Jetson Orin Nano / AGX / Thor). Justify with the platform and the 2026 runtime coverage.
2. Bandwidth ceiling. Compute theoretical decode ceiling: bandwidth_GB_s / model_size_GB. Compare to the user's tok/s requirement. If the ceiling is below the requirement, refuse or propose a smaller model / tighter quantization.
3. Quantization format. Pick Q4 GGUF (browser/edge CPU), Core ML INT4 + FP16 (ANE), QNN INT8/INT4 (Hexagon), or NVFP4 + FP8 KV (Jetson Thor / Edge-LLM).
4. Conversion pipeline. Name the exact converter (Core ML converter, Qualcomm AI Hub, MLC-LLM for WebLLM, TensorRT-LLM Edge compiler).
5. Context budget. State the max context that fits alongside weights in device RAM. For long-context use cases, specify KV quantization (Q4 KV) or refuse.
6. Fallback. When the device is incapable or WebGPU is unavailable (Firefox Android, older browsers), specify the server-side API fallback with the same OpenAI-compatible interface.

Hard rejects:
- Promising tok/s above bandwidth ceiling. Refuse — physics.
- Targeting ANE directly via a non-Core ML runtime in 2026. Only Core ML exposes ANE natively.
- Assuming WebGPU is on every browser. 2026 coverage is ~70-75% mobile; always specify the fallback.

Refusal rules:
- If the model is >6 GB and the target is a phone (4-8 GB RAM), refuse — propose a smaller model or aggressive quantization first.
- If the request is 128K context on a 7B model on iPhone, refuse — device RAM cannot fit without Q4 KV plus sliding-window attention.
- If the deployment requires long-context streaming on Android via WebGPU and the user requires Firefox support, refuse and require Chrome or a server fallback.

Output: a one-page plan naming target, ceiling, quantization, converter, context budget, fallback. End with a single metric: observed tok/s on the worst-case device in the target fleet.
