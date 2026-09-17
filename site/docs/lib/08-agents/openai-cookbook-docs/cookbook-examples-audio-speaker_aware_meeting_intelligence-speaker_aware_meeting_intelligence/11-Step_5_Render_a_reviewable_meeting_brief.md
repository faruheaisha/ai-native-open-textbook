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
sourceRel: "cookbook/examples/audio/speaker_aware_meeting_intelligence/speaker_aware_meeting_intelligence.md"
rawUrl: "/raw/08-agents/openai-cookbook-docs/cookbook/examples/audio/speaker_aware_meeting_intelligence/speaker_aware_meeting_intelligence.md"
sourceSha256: "69a817e38abb5d8c4a2e4aa9b343ab8f4b306e5d0eb313b163f0c27b6071f535"
pageSha256: "1cc62dfa2ac82a383b503b51f15af77ef5a068c106af1c6c08b8cd19c8fd4980"
contentMode: "local-full"
zh: ""
---

## Step 5: Render a reviewable meeting brief

The review artifact keeps speaker, segment ID, timestamp, and quote evidence next to decisions, risks, and action items so humans can spot-check before anything is written downstream.

```python
def clean_markdown_cell(value: Any) -> str:
    if value is None:
        return "_Not specified._"
    return str(value).replace("|", "\\|").replace("\n", "<br>")

def render_evidence_refs(refs: Any) -> str:
    if not isinstance(refs, list) or not refs:
        return "_No evidence refs._"

    rendered = []
    for ref in refs:
        if not isinstance(ref, dict):
            continue
        segment_id = clean_markdown_cell(ref.get("segment_id", ""))
        quote = clean_markdown_cell(ref.get("quote", ""))
        rendered.append(f"`{segment_id}`: {quote}")
    return "<br>".join(rendered) if rendered else "_No evidence refs._"

def markdown_table(rows: list[dict[str, Any]], columns: list[tuple[str, Any]]) -> str:
    if not rows:
        return "_None identified._"

    header = "| " + " | ".join(title for title, _ in columns) + " |"
    divider = "| " + " | ".join("---" for _ in columns) + " |"
    body = []
    for row in rows:
        values = []
        for _, key in columns:
            value = key(row) if callable(key) else row.get(key, "")
            values.append(clean_markdown_cell(value))
        body.append("| " + " | ".join(values) + " |")
    return "\n".join([header, divider, *body])

def render_meeting_brief(intelligence: dict[str, Any]) -> str:
    follow_up = intelligence.get("follow_up_email", {})
    evidence_column = ("Evidence", lambda row: render_evidence_refs(row.get("evidence_refs", [])))
    lines = [
        "# Meeting Brief",
        "",
        "## Summary",
        "",
        str(intelligence.get("summary", "")).strip() or "_No summary generated._",
        "",
        "## Participants",
        "",
        markdown_table(
            intelligence.get("participants", []),
            [("Speaker", "speaker"), ("Inferred role", "inferred_role"), evidence_column],
        ),
        "",
        "## Customer Context",
        "",
        markdown_table(intelligence.get("customer_context", []), [("Fact", "fact"), evidence_column]),
        "",
        "## Decisions",
        "",
        markdown_table(
            intelligence.get("decisions", []),
            [("Decision", "decision"), ("Owner", "speaker_or_group"), evidence_column],
        ),
        "",
        "## Action Items",
        "",
        markdown_table(
            intelligence.get("action_items", []),
            [
                ("Owner", "owner_speaker"),
                ("Task", "task"),
                ("Due date or trigger", "due_date_or_trigger"),
                evidence_column,
            ],
        ),
        "",
        "## Risks",
        "",
        markdown_table(
            intelligence.get("risks", []),
            [("Risk", "risk"), ("Severity", "severity"), evidence_column, ("Mitigation", "mitigation")],
        ),
        "",
        "## Explicit Questions",
        "",
        markdown_table(
            intelligence.get("explicit_questions", []),
            [
                ("Question", "question"),
                ("Asked by", "asked_by_speaker"),
                ("Directed to", "directed_to_speaker"),
                evidence_column,
            ],
        ),
        "",
        "## Suggested Follow-ups",
        "",
        markdown_table(
            intelligence.get("suggested_follow_ups", []),
            [("Question", "question"), ("Rationale", "rationale"), evidence_column],
        ),
        "",
        "## Notable Quotes",
        "",
        markdown_table(
            intelligence.get("notable_quotes", []),
            [("Speaker", "speaker"), ("Quote", "quote"), ("Timestamp", "timestamp"), ("Segment ID", "segment_id")],
        ),
        "",
        "## Follow-up Email Draft",
        "",
        f"**Subject:** {follow_up.get('subject', '')}",
        "",
        str(follow_up.get("body", "")).strip(),
        "",
    ]
    return "\n".join(lines).rstrip() + "\n"

demo_brief = render_meeting_brief(demo_meeting_intelligence())
show_markdown(demo_brief)
```
