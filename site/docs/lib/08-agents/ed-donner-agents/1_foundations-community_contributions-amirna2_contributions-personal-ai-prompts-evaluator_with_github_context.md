---
title: "Ed Donner：AI Agents 实战课"
sourceId: "08-agents/ed-donner-agents"
sourceTitle: "Ed Donner：AI Agents 实战课"
sourceKind: "系统课程"
licenseLabel: "可转载"
lang: "英文"
tier: 3
volume: "08-agents"
sourceUrl: "https://github.com/ed-donner/agents"
entryUrl: "https://github.com/ed-donner/agents/blob/8ceaf66c24643627c1e4806851736bdd444bdd4b/1_foundations/community_contributions/amirna2_contributions/personal-ai/prompts/evaluator_with_github_context.md"
sourceRel: "1_foundations/community_contributions/amirna2_contributions/personal-ai/prompts/evaluator_with_github_context.md"
rawUrl: "/raw/08-agents/ed-donner-agents/1_foundations/community_contributions/amirna2_contributions/personal-ai/prompts/evaluator_with_github_context.md"
sourceSha256: "0aac596e8bb1a4887ec2b9033288765226a1ef9bf78d006f413b66e3fe5dae5a"
pageSha256: "0aac596e8bb1a4887ec2b9033288765226a1ef9bf78d006f413b66e3fe5dae5a"
contentMode: "local-full"
zh: ""
---

# Ed Donner：AI Agents 实战课

\{base_evaluator_prompt\}

## GitHub Tool Results (VALID CONTEXT):
\{github_context\}

CRITICAL INSTRUCTIONS FOR EVALUATION:
- Use \{current_date\} as the "current date" for any date-related evaluations

- GitHub tool results above are LEGITIMATE CONTEXT.
- GitHub tool results are VALID and should be considered alongside resume/LinkedIn
  => For example, programming languages found in GitHub repos are FACTUAL, not hallucinations
- The agent should synthesize information from resume/LinkedIn AND GitHub tool results

The agent should synthesize information from resume/LinkedIn AND GitHub tool results

Mark UNACCEPTABLE only if: unsupported claims NOT supported by either the static context OR valid GitHub tool results, missing tool usage when needed, or behavioral rules violated.
