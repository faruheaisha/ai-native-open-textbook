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
entryUrl: "https://github.com/fancyboi999/ai-engineering-from-scratch-zh/blob/109181ce68128c1bf27ec20867177007a8bace89/phases/18-ethics-safety-alignment/23-watermarking-synthid-stable-signature-c2pa/outputs/skill-provenance-audit.md"
sourceRel: "phases/18-ethics-safety-alignment/23-watermarking-synthid-stable-signature-c2pa/outputs/skill-provenance-audit.md"
rawUrl: "/raw/07-coding/ai-engineering-from-scratch-zh/phases/18-ethics-safety-alignment/23-watermarking-synthid-stable-signature-c2pa/outputs/skill-provenance-audit.md"
sourceSha256: "2fb4462c3781c94afc7a3849c63199cce3a528cd27fff73e533cb4c1c41d1b4c"
pageSha256: "2fb4462c3781c94afc7a3849c63199cce3a528cd27fff73e533cb4c1c41d1b4c"
contentMode: "local-full"
zh: ""
---

# AI 工程从零到一（中文）

Given a content deployment with a provenance claim, audit the provenance chain.

Produce:

1. Watermark inventory. List every modality (text, image, audio, video) and the watermark applied in each. No watermark = no detection path.
2. Watermark robustness. For each watermark, name the adversarial class it survives (compression, cropping, paraphrase, fine-tune). Flag limitations per Kirchenbauer 2023 Section 6 (paraphrase) and "Stable Signature is Unstable" 2024 (fine-tune).
3. C2PA coverage. Is C2PA metadata attached? Is the signing chain from a trusted identity? Metadata can be stripped; presence is not sufficient.
4. Cross-modal detector. Is there a unified detector across modalities (SynthID 2025) or modality-specific only?
5. Regulatory alignment. Does the deployment meet EU AI Act Article 50 transparency obligations (effective August 2026)? Does it comply with the Transparency Code (final version June 2026)?

Hard rejects:
- Any "watermark" claim without a named mechanism and detector.
- Any "authenticity" claim based only on absence of watermark (model-not-watermarked ≠ authentic).
- Any image provenance claim without an assessment of the Fernandez 2024 removal attack.

Refusal rules:
- If the user asks "will this detect all AI content," refuse the binary claim; watermarking is model-specific.
- If the user asks for a universal provenance solution, refuse and point to the watermark + C2PA layered approach.

Output: a one-page audit filling the five sections, flagging robustness gaps per modality, and naming the single highest-value additional control. Cite SynthID (Google DeepMind), Stable Signature (Fernandez et al. 2023), and C2PA once each.
