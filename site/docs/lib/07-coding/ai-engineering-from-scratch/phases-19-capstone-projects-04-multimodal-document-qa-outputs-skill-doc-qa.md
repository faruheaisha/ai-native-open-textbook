---
title: "AI Engineering from Scratch（英文原版）"
sourceId: "07-coding/ai-engineering-from-scratch"
sourceTitle: "AI Engineering from Scratch（英文原版）"
sourceKind: "源码研读"
licenseLabel: "可转载"
lang: "英文"
tier: 2
volume: "07-coding"
sourceUrl: "https://github.com/rohitg00/ai-engineering-from-scratch"
entryUrl: "https://github.com/rohitg00/ai-engineering-from-scratch/blob/d18b8fe5a913c46011a3b06cb6ebd6a924414fd3/phases/19-capstone-projects/04-multimodal-document-qa/outputs/skill-doc-qa.md"
sourceRel: "phases/19-capstone-projects/04-multimodal-document-qa/outputs/skill-doc-qa.md"
rawUrl: "/raw/07-coding/ai-engineering-from-scratch/phases/19-capstone-projects/04-multimodal-document-qa/outputs/skill-doc-qa.md"
sourceSha256: "7f750fc13b6a48cae57baef76c26ede7f62c301fe874f84957e5ea6f75dbdf79"
pageSha256: "7f750fc13b6a48cae57baef76c26ede7f62c301fe874f84957e5ea6f75dbdf79"
contentMode: "local-full"
zh: ""
---

# AI Engineering from Scratch（英文原版）

Given a corpus of PDFs (10-Ks, scientific papers, scanned documents), build a pipeline that indexes pages as images using ColPali-style late interaction and answers questions with page-level evidence regions.

Build plan:

1. Render every PDF page to a 1536x2048 PNG with PyMuPDF at 180 DPI.
2. Embed every page with ColQwen2.5-v0.2 or ColQwen3-omni. Store multi-vector patch embeddings in Vespa, Qdrant multi-vector, or AstraDB.
3. Apply DocPruner-style 50% patch pruning. Verify accuracy drop stays under 0.5% on ViDoRe v3.
4. At query time: embed query tokens; compute MaxSim against every page's patches; rank top-k.
5. Synthesize with Qwen3-VL-30B or Gemini 2.5 Pro passing the query plus top-5 page images. Require cited `(doc_id, page, region)` anchors.
6. For equation- or table-heavy pages, run Nougat or dots.ocr as an optional text channel and feed it alongside the image.
7. Build a Next.js 15 viewer that overlays evidence regions as bounding boxes on the source page.
8. Evaluate on ViDoRe v3 and M3DocVQA. Produce a content-class × approach matrix comparing vision-first vs OCR-then-text on plain text, tables, charts, handwriting, and equations.

Assessment rubric:

| Weight | Criterion | Measurement |
|:-:|---|---|
| 25 | ViDoRe v3 / M3DocVQA accuracy | Benchmark vs OCR-then-text baseline on matched pages |
| 20 | Evidence-region grounding | Fraction of cited regions that contain the answer span |
| 20 | Storage and latency engineering | DocPruner compression, index p95, answer p95 under 2s |
| 20 | Multi-page reasoning | Accuracy on a hand-labeled 100-question multi-page set |
| 15 | Source-inspection UX | Overlay fidelity, comparison tools, page-by-page explorer |

Hard rejects:

- OCR-first pipelines pitched as "vision-first" by retrofitting OCR text into a single-vector embed.
- Any system that drops patch-level bounding boxes and therefore cannot render evidence overlays.
- Storage numbers reported without documenting DocPruner settings.

Refusal rules:

- Refuse to index scanned legal contracts without a dedicated redaction policy. ColQwen embeddings leak content.
- Refuse to serve queries against a corpus the user has not disclosed. Audit trail is mandatory for regulated domains.
- Refuse to compare to OCR-then-text without running both pipelines on the same corpus.

Output: a repo containing the ingestion pipeline, the Vespa (or Qdrant multi-vector) config, the 100-question multi-page eval set, the viewer UI, and a write-up with the content-class x approach matrix and a concrete recommendation for which content classes still favor OCR-then-text in 2026.
