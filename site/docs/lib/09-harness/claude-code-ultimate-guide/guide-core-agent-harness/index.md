---
title: "Agent Harness Engineering"
sourceId: "09-harness/claude-code-ultimate-guide"
sourceTitle: "Claude Code Ultimate Guide"
sourceKind: "工程手册"
licenseLabel: "可转载"
lang: "英文"
tier: 3
volume: "09-harness"
sourceUrl: "https://github.com/FlorianBruniaux/claude-code-ultimate-guide"
entryUrl: "https://github.com/FlorianBruniaux/claude-code-ultimate-guide/blob/af05b84fb6e32432dae2114ee2a72c44ef3d29b1/guide/core/agent-harness.md"
sourceRel: "guide/core/agent-harness.md"
rawUrl: "/raw/09-harness/claude-code-ultimate-guide/guide/core/agent-harness.md"
sourceSha256: "3ebee5bd31662cb0c785ab8945cd9b5d2fb509e0b81587839d600e81843813c1"
pageSha256: "3601485d2d54b3b52353ba043e869e326c12a79078b05c027db78384abe192f1"
contentMode: "local-full"
zh: ""
---

# Agent Harness Engineering

> **Confidence**: Tier 1 for the architecture framing; Tier 2 for cross-product performance claims. Controlled studies show measurable harness effects, but do not establish that the harness always matters more than the model.
>
> **Reading time**: ~35 minutes

---

## 本篇目录

- [The core claim](https://github.com/FlorianBruniaux/claude-code-ultimate-guide/blob/af05b84fb6e32432dae2114ee2a72c44ef3d29b1/guide/core/01-The_core_claim.md)
- [Table of Contents](https://github.com/FlorianBruniaux/claude-code-ultimate-guide/blob/af05b84fb6e32432dae2114ee2a72c44ef3d29b1/guide/core/02-Table_of_Contents.md)
- [0. Four Layers, Four Responsibilities](https://github.com/FlorianBruniaux/claude-code-ultimate-guide/blob/af05b84fb6e32432dae2114ee2a72c44ef3d29b1/guide/core/03-0._Four_Layers_Four_Responsibilities.md)
- [1. Three Foundational Properties](https://github.com/FlorianBruniaux/claude-code-ultimate-guide/blob/af05b84fb6e32432dae2114ee2a72c44ef3d29b1/guide/core/04-1._Three_Foundational_Properties.md)
- [2. The Nine Components](https://github.com/FlorianBruniaux/claude-code-ultimate-guide/blob/af05b84fb6e32432dae2114ee2a72c44ef3d29b1/guide/core/05-2._The_Nine_Components.md)
- [3. The Lethal Trifecta: Security Model](https://github.com/FlorianBruniaux/claude-code-ultimate-guide/blob/af05b84fb6e32432dae2114ee2a72c44ef3d29b1/guide/core/06-3._The_Lethal_Trifecta_Security_Model.md)
- [4. CI/CD Agentic Patterns](https://github.com/FlorianBruniaux/claude-code-ultimate-guide/blob/af05b84fb6e32432dae2114ee2a72c44ef3d29b1/guide/core/07-4._CI_CD_Agentic_Patterns.md)
- [5. Digital Twin Testing](https://github.com/FlorianBruniaux/claude-code-ultimate-guide/blob/af05b84fb6e32432dae2114ee2a72c44ef3d29b1/guide/core/08-5._Digital_Twin_Testing.md)
- [6. Observability Stack](https://github.com/FlorianBruniaux/claude-code-ultimate-guide/blob/af05b84fb6e32432dae2114ee2a72c44ef3d29b1/guide/core/09-6._Observability_Stack.md)
- [7. Test Distribution and Component-Stacking Anti-patterns](https://github.com/FlorianBruniaux/claude-code-ultimate-guide/blob/af05b84fb6e32432dae2114ee2a72c44ef3d29b1/guide/core/10-7._Test_Distribution_and_Component-Stack.md)
- [8. Creator-Verifier Pattern](https://github.com/FlorianBruniaux/claude-code-ultimate-guide/blob/af05b84fb6e32432dae2114ee2a72c44ef3d29b1/guide/core/11-8._Creator-Verifier_Pattern.md)
- [9. Reference Architecture](https://github.com/FlorianBruniaux/claude-code-ultimate-guide/blob/af05b84fb6e32432dae2114ee2a72c44ef3d29b1/guide/core/12-9._Reference_Architecture.md)
- [10. Practitioner Video Evidence](https://github.com/FlorianBruniaux/claude-code-ultimate-guide/blob/af05b84fb6e32432dae2114ee2a72c44ef3d29b1/guide/core/13-10._Practitioner_Video_Evidence.md)
- [11. Harness Optimizers and Meta-Harnesses](https://github.com/FlorianBruniaux/claude-code-ultimate-guide/blob/af05b84fb6e32432dae2114ee2a72c44ef3d29b1/guide/core/14-11._Harness_Optimizers_and_Meta-Harnesse.md)
- [See Also](https://github.com/FlorianBruniaux/claude-code-ultimate-guide/blob/af05b84fb6e32432dae2114ee2a72c44ef3d29b1/guide/core/15-See_Also.md)
