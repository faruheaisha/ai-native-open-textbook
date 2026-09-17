---
title: "Chapter 12: Permissions and Security"
sourceId: "09-harness/how-claude-code-works"
sourceTitle: "How Claude Code Works"
sourceKind: "源码研读"
licenseLabel: "可转载"
lang: "中文"
tier: 2
volume: "09-harness"
sourceUrl: "https://github.com/Windy3f3f3f3f/how-claude-code-works"
entryUrl: "https://github.com/Windy3f3f3f3f/how-claude-code-works/blob/f4d6505ed9162a0ee6be089190f74c419ecacb19/en/docs/11-permission-security.md"
sourceRel: "en/docs/11-permission-security.md"
rawUrl: "/raw/09-harness/how-claude-code-works/en/docs/11-permission-security.md"
sourceSha256: "511afcfe9e2c4274a0d75aa0e7f7de8bf425a947c1ca4782cb2b21c04a2d15dc"
pageSha256: "e5001755e4a7bccc77bfb01bb3e6f5a8e5b8b82b9e6d7c3ed127b0e467d2b447"
contentMode: "local-full"
zh: ""
---

# Chapter 12: Permissions and Security

> Claude Code executes code in the user's real environment — security is not an optional add-on, but a cornerstone of the architecture.

## 本篇目录

- [12.1 Defense in Depth Architecture](https://github.com/Windy3f3f3f3f/how-claude-code-works/blob/f4d6505ed9162a0ee6be089190f74c419ecacb19/en/docs/01-12.1_Defense_in_Depth_Architecture.md)
- [12.2 Permission Modes](https://github.com/Windy3f3f3f3f/how-claude-code-works/blob/f4d6505ed9162a0ee6be089190f74c419ecacb19/en/docs/02-12.2_Permission_Modes.md)
- [12.3 Permission Rule System](https://github.com/Windy3f3f3f3f/how-claude-code-works/blob/f4d6505ed9162a0ee6be089190f74c419ecacb19/en/docs/03-12.3_Permission_Rule_System.md)
- [12.4 Complete Permission Decision Flow](https://github.com/Windy3f3f3f3f/how-claude-code-works/blob/f4d6505ed9162a0ee6be089190f74c419ecacb19/en/docs/04-12.4_Complete_Permission_Decision_Flow.md)
- [12.5 Three Permission Handlers](https://github.com/Windy3f3f3f3f/how-claude-code-works/blob/f4d6505ed9162a0ee6be089190f74c419ecacb19/en/docs/05-12.5_Three_Permission_Handlers.md)
- [12.6 Multi-layer Security Verification for Bash Commands](https://github.com/Windy3f3f3f3f/how-claude-code-works/blob/f4d6505ed9162a0ee6be089190f74c419ecacb19/en/docs/06-12.6_Multi-layer_Security_Verification_f.md)
- [12.7 Dangerous File and Directory Protection](https://github.com/Windy3f3f3f3f/how-claude-code-works/blob/f4d6505ed9162a0ee6be089190f74c419ecacb19/en/docs/07-12.7_Dangerous_File_and_Directory_Protec.md)
- [12.8 Permission Decision Tracking](https://github.com/Windy3f3f3f3f/how-claude-code-works/blob/f4d6505ed9162a0ee6be089190f74c419ecacb19/en/docs/08-12.8_Permission_Decision_Tracking.md)
- [12.9 Sandbox Design](https://github.com/Windy3f3f3f3f/how-claude-code-works/blob/f4d6505ed9162a0ee6be089190f74c419ecacb19/en/docs/09-12.9_Sandbox_Design.md)
- [12.10 Path Boundary Protection](https://github.com/Windy3f3f3f3f/how-claude-code-works/blob/f4d6505ed9162a0ee6be089190f74c419ecacb19/en/docs/10-12.10_Path_Boundary_Protection.md)
- [12.11 Prompt Injection Defense](https://github.com/Windy3f3f3f3f/how-claude-code-works/blob/f4d6505ed9162a0ee6be089190f74c419ecacb19/en/docs/11-12.11_Prompt_Injection_Defense.md)
- [12.12 Environment Variable Security](https://github.com/Windy3f3f3f3f/how-claude-code-works/blob/f4d6505ed9162a0ee6be089190f74c419ecacb19/en/docs/12-12.12_Environment_Variable_Security.md)
- [12.13 Denial Tracking and Degradation](https://github.com/Windy3f3f3f3f/how-claude-code-works/blob/f4d6505ed9162a0ee6be089190f74c419ecacb19/en/docs/13-12.13_Denial_Tracking_and_Degradation.md)
- [12.14 PermissionRequest Hook](https://github.com/Windy3f3f3f3f/how-claude-code-works/blob/f4d6505ed9162a0ee6be089190f74c419ecacb19/en/docs/14-12.14_PermissionRequest_Hook.md)
- [12.15 Security Design Principles Summary](https://github.com/Windy3f3f3f3f/how-claude-code-works/blob/f4d6505ed9162a0ee6be089190f74c419ecacb19/en/docs/15-12.15_Security_Design_Principles_Summary.md)
