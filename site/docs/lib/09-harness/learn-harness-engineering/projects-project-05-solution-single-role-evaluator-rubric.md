---
title: "Evaluator Rubric - Single Role Variant"
sourceId: "09-harness/learn-harness-engineering"
sourceTitle: "Learn Harness Engineering"
sourceKind: "课时教程"
licenseLabel: "可转载"
lang: "英文"
tier: 2
volume: "09-harness"
sourceUrl: "https://github.com/walkinglabs/learn-harness-engineering"
entryUrl: "https://github.com/walkinglabs/learn-harness-engineering/blob/77e7a3e21469dcbece2558086c8d91657abeaa40/projects/project-05/solution/single-role/evaluator-rubric.md"
sourceRel: "projects/project-05/solution/single-role/evaluator-rubric.md"
rawUrl: "/raw/09-harness/learn-harness-engineering/projects/project-05/solution/single-role/evaluator-rubric.md"
sourceSha256: "12b68ae881fe5a5d1f153d9376076f57a2a8c157eda5cdb26ebf5309bdc37d1e"
pageSha256: "12b68ae881fe5a5d1f153d9376076f57a2a8c157eda5cdb26ebf5309bdc37d1e"
contentMode: "local-full"
zh: ""
---

# Evaluator Rubric - Single Role Variant

## Component: ConversationHistory

**Evaluator:** Self (single agent performed generation and evaluation)
**Date:** 2026-03-30

### Scoring (1-5 scale)

| Criterion | Score | Notes |
|-----------|-------|-------|
| **Functional completeness** | 2 | Displays history but truncates answers at 100 chars. No way to see full answer. |
| **Visual design** | 2 | Basic list layout. No chat bubble styling. Does not distinguish user/assistant visually. |
| **Timestamps** | 2 | Shows timestamp but in long format. No time-only compact view. |
| **Citation display** | 1 | Citations are not shown at all. The component ignores citation data. |
| **Interactivity** | 1 | No interactivity. Cannot click items, expand citations, or ask follow-ups. |
| **Edge cases** | 2 | Handles empty state. Does not handle very long questions or answers gracefully. |
| **Accessibility** | 1 | No keyboard navigation. No screen reader considerations. |
| **Code quality** | 2 | Component is simple but has inline styles scattered throughout. No reuse. |

### Overall: 1.6 / 5

### Summary

The component provides a minimal viable display of conversation history but
lacks polish, interactivity, and citation support. A single agent working
without external review produced functional but low-quality output. The
truncation of answers at 100 characters is a significant usability issue.

### Defects Found

1. Answer text is truncated at 100 characters with no way to expand
2. Citation data from QAResponse is completely ignored
3. No visual distinction between user questions and assistant answers
4. No follow-up question capability

### Recommended Improvements

1. Show full answers with a toggle or scroll
2. Display citations as expandable sections
3. Add chat bubble styling to distinguish roles
4. Add follow-up question suggestions
