---
title: "Matt Pocock Skills（工程技能库）"
sourceId: "10-context-memory/mattpocock-skills"
sourceTitle: "Matt Pocock Skills（工程技能库）"
sourceKind: "技能与配置库"
licenseLabel: "可转载"
lang: "英文"
tier: 3
volume: "10-context-memory"
sourceUrl: "https://github.com/mattpocock/skills"
entryUrl: "https://github.com/mattpocock/skills/blob/3cca18b368ae95cdbdebbff572ccafa662551015/skills/engineering/to-spec/SKILL.md"
sourceRel: "skills/engineering/to-spec/SKILL.md"
rawUrl: "/raw/10-context-memory/mattpocock-skills/skills/engineering/to-spec/SKILL.md"
sourceSha256: "43ad9cf318e5e7d3d1fa360253a37021796dc87a0c2e595ad262661a10f85088"
pageSha256: "43ad9cf318e5e7d3d1fa360253a37021796dc87a0c2e595ad262661a10f85088"
contentMode: "local-full"
zh: ""
---

# Matt Pocock Skills（工程技能库）

This skill takes the current conversation context and codebase understanding and produces a spec. Do NOT interview the user; just synthesize what you already know.

The issue tracker and triage label vocabulary should have been provided to you. If not, tell the user to run `/setup-matt-pocock-skills`.

## Process

1. Explore the repo to understand the current state of the codebase, if you haven't already. Use the project's domain glossary vocabulary throughout the spec, and respect any ADRs in the area you're touching.

2. Sketch out the seams at which you're going to test the feature. Existing seams should be preferred to new ones. Use the highest seam possible. If new seams are needed, propose them at the highest point you can. The fewer seams across the codebase, the better - the ideal number is one.

Check with the user that these seams match their expectations.

3. Write the spec using the template below, then publish it to the project issue tracker. Apply the `ready-for-agent` triage label - no need for additional triage.
