---
title: "AI 工程从零到一（中文）"
sourceId: "07-coding/ai-engineering-from-scratch-zh"
sourceTitle: "AI 工程从零到一（中文）"
sourceKind: "源码研读"
licenseLabel: "可转载"
lang: "中文"
tier: 1
volume: "07-coding"
sourceUrl: "https://github.com/fancyboi999/ai-engineering-from-scratch-zh"
entryUrl: "https://github.com/fancyboi999/ai-engineering-from-scratch-zh/blob/109181ce68128c1bf27ec20867177007a8bace89/phases/15-autonomous-systems/21-metr-external-evaluation/outputs/skill-horizon-interpretation.md"
sourceRel: "phases/15-autonomous-systems/21-metr-external-evaluation/outputs/skill-horizon-interpretation.md"
rawUrl: "/raw/07-coding/ai-engineering-from-scratch-zh/phases/15-autonomous-systems/21-metr-external-evaluation/outputs/skill-horizon-interpretation.md"
sourceSha256: "0561fbec4133bed0f809f86d7f409d7a01568eb56efb67da59b919f74f31544d"
pageSha256: "0561fbec4133bed0f809f86d7f409d7a01568eb56efb67da59b919f74f31544d"
contentMode: "local-full"
zh: ""
---

# AI 工程从零到一（中文）

Given a vendor's published time-horizon claim (e.g., "our model completes 14-hour tasks at 50% reliability"), produce a gap analysis that quantifies the deployment-reality delta and flags any methodological weaknesses.

Produce:

1. **Methodology audit.** Identify the task suite (HCAST, RE-Bench, SWAA, or proprietary). Confirm the logistic fit is disclosed (slope, sample size, confidence interval). A horizon without methodology disclosure is a marketing claim.
2. **Task distribution fit.** Map the vendor's benchmark task distribution onto the user's production task distribution. If they diverge materially (vendor measures SWE tasks, production is customer-support flows), the number does not transfer.
3. **Eval-context gap.** Apply a 10–40% gap between benchmark horizon and deployment reality. Cite the Anthropic 2024 alignment-faking study and the 2026 International AI Safety Report on eval-context gaming. The actual gap depends on the eval protocol; gaming is higher on unstructured tasks.
4. **Tooling gap.** Benchmark tooling is clean and well-instrumented. Production tooling is messier. Estimate an additional 5–30% reliability discount.
5. **Human-in-the-loop assumption.** Benchmarks assume no HITL. Production agents with HITL run at higher reliability but lower autonomy. Adjust the horizon interpretation accordingly.

Hard rejects:
- Horizon claims with no source methodology or sample size.
- Claims that a benchmark horizon predicts deployment reliability.
- Vendors citing a 2025-or-earlier horizon number as current (the doubling time is ~7 months; 2025 numbers are stale within a year).
- Treating a 50% horizon as "will work most of the time" — 50% reliability is a coin flip.

Refusal rules:
- If the vendor does not disclose methodology, refuse and require the source paper or blog post.
- If the benchmark distribution does not overlap the production distribution, refuse and require internal evaluation.
- If the vendor cites horizons without a gaming audit on their specific eval pipeline, refuse to quote the number as a reliability prediction.

Output format:

Return a horizon-interpretation memo with:
- **Source methodology** (suite, fit method, sample size, CI)
- **Distribution overlap** (benchmark vs production; % mapping)
- **Eval-context gap estimate** (low / med / high with rationale)
- **Tooling gap estimate** (low / med / high)
- **HITL assumption** (benchmark-style autonomous vs production HITL)
- **Deploy-adjusted horizon** (horizon after gap and tooling discounts)
- **Readiness verdict** (production / staging / research-only)
