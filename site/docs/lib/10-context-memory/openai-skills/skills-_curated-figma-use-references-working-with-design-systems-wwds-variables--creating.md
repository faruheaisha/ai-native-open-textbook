---
title: "Working with design systems: Creating Variables"
sourceId: "10-context-memory/openai-skills"
sourceTitle: "Agent Skills"
sourceKind: "技能与配置库"
licenseLabel: "仅引用"
lang: "英文"
tier: 3
volume: "10-context-memory"
sourceUrl: "https://github.com/openai/skills"
entryUrl: "https://github.com/openai/skills/blob/49f948faa9258a0c61caceaf225e179651397431/skills/.curated/figma-use/references/working-with-design-systems/wwds-variables--creating.md"
sourceRel: "skills/.curated/figma-use/references/working-with-design-systems/wwds-variables--creating.md"
rawUrl: "/raw/10-context-memory/openai-skills/skills/.curated/figma-use/references/working-with-design-systems/wwds-variables--creating.md"
sourceSha256: "3a2f9796aac9d419705ca02b9fab29a46282f0921c4c0a01704cec7e43d8ccf2"
pageSha256: "3a2f9796aac9d419705ca02b9fab29a46282f0921c4c0a01704cec7e43d8ccf2"
contentMode: "local-full"
zh: ""
---

# Working with design systems: Creating Variables

When creating Figma variables, you need to start by understanding the state of the source data.

If the user is asking you to create variables based on values, they likely want you to indicate the structure. Whether or not you use semantic aliasing primitive will be based on the inputs you are given about the source data.

If you are given code inputs (JSON, CSS, etc) your goal should be to reflect the existing patterns as closely as possible, but also embrace the design context as distinct from code. For example, casing is less important since you have code syntax that can directly represent the code form. Feel free to take a sentence or capitalized case approach for better readability in Figma.

It is important to understand the underlying structure before you create anything. If there is an implied aliased setup, you want to get that right. You may also need to anticipate modes to know how to split things up. Sizes and Colors likely have different mode requirements in complex systems, so you want to consider that as you create the structure.

If someone asks you to just make a decision based on best practices, that answer will be relative to the complexity of the environment. A simple theme is great best practice for simple needs. Similarly, a complex extended collection setup for someone on an enterprise plan might also be best practice as well.

Keep in mind that systems might also require you to handle text and effect styles for some of the things specified in token libraries.
