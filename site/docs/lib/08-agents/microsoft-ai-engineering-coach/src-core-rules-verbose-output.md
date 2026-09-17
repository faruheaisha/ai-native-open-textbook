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
entryUrl: "https://github.com/microsoft/AI-Engineering-Coach/blob/18b1a3d16b586c171426c6a407cc5c2dc073556e/src/core/rules/verbose-output.md"
sourceRel: "src/core/rules/verbose-output.md"
rawUrl: "/raw/08-agents/microsoft-ai-engineering-coach/src/core/rules/verbose-output.md"
sourceSha256: "e876bd007e133ffaa344c91ec4786a8af7d489aada9f0753dc7eca4e97d6aec0"
pageSha256: "e876bd007e133ffaa344c91ec4786a8af7d489aada9f0753dc7eca4e97d6aec0"
contentMode: "local-full"
zh: ""
---

# Description
Detects requests where the AI generated very long responses (>5K completion tokens) for short, low-context prompts. These rambling outputs burn through completion-token budgets without proportional value.

# When Triggered
&#123;&#123;count&#125;&#125; requests (&#123;&#123;pct&#125;&#125;) produced >&#123;&#123;extra.minCompletionTokens&#125;&#125; completion tokens from prompts shorter than &#123;&#123;extra.maxMessageLength&#125;&#125; characters. Verbose outputs are a major driver of token spend.

# How to Improve
Be explicit about response length and format: ask for "a concise answer", "a one-line summary", "no commentary", or specify a maximum number of bullets. Add output constraints to your custom instructions for routine tasks.

# Examples
"&#123;&#123;messageText | truncate:80&#125;&#125;" → &#123;&#123;completionTokens&#125;&#125; completion tokens

# Detection Logic
```detect
scan: requests
match: completionTokens > thresholds.minCompletionTokens AND messageLength > 0 AND messageLength < thresholds.maxMessageLength
aggregate: ratio
check: ratio > thresholds.maxRatio AND count > thresholds.minSample
examples: "{{messageText | truncate:80}}" → {{completionTokens}} tokens
```

# Tests
```test
{messageText: "fix this", messageLength: 8, completionTokens: 8000} -> triggered
{messageText: "Explain in detail how the OAuth flow works including token refresh, PKCE, and edge cases for mobile clients", messageLength: 110, completionTokens: 8000} -> clean
{messageText: "fix this", messageLength: 8, completionTokens: 200} -> clean
```
