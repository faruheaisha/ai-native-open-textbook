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
sourceRel: "cookbook/examples/multimodal/image_evals.md"
rawUrl: "/raw/08-agents/openai-cookbook-docs/cookbook/examples/multimodal/image_evals.md"
sourceSha256: "e1cb173d20238637b17f74eead4c8760debec34d02e51970e14d7ba623a126c7"
pageSha256: "6140278c1e4390ce3efb3ceaad2e93ca6a9978628a688468263c24242cadd40f"
contentMode: "local-full"
zh: ""
---

## Introduction

Image models are increasingly used in real product workflows—design
mockups, marketing assets, virtual try-on, and high-precision edits to
existing brand materials. To trust these systems in production, you need
more than “does it look good?” You need **repeatable, workflow-specific
evaluation** that measures whether outputs satisfy requirements, fail
safely, and improve predictably over time.

Vision evaluations(or vision evals) are harder than text evals because the “answer” is an image
that mixes:

- **Hard constraints**: exact text, counts, attributes, locality
  (“change only this region”).  
- **Perceptual quality**: sharpness, coherence, realism, aesthetic
  match.  
- **Hidden failure modes**: subtle distortions, unintended edits, or
  small text errors that look fine at a glance but break product
  requirements—especially in editing.

A good vision eval does **not** score “a pretty picture.” It scores
whether the model is **reliable for a specific workflow**. Many images
that look visually strong still fail because text is wrong, style is
off-brand, or edits spill beyond the intended area. Image evals measure
**quality, controllability, and usability** for real prompts—not just
visual appeal.

#### What this guide covers

This cookbook focuses on building a practical image-eval system for four
major categories:

**1) Image generation evals**

- Instruction following (constraints satisfied)  
- Text rendering (accuracy, legibility, placement)  
- Style control (aesthetic match, brand/character consistency)  
- Preference alignment (rubric labels + pairwise comparisons)

**2) Image editing evals**

- Transformation correctness (the requested change is done exactly)  
- Locality (edits happen only where intended)  
- Preservation (unrequested regions remain unchanged)  
- Spatial control (edits applied to the correct instance / region)

**3) Human feedback alignment**

- Rubric-based labels and pairwise preferences to capture subjective
  quality and “vibe”  
- Calibration techniques to keep human judgments consistent over time

**4) Strategy for building evals**

- Start with non-negotiable correctness gates  
- Add graded quality metrics once failures are controlled  
- Tag failure modes to drive targeted iteration
