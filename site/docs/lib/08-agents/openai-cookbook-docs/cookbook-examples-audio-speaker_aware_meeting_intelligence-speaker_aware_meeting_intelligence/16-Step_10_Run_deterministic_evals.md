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
pageSha256: "47f3af2a8bf31a1629f8e2a1b7a33951ef9598d9782b0b25a8147a9e859e876f"
contentMode: "local-full"
zh: ""
---

## Step 10: Run deterministic evals

This section runs a small deterministic eval against the labeled demo fixture. It is still not a broad production eval, but it shows how to score extraction quality with reproducible rules before adding model-graded judgments.

The scorers below measure action-item precision/recall, explicit-question precision/recall, unsupported decisions, nullable unknown fields, and evidence-reference validity. For production, replace `GOLD_EVAL_LABELS` with a larger labeled dataset and run the same scorers across every example.

```python
GOLD_EVAL_LABELS: dict[str, Any] = {
    "action_items": [
        {
            "owner_speaker": "Solutions Engineer",
            "task_contains": ["send a prototype", "speaker-aware transcripts", "redaction pass", "crm sync"],
            "due_date_or_trigger": None,
            "evidence_segment_ids": ["seg_005"],
        }
    ],
    "explicit_questions": [
        {
            "question_contains": ["support handoff", "break down"],
            "asked_by_speaker": "Solutions Engineer",
            "directed_to_speaker": "Customer",
            "evidence_segment_ids": ["seg_001"],
        }
    ],
    "decisions": [],
}

def normalize_for_eval(text: Any) -> str:
    return re.sub(r"\s+", " ", str(text or "")).strip().casefold()

def evidence_ref_segment_ids(item: dict[str, Any]) -> set[str]:
    return {str(ref.get("segment_id", "")) for ref in item.get("evidence_refs", []) if isinstance(ref, dict)}

def contains_all_fragments(text: Any, fragments: list[str]) -> bool:
    normalized = normalize_for_eval(text)
    return all(normalize_for_eval(fragment) in normalized for fragment in fragments)

def action_item_matches_label(item: dict[str, Any], label: dict[str, Any]) -> bool:
    return (
        item.get("owner_speaker") == label.get("owner_speaker")
        and item.get("due_date_or_trigger") == label.get("due_date_or_trigger")
        and contains_all_fragments(item.get("task"), label.get("task_contains", []))
        and set(label.get("evidence_segment_ids", [])).issubset(evidence_ref_segment_ids(item))
    )

def explicit_question_matches_label(item: dict[str, Any], label: dict[str, Any]) -> bool:
    return (
        item.get("asked_by_speaker") == label.get("asked_by_speaker")
        and item.get("directed_to_speaker") == label.get("directed_to_speaker")
        and contains_all_fragments(item.get("question"), label.get("question_contains", []))
        and set(label.get("evidence_segment_ids", [])).issubset(evidence_ref_segment_ids(item))
    )

def precision_recall(predicted: list[dict[str, Any]], labels: list[dict[str, Any]], matcher) -> dict[str, Any]:
    matched_label_indexes: set[int] = set()
    matched_predictions = 0

    for item in predicted:
        for index, label in enumerate(labels):
            if index in matched_label_indexes:
                continue
            if matcher(item, label):
                matched_label_indexes.add(index)
                matched_predictions += 1
                break

    precision = matched_predictions / len(predicted) if predicted else (1.0 if not labels else 0.0)
    recall = len(matched_label_indexes) / len(labels) if labels else 1.0
    return {
        "precision": round(precision, 3),
        "recall": round(recall, 3),
        "matched_predictions": matched_predictions,
        "predicted_count": len(predicted),
        "label_count": len(labels),
    }

def evidence_ref_count(intelligence: dict[str, Any]) -> int:
    return sum(len(refs) for _, refs in iter_evidence_refs(intelligence) if isinstance(refs, list)) + len(intelligence.get("notable_quotes", []))

def run_deterministic_evals(
    intelligence: dict[str, Any],
    segments: list[Segment],
    labels: dict[str, Any],
) -> dict[str, Any]:
    action_item_scores = precision_recall(
        intelligence.get("action_items", []),
        labels.get("action_items", []),
        action_item_matches_label,
    )
    explicit_question_scores = precision_recall(
        intelligence.get("explicit_questions", []),
        labels.get("explicit_questions", []),
        explicit_question_matches_label,
    )
    evidence_problems = validate_evidence_refs(intelligence, segments)
    total_evidence_refs = evidence_ref_count(intelligence)
    valid_evidence_ref_rate = (
        round((total_evidence_refs - len(evidence_problems)) / total_evidence_refs, 3)
        if total_evidence_refs
        else 1.0
    )
    action_items = intelligence.get("action_items", [])
    nullable_due_date_rate = (
        round(sum(1 for item in action_items if item.get("due_date_or_trigger") is None) / len(action_items), 3)
        if action_items
        else 1.0
    )
    unsupported_decision_count = len(intelligence.get("decisions", [])) if not labels.get("decisions") else 0

    pass_conditions = [
        action_item_scores["precision"] == 1.0,
        action_item_scores["recall"] == 1.0,
        explicit_question_scores["precision"] == 1.0,
        explicit_question_scores["recall"] == 1.0,
        valid_evidence_ref_rate == 1.0,
        nullable_due_date_rate == 1.0,
        unsupported_decision_count == 0,
    ]

    return {
        "status": "pass" if all(pass_conditions) else "review_required",
        "action_items": action_item_scores,
        "explicit_questions": explicit_question_scores,
        "valid_evidence_ref_rate": valid_evidence_ref_rate,
        "evidence_ref_problem_count": len(evidence_problems),
        "unsupported_decision_count": unsupported_decision_count,
        "nullable_due_date_rate": nullable_due_date_rate,
    }

deterministic_eval_report = run_deterministic_evals(
    demo_run["intelligence"],
    demo_run["segments"],
    GOLD_EVAL_LABELS,
)
show_json(deterministic_eval_report, expanded=True)
assert deterministic_eval_report["status"] == "pass"
```
