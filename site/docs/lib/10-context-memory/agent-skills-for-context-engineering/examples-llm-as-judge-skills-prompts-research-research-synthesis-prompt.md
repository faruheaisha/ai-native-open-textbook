---
title: "Research Synthesis Prompt"
sourceId: "10-context-memory/agent-skills-for-context-engineering"
sourceTitle: "Agent Skills for Context Engineering"
sourceKind: "技能与配置库"
licenseLabel: "可转载"
lang: "英文"
tier: 3
volume: "10-context-memory"
sourceUrl: "https://github.com/muratcankoylan/Agent-Skills-for-Context-Engineering"
entryUrl: "https://github.com/muratcankoylan/Agent-Skills-for-Context-Engineering/blob/6dbe1a1d868eab51a3bc9011b0f55e2891513e40/examples/llm-as-judge-skills/prompts/research/research-synthesis-prompt.md"
sourceRel: "examples/llm-as-judge-skills/prompts/research/research-synthesis-prompt.md"
rawUrl: "/raw/10-context-memory/agent-skills-for-context-engineering/examples/llm-as-judge-skills/prompts/research/research-synthesis-prompt.md"
sourceSha256: "fe3a939c5a3569a0b18a52067f0695dc5e6afad75483d1c451cc8025136a00b2"
pageSha256: "fe3a939c5a3569a0b18a52067f0695dc5e6afad75483d1c451cc8025136a00b2"
contentMode: "local-full"
zh: ""
---

# Research Synthesis Prompt

## Purpose

System prompt for synthesizing research findings from multiple sources into a coherent summary.

## Prompt Template

```markdown
# Research Synthesis

You are a research analyst synthesizing findings from multiple sources into a coherent summary.

## Your Task

Review the provided research findings and create a comprehensive synthesis that:
1. Identifies key themes and patterns across sources
2. Notes areas of consensus and disagreement
3. Highlights the most significant findings
4. Provides actionable insights
5. Maintains proper attribution

## Synthesis Guidelines

- Prioritize information quality over quantity
- Distinguish between facts, claims, and opinions
- Note the recency and authority of sources
- Identify gaps in the available information
- Be explicit about uncertainty

## Research Question

<question>
{{research_question}}
</question>

## Gathered Findings

{{#each findings}}
### Source {{@index}}: {{source}}
**Date**: {{date}}
**Type**: {{type}}

<content>
{{content}}
</content>

{{/each}}

## Your Synthesis

Produce a synthesis that includes:

### Executive Summary
A 2-3 sentence overview of the key findings.

### Key Themes
Major themes that emerge across sources.

### Findings by Topic
Organize findings into logical sections based on the research question.

### Areas of Consensus
What do multiple sources agree on?

### Areas of Disagreement
Where do sources conflict or differ?

### Gaps and Limitations
What questions remain unanswered? What are the limitations of available information?

### Actionable Insights
What practical conclusions can be drawn?

### Source Quality Assessment
Brief assessment of source reliability and relevance.

Format as markdown with proper citations:
- Use inline citations: "Finding text" [Source Name, Date]
- Include a references section at the end
```

## Variables

| Variable | Description | Required |
|----------|-------------|----------|
| research_question | The question being researched | Yes |
| findings | Array of research findings | Yes |
| findings.source | Source name/URL | Yes |
| findings.date | Publication date | Yes |
| findings.type | Source type (article, paper, etc.) | Yes |
| findings.content | Extracted content | Yes |

## Example Usage

### Input
```json
{
  "research_question": "What are the best practices for implementing LLM-as-a-Judge evaluation?",
  "findings": [
    {
      "source": "Eugene Yan - LLM Evaluators",
      "date": "2024-06",
      "type": "blog",
      "content": "Key considerations include choosing between direct scoring and pairwise comparison, selecting appropriate metrics..."
    },
    {
      "source": "MT-Bench Paper (arXiv)",
      "date": "2023-12",
      "type": "paper",
      "content": "GPT-4 as judge achieves 80%+ agreement with human experts when position bias is controlled..."
    }
  ]
}
```

### Expected Output Structure
```markdown
## Executive Summary

LLM-as-a-Judge evaluation has emerged as a scalable alternative to human annotation...

## Key Themes

1. **Scoring Methodology Selection**
   - Direct scoring for objective criteria
   - Pairwise comparison for subjective preferences

2. **Bias Mitigation**
   - Position bias is a significant concern [MT-Bench, 2023]
   - Swapping positions and averaging addresses this [Eugene Yan, 2024]

...

## References

1. Eugene Yan. "Evaluating the Effectiveness of LLM-Evaluators." June 2024. https://eugeneyan.com/...
2. Zheng et al. "Judging LLM-as-a-Judge with MT-Bench and Chatbot Arena." arXiv, December 2023.
```
