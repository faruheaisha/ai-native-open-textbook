---
title: "Description"
sourceId: "08-agents/microsoft-ai-engineering-coach"
sourceTitle: "AI Engineering Coach（微软）"
sourceKind: "系统课程"
licenseLabel: "可转载"
lang: "英文"
tier: 3
volume: "08-agents"
sourceUrl: "https://github.com/microsoft/AI-Engineering-Coach"
entryUrl: "https://github.com/microsoft/AI-Engineering-Coach/blob/18b1a3d16b586c171426c6a407cc5c2dc073556e/src/core/rules/no-language-exploration.md"
sourceRel: "src/core/rules/no-language-exploration.md"
rawUrl: "/raw/08-agents/microsoft-ai-engineering-coach/src/core/rules/no-language-exploration.md"
sourceSha256: "3dff90a2ef59bf8779e4e1e0e8563e7f804eb92c1dc72e5a83967d48a71cc597"
pageSha256: "3dff90a2ef59bf8779e4e1e0e8563e7f804eb92c1dc72e5a83967d48a71cc597"
contentMode: "local-full"
zh: ""
---

# Description
Detects when no new programming languages have been explored recently, despite AI being a learning accelerator.

# When Triggered
You've used &#123;&#123;extra.totalLanguages&#125;&#125; languages total, but haven't explored a new one in &#123;&#123;count&#125;&#125; weeks. AI is a learning accelerator -- use it to try new languages and frameworks.

# How to Improve
AI coding assistants dramatically lower the barrier to learning new languages. Try asking Copilot to help you build something small in a language you haven't used before. Start with "Write a simple HTTP server in [Go/Rust/Elixir]" to break the ice.

# Examples
&#123;&#123;extra.languageList&#125;&#125;

# Detection Logic
```detect
scan: requests
match: timestamp > 0
aggregate: count
lang: langExplorationWeeks(allReqs)
emitCount: lang.weeksSinceNew
emitTotal: lang.totalWeeks
totalLanguages: lang.totalLangs
check: lang.recentNew == 0 AND lang.totalWeeks >= thresholds.minWeeks
severity: lang.weeksSinceNew > 12
```
