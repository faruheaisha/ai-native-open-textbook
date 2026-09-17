---
title: "Animation Rows"
sourceId: "10-context-memory/openai-skills"
sourceTitle: "Agent Skills"
sourceKind: "技能与配置库"
licenseLabel: "仅引用"
lang: "英文"
tier: 3
volume: "10-context-memory"
sourceUrl: "https://github.com/openai/skills"
entryUrl: "https://github.com/openai/skills/blob/49f948faa9258a0c61caceaf225e179651397431/skills/.curated/hatch-pet/references/animation-rows.md"
sourceRel: "skills/.curated/hatch-pet/references/animation-rows.md"
rawUrl: "/raw/10-context-memory/openai-skills/skills/.curated/hatch-pet/references/animation-rows.md"
sourceSha256: "5bdbb5693334a447128ed74af41981212d746bcbc21452671c21bdae8a39492f"
pageSha256: "5bdbb5693334a447128ed74af41981212d746bcbc21452671c21bdae8a39492f"
contentMode: "local-full"
zh: ""
---

# Animation Rows

The Codex app reads one fixed atlas: 8 columns, 9 rows, 192x208 pixels per cell.

| Row | State | Used columns | Durations |
| --- | --- | ---: | --- |
| 0 | idle | 0-5 | 280, 110, 110, 140, 140, 320 ms |
| 1 | running-right | 0-7 | 120 ms each, final 220 ms |
| 2 | running-left | 0-7 | 120 ms each, final 220 ms |
| 3 | waving | 0-3 | 140 ms each, final 280 ms |
| 4 | jumping | 0-4 | 140 ms each, final 280 ms |
| 5 | failed | 0-7 | 140 ms each, final 240 ms |
| 6 | waiting | 0-5 | 150 ms each, final 260 ms |
| 7 | running | 0-5 | 120 ms each, final 220 ms |
| 8 | review | 0-5 | 150 ms each, final 280 ms |

Unused cells after each row's final used column must be fully transparent.

## Row Purposes

- `idle`: calm, low-distraction breathing/blinking loop; use as the reduced-motion first frame. Keep motion subtle and persona-preserving.
- `running-right`: locomotion to the right; 8-frame loop should read directionally.
- `running-left`: mirrored or redrawn locomotion to the left; do not simply reuse right-facing frames unless the design is symmetric, and any mirror derivation must preserve frame order and timing semantics.
- `waving`: greeting or attention gesture; clear start, raised gesture, return.
- `jumping`: anticipation, lift, peak, descent, settle.
- `failed`: error/sad/deflated reaction; readable but not visually noisy.
- `waiting`: blocked-on-user-input state; expectant asking pose for approval, help, or user input.
- `running`: active task work state; focused processing, thinking, scanning, typing, or effortful concentration. This row is not foot-running; avoid jogging, sprinting, treadmill motion, raised knees, long steps, pumping arms, or directional travel.
- `review`: focused/inspecting/thinking loop suitable for review state.
