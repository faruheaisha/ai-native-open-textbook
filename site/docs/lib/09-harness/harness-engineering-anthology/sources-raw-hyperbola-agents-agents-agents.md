---
title: "Harness Engineering 文集"
sourceId: "09-harness/harness-engineering-anthology"
sourceTitle: "Harness Engineering 文集"
sourceKind: "工程手册"
licenseLabel: "可转载"
lang: "英文"
tier: 2
volume: "09-harness"
sourceUrl: "https://github.com/lopopolo/harness-engineering"
entryUrl: "https://github.com/lopopolo/harness-engineering/blob/226c8d35fb6ea3ed55467753dba6dea2b5fd5778/sources/raw/hyperbola/agents-agents-agents.mdx"
sourceRel: "sources/raw/hyperbola/agents-agents-agents.mdx"
rawUrl: "/raw/09-harness/harness-engineering-anthology/sources/raw/hyperbola/agents-agents-agents.mdx"
sourceSha256: "a2b0c2841a43a564f64e4cf207f7c7d6fead47e71b41b7c3f901ea1664a8c944"
pageSha256: "a2b0c2841a43a564f64e4cf207f7c7d6fead47e71b41b7c3f901ea1664a8c944"
contentMode: "local-full"
zh: ""
---

# Harness Engineering 文集

import \{ Image \} from "astro:assets";

import figure from "./continuous-agent-execution.png?url";

Intelligence from the models is directly related to token consumption — that is
the core insight behind reasoning models and chain-of-thought. Every engineer,
and eventually every human, should be running at high token utilization.

A billion tokens per engineer per day is a utilization target. It asks how much
of the software lifecycle the agents are actually allowed to do.

<div class="mb-3 rounded-sm">
  &lt;Image
    class="mx-auto img-fluid d-block rounded-sm"
    height="500"
    width="500"
    src=\{figure\}
    alt="A 3D isometric scene showing multiple autonomous worker units operating in parallel across a shared system: code panels, logs, charts, and running services connected by conveyor belts and control nodes. The layout suggests continuous, high-throughput agent activity coordinated by structured harnesses rather than human oversight, rendered in a clean Airbnb-style miniature aesthetic on a white background."
  />
</div>

Writing patches is a small slice of the job. Most of the software lifecycle is
reading logs, checking traces, diffing behavior across releases, chasing down
performance regressions, inspecting crash dumps, following analytics, tightening
invariants, and proving that a fix actually worked.

As of March 2026, the numbers I have are 3-5 PRs per engineer per day on GPT-5.2
without Symphony and about 75 PRs per engineer per week with Symphony. The
difference is utilization. Symphony keeps the agent busy.

Utilization drops anywhere the agent cannot see or act. Datadog, Grafana, and
Statsig matter. Slack and Google Drive matter when the context lives there.
Deploy tooling, Linear, local dev environments, and web search matter too. If
the agent cannot inspect the traces, launch the app, check the analytics, or
land the fix, it sits idle.

Most software work is the long middle: opening the dashboard, checking the
trace, reproducing the bug, diffing the release, finding the bad assumption, and
proving the fix in a real system.

Utilization is what turns model intelligence into engineering output. Idle
agents usually mean missing access, missing context, or a human gate.
