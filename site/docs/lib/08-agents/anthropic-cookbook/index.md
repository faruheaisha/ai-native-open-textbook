---
title: "Claude Cookbooks"
landing: true
tier: 1
sourceId: "08-agents/anthropic-cookbook"
sourceTitle: "Claude Cookbooks"
sourceKind: "官方资料集"
licenseLabel: "可转载"
lang: "英文"
volume: "08-agents"
sourceUrl: "https://github.com/anthropics/anthropic-cookbook"
entryUrl: "https://github.com/anthropics/anthropic-cookbook/blob/a97b9a2dc300635f0c26b5e05d0b54bbe0279ee5/README.md"
sourceRel: ""
contentMode: "local-full"
zh: ""
---

# Claude Cookbooks

The Claude Cookbooks provide code and guides designed to help developers build with Claude, offering copy-able code snippets that you can easily integrate into your own projects.

## 课时

- [Claude Capabilities](/lib/08-agents/anthropic-cookbook/capabilities.md)
  - [Classification with Claude](/lib/08-agents/anthropic-cookbook/capabilities-classification.md)
    - [Evaluations with Promptfoo](/lib/08-agents/anthropic-cookbook/capabilities-classification-evaluation.md)
  - [Content policy enforcement with Claude](/lib/08-agents/anthropic-cookbook/capabilities-content_moderation.md)
    - **data**
      - **ad_creatives**
        - [Ad Creative Acceptance Policy — Northwind Media Network](/lib/08-agents/anthropic-cookbook/capabilities-content_moderation-data-ad_creatives-policies.md)
      - **product_listings**
        - [Third-Party Listing Policy — Northwind Marketplace](/lib/08-agents/anthropic-cookbook/capabilities-content_moderation-data-product_listings-policies.md)
      - **ugc**
        - [Community Content Policy — Northwind Media](/lib/08-agents/anthropic-cookbook/capabilities-content_moderation-data-ugc-policies.md)
    - [Evaluation](/lib/08-agents/anthropic-cookbook/capabilities-content_moderation-evaluation.md)
  - [Retrieval Augmented Generation with Contextual Embeddings](/lib/08-agents/anthropic-cookbook/capabilities-contextual-embeddings.md)
  - [Knowledge Graph Construction with Claude](/lib/08-agents/anthropic-cookbook/capabilities-knowledge_graph.md)
    - [Knowledge Graph Extraction Evaluation](/lib/08-agents/anthropic-cookbook/capabilities-knowledge_graph-evaluation.md)
  - [Retrieval Augmented Generation with Claude](/lib/08-agents/anthropic-cookbook/capabilities-retrieval_augmented_generation.md)
    - [Evaluations with Promptfoo](/lib/08-agents/anthropic-cookbook/capabilities-retrieval_augmented_generation-evaluation.md)
  - [Summarization with Claude](/lib/08-agents/anthropic-cookbook/capabilities-summarization.md)
    - [Evaluations with Promptfoo](/lib/08-agents/anthropic-cookbook/capabilities-summarization-evaluation.md)
  - [Text-to-SQL with Claude](/lib/08-agents/anthropic-cookbook/capabilities-text_to_sql.md)
    - [Evaluations with Promptfoo](/lib/08-agents/anthropic-cookbook/capabilities-text_to_sql-evaluation.md)
- [Building Powerful Agents with the Claude Agent SDK](/lib/08-agents/anthropic-cookbook/claude_agent_sdk.md)
  - **chief_of_staff_agent**
    - [Chief of Staff Agent Architecture](/lib/08-agents/anthropic-cookbook/claude_agent_sdk-chief_of_staff_agent-flow_diagram.md)
    - **.claude**
      - **agents**
        - [Claude Cookbooks](/lib/08-agents/anthropic-cookbook/claude_agent_sdk-chief_of_staff_agent-_claude-agents-financial-analyst.md)
        - [Claude Cookbooks](/lib/08-agents/anthropic-cookbook/claude_agent_sdk-chief_of_staff_agent-_claude-agents-recruiter.md)
      - **commands**
        - [Claude Cookbooks](/lib/08-agents/anthropic-cookbook/claude_agent_sdk-chief_of_staff_agent-_claude-commands-budget-impact.md)
        - [Claude Cookbooks](/lib/08-agents/anthropic-cookbook/claude_agent_sdk-chief_of_staff_agent-_claude-commands-strategic-brief.md)
        - [Claude Cookbooks](/lib/08-agents/anthropic-cookbook/claude_agent_sdk-chief_of_staff_agent-_claude-commands-talent-scan.md)
      - **output-styles**
        - [Claude Cookbooks](/lib/08-agents/anthropic-cookbook/claude_agent_sdk-chief_of_staff_agent-_claude-output-styles-executive.md)
        - [Claude Cookbooks](/lib/08-agents/anthropic-cookbook/claude_agent_sdk-chief_of_staff_agent-_claude-output-styles-technical.md)
    - **output_reports**
      - [Budget Impact Analysis: Hiring 3 Senior Engineers](/lib/08-agents/anthropic-cookbook/claude_agent_sdk-chief_of_staff_agent-output_reports-hiring_decision.md)
      - [Q2 2024 Financial Forecast Report](/lib/08-agents/anthropic-cookbook/claude_agent_sdk-chief_of_staff_agent-output_reports-Q2_2024_Financial_Forecast.md)
  - [Hosting the research agent](/lib/08-agents/anthropic-cookbook/claude_agent_sdk-hosting.md)
    - [Tier 1 — Local Docker](/lib/08-agents/anthropic-cookbook/claude_agent_sdk-hosting-docker.md)
    - [Tier 3 — Kubernetes (pod-per-session)](/lib/08-agents/anthropic-cookbook/claude_agent_sdk-hosting-kubernetes.md)
    - [Tier 2 — Modal](/lib/08-agents/anthropic-cookbook/claude_agent_sdk-hosting-modal.md)
  - **observability_agent**
    - [Observability Agent Architecture](/lib/08-agents/anthropic-cookbook/claude_agent_sdk-observability_agent-architecture_diagram.md)
  - **research_agent**
    - [Research Agent Architecture](/lib/08-agents/anthropic-cookbook/claude_agent_sdk-research_agent-architecture_diagram.md)
- [Claude Managed Agents cookbooks](/lib/08-agents/anthropic-cookbook/managed_agents.md)
  - [CMA as an MCP server](/lib/08-agents/anthropic-cookbook/managed_agents-cma-mcp.md)
    - [Setup tips & tricks — CMA as an MCP server](/lib/08-agents/anthropic-cookbook/managed_agents-cma-mcp-skill.md)
  - **example_data**
    - [Example data](/lib/08-agents/anthropic-cookbook/managed_agents-example_data-OVERVIEW.md)
    - [Gate, expense approver](/lib/08-agents/anthropic-cookbook/managed_agents-example_data-gate.md)
    - [Iterate, get the tests green](/lib/08-agents/anthropic-cookbook/managed_agents-example_data-iterate.md)
    - [Orchestrate, drive an issue to a merged PR](/lib/08-agents/anthropic-cookbook/managed_agents-example_data-orchestrate.md)
    - **sre**
      - **runbooks**
        - [Runbook: OOMKilled / OutOfMemoryError](/lib/08-agents/anthropic-cookbook/managed_agents-example_data-sre-runbooks-oom.md)
  - [Linear × Claude Managed Agents](/lib/08-agents/anthropic-cookbook/managed_agents-linear.md)
    - [Setup tips & tricks — Linear × CMA webhook bridge](/lib/08-agents/anthropic-cookbook/managed_agents-linear-skill.md)
  - [MongoDB on Claude Managed Agents](/lib/08-agents/anthropic-cookbook/managed_agents-mongodb_on_cma.md)
  - [Road trip planner: stream sessions, scope vault credentials, override models, and review plans agent-to-agent](/lib/08-agents/anthropic-cookbook/managed_agents-roadtrip_planner.md)
    - [Setup walkthrough](/lib/08-agents/anthropic-cookbook/managed_agents-roadtrip_planner-skill.md)
  - [Self-Hosted Sandboxes](/lib/08-agents/anthropic-cookbook/managed_agents-self_hosted_sandboxes.md)
    - [Cloudflare demo — Self-Hosted Sandboxes (pure-Worker variant)](/lib/08-agents/anthropic-cookbook/managed_agents-self_hosted_sandboxes-cf-worker.md)
    - [Cloudflare demo — Self-Hosted Sandboxes (Container variant)](/lib/08-agents/anthropic-cookbook/managed_agents-self_hosted_sandboxes-cf.md)
    - [Daytona demo — Self-Hosted Sandboxes](/lib/08-agents/anthropic-cookbook/managed_agents-self_hosted_sandboxes-daytona.md)
    - [Docker demo — Self-Hosted Sandboxes](/lib/08-agents/anthropic-cookbook/managed_agents-self_hosted_sandboxes-docker.md)
    - **文档**
      - [Upgrading "Running a self-hosted worker"](/lib/08-agents/anthropic-cookbook/managed_agents-self_hosted_sandboxes-docs-upgrade-guide.md)
      - [Running a self-hosted worker](/lib/08-agents/anthropic-cookbook/managed_agents-self_hosted_sandboxes-docs-usage-guide.md)
    - [Modal demo — Self-Hosted Sandboxes](/lib/08-agents/anthropic-cookbook/managed_agents-self_hosted_sandboxes-modal.md)
    - [Vercel demo — Self-Hosted Sandboxes](/lib/08-agents/anthropic-cookbook/managed_agents-self_hosted_sandboxes-vercel.md)
  - [Sentry triage × Claude Managed Agents](/lib/08-agents/anthropic-cookbook/managed_agents-sentry.md)
    - [Setup tips & tricks: scheduled Sentry triage with vault env-var credentials](/lib/08-agents/anthropic-cookbook/managed_agents-sentry-skill.md)
  - [Slack × Claude Managed Agents](/lib/08-agents/anthropic-cookbook/managed_agents-slack.md)
    - [Setup tips & tricks — Slack × CMA webhook bridge](/lib/08-agents/anthropic-cookbook/managed_agents-slack-skill.md)
- **patterns**
  - [Building Effective Agents Cookbook](/lib/08-agents/anthropic-cookbook/patterns-agents.md)
    - **prompts**
      - [Claude Cookbooks](/lib/08-agents/anthropic-cookbook/patterns-agents-prompts-citations_agent.md)
      - [Claude Cookbooks](/lib/08-agents/anthropic-cookbook/patterns-agents-prompts-research_lead_agent.md)
      - [Claude Cookbooks](/lib/08-agents/anthropic-cookbook/patterns-agents-prompts-research_subagent.md)
- [Claude Skills Cookbook 🚀](/lib/08-agents/anthropic-cookbook/skills.md)
  - **custom_skills**
    - **analyzing-financial-statements**
      - [Financial Ratio Calculator Skill](/lib/08-agents/anthropic-cookbook/skills-custom_skills-analyzing-financial-statements-SKILL.md)
    - **applying-brand-guidelines**
      - [Brand Guidelines Reference](/lib/08-agents/anthropic-cookbook/skills-custom_skills-applying-brand-guidelines-REFERENCE.md)
      - [Corporate Brand Guidelines Skill](/lib/08-agents/anthropic-cookbook/skills-custom_skills-applying-brand-guidelines-SKILL.md)
    - **creating-financial-models**
      - [Financial Modeling Suite](/lib/08-agents/anthropic-cookbook/skills-custom_skills-creating-financial-models-SKILL.md)
- **third_party**
  - [Deepgram < Claude Cookbooks](/lib/08-agents/anthropic-cookbook/third_party-Deepgram.md)
  - [ElevenLabs < Claude Cookbooks](/lib/08-agents/anthropic-cookbook/third_party-ElevenLabs.md)
  - [LlamaIndex < Claude Cookbooks](/lib/08-agents/anthropic-cookbook/third_party-LlamaIndex.md)
  - **VoyageAI**
    - [Embeddings](/lib/08-agents/anthropic-cookbook/third_party-VoyageAI-how_to_create_embeddings.md)

开始学习 → [Evaluations with Promptfoo](capabilities-classification-evaluation.md)
