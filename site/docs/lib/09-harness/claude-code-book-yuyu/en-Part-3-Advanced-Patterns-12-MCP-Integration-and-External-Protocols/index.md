---
title: "Chapter 12: MCP Integration and External Protocols"
sourceId: "09-harness/claude-code-book-yuyu"
sourceTitle: "御舆：解码 Agent Harness"
sourceKind: "工程手册"
licenseLabel: "仅引用"
lang: "中文"
tier: 1
volume: "09-harness"
sourceUrl: "https://github.com/lintsinghua/claude-code-book"
entryUrl: "https://github.com/lintsinghua/claude-code-book/blob/1e2068c05ba80b85d86caae7b4c32e7478e66d09/en/Part-3-Advanced-Patterns/12-MCP-Integration-and-External-Protocols.md"
sourceRel: "en/Part-3-Advanced-Patterns/12-MCP-Integration-and-External-Protocols.md"
rawUrl: "/raw/09-harness/claude-code-book-yuyu/en/Part-3-Advanced-Patterns/12-MCP-Integration-and-External-Protocols.md"
sourceSha256: "3caa059d12b460674776e262e784e367d573cb11ccef9d217efc0a1ba03f0395"
pageSha256: "9afbe8a87022901f7fbfd7a23276a218aa870789c5f9c71e26427037aa4f9da1"
contentMode: "local-full"
zh: ""
---

# Chapter 12: MCP Integration and External Protocols

> "Protocols are the language systems use to communicate; good protocols turn integration into composition rather than coding."
> -- Adapted from *Designing Distributed Systems*

**Learning Objectives:** After reading this chapter, you will be able to:

- Understand the technical background behind MCP (Model Context Protocol), its design philosophy, and the core problems it solves
- Master the use cases, performance characteristics, and selection strategies for 8 connection configuration variants
- Analyze in depth the design logic behind 7 configuration scopes and the three-layer security strategy
- Understand the Bridge system's bidirectional communication architecture, SSE sequence number continuation, and multi-session security design
- Master the complete pipeline of MCP tool discovery, mapping, naming, and permission models
- Design enterprise-grade MCP security strategies, configure allowlists/denylists, and IDE integration
- Understand how MCP integration collaborates with the tool system (Chapter 3), hook system (Chapter 8)

---

## 本篇目录

- [12.1 MCP Architecture Overview](https://github.com/lintsinghua/claude-code-book/blob/1e2068c05ba80b85d86caae7b4c32e7478e66d09/en/Part-3-Advanced-Patterns/01-12.1_MCP_Architecture_Overview.md)
- [12.2 MCP Tool Integration](https://github.com/lintsinghua/claude-code-book/blob/1e2068c05ba80b85d86caae7b4c32e7478e66d09/en/Part-3-Advanced-Patterns/02-12.2_MCP_Tool_Integration.md)
- [12.3 MCP Permissions and Security](https://github.com/lintsinghua/claude-code-book/blob/1e2068c05ba80b85d86caae7b4c32e7478e66d09/en/Part-3-Advanced-Patterns/03-12.3_MCP_Permissions_and_Security.md)
- [12.4 IDE Integration: The Bridge System](https://github.com/lintsinghua/claude-code-book/blob/1e2068c05ba80b85d86caae7b4c32e7478e66d09/en/Part-3-Advanced-Patterns/04-12.4_IDE_Integration_The_Bridge_System.md)
- [Hands-on Exercises](https://github.com/lintsinghua/claude-code-book/blob/1e2068c05ba80b85d86caae7b4c32e7478e66d09/en/Part-3-Advanced-Patterns/05-Hands-on_Exercises.md)
- [Key Takeaways](https://github.com/lintsinghua/claude-code-book/blob/1e2068c05ba80b85d86caae7b4c32e7478e66d09/en/Part-3-Advanced-Patterns/06-Key_Takeaways.md)
