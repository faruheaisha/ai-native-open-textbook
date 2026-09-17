---
title: "How Claude Code Works: Architecture & Internals"
sourceId: "09-harness/claude-code-ultimate-guide"
sourceTitle: "Claude Code Ultimate Guide"
sourceKind: "工程手册"
licenseLabel: "可转载"
lang: "英文"
tier: 3
volume: "09-harness"
sourceUrl: "https://github.com/FlorianBruniaux/claude-code-ultimate-guide"
entryUrl: "https://github.com/FlorianBruniaux/claude-code-ultimate-guide/blob/af05b84fb6e32432dae2114ee2a72c44ef3d29b1/guide/core/architecture.md"
sourceRel: "guide/core/architecture.md"
rawUrl: "/raw/09-harness/claude-code-ultimate-guide/guide/core/architecture.md"
sourceSha256: "8d6da52e869bf1c04028a4cb8b16e5a7dd993877d379aa8b75c3433580d098d6"
pageSha256: "7d368ac02bd043f292a807cf3cbcfe029908d83499283580295487df67e39704"
contentMode: "local-full"
zh: ""
---

# How Claude Code Works: Architecture & Internals

> A technical deep-dive into Claude Code's internal mechanisms, based on official Anthropic documentation and verified community analysis.

**Author**: Florian BRUNIAUX | Contributions from Claude (Anthropic)

**Reading time**: ~25 minutes (full) | ~5 minutes (TL;DR only)

**Last verified**: February 2026 (Claude Code v2.1.34)

---

## 本篇目录

- [Source Transparency](https://github.com/FlorianBruniaux/claude-code-ultimate-guide/blob/af05b84fb6e32432dae2114ee2a72c44ef3d29b1/guide/core/01-Source_Transparency.md)
- [Where Claude Code Sits in the Harness Stack](https://github.com/FlorianBruniaux/claude-code-ultimate-guide/blob/af05b84fb6e32432dae2114ee2a72c44ef3d29b1/guide/core/02-Where_Claude_Code_Sits_in_the_Harness_St.md)
- [TL;DR - 5 Bullet Summary](https://github.com/FlorianBruniaux/claude-code-ultimate-guide/blob/af05b84fb6e32432dae2114ee2a72c44ef3d29b1/guide/core/03-TL_DR_-_5_Bullet_Summary.md)
- [Visual Overview](https://github.com/FlorianBruniaux/claude-code-ultimate-guide/blob/af05b84fb6e32432dae2114ee2a72c44ef3d29b1/guide/core/04-Visual_Overview.md)
- [Table of Contents](https://github.com/FlorianBruniaux/claude-code-ultimate-guide/blob/af05b84fb6e32432dae2114ee2a72c44ef3d29b1/guide/core/05-Table_of_Contents.md)
- [1. The Master Loop](https://github.com/FlorianBruniaux/claude-code-ultimate-guide/blob/af05b84fb6e32432dae2114ee2a72c44ef3d29b1/guide/core/06-1._The_Master_Loop.md)
- [2. The Tool Arsenal](https://github.com/FlorianBruniaux/claude-code-ultimate-guide/blob/af05b84fb6e32432dae2114ee2a72c44ef3d29b1/guide/core/07-2._The_Tool_Arsenal.md)
- [3. Context Management Internals](https://github.com/FlorianBruniaux/claude-code-ultimate-guide/blob/af05b84fb6e32432dae2114ee2a72c44ef3d29b1/guide/core/08-3._Context_Management_Internals.md)
- [4. Sub-Agent Architecture](https://github.com/FlorianBruniaux/claude-code-ultimate-guide/blob/af05b84fb6e32432dae2114ee2a72c44ef3d29b1/guide/core/09-4._Sub-Agent_Architecture.md)
- [5. Permission & Security Model](https://github.com/FlorianBruniaux/claude-code-ultimate-guide/blob/af05b84fb6e32432dae2114ee2a72c44ef3d29b1/guide/core/10-5._Permission_Security_Model.md)
- [6. MCP Integration](https://github.com/FlorianBruniaux/claude-code-ultimate-guide/blob/af05b84fb6e32432dae2114ee2a72c44ef3d29b1/guide/core/11-6._MCP_Integration.md)
- [7. Advanced Tool Use Patterns (API)](https://github.com/FlorianBruniaux/claude-code-ultimate-guide/blob/af05b84fb6e32432dae2114ee2a72c44ef3d29b1/guide/core/12-7._Advanced_Tool_Use_Patterns_API.md)
- [8. The Edit Tool: How It Actually Works](https://github.com/FlorianBruniaux/claude-code-ultimate-guide/blob/af05b84fb6e32432dae2114ee2a72c44ef3d29b1/guide/core/13-8._The_Edit_Tool_How_It_Actually_Works.md)
- [9. Session Persistence](https://github.com/FlorianBruniaux/claude-code-ultimate-guide/blob/af05b84fb6e32432dae2114ee2a72c44ef3d29b1/guide/core/14-9._Session_Persistence.md)
- [10. Philosophy: Less Scaffolding, More Model](https://github.com/FlorianBruniaux/claude-code-ultimate-guide/blob/af05b84fb6e32432dae2114ee2a72c44ef3d29b1/guide/core/15-10._Philosophy_Less_Scaffolding_More_Mod.md)
- [11. Claude Code vs Alternatives](https://github.com/FlorianBruniaux/claude-code-ultimate-guide/blob/af05b84fb6e32432dae2114ee2a72c44ef3d29b1/guide/core/16-11._Claude_Code_vs_Alternatives.md)
- [12. Sources & References](https://github.com/FlorianBruniaux/claude-code-ultimate-guide/blob/af05b84fb6e32432dae2114ee2a72c44ef3d29b1/guide/core/17-12._Sources_References.md)
- [13. Appendix: What We Don't Know](https://github.com/FlorianBruniaux/claude-code-ultimate-guide/blob/af05b84fb6e32432dae2114ee2a72c44ef3d29b1/guide/core/18-13._Appendix_What_We_Don_t_Know.md)
- [Contributing](https://github.com/FlorianBruniaux/claude-code-ultimate-guide/blob/af05b84fb6e32432dae2114ee2a72c44ef3d29b1/guide/core/19-Contributing.md)
- [Anthropic API Patterns for Architects](https://github.com/FlorianBruniaux/claude-code-ultimate-guide/blob/af05b84fb6e32432dae2114ee2a72c44ef3d29b1/guide/core/20-Anthropic_API_Patterns_for_Architects.md)
- [Go further](https://github.com/FlorianBruniaux/claude-code-ultimate-guide/blob/af05b84fb6e32432dae2114ee2a72c44ef3d29b1/guide/core/21-Go_further.md)
