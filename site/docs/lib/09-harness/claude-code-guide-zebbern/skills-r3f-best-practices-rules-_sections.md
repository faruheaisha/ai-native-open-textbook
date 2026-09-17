---
title: "Rule Sections"
sourceId: "09-harness/claude-code-guide-zebbern"
sourceTitle: "Claude Code Guide（zebbern）"
sourceKind: "工程手册"
licenseLabel: "可转载"
lang: "英文"
tier: 3
volume: "09-harness"
sourceUrl: "https://github.com/zebbern/claude-code-guide"
entryUrl: "https://github.com/zebbern/claude-code-guide/blob/64c890fe74c3ccfad673dc9c71dc85b8dd2f4817/skills/r3f-best-practices/rules/_sections.md"
sourceRel: "skills/r3f-best-practices/rules/_sections.md"
rawUrl: "/raw/09-harness/claude-code-guide-zebbern/skills/r3f-best-practices/rules/_sections.md"
sourceSha256: "17896d7bb30fd5780bdf8d8b6e65e8e12edd1da0785be155cc2f017bb383439a"
pageSha256: "17896d7bb30fd5780bdf8d8b6e65e8e12edd1da0785be155cc2f017bb383439a"
contentMode: "local-full"
zh: ""
---

# Rule Sections

## Priority 1: Performance & Re-renders (CRITICAL)
- perf-never-set-state-in-useframe
- perf-isolate-state
- perf-zustand-selectors
- perf-transient-subscriptions
- perf-memo-components
- perf-keys-for-lists
- perf-avoid-inline-objects
- perf-dispose-auto
- perf-visibility-toggle
- perf-r3f-perf

## Priority 2: useFrame & Animation (CRITICAL)
- frame-priority
- frame-delta-time
- frame-conditional-subscription
- frame-destructure-state
- frame-render-on-demand
- frame-avoid-heavy-computation

## Priority 3: Component Patterns (HIGH)
- component-jsx-elements
- component-attach-prop
- component-primitive
- component-extend
- component-forwardref
- component-dispose-null

## Priority 4: Canvas & Setup (HIGH)
- canvas-size-container
- canvas-camera-default
- canvas-gl-config
- canvas-shadows
- canvas-frameloop
- canvas-events
- canvas-linear-flat

## Priority 5: Drei Helpers (MEDIUM-HIGH)
- drei-use-gltf
- drei-use-texture
- drei-environment
- drei-orbit-controls
- drei-html
- drei-text
- drei-instances
- drei-use-helper
- drei-bounds
- drei-center
- drei-float

## Priority 6: Loading & Suspense (MEDIUM-HIGH)
- loading-suspense
- loading-preload
- loading-use-progress
- loading-lazy-components
- loading-error-boundary

## Priority 7: State Management (MEDIUM)
- state-zustand-store
- state-avoid-objects-in-store
- state-subscribeWithSelector
- state-persist
- state-separate-concerns

## Priority 8: Events & Interaction (MEDIUM)
- events-pointer-events
- events-stop-propagation
- events-cursor-pointer
- events-raycast-filter
- events-event-data

## Priority 9: Post-processing (MEDIUM)
- postpro-effect-composer
- postpro-common-effects
- postpro-selective-bloom
- postpro-custom-shader
- postpro-performance

## Priority 10: Physics Rapier (LOW-MEDIUM)
- physics-setup
- physics-body-types
- physics-colliders
- physics-events
- physics-api-ref
- physics-performance

## Priority 11: Leva Debug GUI (LOW)
- leva-basic
- leva-folders
- leva-conditional
