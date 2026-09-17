---
title: "ECC —— Harness 性能优化系统"
sourceId: "09-harness/ecc"
sourceTitle: "ECC —— Harness 性能优化系统"
sourceKind: "其他材料"
licenseLabel: "可转载"
lang: "英文"
tier: 3
volume: "09-harness"
sourceUrl: "https://github.com/affaan-m/ECC"
entryUrl: "https://github.com/affaan-m/ECC/blob/928c1dea72f5c330442fc1f595563398b8f389f7/commands/gan-design.md"
sourceRel: "commands/gan-design.md"
rawUrl: "/raw/09-harness/ecc/commands/gan-design.md"
sourceSha256: "0f0d80a171d4637b1cd38998f5f260cdc445473b7b81a170f50b8491103f9723"
pageSha256: "0f0d80a171d4637b1cd38998f5f260cdc445473b7b81a170f50b8491103f9723"
contentMode: "local-full"
zh: ""
---

# ECC —— Harness 性能优化系统

Parse the following from $ARGUMENTS:
1. `brief` — the user's description of the design to create
2. `--max-iterations N` — (optional, default 10) maximum design-evaluate cycles
3. `--pass-threshold N` — (optional, default 7.5) weighted score to pass (higher default for design)

## GAN-Style Design Harness

A two-agent loop (Generator + Evaluator) focused on frontend design quality. No planner — the brief IS the spec.

This is the same mode Anthropic used for their frontend design experiments, where they saw creative breakthroughs like the 3D Dutch art museum with CSS perspective and doorway navigation.

### Setup
1. Create `gan-harness/` directory
2. Write the brief directly as `gan-harness/spec.md`
3. Write a design-focused `gan-harness/eval-rubric.md` with extra weight on Design Quality and Originality

### Design-Specific Eval Rubric
```markdown
### Design Quality (weight: 0.35)
### Originality (weight: 0.30)
### Craft (weight: 0.25)
### Functionality (weight: 0.10)
```

Note: Originality weight is higher (0.30 vs 0.20) to push for creative breakthroughs. Functionality weight is lower since design mode focuses on visual quality.

### Loop
Same as `/project:gan-build` Phase 2, but:
- Skip the planner
- Use the design-focused rubric
- Generator prompt emphasizes visual quality over feature completeness
- Evaluator prompt emphasizes "would this win a design award?" over "do all features work?"

### Key Difference from gan-build
The Generator is told: "Your PRIMARY goal is visual excellence. A stunning half-finished app beats a functional ugly one. Push for creative leaps — unusual layouts, custom animations, distinctive color work."
