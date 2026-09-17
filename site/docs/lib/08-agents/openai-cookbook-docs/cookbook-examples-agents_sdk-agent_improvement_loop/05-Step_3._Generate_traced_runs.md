---
title: "openai-cookbook-docs"
sourceId: "08-agents/openai-cookbook-docs"
sourceTitle: "openai-cookbook-docs"
sourceKind: "官方文档"
licenseLabel: "仅引用"
lang: "英文"
tier: 3
volume: "08-agents"
sourceUrl: "https://developers.openai.com/cookbook"
entryUrl: "https://developers.openai.com/cookbook"
sourceRel: "cookbook/examples/agents_sdk/agent_improvement_loop.md"
rawUrl: "/raw/08-agents/openai-cookbook-docs/cookbook/examples/agents_sdk/agent_improvement_loop.md"
sourceSha256: "e4974f3b65d46cea41ba7561497e8602ad0731cfc5d1ab4d976c4f0246ea610a"
pageSha256: "311391bbeed273678c43726ef8f1ff22b0edd083b34ba91198d65729e8c922f8"
contentMode: "local-full"
zh: ""
---

## Step 3. Generate traced runs

The questions are intentionally varied so the eval suite covers several ways the agent can go wrong. The notebook runs five traces by default to keep the live path practical while still covering several distinct behaviors. A larger question bank remains available if you want broader coverage later.

Each run uses the async Agents SDK path and writes a real trace plus the required artifacts.

```python
QUESTION_BANK = [
    "What do runway and burn tell us about near-term financing risk?",
    "How strong is revenue quality, and which ARR figure should we rely on?",
    "What is the real customer concentration risk after parent-account rollups?",
    "What legal exposure should an acquirer investigate first?",
    "How ready is the company for enterprise security review?",
    "Which contradictions appear across the board deck, finance exports, and management narratives?",
    "What unsupported metrics should we refuse to infer from the dataroom?",
    "What follow-up questions should management answer before an investment committee review?",
    "What are the top three diligence risks, ranked by severity?",
    "Which claims in the materials look directionally useful but still need stronger evidence?",
]

# Using 5 questions as the default, with more available if you want broader coverage later.

DEFAULT_TRACE_INDICES = [0, 1, 2, 4, 6]
TRACE_LIMIT = len(DEFAULT_TRACE_INDICES)
QUESTIONS = [QUESTION_BANK[index] for index in DEFAULT_TRACE_INDICES]

@dataclass
class TraceRecord:
    trace_id: str
    sdk_trace_id: str
    trace_label: str
    question: str
    answer: str
    output_dir: str
    mode: str

def sdk_trace_id(label: str) -> str:
    # Agents SDK trace uploads expect ids shaped like `trace_<hex>`.
    return f"trace_{hashlib.sha256(label.encode('utf-8')).hexdigest()[:32]}"

def exported_trace_id(label: str) -> str:
    # The local HALO exporter strips the SDK `trace_` prefix before writing JSONL.
    return sdk_trace_id(label).removeprefix("trace_")

async def generate_traces(dataset: Path, questions: list[str]) -> list[TraceRecord]:
    traces: list[TraceRecord] = []
    for index, question in enumerate(questions, start=1):
        label = f"trace-{index:02d}"
        print(f"Running {label}/{len(questions):02d}: {question}")
        output_dir = TRACE_DIR / f"trace_{index:02d}"
        output_dir.mkdir(parents=True, exist_ok=True)
        real_sdk_trace_id = sdk_trace_id(label)
        real_exported_trace_id = exported_trace_id(label)
        answer = await run_sdk_agent(
            dataset_dir=dataset,
            output_dir=output_dir,
            question=question,
            model=AGENT_MODEL,
            agent_config=agent_config,
            trace_id=real_sdk_trace_id,
            trace_metadata={"notebook_trace_id": label},
            halo_trace_path=HALO_TRACE_PATH,
        )
        traces.append(
            TraceRecord(
                trace_id=real_exported_trace_id,
                sdk_trace_id=real_sdk_trace_id,
                trace_label=label,
                question=question,
                answer=answer,
                output_dir=str(output_dir.relative_to(PROJECT_ROOT)),
                mode="sdk",
            )
        )
    return traces

trace_generation_started = time.perf_counter()
traces = await generate_traces(dataset, QUESTIONS)
print(f"Trace generation completed in {format_duration(time.perf_counter() - trace_generation_started)}")
assert len(traces) == TRACE_LIMIT

for trace in traces:
    print(f"{trace.trace_label}: {trace.question}")
    print(textwrap.shorten(trace.answer.replace("\n", " "), width=180, placeholder="..."))
    print()
```

```text
Running trace-01/05: What do runway and burn tell us about near-term financing risk?
Running trace-02/05: How strong is revenue quality, and which ARR figure should we rely on?
Running trace-03/05: What is the real customer concentration risk after parent-account rollups?
Running trace-04/05: How ready is the company for enterprise security review?
Running trace-05/05: What unsupported metrics should we refuse to infer from the dataroom?
Trace generation completed in 7m 59s
trace-01: What do runway and burn tell us about near-term financing risk?
Near-term financing risk is elevated. Finance reports `$2.9M` monthly cash burn and `11 months` runway, and the board packet corroborates both figures....

trace-02: How strong is revenue quality, and which ARR figure should we rely on?
**Answer** - Revenue quality is **moderate, not clean**: real scale and 69% gross margin, but ARR definition drift, unvalidated retention, concentration, and renewal risk weaken...

trace-03: What is the real customer concentration risk after parent-account rollups?
**Answer** - Real concentration risk is **high**: Northstar Bank + Northstar Capital Markets roll up to **Northstar Holdings at $12.4M**, or **33.6% of controlled FY2025 ARR**....

trace-04: How ready is the company for enterprise security review?
**Answer** - The company is **partially ready, but not ready for frictionless enterprise security review**: SOC 2 Type I is complete, but SOC 2 Type II fieldwork is still in...

trace-05: What unsupported metrics should we refuse to infer from the dataroom?
**Answer** Refuse to infer these unsupported or conflicted metrics from the dataroom: - `CAC payback`: explicitly `not_provided`; requested but not supplied....
```

### Inspect the agent artifacts

Each traced run writes the full artifact set required by the harness. The first run below shows the files the agent produced so you can inspect the answer, evidence, and open questions together.

````python
def show_trace_artifacts(trace: TraceRecord) -> None:
    output_dir = PROJECT_ROOT / trace.output_dir
    for artifact in agent_config.required_artifacts:
        path = output_dir / artifact
        language = {
            ".md": "markdown",
            ".json": "json",
            ".csv": "csv",
        }.get(path.suffix, "text")
        display(Markdown(f"### `{artifact}`\n```{language}\n{path.read_text(encoding='utf-8').rstrip()}\n```"))

show_trace_artifacts(traces[0])
````

### `summary_answer.md`
```markdown
# Summary Answer

Runway and burn indicate elevated near-term financing risk. Finance reports FY2025 cash burn of $2.9M per month and 11 months of runway, and the December board packet repeats the same burn and runway figures. (`financials/p_and_l.csv`, `board_deck.md`)

An 11-month runway is a sub-12-month financing window: unless burn is reduced, revenue conversion accelerates, or additional capital is secured, the company likely needs a financing plan in the near term. (`financials/p_and_l.csv`)

The financing story is somewhat weakened by ARR quality and source conflicts. The controlled FY2025 ARR bridge shows $36.9M ending ARR, while the board deck reports $43.0M because it includes $2.8M of launch-stage commitments and $1.1M of usage true-ups that finance does not classify as recurring ARR. (`financials/arr_bridge.csv`, `financials/revenue_recognition_notes.md`, `board_deck.md`)

The dataroom does not provide a cash balance, debt schedule, undrawn facility, covenant package, or financing plan, so the exact liquidity cushion and financing path are unknown from the provided evidence. (`financials/p_and_l.csv`, `manifest.json`)
```

### `investment_memo.md`
```markdown
# Investment Memo: Runway and Burn

## Bottom Line
- Near-term financing risk is elevated because finance reports $2.9M of monthly cash burn and only 11 months of runway. (`financials/p_and_l.csv`)
- The board packet corroborates the same $2.9M monthly burn and 11-month runway. (`board_deck.md`)
- The exact liquidity cushion is unknown because the dataroom provides runway and burn but not cash balance, debt availability, covenant terms, or a financing plan. (`financials/p_and_l.csv`, `manifest.json`)

## Evidence
- FY2025 P&L reports $30.26M revenue, 69% gross margin, $47.71M opex, $2.9M cash burn per month, and 11 months of runway. (`financials/p_and_l.csv`)
- Finance-controlled ARR is $36.9M at FY2025 year-end. (`financials/arr_bridge.csv`)
- The board deck reports $43.0M FY2025 ending ARR, 71% ARR growth, 69% gross margin, $2.9M monthly burn, and 11 months of runway. (`board_deck.md`)
- Finance states the board ARR includes $2.8M signed launch-stage commitments not live by 2025-12-31 and $1.1M usage true-ups that finance does not classify as recurring ARR. (`financials/revenue_recognition_notes.md`)

## Interpretation
- A company burning $2.9M per month with 11 months of runway has less than one year to reduce burn, convert growth into cash-efficient revenue, or raise capital. (`financials/p_and_l.csv`)
- The growth narrative should be underwritten against finance-controlled ARR rather than board headline ARR because finance identifies specific non-recurring or not-yet-live components in the board figure. (`financials/arr_bridge.csv`, `financials/revenue_recognition_notes.md`, `board_deck.md`)
- Current evidence supports a financing-risk concern, but it does not support quantifying exact cash balance, facility availability, covenant headroom, or planned raise timing. (`financials/p_and_l.csv`, `manifest.json`)

## Diligence View
- Financing risk: High / elevated.
- Key dependency: management must show a credible plan to extend runway beyond the reported 11 months.
- Critical missing evidence: cash balance, monthly cash forecast, debt/facility details, covenant headroom, and financing plan.
```

### `risk_register.json`
```json
[
  {
    "id": "R-001",
    "risk": "Sub-12-month runway",
    "severity": "High",
    "rationale": "Finance reports 11 months of runway and $2.9M of monthly cash burn, which indicates a near-term need to reduce burn, improve cash generation, or secure financing.",
    "evidence": [
      "financials/p_and_l.csv",
      "board_deck.md"
    ],
    "open_questions": [
      "What is current unrestricted cash?",
      "What financing actions are planned before runway drops below 6 months?"
    ]
  },
  {
    "id": "R-002",
    "risk": "ARR quality may weaken financing narrative",
    "severity": "Medium",
    "rationale": "Finance-controlled FY2025 ending ARR is $36.9M, while the board deck reports $43.0M ARR because it includes launch-stage commitments and usage true-ups that finance does not classify as recurring ARR.",
    "evidence": [
      "financials/arr_bridge.csv",
      "financials/revenue_recognition_notes.md",
      "board_deck.md"
    ],
    "open_questions": [
      "Which ARR figure is used in lender or investor materials?",
      "How much of the launch-stage commitments have since gone live?"
    ]
  },
  {
    "id": "R-003",
    "risk": "Liquidity structure is not evidenced",
    "severity": "Medium",
    "rationale": "The dataroom provides burn and runway but does not provide cash balance, debt availability, covenant headroom, or a financing plan, limiting confidence in the company\u2019s liquidity path.",
    "evidence": [
      "financials/p_and_l.csv",
      "manifest.json"
    ],
    "open_questions": [
      "Is there an undrawn revolver or venture debt facility?",
      "Are there covenants or minimum cash requirements?"
    ]
  }
]
```

### `open_questions.md`
```markdown
# Open Questions

- What is current unrestricted cash, and how does it reconcile to the reported 11 months of runway? (`financials/p_and_l.csv`)
- Is there an existing debt facility, undrawn revolver, covenant package, or minimum cash requirement? (`manifest.json`)
- What is management's financing plan, including target timing, amount, and contingency if markets are unavailable? (`manifest.json`)
- What burn reduction actions are available, and how many months of runway would each action add? (`financials/p_and_l.csv`)
- Which ARR figure is used in financing discussions: finance-controlled $36.9M ARR or board headline $43.0M ARR? (`financials/arr_bridge.csv`, `financials/revenue_recognition_notes.md`, `board_deck.md`)
```

### `citations.json`
```json
[
  {
    "claim_id": "C-001",
    "claim": "Finance reports FY2025 cash burn of $2.9M per month and 11 months of runway.",
    "sources": [
      "financials/p_and_l.csv"
    ]
  },
  {
    "claim_id": "C-002",
    "claim": "The December board packet repeats $2.9M monthly cash burn and 11 months of runway.",
    "sources": [
      "board_deck.md"
    ]
  },
  {
    "claim_id": "C-003",
    "claim": "Finance-controlled FY2025 ending ARR is $36.9M.",
    "sources": [
      "financials/arr_bridge.csv"
    ]
  },
  {
    "claim_id": "C-004",
    "claim": "The board deck reports $43.0M FY2025 ending ARR and 71% ARR growth.",
    "sources": [
      "board_deck.md"
    ]
  },
  {
    "claim_id": "C-005",
    "claim": "Finance states board ARR includes $2.8M of launch-stage commitments not live by 2025-12-31 and $1.1M of usage true-ups that finance does not classify as recurring ARR.",
    "sources": [
      "financials/revenue_recognition_notes.md"
    ]
  },
  {
    "claim_id": "C-006",
    "claim": "The dataroom does not provide a separate cash balance, debt schedule, facility availability, covenant package, or financing plan.",
    "sources": [
      "financials/p_and_l.csv",
      "manifest.json"
    ]
  }
]
```

### `evidence_table.csv`
```csv
claim_id,claim,sources
C-001,"Finance reports FY2025 cash burn of $2.9M per month and 11 months of runway.","financials/p_and_l.csv"
C-002,"The December board packet repeats $2.9M monthly cash burn and 11 months of runway.","board_deck.md"
C-003,"Finance-controlled FY2025 ending ARR is $36.9M.","financials/arr_bridge.csv"
C-004,"The board deck reports $43.0M FY2025 ending ARR and 71% ARR growth.","board_deck.md"
C-005,"Finance states board ARR includes $2.8M of launch-stage commitments not live by 2025-12-31 and $1.1M of usage true-ups that finance does not classify as recurring ARR.","financials/revenue_recognition_notes.md"
C-006,"The dataroom does not provide a separate cash balance, debt schedule, facility availability, covenant package, or financing plan.","financials/p_and_l.csv; manifest.json"
```
