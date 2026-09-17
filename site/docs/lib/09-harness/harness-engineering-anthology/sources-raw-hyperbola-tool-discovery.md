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
entryUrl: "https://github.com/lopopolo/harness-engineering/blob/226c8d35fb6ea3ed55467753dba6dea2b5fd5778/sources/raw/hyperbola/tool-discovery.mdx"
sourceRel: "sources/raw/hyperbola/tool-discovery.mdx"
rawUrl: "/raw/09-harness/harness-engineering-anthology/sources/raw/hyperbola/tool-discovery.mdx"
sourceSha256: "fbdbbc0afd5803e67f87ed2bffa3fea5a3156247c65e6d049cd84a7030c94c33"
pageSha256: "fbdbbc0afd5803e67f87ed2bffa3fea5a3156247c65e6d049cd84a7030c94c33"
contentMode: "local-full"
zh: ""
---

# Harness Engineering 文集

import \{ Image \} from "astro:assets";

import figure from "./tools-for-bots.png?url";

Coding agents like Claude Code and OpenAI Codex don’t struggle with terminals;
they struggle **to discover** tools that exist. If a command isn’t in the
model’s training set or post-training hill climbing, they won’t even know to try
it. MCP fixes discovery by giving models a live, machine-readable catalog of
tools with names, descriptions, input schemas, and example calls. **MCP gives
the models tokens.**

<div class="mb-3 rounded-sm">
  &lt;Image
    class="mx-auto img-fluid d-block rounded-sm"
    height="350"
    width="350"
    src=\{figure\}
    alt="A 3D-rendered, diorama-style illustration shows a small, rounded robot with glossy black eyes sorting through a wooden crate filled with hand tools. The robot holds a hammer in one hand, with other tools like wrenches and a screwdriver neatly arranged in the crate. The scene features soft, neutral studio lighting and warm, natural tones, creating a minimal, premium look."
  />
</div>

Unix pipes and man pages gave humans both composition and discovery. In agentic
systems, LLMs provide composition and MCP gives LLMs discoverability +
affordances.

[MCP is the universal plugin interface][mcp-universal], but LLM behavior is
fundamentally driven by, and constrained by, input tokens. MCP offers something
that CLIs ambiently available in `$PATH` (or training data) never could: a
built-in mechanism to automatically prompt the model so it doesn’t have to guess
or hunt for tools.

[mcp-universal]:
  https://worksonmymachine.ai/p/mcp-an-accidentally-universal-plugin

The CLI your developer productivity team built to accelerate human developers is
illegible to a coding agent. **Agent-first development means prompting the model
from the start — and MCP bakes that into tool authorship.**
