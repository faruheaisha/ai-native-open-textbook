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
entryUrl: "https://github.com/microsoft/AI-Engineering-Coach/blob/18b1a3d16b586c171426c6a407cc5c2dc073556e/src/core/rules/no-spec-driven-development.md"
sourceRel: "src/core/rules/no-spec-driven-development.md"
rawUrl: "/raw/08-agents/microsoft-ai-engineering-coach/src/core/rules/no-spec-driven-development.md"
sourceSha256: "1f3ab15b289ea998523e7eb2a4d6a706cf3e6ea6a7fe8a6ae2033beab9371a6c"
pageSha256: "1f3ab15b289ea998523e7eb2a4d6a706cf3e6ea6a7fe8a6ae2033beab9371a6c"
contentMode: "local-full"
zh: ""
---

# Description
Detects when few sessions start with specs, plans, or structured requirements. Spec-first development consistently beats vibe-coding.

# When Triggered
Only &#123;&#123;extra.specDrivenCount&#125;&#125; of &#123;&#123;extra.totalSessions&#125;&#125; sessions (&#123;&#123;extra.specPct&#125;&#125;%) start with specs, plans, or structured requirements. Spec-first development consistently beats vibe-coding.

# How to Improve
Adopt Spec-Driven Development (SDD): write a brief spec before coding.
How sessions are classified:
- Spec-driven: first prompt references a .md/.spec file, contains structured bullet points/numbered lists, uses keywords like "requirements", "acceptance criteria", "must", "ensure", or starts in plan mode.
- Planning: any request uses plan mode (/plan) or contains planning keywords (plan, architect, design, outline, roadmap).
- Unstructured: everything else — typically vague, single-sentence prompts that lead to more iterations.
Start each session with: 1) What you're building, 2) Acceptance criteria, 3) Constraints. Even 3 bullet points dramatically improve AI output quality.

# Examples
&#123;&#123;extra.workspace&#125;&#125;: "&#123;&#123;message&#125;&#125;..."

# Detection Logic
```detect
scan: sessions
match: requestCount >= 3 AND NOT (\
  anyMatch(first(requests).referencedFiles, patterns.specFileExts) OR \
  matches(first(requests).messageText, patterns.specKeywords) OR \
  (matches(first(requests).messageText, patterns.bulletList) AND lineCount(first(requests).messageText) >= 3) OR \
  (matches(first(requests).messageText, patterns.numberedList) AND lineCount(first(requests).messageText) >= 3) OR \
  matches(first(requests).messageText, patterns.headings) OR \
  first(requests).slashCommand == "plan" OR \
  contains(str(first(requests).agentMode), "plan"))
aggregate: count
specSessionTotal: countWhere(all, "requestCount", ">=", 3)
specRate: (specSessionTotal - count) / specSessionTotal
specDrivenCount: specSessionTotal - count
totalSessions: specSessionTotal
specPct: round(specRate * 100)
check: specSessionTotal >= thresholds.minAgentSessions AND specRate < thresholds.specRate
examples: {{workspaceName}}: not spec-driven
```
