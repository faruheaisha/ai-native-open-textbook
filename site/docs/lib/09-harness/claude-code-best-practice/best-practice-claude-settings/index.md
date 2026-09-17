---
title: "Settings Best Practice"
sourceId: "09-harness/claude-code-best-practice"
sourceTitle: "Claude Code Best Practice"
sourceKind: "工程手册"
licenseLabel: "可转载"
lang: "英文"
tier: 1
volume: "09-harness"
sourceUrl: "https://github.com/shanraisshan/claude-code-best-practice"
entryUrl: "https://github.com/shanraisshan/claude-code-best-practice/blob/2d6ea151c0d7189c3eaf364809c5574bd210e545/best-practice/claude-settings.md"
sourceRel: "best-practice/claude-settings.md"
rawUrl: "/raw/09-harness/claude-code-best-practice/best-practice/claude-settings.md"
sourceSha256: "75075e7b44bd6afd58459b40b4d627c415bb3b04514783ad87ee15a97b2e8077"
pageSha256: "b1b7631b3efee38b69b5ae253d2d3c7bfd7f20a94a458fbb53128139e4af4808"
contentMode: "local-full"
zh: ""
---

# Settings Best Practice

 <br>

A comprehensive guide to all available configuration options in Claude Code's `settings.json` files. As of v2.1.252, Claude Code exposes **140+ settings** and **315+ environment variables** (use the `"env"` field in `settings.json` to avoid wrapper scripts).

<table width="100%">
<tr>
<td><a href="/lib/09-harness/claude-code-best-practice/overview">← Back to Claude Code Best Practice</a></td>
<td align="right"><img src="/mirror/08/083732f2d17cc173d2ce8cdf174e11bd1ccf34d9.svg" alt="Claude" width="60" /></td>
</tr>
</table>

## 本篇目录

- [Table of Contents](https://github.com/shanraisshan/claude-code-best-practice/blob/2d6ea151c0d7189c3eaf364809c5574bd210e545/best-practice/01-Table_of_Contents.md)
- [Settings Hierarchy](https://github.com/shanraisshan/claude-code-best-practice/blob/2d6ea151c0d7189c3eaf364809c5574bd210e545/best-practice/02-Settings_Hierarchy.md)
- [Core Configuration](https://github.com/shanraisshan/claude-code-best-practice/blob/2d6ea151c0d7189c3eaf364809c5574bd210e545/best-practice/03-Core_Configuration.md)
- [Permissions](https://github.com/shanraisshan/claude-code-best-practice/blob/2d6ea151c0d7189c3eaf364809c5574bd210e545/best-practice/04-Permissions.md)
- [Hooks](https://github.com/shanraisshan/claude-code-best-practice/blob/2d6ea151c0d7189c3eaf364809c5574bd210e545/best-practice/05-Hooks.md)
- [MCP Servers](https://github.com/shanraisshan/claude-code-best-practice/blob/2d6ea151c0d7189c3eaf364809c5574bd210e545/best-practice/06-MCP_Servers.md)
- [Sandbox](https://github.com/shanraisshan/claude-code-best-practice/blob/2d6ea151c0d7189c3eaf364809c5574bd210e545/best-practice/07-Sandbox.md)
- [Plugins](https://github.com/shanraisshan/claude-code-best-practice/blob/2d6ea151c0d7189c3eaf364809c5574bd210e545/best-practice/08-Plugins.md)
- [Model Configuration](https://github.com/shanraisshan/claude-code-best-practice/blob/2d6ea151c0d7189c3eaf364809c5574bd210e545/best-practice/09-Model_Configuration.md)
- [Display & UX](https://github.com/shanraisshan/claude-code-best-practice/blob/2d6ea151c0d7189c3eaf364809c5574bd210e545/best-practice/10-Display_UX.md)
- [AWS & Cloud Credentials](https://github.com/shanraisshan/claude-code-best-practice/blob/2d6ea151c0d7189c3eaf364809c5574bd210e545/best-practice/11-AWS_Cloud_Credentials.md)
- [Environment Variables (via env)](https://github.com/shanraisshan/claude-code-best-practice/blob/2d6ea151c0d7189c3eaf364809c5574bd210e545/best-practice/12-Environment_Variables_via_env.md)
- [Useful Commands](https://github.com/shanraisshan/claude-code-best-practice/blob/2d6ea151c0d7189c3eaf364809c5574bd210e545/best-practice/13-Useful_Commands.md)
- [Quick Reference: Complete Example](https://github.com/shanraisshan/claude-code-best-practice/blob/2d6ea151c0d7189c3eaf364809c5574bd210e545/best-practice/14-Quick_Reference_Complete_Example.md)
- [Sources](https://github.com/shanraisshan/claude-code-best-practice/blob/2d6ea151c0d7189c3eaf364809c5574bd210e545/best-practice/15-Sources.md)
