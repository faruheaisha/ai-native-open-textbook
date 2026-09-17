---
title: "Security Hardening Guide"
sourceId: "09-harness/claude-code-ultimate-guide"
sourceTitle: "Claude Code Ultimate Guide"
sourceKind: "工程手册"
licenseLabel: "可转载"
lang: "英文"
tier: 3
volume: "09-harness"
sourceUrl: "https://github.com/FlorianBruniaux/claude-code-ultimate-guide"
entryUrl: "https://github.com/FlorianBruniaux/claude-code-ultimate-guide/blob/af05b84fb6e32432dae2114ee2a72c44ef3d29b1/guide/security/security-hardening.md"
sourceRel: "guide/security/security-hardening.md"
rawUrl: "/raw/09-harness/claude-code-ultimate-guide/guide/security/security-hardening.md"
sourceSha256: "9e60a03ddb48e780dee266f946d4af20567529ee0e632ce6f3ed3cc721df06e8"
pageSha256: "ae86c59b6cbf0b9f88540cd625987d327ce37d551513f59721f1b1a095888baf"
contentMode: "local-full"
zh: ""
---

# Security Hardening Guide

> **Confidence**: Tier 2, based on CVE disclosures, security research (2024-2026), and community validation
>
> **Scope**: Active threats (attacks, injection, CVE). For data retention and privacy, see [data-privacy.md](/lib/09-harness/claude-code-ultimate-guide/guide-security-data-privacy)
>
> **Further reading**: [the attack surface nobody audits](https://florian.bruniaux.com/guides/claude-code-attack-surface/) walks through sandbox, hooks, MCP, and supply chain in one pass.

---

## 本篇目录

- [TL;DR - Decision Matrix](https://github.com/FlorianBruniaux/claude-code-ultimate-guide/blob/af05b84fb6e32432dae2114ee2a72c44ef3d29b1/guide/security/01-TL_DR_-_Decision_Matrix.md)
- [Apply Controls at the Owning Layer](https://github.com/FlorianBruniaux/claude-code-ultimate-guide/blob/af05b84fb6e32432dae2114ee2a72c44ef3d29b1/guide/security/02-Apply_Controls_at_the_Owning_Layer.md)
- [Part 1: Prevention (Before You Start)](https://github.com/FlorianBruniaux/claude-code-ultimate-guide/blob/af05b84fb6e32432dae2114ee2a72c44ef3d29b1/guide/security/03-Part_1_Prevention_Before_You_Start.md)
- [Part 2: Detection (While You Work)](https://github.com/FlorianBruniaux/claude-code-ultimate-guide/blob/af05b84fb6e32432dae2114ee2a72c44ef3d29b1/guide/security/04-Part_2_Detection_While_You_Work.md)
- [Part 3: Response (When Things Go Wrong)](https://github.com/FlorianBruniaux/claude-code-ultimate-guide/blob/af05b84fb6e32432dae2114ee2a72c44ef3d29b1/guide/security/05-Part_3_Response_When_Things_Go_Wrong.md)
- [Appendix: Quick Reference](https://github.com/FlorianBruniaux/claude-code-ultimate-guide/blob/af05b84fb6e32432dae2114ee2a72c44ef3d29b1/guide/security/06-Appendix_Quick_Reference.md)
- [Part 4: Integration (In Your Daily Workflow)](https://github.com/FlorianBruniaux/claude-code-ultimate-guide/blob/af05b84fb6e32432dae2114ee2a72c44ef3d29b1/guide/security/07-Part_4_Integration_In_Your_Daily_Workflo.md)
- [Claude Code as Security Scanner (Research Preview)](https://github.com/FlorianBruniaux/claude-code-ultimate-guide/blob/af05b84fb6e32432dae2114ee2a72c44ef3d29b1/guide/security/08-Claude_Code_as_Security_Scanner_Research.md)
- [See Also](https://github.com/FlorianBruniaux/claude-code-ultimate-guide/blob/af05b84fb6e32432dae2114ee2a72c44ef3d29b1/guide/security/09-See_Also.md)
- [References](https://github.com/FlorianBruniaux/claude-code-ultimate-guide/blob/af05b84fb6e32432dae2114ee2a72c44ef3d29b1/guide/security/10-References.md)
- [Part 7: Remote Control Security \{#remote-control-security\}](https://github.com/FlorianBruniaux/claude-code-ultimate-guide/blob/af05b84fb6e32432dae2114ee2a72c44ef3d29b1/guide/security/11-Part_7_Remote_Control_Security_remote-co.md)
- [Part 8: Cross-Session Messaging Threat Model \{#cross-session-messaging-threat-model\}](https://github.com/FlorianBruniaux/claude-code-ultimate-guide/blob/af05b84fb6e32432dae2114ee2a72c44ef3d29b1/guide/security/12-Part_8_Cross-Session_Messaging_Threat_Mo.md)
