---
title: "Results Report Template"
sourceId: "09-harness/claude-howto"
sourceTitle: "Claude How-To"
sourceKind: "工程手册"
licenseLabel: "可转载"
lang: "英文"
tier: 2
volume: "09-harness"
sourceUrl: "https://github.com/luongnv89/claude-howto"
entryUrl: "https://github.com/luongnv89/claude-howto/blob/97bfb0685e03112ad39845889061d02cef6e534c/.claude/skills/lesson-quiz/references/results-template.md"
sourceRel: ".claude/skills/lesson-quiz/references/results-template.md"
rawUrl: "/raw/09-harness/claude-howto/.claude/skills/lesson-quiz/references/results-template.md"
sourceSha256: "c70d2c337397af3b25e5d9833ccd9db83dab37cb26049c849e7e9e99a6b09ef3"
pageSha256: "c70d2c337397af3b25e5d9833ccd9db83dab37cb26049c849e7e9e99a6b09ef3"
contentMode: "local-full"
zh: ""
---

# Results Report Template

The output format for Step 5 ("Score and Present Results"). Fill the bracketed placeholders; keep the headings and table columns as shown.

```markdown
## Lesson Quiz Results: [Lesson Name]

**Score: N/10** — [Grade label]
**Quiz timing**: [Before / During / After] the lesson
**Question breakdown**: N conceptual correct, N practical correct

### Per-Question Results

| # | Category | Question (short) | Your Answer | Result |
|---|----------|-----------------|-------------|--------|
| 1 | Conceptual | [abbreviated question] | [their answer] | [Correct / Incorrect] |
| 2 | Practical | ... | ... | ... |
| ... | ... | ... | ... | ... |

### Incorrect Answers — Review These

[For each incorrect answer, show:]

**Q[N]: [Full question text]**
- Your answer: [what they chose]
- Correct answer: [correct option]
- Explanation: [why it's correct]
- Review: [specific section of the lesson README to re-read]

### [Timing-specific message]

[If pre-test]:
**Pre-test score: N/10.** This gives you a baseline! Focus your study on the topics you missed. After completing the lesson, retake the quiz to measure your improvement.

[If during]:
**Progress check: N/10.** [If 7 or above: Great progress — keep going! If 5-6: Review the incorrect topics before continuing. If 0-4: Consider re-reading from the beginning.]

[If after]:
**Mastery check: N/10.** [If 9-10: You've mastered this lesson! Move on to the next. If 7-8: Almost there — review the missed topics and retake. If <7: Spend more time with the lesson, especially the sections marked above.]

### Recommended Next Steps

[Based on score and timing:]
- [If mastered]: Proceed to the next lesson in the roadmap: [next lesson link]
- [If proficient]: Review these specific sections, then retake: [list sections]
- [If developing or below]: Re-read the full lesson: [lesson link]. Focus on: [list weak categories]
- [Offer]: "Would you like to retake this quiz, try a different lesson, or get help with a specific topic?"
```

---

**Last Updated**: September 2, 2026
**Claude Code Version**: 2.1.257
**Sources**:
- https://code.claude.com/docs/en/overview
