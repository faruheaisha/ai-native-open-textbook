---
title: "Source Registry"
sourceId: "10-context-memory/agent-skills-for-context-engineering"
sourceTitle: "Agent Skills for Context Engineering"
sourceKind: "技能与配置库"
licenseLabel: "可转载"
lang: "英文"
tier: 3
volume: "10-context-memory"
sourceUrl: "https://github.com/muratcankoylan/Agent-Skills-for-Context-Engineering"
entryUrl: "https://github.com/muratcankoylan/Agent-Skills-for-Context-Engineering/blob/6dbe1a1d868eab51a3bc9011b0f55e2891513e40/researcher/source-registry.md"
sourceRel: "researcher/source-registry.md"
rawUrl: "/raw/10-context-memory/agent-skills-for-context-engineering/researcher/source-registry.md"
sourceSha256: "fd31a098e68ad17137821045b668ac719a22a8dbe34e86fb95f9d368f4506290"
pageSha256: "fd31a098e68ad17137821045b668ac719a22a8dbe34e86fb95f9d368f4506290"
contentMode: "local-full"
zh: ""
---

# Source Registry

Use this registry to decide what an autonomous researcher should monitor, what evidence is admissible, and what should be rejected before spending evaluation tokens.

## Priority Sources

| Tier | Source Class | Examples | Use |
| --- | --- | --- | --- |
| 1 | Peer-reviewed papers and major preprints | arXiv, OpenReview, conference proceedings | New mechanisms, benchmark results, ablations |
| 1 | AI lab engineering and research posts | OpenAI, Anthropic, DeepMind, Google Research, Meta, Microsoft, Cohere, Mistral, xAI | Production patterns, model behavior, agent architecture |
| 1 | Reproducible public code and benchmarks | GitHub repos, benchmark harnesses, leaderboards with logs | Harness design, validation methodology, implementation patterns |
| 2 | Infrastructure and agent product teams | Cursor, Vercel, LangChain, Cognition, Ramp, Prime Intellect, Modal, Browserbase | Operational lessons and system design patterns |
| 2 | Recognized practitioner deep dives | Maintainers, researchers, benchmark authors with public track record | Field reports and failure modes |
| 3 | Newsletters, summaries, podcasts, videos | Technical summaries with source links | Discovery leads only; evaluate primary sources before accepting |

## Exclusion Rules

Reject or defer sources that match any of these patterns:

1. Anonymous or unverifiable author with no primary evidence.
2. Vendor marketing with no mechanism, artifact, metric, or reproducible claim.
3. Basic tutorials that restate prompt engineering or RAG fundamentals.
4. Claims based only on screenshots, demos, or private anecdotes without enough detail to implement.
5. Content whose main insight is already covered in the repo without new evidence, failure modes, or implementation detail.

## Monitoring Queries

Use these query families when running web or paper discovery:

- `context engineering agent systems tool design evaluation memory compression`
- `harness engineering AI agents eval harness agent loop scratchpad`
- `autonomous research agent self improving agents experiment loop`
- `LLM agent evaluation rubric source quality citation accuracy`
- `agent memory durable scratchpad file system state`
- `AlphaEvolve FunSearch autoresearch autonomous experimentation`
- `OpenAI Anthropic Cohere DeepMind agent engineering blog`

## Source Metadata

Every candidate source must record:

```yaml
url: ""
title: ""
author_or_org: ""
published_at: ""
source_type: "paper | engineering_blog | documentation | benchmark | code | talk | other"
retrieval_status: "retrieved | partial | failed"
primary_or_secondary: "primary | secondary"
candidate_reason: ""
```

## Refresh Cadence

- Weekly: lab blogs, arXiv/OpenReview, public benchmark repos, and active engineering blogs.
- Monthly: older source revalidation for volatile claims, especially model-specific thresholds and benchmark numbers.
- Before PR: re-fetch every cited source and confirm the evidence still supports the proposed skill change.

## Acceptance Biases To Avoid

1. Do not accept a weak artifact because the organization is famous.
2. Do not reject negative or failed experiments if they reveal a practical failure mode.
3. Do not overvalue long reports. The target is implementable mechanism density.
4. Do not accept benchmark claims without checking evaluation setup, baselines, and limitations.
5. Do not treat secondary summaries as sources of truth when primary sources are available.
