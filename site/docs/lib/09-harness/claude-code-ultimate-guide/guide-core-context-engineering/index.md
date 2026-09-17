---
title: "Context Engineering"
sourceId: "09-harness/claude-code-ultimate-guide"
sourceTitle: "Claude Code Ultimate Guide"
sourceKind: "工程手册"
licenseLabel: "可转载"
lang: "英文"
tier: 3
volume: "09-harness"
sourceUrl: "https://github.com/FlorianBruniaux/claude-code-ultimate-guide"
entryUrl: "https://github.com/FlorianBruniaux/claude-code-ultimate-guide/blob/af05b84fb6e32432dae2114ee2a72c44ef3d29b1/guide/core/context-engineering.md"
sourceRel: "guide/core/context-engineering.md"
rawUrl: "/raw/09-harness/claude-code-ultimate-guide/guide/core/context-engineering.md"
sourceSha256: "88f466dc8a613df9ff154e036103224bc08dd077581d916bd073988664d9f5c6"
pageSha256: "3674ac244711a61b802fd30feb9bb3c4410d0ec8cf525d681fe5b70c6ed17283"
contentMode: "local-full"
zh: ""
---

# Context Engineering

> **Confidence**: Tier 1, based on official documentation, measured production data, and community validation.
>
> **Last updated**: March 2026
>
> **Further reading**: [context engineering, the hidden variable](https://www.florian.bruniaux.com/blog/articles/context-engineering-the-hidden-variable/), on why the same model produces opposite results depending on this.

"Context engineering is the art of filling the context window with the right information at the right time." (Andrej Karpathy)

This guide covers everything from the token math behind context budgets to building modular, team-scale configuration systems. It is a companion to the broader configuration sections in the ultimate guide. Those sections show individual techniques; this document shows how to compose them into a coherent system.

---

## 本篇目录

- [Table of Contents](https://github.com/FlorianBruniaux/claude-code-ultimate-guide/blob/af05b84fb6e32432dae2114ee2a72c44ef3d29b1/guide/core/01-Table_of_Contents.md)
- [1. What is Context Engineering](https://github.com/FlorianBruniaux/claude-code-ultimate-guide/blob/af05b84fb6e32432dae2114ee2a72c44ef3d29b1/guide/core/02-1._What_is_Context_Engineering.md)
- [2. The Context Budget](https://github.com/FlorianBruniaux/claude-code-ultimate-guide/blob/af05b84fb6e32432dae2114ee2a72c44ef3d29b1/guide/core/03-2._The_Context_Budget.md)
- [3. Configuration Hierarchy](https://github.com/FlorianBruniaux/claude-code-ultimate-guide/blob/af05b84fb6e32432dae2114ee2a72c44ef3d29b1/guide/core/04-3._Configuration_Hierarchy.md)
- [4. Modular Architecture](https://github.com/FlorianBruniaux/claude-code-ultimate-guide/blob/af05b84fb6e32432dae2114ee2a72c44ef3d29b1/guide/core/05-4._Modular_Architecture.md)
- [5. Team Assembly](https://github.com/FlorianBruniaux/claude-code-ultimate-guide/blob/af05b84fb6e32432dae2114ee2a72c44ef3d29b1/guide/core/06-5._Team_Assembly.md)
- [6. Context Lifecycle](https://github.com/FlorianBruniaux/claude-code-ultimate-guide/blob/af05b84fb6e32432dae2114ee2a72c44ef3d29b1/guide/core/07-6._Context_Lifecycle.md)
- [7. Quality Measurement](https://github.com/FlorianBruniaux/claude-code-ultimate-guide/blob/af05b84fb6e32432dae2114ee2a72c44ef3d29b1/guide/core/08-7._Quality_Measurement.md)
- [8. Context Reduction Techniques](https://github.com/FlorianBruniaux/claude-code-ultimate-guide/blob/af05b84fb6e32432dae2114ee2a72c44ef3d29b1/guide/core/09-8._Context_Reduction_Techniques.md)
- [9. Maturity Assessment](https://github.com/FlorianBruniaux/claude-code-ultimate-guide/blob/af05b84fb6e32432dae2114ee2a72c44ef3d29b1/guide/core/10-9._Maturity_Assessment.md)
- [10. Signal Taxonomy and Causal Attribution](https://github.com/FlorianBruniaux/claude-code-ultimate-guide/blob/af05b84fb6e32432dae2114ee2a72c44ef3d29b1/guide/core/11-10._Signal_Taxonomy_and_Causal_Attributi.md)
- [11. Loop Closure: PR-Based Curation](https://github.com/FlorianBruniaux/claude-code-ultimate-guide/blob/af05b84fb6e32432dae2114ee2a72c44ef3d29b1/guide/core/12-11._Loop_Closure_PR-Based_Curation.md)
- [12. Ejection: Disciplined De-engineering](https://github.com/FlorianBruniaux/claude-code-ultimate-guide/blob/af05b84fb6e32432dae2114ee2a72c44ef3d29b1/guide/core/13-12._Ejection_Disciplined_De-engineering.md)
- [13. Constitutional and Self-consistency Audits](https://github.com/FlorianBruniaux/claude-code-ultimate-guide/blob/af05b84fb6e32432dae2114ee2a72c44ef3d29b1/guide/core/14-13._Constitutional_and_Self-consistency_.md)
- [14. Multi-dev Profile Reconciliation](https://github.com/FlorianBruniaux/claude-code-ultimate-guide/blob/af05b84fb6e32432dae2114ee2a72c44ef3d29b1/guide/core/15-14._Multi-dev_Profile_Reconciliation.md)
- [15. Token Audit Workflow](https://github.com/FlorianBruniaux/claude-code-ultimate-guide/blob/af05b84fb6e32432dae2114ee2a72c44ef3d29b1/guide/core/16-15._Token_Audit_Workflow.md)
- [16. Research Patterns: What the Literature Shows](https://github.com/FlorianBruniaux/claude-code-ultimate-guide/blob/af05b84fb6e32432dae2114ee2a72c44ef3d29b1/guide/core/17-16._Research_Patterns_What_the_Literatur.md)
- [17. Attention Mechanics & Reliability](https://github.com/FlorianBruniaux/claude-code-ultimate-guide/blob/af05b84fb6e32432dae2114ee2a72c44ef3d29b1/guide/core/18-17._Attention_Mechanics_Reliability.md)
- [18. Token Compression Tools](https://github.com/FlorianBruniaux/claude-code-ultimate-guide/blob/af05b84fb6e32432dae2114ee2a72c44ef3d29b1/guide/core/19-18._Token_Compression_Tools.md)
- [Cross-References](https://github.com/FlorianBruniaux/claude-code-ultimate-guide/blob/af05b84fb6e32432dae2114ee2a72c44ef3d29b1/guide/core/20-Cross-References.md)
