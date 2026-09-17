---
title: "Review Type Modifiers"
sourceId: "10-context-memory/microsoft-skills"
sourceTitle: "Microsoft Agent Skills"
sourceKind: "技能与配置库"
licenseLabel: "可转载"
lang: "英文"
tier: 3
volume: "10-context-memory"
sourceUrl: "https://github.com/microsoft/skills"
entryUrl: "https://github.com/microsoft/skills/blob/cf77b1efbf3117501f4727c476894751311ee885/.github/skills/frontend-design-review/references/review-type-modifiers.md"
sourceRel: ".github/skills/frontend-design-review/references/review-type-modifiers.md"
rawUrl: "/raw/10-context-memory/microsoft-skills/.github/skills/frontend-design-review/references/review-type-modifiers.md"
sourceSha256: "a8e2347d41954640c2f1aba14bd04baed91696fd5a6854d4d84735a358191c59"
pageSha256: "a8e2347d41954640c2f1aba14bd04baed91696fd5a6854d4d84735a358191c59"
contentMode: "local-full"
zh: ""
---

# Review Type Modifiers

Adjust focus based on review context:

## PR Review
- **Focus**: Code implementation, design system component usage, design token usage, accessibility in code
- **Check**: Proper imports, design tokens used (not hardcoded), ARIA attributes present
- **Verify**: Component matches Figma specs using Dev Mode

## Creative Frontend Review
- **Focus**: Aesthetic direction, typography choices, visual distinctiveness, motion design
- **Check**: Clear conceptual intent, avoiding generic AI patterns, cohesive execution
- **Verify**: Implementation complexity matches vision (maximalist needs elaborate code, minimalist needs precision)

## Design Review
- **Focus**: User flows, interaction patterns, visual hierarchy, navigation, design system alignment
- **Check**: Task completion path, action hierarchy, progressive disclosure
- **Verify**: All components exist in design system or have documented exceptions

## Accessibility Audit
- **Focus**: Deep dive Quality Craft pillar
- **Check**: Keyboard testing, screen reader testing, contrast ratios, ARIA patterns
- **Test with**: Screen readers (NVDA, JAWS, Narrator), keyboard only, 200% zoom
- **Verify**: Design system accessibility features are properly implemented

## Design System Compliance Audit
- **Focus**: Deep dive design system usage
- **Check**: All components match Figma specs, design tokens used throughout, no hardcoded values
- **Test**: Compare implementation side-by-side with Figma using Dev Mode
- **Verify**: Component variants, spacing, colors, typography all match design system
- **Document**: Any deviations with rationale and plan to align
