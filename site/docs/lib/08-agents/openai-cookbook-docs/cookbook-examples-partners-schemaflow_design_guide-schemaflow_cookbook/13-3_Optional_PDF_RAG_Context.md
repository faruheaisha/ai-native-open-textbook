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
sourceRel: "cookbook/examples/partners/schemaflow_design_guide/schemaflow_cookbook.md"
rawUrl: "/raw/08-agents/openai-cookbook-docs/cookbook/examples/partners/schemaflow_design_guide/schemaflow_cookbook.md"
sourceSha256: "afab413d868b1d2b8951a5c01c177c86ce2789efff0e64115a37780fd84076dc"
pageSha256: "c0e35dcbc0ecda8ff325aa3f08ab8b1339c2d24bb82de6a6db7cb1996f5ff9f0"
contentMode: "local-full"
zh: ""
---

## 3) Optional PDF RAG Context

SchemaFlow can run with or without retrieval context, so readers can start with the request alone and add reference docs only when the change needs them.

The sample PDF path in the code cell below points to a file included in the cookbook folder under `data/`, not to bytes embedded inside the notebook. Leave `PDF_PATH = None` for static article previews or generic runs.

With the default `PDF_PATH = None`, the notebook uses only the natural-language change request. This is enough to demonstrate the core staged workflow.

Set `PDF_PATH` to a local PDF when you want the Impact Agent to ground its analysis in reference material, such as:

- interface design documents
- schema specifications
- lineage documentation
- data contracts
- platform architecture notes
- downstream dependency documentation

When a PDF is configured, this section:

1. Validates that the file exists and is a PDF.
2. Creates an OpenAI vector store with a one-day expiration policy.
3. Uploads the PDF to the vector store.
4. Lets OpenAI handle parsing, chunking, embedding, and retrieval.
5. Stores the vector store ID for the Impact Agent.
6. Later summarizes any File Search results returned during impact analysis.

This keeps the cookbook lightweight because it does not require local embedding models, Chroma, Neo4j, LangGraph, or project-specific Python modules.

```python
from pathlib import Path

# Optional PDF RAG example.
# The GitHub repo includes this sample PDF under schemaflow_cookbook/data.
# When running from a repo checkout in the cookbook folder, uncomment the path below to upload it to File Search.
# For meaningful retrieval hits, pair it with the LOYALTY_TIER change request used in this notebook.
PDF_PATH = None
# PDF_PATH = "data/sample_customer_loyalty_ifd.pdf"
RAG_MAX_RESULTS = 6
rag_vector_store = None
rag_vector_store_id = None
rag_vector_store_file = None
rag_file_search_results = []
impact_response = None

def create_pdf_vector_store(pdf_path):
    pdf_path = Path(pdf_path).expanduser().resolve()
    if not pdf_path.exists():
        raise FileNotFoundError(f"PDF not found: {pdf_path}")
    if pdf_path.suffix.lower() != ".pdf":
        raise ValueError(f"Expected a PDF file, got: {pdf_path}")
    with trace("SchemaFlow PDF Vector Store", group_id=SCHEMAFLOW_TRACE_GROUP_ID, metadata={"step": "pdf_vector_store", "pdf_path": str(pdf_path)}):
        with custom_span("Create vector store", {"pdf_path": str(pdf_path)}):
            vector_store = client.vector_stores.create(name=f"schemaflow-cookbook-{datetime.now(timezone.utc).strftime('%Y%m%dT%H%M%SZ')}", expires_after={"anchor": "last_active_at", "days": 1})
        with custom_span("Upload PDF to vector store", {"vector_store_id": vector_store.id, "pdf_path": str(pdf_path)}):
            with pdf_path.open("rb") as handle:
                vector_store_file = client.vector_stores.files.upload_and_poll(vector_store_id=vector_store.id, file=handle)
        trace_function_result("PDF vector store ready", input_obj={"pdf_path": str(pdf_path)}, output_obj={"vector_store_id": vector_store.id, "status": getattr(vector_store_file, "status", "unknown")})
        flush_traces()
    return vector_store, vector_store_file

if PDF_PATH:
    rag_vector_store, rag_vector_store_file = create_pdf_vector_store(PDF_PATH)
    rag_vector_store_id = rag_vector_store.id
    print("Created vector store:", rag_vector_store_id)
    print("Uploaded PDF status:", getattr(rag_vector_store_file, "status", "unknown"))
else:
    print("No PDF configured. Leave PDF_PATH as None to run without RAG, or set it to a local PDF path.")
```
