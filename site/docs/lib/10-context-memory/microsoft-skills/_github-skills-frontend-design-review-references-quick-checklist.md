---
title: "Quick Checklist"
sourceId: "10-context-memory/microsoft-skills"
sourceTitle: "Microsoft Agent Skills"
sourceKind: "技能与配置库"
licenseLabel: "可转载"
lang: "英文"
tier: 3
volume: "10-context-memory"
sourceUrl: "https://github.com/microsoft/skills"
entryUrl: "https://github.com/microsoft/skills/blob/cf77b1efbf3117501f4727c476894751311ee885/.github/skills/frontend-design-review/references/quick-checklist.md"
sourceRel: ".github/skills/frontend-design-review/references/quick-checklist.md"
rawUrl: "/raw/10-context-memory/microsoft-skills/.github/skills/frontend-design-review/references/quick-checklist.md"
sourceSha256: "8043fd995ae8d10cdf1b387d856d2c63ef962758c088cc5873405a8bed3fd1ab"
pageSha256: "8043fd995ae8d10cdf1b387d856d2c63ef962758c088cc5873405a8bed3fd1ab"
contentMode: "local-full"
zh: ""
---

# Quick Checklist

Before approving any UI work:

## Design System Compliance
- [ ] Component verified in your Figma Design System
- [ ] Component implementation checked in your Component Library
- [ ] Figma Dev Mode specs followed (spacing, tokens, typography)
- [ ] Design tokens used (no hardcoded hex colors or pixel values)
- [ ] Token imports verified in code
- [ ] All variants/states implemented as designed in Figma
- [ ] Spacing measurements match Figma Dev Mode exactly
- [ ] Deviations documented with design approval

## Aesthetic Quality (especially for new designs)
- [ ] Clear conceptual direction (not generic overused fonts and cliched schemes)
- [ ] Distinctive typography (avoid overused fonts)
- [ ] Cohesive color palette with CSS variables
- [ ] Intentional motion (staggered reveals, hover states)
- [ ] Visual interest through composition (asymmetry, overlap, grid-breaking)
- [ ] Atmosphere through backgrounds (gradients, textures, patterns)
- [ ] Implementation complexity matches vision

## Frictionless
- [ ] Core task completable efficiently (≤3 interactions)
- [ ] Single clear primary action per view

## Quality Craft
- [ ] Uses design system components (verified in Figma)
- [ ] Design tokens used (no hardcoded values)
- [ ] Distinctive aesthetic (not generic overused fonts/cliched schemes)
- [ ] Accessible (Grade C minimum, Grade B ideal)
- [ ] Keyboard navigation complete
- [ ] Tested in light/dark/high contrast modes

## Trustworthy
- [ ] AI-generated content has disclaimer
- [ ] Error messages are actionable
