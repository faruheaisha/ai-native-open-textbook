---
title: "Menu component conventions"
sourceId: "10-context-memory/agent-skills-addyosmani"
sourceTitle: "Agent Skills（Addy Osmani）"
sourceKind: "技能与配置库"
licenseLabel: "可转载"
lang: "英文"
tier: 2
volume: "10-context-memory"
sourceUrl: "https://github.com/addyosmani/agent-skills"
entryUrl: "https://github.com/addyosmani/agent-skills/blob/6ca0cd7db39b41b1c37e26d335c507ee92382c6d/evals/fixtures/frontend-ui-engineering/design-system.md"
sourceRel: "evals/fixtures/frontend-ui-engineering/design-system.md"
rawUrl: "/raw/10-context-memory/agent-skills-addyosmani/evals/fixtures/frontend-ui-engineering/design-system.md"
sourceSha256: "10c2d3e53e438a8200dcf83b11d6663d846a47ae9cd458d0c5ddd6950fda6f9f"
pageSha256: "10c2d3e53e438a8200dcf83b11d6663d846a47ae9cd458d0c5ddd6950fda6f9f"
contentMode: "local-full"
zh: ""
---

# Menu component conventions

- Framework: React with TypeScript.
- Styling: existing `menu-*` utility classes; do not add a styling dependency.
- Public components accept `className` and forward a DOM ref.
- Components must support keyboard-only and screen-reader users.
- Focus returns to the trigger when a menu closes.
- Escape closes the menu; arrow keys move between enabled items.

The new dropdown should expose a trigger label and an array of actions. Disabled
actions remain visible but cannot receive focus or execute.
