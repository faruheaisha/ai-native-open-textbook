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
pageSha256: "2574af5007fd6ff58b1ae52cb656db0f8a668b23da53bbdbe0b8c0a16cb46b44"
contentMode: "local-full"
zh: ""
---

## Step 6: Add guardrails and write artifacts

The sample writes a `guardrail_report.json` with local checks for:

- normalized transcript segments;
- basic email and phone PII patterns;
- evidence references that point to real segment IDs and matching quotes;
- medium/high risk outputs;
- optional moderation flags;
- raw transcription response storage.

```python
def summarize_moderation_response(response: Any) -> dict[str, Any]:
    data = to_plain(response)
    summaries: list[dict[str, Any]] = []

    for result in data.get("results", []) if isinstance(data, dict) else []:
        categories = result.get("categories", {}) if isinstance(result, dict) else {}
        category_scores = result.get("category_scores", {}) if isinstance(result, dict) else {}
        flagged_categories = sorted(key for key, value in categories.items() if bool(value))
        top_scores = dict(sorted(category_scores.items(), key=lambda item: float(item[1] or 0.0), reverse=True)[:5])
        summaries.append(
            {
                "flagged": bool(result.get("flagged")) if isinstance(result, dict) else False,
                "flagged_categories": flagged_categories,
                "top_category_scores": top_scores,
            }
        )

    return {
        "id": data.get("id") if isinstance(data, dict) else None,
        "model": data.get("model") if isinstance(data, dict) else DEFAULT_MODERATION_MODEL,
        "flagged": any(item["flagged"] for item in summaries),
        "results": summaries,
    }

def moderate_text(text: str, model: str = DEFAULT_MODERATION_MODEL) -> dict[str, Any]:
    from openai import OpenAI

    client = OpenAI()
    response = client.moderations.create(model=model, input=text)
    return summarize_moderation_response(response)

def iter_evidence_refs(value: Any, path: str = "$") -> list[tuple[str, Any]]:
    found: list[tuple[str, Any]] = []
    if isinstance(value, dict):
        for key, inner in value.items():
            next_path = f"{path}.{key}"
            if key == "evidence_refs":
                found.append((next_path, inner))
            else:
                found.extend(iter_evidence_refs(inner, next_path))
    elif isinstance(value, list):
        for index, item in enumerate(value):
            found.extend(iter_evidence_refs(item, f"{path}[{index}]"))
    return found

def normalize_for_quote_match(text: str) -> str:
    return re.sub(r"\s+", " ", text).strip().casefold()

def validate_evidence_refs(intelligence: dict[str, Any], segments: list[Segment]) -> list[dict[str, Any]]:
    segment_by_id = {segment.segment_id: segment for segment in segments}
    problems: list[dict[str, Any]] = []

    for path, refs in iter_evidence_refs(intelligence):
        if not isinstance(refs, list) or not refs:
            problems.append({"path": path, "issue": "missing_or_empty_evidence_refs"})
            continue

        for index, ref in enumerate(refs):
            ref_path = f"{path}[{index}]"
            if not isinstance(ref, dict):
                problems.append({"path": ref_path, "issue": "evidence_ref_is_not_an_object"})
                continue

            segment_id = str(ref.get("segment_id", "")).strip()
            quote = str(ref.get("quote", "")).strip()
            if not segment_id or not quote:
                problems.append({"path": ref_path, "issue": "missing_segment_id_or_quote", "segment_id": segment_id})
                continue

            segment = segment_by_id.get(segment_id)
            if segment is None:
                problems.append({"path": ref_path, "issue": "unknown_segment_id", "segment_id": segment_id})
                continue

            if normalize_for_quote_match(quote) not in normalize_for_quote_match(segment.text):
                problems.append(
                    {
                        "path": ref_path,
                        "issue": "quote_not_found_in_segment",
                        "segment_id": segment_id,
                        "quote": quote,
                    }
                )

    for index, quote in enumerate(intelligence.get("notable_quotes", [])):
        if not isinstance(quote, dict):
            continue
        segment_id = str(quote.get("segment_id", "")).strip()
        quote_text = str(quote.get("quote", "")).strip()
        segment = segment_by_id.get(segment_id)
        if segment is None:
            problems.append({"path": f"$.notable_quotes[{index}]", "issue": "unknown_segment_id", "segment_id": segment_id})
        elif normalize_for_quote_match(quote_text) not in normalize_for_quote_match(segment.text):
            problems.append(
                {
                    "path": f"$.notable_quotes[{index}]",
                    "issue": "quote_not_found_in_segment",
                    "segment_id": segment_id,
                    "quote": quote_text,
                }
            )

    return problems

def add_guardrail_check(checks: list[dict[str, Any]], name: str, status: str, detail: str, evidence = None) -> None:
    check: dict[str, Any] = {"name": name, "status": status, "detail": detail}
    if evidence is not None:
        check["evidence"] = evidence
    checks.append(check)

def build_guardrail_report(
    segments: list[Segment],
    intelligence: dict[str, Any],
    meeting_brief: str,
    redaction_enabled: bool,
    raw_saved: bool,
    moderation_results: dict[str, Any],
) -> dict[str, Any]:
    checks: list[dict[str, Any]] = []
    transcript_text = transcript_for_model(segments)

    add_guardrail_check(
        checks,
        "transcript_segments_present",
        "pass" if segments else "fail",
        f"Found {len(segments)} normalized transcript segments.",
    )

    pii_found = pii_matches(transcript_text + "\n" + meeting_brief)
    pii_detail = (
        "Basic PII patterns remain after redaction."
        if redaction_enabled
        else "Basic PII patterns were detected; run with redaction or review before storage."
    )
    add_guardrail_check(
        checks,
        "basic_pii_scan",
        "review" if pii_found else "pass",
        pii_detail if pii_found else "No basic email or phone patterns detected.",
        {"matches": pii_found, "redaction_enabled": redaction_enabled},
    )

    evidence_ref_problems = validate_evidence_refs(intelligence, segments)
    add_guardrail_check(
        checks,
        "evidence_refs",
        "review" if evidence_ref_problems else "pass",
        (
            "Some evidence references are missing, cite unknown segments, or quote text that is not present in the cited segment."
            if evidence_ref_problems
            else "All evidence references point to real segments with matching quote text."
        ),
        {"problem_count": len(evidence_ref_problems), "examples": evidence_ref_problems[:5]},
    )

    risks = intelligence.get("risks", [])
    review_risks = [risk for risk in risks if str(risk.get("severity", "")).lower() in {"medium", "high"}]
    severity_counts = {
        "low": sum(1 for risk in risks if str(risk.get("severity", "")).lower() == "low"),
        "medium": sum(1 for risk in risks if str(risk.get("severity", "")).lower() == "medium"),
        "high": sum(1 for risk in risks if str(risk.get("severity", "")).lower() == "high"),
    }
    add_guardrail_check(
        checks,
        "risk_outputs",
        "review" if review_risks else "pass",
        "Medium or high risks should be reviewed before downstream writes." if review_risks else "No medium or high risks identified.",
        {"severity_counts": severity_counts},
    )

    moderation_flagged = [name for name, result in moderation_results.items() if isinstance(result, dict) and result.get("flagged")]
    if moderation_results:
        add_guardrail_check(
            checks,
            "moderation",
            "review" if moderation_flagged else "pass",
            "Moderation flagged content that should be reviewed." if moderation_flagged else "Moderation did not flag transcript or brief content.",
            {"flagged_artifacts": moderation_flagged},
        )
    else:
        add_guardrail_check(checks, "moderation", "not_run", "Moderation was not requested. Use moderation for content safety classification.")

    add_guardrail_check(
        checks,
        "raw_response_storage",
        "review" if raw_saved else "pass",
        "Raw transcription response was saved; confirm retention and access controls." if raw_saved else "Raw transcription response was not saved.",
    )

    status = "review_required" if any(check["status"] in {"review", "fail"} for check in checks) else "pass"
    if any(check["status"] == "fail" for check in checks):
        status = "fail"

    return {
        "status": status,
        "recommended_next_step": "Send artifacts to human review before downstream writes." if status != "pass" else "Artifacts passed local guardrail checks.",
        "checks": checks,
        "moderation": moderation_results,
    }

print("Guardrail helpers ready")
```

```python
def write_json(path: Path, payload: Any) -> None:
    path.write_text(json.dumps(payload, indent=2, ensure_ascii=False) + "\n", encoding="utf-8")

def write_artifacts(
    output_dir: Path,
    segments: list[Segment],
    intelligence: dict[str, Any],
    guardrail_report: dict[str, Any],
    raw_payload = None,
) -> None:
    output_dir.mkdir(parents=True, exist_ok=True)
    write_json(output_dir / "transcript_segments.json", [asdict(segment) for segment in segments])
    (output_dir / "speaker_labeled_transcript.md").write_text(transcript_as_markdown(segments), encoding="utf-8")
    write_json(output_dir / "meeting_intelligence.json", intelligence)
    (output_dir / "meeting_brief.md").write_text(render_meeting_brief(intelligence), encoding="utf-8")
    write_json(output_dir / "guardrail_report.json", guardrail_report)
    if raw_payload is not None:
        write_json(output_dir / "raw_transcription_response.json", to_plain(raw_payload))

def run_pipeline_from_segments(
    segments: list[Segment],
    output_dir: Path,
    intelligence = None,
    redaction_enabled: bool = False,
    moderation_results = None,
    raw_saved: bool = False,
    raw_payload = None,
) -> dict[str, Any]:
    if redaction_enabled:
        segments = redact_segments(segments)
    if intelligence is None:
        intelligence = generate_meeting_intelligence(segments)
    meeting_brief = render_meeting_brief(intelligence)
    guardrail_report = build_guardrail_report(
        segments=segments,
        intelligence=intelligence,
        meeting_brief=meeting_brief,
        redaction_enabled=redaction_enabled,
        raw_saved=raw_saved,
        moderation_results=moderation_results or {},
    )
    write_artifacts(output_dir, segments, intelligence, guardrail_report, raw_payload=raw_payload if raw_saved else None)
    return {
        "segments": segments,
        "intelligence": intelligence,
        "meeting_brief": meeting_brief,
        "guardrail_report": guardrail_report,
        "output_dir": output_dir,
    }

print("Artifact helpers ready")
```
