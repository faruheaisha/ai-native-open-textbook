---
title: "Working with design systems: Using Components"
sourceId: "10-context-memory/openai-skills"
sourceTitle: "Agent Skills"
sourceKind: "技能与配置库"
licenseLabel: "仅引用"
lang: "英文"
tier: 3
volume: "10-context-memory"
sourceUrl: "https://github.com/openai/skills"
entryUrl: "https://github.com/openai/skills/blob/49f948faa9258a0c61caceaf225e179651397431/skills/.curated/figma-use/references/working-with-design-systems/wwds-components--using.md"
sourceRel: "skills/.curated/figma-use/references/working-with-design-systems/wwds-components--using.md"
rawUrl: "/raw/10-context-memory/openai-skills/skills/.curated/figma-use/references/working-with-design-systems/wwds-components--using.md"
sourceSha256: "e4e82a8492ec830f18a3120cae9755f389da92aabb2693ef87c396fd281af576"
pageSha256: "e4e82a8492ec830f18a3120cae9755f389da92aabb2693ef87c396fd281af576"
contentMode: "local-full"
zh: ""
---

# Working with design systems: Using Components

When using Figma components, you need to start by understanding the state of the source and the state of Figma.

For the source, you need to know what component is being referenced. This could come from a component key, a node ID, a name, or a Code Connect mapping. If you have a component key from a design system library, prefer `importComponentByKeyAsync` over finding by name, since names are not unique. If you only have a name, search the page or use `search_design_system` to find the right match.

For Figma, you need to know whether the component is local or in a library. Local components can be accessed directly by node ID. Published library components must be imported first — `importComponentByKeyAsync` or `importComponentSetByKeyAsync` — before an instance can be created.

Before setting properties on an instance, read `componentPropertyDefinitions` from the main component first. Property names are not simple strings — TEXT, BOOLEAN, and INSTANCE_SWAP properties have a `#uid` suffix (e.g. `"Label#1234"`). Only VARIANT properties are plain names (e.g. `"Size"`). Using the wrong key in `setProperties` will silently do nothing.

A component might have multiple text properties, which are not possible to derive from text node layer names. Look to the properties to help you understand what values to set, rather than thinking of setting text node characters directly.

When you need to set a nested instance swap (e.g. an icon property), you need the component key of the swap target, not just its name. Import the target component and pass its node ID.

Be aware that instances inside other instances are nested and changes made to a nested instance may be treated as overrides. If the intent is to change the default appearance, you need to modify the main component, not the instance.

When selecting which variant to use, read the `componentProperties` on the instance to see the current state, and `componentPropertyDefinitions` on the main component to see all available options.
