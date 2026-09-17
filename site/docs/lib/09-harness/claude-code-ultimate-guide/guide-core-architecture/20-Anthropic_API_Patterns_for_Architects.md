---
title: "Claude Code Ultimate Guide"
sourceId: "09-harness/claude-code-ultimate-guide"
sourceTitle: "Claude Code Ultimate Guide"
sourceKind: "工程手册"
licenseLabel: "可转载"
lang: "英文"
tier: 3
volume: "09-harness"
sourceUrl: "https://github.com/FlorianBruniaux/claude-code-ultimate-guide"
entryUrl: "https://github.com/FlorianBruniaux/claude-code-ultimate-guide/blob/af05b84fb6e32432dae2114ee2a72c44ef3d29b1/guide/core/architecture.md"
sourceRel: "guide/core/architecture.md"
rawUrl: "/raw/09-harness/claude-code-ultimate-guide/guide/core/architecture.md"
sourceSha256: "8d6da52e869bf1c04028a4cb8b16e5a7dd993877d379aa8b75c3433580d098d6"
pageSha256: "c50ec4528c5a938f6ad774ae8b976260ebe7fc85cd06a11c2021af8cc902f124"
contentMode: "local-full"
zh: ""
---

## Anthropic API Patterns for Architects

Three API-level features that architects must understand for production systems: the Message Batches API for cost-optimized bulk processing, `tool_choice` for guaranteed structured output, and strict-mode JSON schema enforcement.

---

### Message Batches API

The Batches API submits up to 100 messages in a single HTTP request and processes them asynchronously within a 24-hour window. The cost is 50% of the synchronous rate: same quality, half the price, at the cost of latency.

**When to use it:**

| Use case | Sync API | Streaming | Batch API |
|---|---|---|---|
| Interactive chat | yes | yes | no |
| Real-time analysis | yes | yes | no |
| Bulk document processing | no | no | yes (50% cheaper) |
| Multi-turn tool loops | yes | yes | no (not supported) |
| Nightly classification pipeline | no | no | yes |
| Large-scale data extraction | no | no | yes |

The Batches API does not support multi-turn conversations or `tool_use` continuation across turns. Each request in a batch is a single stateless call.

**Submit, poll, retrieve:**

```python
import anthropic
import time

client = anthropic.Anthropic()

batch = client.messages.batches.create(
    requests=[
        {
            "custom_id": f"doc-{i}",
            "params": {
                "model": "claude-opus-4-5",
                "max_tokens": 1024,
                "messages": [
                    {"role": "user", "content": f"Classify this document: {doc}"}
                ]
            }
        }
        for i, doc in enumerate(documents)
    ]
)

# Poll until done (processing_status: "in_progress" | "ended")
while batch.processing_status == "in_progress":
    time.sleep(60)
    batch = client.messages.batches.retrieve(batch.id)

# Stream results — each entry has a custom_id and a result
for result in client.messages.batches.results(batch.id):
    match result.type:
        case "succeeded":
            output = result.message.content[0].text
            process(result.custom_id, output)
        case "errored":
            log_error(result.custom_id, result.error.error.message)
        case "expired":
            requeue(result.custom_id)
```

Results stay available for 29 days after the batch ends, then are deleted automatically.

**Error handling at scale:**

Per-request errors do not fail the entire batch. A batch with 100 requests where 3 fail still returns 97 successful results. The pattern for resilient pipelines:

1. Process all `succeeded` results immediately.
2. Collect `errored` custom_ids for retry with exponential backoff.
3. Treat `expired` as a soft failure: the request never ran, so requeue it.

**Retry economics:**

Retrying individual failed items synchronously costs 2x the batch rate. If your error rate is below 5%, retrying synchronously is still net-cheaper than splitting batches further. Above 10% error rate, investigate the prompt before retrying at all.

---

### tool_choice: Controlling When Tools Fire

`tool_choice` governs whether and which tools the model can call. Four modes:

| Value | Behavior |
|---|---|
| `\{"type": "auto"\}` | Model decides; may or may not call tools (default) |
| `\{"type": "any"\}` | Model must call at least one tool from the provided list |
| `\{"type": "tool", "name": "X"\}` | Model must call tool `X` specifically |
| `\{"type": "none"\}` | No tool calls allowed; model responds in prose |

The `any` and specific-tool modes change `stop_reason` from `"end_turn"` to `"tool_use"`. This is reliable enough to use as a guard: if `stop_reason != "tool_use"`, the model disobeyed the constraint and you can retry.

**Forced structured output via tool:**

Define the output schema as a tool's `input_schema`, then force its use. The model cannot respond with prose: it must populate your schema.

```python
response = client.messages.create(
    model="claude-opus-4-5",
    max_tokens=1024,
    tools=[{
        "name": "extract_invoice",
        "description": "Extract structured fields from an invoice document",
        "input_schema": {
            "type": "object",
            "properties": {
                "vendor_name": {"type": ["string", "null"]},
                "invoice_date": {
                    "type": ["string", "null"],
                    "description": "ISO 8601 date"
                },
                "total_amount": {"type": ["number", "null"]},
                "line_items": {
                    "type": "array",
                    "items": {
                        "type": "object",
                        "properties": {
                            "description": {"type": "string"},
                            "amount": {"type": "number"}
                        },
                        "required": ["description", "amount"]
                    }
                }
            },
            "required": ["vendor_name", "invoice_date", "total_amount", "line_items"]
        }
    }],
    tool_choice={"type": "tool", "name": "extract_invoice"},
    messages=[{"role": "user", "content": f"Extract fields from:\n\n{invoice_text}"}]
)

# result is always tool_use, never prose
fields = response.content[0].input
```

This pattern works for any extraction, classification, or analysis task where you need machine-readable output. It does not require the beta header.

---

### Structured Outputs: strict Mode

The `output-schema-2025-02-19` beta enables constrained decoding. The model generates tokens that, by construction, cannot violate the JSON schema. It never produces invalid JSON, never omits required fields, never uses the wrong type.

**Activating strict mode:**

```python
client = anthropic.Anthropic()

response = client.beta.messages.create(
    model="claude-opus-4-5",
    max_tokens=1024,
    betas=["output-schema-2025-02-19"],
    tools=[{
        "name": "classify_document",
        "description": "Classify a document into a category",
        "input_schema": {
            "type": "object",
            "strict": True,
            "properties": {
                "category": {
                    "type": "string",
                    "enum": ["invoice", "contract", "report", "memo", "other"]
                },
                "category_detail": {
                    "type": ["string", "null"],
                    "description": "Free-text clarification required when category is 'other'"
                },
                "confidence": {"type": "number"},
                "summary": {"type": "string"}
            },
            "required": ["category", "category_detail", "confidence", "summary"]
        }
    }],
    tool_choice={"type": "tool", "name": "classify_document"},
    messages=[{"role": "user", "content": doc_text}]
)
```

**What `strict: true` guarantees:**
- Syntactically valid JSON
- All `required` fields are present
- Field types exactly match the schema
- No additional properties beyond those declared

**What `strict: true` does not guarantee:**
- Semantic accuracy (the `confidence` field may be 0.99 for a wrong classification)
- Truthful values (a `vendor_name` field will be populated, but may be wrong if the document is ambiguous)

For semantic accuracy, pair strict mode with a validation retry loop.

**Nullable fields prevent hallucination of defaults:**

Without nullable, the model must fill every required field and will invent a value rather than leave it empty. Nullable fields give the model an explicit out:

```json
"vendor_name": {"type": ["string", "null"]}
```

The model returns `null` when the field cannot be found, rather than guessing.

**Extensible enums with companion fields:**

Closed enums break when inputs don't fit any category. The solution: add `"other"` as the last enum value and a companion detail field:

```json
{
    "document_type": {
        "type": "string",
        "enum": ["invoice", "purchase_order", "receipt", "credit_note", "other"]
    },
    "document_type_detail": {
        "type": ["string", "null"],
        "description": "Populate when document_type is 'other'; describe the actual document type"
    }
}
```

This preserves the type-safety of the enum for the 95% case while capturing the 5% gracefully.

**`detected_pattern` for false-positive analysis:**

In classification pipelines, a `detected_pattern` field surfaces the evidence the model used. This turns opaque classifications into debuggable decisions:

```json
{
    "is_complaint": {"type": "boolean"},
    "detected_pattern": {
        "type": ["string", "null"],
        "description": "Quote the specific phrase or pattern that triggered the classification"
    },
    "confidence": {"type": "number"}
}
```

When `is_complaint: true` with `detected_pattern: "your service is terrible"`, a human reviewer can validate the classification in seconds. When `detected_pattern: null` and `confidence: 0.6`, that is a signal to escalate for manual review rather than auto-process.
