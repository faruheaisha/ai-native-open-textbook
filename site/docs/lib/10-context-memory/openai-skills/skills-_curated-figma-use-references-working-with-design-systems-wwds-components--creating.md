---
title: "Working with design systems: Creating Components"
sourceId: "10-context-memory/openai-skills"
sourceTitle: "Agent Skills"
sourceKind: "技能与配置库"
licenseLabel: "仅引用"
lang: "英文"
tier: 3
volume: "10-context-memory"
sourceUrl: "https://github.com/openai/skills"
entryUrl: "https://github.com/openai/skills/blob/49f948faa9258a0c61caceaf225e179651397431/skills/.curated/figma-use/references/working-with-design-systems/wwds-components--creating.md"
sourceRel: "skills/.curated/figma-use/references/working-with-design-systems/wwds-components--creating.md"
rawUrl: "/raw/10-context-memory/openai-skills/skills/.curated/figma-use/references/working-with-design-systems/wwds-components--creating.md"
sourceSha256: "f383ea109e48c335c5855a8c7be15402e0ba72d5313c34cde6cebf550a6443ff"
pageSha256: "f383ea109e48c335c5855a8c7be15402e0ba72d5313c34cde6cebf550a6443ff"
contentMode: "local-full"
zh: ""
---

# Working with design systems: Creating Components

When creating Figma components, you need to start by understanding the source and its intent.

If the user is asking you to create a component based on a design or specification, you need to understand the property model before you build anything. What variants are needed? What text, boolean, or instance swap properties exist? Getting the structure right upfront matters because restructuring a component after instances exist is destructive.

If you are given a code component as reference (React props, tokens, etc.), your goal is to reflect the property surface as closely as makes sense in Figma's model. Not all code properties translate directly — hover and focus states are not props in web code, but they are variants in Figma. Understand those gaps and make deliberate decisions about how to represent them.

Variants are the most important thing to get right. Each combination of variant values creates a node on the canvas. Redundant combinations still exist as explicit nodes — there is no way to conditionally exclude them. Define only the axes you actually need.

Non-variant properties (text, boolean, instance swap) should be added after the variant structure is established. These are defined at the component/component set level and referenced by descendant nodes via `componentPropertyReferences`. Always connect them — a property that isn't wired to a descendant is invisible to users of the component.

If the user asks you to make architectural decisions, lean toward fewer variants and more boolean/text properties where possible. Variants multiply combinatorially; the other property types do not. An optional slot property in code might be a combination of instance swap and boolean visibility.

When naming properties, casing is less important since translation layers like Code Connect can do the mapping to represent the code form. Feel free to take a sentence or capitalized case approach for better readability in Figma.

Keep in mind that components often need to be published and connected to Code Connect for the full design-to-code workflow to work. Creating the component is only one part of the system.
