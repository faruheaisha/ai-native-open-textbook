---
title: "Social Media Content Skill"
sourceId: "09-harness/langchain-deepagents"
sourceTitle: "LangChain DeepAgents"
sourceKind: "产品仓库"
licenseLabel: "可转载"
lang: "英文"
tier: 3
volume: "09-harness"
sourceUrl: "https://github.com/langchain-ai/deepagents"
entryUrl: "https://github.com/langchain-ai/deepagents/blob/d93ab3351bbf4c3687212f665094ccad100f2c08/examples/deploy-content-writer/skills/social-media/SKILL.md"
sourceRel: "examples/deploy-content-writer/skills/social-media/SKILL.md"
rawUrl: "/raw/09-harness/langchain-deepagents/examples/deploy-content-writer/skills/social-media/SKILL.md"
sourceSha256: "1c949d767a74b82d8011b4389943dddaa1079a9fc6e77af3a47c1a129566f6ff"
pageSha256: "1c949d767a74b82d8011b4389943dddaa1079a9fc6e77af3a47c1a129566f6ff"
contentMode: "local-full"
zh: ""
---

# Social Media Content Skill

## Formats

### Twitter/X Thread
- Hook tweet: compelling question or bold statement (< 280 chars)
- 3-7 follow-up tweets expanding on the topic
- Final tweet with CTA or key takeaway
- Use line breaks for readability

### LinkedIn Post
- Opening hook (first 2 lines visible before "see more")
- 3-5 short paragraphs with key insights
- End with a question to drive engagement
- 1,300 character target length

### Short-form Update
- Single paragraph announcement or insight
- Link to longer content if available
- Under 280 characters for cross-platform use

## Guidelines

- Write in first person for LinkedIn, third person for company accounts
- Include 2-3 relevant hashtags (not more)
- Adapt tone: LinkedIn is more professional, Twitter is more conversational
- Every post should provide standalone value — don't just tease
- Use concrete numbers and results over vague claims

## Output

Save content to `social/<platform>/<slug>.md` (e.g., `social/twitter/ai-agents-thread.md`).
