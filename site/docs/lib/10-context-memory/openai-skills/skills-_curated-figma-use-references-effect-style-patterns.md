---
title: "Effect Style API Patterns"
sourceId: "10-context-memory/openai-skills"
sourceTitle: "Agent Skills"
sourceKind: "技能与配置库"
licenseLabel: "仅引用"
lang: "英文"
tier: 3
volume: "10-context-memory"
sourceUrl: "https://github.com/openai/skills"
entryUrl: "https://github.com/openai/skills/blob/49f948faa9258a0c61caceaf225e179651397431/skills/.curated/figma-use/references/effect-style-patterns.md"
sourceRel: "skills/.curated/figma-use/references/effect-style-patterns.md"
rawUrl: "/raw/10-context-memory/openai-skills/skills/.curated/figma-use/references/effect-style-patterns.md"
sourceSha256: "a751255dc4997b323c0deb490860d63ba23f89d1863c689abfdb149fc9719652"
pageSha256: "a751255dc4997b323c0deb490860d63ba23f89d1863c689abfdb149fc9719652"
contentMode: "local-full"
zh: ""
---

# Effect Style API Patterns

> Part of the [use_figma skill](/lib/10-context-memory/openai-skills/skills-_curated-figma-use-SKILL). How to create, apply, and inspect effect styles using the Plugin API.
>
> For design system context (effect types, variable bindings on effects, gotchas), see [wwds-effect-styles](/lib/10-context-memory/openai-skills/skills-_curated-figma-use-references-working-with-design-systems-wwds-effect-styles).

## Contents

- Listing Effect Styles
- Creating a Drop Shadow Style
- Applying Effect Styles to Nodes

## Listing Effect Styles

```javascript
/**
 * Lists all local effect styles.
 *
 * @returns {Promise<Array<{id: string, name: string, key: string, effectCount: number}>>}
 */
async function listEffectStyles() {
  const styles = await figma.getLocalEffectStylesAsync();
  return styles.map(s => ({
    id: s.id,
    name: s.name,
    key: s.key,
    effectCount: s.effects.length
  }));
}
```

Full runnable script:

```javascript
(async () => {
  try {
    const results = await listEffectStyles();
    figma.closePlugin(JSON.stringify(results));
  } catch(e) { figma.closePluginWithFailure(e.toString()); }
})()
```

## Creating a Drop Shadow Style

Colors are **RGBA 0–1 range**. `effects` is a read-only array — always reassign, never mutate in place.

```javascript
/**
 * Creates a drop shadow effect style.
 *
 * @param {string} name - e.g. "Elevation/200"
 * @param {{ r: number, g: number, b: number, a: number }} color - RGBA, 0-1 range
 * @param {{ x: number, y: number }} offset
 * @param {number} radius - blur radius
 * @param {number} [spread=0]
 * @returns {EffectStyle}
 */
function createDropShadowStyle(name, color, offset, radius, spread) {
  const style = figma.createEffectStyle();
  style.name = name;
  style.effects = [{
    type: "DROP_SHADOW",
    color,
    offset,
    radius,
    spread: spread || 0,
    visible: true,
    blendMode: "NORMAL"
  }];
  return style;
}
```

Full runnable script:

```javascript
(async () => {
  try {
    const style = createDropShadowStyle(
      "Elevation/200",
      { r: 0, g: 0, b: 0, a: 0.15 },
      { x: 0, y: 4 },
      12,
      0
    );
    figma.closePlugin(JSON.stringify({ id: style.id, name: style.name }));
  } catch(e) { figma.closePluginWithFailure(e.toString()); }
})()
```

## Applying Effect Styles to Nodes

```javascript
/**
 * Applies an effect style to all nodes on the current page that match a given name pattern.
 *
 * @param {string} styleId - The ID of an EffectStyle.
 * @param {string} nodeNamePattern - Substring match against node names.
 * @returns {number} - Number of nodes the style was applied to.
 */
function applyEffectStyleToMatchingNodes(styleId, nodeNamePattern) {
  const nodes = figma.currentPage.findAll(n => n.name.includes(nodeNamePattern));
  let applied = 0;
  for (const node of nodes) {
    if ('effectStyleId' in node) {
      node.effectStyleId = styleId;
      applied++;
    }
  }
  return applied;
}
```

Full runnable script:

```javascript
(async () => {
  try {
    const applied = applyEffectStyleToMatchingNodes('STYLE_ID', 'Card');
    figma.closePlugin(JSON.stringify({ applied }));
  } catch(e) { figma.closePluginWithFailure(e.toString()); }
})()
```
