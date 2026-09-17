---
title: "openai-cookbook-docs"
sourceId: "08-agents/openai-cookbook-docs"
sourceTitle: "openai-cookbook-docs"
sourceKind: "官方文档"
licenseLabel: "仅引用"
lang: "英文"
tier: 3
volume: "08-agents"
sourceUrl: "https://developers.openai.com/cookbook"
entryUrl: "https://developers.openai.com/cookbook"
sourceRel: "cookbook/examples/partners/temporal_agents_with_knowledge_graphs/temporal_agents.md"
rawUrl: "/raw/08-agents/openai-cookbook-docs/cookbook/examples/partners/temporal_agents_with_knowledge_graphs/temporal_agents.md"
sourceSha256: "60af0697052abdc36b954c9ca21610d04c8f0d571ea518f561f8de0a7bc8de8c"
pageSha256: "6aae4bba0c7211a85f85712d1ae8fbe78ccfcf3a956054bfa0aa507a644fc647"
contentMode: "local-full"
zh: ""
---

### Multi-Step Retrieval Over a Knowledge Graph
<ol style="margin-left: 1em; line-height: 1.6; padding-left: 0.5em;">
  <li style="margin-bottom: 1.2em;">
    <strong>Why use multi-step retrieval?</strong><br />
<p style="margin-top: 0.5em; margin-bottom: 0.5em;">
  Direct, single-hop queries frequently miss salient facts distributed across a graph's topology. Multi-step (multi-hop) retrieval enables iterative traversal, following relationships and aggregating evidence across several hops. This methodology surfaces complex dependencies and latent connections that would remain hidden with one-shot lookups, providing more comprehensive and nuanced answers to sophisticated queries.
</p>
  </li>

  <li style="margin-bottom: 1.2em;">
    <strong>Planners</strong><br />
    <p style="margin-top: 0.5em; margin-bottom: 0.5em;">
      Planners orchestrate the retrieval process. <em>Task-orientated</em> planners decompose queries into concrete, sequential subtasks. <em>Hypothesis-orientated</em> planners, by contrast, propose claims to confirm, refute, or evolve. Choosing the optimal strategy depends on where the problem lies on the spectrum from deterministic reporting (well-defined paths) to exploratory research (open-ended inference).
    </p>
  </li>

  <li style="margin-bottom: 1.2em;">
    <strong>Tool Design Paradigms</strong><br />
    <p style="margin-top: 0.5em; margin-bottom: 0.5em;">
      Tool design spans a continuum: <em>Fixed tools</em> provide consistent, predictable outputs for specific queries (e.g., a service that always returns today’s weather for San Francisco). At the other end, <em>Free-form tools</em> offer broad flexibility, such as code execution or open-ended data retrieval. <em>Semi-structured tools</em> fall between these extremes, restricting certain actions while allowing tailored flexibility—specialized sub-agents are a typical example. Selecting the appropriate paradigm is a trade-off between control, adaptability, and complexity.
    </p>
  </li>

  <li style="margin-bottom: 1.2em;">
    <strong>Evaluating Retrieval Systems</strong><br />
<p style="margin-top: 0.5em; margin-bottom: 0.5em;">
  High-fidelity evaluation hinges on expert-curated "golden" answers, though these are costly and labor-intensive to produce. Automated judgments, such as those from LLMs or tool traces, can be quickly generated to supplement or pre-screen, but may lack the precision of human evaluation. As your system matures, transition towards leveraging real user feedback to measure and optimize retrieval quality in production.
</p>
    <p style="margin-top: 0.5em; margin-bottom: 0.5em;">
      A proven workflow: Start with synthetic tests, benchmark on your curated human-annotated "golden" dataset, and iteratively refine using live user feedback and ratings.
    </p>
  </li>
</ol>
