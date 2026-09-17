---
title: "3DGS Export Router"
sourceId: "07-coding/ai-engineering-from-scratch"
sourceTitle: "AI Engineering from Scratch（英文原版）"
sourceKind: "源码研读"
licenseLabel: "可转载"
lang: "英文"
tier: 2
volume: "07-coding"
sourceUrl: "https://github.com/rohitg00/ai-engineering-from-scratch"
entryUrl: "https://github.com/rohitg00/ai-engineering-from-scratch/blob/d18b8fe5a913c46011a3b06cb6ebd6a924414fd3/phases/04-computer-vision/22-3d-gaussian-splatting/outputs/skill-3dgs-export-router.md"
sourceRel: "phases/04-computer-vision/22-3d-gaussian-splatting/outputs/skill-3dgs-export-router.md"
rawUrl: "/raw/07-coding/ai-engineering-from-scratch/phases/04-computer-vision/22-3d-gaussian-splatting/outputs/skill-3dgs-export-router.md"
sourceSha256: "bf05901cf65804c79de1987e23b32601bd2fe0cc98c4749b1024b2670eb5b3a6"
pageSha256: "bf05901cf65804c79de1987e23b32601bd2fe0cc98c4749b1024b2670eb5b3a6"
contentMode: "local-full"
zh: ""
---

# 3DGS Export Router

Map a downstream target to the right 3DGS file format. Saves hours of "it does not load" debugging.

## When to use

- After training a 3DGS scene, before sharing it with a content pipeline.
- Choosing between research-grade (.ply) and production-grade (glTF / USD) formats.
- Pipeline handoff: capture team -> 3DGS engineer -> game designer / VFX artist / web developer.

## Inputs

- `target_engine`: unreal | unity | omniverse | blender | vision_pro | three_js | babylon_js | cesium | playcanvas | supersplat
- `priority`: portability | file_size | quality_preservation
- `include_sh_degree`: 0 | 1 | 2 | 3

## Format decision

| Target | Recommended format | Why |
|--------|--------------------|-----|
| Unreal Engine (virtual production) | Volinga plugin or glTF KHR_gaussian_splatting | Native Unreal SDK path |
| Unity (XR / game) | .ply via Aras-P Unity-GaussianSplatting plugin | Community-standard Unity pipeline |
| NVIDIA Omniverse, Pixar tools | OpenUSD 26.03 (UsdVolParticleField3DGaussianSplat) | Native USD prim type |
| Apple Vision Pro | OpenUSD 26.03 | Native to visionOS 2.x |
| Blender | .ply + KIRI Engine add-on | Community add-on reads raw splats |
| Three.js web viewer | glTF KHR_gaussian_splatting or .splat | Browser-standard, works with `GaussianSplats3D` |
| Babylon.js V9+ | glTF KHR_gaussian_splatting | V9 added native support |
| Cesium (CesiumJS 1.139+, Cesium for Unreal 2.23+) | glTF KHR_gaussian_splatting | Shipped explicit support |
| PlayCanvas | .splat | PlayCanvas native quantised format |
| SuperSplat (editor) | .ply or .splat | Import + export |

## Quantisation trade-offs

- `.ply` full-precision: largest file, lossless, any viewer.
- `.splat`: 4x-8x smaller, slight quality loss on SH3 coefficients, PlayCanvas-ecosystem standard.
- glTF KHR: configurable via EXT_meshopt_compression; smallest with highest compatibility.
- USD: compressed by USDZ packaging; smallest for Apple pipelines.

## Output report

```
[export plan]
  target:         <engine>
  format:         <name>
  sh degree:      <0|1|2|3>
  compression:    <none|meshopt|quantisation|usdz>
  expected size:  <MB>
  compatible with: <list of viewers>

[pipeline]
  1. source: <.ply from training>
  2. optional: SuperSplat cleanup pass
  3. convert: <tool + CLI or API call>
  4. package: <.gltf / .glb / .usd / .usdz / .splat / .ply>
  5. validate: <viewer sanity check>
```

## Rules

- Never strip SH3 coefficients silently — it visibly changes specular reflections.
- If `priority == file_size`, recommend `.splat` or glTF with meshopt; warn about quality loss.
- For Apple platforms, prefer USD / USDZ over glTF in 2026; USDZ has first-class visionOS support.
- If the target viewer's 3DGS support is pre-standard (pre-Feb 2026), recommend `.ply` and the viewer's custom loader; Khronos-standard glTF will not yet be recognised.
- Always validate the exported file in at least one viewer before handing off; silent corruption happens during quantisation.
