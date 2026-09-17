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
sourceRel: "cookbook/examples/agents_sdk/agent_improvement_loop.md"
rawUrl: "/raw/08-agents/openai-cookbook-docs/cookbook/examples/agents_sdk/agent_improvement_loop.md"
sourceSha256: "e4974f3b65d46cea41ba7561497e8602ad0731cfc5d1ab4d976c4f0246ea610a"
pageSha256: "5e3eb15e0dda5892c87c59b643bad4b37aea5c62ea727d8acca613821e79062f"
contentMode: "local-full"
zh: ""
---

## Step 9. Close the loop

Now that the full workflow is in place, we can revisit the optimization flywheel from the top of the notebook. The same architecture supports two operating modes.

![Agent improvement loop flywheel](https://developers.openai.com/cookbook/assets/images/agent-improvement-loop-flywheel.svg)

![Human review gates in the loop](https://developers.openai.com/cookbook/assets/images/agent-improvement-loop-human-gates.svg)

It can run as a closed loop, where new traces, human and model feedback, generated Promptfoo evals, HALO diagnosis, Codex implementation, validation, and deployment all feed the next cycle. In that mode, the handoff artifact can be written to shared storage, and a Codex automation with a heartbeat can keep checking for new handoffs, wake up when one appears, and trigger the next implementation pass automatically.

The developer can also add human gates wherever they want them, including trace review, eval refinement, pull request approval, merge, and deployment.

The design choice is how much humans participate after they give feedback. Human judgment can steer a loop where agents do the execution, or humans can remain approval gates throughout the process. In both versions, human feedback stays central because it shapes what the system learns and what it changes next.
