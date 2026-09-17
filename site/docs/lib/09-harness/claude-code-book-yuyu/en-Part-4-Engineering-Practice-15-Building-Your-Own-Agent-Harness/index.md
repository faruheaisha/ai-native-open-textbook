---
title: "Chapter 15: Building Your Own Agent Harness"
sourceId: "09-harness/claude-code-book-yuyu"
sourceTitle: "御舆：解码 Agent Harness"
sourceKind: "工程手册"
licenseLabel: "仅引用"
lang: "中文"
tier: 1
volume: "09-harness"
sourceUrl: "https://github.com/lintsinghua/claude-code-book"
entryUrl: "https://github.com/lintsinghua/claude-code-book/blob/1e2068c05ba80b85d86caae7b4c32e7478e66d09/en/Part-4-Engineering-Practice/15-Building-Your-Own-Agent-Harness.md"
sourceRel: "en/Part-4-Engineering-Practice/15-Building-Your-Own-Agent-Harness.md"
rawUrl: "/raw/09-harness/claude-code-book-yuyu/en/Part-4-Engineering-Practice/15-Building-Your-Own-Agent-Harness.md"
sourceSha256: "3a95935e4829f49c45caae2e84380fdbe08a6e5998823e1b403a52762dfd2731"
pageSha256: "95dfe899ec17a1ca322854fcf950d5e6cf233dbd69b1145d62b1b5a3ab04635f"
contentMode: "local-full"
zh: ""
---

# Chapter 15: Building Your Own Agent Harness

> "The rules of thinking are lengthy and fortuitous. They require plenty of thinking of most long duration and deep meditation for a wizard to wrap one's noggin around."
> -- Comment in Claude Code

**Learning Objectives:** Synthesize knowledge from the entire book to design and implement a custom Agent Harness, mastering the complete engineering pipeline from dialog loop to production deployment.

---

## 本篇目录

- [15.1 Design Principles Review and Selection Guide](https://github.com/lintsinghua/claude-code-book/blob/1e2068c05ba80b85d86caae7b4c32e7478e66d09/en/Part-4-Engineering-Practice/01-15.1_Design_Principles_Review_and_Select.md)
- [15.2 Core Component Implementation Roadmap](https://github.com/lintsinghua/claude-code-book/blob/1e2068c05ba80b85d86caae7b4c32e7478e66d09/en/Part-4-Engineering-Practice/02-15.2_Core_Component_Implementation_Roadm.md)
- [15.3 Architectural Lessons from Claude Code](https://github.com/lintsinghua/claude-code-book/blob/1e2068c05ba80b85d86caae7b4c32e7478e66d09/en/Part-4-Engineering-Practice/03-15.3_Architectural_Lessons_from_Claude_C.md)
- [15.4 Production Considerations](https://github.com/lintsinghua/claude-code-book/blob/1e2068c05ba80b85d86caae7b4c32e7478e66d09/en/Part-4-Engineering-Practice/04-15.4_Production_Considerations.md)
- [15.5 The Future of Agent Harnesses](https://github.com/lintsinghua/claude-code-book/blob/1e2068c05ba80b85d86caae7b4c32e7478e66d09/en/Part-4-Engineering-Practice/05-15.5_The_Future_of_Agent_Harnesses.md)
- [Hands-on Exercises](https://github.com/lintsinghua/claude-code-book/blob/1e2068c05ba80b85d86caae7b4c32e7478e66d09/en/Part-4-Engineering-Practice/06-Hands-on_Exercises.md)
- [Key Takeaways](https://github.com/lintsinghua/claude-code-book/blob/1e2068c05ba80b85d86caae7b4c32e7478e66d09/en/Part-4-Engineering-Practice/07-Key_Takeaways.md)
